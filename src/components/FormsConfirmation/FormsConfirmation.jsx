import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import html2pdf from "html2pdf.js";
import { authAxios } from "../../services/axios-instance";
import styles from "../DeclarationForms/DeclarationForms.module.css";

const FormsConfirmation = forwardRef(({ forms, currentFormStep = 0, onStepSubmitSuccess }, ref) => {
    const [dataJson, setDataJson] = useState(null);
    const pdfContentRef = useRef(null);

    const currentForm = forms?.[currentFormStep];
    const CurrentFormComponent = currentForm?.confirmation;

    useEffect(() => {
        async function fetchFormSubmission() {
            if (!currentForm?.formId) return;
            setDataJson(null);
            try {
                const response = await authAxios.get(`/api/form-submission/get/data-json`, {
                    params: { formId: currentForm.formId },
                });
                setDataJson(response.data);
            } catch (error) {
                setDataJson(null);
                console.error("Error fetching form submission for confirmation:", error);
            }
        }
        fetchFormSubmission();
    }, [currentForm?.formId]);

    // Expose submitCurrentForm
    useImperativeHandle(ref, () => ({
        submitCurrentForm: async () => {
            if (!pdfContentRef.current) return;

            try {
                const element = pdfContentRef.current;

                // Cấu hình html2pdf để xuất chất lượng tốt, có margin và tránh bị cắt nội dung
                const opt = {
                    margin: [10, 10, 15, 10], // [top, right, bottom, left] - đơn vị mm, bottom 15 để tránh nội dung dính vào rìa trang
                    filename: `${currentForm.code || "form"}.pdf`,
                    image: { type: "jpeg", quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true, logging: false },
                    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
                    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
                };

                // Generate PDF dưới dạng blob
                const pdfBlob = await html2pdf().set(opt).from(element).output("blob");

                // Tạo file từ blob
                const pdfFile = new File([pdfBlob], opt.filename, { type: "application/pdf" });

                // Gửi form data
                const formData = new FormData();
                formData.append("formId", currentForm.formId);
                formData.append("pdfFile", pdfFile);

                await authAxios.post("/api/form-submission/confirm", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (onStepSubmitSuccess) {
                    onStepSubmitSuccess();
                }
            } catch (err) {
                console.error("Error saving PDF and confirming form:", err);
                // Handle error suitably
            }
        },
    }));

    if (!currentForm) {
        return <div style={{ padding: "40px", textAlign: "center" }}>Đang tải biểu mẫu...</div>;
    }

    return (
        <div className={styles.container}>
            {CurrentFormComponent ? (
                // Wrapper ref để html2pdf bắt gọn content của form
                <div ref={pdfContentRef}>
                    <CurrentFormComponent dataJson={dataJson} />
                </div>
            ) : (
                <div style={{ padding: "40px", textAlign: "center" }}>Không tìm thấy mẫu xác nhận...</div>
            )}
        </div>
    );
});

FormsConfirmation.displayName = "FormsConfirmation";
export default FormsConfirmation;
