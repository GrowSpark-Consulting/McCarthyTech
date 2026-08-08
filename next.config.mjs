/**
 * Next.js configuration.
 *
 * - `images`: modern formats first (AVIF then WebP) so `next/image` serves the
 *   smallest payload the browser accepts. Device sizes mirror the project's
 *   responsive breakpoints so no oversized candidate is ever generated.
 * - `headers`: long-lived immutable caching for the static media in `public/assets`,
 *   which is content-addressed by filename and never mutated after deploy.
 * - `poweredByHeader` is disabled to avoid leaking framework details.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 375, 425, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 24, 30, 32, 48, 64, 96, 128, 171, 256],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
