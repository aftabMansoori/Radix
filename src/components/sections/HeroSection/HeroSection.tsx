'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.scss';

import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { LogoGrid } from '@/components/ui/Logo/LogoGrid';

import { HeroIllustration } from './HeroIllustration';
import RightBlob from './test';

export const HeroSection = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!email) {
            setError('Email is required');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email');
            return;
        }
        setError('');
        alert(`Joined with: ${email}`);
    };

    return (
        <section style={{ position: 'relative' }}>
            <div className={styles.section}>
                <div className={styles.contentWrapper}>
                    <div className={styles.content}>
                        <h1 className={styles.title}>
                            Task Management<br />
                            And Lists Tool
                        </h1>

                        <p className={styles.description}>
                            There are many variations of passages of Lorem Ipsum available,
                            but the majority have suffered alteration in some form, by injected humour.
                        </p>
                    </div>

                    <div className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <Input
                                placeholder="Name@company.com"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                error={error}
                            />
                        </div>
                        <Button onClick={handleSubmit}>Try for free</Button>
                    </div>
                </div>

                <LogoGrid />

            </div>

            <HeroIllustration />
        </section>
    );
};

