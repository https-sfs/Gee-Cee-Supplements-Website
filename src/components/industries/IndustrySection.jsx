import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Map, Road, Route, Waypoints } from 'lucide-react'
import { cn } from '../../lib/utils'

gsap.registerPlugin(ScrollTrigger)

const APPLICATION_ICONS = {
  road: Road,
  waypoints: Waypoints,
  route: Route,
  map: Map,
}

/**
 * Full-width editorial industry section — no cards, shadows, or boxed chrome.
 * Pass `reverse` for Image | Text (even sections).
 */
export default function IndustrySection({
  number,
  name,
  description,
  image,
  imageAlt,
  applications = [],
  href,
  reverse = false,
}) {
  const rootRef = useRef(null)
  const contentRef = useRef(null)
  const mediaRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const content = contentRef.current
    const media = mediaRef.current

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([content, media], { clearProps: 'all', opacity: 1, x: 0, scale: 1 })
        return
      }

      gsap.fromTo(
        content,
        { x: reverse ? 28 : -28, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 78%',
            once: true,
          },
        },
      )

      gsap.fromTo(
        media,
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 78%',
            once: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [reverse])

  return (
    <article
      ref={rootRef}
      className={cn(
        'grid items-center gap-8 sm:gap-9',
        reverse
          ? 'lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)] lg:gap-10 xl:gap-12'
          : 'lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-10 xl:gap-12',
      )}
    >
      {/* Content */}
      <div
        ref={contentRef}
        className={cn(
          'flex min-w-0 flex-col justify-center lg:py-4',
          reverse ? 'lg:order-2' : 'lg:order-1',
        )}
      >
        <p
          className="font-display font-bold tabular-nums"
          style={{
            color: '#2F80ED',
            fontSize: 'clamp(3.25rem, 2.8rem + 1.2vw, 3.75rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
          }}
        >
          {number}
        </p>

        <h2
          className="font-display mt-5 font-bold tracking-[-0.03em] sm:mt-6"
          style={{
            color: '#111827',
            fontSize: 'clamp(1.875rem, 1.6rem + 0.8vw, 2.25rem)',
            lineHeight: 1.15,
            fontWeight: 700,
          }}
        >
          {name}
        </h2>

        <p
          className="mt-4 max-w-[520px] text-base leading-[1.7] sm:mt-5 sm:text-[1.125rem] sm:leading-[1.75]"
          style={{ color: '#4B5563' }}
        >
          {description}
        </p>

        {applications.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-5 sm:mt-9">
            {applications.map((app) => {
              const Icon = APPLICATION_ICONS[app.icon]
              return (
                <li
                  key={app.label}
                  className="group/app flex min-w-[5.5rem] flex-col items-start gap-2 sm:min-w-0"
                >
                  {Icon ? (
                    <Icon
                      aria-hidden="true"
                      className="size-5 text-[#9CA3AF] transition-colors duration-300 group-hover/app:text-[#2F80ED]"
                      strokeWidth={1.6}
                    />
                  ) : null}
                  <span className="text-[0.8125rem] font-medium tracking-wide text-[#6B7280] transition-colors duration-300 group-hover/app:text-[#2F80ED]">
                    {app.label}
                  </span>
                </li>
              )
            })}
          </ul>
        ) : null}

        <Link
          to={href}
          className="group/cta mt-8 inline-flex w-fit items-center gap-2 text-[0.95rem] font-semibold transition-colors duration-300 ease-out hover:text-[#1D6FD0] sm:mt-10"
          style={{ color: '#2F80ED' }}
        >
          Explore Solutions
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 ease-out group-hover/cta:translate-x-1"
          />
        </Link>
      </div>

      {/* Immersive photography — dominant visual weight, no card chrome */}
      <div
        ref={mediaRef}
        className={cn(
          'relative min-w-0 self-stretch',
          reverse ? 'lg:order-1' : 'lg:order-2',
        )}
      >
        <img
          src={image}
          alt={imageAlt || name}
          loading="lazy"
          decoding="async"
          className="h-[min(72vw,26rem)] w-full rounded-[18px] object-cover object-center sm:h-[28rem] lg:h-full lg:min-h-[640px] xl:min-h-[700px]"
        />
      </div>
    </article>
  )
}
