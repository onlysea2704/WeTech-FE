import { useState, useEffect } from "react";
import localStyles from "./KinhGuiSection.module.css";
import { useFetchAddress } from "@/hooks/useFetchAddress";
import Select from "react-select";

export default function KinhGuiSection({ dataJson, styles }) {
    const prefix = "Cơ quan đăng ký kinh doanh cấp ";
    const [userPart, setUserPart] = useState("");
    const { provinces } = useFetchAddress();

    useEffect(() => {
        const full = dataJson?.kinhGui || "";
        if (full.startsWith(prefix)) {
            setUserPart(full.substring(prefix.length));
        } else if (full.startsWith("Cơ quan đăng ký kinh doanh cấp")) {
            setUserPart(full.substring("Cơ quan đăng ký kinh doanh cấp".length).trim());
        } else {
            setUserPart(full);
        }
    }, [dataJson]);

    const provinceOptions = provinces?.map((p) => ({ value: p.name, label: p.name })) || [];
    const selectedOption = provinceOptions.find((o) => o.value === userPart) || null;

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: "none",
            boxShadow: "none",
            backgroundColor: "transparent",
            borderBottom: "1px dashed #1e1b4b",
            borderRadius: 0,
            minHeight: "unset",
            cursor: "pointer",
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: "0"
        }),
        input: (provided) => ({
            ...provided,
            margin: "0px",
            padding: "0px",
            fontSize: "14px"
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: "14px",
            fontFamily: "inherit",
            color: "#505050",
            margin: 0
        }),
        placeholder: (provided) => ({
            ...provided,
            fontSize: "14px",
            fontFamily: "inherit",
            color: "#999",
            margin: 0
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: "14px",
            backgroundColor: state.isSelected ? "#1B154B" : state.isFocused ? "#f0f0ff" : "#fff",
            color: state.isSelected ? "#fff" : "#333",
            cursor: "pointer",
        }),
        indicatorSeparator: () => ({
            display: "none"
        })
    };

    return (
        <div className={styles.formGroup}>
            <h3 className={`${styles.sectionTitle}`}>
                Kính gửi:
            </h3>
            <div className={localStyles.inputWithSuffixKinhGui}>
                <p className={localStyles.inputSuffixKinhGui}>{prefix}</p>
                <div style={{ flex: 1, marginLeft: "10px" }}>
                    <Select
                        name="kinhGui_province"
                        value={selectedOption}
                        onChange={(option) => setUserPart(option ? option.value : "")}
                        options={provinceOptions}
                        styles={customStyles}
                        placeholder="Chọn tỉnh/thành phố"
                        required
                        classNamePrefix="react-select"
                        isClearable
                    />
                </div>
            </div>
            <input type="hidden" name="kinhGui" value={`${prefix}${userPart}`} />
        </div>
    );
}
