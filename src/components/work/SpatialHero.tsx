"use client";

import { HackerText } from "@/components/ui/hacker-text";

export const SpatialHero = () => {
    // Offset slightly back (-100px) to ensure no near-plane clipping
    return (
        <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transform-style-3d"
            style={{ transform: "translateZ(-100px)" }}
        >
            <div className="text-center">
                <h1 className="text-[12vw] leading-none font-bold tracking-tighter text-foreground uppercase mix-blend-difference">
                    ENGINEERING
                </h1>
                <h1 className="text-[12vw] leading-none font-bold tracking-tighter text-neutral-800 uppercase mix-blend-difference">
                    THE FUTURE
                </h1>
                <p className="mt-8 text-xl text-stone-400 max-w-xl mx-auto font-mono text-sm tracking-widest">
                    SYSTEM READY. EXPLORE VIA DRAG & SCROLL.
                </p>
            </div>
        </div>
    );
};
