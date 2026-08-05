import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets window scroll on every route pathname change.
 * Hash links (in-page anchors) scroll to their target instead.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      // Defer so the destination route can mount first
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' })
        }
      })
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
