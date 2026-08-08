import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Building2,
  Droplets,
  Factory,
  Landmark,
  Waypoints,
  Wrench,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const APPLICATIONS = [
  {
    id: 'water-retaining',
    title: (
      <>
        Water Retaining
        <br />
        Structures
      </>
    ),
    description: (
      <>
        Dams, Reservoirs,
        <br />
        Water Tanks, Canals,
        <br />
        Retaining Walls
      </>
    ),
    href: '/industries/dams-irrigation',
    Icon: Landmark,
  },
  {
    id: 'transportation',
    title: (
      <>
        Transportation
        <br />
        Infrastructure
      </>
    ),
    description: (
      <>
        Railways, Bridges,
        <br />
        Highways, Flyovers,
        <br />
        Tunnels
      </>
    ),
    href: '/industries/roads-highways',
    Icon: Waypoints,
  },
  {
    id: 'industrial-flooring',
    title: (
      <>
        Industrial
        <br />
        Flooring
      </>
    ),
    description: (
      <>
        Factories, Warehouses,
        <br />
        Power Plants, Manufacturing
        <br />
        Units
      </>
    ),
    href: '/products/industrial-flooring',
    Icon: Factory,
  },
  {
    id: 'structural-repairs',
    title: (
      <>
        Structural
        <br />
        Repairs
      </>
    ),
    description: (
      <>
        Columns, Beams, Bridges,
        <br />
        Basements, Tunnels,
        <br />
        Concrete Repair
      </>
    ),
    href: '/products/repairs-rehabilitation',
    Icon: Wrench,
  },
  {
    id: 'waterproofing',
    title: (
      <>
        Waterproofing
        <br />
        Solutions
      </>
    ),
    description: (
      <>
        Roofs, Bathrooms,
        <br />
        Swimming Pools,
        <br />
        Basements
      </>
    ),
    href: '/products/waterproofing-systems',
    Icon: Droplets,
  },
  {
    id: 'commercial-interiors',
    title: (
      <>
        Commercial
        <br />
        Interiors
      </>
    ),
    description: (
      <>
        Hospitals, Laboratories,
        <br />
        Food Processing,
        <br />
        Clean Rooms
      </>
    ),
    href: '/industries/commercial-institutional',
    Icon: Building2,
  },
]

/**
 * Engineering Applications — Projects page section below Featured Projects.
 * Isolated from the locked Featured Projects timeline.
 */
export default function EngineeringApplications() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const header = headerRef.current
    const cards = cardsRef.current?.querySelectorAll('[data-app-card]')

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([header, cards], { clearProps: 'all', opacity: 1, y: 0 })
        return
      }

      const ease = 'power2.out'

      gsap.fromTo(
        header,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease,
          scrollTrigger: { trigger: root, start: 'top 78%', once: true },
        },
      )

      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease,
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
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
      id="engineering-applications"
      aria-labelledby="engineering-applications-heading"
      className="bg-[#F5F9FF]"
      style={{ paddingTop: '2.75rem', paddingBottom: '5.5rem' }}
    >
      <div className="mx-auto w-full max-w-[min(100%,96rem)] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div
          ref={headerRef}
          className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12 xl:gap-20"
        >
          <div className="min-w-0 shrink-0">
            <p
              className="text-[0.75rem] font-semibold uppercase tracking-[0.18em]"
              style={{ color: '#2495ff' }}
            >
              Engineering Applications
            </p>
            <h2
              id="engineering-applications-heading"
              className="font-display mt-4 max-w-[14ch] font-bold tracking-[-0.035em] text-[#101722]"
              style={{
                fontSize: 'clamp(1.85rem, 1.4rem + 1.4vw, 2.75rem)',
                lineHeight: 1.15,
                fontWeight: 700,
              }}
            >
              Where Our Solutions Perform
            </h2>
          </div>

          <p
            className="w-full max-w-[28rem] text-center text-[1.05rem] leading-[1.65] lg:mt-1 lg:ml-auto lg:w-[min(100%,28rem)] lg:shrink-0 xl:max-w-[30rem] xl:w-[min(100%,30rem)]"
            style={{ color: '#5B6573' }}
          >
            Every project demands different engineering challenges. Our product
            systems are designed specifically for these critical construction
            applications.
          </p>
        </div>

        <ul
          ref={cardsRef}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-6 xl:gap-4"
        >
          {APPLICATIONS.map(({ id, title, description, href, Icon }) => (
            <li key={id} className="min-w-0">
              <Link
                to={href}
                data-app-card
                className="group flex h-full min-h-[17.5rem] flex-col items-center rounded-[0.75rem] border border-[#E8EEF5] bg-white px-4 pb-6 pt-7 text-center shadow-[0_4px_16px_rgba(45,70,110,0.04)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(45,70,110,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:min-h-[18.5rem] sm:px-5"
              >
                <Icon
                  aria-hidden="true"
                  className="size-9 shrink-0 text-[#2495ff] transition-transform duration-300 ease-out group-hover:scale-[1.04] sm:size-10"
                  strokeWidth={1.5}
                />

                <h3
                  className="font-display mt-5 text-[1.05rem] font-bold tracking-[-0.02em] text-[#101722] sm:text-[1.1rem]"
                  style={{ lineHeight: 1.25 }}
                >
                  {title}
                </h3>

                <p
                  className="mt-3 flex-1 text-[0.875rem] leading-[1.55] sm:text-[0.9rem]"
                  style={{ color: '#6B7280' }}
                >
                  {description}
                </p>

                <span
                  className="mt-6 inline-flex items-center gap-1.5 text-[0.9rem] font-medium transition-colors duration-300 ease-out group-hover:text-[#1D6FD0]"
                  style={{ color: '#2495ff' }}
                >
                  View Solutions
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
