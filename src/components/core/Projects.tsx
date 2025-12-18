"use client";

import { BorderedContainer } from "@/components/core/BorderedContainer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        title: "E-Commerce Rebrand",
        tags: ["React", "Shopify", "Framar Motion"],
        link: "#"
    },
    {
        title: "Financial Dashboard",
        tags: ["Next.js", "D3.js", "PostgreSQL"],
        link: "#"
    },
    {
        title: "AI Content Generator",
        tags: ["Python", "OpenAI", "FastAPI"],
        link: "#"
    }
];

export const Projects = () => {
    return (
        <section id="work" className="bg-white border-b border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <BorderedContainer className="p-8 md:p-12 flex items-end">
                    <h2 className="text-[4rem] leading-[0.8] font-bold tracking-tighter uppercase break-all">
                        Selected <br />
                        Work
                    </h2>
                </BorderedContainer>

                {projects.map((project, index) => (
                    <BorderedContainer key={index} className="group min-h-[400px] p-8 md:p-12 flex flex-col justify-between hover:bg-neutral-900 hover:text-white transition-colors duration-500">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="text-xs font-mono uppercase border border-neutral-300 group-hover:border-neutral-700 px-2 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold tracking-tight mb-4">{project.title}</h3>
                            <Link href={project.link} className="inline-block text-sm font-bold uppercase tracking-wider underline decoration-neutral-400 underline-offset-4 group-hover:decoration-white">
                                View Case Study
                            </Link>
                        </div>
                    </BorderedContainer>
                ))}

                {/* Empty Filler Cells to maintain grid if needed, or keeping it organic */}
                <BorderedContainer className="hidden lg:block md:hidden bg-neutral-50"><div /></BorderedContainer>
                <BorderedContainer className="hidden lg:block md:hidden bg-neutral-50"><div /></BorderedContainer>
            </div>
        </section>
    );
};
