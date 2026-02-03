import styles from './Navbar.module.scss';

export default function Navbar() {
    return (
        <header className={styles.nav_header}>
            <div className={styles.nav_container}>
                <div className={styles.nav_logo}>TaskMan</div>
                <button className={styles.nav_ctaButton}>Try free</button>
            </div>
        </header>
    );
};