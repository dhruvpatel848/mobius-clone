"use client";

import { BorderedContainer } from "@/components/core/BorderedContainer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const caseStudies = [
    {
        client: "GLO CAR",
        title: "Premium Detailing Platform",
        impact: "5000+ Happy Clients",
        tags: ["Next.js", "Booking System"],
        link: "https://glocars.in"
    },
    {
        client: "FinTech Global",
        title: "Banking Core Modernization",
        impact: "40% Faster Transactions",
        tags: ["Architecture", "Security"],
        link: "#"
    },
    {
        client: "Logistics",
        title: "AI Route Optimization",
        impact: "25% Cost Reduction",
        tags: ["AI/ML", "Cloud"],
        link: "#"
    }
];

export const CaseStudies = () => {
    return (
        <section id="work" className="bg-background border-b border-border-color">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <BorderedContainer className="p-8 md:p-12 flex items-end">
                    <h2 className="text-[4rem] leading-[0.8] font-bold tracking-tighter uppercase break-all text-foreground">
                        Featured <br />
                        <span className="text-neon">Work</span>
                    </h2>
                </BorderedContainer>

                {caseStudies.map((study, index) => (
                    // Independent motion div for each item to match reference (no stagger)
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }} // Trigger a bit before fully in view
                        transition={{ duration: 0.7, ease: "easeOut" }} // Smooth easing
                        className="h-full"
                    >
                        <BorderedContainer className="h-full group min-h-[400px] p-8 md:p-12 flex flex-col justify-between hover:bg-neutral-900 transition-colors duration-500">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <span className="text-xs font-mono text-neon uppercase mb-2">{study.client}</span>
                                    <div className="flex flex-wrap gap-2">
                                        {study.tags.map((tag, i) => (
                                            <span key={i} className="text-[10px] font-mono uppercase border border-neutral-800 text-neutral-500 px-2 py-1 ">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <ArrowUpRight className="text-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold tracking-tight mb-2 text-foreground">{study.title}</h3>
                                <p className="text-lg text-neutral-500 mb-6">{study.impact}</p>

                                <Link href={study.link} className="inline-block text-sm font-bold uppercase tracking-wider text-neon hover:text-white transition-colors">
                                    Read Case Study
                                </Link>
                            </div>
                        </BorderedContainer>
                    </motion.div>
                ))}

                {/* Empty Filler Cells - Static */}
                <BorderedContainer className="hidden lg:block md:hidden bg-background"><div /></BorderedContainer>
                <BorderedContainer className="hidden lg:block md:hidden bg-background"><div /></BorderedContainer>
            </div>
        </section>
    );
};
