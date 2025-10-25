import React from 'react';
import './ContactUs.css';
import Navbar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import map from '../../../assets/map.png'

const ContactUs = () => {
  return (

    <div>
      <Navbar />
      <Breadcrumb items={[
        { label: 'Trang chủ', link: '/' },
        { label: 'Liên hệ chúng tôi' }
      ]} />
      <div className="contact-container">
        <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
        <div className="contact-content">
          {/* Phần Form Đăng Ký */}
          <div className="form-wrapper">
            <h2>Nhận Tư Vấn Miễn Phí</h2>
            <p>Để lại thông tin để được tư vấn dịch vụ chi tiết!</p>
            <form>
              <input type="text" placeholder="Họ và Tên" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone" required />
              <textarea placeholder="Dịch vụ cần tư vấn"></textarea>
              <button type="submit">Đăng Ký Ngay</button>
            </form>
            <p className="terms-policy">
              By contacting us, you agree to your <a href="#1">Terms Of Service</a> and <a href="#1">Privacy Policy</a>
            </p>
          </div>

          {/* Phần Thông Tin Liên Hệ */}
          <div className="info-wrapper">
            <h2>Thông Tin Liên Hệ</h2>
            <div className="info-item">
              <i className="fas fa-phone-alt"></i>
              <p>0989 466 992</p>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <p>wetechsoft.vn@gmail.com</p>
            </div>
            <div className="map-container">
              {/* Bạn có thể nhúng bản đồ thật hoặc dùng ảnh tĩnh */}
              <img src={map} alt="Bản đồ vị trí" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;