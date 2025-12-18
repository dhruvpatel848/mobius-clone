"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, PanInfo } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        client: "GLO CAR",
        title: "Premium Detailing",
        problem: "Complex booking",
        solution: "Real-time scheduling",
        impact: "5000+ bookings",
        tags: ["Next.js", "Supabase"],
        color: "#daff02",
    },
    {
        client: "FINTECH",
        title: "Banking Modern",
        problem: "40s load times",
        solution: "Micro-frontend",
        impact: "<800ms loads",
        tags: ["Micro-FE", "Redis"],
        color: "#00d4ff",
    },
    {
        client: "LOGISTICS",
        title: "Route AI",
        problem: "Static routing",
        solution: "Vector routing",
        impact: "25% saved",
        tags: ["Python", "OpenAI"],
        color: "#ff6b6b",
    },
    {
        client: "HEALTH",
        title: "Patient Portal",
        problem: "Fragmented data",
        solution: "FHIR system",
        impact: "100K users",
        tags: ["React", "Node"],
        color: "#4ecdc4",
    },
    {
        client: "ECOM",
        title: "Headless Store",
        problem: "Cart abandon",
        solution: "Edge store",
        impact: "+40% conv",
        tags: ["Next.js", "Shopify"],
        color: "#ffe66d",
    },
];

// Calculate card position in orbit
function getCardPosition(rotation: number, index: number, totalCards: number) {
    const angleOffset = (index / totalCards) * 360;
    const angle = ((rotation + angleOffset) * Math.PI) / 180;
    const orbitRadius = 280;

    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitRadius * 0.3; // Elliptical
    const z = Math.sin(angle);
    const scale = 0.7 + (z + 1) * 0.2; // 0.7 to 1.1
    const opacity = 0.4 + (z + 1) * 0.3; // 0.4 to 1.0
    const zIndex = Math.round((z + 1) * 10);

    return { x, y, scale, opacity, zIndex };
}

// Satellite Card
function SatelliteCard({
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
                x: position.x - 100, // offset for card width
                y: position.y - 75, // offset for card height
                scale: position.scale,
                opacity: position.opacity,
                zIndex: position.zIndex,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
            <motion.div
                className="w-[200px] p-3 bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-xl"
                style={{
                    boxShadow: `0 0 25px ${project.color}20`,
                    borderColor: `${project.color}40`,
                }}
                whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 40px ${project.color}40`,
                    borderColor: project.color,
                }}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <span
                            className="text-[8px] font-mono uppercase tracking-wider"
                            style={{ color: project.color }}
                        >
                            {project.client}
                        </span>
                        <h3 className="text-xs font-bold text-foreground">{project.title}</h3>
                    </div>
                    <div
                        className="w-5 h-5 rounded-full border flex items-center justify-center"
                        style={{ borderColor: project.color + '60' }}
                    >
                        <ArrowUpRight size={8} style={{ color: project.color }} />
                    </div>
                </div>

                {/* Mini info */}
                <div className="space-y-1 mb-2">
                    <div className="p-1.5 bg-neutral-800/60 rounded">
                        <p className="text-[7px] font-mono text-neutral-600 uppercase">Challenge</p>
                        <p className="text-[9px] text-neutral-400">{project.problem}</p>
                    </div>
                    <div className="p-1.5 bg-neutral-800/60 rounded">
                        <p className="text-[7px] font-mono text-neutral-600 uppercase">Solution</p>
                        <p className="text-[9px] text-neutral-400">{project.solution}</p>
                    </div>
                </div>

                {/* Impact */}
                <div
                    className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold"
                    style={{
                        backgroundColor: project.color + '20',
                        color: project.color,
                    }}
                >
                    {project.impact}
                </div>
            </motion.div>
        </motion.div>
    );
}

export function SpatialProjects() {
    const [mounted, setMounted] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // Only render after mount to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDrag = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setRotation(prev => prev + info.delta.x * 0.5);
    };

    // Calculate positions for all cards
    const cardPositions = projects.map((_, i) =>
        getCardPosition(rotation, i, projects.length)
    );

    if (!mounted) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="text-center mb-8">
                    <span className="text-neon font-mono text-sm uppercase tracking-widest mb-2 block">Selected Work</span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase text-foreground">
                        Quantifiable Impact
                    </h2>
                </div>
                <div className="h-[450px] flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-neutral-900 border border-neutral-800 animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 relative z-30"
            >
                <span className="text-neon font-mono text-sm uppercase tracking-widest mb-2 block">Selected Work</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase text-foreground">
                    Quantifiable Impact
                </h2>
            </motion.div>

            {/* Orbit Container */}
            <motion.div
                className="relative w-full h-[450px] cursor-grab active:cursor-grabbing"
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
                    {/* Outer glow */}
                    <div className="absolute -inset-16 rounded-full bg-gradient-radial from-neon/20 via-neon/5 to-transparent blur-2xl" />

                    {/* Sphere rings */}
                    <motion.div
                        className="absolute -inset-8 rounded-full border border-neutral-700/30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute -inset-16 rounded-full border border-neutral-800/20"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Main sphere */}
                    <div
                        className="w-28 h-28 rounded-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-neutral-700/50 flex items-center justify-center relative overflow-hidden"
                        style={{
                            boxShadow: `
                                inset -10px -10px 30px rgba(0,0,0,0.8),
                                inset 5px 5px 20px rgba(255,255,255,0.05),
                                0 0 60px rgba(218,255,2,0.15)
                            `,
                        }}
                    >
                        {/* Grid pattern */}
                        <div
                            className="absolute inset-0 rounded-full opacity-20"
                            style={{
                                background: `
                                    repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(218,255,2,0.1) 10px, rgba(218,255,2,0.1) 11px),
                                    repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(218,255,2,0.1) 10px, rgba(218,255,2,0.1) 11px)
                                `,
                            }}
                        />
                        <span className="text-neon font-mono text-[10px] uppercase tracking-widest z-10">WORK</span>
                    </div>
                </div>

                {/* Orbit path */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[170px] rounded-full border border-neutral-800/30 border-dashed pointer-events-none" />

                {/* Satellite Cards */}
                {projects.map((project, i) => (
                    <SatelliteCard
                        key={i}
                        project={project}
                        position={cardPositions[i]}
                    />
                ))}
            </motion.div>

            {/* Hint */}
            <motion.p
                animate={{ opacity: isDragging ? 0 : 0.5 }}
                className="text-neutral-500 text-sm font-mono mt-2"
            >
                ← Drag to rotate →
            </motion.p>
        </div>
    );
}
