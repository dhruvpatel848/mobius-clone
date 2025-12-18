"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export const Navigation = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const lastScrollY = useRef(0);
    const hideTimeout = useRef<NodeJS.Timeout | null>(null);

    // Hide nav on scroll, show on stop
    useEffect(() => {
        const handleWheel = () => {
            setIsVisible(false);

            // Clear existing timeout
            if (hideTimeout.current) {
                clearTimeout(hideTimeout.current);
            }

            // Show nav after 1.5s of no scrolling
            hideTimeout.current = setTimeout(() => {
                setIsVisible(true);
            }, 1500);
        };

        // Mobile touch scroll detection
        let lastTouchY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            lastTouchY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const diff = Math.abs(e.touches[0].clientY - lastTouchY);
            if (diff > 10) {
                setIsVisible(false);
                if (hideTimeout.current) clearTimeout(hideTimeout.current);
                hideTimeout.current = setTimeout(() => setIsVisible(true), 1500);
            }
        };

        // Show nav on mouse move to top area
        const handleMouseMove = (e: MouseEvent) => {
            if (e.clientY < 100) {
                setIsVisible(true);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            if (hideTimeout.current) {
                clearTimeout(hideTimeout.current);
            }
        };
    }, []);

    // Listen for section changes from WorldContext
    useEffect(() => {
        const handleSectionChange = (e: CustomEvent<string>) => {
            setActiveSection(e.detail);
        };
        window.addEventListener('sectionChange', handleSectionChange as EventListener);
        return () => window.removeEventListener('sectionChange', handleSectionChange as EventListener);
    }, []);

    const scrollToSection = (sectionId: string) => {
        window.dispatchEvent(new CustomEvent('navigateToSection', { detail: sectionId }));
        setActiveSection(sectionId);
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { id: "skills", label: "Skills" },
        { id: "work", label: "Work" },
        { id: "about", label: "About" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: 0, opacity: 1 }}
                animate={{
                    y: isVisible ? 0 : -100,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 inset-x-0 z-[100] px-6 py-4 md:px-12 bg-black/60 backdrop-blur-xl border-b border-neutral-800/30"
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Left: Vortex Logo & Brand */}
                    <motion.button
                        onClick={() => scrollToSection('hero')}
                        className="group flex items-center gap-4"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Animated Vortex Logo */}
                        <motion.div
                            className="relative w-14 h-14 overflow-hidden"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Image
                                src="/logo-hex.png"
                                alt="Sarvaax Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tight uppercase text-foreground">
                                SARVAAX<span className="text-neon">®</span>
                            </span>
                            <span className="hidden md:block text-neutral-500 text-xs font-medium tracking-wide">
                                The X Factor in Technology
                            </span>
                        </div>
                    </motion.button>

                    {/* Center: Navigation Links (Desktop) */}
                    <div className="hidden md:flex items-center gap-1 bg-neutral-900/50 backdrop-blur-md rounded-full px-2 py-1.5 border border-neutral-800/50">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className={`relative px-5 py-2 text-sm font-medium uppercase tracking-wider rounded-full transition-colors duration-300 ${activeSection === link.id
                                    ? "text-black"
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {activeSection === link.id && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute inset-0 bg-neon rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Right: Contact Button + Mobile Menu */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <motion.button
                            onClick={() => scrollToSection('contact')}
                            className="group relative overflow-hidden px-3 py-1.5 md:px-6 md:py-2.5 bg-neon text-black text-xs md:text-sm font-bold uppercase tracking-wider rounded-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center gap-1 md:gap-2">
                                Contact
                                <ArrowUpRight size={12} className="md:w-[14px] md:h-[14px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </span>
                        </motion.button>

                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-foreground hover:text-neon transition-colors"
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[99] pt-20 bg-black/95 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {["hero", ...navLinks.map(l => l.id), "contact"].map((id, i) => (
                                <motion.button
                                    key={id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => scrollToSection(id)}
                                    className={`text-3xl font-bold uppercase tracking-wide ${activeSection === id ? "text-neon" : "text-white hover:text-neon"
                                        } transition-colors`}
                                >
                                    {id === "hero" ? "Home" : id.charAt(0).toUpperCase() + id.slice(1)}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
