"use client";

import { BorderedContainer } from "@/components/core/BorderedContainer";
import { ArrowRight } from "lucide-react";

export const ContactForm = () => {
    return (
        <section id="contact" className="bg-background">
            <BorderedContainer className="p-8 md:p-12 min-h-[60vh] flex flex-col justify-center">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12 uppercase text-foreground">
                    Start The <br /> <span className="text-neon">Conversation</span>
                </h2>

                <form className="text-2xl md:text-4xl leading-relaxed md:leading-relaxed font-medium text-neutral-500 max-w-4xl">
                    <span className="text-foreground">Hello Sarvaax,</span> we are{" "}
                    <span className="relative inline-block border-b-2 border-neutral-700 focus-within:border-neon transition-colors mx-2">
                        <input
                            type="text"
                            placeholder="[Company Name]"
                            className="bg-transparent outline-none text-foreground placeholder:text-neutral-700 w-[7ch] md:w-[10ch] focus:w-[14ch] transition-all duration-300 text-center"
                        />
                    </span>
                    . We are looking to upgrade our{" "}
                    <span className="relative inline-block border-b-2 border-neutral-700 focus-within:border-neon transition-colors mx-2">
                        <input
                            type="text"
                            placeholder="[Infrastructure / Security]"
                            className="bg-transparent outline-none text-foreground placeholder:text-neutral-700 w-[12ch] md:w-[15ch] focus:w-[20ch] transition-all duration-300 text-center"
                        />
                    </span>
                    systems. You can reach our team at{" "}
                    <span className="relative inline-block border-b-2 border-neutral-700 focus-within:border-neon transition-colors mx-2">
                        <input
                            type="email"
                            placeholder="[Corporate Email]"
                            className="bg-transparent outline-none text-foreground placeholder:text-neutral-700 w-[14ch] md:w-[18ch] focus:w-[24ch] transition-all duration-300 text-center"
                        />
                    </span>
                    .

                    <div className="mt-12">
                        <button type="submit" className="group flex items-center gap-4 text-lg md:text-xl text-neon font-bold uppercase tracking-widest hover:text-white transition-colors">
                            <span>Initialize Request</span>
                            <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                        </button>
                    </div>
                </form>
            </BorderedContainer>
        </section>
    );
};
