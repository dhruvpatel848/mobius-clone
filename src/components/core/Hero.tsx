"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";

export const Hero = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    return (
        <section ref={targetRef} className="h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-12 border-b border-border-color bg-background relative overflow-hidden perspective-1000">
            {/* Abstract Dot Pattern Background - Neutral dots on Dark */}
            <motion.div style={{ y, scale }} className="absolute inset-0 bg-[radial-gradient(#404040_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20 origin-top"></motion.div>

            <div className="flex flex-col gap-8 relative z-10 perspective-1000">
                <motion.div
                    initial={{ opacity: 0, rotateX: 90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{ duration: 1, ease: "circOut" }}
                >
                    <span className="text-neon font-mono text-sm md:text-base uppercase tracking-[0.2em] mb-4 block font-bold">
                        Est. 2025
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, z: -100, rotateX: 20 }}
                    animate={{ opacity: 1, z: 0, rotateX: 0 }}
                    transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                    className="text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase text-foreground"
                    style={{ y }}
                >
                    The <span className="text-transparent stroke-neon" style={{ WebkitTextStroke: "1px var(--color-neon)" }}>X</span> Factor <br />
                    In Technology.
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ opacity }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 max-w-4xl mt-12"
                >
                    <p className="text-xl md:text-2xl font-light text-neutral-600 max-w-lg leading-snug">
                        Sarvaax delivers enterprise-grade resilience. We engineer the digital infrastructure that powers the future.
                    </p>
                </motion.div>
            </div>

            <motion.a
                href="#services"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                style={{ opacity }}
                className="absolute bottom-12 right-6 md:right-12 text-neon animate-bounce"
            >
                <ScrollIndicator />
            </motion.a>
        </section>
    );
};

function ScrollIndicator() {
    return (
        <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-bold rotate-90 mb-4 text-neon">Scroll</span>
            <div className="w-[1px] h-12 bg-neon/20 overflow-hidden">
                <div className="w-full h-full bg-neon animate-scroll-down"></div>
            </div>
        </div>
    );
}
