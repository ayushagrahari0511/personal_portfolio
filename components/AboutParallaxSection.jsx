import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutParallaxSection() {
  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const contentRef = useRef(null)
  const contentRef2 = useRef(null)
  const titleRef = useRef(null)
  const titleLine1Ref = useRef(null)
  const titleLine2Ref = useRef(null)
  const titleLine3Ref = useRef(null)
  const subtitleRef = useRef(null)
  const bottomCircleStrokeRef = useRef(null)
  const bottomCircleWrapperRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !wrapperRef.current || !bottomCircleStrokeRef.current || !bottomCircleWrapperRef.current || !titleLine1Ref.current || !titleLine2Ref.current || !titleLine3Ref.current || !subtitleRef.current) return

    const line1Inner = titleLine1Ref.current.querySelector('.title-line-inner')
    const line2Inner = titleLine2Ref.current.querySelector('.title-line-inner')
    const line3Inner = titleLine3Ref.current.querySelector('.title-line-inner')
    if (!line1Inner || !line2Inner || !line3Inner) return

    gsap.set(bottomCircleWrapperRef.current, { opacity: 0 })
    gsap.set([line1Inner, line2Inner, line3Inner], { opacity: 0, y: 24 })
    gsap.set(subtitleRef.current, { opacity: 0, y: 24 })

    let tl = gsap.timeline(
      {
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 120%',
          end: 'bottom 50%',
        }
      }
    )

    tl.to(lineRef.current, {
      height: '100%',
      ease: "power1.out",
      force3D: true,
      duration: 0.8,
    }, '<')
    // Draw the bottom circle border (0% → 100%) in sync with the line; reveal circle wrapper
    const circleRadius = 14
    const circleCircumference = 2 * Math.PI * circleRadius
    tl.set(bottomCircleStrokeRef.current, { strokeDasharray: circleCircumference, strokeDashoffset: circleCircumference })
    tl.to(bottomCircleWrapperRef.current, { opacity: 1, duration: 0.8 }, '<')
    tl.to(bottomCircleStrokeRef.current, {
      strokeDashoffset: 0,
      ease: 'power1.out',
      duration: 0.8,
    }, '<')
    // Wave reveal: title lines then subtitle with stagger
    tl.to(line1Inner, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
    tl.to(line2Inner, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.35')
    tl.to(line3Inner, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.35')
    tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.35')

  }, [])

  return (
    <div ref={wrapperRef} className="relative z-[100]">
      <section
        ref={sectionRef}
        data-scroll-section
        data-scroll
        data-scroll-offset="-250%"
        data-scroll-speed=".9"
        data-scroll-enable-touch-speed=".9"
        className="relative w-full overflow-hidden bg-[#0f2222] rounded-tl-2xl rounded-tr-2xl sm:rounded-tl-[15px] sm:rounded-tr-[15px] md:rounded-tl-3xl md:rounded-tr-3xl"
      >
        {/* Main content */}
        <div ref={contentRef} className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-24 xl:px-24 xl:py-28">
          {/* Center line with circles - hidden on mobile */}

          <div className="flex flex-col lg:gap-16 xl:gap-24 w-full max-w-[1400px] mx-auto">
            {/* Left: headline + expect label */}
            <div className="lg:min-w-[320px] xl:min-w-[400px] flex-shrink-0">
              <h2 className="reveal-item text-[#DADADA] font-cabinet font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-10 sm:mb-12" data-scroll data-scroll-class="is-inview">
                I craft full-stack applications, product experiences, and digital solutions that drive{' '}
                <span className="underline">growth</span>, <span className="underline">scalability</span>, and{' '}
                <span className="underline">user delight</span>.
              </h2>
              <p className="reveal-item text-dimWhite font-poppins text-lg sm:text-xl" data-scroll data-scroll-class="is-inview">What you can expect:</p>
            </div>

            {/* Right: paragraphs */}
            <div className="flex flex-col gap-6 sm:gap-8 mt-6 lg:mt-0">
              <p className="reveal-item text-[#DADADA] font-poppins text-lg sm:text-xl leading-relaxed" data-scroll data-scroll-class="is-inview">
                I don&apos;t just write code. I shape strategy, storytelling, design scalable systems, and build
                products that make people say: &quot;I want in!&quot;
              </p>
              <p className="reveal-item text-[#DADADA] font-poppins text-lg sm:text-xl leading-relaxed" data-scroll data-scroll-class="is-inview">
                My work spans full-stack development — from web apps and APIs to modern frameworks — across
                fintech, blockchain, SaaS, and more.
              </p>
            </div>
          </div>
        </div>

        {/* Second block: What I deliver / Product-Focused Experiences */}
        <div
          ref={contentRef2}
          className="relative w-full grid grid-cols-[1fr_0.5fr_1fr] min-h-[100vh] sm:flex sm:flex-col sm:min-h-[60vh] lg:min-h-[80vh] px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-24 xl:px-24 xl:py-28 border-t border-white/10"
        >
          {/* Center line with circles - hidden on mobile */}
          <div className="">
            <h2 className="text-[#DADADA] text-left font-cabinet font-extrabold text-3xl sm:text-6xl lg:text-8xl xl:text-8xl leading-tight">
              What <br/> I deliver
            </h2>
          </div>
          <div className="lg:flex flex-col pointer-events-none py-12 lg:py-24 sm:py-6">
            <div className="w-[30px] h-[30px] mx-auto rounded-full border-[1px] border-white flex items-center justify-center flex-shrink-0">
              <div className="w-[2px] h-[2px] rounded-full bg-white" />
            </div>
            <div className=" my-[10px] h-[70%] sm:h-[150px] w-full">
              <div
                ref={lineRef}
                className="w-[1px] mx-auto bg-white/80 origin-top block"
                style={{ transformOrigin: 'top center' }}
              />
            </div>
            <div ref={bottomCircleWrapperRef} className="w-[30px] h-[30px] mx-auto flex items-center justify-center flex-shrink-0">
              <svg width="30" height="30" viewBox="0 0 30 30" className="overflow-visible">
                <circle
                  ref={bottomCircleStrokeRef}
                  cx="15"
                  cy="15"
                  r="14"
                  fill="none"
                  stroke="rgba(218,218,218,1)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <circle cx="15" cy="15" r="1" fill="white" />
              </svg>
            </div>
          </div>

          {/* Bottom-right: Product-Focused Experiences */}
          <div className="flex flex-col justify-end">
            <h2 ref={titleRef} className="text-[#DADADA] text-right font-cabinet font-extrabold text-3xl sm:text-6xl lg:text-8xl xl:text-8xl leading-tight">
              <span ref={titleLine1Ref} className="block overflow-hidden">
                <span className="inline-block title-line-inner">Product</span>
              </span>
              <span ref={titleLine2Ref} className="block overflow-hidden">
                <span className="inline-block title-line-inner">Focused</span>
              </span>
              <span ref={titleLine3Ref} className="block overflow-hidden">
                <span className="inline-block title-line-inner">Experiences</span>
              </span>
            </h2>
            <h5 ref={subtitleRef} className="text-[#DADADA] text-right opacity-0">
              Digital products, webapps, mobile apps, brands and marketing websites you&apos;ll be excited to put in front of your customers and investors.
            </h5>
          </div>
        </div>
      </section>
    </div>
  )
}
