import React from 'react'
import { style } from '../../style'
import Image from 'next/image'
import Icon from '../Icon'
import Link from 'next/link'

const Header = ({ data }) => {
    return (
        data &&
        <div className={`w-full flex-col ${style.flexCenter}`}>
            <div className='h-[3px] w-full bg-gradient-to-r from-[#fdc78d] to-secondary'></div>
            <div className={`bg-[url("/shiney.svg")] ${style.flexCenter} flex-col bg-center bg-cover bg-no-repeat w-full h-[60vh]`}>
                <h5 className='text-[2.6rem] sm:text-[2rem] text-secondary font-lobster'>
                    {data.subTitle}
                </h5>
                <h3 className='text-[3.4rem] sm:text-[2.6rem] text-white font-medium'>
                    {data.title}
                </h3>
            </div>

            <Link href="/" className='text-[1.4rem] text-secondary underline mt-5 w-[75%] font-medium'>
                Home
            </Link>

            {/* About Project-----------------------------
            ------------------- */}
            <div className={`w-[75%] md:w-[85%] h-[90vh] flex justify-between items-center tablet:flex-col tablet:justify-center tablet:space-y-12`}>
                <div className='space-y-4'>
                    <h4 className='text-[2.8rem] mb-6 text-white tablet:text-center'>
                        About Project
                    </h4>
                    {
                        data.about.map((info, i) => (
                            <div key={i} className="max-w-[44rem] tablet:max-w-[52rem] p-[.8rem] rounded-md bg-grey">
                                <p className='text-dimWhite text-[1.8rem] tablet:text-[1.6rem]'>
                                    {info}
                                </p>
                            </div>
                        ))
                    }
                </div>
                <div className='w-[28rem] h-[28rem] tablet:w-[22rem] tablet:h-[22rem] bg-white rounded-full'>
                    <div className='w-[26rem] h-[26rem] tablet:w-[20rem] tablet:h-[20rem] relative left-8 tablet:left-10'>
                        <Image src="/discuss.png" layout="fill" />
                    </div>
                </div>
            </div>

            {/* Technology Stack -------------
            ----------------- */}

            <div className={`w-[75%] h-[90vh] ${style.flexCenter} justify-around tablet:flex-col-reverse tablet:h-[120vh]`}>
                <div className={`${style.flexCenter} flex-col space-y-8`}>
                    <h2 className='text-white text-[2.8rem] mb-10'>Technology Stack</h2>
                    <div className='w-[20rem] h-[20rem] bg-white rounded-full'>
                        <div className='w-[23rem] h-[20rem] relative left-5'>
                            <Image src="/bodydesk.png" layout='fill' />
                        </div>
                    </div>
                    <div className='max-w-[45rem] flex justify-start flex-wrap gap-3'>
                        {
                            data.tech.map((skill, i) => (
                                <Icon key={i} path={skill} />
                            ))
                        }
                    </div>
                </div>
                <div className={`${style.flexCenter} flex-col space-y-8`}>
                    <div className='w-[30rem] h-[20rem] rounded-lg overflow-hidden'>
                        <div className='w-[30rem] h-[20rem] relative'>
                            <Image src={data.path} layout="fill" />
                        </div>
                    </div>
                    <div className='space-x-6'>
                        <a href={data.link} target="_blank" rel="noreferrer">
                            <button className={`${style.button}`}>
                                Live Site
                            </button>
                        </a>
                        <a href={data.github} target="_blank" rel="noreferrer">
                            <button className={`${style.button} border-white text-secondary`}>
                                Github Code
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header