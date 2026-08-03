import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
  variant = 'up',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-visible={visible ? 'true' : 'false'}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={cn(variant === 'blur' ? 'reveal-blur' : 'reveal', className)}
    >
      {children}
    </Tag>
  )
}
