import React from 'react';
import './NotFoundPage.css';
// Hãy chắc chắn rằng bạn đã tải một hình ảnh minh họa và đặt nó trong thư mục src/assets
import errorImage from '../../../assets/error-image.png';
import Navbar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';

const NotFoundPage = () => {
  return (

    <div>
      <Navbar />
      <div className="not-found-container">
        {/* Phần Breadcrumb ở trên cùng */}
        <div className="breadcrumb">
          <p>404 PAGE</p>
          <span>Home / Pages</span>
        </div>

        {/* Phần nội dung chính */}
        <div className="content-wrapper">
          <div className="text-content">
            <h1>SORRY, PAGE NOT FOUND!</h1>
            <p className="message" style={{color: 'orange'}}>
              Oops! Bọn mình đang "tút tát" lại trang web!
            </p>
            <p className="message" >
              Trang sẽ hoạt động trở lại trong thời gian ngắn. Quay lại sau chút xíu nhé~ Cảm ơn bạn đã đồng hành!
            </p>
            <button className="home-button" onClick={() => window.location.href = '/'}>
              ← Back To Home
            </button>
          </div>
          <div className="image-content">
            <img src={errorImage} alt="404 Page Not Found Illustration" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;