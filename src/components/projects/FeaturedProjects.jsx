import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const FEATURED_PROJECTS = [
  {
    number: '01',
    category: 'Water Resources & Irrigation',
    title: 'Polavaram Irrigation Project',
    description:
      "Advanced waterproofing and structural protection solutions supporting one of India's largest multipurpose irrigation developments.",
    location: 'Andhra Pradesh',
    image: '/media/projects/polavaram-featured.png',
    imageAlt: 'Aerial view of Polavaram dam spillway and river — featured project',
    href: '/projects/polavaram-irrigation-project',
    products: [
      'Aquaseal™',
      'Leaklock 2C',
      'Groutex One',
      'Groutex Two',
      'Expanseal',
      'Polycoat',
    ],
  },
  {
    number: '02',
    category: 'Railways & Metro',
    title: 'East Coast Railways',
    description:
      'Reliable construction chemical systems for durable railway infrastructure, reinforcement anchoring, grouting and long-term maintenance applications.',
    location: 'Multiple States',
    image: '/media/projects/east-coast-railways-featured.png',
    imageAlt: 'Passenger train on coastal railway track — East Coast Railways featured project',
    href: '/projects/east-coast-railways',
    products: [
      'Anchor Grout',
      'Groutex One',
      'Bond Aid',
      'EP Bond',
      'Cemcrete SP1',
    ],
  },
  {
    number: '03',
    category: 'Rail Infrastructure',
    title: 'South Central Railway',
    description:
      'Supporting railway infrastructure with high performance grouting, bonding and concrete admixture solutions for critical applications.',
    location: 'Multiple States',
    image: '/media/projects/south-central-railway-featured.png',
    imageAlt:
      'Blue diesel locomotive leading a passenger train on curved tracks — South Central Railway featured project',
    href: '/projects/south-central-railway',
    products: [
      'Anchor Grout',
      'High Grout EP',
      'Bond Aid',
      'Cemcrete SP1',
    ],
  },
  {
    number: '04',
    category: 'Roads & Highways',
    title: 'National Highway Projects',
    description:
      'Construction chemical solutions supporting highways, bridges and transportation infrastructure across multiple Indian states.',
    location: 'Assam • Bihar • Uttar Pradesh • Madhya Pradesh',
    locationLine2: 'Odisha • Chhattisgarh • Karnataka',
    image: '/media/projects/national-highway-projects-featured.png',
    imageAlt:
      'Multi-level highway interchange with concrete overpasses — National Highway Projects featured project',
    href: '/projects/national-highway-projects',
    products: [
      'Cemcrete SP1',
      'Cemcrete SRP',
      'Cemseal',
      'Expanseal',
      'Hard Floor',
    ],
  },
  {
    number: '05',
    category: 'Urban Infrastructure',
    title: 'Amaravati Development Authority',
    description:
      'Supplying construction chemical systems for major urban infrastructure developments including waterproofing, flooring and structural protection applications.',
    location: 'Andhra Pradesh',
    image: '/media/projects/amaravati-development-authority-featured.png',
    imageAlt:
      'Aerial view of Amaravati planned city roads and civic buildings — featured project',
    href: '/projects/amaravati-development-authority',
    products: [
      'Aquaseal™',
      'Bond Aid',
      'EP Coat',
      'Leaklock 2C',
      'Tile Grout',
    ],
  },
  {
    number: '06',
    category: 'Commercial Infrastructure',
    title: 'Commercial Construction Projects',
    description:
      'Supplying construction chemicals to major commercial developments across Andhra Pradesh, Telangana and Karnataka.',
    location: 'Multiple States',
    image: '/media/projects/commercial-construction-projects-featured.png',
    imageAlt:
      'Modern commercial office building with glass facade and parking lot — featured project',
    href: '/projects/commercial-construction-projects',
    products: [
      'Tile Feb',
      'Tile Grout',
      'EP Coat',
      'Polycoat',
      'Leaklock 2C',
    ],
  },
  {
    number: '07',
    category: 'Residential Infrastructure',
    title: 'Residential Developments',
    description:
      'Supporting premium residential construction through waterproofing, crack repair, tile installation and long-term concrete protection systems.',
    location: 'Multiple States',
    image: '/media/projects/residential-developments-featured.png',
    imageAlt:
      'Modern multi-story residential apartment complex with landscaped courtyard — featured project',
    href: '/projects/residential-developments',
    products: [
      'Aquaseal™',
      'Bond SBR',
      'Magicfill',
      'Tile Adhesives',
      'Leaklock 2C',
    ],
  },
]

