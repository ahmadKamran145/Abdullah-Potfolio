"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Star } from "lucide-react";
import { categoryData } from "./category-data";
import { VideoShowcase } from "./VideoShowcase";
import {
    corporateVideos,
    talkingHeadVideos,
    sponsorshipsVideos,
    foodVideos,
    testimonialsVideos,
    musicVideos,
    concertsVideos,
} from "./video-data";

gsap.registerPlugin(ScrollTrigger);

const videoPageMap: Record<string, { videos: typeof corporateVideos }> = {
    "corporate": { videos: corporateVideos },
    "talking-head": { videos: talkingHeadVideos },
    "sponsorships": { videos: sponsorshipsVideos },
    "food": { videos: foodVideos },
    "testimonials": { videos: testimonialsVideos },
    "music-videos": { videos: musicVideos },
    "concerts": { videos: concertsVideos },
};

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const category = categoryData[slug];
    const videoPageData = videoPageMap[slug];
    const isVideoPage = !!videoPageData;

    const pageRef = useRef<HTMLDivElement>(null);
    const backBtnRef = useRef<HTMLButtonElement>(null);
    const heroCardRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const highlightsTitleRef = useRef<HTMLHeadingElement>(null);
    const highlightsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!category) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(pageRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.6, ease: "power2.out" }
            );

            gsap.fromTo(backBtnRef.current,
                { x: -60, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.2 }
            );

            if (!isVideoPage) {
                gsap.fromTo(heroCardRef.current,
                    { y: 80, opacity: 0, scale: 0.92 },
                    { y: 0, opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.75)", delay: 0.3 }
                );

                gsap.fromTo(iconRef.current,
                    { scale: 0, rotation: -180, opacity: 0 },
                    { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(2)", delay: 0.6 }
                );

                gsap.fromTo(titleRef.current,
                    { y: 50, opacity: 0, skewY: 3 },
                    { y: 0, opacity: 1, skewY: 0, duration: 0.9, ease: "power4.out", delay: 0.7 }
                );

                gsap.fromTo(taglineRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.9 }
                );

                gsap.fromTo(descRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 1.0 }
                );

                gsap.fromTo(highlightsTitleRef.current,
                    { x: -40, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 1.1 }
                );

                gsap.fromTo(
                    highlightsRef.current.filter(Boolean),
                    { y: 60, opacity: 0, scale: 0.85 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "back.out(1.4)",
                        delay: 1.2,
                    }
                );
            }
        }, pageRef);

        return () => ctx.revert();
    }, [category, isVideoPage]);

    if (!category) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-white text-4xl font-bold mb-4">Category Not Found</h1>
                    <button
                        onClick={() => router.back()}
                        className="text-[#00DAF4] hover:underline"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (isVideoPage) {
        return (
            <main ref={pageRef} className="min-h-screen bg-[#0a0a0a] relative overflow-hidden" style={{ opacity: 0 }}>
                <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-[80px] pt-4 md:pt-6 lg:pt-8">
                    <button
                        ref={backBtnRef}
                        onClick={() => router.back()}
                        className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 mb-4"
                        style={{ opacity: 0 }}
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-medium">Back</span>
                    </button>
                </div>

                <VideoShowcase videos={videoPageData.videos} />
            </main>
        );
    }

    const IconComponent = category.icon;

    return (
        <main ref={pageRef} className="min-h-screen bg-[#0a0a0a] relative overflow-hidden" style={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-purple-900/5 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#4B0082]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-l from-[#1A0B2E]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-[80px] pt-6 pb-14 md:pt-10 md:pb-20 lg:pt-14 lg:pb-28">
                <button
                    ref={backBtnRef}
                    onClick={() => router.back()}
                    className="group inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 mb-6 md:mb-10 lg:mb-14"
                    style={{ opacity: 0 }}
                >
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="font-medium text-sm md:text-base">Back</span>
                </button>

                <div
                    ref={heroCardRef}
                    className="relative rounded-2xl md:rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl px-5 py-7 md:px-16 md:py-14 lg:px-20 lg:py-16 overflow-hidden"
                    style={{ opacity: 0 }}
                >
                    <div className="absolute -inset-[1px] bg-gradient-to-br from-[#658aff]/20 via-purple-500/5 to-[#00DAF4]/10 rounded-3xl blur-sm -z-10" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#4B0082]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#00DAF4]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

                    <div ref={iconRef} className="flex items-center gap-2 md:gap-3 mb-5 md:mb-8" style={{ opacity: 0 }}>
                        <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl md:rounded-2xl bg-gradient-to-br from-[#658aff] to-[#a855f7] p-[1.5px] shadow-[0_0_30px_rgba(101,138,255,0.3)]">
                            <div className="flex h-full w-full items-center justify-center rounded-xl md:rounded-2xl bg-black/80">
                                <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-white" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-[#5EDC99] animate-pulse" fill="currentColor" />
                            <span className="text-xs md:text-sm font-medium uppercase tracking-widest bg-gradient-to-r from-[#658aff] to-[#a855f7] bg-clip-text text-transparent">
                                Category
                            </span>
                        </div>
                    </div>

                    <h1
                        ref={titleRef}
                        className="text-white text-[28px] md:text-[52px] lg:text-[68px] font-bold font-class leading-tight mb-3 md:mb-4"
                        style={{ opacity: 0 }}
                    >
                        {category.title}
                    </h1>

                    <p
                        ref={taglineRef}
                        className="text-lg md:text-2xl lg:text-3xl bg-gradient-to-r from-[#00DAF4] to-[#5EDC99] bg-clip-text text-transparent font-semibold mb-6 md:mb-10"
                        style={{ opacity: 0 }}
                    >
                        {category.tagline}
                    </p>

                    <p
                        ref={descRef}
                        className="text-gray-400 text-sm md:text-lg lg:text-xl leading-relaxed max-w-4xl mb-8 md:mb-14"
                        style={{ opacity: 0 }}
                    >
                        {category.description}
                    </p>

                    <div>
                        <h3
                            ref={highlightsTitleRef}
                            className="text-white text-lg md:text-2xl font-bold font-class mb-5 md:mb-8"
                            style={{ opacity: 0 }}
                        >
                            What We Offer
                        </h3>
                        <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {category.highlights.map((item, i) => (
                                <div
                                    key={i}
                                    ref={(el: HTMLDivElement | null) => void (highlightsRef.current[i] = el)}
                                    className="group/card flex items-center gap-3 md:gap-4 rounded-xl border border-white/10 bg-black/40 p-4 md:p-5 backdrop-blur-sm hover:border-white/25 hover:bg-white/5 hover:shadow-[0_0_25px_rgba(101,138,255,0.12)] hover:-translate-y-1 transition-all duration-400 cursor-default"
                                    style={{ opacity: 0 }}
                                >
                                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#658aff] to-[#a855f7] flex-shrink-0 group-hover/card:scale-125 transition-transform duration-300" />
                                    <span className="text-gray-300 text-xs md:text-base group-hover/card:text-white transition-colors duration-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
