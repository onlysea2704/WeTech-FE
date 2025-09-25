import React, { useState, useEffect } from "react";
import "./DetailCourse.css";
import Navbar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import CourseInfo from "../../../components/CourseInfo/CourseInfo";
import { publicAxios } from "../../../services/axios-instance";
import { useParams } from "react-router-dom";

// playlist có thêm videoUrl để phát
const playlistData = [
    { id: 1, title: '01 - Giới thiệu!', duration: '18:26', status: 'completed', videoUrl: 'https://www.youtube.com/embed/yYX4bvQSqbo' },
    { id: 2, title: '02 - Chuẩn bị hồ sơ', duration: '10:09', status: 'playing', videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4' },
    { id: 4, title: '04 - Thông tin cần thiết', duration: '10:16', status: 'pending', videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U' },
    { id: 5, title: '05 - Thông tin', duration: '10:03', status: 'pending', videoUrl: 'https://www.youtube.com/embed/kJQP7kiw5Fk' },
    { id: 6, title: '06 - Thông tin', duration: '10:42', status: 'pending', videoUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ' },
    { id: 7, title: '07 - Thông tin', duration: '08:24', status: 'pending', videoUrl: 'https://www.youtube.com/embed/V-_O7nl0Ii0' },
    { id: 8, title: '08 - Nộp hồ sơ', duration: '24:36', status: 'pending', videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY' },
];

// Component Playlist nhận props onSelectVideo để đổi video
const CoursePlaylist = ({ onSelectVideo, currentVideo }) => {
    return (
        <div className="playlist-container">
            <div className="playlist-header">
                <h3>Danh sách phát</h3>
                <span>{playlistData.length} Videos</span>
            </div>
            <ul className="video-list">
                {playlistData.map(video => (
                    <li
                        key={video.id}
                        className={`video-item ${currentVideo.id === video.id ? "active" : ""}`}
                        onClick={() => onSelectVideo(video)}
                    >
                        <div className="video-icon"><i className="fas fa-play"></i></div> {/* Font Awesome icon */}
                        <div className="video-info">
                            <p className="video-title">{video.title}</p>
                            <span className="video-duration">({video.duration})</span>
                        </div>
                        {currentVideo.id === video.id && <span className="status-tag playing">Playing</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const DetailCourse = () => {

    const { courseId } = useParams();
    const [isPurchased, setIsPurchased] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(playlistData[0]); // mặc định phát video đầu
    const [courseDetails, setCourseDetails] = useState(null);  // State to store course details
    const [loading, setLoading] = useState(true);  // Loading state

    // Fetch course details from the API
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const res = await publicAxios.get(`/api/course/find-by-course-id?courseId=${courseId}`);
                setCourseDetails(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourseDetails();
        const token = localStorage.getItem('user_token');
        if (token) {
            setIsPurchased(true);
        }
    }, [courseId]);

    return (
        <div className="detail-course-container">
            <Navbar />
            <Breadcrumb />
            <h2>{courseDetails?.title}</h2> {/* Dynamic course name */}
            <div className="course-card-detail">
                {/* Bên trái: video player */}
                <div className="course-left">
                    <div className="video-container">
                        <iframe
                            width="100%"
                            height="360px"
                            src={currentVideo.videoUrl}   // đổi link khi click
                            title={currentVideo.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                {/* Bên phải: điều kiện hiển thị */}
                <div className="course-right">
                    {isPurchased ? (
                        // Nếu đã mua → hiện playlist
                        <CoursePlaylist onSelectVideo={setCurrentVideo} currentVideo={currentVideo} />
                    ) : (
                        // Nếu chưa mua → hiện thông tin mua hàng
                        <>
                            <h3 className="course-price">
                                {courseDetails?.realPrice} <span className="old-price">{courseDetails?.salePrice}</span>
                            </h3>
                            <span className="discount">{courseDetails?.discount}% OFF</span>

                            <button className="buy-now">MUA NGAY</button>
                            <button className="add-to-cart">THÊM VÀO GIỎ HÀNG</button>

                            <div className="course-info-detail">
                                <p><i className="fas fa-video"></i> <b>Bài giảng:</b> {courseDetails?.videoCount} Videos</p>
                                <p><i className="fas fa-file-alt"></i> <b>Tài Liệu:</b> Hồ sơ thủ tục</p>
                                <p><i className="fas fa-clock"></i> <b>Thời lượng:</b> 02h 30m</p>
                                <p><i className="fas fa-comment-dots"></i> <b>Phụ Đề</b></p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <CourseInfo courseDetails={courseDetails} />
            <Footer />
        </div>
    );
};

export default DetailCourse;
