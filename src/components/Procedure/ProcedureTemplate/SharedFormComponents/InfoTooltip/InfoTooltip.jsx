import React from 'react';
import styles from './InfoTooltip.module.css';

export default function InfoTooltip({ content, color }) {
    if (!content) return null;
    
    const iconStyle = color ? { color: color, borderColor: color, backgroundColor: 'transparent' } : {};

    return (
        <span className={styles.tooltipContainer}>
            <span className={styles.icon} style={iconStyle}>i</span>
            <span className={styles.tooltipText}>{content}</span>
        </span>
    );
}
