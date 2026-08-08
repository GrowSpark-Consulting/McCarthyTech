import { z } from 'zod';

import type { ImageAsset } from '@/types/media';

/** Maximum accepted attachment size, in bytes. */
export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

/** Attachment types the form accepts. */
export const ACCEPTED_ATTACHMENT_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

/** Services offered in the enquiry dropdown. */
export const CONTACT_SERVICES = ['AI - marketing', 'AI consulting', 'AI chatbot virtual'] as const;

/**
 * Contact enquiry schema.
 *
 * Shared by the browser and the Server Action, so client-side hints and
 * server-side enforcement can never diverge — the server re-parses the same
 * shape rather than trusting what the client validated.
 */
export const contactEnquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(80, 'Name must be 80 characters or fewer.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .min(6, 'Please enter a contact number.')
    .max(24, 'Contact number must be 24 characters or fewer.')
    // Permissive on purpose: international numbers vary wildly, and rejecting a
    // valid format is far more costly here than accepting an odd one.
    .regex(/^[+\d][\d\s()-]*$/, 'Use digits, spaces, and + ( ) - only.'),
  service: z.enum(CONTACT_SERVICES, {
    errorMap: () => ({ message: 'Please choose a service.' }),
  }),
  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more — at least 10 characters.')
    .max(2000, 'Message must be 2000 characters or fewer.'),
  /** Filename only; the file itself is not transported (see `submitEnquiry`). */
  attachmentName: z.string().trim().max(160).optional(),
});

/** A validated enquiry. */
export type ContactEnquiry = z.infer<typeof contactEnquirySchema>;

/** Section copy. */
export const contactContent = {
  eyebrow: 'Our Achievements',
  headingBefore: 'Your Trusted ',
  headingAfter: ' Tech Partner',
  /** Pill-cropped animated ornament set into the heading. */
  headingOrnament: {
    src: '/assets/img/icon/b10c3e43e836d32554bf.gif',
    alt: '',
    width: 300,
    height: 300,
  } satisfies ImageAsset,
  formHeading: 'Ready to collaborate with us?',
  formSubheading: 'Who knows where a single message might lead you.',
  submitLabel: 'submit here',
  /** Decorative shapes floating over the stats card. */
  shapes: [
    {
      src: '/assets/img/shape/contact-shape01.png',
      alt: '',
      width: 134,
      height: 179,
      className:
        'left-[30%] top-[-40%] max-bs-xl:left-[26%] max-bs-lg:left-[35%] max-bs-md:left-[16%] max-bs-md:top-[-30%] bs-sm:max-bs-md:left-[29%] bs-sm:max-bs-md:top-[-40%]',
    },
    {
      src: '/assets/img/shape/contact-shape02.png',
      alt: '',
      width: 130,
      height: 144,
      className:
        '-z-10 right-[31%] top-[-40%] max-bs-xl:right-[25%] max-bs-lg:right-[34%] max-bs-md:right-[15%] max-bs-md:top-[-30%] bs-sm:max-bs-md:right-[28%] bs-sm:max-bs-md:top-[-40%]',
    },
  ],
} as const;

/** The two animated achievement counters. */
export const achievementStats = [
  { id: 'projects', value: 30, suffix: '+', label: 'Projects Successfully Delivered' },
  { id: 'satisfaction', value: 100, suffix: '%', label: 'Client Satisfaction Rate' },
] as const;
