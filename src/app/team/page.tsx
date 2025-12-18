"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/core/Navigation";
import { WarpBackground } from "@/components/ui/warp-background";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Linkedin, Mail } from "lucide-react";

const teamMembers = [
    {
        name: "Tirth Bhuva",
        role: "Graphics Designer",
        description: "Crafts visually compelling designs that align brand identity with user engagement. Specializes in digital creatives, layouts, and visual storytelling for web and social platforms.",
        linkedin: "https://www.linkedin.com/in/tirth-bhuva-464158247/",
        color: "#daff02",
        image: null,
        initials: "TB",
    },
    {
        name: "Dhruvil Vaghasiya",
        role: "Social Media Manager",
        description: "Drives brand presence across social platforms through strategic content planning, audience engagement, and performance-driven campaigns.",
        linkedin: "https://www.linkedin.com/in/dhruvilvaghasiya/",
        color: "#ff6b6b",
        image: "/team/dhruvil.jpg",
        initials: "DV",
    },
    {
        name: "Vatsal Kevadiya",
        role: "Full Stack Developer · Java Spring Boot",
        description: "Builds scalable, high-performance applications across frontend and backend. Strong expertise in Java Spring Boot, API development, and system architecture.",
        linkedin: "https://www.linkedin.com/in/vatsal-kevadiya/",
        color: "#00d4ff",
        image: null,
        initials: "VK",
    },
    {
        name: "Dhruv Patel",
        role: "Full Stack Developer · Cyber Security",
        description: "Combines full stack engineering with cybersecurity expertise to develop secure, resilient applications. Focused on vulnerability mitigation, secure APIs, and system hardening.",
        linkedin: "https://www.linkedin.com/in/dhruvpatel848/",
        color: "#22c55e",
        image: "/team/dhruv.jpg",
        initials: "DP",
    },
    {
        name: "Aniket Aslaliya",
        role: "Product Management",
        description: "Leads product strategy and execution, bridging client requirements with technical teams. Ensures timely delivery, clear roadmaps, and business-aligned outcomes.",
        linkedin: "https://www.linkedin.com/in/aniket-aslaliya/",
        color: "#a855f7",
        image: "/team/aniket.jpg",
        initials: "AA",
    },
];

function TeamCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative"
        >
            {/* Card glow */}
            <div
                className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"
                style={{ backgroundColor: member.color }}
            />

            <div
                className="relative p-6 md:p-8 bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-2xl overflow-hidden h-full"
                style={{ boxShadow: `0 0 30px ${member.color}10` }}
            >
                {/* Background pattern */}
                <div
                    className="absolute top-0 right-0 w-40 h-40 opacity-10"
                    style={{
                        background: `radial-gradient(circle at top right, ${member.color}, transparent 70%)`,
                    }}
                />

                {/* Photo or Initials */}
                <motion.div
                    className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden mb-5 border-2 flex items-center justify-center"
                    style={{
                        borderColor: member.color + '50',
                        backgroundColor: member.image ? 'transparent' : member.color + '20',
                    }}
                    whileHover={{ scale: 1.05 }}
                >
                    {member.image ? (
                        <>
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover"
                            />
                            {/* Gradient overlay */}
                            <div
                                className="absolute inset-0 opacity-20"
                                style={{ background: `linear-gradient(135deg, transparent, ${member.color}40)` }}
                            />
                        </>
                    ) : (
                        <span
                            className="text-3xl md:text-4xl font-bold"
                            style={{ color: member.color }}
                        >
                            {member.initials}
                        </span>
                    )}
                </motion.div>

                {/* Info */}
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                    {member.name}
                </h3>
                <p
                    className="text-sm font-semibold mb-4"
                    style={{ color: member.color }}
                >
                    {member.role}
                </p>

                {/* Description */}
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {member.description}
                </p>

                {/* LinkedIn */}
                <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 3 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors"
                    style={{
                        borderColor: member.color + '50',
                        color: member.color,
                    }}
                >
                    <Linkedin size={16} />
                    Connect
                </motion.a>

                {/* Decorative line */}
                <motion.div
                    className="absolute bottom-0 left-0 h-1 rounded-full"
                    style={{ backgroundColor: member.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                />
            </div>
        </motion.div>
    );
}

export default function TeamPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <WarpBackground velocity={0.08} />
            <Navigation />

            <div className="min-h-screen pt-28 pb-20 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">

                    {/* Back link */}
                    <Link href="/">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ x: -5 }}
                            className="inline-flex items-center gap-2 text-neutral-500 hover:text-neon transition-colors mb-8 cursor-pointer"
                        >
                            <ArrowLeft size={16} />
                            <span className="text-sm font-mono uppercase tracking-wider">Back</span>
                        </motion.span>
                    </Link>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-neon font-mono text-sm uppercase tracking-widest mb-4 block">
                            The People Behind
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase mb-6">
                            Our <span className="text-neon">Team</span>
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
                            A collective of engineers, designers, and innovators building the future of technology.
                        </p>
                    </motion.div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {teamMembers.map((member, index) => (
                            <TeamCard key={member.name} member={member} index={index} />
                        ))}
                    </div>

                    {/* Call to action */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-center mt-20"
                    >
                        <p className="text-neutral-500 mb-6">Want to join our team?</p>
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group inline-flex items-center gap-2 px-8 py-4 bg-neon text-black font-bold uppercase tracking-wider rounded-full"
                            >
                                <Mail size={18} />
                                Get In Touch
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
