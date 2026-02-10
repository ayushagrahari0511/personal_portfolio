import React from 'react'

const DecorativeElements = () => {
    return (
        <>
            {/* Hide all decorative elements on mobile */}
            <div className="decorative-elements sm:hidden">
                {/* Top right circle */}
                <div className="absolute top-[15%] right-[10%] w-20 h-20 rounded-full border border-darkText opacity-30 circle-float" data-scroll data-scroll-speed="0.3"></div>

                {/* Center right circle */}
                <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-16 h-16 rounded-full border border-darkText opacity-25 circle-float-delayed" data-scroll data-scroll-speed="0.2"></div>

            
                {/* Bottom left decorative element */}
                <div className="absolute bottom-[10%] left-[15%] w-12 h-12 border border-darkText opacity-20 rounded-full" data-scroll data-scroll-speed="0.25"></div>
            </div>
        </>
    )
}

export default DecorativeElements
