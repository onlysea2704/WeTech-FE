import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook chuyển trang
import './CartPage.css';
import Navbar from '../../../components/NavBar/NavBar';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { authAxios } from '../../../services/axios-instance';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
        .format(amount).replace('₫', 'đ');
};

const CartPage = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await authAxios.get('/cart/get-item');
                setCourses(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách khóa học:", error);
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
                const response = await authAxios.get('/cart/get-item');
                setCourses(response.data);
                alert("Đã xóa thành công!");
            } else {
                alert("Xóa thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
            alert("Có lỗi xảy ra khi kết nối tới server.");
        }
    };

    const handleBuyCourse = (courseId) => {
        navigate(`/detail-course/${courseId}`);
    };

    const handleCheckout = async () => {
        const payload = {
            transaction: {
                transferAmount: totalAmount,
                code: "WT" + Date.now()
            },
            listItems: courses.map(item => {
                return { idCourse: item.courseId, typeItem: "COURSE" };
            })
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

    const totalRealPrice = courses.reduce((acc, course) => acc + course?.realPrice, 0);
    const totalDiscount = courses.reduce((acc, course) => acc + (course?.realPrice - course?.salePrice), 0);
    const totalAmount = courses.reduce((acc, course) => acc + course?.salePrice, 0);
    return (
        <>
            <Navbar />
            <Breadcrumb
                items={[
                    { label: 'Trang chủ', link: '/' },
                    { label: 'Tài khoản của tôi' },
                ]}
            />
            <div className="cart-container">
                <div className="cart-list-section">
                    <h2 className="section-title">Giỏ hàng</h2>

                    {courses.length === 0 ? (
                        <p>Giỏ hàng của bạn đang trống.</p>
                    ) : (
                        courses.map((item, index) => (
                            <div key={index} className="course-card-payment">
                                <img
                                    src={item.linkImage || "https://via.placeholder.com/150"}
                                    alt={item.title}
                                    className="course-img"
                                />
                                <div className="course-info-payment">
                                    <div className="course-header-payment">
                                        <div>
                                            <p className="course-title">{item.title}</p>
                                            <p className="course-subtitle">
                                                {item?.typeCourse}
                                            </p>
                                            <p></p>
                                            <div className="course-actions">
                                                <span
                                                    className="action-link"
                                                    onClick={() => handleBuyCourse(item?.courseId)}
                                                >
                                                    Mua khoá học
                                                </span>
                                                <span style={{ color: '#ddd' }}>|</span>
                                                {/* Bắt sự kiện Click để xóa */}
                                                <span
                                                    className="action-delete"
                                                    style={{ marginLeft: '10px' }}
                                                    onClick={() => handleDelete(item?.courseId)}
                                                >
                                                    Xoá
                                                </span>
                                            </div>
                                        </div>
                                        <div className="course-prices">
                                            <span className="price">{formatCurrency(item.salePrice)}</span>
                                            {item.realPrice > item.salePrice && (
                                                <span className="old-price">{formatCurrency(item.realPrice)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="payment-section">
                    <h2 className="section-title">Thanh toán</h2>
                    <div className="payment-box">
                        <div className="payment-row">
                            <span>Số lượng khoá học</span>
                            <span>{courses.length} Khoá học</span>
                        </div>
                        <div className="payment-row">
                            <span>Số tiền</span>
                            <span>{formatCurrency(totalRealPrice)}</span>
                        </div>
                        <div className="payment-row">
                            <span>Giảm giá</span>
                            <span>{formatCurrency(totalDiscount)}</span>
                        </div>
                        <div className="payment-divider"></div>
                        <div className="payment-row payment-total">
                            <span>Tổng</span>
                            <span>{formatCurrency(totalAmount)}</span>
                        </div>

                        <button className="checkout-btn" onClick={handleCheckout}>
                            Thanh Toán
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default CartPage;