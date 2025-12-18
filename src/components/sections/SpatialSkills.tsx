"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Globe, Cpu, Layers, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const skills = [
    { icon: Code2, title: "Frontend Architecture", desc: "React, Next.js, TypeScript" },
    { icon: Globe, title: "Edge Performance", desc: "CDN, Caching, Optimization" },
    { icon: Database, title: "Backend Systems", desc: "Node.js, Python, Go" },
    { icon: Cpu, title: "AI Integration", desc: "OpenAI, Vector DBs, ML" },
    { icon: ShieldCheck, title: "Enterprise Security", desc: "OAuth, RBAC, Encryption" },
    { icon: Layers, title: "Design Systems", desc: "Component Libraries, Tokens" },
];

export function SpatialSkills() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-6 py-8 relative overflow-y-auto">
            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-6 md:mb-10"
            >
                <span className="text-neon font-mono text-xs md:text-sm uppercase tracking-widest mb-2 block">Core Capabilities</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase text-foreground">
                    Technical Depth
                </h2>
            </motion.div>

            {/* Skills Grid - Mobile optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 max-w-5xl mx-auto mb-8 w-full">
                {skills.map((skill, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 md:p-5 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl active:border-neon/50 md:hover:border-neon/50 transition-colors cursor-pointer"
                    >
                        <div className="flex items-start gap-3 md:gap-4">
                            <div className="p-2.5 md:p-3 bg-neon/10 rounded-lg flex-shrink-0">
                                <skill.icon className="text-neon" size={20} />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-base md:text-lg font-bold text-foreground mb-0.5 truncate">{skill.title}</h3>
                                <p className="text-xs md:text-sm text-neutral-500 truncate">{skill.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* See More Button */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Link href="/capabilities">
                    <motion.button
                        className="group flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-neutral-900/50 border border-neutral-700 rounded-full text-foreground font-bold uppercase tracking-wider text-sm md:text-base active:border-neon active:text-neon md:hover:border-neon md:hover:text-neon transition-all duration-300"
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>Explore All</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}
