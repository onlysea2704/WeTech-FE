import React, { useState, useEffect, useMemo } from "react";
import styles from "./CoursePlaylist.module.css";
import doubleCheckIcon from "../../assets/double-check.png";

const CoursePlaylist = ({ sections = [], onSelectVideo, currentVideo }) => {
    // State to track expanded sections
    const [expandedSections, setExpandedSections] = useState({});
    // State to track completed videos (from localStorage)
    const [completedVideos, setCompletedVideos] = useState({});

    // Load completed videos from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("completedVideos");
        if (stored) {
            setCompletedVideos(JSON.parse(stored));
        }
    }, []);

    // Helper to format duration compact (MM:SS or HH:MM:SS)
    const formatDurationCompact = (duration) => {
        if (!duration) return "00:00";
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);

        const fmtMin = minutes.toString().padStart(2, "0");
        const fmtSec = seconds.toString().padStart(2, "0");

        if (hours > 0) {
            return `${hours}:${fmtMin}:${fmtSec}`;
        }
        return `${minutes}:${fmtSec}`;
    };

    // Helper to format duration verbose (Xh Ym or Xm Ys)
    const formatDurationVerbose = (duration) => {
        if (!duration) return "0m";
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);

        if (hours > 0) return `${hours}h ${minutes}m`;
        if (minutes > 0) return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
        return `${seconds}s`;
    };

    // Helper to format hours/min for header
    const formatTotalDuration = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    };

    // Calculate stats
    const stats = useMemo(() => {
        let totalDuration = 0;
        let totalVideos = 0;
        let completedCount = 0;

        sections.forEach((section) => {
            if (section.videos) {
                totalVideos += section.videos.length;
                section.videos.forEach((v) => {
                    totalDuration += v.duration || 0;
                    if (completedVideos[v.videoId]) {
                        completedCount++;
                    }
                });
            }
        });

        return {
            totalDuration,
            totalVideos,
            completedCount,
            percent: totalVideos > 0 ? Math.round((completedCount / totalVideos) * 100) : 0,
        };
    }, [sections, completedVideos]);

    // Handle checkbox toggle
    const toggleCompletion = (e, videoId) => {
        e.stopPropagation(); // Prevent playing video when clicking checkbox
        const newCompleted = { ...completedVideos, [videoId]: !completedVideos[videoId] };
        setCompletedVideos(newCompleted);
        localStorage.setItem("completedVideos", JSON.stringify(newCompleted));
    };

    // Toggle accordion
    const toggleSection = (sectionId) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    // Auto-expand section containing current video
    useEffect(() => {
        if (currentVideo && sections.length > 0) {
            const activeSection = sections.find((s) => s.videos?.some((v) => v.videoId === currentVideo.videoId));
            if (activeSection) {
                setExpandedSections((prev) => ({ ...prev, [activeSection.sectionId]: true }));
            }
        }
        // Only run when currentVideo changes significantly (e.g. init), avoid loop if we wanted strict sync
    }, [currentVideo?.videoId]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={styles["course-playlist-wrapper"]}>
            <div className={styles["course-content-header"]}>
                <h3>Nội dung khoá học</h3>
                <span className={styles["progress-percent"]}>{stats.percent}% Hoàn Thành</span>
            </div>
            <div className={styles["progress-bar-container"]}>
                <div className={styles["progress-bar-fill"]} style={{ width: `${stats.percent}%` }}></div>
            </div>

            <div className={styles["playlist-container"]}>
                <div className={styles["playlist-header-main"]}>
                    <div className={styles["playlist-title-row"]}>
                        <i className="fa-solid fa-chevron-up"></i>
                        <h3>Danh sách phát</h3>
                    </div>
                    <div className={styles["playlist-stats"]}>
                        <div className={`${styles["stat-item"]} ${styles["total-lession"]}`}>
                            <i className="fa-regular fa-circle-play"></i>
                            <span>{sections.length} Modul</span>
                        </div>
                        <div className={`${styles["stat-item"]} ${styles["total-time"]}`}>
                            <i className="fa-regular fa-clock"></i>
                            <span>{formatTotalDuration(stats.totalDuration)}</span>
                        </div>
                        <div className={styles["stat-item"]}>
                            <img src={doubleCheckIcon} alt="" />
                            <span>
                                {stats.percent}% finish ({stats.completedCount}/{stats.totalVideos})
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles["playlist-body"]}>
                    {sections.map((section) => {
                        const sectionDuration = section.videos?.reduce((acc, v) => acc + (v.duration || 0), 0) || 0;
                        const isExpanded = !!expandedSections[section.sectionId];

                        return (
                            <div key={section.sectionId} className={styles["playlist-section"]}>
                                <div
                                    className={styles["section-header"]}
                                    onClick={() => toggleSection(section.sectionId)}
                                >
                                    <div className={styles["section-info"]}>
                                        <div className={`${styles.arrow} ${isExpanded ? styles.open : ""}`}>
                                            <i className="fa-solid fa-chevron-up"></i>
                                        </div>
                                        <div className={styles["section-title"]}>{section.name}</div>
                                    </div>
                                    <div className={styles["section-meta"]}>
                                        <div className={`${styles["meta-item"]} ${styles["total-lession"]}`}>
                                            <i className="fa-regular fa-circle-play"></i>
                                            <span>{section.videos?.length || 0} Bài giảng</span>
                                        </div>
                                        <div className={`${styles["meta-item"]} ${styles["total-time"]}`}>
                                            <i className="fa-regular fa-clock"></i>
                                            <span>{formatDurationVerbose(sectionDuration)}</span>
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className={styles["section-videos"]}>
                                        {section.videos?.map((video) => {
                                            const isActive = currentVideo?.videoId === video.videoId;
                                            const isChecked = !!completedVideos[video.videoId];
                                            return (
                                                <div
                                                    key={video.videoId}
                                                    className={`${styles["playlist-video-item"]} ${isActive ? styles.active : ""}`}
                                                    onClick={() => onSelectVideo(video)}
                                                >
                                                    <div className={styles["video-left"]}>
                                                        <div
                                                            title="Đánh dấu hoàn thành"
                                                            className={`${styles["custom-checkbox"]} ${isChecked ? styles.checked : ""}`}
                                                            onClick={(e) => toggleCompletion(e, video.videoId)}
                                                        >
                                                            {isChecked && <i className="fa-solid fa-check"></i>}
                                                        </div>
                                                        <span className={styles["video-name"]}>
                                                            {video.description}
                                                        </span>
                                                    </div>
                                                    <div className={styles["video-right"]}>
                                                        <span className={styles["video-time"]}>
                                                            {isActive ? (
                                                                <i className="fa-solid fa-pause"></i>
                                                            ) : (
                                                                <i className="fa-solid fa-play"></i>
                                                            )}
                                                            {formatDurationCompact(video.duration)}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CoursePlaylist;
