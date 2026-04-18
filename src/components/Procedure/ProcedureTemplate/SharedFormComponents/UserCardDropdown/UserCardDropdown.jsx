import React, { useState, useMemo } from "react";
import styles from "./UserCardDropdown.module.css";
import { useProcessProcedure } from "@/pages/User/ProcessProcedure/ProcessProcedure";
import { formatDate } from "@/utils/dateTimeUtils";
import { authAxios } from "@/services/axios-instance";
import { useNotification } from "@/hooks/useNotification";

export default function UserCardDropdown({ onSelect }) {
    const { userCards, refreshUserCards } = useProcessProcedure();
    const { showNotification } = useNotification();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Edit state
    const [editingCard, setEditingCard] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSelectCard = (card) => {
        if (onSelect) onSelect(card);
        setIsOpen(false);
        setSearchTerm("");
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm("Bạn có chắc chắn muốn xóa thông tin này?")) return;
        try {
            await authAxios.delete(`/api/users/my-card/delete/${id}`);
            showNotification("Xóa thông tin thành công", "success");
            refreshUserCards();
        } catch (error) {
            console.error(error);
            showNotification("Lỗi khi xóa thẻ", "error");
        }
    };

    const handleEditClick = (e, card) => {
        e.stopPropagation();
        setEditFormData({
            id: card.id,
            fullName: card.fullName || "",
            cccd: card.cccd || "",
            gender: card.gender || "",
            dob: card.dob || "",
            email: card.email || "",
            phone: card.phone || "",
            nationality: card.nationality || "",
            ethnicity: card.ethnicity || "",
            permanentStreet: card.permanentAddress?.street || "",
            permanentWard: card.permanentAddress?.ward || "",
            permanentProvince: card.permanentAddress?.province || "",
            currentStreet: card.currentAddress?.street || "",
            currentWard: card.currentAddress?.ward || "",
            currentProvince: card.currentAddress?.province || "",
        });
        setEditingCard(card);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        if (e) e.preventDefault();
        
        // Manual validation since we're removing the form wrapper
        if (!editFormData.fullName || !editFormData.cccd || !editFormData.dob || !editFormData.gender) {
            showNotification("Vui lòng điền đầy đủ các trường bắt buộc", "error");
            return;
        }

        setIsSubmitting(true);
        try {
            await authAxios.post("/api/users/my-card/update", editFormData);
            showNotification("Cập nhật thẻ thành công", "success");
            setEditingCard(null);
            refreshUserCards();
        } catch (error) {
            console.error(error);
            showNotification("Lỗi khi cập nhật", "error");
        } finally {
            setIsSubmitting(false);
        }
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
                <div className={styles.overlay} onClick={() => { setIsOpen(false); setEditingCard(null); }}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.header}>
                            <h3 className={styles.title}>
                                {editingCard ? "Sửa thông tin cá nhân" : "Lịch sử khai báo thông tin cá nhân"}
                            </h3>
                            <button type="button" className={styles.closeBtn} onClick={() => { setIsOpen(false); setEditingCard(null); }}>&times;</button>
                        </div>

                        <div className={styles.body}>
                            {editingCard ? (
                                <div className={styles.editForm}>
                                    <div className={styles.formGrid}>
                                        <div className={styles.formGroup}>
                                            <label>Họ và tên <span style={{ color: 'red' }}>*</span></label>
                                            <input required name="fullName" value={editFormData.fullName} onChange={handleEditChange} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>CCCD/CMND <span style={{ color: 'red' }}>*</span></label>
                                            <input required name="cccd" value={editFormData.cccd} onChange={handleEditChange} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Ngày sinh <span style={{ color: 'red' }}>*</span></label>
                                            <input type="date" required name="dob" value={editFormData.dob} onChange={handleEditChange} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Giới tính <span style={{ color: 'red' }}>*</span></label>
                                            <select name="gender" required value={editFormData.gender} onChange={handleEditChange}>
                                                <option value="">Chọn giới tính</option>
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Quốc tịch</label>
                                            <input name="nationality" value={editFormData.nationality} onChange={handleEditChange} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Dân tộc</label>
                                            <input name="ethnicity" value={editFormData.ethnicity} onChange={handleEditChange} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Email</label>
                                            <input type="email" name="email" value={editFormData.email} onChange={handleEditChange} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Số điện thoại</label>
                                            <input type="tel" name="phone" value={editFormData.phone} onChange={handleEditChange} />
                                        </div>
                                    </div>

                                    <h4 className={styles.sectionTitle}>Nơi thường trú</h4>
                                    <div className={styles.formGrid}>
                                        <div className={styles.formGroup}>
                                            <label>Tỉnh/Thành phố</label>
                                            <input name="permanentProvince" value={editFormData.permanentProvince} onChange={handleEditChange} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Quận/Huyện/Phường/Xã</label>
                                            <input name="permanentWard" value={editFormData.permanentWard} onChange={handleEditChange} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Số nhà, đường phố</label>
                                            <input name="permanentStreet" value={editFormData.permanentStreet} onChange={handleEditChange} />
                                        </div>
                                    </div>

                                    <h4 className={styles.sectionTitle}>Nơi ở hiện tại</h4>
                                    <div className={styles.formGrid}>
                                        <div className={styles.formGroup}>
                                            <label>Tỉnh/Thành phố</label>
                                            <input name="currentProvince" value={editFormData.currentProvince} onChange={handleEditChange} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Quận/Huyện/Phường/Xã</label>
                                            <input name="currentWard" value={editFormData.currentWard} onChange={handleEditChange} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Số nhà, đường phố</label>
                                            <input name="currentStreet" value={editFormData.currentStreet} onChange={handleEditChange} />
                                        </div>
                                    </div>

                                    <div className={styles.formActions}>
                                        <button type="button" className={styles.btnCancel} onClick={() => setEditingCard(null)}>Hủy</button>
                                        <button type="button" className={styles.btnSubmit} disabled={isSubmitting} onClick={handleEditSubmit}>
                                            {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
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
                                                    <th>Email</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Thường trú</th>
                                                    <th>Nơi ở hiện tại</th>
                                                    <th style={{ textAlign: "center" }}>Thao tác</th>
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
                                                            <td style={{ fontSize: "0.85rem", color: "#555" }}>{card.email || "Chưa cập nhật"}</td>
                                                            <td style={{ fontSize: "0.85rem", color: "#555" }}>{card.phone || "Chưa cập nhật"}</td>
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
                                                            <td className={styles.actionCell} onClick={(e) => e.stopPropagation()}>
                                                                <button type="button" className={styles.editBtn} onClick={(e) => handleEditClick(e, card)} title="Sửa">
                                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                                    </svg>
                                                                </button>
                                                                <button type="button" className={styles.deleteBtn} onClick={(e) => handleDelete(e, card.id)} title="Xóa">
                                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                        <polyline points="3 6 5 6 21 6" />
                                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                        <line x1="10" y1="11" x2="10" y2="17" />
                                                                        <line x1="14" y1="11" x2="14" y2="17" />
                                                                    </svg>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={9} className={styles.empty}>
                                                            {!userCards || userCards.length === 0
                                                                ? "Chưa có dữ liệu đã lưu. Dữ liệu của bạn sẽ tự động lưu lại khi nộp hồ sơ."
                                                                : "Không tìm thấy kết quả phù hợp."}
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
