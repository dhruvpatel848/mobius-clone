"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

interface WorldContainerProps {
    children: React.ReactNode;
}

export const WorldContainer = ({ children }: WorldContainerProps) => {
    const { scrollYProgress } = useScroll();

    // Z-Axis: Fly forward 8000px
    const z = useTransform(scrollYProgress, [0, 1], [0, 8000]);
    const smoothZ = useSpring(z, { damping: 40, stiffness: 120 });

    // Panning Logic (Separate Motion Values)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const smoothX = useSpring(x, { damping: 30, stiffness: 200 });
    const smoothY = useSpring(y, { damping: 30, stiffness: 200 });

    const handlePan = (info: any) => {
        // Drag Sensitivity
        x.set(x.get() + info.delta.x * 1.5);
        y.set(y.get() + info.delta.y * 1.5);
    };

    return (
        // SPACER MUST BE TRANSPARENT so stars show through
        <div className="relative h-[800vh] w-full bg-transparent">
            {/* 3D Viewport */}
            <div
                className="fixed inset-0 overflow-hidden"
                style={{ perspective: "1000px" }}
            >
                {/* 1. VISUAL LAYER (Underneath) */}
                <motion.div
                    className="w-full h-full transform-style-3d origin-center pointer-events-auto"
                    style={{
                        z: smoothZ,
                        x: smoothX,
                        y: smoothY,
                        transformStyle: "preserve-3d"
                    }}
                >
                    {children}
                </motion.div>

                {/* 2. TOUCH LAYER (Overlay) */}
                {/* Captures drag gestures without being part of the 3D transform */}
                <motion.div
                    className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0}
                    dragMomentum={false}
                    onDrag={(e, info) => handlePan(info)}
                    style={{ opacity: 0 }} // Invisible
                />
            </div>

            {/* HUD */}
            <div className="fixed bottom-8 right-8 text-neutral-500 font-mono text-xs pointer-events-none flex flex-col items-end gap-2 z-[60]">
                <span>SCROLL {`//`} DRAG</span>
                <span>Z-SYSTEM ONLINE</span>
            </div>
        </div>
    );
};
