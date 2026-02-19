"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { VideoItem } from "./video-data";

export function VideoCard({ project }: { project: VideoItem }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPortrait, setIsPortrait] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        const card = cardRef.current;
        if (!video || !card) return;

        const handleMetadata = () => {
            if (video.videoWidth && video.videoHeight) {
                setIsPortrait(video.videoHeight > video.videoWidth);
            }
        };

        video.addEventListener("loadedmetadata", handleMetadata);

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

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
        return () => {
            observer.disconnect();
            video.removeEventListener("loadedmetadata", handleMetadata);
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="project-card flex-shrink-0 relative group"
            style={{ width: isMobile ? (isPortrait ? "280px" : "90vw") : (isPortrait ? "350px" : "1100px") }}
        >
            <div
                className="relative w-full overflow-hidden rounded-lg"
                style={{ aspectRatio: isPortrait ? "9/16" : "16/9" }}
            >
                <video
                    ref={videoRef}
                    loop
                    muted={isMuted}
                    playsInline
                    className="absolute inset-0 w-full h-full object-contain bg-[#0a0a0a] transition-transform duration-700 group-hover:scale-105"
                    suppressHydrationWarning
                >
                    <source src={project.video} type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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

            <div className="mt-3 md:mt-5 px-1">
                <h3 className="text-white text-xl md:text-3xl font-bold font-class tracking-tight">
                    {project.title}
                </h3>
            </div>
        </div>
    );
}
