import React from 'react'
import Image from 'next/image'
import { skills, showcaseSkillTitles } from '../skills'

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
  const showcaseList = showcaseSkillTitles
    .map((title) => skills.find((s) => s.title === title))
    .filter(Boolean)

  return (
    <section id="about" data-scroll-section data-scroll data-scroll-speed='-.6' className="w-full py-16 relative z-10 md:py-20">
      <div className="mx-auto px-6">

        <div className='flex flex-col items-center justify-center gap-5'>
          <div className='flex items-center justify-center gap-4'>
            <SkillCard index={0} size="lg" src="/react.png" alt="skills" imageWidth={120} imageHeight={120} />
            <div className="grid grid-cols-2 gap-5">
              <SkillCard index={1} size="sm" src="/html.png" alt="skills" imageWidth={50} imageHeight={50} />
              <SkillCard index={2} size="sm" src="/css.png" alt="skills" imageWidth={50} imageHeight={50} />
              <SkillCard index={3} size="sm" src="/javascript.png" alt="skills" imageWidth={50} imageHeight={50} />
              <SkillCard index={4} size="sm" src="/tailwind.png" alt="skills" imageWidth={50} imageHeight={50} />
            </div>
          </div>

          <div className='flex items-center justify-center gap-4'>
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
