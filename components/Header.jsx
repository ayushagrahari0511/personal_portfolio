import React, { useRef, useState } from 'react'
import Link from 'next/link'
import WaveText from './WaveText'
import { gsap } from 'gsap'

const Header = ({ setConnectOpen }) => {
    const contactButtonRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)
    const [buttonTransform, setButtonTransform] = useState({ x: 0, y: 0 })

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

    const handleButtonMouseMove = (e) => {
        if (!contactButtonRef.current) return
        
        const button = contactButtonRef.current
        const rect = button.getBoundingClientRect()
        const buttonCenterX = rect.left + rect.width / 2
        const buttonCenterY = rect.top + rect.height / 2
        
        // Calculate offset from center
        const offsetX = e.clientX - buttonCenterX
        const offsetY = e.clientY - buttonCenterY
        
        // Clamp to max offset (15px)
        const maxOffset = 15
        const clampedX = Math.max(-maxOffset, Math.min(maxOffset, offsetX * 0.3))
        const clampedY = Math.max(-maxOffset, Math.min(maxOffset, offsetY * 0.3))
        
        setButtonTransform({ x: clampedX, y: clampedY })
    }

    const handleButtonMouseLeave = () => {
        setIsHovered(false)
        // Animate back to center with GSAP
        if (contactButtonRef.current) {
            gsap.to(contactButtonRef.current, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            })
        }
    }

    const handleButtonMouseEnter = () => {
        setIsHovered(true)
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
                            className="text-darkText font-cabinet text-lg font-normal cursor-pointer"
                        >
                            <WaveText>Home</WaveText>
                        </button>
                        <button 
                            onClick={() => scrollToSection('about')}
                            className="text-darkText font-cabinet text-lg font-normal cursor-pointer"
                        >
                            <WaveText>About</WaveText>
                        </button>
                        <button 
                            onClick={() => scrollToSection('works')}
                            className="text-darkText font-cabinet text-lg font-normal cursor-pointer"
                        >
                            <WaveText>Works</WaveText>
                        </button>
                    </nav>

                    {/* Contact Button with Sliding Background and Cursor Follow */}
                    <button 
                        ref={contactButtonRef}
                        onClick={() => (setConnectOpen ? setConnectOpen(true) : scrollToSection('contact'))}
                        onMouseMove={handleButtonMouseMove}
                        onMouseEnter={handleButtonMouseEnter}
                        onMouseLeave={handleButtonMouseLeave}
                        className="relative flex items-center gap-2 px-5 py-2.5 md:px-4 md:py-2 ss:px-4 ss:py-2 bg-darkText text-lightBg rounded-full font-cabinet text-sm md:text-xs font-medium overflow-hidden transition-transform"
                        style={{
                            transform: `translate(${buttonTransform.x}px, ${buttonTransform.y}px)`
                        }}
                    >
                        <WaveText>Contact</WaveText>
                        <span className="inline-block text-lg md:text-base rotate-[-45deg]">→</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
