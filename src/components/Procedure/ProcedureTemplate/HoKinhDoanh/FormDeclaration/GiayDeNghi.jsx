import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import styles from './GiayDeNghi.module.css';
import UploadCCCD from '../../../../UploadCCCD/UploadCCCD';
import AddressSelect from '../../../../AddressSelect/AddressSelect';
import { useFetchAddress } from '../../../../../hooks/useFetchAddress';
import deleteIcon from '../../../../../assets/delete-icon.png';
import maNganhNgheData from '../../../../../assets/maNganhNghe.json';

const EMPTY_NGANH_NGHE = { tenNganh: '', chiTiet: '', maNganh: '', laNganhChinh: false };
const EMPTY_THANH_VIEN = { hoTen: '', ngaySinh: '', cccd: '', gioiTinh: '', quocTich: '', danToc: '', thuongTru: '', hienTai: '', chuKy: '' };

function isNganhNgheEmpty(row) { return !row.tenNganh && !row.chiTiet && !row.maNganh; }
function isThanhVienEmpty(row) { return !row.hoTen && !row.ngaySinh && !row.cccd; }

function formatNumber(val) {
    const raw = String(val).replace(/[^0-9]/g, '');
    if (!raw) return '';
    return Number(raw).toLocaleString('vi-VN');
}

