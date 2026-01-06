"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Star, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Placeholder images - replace with your own
const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
        video: "/slider6.mp4",
        title: "Creative Direction",
        subtitle: "Visual storytelling",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
        video: "/slider2.mp4",
        title: "Hico: Velvet Dreams",
        subtitle: "Cinematic Product Reveal",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
        video: "/slider3.mp4",
        title: "Scent & Stories: Essence",
        subtitle: "Luxury Fragrance Campaign",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop",
        video: "/slider4.mp4",
        title: "Harmony: Visual Symphony",
        subtitle: "Cinematic Music Experience",
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=1200&auto=format&fit=crop",
        video: "/slider5.mp4",
        title: "Midnight Vibe: The Edit",
        subtitle: "Dynamic Visual Flow",
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
        video: "/slider.mp4",
        title: "Zero Lifestyle Watch",
        subtitle: "Commercial Advertisement",
    },
];
// Video Slide Component with auto-play/pause logic
function VideoSlide({ video, image, isActive, shouldReset }: { video: string; image: string; isActive: boolean; shouldReset: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                if (!entry.isIntersecting && videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.pause();
                }
            },
            { threshold: 0.5 } // Ensure at least 50% is visible to count as "in view"
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            if (isActive && isInView) {
                videoRef.current.play().catch((e) => console.log("Autoplay prevented:", e));
            } else {
                videoRef.current.pause();
                // Reset video if user has moved far away
                if (shouldReset) {
                    videoRef.current.currentTime = 0;
                }
            }
        }
    }, [isActive, shouldReset, isInView]);

    return (
        <>
            <video
                ref={videoRef}
                loop
                muted={isMuted}
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster={image}
            >
                <source src={video} type="video/mp4" />
            </video>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                }}
                className="absolute bottom-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
            >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
        </>
    );
}

export function ShowcaseSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesContainerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const isAnimating = useRef(false);

    // Calculate offset to center the active slide (showing 30% of sides)
    const getTranslateX = (index: number) => {
        // Each slide is 60% width, we want to show 20% on each side
        // Center slide position: 50% - 30% (half of slide width) = 20%
        // But we need to account for the gap and positioning
        const slideWidth = 60; // percentage
        const gap = 2; // percentage gap between slides
        const offset = 20; // starting offset to center first slide
        return -(index * (slideWidth + gap)) + offset;
    };

    const goToSlide = (index: number) => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        const newIndex = ((index % slides.length) + slides.length) % slides.length;

        // Animate the slider with GSAP
        gsap.to(slidesContainerRef.current, {
            x: `${getTranslateX(newIndex)}%`,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => {
                isAnimating.current = false;
            },
        });

        // Animate current slide info
        gsap.fromTo(
            ".slide-info",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.2 }
        );

        setCurrentIndex(newIndex);
    };

    const nextSlide = () => goToSlide(currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1);

    useEffect(() => {
        // Set initial position
        if (slidesContainerRef.current) {
            gsap.set(slidesContainerRef.current, {
                x: `${getTranslateX(0)}%`,
            });
        }

        const ctx = gsap.context(() => {
            // Section entrance animation
            gsap.fromTo(
                sectionRef.current,
                { y: 100, opacity: 0 },
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
        <section
            ref={sectionRef}
            id="portfolio"
            className="relative bg-[#0a0a0a] overflow-hidden py-20 lg:py-32"
        >
            {/* Background gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-purple-900/5 pointer-events-none" />
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#1A0B2E]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-l from-[#4B0082]/15 to-transparent rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-[64px]">
                {/* Section Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-[#5EDC99] animate-pulse" fill="currentColor" />
                        <span className="text-sm font-medium uppercase tracking-widest bg-gradient-to-r from-[#658aff] to-[#a855f7] bg-clip-text text-transparent">
                            Portfolio
                        </span>
                    </div>
                    <h2 className="text-white text-[40px] md:text-[56px] lg:text-[72px] font-bold font-class leading-tight">
                        Showcase
                    </h2>
                </div>
            </div>

            {/* Full-width Slider Container */}
            <div className="relative w-full overflow-hidden">
                {/* Slides Container */}
                <div
                    ref={slidesContainerRef}
                    className="flex"
                    style={{ gap: "2%" }}
                >
                    {slides.map((slide, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <div
                                key={slide.id}
                                className="flex-shrink-0 transition-all duration-500"
                                style={{ width: "60%" }}
                            >
                                <div
                                    className={`relative aspect-[16/10] rounded-2xl overflow-hidden border transition-all duration-500 ${isActive
                                        ? "border-white/20 shadow-[0_0_60px_rgba(101,138,255,0.2)] scale-100"
                                        : "border-white/5 opacity-50 scale-95"
                                        }`}
                                >
                                    {slide.video ? (
                                        <VideoSlide
                                            video={slide.video}
                                            image={slide.image}
                                            isActive={isActive}
                                            shouldReset={Math.abs(index - currentIndex) >= 2}
                                        />
                                    ) : (
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            className="object-cover"
                                            sizes="60vw"
                                            priority={index <= 2}
                                        />
                                    )}

                                    {/* Overlay gradient for inactive slides */}
                                    <div
                                        className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"
                                            }`}
                                    />

                                    {/* Active slide overlay with corner decorations */}
                                    {isActive && (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/40" />
                                            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/40" />
                                            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/40" />
                                            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/40" />
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Slide Info & Controls */}
            <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-[64px]">
                <div className="mt-8 flex items-end justify-between">
                    {/* Current Slide Info */}
                    <div className="slide-info">
                        <h3 className="text-white text-2xl md:text-3xl font-bold font-class">
                            {slides[currentIndex].title}
                        </h3>
                        <p className="mt-2 text-gray-400 text-base md:text-lg">
                            {"{" + slides[currentIndex].subtitle + "}"}
                        </p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-4">
                        {/* Explore Button */}
                        <button className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300">
                            <span className="font-medium">Explore All Work</span>
                        </button>

                        {/* Arrow Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={prevSlide}
                                className="group w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                                aria-label="Previous slide"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="group w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                                aria-label="Next slide"
                            >
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="mt-8 flex justify-center gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-1 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "w-8 bg-gradient-to-r from-[#658aff] to-[#a855f7]"
                                : "w-4 bg-white/20 hover:bg-white/40"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ShowcaseSlider;
