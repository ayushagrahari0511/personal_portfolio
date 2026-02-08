import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import LeftSidebar from './LeftSidebar'
import DecorativeElements from './DecorativeElements'
import ScrollIndicator from './ScrollIndicator'

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const Hero = ({ setIsOpen }) => {
    const heroRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const roleRef = useRef(null)

    useEffect(() => {
        // Only run animations on client side
        if (typeof window === 'undefined') return

        const ctx = gsap.context(() => {
            // Timeline for entrance animations
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            // 1. Title fade in
            tl.to('.hero-title', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.3
            })

            // 2. Subtitle slide up and fade in with word stagger
            tl.to('.hero-subtitle', {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.1
            }, '-=0.3')

            // 3. Role slide up and fade in with word stagger
            tl.to('.hero-role', {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.1
            }, '-=0.7')

            // 4. Social sidebar slide from left
            tl.fromTo('.social-icon', 
                {
                    x: -50,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 0.8,
                    duration: 1,
                    // stagger: 0.15,
                    ease: 'ease.inOut'
                }, '-=0.8')

            // 5. Decorative elements fade in
            tl.from('.decorative-elements > *', {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                stagger: 0.1
            }, '-=0.5')

            // 6. Scroll indicator fade and bounce
            tl.from('.scroll-indicator', {
                opacity: 0,
                y: -20,
                duration: 0.6,
                ease: 'bounce.out'
            }, '-=0.3')

            // Floating animation for circles
            gsap.to('.circle-float', {
                y: '20px',
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            })

            gsap.to('.circle-float-delayed', {
                y: '-15px',
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 0.5
            })

            // Parallax effect for decorative circles on scroll
            gsap.utils.toArray('.circle-float, .circle-float-delayed').forEach((circle) => {
                gsap.to(circle, {
                    y: '100px',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1
                    }
                })
            })

            // Hide scroll indicator when scrolling past hero
            ScrollTrigger.create({
                trigger: heroRef.current,
                start: 'bottom center',
                end: 'bottom top',
                onEnter: () => {
                    gsap.to('.scroll-indicator', { opacity: 0, duration: 0.3 })
                },
                onLeaveBack: () => {
                    gsap.to('.scroll-indicator', { opacity: 1, duration: 0.3 })
                }
            })

        }, heroRef)

        return () => ctx.revert() // Cleanup
    }, [])

    useEffect(() => {
        // Initial positioning for elements that will animate in
        gsap.set('.hero-title', { opacity: 0, y: 20 })
        gsap.set('.hero-subtitle', { opacity: 0, y: 30 })
        gsap.set('.hero-role', { opacity: 0, y: 30 })
    }, [])

    return (
        <section 
            id="hero"
            ref={heroRef}
            className="relative flex flex-col justify-center items-center min-h-[80vh] w-full overflow-hidden bg-lightBg"
        >
            {/* Left Sidebar */}
            <LeftSidebar />

            {/* Decorative Elements */}
            <DecorativeElements />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center w-full px-4">
                {/* Small intro text */}
                <div 
                    ref={titleRef}
                    className="text-darkText text-center font-cabinet text-3xl md:text-2xl ss:text-xl font-normal mb-12 opacity-0 hero-title"
                >
                    Hi! i&apos;m Ayush
                </div>

                {/* Main headline */}
                <div className="flex flex-col items-center gap-2">
                    <h1 
                        ref={subtitleRef}
                        className="text-darkText text-center font-cabinet font-bold text-[10rem] xl:text-[8rem] lg:text-[6.5rem] md:text-[5rem] sm:text-[3.8rem] ss:text-[2.8rem] leading-[1.1] opacity-0 hero-subtitle"
                    >
                        Full-stack Developer
                    </h1>
                    <h2 
                        ref={roleRef}
                        className="text-darkText text-center font-cabinet font-bold text-[10rem] xl:text-[8rem] lg:text-[6.5rem] md:text-[5rem] sm:text-[3.8rem] ss:text-[2.8rem] leading-[1.1] opacity-0 hero-role"
                    >
                        Creative dev.
                    </h2>
                   
                </div>
            </div>

            {/* Scroll Indicator */}
            <ScrollIndicator />
        </section>
    )
}

export default Hero