const GiayDeNghi = forwardRef(function GiayDeNghi({ formId, dataJson, onSubmit, formRef }, componentRef) {
    // ── State ────────────────────────────────────────────────────────────────
    const [nganhNgheRows, setNganhNgheRows] = useState([]);
    const [editingNganhIdx, setEditingNganhIdx] = useState(null);
    const [editingNganh, setEditingNganh] = useState(null);
    const [editingNganhPath, setEditingNganhPath] = useState([]);

    const [thanhVienRows, setThanhVienRows] = useState([]);
    const [editingTVIdx, setEditingTVIdx] = useState(null);
    const [editingTV, setEditingTV] = useState(null);

    const [vonBangChu, setVonBangChu] = useState('');

    // Province codes cho từng ô địa chỉ (dùng để trigger fetch communes)
    const [provCode_thuongTru, setProvCode_thuongTru] = useState('');
    const [provCode_hienTai, setProvCode_hienTai] = useState('');
    const [provCode_truSo, setProvCode_truSo] = useState('');
    const [provCode_thue, setProvCode_thue] = useState('');

    // ── useFetchAddress: provinces cache toàn cục → 1 lần fetch ─────────────
    const { provinces, communes: communes_thuongTru } = useFetchAddress(provCode_thuongTru);
    const { communes: communes_hienTai } = useFetchAddress(provCode_hienTai);
    const { communes: communes_truSo } = useFetchAddress(provCode_truSo);
    const { communes: communes_thue } = useFetchAddress(provCode_thue);

    // ── Sync từ dataJson ─────────────────────────────────────────────────────
    useEffect(() => {
        if (dataJson) {
            setNganhNgheRows(dataJson.nganhNgheList || []);
            setThanhVienRows(dataJson.thanhVienList || []);
            setVonBangChu(dataJson.vonKinhDoanh_bangChu || '');
        } else {
            setNganhNgheRows([]);
            setThanhVienRows([]);
            setVonBangChu('');
        }
    }, [dataJson]);


    // ── Expose API cho DeclarationForms ─────────────────────────────────────
    useImperativeHandle(componentRef, () => ({
        getDraftData: () => {
            if (!formRef?.current) return null;
            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData.entries());
            data.nganhNgheList = nganhNgheRows;
            data.thanhVienList = thanhVienRows;
            data.vonKinhDoanh_bangChu = vonBangChu;
            return data;
        },
        getExportData: () => {
            if (!formRef?.current) return null;
            if (!formRef.current.checkValidity()) {
                formRef.current.reportValidity();
                return null;
            }
            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData.entries());
            data.nganhNgheList = nganhNgheRows;
            data.thanhVienList = thanhVienRows;
            data.vonKinhDoanh_bangChu = vonBangChu;
            return data;
        },
        importData: (importedData) => {
            if (!importedData) return;
            setNganhNgheRows(importedData.nganhNgheList || []);
            setThanhVienRows(importedData.thanhVienList || []);
            setVonBangChu(importedData.vonKinhDoanh_bangChu || '');
        }
    }));

    // ── Submit ───────────────────────────────────────────────────────────────
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.nganhNgheList = nganhNgheRows;
        data.thanhVienList = thanhVienRows;
        data.vonKinhDoanh_bangChu = vonBangChu;
        if (onSubmit) onSubmit(data);
    };

    // ── Helpers ──────────────────────────────────────────────────────────────
    const findPathByTitle = (nodes, targetTitle, currentPath = []) => {
        if (!targetTitle) return null;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].title === targetTitle) {
                return [...currentPath, i];
            }
            if (nodes[i].children) {
                const found = findPathByTitle(nodes[i].children, targetTitle, [...currentPath, i]);
                if (found) return found;
            }
        }
        return null;
    };

    // ── Ngành nghề actions ───────────────────────────────────────────────────
    const handleAddNganh = () => { setEditingNganhIdx('new'); setEditingNganh({ ...EMPTY_NGANH_NGHE }); setEditingNganhPath([]); };
    const handleEditNganh = (idx) => { 
        setEditingNganhIdx(idx); 
        setEditingNganh({ ...nganhNgheRows[idx] }); 
        setEditingNganhPath(findPathByTitle(maNganhNgheData, nganhNgheRows[idx].tenNganh) || []);
    };
    const handleSaveNganh = () => {
        if (editingNganhIdx === 'new') setNganhNgheRows(prev => [...prev, editingNganh]);
        else setNganhNgheRows(prev => prev.map((r, i) => i === editingNganhIdx ? editingNganh : r));
        setEditingNganhIdx(null); setEditingNganh(null);
    };
    const handleDeleteNganh = (idx) => setNganhNgheRows(prev => prev.filter((_, i) => i !== idx));

    // ── Thành viên actions ───────────────────────────────────────────────────
    const handleAddTV = () => { setEditingTVIdx('new'); setEditingTV({ ...EMPTY_THANH_VIEN }); };
    const handleEditTV = (idx) => { setEditingTVIdx(idx); setEditingTV({ ...thanhVienRows[idx] }); };
    const handleSaveTV = () => {
        if (editingTVIdx === 'new') setThanhVienRows(prev => [...prev, editingTV]);
        else setThanhVienRows(prev => prev.map((r, i) => i === editingTVIdx ? editingTV : r));
        setEditingTVIdx(null); setEditingTV(null);
    };
    const handleDeleteTV = (idx) => setThanhVienRows(prev => prev.filter((_, i) => i !== idx));

    const isNganhEditing = editingNganhIdx !== null;
    const isTVEditing = editingTVIdx !== null;

    const renderNganhSelects = () => {
        let currentOptions = maNganhNgheData;
        const selects = [];
        
        for (let i = 0; i <= editingNganhPath.length; i++) {
            if (!currentOptions || currentOptions.length === 0) break;
            
            selects.push(
                <select 
                    key={i} 
                    className={`${styles.select} ${styles.tableInput}`} 
                    style={{marginBottom: '4px'}}
                    value={editingNganhPath[i] ?? ""}
                    onChange={(e) => {
                        const val = e.target.value;
                        const newPath = [...editingNganhPath.slice(0, i)]; 
                        if (val !== "") {
                            newPath.push(Number(val));
                        }
                        setEditingNganhPath(newPath);
                        
                        let node = null;
                        let opts = maNganhNgheData;
                        for (const idx of newPath) {
                            node = opts[idx];
                            opts = node.children || [];
                        }
                        if (node) {
                            setEditingNganh(p => ({ 
                                ...p, 
                                tenNganh: node.title,
                                maNganh: node.maNganh || ''
                            }));
                        } else {
                            setEditingNganh(p => ({ ...p, tenNganh: '', maNganh: '' }));
                        }
                    }}
                >
                    <option value="">-- Chọn ngành cấp {i+1} --</option>
                    {currentOptions.map((opt, idx) => (
                        <option key={idx} value={idx}>{opt.title}</option>
                    ))}
                </select>
            );
            
            if (editingNganhPath[i] !== undefined && currentOptions[editingNganhPath[i]]) {
                currentOptions = currentOptions[editingNganhPath[i]].children;
            } else {
                break;
            }
        }
        return <div style={{display: 'flex', flexDirection: 'column'}}>{selects}</div>;
    };


    return (
        <form onSubmit={handleSubmit} ref={formRef} key={dataJson ? 'loaded' : 'empty'}>
            {/* ── Người đại diện & CCCD ── */}
            <div className={styles.row}>
                <div className={styles.colLeft}>
                    <h3 className={styles.sectionTitle}>Tên người đại diện:</h3>
                    <div className={styles.grid2}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Họ và tên <span className={styles.required}>*</span></label>
                            <input type="text" className={styles.input} name="nguoiDaiDien_hoTen" defaultValue={dataJson?.nguoiDaiDien_hoTen || ''} required placeholder="NGUYỄN VĂN A" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Ngày sinh <span className={styles.required}>*</span></label>
                            <input type="date" className={styles.input} name="nguoiDaiDien_ngaySinh" defaultValue={dataJson?.nguoiDaiDien_ngaySinh || ''} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Giới tính <span className={styles.required}>*</span></label>
                            <select className={styles.select} name="nguoiDaiDien_gioiTinh" defaultValue={dataJson?.nguoiDaiDien_gioiTinh || ''} required>
                                <option value="" disabled>--Chọn giới tính--</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Số định danh cá nhân <span className={styles.required}>*</span></label>
                            <input type="text" className={styles.input} name="nguoiDaiDien_cccd" defaultValue={dataJson?.nguoiDaiDien_cccd || ''} required pattern="[0-9]{9,12}" title="Số CCCD phải có 9–12 chữ số" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Dân tộc <span className={styles.required}>*</span></label>
                            <select className={styles.select} name="nguoiDaiDien_danToc" defaultValue={dataJson?.nguoiDaiDien_danToc || ''} required>
                                <option value="" disabled>--Chọn dân tộc--</option>
                                <option value="Kinh">Kinh</option>
                                <option value="Tày">Tày</option>
                                <option value="Thái">Thái</option>
                                <option value="Mường">Mường</option>
                                <option value="Khmer">Khmer</option>
                                <option value="Hoa">Hoa</option>
                                <option value="Nùng">Nùng</option>
                                <option value="H'Mông">H'Mông</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Quốc tịch <span className={styles.required}>*</span></label>
                            <select className={styles.select} name="nguoiDaiDien_quocTich" defaultValue={dataJson?.nguoiDaiDien_quocTich || ''} required>
                                <option value="" disabled>--Chọn quốc tịch--</option>
                                <option value="Việt Nam">Việt Nam</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Điện thoại <span className={styles.required}>*</span></label>
                            <input
                                type="tel" className={styles.input}
                                name="nguoiDaiDien_phone" defaultValue={dataJson?.nguoiDaiDien_phone || ''}
                                required
                                pattern="(0|\+84)[0-9]{9,10}" title="VD: 0912345678"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email:</label>
                            <input type="email" className={styles.input} name="nguoiDaiDien_email" defaultValue={dataJson?.nguoiDaiDien_email || ''} />
                        </div>
                    </div>

                    <h3 className={styles.sectionTitle}>Nơi thường trú:</h3>
                    <AddressSelect
                        provinces={provinces}
                        communes={communes_thuongTru}
                        onProvinceChange={setProvCode_thuongTru}
                        provinceName="thuongTru_tinh" wardName="thuongTru_xa" houseNumberName="thuongTru_soNha"
                        provinceDefault={dataJson?.thuongTru_tinh || ''} wardDefault={dataJson?.thuongTru_xa || ''} houseNumberDefault={dataJson?.thuongTru_soNha || ''}
                    />

                    <h3 className={styles.sectionTitle}>Nơi ở hiện tại:</h3>
                    <AddressSelect
                        provinces={provinces}
                        communes={communes_hienTai}
                        onProvinceChange={setProvCode_hienTai}
                        provinceName="hienTai_tinh" wardName="hienTai_xa" houseNumberName="hienTai_soNha"
                        provinceDefault={dataJson?.hienTai_tinh || ''} wardDefault={dataJson?.hienTai_xa || ''} houseNumberDefault={dataJson?.hienTai_soNha || ''}
                    />
                </div>
                <div className={styles.colRight}>
                    <UploadCCCD onComplete={(front, back) => console.log('Extracted', front, back)} />
                </div>
            </div>

            {/* ── Tên HKD & Trụ sở ── */}
            <div className={styles.row}>
                <div className={styles.colHalf}>
                    <h3 className={styles.sectionTitle}>Tên hộ kinh doanh:</h3>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên tiếng Việt <span className={styles.required}>*</span></label>
                        <input type="text" className={styles.input} name="hkd_tenVN" defaultValue={dataJson?.hkd_tenVN || ''} required placeholder="HỘ KINH DOANH..." />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên tiếng nước ngoài:</label>
                        <input type="text" className={styles.input} name="hkd_tenEN" defaultValue={dataJson?.hkd_tenEN || ''} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên viết tắt:</label>
                        <input type="text" className={styles.input} name="hkd_tenVietTat" defaultValue={dataJson?.hkd_tenVietTat || ''} />
                    </div>
                </div>
                <div className={styles.colHalf}>
                    <h3 className={styles.sectionTitle}>Trụ sở của hộ kinh doanh:</h3>
                    <AddressSelect
                        isRequired={false}
                        provinces={provinces}
                        communes={communes_truSo}
                        onProvinceChange={setProvCode_truSo}
                        provinceName="truSo_tinh" wardName="truSo_xa" houseNumberName="truSo_soNha"
                        provinceDefault={dataJson?.truSo_tinh || ''} wardDefault={dataJson?.truSo_xa || ''} houseNumberDefault={dataJson?.truSo_soNha || ''}
                    />
                    <div className={styles.grid2}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Điện thoại <span className={styles.required}>*</span></label>
                            <input type="tel" className={styles.input} name="truSo_phone" defaultValue={dataJson?.truSo_phone || ''} required pattern="(0|\+84)[0-9]{9,10}" placeholder="0912345678" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email:</label>
                            <input type="email" className={styles.input} name="truSo_email" defaultValue={dataJson?.truSo_email || ''} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Ngành nghề ── */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Chọn ngành nghề kinh doanh:</h3>
                <div className={styles.actionRow}>
                    <button type="button" className={styles.btnPrimary} onClick={handleAddNganh} disabled={isNganhEditing}>Thêm dòng</button>
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <colgroup>
                            <col style={{ width: '48px', minWidth: '48px' }} />
                            <col style={{ width: '200px', minWidth: '200px' }} />
                            <col style={{ width: '200px', minWidth: '200px' }} />
                            <col style={{ width: '110px', minWidth: '110px' }} />
                            <col style={{ width: '130px', minWidth: '130px' }} />
                            <col style={{ width: '80px', minWidth: '80px' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên ngành</th>
                                <th>Chi tiết</th>
                                <th>Mã ngành</th>
                                <th>Ngành, nghề<br />kinh doanh chính</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {nganhNgheRows.length === 0 && !isNganhEditing && (
                                <tr><td colSpan={6} className={styles.emptyRow}>Chưa có ngành nghề nào. Nhấn "Thêm dòng" để thêm.</td></tr>
                            )}
                            {nganhNgheRows.map((row, idx) => (
                                editingNganhIdx === idx ? (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{renderNganhSelects()}</td>
                                        <td><input className={`${styles.input} ${styles.tableInput}`} value={editingNganh.chiTiet} onChange={e => setEditingNganh(p => ({ ...p, chiTiet: e.target.value }))} /></td>
                                        <td><input className={`${styles.input} ${styles.tableInput}`} value={editingNganh.maNganh} readOnly style={{backgroundColor: '#e9ecef'}} /></td>
                                        <td><input type="checkbox" className={styles.checkbox} checked={editingNganh.laNganhChinh} onChange={e => setEditingNganh(p => ({ ...p, laNganhChinh: e.target.checked }))} /></td>
                                        <td><button type="button" className={styles.btnSave} onClick={handleSaveNganh} disabled={isNganhNgheEmpty(editingNganh)}>Lưu</button></td>
                                    </tr>
                                ) : (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td className={styles.tdLeft}>{row.tenNganh}</td>
                                        <td className={styles.tdLeft}>{row.chiTiet}</td>
                                        <td>{row.maNganh}</td>
                                        <td><input type="checkbox" className={styles.checkbox} readOnly checked={!!row.laNganhChinh} /></td>
                                        <td>
                                            <div className={styles.tdActions}>
                                                <button type="button" className={styles.btnSecondary} onClick={() => handleEditNganh(idx)}>Sửa</button>
                                                <img src={deleteIcon} alt="xóa" onClick={() => handleDeleteNganh(idx)} width="18" height="18" style={{ cursor: 'pointer' }} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            ))}
                            {editingNganhIdx === 'new' && (
                                <tr>
                                    <td>{nganhNgheRows.length + 1}</td>
                                    <td>{renderNganhSelects()}</td>
                                    <td><input className={`${styles.input} ${styles.tableInput}`} placeholder="Chi tiết" value={editingNganh.chiTiet} onChange={e => setEditingNganh(p => ({ ...p, chiTiet: e.target.value }))} /></td>
                                    <td><input className={`${styles.input} ${styles.tableInput}`} placeholder="Mã ngành" value={editingNganh.maNganh} readOnly style={{backgroundColor: '#e9ecef'}} /></td>
                                    <td><input type="checkbox" className={styles.checkbox} checked={editingNganh.laNganhChinh} onChange={e => setEditingNganh(p => ({ ...p, laNganhChinh: e.target.checked }))} /></td>
                                    <td><button type="button" className={styles.btnSave} onClick={handleSaveNganh} disabled={isNganhNgheEmpty(editingNganh)}>Lưu</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Vốn kinh doanh ── */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Vốn kinh doanh:</h3>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tổng số (VNĐ) <span className={styles.required}>*</span></label>
                        <div className={styles.inputWithSuffix}>
                            <input
                                type="text" className={styles.input}
                                style={{ textAlign: 'right', paddingRight: '48px' }}
                                name="vonKinhDoanh" required
                                defaultValue={dataJson?.vonKinhDoanh ? formatNumber(String(dataJson.vonKinhDoanh)) : ''}
                                placeholder="0"
                                onInput={e => {
                                    const pos = e.target.selectionStart;
                                    const oldLen = e.target.value.length;
                                    const formatted = formatNumber(e.target.value);
                                    e.target.value = formatted;
                                    const diff = formatted.length - oldLen;
                                    e.target.setSelectionRange(pos + diff, pos + diff);
                                }}
                            />
                            <span className={styles.inputSuffix}>VNĐ</span>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tổng số bằng chữ</label>
                        <input
                            type="text" className={styles.input} name="vonKinhDoanh_bangChu"
                            value={vonBangChu} onChange={e => setVonBangChu(e.target.value)}
                            placeholder="Nhập số tiền bằng chữ..."
                        />
                    </div>
                </div>
            </div>

            <div className={styles.formGroup}>
                <h3 className={styles.sectionTitle}>Kính gửi:</h3>
                <input type="text" className={styles.input} name="kinhGui" defaultValue={dataJson?.kinhGui || ''} placeholder="Phòng Kinh tế, Hạ tầng và Đô thị phường..." />
            </div>

            {/* ── Địa chỉ thuế ── */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Địa chỉ nhận thông báo thuế (chỉ kê khai nếu khác địa chỉ trụ sở):</h3>
                <AddressSelect
                    isRequired={false}
                    provinces={provinces}
                    communes={communes_thue}
                    onProvinceChange={setProvCode_thue}
                    provinceName="thue_tinh" wardName="thue_xa" houseNumberName="thue_soNha"
                    provinceDefault={dataJson?.thue_tinh || ''} wardDefault={dataJson?.thue_xa || ''} houseNumberDefault={dataJson?.thue_soNha || ''}
                />
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Điện thoại</label>
                        <input type="tel" className={styles.input} name="thue_phone" defaultValue={dataJson?.thue_phone || ''} pattern="(0|\+84)[0-9]{9,10}" placeholder="0912345678" />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email:</label>
                        <input type="email" className={styles.input} name="thue_email" defaultValue={dataJson?.thue_email || ''} />
                    </div>
                </div>
            </div>

            <div className={styles.grid2}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Ngày bắt đầu hoạt động:</label>
                    <input type="date" className={styles.input} name="ngayBatDau" defaultValue={dataJson?.ngayBatDau || ''} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Tổng số lao động (dự kiến):</label>
                    <input type="number" className={styles.input} name="soLaoDong" min="0" defaultValue={dataJson?.soLaoDong || ''} />
                </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: '20px' }}>
                <h3 className={styles.sectionTitle}>Phương pháp tính thuế GTGT:</h3>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}><input type="radio" name="vatMethod" value="ke_khai" className={styles.radioInput} defaultChecked={dataJson?.vatMethod === 'ke_khai'} /> Phương pháp kê khai</label>
                    <label className={styles.radioLabel}><input type="radio" name="vatMethod" value="khoan" className={styles.radioInput} defaultChecked={!dataJson?.vatMethod || dataJson?.vatMethod === 'khoan'} /> Phương pháp khoán</label>
                </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: '20px' }}>
                <h3 className={styles.sectionTitle}>Chủ thể thành lập hộ kinh doanh:</h3>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}><input type="radio" name="subject" value="ca_nhan" className={styles.radioInput} defaultChecked={!dataJson?.subject || dataJson?.subject === 'ca_nhan'} /> Cá nhân</label>
                    <label className={styles.radioLabel}><input type="radio" name="subject" value="thanh_vien_gd" className={styles.radioInput} defaultChecked={dataJson?.subject === 'thanh_vien_gd'} /> Các thành viên hộ gia đình</label>
                </div>
            </div>

            {/* ── Bảng thành viên ── */}
            <div className={styles.sectionGroup} style={{ marginTop: '20px' }}>
                <h3 className={styles.sectionTitle}>Thông tin về các thành viên hộ gia đình đăng ký hộ kinh doanh:</h3>
                <div className={styles.actionRow}>
                    <button type="button" className={styles.btnPrimary} onClick={handleAddTV} disabled={isTVEditing}>Thêm dòng</button>
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <colgroup>
                            <col style={{ width: '48px', minWidth: '48px' }} />
                            <col style={{ width: '160px', minWidth: '160px' }} />
                            <col style={{ width: '120px', minWidth: '120px' }} />
                            <col style={{ width: '140px', minWidth: '140px' }} />
                            <col style={{ width: '90px', minWidth: '90px' }} />
                            <col style={{ width: '100px', minWidth: '100px' }} />
                            <col style={{ width: '90px', minWidth: '90px' }} />
                            <col style={{ width: '160px', minWidth: '160px' }} />
                            <col style={{ width: '160px', minWidth: '160px' }} />
                            <col style={{ width: '100px', minWidth: '100px' }} />
                            <col style={{ width: '80px', minWidth: '80px' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>STT</th><th>Họ tên</th><th>Ngày sinh</th><th>Số định danh</th>
                                <th>Giới tính</th><th>Quốc tịch</th><th>Dân tộc</th>
                                <th>Nơi thường trú</th><th>Nơi ở hiện tại</th><th>Chữ ký</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {thanhVienRows.length === 0 && !isTVEditing && (
                                <tr><td colSpan={11} className={styles.emptyRow}>Chưa có thành viên nào. Nhấn "Thêm dòng" để thêm.</td></tr>
                            )}
                            {thanhVienRows.map((row, idx) => (
                                editingTVIdx === idx ? (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td><input className={`${styles.input} ${styles.tableInput}`} value={editingTV.hoTen} onChange={e => setEditingTV(p => ({ ...p, hoTen: e.target.value }))} /></td>
                                        <td><input type="date" className={`${styles.input} ${styles.tableInput}`} value={editingTV.ngaySinh} onChange={e => setEditingTV(p => ({ ...p, ngaySinh: e.target.value }))} /></td>
                                        <td><input className={`${styles.input} ${styles.tableInput}`} value={editingTV.cccd} onChange={e => setEditingTV(p => ({ ...p, cccd: e.target.value }))} /></td>
                                        <td><select className={`${styles.select} ${styles.tableInput}`} value={editingTV.gioiTinh} onChange={e => setEditingTV(p => ({ ...p, gioiTinh: e.target.value }))}><option value=""></option><option value="Nam">Nam</option><option value="Nữ">Nữ</option></select></td>
                                        <td><select className={`${styles.select} ${styles.tableInput}`} value={editingTV.quocTich} onChange={e => setEditingTV(p => ({ ...p, quocTich: e.target.value }))}><option value=""></option><option value="Việt Nam">Việt Nam</option></select></td>
                                        <td><select className={`${styles.select} ${styles.tableInput}`} value={editingTV.danToc} onChange={e => setEditingTV(p => ({ ...p, danToc: e.target.value }))}><option value=""></option><option value="Kinh">Kinh</option><option value="Tày">Tày</option><option value="Thái">Thái</option><option value="Mường">Mường</option><option value="Khmer">Khmer</option><option value="Hoa">Hoa</option><option value="Nùng">Nùng</option><option value="H'Mông">H'Mông</option></select></td>
                                        <td><input className={`${styles.input} ${styles.tableInput}`} value={editingTV.thuongTru || ''} onChange={e => setEditingTV(p => ({ ...p, thuongTru: e.target.value }))} /></td>
                                        <td><input className={`${styles.input} ${styles.tableInput}`} value={editingTV.hienTai || ''} onChange={e => setEditingTV(p => ({ ...p, hienTai: e.target.value }))} /></td>
                                        <td><input className={`${styles.input} ${styles.tableInput}`} value={editingTV.chuKy || ''} onChange={e => setEditingTV(p => ({ ...p, chuKy: e.target.value }))} /></td>
                                        <td><button type="button" className={styles.btnSave} onClick={handleSaveTV} disabled={isThanhVienEmpty(editingTV)}>Lưu</button></td>
                                    </tr>
                                ) : (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td><td className={styles.tdLeft}>{row.hoTen}</td><td>{row.ngaySinh}</td><td>{row.cccd}</td>
                                        <td>{row.gioiTinh}</td><td>{row.quocTich}</td><td>{row.danToc}</td>
                                        <td className={styles.tdLeft}>{row.thuongTru}</td><td className={styles.tdLeft}>{row.hienTai}</td><td>{row.chuKy}</td>
                                        <td>
                                            <div className={styles.tdActions}>
                                                <button type="button" className={styles.btnSecondary} onClick={() => handleEditTV(idx)}>Sửa</button>
                                                <img src={deleteIcon} alt="xóa" onClick={() => handleDeleteTV(idx)} width="18" height="18" style={{ cursor: 'pointer' }} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            ))}
                            {editingTVIdx === 'new' && (
                                <tr>
                                    <td>{thanhVienRows.length + 1}</td>
                                    <td><input className={`${styles.input} ${styles.tableInput}`} placeholder="Họ tên" value={editingTV.hoTen} onChange={e => setEditingTV(p => ({ ...p, hoTen: e.target.value }))} /></td>
                                    <td><input type="date" className={`${styles.input} ${styles.tableInput}`} value={editingTV.ngaySinh} onChange={e => setEditingTV(p => ({ ...p, ngaySinh: e.target.value }))} /></td>
                                    <td><input className={`${styles.input} ${styles.tableInput}`} placeholder="Số CCCD" value={editingTV.cccd} onChange={e => setEditingTV(p => ({ ...p, cccd: e.target.value }))} /></td>
                                    <td><select className={`${styles.select} ${styles.tableInput}`} value={editingTV.gioiTinh} onChange={e => setEditingTV(p => ({ ...p, gioiTinh: e.target.value }))}><option value=""></option><option value="Nam">Nam</option><option value="Nữ">Nữ</option></select></td>
                                    <td><select className={`${styles.select} ${styles.tableInput}`} value={editingTV.quocTich} onChange={e => setEditingTV(p => ({ ...p, quocTich: e.target.value }))}><option value=""></option><option value="Việt Nam">Việt Nam</option></select></td>
                                    <td><select className={`${styles.select} ${styles.tableInput}`} value={editingTV.danToc} onChange={e => setEditingTV(p => ({ ...p, danToc: e.target.value }))}><option value=""></option><option value="Kinh">Kinh</option><option value="Tày">Tày</option><option value="Thái">Thái</option><option value="Mường">Mường</option><option value="Khmer">Khmer</option><option value="Hoa">Hoa</option><option value="Nùng">Nùng</option><option value="H'Mông">H'Mông</option></select></td>
                                    <td><input className={`${styles.input} ${styles.tableInput}`} placeholder="Thường trú" value={editingTV.thuongTru || ''} onChange={e => setEditingTV(p => ({ ...p, thuongTru: e.target.value }))} /></td>
                                    <td><input className={`${styles.input} ${styles.tableInput}`} placeholder="Hiện tại" value={editingTV.hienTai || ''} onChange={e => setEditingTV(p => ({ ...p, hienTai: e.target.value }))} /></td>
                                    <td><input className={`${styles.input} ${styles.tableInput}`} placeholder="Chữ ký" value={editingTV.chuKy || ''} onChange={e => setEditingTV(p => ({ ...p, chuKy: e.target.value }))} /></td>
                                    <td><button type="button" className={styles.btnSave} onClick={handleSaveTV} disabled={isThanhVienEmpty(editingTV)}>Lưu</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Chủ hộ ── */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Chủ hộ kinh doanh:</h3>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên <span className={styles.required}>*</span></label>
                        <input type="text" className={styles.input} name="chuHo_ten" defaultValue={dataJson?.chuHo_ten || ''} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Họ và Tên <span className={styles.required}>*</span></label>
                        <input type="text" className={styles.input} name="chuHo_hoTen" defaultValue={dataJson?.chuHo_hoTen || ''} required />
                    </div>
                </div>
            </div>
        </form>
    );
});

export default GiayDeNghi;