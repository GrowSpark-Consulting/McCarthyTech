import type { ImageAsset } from '@/types/media';

/** A customer review. */
export interface Testimonial {
  readonly id: string;
  /** Reviewer's name. */
  readonly name: string;
  /** Their role or reviewer designation. */
  readonly role: string;
  /** Review body, without surrounding quote marks — the card supplies those. */
  readonly quote: string;
  /** Platform the review came from. */
  readonly source: string;
  /** Score out of five, rendered to one decimal place. */
  readonly rating: number;
}

/** Section copy. */
export const testimonialsContent = {
  eyebrow: 'Our Testimonial',
  headingBefore: 'Hear from our',
  headingAfter: 'happy customers',
  /** Animated ornament set between the two heading fragments. */
  headingOrnament: {
    src: '/assets/img/icon/animated-gif03.gif',
    alt: '',
    width: 200,
    height: 150,
  } satisfies ImageAsset,
  carouselLabel: 'Customer reviews',
  previousLabel: 'Previous review',
  nextLabel: 'Next review',
} as const;

/**
 * The four published reviews, transcribed verbatim.
 *
 * The reference renders an avatar photo beside each name, but both source files
 * (`avatar/img01.jpg`, `avatar/img02.jpg`) return 404 on the live site — the
 * originals are broken there too. `AvatarInitials` stands in: an original,
 * generated monogram in the site's own palette, so no third-party likeness is
 * reproduced and nothing 404s.
 */
export const testimonials: readonly Testimonial[] = [
  {
    id: 'thoufeek',
    name: 'Thoufeek. H',
    role: 'Local Guide',
    quote:
      'I would recommend McCarthy Tech to anyone looking for a professional website. Not only is the website design excellent but the quality and speed of service from McCarthy Tech has been excellent.',
    source: 'Google',
    rating: 5,
  },
  {
    id: 'anjana',
    name: 'Anjana AS',
    role: 'Reviewer',
    quote:
      'In my experience McCarthy Tech IT Solutions Pvt Ltd is the best software development company in Singapore. The entire team was well experienced and knowledgeable. They also 100% dedicated to provide high quality services on time.',
    source: 'Google',
    rating: 5,
  },
  {
    id: 'hyfa',
    name: 'Hyfa Muhammed Sha',
    role: 'Reviewer',
    quote:
      'I recommend this company for their excellent services. From start to finish, the entire process was smooth and well-organized. The team was professional, friendly, and very attentive to my needs.',
    source: 'Google',
    rating: 5,
  },
  {
    id: 'mymoona',
    name: 'Mymoona',
    role: 'Reviewer',
    quote:
      'I had a great experience working with McCarthy Tech IT Solutions Pvt. Ltd.. They are an emerging AI implementation and software development company rooted in Singapore, and their expertise truly stands out.',
    source: 'Google',
    rating: 5,
  },
];
