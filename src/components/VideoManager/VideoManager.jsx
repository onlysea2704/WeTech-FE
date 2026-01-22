import { useState, useEffect } from "react";
import styles from "./VideoManager.module.css";
import { useParams } from "react-router-dom";
import { authAxios, publicAxios } from "../../services/axios-instance";
import Popup from "../Popup/Popup";
import { useNotification } from "../../hooks/useNotification";

export default function VideoManager() {
    const [sections, setSections] = useState([]);
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const [previewVideoUrl, setPreviewVideoUrl] = useState(null);
    const { showSuccess, showError } = useNotification();

    const getYoutubeEmbedUrl = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    const fetchCourseVideo = async () => {
        try {
            const res = await publicAxios.get(`/api/video/find-by-courseId?courseId=${courseId}`);
            setSections(res.data || []);
        } catch (error) {
            console.error("Error fetching course content:", error);
            setSections([]);
        }
    };

    useEffect(() => {
        fetchCourseVideo();
    }, [courseId]);

    // === Section CRUD ===
    const addSection = async () => {
        try {
            await authAxios.post("/api/section/create", {
                courseId,
                name: `Phần ${sections.length + 1}`,
            });
            fetchCourseVideo();
        } catch (err) {
            console.error("Error creating section:", err);
        }
    };

    const updateSection = async (section) => {
        try {
            await authAxios.post(`/api/section/update?sectionId=${section.sectionId}`, section);
            fetchCourseVideo();
        } catch (err) {
            console.error("Error updating section:", err);
        }
    };

    const deleteSection = async (sectionId) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa section không?");
        if (!confirmDelete) return;
        try {
            await authAxios.post(`/api/section/delete?sectionId=${sectionId}`);
            fetchCourseVideo();
        } catch (err) {
            console.error("Error deleting section:", err);
        }
    };

    // === Video CRUD ===
    const addVideo = async (sectionId) => {
        try {
            await authAxios.get(`/api/video/create?sectionId=${sectionId}`);
            fetchCourseVideo();
        } catch (err) {
            console.error("Error adding video:", err);
        }
    };

    const updateVideo = async (videoInfo) => {
        setLoading(true);
        try {
            // Gửi đầy đủ thông tin bao gồm cả duration
            const res = await authAxios.post("/api/video/update", videoInfo);
            showSuccess("Cập nhật video thành công!");
            fetchCourseVideo();
        } catch (err) {
            console.error("Error updating video:", err);
            showError("Cập nhật thất bại.");
        } finally {
            setLoading(false);
        }
    };

    const deleteVideo = async (videoId) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa video không?");
        if (!confirmDelete) return;
        try {
            await authAxios.post(`/api/video/delete?videoId=${videoId}`);
            fetchCourseVideo();
        } catch (err) {
            console.error("Error deleting video:", err);
        }
    };

    // === Handle Input Changes (Local State) ===
    const onChangeTitleSection = (sectionId, newTitle) => {
        setSections(sections.map((s) => (s.sectionId === sectionId ? { ...s, name: newTitle } : s)));
    };

    const onChangeTitleVideo = (sectionId, videoId, newTitle) => {
        setSections(
            sections.map((s) =>
                s.sectionId === sectionId
                    ? {
                          ...s,
                          videos: s.videos.map((v) => (v.videoId === videoId ? { ...v, description: newTitle } : v)),
                      }
                    : s,
            ),
        );
    };

    // MỚI: Hàm thay đổi thời lượng video
    const onChangeDurationVideo = (sectionId, videoId, newDuration) => {
        setSections(
            sections.map((s) =>
                s.sectionId === sectionId
                    ? {
                          ...s,
                          videos: s.videos.map((v) => (v.videoId === videoId ? { ...v, duration: newDuration } : v)),
                      }
                    : s,
            ),
        );
    };

    const onChangeLinkVideo = (sectionId, videoId, newLink) => {
        setSections(
            sections.map((s) =>
                s.sectionId === sectionId
                    ? {
                          ...s,
                          videos: s.videos.map((v) => (v.videoId === videoId ? { ...v, link: newLink } : v)),
                      }
                    : s,
            ),
        );
    };

    return (
        <>
            <div className={styles["course-content-manager"]}>
                {sections.map((section) => (
                    <div key={section.sectionId} className={styles.section}>
                        <div className={styles["section-header"]}>
                            <input
                                className={styles["input-text"]}
                                type="text"
                                value={section?.name || ""}
                                onChange={(e) => onChangeTitleSection(section.sectionId, e.target.value)}
                                placeholder="Tên phần..."
                            />
                            <div className={styles["section-actions"]}>
                                <button
                                    className={`${styles.btn} ${styles.update}`}
                                    onClick={() => updateSection(section)}
                                >
                                    Cập nhật Tên Phần
                                </button>
                                <button
                                    className={`${styles.btn} ${styles.delete}`}
                                    onClick={() => deleteSection(section.sectionId)}
                                >
                                    Xóa phần
                                </button>
                            </div>
                        </div>

                        <div className={styles.videos}>
                            {section.videos.map((video) => {
                                const embedUrl = getYoutubeEmbedUrl(video.link);

                                return (
                                    <div key={video.videoId} className={styles.video}>
                                        <div
                                            className={styles["video-row"]}
                                            style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
                                        >
                                            <div
                                                className={styles["video-inputs"]}
                                                style={{ display: "flex", flexDirection: "row", gap: "10px", flex: 1 }}
                                            >
                                                {/* Input Tên Video */}
                                                <input
                                                    className={styles["input-text"]}
                                                    style={{ flex: 3 }}
                                                    type="text"
                                                    value={video.description || ""}
                                                    onChange={(e) =>
                                                        onChangeTitleVideo(
                                                            section.sectionId,
                                                            video.videoId,
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Tiêu đề video..."
                                                />
                                                {/* MỚI: Input Thời lượng (giây) */}
                                                <input
                                                    className={styles["input-text"]}
                                                    style={{ flex: 1 }}
                                                    type="number"
                                                    value={video.duration || ""}
                                                    onChange={(e) =>
                                                        onChangeDurationVideo(
                                                            section.sectionId,
                                                            video.videoId,
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Số giây (VD: 120)"
                                                />
                                            </div>

                                            <div className={styles["video-actions"]}>
                                                <button
                                                    className={`${styles.btn} ${styles.update}`}
                                                    onClick={() =>
                                                        updateVideo({
                                                            videoId: video.videoId,
                                                            sectionId: section.sectionId,
                                                            description: video.description,
                                                            link: video.link,
                                                            duration: video.duration, // Gửi duration lên server
                                                        })
                                                    }
                                                >
                                                    Lưu Video
                                                </button>
                                                <button
                                                    className={`${styles.btn} ${styles.delete}`}
                                                    onClick={() => deleteVideo(video.videoId)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>

                                        <input
                                            className={styles["input-text"]}
                                            style={{
                                                marginRight: "0",
                                                marginTop: "10px",
                                                width: "100%",
                                                boxSizing: "border-box",
                                            }}
                                            type="text"
                                            value={video.link || ""}
                                            onChange={(e) =>
                                                onChangeLinkVideo(section.sectionId, video.videoId, e.target.value)
                                            }
                                            placeholder="Dán link Youtube vào đây..."
                                        />

                                        {embedUrl ? (
                                            <div
                                                className={styles["video-preview-container"]}
                                                style={{ marginTop: "10px" }}
                                            >
                                                <iframe
                                                    width="100%"
                                                    height="200"
                                                    src={embedUrl}
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    style={{ maxWidth: "400px", borderRadius: "8px" }}
                                                ></iframe>
                                            </div>
                                        ) : (
                                            video.link && (
                                                <p style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}>
                                                    Link không hợp lệ
                                                </p>
                                            )
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <button className={`${styles.btn} ${styles.add}`} onClick={() => addVideo(section.sectionId)}>
                            + Thêm bài học mới
                        </button>
                    </div>
                ))}

                <button className={`${styles.btn} ${styles["add-section"]}`} onClick={addSection}>
                    + Thêm phần mới
                </button>
            </div>
            {loading && <Popup message="Đang cập nhật dữ liệu..." />}
        </>
    );
}
