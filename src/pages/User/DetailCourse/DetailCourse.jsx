import React, { useState, useEffect } from "react";
import "./DetailCourse.css";
import Navbar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import CourseInfo from "../../../components/CourseInfo/CourseInfo";
import { authAxios, publicAxios } from "../../../services/axios-instance";
import { useParams, useNavigate } from "react-router-dom";
import CustomYouTubePlayer from "../../../components/CustomYoutubePlayer/CustomYoutubePlayer";

const CoursePlaylist = ({ onSelectVideo, currentVideo, videoOfCourse }) => {

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
                        <div className="video-icon"><i className="fas fa-play"></i></div>
                        <div className="video-info">
                            <p className="video-title">{video?.description}</p>
                            <span className="video-duration">{formatVideoDuration(video?.duration) || "0s"}</span>
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
    const [currentVideo, setCurrentVideo] = useState(null);
    const [courseDetail, setCourseDetail] = useState(null);

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                const res = await publicAxios.get(`/api/course/find-by-course-id?courseId=${courseId}`);
                console.log("Chi tiết khóa học:", res.data);
                setCourseDetail(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourseDetail();

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
                        // Set video đầu tiên làm video hiện tại
                        if (allVideos.length > 0) {
                            setCurrentVideo(allVideos[0]);
                        }
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

    const handleBuyNow = async () => {
        const payload = {
            transaction: {
                transferAmount: courseDetail?.salePrice,
                code: "WT" + Date.now()
            },
            listItems: [
                {
                    idCourse: courseDetail?.courseId,
                    typeItem: "COURSE"
                }
            ]
        };

        try {
            const res = await authAxios.post("/payment/create", payload);
            console.log(res.data);
            if (res.data?.idTransaction) {
                navigate(`/register-payment/${res.data?.idTransaction}`);
            } else {
                alert("Có lỗi xảy ra khi tạo thanh toán.");
            }
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra khi tạo thanh toán.");
        }
    };

    const handleAddCourse = async () => {
        try {
            const response = await authAxios.get(`/cart/add?courseId=${courseDetail?.courseId}`);
            if (response.data != null) {
                alert("Đã thêm vào giỏ hàng!");
            } else {
                alert("Thêm vào giỏ hàng thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            alert("Có lỗi xảy ra khi kết nối tới server.");
        }
    }

    return (
        <div className="detail-course-container">
            <Navbar />
            <Breadcrumb items={[
                { label: 'Trang chủ', link: '/' },
                { label: 'Khóa học', link: '/list-courses' },
                { label: 'Tất cả khóa học' }
            ]} />

            <h2>{courseDetail?.title}</h2>
            <div className="course-card-detail">
                {/* Bên trái: video player */}
                <div className="course-left">
                    <div className="video-container">
                        {currentVideo?.link ? (
                            <CustomYouTubePlayer
                                // THÊM DÒNG NÀY:
                                key={currentVideo.videoId || currentVideo.link}

                                videoUrl={currentVideo.link}
                                title={currentVideo?.description || "Video bài học"}
                            />
                        ) : (
                            <img
                                src={courseDetail?.linkImage}
                                alt="Khóa học"
                                width="100%"
                                style={{ objectFit: "cover" }}
                            />
                        )}
                    </div>
                </div>

                <div className="course-right">
                    {isPurchased ? (
                        <CoursePlaylist
                            onSelectVideo={setCurrentVideo}
                            currentVideo={currentVideo}
                            videoOfCourse={videoOfCourse}
                        />
                    ) : (
                        <>
                            <h3 className="course-price">
                                {formatPrice(courseDetail?.salePrice)}đ <span className="old-price">{formatPrice(courseDetail?.realPrice)}đ</span>
                            </h3>
                            <span className="discount">{discountPercentage(courseDetail)}% OFF</span>

                            <button className="buy-now" onClick={handleBuyNow}>MUA NGAY</button>
                            <button className="add-to-cart" onClick={handleAddCourse}>THÊM VÀO GIỎ HÀNG</button>

                            <div className="course-info-detail">
                                <p>
                                    <i className="fas fa-user-tie"></i>
                                    <b>Tác giả:</b> {courseDetail?.author || "Đang cập nhật"}
                                </p>
                                <p>
                                    <i className="fas fa-tag"></i>
                                    <b>Thể loại:</b> {courseDetail?.typeCourse || "Chưa phân loại"}
                                </p>
                                <p><i className="fas fa-file-alt"></i> <b>Tài Liệu:</b> Hồ sơ thủ tục</p>
                                <p><i className="fas fa-video"></i> <b>Bài giảng:</b> {courseDetail?.videoCount} Videos</p>
                                {/* <p><i className="fas fa-clock"></i> <b>Thời lượng:</b> 02h 30m</p> */}
                                <p><i className="fas fa-comment-dots"></i> <b>Phụ Đề</b></p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <CourseInfo courseDetail={courseDetail} isPurchased={isPurchased} />
            <Footer />
        </div>
    );
};

export default DetailCourse;