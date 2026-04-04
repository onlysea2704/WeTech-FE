import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './InfoTooltip.module.css';

export default function InfoTooltip({ content, color }) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const iconRef = useRef(null);

    const handleMouseEnter = () => {
        if (iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            setCoords({
                left: rect.left + rect.width / 2,
                top: rect.top,
            });
            setIsVisible(true);
        }
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (isVisible) setIsVisible(false);
        };
        // Listen to all scrolling events in capture phase so scrolling table also hides it
        window.addEventListener('scroll', handleScroll, true); 
        return () => window.removeEventListener('scroll', handleScroll, true);
    }, [isVisible]);

    if (!content) return null;
    
    const iconStyle = color ? { color: color, borderColor: color, backgroundColor: 'transparent' } : {};

    return (
        <span 
            className={styles.tooltipContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={iconRef}
        >
            <span className={styles.icon} style={iconStyle}>i</span>
            {isVisible && createPortal(
                <span 
                    className={styles.tooltipTextPortal} 
                    style={{
                        position: 'fixed',
                        left: `${coords.left}px`,
                        bottom: `${window.innerHeight - coords.top + 8}px`,
                        transform: 'translateX(-50%)',
                        zIndex: 9999,
                    }}
                >
                    {content}
                </span>,
                document.body
            )}
        </span>
    );
}
