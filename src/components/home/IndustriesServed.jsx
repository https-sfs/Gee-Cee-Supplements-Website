import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../shared/SectionHeading'
import { industries } from '../../data/industries'

gsap.registerPlugin(ScrollTrigger)

export default function IndustriesServed() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const chapters = root.querySelectorAll('[data-industry-chapter]')

    const ctx = gsap.context(() => {
      chapters.forEach((chapter) => {
        const media = chapter.querySelector('[data-industry-media]')
        const image = chapter.querySelector('[data-industry-image]')
        const caption = chapter.querySelector('[data-industry-caption]')

        if (!media || !image || !caption) return

        if (reduced) {
          gsap.set([media, image, caption], { clearProps: 'all', opacity: 1 })
          return
        }

        gsap.set(media, { y: 48, opacity: 0 })
        gsap.set(image, { scale: 1.05 })
        gsap.set(caption, { y: 28, opacity: 0 })

        const enter = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: 'top 82%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        })

        enter
          .to(media, {
            y: 0,
            opacity: 1,
            duration: 1.15,
            ease: 'power2.out',
          })
          .to(
            image,
            {
              scale: 1,
              duration: 1.35,
              ease: 'power2.out',
            },
            0,
          )
          .to(
            caption,
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power2.out',
            },
            0.28,
          )

        gsap.to(image, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: chapter,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, root)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="industries"
      aria-labelledby="industries-heading"
      className="relative engineering-atmosphere section-y"
    >
      <div className="shell relative">
        <SectionHeading
          titleId="industries-heading"
          kicker="Engineering Applications"
          title="Wherever concrete has to be trusted."
          body="Gee Cee specifies construction chemical systems across infrastructure, commercial, industrial and residential projects — by exposure, load and programme, not by catalogue page."
        />

        <div className="mt-16 flex flex-col gap-16 sm:gap-20 lg:mt-24 lg:gap-28">
          {industries.map((industry, index) => (
            <article
              key={industry.slug}
              data-industry-chapter
              aria-labelledby={`industry-${industry.slug}`}
              className="w-full"
            >
              <div
                data-industry-media
                className="relative h-[58vh] min-h-[20rem] w-full overflow-hidden rounded-[1.75rem] opacity-0 sm:h-[62vh] sm:min-h-[24rem] lg:h-[65vh]"
              >
                <img
                  data-industry-image
                  src={industry.image}
                  alt=""
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="absolute inset-0 size-full object-cover will-change-transform"
                  style={{ transform: 'scale(1.05)' }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div
                  data-industry-caption
                  className="absolute inset-x-0 bottom-0 p-7 opacity-0 sm:p-9 lg:p-11"
                >
                  <h3
                    id={`industry-${industry.slug}`}
                    className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
                  >
                    {industry.name}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                    {industry.caption}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
