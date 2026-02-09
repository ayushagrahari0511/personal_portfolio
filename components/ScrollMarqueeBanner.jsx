import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const TEXT = 'PRODUCT-FOCUSED DEVELOPER '
const COPY_COUNT = 4

const SPEED_FACTOR = .8

export default function ScrollMarqueeBanner() {
  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const segmentRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !trackRef.current || !segmentRef.current || !wrapperRef.current) return

    const segmentWidth = segmentRef.current.offsetWidth
    const sectionHeight = sectionRef.current.offsetHeight

    const marqueeTween = gsap.to(trackRef.current, {
      x: -segmentWidth,
      duration: 23,
      repeat: -1,
      ease: 'none'
    })

    const ctx = gsap.context(() => {
      // Existing: marquee speed increases with scroll (when section is in pin-like range)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1000',
        onUpdate: (self) => {
          const progress = self.progress
          const timeScale = 1 + progress * 2
          marqueeTween.timeScale(timeScale)
        }
      })

      // Parallax: banner scrolls faster than the page (Lenis-driven via ScrollTrigger)
      gsap.to(sectionRef.current, {
        y: -sectionHeight * SPEED_FACTOR,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    }, wrapperRef)

    return () => {
      marqueeTween.kill()
      ctx.revert()
    }
  }, [])

  return (
    <div ref={wrapperRef} className="relative z-[100]">
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-primary py-8 sm:py-[40px] lg:py-[80px] xl:py-[100px] rounded-tl-2xl rounded-tr-2xl sm:rounded-tl-[15px] sm:rounded-tr-[15px] md:rounded-tl-3xl md:rounded-tr-3xl"
      >
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max flex-nowrap whitespace-nowrap border-t border-b border-[#f5f5f5a3]"
        >
          {Array.from({ length: COPY_COUNT }).map((_, i) => (
            <span
              key={i}
              ref={i === 0 ? segmentRef : null}
              className="inline-block px-8 text-[#DADADA] font-cabinet font-extrabold uppercase text-[11rem] sm:text-[9rem] md:text-[15rem] xl:text-[19rem] tracking-wider whitespace-nowrap"
            >
              {TEXT}
            </span>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}
