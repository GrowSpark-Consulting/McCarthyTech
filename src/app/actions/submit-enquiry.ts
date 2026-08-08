'use server';

import { contactEnquirySchema, type ContactEnquiry } from '@/lib/contact';
import { siteConfig } from '@/lib/site';

/** Outcome of an enquiry submission, returned to the client. */
export type EnquiryResult =
  | { readonly status: 'success'; readonly message: string }
  | { readonly status: 'error'; readonly message: string };

/**
 * Handles a contact enquiry.
 *
 * The schema is re-parsed here rather than trusting the client: the browser's
 * validation is a convenience for the visitor, not a security boundary, and a
 * crafted request can bypass it entirely.
 *
 * **Delivery.** Enquiries are forwarded to `CONTACT_WEBHOOK_URL` — point it at
 * whatever you use (a mail relay, a CRM endpoint, a Slack incoming webhook) and
 * submissions start arriving. If that variable is unset, this reports failure
 * and directs the visitor to the published email address, rather than showing a
 * success message for a message nobody received. The reference's own form posts
 * to `action="#!"` and silently discards everything typed into it.
 *
 * @param values - The submitted enquiry, unvalidated.
 * @returns A result describing what the visitor should be told.
 */
export async function submitEnquiry(values: ContactEnquiry): Promise<EnquiryResult> {
  const parsed = contactEnquirySchema.safeParse(values);

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Some details look wrong. Please check the form and try again.',
    };
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (webhookUrl === undefined || webhookUrl === '') {
    return {
      status: 'error',
      message: `Message delivery isn't configured yet. Please email us directly at ${siteConfig.contact.email}.`,
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...parsed.data,
        submittedAt: new Date().toISOString(),
        source: siteConfig.url,
      }),
      // Never let a hanging endpoint keep the visitor's button spinning.
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded ${response.status}`);
    }

    return {
      status: 'success',
      message: "Thanks — your message is with us. We'll be in touch shortly.",
    };
  } catch {
    // The specific failure is useful to operators, not to visitors; log it
    // server-side and give the visitor a route that definitely works.
    console.error('[submitEnquiry] delivery failed');
    return {
      status: 'error',
      message: `We couldn't send that just now. Please email us at ${siteConfig.contact.email}.`,
    };
  }
}
