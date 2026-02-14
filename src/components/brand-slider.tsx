"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brandImages = [
    { src: "/brand1.png", alt: "Brand 1" },
    { src: "/brand2.png", alt: "Brand 2" },
    { src: "/brand3.png", alt: "Brand 3" },
    { src: "/brand4.webp", alt: "Brand 4" },
    { src: "/brand5.webp", alt: "Brand 5" },
    { src: "/brand6.png", alt: "Brand 6" },
    { src: "/brand7.png", alt: "Brand 7" },
    { src: "/brand8.png", alt: "Brand 8" },
    { src: "/brand9.png", alt: "Brand 9" },
    { src: "/brand10.png", alt: "Brand 10" },
    { src: "/brand11.png", alt: "Brand 11" },
    { src: "/brand12.jpg", alt: "Brand 12" },
    { src: "/brand13.png", alt: "Brand 13" },
    { src: "/brand14.jpeg", alt: "Brand 14" },
    { src: "/brand15.jpg", alt: "Brand 15" },
    { src: "/brand16.png", alt: "Brand 16" },
    { src: "/brand17.svg", alt: "Brand 17" },
    { src: "/brand18.png", alt: "Brand 18" },
    { src: "/brand19.png", alt: "Brand 19" },
    { src: "/brand20.png", alt: "Brand 20" },
    { src: "/brand21.png", alt: "Brand 21" },
];

export function BrandSlider() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-[#0a0a0a] py-16 lg:py-24 overflow-hidden">
            {/* Subtle top/bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/3 to-transparent pointer-events-none" />

            {/* Section header */}
            <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-[64px] mb-12">
                <p className="text-center text-sm font-medium uppercase tracking-widest bg-gradient-to-r from-[#658aff] to-[#a855f7] bg-clip-text text-transparent">
                    Trusted By Leading Brands
                </p>
            </div>

            {/* Marquee container */}
            <div className="relative">
                {/* Left fade */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                {/* Right fade */}
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

                {/* Scrolling track — 21 brands × 2 sets for seamless loop */}
                <div className="overflow-hidden">
                    <div
                        className="flex animate-marquee"
                        style={{ width: "max-content" }}
                    >
                        {/* First set — all 21 brands */}
                        {brandImages.map((brand, i) => (
                            <div
                                key={`a-${i}`}
                                className="flex-shrink-0 mx-4 md:mx-6 flex items-center justify-center w-[140px] h-[90px] md:w-[180px] md:h-[110px] rounded-xl  backdrop-blur-sm p-4 md:p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                            >
                                <Image
                                    src={brand.src}
                                    alt={brand.alt}
                                    width={140}
                                    height={70}
                                    unoptimized
                                    className="object-contain max-h-full w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        ))}
                        {/* Duplicate set — all 21 brands again for seamless infinite loop */}
                        {brandImages.map((brand, i) => (
                            <div
                                key={`b-${i}`}
                                className="flex-shrink-0 mx-4 md:mx-6 flex items-center justify-center w-[140px] h-[90px] md:w-[180px] md:h-[110px] rounded-xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-4 md:p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                            >
                                <Image
                                    src={brand.src}
                                    alt={brand.alt}
                                    width={140}
                                    height={70}
                                    unoptimized
                                    className="object-contain max-h-full w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BrandSlider;
