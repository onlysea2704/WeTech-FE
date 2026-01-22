import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import styles from "./DetailCourse.module.css";
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
import { useNotification } from "../../../hooks/useNotification";

const DetailCourse = () => {
    const { fetchCartCount } = useCart();
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { showError, showSuccess } = useNotification();
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
                showError("Có lỗi xảy ra khi tạo thanh toán.");
            }
        } catch (error) {
            console.error(error);
            showError("Có lỗi xảy ra khi tạo thanh toán.");
        }
    };

    const handleAddCourse = async () => {
        try {
            const response = await authAxios.get(`/cart/add?courseId=${courseDetail?.courseId}`);
            if (response.data != null) {
                showSuccess("Đã thêm vào giỏ hàng!");
                fetchCartCount();
            } else {
                showError("Thêm vào giỏ hàng thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            showError("Có lỗi xảy ra khi kết nối tới server.");
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
        <div className={styles["detail-course-container"]}>
            <Navbar />
            <Breadcrumb
                items={[
                    { label: "Trang chủ", link: "/" },
                    { label: "Khóa học", link: "/list-courses" },
                    { label: courseDetail?.typeCourse },
                ]}
            />

            <div className={styles["course-info-summary"]}>
                <h2>{courseDetail?.title}</h2>
                <div className={styles["course-meta"]}>
                    <div className={styles["meta-item"]}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clip-path="url(#clip0_20_27762)">
                                <path
                                    d="M4.16634 10.9833V14.3167L9.99967 17.5L15.833 14.3167V10.9833L9.99967 14.1667L4.16634 10.9833ZM9.99967 2.5L0.833008 7.5L9.99967 12.5L17.4997 8.40833V14.1667H19.1663V7.5L9.99967 2.5Z"
                                    fill="#FFBB54"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_20_27762">
                                    <rect width="20" height="20" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span>{courseDetail?.numberRegister || 0} Học viên</span>
                    </div>
                    <div className={styles["meta-item"]}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M10.0003 1.66797C5.41699 1.66797 1.66699 5.41797 1.66699 10.0013C1.66699 14.5846 5.41699 18.3346 10.0003 18.3346C14.5837 18.3346 18.3337 14.5846 18.3337 10.0013C18.3337 5.41797 14.5837 1.66797 10.0003 1.66797ZM13.5003 13.5013L9.16699 10.8346V5.83464H10.417V10.168L14.167 12.418L13.5003 13.5013Z"
                                fill="#FFBB54"
                            />
                        </svg>
                        <span>{getTotalTime()}</span>
                    </div>
                    <div className={styles["meta-item"]}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M17.4614 3.72944C17.4604 3.58153 17.437 3.431 17.401 3.28725C17.162 2.32059 16.3635 1.70653 15.3307 1.70184C14.0896 1.69663 12.8489 1.7008 11.6078 1.7008C8.87237 1.7008 6.13748 1.69819 3.40206 1.70184C2.1479 1.7034 1.24581 2.59038 1.24477 3.82267C1.24165 7.53986 1.24269 11.257 1.24633 14.9742C1.24633 15.1477 1.26508 15.3258 1.30623 15.494C1.53696 16.4451 2.33227 17.08 3.33331 17.0836C5.71769 17.093 8.10206 17.0867 10.487 17.0867C10.525 17.0867 10.5635 17.081 10.6323 17.0758C10.6323 17.0102 10.6359 16.9591 10.6317 16.9091C10.5797 16.2628 10.7677 15.6878 11.0963 15.1331C11.8765 13.8149 12.6286 12.48 13.4021 11.1576C13.6005 10.8175 13.7969 10.4873 13.7255 10.0711C13.7239 10.0607 13.7344 10.0482 13.7479 10.0154C14.0588 10.1164 14.1437 9.86903 14.2594 9.66434C14.288 9.61382 14.3172 9.5633 14.3463 9.51225C14.4838 9.27267 14.6213 9.03361 14.7771 8.7633H13.737V6.28309H16.2104C16.2156 6.38413 16.2198 6.47632 16.2239 6.55705C16.4307 6.481 16.6187 6.38725 16.8177 6.34559C17.0229 6.30288 17.238 6.31173 17.4594 6.29715C17.4614 6.26798 17.4651 6.23673 17.4651 6.20548C17.4651 5.37996 17.4672 4.55444 17.4614 3.72944ZM4.97185 15.8263C4.3656 15.8263 3.763 15.8466 3.163 15.8185C2.82446 15.8024 2.52342 15.4722 2.50362 15.1216C2.47862 14.6768 2.49737 14.2289 2.49737 13.7654H4.97185V15.8263ZM4.9729 12.5013H2.50258V10.0274H4.9729V12.5013ZM4.97706 8.75444H2.50519V6.28257H4.97706V8.75444ZM4.97706 5.01486H2.49165V4.60132C2.49165 4.32215 2.48696 4.04298 2.49321 3.76382C2.50154 3.36798 2.78644 2.99038 3.16144 2.97007C3.76196 2.93778 4.36508 2.96121 4.97706 2.96121V5.01486ZM11.5729 10.3664C10.7401 10.844 9.90987 11.3253 9.0781 11.8055C8.85362 11.9352 8.62915 12.0659 8.40415 12.1945C7.72133 12.5847 7.06404 12.2081 7.06144 11.4248C7.05935 10.8143 7.06092 10.2039 7.06092 9.59298C7.06092 8.98934 7.05987 8.38517 7.06144 7.78101C7.06352 6.99403 7.72081 6.61642 8.40206 7.00913C9.46404 7.62163 10.5255 8.23569 11.588 8.84715C11.8729 9.01121 12.0479 9.2435 12.0547 9.58153C12.0614 9.94455 11.8786 10.1909 11.5729 10.3664ZM16.2177 5.00965H13.7291V2.96278C13.7854 2.95809 13.8406 2.94923 13.8958 2.94923C14.3698 2.94819 14.8437 2.94663 15.3177 2.94923C15.8807 2.95236 16.2151 3.28621 16.2172 3.84507C16.2187 4.2284 16.2177 4.61121 16.2177 5.00965Z"
                                fill="#FFBB54"
                            />
                            <path
                                d="M15.6769 8.875C14.4045 11.0797 13.1389 13.2724 11.866 15.4776C12.5972 15.8995 13.3071 16.3094 14.0285 16.7255C15.304 14.5161 16.5696 12.3234 17.8394 10.1229C17.1061 9.69948 16.3998 9.29219 15.6769 8.875ZM15.7717 12.0219C15.6519 12.2161 15.4128 12.2531 15.2222 12.138C15.042 12.0286 14.9608 11.8047 15.0644 11.613C15.2738 11.225 15.493 10.8417 15.729 10.4693C15.7899 10.3734 15.9274 10.3255 16.03 10.2557C16.3597 10.287 16.5759 10.6 16.4326 10.8766C16.2295 11.2677 16.0035 11.6474 15.7717 12.0219Z"
                                fill="#FFBB54"
                            />
                            <path
                                d="M17.4651 14.9461C17.4609 16.1794 16.5812 17.069 15.35 17.0872C15.1755 17.0893 15.001 17.0872 14.7781 17.0872C15.0244 16.6607 15.2489 16.268 15.4796 15.8794C15.5015 15.843 15.5625 15.8242 15.6088 15.8076C16.0114 15.6659 16.2265 15.3846 16.2125 14.9581C16.2041 14.7003 16.2708 14.4836 16.4026 14.2648C16.7526 13.6831 17.0854 13.0904 17.451 12.457C17.4578 12.5607 17.4651 12.6143 17.4651 12.668C17.4656 13.4273 17.4671 14.1867 17.4651 14.9461Z"
                                fill="#FFBB54"
                            />
                            <path
                                d="M18.6223 8.75825C18.5145 8.97127 18.3863 9.17387 18.2561 9.40096C17.5254 8.9796 16.815 8.56971 16.0916 8.15252C16.2317 7.91502 16.3499 7.68377 16.4962 7.47283C16.7275 7.14002 17.1712 7.03742 17.5363 7.22804C17.8061 7.36867 18.0702 7.52127 18.327 7.68429C18.6973 7.91867 18.8202 8.36814 18.6223 8.75825Z"
                                fill="#FFBB54"
                            />
                            <path
                                d="M13.5608 17.4156C13.4384 17.5052 13.3462 17.587 13.2416 17.6469C12.8702 17.8594 12.4973 18.0693 12.1202 18.2714C11.8374 18.4234 11.5134 18.2906 11.4957 17.9906C11.465 17.4604 11.4775 16.9276 11.4744 16.3953C11.4744 16.3521 11.4957 16.3078 11.515 16.2344C12.2025 16.6313 12.8676 17.0156 13.5608 17.4156Z"
                                fill="#FFBB54"
                            />
                        </svg>
                        <span>{sections.length} Modul</span>
                    </div>
                </div>
                <div className={styles["course-author"]}>
                    Tác giả:
                    <span>{courseDetail?.author}</span>
                </div>
                <div className={styles["course-update"]}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clip-path="url(#clip0_20_27809)">
                            <path
                                d="M14.167 2.5H5.83366C4.91699 2.5 4.17533 3.25 4.17533 4.16667L4.16699 17.5L10.0003 15L15.8337 17.5V4.16667C15.8337 3.25 15.0837 2.5 14.167 2.5Z"
                                fill="#FFBB54"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_20_27809">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span>Cập nhật mới nhất {formatDate(courseDetail?.createdAt)}</span>
                </div>
            </div>

            <div className={styles["course-card-detail"]}>
                {/* Bên trái: video player */}
                <div className={styles["course-left"]}>
                    <div className={styles["video-container"]}>
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

                <div className={styles["course-right"]}>
                    {isPurchased ? (
                        <CoursePlaylist
                            sections={sections}
                            onSelectVideo={setCurrentVideo}
                            currentVideo={currentVideo}
                        />
                    ) : (
                        <div className={styles["course-price-container"]}>
                            <div className={styles["price-header"]}>
                                <h3 className={styles["course-price"]}>{formatPrice(courseDetail?.salePrice)}đ</h3>
                                <span className={styles["old-price"]}>{formatPrice(courseDetail?.realPrice)}đ</span>
                                <span className={styles["discount-badge"]}>
                                    Giảm giá {discountPercentage(courseDetail)}%
                                </span>
                            </div>

                            <button className={styles["add-to-cart-btn"]} onClick={handleAddCourse}>
                                Thêm vào giỏ hàng
                            </button>
                            <button className={styles["buy-now-btn"]} onClick={handleBuyNow}>
                                Mua ngay
                            </button>
                            <p className={styles["guarantee-text"]}>Bảo đảm hoàn tiền trong vòng 30 ngày</p>

                            <div className={`${styles["course-specs"]} ${styles["display-grid"]}`}>
                                <div className={styles["spec-item"]}>
                                    <div className={styles["spec-label"]}>
                                        <img src={clockIcon2} alt="" />
                                        <span>Thời lượng khoá học</span>
                                    </div>
                                    <span className={styles["spec-value"]}>{getTotalTime()}</span>
                                </div>
                                <div className={styles["spec-item"]}>
                                    <div className={styles["spec-label"]}>
                                        <img src={usersIcon} alt="" />
                                        <span>Học viên</span>
                                    </div>
                                    <span className={styles["spec-value"]}>{courseDetail?.numberRegister || 0}</span>
                                </div>
                                <div className={styles["spec-item"]}>
                                    <div className={styles["spec-label"]}>
                                        <img src={notebookIcon} alt="" />
                                        <span>Ngôn ngữ</span>
                                    </div>
                                    <span className={styles["spec-value"]}>Việt Nam</span>
                                </div>
                                <div className={styles["spec-item"]}>
                                    <div className={styles["spec-label"]}>
                                        <img src={notepadIcon} alt="" />
                                        <span>Phụ đề</span>
                                    </div>
                                    <span className={styles["spec-value"]}>Việt Nam</span>
                                </div>
                            </div>

                            <div className={styles["course-includes"]}>
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

                            <div className={styles["course-share"]}>
                                <h4>Chia sẻ khóa học này:</h4>
                                <div className={styles["share-buttons"]}>
                                    <button className={styles["copy-link-btn"]}>
                                        <img src={copyIcon} alt="" />
                                        Copy link
                                    </button>
                                    <div className={styles["social-icons"]}>
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
