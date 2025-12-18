"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

export function SpatialContact() {
    return (
        <div className="w-full h-full flex items-center justify-center px-4 md:px-12 py-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-3xl text-center"
            >
                <span className="text-neon font-mono text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 block">Contact</span>

                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-6 md:mb-8">
                    Let's Build
                    <br />
                    <span className="text-neon">Together</span>
                </h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-base md:text-xl text-neutral-400 mb-8 md:mb-10 px-2"
                >
                    Ready to transform your digital infrastructure?
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
                >
                    <Link href="/contact" className="w-full sm:w-auto">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-full group inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 bg-neon text-black font-bold uppercase tracking-wider rounded-full text-sm md:text-base active:bg-white transition-colors"
                        >
                            Start a Project
                            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                        </motion.button>
                    </Link>
                    <a href="mailto:sarvaax@gmail.com" className="w-full sm:w-auto">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-full inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 border border-neutral-700 text-foreground font-bold uppercase tracking-wider rounded-full text-sm md:text-base active:border-neon active:text-neon transition-colors"
                        >
                            <Mail size={16} />
                            <span className="hidden sm:inline">sarvaax@gmail.com</span>
                            <span className="sm:hidden">Email Us</span>
                        </motion.button>
                    </a>
                </motion.div>

                {/* Phone number for mobile */}
                <motion.a
                    href="tel:+919265073616"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="inline-flex items-center gap-2 mt-6 text-neutral-500 active:text-neon transition-colors"
                >
                    <Phone size={14} />
                    <span className="text-sm">+91 92650 73616</span>
                </motion.a>
            </motion.div>
        </div>
    );
}
