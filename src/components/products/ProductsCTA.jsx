import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Phone } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PHONE_DISPLAY = '+91 98499 90061'
const PHONE_HREF = 'tel:+919849990061'
const ENQUIRY_HREF =
  'mailto:info@geeceechem.com?subject=Technical%20Data%20Sheet%20Request'

const TRUST_POINTS = [
  'Latest TDS',
  'Dosage Guidance',
  'Product Recommendation',
  'Fast Response',
]

export default function ProductsCTA() {
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
      const ease = 'power2.out'

      gsap.fromTo(
        eyebrow,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease, scrollTrigger: trigger },
      )

      gsap.fromTo(
        heading,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease,
          delay: 0.08,
          scrollTrigger: trigger,
        },
      )

      gsap.fromTo(
        body,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease,
          delay: 0.16,
          scrollTrigger: trigger,
        },
      )

      if (trustItems?.length) {
        gsap.fromTo(
          trustItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease,
            stagger: 0.07,
            delay: 0.22,
            scrollTrigger: trigger,
          },
        )
      }

      if (buttons?.length) {
        gsap.fromTo(
          buttons,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease,
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
      aria-labelledby="products-cta-heading"
      className="relative overflow-hidden bg-white"
      style={{ paddingTop: '7.5rem', paddingBottom: '8.75rem' }}
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

      {/* Subtle engineering grid — ~3–4% behind heading */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
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

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center px-4 text-center sm:px-5">
        <p
          ref={eyebrowRef}
          className="text-[0.75rem] font-semibold uppercase tracking-[0.18em]"
          style={{ color: '#2495ff' }}
        >
          Technical Support
        </p>

        <h2
          ref={headingRef}
          id="products-cta-heading"
          className="font-display max-w-[16ch] font-bold tracking-[-0.045em]"
          style={{
            marginTop: '1.625rem',
            fontSize: 'clamp(2.5rem, 1.5rem + 3vw, 4.75rem)',
            fontWeight: 700,
            lineHeight: 0.92,
          }}
        >
          <span style={{ color: '#101722' }}>Need the right</span>
          <br />
          <span style={{ color: '#2495ff' }}>technical data sheet</span>
          <br />
          <span style={{ color: '#101722' }}>for your project?</span>
        </h2>

        <p
          ref={bodyRef}
          className="max-w-[760px] text-[1.125rem] leading-[1.7] sm:text-[1.25rem] sm:leading-[1.65] lg:text-[1.375rem] lg:leading-[1.6]"
          style={{ color: '#5F6B7A', marginTop: '2.125rem' }}
        >
          Tell us the product name, application and project requirements.
          <br className="hidden sm:block" />
          Our engineering team will send the latest Technical Data Sheet, dosage recommendations
          and pricing suited to your required quantity.
        </p>

        <ul
          ref={trustRef}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7"
          style={{ marginTop: '2.125rem' }}
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
          style={{ marginTop: '2.625rem' }}
        >
          <a
            data-cta-btn
            href={ENQUIRY_HREF}
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-9 text-[0.95rem] font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-500 [transition-timing-function:var(--ease-cine)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-float-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:h-[3.25rem]"
          >
            Start an Enquiry
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
