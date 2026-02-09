import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const WaveText = ({ children, className }) => {
    const containerRef = useRef(null)
    const topLayerRef = useRef(null)
    const bottomLayerRef = useRef(null)
    const topCharsRef = useRef([])
    const bottomCharsRef = useRef([])

    useEffect(() => {
        // Split text into individual characters for both layers
        const topLayer = topLayerRef.current
        const bottomLayer = bottomLayerRef.current
        if (!topLayer || !bottomLayer) return

        const text = children.toString()
        const chars = text.split('')
        
        // Clear both layers
        topLayer.innerHTML = ''
        bottomLayer.innerHTML = ''
        
        // Create character spans for top layer
        topCharsRef.current = chars.map(char => {
            const span = document.createElement('span')
            span.textContent = char === ' ' ? '\u00A0' : char
            span.style.display = 'inline-block'
            span.style.willChange = 'transform'
            topLayer.appendChild(span)
            return span
        })

        // Create character spans for bottom layer (duplicate)
        bottomCharsRef.current = chars.map(char => {
            const span = document.createElement('span')
            span.textContent = char === ' ' ? '\u00A0' : char
            span.style.display = 'inline-block'
            span.style.willChange = 'transform'
            bottomLayer.appendChild(span)
            return span
        })
    }, [children])

    const handleMouseEnter = () => {
        // Kill any in-progress leave animation so we don't get competing tweens
        gsap.killTweensOf([...topCharsRef.current, ...bottomCharsRef.current])
        // Animate both layers moving up with wave effect
        gsap.to([topCharsRef.current, bottomCharsRef.current], {
            y: '-100%',
            duration: 0.3,
            stagger: 0.03,
            ease: 'power2.inOut',
            force3D: true
        })
    }

    const handleMouseLeave = () => {
        // Kill any in-progress enter animation so we don't get competing tweens
        gsap.killTweensOf([...topCharsRef.current, ...bottomCharsRef.current])
        // Reverse animation - both layers return to original positions
        gsap.to(topCharsRef.current, {
            y: 0,
            duration: 0.2,
            stagger: {
                each: 0.02,
                from: 'start'
            },
            ease: 'power2.inOut',
            force3D: true
        })
        gsap.to(bottomCharsRef.current, {
            y: 0,
            duration: 0.2,
            stagger: {
                each: 0.02,
                from: 'start'
            },
            ease: 'power2.inOut',
            force3D: true
        })
    }

    return (
        <span 
            ref={containerRef}
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ 
                display: 'inline-block',
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            {/* Top layer - initially visible */}
            <span 
                ref={topLayerRef}
                style={{ display: 'inline-block' }}
            >
                {children}
            </span>
            
            {/* Bottom layer - initially hidden below */}
            <span 
                ref={bottomLayerRef}
                style={{ 
                    display: 'inline-block',
                    position: 'absolute',
                    top: '100%',
                    left: 0
                }}
            >
                {children}
            </span>
        </span>
    )
}

export default WaveText
