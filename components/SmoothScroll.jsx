import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Initializes Lenis smooth scroll and syncs it with GSAP ScrollTrigger
 * so Hero parallax and other scroll-driven animations work correctly.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let lenis
    let rafId

    const init = async () => {
      const Lenis = (await import('lenis')).default
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
      })

      // Tell ScrollTrigger to use Lenis's scroll position
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop: () => lenis.scroll,
        getBoundingClientRect: () =>
          ({ top: 0, left: 0, width: window.innerWidth, height: window.innerHeight })
      })

      // Update ScrollTrigger when Lenis scrolls
      lenis.on('scroll', ScrollTrigger.update)

      // Run Lenis on GSAP's ticker for sync
      const tickerUpdate = (time) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(tickerUpdate)
      gsap.ticker.lagSmoothing(0)
      rafId = tickerUpdate
    }

    init()

    return () => {
      if (rafId) gsap.ticker.remove(rafId)
      lenis?.destroy()
    }
  }, [])

  return children
}
