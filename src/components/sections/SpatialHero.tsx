"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { HackerText } from "@/components/ui/hacker-text";

export function SpatialHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Cursor-based camera drift
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const driftX = useSpring(useTransform(mouseX, [-1, 1], [20, -20]), { stiffness: 50, damping: 20 });
    const driftY = useSpring(useTransform(mouseY, [-1, 1], [20, -20]), { stiffness: 50, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.width / 2) / (rect.width / 2));
        mouseY.set((e.clientY - rect.height / 2) / (rect.height / 2));
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex flex-col items-center justify-center px-6 md:px-12 relative"
            onMouseMove={handleMouseMove}
        >
            {/* Background Layer - Furthest */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ x: driftX, y: driftY, transform: "translateZ(-200px) scale(1.2)" }}
            >
                <div className="text-[25vw] font-bold text-neutral-900/30 uppercase tracking-tighter select-none">
                    SARVAAX
                </div>
            </motion.div>

            {/* Mid Layer - Text */}
            <motion.div
                className="relative z-10 text-center"
                style={{
                    x: useTransform(driftX, v => v * 0.5),
                    y: useTransform(driftY, v => v * 0.5),
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="text-neon font-mono text-sm uppercase tracking-[0.3em] mb-4 block">
                        Est. 2025
                    </span>
                    <h1 className="text-[12vw] md:text-[10vw] leading-[0.85] font-bold tracking-tighter uppercase text-foreground">
                        The <span className="text-transparent" style={{ WebkitTextStroke: "2px var(--color-neon)" }}>X</span> Factor
                        <br />
                        <span className="text-neon"><HackerText text="In Technology" /></span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-xl md:text-2xl text-neutral-500 max-w-xl mx-auto mt-8"
                >
                    We architect the digital infrastructure that powers the future.
                </motion.p>
            </motion.div>

            {/* Foreground Layer - Decorative */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                style={{ transform: "translateZ(50px)" }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Scroll to Explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-neon to-transparent" />
                </motion.div>
            </motion.div>
        </div>
    );
}
