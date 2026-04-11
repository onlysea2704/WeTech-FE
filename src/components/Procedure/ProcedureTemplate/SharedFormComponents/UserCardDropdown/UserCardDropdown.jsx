import React, { useState, useMemo } from "react";
import styles from "./UserCardDropdown.module.css";
import { useProcessProcedure } from "@/pages/User/ProcessProcedure/ProcessProcedure";
import { formatDate } from "@/utils/dateTimeUtils";

export default function UserCardDropdown({ onSelect }) {
    const { userCards } = useProcessProcedure();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSelectCard = (card) => {
        if (onSelect) onSelect(card);
        setIsOpen(false);
        setSearchTerm("");
    };

    const filteredCards = useMemo(() => {
        const cardsList = userCards || [];
        if (!searchTerm) return cardsList;
        const lowerTerm = searchTerm.toLowerCase();
        return cardsList.filter((card) =>
            (card.fullName || "").toLowerCase().includes(lowerTerm) ||
            (card.cccd || "").includes(lowerTerm)
        );
    }, [searchTerm, userCards]);

    return (
        <div className={styles.dropdownContainer}>
            <button
                type="button"
                className={styles.iconButton}
                onClick={() => setIsOpen(true)}
                title="Lịch sử thông tin cá nhân"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#1b154b" strokeWidth="2" />
                    <path d="M8 12h8m-8-4h8m-8 8h5" stroke="#1b154b" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            {isOpen && (
                <div className={styles.overlay} onClick={() => setIsOpen(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.header}>
                            <h3 className={styles.title}>Lịch sử khai báo thông tin cá nhân</h3>
                            <button type="button" className={styles.closeBtn} onClick={() => setIsOpen(false)}>&times;</button>
                        </div>
                        <div className={styles.body}>
                            <input
                                type="search"
                                className={styles.searchInput}
                                placeholder="Nhập họ tên hoặc số CCCD để tìm kiếm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Họ và tên</th>
                                            <th>Ngày sinh</th>
                                            <th>Giới tính</th>
                                            <th>CCCD</th>
                                            <th>Thường trú</th>
                                            <th>Nơi ở hiện tại</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCards && filteredCards.length > 0 ? (
                                            filteredCards.map((card, idx) => (
                                                <tr key={card.id || `card-${idx}`} onClick={() => handleSelectCard(card)} className={styles.row}>
                                                    <td style={{ fontWeight: 600 }}>{card.fullName}</td>
                                                    <td>{formatDate(card.dob)}</td>
                                                    <td>{card.gender}</td>
                                                    <td style={{ fontWeight: 500, color: "#1b154b" }}>{card.cccd}</td>
                                                    <td style={{ fontSize: "0.85rem", color: "#555" }}>
                                                        {[card.permanentAddress?.street, card.permanentAddress?.ward, card.permanentAddress?.province]
                                                            .filter(Boolean)
                                                            .join(", ") || "Chưa cập nhật"}
                                                    </td>
                                                    <td style={{ fontSize: "0.85rem", color: "#555" }}>
                                                        {[card.currentAddress?.street, card.currentAddress?.ward, card.currentAddress?.province]
                                                            .filter(Boolean)
                                                            .join(", ") || "Chưa cập nhật"}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className={styles.empty}>
                                                    {!userCards || userCards.length === 0
                                                        ? "Chưa có dữ liệu đã lưu. Dữ liệu của bạn sẽ tự động lưu lại khi nộp hồ sơ."
                                                        : "Không tìm thấy kết quả phù hợp."}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
