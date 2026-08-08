import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, Check, ChevronRight, Home } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductsCTA from '../components/products/ProductsCTA'
import { CaseStudyIcon } from '../components/projects/case-study/caseStudyIcons'
import { getProjectCaseStudy } from '../data/projectCaseStudies'
import { projectCaseStudyCTA } from '../data/categoryCTAs'
import { getProjectProductHref } from '../lib/projectProductLinks'

gsap.registerPlugin(ScrollTrigger)

const sectionPad = 'px-4 sm:px-6 lg:px-8 xl:px-10'
const sectionShell = `mx-auto w-full max-w-[min(100%,96rem)] ${sectionPad}`

function useRevealSection(ref, selectorList) {
  const selectorKey = selectorList.join('|')

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const selectors = selectorKey.split('|')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const nodes = selectors
        .flatMap((sel) => Array.from(root.querySelectorAll(sel)))
        .filter(Boolean)

      if (!nodes.length) return

      if (reduced) {
        gsap.set(nodes, { clearProps: 'all', opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        nodes,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.07,
          scrollTrigger: { trigger: root, start: 'top 78%' },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [ref, selectorKey])
}

function MetaBlock({ icon, label, value, lines }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-2.5 text-[#2495ff]">
        <CaseStudyIcon name={icon} className="size-[1.15rem]" />
      </div>
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
        {label}
      </p>
      <p className="mt-1.5 text-[0.95rem] font-semibold leading-snug text-[#101722]">
        {lines?.length
          ? lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))
          : value}
      </p>
    </div>
  )
}

function FeatureCard({ item }) {
  return (
    <div
      data-cs-card
      className="rounded-2xl border border-[#E5EAF2] bg-white px-5 py-5 shadow-[0_1px_0_rgba(16,23,34,0.02)]"
    >
      <div className="text-[#2495ff]">
        <CaseStudyIcon name={item.icon} className="size-[1.35rem]" />
      </div>
      <p className="mt-3 text-[1.05rem] font-semibold leading-snug tracking-[-0.01em] text-[#101722]">
        {item.title}
      </p>
    </div>
  )
}

/**
 * Reusable Project Case Study template — content driven by /projects/:projectId slug.
 */
