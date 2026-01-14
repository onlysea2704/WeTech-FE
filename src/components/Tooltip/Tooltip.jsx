import React, { useState } from "react";
import "./Tooltip.css";

const Tooltip = ({ text, children, copyValue, onCopy }) => {
    const [tooltipText, setTooltipText] = useState(text);
    const [showCopied, setShowCopied] = useState(false);

    const handleClick = (e) => {
        // Prevent navigation if it's inside a link
        e.preventDefault();

        if (copyValue) {
            navigator.clipboard
                .writeText(copyValue)
                .then(() => {
                    setTooltipText("Đã sao chép!");
                    setShowCopied(true);
                    setTimeout(() => {
                        setTooltipText(text);
                        setShowCopied(false);
                    }, 2000); // Reset after 2 seconds
                    if (onCopy) onCopy();
                })
                .catch((err) => {
                    console.error("Failed to copy: ", err);
                });
        }
    };

    return (
        <div className="custom-tooltip-container" onClick={handleClick}>
            {children}
            <span className="custom-tooltip-text">
                {showCopied && (
                    <span
                        style={{ marginRight: "5px", color: "#4ade80", display: "inline-flex", alignItems: "center" }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20 6L9 17L4 12"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                )}
                {tooltipText}
            </span>
        </div>
    );
};

export default Tooltip;
