import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { project as projects } from '../projects'
import Link from 'next/link'
import { useRouter } from 'next/router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import WaveText from './WaveText'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768; // Simple check for mobile
    const [isSSR, setIsSSR] = useState(false)
    const container = useRef(null)

    useEffect(() => {
        setIsSSR(true)
    }, [])

    useLayoutEffect(() => {
        if (!isSSR || isMobile) return;

        let ctx = gsap.context(() => {
            const sections = gsap.utils.toArray(".project-card");

            sections.forEach((card) => {
                // Select all elements to animate within this card
                // We combine the generic text and the title words into one timeline or stagger
                const texts = card.querySelectorAll(".animate-text, .animate-title-word");

                gsap.fromTo(texts,
                    {
                        y: 50,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.05,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 55%", // Triggers when the top of the card hits 75% down the viewport
                            end: "bottom top",
                            toggleActions: "play none none reverse" // Play on enter, reverse on leave back up
                        }
                    }
                );
            });
        }, container);

        return () => ctx.revert();
    }, [isSSR, isMobile]);

    const getTechName = (path) => {
        const map = {
            "/html.png": "HTML",
            "/css.png": "CSS",
            "/react.png": "REACT",
            "/next2.png": "NEXTJS",
            "/git.png": "GIT",
            "/tailwind.png": "TAILWIND",
            "/vite.png": "VITE",
            "/node1.png": "NODEJS",
            "/express.png": "EXPRESS",
            "/mongodb.png": "MONGODB",
            "/nginx.svg": "NGINX",
            "/three.svg": "THREEJS",
        }
        return map[path] || "TECH"
    }

    return (isSSR &&
        <div ref={container} className="w-full min-h-screen py-20 px-4 sm:px-2 sm:py-10 flex flex-col items-center gap-20">
            <div className="w-full flex flex-col items-center">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="project-card w-full max-w-[1400px] min-h-screen sticky top-0 flex items-center justify-center p-4 sm:p-0 md:p-8"
                    >
                        <div className="w-full min-h-screen bg-[#111] rounded-[40px] sm:rounded-[20px] p-8 sm:p-6 md:p-12 relative overflow-hidden group shadow-2xl border border-white/5 mx-auto">

                            {/* Blurred Background Image */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={project.path}
                                    alt=""
                                    fill
                                    className="object-cover opacity-50 blur-[50px] scale-120 transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 z-10"></div>
                            </div>

                            {/* Radial Gradient Overlay */}
                            {/* <div
                                className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20 blur-[100px] rounded-full pointer-events-none z-10"
                                style={{ background: `radial-gradient(circle, ${project.bgColor1}, transparent 50%)` }}
                            /> */}

                            {/* Grid Content Container */}
                            <div className="relative z-20 grid grid-cols-2 sm:grid-cols-1 h-full gap-6 sm:gap-2">

                                {/* Top Left: Index */}
                                <div className='flex flex-col justify-between'>
                                    <div className="flex items-start justify-start">
                                        <div className="animate-text p-2 relative w-[130px] h-[130px] sm:w-[100px] sm:h-[100px] rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md">
                                            <span className="text-white/80 font-mono text-xl sm:text-lg">
                                                {String(index + 1).padStart(2, '0')} <span className="text-white/30">|</span> {String(projects.length).padStart(2, '0')}
                                            </span>
                                            <div className="absolute top-4 text-[10px] tracking-widest text-white/40 uppercase">Project</div>
                                        </div>
                                    </div>

                                    {/* Bottom Left: Title, Desc, Link */}
                                    <div className="flex flex-col justify-end pb-[100px] sm:pb-0">
                                        <h2 className="text-5xl sm:text-4xl md:text-8xl font-medium text-white font-cabinet leading-[0.9] mb-6">
                                            <Link href={`/project/${project.title}`} className="hover:text-white/80 transition-colors">
                                                {project.title.split(' ').map((word, i) => (
                                                    <span key={i} className="animate-title-word block">{word}</span>
                                                ))}
                                            </Link>
                                        </h2>

                                        <p className="animate-text text-white/60 text-lg sm:text-sm max-w-md leading-relaxed mb-6 line-clamp-3 md:line-clamp-none">
                                            {project.about[0]}
                                        </p>

                                        <Link href={project.link} target="_blank" className="animate-text inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors uppercase tracking-widest text-sm group/link w-fit">
                                            ( <span className="border-b border-transparent group-hover/link:border-white transition-all">
                                                <WaveText>
                                                    Visit Site
                                                </WaveText>
                                            </span> <span className="text-xl leading-none">↗</span> )
                                        </Link>
                                    </div>
                                </div>

                                {/* Bottom Right: Image */}
                                <div className='flex flex-col justify-between'>
                                    {/* Top Right: Meta (Subtitle & Tech) */}
                                    <div className="flex flex-col items-start justify-start gap-4 sm:gap-1 pt-[50px] sm:pt-[10px]">
                                        <span className="animate-text text-white font-mono uppercase tracking-wider text-sm font-medium">
                                            {project.subTitle || "WEBSITE"}
                                        </span>
                                        <div className="animate-text h-[1px] w-full bg-white/20 my-1"></div>
                                        <div className="animate-text flex flex-wrap gap-2 text-white/60 text-xs font-mono uppercase items-center">
                                            {project.mainTech.map((tech, i) => (
                                                <span key={i} className="flex items-center gap-2">
                                                    {i > 0 && <span className="text-white/20">•</span>}
                                                    {getTechName(tech)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="relative w-full pt-[100px] pb-[100px] sm:pb-[10px] sm:pt-[20px]">
                                        <div className="relative w-full md:w-[120%] sm:w-full shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] origin-bottom-right rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a]">
                                            {/* Browser Header */}
                                            <div className="flex justify-between items-center px-4 py-3 bg-[#2a2a2a] border-b border-white/5">
                                                <div className="flex gap-1.5 opacity-50">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                                                </div>
                                                <div className="flex gap-2 text-[10px] font-medium opacity-50 uppercase tracking-widest text-white/60">
                                                    {project.domain}
                                                </div>
                                                <div className="w-10"></div> {/* Spacer for alignment */}
                                            </div>

                                            {/* Image Container */}
                                            <div className="relative w-full cursor-pointer group/image">
                                                <Link href={`/project/${project.title}`} className="block w-full relative">
                                                    {/* <Image
                                                        src={project.path}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover object-top transition-all duration-700 group-hover/image:scale-105"
                                                    /> */}
                                                    <img src={project.path} alt={project.title} className="object-cover object-top transition-all duration-700 group-hover/image:scale-105" />
                                                    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Projects