import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Industries hero — same full-bleed composition as AboutHero.
 * City image is the edge-to-edge background; copy sits in the left text zone.
 */
export default function IndustriesHero() {
  const sectionRef = useRef(null)
  const copyRef = useRef(null)
  const mediaRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const copy = copyRef.current
    const media = mediaRef.current

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([copy, media], { clearProps: 'all', opacity: 1, y: 0, x: 0 })
        return
      }

      gsap.fromTo(
        copy,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.05, ease: 'power2.out', delay: 0.08 },
      )

      gsap.fromTo(
        media,
        { x: 36, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.25, ease: 'power2.out', delay: 0.18 },
      )

      const img = media?.querySelector('img')
      if (img) {
        gsap.to(img, {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, root)

    return () => ctx.revert()
  }, [])

  const scrollToIndustries = (e) => {
    e.preventDefault()
    const el = document.getElementById('industries-listing')
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Industries we serve"
      className="relative isolate overflow-hidden bg-[#F4F8FC]"
      style={{ minHeight: 'max(47.5rem, 88vh)' }}
    >
      {/* Full-bleed hero media — not a card, not a split column */}
      <div
        ref={mediaRef}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <img
          src="/media/industries/hero.png"
          alt=""
          className="absolute inset-0 h-full w-full max-w-none object-cover object-[68%_42%] lg:object-[72%_40%]"
        />
        {/* Soft white dissolve — mirrors About; complements baked-in left fade */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                90deg,
                #F4F8FC 0%,
                #F4F8FC 22%,
                rgba(244, 248, 252, 0.72) 32%,
                rgba(244, 248, 252, 0.28) 42%,
                rgba(244, 248, 252, 0.06) 50%,
                transparent 58%
              ),
              linear-gradient(
                180deg,
                transparent 88%,
                rgba(244, 248, 252, 0.12) 93%,
                rgba(244, 248, 252, 0.45) 97%,
                #F4F8FC 100%
              )
            `,
          }}
        />
      </div>

      <div
        className="relative z-10 mx-auto flex w-full max-w-[92rem] items-start px-4 sm:px-5 lg:items-center lg:pl-3 lg:pr-4 xl:pl-4 xl:pr-6"
        style={{ minHeight: 'max(47.5rem, 88vh)' }}
      >
        <div
          ref={copyRef}
          className="relative z-20 w-full max-w-[520px] pt-[4.75rem] sm:pt-[5.5rem] lg:pt-8 lg:pb-10"
        >
          <p
            className="text-[0.75rem] font-medium uppercase tracking-[0.22em]"
            style={{ color: '#2495ff' }}
          >
            Industries We Serve
          </p>

          <h1
            className="font-display mt-6 max-w-[520px] font-black sm:mt-7"
            style={{
              color: '#101722',
              fontSize: 'clamp(3.25rem, 5vw, 4.6rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.05em',
              fontWeight: 900,
            }}
          >
            Engineered Solutions.
            <br />
            Built for <span style={{ color: '#2495ff' }}>Every Industry.</span>
          </h1>

          <p
            className="mt-7 max-w-[420px] text-[1.05rem] leading-[1.65] sm:mt-8 sm:text-[1.125rem]"
            style={{ color: '#6d7684' }}
          >
            From highways to high-rises, from water infrastructure to industrial plants, Gee
            Cee delivers construction chemical solutions engineered for strength, durability
            and long-term performance.
          </p>

          <a
            href="#industries-listing"
            onClick={scrollToIndustries}
            className="group/cta mt-8 inline-flex w-fit cursor-pointer items-center gap-2 border-b border-transparent pb-0.5 transition-[color,border-color] duration-300 ease-out hover:border-[#6d7684]/50 hover:text-[#4B5563] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:mt-9"
            style={{
              fontSize: '18px',
              fontWeight: 400,
              color: '#6d7684',
              letterSpacing: '-0.01em',
            }}
          >
            Explore Industries
            <ArrowRight
              aria-hidden="true"
              className="size-[1.125rem] shrink-0 transition-transform duration-300 ease-out group-hover/cta:translate-x-2"
            />
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] lg:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(244,248,252,0.92) 0%, rgba(244,248,252,0.62) 38%, rgba(244,248,252,0.18) 68%, transparent 100%)',
        }}
      />
    </section>
  )
}
