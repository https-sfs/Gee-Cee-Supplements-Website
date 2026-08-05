import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

/**
 * Observes a product-grid row. When ~20% visible, staggers child
 * `.product-row-reveal-item` cards into view once.
 */
export default function ProductRowReveal({ children, className }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-visible={visible ? 'true' : 'false'}
      className={cn('product-row-reveal', className)}
    >
      {children}
    </div>
  )
}
