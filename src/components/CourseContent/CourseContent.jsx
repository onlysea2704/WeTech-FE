import React, { useState, useEffect } from "react";
import { publicAxios } from "../../services/axios-instance";
import styles from "./CourseContent.module.css";
import CourseContentSkeleton from "../Skeleton/CourseContentSkeleton";
import { useBuyCourse } from "../../utils/buyCourseHelper";
import { useDetailCourse } from "../../context/DetailCourseContext";

// --- Component con cho cột trái ---
// --- Component con cho cột trái ---
const SyllabusAccordion = ({ section, isOpen, onToggle, courseDetail, isPurchased }) => {
    const { handleBuyNow } = useBuyCourse();
    const { onPlayVideo } = useDetailCourse();
    console.log(section);

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
        if (!isPurchased) handleBuyNow(courseDetail);

        if (link) {
            window.open(link, "_blank", "noopener,noreferrer");
        }
    };

    const handleStartLearning = (item) => {
        if (!isPurchased) {
            handleBuyNow(courseDetail);
            return;
        }

        if (onPlayVideo) {
            onPlayVideo(item);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (item?.link) {
            window.open(item.link, "_blank", "noopener,noreferrer");
        }
    };

    const handleStartLearningVideo = (link) => {
        if (link) {
            window.open(link, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className={styles["accordion-item"]}>
            <div className={styles["accordion-header"]} onClick={onToggle}>
                <div className={styles["accordion-title"]}>
                    <span className={styles["accordion-arrow"]}>
                        <i className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                    </span>
                    <strong>{section.name}</strong>
                </div>

                <div className={styles["accordion-count"]}>
                    <span>{`${section?.videos?.length || 0} Bài giảng`}</span>
                    <span>{getTotalDurationFormatted(section?.videos)}</span>
                </div>
            </div>

            {isOpen && (
                <div className={styles["accordion-content"]}>
                    {section?.items?.map((item, index) => {
                        if (item.type === "video") {
                            return (
                                <div key={`video-${index}`} className={styles["lesson-item"]}>
                                    <div className={styles["lesson-info"]}>
                                        <i className={`fa-regular fa-circle-play ${styles["video-icon"]}`}></i>
                                        <p>{item?.description}</p>
                                    </div>

                                    <div className={styles["lesson-actions"]}>
                                        <button
                                            className={styles["start-learning-btn"]}
                                            // disabled={!isPurchased}
                                            onClick={() => handleStartLearning(item)}
                                        >
                                            Vào học
                                        </button>
                                        <span className={styles["lesson-duration"]}>
                                            {formatVideoDuration(item?.duration)}
                                        </span>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={`doc-${index}`}
                                    className={`${styles["lesson-item"]} ${styles["document-item"]}`}
                                >
                                    <div className={styles["lesson-info"]}>
                                        <i className={`fa-regular fa-file-lines ${styles["document-icon"]}`}></i>
                                        <div>
                                            <p className={styles["document-name"]}>{item?.name}</p>
                                            <span className={styles["document-type"]}>Microsoft Word</span>{" "}
                                            {/* Placeholder type */}
                                        </div>
                                    </div>
                                    <div className={styles["lesson-actions"]}>
                                        {/* <span className="document-size">5.2 MB</span> */}
                                        <button
                                            className={styles["download-text-btn"]}
                                            // disabled={!isPurchased}
                                            onClick={() => handleDownload(item?.link)}
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
    const [isLoading, setIsLoading] = useState(false);

    // Fetch course sections
    useEffect(() => {
        if (!courseDetails) return;
        const fetchSections = async () => {
            setIsLoading(true);
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
            } finally {
                setIsLoading(false);
            }
        };

        fetchSections();
    }, [courseDetails]);

    // Toggle syllabus section
    const handleSyllabusToggle = (id) => {
        setOpenSyllabusSection(openSyllabusSection === id ? null : id);
    };

    if (isLoading) {
        return (
            <div className={styles["content-layout"]}>
                <div className={styles["syllabus-column"]}>
                    <CourseContentSkeleton />
                </div>
            </div>
        );
    }

    return (
        <div className={styles["content-layout"]}>
            {/* Combined Column */}
            <div className={styles["syllabus-column"]}>
                {mergedSections.map((section) => (
                    <SyllabusAccordion
                        key={section.sectionId}
                        section={section}
                        isOpen={openSyllabusSection === section.sectionId}
                        onToggle={() => handleSyllabusToggle(section.sectionId)}
                        courseDetail={courseDetails}
                        isPurchased={isPurchased}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseContent;
