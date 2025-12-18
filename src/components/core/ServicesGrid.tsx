"use client";

import { BorderedContainer } from "@/components/core/BorderedContainer";
import { motion } from "framer-motion";

const services = [
    { label: "01/", title: "Digital Optimization", description: "Streamlining enterprise workflows through custom software solutions." },
    { label: "02/", title: "Security Ecosystems", description: "Fortifying digital assets with next-gen cybersecurity protocols." },
    { label: "03/", title: "AI Integration", description: "Leveraging predictive models for autonomous decision-making." },
    { label: "04/", title: "Cloud Infrastructure", description: "Scalable, resilient cloud-native environments." },
    { label: "05/", title: "Quantum Computing", description: "Next-gen processing power for complex problem solving." },
    { label: "06/", title: "Cybersecurity Mesh", description: "Distributed perimeter defense for zero-trust environments." },
    { label: "07/", title: "Blockchain & DLT", description: "Immutable ledgers ensuring transparency and trust." },
    { label: "08/", title: "Edge Intelligence", description: "Processing power pushed to the absolute frontier." },
    { label: "09/", title: "IoT Ecosystems", description: "Interconnected device grids for smart infrastructure." },
    { label: "10/", title: "Augmented Reality", description: "Overlaying digital intelligence on the physical world." },
    { label: "11/", title: "Big Data Analytics", description: "Turning massive datasets into actionable strategic insight." },
    { label: "12/", title: "Robotic Automation", description: "Eliminating redundancy through intelligent bots." },
    { label: "13/", title: "5G/6G Connect", description: "Ultra-low latency networks for real-time synchronization." },
    { label: "14/", title: "Biometric Security", description: "Identity verification using unique biological markers." },
    { label: "15/", title: "NLP Engines", description: "Human-computer interaction bridged by advanced linguistics." },
    { label: "16/", title: "Digital Twins", description: "Virtual replicas for simulation and stress testing." },
    { label: "17/", title: "Sustainable Tech", description: "Green computing solutions for a carbon-neutral future." },
    { label: "18/", title: "Neuromorphic Chips", description: "Hardware architectures inspired by the human brain." },
    { label: "19/", title: "Smart City Grids", description: "Urban optimization through integrated sensor networks." },
    { label: "20/", title: "Fintech Core", description: "High-frequency trading and algorithmic financial systems." }
];

export const ServicesGrid = () => {
    return (
        <section id="services" className="bg-background border-b border-border-color">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        className="h-full"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <BorderedContainer className="h-full min-h-[250px] p-6 md:p-8 flex flex-col justify-between group relative overflow-hidden bg-background hover:bg-neutral-900 transition-colors duration-500">
                            {/* Hover Highlight Overlay */}
                            <motion.div
                                className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                layoutId={`hoverHighlight-${index}`} // Unique layoutId to prevent conflicts or remove if not needed across items
                            />

                            <div className="flex justify-between items-start relative z-10">
                                <span className="text-xs font-mono text-neutral-500 group-hover:text-neon transition-colors duration-300">{service.label}</span>
                                <motion.div
                                    className="w-1.5 h-1.5 bg-neon rounded-full"
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: 1.5, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            <div className="relative z-10">
                                <motion.h3
                                    className="text-xl md:text-2xl font-bold tracking-tight mb-2 text-foreground group-hover:text-neon transition-colors duration-300"
                                >
                                    {service.title}
                                </motion.h3>
                                <motion.p
                                    className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors duration-300"
                                >
                                    {service.description}
                                </motion.p>
                            </div>
                        </BorderedContainer>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
