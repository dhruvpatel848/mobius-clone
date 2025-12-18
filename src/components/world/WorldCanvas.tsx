"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useWorld } from "@/context/WorldContext";

interface WorldCanvasProps {
    children: React.ReactNode;
}

export function WorldCanvas({ children }: WorldCanvasProps) {
    const { reducedMotion } = useWorld();
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position for parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring-based parallax
    const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

    // Mouse move handler - subtle parallax effect
    const handleMouseMove = (e: React.MouseEvent) => {
        if (reducedMotion || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate offset from center (-1 to 1)
        const offsetX = (e.clientX - centerX) / centerX;
        const offsetY = (e.clientY - centerY) / centerY;

        // Apply subtle parallax (max 30px movement)
        const parallaxIntensity = 30;
        mouseX.set(offsetX * parallaxIntensity);
        mouseY.set(offsetY * parallaxIntensity);
    };

    // Reset on mouse leave
    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // If reduced motion, render statically
    if (reducedMotion) {
        return (
            <div className="relative w-full min-h-screen">
                {children}
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* World content - smooth parallax based on mouse position */}
            <motion.div
                className="w-full h-full"
                style={{
                    x: springX,
                    y: springY,
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
