import Image from 'next/image';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

export function ContactCard() {
  const { phone, email, address } = siteConfig.contact;

  return (
    <div className="mt-[50px] flex justify-center max-bs-md:mt-10">
      <div
        className={cn(
          'group w-full max-w-[390px] overflow-hidden rounded-[10px] border border-white/[0.08] bg-white/[0.02]',
          'shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-mint/30 hover:bg-white/[0.04]',
        )}
      >
        {/* Photosphere streetview image preview */}
        <div className="relative aspect-[390/250] w-full overflow-hidden">
          <a
            href="https://www.google.com/local/place/fid/0x3b05dd2524ebd5e7:0x8365a3b1706d469a/photosphere?iu=https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid%3DMD1m3L8mp2X03HbXQ0xgiA%26cb_client%3Dsearch.gws-prod.gps%26yaw%3D160.32991%26pitch%3D0%26thumbfov%3D100%26w%3D0%26h%3D0&ik=CAISFk1EMW0zTDhtcDJYMDNIYlhRMHhnaUE%3D&sa=X&sqi=2&ved=2ahUKEwiKrfzg0rWSAxXGTGwGHZqDOSgQpx96BAgaEBI"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block h-full w-full"
          >
            <Image
              src="/assets/img/contact/360-view.jpg"
              alt="Nilamel 360 View"
              width={390}
              height={250}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay indicator */}
            <div className="absolute inset-0 bg-ink/10 transition-colors duration-300 group-hover:bg-ink/0" />
          </a>
        </div>

        {/* Info detail holder */}
        <div className="max-bs-xs:p-6 p-8 text-left">
          <p className="mb-2 font-heading text-lg font-bold tracking-wide text-white">
            {address.street}, {address.locality} {address.postalCode}
          </p>
          <a
            href={`tel:${phone}`}
            className="mb-1 block text-base text-subtle transition-colors duration-300 hover:text-mint"
          >
            {phone}
          </a>
          <a
            href={`mailto:${email}`}
            className="mb-8 block text-base text-subtle transition-colors duration-300 hover:text-mint"
          >
            {email}
          </a>

          {/* VIEW LOCATION custom sliding arrow button */}
          <a
            href={siteConfig.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group/btn inline-flex items-center gap-2.5 rounded-cta border border-white/20 px-6 py-3.5',
              'text-xs font-bold uppercase text-white transition-all duration-300',
              'select-none hover:border-lime hover:bg-lime hover:text-ink',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
            )}
          >
            View Location
            <span className="relative size-4 shrink-0 overflow-hidden">
              {/* White arrow (resting) */}
              <Image
                src="/assets/img/icon/rotate-arrow-white02.svg"
                alt="arrow"
                width={16}
                height={16}
                className="absolute inset-0 size-full transition-transform duration-300 group-hover/btn:-translate-y-4 group-hover/btn:translate-x-4"
              />
              {/* Black arrow (hover) */}
              <Image
                src="/assets/img/icon/rotate-arrow-black03.svg"
                alt="arrow"
                width={16}
                height={16}
                className="absolute inset-0 size-full -translate-x-4 translate-y-4 transition-transform duration-300 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 group-hover/btn:delay-75"
              />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
