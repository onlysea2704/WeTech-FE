import "./Footer.css";
import imageLogoFooter from "../../assets/logo-footer.png";
import iconLogoZalo from "../../assets/icon-zalo.png";
import iconLogoYoutube from "../../assets/logo-youtube.png";
import iconLogoFacebook from "../../assets/logo-facebook.png";
// 1. Import Link từ react-router-dom
import { Link } from "react-router-dom";
import locationIcon from "../../assets/location-icon.png";
import emailIcon from "../../assets/email-icon.png";
import phoneIcon from "../../assets/phone-icon.png";
import Tooltip from "../Tooltip/Tooltip";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <footer className="footer">
            <div className="footer-main">
                {/* Cột 1: Logo + mô tả + icon */}
                <div className="footer-column logo-column">
                    <img src={imageLogoFooter} alt="We-Tech Logo" className="footer-logo" />
                    <p className="company-name">CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ SỐ WE-TECH</p>
                    <div className="social-icons">
                        <img src={iconLogoFacebook} alt="Facebook" />
                        <img src={iconLogoZalo} alt="Zalo" />
                        <img src={iconLogoYoutube} alt="YouTube" />
                    </div>
                </div>

                {/* Cột 2: Danh mục và liên kết nhanh */}
                <div className="footer-column menu-column">
                    <div className="menu-group">
                        <h4>Danh Mục</h4>
                        <ul>
                            {/* 2. Gắn Link vào Trang chủ */}
                            <li>
                                <Link to="/" onClick={scrollToTop}>
                                    TRANG CHỦ
                                </Link>
                            </li>

                            <li>GIỚI THIỆU</li>
                            <li>DỊCH VỤ PHÁP LÝ</li>

                            {/* 3. Gắn Link vào Khóa học */}
                            <li>
                                <Link to="/list-courses" onClick={scrollToTop}>
                                    KHÓA HỌC
                                </Link>
                            </li>

                            {/* 4. Gắn Link vào Liên hệ */}
                            <li>
                                <Link to="/contact-us" onClick={scrollToTop}>
                                    LIÊN HỆ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="menu-group">
                        <h4>Liên Kết Nhanh</h4>
                        <ul>
                            <li>Chính sách bảo mật</li>
                            <li>Điều khoản sử dụng</li>
                            <li>
                                <Link to="/faq" onClick={scrollToTop}>
                                    Câu hỏi thường gặp
                                </Link>
                            </li>
                            <li>Báo giá</li>
                            <li>Hỗ trợ</li>
                        </ul>
                    </div>

                    <div className="menu-group">
                        <h4>Liên Hệ</h4>
                        <ul>
                            <li>
                                <div>
                                    <img src={locationIcon} alt="" />
                                </div>
                                <div>
                                    <p>Địa chỉ</p>
                                    <p>SN37, Liền kề 18, KĐT Văn Khê, Hà Đông, Hà Nội</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src={emailIcon} alt="" />
                                </div>
                                <div>
                                    <p>Email</p>
                                    <Tooltip text="Nhấn để sao chép" copyValue="wetechsoft.vn@gmail.com">
                                        <p className="clickable-content">wetechsoft.vn@gmail.com</p>
                                    </Tooltip>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src={phoneIcon} alt="" />
                                </div>
                                <div>
                                    <p>Số điện thoại / Zalo</p>
                                    <p>
                                        <Tooltip text="Nhấn để sao chép" copyValue="0989466992">
                                            <span className="clickable-content">0989-466-992</span>
                                        </Tooltip>
                                        <span> / </span>
                                        <Tooltip text="Nhấn để sao chép" copyValue="0383466992">
                                            <span className="clickable-content">0383-466-992</span>
                                        </Tooltip>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Dòng cuối */}
            <div className="footer-bottom">
                <hr />
                <p>Copyright © 2025 wetechsoft. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
