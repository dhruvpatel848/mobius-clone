"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const VisionTeaser = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const xLeft = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
    const xRight = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);

    return (
        <section id="vision" ref={targetRef} className="py-24 bg-background overflow-hidden border-b border-border-color">
            <div className="flex flex-col gap-4 opacity-50 select-none pointer-events-none">
                <motion.div style={{ x: xLeft }} className="whitespace-nowrap">
                    <span className="text-[15vw] font-bold uppercase tracking-tighter text-outline text-transparent stroke-neutral-500" style={{ WebkitTextStroke: "1px #ffffff" }}>
                        Redefining Resilience
                    </span>
                </motion.div>

                <motion.div style={{ x: xRight }} className="whitespace-nowrap">
                    <span className="text-[15vw] font-bold uppercase tracking-tighter text-neon opacity-80">
                        Autonomous Future
                    </span>
                </motion.div>

                <motion.div style={{ x: xLeft }} className="whitespace-nowrap">
                    <span className="text-[15vw] font-bold uppercase tracking-tighter text-outline text-transparent stroke-neutral-500" style={{ WebkitTextStroke: "1px #ffffff" }}>
                        Global Infrastructure
                    </span>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 md:px-12 mt-[-10vw] relative z-10 text-center">
                <p className="text-xl md:text-3xl font-light text-foreground max-w-4xl mx-auto leading-relaxed bg-neutral-900/80 backdrop-blur-md p-8 border border-neutral-700 rounded-xl">
                    "We don't just build systems. We architect the immune system of the digital age."
                </p>
            </div>
        </section>
    );
};
