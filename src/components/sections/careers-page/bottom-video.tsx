import { Container } from '@/components/ui/container';

export function BottomVideo() {
  return (
    <section className="bg-ink py-[60px] max-bs-md:py-[40px]">
      <Container>
        <div className="relative aspect-video w-full overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02] shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
          <video
            src="https://www.pexels.com/download/video/7693469/"
            loop
            muted
            playsInline
            autoPlay
            poster="/assets/img/career/img06.jpg"
            className="h-full w-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
