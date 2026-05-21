import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Initializes Locomotive Scroll and syncs it with GSAP ScrollTrigger
 * so parallax effects in ScrollMarqueeBanner, AboutParallaxSection, Hero work correctly.
 */
export default function SmoothScroll({ children }) {
  const containerRef = useRef(null)
  const locoScrollRef = useRef(null)
  const router = useRouter()

  const scrollToTop = () => {
    if (locoScrollRef.current?.lenisInstance) {
      locoScrollRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    ScrollTrigger.refresh()
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    let locoScroll
    let resizeCleanup

    const init = async () => {
      locoScroll = new LocomotiveScroll({
        lenisOptions: {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          // smoothTouch: true,
          // Enable touch scroll sync so mobile/touch scrolling updates Lenis and ScrollTrigger
          // syncTouch: true,
          // syncTouchLerp: 0.075,
          // touchMultiplier: 2,
        },
        scrollCallback: () => ScrollTrigger.update(),
        // Use GSAP ticker for sync with ScrollTrigger
        initCustomTicker: (render) => gsap.ticker.add(render),
        destroyCustomTicker: (render) => gsap.ticker.remove(render)
      })

      // Tell ScrollTrigger to use Locomotive's scroll position
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (locoScroll?.lenisInstance) {
            if (arguments.length) {
              locoScroll.scrollTo(value, { immediate: true })
            }
            return locoScroll.lenisInstance.scroll
          }
          return value ?? 0
        },
        getBoundingClientRect: () =>
          ({ top: 0, left: 0, width: window.innerWidth, height: window.innerHeight })
      })

      // Update ScrollTrigger when Locomotive scrolls
      locoScroll.lenisInstance?.on?.('scroll', ScrollTrigger.update)

      // Prevent GSAP lag smoothing from interfering with scroll
      gsap.ticker.lagSmoothing(0)

      // Refresh ScrollTrigger after layout (fixes Next.js/React timing)
      const refresh = () => ScrollTrigger.refresh()
      requestAnimationFrame(() => requestAnimationFrame(refresh))
      setTimeout(refresh, 500)

      // Refresh on resize
      const handleResize = () => {
        locoScroll?.resize?.()
        ScrollTrigger.refresh()
      }
      window.addEventListener('resize', handleResize)
      resizeCleanup = () => window.removeEventListener('resize', handleResize)

      locoScrollRef.current = locoScroll
    }

    init()

    return () => {
      resizeCleanup?.()
      locoScroll?.destroy?.()
      locoScrollRef.current = null
    }
  }, [])

  // Scroll to top (or hash target) on route change
  useEffect(() => {
    const handleRouteChange = (url) => {
      const hash = url.split('#')[1]
      if (hash) {
        requestAnimationFrame(() => {
          const el = document.getElementById(hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
            return
          }
          scrollToTop()
        })
        return
      }
      scrollToTop()
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <div ref={containerRef} data-scroll-container>
      {children}
    </div>
  )
}
