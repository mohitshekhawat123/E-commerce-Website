import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.15
        }
    }
};

export default function PageWrapper({ children, className = "" }) {
    return (
        <motion.div
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={pageVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Reusable stagger constants
export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

export const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};
