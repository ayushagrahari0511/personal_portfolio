import React from 'react'
import Image from 'next/image'
import { skills } from '../skills'
import { style } from '../style'
import Icon from './Icon'

const Skills = () => {
    return (
        <div className='w-full relative z-[100]'>
            <div className='w-[75%] flex flex-col justify-center items-center min-h-[90vh]
             m-auto md:w-[85%] xs:w-[95%]' >
                <div className='space-y-4 flex flex-col items-center'>
                    <h5 className='text-[2rem] text-white'>
                        MY SKILLS
                    </h5>
                    <h3 className='text-[4rem] font-semibold  text-white !mb-10 text-center'>
                        The Secret {""}
                        <span className="bg-gradient-to-r font-serif italic from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-pulse bg-300% animate-gradient-x">
                            Sauce
                        </span>
                    </h3>
                </div>
                <div className='flex flex-wrap justify-center items-start gap-5 max-w-[85rem]'>
                    {
                        skills.map((icon, i) => (
                            <div key={i} className='text-white flex items-center justify-center gap-2 rounded-[6px] bg-[#171717] border-[1px] border-[#424242] pt-[5px] pb-[5px] pl-[15px] pr-[15px] ss:pl-[10px] ss:pr-[10px] '>
                                <div className='w-[20px] h-[20px] relative'>
                                    <Image src={icon.path} fill />
                                </div>
                                <p className='text-[14px] ss:text-[13px]'>{icon.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Skills