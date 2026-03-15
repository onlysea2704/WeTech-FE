import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import * as XLSX from 'xlsx';
import styles from './DeclarationForms.module.css';
import { authAxios } from '../../services/axios-instance';

import {
    NGANH_NGHE_HEADERS,
    THANH_VIEN_HEADERS,
    SENTINEL_NGANH,
    SENTINEL_TV,
    FIELD_LABEL_MAP_DENGHI,
    SECTION_FIELD_MAP_DENGHI,
    FIELD_LABEL_MAP_UYQUYEN,
    SECTION_FIELD_MAP_UYQUYEN
} from './FormExcelConstants';

const DeclarationForms = forwardRef(({ forms, currentFormStep = 0, onStepSubmitSuccess }, ref) => {
    const [dataJson, setDataJson] = useState(null);
    const [importKey, setImportKey] = useState(0);
    const formRef = useRef(null);
    const componentRef = useRef(null); 
    const importInputRef = useRef(null);

    const currentForm = forms?.[currentFormStep];
    const CurrentFormComponent = currentForm?.declaration;

    const isUyQuyen = currentForm?.name?.toLowerCase().includes('uỷ quyền') || currentForm?.name?.toLowerCase().includes('ủy quyền');

    useEffect(() => {
        async function fetchFormSubmission() {
            if (!currentForm?.formId) return;
            setDataJson(null);
            try {
                const response = await authAxios.get(`/api/form-submission/get/data-json`, {
                    params: { formId: currentForm.formId }
                });
                setDataJson(response.data);
            } catch (error) {
                setDataJson(null);
                console.error('Error fetching form submission:', error);
            }
        }
        fetchFormSubmission();
    }, [currentForm?.formId]);

    // ── AUTO SAVE (on tab close/leave) ──────────────────────────────────────
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden' && componentRef.current?.getDraftData && currentForm?.formId) {
                const draftData = componentRef.current.getDraftData();
                if (draftData) {
                    const token = sessionStorage.getItem("authToken");
                    if (token) {
                        const isUpdate = !!dataJson;
                        const url = `${process.env.REACT_APP_BACKEND_URL}/api/form-submission/${isUpdate ? 'update' : 'create'}`;
                        fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            keepalive: true,
                            body: JSON.stringify({ formId: currentForm.formId, dataJson: draftData })
                        }).catch(console.error);
                    }
                }
            }
        };
        window.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('pagehide', handleVisibilityChange);
        return () => {
            window.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('pagehide', handleVisibilityChange);
        };
    }, [currentForm?.formId, dataJson]);

    async function handleFormSubmission(data) {
        try {
            if (dataJson) {
                await authAxios.post('/api/form-submission/update', { formId: currentForm.formId, dataJson: data });
            } else {
                await authAxios.post('/api/form-submission/create', { formId: currentForm.formId, dataJson: data });
            }
            setDataJson(data);
            if (onStepSubmitSuccess) onStepSubmitSuccess();
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    }

    // ── EXPORT ──────────────────────────────────────────────────────────────
    const handleExportExcel = () => {
        let liveData = null;
        if (componentRef.current?.getExportData) {
            liveData = componentRef.current.getExportData();
            if (!liveData) return; // Validation failed (native HTML5 block)
        }

        const src = { ...(dataJson || {}), ...(liveData || {}) };
        const rows = [];
        rows.push(['Trường thông tin', 'Giá trị']);

        if (isUyQuyen) {
            rows.push(['[BÊN UỶ QUYỀN]', '']);
            rows.push(['Họ và tên (*)', src.uyQuyen_hoTen || '']);
            rows.push(['Ngày sinh (*) (yyyy-mm-dd)', src.uyQuyen_ngaySinh || '']);
            rows.push(['Giới tính (*) (Nam/Nữ)', src.uyQuyen_gioiTinh || '']);
            rows.push(['Số định danh cá nhân (*)', src.uyQuyen_cccd || '']);
            rows.push(['Điện thoại liên hệ (*)', src.uyQuyen_phone || '']);
            rows.push(['Email', src.uyQuyen_email || '']);

            rows.push(['[ĐỊA CHỈ LIÊN LẠC]', '']);
            rows.push(['Tỉnh/Thành phố', src.uyQuyen_tinh || '']);
            rows.push(['Xã/Phường', src.uyQuyen_xa || '']);
            rows.push(['Số nhà, đường', src.uyQuyen_soNha || '']);

            rows.push(['[THÔNG TIN KHÁC]', '']);
            rows.push(['Tên chủ hộ', src.chuHo_ten || '']);
            rows.push(['Phường/Xã chủ hộ', src.chuHo_xa_phuong || '']);
        } else {
            rows.push(['[THÔNG TIN NGƯỜI ĐẠI DIỆN]', '']);
            rows.push(['Họ và tên (*)', src.nguoiDaiDien_hoTen || '']);
            rows.push(['Ngày sinh (*) (yyyy-mm-dd)', src.nguoiDaiDien_ngaySinh || '']);
            rows.push(['Giới tính (*) (Nam/Nữ)', src.nguoiDaiDien_gioiTinh || '']);
            rows.push(['Số định danh cá nhân (*)', src.nguoiDaiDien_cccd || '']);
            rows.push(['Dân tộc (*)', src.nguoiDaiDien_danToc || '']);
            rows.push(['Quốc tịch (*)', src.nguoiDaiDien_quocTich || '']);
            rows.push(['Điện thoại liên hệ (*)', src.nguoiDaiDien_phone || '']);
            rows.push(['Email', src.nguoiDaiDien_email || '']);

            rows.push(['[NƠI THƯỜNG TRÚ]', '']);
            rows.push(['Tỉnh/Thành phố', src.thuongTru_tinh || '']);
            rows.push(['Xã/Phường', src.thuongTru_xa || '']);
            rows.push(['Số nhà, đường', src.thuongTru_soNha || '']);

            rows.push(['[NƠI Ở HIỆN TẠI]', '']);
            rows.push(['Tỉnh/Thành phố', src.hienTai_tinh || '']);
            rows.push(['Xã/Phường', src.hienTai_xa || '']);
            rows.push(['Số nhà, đường', src.hienTai_soNha || '']);

            rows.push(['[TÊN HỘ KINH DOANH]', '']);
            rows.push(['Tên tiếng Việt (*)', src.hkd_tenVN || '']);
            rows.push(['Tên tiếng nước ngoài', src.hkd_tenEN || '']);
            rows.push(['Tên viết tắt', src.hkd_tenVietTat || '']);

            rows.push(['[TRỤ SỞ]', '']);
            rows.push(['Tỉnh/Thành phố', src.truSo_tinh || '']);
            rows.push(['Xã/Phường', src.truSo_xa || '']);
            rows.push(['Số nhà, đường', src.truSo_soNha || '']);
            rows.push(['Điện thoại trụ sở (*)', src.truSo_phone || '']);
            rows.push(['Email trụ sở', src.truSo_email || '']);

            rows.push(['[VỐN KINH DOANH]', '']);
            rows.push(['Vốn kinh doanh (số, VNĐ) (*)', src.vonKinhDoanh || '']);
            rows.push(['Vốn kinh doanh (bằng chữ)', src.vonKinhDoanh_bangChu || '']);

            rows.push(['[THÔNG TIN KHÁC]', '']);
            rows.push(['Kính gửi', src.kinhGui || '']);
            rows.push(['Địa chỉ thuế - Tỉnh/Thành phố', src.thue_tinh || '']);
            rows.push(['Địa chỉ thuế - Xã/Phường', src.thue_xa || '']);
            rows.push(['Địa chỉ thuế - Số nhà, đường', src.thue_soNha || '']);
            rows.push(['Điện thoại thuế', src.thue_phone || '']);
            rows.push(['Email thuế', src.thue_email || '']);
            rows.push(['Ngày bắt đầu hoạt động (yyyy-mm-dd)', src.ngayBatDau || '']);
            rows.push(['Tổng số lao động (dự kiến)', src.soLaoDong || '']);
            rows.push(['Phương pháp thuế GTGT (ke_khai/khoan)', src.vatMethod || 'khoan']);
            rows.push(['Chủ thể thành lập (ca_nhan/thanh_vien_gd)', src.subject || 'ca_nhan']);

            rows.push(['[CHỦ HỘ KINH DOANH]', '']);
            rows.push(['Tên (*)', src.chuHo_ten || '']);
            rows.push(['Họ và Tên (*)', src.chuHo_hoTen || '']);

            rows.push(['', '']);
            rows.push([SENTINEL_NGANH, '']);
            rows.push(NGANH_NGHE_HEADERS);
            const nganhList = src.nganhNgheList || [];
            nganhList.forEach((r, i) => rows.push([i + 1, r.tenNganh || '', r.chiTiet || '', r.maNganh || '', r.laNganhChinh ? 'Có' : '']));

            rows.push(['', '']);
            rows.push([SENTINEL_TV, '']);
            rows.push(THANH_VIEN_HEADERS);
            const tvList = src.thanhVienList || [];
            tvList.forEach((r, i) => rows.push([i + 1, r.hoTen || '', r.ngaySinh || '', r.cccd || '', r.gioiTinh || '', r.quocTich || '', r.danToc || '', r.thuongTru || '', r.hienTai || '', r.chuKy || '']));
        }

        const ws = XLSX.utils.aoa_to_sheet(rows);
        ws['!cols'] = [{ wch: 45 }, { wch: 35 }, { wch: 30 }, { wch: 12 }, { wch: 25 }, { wch: 12 }, { wch: 10 }, { wch: 20 }, { wch: 20 }, { wch: 12 }];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'HoSo');

        const formName = currentForm?.name || 'form';
        XLSX.writeFile(wb, `mẫu_${formName.toLowerCase().replace(/\s+/g, '_')}.xlsx`);
    };

    // ── IMPORT ──────────────────────────────────────────────────────────────
    const handleImportExcel = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            const wb = XLSX.read(evt.target.result, { type: 'array' });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const allRows = XLSX.utils.sheet_to_json(ws, { header: 1 });

            const importedData = {};
            let currentSection = '';
            let mode = 'kv'; // 'kv' | 'nganh' | 'tv'

            const LABEL_MAP = isUyQuyen ? FIELD_LABEL_MAP_UYQUYEN : FIELD_LABEL_MAP_DENGHI;
            const SECTION_MAP = isUyQuyen ? SECTION_FIELD_MAP_UYQUYEN : SECTION_FIELD_MAP_DENGHI;

            for (const row of allRows) {
                const col0 = row[0] !== undefined ? String(row[0]).trim() : '';

                if (!isUyQuyen) {
                    if (col0 === SENTINEL_NGANH) { mode = 'nganh'; importedData.nganhNgheList = []; continue; }
                    if (col0 === SENTINEL_TV) { mode = 'tv'; importedData.thanhVienList = []; continue; }

                    if (mode === 'nganh') {
                        if (col0 === 'STT') continue;
                        if (!row[1]) continue;
                        importedData.nganhNgheList.push({
                            tenNganh: String(row[1] || ''), chiTiet: String(row[2] || ''), maNganh: String(row[3] || ''), laNganhChinh: String(row[4] || '').trim().toLowerCase() === 'có',
                        });
                        continue;
                    }

                    if (mode === 'tv') {
                        if (col0 === 'STT') continue;
                        if (!row[1]) continue;
                        importedData.thanhVienList.push({
                            hoTen: String(row[1] || ''), ngaySinh: String(row[2] || ''), cccd: String(row[3] || ''), gioiTinh: String(row[4] || ''), quocTich: String(row[5] || ''), danToc: String(row[6] || ''), thuongTru: String(row[7] || ''), hienTai: String(row[8] || ''), chuKy: String(row[9] || ''),
                        });
                        continue;
                    }
                }

                if (!col0) continue;

                // Detect exact section headers like [NƠI THƯỜNG TRÚ] 
                const sectionMatch = col0.match(/^\[(.+)\]$/);
                if (sectionMatch) { currentSection = sectionMatch[1].trim(); continue; }

                const value = row[1] !== undefined && row[1] !== null ? String(row[1]) : '';

                const sMap = SECTION_MAP[currentSection];
                if (sMap && sMap[col0]) {
                    importedData[sMap[col0]] = value;
                    continue;
                }

                const key = LABEL_MAP[col0];
                if (key) importedData[key] = value;
            }

            if (componentRef.current?.importData) {
                componentRef.current.importData(importedData);
            }
            setDataJson(prev => ({ ...(prev || {}), ...importedData }));
            setImportKey(k => k + 1);
        };
        reader.readAsArrayBuffer(file);
        e.target.value = '';
    };

    useImperativeHandle(ref, () => ({
        submitCurrentForm: () => {
            if (formRef.current) {
                formRef.current.requestSubmit();
            }
        },
        exportExcel: () => handleExportExcel(),
        importExcel: () => importInputRef.current?.click(),
    }));

    if (!currentForm) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải biểu mẫu...</div>;
    }

    return (
        <div className={styles.container}>
            <input
                ref={importInputRef}
                type="file"
                accept=".xlsx,.xls"
                style={{ display: 'none' }}
                onChange={handleImportExcel}
            />
            <h2 className={styles.mainTitle}>THÔNG TIN CHI TIẾT {currentForm?.name?.toUpperCase()}</h2>
            {CurrentFormComponent ? (
                <CurrentFormComponent
                    key={`form_${currentForm.formId}_${importKey}`}
                    ref={componentRef}
                    formRef={formRef}
                    formId={currentForm.formId}
                    dataJson={dataJson}
                    onSubmit={handleFormSubmission}
                />
            ) : (
                <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải biểu mẫu...</div>
            )}
        </div>
    );
});

DeclarationForms.displayName = 'DeclarationForms';
export default DeclarationForms;