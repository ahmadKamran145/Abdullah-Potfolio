"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone, Send, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
    const formRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section overall entrance
            gsap.fromTo(
                sectionRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.3,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse",
                    },
                }
            );

            // Form animation
            gsap.fromTo(
                formRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play reverse play reverse",
                    },
                }
            );

            // Support cards stagger animation
            gsap.fromTo(
                cardsRef.current,
                { y: 40, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
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
        <section
            ref={sectionRef}
            id="contact"
            className="relative bg-[#0a0a0a] overflow-hidden py-20 lg:py-32"
        >
            {/* Background gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#1A0B2E]/30 to-[#4B0082]/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-[64px]">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-[#5EDC99] animate-pulse" fill="currentColor" />
                        <span className="text-sm font-medium uppercase tracking-widest bg-gradient-to-r from-[#658aff] to-[#a855f7] bg-clip-text text-transparent">
                            Get In Touch
                        </span>
                        <Star className="w-5 h-5 text-[#5EDC99] animate-pulse" fill="currentColor" />
                    </div>
                    <h2 className="text-white text-[32px] md:text-[48px] lg:text-[56px] font-bold font-class leading-tight">
                        Let's Create Something{" "}
                        <span className="bg-gradient-to-r from-[#00DAF4] to-[#5EDC99] bg-clip-text text-transparent">
                            Amazing
                        </span>
                    </h2>
                    <p className="mt-4 text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                        Ready to bring your vision to life? Reach out and let's discuss your next project.
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    {/* Form */}
                    <div
                        ref={formRef}
                        className="relative rounded-3xl border border-white/10 bg-black/50 p-6 md:p-8 backdrop-blur-xl"
                    >
                        {/* Form glow effect */}
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#658aff]/20 via-purple-500/10 to-[#a855f7]/20 rounded-3xl blur-sm -z-10" />

                        <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 font-class">
                            Book a Session
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base mb-8">
                            Tell us about your project, timeline, or event details. We'll get back to you within 24 hours.
                        </p>

                        <form className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                                        placeholder="Your name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                                        placeholder="+92 300 1234567"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Service Type
                                    </label>
                                    <select
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white cursor-pointer focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                                    >
                                        <option className="bg-[#0a0a0a] text-white">Photography</option>
                                        <option className="bg-[#0a0a0a] text-white">Videography</option>
                                        <option className="bg-[#0a0a0a] text-white">Both</option>
                                        <option className="bg-[#0a0a0a] text-white">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 resize-none"
                                    placeholder="Tell us about your project, event date, location, or any special requirements..."
                                    required
                                />
                            </div>

                            {/* Submit Button with gradient border animation */}
                            <div className="pt-2">
                                <div className="group relative rounded-full p-[2px] overflow-hidden inline-block">
                                    <div className="absolute inset-0 animate-spin-smooth [background:conic-gradient(from_0deg_at_50%_50%,#1A0B2E_0%,#4B0082_15%,#3A29FF_25%,#00DAF4_35%,#1A0B2E_50%,#1A0B2E_100%)]" />
                                    <button
                                        type="submit"
                                        className="relative gradient-button rounded-full px-8 py-4 flex items-center gap-3 bg-black hover:bg-black/80 transition-all text-white font-semibold"
                                    >
                                        <Send className="w-5 h-5" />
                                        <span>Send Message</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="space-y-5">
                        {[
                            {
                                icon: Phone,
                                label: "Phone",
                                value: "+92 305 5513124",
                                gradient: "from-[#658aff] to-[#a855f7]"
                            },
                            {
                                icon: Mail,
                                label: "Email",
                                value: "flokstudioglobal@gmail.com",
                                gradient: "from-[#a855f7] to-[#ec4899]"
                            },
                            {
                                icon: MapPin,
                                label: "Location",
                                value: "Office # 23, 3rd Floor, Twin City Plaza, I-8 Markaz, Islamabad",
                                gradient: "from-[#00DAF4] to-[#5EDC99]"
                            },
                        ].map((item, i) => (
                            <div
                                key={item.label}
                                ref={(el: HTMLDivElement | null) => void (cardsRef.current[i] = el)}
                                className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
                            >
                                {/* Card hover glow */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Icon container */}
                                <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} p-[1px]`}>
                                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-black/80">
                                        <item.icon className="h-5 w-5 text-white" />
                                    </div>
                                </div>

                                <div className="relative">
                                    <p className="text-sm text-gray-400">{item.label}</p>
                                    <p className="font-semibold text-white mt-0.5">{item.value}</p>
                                </div>
                            </div>
                        ))}

                        {/* Additional CTA Card */}
                        <div
                            ref={(el: HTMLDivElement | null) => void (cardsRef.current[3] = el)}
                            className="relative mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 backdrop-blur-xl overflow-hidden"
                        >
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4B0082]/30 to-transparent rounded-full blur-2xl" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#00DAF4]/20 to-transparent rounded-full blur-xl" />

                            <div className="relative">
                                <h4 className="text-white text-lg font-semibold mb-2 font-class">
                                    Ready to Start?
                                </h4>
                                <p className="text-gray-400 text-sm mb-4">
                                    Let's turn your vision into stunning visual content that tells your story.
                                </p>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="inline-flex h-2 w-2 rounded-full bg-[#5EDC99] animate-pulse" />
                                    <span className="text-gray-300">Available for new projects</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
