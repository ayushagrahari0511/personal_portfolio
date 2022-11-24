import React from 'react'
import Image from 'next/image'

const Hero = () => {
    return (
        <div className='h-[70vh]'>
            <div className='h-[3px] w-full bg-gradient-to-r from-[#fdc78d] to-secondary'></div>
            <div className='flex h-full flex-col justify-center items-center space-y-2'>
                <div className='w-[14rem] h-[14rem] flex justify-center items-center rounded-full border-4 border-secondary overflow-hidden'>
                    <div className='w-[12rem] h-[12rem] relative rounded-full hover:scale-[1.25] duration-75'>
                        <Image src="/dev.png" layout='fill' className='rounded-full' />
                    </div>
                </div>
                <h5 className='font-lobster text-secondary text-[3rem]'>Ayush Agrahari</h5>
                <p className='text-[1.2rem] text-dimWhite'>
                    Web Developer
                </p>
            </div>
        </div>
    )
}

export default Hero