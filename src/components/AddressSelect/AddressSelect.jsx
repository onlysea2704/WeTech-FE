import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./AddressSelect.module.css";

export default function AddressSelect({
    className,
    isRequired = true,
    hasHouseNumber = true,
    provinceName = "province",
    wardName = "ward",
    houseNumberName = "houseNumber",
    provinceDefault = "",
    wardDefault = "",
    houseNumberDefault = "",
    provinces = [],
    communes = [],
    onProvinceChange,
    onWardChange,
}) {
    const [provValue, setProvValue] = useState("");
    const [wardValue, setWardValue] = useState("");

    useEffect(() => {
        if (provinceDefault) {
            setProvValue(provinceDefault);
            const matched = provinces.find(
                (p) =>
                    p.name.trim().toLowerCase() === provinceDefault.trim().toLowerCase() ||
                    String(p.code) === String(provinceDefault),
            );
            if (matched && onProvinceChange) {
                onProvinceChange(matched.code);
            }
        } else {
            setProvValue("");
        }
    }, [provinceDefault, provinces]);

    useEffect(() => {
        if (wardDefault) setWardValue(wardDefault);
        else setWardValue("");
    }, [wardDefault]);

    const handleProvChange = (selectedOption) => {
        const name = selectedOption ? selectedOption.value : "";
        const code = selectedOption ? selectedOption.code : "";
        setProvValue(name);
        setWardValue("");
        if (onProvinceChange) onProvinceChange(code);
    };

    const handleWardChange = (selectedOption) => {
        const val = selectedOption ? selectedOption.value : "";
        setWardValue(val);
        if (onWardChange) onWardChange(val);
    };

    const provinceOptions = provinces.map((p) => ({ value: p.name, label: p.name, code: p.code }));
    const communeOptions = communes.map((c) => ({ value: c.name, label: c.name, code: c.code }));

    const selectedProvince =
        provinceOptions.find(
            (o) =>
                o.value.trim().toLowerCase() ===
                String(provValue || "")
                    .trim()
                    .toLowerCase(),
        ) || null;
    const selectedWard =
        communeOptions.find(
            (o) =>
                o.value.trim().toLowerCase() ===
                String(wardValue || "")
                    .trim()
                    .toLowerCase(),
        ) || null;

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            padding: "2px",
            borderColor: state.isFocused ? "#1890ff" : "#C8C7D4",
            boxShadow: "none",
            fontSize: "14px",
            "&:hover": { borderColor: "#1890ff" },
        }),
        input: (provided) => ({
            ...provided,
            margin: "0px",
            fontSize: "14px",
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: "14px",
            backgroundColor: state.isSelected ? "#1B154B" : state.isFocused ? "#f0f0ff" : "#fff",
            color: state.isSelected ? "#fff" : "#333",
            cursor: "pointer",
        }),
    };

    return (
        <div className={className}>
            <div className={styles.grid2}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Tỉnh/Thành phố {isRequired && <span className={styles.required}>*</span>}
                    </label>
                    <Select
                        name={provinceName}
                        value={selectedProvince}
                        onChange={handleProvChange}
                        options={provinceOptions}
                        styles={customStyles}
                        placeholder="Chọn Tỉnh/Thành phố"
                        isClearable
                        required={isRequired}
                        classNamePrefix="react-select"
                        noOptionsMessage={() => "Không tìm thấy"}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Xã/Phường/Đặc khu {isRequired && <span className={styles.required}>*</span>}
                    </label>
                    <Select
                        name={wardName}
                        value={selectedWard}
                        onChange={handleWardChange}
                        options={communeOptions}
                        styles={customStyles}
                        placeholder="Chọn Xã/Phường"
                        isClearable
                        required={isRequired}
                        classNamePrefix="react-select"
                        isDisabled={!provValue}
                        noOptionsMessage={() => (!provValue ? "Chọn tỉnh/thành phố trước" : "Không tìm thấy")}
                    />
                </div>
            </div>
            {hasHouseNumber && (
                <div className={styles.formGroup}>
                    <label className={styles.label}>Số nhà, đường phố, xóm/ ấp/ thôn:</label>
                    <input
                        key={`house_${houseNumberDefault}`}
                        type="text"
                        className={styles.input}
                        name={houseNumberName}
                        defaultValue={houseNumberDefault}
                    />
                </div>
            )}
        </div>
    );
}
