"use client";

import { useEffect, useRef, useCallback } from "react";

interface WarpBackgroundProps {
    velocity?: number; // 0-1 velocity multiplier from camera
}

export const WarpBackground = ({ velocity = 0.5 }: WarpBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const velocityRef = useRef(velocity);

    // Update velocity ref when prop changes
    useEffect(() => {
        velocityRef.current = velocity;
    }, [velocity]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            // Static background for reduced motion
            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars: { x: number; y: number; z: number; baseSpeed: number }[] = [];
        const numStars = 600;
        const baseSpeed = 0.3;

        // Init stars
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width - canvas.width / 2,
                y: Math.random() * canvas.height - canvas.height / 2,
                z: Math.random() * canvas.width,
                baseSpeed: 0.2 + Math.random() * 0.6, // Varying speeds for depth
            });
        }

        let animationId: number;

        const animate = () => {
            ctx.fillStyle = "#030303";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Velocity affects star speed (0.5 to 3x range)
            const speedMultiplier = 0.5 + velocityRef.current * 2.5;

            stars.forEach((star) => {
                star.z -= star.baseSpeed * speedMultiplier * 2;

                // Reset star if it passes the camera
                if (star.z <= 0) {
                    star.z = canvas.width;
                    star.x = Math.random() * canvas.width - canvas.width / 2;
                    star.y = Math.random() * canvas.height - canvas.height / 2;
                }

                // Project 3D position to 2D
                const x = (star.x / star.z) * canvas.width + cx;
                const y = (star.y / star.z) * canvas.width + cy;

                // Calculate size with safety check
                const size = Math.max(0.1, (1 - star.z / canvas.width) * 2);
                const alpha = Math.max(0, Math.min(1, 1 - star.z / canvas.width));

                // Draw star only if visible
                if (size > 0 && star.z < canvas.width && alpha > 0) {
                    ctx.beginPath();

                    // Color varies with speed - faster = more neon
                    const neonIntensity = Math.min(1, velocityRef.current * 2);
                    const r = Math.floor(218 * neonIntensity + 100 * (1 - neonIntensity));
                    const g = Math.floor(255 * neonIntensity + 100 * (1 - neonIntensity));
                    const b = Math.floor(2 * neonIntensity + 100 * (1 - neonIntensity));

                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`;
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();

                    // Trail effect at high velocity
                    if (velocityRef.current > 0.3) {
                        const trailLength = velocityRef.current * 20;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`;
                        ctx.lineWidth = size * 0.5;
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + trailLength);
                        ctx.stroke();
                    }
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 bg-background pointer-events-none"
        />
    );
};
