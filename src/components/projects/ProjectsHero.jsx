import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Award,
  CalendarCheck,
  Gauge,
  MapPin,
} from 'lucide-react'
import CountUp from '../shared/CountUp'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { end: 250, suffix: '+', label: 'Projects Delivered', Icon: CalendarCheck },
  { end: 18, suffix: '+', label: 'States Covered', Icon: MapPin },
  { end: 25, suffix: '+', label: 'Years of Expertise', Icon: Award },
  { end: 200, suffix: ' TPD', label: 'Production Capacity', Icon: Gauge },
]

/**
 * Projects hero — same full-bleed composition as IndustriesHero / AboutHero.
 * Only content, image, and the right-side stats card differ.
 */
export default function ProjectsHero() {
  const sectionRef = useRef(null)
  const copyRef = useRef(null)
  const mediaRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const copy = copyRef.current
    const media = mediaRef.current
    const card = cardRef.current

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([copy, media, card], { clearProps: 'all', opacity: 1, y: 0, x: 0 })
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

      gsap.fromTo(
        card,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.05, ease: 'power2.out', delay: 0.32 },
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

  const scrollToProjects = (e) => {
    e.preventDefault()
    const el = document.getElementById('featured-projects')
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Projects"
      className="relative isolate overflow-hidden bg-[#F4F8FC]"
      style={{ minHeight: 'max(47.5rem, 88vh)' }}
    >
      {/* Full-bleed hero media — same pattern as Industries / About */}
      <div
        ref={mediaRef}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <img
          src="/media/projects/polavaram-hero.png"
          alt=""
          className="absolute inset-0 h-full w-full max-w-none object-cover object-center lg:object-[center_45%]"
        />
        {/* Soft white dissolve — Industries overlay; slightly stronger for brighter dam photo */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                90deg,
                #F4F8FC 0%,
                #F4F8FC 24%,
                rgba(244, 248, 252, 0.78) 34%,
                rgba(244, 248, 252, 0.32) 44%,
                rgba(244, 248, 252, 0.08) 52%,
                transparent 60%
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
        className="relative z-10 mx-auto flex w-full max-w-[92rem] flex-col items-start gap-10 px-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pl-3 lg:pr-3 xl:pl-4 xl:pr-4"
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
            Projects
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
            Building India&apos;s
            <br />
            Infrastructure.
            <br />
            <span style={{ color: '#2495ff' }}>Together.</span>
          </h1>

          <p
            className="mt-7 max-w-[500px] text-[1.05rem] leading-[1.65] sm:mt-8 sm:text-[1.125rem]"
            style={{ color: '#6d7684' }}
          >
            Since 1999, Gee Cee has delivered construction chemical solutions engineered for
            durability, waterproofing, structural performance and long-term protection across
            India&apos;s most demanding infrastructure projects.
          </p>

          <a
            href="#featured-projects"
            onClick={scrollToProjects}
            className="group/cta mt-8 inline-flex w-fit cursor-pointer items-center gap-2 border-b border-transparent pb-0.5 transition-[color,border-color] duration-300 ease-out hover:border-[#2495ff]/45 hover:text-[#1D6FD0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:mt-9"
            style={{
              fontSize: '18px',
              fontWeight: 400,
              color: '#2495ff',
              letterSpacing: '-0.01em',
            }}
          >
            Explore Projects
            <ArrowRight
              aria-hidden="true"
              className="size-[1.125rem] shrink-0 transition-transform duration-300 ease-out group-hover/cta:translate-x-2"
            />
          </a>
        </div>

        {/* Right-side stats — anchored in the same content shell as Industries */}
        <div
          ref={cardRef}
          className="relative z-20 w-full max-w-[320px] pb-12 lg:ml-auto lg:pb-10 lg:pt-8 lg:self-center"
        >
          <div
            className="rounded-[1.75rem] border border-white/80 bg-white/95 backdrop-blur-md"
            style={{
              padding: '2rem',
              boxShadow:
                '0 20px 50px rgba(15, 23, 42, 0.12), 0 4px 16px rgba(15, 23, 42, 0.05)',
            }}
          >
            <ul className="flex flex-col">
              {STATS.map(({ end, suffix, label, Icon }, index) => (
                <li
                  key={label}
                  className={
                    index < STATS.length - 1 ? 'mb-5 border-b border-[#E8EDF5] pb-5' : ''
                  }
                >
                  <div className="flex items-start gap-3.5">
                    <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-soft">
                      <Icon
                        className="size-4 text-[#2495ff]"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>
                    <div className="min-w-0">
                      <p
                        className="font-display font-bold tracking-[-0.03em]"
                        style={{ fontSize: '1.65rem', lineHeight: 1.1, color: '#111827' }}
                      >
                        <CountUp
                          end={end}
                          suffix={suffix}
                          duration={1700}
                          delay={0.4 + index * 0.12}
                          aria-label={`${end}${suffix} ${label}`}
                        />
                      </p>
                      <p
                        className="mt-1 text-[0.8125rem] tracking-wide"
                        style={{ color: '#6B7280', fontWeight: 500 }}
                      >
                        {label}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
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
