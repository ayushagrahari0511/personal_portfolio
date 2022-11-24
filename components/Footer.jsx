import React from 'react'
import Image from 'next/image'

const Footer = () => {
    return (
        <div>
            <div className='w-[75%] m-auto flex justify-between items-end sm:w-[95%]'>
                <div className='w-[7rem] h-[5rem] relative -bottom-[2.5rem] sm:-bottom-[2rem] sm:w-[5rem] sm:h-[4rem]'>
                    <Image src="/cat.png" layout='fill' />
                </div>
                <div className='w-[14rem] h-[26rem] relative -bottom-[1rem] sm:w-[11rem] sm:h-[20rem]'>
                    <Image src="/boy3.png" layout='fill' />
                </div>
            </div>
            <div className='w-full h-[3rem] bg-grey'>
                <div className='w-[75%] m-auto sm:w-[95%]'>
                    <p className='pt-4 text-[1.2rem] text-white'>
                        Made via ReactJs & NextJs
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer