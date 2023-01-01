import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"
import "swiper/css/pagination"
import { Pagination, Autoplay } from 'swiper'
import Image from 'next/image'
import { project } from '../projects'
import Link from 'next/link'

import { style } from '../style'

const Projects = () => {
    const [isSSR, setIsSSR] = useState(false)

    useEffect(() => {
        setIsSSR(() => true)
    }, []);
    return (isSSR &&
        <div className={`${style.flexCenter} flex-col w-[75%] sm:w-[90%] m-auto h-[90vh] space-y-5`}>
            <h5 className='text-[2rem]'>List <span className='text-secondary'>Project</span></h5>
            <h3 className='text-[2.6rem] font-medium text-white !mb-10 text-center'>
                A list of my previous and recent <span className='text-secondary'>projects</span>
            </h3>
            <div className='w-full'>
                <Swiper
                    className="w-full flex items-center justify-center"
                    // slidesPerView={1}
                    spaceBetween={20}
                    modules={[Pagination, Autoplay]}
                    pagination={{
                        clickable: true,
                        type: 'bullets',
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false
                    }}
                    loop={true}
                    navigation
                    breakpoints={
                        {
                            // when window width is >= 990px
                            1200: {
                                slidesPerView: 3,
                            },
                            767.98: {
                                slidesPerView: 2,
                            },
                            575.98: {
                                slidesPerView: 1,
                                navigation: {
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                },
                            },
                        }
                    }>
                    {
                        project.map((project, i) => (
                            <SwiperSlide key={i} className={style.flexCenter}>
                                <div className='w-[30rem] h-[18rem] mb-[4rem] rounded-xl overflow-hidden'>
                                    <Link href={`/project/${project.title}`}>
                                        <div className='w-[30rem] h-[18rem] relative'>
                                            <Image src={project.path} className="w-[30rem] h-[18rem]" fill />
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Projects