import Image from 'next/image';
import styles from './WhySection.module.scss';

export const WhySection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.leftColumn}>
                <div className={styles.visualsContainer}>
                    <div className={styles.rectangleShape}>
                        <Image src="/Why/Why_Shapes_Rectangle.svg" alt="Background Shape" width={800} height={800} className={styles.rectImage} />
                    </div>
                    <div className={styles.ellipseShape}>
                        <Image src="/Why/Why_Shapes_Ellipse.svg" alt="Background Circle" width={700} height={700} />
                    </div>
                </div>
            </div>

            <div className={styles.illustrationWrapper}>
                <Image src="/Why/Why_Illustration.svg" alt="Why Task Management" width={800} height={800} />
            </div>

            <div className={styles.content}>
                <h2 className={styles.title}>Why do you need task management software?</h2>
                <p className={styles.description}>
                    Do you waste time organizing sticky notes, searching your email and apps for to-dos, and figuring out what to work on first? Then you need one solution to prioritize your tasks, manage your time, and meet your deadlines.
                </p>
                <a href="#" className={styles.learnMore}>Learn More <Image src="/Why/Arrow_icon.svg" alt="Arrow" width={20} height={20} /></a>
            </div>
        </section>
    );
};

