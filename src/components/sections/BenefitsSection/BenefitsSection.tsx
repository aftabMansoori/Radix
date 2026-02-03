'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView, useScroll, useVelocity } from 'motion/react';
import styles from './BenefitsSection.module.scss';

const benefits = [
    {
        title: 'Keep tasks in one place',
        description: 'Save time, avoid losing work and information, delegate, and track tasks to stay on schedule',
        image: '/Benefits/Benefits_Icon_Track.svg'
    },
    {
        title: 'Prioritize your work',
        description: 'Tracking tasks allows everyone to understand which are more important or require more time',
        image: '/Benefits/Benefits_Icon_Priotitize.svg'
    },
    {
        title: 'Improve collaboration',
        description: 'Tracking tasks allows everyone to understand which are more important or require more time',
        image: '/Benefits/Benefits_Icon_Collaborate.svg'
    }
];

export const BenefitsSection = () => {
    const controls = useAnimation();

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.8, // Wait for previous card sequence
                duration: 0.5,
                when: "beforeChildren", // Card fades in first, THEN content starts
                staggerChildren: 0.2
            }
        })
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Key benefits of using task management software</h2>

            <div className={styles.grid}>
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={index}
                        className={styles.card}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate={controls}
                        onViewportEnter={(entry) => {
                            if (!entry) return;
                            // If entering from the bottom (top > 0), animate.
                            // If entering from the top (top <= 0, i.e. scrolling up), show instantly.
                            if (entry.boundingClientRect.top > 0) {
                                controls.start("visible");
                            } else {
                                controls.set("visible");
                            }
                        }}
                    >
                        <motion.div className={styles.icon} variants={contentVariants}>
                            <Image src={benefit.image} alt={benefit.title} width={100} height={100} />
                        </motion.div>
                        <motion.h3 className={styles.cardTitle} variants={contentVariants}>
                            {benefit.title}
                        </motion.h3>
                        <motion.p className={styles.cardDescription} variants={contentVariants}>
                            {benefit.description}
                        </motion.p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
