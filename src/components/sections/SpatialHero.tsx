"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { HackerText } from "@/components/ui/hacker-text";

export function SpatialHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Cursor-based camera drift
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const driftX = useSpring(useTransform(mouseX, [-1, 1], [15, -15]), { stiffness: 50, damping: 20 });
    const driftY = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), { stiffness: 50, damping: 20 });

    // Pre-compute all transforms at component level (not in JSX)
    const contentDriftX = useTransform(driftX, v => v * 0.5);
    const contentDriftY = useTransform(driftY, v => v * 0.5);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!mounted || isMobile || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.width / 2) / (rect.width / 2));
        mouseY.set((e.clientY - rect.height / 2) / (rect.height / 2));
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex flex-col items-center justify-center px-4 md:px-12 relative overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Background Layer */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                    x: mounted && !isMobile ? driftX : 0,
                    y: mounted && !isMobile ? driftY : 0,
                }}
            >
                <div className="text-[30vw] md:text-[22vw] font-bold text-neutral-900/30 uppercase tracking-tighter select-none">
                    SARVAAX
                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 text-center px-2"
                style={{
                    x: mounted && !isMobile ? contentDriftX : 0,
                    y: mounted && !isMobile ? contentDriftY : 0,
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="text-neon font-mono text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] mb-3 md:mb-4 block">
                        Est. 2025
                    </span>
                    <h1 className="text-[13vw] md:text-[9vw] leading-[0.9] font-bold tracking-tighter uppercase text-foreground">
                        The <span className="text-transparent" style={{ WebkitTextStroke: "1.5px var(--color-neon)" }}>X</span> Factor
                        <br />
                        <span className="text-neon text-[11vw] md:text-[8vw]">
                            <HackerText text="In Technology" />
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-base md:text-xl lg:text-2xl text-neutral-500 max-w-md md:max-w-xl mx-auto mt-6 md:mt-8 px-2"
                >
                    We architect the digital infrastructure that powers the future.
                </motion.p>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] md:text-xs font-mono text-neutral-500 uppercase tracking-widest">
                        {mounted && isMobile ? 'Swipe to Explore' : 'Scroll to Explore'}
                    </span>
                    <div className="w-px h-8 md:h-12 bg-gradient-to-b from-neon to-transparent" />
                </motion.div>
            </motion.div>
        </div>
    );
}
