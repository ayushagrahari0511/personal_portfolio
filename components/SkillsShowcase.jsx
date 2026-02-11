import React, { useRef, useCallback } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { skills, showcaseSkillTitles } from '../skills'

const MAX_OFFSET = 20
const SENSITIVITY = 0.2

function SkillCard({ index, size, src, alt, imageWidth, imageHeight, bgClass = 'bg-[#f8f8f8]' }) {
  const isLarge = size === 'lg'
  const rotateRight = index % 2 === 0
  return (
    <div
      className={`
        flex items-center justify-center border-2 border-[#fff] relative shadow-xl rounded-2xl p-4
        transition-transform duration-200 ease-out cursor-pointer
        hover:scale-105 hover:z-10
        ${isLarge ? 'w-[230px] h-[230px]' : 'w-[100px] h-[100px]'}
        ${bgClass}
        ${rotateRight ? 'hover:rotate-2' : 'hover:-rotate-2'}
      `}
    >
      <Image src={src} alt={alt} width={imageWidth} height={imageHeight} />
    </div>
  )
}

export default function SkillsShowcase() {
  const sectionRef = useRef(null)
  const contentWrapperRef = useRef(null)
  const showcaseList = showcaseSkillTitles
    .map((title) => skills.find((s) => s.title === title))
    .filter(Boolean)

  const handleSectionMouseMove = useCallback((e) => {
    if (!sectionRef.current || !contentWrapperRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = e.clientX - centerX
    const offsetY = e.clientY - centerY
    const clampedX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offsetX * SENSITIVITY))
    const clampedY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offsetY * SENSITIVITY))
    gsap.to(contentWrapperRef.current, {
      x: clampedX,
      y: clampedY,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [])

  const handleSectionMouseLeave = useCallback(() => {
    if (!contentWrapperRef.current) return
    gsap.to(contentWrapperRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      data-scroll-section
      data-scroll
      data-scroll-speed='-.9'
      data-scroll-enable-touch-speed='-.9'
      className="w-full py-16 relative z-10 md:py-20"
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
    >
      <div className="mx-auto px-6">

        <div ref={contentWrapperRef} className='flex flex-col items-center justify-center gap-5'>
          <div className='flex items-center sm:flex-col justify-center gap-4'>
            <SkillCard index={0} size="lg" src="/react.png" alt="skills" imageWidth={120} imageHeight={120} />
            <div className="grid grid-cols-2 gap-5">
              <SkillCard index={1} size="sm" src="/html.png" alt="skills" imageWidth={50} imageHeight={50} />
              <SkillCard index={2} size="sm" src="/css.png" alt="skills" imageWidth={50} imageHeight={50} />
              <SkillCard index={3} size="sm" src="/javascript.png" alt="skills" imageWidth={50} imageHeight={50} />
              <SkillCard index={4} size="sm" src="/tailwind.png" alt="skills" imageWidth={50} imageHeight={50} />
            </div>
          </div>

          <div className='flex items-center sm:flex-col-reverse justify-center gap-4'>
            <div className="grid grid-cols-2 gap-5">
              <SkillCard index={5} size="sm" src="/typescript.png" alt="skills" imageWidth={50} imageHeight={50} />
              <SkillCard index={6} size="sm" src="/postman.png" alt="skills" imageWidth={50} imageHeight={50} />
              <SkillCard index={7} size="sm" src="/docker.png" alt="skills" imageWidth={50} imageHeight={50} />
              <SkillCard index={8} size="sm" src="/postgres.svg" alt="skills" imageWidth={50} imageHeight={50} />
            </div>
            <SkillCard index={9} size="lg" src="/awsicon.png" alt="skills" imageWidth={120} imageHeight={120} bgClass="bg-black" />
          </div>
        </div>

      </div>
    </section>
  )
}
