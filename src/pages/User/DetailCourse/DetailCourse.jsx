import React, { useState, useEffect } from "react";
import "./DetailCourse.css";
import Navbar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import CourseInfo from "../../../components/CourseInfo/CourseInfo";
import { authAxios, publicAxios } from "../../../services/axios-instance";
import { useParams, useNavigate } from "react-router-dom";

// Component Playlist nhận props onSelectVideo để đổi video
const CoursePlaylist = ({ onSelectVideo, currentVideo, videoOfCourse }) => {

    // 👉 Hàm định dạng từng video
    const formatVideoDuration = (duration) => {
        if (!duration) return "0m";
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);

        if (hours > 0) return `${hours}h ${minutes}m`;
        if (minutes > 0) return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
        return `${seconds}s`;
    };

    return (
        <div className="playlist-container">
            <div className="playlist-header">
                <h3>Danh sách phát</h3>
                <span>{videoOfCourse.length} Videos</span>
            </div>
            <div className="video-list">
                {videoOfCourse.map(video => (
                    <div
                        key={video?.videoId}
                        className={`video-item ${currentVideo?.videoId === video?.videoId ? "active" : ""}`}
                        onClick={() => onSelectVideo(video)}
                    >
                        <div className="video-icon"><i className="fas fa-play"></i></div> {/* Font Awesome icon */}
                        <div className="video-info">
                            <p className="video-title">{video?.description}</p>
                            <span className="video-duration">{formatVideoDuration(video?.duration) || 0`s`}</span>
                        </div>
                        {currentVideo?.videoId === video?.videoId && <span className="status-tag playing">Playing</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

const DetailCourse = () => {

    const { courseId } = useParams();
    const navigate = useNavigate();
    const [isPurchased, setIsPurchased] = useState(false);
    const [videoOfCourse, setVideoOfCourse] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(videoOfCourse[0]);
    const [courseDetails, setCourseDetails] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const res = await publicAxios.get(`/api/course/find-by-course-id?courseId=${courseId}`);
                console.log("Chi tiết khóa học:", res.data);
                setCourseDetails(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourseDetails();
        const token = sessionStorage.getItem('authToken');
        if (token) {
            const fetchCheckMyCourse = async () => {
                try {
                    const res = await authAxios.get(`/api/course/check-have-course?courseId=${courseId}`);
                    setIsPurchased(res.data);
                    if (res.data) {
                        const response = await publicAxios.get(`/api/video/find-by-courseId?courseId=${courseId}`);
                        const allVideos = response.data.flatMap(section => section.videos || []);
                        setVideoOfCourse(allVideos);
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            fetchCheckMyCourse();
        }
    }, [courseId]);

    const discountPercentage = (course) => Math.round(((course?.realPrice - course?.salePrice) / course?.realPrice) * 100);
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const handleBuyNow = () => {
        navigate(`/register-payment/${courseId}`);
    };

    return (
        <div className="detail-course-container">
            <Navbar />
            <Breadcrumb items={[
                { label: 'Trang chủ', link: '/' },
                { label: 'Khóa học', link: '/list-courses' },
                { label: 'Tất cả khóa học' } 
            ]} />

            <h2>{courseDetails?.title}</h2> 
            <div className="course-card-detail">
                {/* Bên trái: video player */}
                <div className="course-left">
                    <div className="video-container">
                        {currentVideo?.link ? (
                            <iframe
                                width="100%"
                                height="360px"
                                src={currentVideo.link}
                                title={currentVideo?.description || "Video bài học"}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img
                                src={courseDetails?.linkImage}   // ảnh khóa học (truyền vào props hoặc import)
                                alt="Khóa học"
                                width="100%"
                                height="360px"
                                style={{ objectFit: "cover" }}
                            />
                        )}
                    </div>
                </div>


                {/* Bên phải: điều kiện hiển thị */}
                <div className="course-right">
                    {isPurchased ? (
                        // Nếu đã mua → hiện playlist
                        <CoursePlaylist
                            onSelectVideo={setCurrentVideo}
                            currentVideo={currentVideo}
                            videoOfCourse={videoOfCourse} />
                    ) : (
                        // Nếu chưa mua → hiện thông tin mua hàng
                        <>
                            <h3 className="course-price">
                                {formatPrice(courseDetails?.salePrice)}đ <span className="old-price">{formatPrice(courseDetails?.realPrice)}đ</span>
                            </h3>
                            <span className="discount">{discountPercentage(courseDetails)}% OFF</span>

                            <button className="buy-now" onClick={handleBuyNow}>MUA NGAY</button>
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
            <CourseInfo courseDetails={courseDetails} isPurchased={isPurchased} />
            <Footer />
        </div>
    );
};

export default DetailCourse;
