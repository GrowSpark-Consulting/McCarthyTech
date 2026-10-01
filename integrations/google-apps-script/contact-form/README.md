# Contact form → Google Sheets + email

The Contact page form posts each inquiry to a Google Apps Script web app
(`Code.gs`). The script stores the inquiry in a Google Sheet, emails the team,
and sends the visitor a confirmation.

```
Contact page form ──POST──▶ Apps Script web app ──▶ Google Sheet ("Inquiries")
                                                 ├─▶ Admin email (Reply-To = visitor)
                                                 └─▶ Visitor confirmation
```

The website only knows the web app URL. The admin address lives in the script's
properties and never reaches the browser.

## Using a spreadsheet that already has a script

If the spreadsheet you want to use already serves another site's form, **do not
paste this code into its existing script.** A project has only one `doPost`, so
the other form would stop working. Instead:

1. Go to [script.google.com](https://script.google.com), signed in with the
   account that owns the spreadsheet, and click **New project**. Name it, e.g.
   "McCarthy Digital — Contact form". Paste in all of `Code.gs` and save.
2. In **Project Settings → Script properties**, add `SHEET_ID` (the long ID in
   the spreadsheet's URL, between `/d/` and `/edit`) and `SHEET_NAME` (the tab
   for these inquiries, e.g. `Sheet2`). Use an **empty** tab: the header row is
   written only into an empty one.
3. Continue from step 3 below. `setup` reports which tab and spreadsheet it
   will use.

The existing script, its tab and its web app URL are left exactly as they are.

## One-time setup (about 10 minutes)

1. **Create the sheet.** In Google Drive, create a new Google Sheet, e.g.
   "McCarthy Digital — Website Inquiries".
2. **Add the script.** In that sheet, open **Extensions → Apps Script**. Delete
   the starter code, paste in all of `Code.gs`, and save.
3. **Set the time zone.** **Project Settings** (gear icon) → **Time zone** →
   your office time zone. Email timestamps use it.
4. **Set the admin address.** Still in **Project Settings**, under **Script
   properties**, add:

   | Property | Required | Example |
   |---|---|---|
   | `ADMIN_EMAIL` | Yes | `sales@yourdomain.com` (comma-separate several) |
   | `CONFIRMATION_REPLY_TO` | No | `info@yourdomain.com` — where visitors' replies to the confirmation go |
   | `SEND_CONFIRMATION` | No | `false` to stop visitor confirmations |
   | `TEST_EMAIL` | No | Where `testSubmission` sends its confirmation (defaults to you) |

   Instead of script properties, you can fill in `SETTINGS` at the top of the
   copy you paste into the editor (script properties win when both are set).
   Never commit a filled-in copy — this repository is public. Name a local
   copy `Code.local.gs`; git ignores it.

5. **Run `setup`.** Pick `setup` in the function menu and click **Run**. Google
   asks you to authorise access to the spreadsheet and to send email as you.
   This creates the **Inquiries** sheet and its header row.
6. **Run `testSubmission`.** This pushes one test inquiry through the full path.
   Check that a row appears in **Inquiries** with Status `New`, that the admin
   email arrives, and that the confirmation arrives at `TEST_EMAIL`.
7. **Deploy.** **Deploy → New deployment** → type **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**

   Click **Deploy** and copy the **Web app URL** (it ends in `/exec`). Open it in
   a browser; you should see `{"ok":true,"service":"mccarthy-digital-contact-form"}`.
8. **Connect the website.** Set the URL in two places:
   - `.env.local` for local development:
     `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://script.google.com/macros/s/…/exec`
   - Vercel: **Project → Settings → Environment Variables**, the same name and
     value for Production and Preview. Then **redeploy**: `NEXT_PUBLIC_` values
     are built into the site at build time.
9. **Test it for real.** Submit the Contact page form once and confirm the row
   and both emails.

## Updating the script

Edit `Code.gs`, then **Deploy → Manage deployments → ✏️ → Version: New version →
Deploy**. The URL stays the same, so the website needs no change. Creating a
*new deployment* instead would give a new URL.

If you change the dropdown options, change them in both `Code.gs` (`OPTIONS`)
and `src/lib/contact-inquiry.ts`. The script rejects any value it does not know.

## What the script protects against

- **Honeypot.** A hidden `companyFax` field. If it is filled in, the script
  answers "success" and stores nothing, so bots learn nothing.
- **Time trap.** A form submitted under 3 seconds after it appeared is treated
  the same way.
- **Rate limits.** One inquiry per email address per minute, and at most 20 a
  minute overall (`CONFIG`).
- **Duplicates.** The same email and message within 10 minutes is stored once.
  A double click or retry still gets "success".
- **Validation.** Every field is checked again on the server: required fields,
  email format, known dropdown values, lengths (message up to 3,000 characters,
  whole request up to 20,000).
- **Sanitising.** Control and invisible characters are stripped. Values that
  start with `= + - @` are stored as text so Sheets never runs them as formulas.
  Everything placed in emails is HTML-escaped.
- **Mail failures** are logged, not reported to the visitor: the inquiry is
  already saved, and a retry would only create a duplicate.

## Good to know

- Emails are sent from the Google account that deployed the script.
- Gmail quotas: about 100 recipients a day on a personal account, 1,500 on
  Google Workspace. Each inquiry uses two (admin and visitor).
- Logs: **Apps Script → Executions** lists every request and any errors.
- No emails? Run `testEmail` from the editor. It sends one message to
  `ADMIN_EMAIL` and logs which account sends it and the quota left.
- The **Status** column is for the team. Change `New` to `Contacted`, `Won` and
  so on as you work through inquiries.
