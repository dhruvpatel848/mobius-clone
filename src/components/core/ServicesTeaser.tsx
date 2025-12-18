"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
    { title: "Digital Optimization", id: "01" },
    { title: "Security Ecosystems", id: "02" },
    { title: "AI Integration", id: "03" },
    { title: "Cloud Infrastructure", id: "04" },
];

export const ServicesTeaser = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                <div className="px-6 md:px-12 mb-12 flex justify-between items-end">
                    <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground">
                        Core <span className="text-neon">Capabilities</span>
                    </h2>
                    <Link href="/services" className="hidden md:flex items-center gap-2 text-neon uppercase font-bold tracking-widest hover:text-black transition-colors">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <motion.div style={{ x }} className="flex gap-12 px-6 md:px-12">
                    {services.map((service, index) => (
                        <div key={index} className="group relative w-[80vw] md:w-[40vw] flex-shrink-0 aspect-[4/3] bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 flex flex-col justify-between hover:border-neon hover:shadow-[0_0_30px_rgba(212,255,0,0.1)] transition-all duration-500">
                            <span className="text-6xl font-mono text-neutral-800 group-hover:text-neon transition-colors duration-500">{service.id}</span>
                            <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-neutral-500 group-hover:text-white transition-colors duration-500">
                                {service.title}
                            </h3>
                            <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                    ))}
                </motion.div>

                <div className="absolute bottom-12 px-6 md:px-12 md:hidden">
                    <Link href="/services" className="flex items-center gap-2 text-neon uppercase font-bold tracking-widest hover:text-black transition-colors">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
};
