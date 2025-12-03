import React, { useState } from 'react';
import './ContactUs.css';
import Navbar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import map from '../../../assets/map.png';
import { publicAxios } from '../../../services/axios-instance';
import Popup from '../../../components/Popup/Popup';

const ContactUs = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: ""
  });

  const [loading, setLoading] = useState(false);

  // Hàm cập nhật input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Gửi API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await publicAxios.post("/api/auth/contact", form);

      if (response.status === 200) {
        alert("Đã gửi yêu cầu tư vấn thành công! Chúng tôi sẽ liên hệ với bạn sớm.");
        setForm({ name: "", email: "", phone: "", service: "" });
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <Breadcrumb
        items={[
          { label: 'Trang chủ', link: '/' },
          { label: 'Liên hệ chúng tôi' }
        ]}
      />

      <div className="contact-container">
        <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>

        <div className="contact-content">

          {/* Form Tư Vấn */}
          <div className="form-wrapper">
            <h2>Nhận Tư Vấn Miễn Phí</h2>
            <p>Để lại thông tin để được tư vấn dịch vụ chi tiết!</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Họ và Tên"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <textarea
                name="service"
                placeholder="Dịch vụ bạn muốn tư vấn?"
                value={form.service}
                onChange={handleChange}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Đang gửi..." : "Đăng Ký Ngay"}
              </button>
            </form>

            <p className="terms-policy">
              Khi gửi thông tin, bạn đồng ý với <a href="#1">Điều khoản</a> và <a href="#1">Chính sách bảo mật</a>.
            </p>
          </div>

          {/* Thông Tin Liên Hệ */}
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
              <img src={map} alt="Bản đồ vị trí" />
            </div>
          </div>

        </div>
      </div>

      <Footer />
      {/* {loading && <Popup message='Đang gửi yêu cầu tư vấn' />} */}
    </div>
  );
};

export default ContactUs;
