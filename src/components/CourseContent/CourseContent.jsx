import React, { useState, useEffect } from "react";
import { publicAxios } from "../../services/axios-instance";
import "./CourseContent.css";

// --- Component con cho cột trái ---
// --- Component con cho cột trái ---
const SyllabusAccordion = ({ section, isOpen, onToggle, isPurchased }) => {
    // 👉 Hàm định dạng tổng thời lượng
    const getTotalDurationFormatted = (videos = []) => {
        const totalSeconds = videos.reduce((sum, v) => sum + (v.duration || 0), 0);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        let arr = [
            {
                value: hours,
                unit: "giờ",
            },
            {
                value: minutes,
                unit: "phút",
            },
            {
                value: seconds,
                unit: "giây",
            },
        ];
        return arr
            .filter((item) => item.value > 0)
            .map((item) => `${item.value} ${item.unit}`)
            .join(" ");
    };

    // 👉 Hàm định dạng từng video
    const formatVideoDuration = (duration) => {
        if (!duration) return "00:00";
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);

        const fmtMin = minutes.toString().padStart(2, "0");
        const fmtSec = seconds.toString().padStart(2, "0");

        if (hours > 0) {
            const fmtHour = hours.toString().padStart(2, "0");
            return `${fmtHour}:${fmtMin}:${fmtSec}`;
        }
        return `${fmtMin}:${fmtSec}`;
    };

    const handleDownload = (link) => {
        if (link) {
            window.location.href = link;
        }
    };

    return (
        <div className="accordion-item">
            <div className="accordion-header" onClick={onToggle}>
                <div className="accordion-title">
                    <span className="accordion-arrow">
                        <i className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                    </span>
                    <strong>{section.name}</strong>
                </div>

                <div className="accordion-count">
                    <span>{`${section?.videos?.length || 0} Bài giảng`}</span>
                    <span>{getTotalDurationFormatted(section?.videos)}</span>
                </div>
            </div>

            {isOpen && (
                <div className="accordion-content">
                    {section?.items?.map((item, index) => {
                        if (item.type === "video") {
                            return (
                                <div key={`video-${index}`} className="lesson-item">
                                    <div className="lesson-info">
                                        <i className="fa-regular fa-circle-play video-icon"></i>
                                        <p>{item?.description}</p>
                                    </div>

                                    <div className="lesson-actions">
                                        <button className="start-learning-btn">Vào học</button>
                                        <span className="lesson-duration">{formatVideoDuration(item?.duration)}</span>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={`doc-${index}`} className="lesson-item document-item">
                                    <div className="lesson-info">
                                        <i className="fa-regular fa-file-lines document-icon"></i>
                                        <div>
                                            <p className="document-name">{item?.name}</p>
                                            <span className="document-type">Microsoft Word</span>{" "}
                                            {/* Placeholder type */}
                                        </div>
                                    </div>
                                    <div className="lesson-actions">
                                        {/* <span className="document-size">5.2 MB</span> */}
                                        <button
                                            className="download-text-btn"
                                            disabled={!isPurchased}
                                            onClick={() => isPurchased && handleDownload(item?.link)}
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
};

// --- Component Content chính ---
const CourseContent = ({ courseDetails, isPurchased }) => {
    const [mergedSections, setMergedSections] = useState([]);
    const [openSyllabusSection, setOpenSyllabusSection] = useState(1);
    const [videoResponse, setVideoResponse] = useState([]);
    const [documentResponse, setDocumentResponse] = useState([]);

    // Fetch course sections
    useEffect(() => {
        if (!courseDetails) return;
        const fetchSections = async () => {
            try {
                const videoRes = await publicAxios.get(
                    `/api/video/find-by-courseId?courseId=${courseDetails?.courseId}`,
                );
                const documentRes = await publicAxios.get(
                    `/api/document/find-by-courseId?courseId=${courseDetails?.courseId}`,
                );

                setVideoResponse(videoRes.data);
                setDocumentResponse(documentRes.data);

                // Merge videos and documents by sectionId
                const videos = videoRes.data || [];
                const documents = documentRes.data || [];

                // Create a map of sections
                const sectionsMap = new Map();

                // Initialize map with videos
                videos.forEach((section) => {
                    sectionsMap.set(section.sectionId, {
                        ...section,
                        videos: section.videos || [],
                        _rawDocuments: [],
                    });
                });

                // Add documents to map (or create new if missing)
                documents.forEach((section) => {
                    if (!sectionsMap.has(section.sectionId)) {
                        sectionsMap.set(section.sectionId, {
                            ...section,
                            videos: [],
                            _rawDocuments: section.documentSections || [],
                        });
                    } else {
                        sectionsMap.get(section.sectionId)._rawDocuments = section.documentSections || [];
                    }
                });

                // Interleave By Index (Video 0, Doc 0, Video 1, Doc 1...)
                sectionsMap.forEach((entry) => {
                    const vList = entry.videos || [];
                    const dList = entry._rawDocuments || [];
                    const interleaved = [];
                    const maxLen = Math.max(vList.length, dList.length);

                    for (let i = 0; i < maxLen; i++) {
                        if (i < vList.length) {
                            interleaved.push({ ...vList[i], type: "video", name: vList[i].description });
                        }
                        if (i < dList.length) {
                            interleaved.push({ ...dList[i], type: "document" });
                        }
                    }
                    entry.items = interleaved;
                });

                setMergedSections(Array.from(sectionsMap.values()));
            } catch (error) {
                console.error("Error fetching course sections:", error);
            }
        };

        fetchSections();
    }, [courseDetails]);

    // Toggle syllabus section
    const handleSyllabusToggle = (id) => {
        setOpenSyllabusSection(openSyllabusSection === id ? null : id);
    };

    return (
        <div className="content-layout">
            {/* Combined Column */}
            <div className="syllabus-column">
                {mergedSections.map((section) => (
                    <SyllabusAccordion
                        key={section.sectionId}
                        section={section}
                        isOpen={openSyllabusSection === section.sectionId}
                        onToggle={() => handleSyllabusToggle(section.sectionId)}
                        isPurchased={isPurchased}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseContent;
