import React from 'react'
import { style } from '../style'
import Image from 'next/image'

const Icon = ({ path }) => {
    return (
        <div className={`w-[6rem] h-[6rem] bg-grey ${style.flexCenter} rounded-md`}>
            <div className='w-[4rem] h-[4rem] relative hover:scale-125 duration-100'>
                <Image src={path} layout="fill" />
            </div>
        </div>
    )
}

export default Icon