import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Actual partner logo assets (cleaned, transparent PNGs).
 * Drop replacements into /public/media/partners/ using the same filenames.
 */
const PARTNERS = [
  {
    id: 'gammon',
    name: 'Gammon',
    src: '/media/partners/gammon.png',
    className: 'h-11 w-auto max-w-[6.5rem] sm:h-12 sm:max-w-[7.25rem]',
  },
  {
    id: 'lt',
    name: 'Larsen & Toubro',
    src: '/media/partners/larsen-toubro.png',
    className: 'h-14 w-auto max-w-[6.5rem] -translate-x-2 sm:h-16 sm:max-w-[7.25rem]',
  },
  {
    id: 'modi',
    name: 'Modi Builders',
    src: '/media/partners/modi-builders.png',
    className:
      'h-[3.25rem] w-auto max-w-[7.25rem] -translate-x-2 sm:h-14 sm:max-w-[7.75rem]',
  },
  {
    id: 'afcons',
    name: 'Afcons',
    src: '/media/partners/afcons.png',
    className: 'h-9 w-auto max-w-[8.5rem] -translate-x-2 sm:h-10 sm:max-w-[9.5rem]',
  },
  {
    id: 'gayatri',
    name: 'Gayatri Projects',
    src: '/media/partners/gayatri.png',
    className:
      'h-[3.25rem] w-auto max-w-[6.75rem] -translate-x-2 sm:h-14 sm:max-w-[7.25rem]',
  },
  {
    id: 'sew',
    name: 'SEW Constructions',
    src: '/media/partners/sew.png',
    className: 'h-10 w-auto max-w-[5.5rem] -translate-x-2 sm:h-11 sm:max-w-[6rem]',
  },
  {
    id: 'gkc',
    name: 'GKC',
    src: '/media/partners/gkc.png',
    className: 'h-8 w-auto max-w-[7.5rem] -translate-x-2 sm:h-9 sm:max-w-[8.5rem]',
  },
]

/**
 * Trusted By Industry Leaders — Projects page section below Our Reach.
 */
export default function TrustedByLeaders() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headingRef = useRef(null)
  const logosRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const eyebrow = eyebrowRef.current
    const heading = headingRef.current
    const logos = logosRef.current?.querySelectorAll('[data-partner-logo]')

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([eyebrow, heading, logos], { clearProps: 'all', opacity: 1, y: 0 })
        return
      }

      const ease = 'power2.out'
      const trigger = { trigger: root, start: 'top 78%', once: true }

      gsap.fromTo(
        eyebrow,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease, scrollTrigger: trigger },
      )

      gsap.fromTo(
        heading,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease,
          delay: 0.08,
          scrollTrigger: trigger,
        },
      )

      if (logos?.length) {
        gsap.fromTo(
          logos,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease,
            stagger: 0.07,
            delay: 0.16,
            scrollTrigger: trigger,
          },
        )
      }
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="trusted-by-leaders"
      aria-labelledby="trusted-by-leaders-heading"
      className="bg-white"
      style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}
    >
      <div className="mx-auto w-full max-w-[min(100%,96rem)] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 xl:gap-16">
          <div className="min-w-0 shrink-0 lg:max-w-[18rem] xl:max-w-[20rem]">
            <p
              ref={eyebrowRef}
              className="text-[0.75rem] font-semibold uppercase tracking-[0.18em]"
              style={{ color: '#2495ff' }}
            >
              Trusted by Industry Leaders
            </p>
            <h2
              ref={headingRef}
              id="trusted-by-leaders-heading"
              className="font-display mt-4 max-w-[12ch] font-bold tracking-[-0.035em] text-[#101722]"
              style={{
                fontSize: 'clamp(1.85rem, 1.4rem + 1.4vw, 2.75rem)',
                lineHeight: 1.15,
                fontWeight: 700,
              }}
            >
              Partnering with the best.
            </h2>
          </div>

          <div className="min-w-0 flex-1">
            <ul
              ref={logosRef}
              aria-label="Trusted industry partners"
              className="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-9 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-10 md:grid-cols-4 lg:flex lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-5 lg:gap-y-8 xl:gap-x-6"
            >
              {PARTNERS.map((partner) => (
                <li
                  key={partner.id}
                  data-partner-logo
                  className="flex min-h-[3.75rem] items-center justify-center lg:min-h-[4.25rem]"
                >
                  <img
                    src={partner.src}
                    alt={partner.name}
                    className={`object-contain object-center ${partner.className}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
