import React from 'react'
import Image from 'next/image'
import { skills } from '../skills'
import { style } from '../style'
import Icon from './icon'

const Skills = () => {
    return (
        <div className='w-full h-screen'>
            <div className='w-[75%] flex justify-between items-center h-screen
             m-auto md:flex-col md:w-[85%] md:justify-center md:items-start md:space-y-24 xs:w-[95%]' >
                <div className='space-y-6'>
                    <h5 className='text-[2rem] text-white'>
                        Technology <span className='text-secondary'>Stack</span>
                    </h5>
                    <h2 className='text-[3.6rem] text-white w-[39rem] md:w-[80%] xs:!w-full xs:text-[3rem]'>
                        A list of familiar technology stack in web development
                    </h2>
                </div>
                <div className='flex flex-wrap justify-start items-start gap-5 max-w-[35rem]'>
                    {
                        skills.map((icon, i) => (
                            <Icon path={icon.path} key={i} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Skills