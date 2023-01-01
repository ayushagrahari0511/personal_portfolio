import { style } from '../style'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"
import "swiper/css/pagination"
import { Pagination, Autoplay } from 'swiper'
import { achievement } from '../achievement'
import Image from 'next/image'

const Achievements = () => {
    return (
        <div className={`${style.flexCenter} flex-col w-[75%] sm:w-[90%] m-auto h-[90vh] space-y-5`}>
            <h5 className='text-[2rem]'>My <span className='text-secondary'>Achievements</span></h5>
            <div className='w-full'>
                <Swiper
                    className="w-full flex items-center justify-center"
                    slidesPerView={1}
                    spaceBetween={20}
                    modules={[Pagination, Autoplay]}
                    pagination={{
                        clickable: true,
                        type: 'bullets',
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false
                    }}
                    loop={true}
                    navigation>
                    {
                        achievement.map((project, i) => (
                            <SwiperSlide key={i} className={style.flexCenter}>
                                <div className=' mb-[4rem] rounded-xl overflow-hidden'>
                                    <div className='w-[75rem] h-[50rem] md:w-[60rem] md:h-[40rem] sm:w-[45rem] sm:h-[32rem] xs:w-[30rem] xs:h-[22rem] relative'>
                                        <Image src={project.img} fill />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Achievements