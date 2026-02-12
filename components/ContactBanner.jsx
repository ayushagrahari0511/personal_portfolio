import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactBanner = ({ setConnectOpen }) => {
    const container = useRef(null);
    const baseText = useRef(null);
    const revealText = useRef(null);
    const overlay = useRef(null);

    useEffect(() => {
        const el = baseText.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ paused: true });

            tl.to(overlay.current, {
                scaleY: 1,
                duration: 0.5,
                ease: 'power3.out',
                transformOrigin: 'center center',
            })
                .to(revealText.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power3.out',
                }, '-=0.3');

            const onEnter = () => tl.play();
            const onLeave = () => tl.reverse();
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);

            return () => {
                el.removeEventListener('mouseenter', onEnter);
                el.removeEventListener('mouseleave', onLeave);
            };
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={container}
            className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden cursor-pointer bg-lightBg border-t border-black/10 group"
            onClick={() => {
                if (setConnectOpen) setConnectOpen(true);
                else {
                    const footer = document.getElementById('contact');
                    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
                }
            }}
        >
            {/* Base Text - hover target for reveal */}
            <h2
                ref={baseText}
                className="text-[8vw] sm:text-[12vw] leading-none font-cabinet font-bold text-black uppercase tracking-tighter text-center px-4 cursor-pointer"
            >
                Have a project<br /> in mind?
            </h2>

            {/* Overlay - Initially scaleY 0, pointer-events-none so hover passes through to base text */}
            <div
                ref={overlay}
                className="absolute top-[50%] -translate-y-[50%] inset-0 h-[fit-content] bg-black z-10 flex items-center justify-center overflow-hidden scale-y-0 pointer-events-none"
            >
                {/* Reveal Text */}
                <h2
                    ref={revealText}
                    className="text-[8vw] sm:text-[12vw] leading-none font-cabinet font-bold text-white uppercase tracking-tighter translate-y-10 opacity-0 text-center px-4 py-[120px]"
                >
                    Let&apos;s Talk
                </h2>
            </div>
        </div>
        
    );
};

export default ContactBanner;
