"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/core/Navigation";
import { WarpBackground } from "@/components/ui/warp-background";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code2, Server, Cloud, Smartphone, Shield, Brain, Settings, TestTube, Palette, Coins } from "lucide-react";

const capabilities = [
    {
        title: "Frontend Engineering",
        icon: Code2,
        color: "#daff02",
        skills: [
            { name: "React & Next.js", desc: "Server Components, Streaming, ISR" },
            { name: "TypeScript", desc: "Type-safe Architecture at Scale" },
            { name: "Performance", desc: "Core Web Vitals Optimization" },
            { name: "Accessibility", desc: "WCAG 2.1 AA Compliance" },
        ]
    },
    {
        title: "Backend Systems",
        icon: Server,
        color: "#00d4ff",
        skills: [
            { name: "Node.js & Python", desc: "High-throughput APIs" },
            { name: "Go", desc: "Concurrent Microservices" },
            { name: "GraphQL", desc: "Federated Schemas" },
            { name: "Message Queues", desc: "Kafka, RabbitMQ, Redis" },
        ]
    },
    {
        title: "Cloud & Infrastructure",
        icon: Cloud,
        color: "#a855f7",
        skills: [
            { name: "AWS & GCP", desc: "Multi-cloud Architecture" },
            { name: "Kubernetes", desc: "Container Orchestration" },
            { name: "Terraform", desc: "Infrastructure as Code" },
            { name: "CI/CD", desc: "GitHub Actions, ArgoCD" },
            { name: "Edge Performance", desc: "CDN, Caching, Optimization" },
        ]
    },
    {
        title: "Mobile Engineering",
        icon: Smartphone,
        color: "#f97316",
        skills: [
            { name: "Android & iOS", desc: "Native Application Development" },
            { name: "Flutter & React Native", desc: "Cross-platform Applications" },
            { name: "App Performance", desc: "Memory & Battery Optimization" },
            { name: "App Security", desc: "Secure Storage & APIs" },
        ]
    },
    {
        title: "Cybersecurity",
        icon: Shield,
        color: "#ef4444",
        skills: [
            { name: "Application Security", desc: "OWASP Top 10 Mitigation" },
            { name: "Penetration Testing", desc: "Web & API Exploits" },
            { name: "Network Security", desc: "Firewalls, IDS/IPS" },
            { name: "Identity & Access", desc: "IAM, Zero Trust" },
        ]
    },
    {
        title: "Data & AI",
        icon: Brain,
        color: "#ec4899",
        skills: [
            { name: "Data Engineering", desc: "ETL Pipelines" },
            { name: "Machine Learning", desc: "Model Training & Inference" },
            { name: "Computer Vision", desc: "CNN-based Systems" },
            { name: "NLP", desc: "Text & Chat Intelligence" },
            { name: "AI Integration", desc: "LLMs, APIs, Automation" },
        ]
    },
    {
        title: "DevOps & Reliability",
        icon: Settings,
        color: "#14b8a6",
        skills: [
            { name: "Observability", desc: "Logs, Metrics, Traces" },
            { name: "Auto Scaling", desc: "High Availability Systems" },
            { name: "Disaster Recovery", desc: "Backup & Failover" },
            { name: "Site Reliability", desc: "SLA-driven Operations" },
        ]
    },
    {
        title: "QA & Testing",
        icon: TestTube,
        color: "#22c55e",
        skills: [
            { name: "Test Automation", desc: "Selenium, Playwright" },
            { name: "API Testing", desc: "Postman, REST Assured" },
            { name: "Performance Testing", desc: "JMeter, Load Testing" },
            { name: "Security Testing", desc: "SAST & DAST" },
        ]
    },
    {
        title: "UI / UX Design",
        icon: Palette,
        color: "#f59e0b",
        skills: [
            { name: "Design Systems", desc: "Scalable Component Libraries" },
            { name: "UX Research", desc: "User-Centered Design" },
            { name: "Prototyping", desc: "High-fidelity Mockups" },
            { name: "Accessibility Design", desc: "Inclusive Interfaces" },
        ]
    },
    {
        title: "Blockchain Engineering",
        icon: Coins,
        color: "#8b5cf6",
        skills: [
            { name: "Smart Contracts", desc: "Solidity, Vyper" },
            { name: "Web3 Integration", desc: "dApps & Wallet Connectivity" },
            { name: "Blockchain Networks", desc: "Ethereum, Polygon, Solana" },
            { name: "Token Standards", desc: "ERC-20, ERC-721, ERC-1155" },
            { name: "Security", desc: "Contract Audits & Exploit Prevention" },
            { name: "Infrastructure", desc: "Nodes, RPCs, Indexers" },
        ]
    },
];

export default function CapabilitiesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <WarpBackground velocity={0.05} />
            <Navigation />

            <div className="pt-28 pb-20 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="mb-16">
                        <Link href="/">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ x: -5 }}
                                className="inline-flex items-center gap-2 text-neutral-500 hover:text-neon transition-colors mb-8"
                            >
                                <ArrowLeft size={16} />
                                <span className="text-sm font-mono uppercase tracking-wider">Back</span>
                            </motion.span>
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="text-neon font-mono text-sm uppercase tracking-widest mb-4 block">Technical Capabilities</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-6">
                                Full-Stack<br />
                                <span className="text-neon">Expertise</span>
                            </h1>
                            <p className="text-lg text-neutral-400 max-w-2xl">
                                Comprehensive engineering capabilities spanning frontend, backend, cloud, security, and emerging technologies.
                            </p>
                        </motion.div>
                    </div>

                    {/* Capabilities Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {capabilities.map((category, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group p-6 bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl hover:border-opacity-60 transition-all"
                                style={{ borderColor: `${category.color}30` }}
                            >
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-5">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: category.color + '15' }}
                                    >
                                        <category.icon size={20} style={{ color: category.color }} />
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
                                </div>

                                {/* Skills */}
                                <div className="space-y-3">
                                    {category.skills.map((skill, j) => (
                                        <div key={j} className="p-3 bg-neutral-800/40 rounded-xl">
                                            <p className="text-sm font-medium text-foreground mb-0.5">{skill.name}</p>
                                            <p className="text-xs text-neutral-500">{skill.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-neon text-black font-bold uppercase tracking-wider rounded-full"
                            >
                                Start a Project
                                <ArrowUpRight size={18} />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