export default function ProjectCaseStudyPage() {
  const { projectId } = useParams()
  const study = getProjectCaseStudy(projectId)

  const heroRef = useRef(null)
  const overviewRef = useRef(null)
  const challengesRef = useRef(null)
  const solutionRef = useRef(null)
  const applicationsRef = useRef(null)
  const outcomeRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [projectId])

  useEffect(() => {
    if (!study) {
      document.title = 'Case Study — Gee Cee'
      return
    }
    document.title = `${study.title} — Case Study | Gee Cee`
  }, [study])

  useEffect(() => {
    const root = heroRef.current
    if (!root || !study) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const crumb = root.querySelector('[data-cs-crumb]')
    const eyebrow = root.querySelector('[data-cs-eyebrow]')
    const heading = root.querySelector('[data-cs-heading]')
    const desc = root.querySelector('[data-cs-desc]')
    const metas = root.querySelectorAll('[data-cs-meta]')
    const image = root.querySelector('[data-cs-image]')

    const ctx = gsap.context(() => {
      const targets = [crumb, eyebrow, heading, desc, ...metas, image].filter(Boolean)
      if (reduced) {
        gsap.set(targets, { clearProps: 'all', opacity: 1, y: 0, x: 0 })
        return
      }

      gsap.fromTo(
        crumb,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      )
      gsap.fromTo(
        eyebrow,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', delay: 0.06 },
      )
      gsap.fromTo(
        heading,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.12 },
      )
      gsap.fromTo(
        desc,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 },
      )
      if (metas.length) {
        gsap.fromTo(
          metas,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.07,
            delay: 0.28,
          },
        )
      }
      gsap.fromTo(
        image,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.05, ease: 'power2.out', delay: 0.1 },
      )
    }, root)

    return () => ctx.revert()
  }, [study])

  useRevealSection(overviewRef, ['[data-cs-reveal]', '[data-cs-card]'])
  useRevealSection(challengesRef, ['[data-cs-reveal]', '[data-cs-card]'])
  useRevealSection(solutionRef, ['[data-cs-reveal]', '[data-cs-card]', '[data-cs-product]'])
  useRevealSection(applicationsRef, ['[data-cs-reveal]', '[data-cs-card]'])
  useRevealSection(outcomeRef, ['[data-cs-reveal]', '[data-cs-card]', '[data-cs-outcome]'])

  if (!study) {
    return (
      <>
        <Navbar />
        <main className="bg-white">
          <section className={`${sectionShell} pb-24 pt-28`}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#5F6B7A] transition-colors hover:text-[#2495ff]"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> All projects
            </Link>
            <h1
              className="font-display mt-10 font-bold tracking-[-0.035em] text-[#101722]"
              style={{ fontSize: 'clamp(2rem, 1.4rem + 2vw, 3rem)' }}
            >
              Case study not found
            </h1>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-[#5F6B7A]">
              This project case study isn&apos;t available yet. Return to Projects to explore
              featured work.
            </p>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero — full-bleed project image background */}
        <section
          ref={heroRef}
          className="relative isolate overflow-hidden pt-[4.75rem]"
          aria-label={`${study.title} case study hero`}
        >
          <div
            data-cs-image
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-20"
          >
            <img
              src={study.image}
              alt=""
              className="size-full object-cover object-[72%_center] sm:object-[78%_center] lg:object-[82%_42%]"
            />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: `
                linear-gradient(
                  90deg,
                  rgba(245, 249, 255, 0.97) 0%,
                  rgba(245, 249, 255, 0.94) 22%,
                  rgba(245, 249, 255, 0.78) 38%,
                  rgba(245, 249, 255, 0.42) 52%,
                  rgba(245, 249, 255, 0.12) 68%,
                  rgba(245, 249, 255, 0) 82%
                )
              `,
            }}
          />

          {/* Stronger left wash on small screens for readability */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 lg:hidden"
            style={{
              background: `
                linear-gradient(
                  180deg,
                  rgba(245, 249, 255, 0.88) 0%,
                  rgba(245, 249, 255, 0.72) 42%,
                  rgba(245, 249, 255, 0.55) 100%
                ),
                linear-gradient(
                  90deg,
                  rgba(245, 249, 255, 0.96) 0%,
                  rgba(245, 249, 255, 0.85) 40%,
                  rgba(245, 249, 255, 0.35) 72%,
                  rgba(245, 249, 255, 0.08) 100%
                )
              `,
            }}
          />

          <div className={`${sectionShell} flex min-h-[min(78vh,42rem)] flex-col pb-10 pt-6 sm:pb-12 lg:min-h-[min(82vh,46rem)] lg:pb-14 lg:pt-8`}>
            <nav
              data-cs-crumb
              aria-label="Breadcrumb"
              className="flex min-w-0 flex-wrap items-center gap-1.5 text-[0.8125rem] text-[#6B7280]"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-[#2495ff]"
              >
                <Home className="size-3.5 shrink-0" aria-hidden="true" />
                Home
              </Link>
              <ChevronRight className="size-3.5 shrink-0 text-[#2495ff]" aria-hidden="true" />
              <Link to="/projects" className="transition-colors hover:text-[#2495ff]">
                Projects
              </Link>
              <ChevronRight className="size-3.5 shrink-0 text-[#2495ff]" aria-hidden="true" />
              <span className="truncate font-medium text-[#101722]">{study.title}</span>
            </nav>

            <div className="mt-8 flex flex-1 flex-col lg:mt-10">
              <div className="max-w-[40rem] lg:max-w-[46%]">
                <p
                  data-cs-eyebrow
                  className="text-[0.75rem] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: '#2495ff' }}
                >
                  {study.eyebrow}
                </p>
                <h1
                  data-cs-heading
                  className="font-display mt-4 font-bold tracking-[-0.04em] text-[#101722]"
                  style={{
                    fontSize: 'clamp(2.35rem, 1.5rem + 2.8vw, 3.75rem)',
                    lineHeight: 1.05,
                  }}
                >
                  {study.titleLines?.length ? (
                    study.titleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))
                  ) : (
                    study.title
                  )}
                </h1>
                <p
                  data-cs-desc
                  className="mt-5 max-w-[34rem] text-[1.05rem] leading-[1.65] text-[#4B5563] sm:text-[1.125rem]"
                >
                  {study.description}
                </p>
              </div>

              <div className="mt-auto grid max-w-3xl grid-cols-1 gap-5 border-t border-[#D8E4F2]/80 pt-7 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:max-w-[52rem] lg:grid-cols-3 lg:gap-0">
                {[
                  {
                    icon: 'role',
                    label: "Gee Cee's Role",
                    value: study.role,
                    lines: study.roleLines,
                  },
                  {
                    icon: 'layers',
                    label: 'Applications',
                    value: study.applicationsLabel,
                    lines: study.applicationsLines,
                  },
                  {
                    icon: 'pin',
                    label: 'Location',
                    value: study.location,
                  },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    data-cs-meta
                    className={
                      i === 0
                        ? 'lg:pr-6 xl:pr-7'
                        : i === 1
                          ? 'lg:border-l lg:border-[#C9D9EE]/70 lg:pl-6 xl:pl-7 lg:pr-3.5 xl:pr-4'
                          : 'lg:border-l lg:border-[#C9D9EE]/70 lg:pl-3.5 xl:pl-4'
                    }
                  >
                    <MetaBlock {...item} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <span className="sr-only">{study.imageAlt}</span>
        </section>

        {/* Project Overview */}
        <section ref={overviewRef} className="bg-white py-14 lg:py-16">
          <div className={sectionShell}>
            <p
              data-cs-reveal
              className="text-[0.8125rem] font-semibold uppercase tracking-[0.18em]"
              style={{ color: '#2495ff' }}
            >
              Project Overview
            </p>
            <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 xl:gap-16">
              <div data-cs-reveal className="space-y-5">
                {study.overview.map((para) => (
                  <p
                    key={para.slice(0, 48)}
                    className="max-w-[42rem] text-[1.125rem] leading-[1.7] text-[#4B5563] sm:text-[1.2rem]"
                  >
                    {para}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {study.characteristics.map((item) => (
                  <FeatureCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Challenges */}
        <section ref={challengesRef} className="bg-[#F5F9FF] py-14 lg:py-16">
          <div className={sectionShell}>
            <p
              data-cs-reveal
              className="text-[0.8125rem] font-semibold uppercase tracking-[0.18em]"
              style={{ color: '#2495ff' }}
            >
              Engineering Challenges
            </p>
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3.5 xl:gap-4">
              {study.challenges.map((item) => (
                <article
                  key={item.id}
                  data-cs-card
                  className="rounded-2xl border border-[#E5EAF2] bg-white px-5 py-5"
                >
                  <div className="text-[#2495ff]">
                    <CaseStudyIcon name={item.icon} className="size-[1.35rem]" />
                  </div>
                  <h3 className="mt-3.5 text-[1.1rem] font-semibold tracking-[-0.015em] text-[#101722]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[1rem] leading-relaxed text-[#5F6B7A]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Solution + Products */}
        <section ref={solutionRef} className="bg-white py-14 lg:py-16">
          <div className={sectionShell}>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
              <div>
                <p
                  data-cs-reveal
                  className="text-[0.8125rem] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: '#2495ff' }}
                >
                  Gee Cee Solution
                </p>
                <p
                  data-cs-reveal
                  className="mt-5 max-w-[36rem] text-[1.125rem] leading-[1.7] text-[#4B5563] sm:text-[1.2rem]"
                >
                  {study.solutionIntro}
                </p>
                <ul className="mt-8 space-y-5">
                  {study.solutions.map((item) => (
                    <li key={item.title} data-cs-card className="flex gap-3.5">
                      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2495ff]">
                        <Check className="size-4" strokeWidth={2.6} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[1.1rem] font-semibold text-[#101722]">{item.title}</p>
                        <p className="mt-1 text-[1.05rem] leading-relaxed text-[#5F6B7A]">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                data-cs-reveal
                className="rounded-3xl bg-[#F0F6FF] px-5 py-7 sm:px-7 sm:py-8 lg:px-8"
              >
                <p
                  className="text-[0.8125rem] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: '#2495ff' }}
                >
                  Products Used
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {study.products.map((product) => {
                    const href = getProjectProductHref(product.name)
                    const cardClass =
                      'block rounded-2xl border border-[#D8E8FA] bg-white px-4 py-4 transition-all duration-200 ease-out hover:border-[#C5DCF5] hover:bg-[#F8FBFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2495ff]'

                    const inner = (
                      <>
                        <p className="text-[1.1rem] font-semibold tracking-[-0.015em] text-[#101722]">
                          {product.name}
                        </p>
                        <p className="mt-1 text-[0.95rem] text-[#6B7280]">
                          {product.categoryLabel}
                        </p>
                      </>
                    )

                    return href ? (
                      <Link
                        key={product.name}
                        to={href}
                        data-cs-product
                        className={cardClass}
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div key={product.name} data-cs-product className={cardClass}>
                        {inner}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Areas of Application */}
        <section ref={applicationsRef} className="bg-white pb-6 pt-4 lg:pb-8 lg:pt-2">
          <div className={sectionShell}>
            <p
              data-cs-reveal
              className="text-[0.8125rem] font-semibold uppercase tracking-[0.18em]"
              style={{ color: '#2495ff' }}
            >
              Areas of Application (For This Project)
            </p>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
              {study.areasOfApplication.map((item) => (
                <div key={item.id} data-cs-card className="min-w-0">
                  <div className="text-[#2495ff]">
                    <CaseStudyIcon name={item.icon} className="size-7" />
                  </div>
                  <h3 className="mt-3.5 text-[1.1rem] font-semibold tracking-[-0.015em] text-[#101722]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[1rem] leading-relaxed text-[#5F6B7A]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcome + Benefits */}
        <section ref={outcomeRef} className="bg-white py-14 lg:py-16">
          <div className={sectionShell}>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
              <div>
                <p
                  data-cs-reveal
                  className="text-[0.8125rem] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: '#2495ff' }}
                >
                  Project Outcome
                </p>
                <ul className="mt-7 space-y-4">
                  {study.outcomes.map((item) => (
                    <li key={item} data-cs-outcome className="flex gap-3.5">
                      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2495ff]">
                        <Check className="size-4" strokeWidth={2.6} aria-hidden="true" />
                      </span>
                      <p className="text-[1.125rem] leading-relaxed text-[#374151]">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p
                  data-cs-reveal
                  className="text-[0.8125rem] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: '#2495ff' }}
                >
                  Key Benefits Delivered
                </p>
                <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
                  {study.benefits.map((item) => (
                    <div
                      key={item.id}
                      data-cs-card
                      className="flex flex-col items-center text-center"
                    >
                      <span className="flex size-14 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2495ff]">
                        <CaseStudyIcon name={item.icon} className="size-7" />
                      </span>
                      <p className="mt-3 text-[0.95rem] font-semibold leading-snug text-[#101722] sm:text-[1rem]">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductsCTA content={projectCaseStudyCTA} />
      </main>
      <Footer />
    </>
  )
}
