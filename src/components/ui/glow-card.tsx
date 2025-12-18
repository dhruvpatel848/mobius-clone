"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
}

export const GlowCard = ({ children, className }: GlowCardProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn(
                "group relative bg-neutral-900/40 overflow-hidden",
                className
            )}
            onMouseMove={handleMouseMove}
        >
            {/* Subtle border glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-10"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 40%
            )
          `,
                }}
            />
            {/* Inner Content */}
            <div className="relative h-full z-20">{children}</div>
        </div>
    );
};
