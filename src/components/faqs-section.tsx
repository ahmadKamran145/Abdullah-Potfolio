"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: "What types of photography and videography services do you offer?",
        answer:
            "We offer a comprehensive range of services including wedding photography & videography, corporate events, product shoots, fashion photography, music videos, short films, and promotional content creation.",
    },
    {
        question: "How far in advance should I book your services?",
        answer:
            "We recommend booking at least 2-4 weeks in advance for regular shoots and 2-3 months for weddings and large events. However, we do accommodate last-minute requests based on availability.",
    },
    {
        question: "What is your pricing structure?",
        answer:
            "Our pricing varies based on the type of project, duration, and deliverables. We offer customized packages to fit your specific needs and budget. Contact us for a detailed quote.",
    },
    {
        question: "How long does it take to receive the final deliverables?",
        answer:
            "Turnaround time depends on the project scope. Typically, photos are delivered within 1-2 weeks and videos within 3-4 weeks. Rush delivery options are available for an additional fee.",
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const faqRefs = useRef<Array<HTMLDivElement | null>>([]);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse",
                    },
                }
            );

            gsap.fromTo(
                faqRefs.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play reverse play reverse",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="faq" className="relative bg-[#0a0a0a] overflow-hidden py-20 lg:py-32">
            {/* Background gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[#4B0082]/15 to-[#1A0B2E]/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-[64px]">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-[#5EDC99] animate-pulse" fill="currentColor" />
                        <span className="text-sm font-medium uppercase tracking-widest bg-gradient-to-r from-[#658aff] to-[#a855f7] bg-clip-text text-transparent">
                            FAQs
                        </span>
                        <Star className="w-5 h-5 text-[#5EDC99] animate-pulse" fill="currentColor" />
                    </div>
                    <h2 className="text-white text-[32px] md:text-[48px] lg:text-[56px] font-bold font-class leading-tight">
                        Frequently Asked{" "}
                        <span className="bg-gradient-to-r from-[#00DAF4] to-[#5EDC99] bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h2>
                    <p className="mt-4 text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                        Got questions? We've got answers. Find everything you need to know about our services.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = index === openIndex;
                        return (
                            <article
                                key={faq.question}
                                ref={(el: HTMLDivElement | null) => void (faqRefs.current[index] = el)}
                                className={`group relative rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl overflow-hidden transition-all duration-500 ${isOpen
                                        ? "shadow-[0_0_30px_rgba(101,138,255,0.15)]"
                                        : "hover:border-white/20 hover:shadow-[0_0_20px_rgba(101,138,255,0.1)]"
                                    }`}
                            >
                                {/* Gradient border effect on open */}
                                {isOpen && (
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#658aff]/10 via-purple-500/5 to-[#a855f7]/10 pointer-events-none" />
                                )}

                                <button
                                    className="relative flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-300"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                >
                                    <span className={`text-base md:text-lg font-semibold transition-colors duration-300 ${isOpen
                                            ? "bg-gradient-to-r from-[#00DAF4] to-[#5EDC99] bg-clip-text text-transparent"
                                            : "text-white group-hover:text-gray-200"
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                                            ? "bg-gradient-to-r from-[#658aff] to-[#a855f7] rotate-180"
                                            : "bg-white/10 group-hover:bg-white/15"
                                        }`}>
                                        <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-400"
                                            }`} />
                                    </div>
                                </button>
                                <div
                                    style={{
                                        maxHeight: isOpen ? 500 : 0,
                                        opacity: isOpen ? 1 : 0,
                                        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                    }}
                                    className="relative px-6 pb-6 text-sm md:text-base text-gray-400 leading-relaxed"
                                >
                                    {faq.answer}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FAQSection;
