"use client";

import { BorderedContainer } from "@/components/core/BorderedContainer";
import { motion } from "framer-motion";

const stats = [
    { label: "Global Partners", value: "50+" },
    { label: "Systems Secured", value: "10k" },
    { label: "Uptime Guaranteed", value: "99.9%" }
];

export const Stats = () => {
    return (
        <section className="bg-background border-b border-border-color">
            <div className="grid grid-cols-1 md:grid-cols-3">
                {stats.map((stat, index) => (
                    <BorderedContainer key={index} className="p-8 md:p-12 flex flex-col items-center justify-center text-center py-24 hover:bg-neutral-900 transition-colors duration-500">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-neon"
                        >
                            {stat.value}
                        </motion.span>
                        <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest">{stat.label}</span>
                    </BorderedContainer>
                ))}
            </div>
        </section>
    );
};
