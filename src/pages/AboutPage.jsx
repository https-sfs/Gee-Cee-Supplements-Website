import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Beaker,
  Building2,
  Calendar,
  ClipboardCheck,
  Factory,
  FlaskConical,
  HardHat,
  Microscope,
  ShieldCheck,
  Users,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import AboutCTA from '../components/about/AboutCTA'
import Footer from '../components/Footer'
import Reveal from '../components/shared/Reveal'
import IndiaMap from '../components/about/IndiaMap'
import { about } from '../data/about'

gsap.registerPlugin(ScrollTrigger)

const iconMap = {
  Calendar,
  Factory,
  Building2,
  FlaskConical,
  HardHat,
  ShieldCheck,
  Users,
  Beaker,
  Microscope,
  ClipboardCheck,
}

function Icon({ name, className, strokeWidth = 1.5 }) {
  const Comp = iconMap[name] || Building2
  return <Comp className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}

function AboutHero() {
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

  return (
    <section
      ref={sectionRef}
      aria-label="About Gee Cee"
      className="relative isolate overflow-hidden bg-[#F4F8FC]"
      style={{ minHeight: 'max(47.5rem, 88vh)' }}
    >
      {/* Editorial bleed media — not constrained to shell; not a card */}
      <div
        ref={mediaRef}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <img
          src="/media/about/hero-bridge.png"
          alt=""
          className="absolute inset-0 h-full w-full max-w-none object-cover object-[58%_42%] lg:object-[62%_40%]"
        />
        {/* Soft white dissolve: text zone stays clean; bridge reads from ~36% */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                90deg,
                #F4F8FC 0%,
                #F4F8FC 28%,
                rgba(244, 248, 252, 0.88) 34%,
                rgba(244, 248, 252, 0.42) 42%,
                rgba(244, 248, 252, 0.08) 50%,
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
        className="shell relative z-10 flex items-start lg:items-center"
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
            About Gee Cee
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
            Twenty-five years of getting the invisible right.
          </h1>

          <p
            className="mt-7 max-w-[420px] text-[1.05rem] leading-[1.65] sm:mt-8 sm:text-[1.125rem]"
            style={{ color: '#6d7684' }}
          >
            Construction chemicals manufactured in Andhra Pradesh, trusted across
            India's infrastructure since 1999.
          </p>
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

function AboutStory() {
  const { story, stats } = about
  const sectionRef = useRef(null)
  const stripRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cells = stripRef.current?.querySelectorAll('[data-stat]')
    if (!cells?.length) return

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(cells, { clearProps: 'all', opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        cells,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: stripRef.current,
            start: 'top 88%',
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-y bg-white">
      <div className="shell grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
        <Reveal>
          <p
            className="mb-5 text-[0.75rem] font-medium uppercase tracking-[0.22em]"
            style={{ color: '#2495ff' }}
          >
            {story.kicker}
          </p>
          <h2
            className="font-display max-w-[560px] font-bold tracking-[-0.035em]"
            style={{
              color: '#101722',
              fontSize: 'clamp(2.15rem, 1.35rem + 1.8vw, 3.5rem)',
              lineHeight: 1.05,
              whiteSpace: 'pre-line',
            }}
          >
            {story.titleLines.join('\n')}
          </h2>
          <div className="mt-8 max-w-[560px] space-y-5">
            {story.paragraphs.map((p) => (
              <p
                key={p.slice(0, 28)}
                className="text-[1.05rem] leading-[1.75]"
                style={{ color: '#6d7684' }}
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <div ref={stripRef} className="relative w-full self-center">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {stats.map((stat) => (
              <li
                key={stat.label}
                data-stat
                className="about-panel group flex min-h-[170px] flex-col justify-between px-7 py-6 sm:min-h-[175px] sm:px-8 sm:py-7"
              >
                <Icon name={stat.icon} className="relative size-7 text-[#2495ff]" strokeWidth={1.5} />
                <div className="relative mt-auto pt-6">
                  <p
                    className="font-display font-bold tracking-[-0.04em]"
                    style={{
                      color: '#101722',
                      fontSize: 'clamp(3rem, 2.4rem + 1.2vw, 3.75rem)',
                      lineHeight: 0.95,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-2.5 max-w-[140px] text-[0.9375rem] leading-[1.4]"
                    style={{ color: '#6d7684' }}
                  >
                    {stat.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function AboutPurpose() {
  const { purpose } = about
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
        gsap.set([copy, media], { clearProps: 'all', opacity: 1, y: 0, scale: 1 })
        return
      }

      gsap.fromTo(
        copy,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 78%' },
        },
      )

      gsap.fromTo(
        media,
        { opacity: 0, scale: 1.03 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: 'power2.out',
          delay: 0.08,
          scrollTrigger: { trigger: root, start: 'top 78%' },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Our Purpose"
      className="relative isolate overflow-hidden bg-white lg:min-h-[clamp(33.75rem,58vh,36.25rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background: `
            radial-gradient(90% 60% at 12% 0%, rgba(91, 156, 245, 0.1) 0%, transparent 55%),
            linear-gradient(180deg, #F7FBFF 0%, #FFFFFF 42%, #FFFFFF 100%)
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,116,139,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,116,139,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          maskImage: 'linear-gradient(90deg, black 0%, black 38%, transparent 72%)',
          WebkitMaskImage: 'linear-gradient(90deg, black 0%, black 38%, transparent 72%)',
        }}
      />

      {/* Desktop: bleed photograph from ~38% to viewport edge */}
      <div
        ref={mediaRef}
        className="pointer-events-none absolute inset-y-0 right-0 left-[38%] z-0 hidden lg:block"
        aria-hidden="true"
      >
        <div className="relative h-full w-full overflow-hidden rounded-r-[1rem]">
          <img
            src="/media/about/purpose-site.png"
            alt=""
            className="absolute inset-0 h-full w-full max-w-none object-cover object-[58%_42%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  90deg,
                  #FFFFFF 0%,
                  rgba(255,255,255,0.96) 8%,
                  rgba(255,255,255,0.72) 18%,
                  rgba(255,255,255,0.32) 30%,
                  rgba(255,255,255,0.08) 40%,
                  transparent 52%
                )
              `,
            }}
          />
        </div>
      </div>

      <div className="shell relative z-10 flex items-center max-lg:pt-14 max-lg:pb-6 lg:min-h-[clamp(33.75rem,58vh,36.25rem)]">
        <div
          ref={copyRef}
          className="relative z-20 w-full max-w-[460px] py-14 lg:w-[min(40%,28rem)] lg:py-10"
        >
          <p
            className="mb-5 text-[0.75rem] font-medium uppercase tracking-[0.18em]"
            style={{ color: '#2495ff' }}
          >
            {purpose.kicker}
          </p>
          <h2
            className="font-display font-bold tracking-[-0.035em]"
            style={{
              color: '#101722',
              fontSize: 'clamp(2.15rem, 1.2rem + 2vw, 3.5rem)',
              lineHeight: 1.05,
              whiteSpace: 'pre-line',
            }}
          >
            {purpose.titleLines.join('\n')}
          </h2>
          <div className="mt-8 space-y-5">
            {purpose.paragraphs.map((p) => (
              <p
                key={p.slice(0, 32)}
                className="text-[1.05rem] leading-[1.7]"
                style={{ color: '#5F6B7A' }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet / mobile: image below text */}
      <div className="relative z-10 px-6 pb-14 sm:px-8 lg:hidden">
        <div className="relative mx-auto aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-[1rem]">
          <img
            src="/media/about/purpose-site.png"
            alt="Gee Cee site engineers overlooking an active construction structure"
            className="absolute inset-0 size-full object-cover object-[62%_center]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 28%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}

function AboutTimeline() {
  const { timeline } = about
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const line = lineRef.current
      const dots = root.querySelectorAll('[data-milestone-dot]')
      const cards = root.querySelectorAll('[data-milestone-card]')

      if (reduced) {
        gsap.set([line, dots, cards], { clearProps: 'all', opacity: 1, scaleX: 1, scale: 1 })
        return
      }

      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'power2.out',
            duration: 1.4,
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: root,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      }

      gsap.fromTo(
        dots,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: root,
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      gsap.fromTo(
        cards,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-y bg-white">
      <div className="shell">
        <Reveal>
          <p className="kicker mb-5">Milestones</p>
          <h2 className="font-display text-[clamp(1.9rem,1rem+2.4vw,3rem)] font-semibold tracking-[-0.035em] text-foreground">
            How we got here.
          </h2>
        </Reveal>

        <div className="mt-14 -mx-6 overflow-x-auto px-6 pb-4 lg:mx-0 lg:overflow-visible lg:px-0">
          <div className="relative min-w-[52rem] lg:min-w-0">
            <div className="relative mb-10 flex justify-between px-3">
              <div
                ref={lineRef}
                className="absolute top-1/2 right-3 left-3 h-px origin-left bg-primary/35"
              />
              {timeline.map((item) => (
                <div key={item.year} className="relative z-10 flex flex-col items-center">
                  <span className="mb-3 text-xs font-semibold tracking-[0.14em] text-primary">
                    {item.year}
                  </span>
                  <span
                    data-milestone-dot
                    className="size-3 rounded-full border-2 border-primary bg-white shadow-[0_0_0_4px_rgba(91,156,245,0.15)]"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-6 gap-4">
              {timeline.map((item) => (
                <article
                  key={item.year}
                  data-milestone-card
                  className="rounded-2xl border border-[#E8EDF5] bg-white p-4 shadow-[var(--shadow-soft)] opacity-0"
                >
                  <h3 className="font-display text-sm font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutTrust() {
  const { trust } = about
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const header = headerRef.current
    const cards = cardsRef.current?.querySelectorAll('[data-trust-card]')

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([header, cards], { clearProps: 'all', opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        header,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 78%' },
        },
      )

      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: { trigger: root, start: 'top 78%' },
          },
        )
      }
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Why engineers trust Gee Cee"
      className="relative overflow-hidden bg-white"
      style={{ paddingTop: '4.75rem', paddingBottom: '4.75rem' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          background: `
            radial-gradient(85% 55% at 12% 0%, rgba(91, 156, 245, 0.08) 0%, transparent 55%),
            linear-gradient(180deg, #F7FBFF 0%, #FFFFFF 48%, #FFFFFF 100%)
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,116,139,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,116,139,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="shell relative z-10">
        <div ref={headerRef} className="max-w-[760px]">
          <p
            className="mb-4 text-[0.75rem] font-semibold uppercase tracking-[0.18em]"
            style={{ color: '#2495ff' }}
          >
            {trust.kicker}
          </p>
          <h2
            className="font-display font-bold tracking-[-0.04em]"
            style={{
              color: '#101722',
              fontSize: 'clamp(2rem, 1.35rem + 1.35vw, 3.125rem)',
              fontWeight: 700,
              lineHeight: 0.95,
              whiteSpace: 'pre-line',
            }}
          >
            {trust.titleLines.join('\n')}
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="mt-8 grid grid-cols-1 gap-7 sm:mt-9 sm:grid-cols-2 sm:gap-8"
        >
          {trust.items.map((item) => (
            <article
              key={item.title}
              data-trust-card
              className="about-panel flex min-h-[190px] flex-col p-6 sm:min-h-[200px] sm:p-7"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(91,156,245,0.07) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(91,156,245,0.07) 1px, transparent 1px)
                  `,
                  backgroundSize: '22px 22px',
                  maskImage: 'radial-gradient(ellipse at 20% 0%, black 15%, transparent 70%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse at 20% 0%, black 15%, transparent 70%)',
                }}
              />
              <Icon
                name={item.icon}
                className="relative size-8 text-[#2495ff]"
                strokeWidth={1.5}
              />
              <h3
                className="font-display relative mt-4 font-bold tracking-[-0.03em]"
                style={{
                  color: '#101722',
                  fontSize: 'clamp(1.5rem, 1.35rem + 0.3vw, 1.75rem)',
                  lineHeight: 1.15,
                }}
              >
                {item.title}
              </h3>
              <p
                className="relative mt-4 max-w-[34rem] text-[1.0125rem] leading-[1.55]"
                style={{ color: '#6d7684' }}
              >
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutManufacturing() {
  const { manufacturing } = about
  const sectionRef = useRef(null)
  const copyRef = useRef(null)
  const mediaRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const copy = copyRef.current
    const frames = mediaRef.current?.querySelectorAll('[data-mfg-frame]')

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([copy, frames], { clearProps: 'all', opacity: 1, y: 0, scale: 1 })
        return
      }

      gsap.fromTo(
        copy,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 78%' },
        },
      )

      if (frames?.length) {
        gsap.fromTo(
          frames,
          { opacity: 0, scale: 1.02 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: { trigger: root, start: 'top 78%' },
          },
        )
      }
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Manufacturing and R&D"
      className="relative overflow-hidden bg-white"
      style={{ paddingTop: '7.25rem', paddingBottom: '7.25rem' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          background: `
            radial-gradient(85% 55% at 8% 0%, rgba(91, 156, 245, 0.09) 0%, transparent 55%),
            linear-gradient(180deg, #F7FBFF 0%, #FFFFFF 50%, #FFFFFF 100%)
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,116,139,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,116,139,0.055) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="shell relative z-10 grid items-start gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-14 xl:gap-16">
        <div ref={copyRef} className="min-w-0">
          <p
            className="mb-5 text-[0.75rem] font-semibold uppercase tracking-[0.18em]"
            style={{ color: '#2495ff' }}
          >
            {manufacturing.kicker}
          </p>
          <h2
            className="font-display font-bold tracking-[-0.035em]"
            style={{
              color: '#101722',
              fontSize: 'clamp(2.25rem, 1.35rem + 1.9vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 0.98,
              whiteSpace: 'pre-line',
            }}
          >
            {manufacturing.titleLines.join('\n')}
          </h2>
          <p
            className="mt-8 max-w-[450px] text-[1.0625rem] leading-[1.8] sm:text-[1.125rem]"
            style={{ color: '#5F6B7A' }}
          >
            {manufacturing.body}
          </p>

          <ul className="mt-10 flex w-full max-w-[450px] items-start justify-between gap-2 max-lg:grid max-lg:max-w-none max-lg:grid-cols-2 max-lg:gap-x-6 max-lg:gap-y-7 lg:max-w-none lg:gap-2">
            {manufacturing.features.map((feature) => (
              <li
                key={feature.label}
                className="flex min-w-0 flex-1 flex-col items-center text-center"
              >
                <Icon
                  name={feature.icon}
                  className="size-6 shrink-0 text-[#2495ff]"
                  strokeWidth={1.5}
                />
                <p
                  className="mt-2.5 text-[0.8125rem] font-medium leading-[1.35]"
                  style={{ color: '#6d7684', whiteSpace: 'pre-line' }}
                >
                  {feature.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div ref={mediaRef} className="grid w-full gap-[22px]">
          {manufacturing.images.map((item) => (
            <figure
              key={item.caption}
              data-mfg-frame
              className="relative h-[min(198px,48vw)] w-full overflow-hidden rounded-[16px] border border-[rgba(16,23,34,0.06)] sm:h-[198px]"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 size-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 0%, rgba(10,16,28,0.45) 100%)',
                }}
              />
              <figcaption className="absolute bottom-3.5 left-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white sm:bottom-4 sm:left-5">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
function AboutCertifications() {
  const { certifications } = about
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = cardsRef.current?.querySelectorAll('[data-cert-card]')
    if (!cards?.length) return

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(cards, { clearProps: 'all', opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        cards,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: { trigger: root, start: 'top 78%' },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Quality and Certification"
      className="relative overflow-hidden bg-white"
      style={{ paddingTop: '7.25rem', paddingBottom: '7.25rem' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          background: `
            radial-gradient(85% 55% at 8% 0%, rgba(91, 156, 245, 0.08) 0%, transparent 55%),
            linear-gradient(180deg, #F7FBFF 0%, #FFFFFF 48%, #FFFFFF 100%)
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,116,139,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,116,139,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="shell relative z-10">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] lg:gap-16">
          <div className="min-w-0">
            <p
              className="mb-5 text-[0.75rem] font-semibold uppercase tracking-[0.18em]"
              style={{ color: '#2495ff' }}
            >
              {certifications.kicker}
            </p>
            <h2
              className="font-display font-bold tracking-[-0.04em]"
              style={{
                color: '#101722',
                fontSize: 'clamp(2.35rem, 1.4rem + 2vw, 3.75rem)',
                fontWeight: 700,
                lineHeight: 0.95,
                whiteSpace: 'pre-line',
              }}
            >
              {certifications.titleLines.join('\n')}
            </h2>
          </div>
          <p
            className="max-w-[430px] text-[1.0625rem] leading-[1.8] sm:text-[1.125rem] lg:justify-self-end lg:pb-1"
            style={{ color: '#5F6B7A' }}
          >
            {certifications.body}
          </p>
        </div>

        <div
          ref={cardsRef}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
          {certifications.items.map((cert) => (
            <article
              key={cert.code}
              data-cert-card
              className="about-panel flex min-h-[170px] flex-col p-7 lg:min-h-[175px]"
            >
              <img
                src={cert.logo}
                alt=""
                className="h-11 w-auto max-w-[5.25rem] object-contain object-left"
              />
              <h3
                className="font-display mt-5 text-[1.125rem] font-bold tracking-[-0.02em]"
                style={{ color: '#101722' }}
              >
                {cert.code}
              </h3>
              <p
                className="mt-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em]"
                style={{ color: '#6d7684' }}
              >
                {cert.name}
              </p>
              <p className="mt-3 text-[0.8125rem] leading-[1.55]" style={{ color: '#6d7684' }}>
                {cert.note}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
function AboutPresence() {
  const { presence } = about
  const sectionRef = useRef(null)
  const copyRef = useRef(null)
  const mapRef = useRef(null)
  const cardRef = useRef(null)

  const leftStates = presence.states.slice(0, 4)
  const rightStates = presence.states.slice(4)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const copy = copyRef.current
    const map = mapRef.current
    const card = cardRef.current
    const markers = map?.querySelectorAll('[data-map-marker]')

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([copy, card], { clearProps: 'all', opacity: 1, y: 0 })
        gsap.set(map, { clearProps: 'all', opacity: 0.92, y: 0 })
        gsap.set(markers, { clearProps: 'all', opacity: 1 })
        return
      }

      gsap.fromTo(
        copy,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 78%' },
        },
      )

      gsap.fromTo(
        map,
        { opacity: 0, y: 8 },
        {
          opacity: 0.92,
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 78%' },
        },
      )

      if (markers?.length) {
        gsap.fromTo(
          markers,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.07,
            delay: 0.18,
            scrollTrigger: { trigger: root, start: 'top 78%' },
          },
        )
      }

      gsap.fromTo(
        card,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.12,
          scrollTrigger: { trigger: root, start: 'top 78%' },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Where Gee Cee lives"
      className="relative overflow-hidden bg-white"
      style={{
        paddingTop: '6.5rem',
        paddingBottom: '6.5rem',
        minHeight: 'clamp(26.25rem, 52vh, 28.75rem)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background: `
            radial-gradient(80% 55% at 50% 20%, rgba(91, 156, 245, 0.09) 0%, transparent 58%),
            linear-gradient(180deg, #F7FBFF 0%, #FFFFFF 55%, #FFFFFF 100%)
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,116,139,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,116,139,0.05) 1px, transparent 1px),
            repeating-linear-gradient(
              -32deg,
              transparent,
              transparent 46px,
              rgba(91, 156, 245, 0.035) 46px,
              rgba(91, 156, 245, 0.035) 47px
            )
          `,
          backgroundSize: '28px 28px, 28px 28px, auto',
        }}
      />

      {/* Editorial bleed map — geographic silhouette, not a card */}
      <div
        ref={mapRef}
        className="pointer-events-none absolute inset-y-0 left-[28%] right-[22%] z-0 hidden items-center justify-center lg:flex"
        aria-hidden="true"
        style={{ opacity: 0.92 }}
      >
        <div
          className="relative aspect-[667/777] w-[min(100%,34.5rem)]"
          style={{
            maskImage:
              'radial-gradient(ellipse 80% 74% at 50% 50%, black 48%, transparent 84%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 74% at 50% 50%, black 48%, transparent 84%)',
          }}
        >
          <IndiaMap className="h-full w-full" />
        </div>
      </div>

      <div className="shell relative z-10 grid items-start gap-12 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,0.45fr)_minmax(0,0.25fr)] lg:items-center lg:gap-8 xl:gap-10">
        <div ref={copyRef} className="relative z-20 min-w-0">
          <p
            className="mb-5 text-[0.75rem] font-semibold uppercase tracking-[0.18em]"
            style={{ color: '#2495ff' }}
          >
            {presence.kicker}
          </p>
          <h2
            className="font-display font-bold tracking-[-0.04em]"
            style={{
              color: '#101722',
              fontSize: 'clamp(2.35rem, 1.4rem + 2vw, 3.75rem)',
              fontWeight: 700,
              lineHeight: 0.95,
              whiteSpace: 'pre-line',
            }}
          >
            {presence.titleLines.join('\n')}
          </h2>

          <div className="mt-9 grid max-w-[22rem] grid-cols-2 gap-x-8 gap-y-3.5">
            <ul className="space-y-3.5">
              {leftStates.map((state) => (
                <li
                  key={state}
                  className="flex items-center gap-2.5 text-[0.9375rem]"
                  style={{ color: '#3d4654' }}
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-[#2495ff]" />
                  {state}
                </li>
              ))}
            </ul>
            <ul className="space-y-3.5">
              {rightStates.map((state) => (
                <li
                  key={state}
                  className="flex items-center gap-2.5 text-[0.9375rem]"
                  style={{ color: '#3d4654' }}
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-[#2495ff]" />
                  {state}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tablet / mobile map */}
        <div className="relative mx-auto w-full max-w-[34.5rem] lg:hidden" style={{ opacity: 0.9 }}>
          <div
            className="relative aspect-[667/777] w-full"
            style={{
              maskImage:
                'radial-gradient(ellipse 78% 72% at 50% 48%, black 45%, transparent 84%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 78% 72% at 50% 48%, black 45%, transparent 84%)',
            }}
          >
            <IndiaMap className="h-full w-full" />
          </div>
        </div>

        {/* Desktop spacer keeps grid rhythm while map bleeds behind */}
        <div className="hidden lg:block" aria-hidden="true" />

        <aside
          ref={cardRef}
          className="about-panel relative z-20 w-full max-w-[340px] justify-self-start p-8 lg:max-w-none lg:justify-self-end"
        >
          <Building2 className="size-7 text-[#2495ff]" strokeWidth={1.5} aria-hidden="true" />
          <h3
            className="font-display mt-6 font-bold tracking-[-0.03em]"
            style={{
              color: '#101722',
              fontSize: 'clamp(1.55rem, 1.25rem + 0.6vw, 2rem)',
              fontWeight: 700,
              lineHeight: 1.12,
              whiteSpace: 'pre-line',
            }}
          >
            {presence.feature.titleLines.join('\n')}
          </h3>
          <p
            className="mt-4 max-w-[260px] text-[0.9375rem] leading-[1.65]"
            style={{ color: '#6d7684' }}
          >
            {presence.feature.body}
          </p>
        </aside>
      </div>
    </section>
  )
}
export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutPurpose />
        <AboutTimeline />
        <AboutPresence />
        <AboutManufacturing />
        <AboutCertifications />
        <AboutTrust />
        <AboutCTA />
      </main>
      <Footer />
    </>
  )
}
