import React, { forwardRef } from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ error, className = '', ...props }, ref) => {
        return (
            <div className={`${styles.wrapper} ${className}`}>
                <input
                    ref={ref}
                    className={`${styles.input} ${error ? styles.error : ''}`}
                    {...props}
                />
                {error && <span className={styles.errorMessage}>{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
