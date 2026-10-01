/**
 * McCarthy Digital — Contact form endpoint.
 *
 * A Google Apps Script web app. The website's Contact page POSTs each inquiry
 * here; the script validates it, appends it to a tab of a Google Sheet, emails
 * the team, and sends the visitor a confirmation.
 *
 * It can be bound to the sheet that stores inquiries, or — when that
 * spreadsheet already has a script of its own for another form — run as a
 * separate, standalone project pointed at it with SHEET_ID. A project can only
 * have one doPost, so sharing the existing script would break the other form.
 *
 * Setup and deployment: see README.md beside this file.
 *
 * Settings — in SETTINGS below, or as script properties (Project Settings →
 * Script properties), which take precedence:
 *   ADMIN_EMAIL             Required. Where inquiries are sent. Comma-separate
 *                           several addresses.
 *   SHEET_ID                Optional. The spreadsheet to write to — the long ID
 *                           in its URL. Used only when the script is not bound.
 *   SHEET_NAME              Optional. The tab to write to. Default "Inquiries";
 *                           created, with a header row, if it does not exist.
 *   CONFIRMATION_REPLY_TO   Optional. Reply-To on the visitor's confirmation,
 *                           e.g. a public info@ address.
 *   SEND_CONFIRMATION       Optional. "false" stops visitor confirmations.
 *   TEST_EMAIL              Optional. Visitor address testSubmission uses.
 *
 * Responses are JSON: { ok: true } or { ok: false, code, fields? }, where code
 * is "invalid", "rate_limited", "busy" or "server_error".
 */

/**
 * Leave these empty here: this file is in a public repository. Fill them in
 * only in the copy pasted into the Apps Script editor — or use script
 * properties instead.
 */
const SETTINGS = {
  ADMIN_EMAIL: '',
  SHEET_ID: '',
  SHEET_NAME: '',
  CONFIRMATION_REPLY_TO: '',
  SEND_CONFIRMATION: '',
  TEST_EMAIL: '',
};

const CONFIG = {
  BRAND: 'McCarthy Digital',
  /** Tab used when the SHEET_NAME property is not set. */
  DEFAULT_SHEET_NAME: 'Inquiries',
  HEADERS: [
    'Timestamp',
    'Full Name',
    'Email',
    'Phone',
    'Company',
    'Service',
    'Budget',
    'Timeline',
    'Message',
    'How Heard',
    'Status',
  ],
  DEFAULT_STATUS: 'New',
  ADMIN_SUBJECT: 'New Contact Inquiry — McCarthy Digital',
  CONFIRMATION_SUBJECT: 'Thanks for contacting McCarthy Digital',
  /** Largest request body accepted, in characters. */
  MAX_BODY: 20000,
  LIMITS: { fullName: 80, email: 254, phone: 24, company: 120, message: 3000 },
  MIN_MESSAGE: 20,
  /** A form completed faster than this was filled in by a script. */
  MIN_FILL_MS: 3000,
  /** One inquiry per email address in this many seconds. */
  PER_EMAIL_WINDOW_S: 60,
  /** Across everyone, at most this many inquiries in any one minute. */
  GLOBAL_PER_MINUTE: 20,
  /** An identical inquiry (same email and message) within this window is not stored twice. */
  DUPLICATE_WINDOW_S: 600,
};

/** Accepted dropdown values — keep in step with src/lib/contact-inquiry.ts. */
const OPTIONS = {
  service: [
    'Web Development',
    'Mobile App Development',
    'AI / Machine Learning',
    'Custom Software',
    'UI/UX Design',
    'Digital Transformation',
    'Technology Consulting',
    'Other',
  ],
  budget: [
    'Under ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000 – ₹5,00,000',
    '₹5,00,000 – ₹10,00,000',
    '₹10,00,000+',
    'Not decided yet',
  ],
  timeline: ['ASAP', 'Within 1 month', '1–3 months', '3–6 months', '6+ months', 'Not decided yet'],
  howHeard: ['Google', 'LinkedIn', 'Instagram', 'Referral', 'Other'],
};

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE_PATTERN = /^[+\d][\d\s().-]*$/;

/* ───────────────────────────── Entry points ───────────────────────────── */

/**
 * Receives an inquiry from the website.
 *
 * @param {GoogleAppsScript.Events.DoPost} e
 * @return {GoogleAppsScript.Content.TextOutput}
 */
