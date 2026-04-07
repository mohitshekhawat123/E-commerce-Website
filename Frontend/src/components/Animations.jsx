import React from 'react';
import { motion } from 'framer-motion';

// Scroll Reveal Section
export const FadeUpSection = ({ children, className = "", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
        className={className}
    >
        {children}
    </motion.div>
);

// Staggered Container
export const StaggerContainer = ({ children, className = "", delayChildren = 0.1, staggerChildren = 0.15 }) => (
    <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: {
                    delayChildren,
                    staggerChildren
                }
            }
        }}
        className={className}
    >
        {children}
    </motion.div>
);

// Staggered Item
export const StaggerItem = ({ children, className = "", yOffset = 20 }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: yOffset },
            show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" }
            }
        }}
        className={className}
    >
        {children}
    </motion.div>
);

// Animated Button Wrapper (Hover/Tap)
export const AnimatedButtonWrapper = ({ children, className = "", ...props }) => (
    <motion.div
        className={`inline-block ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
    >
        {children}
    </motion.div>
);
