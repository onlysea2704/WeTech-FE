import { useState } from "react";
import styles from "./SearchInput.module.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SearchInput() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");

    const handleSearchClick = () => {
        if (searchValue.trim()) {
            navigate(`/course-filter?query=${searchValue.trim()}`);
        }
    };

    function handleSearch(e) {
        if (e.key === "Enter") {
            handleSearchClick();
        }
    }
    return (
        <div
            className={`${styles["search-box"]} ${isAuthenticated ? styles["search-box-logged"] : styles["search-box-not-logged"]}`}
        >
            <i
                className={`fas fa-search ${styles["search-icon"]}`}
                onClick={handleSearchClick}
            ></i>
            <input
                className={styles["search-navbar"]}
                type="text"
                placeholder="Tìm kiếm"
                name="search"
                onKeyDown={handleSearch}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
            />
        </div>
    );
}