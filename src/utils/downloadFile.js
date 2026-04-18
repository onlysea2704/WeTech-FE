export const downloadFile = async (urlSource, fallbackName = "document.pdf") => {
    let url = urlSource;
    if (urlSource && typeof urlSource === "object") {
        url = urlSource.url || urlSource.fileUrl || urlSource.link;
    }

    if (!url || typeof url !== "string") {
        console.error("Lỗi khi tải file PDF: invalid url provided.", urlSource);
        return;
    }

    if (
        url.toLowerCase().endsWith(".pdf") || url.includes(".pdf?") ||
        url.toLowerCase().endsWith(".docx") || url.includes(".docx?") ||
        url.toLowerCase().endsWith(".doc") || url.includes(".doc?") ||
        fallbackName.toLowerCase().endsWith(".pdf") ||
        fallbackName.toLowerCase().endsWith(".docx") ||
        fallbackName.toLowerCase().endsWith(".doc")
    ) {
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = fallbackName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Lỗi khi tải file:", error);
            window.open(url, "_self");
        }
    } else {
        window.open(url, "_self");
    }
};
