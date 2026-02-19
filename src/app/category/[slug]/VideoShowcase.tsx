"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoCard } from "./VideoCard";
import { VideoItem } from "./video-data";

gsap.registerPlugin(ScrollTrigger);

type VideoShowcaseProps = {
    videos: VideoItem[];
};

export function VideoShowcase({ videos }: VideoShowcaseProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const horizontal = horizontalRef.current;
        const cardsContainer = cardsContainerRef.current;
        if (!section || !horizontal || !cardsContainer) return;

        window.scrollTo(0, 0);
        gsap.set(cardsContainer, { x: 0 });
        ScrollTrigger.getAll().forEach((t) => t.kill());

        const ctx = gsap.context(() => {
            const getScrollAmount = () => {
                const cards = cardsContainer.querySelectorAll(".project-card");
                const lastCard = cards[cards.length - 1] as HTMLElement;
                if (!lastCard) return 0;
                return -(lastCard.offsetLeft + lastCard.offsetWidth / 2 - window.innerWidth / 2);
            };

            const cards = cardsContainer.querySelectorAll(".project-card") as NodeListOf<HTMLElement>;

            gsap.to(cardsContainer, {
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
                    onUpdate: () => {
                        const viewportCenter = window.innerWidth / 2;
                        cards.forEach((card) => {
                            const rect = card.getBoundingClientRect();
                            const cardCenter = rect.left + rect.width / 2;
                            const distance = cardCenter - viewportCenter;
                            const normalizedDist = distance / window.innerWidth;

                            if (normalizedDist < -0.1) {
                                const rawProgress = Math.min(1, Math.abs(normalizedDist + 0.1) * 2);
                                const fadeProgress = rawProgress * rawProgress;
                                const scale = 1 + fadeProgress * 0.6;
                                const opacity = 1 - rawProgress;
                                card.style.transform = `scale(${scale})`;
                                card.style.opacity = `${opacity}`;
                            } else {
                                card.style.transform = "scale(1)";
                                card.style.opacity = "1";
                            }
                        });
                    },
                },
            });

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

            ScrollTrigger.refresh();
            setTimeout(() => ScrollTrigger.refresh(), 1500);
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#0a0a0a]"
        >
            <div className="font-bold text-3xl md:text-6xl text-white mb-4 ml-6 md:ml-20">Showcase</div>

            <div ref={horizontalRef} className="relative overflow-hidden">
                <div className="h-screen flex items-center">
                    <div
                        ref={cardsContainerRef}
                        className="flex items-end gap-4 md:gap-8"
                        style={{ paddingLeft: "calc(50vw - 140px)", paddingRight: "calc(50vw - 140px)" }}
                    >
                        {videos.map((project) => (
                            <VideoCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>

                <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />
            </div>
        </section>
    );
}
