import React, { useState } from "react";
import "./CourseContentManager.css";

export default function CourseContentManager() {
    const [sections, setSections] = useState([
        {
            id: Date.now(),
            title: "Phần 1: Giới thiệu",
            videos: [],
        },
    ]);

    const [previewVideo, setPreviewVideo] = useState(null);

    // thêm 1 phần
    const addSection = () => {
        const newSection = {
            id: Date.now(),
            title: `Phần ${sections.length + 1}`,
            videos: [],
        };
        setSections([...sections, newSection]);
    };

    // xóa phần
    const deleteSection = (sectionId) => {
        setSections(sections.filter((s) => s.id !== sectionId));
    };

    // thêm video
    const addVideo = (sectionId) => {
        setSections(
            sections.map((s) =>
                s.id === sectionId
                    ? {
                        ...s,
                        videos: [
                            ...s.videos,
                            { id: Date.now(), title: "", file: null, url: "" },
                        ],
                    }
                    : s
            )
        );
    };

    // xóa video
    const deleteVideo = (sectionId, videoId) => {
        setSections(
            sections.map((s) =>
                s.id === sectionId
                    ? { ...s, videos: s.videos.filter((v) => v.id !== videoId) }
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

    // cập nhật video
    const updateVideo = (sectionId, videoId, field, value) => {
        setSections(
            sections.map((s) =>
                s.id === sectionId
                    ? {
                        ...s,
                        videos: s.videos.map((v) =>
                            v.id === videoId ? { ...v, [field]: value } : v
                        ),
                    }
                    : s
            )
        );
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
                            <button className="btn update">Cập nhật</button>
                            <button className="btn delete" onClick={() => deleteSection(section.id)}>Xóa phần</button>
                        </div>
                    </div>

                    <div className="videos">
                        {section.videos.map((video) => (
                            <div key={video.id} className="video">
                                <div className="video-row">
                                    <input
                                        className="input-text"
                                        type="text"
                                        value={video.title}
                                        onChange={(e) =>
                                            updateVideo(section.id, video.id, "title", e.target.value)
                                        }
                                        placeholder="Tiêu đề video..."
                                    />


                                    <input
                                        className="input-file"
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                updateVideo(section.id, video.id, "file", file);
                                                updateVideo(section.id, video.id, "url", URL.createObjectURL(file));
                                            }
                                        }}
                                    />

                                    {/* Nút upload custom */}
                                    <div className="upload-wrapper">
                                        <input
                                            id={`upload-${video.id}`}
                                            className="input-file"
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    updateVideo(section.id, video.id, "file", file);
                                                    updateVideo(section.id, video.id, "url", URL.createObjectURL(file));
                                                }
                                            }}
                                        />
                                        <label htmlFor={`upload-${video.id}`} className="btn upload-btn">
                                            📂 Upload
                                        </label>
                                        {video.file && <span className="file-name">{video.file.name}</span>}
                                    </div>


                                    <div className="video-actions">
                                        <button className="btn update">Cập nhật</button>
                                        {video.url && (
                                            <button
                                                className="btn preview"
                                                onClick={() => setPreviewVideo(video.url)}
                                            >
                                                Xem
                                            </button>
                                        )}
                                        <button
                                            className="btn delete"
                                            onClick={() => deleteVideo(section.id, video.id)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>

                                {video.url && (
                                    <video className="video-preview" src={video.url} controls width="300" />
                                )}
                            </div>

                        ))}
                    </div>

                    <button className="btn add" onClick={() => addVideo(section.id)}>
                        + Thêm video
                    </button>
                </div>
            ))}

            <button className="btn add-section" onClick={addSection}>
                + Thêm phần
            </button>

            {previewVideo && (
                <div className="modal" onClick={() => setPreviewVideo(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <video src={previewVideo} controls autoPlay className="modal-video" />
                        <button className="btn close" onClick={() => setPreviewVideo(null)}>Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
}
