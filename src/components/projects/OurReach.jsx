import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Building2, Factory, MapPin } from 'lucide-react'
import CountUp from '../shared/CountUp'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  {
    end: 18,
    suffix: '+',
    label: 'States Covered',
    description: (
      <>
        Delivering projects across
        <br />
        varied infrastructure sectors.
      </>
    ),
    Icon: MapPin,
  },
  {
    end: 250,
    suffix: '+',
    label: 'Projects Delivered',
    description: (
      <>
        Across infrastructure, industrial
        <br />
        & commercial sectors.
      </>
    ),
    Icon: Building2,
  },
  {
    end: 25,
    suffix: '+',
    label: 'Years of Experience',
    description: (
      <>
        Since 1999, delivering
        <br />
        strength & durability.
      </>
    ),
    Icon: Award,
  },
  {
    end: 200,
    suffix: ' TPD',
    label: 'Production Capacity',
    description: (
      <>
        Manufacturing with
        <br />
        over 200 tonnes per day
        <br />
        capacity.
      </>
    ),
    Icon: Factory,
  },
]

/**
 * Our Reach — Projects page metrics strip below Engineering Applications.
 * Structure follows the reference; palette matches the white + baby-blue site system.
 */
export default function OurReach() {
  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const metricsRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const intro = introRef.current
    const metrics = metricsRef.current?.querySelectorAll('[data-reach-metric]')

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([intro, metrics], { clearProps: 'all', opacity: 1, y: 0 })
        return
      }

      const ease = 'power2.out'

      gsap.fromTo(
        intro,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease,
          scrollTrigger: { trigger: root, start: 'top 80%', once: true },
        },
      )

      if (metrics?.length) {
        gsap.fromTo(
          metrics,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease,
            stagger: 0.12,
            scrollTrigger: {
              trigger: metricsRef.current,
              start: 'top 82%',
              once: true,
            },
          },
        )
      }
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="our-reach"
      aria-labelledby="our-reach-heading"
      className="bg-[#F5F9FF]"
      style={{ paddingTop: '3.5rem', paddingBottom: '4.5rem' }}
    >
      <div className="mx-auto w-full max-w-[min(100%,96rem)] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="overflow-hidden rounded-[0.75rem] border border-[#E5EAF2] bg-white">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            <div
              ref={introRef}
              className="flex shrink-0 flex-col justify-center border-b border-[#E5EAF2] px-7 py-8 sm:px-9 sm:py-10 lg:w-[min(100%,22rem)] lg:border-b-0 lg:border-r lg:px-10 lg:py-12 xl:w-[24rem]"
            >
              <p
                className="text-[0.75rem] font-semibold uppercase tracking-[0.18em]"
                style={{ color: '#2495ff' }}
              >
                Our Reach
              </p>
              <h2
                id="our-reach-heading"
                className="font-display mt-4 max-w-[13ch] font-bold tracking-[-0.035em] text-[#101722]"
                style={{
                  fontSize: 'clamp(1.55rem, 1.2rem + 1vw, 2.15rem)',
                  lineHeight: 1.18,
                  fontWeight: 700,
                }}
              >
                Together, we&apos;re building India stronger.
              </h2>
            </div>

            <div
              ref={metricsRef}
              className="grid min-w-0 flex-1 grid-cols-1 divide-y divide-[#E5EAF2] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4"
            >
              {METRICS.map(({ end, suffix, label, description, Icon }, index) => (
                <div
                  key={label}
                  data-reach-metric
                  className="flex h-full flex-col px-6 py-8 sm:px-7 sm:py-9 sm:odd:border-r sm:odd:border-[#E5EAF2] sm:[&:nth-child(-n+2)]:border-b sm:[&:nth-child(-n+2)]:border-[#E5EAF2] lg:border-b-0 lg:px-6 lg:py-10 lg:odd:border-r-0 lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-[#E5EAF2] xl:px-8"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-6 text-[#2495ff] sm:size-7"
                    strokeWidth={1.5}
                  />
                  <p
                    className="font-display mt-4 font-bold tracking-[-0.04em] tabular-nums"
                    style={{
                      color: '#2495ff',
                      fontSize: 'clamp(2rem, 1.6rem + 1.2vw, 2.75rem)',
                      lineHeight: 1,
                    }}
                  >
                    <CountUp
                      end={end}
                      suffix={suffix}
                      duration={1800}
                      delay={index * 0.12}
                      aria-label={`${end}${suffix} ${label}`}
                    />
                  </p>
                  <p className="mt-3 text-[0.95rem] font-semibold tracking-[-0.01em] text-[#101722]">
                    {label}
                  </p>
                  <p
                    className="mt-3 text-[0.875rem] leading-[1.55]"
                    style={{ color: '#6B7280' }}
                  >
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
