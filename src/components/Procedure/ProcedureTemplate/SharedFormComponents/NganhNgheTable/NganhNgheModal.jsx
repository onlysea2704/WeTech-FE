import React, { useState, useMemo } from 'react';
import styles from './NganhNgheModal.module.css';
import maNganhNgheData from '@/assets/maNganhNghe.json';

// Flatten the tree into a list of searchable options
const flattenData = (nodes) => {
    let result = [];
    for (const node of nodes) {
        if (node.maNganh) {
            result.push({ title: node.title, maNganh: node.maNganh });
        }
        if (node.children) {
            result = result.concat(flattenData(node.children));
        }
    }
    return result;
};

const flattenedOptions = flattenData(maNganhNgheData);

export default function NganhNgheModal({ isOpen, onClose, onSelect }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOptions = useMemo(() => {
        if (!searchTerm) return flattenedOptions;
        const lowerTerm = searchTerm.toLowerCase();
        return flattenedOptions.filter(
            (o) =>
                o.title.toLowerCase().includes(lowerTerm) ||
                (o.maNganh && o.maNganh.toLowerCase().includes(lowerTerm))
        );
    }, [searchTerm]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Tìm kiếm mã ngành</h3>
                    <button type="button" className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.body}>
                    <input
                        type="search"
                        className={styles.searchInput}
                        placeholder="Nhập tên hoặc mã ngành để tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{ width: '100px' }}>Mã ngành</th>
                                    <th>Tên ngành</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((opt, idx) => (
                                        <tr key={idx} onClick={() => onSelect(opt)} className={styles.row}>
                                            <td className={styles.tdCenter}>{opt.maNganh}</td>
                                            <td>{opt.title}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2} className={styles.empty}>Không tìm thấy kết quả</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
