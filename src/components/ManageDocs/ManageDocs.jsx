import React, { useState, useEffect } from "react";
import "./ManageDocs.css";
import { authAxios, publicAxios } from "../../services/axios-instance";
import { useParams, useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";


export default function ManageDocs() {

    const { courseId } = useParams();
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCourseDocument = async () => {
        try {
            const res = await publicAxios.get(
                `/api/document/find-by-courseId?courseId=${courseId}`
            );
            setSections(res.data || []);
            console.log("Fetched course content:", res.data);
        } catch (error) {
            console.error("Error fetching course content:", error);
            setSections([]); // fallback tránh lỗi khi render
        }
    };

    // Fetch dữ liệu từ API
    useEffect(() => {
        fetchCourseDocument();
    }, [courseId]);

    // === Section CRUD ===
    const addSection = async () => {
        try {
            const res = await authAxios.post("/api/section/create", {
                courseId,
                name: `Phần ${sections.length + 1}`,
            });
            console.log("Created section:", res.data);
            fetchCourseDocument();
        } catch (err) {
            console.error("Error creating section:", err);
        }
    };
    const updateSection = async (section) => {
        try {
            await authAxios.post(
                `/api/section/update?sectionId=${section.sectionId}`,
                section
            );
            fetchCourseDocument();
        } catch (err) {
            console.error("Error updating section:", err);
        }
    };
    const deleteSection = async (sectionId) => {
        try {
            await authAxios.post(`/api/section/delete?sectionId=${sectionId}`);
            fetchCourseDocument();
        } catch (err) {
            console.error("Error deleting section:", err);
        }
    };


    // Document CRUD
    const addDocument = async (sectionId) => {
        try {
            const res = await authAxios.get(`/api/document/create?sectionId=${sectionId}`);
            console.log("Created document:", res.data);
            fetchCourseDocument();
        } catch (err) {
            console.error("Error adding video:", err);
        }
    };
    const updateDocument = async (documentInfo, file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append(
            "documentInfo",
            new Blob([JSON.stringify(documentInfo)], { type: "application/json" })
        );
        formData.append("document", file);

        try {
            const res = await authAxios.post("/api/document/update", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Updated document:", res.data);
            fetchCourseDocument();
        } catch (err) {
            console.error("Error updating document:", err);
        }
        setLoading(false);
    };
    const deleteDocument = async (documentId) => {
        const res = await authAxios.post(`/api/document/delete?documentId=${documentId}`);
        console.log("Deleted document:", res.data);
        fetchCourseDocument();
    };

    // Cập nhật tiêu đề phần và tài liệu
    const onChangeTitleSection = (sectionId, newTitle) => {
        setSections(
            sections.map((s) =>
                s.sectionId === sectionId ? { ...s, name: newTitle } : s
            )
        );
    };
    const onChangeTitleDocument = (sectionId, documentId, newTitle) => {
        console.log(123)
        setSections(
            sections.map((s) =>
                s.sectionId === sectionId
                    ? {
                        ...s,
                        documentSections: s.documentSections.map((d) =>
                            d.documentId === documentId ? { ...d, name: newTitle } : d
                        ),
                    }
                    : s
            )
        );
    };
    const onChangeFileDocument = (sectionId, docId, file, url) => {
        console.log("Updated document in state:");

        const newSections = sections?.map((s) =>
            s.sectionId === sectionId
                ? {
                    ...s,
                    documentSections: s.documentSections.map((d) =>
                        d.documentId === docId ? { ...d, file: file, link: url, name: file.name } : d
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
        <>
            <div className="course-content-manager">
                {sections.map((section) => (
                    <div key={section.sectionId} className="section">
                        <div className="section-header">
                            <input
                                className="input-text"
                                type="text"
                                value={section.name}
                                onChange={(e) => onChangeTitleSection(section.sectionId, e.target.value)}
                                placeholder="Tên phần..."
                            />
                            <div className="section-actions">
                                <button className="btn update"
                                    onClick={() => updateSection(section)}>
                                    <i className="fa-solid fa-pen-to-square"></i> Cập nhật
                                </button>
                                <button
                                    className="btn delete"
                                    onClick={() => deleteSection(section.sectionId)}
                                >
                                    <i className="fa-solid fa-trash"></i> Xóa phần
                                </button>
                            </div>
                        </div>

                        <div className="documents">
                            {section.documentSections?.map((document) => (
                                <div key={document.documentId} className="document">
                                    <div className="document-row">
                                        <input
                                            className="input-text"
                                            type="text"
                                            value={document.name}
                                            onChange={(e) =>
                                                onChangeTitleDocument(section.sectionId, document.documentId, e.target.value)
                                            }
                                            placeholder="Tiêu đề tài liệu..."
                                        />

                                        <div className="upload-wrapper">
                                            <input
                                                id={`upload-${document.documentId}`}
                                                className="input-file"
                                                type="file"
                                                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    console.log(1223)
                                                    if (file) {
                                                        onChangeFileDocument(section.sectionId, document.documentId, file, URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                            <label htmlFor={`upload-${document.documentId}`} className="btn upload-btn">
                                                <i className="fa-solid fa-file-arrow-up"></i> Upload
                                            </label>
                                            {/* {document.file && <span className="file-name">{document.file.name}</span>} */}
                                        </div>

                                        <div className="document-actions">
                                            <button className="btn update"
                                                onClick={() => updateDocument(document, document.file)}>
                                                <i className="fa-solid fa-pen-to-square"></i> Cập nhật
                                            </button>
                                            <button
                                                className="btn delete"
                                                onClick={() => deleteDocument(document.documentId)}
                                            >
                                                <i className="fa-solid fa-trash"></i> Xóa
                                            </button>
                                        </div>
                                    </div>

                                    {/* Link tải xuống thay vì preview */}
                                    {document.link && (
                                        <div className="download-link-container">
                                            <a
                                                href={document.link}
                                                download={document.file ? document.file.name : `document-${document.documentId}`}
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

                        <button className="btn add" onClick={() => addDocument(section.sectionId)}>
                            + Thêm tài liệu
                        </button>
                    </div>
                ))}

                <button className="btn add-section" onClick={addSection}>
                    + Thêm phần
                </button>
            </div>
            {loading && <Popup message='Đang tải tài liệu lên' />}
        </>
    );
}