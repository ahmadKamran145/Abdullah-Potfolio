'use client';
import React from 'react';
import Image from 'next/image';
import { Camera, Video, Play, Star } from 'lucide-react';
import { GradientButton } from './ui/gradient-button';
import Aurora from '@/config/aurora';
import Navbar from './navbar';

const Hero = () => {
    return (
        <section className="hero-height relative min-h-[140vh] sm:min-h-screen pb-0 bg-transparent overflow-hidden" id="home">
            {/* 
        Aurora Logic from Source: 
        colorStops={['#3A29FF', '#FF94B4', '#FF3232']}
        blend={0.7}
        amplitude={1.7}
        speed={0.8}
      */}
            <Aurora
                colorStops={['#1A0B2E', '#4B0082', '#4B0082']}
                blend={0.5}
                amplitude={1.2}
                speed={0.5}
            />

            <div className="relative z-10 w-full lg:max-w-[1440px] lg:mx-auto px-4 md:px-[64px] py-5">

                <div className="pt-[100px] lg:pt-[150px]">
                    <div className="flex flex-col justify-start items-start gap-6">
                        {/* Main Headline */}
                        <div className="text-start sm:text-left relative z-10">
                            <h1 className="font-outfit font-thin flex lg:flex-row flex-col items-start lg:items-end lg:text-[100px] xl:text-[120px] text-white leading-tight">
                                <span className="not-italic font-thin text-[40px] md:text-[50px] lg:text-[65px] xl:text-[100px] font-class opacity-90">
                                    Here To{' '}
                                </span>
                                <div className="relative inline-block ml-0 lg:ml-4">


                                    <span className="font-class font-[700] text-[56px] lg:text-[65px] xl:text-[110px] text-white relative z-10 px-2">
                                        Create
                                    </span>
                                </div>
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="text-white text-base sm:text-xl font-light text-start sm:text-left max-w-2xl opacity-80">
                            Professional cinematography and photography services.
                            Translating your stories into timeless visual masterpieces.
                        </p>
                    </div>

                    <div className="relative flex justify-center sm:justify-start mt-[40px] mb-8 sm:mb-0">
                        <div className="group relative rounded-full p-[2px] overflow-hidden">
                            <div className="absolute inset-0 animate-spin-smooth [background:conic-gradient(from_0deg_at_50%_50%,#1A0B2E_0%,#4B0082_15%,#3A29FF_25%,#00DAF4_35%,#1A0B2E_50%,#1A0B2E_100%)]"></div>
                            <GradientButton className="relative bg-black rounded-full px-8 py-6 flex items-center gap-4 hover:bg-black/80 transition-all">
                                <Play className="fill-white w-6 h-6" />
                                <span className="text-xl font-semibold">View Showreel</span>
                            </GradientButton>
                        </div>
                    </div>

                    {/* Stats & Image Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center gap-12 mt-12 lg:mt-24 relative">
                        <div className="order-2 lg:order-1 flex gap-12">
                            <div className="text-left">
                                <div className="flex items-start">
                                    <div className="text-white text-[40px] lg:text-[50px] font-bold">500</div>
                                    <span className="text-[#00DAF4] text-2xl font-bold">+</span>
                                </div>
                                <div className="text-gray-400 text-lg">Projects Completed</div>
                            </div>
                            <div className="text-left">
                                <div className="text-white text-[40px] lg:text-[50px] font-bold">100%</div>
                                <div className="text-gray-400 text-lg">Client Satisfaction</div>
                            </div>
                        </div>

                        {/* Hero Image / Mockup Area */}
                        <div className="order-1 lg:order-2 w-full relative flex justify-center lg:justify-end">
                            {/* Abstract Composition representing 'Portfolio' */}
                            <div className="relative w-[280px] h-[500px] lg:w-[320px] lg:h-[580px] bg-gradient-to-tr from-purple-900/40 to-blue-900/40 rounded-3xl border border-white/10 backdrop-blur-sm p-4 transition-all duration-700 ease-out">
                                <div className="w-full h-full bg-black/50 rounded-2xl flex items-center justify-center overflow-hidden relative">
                                    <video
                                        src="/slider6.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover"
                                        suppressHydrationWarning
                                    />

                                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
