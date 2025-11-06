import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
    }

    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, behavior: 'auto' })
      } catch (error) {
        if (typeof document !== 'undefined') {
          document.documentElement?.scrollTo?.(0, 0)
        }
      }
    } else if (typeof document !== 'undefined') {
      document.documentElement?.scrollTo?.(0, 0)
    }
  }, [pathname, hash])

  return null
}
