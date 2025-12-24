import React, { useState, useEffect, useRef } from "react";
import "./CustomYoutubePlayer.css";

const CustomYouTubePlayer = ({ videoUrl, title }) => {
    const playerRef = useRef(null);
    const containerRef = useRef(null); // 1. Thêm ref cho container bao ngoài
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    // ... (Giữ nguyên phần Helper và getYouTubeVideoId)
    const getYouTubeVideoId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };
    const videoId = getYouTubeVideoId(videoUrl);

    // ... (Giữ nguyên logic useEffect khởi tạo Player)
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        const createPlayer = () => {
            if (playerRef.current && !player) {
                const newPlayer = new window.YT.Player(playerRef.current, {
                    videoId: videoId,
                    playerVars: {
                        controls: 0,
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                        fs: 0, // Lưu ý: Tắt fs native của YT để dùng custom
                        playsinline: 1
                    },
                    events: {
                        onReady: onPlayerReady,
                        onStateChange: onPlayerStateChange
                    }
                });
                setPlayer(newPlayer);
            }
        };

        if (!window.YT) {
            window.onYouTubeIframeAPIReady = createPlayer;
        } else if (window.YT && window.YT.Player) {
            createPlayer();
        }
        return () => { };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ... (Giữ nguyên logic useEffect đổi videoId và các hàm xử lý time, volume...)
    useEffect(() => {
        if (player && videoId) {
            if (typeof player.loadVideoById === 'function') {
                player.loadVideoById(videoId);
                setIsPlaying(true);
            }
        }
    }, [videoId, player]);

    const onPlayerReady = (event) => {
        setDuration(event.target.getDuration());
        if (videoId && event.target.getVideoData().video_id !== videoId) {
            event.target.loadVideoById(videoId);
        }
    };

    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            setDuration(event.target.getDuration());
        } else {
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        if (!player || !isPlaying) return;
        const interval = setInterval(() => {
            if (player.getCurrentTime) {
                setCurrentTime(player.getCurrentTime());
            }
        }, 100);
        return () => clearInterval(interval);
    }, [player, isPlaying]);

    const togglePlay = () => {
        if (!player) return;
        if (isPlaying) player.pauseVideo();
        else player.playVideo();
    };

    const handleSeek = (e) => {
        if (!player) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const newTime = pos * duration;
        player.seekTo(newTime, true);
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        if (!player) return;
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        player.setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        if (!player) return;
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
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // --- SỬA HÀM FULLSCREEN ---
    const toggleFullscreen = () => {
        // 2. Sử dụng containerRef thay vì truy cập qua playerRef
        const container = containerRef.current;

        if (!container) return;

        if (!document.fullscreenElement) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen(); // Safari/Chrome cũ
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen(); // IE/Edge cũ
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };

    if (!videoId) return <div className="video-error">URL video không hợp lệ</div>;

    return (
        // 3. Gắn containerRef vào thẻ div bao ngoài cùng hoặc thẻ wrapper bạn muốn phóng to
        <div className="custom-video-player" ref={containerRef}>
            <div className="video-wrapper">

                {/* --- THÊM ĐOẠN NÀY: Lớp phủ chặn tương tác --- */}
                <div
                    className="video-blocker"
                    onContextMenu={(e) => e.preventDefault()} // Chặn menu chuột phải
                    onClick={togglePlay} // (Tùy chọn) Bấm vào video để Play/Pause giống player thật
                    onDoubleClick={toggleFullscreen} // (Tùy chọn) Double click để full screen
                ></div>

                <div ref={playerRef} className="youtube-player"></div>

                {/* ... Controls giữ nguyên ... */}
                <div className="video-controls">
                    {/* ... (Code controls của bạn giữ nguyên) ... */}
                    <div className="progress-bar" onClick={handleSeek}>
                        <div
                            className="progress-filled"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                        ></div>
                    </div>

                    <div className="controls-wrapper">
                        <div className="controls-left">
                            <p className="video-overlay-title" style={{ position: 'absolute', top: '-40px', color: 'white', textShadow: '1px 1px 2px black' }}>{title}</p>
                            <button onClick={togglePlay} className="control-btn">
                                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                            </button>

                            <div
                                className="volume-control"
                                onMouseEnter={() => setShowVolumeSlider(true)}
                                onMouseLeave={() => setShowVolumeSlider(false)}
                            >
                                <button onClick={toggleMute} className="control-btn">
                                    <i className={`fas ${isMuted ? 'fa-volume-mute' : volume < 50 ? 'fa-volume-down' : 'fa-volume-up'}`}></i>
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