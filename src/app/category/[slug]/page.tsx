"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowLeft, Star } from "lucide-react";
import {
    Building2, Mic, Handshake, UtensilsCrossed,
    MessageSquareQuote, Music, PartyPopper, Trophy
} from "lucide-react";

const categoryData: Record<string, {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    tagline: string;
    description: string;
    highlights: string[];
}> = {
    corporate: {
        title: "Corporate",
        icon: Building2,
        tagline: "Professional storytelling for modern brands",
        description:
            "We craft compelling corporate videos that communicate your brand's mission, culture, and value proposition. From company profiles and internal communications to investor presentations and brand films, our corporate content is designed to elevate your professional image and connect with your audience on a deeper level.",
        highlights: [
            "Company profile films",
            "Brand documentaries",
            "Internal communications",
            "Investor and stakeholder presentations",
            "Training and onboarding videos",
            "Product launch announcements",
        ],
    },
    "talking-head": {
        title: "Talking Head",
        icon: Mic,
        tagline: "Authentic voices, powerful stories",
        description:
            "From expert interviews and thought leadership pieces to engaging vlogs and educational content, we produce polished talking head videos that keep your audience captivated. Our setup ensures professional lighting, crisp audio, and cinematic framing for every speaker.",
        highlights: [
            "Expert interviews",
            "Thought leadership content",
            "YouTube and social media vlogs",
            "Educational and tutorial videos",
            "Podcast video production",
            "Panel discussions",
        ],
    },
    sponsorships: {
        title: "Sponsorships",
        icon: Handshake,
        tagline: "Brand partnerships that resonate",
        description:
            "We create high-impact sponsorship and brand partnership content that feels authentic and engaging. Whether it's an influencer collaboration, product integration, or a full-scale branded campaign, we ensure your sponsored content delivers results while maintaining creative integrity.",
        highlights: [
            "Influencer collaborations",
            "Product integrations",
            "Branded content campaigns",
            "Unboxing and review videos",
            "Event sponsorship coverage",
            "Social media ad creatives",
        ],
    },
    food: {
        title: "Food",
        icon: UtensilsCrossed,
        tagline: "Visual feasts that make mouths water",
        description:
            "Our food videography and photography captures every texture, steam, and sizzle in stunning detail. We work with restaurants, food brands, and culinary creators to produce content that makes your dishes irresistible — from recipe videos to restaurant promos and menu photography.",
        highlights: [
            "Recipe and cooking videos",
            "Restaurant promotional content",
            "Menu and product photography",
            "Food brand campaigns",
            "Social media food reels",
            "Behind-the-kitchen-scenes content",
        ],
    },
    testimonials: {
        title: "Testimonials",
        icon: MessageSquareQuote,
        tagline: "Real stories, real trust",
        description:
            "Nothing builds trust like hearing from real customers. We produce authentic, high-quality testimonial videos that showcase genuine experiences and results. Our approach puts your clients at ease so their stories come across as natural, relatable, and convincing.",
        highlights: [
            "Client success story videos",
            "Customer review compilations",
            "Case study documentaries",
            "Before and after showcases",
            "Employee testimonials",
            "User-generated content curation",
        ],
    },
    "music-videos": {
        title: "Music Videos",
        icon: Music,
        tagline: "Cinematic visuals for every beat",
        description:
            "We bring your music to life with visually stunning music videos. From concept development and storyboarding to shooting and post-production, our creative team collaborates closely with artists to deliver videos that amplify the emotion and energy of every track.",
        highlights: [
            "Concept development and storyboarding",
            "Cinematic narrative videos",
            "Performance and live session videos",
            "Lyric and visualizer videos",
            "Behind-the-scenes content",
            "Album artwork and promo materials",
        ],
    },
    concerts: {
        title: "Concerts",
        icon: PartyPopper,
        tagline: "Capturing live energy like never before",
        description:
            "Our concert coverage captures the raw energy, emotion, and atmosphere of live performances. With multi-camera setups, dynamic angles, and expert editing, we create highlight reels and full-length recordings that let audiences relive every moment.",
        highlights: [
            "Multi-camera live recordings",
            "Highlight reels and recaps",
            "Backstage and behind-the-scenes",
            "Artist and fan interviews",
            "Festival coverage",
            "Live streaming production",
        ],
    },
    sports: {
        title: "Sports",
        icon: Trophy,
        tagline: "Every play, every moment, every victory",
        description:
            "From games and tournaments to athlete profiles and training montages, we produce high-energy sports content that captures the intensity and passion of competition. Our slow-motion replays, drone shots, and dynamic editing bring every play to life.",
        highlights: [
            "Game and match highlights",
            "Athlete profile documentaries",
            "Training and fitness content",
            "Tournament and league coverage",
            "Sponsor and brand integrations",
            "Social media sports reels",
        ],
    },
};

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const category = categoryData[slug];

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
        if (!category) return;

        const ctx = gsap.context(() => {
            // Page-level fade in
            gsap.fromTo(pageRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.6, ease: "power2.out" }
            );

            // Back button slides in from left
            gsap.fromTo(backBtnRef.current,
                { x: -60, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.2 }
            );

            // Hero card scales up with a spring
            gsap.fromTo(heroCardRef.current,
                { y: 80, opacity: 0, scale: 0.92 },
                { y: 0, opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.75)", delay: 0.3 }
            );

            // Icon spins in and scales
            gsap.fromTo(iconRef.current,
                { scale: 0, rotation: -180, opacity: 0 },
                { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(2)", delay: 0.6 }
            );

            // Title slides up with a bounce
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0, skewY: 3 },
                { y: 0, opacity: 1, skewY: 0, duration: 0.9, ease: "power4.out", delay: 0.7 }
            );

            // Tagline fades in with a slide
            gsap.fromTo(taglineRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.9 }
            );

            // Description fades in
            gsap.fromTo(descRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 1.0 }
            );

            // Highlights title
            gsap.fromTo(highlightsTitleRef.current,
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 1.1 }
            );

            // Highlight cards stagger in from bottom with elastic ease
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
        }, pageRef);

        return () => ctx.revert();
    }, [category]);

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

    const IconComponent = category.icon;

    return (
        <main ref={pageRef} className="min-h-screen bg-[#0a0a0a] relative overflow-hidden" style={{ opacity: 0 }}>
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-purple-900/5 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#4B0082]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-l from-[#1A0B2E]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-[80px] pt-10 pb-20 lg:pt-14 lg:pb-28">
                {/* Back Button */}
                <button
                    ref={backBtnRef}
                    onClick={() => router.back()}
                    className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 mb-10 lg:mb-14"
                    style={{ opacity: 0 }}
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="font-medium">Back</span>
                </button>

                {/* Hero area */}
                <div
                    ref={heroCardRef}
                    className="relative rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl px-8 py-10 md:px-16 md:py-14 lg:px-20 lg:py-16 overflow-hidden"
                    style={{ opacity: 0 }}
                >
                    {/* Container glow */}
                    <div className="absolute -inset-[1px] bg-gradient-to-br from-[#658aff]/20 via-purple-500/5 to-[#00DAF4]/10 rounded-3xl blur-sm -z-10" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#4B0082]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#00DAF4]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

                    {/* Icon + Badge */}
                    <div ref={iconRef} className="flex items-center gap-3 mb-8" style={{ opacity: 0 }}>
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#658aff] to-[#a855f7] p-[1.5px] shadow-[0_0_30px_rgba(101,138,255,0.3)]">
                            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-black/80">
                                <IconComponent className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-[#5EDC99] animate-pulse" fill="currentColor" />
                            <span className="text-sm font-medium uppercase tracking-widest bg-gradient-to-r from-[#658aff] to-[#a855f7] bg-clip-text text-transparent">
                                Category
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1
                        ref={titleRef}
                        className="text-white text-[36px] md:text-[52px] lg:text-[68px] font-bold font-class leading-tight mb-4"
                        style={{ opacity: 0 }}
                    >
                        {category.title}
                    </h1>

                    {/* Tagline */}
                    <p
                        ref={taglineRef}
                        className="text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-[#00DAF4] to-[#5EDC99] bg-clip-text text-transparent font-semibold mb-10"
                        style={{ opacity: 0 }}
                    >
                        {category.tagline}
                    </p>

                    {/* Description */}
                    <p
                        ref={descRef}
                        className="text-gray-400 text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mb-14"
                        style={{ opacity: 0 }}
                    >
                        {category.description}
                    </p>

                    {/* Highlights */}
                    <div>
                        <h3
                            ref={highlightsTitleRef}
                            className="text-white text-xl md:text-2xl font-bold font-class mb-8"
                            style={{ opacity: 0 }}
                        >
                            What We Offer
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {category.highlights.map((item, i) => (
                                <div
                                    key={i}
                                    ref={(el: HTMLDivElement | null) => void (highlightsRef.current[i] = el)}
                                    className="group/card flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm hover:border-white/25 hover:bg-white/5 hover:shadow-[0_0_25px_rgba(101,138,255,0.12)] hover:-translate-y-1 transition-all duration-400 cursor-default"
                                    style={{ opacity: 0 }}
                                >
                                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#658aff] to-[#a855f7] flex-shrink-0 group-hover/card:scale-125 transition-transform duration-300" />
                                    <span className="text-gray-300 text-sm md:text-base group-hover/card:text-white transition-colors duration-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
