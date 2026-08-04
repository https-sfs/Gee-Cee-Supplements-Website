import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../shared/SectionHeading'
import { cn } from '../../lib/utils'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    slug: 'amaravati',
    title: 'Amaravati Development Authority',
    description:
      'Admixture and waterproofing systems supplied across capital region development packages.',
    image: '/media/projects/amaravati.png',
    objectPosition: 'center center',
    align: 'left',
  },
  {
    slug: 'polavaram',
    title: 'Polavaram Irrigation Project',
    description:
      "Slump retention, non-shrink grouting and joint sealing for one of India's largest irrigation works.",
    image: '/media/projects/polavaram.png',
    objectPosition: 'center center',
    align: 'right',
  },
  {
    slug: 'railway',
    title: 'East Coast Railway & South Central Railway',
    description:
      'Supplying high-performance construction chemical systems for railway infrastructure including bridges, track structures, stations and civil engineering works across East Coast and South Central Railway projects.',
    image: '/media/projects/railway.png',
    objectPosition: 'center left',
    align: 'left',
    longTitle: true,
  },
  {
    slug: 'national-highways',
    title: 'National Highway Projects',
    description:
      'Concrete admixtures and curing compounds supplied to highway packages across seven states.',
    image: '/media/projects/national-highways.png',
    objectPosition: 'center center',
    align: 'right',
  },
  {
    slug: 'commercial',
    title: 'Major Commercial Projects',
    description:
      'Waterproofing, sealants and flooring systems for large commercial and institutional works.',
    image: '/media/projects/commercial.png',
    objectPosition: 'center center',
    align: 'left',
  },
  {
    slug: 'residential',
    title: 'Major Residential Projects',
    description:
      'Integral waterproofing and finishing systems protecting large housing developments after handover.',
    image: '/media/projects/residential.png',
    objectPosition: 'center center',
    align: 'right',
  },
]

const clients = [
  { name: 'Gammon India', tone: 'emphasis' },
  { name: 'Progressive Constructions', tone: 'emphasis' },
  { name: 'SEW Construction', tone: 'emphasis' },
  { name: 'Madhucon', tone: 'emphasis' },
  { name: 'Gayatri Projects', tone: 'emphasis' },
  { name: 'GKC Projects', tone: 'emphasis' },
  { name: 'Modi Builders', tone: 'emphasis' },
]

const clientToneClass = {
  emphasis:
    'text-[clamp(1.35rem,2vw,1.95rem)] font-semibold tracking-[-0.03em] text-foreground/68',
}

