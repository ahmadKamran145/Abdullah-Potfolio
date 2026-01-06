"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Service names from the services section
const services = [
    "Photography",
    "Videography",
    "Film Production",
    "Product Shoots",
    "Event Coverage",
    "Color Grading",
    "Post-Production",
    "Drone Shots",
];

// Colors matching the portfolio theme
const colors = {
    primary: "#658aff",
    secondary: "#a855f7",
    accent1: "#00DAF4",
    accent2: "#5EDC99",
};

// Dynamic import for 3D canvas to avoid SSR issues
const Canvas3D = dynamic(() => import("./model-canvas"), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
    ),
});

export function Model() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section id="model" className="relative bg-[#0a0a0a] overflow-hidden py-16 lg:py-24">
            {/* Background gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#1A0B2E]/20 to-transparent rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-l from-[#4B0082]/15 to-transparent rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-[64px]">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <span className="text-sm font-medium uppercase tracking-widest bg-gradient-to-r from-[#658aff] to-[#a855f7] bg-clip-text text-transparent">
                        Our Expertise
                    </span>
                    <h2 className="mt-4 text-white text-[32px] md:text-[48px] font-bold font-class leading-tight">
                        Services{" "}
                        <span className="bg-gradient-to-r from-[#00DAF4] to-[#5EDC99] bg-clip-text text-transparent">
                            Network
                        </span>
                    </h2>
                </div>

                {/* 3D Canvas Container */}
                <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl border border-white/10 bg-transparent backdrop-blur-xl overflow-hidden">
                    {/* Container glow effect */}
                    <div className="absolute -inset-[1px] bg-gradient-to-br from-[#658aff]/20 via-purple-500/5 to-[#00DAF4]/10 rounded-3xl blur-sm -z-10" />



                    {/* 3D Canvas with nodes - only render on client */}
                    {isMounted && <Canvas3D services={services} colors={colors} />}

                    {/* Decorative corners */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-purple-500/50 pointer-events-none z-20" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-500/50 pointer-events-none z-20" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-500/50 pointer-events-none z-20" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-500/50 pointer-events-none z-20" />
                </div>
            </div>


        </section>
    );
}

export default Model;
