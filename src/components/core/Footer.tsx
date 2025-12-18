"use client";

import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="px-6 md:px-12 py-12 bg-background text-foreground border-t border-border-color">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12">

                {/* Brand / Name */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-[12vw] md:text-[8vw] leading-[0.8] font-bold tracking-tighter uppercase select-none text-foreground">
                        SARVAAX
                    </h1>
                    <p className="text-neutral-500 text-sm uppercase tracking-widest max-w-sm">
                        The X Factor in Technology. <br />
                        Powering Next-Gen Enterprise Solutions.
                    </p>
                </div>

                {/* Socials & Copyright */}
                <div className="flex flex-col gap-8 text-right">
                    <div className="flex flex-col gap-2 text-lg md:text-xl font-bold uppercase tracking-tight">
                        <Link href="#" className="hover:text-neon transition-colors">LinkedIn</Link>
                        <Link href="#" className="hover:text-neon transition-colors">Twitter / X</Link>
                        <Link href="mailto:contact@sarvaax.com" className="hover:text-neon transition-colors">Contact@sarvaax.com</Link>
                    </div>

                    <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-600">
                        <p>© {new Date().getFullYear()} SARVAAX TECHNOLOGIES. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
