import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Chuyển đổi một DOM element thành file PDF (Blob) với xử lý ngắt trang đúng chuẩn.
 *
 * Cách hoạt động:
 * 1. Render toàn bộ DOM element thành một canvas lớn (không giới hạn chiều cao).
 * 2. Cắt canvas thành từng trang A4 theo tỉ lệ thực tế.
 * 3. Ghép thành PDF và trả về Blob.
 *
 * @param {HTMLElement} element - DOM element cần chuyển thành PDF
 * @param {object} options
 * @param {string} [options.filename="document.pdf"] - Tên file PDF
 * @param {number} [options.scale=2] - Tỉ lệ render canvas (càng cao càng sắc nét)
 * @param {number[]} [options.margin=[10,10,10,10]] - Margin [top, right, bottom, left] (mm)
 * @returns {Promise<Blob>} PDF Blob
 */
export async function generatePdfBlob(element, options = {}) {
    const {
        scale = 2,
        margin = [10, 10, 10, 10], // [top, right, bottom, left] mm
    } = options;

    // Kích thước trang A4 theo mm
    const PAGE_WIDTH_MM = 210;
    const PAGE_HEIGHT_MM = 297;

    const marginTop = margin[0];
    const marginRight = margin[1];
    const marginBottom = margin[2];
    const marginLeft = margin[3];

    // Vùng in thực tế (mm)
    const contentWidthMm = PAGE_WIDTH_MM - marginLeft - marginRight;
    const contentHeightMm = PAGE_HEIGHT_MM - marginTop - marginBottom;

    // Render toàn bộ element thành canvas (không clip chiều cao)
    const canvas = await html2canvas(element, {
        scale,
        useCORS: true,
        logging: false,
        // Quan trọng: render đủ chiều cao thực tế
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
    });

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Tính tỉ lệ: chiều rộng canvas -> contentWidthMm
    const ratio = contentWidthMm / imgWidth; // mm/px

    // Chiều cao nội dung tổng (mm)
    const totalHeightMm = imgHeight * ratio;

    // Số trang cần thiết
    const totalPages = Math.ceil(totalHeightMm / contentHeightMm);

    // Tạo jsPDF
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
    });

    // Vẽ từng trang
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        if (pageIndex > 0) {
            pdf.addPage();
        }

        // Vị trí bắt đầu của trang này (tính theo px trên canvas)
        const srcY = (pageIndex * contentHeightMm) / ratio; // px
        // Chiều cao trang này (px) - trang cuối có thể ngắn hơn
        const srcH = Math.min(contentHeightMm / ratio, imgHeight - srcY); // px

        if (srcH <= 0) break;

        // Cắt canvas cho trang này
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgWidth;
        pageCanvas.height = Math.round(srcH);

        const ctx = pageCanvas.getContext("2d");
        ctx.drawImage(
            canvas,
            0,
            Math.round(srcY),      // source x, y
            imgWidth,
            Math.round(srcH),      // source width, height
            0,
            0,                     // dest x, y
            imgWidth,
            Math.round(srcH)       // dest width, height
        );

        const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.95);

        // Chiều cao thực của đoạn canvas này (mm)
        const destH = srcH * ratio;

        // Vẽ vào PDF
        pdf.addImage(
            pageImgData,
            "JPEG",
            marginLeft,
            marginTop,
            contentWidthMm,
            destH
        );
    }

    return pdf.output("blob");
}
