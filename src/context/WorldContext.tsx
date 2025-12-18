"use client";

import React, { createContext, useContext, useRef, useCallback, useEffect, useState } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";

// Camera position type
interface CameraState {
    x: MotionValue<number>;
    y: MotionValue<number>;
    z: MotionValue<number>;
    velocity: MotionValue<number>;
}

// Spring-smoothed camera values
interface SmoothCamera {
    x: MotionValue<number>;
    y: MotionValue<number>;
    z: MotionValue<number>;
}

// Section anchor for navigation
interface SectionAnchor {
    id: string;
    z: number;
    label: string;
}

// Context value type
interface WorldContextValue {
    camera: CameraState;
    smoothCamera: SmoothCamera;
    isDragging: boolean;
    setIsDragging: (v: boolean) => void;
    sections: SectionAnchor[];
    navigateToSection: (id: string) => void;
    reducedMotion: boolean;
}

const WorldContext = createContext<WorldContextValue | null>(null);

// FASTER Spring physics - transitions complete in ~1-1.5 seconds
const CAMERA_SPRING = { stiffness: 200, damping: 35, mass: 0.8 };
const VELOCITY_SPRING = { stiffness: 80, damping: 25, mass: 0.5 };

// Camera bounds - stop exactly at Contact section
const Z_MIN = 0;
const Z_MAX = 8000;  // Match Contact section z position
const PAN_BOUNDS = { x: [-600, 600], y: [-400, 400] };

// Section positions in Z-space
const SECTION_ANCHORS: SectionAnchor[] = [
    { id: "hero", z: 0, label: "Home" },
    { id: "skills", z: 1500, label: "Skills" },
    { id: "work", z: 3500, label: "Work" },
    { id: "about", z: 5500, label: "About" },
    { id: "team", z: 7000, label: "Team" },
    { id: "contact", z: 8000, label: "Contact" },
];

export function WorldProvider({ children }: { children: React.ReactNode }) {
    // Raw camera motion values
    const cameraX = useMotionValue(0);
    const cameraY = useMotionValue(0);
    const cameraZ = useMotionValue(0);
    const velocity = useMotionValue(0);

    // Spring-smoothed camera for rendering
    const smoothX = useSpring(cameraX, CAMERA_SPRING);
    const smoothY = useSpring(cameraY, CAMERA_SPRING);
    const smoothZ = useSpring(cameraZ, CAMERA_SPRING);
    const smoothVelocity = useSpring(velocity, VELOCITY_SPRING);

    // Drag state
    const [isDragging, setIsDragging] = useState(false);

    // Reduced motion preference
    const [reducedMotion, setReducedMotion] = useState(false);

    // Touch tracking for mobile
    const touchStartY = useRef(0);
    const lastTouchY = useRef(0);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    // Desktop scroll handler
    useEffect(() => {
        if (reducedMotion) return;

        let lastScrollTime = Date.now();

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            const now = Date.now();
            const dt = Math.max(1, now - lastScrollTime);
            lastScrollTime = now;

            // Calculate scroll velocity
            const scrollVelocity = Math.abs(e.deltaY) / dt;
            velocity.set(scrollVelocity);

            // Move camera Z based on scroll - increased sensitivity
            const sensitivity = 3;
            const newZ = Math.min(Z_MAX, Math.max(Z_MIN, cameraZ.get() + e.deltaY * sensitivity));
            cameraZ.set(newZ);
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [cameraZ, velocity, reducedMotion]);

    // Mobile touch scroll handler
    useEffect(() => {
        if (reducedMotion) return;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
            lastTouchY.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            // Prevent default to stop page scrolling
            e.preventDefault();

            const currentY = e.touches[0].clientY;
            const deltaY = lastTouchY.current - currentY;
            lastTouchY.current = currentY;

            // Move camera Z based on touch drag - higher sensitivity for mobile
            const sensitivity = 5;
            const newZ = Math.min(Z_MAX, Math.max(Z_MIN, cameraZ.get() + deltaY * sensitivity));
            cameraZ.set(newZ);

            velocity.set(Math.abs(deltaY));
        };

        const handleTouchEnd = () => {
            velocity.set(0);
        };

        // Add touch listeners with passive: false to allow preventDefault
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [cameraZ, velocity, reducedMotion]);

    // Navigate to section
    const navigateToSection = useCallback((id: string) => {
        const section = SECTION_ANCHORS.find(s => s.id === id);
        if (section) {
            cameraZ.set(section.z);
            cameraX.set(0);
            cameraY.set(0);
        }
    }, [cameraX, cameraY, cameraZ]);

    // Listen for navigation events from Navigation component
    useEffect(() => {
        const handleNavigate = (e: CustomEvent<string>) => {
            navigateToSection(e.detail);
        };
        window.addEventListener('navigateToSection', handleNavigate as EventListener);
        return () => window.removeEventListener('navigateToSection', handleNavigate as EventListener);
    }, [navigateToSection]);

    // Drag handlers (will be connected in WorldCanvas)
    const handleDrag = useCallback((dx: number, dy: number) => {
        if (reducedMotion) return;

        const sensitivity = 0.5;
        const newX = Math.min(PAN_BOUNDS.x[1], Math.max(PAN_BOUNDS.x[0], cameraX.get() + dx * sensitivity));
        const newY = Math.min(PAN_BOUNDS.y[1], Math.max(PAN_BOUNDS.y[0], cameraY.get() + dy * sensitivity));
        cameraX.set(newX);
        cameraY.set(newY);
    }, [cameraX, cameraY, reducedMotion]);

    const value: WorldContextValue = {
        camera: { x: cameraX, y: cameraY, z: cameraZ, velocity },
        smoothCamera: { x: smoothX, y: smoothY, z: smoothZ },
        isDragging,
        setIsDragging,
        sections: SECTION_ANCHORS,
        navigateToSection,
        reducedMotion,
    };

    return (
        <WorldContext.Provider value={value}>
            {children}
        </WorldContext.Provider>
    );
}

export function useWorld() {
    const ctx = useContext(WorldContext);
    if (!ctx) throw new Error("useWorld must be used within WorldProvider");
    return ctx;
}

export function useCameraPosition() {
    const { smoothCamera } = useWorld();
    return smoothCamera;
}

export function useSectionAnchors() {
    const { sections, navigateToSection } = useWorld();
    return { sections, navigateToSection };
}
