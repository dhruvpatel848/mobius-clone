"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

export function SpatialContact() {
    return (
        <div className="w-full h-full flex items-center justify-center px-6 md:px-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-3xl text-center"
            >
                <span className="text-neon font-mono text-sm uppercase tracking-widest mb-4 block">Contact</span>

                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-8">
                    Let's Build
                    <br />
                    <span className="text-neon">Together</span>
                </h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-xl text-neutral-400 mb-12"
                >
                    Ready to transform your digital infrastructure?
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-neon text-black font-bold uppercase tracking-wider rounded-full hover:bg-white transition-colors"
                        >
                            Start a Project
                            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                        </motion.button>
                    </Link>
                    <a href="mailto:hello@sarvaax.com">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-8 py-4 border border-neutral-700 text-foreground font-bold uppercase tracking-wider rounded-full hover:border-neon hover:text-neon transition-colors"
                        >
                            <Mail size={18} />
                            hello@sarvaax.com
                        </motion.button>
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
}