function FeaturedProjectRow({ project, isFirst, isLast }) {
  const rowRef = useRef(null)
  const numberRef = useRef(null)
  const mediaRef = useRef(null)
  const contentRef = useRef(null)
  const pillsRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const root = rowRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const number = numberRef.current
    const media = mediaRef.current
    const content = contentRef.current
    const pills = pillsRef.current?.querySelectorAll('[data-product-pill]')
    const cta = ctaRef.current

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([number, media, content, pills, cta], {
          clearProps: 'all',
          opacity: 1,
          y: 0,
          x: 0,
        })
        return
      }

      const trigger = { trigger: root, start: 'top 78%', once: true }
      const ease = 'power2.out'

      gsap.fromTo(
        number,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease,
          delay: 0.08,
          scrollTrigger: trigger,
        },
      )

      gsap.fromTo(
        media,
        { x: -28, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.95,
          ease,
          delay: 0.16,
          scrollTrigger: trigger,
        },
      )

      gsap.fromTo(
        content,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease,
          delay: 0.24,
          scrollTrigger: trigger,
        },
      )

      if (pills?.length) {
        gsap.fromTo(
          pills,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease,
            stagger: 0.05,
            delay: 0.34,
            scrollTrigger: trigger,
          },
        )
      }

      gsap.fromTo(
        cta,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease,
          delay: 0.48,
          scrollTrigger: trigger,
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  const railLineClass = [
    'absolute left-1/2 hidden w-px -translate-x-1/2 bg-[#E5EAF2] lg:block',
    isFirst ? 'top-3' : '-top-10 lg:-top-12',
    isLast ? 'bottom-0' : '-bottom-10 lg:-bottom-12',
  ].join(' ')

  return (
    <div ref={rowRef} className="group/row w-full overflow-visible">
      {/* Flat white strip — presentation only; row internals unchanged */}
      <div className="w-full overflow-visible rounded-lg bg-white px-8 py-8 sm:px-9 sm:py-9 lg:px-10 lg:py-10">
      <div className="flex w-full flex-col gap-8 overflow-visible lg:flex-row lg:items-start lg:gap-x-0">
        {/* Timeline */}
        <div
          ref={numberRef}
          className="relative flex shrink-0 items-start gap-2.5 overflow-visible lg:mr-5 lg:self-stretch lg:gap-3"
        >
          <p
            className="font-display font-bold tabular-nums tracking-[-0.04em]"
            style={{
              color: '#2495ff',
              fontSize: 'clamp(2.5rem, 2rem + 1.2vw, 3.25rem)',
              lineHeight: 1,
            }}
          >
            {project.number}
          </p>
          <div className="relative mt-2.5 flex w-3 justify-center self-stretch overflow-visible">
            <span
              className="relative z-10 size-3 shrink-0 rounded-full bg-[#2495ff]"
              style={{ boxShadow: '0 0 0 5px rgba(36, 149, 255, 0.18)' }}
              aria-hidden="true"
            />
            <span className={railLineClass} aria-hidden="true" />
          </div>
        </div>

        {/* Image */}
        <div
          ref={mediaRef}
          className="w-full shrink-0 overflow-hidden rounded-[1.25rem] transition-[box-shadow,transform] duration-300 ease-out group-hover/row:shadow-[0_16px_40px_rgba(15,23,42,0.1)] lg:mr-12 lg:w-[min(30%,26rem)] lg:max-w-[26rem] xl:mr-14"
          style={{
            boxShadow: '0 10px 28px rgba(15, 23, 42, 0.06)',
            height: 'min(15.5rem, 40vw)',
            minHeight: '12.5rem',
          }}
        >
          <img
            src={project.image}
            alt={project.imageAlt}
            className="h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover/row:scale-[1.02]"
          />
        </div>

        {/* Content + Products */}
        <div className="flex min-w-0 flex-1 flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-x-0">
          <div
            ref={contentRef}
            className="flex min-w-0 flex-col lg:max-w-[34rem] xl:max-w-[38rem]"
          >
            <p
              className="text-[0.78rem] font-semibold uppercase tracking-[0.16em]"
              style={{ color: '#2495ff' }}
            >
              {project.category}
            </p>
            <h3
              className="font-display mt-3 font-bold tracking-[-0.03em] text-[#111827]"
              style={{
                fontSize: 'clamp(1.5rem, 1.25rem + 0.85vw, 1.95rem)',
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>
            <p
              className="mt-3.5 max-w-[40ch] text-[1.1rem] leading-[1.7] sm:text-[1.175rem]"
              style={{ color: '#6B7280' }}
            >
              {project.description}
            </p>
            <p
              className={`mt-auto inline-flex gap-1.5 pt-5 text-[0.95rem] font-medium ${
                project.locationLine2 ? 'items-start' : 'items-center'
              }`}
              style={{ color: '#64748B' }}
            >
              <MapPin
                className={`size-3.5 shrink-0 text-[#2495ff] ${
                  project.locationLine2 ? 'mt-[0.2em]' : ''
                }`}
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span>
                {project.location}
                {project.locationLine2 ? (
                  <>
                    <br />
                    {project.locationLine2}
                  </>
                ) : null}
              </span>
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col lg:ml-6 lg:w-[17.5rem] xl:ml-7 xl:w-[18.5rem]">
            <p
              className="text-[0.95rem] font-medium"
              style={{ color: '#2495ff' }}
            >
              Products Used
            </p>
            <ul ref={pillsRef} className="mt-3 flex flex-wrap gap-2">
              {project.products.map((product) => (
                <li key={product}>
                  <span
                    data-product-pill
                    className="inline-flex cursor-pointer rounded-full border border-[#E5EAF2] bg-white px-3.5 py-1.5 text-[0.9375rem] font-medium text-[#374151] transition-colors duration-250 ease-out hover:border-[#2495ff]/45 hover:bg-blue-soft"
                  >
                    {product}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              ref={ctaRef}
              to={project.href}
              className="group/cta mt-auto mr-8 inline-flex w-fit items-center gap-2 self-end pt-5 text-[0.95rem] font-medium transition-colors duration-300 ease-out hover:text-[#1D6FD0] lg:mr-12 xl:mr-14"
              style={{ color: '#2495ff' }}
            >
              View Case Study
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-out group-hover/cta:translate-x-1.5"
              />
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

/**
 * Featured Projects — data-driven rows.
 * Project 01 layout/styling is the locked master template.
 */
export default function FeaturedProjects() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    const heading = headingRef.current
    if (!root || !heading) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(heading, { clearProps: 'all', opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        heading,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 78%', once: true },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="featured-projects"
      aria-labelledby="featured-projects-heading"
      className="bg-[#F5F9FF]"
      style={{ paddingTop: '6.25rem', paddingBottom: '5rem' }}
    >
      <div className="mx-auto w-full max-w-[min(100%,96rem)] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div ref={headingRef}>
          <p
            className="text-[0.75rem] font-semibold uppercase tracking-[0.18em]"
            style={{ color: '#2495ff' }}
          >
            Featured Projects
          </p>
          <h2
            id="featured-projects-heading"
            className="font-display mt-4 max-w-[22ch] font-bold tracking-[-0.035em] text-[#101722]"
            style={{
              fontSize: 'clamp(1.85rem, 1.4rem + 1.4vw, 2.75rem)',
              lineHeight: 1.15,
              fontWeight: 700,
            }}
          >
            Delivering Solutions for India&apos;s Critical Infrastructure
          </h2>
        </div>

        <div className="mt-14 flex flex-col gap-10 overflow-visible lg:mt-16 lg:gap-12">
          {FEATURED_PROJECTS.map((project, index) => (
            <FeaturedProjectRow
              key={project.number}
              project={project}
              isFirst={index === 0}
              isLast={index === FEATURED_PROJECTS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
