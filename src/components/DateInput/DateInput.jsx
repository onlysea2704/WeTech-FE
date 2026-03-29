import React, { useState, useEffect, useRef } from 'react';

const DateInput = ({ value, defaultValue, onChange, className, readOnly, disabled, placeholder = "dd/mm/yyyy", name, required }) => {
    const [internalValue, setInternalValue] = useState(value || defaultValue || "");
    const [displayValue, setDisplayValue] = useState("");
    const datePickerRef = useRef(null);

    useEffect(() => {
        const initVal = value !== undefined ? value : (defaultValue || "");
        setInternalValue(initVal);
        if (initVal) {
            const [y, m, d] = initVal.split("-");
            if (y && m && d) {
                setDisplayValue(`${d}/${m}/${y}`);
            }
        } else {
            setDisplayValue("");
        }
    }, [value, defaultValue]);

    const handleTextChange = (e) => {
        let val = e.target.value.replace(/[^0-9]/g, "");
        if (val.length > 8) val = val.slice(0, 8);
        
        let formatted = val;

        // Validation for day
        if (val.length >= 2) {
            let day = parseInt(val.slice(0, 2), 10);
            if (day > 31) day = 31;
            if (day === 0) day = 1;
            val = day.toString().padStart(2, '0') + val.slice(2);
            formatted = val;
        }

        // Validation for month
        if (val.length >= 4) {
            let month = parseInt(val.slice(2, 4), 10);
            if (month > 12) month = 12;
            if (month === 0) month = 1;
            val = val.slice(0, 2) + month.toString().padStart(2, '0') + val.slice(4);
            formatted = val;
        }

        // Validation for year
        if (val.length === 8) {
            let year = parseInt(val.slice(4, 8), 10);
            const currentYear = new Date().getFullYear();
            if (year > currentYear) {
                year = currentYear;
            }
            val = val.slice(0, 4) + year.toString();
            formatted = val;
        }
        
        // Add slashes for display
        if (val.length > 2) {
            formatted = val.slice(0, 2) + '/' + val.slice(2);
        }
        if (val.length > 4) {
            formatted = formatted.slice(0, 5) + '/' + val.slice(4);
        }
        
        setDisplayValue(formatted);
        
        if (val.length === 8) {
            const d = val.slice(0, 2);
            const m = val.slice(2, 4);
            const y = val.slice(4, 8);
            const newDate = `${y}-${m}-${d}`;
            
            const dateObj = new Date(`${y}-${m}-${d}T00:00:00`); // Fix parsing in some browsers
            // Basic validity check e.g. not 31/02
            if (!isNaN(dateObj.getTime()) && dateObj.getFullYear() == y && (dateObj.getMonth() + 1) == parseInt(m, 10)) {
                setInternalValue(newDate);
                if (onChange) onChange({ target: { name, value: newDate } });
            } else {
                setInternalValue("");
                if (onChange) onChange({ target: { name, value: "" } });
            }
        } else {
            setInternalValue("");
             if (onChange) onChange({ target: { name, value: "" } });
        }
    };

    const handleDateChange = (e) => {
        const newDate = e.target.value; // yyyy-mm-dd
        setInternalValue(newDate);
        if (newDate) {
            const [y, m, d] = newDate.split("-");
            setDisplayValue(`${d}/${m}/${y}`);
        } else {
            setDisplayValue("");
        }
        if (onChange) {
            // Tạo synthetic event với đúng name để handleRowChange destructure đúng key
            onChange({ target: { name, value: newDate } });
        }
    };

    const openPicker = (e) => {
         e.preventDefault();
         if (readOnly || disabled) return;
         if (datePickerRef.current) {
             try {
                datePickerRef.current.showPicker();
             } catch (err) {
                 datePickerRef.current.focus();
             }
         }
    };

    const currentYear = new Date().getFullYear();
    const maxDate = `${currentYear}-12-31`;

    return (
        <div style={{ position: "relative", width: "100%", display: "inline-block" }}>
            {name && <input type="hidden" name={name} value={internalValue} />}
            <input
                type="text"
                className={className}
                value={displayValue}
                placeholder={placeholder}
                onChange={handleTextChange}
                readOnly={readOnly}
                disabled={disabled}
                required={required && !internalValue}
                style={{ width: "100%", boxSizing: "border-box", paddingRight: "32px", fontFamily: "inherit" }}
            />
            
            <input 
                 type="date"
                 ref={datePickerRef}
                 value={internalValue}
                 onChange={handleDateChange}
                 max={maxDate}
                 style={{ 
                     position: "absolute", 
                     width: "1px", 
                     height: "1px", 
                     opacity: 0, 
                     border: "none",
                     padding: 0,
                     margin: -1,
                     overflow: "hidden",
                     bottom: 0,
                     right: 0,
                     pointerEvents: "none"
                 }}
                 tabIndex={-1}
                 readOnly={readOnly}
                 disabled={disabled}
             />
             <svg 
                  onClick={openPicker}
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ 
                      position: "absolute", 
                      right: "10px", 
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: (readOnly || disabled) ? "default" : "pointer",
                      color: "#6b7280",
                      zIndex: 2
                  }}
             >
                 <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                 <line x1="16" y1="2" x2="16" y2="6"></line>
                 <line x1="8" y1="2" x2="8" y2="6"></line>
                 <line x1="3" y1="10" x2="21" y2="10"></line>
             </svg>
        </div>
    );
};

export default DateInput;
