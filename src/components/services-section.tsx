"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Building2, Mic, Handshake, UtensilsCrossed,
    MessageSquareQuote, Music, PartyPopper, Trophy, Star, ArrowRight
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const categories = [
    { icon: Building2, title: "Corporate", slug: "corporate", detail: "Professional corporate videos for brands and businesses." },
    { icon: Mic, title: "Talking Head", slug: "talking-head", detail: "Engaging talking head content for interviews and vlogs." },
    { icon: Handshake, title: "Sponsorships", slug: "sponsorships", detail: "Creative sponsorship and brand partnership content." },
    { icon: UtensilsCrossed, title: "Food", slug: "food", detail: "Mouth-watering food videography and photography." },
    { icon: MessageSquareQuote, title: "Testimonials", slug: "testimonials", detail: "Authentic client testimonial videos that build trust." },
    { icon: Music, title: "Music Videos", slug: "music-videos", detail: "Cinematic music videos with creative direction." },
    { icon: PartyPopper, title: "Concerts", slug: "concerts", detail: "Dynamic concert and live event coverage." },
    { icon: Trophy, title: "Sports", slug: "sports", detail: "High-energy sports videography and highlights." },
];

export function Services() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current,
                { y: -200, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.3,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play reverse play reverse",
                    },
                }
            );

            gsap.fromTo(
                cardsRef.current,
                { y: 80, opacity: 0, scale: 0.85, rotateX: 15 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play reverse play reverse",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="services" className="relative bg-[#0a0a0a] overflow-hidden py-20 lg:py-32">
            {/* Background gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#1A0B2E]/25 to-transparent rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-r from-[#4B0082]/15 to-transparent rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-[64px]">
                {/* Main container with gradient border */}
                <div className="relative rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 md:p-12 overflow-hidden">
                    {/* Container glow effect */}
                    <div className="absolute -inset-[1px] bg-gradient-to-br from-[#658aff]/20 via-purple-500/5 to-[#00DAF4]/10 rounded-3xl blur-sm -z-10" />

                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#4B0082]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#00DAF4]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

                    {/* Section Header */}
                    <div className="relative text-left mb-12">
                        <div className="flex items-center gap-2 mb-4">
                            <Star className="w-5 h-5 text-[#5EDC99] animate-pulse" fill="currentColor" />
                            <span className="text-sm font-medium uppercase tracking-widest bg-gradient-to-r from-[#658aff] to-[#a855f7] bg-clip-text text-transparent">
                                Categories
                            </span>
                        </div>
                        <h2 className="text-white text-[32px] md:text-[48px] lg:text-[56px] font-bold font-class leading-tight">
                            What We{" "}
                            <span className="bg-gradient-to-r from-[#00DAF4] to-[#5EDC99] bg-clip-text text-transparent">
                                Create
                            </span>
                        </h2>
                        <p className="mt-4 text-gray-400 text-base md:text-lg max-w-2xl">
                            Explore our core categories — from corporate storytelling to electrifying concert coverage, we bring every vision to life.
                        </p>
                    </div>

                    {/* Categories Grid */}
                    <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((category, index) => (
                            <Link
                                key={category.slug}
                                href={`/category/${category.slug}`}
                            >
                                <article
                                    ref={(el: HTMLDivElement | null) => void (cardsRef.current[index] = el)}
                                    className="group relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_0_30px_rgba(101,138,255,0.15)] cursor-pointer h-full"
                                >
                                    {/* Card hover glow */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    {/* Icon container with gradient border */}
                                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#658aff] to-[#a855f7] p-[1px]">
                                        <div className="flex h-full w-full items-center justify-center rounded-xl bg-black/80">
                                            <category.icon className="h-5 w-5 text-white" />
                                        </div>
                                    </div>

                                    <div className="relative flex-1">
                                        <h3 className="text-lg font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-[#00DAF4] group-hover:to-[#5EDC99] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                            {category.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-400">{category.detail}</p>
                                    </div>

                                    {/* Arrow indicator */}
                                    <div className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-[#00DAF4] transition-colors duration-300">
                                        <span>Explore</span>
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
