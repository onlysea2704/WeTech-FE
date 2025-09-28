import React from 'react';
import './About.css';
import imageAbout from "../../assets/about.jpg"

const About = () => {
  return (
    <div className="whychooseus">
      {/* Left Image + Stats */}
      <div className="left">
        <div className="image-container">
          <img
            src={imageAbout}
            alt="We-Tech"
            className="main-image"
          />
        </div>

        <div className="stats-box">
          <div className="stat-item">
            <p className="stat-number">10+</p>
            <p className="stat-label">Năm kinh nghiệm</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">1000+</p>
            <p className="stat-label">Dịch vụ sử dụng</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">98%</p>
            <p className="stat-label">Khách hàng hài lòng</p>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="right-about">
        <h3 className="subtitle-about">Về Chúng Tôi</h3>
        <h2 className="title-about">Tại sao nên lựa chọn chúng tôi?</h2>
        <p className="description-about">
          Chúng tôi cung cấp tổng hợp giải pháp hồ sơ pháp lý toàn diện cho doanh nghiệp,
          hỗ trợ kinh doanh đảm bảo tuân thủ pháp luật và tối ưu quy trình.
        </p>
        <ul className="benefits">
          {[
            "Chuyên nghiệp – Nhanh chóng – Hiệu quả",
            "Dịch vụ trọn gói – Đơn giản hóa quy trình",
            "Tối ưu chi phí – Minh bạch rõ ràng",
            "Hỗ trợ chính xác – Hạn chế tối đa sai sót",
            "Bảo mật thông tin tuyệt đối",
          ].map((text, idx) => (
            <li key={idx} className="benefit-item">
              <i className="fas fa-check-circle check-icon"></i>
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <button className="learn-more-btn">Tìm hiểu thêm</button>
      </div>
    </div>
  );
};

export default About;
