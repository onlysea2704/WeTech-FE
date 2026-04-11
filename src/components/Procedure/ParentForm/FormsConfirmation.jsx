import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { generateHtmlFile } from "@/utils/generateHtmlFile";
import { authAxios } from "@/services/axios-instance";
import styles from "./DeclarationForms.module.css";

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
        submitCurrentForm: async (landscape = false) => {
            if (!pdfContentRef.current) return;

            try {
                const element = pdfContentRef.current;
                const filename = `${currentForm.code || "form"}.html`;

                // Chuyển toàn bộ nội dung form đã render thành file HTML chuẩn.
                // Server sẽ dùng file HTML này để sinh PDF (puppeteer, wkhtmltopdf, ...).
                // CSS Modules (hash class) được tự động thu thập từ stylesheets của trang
                // và nhúng inline vào <style> bên trong <head> — đảm bảo layout đúng.
                const htmlFile = generateHtmlFile(element, filename, {
                    title: currentForm.code || "Biểu mẫu",
                    landscape,
                });
                console.log("htmlFile:", htmlFile);

                // Gửi FormData lên server
                const formData = new FormData();
                formData.append("formId", currentForm.formId);
                formData.append("htmlFile", htmlFile);
                formData.append("landscape", landscape);

                await authAxios.post("/api/form-submission/confirm", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (onStepSubmitSuccess) {
                    onStepSubmitSuccess();
                }
            } catch (err) {
                console.error("Error saving HTML and confirming form:", err);
            }
        },
    }));

    if (!currentForm) {
        return <div style={{ padding: "40px", textAlign: "center" }}>Đang tải biểu mẫu...</div>;
    }

    return (
        <div className={styles.container}>
            {CurrentFormComponent ? (
                // Wrapper ref để generateHtmlFile đọc nội dung đã render
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
