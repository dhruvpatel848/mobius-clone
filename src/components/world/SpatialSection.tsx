"use client";

import React from "react";
import { motion, useTransform } from "framer-motion";
import { useCameraPosition } from "@/context/WorldContext";

interface SpatialSectionProps {
    children: React.ReactNode;
    id: string;
    z: number;         // Z position in world space
    className?: string;
}

export function SpatialSection({
    children,
    id,
    z,
    className = ""
}: SpatialSectionProps) {
    const camera = useCameraPosition();

    // Calculate relative distance from camera
    const relativeZ = useTransform(camera.z, (camZ) => z - camZ);

    // Visibility zone - only show when camera is within range
    const visibility = useTransform(relativeZ, (rz) => {
        // Show only when section is within -500 to +1500 of camera
        if (rz < -500) return "hidden"; // Behind camera
        if (rz > 1500) return "hidden"; // Too far ahead
        return "visible";
    });

    // Opacity based on distance
    const opacity = useTransform(relativeZ,
        [-500, 0, 500, 1500],
        [0, 1, 0.8, 0]
    );

    // Scale based on distance (perspective simulation)
    const scale = useTransform(relativeZ,
        [-500, 0, 1500],
        [1.3, 1, 0.5]
    );

    // Blur when not in focus
    const filter = useTransform(relativeZ, (rz) => {
        const dist = Math.abs(rz);
        if (dist < 200) return "blur(0px)";
        return `blur(${Math.min(10, dist / 100)}px)`;
    });

    return (
        <motion.section
            id={id}
            className={`fixed inset-0 flex items-center justify-center pointer-events-auto ${className}`}
            style={{
                visibility,
                opacity,
                scale,
                filter,
                zIndex: useTransform(relativeZ, rz => Math.max(0, Math.round(1000 - rz))), // Closer = higher z-index
            }}
        >
            <div className="w-full h-full">
                {children}
            </div>
        </motion.section>
    );
}
