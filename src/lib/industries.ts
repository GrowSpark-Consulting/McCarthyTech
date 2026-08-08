import type { ImageAsset } from '@/types/media';
import type { ServedIndustry, StreamRow } from '@/types/industries';

/** Shared intrinsic size of the industry glyphs. */
const INDUSTRY_ICON_SIZE = 52;

function industryIcon(file: string): ImageAsset {
  return {
    src: `/assets/img/icon/${file}`,
    alt: '',
    width: INDUSTRY_ICON_SIZE,
    height: INDUSTRY_ICON_SIZE,
  };
}

/** Copy for the AI stream section. */
export const aiStreamContent = {
  eyebrow: 'Professional & Trust-Building',
  heading: 'Real-time AI for smarter business',
  /** Announced in place of the decorative traffic simulation. */
  accessibleLabel: 'Illustration of live API traffic',
} as const;

/** Copy for the industries-served section. */
export const industriesServedContent = {
  id: 'industries-served',
  eyebrow: 'Industries Served',
  heading: 'Industries We Are Serving',
  accessibleLabel: 'Industries Grow Spark serves',
} as const;

/**
 * The five scrolling rows, transcribed from the live page.
 *
 * Rows 1-3 are API traffic; rows 4-5 are company stats reusing the same pill
 * shape. Each row carries its own pace and direction — the mismatch is what
 * stops the five columns reading as one moving block.
 */
export const streamRows: readonly StreamRow[] = [
  {
    id: 'traffic-a',
    animationClass: 'animate-stream-1',
    entries: [
      {
        label: 'POST',
        value: '201',
        text: '/ai/inference',
        latencyMs: 187,
        tone: 'mint',
        isLive: true,
      },
      { label: 'GET', value: '200', text: '/models/registry', latencyMs: 193, tone: 'mint' },
      { label: 'PATCH', value: '200', text: '/pipeline/retrain', latencyMs: 133, tone: 'mint' },
      { label: 'DELETE', value: '204', text: '/cache/purge', latencyMs: 52, tone: 'danger' },
      { label: 'POST', value: '202', text: '/jobs/enqueue', latencyMs: 146, tone: 'mint' },
      { label: 'GET', value: '200', text: '/vision/detect', latencyMs: 172, tone: 'mint' },
      { label: 'POST', value: '201', text: '/chatbot/reply', latencyMs: 63, tone: 'mint' },
      {
        label: 'GET',
        value: '200',
        text: '/health/uptime',
        latencyMs: 106,
        tone: 'mint',
        isLive: true,
      },
    ],
  },
  {
    id: 'traffic-b',
    animationClass: 'animate-stream-2',
    entries: [
      {
        label: 'GET',
        value: '200',
        text: '/analytics/stream',
        latencyMs: 195,
        tone: 'mint',
        isLive: true,
      },
      { label: 'POST', value: '201', text: '/nlp/classify', latencyMs: 180, tone: 'mint' },
      { label: 'PUT', value: '200', text: '/deploy/rollout', latencyMs: 196, tone: 'mint' },
      { label: 'DELETE', value: '204', text: '/session/expire', latencyMs: 41, tone: 'danger' },
      { label: 'POST', value: '201', text: '/ocr/extract', latencyMs: 146, tone: 'mint' },
      { label: 'GET', value: '200', text: '/metrics/live', latencyMs: 185, tone: 'mint' },
      { label: 'PATCH', value: '200', text: '/model/finetune', latencyMs: 185, tone: 'mint' },
      { label: 'GET', value: '200', text: '/status/healthy', latencyMs: 176, tone: 'mint' },
    ],
  },
  {
    id: 'traffic-c',
    animationClass: 'animate-stream-3',
    entries: [
      { label: 'POST', value: '201', text: '/agents/dispatch', latencyMs: 182, tone: 'mint' },
      { label: 'GET', value: '200', text: '/embeddings/query', latencyMs: 166, tone: 'mint' },
      {
        label: 'POST',
        value: '200',
        text: '/rag/retrieve',
        latencyMs: 52,
        tone: 'mint',
        isLive: true,
      },
      { label: 'DELETE', value: '204', text: '/tokens/revoke', latencyMs: 165, tone: 'danger' },
      { label: 'GET', value: '200', text: '/webhooks/emit', latencyMs: 197, tone: 'mint' },
      { label: 'PUT', value: '200', text: '/config/publish', latencyMs: 198, tone: 'mint' },
      { label: 'POST', value: '202', text: '/batch/process', latencyMs: 126, tone: 'mint' },
      { label: 'GET', value: '200', text: '/gpu/utilisation', latencyMs: 108, tone: 'mint' },
    ],
  },
  {
    id: 'stats-a',
    animationClass: 'animate-stream-4',
    entries: [
      {
        label: 'Trusted',
        value: '30+',
        text: 'Projects Delivered Globally',
        latencyMs: 96,
        tone: 'mint',
      },
      { label: 'Active', value: '12+', text: 'Countries Served', latencyMs: 191, tone: 'mint' },
      { label: 'Expert', value: '50+', text: 'Skilled Developers', latencyMs: 194, tone: 'mint' },
      {
        label: 'Uptime',
        value: '99.9%',
        text: 'Service Availability',
        latencyMs: 93,
        tone: 'mint',
        isLive: true,
      },
    ],
  },
  {
    id: 'stats-b',
    animationClass: 'animate-stream-5',
    entries: [
      { label: 'Growth', value: '100%', text: 'Client Satisfaction', latencyMs: 138, tone: 'mint' },
      {
        label: 'Support',
        value: '24/7',
        text: 'Monitoring & Response',
        latencyMs: 197,
        tone: 'mint',
        isLive: true,
      },
      {
        label: 'Delivery',
        value: '4x',
        text: 'Faster Time-to-Market',
        latencyMs: 196,
        tone: 'mint',
      },
      { label: 'Secure', value: 'SOC2', text: 'Grade Data Handling', latencyMs: 19, tone: 'mint' },
    ],
  },
];
/** The seven industry cards, in strip order. */
export const servedIndustries: readonly ServedIndustry[] = [
  { id: 'education', title: 'Education', icon: industryIcon('service-icon01.svg') },
  { id: 'logistics', title: 'Logistics', icon: industryIcon('service-icon02.svg') },
  { id: 'marketing', title: 'Marketing', icon: industryIcon('service-icon03.svg') },
  { id: 'healthcare', title: 'Healthcare', icon: industryIcon('service-icon04.svg') },
  { id: 'finance', title: 'Finance', icon: industryIcon('service-icon05.svg') },
  { id: 'manufacturing', title: 'Manufacturing', icon: industryIcon('service-icon06.svg') },
  { id: 'ecommerce', title: 'E-commerce', icon: industryIcon('service-icon07.svg') },
];
