import React, { useState, useEffect } from "react";
import "./CourseContentManager.css";
import { useParams } from "react-router-dom";
import { authAxios, publicAxios } from "../../services/axios-instance";
import Popup from "../Popup/Popup";

export default function CourseContentManager() {
    const [sections, setSections] = useState([]);
    const [videoFiles, setVideoFiles] = useState({}); // lưu file upload tạm
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const [previewVideo, setPreviewVideo] = useState(null);

    const getPreviewUrl = (videoId, videoLink) => {
        const file = videoFiles[videoId];
        if (!file) return videoLink;

        // Nếu file chưa có previewUrl, tạo 1 lần rồi cache lại
        if (!file.previewUrl) {
            file.previewUrl = URL.createObjectURL(file);
        }

        return file.previewUrl;
    };

    const fetchCourseVideo = async () => {
        try {
            const res = await publicAxios.get(
                `/api/video/find-by-courseId?courseId=${courseId}`
            );
            setSections(res.data || []);
        } catch (error) {
            console.error("Error fetching course content:", error);
            setSections([]); // fallback tránh lỗi khi render
        }
    };

    // Fetch dữ liệu từ API
    useEffect(() => {
        fetchCourseVideo();
    }, [courseId]);

    // === Section CRUD ===
    const addSection = async () => {
        try {
            const res = await authAxios.post("/api/section/create", {
                courseId,
                name: `Phần ${sections.length + 1}`,
            });
            console.log("Created section:", res.data);
            fetchCourseVideo();
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
            fetchCourseVideo();
        } catch (err) {
            console.error("Error updating section:", err);
        }
    };
    const deleteSection = async (sectionId) => {
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
            const res = await authAxios.get(`/api/video/create?sectionId=${sectionId}`);
            console.log("Created video:", res.data);
            fetchCourseVideo();
        } catch (err) {
            console.error("Error adding video:", err);
        }
    };
    const updateVideo = async (videoInfo, file) => {
        setLoading(true);
        // Hàm lấy thời lượng video (trả Promise) - Cần promise vì load metadata bất đồng bộ , nếu không có không thể load được thông tin duration
        const getVideoDuration = (file) => {
            return new Promise((resolve) => {
                const url = URL.createObjectURL(file);
                const media = document.createElement(
                    file.type.startsWith("video") ? "video" : "audio"
                );
                media.preload = "metadata";
                media.src = url;
                media.onloadedmetadata = () => {
                    URL.revokeObjectURL(url);
                    const duration = Math.round(media.duration);
                    resolve(duration);
                };
            });
        };

        const duration = await getVideoDuration(file);
        videoInfo.duration = duration;
        console.log(videoInfo);
        const formData = new FormData();
        formData.append(
            "videoInfo",
            new Blob([JSON.stringify(videoInfo)], { type: "application/json" })
        );
        formData.append("video", file);
        try {
            const res = await authAxios.post("/api/video/update", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Updated video:", res.data);
            fetchCourseVideo();
        } catch (err) {
            console.error("Error updating video:", err);
        }
        setLoading(false);
    };
    const deleteVideo = async (videoId) => {
        const res = await authAxios.post(`/api/video/delete?videoId=${videoId}`);
        console.log("Deleted video:", res.data);
        fetchCourseVideo();
    };

    // cập nhật tiêu đề
    const onChangeTitleSection = (sectionId, newTitle) => {
        setSections(
            sections.map((s) =>
                s.sectionId === sectionId ? { ...s, name: newTitle } : s
            )
        );
    };
    const onChangeTitleVideo = (sectionId, videoId, newTitle) => {
        setSections(
            sections.map((s) =>
                s.sectionId === sectionId
                    ? {
                        ...s,
                        videos: s.videos.map((v) =>
                            v.videoId === videoId ? { ...v, description: newTitle } : v
                        ),
                    }
                    : s
            )
        );
    };

    // lưu file upload vào state
    const handleFileChange = (videoId, file) => {
        setVideoFiles((prev) => ({
            ...prev,
            [videoId]: file,
        }));
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
                                value={section?.name || ""}
                                onChange={(e) =>
                                    onChangeTitleSection(section.sectionId, e.target.value)
                                }
                                placeholder="Tên phần..."
                            />
                            <div className="section-actions">
                                <button
                                    className="btn update"
                                    onClick={() => updateSection(section)}
                                >
                                    Cập nhật
                                </button>
                                <button
                                    className="btn delete"
                                    onClick={() => deleteSection(section.sectionId)}
                                >
                                    Xóa phần
                                </button>
                            </div>
                        </div>

                        <div className="videos">
                            {section.videos.map((video) => {
                                // Nếu đã upload file mới thì lấy link preview từ file đó
                                const previewUrl = getPreviewUrl(video.videoId, video.link);

                                return (
                                    <div key={video.videoId} className="video">
                                        <div className="video-row">
                                            <input
                                                className="input-text"
                                                type="text"
                                                value={video.description || ""}
                                                onChange={(e) =>
                                                    onChangeTitleVideo(
                                                        section.sectionId,
                                                        video.videoId,
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Tiêu đề video..."
                                            />

                                            {/* Upload file */}
                                            <div className="upload-wrapper">
                                                <input
                                                    id={`upload-${video.videoId}`}
                                                    className="input-file"
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={(e) =>
                                                        handleFileChange(video.videoId, e.target.files[0])
                                                    }
                                                />
                                                <label
                                                    htmlFor={`upload-${video.videoId}`}
                                                    className="btn upload-btn"
                                                >
                                                    📂 Chọn video
                                                </label>

                                            </div>

                                            <div className="video-actions">
                                                <button
                                                    className="btn update"
                                                    onClick={() =>
                                                        updateVideo(
                                                            {
                                                                videoId: video.videoId,
                                                                sectionId: section.sectionId,
                                                                description: video.description,
                                                                link: video.link,
                                                            },
                                                            videoFiles[video.videoId]
                                                        )
                                                    }
                                                >
                                                    Cập nhật
                                                </button>
                                                <button
                                                    className="btn delete"
                                                    onClick={() =>
                                                        deleteVideo(section.sectionId, video.videoId)
                                                    }
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>

                                        {/* Preview video: ưu tiên file upload mới, nếu không thì link từ server */}
                                        {previewUrl && (
                                            <video
                                                className="video-preview"
                                                src={previewUrl}
                                                controls
                                                width="300"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            className="btn add"
                            onClick={() => addVideo(section.sectionId)}
                        >
                            + Thêm video
                        </button>
                    </div>
                ))}

                <button className="btn add-section" onClick={addSection}>
                    + Thêm phần
                </button>

                {previewVideo && (
                    <div className="modal" onClick={() => setPreviewVideo(null)}>
                        <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                src={previewVideo}
                                controls
                                autoPlay
                                className="modal-video"
                            />
                            <button
                                className="btn close"
                                onClick={() => setPreviewVideo(null)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {loading && <Popup message='Đang tải video lên' />}
        </>

    );
}
