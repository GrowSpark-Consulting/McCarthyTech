import { AgencyButton } from '@/components/ui/agency-button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export function CareersGallery() {
  const galleryVideos = [
    { src: '/assets/img/video-assets/mobile-apps.mp4', label: 'Mobile Apps' },
    { src: '/assets/img/video-assets/web-dev.mp4', label: 'Web Development' },
    { src: '/assets/img/video-assets/ui-ux-design.mp4', label: 'UI/UX Design' },
    { src: '/assets/img/video-assets/digital.mp4', label: 'Digital Marketing' },
    { src: '/assets/img/video-assets/ai-main.mp4', label: 'AI Solutions' },
  ] as const;

  return (
    <section className="py-[120px] max-bs-md:py-[80px]">
      <Container>
        {/* Videos Grid */}
        <div
          className={cn(
            'mb-[60px] grid grid-cols-5 gap-[18px]',
            'max-bs-xs:grid-cols-1 max-bs-lg:grid-cols-3 max-bs-sm:grid-cols-2',
          )}
        >
          {galleryVideos.map((video, idx) => (
            <div
              key={idx}
              className={cn(
                'relative w-full overflow-hidden rounded-[10px]',
                'aspect-[3/4.5] border border-white/[0.06] bg-ink/40',
                'transition-all duration-500 hover:scale-[1.02] hover:border-mint/30',
              )}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                src={video.src}
                className="h-full w-full object-cover"
                aria-label={video.label}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Button Section */}
        <div className="flex justify-center">
          <AgencyButton href="/contact" label="Begin Today with us" className="self-center" />
        </div>
      </Container>
    </section>
  );
}
