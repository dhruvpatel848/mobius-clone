"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/core/Navigation";
import { WarpBackground } from "@/components/ui/warp-background";
import Link from "next/link";
import {
    Code2, Database, Globe, Cpu, Layers, ShieldCheck,
    Cloud, Zap, GitBranch, Lock, Palette, Server,
    Smartphone, BarChart3, Workflow, Brain, ArrowLeft
} from "lucide-react";

const capabilities = [
    {
        category: "Frontend Engineering",
        icon: Code2,
        color: "from-blue-500 to-cyan-500",
        skills: [
            { name: "React & Next.js", desc: "Server components, streaming, ISR" },
            { name: "TypeScript", desc: "Type-safe architecture at scale" },
            { name: "Performance", desc: "Core Web Vitals optimization" },
            { name: "Accessibility", desc: "WCAG 2.1 AA compliance" },
        ]
    },
    {
        category: "Backend Systems",
        icon: Server,
        color: "from-green-500 to-emerald-500",
        skills: [
            { name: "Node.js & Python", desc: "High-throughput APIs" },
            { name: "Go", desc: "Concurrent microservices" },
            { name: "GraphQL", desc: "Federated schemas" },
            { name: "Message Queues", desc: "Kafka, RabbitMQ, Redis" },
        ]
    },
    {
        category: "Cloud & Infrastructure",
        icon: Cloud,
        color: "from-purple-500 to-violet-500",
        skills: [
            { name: "AWS & GCP", desc: "Multi-cloud architecture" },
            { name: "Kubernetes", desc: "Container orchestration" },
            { name: "Terraform", desc: "Infrastructure as Code" },
            { name: "CI/CD", desc: "GitHub Actions, ArgoCD" },
        ]
    },
    {
        category: "AI & Machine Learning",
        icon: Brain,
        color: "from-pink-500 to-rose-500",
        skills: [
            { name: "OpenAI & Anthropic", desc: "LLM integration" },
            { name: "Vector Databases", desc: "Pinecone, Weaviate" },
            { name: "RAG Systems", desc: "Retrieval augmented generation" },
            { name: "Fine-tuning", desc: "Custom model training" },
        ]
    },
    {
        category: "Security & Compliance",
        icon: Lock,
        color: "from-red-500 to-orange-500",
        skills: [
            { name: "OAuth 2.0 / OIDC", desc: "Identity federation" },
            { name: "Zero Trust", desc: "Network security architecture" },
            { name: "Encryption", desc: "At-rest and in-transit" },
            { name: "Compliance", desc: "SOC 2, GDPR, HIPAA" },
        ]
    },
    {
        category: "Design Systems",
        icon: Palette,
        color: "from-yellow-500 to-amber-500",
        skills: [
            { name: "Component Libraries", desc: "Radix, Headless UI" },
            { name: "Design Tokens", desc: "Semantic theming" },
            { name: "Accessibility", desc: "Keyboard & screen reader" },
            { name: "Documentation", desc: "Storybook, MDX" },
        ]
    },
];

export default function CapabilitiesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <WarpBackground velocity={0.2} />
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 md:px-12 relative">
                <div className="max-w-6xl mx-auto">
                    <Link href="/">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-neutral-500 hover:text-neon transition-colors mb-8"
                        >
                            <ArrowLeft size={16} />
                            <span className="text-sm font-mono uppercase tracking-wider">Back to Home</span>
                        </motion.button>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-neon font-mono text-sm uppercase tracking-widest mb-4 block">
                            Full Stack Expertise
                        </span>
                        <h1 className="text-[8vw] md:text-[6vw] leading-[0.9] font-bold tracking-tighter uppercase text-foreground mb-6">
                            Our <span className="text-neon">Capabilities</span>
                        </h1>
                        <p className="text-xl text-neutral-400 max-w-2xl">
                            From frontend interfaces to distributed backend systems, we architect solutions that scale with your ambition.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Capabilities Grid */}
            <section className="px-6 md:px-12 pb-32">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {capabilities.map((cap, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group"
                        >
                            <div className="h-full p-8 bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-all duration-300">
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${cap.color} bg-opacity-20`}>
                                        <cap.icon className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground">{cap.category}</h3>
                                </div>

                                {/* Skills List */}
                                <div className="space-y-4">
                                    {cap.skills.map((skill, j) => (
                                        <div key={j} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-neon mt-2 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">{skill.name}</p>
                                                <p className="text-xs text-neutral-500">{skill.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 md:px-12 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to build something <span className="text-neon">exceptional</span>?
                    </h2>
                    <Link href="/#contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-neon text-black font-bold uppercase tracking-wider rounded-full"
                        >
                            Start a Project
                        </motion.button>
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
