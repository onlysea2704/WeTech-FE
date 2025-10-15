import React, { useState, useEffect } from "react";
import "./CourseContentManager.css";
import { useParams, useNavigate } from "react-router-dom";
import { authAxios, publicAxios } from "../../services/axios-instance";

export default function CourseContentManager() {
    const [sections, setSections] = useState([]);
    const [videoFiles, setVideoFiles] = useState({}); // lưu file upload tạm
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [previewVideo, setPreviewVideo] = useState(null);

    const fetchCourseContent = async () => {
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
        fetchCourseContent();
    }, [courseId]);


    // === Section CRUD ===
    const addSection = async () => {
        try {
            const res = await authAxios.post("/api/section/create", {
                courseId,
                name: `Phần ${sections.length + 1}`,
            });
            console.log("Created section:", res.data);
            fetchCourseContent();
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
            fetchCourseContent();
        } catch (err) {
            console.error("Error updating section:", err);
        }
    };

    const deleteSection = async (sectionId) => {
        try {
            await authAxios.post(`/api/section/delete?sectionId=${sectionId}`);
            fetchCourseContent();
        } catch (err) {
            console.error("Error deleting section:", err);
        }
    };

    // === Video CRUD ===
    const addVideo = async (sectionId) => {
        try {
            const res = await authAxios.get(`/api/video/create?sectionId=${sectionId}`);
            console.log("Created video:", res.data);
            fetchCourseContent();
        } catch (err) {
            console.error("Error adding video:", err);
        }
    };

    const updateVideo = async (videoInfo, file) => {
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
            fetchCourseContent();
        } catch (err) {
            console.error("Error updating video:", err);
        }
    };

    const deleteVideo = async (videoId) => {
        const res = await authAxios.post(`/api/video/delete?videoId=${videoId}`);
        console.log("Deleted video:", res.data);
        fetchCourseContent();
    };

    // cập nhật tiêu đề
    const updateTitle = (sectionId, newTitle) => {
        setSections(
            sections.map((s) =>
                s.sectionId === sectionId ? { ...s, name: newTitle } : s
            )
        );
    };

    const updateVideoTitle = (sectionId, videoId, newTitle) => {
        // setSections(
        //     sections.map((s) =>
        //         s.sectionId === sectionId
        //             ? {
        //                 ...s,
        //                 videos: s.videos.map((v) =>
        //                     v.videoId === videoId ? { ...v, description: newTitle } : v
        //                 ),
        //             }
        //             : s
        //     )
        // );
    };

    // lưu file upload vào state
    const handleFileChange = (videoId, file) => {
        setVideoFiles((prev) => ({
            ...prev,
            [videoId]: file,
        }));
    };

    return (
        <div className="course-content-manager">
            {sections.map((section) => (
                <div key={section.sectionId} className="section">
                    <div className="section-header">
                        <input
                            className="input-text"
                            type="text"
                            value={section?.name || ""}
                            onChange={(e) =>
                                updateTitle(section.sectionId, e.target.value)
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
                            const previewUrl = videoFiles[video.videoId]
                                ? URL.createObjectURL(videoFiles[video.videoId])
                                : video.link;

                            return (
                                <div key={video.videoId} className="video">
                                    <div className="video-row">
                                        <input
                                            className="input-text"
                                            type="text"
                                            value={video.description || ""}
                                            onChange={(e) =>
                                                updateVideoTitle(
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
                                            {videoFiles[video.videoId] && (
                                                <span className="file-name">
                                                    {videoFiles[video.videoId].name}
                                                </span>
                                            )}
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
    );
}
