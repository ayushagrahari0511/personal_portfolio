import React from 'react'
import Image from 'next/image'
import StarryBackground from './StarryBackground'

const Hero = () => {
    return (
        <section className="relative flex flex-col justify-center items-center h-screen w-full overflow-hidden bg-[#0a0a0a]">
            {/* Starry background */}
            <StarryBackground />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center w-full px-4">
                {/* Optional badge */}


                {/* Headline - force 2 lines only */}
                <h1 className="text-white text-center max-w-[600px] ss:max-w-[90%] font-semibold text-7xl lg:text-7xl md:text-6xl ss:text-4xl leading-tight whitespace-pre-line break-words">
                    I help founders turn ideas <br className="ss:hidden" /> into seamless
                    <span className="italic font-serif text-secondary text-7xl lg:text-7xl md:text-7xl ss:text-5xl"> digital experiences</span>
                </h1>

                {/* Subheading with profile */}
                <div className="mt-14 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4 ss:gap-0 text-3xl md:text-2xl ss:flex-col text-gray-300">
                        <div className="flex gap-4 items-center">
                            Hello, I&apos;m Ayush {""}
                            <span className="inline-block w-15 h-15 ss:w-[80px] flex items-center justify-center rounded-full overflow-hidden border-2 ss:border-1 border-secondary align-middle">
                                <img src="/dev3.png" alt="profile" className="w-[50px] ss:w-[40px] h-[50px] ss:h-[40px]" />
                            </span>
                        </div>
                        a Full Stack Developer
                    </div>
                </div>

                {/* CTA and Email */}
                <div className="mt-14 flex flex-col items-center gap-8">
                    <a href="#contact" className="flex items-center gap-2 px-10 py-5 bg-secondary text-black text-2xl font-semibold rounded-full shadow-lg hover:scale-105 transition-transform">
                        Let&apos;s Connect
                        <span className="inline-block text-3xl">→</span>
                    </a>
                    <div className="flex items-center gap-2 text-gray-300 text-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.5 7.5a2.25 2.25 0 01-3.182 0l-7.5-7.5A2.25 2.25 0 012.25 6.993V6.75" />
                        </svg>
                        agrahariayush0511@gmail.com
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero