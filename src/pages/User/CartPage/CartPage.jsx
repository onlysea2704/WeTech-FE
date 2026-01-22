import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom"; // Import hook chuyển trang
import Navbar from "../../../components/NavBar/NavBar";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import { authAxios } from "../../../services/axios-instance";
import styles from "./CartPage.module.css";
import CourseListSkeleton from "../../../components/Skeleton/CourseListSkeleton";
import { useNotification } from "../../../hooks/useNotification";

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount).replace("₫", "đ");
};

const CartPage = () => {
    const { fetchCartCount } = useCart();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { showSuccess, showError } = useNotification();
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await authAxios.get("/cart/get-item");
                setCourses(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách khóa học:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // 2. Xử lý xóa khóa học
    const handleDelete = async (courseId) => {
        // Hỏi xác nhận trước khi xóa
        if (!window.confirm("Bạn có chắc chắn muốn xóa khóa học này khỏi giỏ hàng?")) return;

        try {
            // Gọi API xóa (Method: DELETE)
            const response = await authAxios.get(`/cart/delete?courseId=${courseId}`);
            console.log(response);
            if (response.data === true) {
                const response = await authAxios.get("/cart/get-item");
                setCourses(response.data);
                fetchCartCount();
                showSuccess("Đã xóa thành công!");
            } else {
                showError("Xóa thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
            showError("Có lỗi xảy ra khi kết nối tới server.");
        }
    };

    const handleBuyCourse = (courseId) => {
        navigate(`/detail-course/${courseId}`);
    };

    const handleCheckout = async () => {
        const payload = {
            transaction: {
                transferAmount: totalAmount,
                code: "WT" + Date.now(),
            },
            listItems: courses.map((item) => {
                if (!item) {
                    return {
                        idCourse: null,
                        typeItem: "COURSE",
                    };
                }
                return {
                    idCourse: item.courseId,
                    typeItem: "COURSE",
                };
            }),
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

    const totalRealPrice = courses.reduce((acc, course) => {
        if (!course) return acc;
        return acc + course.realPrice;
    }, 0);
    const totalDiscount = courses.reduce((acc, course) => {
        if (!course) return acc;
        return acc + (course.realPrice - course.salePrice);
    }, 0);
    const totalAmount = courses.reduce((acc, course) => {
        if (!course) return acc;
        return acc + course.salePrice;
    }, 0);
    return (
        <>
            <Navbar />
            <Breadcrumb items={[{ label: "Trang chủ", link: "/" }, { label: "Tài khoản của tôi" }]} />
            <div className={styles.cartContainer}>
                <div className={styles.cartListSection}>
                    <h2 className={styles.sectionTitle}>Giỏ hàng</h2>

                    {loading ? (
                        Array.from({ length: 3 }).map((_, index) => <CourseListSkeleton key={index} />)
                    ) : courses.length === 0 ? (
                        <p>Giỏ hàng của bạn đang trống.</p>
                    ) : (
                        courses.map((item, index) => {
                            if (!item) return null;
                            return (
                                <div key={index} className={styles.courseCardPayment}>
                                    <img
                                        src={item.linkImage || "https://via.placeholder.com/150"}
                                        alt={item.title}
                                        className={styles.courseImg}
                                    />
                                    <div className={styles.courseInfoPayment}>
                                        <div className={styles.courseHeaderPayment}>
                                            <div>
                                                <p className={styles.courseTitle}>{item.title}</p>
                                                <p className={styles.courseAuthor}>
                                                    Tác giả: <span>{item.author}</span>
                                                </p>
                                                <div className={styles.courseActions}>
                                                    <span
                                                        className={styles.actionLink}
                                                        onClick={() => handleBuyCourse(item?.courseId)}
                                                    >
                                                        Mua khoá học
                                                    </span>
                                                    <span style={{ color: "#ddd" }}>|</span>
                                                    {/* Bắt sự kiện Click để xóa */}
                                                    <span
                                                        className={styles.actionDelete}
                                                        style={{ marginLeft: "10px" }}
                                                        onClick={() => handleDelete(item?.courseId)}
                                                    >
                                                        Xoá
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={styles.coursePrices}>
                                                <span className={styles.price}>{formatCurrency(item.salePrice)}</span>
                                                {item.realPrice > item.salePrice && (
                                                    <span className={styles.oldPrice}>
                                                        {formatCurrency(item.realPrice)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className={styles.paymentSection}>
                    <h2 className={styles.sectionTitle}>Thanh toán</h2>
                    <div className={styles.paymentBox}>
                        <div className={styles.paymentRow}>
                            <span>Số lượng khoá học</span>
                            <span>{courses.length} Khoá học</span>
                        </div>
                        <div className={styles.paymentRow}>
                            <span>Số tiền</span>
                            <span>{formatCurrency(totalRealPrice)}</span>
                        </div>
                        <div className={styles.paymentRow}>
                            <span>Giảm giá</span>
                            <span>{formatCurrency(totalDiscount)}</span>
                        </div>
                        <div className={styles.paymentDivider}></div>
                        <div className={`${styles.paymentRow} ${styles.paymentTotal}`}>
                            <span>Tổng</span>
                            <span>{formatCurrency(totalAmount)}</span>
                        </div>

                        <button className={styles.checkoutBtn} onClick={handleCheckout}>
                            Thanh Toán
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;
