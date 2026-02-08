import React from 'react'

const ScrollIndicator = () => {
    const scrollToNext = () => {
        const heroSection = document.getElementById('hero')
        if (heroSection) {
            const nextSection = heroSection.nextElementSibling
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    return (
        <>
            {/* Scroll down text - center bottom */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 scroll-indicator">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-darkText font-cabinet text-sm opacity-60 tracking-wide">
                        scroll down
                    </span>
                    <svg 
                        className="w-4 h-4 text-darkText opacity-60 animate-bounce"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>

            {/* Floating circular scroll button - bottom right */}
            <button
                onClick={scrollToNext}
                className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-darkText text-lightBg flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all duration-300 shadow-lg scroll-button sm:w-12 sm:h-12 sm:bottom-6 sm:right-6"
                aria-label="Scroll to next section"
            >
                <svg 
                    className="w-6 h-6 sm:w-5 sm:h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </>
    )
}

export default ScrollIndicator
