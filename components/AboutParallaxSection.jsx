import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const SPEED_FACTOR = .8

export default function AboutParallaxSection() {
  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const lineRef2 = useRef(null)
  const contentRef = useRef(null)
  const contentRef2 = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !wrapperRef.current) return

    const sectionHeight = sectionRef.current.offsetHeight

    const ctx = gsap.context(() => {
      // Parallax: section scrolls faster than the page (Lenis-driven via ScrollTrigger)
      gsap.to(sectionRef.current, {
        y: -sectionHeight * SPEED_FACTOR,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 200%',
          end: 'bottom top',
          scrub: 1
        }
      })

        // Line growth: scaleY 0 to 1 as user scrolls through section
        // ;[ lineRef2.current].forEach((line) => {
        //   if (line) {
        //     gsap.set(line, { scaleY: 0, transformOrigin: 'top center' })
        //     gsap.to(line, {
        //       scaleY: 1,
        //       ease: 'none',
        //       force3D: true,
        //       scrollTrigger: {
        //         trigger: wrapperRef.current,
        //         start: 'top bottom',
        //         end: 'bottom top'
        //       }
        //     })
        //   }
        // })



        // Reveal text: fade in + slide up with stagger
        ;[contentRef2.current].forEach((content) => {
          if (content) {
            const items = content.querySelectorAll('.reveal-item')
            if (items.length) {
              gsap.fromTo(
                items,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  stagger: 0.15,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: content,
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: 1
                  }
                }
              )
            }
          }
        })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} className="relative z-[100]">
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-sectionAccent rounded-tl-2xl rounded-tr-2xl sm:rounded-tl-[15px] sm:rounded-tr-[15px] md:rounded-tl-3xl md:rounded-tr-3xl"
      >
        {/* Main content */}
        <div ref={contentRef} className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-24 xl:px-24 xl:py-28">
          {/* Center line with circles - hidden on mobile */}

          <div className="flex flex-col lg:gap-16 xl:gap-24 w-full max-w-[1400px] mx-auto">
            {/* Left: headline + expect label */}
            <div className="lg:min-w-[320px] xl:min-w-[400px] flex-shrink-0">
              <h2 className="reveal-item text-white font-cabinet font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-10 sm:mb-12">
                I craft full-stack applications, product experiences, and digital solutions that drive{' '}
                <span className="underline">growth</span>, <span className="underline">scalability</span>, and{' '}
                <span className="underline">user delight</span>.
              </h2>
              <p className="reveal-item text-dimWhite font-poppins text-lg sm:text-xl">What you can expect:</p>
            </div>

            {/* Right: paragraphs */}
            <div className="flex flex-col gap-6 sm:gap-8 mt-6 lg:mt-0">
              <p className="reveal-item text-white font-poppins text-lg sm:text-xl leading-relaxed">
                I don&apos;t just write code. I shape strategy, storytelling, design scalable systems, and build
                products that make people say: &quot;I want in!&quot;
              </p>
              <p className="reveal-item text-white font-poppins text-lg sm:text-xl leading-relaxed">
                My work spans full-stack development — from web apps and APIs to modern frameworks — across
                fintech, blockchain, SaaS, and more.
              </p>
            </div>
          </div>
        </div>

        {/* Second block: What I deliver / Product-Focused Experiences */}
        <div
          ref={contentRef2}
          className="relative w-full grid grid-cols-[1fr_0.5fr_1fr] min-h-[100vh] sm:min-h-[55vh] lg:min-h-[80vh] px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-24 xl:px-24 xl:py-28 border-t border-white/10"
        >
          {/* Center line with circles - hidden on mobile */}
          <div className="">
            <h2 className="reveal-item text-white text-right font-cabinet font-extrabold text-3xl sm:text-4xl lg:text-6xl xl:text-7xl leading-tight">
              What I deliver
            </h2>
          </div>
          <div className="lg:flex flex-col pointer-events-none py-12 lg:py-24">
            <div className="w-[30px] h-[30px] mx-auto rounded-full border-[1px] border-white flex items-center justify-center flex-shrink-0">
              <div className="w-[2px] h-[2px] rounded-full bg-white" />
            </div>
            <div className="flex-1 my-[10px] min-h-[70%] w-full flex justify-center">
              <div
                ref={lineRef2}
                className="w-[1px] bg-white/80 origin-top block"
                style={{ transformOrigin: 'top center' }}
              />
            </div>
            <div className="w-[30px] h-[30px] mx-auto rounded-full border-[1px] border-white flex items-center justify-center flex-shrink-0">
              <div className="w-[2px] h-[2px] rounded-full bg-white" />
            </div>
          </div>

          {/* Bottom-right: Product-Focused Experiences */}
          <div className="flex flex-col justify-end">
            <h3 className="reveal-item text-white font-cabinet font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight">
              Product <br /> Focused
              <br />
              Experiences
            </h3>
            <h5>
              Digital products, webapps, mobile apps, brands and marketing websites you'll be excited to put in front of your customers and investors.
            </h5>
          </div>

        </div>
      </section>
    </div>
  )
}
