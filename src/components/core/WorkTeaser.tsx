"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export const WorkTeaser = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

    return (
        <section ref={containerRef} className="min-h-screen py-24 flex flex-col items-center justify-center bg-background border-t border-border-color relative overflow-hidden">
            <div className="text-center z-10 mb-24">
                <motion.h2
                    style={{ opacity }}
                    className="text-[10vw] leading-[0.8] font-bold tracking-tighter uppercase text-foreground mb-4"
                >
                    Quantifiable <br /><span className="text-neon">Impact</span>
                </motion.h2>
                <Link href="/work" className="inline-block px-8 py-4 border border-neon text-neon uppercase font-bold tracking-widest hover:bg-neon hover:text-white transition-colors duration-300">
                    Explore Case Studies
                </Link>
            </div>

            {/* Abstract Visual Elements - Darker circles for white theme */}
            <motion.div style={{ y }} className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[60vw] h-[60vw] border border-neutral-300 rounded-full flex items-center justify-center">
                    <div className="w-[40vw] h-[40vw] border border-neutral-300 rounded-full flex items-center justify-center">
                        <div className="w-[20vw] h-[20vw] border border-neon rounded-full" />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
