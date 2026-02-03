import React from 'react';
import styles from './LogoGrid.module.scss';
import Image from "next/image";


const logos = [
    "Cartoon_Network_logo.svg",
    "Booking.com_logo.svg",
    "Dropbox_logo.svg",
    "TOSHIBA_logo.svg",
    "Slack_logo.svg",
    "Netflix_logo.svg",
    "Spotify_logo.svg",
    "CocaCola_logo.svg",
    "RedBull_logo.svg"
];

export const LogoGrid = () => {
    return (
        <div className={styles.grid}>
            {logos.map((logo) => (
                <div key={logo} className={styles.logoItem}>
                    <Image
                        src={`/Logos/${logo}`}
                        alt={logo}
                        width={120}
                        height={30}
                        className={styles.logoImage}
                    />
                </div>
            ))}
        </div>
    );
};