function doPost(e) {
  try {
    const raw = e && e.postData ? e.postData.contents : '';
    if (!raw || raw.length > CONFIG.MAX_BODY) return respond_({ ok: false, code: 'invalid' });

    let data;
    try {
      data = JSON.parse(raw);
    } catch (parseError) {
      return respond_({ ok: false, code: 'invalid' });
    }
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      return respond_({ ok: false, code: 'invalid' });
    }

    // Honeypot and time trap. Answer exactly like a success so a bot learns
    // nothing about what gave it away — and store nothing.
    if (cleanLine_(data.companyFax) !== '') return respond_({ ok: true });
    const startedAt = Number(data.startedAt);
    if (Number.isFinite(startedAt) && Date.now() - startedAt < CONFIG.MIN_FILL_MS) {
      return respond_({ ok: true });
    }

    const result = validate_(data);
    if (!result.ok) return respond_({ ok: false, code: 'invalid', fields: result.fields });
    const inquiry = result.value;

    const now = new Date();
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return respond_({ ok: false, code: 'busy' });

    try {
      const cache = CacheService.getScriptCache();

      // A repeat of an inquiry already stored (a double click, a retry after a
      // slow response) succeeds without a second row or second emails.
      const duplicateKey = 'dup:' + digest_(inquiry.email.toLowerCase() + '|' + inquiry.message);
      if (cache.get(duplicateKey)) return respond_({ ok: true });

      const emailKey = 'email:' + digest_(inquiry.email.toLowerCase());
      if (cache.get(emailKey)) return respond_({ ok: false, code: 'rate_limited' });

      const minuteKey = 'minute:' + Math.floor(now.getTime() / 60000);
      const inThisMinute = Number(cache.get(minuteKey) || 0);
      if (inThisMinute >= CONFIG.GLOBAL_PER_MINUTE) {
        return respond_({ ok: false, code: 'rate_limited' });
      }

      appendInquiry_(inquiry, now);

      cache.put(duplicateKey, '1', CONFIG.DUPLICATE_WINDOW_S);
      cache.put(emailKey, '1', CONFIG.PER_EMAIL_WINDOW_S);
      cache.put(minuteKey, String(inThisMinute + 1), 120);
    } finally {
      lock.releaseLock();
    }

    // Email only after the row is safely stored. A mail failure is logged but
    // never reported as a failed submission: the inquiry is already saved, and
    // the visitor retrying would only create a duplicate.
    try {
      notifyAdmin_(inquiry, now);
    } catch (mailError) {
      console.error('Admin notification failed: ' + mailError);
    }
    if (setting_('SEND_CONFIRMATION') !== 'false') {
      try {
        sendConfirmation_(inquiry);
      } catch (mailError) {
        console.error('Confirmation email failed: ' + mailError);
      }
    }

    return respond_({ ok: true });
  } catch (error) {
    console.error('doPost failed: ' + (error && error.stack ? error.stack : error));
    return respond_({ ok: false, code: 'server_error' });
  }
}

/** Health check: open the web app URL in a browser to confirm it is deployed. */
function doGet() {
  return respond_({ ok: true, service: 'mccarthy-digital-contact-form' });
}

/* ───────────────────────────── Validation ───────────────────────────── */

/**
 * Validates and sanitises an inquiry. Never trusts the website's own checks.
 *
 * @param {Object} data Parsed request body.
 * @return {{ok: true, value: Object} | {ok: false, fields: Object}}
 */
