import React from "react";
import "./NotFoundPage.css";
import notFoundImage from "../../../assets/not-found-page.png";
import Navbar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";

const NotFoundPage = () => {
    return (
        <div>
            <Navbar />
            <div className="not-found-container">
                {/* Breadcrumb section */}
                <div className="breadcrumb">
                    <p>404 PAGE</p>
                    <span>
                        Home <span className="double-div">//</span> Pages
                    </span>
                </div>

                {/* Main content */}
                <div className="content-wrapper">
                    <div className="text-content">
                        <h1>SORRY, PAGE NOT FOUND!</h1>
                        <p className="message orange-text">Oops! Bọn mình đang "tút tát" lại trang web!</p>
                        <p className="message">
                            Trang sẽ hoạt động trở lại trong thời gian ngắn. Quay lại sau chút xíu nhé~ Cảm ơn bạn đã
                            đồng hành!
                        </p>
                        <button className="home-button" onClick={() => (window.location.href = "/")}>
                            ← Back To Home
                        </button>
                    </div>
                    <div className="image-content">
                        <img src={notFoundImage} alt="404 Page Not Found Illustration" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NotFoundPage;
