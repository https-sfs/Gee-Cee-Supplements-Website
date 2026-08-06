import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Minimal editorial bridge between Industries hero and the industry showcase.
 */
export default function IndustriesIntro() {
  const sectionRef = useRef(null)
  const copyRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const copy = copyRef.current

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(copy, { clearProps: 'all', opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        copy,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 80%',
            once: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Industries we support"
      className="relative bg-white"
      style={{ paddingTop: '5.625rem', paddingBottom: '5.625rem' }}
    >
      <div
        ref={copyRef}
        className="mx-auto flex w-full max-w-[950px] flex-col items-center px-4 text-center sm:px-5"
      >
        <p
          className="text-[0.75rem] font-medium uppercase tracking-[0.22em]"
          style={{ color: '#2495ff' }}
        >
          Industries We Support
        </p>

        <div
          className="mt-6 w-full max-w-[920px] space-y-5 text-[1.0625rem] leading-[1.85] sm:mt-7 sm:text-[1.125rem] lg:text-[1.25rem] lg:leading-[1.9]"
          style={{ color: '#4B5563' }}
        >
          <p>
            For more than 25 years, Gee Cee has partnered with contractors, developers,
            infrastructure companies, and government agencies across India.
          </p>
          <p>
            Our construction chemical solutions are engineered to enhance strength, durability,
            and long-term performance across highways, bridges, railways, water infrastructure,
            industrial plants, commercial developments, and residential projects.
          </p>
        </div>

        <span
          aria-hidden="true"
          className="mt-12 select-none text-[1.125rem] leading-none"
          style={{ color: 'rgba(107, 114, 128, 0.45)' }}
        >
          ↓
        </span>
      </div>
    </section>
  )
}
