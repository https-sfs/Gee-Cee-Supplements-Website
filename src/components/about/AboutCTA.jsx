import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Phone } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PHONE_DISPLAY = '+91 98499 90061'
const PHONE_HREF = 'tel:+919849990061'
const CONSULT_HREF =
  'mailto:info@geeceechem.com?subject=Consultation%20Request%20%E2%80%94%20Gee%20Cee'

const TRUST_POINTS = [
  '25+ Years',
  'ISO Certified',
  '60+ Products',
  'Trusted Across 7 States',
]

export default function AboutCTA() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headingRef = useRef(null)
  const bodyRef = useRef(null)
  const trustRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const eyebrow = eyebrowRef.current
    const heading = headingRef.current
    const body = bodyRef.current
    const trustItems = trustRef.current?.querySelectorAll('[data-trust-item]')
    const buttons = buttonsRef.current?.querySelectorAll('[data-cta-btn]')

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([eyebrow, heading, body, trustItems, buttons], {
          clearProps: 'all',
          opacity: 1,
          y: 0,
        })
        return
      }

      const trigger = { trigger: root, start: 'top 78%' }

      gsap.fromTo(
        eyebrow,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', scrollTrigger: trigger },
      )

      gsap.fromTo(
        heading,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          delay: 0.08,
          scrollTrigger: trigger,
        },
      )

      gsap.fromTo(
        body,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.16,
          scrollTrigger: trigger,
        },
      )

      if (trustItems?.length) {
        gsap.fromTo(
          trustItems,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.07,
            delay: 0.22,
            scrollTrigger: trigger,
          },
        )
      }

      if (buttons?.length) {
        gsap.fromTo(
          buttons,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.1,
            delay: 0.3,
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
      id="contact"
      aria-labelledby="about-cta-heading"
      className="relative overflow-hidden bg-white"
      style={{ paddingTop: '10rem', paddingBottom: '10rem' }}
    >
      {/* Soft radial glow behind typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-[min(36rem,70vw)] w-[min(48rem,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(36, 149, 255, 0.07) 0%, rgba(36, 149, 255, 0.03) 42%, transparent 70%)',
        }}
      />

      {/* Subtle engineering grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,116,139,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,116,139,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)',
        }}
      />

      <div className="shell relative z-10 flex flex-col items-center text-center">
        <p
          ref={eyebrowRef}
          className="text-[0.75rem] font-semibold uppercase tracking-[0.18em]"
          style={{ color: '#2495ff' }}
        >
          Built on Trust. Proven on Site.
        </p>

        <h2
          ref={headingRef}
          id="about-cta-heading"
          className="font-display mt-7 max-w-[18ch] font-bold tracking-[-0.045em] sm:mt-8"
          style={{
            fontSize: 'clamp(2.75rem, 1.6rem + 3.2vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 0.98,
          }}
        >
          <span style={{ color: '#101722' }}>Let's build something</span>
          <br />
          <span style={{ color: '#2495ff' }}>that lasts.</span>
        </h2>

        <p
          ref={bodyRef}
          className="mt-9 max-w-[720px] text-[1.25rem] leading-[1.65] sm:mt-9 sm:text-[1.375rem] sm:leading-[1.6]"
          style={{ color: '#5F6B7A', marginTop: '2.25rem' }}
        >
          Whether you're delivering residential, commercial or infrastructure projects, our
          engineering team is ready to help specify the right construction chemistry for
          long-term performance.
        </p>

        <ul
          ref={trustRef}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7"
          style={{ marginTop: '2rem' }}
        >
          {TRUST_POINTS.map((item) => (
            <li
              key={item}
              data-trust-item
              className="inline-flex items-center gap-1.5 text-[0.875rem]"
              style={{ color: '#6d7684' }}
            >
              <Check
                className="size-3.5 shrink-0 text-[#2495ff]"
                strokeWidth={2.4}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>

        <div
          ref={buttonsRef}
          className="flex flex-col items-center gap-3.5 sm:flex-row sm:gap-4"
          style={{ marginTop: '3rem' }}
        >
          <a
            data-cta-btn
            href={CONSULT_HREF}
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-9 text-[0.95rem] font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-500 [transition-timing-function:var(--ease-cine)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-float-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:h-[3.25rem]"
          >
            Request a Consultation
          </a>
          <a
            data-cta-btn
            href={PHONE_HREF}
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-primary/25 bg-transparent px-8 text-[0.95rem] font-medium text-blue-deep transition-all duration-500 [transition-timing-function:var(--ease-cine)] hover:-translate-y-0.5 hover:border-primary/45 hover:bg-blue-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:h-[3.25rem]"
          >
            <Phone aria-hidden="true" className="size-4 text-[#2495ff]" />
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  )
}
