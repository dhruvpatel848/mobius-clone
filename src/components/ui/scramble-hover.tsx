"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ScrambleHoverProps {
    text: string;
    className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export const ScrambleHover = ({ text, className }: ScrambleHoverProps) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovering) {
            let iteration = 0;
            interval = setInterval(() => {
                setDisplayText((prev) =>
                    prev
                        .split("")
                        .map((char, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        } else {
            setDisplayText(text);
        }

        return () => clearInterval(interval);
    }, [isHovering, text]);

    return (
        <motion.div
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            className={className}
        >
            {displayText}
        </motion.div>
    );
};
