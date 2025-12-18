"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HackerTextProps {
    text: string;
    className?: string;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=<>?";

export const HackerText = ({ text, className }: HackerTextProps) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayedText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1; // Reveal one letter at a time
        }, 90); // Slower speed (was 30ms)

        return () => clearInterval(interval);
    }, [text]);

    return (
        <span className={className}>
            {displayedText}
        </span>
    );
};
