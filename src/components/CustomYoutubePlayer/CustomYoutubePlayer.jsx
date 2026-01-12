import React, { useState, useEffect, useRef } from "react";
import "./CustomYoutubePlayer.css";

const CustomYouTubePlayer = ({ videoUrl, title }) => {
    // 1. Dùng ref để giữ DOM element
    const containerRef = useRef(null);
    const videoNodeRef = useRef(null); // Ref cho thẻ div nơi YouTube mount vào

    // 2. QUAN TRỌNG: Dùng useRef để giữ Instance Player thay vì useState
    // Giúp truy cập trực tiếp mà không bị ảnh hưởng bởi render cycle của React
    const playerInstance = useRef(null);

    // Các state quản lý UI
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    // Helper lấy ID
    const getYouTubeVideoId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };
    const videoId = getYouTubeVideoId(videoUrl);

    // --- EFFECT 1: KHỞI TẠO PLAYER ---
    useEffect(() => {
        if (!videoId) return;

        // Hàm tạo player
        const createPlayer = () => {
            // Nếu đã có instance rồi thì không tạo lại
            if (playerInstance.current) return;

            // Kiểm tra window.YT đã sẵn sàng chưa
            if (window.YT && window.YT.Player && videoNodeRef.current) {
                playerInstance.current = new window.YT.Player(videoNodeRef.current, {
                    videoId: videoId,
                    width: "100%",
                    height: "100%",
                    playerVars: {
                        autoplay: 1, // Tự động chạy khi load
                        controls: 0,
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                        fs: 0,
                        playsinline: 1,
                    },
                    events: {
                        onReady: onPlayerReady,
                        onStateChange: onPlayerStateChange,
                    },
                });
            }
        };

        // Inject script nếu chưa có
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            // Callback toàn cục khi API tải xong
            window.onYouTubeIframeAPIReady = createPlayer;
        } else {
            createPlayer();
        }

        // QUAN TRỌNG: Hàm cleanup hủy player khi component unmount
        // Giúp tránh lỗi "is not a function" khi dùng key prop để reload component
        return () => {
            if (playerInstance.current) {
                // Kiểm tra xem hàm destroy có tồn tại không trước khi gọi
                if (typeof playerInstance.current.destroy === "function") {
                    playerInstance.current.destroy();
                }
                playerInstance.current = null;
            }
        };
    }, [videoId]); // Re-run nếu videoId thay đổi (nhưng do dùng key ở cha, cái này sẽ chạy mới hoàn toàn)

    // --- CÁC HÀM SỰ KIỆN ---
    const onPlayerReady = (event) => {
        setDuration(event.target.getDuration());
        // Đảm bảo video bắt đầu chạy
        event.target.playVideo();
    };

    const onPlayerStateChange = (event) => {
        // Cập nhật trạng thái Play/Pause
        if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            setDuration(event.target.getDuration());
        } else {
            setIsPlaying(false);
        }
    };

    // --- EFFECT 2: CẬP NHẬT THANH THỜI GIAN ---
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            // Truy cập trực tiếp qua ref.current thay vì biến state
            if (playerInstance.current && typeof playerInstance.current.getCurrentTime === "function") {
                const time = playerInstance.current.getCurrentTime();
                // Chỉ set state nếu số thay đổi đáng kể để tránh re-render quá nhiều
                if (time !== currentTime) setCurrentTime(time);
            }
        }, 500); // Giảm tần suất xuống 500ms cho nhẹ, hoặc để 100ms nếu cần mượt

        return () => clearInterval(interval);
    }, [isPlaying]);

    // --- CÁC HÀM ĐIỀU KHIỂN (Sử dụng playerInstance.current) ---

    const togglePlay = () => {
        const player = playerInstance.current;
        if (!player || typeof player.playVideo !== "function") return;

        if (isPlaying) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    };

    const handleSeek = (e) => {
        const player = playerInstance.current;
        if (!player || typeof player.seekTo !== "function") return;

        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const newTime = pos * duration;

        player.seekTo(newTime, true);
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const player = playerInstance.current;
        if (!player || typeof player.setVolume !== "function") return;

        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        player.setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        const player = playerInstance.current;
        if (!player || typeof player.mute !== "function") return;

        if (isMuted) {
            player.unMute();
            player.setVolume(volume || 50);
            setIsMuted(false);
        } else {
            player.mute();
            setIsMuted(true);
        }
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const toggleFullscreen = () => {
        const container = containerRef.current;
        if (!container) return;

        if (!document.fullscreenElement) {
            if (container.requestFullscreen) container.requestFullscreen();
            else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
            else if (container.msRequestFullscreen) container.msRequestFullscreen();
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
        }
    };

    if (!videoId) return <div className="video-error">URL video không hợp lệ</div>;

    return (
        <div className="custom-video-player" ref={containerRef}>
            <div className="video-wrapper">
                {/* Lớp phủ chặn tương tác trực tiếp lên iframe */}
                <div
                    className="video-blocker"
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={togglePlay}
                    onDoubleClick={toggleFullscreen}
                ></div>

                {/* Thẻ div này sẽ được YouTube thay thế bằng Iframe */}
                {/* Chúng ta gán ref vào đây để API tìm thấy */}
                <div ref={videoNodeRef} className="youtube-player"></div>

                <div className="video-controls">
                    <div className="progress-bar" onClick={handleSeek}>
                        <div className="progress-filled" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                    </div>

                    <div className="controls-wrapper">
                        <div className="controls-left">
                            <p
                                className="video-overlay-title"
                                style={{
                                    position: "absolute",
                                    top: "-40px",
                                    color: "white",
                                    textShadow: "1px 1px 2px black",
                                }}
                            >
                                {title}
                            </p>
                            <button onClick={togglePlay} className="control-btn">
                                <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
                            </button>

                            <div
                                className="volume-control"
                                onMouseEnter={() => setShowVolumeSlider(true)}
                                onMouseLeave={() => setShowVolumeSlider(false)}
                            >
                                <button onClick={toggleMute} className="control-btn">
                                    <i
                                        className={`fas ${isMuted ? "fa-volume-mute" : volume < 50 ? "fa-volume-down" : "fa-volume-up"}`}
                                    ></i>
                                </button>
                                {showVolumeSlider && (
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={isMuted ? 0 : volume}
                                        onChange={handleVolumeChange}
                                        className="volume-slider"
                                    />
                                )}
                            </div>

                            <span className="time-display">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        <div className="controls-right">
                            <button onClick={toggleFullscreen} className="control-btn">
                                <i className="fas fa-expand"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomYouTubePlayer;
