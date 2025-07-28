import React from "react";
import "./Hero.css";

const Hero = () => {
    return (
        <div className="legal-service-container">
            <div className="overlay">
                <div className="content">
                    <h1>
                        Cung cấp giải pháp hồ sơ pháp lý<br />
                        cho Doanh Nghiệp, Hộ kinh doanh
                    </h1>
                    <div className="buttons">
                        <button>Nhanh Gọn</button>
                        <button>Tiết Kiệm</button>
                        <button>Hiệu Quả</button>
                    </div>
                </div>
                <div className="slider-buttons">
                    <i className="fas fa-chevron-left arrow left"></i>
                    <i className="fas fa-chevron-right arrow right"></i>
                </div>
            </div>
        </div>
    );
};

export default Hero;
