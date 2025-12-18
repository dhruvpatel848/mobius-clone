"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Linkedin } from "lucide-react";

const teamMembers = [
    {
        name: "Tirth Bhuva",
        role: "Graphics Designer",
        linkedin: "https://www.linkedin.com/in/tirth-bhuva-464158247/",
        color: "#daff02",
        image: null,
        initials: "TB",
    },
    {
        name: "Dhruvil Vaghasiya",
        role: "Social Media Manager",
        linkedin: "https://www.linkedin.com/in/dhruvilvaghasiya/",
        color: "#ff6b6b",
        image: "/team/dhruvil.jpg",
        initials: "DV",
    },
    {
        name: "Vatsal Kevadiya",
        role: "Full Stack · Java Spring Boot",
        linkedin: "https://www.linkedin.com/in/vatsal-kevadiya/",
        color: "#00d4ff",
        image: null,
        initials: "VK",
    },
    {
        name: "Dhruv Patel",
        role: "Full Stack · Cyber Security",
        linkedin: "https://www.linkedin.com/in/dhruvpatel848/",
        color: "#22c55e",
        image: "/team/dhruv.jpg",
        initials: "DP",
    },
    {
        name: "Aniket Aslaliya",
        role: "Product Management",
        linkedin: "https://www.linkedin.com/in/aniket-aslaliya/",
        color: "#a855f7",
        image: "/team/aniket.jpg",
        initials: "AA",
    },
];

function MiniTeamCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
    return (
        <motion.a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative p-4 bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-xl flex items-center gap-4 cursor-pointer"
            style={{ boxShadow: `0 0 20px ${member.color}10` }}
        >
            {/* Avatar */}
            <div
                className="relative w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center border"
                style={{
                    borderColor: member.color + '50',
                    backgroundColor: member.image ? 'transparent' : member.color + '20',
                }}
            >
                {member.image ? (
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <span className="text-xl font-bold" style={{ color: member.color }}>
                        {member.initials}
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-foreground truncate">{member.name}</h4>
                <p className="text-xs truncate" style={{ color: member.color }}>{member.role}</p>
            </div>

            {/* LinkedIn icon */}
            <div
                className="w-8 h-8 rounded-lg border flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ borderColor: member.color + '50', color: member.color }}
            >
                <Linkedin size={14} />
            </div>

            {/* Bottom accent line */}
            <motion.div
                className="absolute bottom-0 left-0 h-0.5 rounded-full"
                style={{ backgroundColor: member.color }}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
            />
        </motion.a>
    );
}

export function SpatialTeam() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-12 py-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
            >
                <span className="text-neon font-mono text-xs md:text-sm uppercase tracking-widest mb-3 block">
                    The People Behind
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight uppercase text-foreground mb-4">
                    Our <span className="text-neon">Team</span>
                </h2>
                <p className="text-sm md:text-base text-neutral-500 max-w-md mx-auto">
                    Engineers, designers, and innovators building the future.
                </p>
            </motion.div>

            {/* Team Grid - Compact for spatial section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full max-w-4xl mb-8">
                {teamMembers.map((member, index) => (
                    <MiniTeamCard key={member.name} member={member} index={index} />
                ))}
            </div>

            {/* CTA to full team page */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Link href="/team">
                    <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-neon text-neon font-bold uppercase tracking-wider rounded-full text-sm"
                    >
                        Meet the Full Team
                        <ArrowUpRight size={16} />
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}
