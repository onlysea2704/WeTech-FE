/**
 * Chuyển đổi một DOM element đã được render thành chuỗi HTML hoàn chỉnh,
 * có nhúng toàn bộ CSS của trang (bao gồm CSS Modules).
 *
 * Mục đích: gửi lên server để server dùng thư viện (puppeteer, wkhtmltopdf, ...)
 * sinh file PDF chất lượng cao, tránh vỡ layout do render phía client.
 *
 * @param {HTMLElement} element - DOM element đã render
 * @param {object}  [options]
 * @param {string}  [options.title="Biểu mẫu"] - Tiêu đề tài liệu HTML
 * @param {string}  [options.lang="vi"]         - Thuộc tính lang của <html>
 * @param {boolean} [options.landscape=false]   - Orientation PDF (true = landscape, false = portrait)
 * @returns {string} Chuỗi HTML đầy đủ (<!DOCTYPE html> ... </html>)
 */
export function generateHtmlString(element, options = {}) {
  const { title = "Biểu mẫu", lang = "vi", landscape = false } = options;

  // ── 1. Lấy HTML nội dung đã render ────────────────────────────────────
  const bodyHtml = element.outerHTML;
  console.log("bodyHtml:", bodyHtml)
  // ── 2. Thu thập toàn bộ CSS hiện có trên trang ────────────────────────
  //       Bao gồm CSS Modules (đã được hash class name và inject vào DOM).
  let cssText = "";
  try {
    for (const sheet of document.styleSheets) {
      try {
        const rules = sheet.cssRules || sheet.rules;
        if (!rules) continue;
        for (const rule of rules) {
          cssText += rule.cssText + "\n";
        }
      } catch {
        // Stylesheet cross-origin (CDN, external) — bỏ qua, tránh lỗi SecurityError
      }
    }
  } catch (err) {
    console.warn("[generateHtmlFile] Không thể đọc stylesheets:", err);
  }

  // ── 3. Tạo HTML document hoàn chỉnh ───────────────────────────────────
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="pdf-orientation" content="${landscape ? "landscape" : "portrait"}" />
  <title>${title}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      background: #fff;
      color: #000;
      font-family: 'Times New Roman', Times, serif;
      font-size: 14pt;
      line-height: 1.5;
    }

    ${cssText}
  </style>
</head>
<body>
  ${bodyHtml}
</body>
</html>`;
}

/**
 * Tạo đối tượng File HTML từ một DOM element, sẵn sàng để append vào FormData.
 *
 * @param {HTMLElement} element  - DOM element đã render
 * @param {string}      filename - Tên file, ví dụ: "GiayDeNghi.html"
 * @param {object}      [options] - Truyền thêm cho generateHtmlString
 * @param {boolean}     [options.landscape=false] - Orientation PDF (true = landscape, false = portrait)
 * @returns {File} File HTML (type: "text/html")
 */
export function generateHtmlFile(element, filename, options = {}) {
  const htmlString = generateHtmlString(element, { title: filename, ...options });
  console.log("htmlString:", htmlString)
  const blob = new Blob([htmlString], { type: "text/html; charset=utf-8" });
  return new File([blob], filename, { type: "text/html" });
}