export default function LandmarkProjects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const panels = root.querySelectorAll('[data-project-panel]')
    const credits = root.querySelector('[data-project-credits]')

    const ctx = gsap.context(() => {
      panels.forEach((panel) => {
        const frame = panel.querySelector('[data-panel-frame]')
        const image = panel.querySelector('[data-panel-image]')
        const copy = panel.querySelector('[data-panel-copy]')

        if (!frame || !image || !copy) return

        if (reduced) {
          gsap.set([frame, image, copy], { clearProps: 'all', opacity: 1 })
          return
        }

        gsap.set(frame, { y: 64, opacity: 0 })
        gsap.set(image, { scale: 1.08 })
        gsap.set(copy, { y: 32, opacity: 0 })

        const enter = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })

        enter
          .to(frame, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
          })
          .to(
            image,
            {
              scale: 1,
              duration: 1.55,
              ease: 'power2.out',
            },
            0,
          )
          .to(
            copy,
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power2.out',
            },
            0.25,
          )

        gsap.to(image, {
          yPercent: -7,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      if (credits) {
        if (reduced) {
          gsap.set(credits, { clearProps: 'all', opacity: 1 })
        } else {
          gsap.fromTo(
            credits,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: credits,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            },
          )
        }
      }
    }, root)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="relative engineering-atmosphere section-y"
    >
      <div className="shell relative">
        <SectionHeading
          titleId="projects-heading"
          kicker="Trusted Across Landmark Projects"
          title="Built into India's infrastructure."
          body="Supporting landmark infrastructure and construction projects across India since 1999."
          className="max-w-5xl lg:max-w-6xl [&_h2]:[text-wrap:unset] [&_h2]:whitespace-normal lg:[&_h2]:whitespace-nowrap"
        />

        <div className="mx-auto mt-16 flex max-w-[1400px] flex-col gap-20 sm:gap-24 lg:mt-24 lg:gap-32">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              data-project-panel
              aria-labelledby={`project-${project.slug}`}
              className="w-full"
            >
              <div
                data-panel-frame
                className="project-panel group relative h-[72vh] min-h-[22rem] w-full overflow-hidden rounded-[2.25rem] opacity-0 sm:h-[78vh] sm:min-h-[26rem] lg:h-[82vh] lg:rounded-[2.5rem]"
              >
                <div className="project-panel-zoom absolute inset-0">
                  <img
                    data-panel-image
                    src={project.image}
                    alt={project.title}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="absolute inset-0 size-full object-cover will-change-transform"
                    style={{
                      transform: 'scale(1.08)',
                      objectFit: 'cover',
                      objectPosition: project.objectPosition,
                    }}
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/72 via-black/15 to-transparent" />

                <div
                  data-panel-copy
                  className={cn(
                    'absolute bottom-16 opacity-0 sm:bottom-[4.5rem] lg:bottom-20',
                    project.longTitle
                      ? 'max-w-[min(94%,64rem)]'
                      : 'max-w-[min(94%,56rem)]',
                    project.align === 'right'
                      ? 'right-16 text-right sm:right-[4.5rem] lg:right-20'
                      : 'left-16 sm:left-[4.5rem] lg:left-20',
                  )}
                >
                  <h3
                    id={`project-${project.slug}`}
                    className={cn(
                      'font-display font-semibold tracking-[-0.04em] text-white',
                      project.longTitle
                        ? 'text-[clamp(1.35rem,0.9rem+2.2vw,2.85rem)] whitespace-normal xl:whitespace-nowrap'
                        : 'text-[clamp(1.55rem,1.1rem+2.6vw,3.25rem)] whitespace-nowrap max-[400px]:whitespace-normal',
                    )}
                    style={{ lineHeight: 1.06, textWrap: 'unset' }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-4 max-w-md text-[0.9375rem] leading-relaxed text-white/78 sm:mt-5 sm:max-w-lg sm:text-[0.98rem] sm:leading-[1.65]',
                      project.longTitle && 'sm:max-w-xl',
                      project.align === 'right' && 'ml-auto',
                    )}
                  >
                    {project.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          data-project-credits
          className="mx-auto mt-32 max-w-5xl opacity-0 lg:mt-40"
        >
          <p className="kicker mb-5 text-center tracking-[0.18em]">
            Trusted by Leading Construction Companies
          </p>
          <h3
            className="font-display mx-auto max-w-3xl text-center text-[clamp(2.05rem,1.2rem+3.2vw,3.4rem)] font-semibold tracking-[-0.04em] text-foreground"
            style={{ lineHeight: 1.06, textWrap: 'balance' }}
          >
            Building together. Delivering excellence.
          </h3>

          <ul
            aria-label="Trusted construction partners"
            className="mx-auto mt-16 flex max-w-4xl flex-wrap items-baseline justify-center gap-x-10 gap-y-8 px-2 sm:mt-20 sm:gap-x-14 sm:gap-y-10 lg:gap-x-16 lg:gap-y-12"
          >
            {clients.map((client) => (
              <li key={client.name} className="list-none">
                <span
                  tabIndex={0}
                  className={cn(
                    'font-display inline-block cursor-default transition-all duration-500 [transition-timing-function:var(--ease-cine)] hover:-translate-y-0.5 hover:tracking-[-0.045em] hover:text-foreground focus-visible:outline-none focus-visible:text-foreground',
                    clientToneClass[client.tone],
                  )}
                >
                  {client.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
