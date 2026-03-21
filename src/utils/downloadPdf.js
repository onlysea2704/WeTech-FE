export const downloadPdf = async (urlSource, fallbackName = "document.pdf") => {
    let url = urlSource;
    if (urlSource && typeof urlSource === "object") {
        url = urlSource.url || urlSource.fileUrl || urlSource.link;
    }

    if (!url || typeof url !== "string") {
        console.error("Lỗi khi tải file PDF: invalid url provided.", urlSource);
        return;
    }

    if (url.toLowerCase().endsWith(".pdf") || url.includes(".pdf?")) {
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
            console.error("Lỗi khi tải bản PDF:", error);
            window.open(url, "_blank");
        }
    } else {
        window.open(url, "_blank");
    }
};
