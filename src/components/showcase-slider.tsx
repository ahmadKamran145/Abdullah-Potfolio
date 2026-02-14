"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Star, Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Placeholder images - replace with your own
const slides = [
    {
        id: 1,
        video: "/slider6.mp4",
        title: "Creative Direction",
        subtitle: "Visual storytelling",
    },
    {
        id: 2,
        video: "/slider2.mp4",
        title: "Hico: Velvet Dreams",
        subtitle: "Cinematic Product Reveal",
    },
    {
        id: 3,
        video: "/slider3.mp4",
        title: "Scent & Stories: Essence",
        subtitle: "Luxury Fragrance Campaign",
    },
    {
        id: 4,
        video: "/slider4.mp4",
        title: "Harmony: Visual Symphony",
        subtitle: "Cinematic Music Experience",
    },
    {
        id: 5,
        video: "/slider5.mp4",
        title: "Midnight Vibe: The Edit",
        subtitle: "Dynamic Visual Flow",
    },
    {
        id: 6,
        video: "/slider.mp4",
        title: "Zero Lifestyle Watch",
        subtitle: "Commercial Advertisement",
    },
];
// Video Slide Component with auto-play/pause logic
function VideoSlide({ video, isActive, shouldReset }: { video: string; isActive: boolean; shouldReset: boolean }) {
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
                suppressHydrationWarning
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

    const [containerWidth, setContainerWidth] = useState(0);

    // Update container width on resize
    useEffect(() => {
        const updateWidth = () => {
            if (slidesContainerRef.current) {
                setContainerWidth(slidesContainerRef.current.offsetWidth);
            }
        };

        // Initial update
        updateWidth();

        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // Calculate offset to center the active slide
    const getTranslateX = (index: number) => {
        if (!containerWidth) return 0;

        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const slideWidth = isMobile ? 280 : 320;
        const gap = 20; // 20px gap

        // Calculate the center position
        // Container center = containerWidth / 2
        // Slide center from left = (index * (slideWidth + gap)) + (slideWidth / 2)
        // We want Slide center to be at Container center
        // Translation = Container Center - Slide Center (relative to track start)

        const centerOffset = (containerWidth / 2) - (slideWidth / 2);
        const slidePosition = index * (slideWidth + gap);

        return -slidePosition + centerOffset;
    };

    const goToSlide = (index: number) => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        const newIndex = ((index % slides.length) + slides.length) % slides.length;

        // Animate the slider with GSAP
        gsap.to(slidesContainerRef.current, {
            x: getTranslateX(newIndex), // Value in pixels
            duration: 1.0,
            ease: "power2.inOut",
            onComplete: () => {
                isAnimating.current = false;
            },
        });

        // Animate current slide info
        gsap.fromTo(
            ".slide-info",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
        );

        setCurrentIndex(newIndex);
    };

    const nextSlide = () => goToSlide(currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1);

    // Update position when container width changes or on mount
    useEffect(() => {
        // Only run if not currently animating (to avoid overwriting GSAP tween)
        if (slidesContainerRef.current && containerWidth > 0 && !isAnimating.current) {
            gsap.set(slidesContainerRef.current, {
                x: getTranslateX(currentIndex),
            });
        }
    }, [containerWidth, currentIndex]);

    useEffect(() => {
        // Initial setup for scroll trigger context
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
            <div className="relative w-full overflow-hidden min-h-[600px] flex items-center justify-center">
                {/* Slides Container */}
                <div
                    ref={slidesContainerRef}
                    className="flex items-center"
                    style={{ gap: "20px" }}
                >
                    {slides.map((slide, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <div
                                key={slide.id}
                                className="flex-shrink-0 transition-all duration-700 ease-in-out"
                                style={{
                                    width: typeof window !== 'undefined' && window.innerWidth < 768 ? "280px" : "320px",
                                    height: typeof window !== 'undefined' && window.innerWidth < 768 ? "500px" : "580px"
                                }}
                            >
                                <div
                                    className={`relative w-full h-full rounded-2xl overflow-hidden border transition-all duration-700 ease-in-out ${isActive
                                        ? "border-white/20 shadow-[0_0_60px_rgba(101,138,255,0.2)] scale-100 opacity-100"
                                        : "border-white/5 opacity-50 scale-90"
                                        }`}
                                >
                                    <VideoSlide
                                        video={slide.video}
                                        isActive={isActive}
                                        shouldReset={Math.abs(index - currentIndex) >= 2}
                                    />

                                    {/* Overlay gradient for inactive slides */}
                                    <div
                                        className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"
                                            }`}
                                    />
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
