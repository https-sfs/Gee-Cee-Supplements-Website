import { Phone } from 'lucide-react'
import Reveal from '../shared/Reveal'

const PHONE_DISPLAY = '+91 98499 90061'
const PHONE_HREF = 'tel:+919849990061'
const ENQUIRY_HREF = 'mailto:info@geeceechem.com?subject=Project%20Enquiry'

export default function HomeCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="relative isolate min-h-[min(92vh,52rem)] overflow-hidden"
    >
      <img
        src="/media/cta/macro-chemistry.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover object-[72%_center]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(6, 12, 28, 0.88) 0%,
              rgba(8, 16, 36, 0.78) 28%,
              rgba(10, 22, 48, 0.48) 52%,
              rgba(12, 28, 56, 0.18) 72%,
              rgba(12, 28, 56, 0.04) 100%
            ),
            linear-gradient(
              180deg,
              rgba(4, 8, 20, 0.35) 0%,
              transparent 28%,
              transparent 72%,
              rgba(4, 8, 20, 0.45) 100%
            )
          `,
        }}
      />

      <div className="shell relative flex min-h-[min(92vh,52rem)] items-center py-24 lg:py-32">
        <div className="max-w-xl lg:max-w-2xl">
          <Reveal>
            <p className="mb-6 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#7eb6ff]">
              Engineered for Long-Term Performance
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h2
              id="cta-heading"
              className="font-display text-[clamp(2.25rem,1.1rem+3.8vw,4rem)] font-semibold tracking-[-0.04em] text-white"
              style={{
                lineHeight: 1.08,
                textWrap: 'unset',
                whiteSpace: 'pre-line',
              }}
            >
              {'Every project starts\nwith the right foundation.'}
            </h2>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-[34rem] text-[1.05rem] leading-[1.7] text-white/72 sm:mt-8 sm:text-[1.15rem] sm:leading-[1.65]">
              From waterproofing and repair systems to high-performance
              admixtures, we help engineers and contractors build structures
              that last.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-col gap-4 sm:mt-11 sm:flex-row sm:items-center sm:gap-4">
            <Reveal delay={280}>
              <a
                href={ENQUIRY_HREF}
                className="inline-flex h-[3.75rem] items-center justify-center rounded-full bg-primary px-9 text-[1rem] font-medium text-primary-foreground shadow-[0_8px_28px_rgba(59,130,246,0.35)] transition-all duration-500 [transition-timing-function:var(--ease-cine)] hover:-translate-y-[3px] hover:bg-[#4d8ff0] hover:shadow-[0_14px_36px_rgba(59,130,246,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Start an Enquiry
              </a>
            </Reveal>

            <Reveal delay={380}>
              <a
                href={PHONE_HREF}
                className="group inline-flex h-[3.75rem] items-center justify-center gap-2.5 rounded-full border border-white/35 bg-white/10 px-8 text-[1rem] font-medium text-white backdrop-blur-sm transition-all duration-500 [transition-timing-function:var(--ease-cine)] hover:-translate-y-[3px] hover:border-white/70 hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <Phone
                  aria-hidden="true"
                  className="size-[1.05rem] text-white/85 transition-colors duration-500 group-hover:text-white"
                />
                Call {PHONE_DISPLAY}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
