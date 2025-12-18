"use client";

import React from "react";
import { motion } from "framer-motion";
import { SpatialCard } from "@/components/world/SpatialCard";
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
        <div className="w-full h-full flex flex-col items-center justify-center px-6 relative">
            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                <span className="text-neon font-mono text-sm uppercase tracking-widest mb-2 block">Core Capabilities</span>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase text-foreground">
                    Technical Depth
                </h2>
            </motion.div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                {skills.map((skill, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <SpatialCard
                            tiltIntensity={12}
                            hoverLift={25}
                            breathe={false}
                            className="w-full p-6 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl hover:border-neon/50 transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-neon/10 rounded-lg flex-shrink-0">
                                    <skill.icon className="text-neon" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">{skill.title}</h3>
                                    <p className="text-sm text-neutral-500">{skill.desc}</p>
                                </div>
                            </div>
                        </SpatialCard>
                    </motion.div>
                ))}
            </div>

            {/* See More Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                <Link href="/capabilities">
                    <motion.button
                        className="group flex items-center gap-3 px-8 py-4 bg-neutral-900/50 border border-neutral-700 rounded-full text-foreground font-bold uppercase tracking-wider hover:border-neon hover:text-neon transition-all duration-300"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>Explore All Capabilities</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}
