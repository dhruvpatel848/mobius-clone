"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
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

// Calculate card position in orbit (Earth satellite style)
function getCardPosition(rotation: number, index: number, totalCards: number) {
    const angleOffset = (index / totalCards) * 360;
    const angle = ((rotation + angleOffset) * Math.PI) / 180;
    const orbitRadius = 200;

    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitRadius * 0.35;
    const z = Math.sin(angle);
    const scale = 0.7 + (z + 1) * 0.2;
    const opacity = 0.4 + (z + 1) * 0.3;
    const zIndex = Math.round((z + 1) * 10);

    return { x, y, scale, opacity, zIndex };
}

// Mobile 3D Card with tilt and glow
function Mobile3DCard({ project, isActive, direction }: { project: typeof projects[0]; isActive: boolean; direction: number }) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

    const handleTouch = (e: React.TouchEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.touches[0].clientX - centerX);
        y.set(e.touches[0].clientY - centerY);
    };

    const handleTouchEnd = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={cardRef}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: direction * 300, rotateY: direction * 45, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -300, rotateY: direction * -45, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            onTouchMove={handleTouch}
            onTouchEnd={handleTouchEnd}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            className="block w-full max-w-[320px] mx-auto p-5 bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-3xl relative overflow-hidden"
        >
            {/* Animated gradient border glow */}
            <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, ${project.color}40 0%, transparent 50%, ${project.color}20 100%)`,
                    opacity: 0.5,
                }}
                animate={{
                    background: [
                        `linear-gradient(0deg, ${project.color}40 0%, transparent 50%, ${project.color}20 100%)`,
                        `linear-gradient(180deg, ${project.color}40 0%, transparent 50%, ${project.color}20 100%)`,
                        `linear-gradient(360deg, ${project.color}40 0%, transparent 50%, ${project.color}20 100%)`,
                    ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            backgroundColor: project.color,
                            left: `${20 + i * 12}%`,
                            top: `${30 + (i % 3) * 20}%`,
                        }}
                        animate={{
                            y: [-10, 10, -10],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: 2 + i * 0.3,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <motion.span
                            className="text-[11px] font-mono uppercase tracking-wider block"
                            style={{ color: project.color }}
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {project.client}
                        </motion.span>
                        <h3 className="text-lg font-bold text-foreground mt-1">{project.title}</h3>
                    </div>
                    <motion.div
                        className="w-10 h-10 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                        style={{ borderColor: project.color, backgroundColor: project.color + '15' }}
                        whileTap={{ scale: 0.9, rotate: 90 }}
                    >
                        <ExternalLink size={16} style={{ color: project.color }} />
                    </motion.div>
                </div>

                <div className="space-y-3 mb-4">
                    <motion.div
                        className="p-3 bg-neutral-800/80 rounded-xl border border-neutral-700/50"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-[9px] font-mono text-neutral-500 uppercase mb-1">Challenge</p>
                        <p className="text-sm text-neutral-300 leading-relaxed">{project.problem}</p>
                    </motion.div>
                    <motion.div
                        className="p-3 bg-neutral-800/80 rounded-xl border border-neutral-700/50"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="text-[9px] font-mono text-neutral-500 uppercase mb-1">Solution</p>
                        <p className="text-sm text-neutral-300 leading-relaxed">{project.solution}</p>
                    </motion.div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, j) => (
                        <motion.span
                            key={j}
                            className="text-[10px] font-mono uppercase border text-neutral-400 px-2.5 py-1 rounded-lg"
                            style={{ borderColor: project.color + '50' }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 + j * 0.1 }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <motion.div
                        className="px-4 py-2 rounded-full text-xs font-bold"
                        style={{ backgroundColor: project.color + '25', color: project.color }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {project.impact}
                    </motion.div>
                    <motion.span
                        className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                        style={{ color: project.color }}
                        whileTap={{ x: 5 }}
                    >
                        Visit <ArrowUpRight size={14} />
                    </motion.span>
                </div>
            </div>
        </motion.a>
    );
}

// Desktop orbiting card
function OrbitCard({ project, position }: { project: typeof projects[0]; position: ReturnType<typeof getCardPosition> }) {
    return (
        <motion.div
            className="absolute left-1/2 top-1/2 cursor-pointer"
            animate={{
                x: position.x - 130,
                y: position.y - 90,
                scale: position.scale,
                opacity: position.opacity,
                zIndex: position.zIndex,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 25 }}
        >
            <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-[260px] p-4 bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-2xl"
                style={{ boxShadow: `0 0 30px ${project.color}20`, borderColor: `${project.color}40` }}
                whileHover={{ scale: 1.08, boxShadow: `0 0 50px ${project.color}40`, borderColor: project.color }}
            >
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: project.color }}>{project.client}</span>
                        <h3 className="text-sm font-bold text-foreground mt-0.5">{project.title}</h3>
                    </div>
                    <div className="w-7 h-7 rounded-full border flex items-center justify-center" style={{ borderColor: project.color + '60' }}>
                        <ExternalLink size={11} style={{ color: project.color }} />
                    </div>
                </div>
                <div className="space-y-2 mb-3">
                    <div className="p-2 bg-neutral-800/60 rounded-lg">
                        <p className="text-[8px] font-mono text-neutral-500 uppercase">Challenge</p>
                        <p className="text-[10px] text-neutral-400 leading-relaxed">{project.problem}</p>
                    </div>
                    <div className="p-2 bg-neutral-800/60 rounded-lg">
                        <p className="text-[8px] font-mono text-neutral-500 uppercase">Solution</p>
                        <p className="text-[10px] text-neutral-400 leading-relaxed">{project.solution}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                    {project.tags.slice(0, 3).map((tag, j) => (
                        <span key={j} className="text-[7px] font-mono uppercase border border-neutral-700 text-neutral-500 px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                </div>
                <div className="px-2.5 py-1 rounded-full text-[9px] font-bold inline-block" style={{ backgroundColor: project.color + '20', color: project.color }}>{project.impact}</div>
            </motion.a>
        </motion.div>
    );
}

export function SpatialProjects() {
    const [mounted, setMounted] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-rotate orbit on desktop
    useEffect(() => {
        if (isMobile || isDragging || !mounted) return;
        const interval = setInterval(() => {
            setRotation(prev => prev + 0.3);
        }, 30);
        return () => clearInterval(interval);
    }, [isMobile, isDragging, mounted]);

    const handleOrbitDrag = (e: any, info: PanInfo) => {
        setRotation(prev => prev + info.delta.x * 0.8);
    };

    // Mobile swipe with 3D flip
    const handleMobileSwipe = (e: any, info: PanInfo) => {
        if (Math.abs(info.offset.x) > 50) {
            if (info.offset.x > 0) {
                setDirection(-1);
                setCurrentIndex(prev => (prev - 1 + projects.length) % projects.length);
            } else {
                setDirection(1);
                setCurrentIndex(prev => (prev + 1) % projects.length);
            }
        }
    };

    const cardPositions = projects.map((_, i) => getCardPosition(rotation, i, projects.length));

    if (!mounted) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-neutral-900 border border-neutral-800 animate-pulse" />
            </div>
        );
    }

    // Mobile: Premium 3D flip carousel
    if (isMobile) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center px-4 py-6" style={{ perspective: 1200 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-6">
                    <span className="text-neon font-mono text-xs uppercase tracking-widest mb-2 block">Selected Work</span>
                    <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Real Impact</h2>
                </motion.div>

                {/* 3D Card container */}
                <motion.div
                    className="w-full flex-1 flex items-center justify-center relative"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.3}
                    onDragEnd={handleMobileSwipe}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <AnimatePresence mode="wait" custom={direction}>
                        <Mobile3DCard
                            key={currentIndex}
                            project={projects[currentIndex]}
                            isActive={true}
                            direction={direction}
                        />
                    </AnimatePresence>
                </motion.div>

                {/* Animated dots */}
                <div className="flex gap-3 mt-6">
                    {projects.map((project, i) => (
                        <motion.button
                            key={i}
                            onClick={() => {
                                setDirection(i > currentIndex ? 1 : -1);
                                setCurrentIndex(i);
                            }}
                            className="relative w-3 h-3 rounded-full overflow-hidden"
                            whileTap={{ scale: 0.8 }}
                        >
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{ backgroundColor: i === currentIndex ? project.color : '#404040' }}
                                animate={{ scale: i === currentIndex ? [1, 1.3, 1] : 1 }}
                                transition={{ duration: 1.5, repeat: i === currentIndex ? Infinity : 0 }}
                            />
                        </motion.button>
                    ))}
                </div>

                <motion.p
                    className="text-neutral-500 text-xs mt-4 font-mono"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    ← Swipe for more →
                </motion.p>
            </div>
        );
    }

    // Desktop: Earth orbit animation
    return (
        <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-4 relative z-30">
                <span className="text-neon font-mono text-sm uppercase tracking-widest mb-2 block">Selected Work</span>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase text-foreground">Real Impact</h2>
            </motion.div>

            <motion.div
                className="relative w-full h-[380px] cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                onDrag={handleOrbitDrag}
            >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="absolute -inset-16 rounded-full bg-gradient-radial from-neon/20 via-neon/5 to-transparent blur-3xl" />
                    <motion.div className="absolute -inset-8 rounded-full border border-neutral-700/40" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
                    <motion.div className="absolute -inset-12 rounded-full border border-neutral-800/30 border-dashed" animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} />
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neutral-700 via-neutral-900 to-black border border-neutral-600/50 flex items-center justify-center shadow-2xl" style={{ boxShadow: `inset -10px -10px 30px rgba(0,0,0,0.9), inset 5px 5px 20px rgba(255,255,255,0.05), 0 0 60px rgba(218,255,2,0.15)` }}>
                        <span className="text-neon font-mono text-[10px] uppercase tracking-widest font-bold">WORK</span>
                    </div>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[150px] rounded-full border border-neutral-800/40 border-dashed pointer-events-none" />
                {projects.map((project, i) => (
                    <OrbitCard key={i} project={project} position={cardPositions[i]} />
                ))}
            </motion.div>


        </div>
    );
}
