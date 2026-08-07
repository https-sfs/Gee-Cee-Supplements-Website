import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Reveal from '../components/shared/Reveal'
import Button from '../components/ui/Button'
import ProductsCTA from '../components/products/ProductsCTA'
import { industriesCTA, industryDetailCTA } from '../data/categoryCTAs'
import {
  getIndustryDetail,
  getRelatedIndustryDetails,
  industryDetailPath,
  systemHref,
} from '../data/industryDetails'

/**
 * Industry detail — content & structure from Lovable,
 * styled with the Gee Cee design system (Navbar / Footer / tokens).
 * Does not affect the Industries landing page.
 */
export default function IndustryDetailPage() {
  const { industryId } = useParams()
  const industry = getIndustryDetail(industryId)
  const others = getRelatedIndustryDetails(industryId, 3)

  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [industryId])

  useEffect(() => {
    if (!industry) {
      document.title = 'Industry — Gee Cee'
      return
    }

    const title = `${industry.name} — Construction Chemicals | Gee Cee`
    const url = `${window.location.origin}/industries/${industry.slug}`
    document.title = title

    const upsertMeta = (key, value, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${key}"]`
        : `meta[name="${key}"]`
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(isProperty ? 'property' : 'name', key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }

    upsertMeta('description', industry.short)
    upsertMeta('og:title', title, true)
    upsertMeta('og:description', industry.short, true)
    upsertMeta('og:type', 'article', true)
    upsertMeta('og:url', url, true)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [industry])

  if (!industry) {
    return (
      <>
        <Navbar />
        <main style={{ backgroundColor: '#F5FAFF' }}>
          <section className="shell pt-28 pb-24">
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-blue-deep"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> All industries
            </Link>
            <h1 className="display-md mt-10 text-foreground">Industry not found</h1>
            <p className="lede mt-4">
              The industry you&apos;re looking for isn&apos;t available. Return to all industries to
              continue browsing.
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
      <main style={{ backgroundColor: '#F5FAFF' }}>
        <section className="relative overflow-hidden pt-[4.5rem]">
          <div className="absolute inset-0">
            <img src={industry.image} alt="" className="size-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(245,250,255,0.93) 0%, rgba(245,250,255,0.86) 45%, #F5FAFF 100%)',
              }}
            />
          </div>
          <div className="shell relative pb-20 pt-16 lg:pb-28 lg:pt-20">
            <Reveal>
              <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link to="/industries" className="transition-colors hover:text-blue-deep">
                      Industries
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-border">
                    /
                  </li>
                  <li className="font-medium text-foreground">{industry.name}</li>
                </ol>
              </nav>
              <Link
                to="/industries"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-blue-deep"
              >
                <ArrowLeft className="size-4" aria-hidden="true" /> All industries
              </Link>
              <h1 className="display-xl mt-8 max-w-3xl text-foreground">{industry.name}</h1>
              <p
                className="mt-6 max-w-[62ch] text-muted-foreground"
                style={{ fontSize: '1.25rem', lineHeight: 1.7, fontWeight: 400 }}
              >
                {industry.short}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-4">
          <div className="shell grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <Reveal>
              <p
                className="text-muted-foreground"
                style={{ fontSize: '1.25rem', lineHeight: 1.8, fontWeight: 400 }}
              >
                {industry.body}
              </p>
              <h2 className="display-md mt-12 text-[1.5rem] text-foreground">
                What we design against
              </h2>
              <ul className="mt-6 flex flex-col" style={{ gap: '0.9375rem' }}>
                {industry.challenges.map((challenge) => (
                  <li key={challenge} className="flex gap-4">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: '1.125rem', lineHeight: 1.75, fontWeight: 400 }}
                    >
                      {challenge}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div
                className="rounded-[1.25rem] border border-border bg-card p-8"
                style={{ boxShadow: '0 10px 30px rgba(15,23,42,0.06)' }}
              >
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Recommended systems
                </h2>
                <ul className="mt-6 space-y-px overflow-hidden rounded-xl border border-border bg-border">
                  {industry.systems.map((system) => (
                    <li key={system.label} className="bg-card">
                      <Link
                        to={systemHref(system)}
                        className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-blue-soft"
                      >
                        <span
                          className="font-medium text-foreground"
                          style={{ fontSize: '1.125rem', lineHeight: 1.5 }}
                        >
                          {system.label}
                        </span>
                        <ArrowRight
                          className="size-4 shrink-0 text-primary transition-transform duration-500 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="hero" size="lg" className="mt-8 w-full">
                  <a href={industriesCTA.enquiryHref}>Get a recommendation</a>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-y">
          <div className="shell">
            <h2 className="display-md text-foreground">Other sectors</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {others.map((other, i) => (
                <Reveal key={other.slug} delay={i * 80}>
                  <Link
                    to={industryDetailPath(other.slug)}
                    className="lift group block overflow-hidden rounded-[1.25rem] border border-border bg-card"
                    style={{ boxShadow: '0 10px 30px rgba(15,23,42,0.06)' }}
                  >
                    <img
                      src={other.image}
                      alt={other.name}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-[1.2s] [transition-timing-function:var(--ease-cine)] group-hover:scale-105"
                    />
                    <div className="p-6">
                      <h3 className="text-base font-semibold text-foreground">{other.name}</h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA keeps its own white background — intentional contrast */}
        <ProductsCTA content={industryDetailCTA} emphasis="premium" />
      </main>
      <Footer />
    </>
  )
}
