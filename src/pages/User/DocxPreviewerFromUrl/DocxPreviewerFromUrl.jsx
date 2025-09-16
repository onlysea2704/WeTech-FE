import React, { useEffect, useRef } from "react";
import { renderAsync } from "docx-preview";

export default function DocxPreviewerFromUrl() {
  const containerRef = useRef(null);

  useEffect(() => {
    const loadDocx = async () => {
      try {
        // Link online file .docx
        const url = "https://res.cloudinary.com/dggpj05f2/raw/upload/v1757788371/20250914_013246luyenfull.docx";  
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();

        // Render DOCX vào container
        renderAsync(buffer, containerRef.current);
      } catch (error) {
        console.error("Lỗi khi tải file:", error);
      }
    };

    loadDocx();
  }, []);

  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">Xem file Word online</h2>
      <div
        ref={containerRef}
        className="p-4 border rounded bg-white"
        style={{ minHeight: "500px" }}
      />
    </div>
  );
}
