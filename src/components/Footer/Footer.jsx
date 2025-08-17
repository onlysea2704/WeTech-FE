import React from "react";
import "./Footer.css";
import imageLogoFooter from '../../assets/logo-footer.png'
import iconLogoZalo from '../../assets/icon-zalo.png'
import iconLogoYoutube from '../../assets/logo-youtube.png'
import iconLogoFacebook from '../../assets/logo-facebook.png'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-main">
                {/* Cột 1: Logo + mô tả + icon */}
                <div className="footer-column logo-column">
                    <img src={imageLogoFooter} alt="We-Tech Logo" className="footer-logo" />
                    <p className="company-name">
                        CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ SỐ WE-TECH
                    </p>
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
                            <li>TRANG CHỦ</li>
                            <li>GIỚI THIỆU</li>
                            <li>DỊCH VỤ PHÁP LÝ</li>
                            <li>KHÓA HỌC</li>
                            <li>LIÊN HỆ</li>
                        </ul>
                    </div>
                    <div className="menu-group">
                        <h4>Liên Kết Nhanh</h4>
                        <ul>
                            <li>Chính sách bảo mật</li>
                            <li>Điều khoản sử dụng</li>
                            <li>Câu hỏi thường gặp</li>
                            <li>Báo giá</li>
                            <li>Hỗ trợ</li>
                        </ul>
                    </div>

                    <div className="menu-group">
                        <h4>Liên Hệ</h4>
                        <ul>
                            <li><i className="fa fa-map-marker" /> SN37, Liền kề 18, KĐT Văn Khê, Hà Đông, Hà Nội</li>
                            <li><i className="fa fa-envelope" /> wetechsoft.vn@gmail.com</li>
                            <li><i className="fa fa-phone" /> 0989-466-992 / 0383-466-992</li>
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
