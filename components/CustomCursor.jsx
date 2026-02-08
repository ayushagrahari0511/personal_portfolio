import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
    const cursorRef = useRef(null)
    const [isVisible, setIsVisible] = useState(true)
    const mousePos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        // Only run on non-touch devices
        if (typeof window === 'undefined' || 'ontouchstart' in window) {
            setIsVisible(false)
            return
        }

        const cursor = cursorRef.current
        const cursorRing = document.querySelector('.custom-cursor-ring')
        if (!cursor) return

        // Mouse move handler
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY }

            // Smooth follow with GSAP for main cursor
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: 'power3.out'
            })

            // Slightly slower follow for outer ring (parallax effect)
            if (cursorRing) {
                gsap.to(cursorRing, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.7,
                    ease: 'power3.out'
                })
            }
        }

        // Detect if cursor is over interactive elements
        const handleMouseOver = (e) => {
            const target = e.target
            const isInteractive = target.matches('a, button, input, textarea, [role="button"]') ||
                                 target.closest('a, button, input, textarea, [role="button"]')

            if (isInteractive) {
                gsap.to(cursor, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.out'
                })
                if (cursorRing) {
                    gsap.to(cursorRing, {
                        scale: 1.1,
                        duration: 0.3,
                        ease: 'power2.out'
                    })
                }
            }
        }

        const handleMouseOut = (e) => {
            const target = e.target
            const isInteractive = target.matches('a, button, input, textarea, [role="button"]') ||
                                 target.closest('a, button, input, textarea, [role="button"]')

            if (isInteractive) {
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                })
                if (cursorRing) {
                    gsap.to(cursorRing, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    })
                }
            }
        }

        // Hide cursor when mouse leaves window
        const handleMouseLeave = () => {
            gsap.to(cursor, { opacity: 0, duration: 0.2 })
            if (cursorRing) {
                gsap.to(cursorRing, { opacity: 0, duration: 0.2 })
            }
        }

        const handleMouseEnter = () => {
            gsap.to(cursor, { opacity: 1, duration: 0.2 })
            if (cursorRing) {
                gsap.to(cursorRing, { opacity: 1, duration: 0.2 })
            }
        }

        // Set initial position off-screen
        gsap.set(cursor, { xPercent: -50, yPercent: -50 })
        if (cursorRing) {
            gsap.set(cursorRing, { xPercent: -50, yPercent: -50 })
        }

        // Add event listeners
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseover', handleMouseOver)
        window.addEventListener('mouseout', handleMouseOut)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
            window.removeEventListener('mouseout', handleMouseOut)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [])

    if (!isVisible) return null

    return (
        <>
            {/* Main cursor with blend mode for partial color change */}
            <div
                ref={cursorRef}
                className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '2.5px solid white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    mixBlendMode: 'difference'
                }}
            />
            {/* Outer ring for better visibility */}
            {/* <div
                className="custom-cursor-ring fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backgroundColor: 'transparent',
                    mixBlendMode: 'difference'
                }}
            /> */}
        </>
    )
}

export default CustomCursor
