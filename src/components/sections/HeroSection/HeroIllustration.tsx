import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import styles from './HeroIllustration.module.scss';

const HeroImages = {
    HERO_SHAPE: "/Hero/Hero_Shapes.svg",
    HERO_CARD_1: "/Hero/Hero_Illustration_Card-1.svg",
    HERO_CARD_2: "/Hero/Hero_Illustration_Card-2.svg",
    HERO_CARD_4: "/Hero/Hero_Illustration_Card-3.svg",
    HERO_CARD_3: "/Hero/Hero_Illustration_Card-4.svg"
}

export const HeroIllustration = () => {
    const circleVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    };

    const cardContainerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.6 // Wait for circle to slide in partly
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" as const }
        }
    };

    return (
        <div className={styles.illustration}>
            <motion.div
                className={styles.circleWrapper}
                variants={circleVariants}
                initial="hidden"
                animate="visible"
            >
                <Image
                    src={HeroImages.HERO_SHAPE}
                    alt="Hero Shape"
                    fill
                    priority
                />
            </motion.div>

            <motion.div
                className={styles.cardsLayer}
                variants={cardContainerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className={`${styles.card} ${styles.card1}`} variants={cardVariants}>
                    <Image src={HeroImages.HERO_CARD_1} alt="Card 1" width={400} height={300} style={{ width: '100%', height: 'auto' }} />
                </motion.div>
                <motion.div className={`${styles.card} ${styles.card2}`} variants={cardVariants}>
                    <Image src={HeroImages.HERO_CARD_2} alt="Card 2" width={400} height={300} style={{ width: '100%', height: 'auto' }} />
                </motion.div>
                <motion.div className={`${styles.card} ${styles.card3}`} variants={cardVariants}>
                    <Image src={HeroImages.HERO_CARD_3} alt="Card 3" width={400} height={300} style={{ width: '100%', height: 'auto' }} />
                </motion.div>
                <motion.div className={`${styles.card} ${styles.card4}`} variants={cardVariants}>
                    <Image src={HeroImages.HERO_CARD_4} alt="Card 4" width={400} height={300} style={{ width: '100%', height: 'auto' }} />
                </motion.div>
            </motion.div>
        </div>
    );
};
