"use client";

import { motion } from "framer-motion";
import { Code2, Database, Globe, Cpu, Layers, ShieldCheck } from "lucide-react";

// MOVED TO NEGATIVE Z-AXIS to hide behind Hero initially.
const skills = [
    { icon: Code2, title: "Architecture", x: -300, y: -150, z: -2000 },
    { icon: Globe, title: "Edge Perf", x: 300, y: 150, z: -2400 },
    { icon: Database, title: "Backend", x: -400, y: 300, z: -2800 },
    { icon: Cpu, title: "AI/ML", x: 200, y: -250, z: -3200 },
    { icon: ShieldCheck, title: "Security", x: 0, y: 400, z: -3600 },
    { icon: Layers, title: "Design Sys", x: -200, y: 0, z: -4000 },
];

export const SpatialSkills = () => {
    return (
        <div className="absolute inset-0 pointer-events-none transform-style-3d">
            {skills.map((skill, i) => (
                <div
                    key={i}
                    className="absolute left-1/2 top-1/2 flex flex-col items-center justify-center p-6 bg-neutral-900/60 backdrop-blur-md border border-neutral-800/50 rounded-xl"
                    style={{
                        transform: `translate3d(${skill.x}px, ${skill.y}px, ${skill.z}px)`,
                        width: "200px"
                    }}
                >
                    <skill.icon className="text-neon mb-2" size={32} />
                    <span className="text-white font-bold tracking-widest uppercase text-sm">{skill.title}</span>
                </div>
            ))}
        </div>
    );
};
