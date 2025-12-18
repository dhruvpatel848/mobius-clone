"use client";

import { BorderedContainer } from "@/components/core/BorderedContainer";

const roadmap = [
    {
        year: "2025",
        milestone: "Establishment",
        description: "Sarvaax Technologies founded with a core mission to redefine digital resilience."
    },
    {
        year: "2026",
        milestone: "Expansion",
        description: "Launching the Sarvaax Enterprise Suite, targeting Fortune 500 integrations."
    },
    {
        year: "Future",
        milestone: "Vision",
        description: "Pioneering the first autonomous decentralized security grid for global infrastructure."
    }
];

export const Timeline = () => {
    return (
        <section id="vision" className="bg-background border-b border-border-color">
            <BorderedContainer className="p-8 md:p-12">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 uppercase text-foreground">
                    Strategic <span className="text-neon">Vision</span>
                </h2>

                <div className="flex flex-col">
                    {roadmap.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row border-t border-neutral-800 py-12 group hover:bg-neutral-900 transition-colors duration-300">
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                <span className="text-lg font-mono text-neon block mb-2">{item.year}</span>
                                <span className="text-xl font-bold text-foreground">{item.milestone}</span>
                            </div>
                            <div className="w-full md:w-2/3 flex flex-col gap-4">
                                <p className="text-neutral-400 text-lg max-w-xl group-hover:text-white transition-colors duration-300">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </BorderedContainer>
        </section>
    );
};
