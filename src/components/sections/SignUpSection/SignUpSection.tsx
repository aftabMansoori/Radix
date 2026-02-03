'use client';

import { motion, useAnimation } from 'motion/react';
import React, { useState } from 'react';
import styles from './SignUpSection.module.scss';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import Image from 'next/image';
import { signupUser } from '@/app/actions/signup';

export const SignUpSection = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const controls = useAnimation();

    const handleSubmit = async () => {
        if (!email) {
            setError('Email is required');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const result = await signupUser(email);
            if (result.success) {
                alert(result.message);
                setEmail('');
            } else {
                setError(result.message || 'Something went wrong');
            }
        } catch (e) {
            console.error(e);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.4, // Wait for form to start revealing
                duration: 0.6,
                ease: "easeOut" as const
            }
        }
    };

    return (
        <section className={styles.section}>
            <div
                style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}

            >

                <h2 className={styles.title}>Get better work done</h2>
                <p className={styles.subtitle}>
                    See why millions of people across 195 countries use TaskMan.
                </p>

                <motion.div className={styles.form}
                    variants={formVariants}
                    initial="hidden"
                    animate={controls}
                    onViewportEnter={(entry) => {
                        if (!entry) return;
                        if (entry.boundingClientRect.top > 0) {
                            controls.start("visible");
                        } else {
                            controls.set("visible");
                        }
                    }}>
                    <div style={{ flex: 1 }}>
                        <Input
                            placeholder="Name@company.com"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            error={error}
                        />
                    </div>
                    <Button onClick={handleSubmit}>Try for free</Button>
                </motion.div>
            </div>

            <motion.div
                className={styles.shapeBlue}
                variants={imageVariants}
                initial="hidden"
                animate={controls}
            >
                <Image
                    src="/Signup/Signup_Shape.svg"
                    alt="Signup Shape"
                    width={400}
                    height={450}
                    className={styles.shapeImage}
                />
            </motion.div>
        </section>
    );
};
