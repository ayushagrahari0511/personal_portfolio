import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ setConnectOpen }) => {
    const currentYear = new Date().getFullYear();
    const socialRefs = useRef([]);
    const navRefs = useRef([]);
    const ctaRef = useRef(null);
    const brandSectionRef = useRef(null);
    const brandTitleRef = useRef(null);
    const brandTaglineRef = useRef(null);
    const devSectionRef = useRef(null);
    const devTextRef = useRef(null);

    const socialLinks = [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ayushagrahari0511/' },
        { name: 'GitHub', url: 'https://github.com/ayushagrahari0511' },
        { name: 'X', url: 'https://x.com/ayush_dev0511' },
    ];

    const navLinks = [
        { name: 'Contact', href: '#contact', openConnect: true },
        { name: 'Projects', href: '#works' },
    ];

    // Magnetic Effect Logic
    const handleMouseMove = (e, element) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        const maxOffset = 40;
        const clampedX = Math.max(-maxOffset, Math.min(maxOffset, offsetX * 0.6));
        const clampedY = Math.max(-maxOffset, Math.min(maxOffset, offsetY * 0.6));

        gsap.to(element, {
            x: clampedX,
            y: clampedY,
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = (element) => {
        if (!element) return;
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out"
        });
    };

    // Reveal text animation on scroll
    useEffect(() => {
        if (!brandSectionRef.current || !brandTitleRef.current || !brandTaglineRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set([brandTitleRef.current, brandTaglineRef.current], { opacity: 0, y: 40 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: brandSectionRef.current,
                    start: 'top 55%',
                    toggleActions: 'play none none reverse',
                },
            })
                .to(brandTitleRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                })
                .to(brandTaglineRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                }, '-=0.4');

            // DEV animation only on larger screens (≥768px) - hidden on mobile via CSS
            if (devSectionRef.current && devTextRef.current && window.matchMedia('(min-width: 768px)').matches) {
                gsap.set(devTextRef.current, { opacity: 0, y: 60 });
                gsap.timeline({
                    scrollTrigger: {
                        trigger: devSectionRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                })
                    .to(devTextRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                    });
            }
        }, brandSectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer className="w-full bg-black text-white border-t border-white/10 font-cabinet overflow-hidden">
            {/* Main Content Area */}
            <div className="max-w-[1400px] flex flex-col gap-[180px] mx-auto min-h-[70vh] sm:min-h-[50vh] sm:gap-[40px]">

                {/* Column 1 & 2 (Left Side) */}
                <div className="p-6 md:p-10 grid grid-cols-2 sm:grid-cols-1 sm:p-4 justify-between sm:gap-2 relative z-10">
                    <div ref={brandSectionRef}>
                        <h3
                            ref={brandTitleRef}
                            className="text-[6rem] font-bold mb-2 sm:mb-0 tracking-tight overflow-hidden"
                        >
                            AYUSH
                        </h3>
                        <p
                            ref={brandTaglineRef}
                            className="text-lg font-bold overflow-hidden"
                        >
                            Do it once. Do it right.
                        </p>
                    </div>


                    <div className="flex-1 p-6 flex justify-end sm:justify-start items-center gap-2 sm:gap-5 sm:p-0">
                        {socialLinks.map((link, index) => (
                            <div
                                key={link.name}
                                onMouseMove={(e) => handleMouseMove(e, socialRefs.current[index])}
                                onMouseLeave={() => handleMouseLeave(socialRefs.current[index])}
                                ref={(el) => (socialRefs.current[index] = el)}>
                                <a

                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 hover:text-white text-sm uppercase tracking-wide flex items-center gap-1 p-4 sm:p-0"

                                >
                                    {link.name} <span className="text-xs transform -rotate-45">→</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex sm:flex-col relative z-10">

                    <div className="mt-20 flex justify-center sm:justify-start md:mt-0 sm:px-6">
                        <div
                            ref={ctaRef}
                            className="inline-block"
                            onMouseMove={(e) => handleMouseMove(e, ctaRef.current)}
                            onMouseLeave={() => handleMouseLeave(ctaRef.current)}
                        >
                            {setConnectOpen ? (
                                <button
                                    onClick={() => setConnectOpen(true)}
                                    className="text-[4.5rem] sm:text-[2.5rem] font-medium flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none text-inherit font-inherit p-0"
                                >
                                    Let's Talk <span className="transform -rotate-45 block">→</span>
                                </button>
                            ) : (
                                <a href="mailto:ayush@tvareet.com" className="text-[4.5rem] sm:text-[2.5rem] font-medium flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                                    Let's Talk <span className="transform -rotate-45 block">→</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Bottom Row: Big Text - hidden on screens < 768px */}
                    <div
                        ref={devSectionRef}
                        className="flex sm:hidden flex-1 items-end sm:items-start sm:justify-start justify-end p-6"
                    >
                        <h1
                            ref={devTextRef}
                            className="text-[15vw] md:text-[10vw] leading-[0.8] font-bold tracking-tighter text-right z-10 mix-blend-difference overflow-hidden"
                        >
                            DEV
                        </h1>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Sections */}
            <div className="border-t border-white/10">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1">

                    {/* Navigation - Centered across col 2 & 3 effectively, but let's place it nicely */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-center gap-10 py-6 md:py-0">
                        {navLinks.map((link, index) => (
                            <div
                                key={link.name}
                                ref={(el) => (navRefs.current[index] = el)}
                                className="inline-block"
                                onMouseMove={(e) => handleMouseMove(e, navRefs.current[index])}
                                onMouseLeave={() => handleMouseLeave(navRefs.current[index])}
                            >
                                {link.openConnect && setConnectOpen ? (
                                    <button
                                        onClick={() => setConnectOpen(true)}
                                        className="text-sm uppercase text-white/60 hover:text-white flex items-center gap-1 cursor-pointer bg-transparent border-none font-inherit"
                                    >
                                        {link.name} <span className="text-xs transform -rotate-45">→</span>
                                    </button>
                                ) : (
                                    <Link href={link.href} className="text-sm uppercase text-white/60 hover:text-white flex items-center gap-1 cursor-pointer">
                                        {link.name} <span className="text-xs transform -rotate-45">→</span>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-white/10 bg-black">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1">
                    {/* Centered Copyright */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-center h-12">
                        <p className="text-white/40 text-xs uppercase tracking-wider">
                            Ayush © {currentYear}
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile-only divider fixes */}
            <div className="md:hidden h-px w-full bg-white/10" />
        </footer>
    );
};

export default Footer;