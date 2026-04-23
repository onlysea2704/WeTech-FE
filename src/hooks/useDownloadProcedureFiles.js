import { useState, useEffect } from "react";
import { authAxios } from "@/services/axios-instance";
import { downloadFile as downloadFileUtil } from "@/utils/downloadFile";

/**
 * Hook tải file hồ sơ (PDF hoặc DOCX).
 *
 * @param {string|number} procedureId  - ID của thủ tục
 * @param {object}        options
 * @param {string}        options.format        - "pdf" | "docx" (default: "pdf")
 * @param {boolean}       options.autoFetch     - Tự động fetch danh sách file khi mount/đổi format (default: true)
 * @param {string}        options.zipFileName   - Tên file ZIP khi tải tất cả (default: "ho_so.zip")
 */
export function useDownloadProcedureFiles(procedureId, options = {}) {
    const { format = "pdf", autoFetch = true, zipFileName = "ho_so.zip" } = options;

    const [fileUrls, setFileUrls] = useState([]);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const [downloadingAll, setDownloadingAll] = useState(false);
    const [downloadingId, setDownloadingId] = useState(null); // dùng cho tải từng file riêng lẻ

    // ─── Fetch danh sách URL file theo format ─────────────────────────────────
    const fetchFileUrls = async () => {
        if (!procedureId) return;
        setLoadingFiles(true);
        setFileUrls([]);
        try {
            const res = await authAxios.get("/api/form-submission/get/all-file-urls", {
                params: { procedureId, fileType: format },
            });
            const data = res.data;

            if (Array.isArray(data)) {
                setFileUrls(
                    data.map((item, idx) => {
                        if (typeof item === "string") {
                            let name = `Tài liệu ${idx + 1}`;
                            if (item.includes("-")) {
                                name = item.split("-").slice(1).join("-").split(".")[0];
                            }
                            return { url: item, name };
                        }
                        return item;
                    }),
                );
            } else if (typeof data === "object" && data !== null) {
                setFileUrls(Object.entries(data).map(([name, url]) => ({ name, url })));
            } else if (typeof data === "string" && data.length > 0) {
                setFileUrls([{ url: data, name: `File ${format.toUpperCase()}` }]);
            }
        } catch (err) {
            console.error(`Lỗi lấy danh sách ${format.toUpperCase()}: `, err);
        } finally {
            setLoadingFiles(false);
        }
    };

    useEffect(() => {
        if (autoFetch) {
            fetchFileUrls();
        }
    }, [procedureId, format, autoFetch]);

    // ─── Tải một file đơn lẻ ──────────────────────────────────────────────────
    const downloadFile = async (url, name) => {
        const ext = format === "docx" ? "docx" : "pdf";
        const fileName = name ? `${name}.${ext}` : `download.${ext}`;
        await downloadFileUtil(url, fileName);
    };

    // ─── Tải tất cả file dưới dạng ZIP ────────────────────────────────────────
    const downloadAllAsZip = async (customZipName) => {
        if (!procedureId) return;
        try {
            setDownloadingAll(true);
            const response = await authAxios.get("/api/procedurer/download-files", {
                params: { procedureId, fileType: format },
                responseType: "blob",
            });

            const blob = new Blob([response.data], { type: "application/zip" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = typeof customZipName === "string" ? customZipName : zipFileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Lỗi tải tất cả file:", error);
        } finally {
            setDownloadingAll(false);
        }
    };

    // ─── Tải ZIP theo procedureId bên ngoài (dùng cho SearchProcedure) ────────
    const downloadZipById = async (id, fallbackName = "ho_so.zip") => {
        try {
            setDownloadingId(id);
            const response = await authAxios.get("/api/procedurer/download-files", {
                params: { procedureId: id, fileType: format },
                responseType: "blob",
            });

            const blob = new Blob([response.data], { type: "application/zip" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fallbackName.endsWith(".zip") ? fallbackName : `${fallbackName}.zip`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Lỗi tải file:", error);
        } finally {
            setDownloadingId(null);
        }
    };

    return {
        fileUrls,
        loadingFiles,
        downloadingAll,
        downloadingId,
        fetchFileUrls,
        downloadFile,
        downloadAllAsZip,
        downloadZipById,
    };
}
