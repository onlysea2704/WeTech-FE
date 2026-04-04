import React, { useRef, useEffect } from "react";

export const formatNumber = (value) => {
    if (value === null || value === undefined || value === "") return "";
    let valString = value.toString();
    let noLetter = valString.replace(/[^\d]/g, "");
    if (!noLetter) return "";
    return parseInt(noLetter, 10).toLocaleString("vi-VN");
};

export default function FormattedNumberInput({
    name,
    defaultValue,
    value,
    className,
    style,
    readOnly,
    placeholder,
    onChange,
    onInput
}) {
    const inputRef = useRef(null);

    const handleInput = (e) => {
        if (readOnly) return;
        const input = e.target;
        
        const currentSelection = input.selectionStart;
        const prevLength = input.value.length;
        
        input.value = formatNumber(input.value);
        
        if (currentSelection !== null) {
            const newLength = input.value.length;
            const newCursor = currentSelection + (newLength - prevLength);
            // Ensure cursor doesn't jump out of bounds
            input.setSelectionRange(newCursor, newCursor);
        }

        if (onInput) {
            onInput(e);
        }
    };

    // Format initial value if there is defaultValue
    useEffect(() => {
        if (inputRef.current && (defaultValue || value)) {
            inputRef.current.value = formatNumber(inputRef.current.value);
        }
    }, [defaultValue, value]);

    return (
        <input
            ref={inputRef}
            type="text"
            className={className}
            name={name}
            defaultValue={defaultValue}
            value={value}
            readOnly={readOnly}
            style={style}
            placeholder={placeholder}
            onInput={handleInput}
            onChange={onChange}
        />
    );
}
