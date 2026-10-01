import { z } from 'zod';

/**
 * The inquiry forms — on the Contact page and the homepage: options, limits,
 * copy, and the schema the browser validates against.
 *
 * The Google Apps Script endpoint re-validates every field with the same rules
 * (see `integrations/google-apps-script/contact-form/Code.gs`) — the browser
 * pass is for the visitor's convenience, never a security boundary. Keep the
 * option lists and limits below in step with that script.
 */

export const INQUIRY_SERVICES = [
  'Web Development',
  'Mobile App Development',
  'AI / Machine Learning',
  'Custom Software',
  'UI/UX Design',
  'Digital Transformation',
  'Technology Consulting',
  'Other',
] as const;

export const INQUIRY_BUDGETS = [
  'Under ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹5,00,000',
  '₹5,00,000 – ₹10,00,000',
  '₹10,00,000+',
  'Not decided yet',
] as const;

export const INQUIRY_TIMELINES = [
  'ASAP',
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  '6+ months',
  'Not decided yet',
] as const;

export const INQUIRY_SOURCES = ['Google', 'LinkedIn', 'Instagram', 'Referral', 'Other'] as const;

/** Server-enforced limits, mirrored here so the browser can warn first. */
export const INQUIRY_LIMITS = {
  name: 80,
  email: 254,
  phone: 24,
  company: 120,
  message: 3000,
} as const;

/** `z.enum` that reports a friendly message when nothing is selected. */
const choice = <T extends readonly [string, ...string[]]>(options: T, message: string) =>
  z.enum(options, { errorMap: () => ({ message }) });

export const contactInquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(INQUIRY_LIMITS.name, `Name must be ${INQUIRY_LIMITS.name} characters or fewer.`),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your business email.')
    .max(INQUIRY_LIMITS.email, 'That email address is too long.')
    .email('Please enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .min(6, 'Please enter your phone number.')
    .max(INQUIRY_LIMITS.phone, `Phone number must be ${INQUIRY_LIMITS.phone} characters or fewer.`)
    // Permissive on purpose: international formats vary too much to police.
    .regex(/^[+\d][\d\s().-]*$/, 'Use digits, spaces and + ( ) - only.'),
  company: z
    .string()
    .trim()
    .min(2, 'Please enter your company name.')
    .max(
      INQUIRY_LIMITS.company,
      `Company name must be ${INQUIRY_LIMITS.company} characters or fewer.`,
    ),
  service: choice(INQUIRY_SERVICES, 'Please choose the service you need.'),
  budget: choice(INQUIRY_BUDGETS, 'Please choose a budget range.'),
  timeline: choice(INQUIRY_TIMELINES, 'Please choose a timeline.'),
  message: z
    .string()
    .trim()
    .min(20, 'Please tell us a little more — at least 20 characters.')
    .max(INQUIRY_LIMITS.message, `Please keep it under ${INQUIRY_LIMITS.message} characters.`),
  // Optional: an empty select submits "", which is allowed through as "not given".
  howHeard: z.union([z.enum(INQUIRY_SOURCES), z.literal('')]).optional(),
});

export type ContactInquiry = z.infer<typeof contactInquirySchema>;

export const contactInquiryContent = {
  eyebrow: 'Get in touch',
  heading: "Let's Build Something Digital",
  lead: 'Tell us what you are building. McCarthy Digital partners with startups and established businesses to design, build and scale the technology behind them.',
  offerings: [
    'AI solutions',
    'Web development',
    'Mobile applications',
    'Digital transformation',
    'Custom software',
    'Technology consulting',
  ],
  responseNote: 'We reply to every inquiry within one business day.',
  formHeading: 'Tell us about your project',
  submitLabel: 'Send Inquiry',
  submittingLabel: 'Sending...',
  privacyNote: 'We use these details only to respond to your inquiry.',
  successTitle: 'Inquiry received',
  successMessage:
    'Thank you! Your inquiry has been received. Our team will get back to you shortly.',
  successAgain: 'Send another inquiry',
  errorMessage: 'Something went wrong. Please try again.',
  rateLimitedMessage:
    'You have just sent us an inquiry. Please wait a minute before sending another.',
} as const;
