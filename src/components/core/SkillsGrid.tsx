"use client";

import { BorderedContainer } from "@/components/core/BorderedContainer";
import { motion } from "framer-motion";

const skills = [
    {
        label: "A/",
        title: "Frontend Engineering",
        description: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion, WebGL"
    },
    {
        label: "B/",
        title: "Backend Systems",
        description: "Node.js, Python, PostgreSQL, Redis, Docker, Kubernetes"
    },
    {
        label: "C/",
        title: "Security Research",
        description: "Penetration Testing, OWASP Top 10, Cryptography, Secure Architecture"
    },
    {
        label: "D/",
        title: "System Design",
        description: "Microservices, Event-Driven Architecture, High Scalability, Cloud Native"
    }
];

export const SkillsGrid = () => {
    return (
        <section id="about" className="bg-background border-b border-border-color">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {skills.map((skill, index) => (
                    <BorderedContainer key={index} className="min-h-[300px] p-8 md:p-12 flex flex-col justify-between group hover:bg-neutral-900 transition-colors duration-500">
                        <div className="flex justify-between items-start">
                            <span className="text-sm font-mono text-neutral-500 group-hover:text-neon transition-colors">{skill.label}</span>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="w-2 h-2 bg-neon rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                        </div>

                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground group-hover:text-neon transition-colors">{skill.title}</h3>
                            <p className="text-neutral-400 text-lg leading-relaxed max-w-sm">
                                {skill.description}
                            </p>
                        </div>
                    </BorderedContainer>
                ))}
            </div>
        </section>
    );
};
