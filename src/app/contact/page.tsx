"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/core/Navigation";
import { WarpBackground } from "@/components/ui/warp-background";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle2, Mail, Linkedin, Twitter, Github } from "lucide-react";

// Smart auto-expanding inline input
function SmartInput({
    value,
    onChange,
    placeholder,
    type = "text",
}: {
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
    type?: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);
    const [width, setWidth] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (measureRef.current) {
            const text = value || placeholder;
            measureRef.current.textContent = text;
            setWidth(Math.max(100, measureRef.current.offsetWidth + 32));
        }
    }, [value, placeholder]);

    return (
        <span className="relative inline-block align-baseline">
            <span
                ref={measureRef}
                className="absolute opacity-0 whitespace-pre pointer-events-none"
                style={{ font: 'inherit' }}
            />
            <span
                className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 ${isFocused ? 'bg-neon' : 'bg-neutral-700'
                    }`}
            />
            <input
                ref={inputRef}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{ width: `${width}px`, minWidth: '100px' }}
                className="bg-transparent border-none outline-none text-neon placeholder:text-neutral-600 text-center pb-1 transition-all"
            />
        </span>
    );
}

// Auto-expanding textarea
function SmartTextarea({
    value,
    onChange,
    placeholder
}: {
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.max(100, textareaRef.current.scrollHeight)}px`;
        }
    }, [value]);

    return (
        <div className="relative w-full mt-4">
            <div
                className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300 ${isFocused ? 'ring-2 ring-neon/30' : ''
                    }`}
            />
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-neutral-900/60 border border-neutral-800 rounded-2xl px-6 py-5 outline-none text-neon text-xl placeholder:text-neutral-600 resize-none transition-all focus:border-neon/50"
                style={{ minHeight: '120px' }}
            />
        </div>
    );
}

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const isValid = name.length > 0 && email.length > 0 && message.length > 0;

    const handleSubmit = async () => {
        if (!isValid) return;
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const resetForm = () => {
        setIsSubmitted(false);
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
    };

    // Get current date
    const today = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <main className="min-h-screen bg-background text-foreground">
            <WarpBackground velocity={0.08} />
            <Navigation />

            <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 flex items-center justify-center">
                <div className="max-w-4xl mx-auto w-full">

                    {/* Back link */}
                    <Link href="/">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ x: -5 }}
                            className="inline-flex items-center gap-2 text-neutral-500 hover:text-neon transition-colors mb-8"
                        >
                            <ArrowLeft size={16} />
                            <span className="text-sm font-mono uppercase tracking-wider">Back</span>
                        </motion.span>
                    </Link>

                    <AnimatePresence mode="wait">
                        {isSubmitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-center py-16"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    className="w-24 h-24 mx-auto mb-8 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center"
                                >
                                    <CheckCircle2 className="text-neon" size={48} />
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                                >
                                    Inquiry Received
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-xl text-neutral-400 mb-10 max-w-lg mx-auto"
                                >
                                    Thank you, <span className="text-neon">{name}</span>.
                                    Our team will respond within 24 business hours.
                                </motion.p>
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    onClick={resetForm}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-8 py-4 border border-neutral-700 rounded-full text-foreground font-medium hover:border-neon hover:text-neon transition-all"
                                >
                                    Submit Another Inquiry
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.8 }}
                            >
                                {/* Professional Letter */}
                                <div className="relative">
                                    {/* Background glow */}
                                    <div className="absolute -inset-4 bg-gradient-to-b from-neon/5 via-transparent to-transparent rounded-[2rem] blur-3xl opacity-50" />

                                    <div className="relative p-8 md:p-12 lg:p-16 bg-gradient-to-b from-neutral-900/90 to-neutral-900/60 backdrop-blur-2xl border border-neutral-800/80 rounded-[2rem]">

                                        {/* Letter Header */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex justify-between items-start mb-10 pb-8 border-b border-neutral-800/50"
                                        >
                                            <div>
                                                <p className="text-neon font-mono text-xs uppercase tracking-widest mb-1">Business Inquiry</p>
                                                <p className="text-neutral-500 text-sm">{today}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-neutral-400 text-sm">To: SARVAAX Team</p>
                                                <p className="text-neutral-600 text-xs">hello@sarvaax.com</p>
                                            </div>
                                        </motion.div>

                                        {/* Letter Body */}
                                        <div className="text-xl md:text-2xl lg:text-[1.75rem] leading-[1.9] font-light text-neutral-300">

                                            <motion.p
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="mb-8"
                                            >
                                                <span className="text-neutral-500">Dear SARVAAX Team,</span>
                                            </motion.p>

                                            <motion.p
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="mb-8"
                                            >
                                                <span>My name is </span>
                                                <SmartInput
                                                    value={name}
                                                    onChange={setName}
                                                    placeholder="Full Name"
                                                />
                                                {company && (
                                                    <>
                                                        <span>, representing </span>
                                                        <span className="text-neon">{company}</span>
                                                    </>
                                                )}
                                                <span>.</span>
                                            </motion.p>

                                            <motion.p
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="mb-8"
                                            >
                                                <span>I can be contacted at </span>
                                                <SmartInput
                                                    value={email}
                                                    onChange={setEmail}
                                                    placeholder="email@company.com"
                                                    type="email"
                                                />
                                                <span>.</span>
                                            </motion.p>

                                            {/* Company input - separate line */}
                                            <motion.p
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.45 }}
                                                className="mb-8 text-lg text-neutral-500"
                                            >
                                                <span>Organization: </span>
                                                <SmartInput
                                                    value={company}
                                                    onChange={setCompany}
                                                    placeholder="Company Name (Optional)"
                                                />
                                            </motion.p>

                                            <motion.p
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="mb-4"
                                            >
                                                <span>I am reaching out to discuss the following:</span>
                                            </motion.p>

                                            <motion.div
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 }}
                                                className="mb-10"
                                            >
                                                <SmartTextarea
                                                    value={message}
                                                    onChange={setMessage}
                                                    placeholder="Describe your project requirements, timeline, or any specific questions..."
                                                />
                                            </motion.div>

                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                                className="text-neutral-500 text-lg"
                                            >
                                                I look forward to your response.
                                            </motion.p>

                                            {/* Signature */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.8 }}
                                                className="mt-10 pt-8 border-t border-neutral-800/50"
                                            >
                                                <p className="text-neutral-500 text-lg mb-2">Best regards,</p>
                                                <p className={`text-xl ${name ? "text-neon" : "text-neutral-600"}`}>
                                                    {name || "Your Name"}
                                                </p>
                                                {company && (
                                                    <p className="text-neutral-500 text-sm mt-1">{company}</p>
                                                )}
                                            </motion.div>
                                        </div>

                                        {/* Submit Button */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.9 }}
                                            className="mt-10 flex justify-end"
                                        >
                                            <motion.button
                                                onClick={handleSubmit}
                                                disabled={isSubmitting || !isValid}
                                                whileHover={{ scale: isValid ? 1.02 : 1 }}
                                                whileTap={{ scale: isValid ? 0.98 : 1 }}
                                                className={`flex items-center gap-3 px-10 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-500 ${isValid
                                                        ? 'bg-neon text-black hover:shadow-[0_0_50px_rgba(218,255,2,0.3)]'
                                                        : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                                                    }`}
                                            >
                                                {isSubmitting ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                                                    />
                                                ) : (
                                                    <>
                                                        <Send size={18} />
                                                        <span>Submit Inquiry</span>
                                                    </>
                                                )}
                                            </motion.button>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-neutral-600"
                                >
                                    <a href="mailto:hello@sarvaax.com" className="flex items-center gap-2 hover:text-neon transition-colors">
                                        <Mail size={16} />
                                        <span className="text-sm">hello@sarvaax.com</span>
                                    </a>

                                    <div className="flex gap-3">
                                        {[Linkedin, Twitter, Github].map((Icon, i) => (
                                            <motion.a
                                                key={i}
                                                href="#"
                                                whileHover={{ y: -2 }}
                                                className="w-9 h-9 rounded-full border border-neutral-800 flex items-center justify-center hover:border-neon hover:text-neon transition-all"
                                            >
                                                <Icon size={14} />
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
