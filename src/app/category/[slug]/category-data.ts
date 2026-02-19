import React from "react";
import {
    Building2, Mic, Handshake, UtensilsCrossed,
    MessageSquareQuote, Music, PartyPopper, Trophy
} from "lucide-react";

export type CategoryInfo = {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    tagline: string;
    description: string;
    highlights: string[];
};

export const categoryData: Record<string, CategoryInfo> = {
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
