import type { ContactInquiry } from '@/lib/contact-inquiry';

/** What the form sends: the inquiry plus two anti-spam signals. */
export interface ContactSubmission extends ContactInquiry {
  /** Honeypot. Hidden from people, so anything in it came from a bot. */
  readonly companyFax: string;
  /** When the form appeared, in ms since the epoch — instant submissions are bots. */
  readonly startedAt: number;
}

/** Why a submission did not go through, for the UI to word. */
export type ContactSubmitFailure =
  /** `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` is not set in this build. */
  | 'not-configured'
  /** Offline, timed out, or the endpoint answered with an HTTP error. */
  | 'network'
  /** The endpoint rejected the data; `fieldErrors` says which fields. */
  | 'invalid'
  /** Too many submissions from this email address in a short time. */
  | 'rate-limited'
  /** The endpoint failed while processing an otherwise valid inquiry. */
  | 'server';

export type ContactSubmitResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly reason: ContactSubmitFailure;
      readonly fieldErrors?: Readonly<Record<string, string>>;
    };

/** Long enough for Apps Script's cold start, short enough not to hang a button. */
const TIMEOUT_MS = 20_000;

/** The JSON the Apps Script endpoint answers with. */
interface EndpointResponse {
  readonly ok?: unknown;
  readonly code?: unknown;
  readonly fields?: unknown;
}

const FAILURE_BY_CODE: Readonly<Record<string, ContactSubmitFailure>> = {
  invalid: 'invalid',
  rate_limited: 'rate-limited',
  busy: 'server',
  server_error: 'server',
};

/**
 * Sends an inquiry to the Google Apps Script web app, which stores it in the
 * Google Sheet and emails the team and the visitor.
 *
 * The one place the endpoint is used: its URL comes from
 * `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` and nothing else in the app knows it.
 * The admin address and any credentials live only in the script's own
 * properties, never in this bundle.
 *
 * The body is JSON sent as `text/plain`. That keeps the request a CORS
 * "simple request" — Apps Script web apps cannot answer the preflight a JSON
 * content type would trigger — while the script still parses it as JSON.
 *
 * @param data - The validated inquiry and its anti-spam fields.
 * @returns Whether it went through, and if not, why.
 */
export async function submitContactForm(data: ContactSubmission): Promise<ContactSubmitResult> {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;
  if (endpoint === undefined || endpoint === '') return { ok: false, reason: 'not-configured' };

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    return { ok: false, reason: 'network' };
  }

  if (!response.ok) return { ok: false, reason: 'network' };

  let payload: EndpointResponse;
  try {
    payload = (await response.json()) as EndpointResponse;
  } catch {
    // Not JSON — typically Google's HTML error or sign-in page from a
    // mis-deployed script.
    return { ok: false, reason: 'server' };
  }

  if (payload.ok === true) return { ok: true };

  const reason =
    typeof payload.code === 'string' ? (FAILURE_BY_CODE[payload.code] ?? 'server') : 'server';
  const fieldErrors =
    typeof payload.fields === 'object' && payload.fields !== null
      ? (payload.fields as Record<string, string>)
      : undefined;
  return { ok: false, reason, fieldErrors };
}
