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

/** Approved dissolve — image left → white right (Roads). */
const FADE_IMAGE_LEFT = `linear-gradient(
  90deg,
  transparent 0%,
  transparent 40%,
  rgba(255, 255, 255, 0.08) 47%,
  rgba(255, 255, 255, 0.28) 54%,
  rgba(255, 255, 255, 0.55) 61%,
  rgba(255, 255, 255, 0.82) 68%,
  rgba(255, 255, 255, 0.96) 74%,
  #ffffff 80%,
  #ffffff 100%
)`

/** Mirrored dissolve — white left → image right (Bridges). */
const FADE_IMAGE_RIGHT = `linear-gradient(
  90deg,
  #ffffff 0%,
  #ffffff 20%,
  rgba(255, 255, 255, 0.96) 26%,
  rgba(255, 255, 255, 0.82) 32%,
  rgba(255, 255, 255, 0.55) 39%,
  rgba(255, 255, 255, 0.28) 46%,
  rgba(255, 255, 255, 0.08) 53%,
  transparent 60%,
  transparent 100%
)`

/** Locked section height — Roads master; all photo industry sections must match. */
const SECTION_HEIGHT = 'min(35.25rem, 78vh)'

/** Locked copy column — identical for Roads and mirrored Bridges. */
const CONTENT_WIDTH = '430px'

/**
 * Photographic editorial industry section — approved Roads master template.
 * Pass `mirror` to flip: content left + image right (Bridges & Flyovers).
 * Orientation is the only difference; spacing, width, and type are shared.
 */
export default function IndustryPhotoSection({
  number,
  name,
  description,
  image,
  imageAlt,
  applications = [],
  href,
  mirror = false,
  /** Optional object-position override, e.g. "center 55%" */
  imageObjectPosition,
  /** Optional zoom-out factor (1 = default; 0.88 ≈ 12% more environment visible) */
  imageScale = 1,
}) {
  const sectionRef = useRef(null)
  const copyRef = useRef(null)
  const mediaRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const copy = copyRef.current
    const media = mediaRef.current

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([copy, media], { clearProps: 'all', opacity: 1, y: 0, x: 0 })
        return
      }

      gsap.fromTo(
        media,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 78%',
            once: true,
          },
        },
      )

      gsap.fromTo(
        copy,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.12,
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
  }, [mirror])

  const edgePad = 'clamp(1.25rem, 4vw, 5rem)'
  const objectPosition =
    imageObjectPosition || (mirror ? '72% center' : '28% center')
  const zoomOut = imageScale > 0 && imageScale < 1
  const fillScale = zoomOut ? 1 / imageScale : 1

  return (
    <article
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-white"
      style={{ height: SECTION_HEIGHT, minHeight: SECTION_HEIGHT }}
    >
      {/* Photography — hairline inset on outer edge only */}
      <div
        ref={mediaRef}
        className={cn(
          'pointer-events-none absolute inset-y-0 z-0 overflow-hidden',
          mirror
            ? 'left-0 right-0 md:right-1 lg:right-1.5 xl:right-2'
            : 'right-0 left-0 md:left-1 lg:left-1.5 xl:left-2',
        )}
        aria-hidden="true"
      >
        <img
          src={image}
          alt=""
          className={cn(
            'absolute max-w-none object-cover',
            zoomOut
              ? 'left-1/2 top-1/2'
              : cn(
                  'inset-0 h-full w-full',
                  !imageObjectPosition &&
                    (mirror
                      ? 'object-[72%_center] lg:object-[68%_center]'
                      : 'object-[28%_center] lg:object-[32%_center]'),
                ),
          )}
          style={
            zoomOut
              ? {
                  width: `${imageScale * 100}%`,
                  height: `${imageScale * 100}%`,
                  objectPosition: objectPosition,
                  transform: `translate(-50%, -50%) scale(${fillScale})`,
                }
              : imageObjectPosition
                ? {
                    objectPosition: imageObjectPosition,
                  }
                : undefined
          }
        />
        <div
          className="absolute inset-0"
          style={{ background: mirror ? FADE_IMAGE_RIGHT : FADE_IMAGE_LEFT }}
        />
      </div>

      {/* Mobile: copy on solid white */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] lg:hidden"
        style={{
          background: mirror
            ? 'linear-gradient(180deg, #ffffff 0%, #ffffff 38%, rgba(255,255,255,0.7) 52%, transparent 72%)'
            : 'linear-gradient(180deg, transparent 0%, transparent 28%, rgba(255,255,255,0.7) 48%, #ffffff 62%)',
        }}
      />

      <div
        className={cn(
          'relative z-10 flex h-full w-full items-center',
          mirror ? 'justify-start pr-4 sm:pr-5' : 'justify-end pl-4 sm:pl-5',
        )}
        style={{
          height: '100%',
          ...(mirror
            ? { paddingLeft: edgePad }
            : { paddingRight: edgePad }),
        }}
      >
        <div
          ref={copyRef}
          className="relative z-20 shrink-0 py-14 text-left sm:py-16 lg:py-[4.5rem]"
          style={{ width: `min(100%, ${CONTENT_WIDTH})`, maxWidth: CONTENT_WIDTH }}
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
            className="mt-4 text-base leading-[1.7] text-left sm:mt-5 sm:text-[1.125rem] sm:leading-[1.75]"
            style={{ color: '#4B5563', maxWidth: CONTENT_WIDTH }}
          >
            {description}
          </p>

          {applications.length > 0 ? (
            <ul className="mt-8 flex flex-nowrap gap-x-6 sm:mt-9 sm:gap-x-7">
              {applications.map((app) => {
                const Icon = APPLICATION_ICONS[app.icon]
                return (
                  <li
                    key={app.label}
                    className="group/app flex shrink-0 flex-col items-start gap-2"
                  >
                    {Icon ? (
                      <Icon
                        aria-hidden="true"
                        className="size-5 text-[#9CA3AF] transition-colors duration-300 group-hover/app:text-[#2F80ED]"
                        strokeWidth={1.6}
                      />
                    ) : null}
                    <span className="whitespace-nowrap text-[0.8125rem] font-medium tracking-wide text-[#6B7280] transition-colors duration-300 group-hover/app:text-[#2F80ED]">
                      {app.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          ) : null}

          <Link
            to={href}
            className="group/cta mt-6 inline-flex w-fit items-center gap-2 text-[0.95rem] font-semibold transition-colors duration-300 ease-out hover:text-[#1D6FD0] sm:mt-8"
            style={{ color: '#2F80ED' }}
          >
            Explore Solutions
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-out group-hover/cta:translate-x-1"
            />
          </Link>
        </div>
      </div>

      <span className="sr-only">{imageAlt || name}</span>
    </article>
  )
}
