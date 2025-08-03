import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"
import "swiper/css/pagination"
import { Pagination, Autoplay } from 'swiper'
import Image from 'next/image'
import { project } from '../projects'
import Link from 'next/link'

import { style } from '../style'
import { useRouter } from 'next/router'

const Projects = () => {
    const navigate = useRouter()
    const [isSSR, setIsSSR] = useState(false)

    useEffect(() => {
        setIsSSR(() => true)
    }, []);

    return (isSSR &&
        <div className={`${style.flexCenter} flex-col w-[75%] sm:w-[95%] m-auto min-h-[90vh] space-y-5`}>
            <h3 className='text-[4rem] font-bold font-serif text-white !mb-10 text-center'>
                Curated {""}
                <span className="bg-gradient-to-r italic from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-pulse bg-300% animate-gradient-x">
                    Work
                </span>
            </h3>

            <div className='w-full'>
                <div className="space-y-[40px] ss:space-y-[25px]">
                    {project.map((project) => (
                        <div key={project.id} onClick={() => navigate.push(`/project/${project.title}`)} className="relative cursor-pointer max-w-[850px] m-auto p-[10px] rounded-[10px] shadow-2xl bg-slate-900" style={{ boxShadow: "rgba(0, 0, 0, 0.5) 0px 15px 25px, rgba(0, 0, 0, 0.35) 0px 10px 15px, rgba(0, 0, 0, 0.25) 0px 4px 6px" }}>
                            <div className={` ${project.gradient} p-8 rounded-[6px] ss:p-1 `} style={{ background: `radial-gradient(circle at 50% 0%, ${project.bgColor1}, ${project.bgColor2})` }}>
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4 ss:flex-col ss:mb-2 ss:pl-3 ss:pt-2">
                                    <div className="ss:mb-1">
                                        <h2 className="text-[32px] ss:text-[25px] font-medium text-white mb-2 ss:mb-0">{project.title}</h2>
                                        <p className="text-white/80 text-[16px] ss:text-[15px]">{project.description}</p>
                                    </div>

                                    {/* Tech Stack Icons */}
                                    <div className="flex gap-0">
                                        {project.mainTech.map((tech, index) => (
                                            <div key={index} className="w-[45px] h-[45px] ss:w-[33px] ss:h-[33px] p-2 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold border border-white/20">
                                                <img src={tech} alt="" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Project Mockup */}
                                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-5 ss:p-3 border border-white/20">
                                    {/* Browser Bar */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        </div>
                                        <div className="flex-1 bg-white/10 rounded-lg px-4 py-1 text-white/60 text-[11px]">
                                            {project?.domain}
                                        </div>
                                    </div>

                                    {/* Mockup Content */}
                                    <div className={`rounded-xl text-center min-h-96 flex flex-col justify-center`}>
                                        <img src={project.path} className="rounded-xl" fill />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Projects