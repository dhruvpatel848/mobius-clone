"use client";

import React, { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const projects = [
    {
        client: "GLO CAR",
        title: "Premium Car Detailing Platform",
        problem: "Complex booking system for 50+ service locations across India",
        solution: "Real-time scheduling with Razorpay payment integration",
        impact: "5000+ monthly bookings",
        tags: ["React", "Vite", "Razorpay", "Node.js"],
        color: "#daff02",
        url: "https://glocars.in",
    },
    {
        client: "LEGAL SAHAI",
        title: "Legal Services Platform",
        problem: "Fragmented access to legal advice and services",
        solution: "Unified platform connecting users with legal experts",
        impact: "Expert legal solutions",
        tags: ["React", "Node.js", "MongoDB"],
        color: "#00d4ff",
        url: "https://legalsahai.vercel.app",
    },
];

// Calculate card position in orbit
function getCardPosition(rotation: number, index: number, totalCards: number) {
    const angleOffset = (index / totalCards) * 360;
    const angle = ((rotation + angleOffset) * Math.PI) / 180;
    const orbitRadius = 220;

    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitRadius * 0.35;
    const z = Math.sin(angle);
    const scale = 0.75 + (z + 1) * 0.15;
    const opacity = 0.5 + (z + 1) * 0.25;
    const zIndex = Math.round((z + 1) * 10);

    return { x, y, scale, opacity, zIndex };
}

// Project Card
function ProjectCard({
    project,
    position
}: {
    project: typeof projects[0];
    position: { x: number; y: number; scale: number; opacity: number; zIndex: number };
}) {
    return (
        <motion.div
            className="absolute left-1/2 top-1/2 cursor-pointer"
            animate={{
                x: position.x - 140,
                y: position.y - 100,
                scale: position.scale,
                opacity: position.opacity,
                zIndex: position.zIndex,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
            <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-[280px] p-5 bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-2xl"
                style={{
                    boxShadow: `0 0 30px ${project.color}20`,
                    borderColor: `${project.color}40`,
                }}
                whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 50px ${project.color}40`,
                    borderColor: project.color,
                }}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span
                            className="text-[10px] font-mono uppercase tracking-wider"
                            style={{ color: project.color }}
                        >
                            {project.client}
                        </span>
                        <h3 className="text-sm font-bold text-foreground mt-0.5">{project.title}</h3>
                    </div>
                    <div
                        className="w-8 h-8 rounded-full border flex items-center justify-center"
                        style={{ borderColor: project.color + '60' }}
                    >
                        <ExternalLink size={12} style={{ color: project.color }} />
                    </div>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-2 mb-3">
                    <div className="p-2.5 bg-neutral-800/60 rounded-lg">
                        <p className="text-[8px] font-mono text-neutral-500 uppercase">Challenge</p>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">{project.problem}</p>
                    </div>
                    <div className="p-2.5 bg-neutral-800/60 rounded-lg">
                        <p className="text-[8px] font-mono text-neutral-500 uppercase">Solution</p>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">{project.solution}</p>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag, j) => (
                        <span key={j} className="text-[8px] font-mono uppercase border border-neutral-700 text-neutral-500 px-1.5 py-0.5 rounded">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Impact */}
                <div className="flex items-center justify-between">
                    <div
                        className="px-3 py-1 rounded-full text-[10px] font-bold"
                        style={{
                            backgroundColor: project.color + '20',
                            color: project.color,
                        }}
                    >
                        {project.impact}
                    </div>
                    <span
                        className="text-[9px] font-bold uppercase tracking-wider flex items-center gap-1"
                        style={{ color: project.color }}
                    >
                        Visit <ArrowUpRight size={10} />
                    </span>
                </div>
            </motion.a>
        </motion.div>
    );
}

export function SpatialProjects() {
    const [mounted, setMounted] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDrag = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setRotation(prev => prev + info.delta.x * 0.5);
    };

    const cardPositions = projects.map((_, i) =>
        getCardPosition(rotation, i, projects.length)
    );

    if (!mounted) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="text-center mb-8">
                    <span className="text-neon font-mono text-sm uppercase tracking-widest mb-2 block">Selected Work</span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase text-foreground">
                        Real Impact
                    </h2>
                </div>
                <div className="h-[400px] flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-neutral-900 border border-neutral-800 animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden px-4">
            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 relative z-30"
            >
                <span className="text-neon font-mono text-sm uppercase tracking-widest mb-2 block">Selected Work</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter uppercase text-foreground">
                    Real Impact
                </h2>
            </motion.div>

            {/* Orbit Container */}
            <motion.div
                className="relative w-full h-[350px] md:h-[400px] cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                onDrag={handleDrag}
                style={{ touchAction: "pan-y pinch-zoom" }}
            >
                {/* Central Sphere */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="absolute -inset-12 rounded-full bg-gradient-radial from-neon/15 via-neon/5 to-transparent blur-2xl" />

                    <motion.div
                        className="absolute -inset-6 rounded-full border border-neutral-700/30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />

                    <div
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-neutral-700/50 flex items-center justify-center"
                        style={{
                            boxShadow: `
                                inset -8px -8px 20px rgba(0,0,0,0.8),
                                inset 4px 4px 15px rgba(255,255,255,0.05),
                                0 0 40px rgba(218,255,2,0.1)
                            `,
                        }}
                    >
                        <span className="text-neon font-mono text-[9px] uppercase tracking-widest">WORK</span>
                    </div>
                </div>

                {/* Orbit path */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[160px] rounded-full border border-neutral-800/30 border-dashed pointer-events-none" />

                {/* Project Cards */}
                {projects.map((project, i) => (
                    <ProjectCard
                        key={i}
                        project={project}
                        position={cardPositions[i]}
                    />
                ))}
            </motion.div>

            {/* Hint */}
            <motion.p
                animate={{ opacity: isDragging ? 0 : 0.5 }}
                className="text-neutral-500 text-xs md:text-sm font-mono mt-2"
            >
                ← Drag to explore →
            </motion.p>
        </div>
    );
}
