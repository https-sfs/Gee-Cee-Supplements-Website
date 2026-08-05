import { useEffect, useRef, useState } from 'react'

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

/**
 * Counts from 0 → end once when the element enters the viewport.
 *
 * @param {boolean} deferSuffix — when true, suffix is shown only after the count completes
 */
export default function CountUp({
  end,
  suffix = '',
  duration = 1300,
  deferSuffix = false,
  className,
  ...props
}) {
  const ref = useRef(null)
  const rafRef = useRef(0)
  const startedRef = useRef(false)
  const [value, setValue] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setValue(end)
      setDone(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || startedRef.current) {
          return
        }

        startedRef.current = true
        observer.disconnect()

        const startTime = performance.now()

        const tick = (now) => {
          const progress = Math.min(1, (now - startTime) / duration)
          const next = Math.round(end * easeOutCubic(progress))
          setValue(next)

          if (progress < 1) {
            rafRef.current = requestAnimationFrame(tick)
          } else {
            setValue(end)
            setDone(true)
          }
        }

        rafRef.current = requestAnimationFrame(tick)
      },
      { threshold: 0.35, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [end, duration])

  const showSuffix = !deferSuffix || done

  return (
    <span ref={ref} className={className} {...props}>
      {value}
      {suffix ? (
        <span style={deferSuffix && !showSuffix ? { visibility: 'hidden' } : undefined} aria-hidden={deferSuffix && !done}>
          {suffix}
        </span>
      ) : null}
    </span>
  )
}
