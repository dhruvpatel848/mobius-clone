"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// PUSHED DEEP into Negative Z to appear strictly AFTER skills.
const projects = [
    {
        title: "GLO CAR",
        desc: "Next-Gen Booking Platform",
        z: -5000,
        x: -400
    },
    {
        title: "FINTECH CORE",
        desc: "HFT Architecture",
        z: -6500,
        x: 400
    },
    {
        title: "LOGISTICS AI",
        desc: "Route Opt. Engine",
        z: -8000,
        x: -200
    }
];

export const SpatialProjects = () => {
    return (
        <div className="absolute inset-0 pointer-events-none transform-style-3d">
            {projects.map((p, i) => (
                <div
                    key={i}
                    className="absolute left-1/2 top-1/2 w-[600px] h-[400px] bg-neutral-950 border border-neutral-800 p-8 flex flex-col justify-between group pointer-events-auto transition-colors hover:border-neon"
                    style={{
                        transform: `translate3d(${p.x}px, -50%, ${p.z}px)`
                    }}
                >
                    <div>
                        <h2 className="text-8xl font-bold text-white mb-4 transparent-stroke group-hover:text-neon transition-colors duration-500">{p.title}</h2>
                        <p className="text-2xl text-neutral-400 font-mono">{p.desc}</p>
                    </div>

                    <div className="flex justify-end">
                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-neon group-hover:text-black transition-all">
                            <ArrowUpRight size={24} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
