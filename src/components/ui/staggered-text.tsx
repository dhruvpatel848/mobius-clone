"use client";

import { motion } from "framer-motion";

export const StaggeredText = ({ text, className }: { text: string; className?: string }) => {
    return (
        <motion.div
            className={`relative overflow-hidden block whitespace-nowrap ${className}`}
            initial="initial"
            whileHover="hovered"
            style={{ lineHeight: 0.9 }}
        >
            <motion.div
                variants={{
                    initial: { y: 0 },
                    hovered: { y: "-100%" },
                }}
                transition={{
                    duration: 0.4,
                    ease: [0.33, 1, 0.68, 1], // easeInOutCubic
                    staggerChildren: 0.02,
                }}
                className="flex"
            >
                {text.split("").map((char, i) => (
                    <span key={i} className="inline-block">{char === " " ? "\u00A0" : char}</span>
                ))}
            </motion.div>
            <motion.div
                className="absolute inset-0 flex"
                variants={{
                    initial: { y: "100%" },
                    hovered: { y: 0 },
                }}
                transition={{
                    duration: 0.4,
                    ease: [0.33, 1, 0.68, 1],
                    staggerChildren: 0.02,
                }}
            >
                {text.split("").map((char, i) => (
                    <span key={i} className="inline-block">{char === " " ? "\u00A0" : char}</span>
                ))}
            </motion.div>
        </motion.div>
    );
};
