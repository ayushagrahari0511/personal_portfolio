import React from 'react'
import Link from 'next/link'

const Header = () => {
    const scrollToSection = (sectionId) => {
        if (sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <header className="relative w-full px-8 py-6 md:px-6 ss:px-4 bg-lightBg z-50">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="text-darkText font-cabinet font-bold text-3xl md:text-2xl ss:text-xl cursor-pointer hover:opacity-70 transition-opacity">
                    A
                </div>

                {/* Right side: Navigation Links + Contact Button */}
                <div className="flex items-center gap-8 md:gap-6">
                    {/* Navigation Links */}
                    <nav className="flex items-center gap-8 md:gap-6 ss:hidden">
                        <button 
                            onClick={() => scrollToSection('home')}
                            className="text-darkText font-cabinet text-lg font-normal hover:opacity-60 transition-opacity"
                        >
                            Home
                        </button>
                        <button 
                            onClick={() => scrollToSection('about')}
                            className="text-darkText font-cabinet text-lg font-normal hover:opacity-60 transition-opacity"
                        >
                            About
                        </button>
                        <button 
                            onClick={() => scrollToSection('works')}
                            className="text-darkText font-cabinet text-lg font-normal hover:opacity-60 transition-opacity"
                        >
                            Works
                        </button>
                    </nav>

                    {/* Contact Button */}
                    <button 
                        onClick={() => scrollToSection('contact')}
                        className="flex items-center gap-2 px-5 py-2.5 md:px-4 md:py-2 ss:px-4 ss:py-2 bg-darkText text-lightBg rounded-full font-cabinet text-sm md:text-xs font-medium hover:scale-105 transition-transform"
                    >
                        Contact
                        <span className="inline-block text-lg md:text-base rotate-[-45deg]">→</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
