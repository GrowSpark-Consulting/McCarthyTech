import type { FeatureHighlight } from '@/types/features';
import type { ImageAsset } from '@/types/media';

/** Shared intrinsic size of the six feature glyphs. */
const FEATURE_ICON_SIZE = 52;

/** Builds an icon asset from its filename. */
function featureIcon(file: string): ImageAsset {
  return {
    src: `/assets/img/icon/${file}`,
    alt: '',
    width: FEATURE_ICON_SIZE,
    height: FEATURE_ICON_SIZE,
  };
}

/** Section copy. */
export const featuresContent = {
  eyebrow: 'The McCarthy Tech Advantage',
  headingBefore: 'Why businesses ',
  headingAfter: ' choose us',
  /** Animated ornament inlaid between the two heading fragments. */
  headingOrnament: {
    src: '/assets/img/icon/diamond-icon02.gif',
    alt: '',
    width: 200,
    height: 150,
  } satisfies ImageAsset,
  /**
   * Three concentric dashed rings behind the centre image. Each is a standalone
   * SVG carrying its own `@keyframes` so the dash keeps travelling even though
   * it is referenced as an `<img>` — page-level CSS cannot reach inside one.
   */
  orbitRings: [
    '/assets/img/shape/feature-ring-1.svg',
    '/assets/img/shape/feature-ring-2.svg',
    '/assets/img/shape/feature-ring-3.svg',
  ],
  /** The gradient sphere the rings orbit. */
  orbitImage: {
    src: '/assets/img/feature/feature-img01.png',
    alt: '',
    width: 391,
    height: 469,
  } satisfies ImageAsset,
} as const;

/** Left column — rendered right-aligned, icon trailing the title. */
export const leftFeatureHighlights: readonly FeatureHighlight[] = [
  {
    id: 'global-footprint',
    titleLines: ['Global', 'Footprint'],
    icon: featureIcon('fea-small-icon01.svg'),
  },
  {
    id: 'singapore-roots',
    titleLines: ['Singapore Roots,', 'Global Reach'],
    icon: featureIcon('fea-small-icon02.svg'),
  },
  {
    id: 'client-centric',
    titleLines: ['Client-Centric', 'Approach'],
    icon: featureIcon('fea-small-icon03.svg'),
  },
];

/** Right column — rendered left-aligned, icon leading the title. */
export const rightFeatureHighlights: readonly FeatureHighlight[] = [
  {
    id: 'expert-team',
    titleLines: ['Expert Team of', 'Innovators'],
    icon: featureIcon('fea-small-icon04.svg'),
  },
  {
    id: 'full-stack',
    titleLines: ['Full-Stack', 'Innovation'],
    icon: featureIcon('fea-small-icon05.svg'),
  },
  {
    id: 'end-to-end',
    titleLines: ['End-to-End', 'Support'],
    icon: featureIcon('fea-small-icon06.svg'),
  },
];
