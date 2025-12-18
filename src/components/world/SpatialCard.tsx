"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SpatialCardProps {
    children: React.ReactNode;
    className?: string;
    depth?: number;           // Base Z position
    tiltIntensity?: number;   // How much it tilts toward cursor (degrees)
    hoverLift?: number;       // How much it lifts on hover (px)
    glowColor?: string;       // Glow color on hover
    breathe?: boolean;        // Enable idle breathing animation
}

export function SpatialCard({
    children,
    className = "",
    depth = 0,
    tiltIntensity = 10,
    hoverLift = 30,
    glowColor = "rgba(218, 255, 2, 0.3)",
    breathe = true,
}: SpatialCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position relative to card center
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring-smoothed rotation
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]), {
        stiffness: 300,
        damping: 30,
    });

    // Z position - lifts on hover
    const z = useSpring(isHovered ? hoverLift : 0, { stiffness: 400, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalize to -0.5 to 0.5
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`relative ${className}`}
            style={{
                transformStyle: "preserve-3d",
                transform: `translateZ(${depth}px)`,
                rotateX,
                rotateY,
                z,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            animate={breathe && !isHovered ? {
                y: [0, -5, 0],
                transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }
            } : {}}
        >
            {/* Glow effect on hover */}
            <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                    boxShadow: isHovered ? `0 0 40px 10px ${glowColor}` : "none",
                    transition: "box-shadow 0.3s ease",
                }}
            />

            {/* Card content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
