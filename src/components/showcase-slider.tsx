"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        video: "https://looperin-store.s3.us-east-2.amazonaws.com/videos/1771525705309-75732545-IMG_1206.MP4",
        title: "FOLk Studio",
        tags: ["Rebranding", "Social Media", "Production"],
        categories: ["Food", "Creatives", "Campaign"],
    },
    {
        id: 2,
        video: "https://looperin-store.s3.us-east-2.amazonaws.com/videos/1771525705313-855195921-IMG_1308.MP4",
        title: "Visuals",
        tags: ["Branding", "UI/UX", "Social Media"],
        categories: ["Creatives", "Website"],
    },
    {
        id: 3,
        video: "https://looperin-store.s3.us-east-2.amazonaws.com/videos/1771525705314-408216909-IMG_1358.MP4",
        title: "Scent & Stories",
        tags: ["Production", "Photography", "Rebranding"],
        categories: ["Lifestyle", "Campaign"],
    },
    {
        id: 4,
        video: "https://looperin-store.s3.us-east-2.amazonaws.com/videos/1771525705314-154237697-IMG_1360.MP4",
        title: "Zero Lifestyle",
        tags: ["Social Media", "Production", "Branding"],
        categories: ["Music", "Creatives"],
    },
    {
        id: 5,
        video: "https://looperin-store.s3.us-east-2.amazonaws.com/videos/1771525705314-354956398-IMG_1361.MP4",
        title: "Midnight Vibe",
        tags: ["Rebranding", "UI/UX", "Production"],
        categories: ["Fashion", "Campaign"],
    },
    {
        id: 6,
        video: "https://looperin-store.s3.us-east-2.amazonaws.com/videos/1771525705315-552436702-IMG_1680.MP4",
        title: "Hico: Velvet Dreams",
        tags: ["Branding", "Social Media", "Photography"],
        categories: ["Product", "Commercial"],
    },
    {
        id: 7,
        video: "https://looperin-store.s3.us-east-2.amazonaws.com/videos/1771525705315-934684422-IMG_1683.MP4",
        title: "Urban Stories",
        tags: ["Production", "Branding", "Social Media"],
        categories: ["Lifestyle", "Creatives"],
    },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        const card = cardRef.current;
        if (!video || !card) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(card);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className="project-card flex-shrink-0 relative group w-[260px] md:w-[350px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main video area */}
            <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: "9/16" }}>
                <video
                    ref={videoRef}
                    loop
                    muted={isMuted}
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    suppressHydrationWarning
                >
                    <source src={project.video} type="video/mp4" />
                </video>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* CHECKOUT button overlay */}
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                >

                </div>

                {/* Mute/Unmute */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                    }}
                    className="absolute bottom-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
                >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
            </div>

            {/* Card info below video */}
            <div className="mt-3 md:mt-5 px-1">
                <h3 className="text-white text-xl md:text-3xl font-bold font-class tracking-tight">
                    {project.title}
                </h3>
            </div>
        </div>
    );
}

export function ShowcaseSlider() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const horizontal = horizontalRef.current;
        const cardsContainer = cardsContainerRef.current;
        if (!section || !horizontal || !cardsContainer) return;

        const ctx = gsap.context(() => {
            // Calculate total scroll distance
            const getScrollAmount = () => {
                return -(cardsContainer.scrollWidth - window.innerWidth);
            };

            // Heading text reveal animation
            if (headingRef.current) {
                gsap.fromTo(
                    headingRef.current.querySelectorAll(".reveal-text"),
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.15,
                        duration: 1.2,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // Horizontal scroll animation
            const cards = cardsContainer.querySelectorAll(".project-card") as NodeListOf<HTMLElement>;

            const horizontalTween = gsap.to(cardsContainer, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: horizontal,
                    start: "top top",
                    end: () => `+=${Math.abs(getScrollAmount())}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const viewportCenter = window.innerWidth / 2;
                        cards.forEach((card) => {
                            const rect = card.getBoundingClientRect();
                            const cardCenter = rect.left + rect.width / 2;
                            const distance = cardCenter - viewportCenter;
                            const normalizedDist = distance / window.innerWidth;

                            if (normalizedDist < -0.1) {
                                // Card has passed center going left — scale up & fade out progressively
                                const rawProgress = Math.min(1, Math.abs(normalizedDist + 0.1) * 2);
                                const fadeProgress = rawProgress * rawProgress; // exponential for dramatic growth
                                const scale = 1 + fadeProgress * 0.6;
                                const opacity = 1 - rawProgress;
                                card.style.transform = `scale(${scale})`;
                                card.style.opacity = `${opacity}`;
                            } else {
                                // Card is centered or hasn't reached center yet
                                card.style.transform = "scale(1)";
                                card.style.opacity = "1";
                            }
                        });
                    },
                },
            });

            // Card entrance stagger
            gsap.fromTo(
                cardsContainer.querySelectorAll(".project-card"),
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="portfolio"
            className="relative bg-black py-6 md:py-10 md:pb-22"
        >
            <div className="font-bold text-3xl md:text-6xl text-white mt-3 md:mt-5 mb-4 md:mb-8 ml-6 md:ml-20">Showcase</div>
            {/* Ambient background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-r from-purple-900/10 to-transparent rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-l from-indigo-900/10 to-transparent rounded-full blur-[120px]" />
            </div>

            {/* Horizontal Scroll Container */}
            <div ref={horizontalRef} className="relative overflow-hidden">
                <div className="h-screen flex items-center">
                    {/* Scrolling Cards Area */}
                    <div
                        ref={cardsContainerRef}
                        className="flex items-end gap-4 md:gap-8"
                        style={{ paddingLeft: "calc(50vw - 130px)", paddingRight: "calc(50vw - 130px)" }}
                    >
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>

                {/* Edge fades */}
                <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
            </div>
        </section>
    );
}

export default ShowcaseSlider;
