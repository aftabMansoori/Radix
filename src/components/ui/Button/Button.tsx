import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline';
    className?: string;
    children: React.ReactNode;
}

export const Button = ({
    variant = 'primary',
    className = '',
    children,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