function validate_(data) {
  const fields = {};
  const value = {
    fullName: cleanLine_(data.fullName),
    email: cleanLine_(data.email),
    phone: cleanLine_(data.phone),
    company: cleanLine_(data.company),
    service: cleanLine_(data.service),
    budget: cleanLine_(data.budget),
    timeline: cleanLine_(data.timeline),
    message: cleanBlock_(data.message),
    howHeard: cleanLine_(data.howHeard),
  };
  const L = CONFIG.LIMITS;

  if (value.fullName.length < 2) fields.fullName = 'Please enter your full name.';
  else if (value.fullName.length > L.fullName) fields.fullName = 'Name is too long.';

  if (!value.email) fields.email = 'Please enter your business email.';
  else if (value.email.length > L.email || !EMAIL_PATTERN.test(value.email)) {
    fields.email = 'Please enter a valid email address.';
  }

  if (value.phone.length < 6) fields.phone = 'Please enter your phone number.';
  else if (value.phone.length > L.phone || !PHONE_PATTERN.test(value.phone)) {
    fields.phone = 'Please enter a valid phone number.';
  }

  if (value.company.length < 2) fields.company = 'Please enter your company name.';
  else if (value.company.length > L.company) fields.company = 'Company name is too long.';

  if (OPTIONS.service.indexOf(value.service) === -1) fields.service = 'Please choose a service.';
  if (OPTIONS.budget.indexOf(value.budget) === -1) fields.budget = 'Please choose a budget range.';
  if (OPTIONS.timeline.indexOf(value.timeline) === -1) fields.timeline = 'Please choose a timeline.';

  if (value.message.length < CONFIG.MIN_MESSAGE) {
    fields.message = 'Please tell us a little more about your project.';
  } else if (value.message.length > L.message) {
    fields.message = 'Please keep project details under ' + L.message + ' characters.';
  }

  if (value.howHeard && OPTIONS.howHeard.indexOf(value.howHeard) === -1) value.howHeard = '';

  return Object.keys(fields).length > 0 ? { ok: false, fields: fields } : { ok: true, value: value };
}

/** A single-line string: control characters removed, whitespace collapsed, trimmed. */
function cleanLine_(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u2028\u2029\uFEFF]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Multi-line text: line breaks kept (max two in a row), other control characters removed. */
function cleanBlock_(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F-\u009F\u200B-\u200F\u2028\u2029\uFEFF]/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/* ───────────────────────────── Storage ───────────────────────────── */

/** Appends one inquiry to the Inquiries sheet, creating the sheet if needed. */
function appendInquiry_(inquiry, now) {
  const sheet = inquiriesSheet_();
  sheet.appendRow([
    now,
    safeCell_(inquiry.fullName),
    safeCell_(inquiry.email),
    safeCell_(inquiry.phone),
    safeCell_(inquiry.company),
    safeCell_(inquiry.service),
    safeCell_(inquiry.budget),
    safeCell_(inquiry.timeline),
    safeCell_(inquiry.message),
    safeCell_(inquiry.howHeard),
    CONFIG.DEFAULT_STATUS,
  ]);
}

/**
 * The spreadsheet to write to: the one this script is bound to, or for a
 * standalone script the one named by SHEET_ID. A bound script ignores SHEET_ID,
 * so a mistyped ID cannot break it.
 */
