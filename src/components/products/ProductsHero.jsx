import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Download } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ProductsHero() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headingRef = useRef(null)
  const bodyRef = useRef(null)
  const buttonsRef = useRef(null)
  const productsRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const nodes = [
        eyebrowRef.current,
        headingRef.current,
        bodyRef.current,
        buttonsRef.current,
        productsRef.current,
      ]

      if (reduced) {
        gsap.set(nodes, { clearProps: 'all', opacity: 1, y: 0, scale: 1 })
        return
      }

      gsap.fromTo(
        eyebrowRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.05 },
      )
      gsap.fromTo(
        headingRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.12 },
      )
      gsap.fromTo(
        bodyRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.2 },
      )
      gsap.fromTo(
        buttonsRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.28 },
      )
      gsap.fromTo(
        productsRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', delay: 0.22 },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Product range"
      className="relative overflow-x-clip bg-white"
      style={{
        paddingTop: '8.25rem',
        paddingBottom: '1.75rem',
        minHeight: 'min(100vh, 53.75rem)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,116,139,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,116,139,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-2%] top-[14%] h-[min(40rem,62vw)] w-[min(48rem,64vw)] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(36,149,255,0.1) 0%, rgba(36,149,255,0.035) 45%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[92rem] px-4 sm:px-5 lg:pl-3 lg:pr-4 xl:pl-4 xl:pr-6">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-4 xl:gap-5">
          {/* Left editorial */}
          <div className="relative z-20 min-w-0 pt-2 lg:pt-6">
            <div ref={eyebrowRef} className="mb-5 flex items-center gap-3">
              <p
                className="text-[0.75rem] font-semibold uppercase tracking-[0.18em]"
                style={{ color: '#2495ff' }}
              >
                Product Range
              </p>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-[rgba(100,116,139,0.35)] sm:w-14"
              />
            </div>

            <h1
              ref={headingRef}
              className="font-display max-w-[11.5ch] font-bold tracking-[-0.045em]"
              style={{
                fontSize: 'clamp(2.4rem, 1.35rem + 2.85vw, 4.25rem)',
                fontWeight: 700,
                lineHeight: 0.96,
              }}
            >
              <span style={{ color: '#101722' }}>
                Construction
                <br />
                Chemicals
              </span>
              <br />
              <span style={{ color: '#2495ff' }}>
                Engineered&nbsp;for
                <br />
                Performance.
              </span>
            </h1>

            <p
              ref={bodyRef}
              className="mt-7 max-w-[580px] text-[1.0625rem] leading-[1.7]"
              style={{ color: '#5F6B7A' }}
            >
              High performance construction chemicals that enhance strength, durability and
              longevity of structures. Manufactured with precision. Trusted for decades.
            </p>

            <div
              ref={buttonsRef}
              className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center"
            >
              <a
                href="#product-categories"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-[0.95rem] font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-500 [transition-timing-function:var(--ease-cine)] hover:-translate-y-0.5 hover:bg-[#4d8ff0] hover:shadow-[var(--shadow-float-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Browse Products
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:info@geeceechem.com?subject=Catalogue%20Request"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-primary/35 bg-white px-8 text-[0.95rem] font-medium text-[#2495ff] transition-all duration-500 [transition-timing-function:var(--ease-cine)] hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <Download className="size-4" aria-hidden="true" />
                Download Catalogue
              </a>
            </div>
          </div>

          {/* Right: complete product artwork — primary visual focus */}
          <div
            ref={productsRef}
            className="relative z-10 flex min-h-[min(34rem,72vw)] min-w-0 items-start justify-start overflow-visible lg:-ml-14 lg:min-h-[38rem] lg:pt-2 xl:-ml-[4.25rem] xl:min-h-[42rem]"
          >
            <img
              src="/media/products/hero-artwork.png"
              alt="Gee Cee product family with blueprint and molecular engineering backdrop"
              className="relative -translate-y-4 w-[108%] max-w-none object-contain object-left-top sm:-translate-y-5 lg:w-[118%] lg:-translate-x-2 lg:-translate-y-6 xl:w-[125%]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
