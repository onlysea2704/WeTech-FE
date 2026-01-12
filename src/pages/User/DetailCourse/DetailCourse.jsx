import React, { useState, useEffect } from "react";
import "./DetailCourse.css";
import Navbar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import CourseInfo from "../../../components/CourseInfo/CourseInfo";
import { authAxios, publicAxios } from "../../../services/axios-instance";
import { useParams, useNavigate } from "react-router-dom";
import CustomYouTubePlayer from "../../../components/CustomYoutubePlayer/CustomYoutubePlayer";
import CoursePlaylist from "../../../components/CoursePlaylist/CoursePlaylist";
import memberIcon from "../../../assets/member-icon.png";
import modulIcon from "../../../assets/modul-icon.png";
import clockIcon from "../../../assets/clock-icon.png";
import updateIcon from "../../../assets/update-icon.png";

import copyIcon from "../../../assets/copy-icon.png";
import facekookIcon from "../../../assets/facebook-icon.png";
import twitterIcon from "../../../assets/twitter-icon.png";
import instagramIcon from "../../../assets/instagram-icon.png";
import envelopeIcon from "../../../assets/envelope-icon.png";
import clockIcon2 from "../../../assets/clock-icon2.png";
import usersIcon from "../../../assets/users-icon.png";
import notebookIcon from "../../../assets/notebook-icon.png";
import notepadIcon from "../../../assets/notepad-icon.png";
import monitorIcon from "../../../assets/monitor-icon.png";
import trophyIcon from "../../../assets/trophy-icon.png";

const DetailCourse = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [isPurchased, setIsPurchased] = useState(false);
    const [sections, setSections] = useState([]); // Store full section data
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

        const token = sessionStorage.getItem("authToken");
        if (token) {
            const fetchCheckMyCourse = async () => {
                try {
                    const res = await authAxios.get(`/api/course/check-have-course?courseId=${courseId}`);
                    setIsPurchased(res.data);
                    if (res.data) {
                        const response = await publicAxios.get(`/api/video/find-by-courseId?courseId=${courseId}`);
                        // The API returns sections with videos directly
                        setSections(response.data);

                        // Flatten to find the first video if needed
                        const allVideos = response.data.flatMap((section) => section.videos || []);
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

    const formatDurationVerbose = (duration) => {
        if (!duration) return "0m";
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);

        if (hours > 0) return `${hours}h ${minutes}m`;
        if (minutes > 0) return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
        return `${seconds}s`;
    };

    function getTotalTime() {
        let totalTime = 0;
        sections.forEach((section) => {
            totalTime += section.videos.reduce((total, video) => total + video.duration, 0);
        });
        return formatDurationVerbose(totalTime);
    }

    const discountPercentage = (course) =>
        Math.round(((course?.realPrice - course?.salePrice) / course?.realPrice) * 100);
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price);
    };

    const handleBuyNow = async () => {
        const payload = {
            transaction: {
                transferAmount: courseDetail?.salePrice,
                code: "WT" + Date.now(),
            },
            listItems: [
                {
                    idCourse: courseDetail?.courseId,
                    typeItem: "COURSE",
                },
            ],
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
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="detail-course-container">
            <Navbar />
            <Breadcrumb
                items={[
                    { label: "Trang chủ", link: "/" },
                    { label: "Khóa học", link: "/list-courses" },
                    { label: courseDetail?.typeCourse },
                ]}
            />

            <div className="course-info-summary">
                <h2>{courseDetail?.title}</h2>
                <div className="course-meta">
                    <div className="meta-item">
                        <img src={memberIcon} alt="" />
                        <span>{courseDetail?.numberRegister || 0} Học viên</span>
                    </div>
                    <div className="meta-item">
                        <img src={clockIcon} alt="" />
                        <span>{getTotalTime()}</span>
                    </div>
                    <div className="meta-item">
                        <img src={modulIcon} alt="" />
                        <span>{sections.length} Modul</span>
                    </div>
                </div>
                <div className="course-author">
                    Tác giả:
                    <span>{courseDetail?.author}</span>
                </div>
                <div className="course-update">
                    <img src={updateIcon} alt="" />
                    <span>Cập nhật mới nhất {formatDate(courseDetail?.createdAt)}</span>
                </div>
            </div>

            <div className="course-card-detail">
                {/* Bên trái: video player */}
                <div className="course-left">
                    <div className="video-container">
                        {currentVideo?.link ? (
                            <CustomYouTubePlayer
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
                            sections={sections}
                            onSelectVideo={setCurrentVideo}
                            currentVideo={currentVideo}
                        />
                    ) : (
                        <div className="course-price-container">
                            <div className="price-header">
                                <h3 className="course-price">{formatPrice(courseDetail?.salePrice)}đ</h3>
                                <span className="old-price">{formatPrice(courseDetail?.realPrice)}đ</span>
                                <span className="discount-badge">Giảm giá {discountPercentage(courseDetail)}%</span>
                            </div>

                            <button className="add-to-cart-btn" onClick={handleAddCourse}>
                                Thêm vào giỏ hàng
                            </button>
                            <button className="buy-now-btn" onClick={handleBuyNow}>
                                Mua ngay
                            </button>
                            <p className="guarantee-text">Bảo đảm hoàn tiền trong vòng 30 ngày</p>

                            <div className="course-specs display-grid">
                                <div className="spec-item">
                                    <div className="spec-label">
                                        <img src={clockIcon2} alt="" />
                                        <span>Thời lượng khoá học</span>
                                    </div>
                                    <span className="spec-value">{getTotalTime()}</span>
                                </div>
                                <div className="spec-item">
                                    <div className="spec-label">
                                        <img src={usersIcon} alt="" />
                                        <span>Học viên</span>
                                    </div>
                                    <span className="spec-value">{courseDetail?.numberRegister || 0}</span>
                                </div>
                                <div className="spec-item">
                                    <div className="spec-label">
                                        <img src={notebookIcon} alt="" />
                                        <span>Ngôn ngữ</span>
                                    </div>
                                    <span className="spec-value">Việt Nam</span>
                                </div>
                                <div className="spec-item">
                                    <div className="spec-label">
                                        <img src={notepadIcon} alt="" />
                                        <span>Phụ đề</span>
                                    </div>
                                    <span className="spec-value">Việt Nam</span>
                                </div>
                            </div>

                            <div className="course-includes">
                                <h4>Khóa học này bao gồm:</h4>
                                <ul>
                                    <li>
                                        <img src={clockIcon2} alt="" />
                                        <span>Truy cập trọn đời</span>
                                    </li>
                                    <li>
                                        <img src={notepadIcon} alt="" />
                                        <span>File bài tập miễn phí và tài liệu có thể tải xuống</span>
                                    </li>
                                    <li>
                                        <img src={monitorIcon} alt="" />
                                        <span>Truy cập trên điện thoại di động, máy tính và TV</span>
                                    </li>
                                    <li>
                                        <img src={trophyIcon} alt="" />
                                        <span>Chứng chỉ hoàn thành</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="course-share">
                                <h4>Chia sẻ khóa học này:</h4>
                                <div className="share-buttons">
                                    <button className="copy-link-btn">
                                        <img src={copyIcon} alt="" />
                                        Copy link
                                    </button>
                                    <div className="social-icons">
                                        <img src={facekookIcon} alt="" />
                                        <img src={instagramIcon} alt="" />
                                        <img src={envelopeIcon} alt="" />
                                        <img src={twitterIcon} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <CourseInfo courseDetail={courseDetail} isPurchased={isPurchased} />
            <Footer />
        </div>
    );
};

export default DetailCourse;
