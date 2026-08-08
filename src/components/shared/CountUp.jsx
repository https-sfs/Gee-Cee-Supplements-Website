import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Treat values > 20 as milliseconds (legacy Call sites use 1300–1400). */
function toSeconds(value) {
  if (value == null) return 0
  return value > 20 ? value / 1000 : value
}

/**
 * Counts from 0 → end once when the element enters the viewport (GSAP + ScrollTrigger).
 *
 * @param {number} end — target integer
 * @param {string} [suffix] — static suffix shown beside the number (e.g. "+", " TPD", " T")
 * @param {number} [duration=1800] — animation length; ms if > 20, otherwise seconds
 * @param {number} [delay=0] — start delay; ms if > 5, otherwise seconds
 * @param {boolean} [deferSuffix] — when true, suffix is reserved in layout but hidden until done
 */
export default function CountUp({
  end,
  suffix = '',
  duration = 1800,
  delay = 0,
  deferSuffix = false,
  className,
  ...props
}) {
  const rootRef = useRef(null)
  const numRef = useRef(null)
  const suffixRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const numEl = numRef.current
    if (!root || !numEl) return

    const durationSec = toSeconds(duration)
    const delaySec = toSeconds(delay)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      numEl.textContent = String(end)
      if (suffixRef.current && deferSuffix) {
        suffixRef.current.style.visibility = 'visible'
      }
      return
    }

    numEl.textContent = '0'
    if (suffixRef.current && deferSuffix) {
      suffixRef.current.style.visibility = 'hidden'
    }

    const counter = { value: 0 }
    const tween = gsap.to(counter, {
      value: end,
      duration: durationSec,
      delay: delaySec,
      ease: 'power2.out',
      onUpdate: () => {
        numEl.textContent = String(Math.round(counter.value))
      },
      onComplete: () => {
        numEl.textContent = String(end)
        if (suffixRef.current && deferSuffix) {
          suffixRef.current.style.visibility = 'visible'
        }
      },
      scrollTrigger: {
        trigger: root,
        start: 'top 88%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [end, duration, delay, deferSuffix])

  return (
    <span ref={rootRef} className={className} {...props}>
      <span ref={numRef}>0</span>
      {suffix ? (
        <span ref={suffixRef} aria-hidden={deferSuffix ? true : undefined}>
          {suffix}
        </span>
      ) : null}
    </span>
  )
}

/** Parse display strings like "18+", "200 TPD", "200 T", "1999". */
export function parseCounterValue(raw) {
  const match = String(raw).trim().match(/^(\d+)(.*)$/)
  if (!match) return { end: 0, suffix: '' }
  return { end: Number(match[1]), suffix: match[2] ?? '' }
}
