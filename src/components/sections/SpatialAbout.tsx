"use client";

import React from "react";
import { motion } from "framer-motion";

export function SpatialAbout() {
    return (
        <div className="w-full h-full flex items-center justify-center px-6 md:px-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-4xl text-center"
            >
                <span className="text-neon font-mono text-sm uppercase tracking-widest mb-4 block">About</span>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-8 leading-tight">
                    We don't just build systems.
                    <br />
                    <span className="text-neutral-500">We architect the immune system of the digital age.</span>
                </h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-xl text-neutral-400 leading-relaxed mb-12"
                >
                    SARVAAX delivers enterprise-grade resilience. From cloud-native infrastructure
                    to autonomous security grids, we engineer solutions that anticipate tomorrow's challenges.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                >
                    {[
                        { value: "5+", label: "Projects Delivered" },
                        { value: "100%", label: "Client Retention" },
                        { value: "1yr", label: "Avg. Partnership" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-neon mb-2">{stat.value}</div>
                            <div className="text-sm text-neutral-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}
