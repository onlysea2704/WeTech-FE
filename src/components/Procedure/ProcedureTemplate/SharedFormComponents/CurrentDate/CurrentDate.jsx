import React from 'react';

export default function CurrentDate({ prefix = "………", style, className }) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return (
        <span style={style} className={className}>
            {prefix}, ngày {day} tháng {month} năm {year}
        </span>
    );
}