function spreadsheet_() {
  const bound = SpreadsheetApp.getActiveSpreadsheet();
  if (bound) return bound;
  const id = setting_('SHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  throw new Error('No spreadsheet: set SHEET_ID, or bind this script to a sheet.');
}

/** The tab inquiries go to: SHEET_NAME, or the default. */
function sheetName_() {
  return setting_('SHEET_NAME') || CONFIG.DEFAULT_SHEET_NAME;
}

/**
 * The inquiries tab, created if missing. It is matched ignoring case and
 * surrounding spaces, so a tab made by hand as "Maccarthy tech " is used
 * rather than clashing with a new one. The header row is written only when
 * the tab is empty, so an existing tab's contents are never disturbed.
 */
function inquiriesSheet_() {
  const spreadsheet = spreadsheet_();
  const name = sheetName_();
  const wanted = name.toLowerCase();
  let sheet = spreadsheet.getSheets().filter(function (tab) {
    return tab.getName().trim().toLowerCase() === wanted;
  })[0];
  if (!sheet) sheet = spreadsheet.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(CONFIG.HEADERS);
    sheet.getRange(1, 1, 1, CONFIG.HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Stops a value being read as a formula. A cell starting with = + - @ is
 * evaluated by Sheets; a leading apostrophe keeps it literal text — which also
 * keeps "+91 …" phone numbers from becoming formula errors.
 */
function safeCell_(text) {
  return /^[=+\-@\t]/.test(text) ? "'" + text : text;
}

/* ───────────────────────────── Email ───────────────────────────── */

/** Emails the team a summary, with Reply-To set to the visitor. */
function notifyAdmin_(inquiry, now) {
  const admin = setting_('ADMIN_EMAIL');
  if (!admin) throw new Error('ADMIN_EMAIL is not set.');

  const submitted = Utilities.formatDate(now, Session.getScriptTimeZone(), "d MMM yyyy, h:mm a '('z')'");
  const rows = [
    ['Name', inquiry.fullName],
    ['Email', inquiry.email],
    ['Phone', inquiry.phone],
    ['Company', inquiry.company],
    ['Service', inquiry.service],
    ['Budget', inquiry.budget],
    ['Timeline', inquiry.timeline],
    ['How they heard about us', inquiry.howHeard || 'Not specified'],
  ];
  const replyHref =
    'mailto:' +
    encodeURIComponent(inquiry.email) +
    '?subject=' +
    encodeURIComponent('Re: Your inquiry to ' + CONFIG.BRAND);
  // Straight to the inquiries tab, not whichever tab the spreadsheet opens on.
  const sheetUrl = spreadsheet_().getUrl() + '#gid=' + inquiriesSheet_().getSheetId();

  const htmlBody =
    emailShell_(
      '<p style="margin:0 0 6px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#c4f012;font-weight:700">New contact inquiry</p>' +
        '<h1 style="margin:0 0 22px;font-size:22px;line-height:1.3;color:#ffffff">' +
        escape_(inquiry.fullName) +
        ' · ' +
        escape_(inquiry.company) +
        '</h1>' +
        '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">' +
        rows
          .map(function (row) {
            return (
              '<tr><td style="padding:9px 0;border-bottom:1px solid #1d2338;color:#97a1b5;font-size:13px;width:42%;vertical-align:top">' +
              escape_(row[0]) +
              '</td><td style="padding:9px 0;border-bottom:1px solid #1d2338;color:#ffffff;font-size:14px;vertical-align:top">' +
              escape_(row[1]) +
              '</td></tr>'
            );
          })
          .join('') +
        '</table>' +
        '<p style="margin:24px 0 8px;color:#97a1b5;font-size:13px">Project details</p>' +
        '<div style="padding:16px;border-radius:10px;background:#0e1326;color:#ffffff;font-size:14px;line-height:1.6">' +
        escape_(inquiry.message).replace(/\n/g, '<br>') +
        '</div>' +
        '<p style="margin:20px 0 0;color:#97a1b5;font-size:12px">Submitted ' +
        escape_(submitted) +
        '</p>' +
        '<p style="margin:26px 0 0">' +
        '<a href="' +
        replyHref +
        '" style="display:inline-block;padding:13px 24px;border-radius:30px;background:#c4f012;color:#00020f;font-weight:700;font-size:14px;text-decoration:none">Reply to ' +
        escape_(inquiry.fullName.split(' ')[0]) +
        '</a>' +
        '&nbsp;&nbsp;<a href="' +
        sheetUrl +
        '" style="color:#c4f012;font-size:13px">Open the inquiries sheet</a></p>',
    );

  const textBody =
    'NEW CONTACT INQUIRY\n\n' +
    rows
      .map(function (row) {
        return row[0] + ':\n' + row[1] + '\n';
      })
      .join('\n') +
    '\nProject Details:\n' +
    inquiry.message +
    '\n\nSubmitted:\n' +
    submitted +
    '\n\nReply to this email to answer ' +
    inquiry.fullName +
    ' directly.';

  MailApp.sendEmail({
    to: admin,
    subject: CONFIG.ADMIN_SUBJECT,
    body: textBody,
    htmlBody: htmlBody,
    replyTo: inquiry.email,
    name: CONFIG.BRAND + ' Website',
  });
}

/** Thanks the visitor. Contains nothing about how the form works. */
function sendConfirmation_(inquiry) {
  const firstName = inquiry.fullName.split(' ')[0];
  const replyTo = setting_('CONFIRMATION_REPLY_TO');

  const htmlBody = emailShell_(
    '<p style="margin:0 0 18px;font-size:16px;color:#ffffff">Hi ' +
      escape_(firstName) +
      ',</p>' +
      '<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#d5dae6">Thank you for reaching out to McCarthy Digital.</p>' +
      "<p style=\"margin:0 0 14px;font-size:15px;line-height:1.6;color:#d5dae6\">We've received your inquiry and our team will review your requirements.</p>" +
      "<p style=\"margin:0 0 26px;font-size:15px;line-height:1.6;color:#d5dae6\">We'll get back to you shortly.</p>" +
      '<p style="margin:0;font-size:15px;line-height:1.6;color:#d5dae6">Regards,<br><span style="color:#ffffff;font-weight:700">McCarthy Digital Team</span></p>',
  );

  const textBody =
    'Hi ' +
    firstName +
    ',\n\nThank you for reaching out to McCarthy Digital.\n\n' +
    "We've received your inquiry and our team will review your requirements.\n\n" +
    "We'll get back to you shortly.\n\nRegards,\nMcCarthy Digital Team";

  const message = {
    to: inquiry.email,
    subject: CONFIG.CONFIRMATION_SUBJECT,
    body: textBody,
    htmlBody: htmlBody,
    name: CONFIG.BRAND,
  };
  if (replyTo) message.replyTo = replyTo;
  MailApp.sendEmail(message);
}

/** The dark, lime-accented frame both emails share. */
function emailShell_(inner) {
  return (
    '<div style="margin:0;padding:28px 12px;background:#00020f;font-family:Arial,Helvetica,sans-serif">' +
    '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto">' +
    '<tr><td style="padding:0 0 18px;font-size:18px;font-weight:700;color:#ffffff">McCarthy<span style="color:#c4f012">.</span> Digital</td></tr>' +
    '<tr><td style="padding:30px;border-radius:16px;background:#0a0e1d;border:1px solid #1d2338">' +
    inner +
    '</td></tr>' +
    '<tr><td style="padding:18px 0 0;font-size:11px;color:#5d667c">© ' +
    new Date().getFullYear() +
    ' McCarthy Digital</td></tr>' +
    '</table></div>'
  );
}

/* ───────────────────────────── Helpers ───────────────────────────── */

/** A setting: its script property when set, else its value in SETTINGS. */
function setting_(name) {
  const property = PropertiesService.getScriptProperties().getProperty(name);
  if (property && property.trim()) return property.trim();
  return String(SETTINGS[name] || '').trim();
}

function respond_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function escape_(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** A short, stable key for cache entries — never stores the raw email. */
function digest_(text) {
  return Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text, Utilities.Charset.UTF_8),
  ).slice(0, 40);
}

/* ───────────────────────────── Setup & testing ───────────────────────────── */

/**
 * Run once from the editor: creates the Inquiries sheet and header row, and
 * checks the admin address is configured.
 */
function setup() {
  inquiriesSheet_();
  const admin = setting_('ADMIN_EMAIL');
  if (!admin) throw new Error('Set ADMIN_EMAIL in SETTINGS at the top of this file.');
  console.log(
    'Ready. Inquiries go to the "' +
      sheetName_() +
      '" tab of "' +
      spreadsheet_().getName() +
      '", and are emailed to ' +
      admin +
      '.',
  );
}

/**
 * Run from the editor to check email on its own: sends one short message to
 * ADMIN_EMAIL and logs which account sends it.
 */
function testEmail() {
  const admin = setting_('ADMIN_EMAIL');
  if (!admin) throw new Error('Set ADMIN_EMAIL in SETTINGS at the top of this file.');
  console.log(
    'Sending as ' +
      Session.getEffectiveUser().getEmail() +
      ' (' +
      MailApp.getRemainingDailyQuota() +
      ' emails left today).',
  );
  MailApp.sendEmail(
    admin,
    CONFIG.BRAND + ' — email test',
    'If you can read this, the contact form can email you.',
  );
  console.log('Test email sent to ' + admin + '.');
}

/**
 * Run from the editor to send one real test inquiry through the full path:
 * a row in the sheet, the admin email, and a confirmation to TEST_EMAIL.
 */
function testSubmission() {
  const testEmail =
    setting_('TEST_EMAIL') ||
    Session.getEffectiveUser().getEmail();
  const response = doPost({
    postData: {
      contents: JSON.stringify({
        fullName: 'Test Visitor',
        email: testEmail,
        phone: '+91 98765 43210',
        company: 'Test Company',
        service: 'Web Development',
        budget: 'Not decided yet',
        timeline: 'Within 1 month',
        message: 'This is a test inquiry sent from the Apps Script editor. ' + new Date().toISOString(),
        howHeard: 'Google',
        companyFax: '',
        startedAt: Date.now() - 60000,
      }),
    },
  });
  console.log(response.getContent());
}
