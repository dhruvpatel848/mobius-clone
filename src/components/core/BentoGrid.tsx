"use client";

import { GlowCard } from "@/components/ui/glow-card";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        title: "Lumina Interface",
        category: "Design System",
        size: "col-span-1 md:col-span-2 row-span-2",
    },
    {
        title: "Apex Finance",
        category: "Web Application",
        size: "col-span-1 row-span-1",
    },
    {
        title: "Nexus AI",
        category: "Landing Page",
        size: "col-span-1 row-span-1",
    },
    {
        title: "Quantum Labs",
        category: "Research",
        size: "col-span-1 md:col-span-2 row-span-1",
    },
];

export const BentoGrid = () => {
    return (
        <section id="work" className="px-6 md:px-12 py-32 bg-[#111111]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-1 auto-rows-[350px]">
                {projects.map((project, i) => (
                    <GlowCard key={i} className={`${project.size}`}>
                        <div className="flex flex-col h-full bg-[#161616] p-8 justify-between hover:bg-[#1a1a1a] transition-colors duration-500">
                            <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                            <div className="flex justify-end relative z-30">
                                <div className="bg-neutral-800 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <ArrowUpRight size={18} />
                                </div>
                            </div>

                            <div className="relative z-30">
                                <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest">{project.category}</span>
                                <h3 className="text-3xl font-bold mt-3 text-[#ededed]">{project.title}</h3>
                            </div>
                        </div>
                    </GlowCard>
                ))}
            </div>
        </section>
    );
};
