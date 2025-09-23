import React, { useState } from "react";
import "./ManageDocs.css";

export default function ManageDocs() {
    const [sections, setSections] = useState([
        {
            id: Date.now(),
            title: "Phần 1: Giới thiệu",
            documents: [],
        },
    ]);

    // thêm 1 phần
    const addSection = () => {
        const newSection = {
            id: Date.now(),
            title: `Phần ${sections.length + 1}`,
            documents: [],
        };
        setSections([...sections, newSection]);
    };

    // xóa phần
    const deleteSection = (sectionId) => {
        setSections(sections.filter((s) => s.id !== sectionId));
    };

    // thêm tài liệu
    const addDocument = (sectionId) => {
        setSections(
            sections.map((s) =>
                s.id === sectionId
                    ? {
                        ...s,
                        documents: [
                            ...s.documents,
                            { id: Date.now(), title: "", file: null, url: "" },
                        ],
                    }
                    : s
            )
        );
    };

    // xóa tài liệu
    const deleteDocument = (sectionId, docId) => {
        setSections(
            sections.map((s) =>
                s.id === sectionId
                    ? { ...s, documents: s.documents.filter((d) => d.id !== docId) }
                    : s
            )
        );
    };

    // cập nhật tiêu đề phần
    const updateTitle = (sectionId, newTitle) => {
        setSections(
            sections.map((s) =>
                s.id === sectionId ? { ...s, title: newTitle } : s
            )
        );
    };

    // cập nhật tài liệu
    // const updateDocument = (sectionId, docId, field, value) => {
    //     console.log(field);
    //     console.log(value);
    //     console.log(sectionId);
    //     console.log(sections);
    //     const newSections = sections.map((s) =>
    //         s.id === sectionId
    //             ? {
    //                 ...s,
    //                 documents: s.documents.map((d) =>
    //                     d.id === docId ? { ...d, [field]: value } : d
    //                 ),
    //             }
    //             : s
    //     );
    //     setSections(newSections);
    // };

    // cập nhật tài liệu
    const updateDocument = (sectionId, docId, file, url) => {
        const newSections = sections.map((s) =>
            s.id === sectionId
                ? {
                    ...s,
                    documents: s.documents.map((d) =>
                        d.id === docId ? { ...d, "file": file, "url": url, "title": file.name } : d
                    ),
                }
                : s
        );
        setSections(newSections);
    };

    // hàm tải file
    const downloadFile = (file, filename) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    return (
        <div className="course-content-manager">
            {sections.map((section) => (
                <div key={section.id} className="section">
                    <div className="section-header">
                        <input
                            className="input-text"
                            type="text"
                            value={section.title}
                            onChange={(e) => updateTitle(section.id, e.target.value)}
                            placeholder="Tên phần..."
                        />
                        <div className="section-actions">
                            <button className="btn update">
                                <i className="fa-solid fa-pen-to-square"></i> Cập nhật
                            </button>
                            <button
                                className="btn delete"
                                onClick={() => deleteSection(section.id)}
                            >
                                <i className="fa-solid fa-trash"></i> Xóa phần
                            </button>
                        </div>
                    </div>

                    <div className="documents">
                        {section.documents.map((document) => (
                            <div key={document.id} className="document">
                                <div className="document-row">
                                    <input
                                        className="input-text"
                                        type="text"
                                        value={document.title}
                                        // onChange={(e) =>
                                        //     updateDocument(section.id, document.id, "title", e.target.value)
                                        // }
                                        placeholder="Tiêu đề tài liệu..."
                                    />

                                    <div className="upload-wrapper">
                                        <input
                                            id={`upload-${document.id}`}
                                            className="input-file"
                                            type="file"
                                            accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    // updateDocument(section.id, document.id, "file", file);
                                                    // updateDocument(section.id, document.id, "url", URL.createObjectURL(file));
                                                    updateDocument(section.id, document.id, file, URL.createObjectURL(file));
                                                }
                                            }}
                                        />
                                        <label htmlFor={`upload-${document.id}`} className="btn upload-btn">
                                            <i className="fa-solid fa-file-arrow-up"></i> Upload
                                        </label>
                                        {/* {document.file && <span className="file-name">{document.file.name}</span>} */}
                                    </div>

                                    <div className="document-actions">
                                        <button className="btn update">
                                            <i className="fa-solid fa-pen-to-square"></i> Cập nhật
                                        </button>
                                        <button
                                            className="btn delete"
                                            onClick={() => deleteDocument(section.id, document.id)}
                                        >
                                            <i className="fa-solid fa-trash"></i> Xóa
                                        </button>
                                    </div>
                                </div>

                                {/* Link tải xuống thay vì preview */}
                                {document.url && (
                                    <div className="download-link-container">
                                        <a
                                            href={document.url}
                                            download={document.file ? document.file.name : `document-${document.id}`}
                                            className="download-link"
                                            onClick={(e) => {
                                                if (document.file) {
                                                    e.preventDefault();
                                                    downloadFile(document.file, document.file.name);
                                                } else {
                                                    // Nếu không có file (chỉ có URL), cho phép tải theo mặc định
                                                }
                                            }}
                                        >
                                            <i className="fa-solid fa-download"></i> Tải xuống
                                        </a>

                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button className="btn add" onClick={() => addDocument(section.id)}>
                        + Thêm tài liệu
                    </button>
                </div>
            ))}

            <button className="btn add-section" onClick={addSection}>
                + Thêm phần
            </button>
        </div>
    );
}