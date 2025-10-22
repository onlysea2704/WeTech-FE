import React from "react";
import "./Banner.css";

const Banner = () => {
    return (
        <div className="banner-container">
            {/* Nút điều hướng trái */}
            <button className="nav-btn left-btn">
                <i className="fa-solid fa-chevron-left"></i>
            </button>

            {/* Nội dung banner */}
            <div className="banner-content">
                <div className="banner-text">
                    <h2>Tự Làm Thủ Tục Pháp Lý</h2>
                    <p>Become professionals and ready to join the world.</p>
                    <button className="btn-primary">Khám phá ngay</button>
                </div>

                <div className="banner-image">
                    <div className="author-info">
                        {/* <img
                            src="https://via.placeholder.com/40"
                            alt="Mộc Lan"
                            className="author-avatar"
                        /> */}
                        <div>
                            <div className="author-name">Mộc Lan</div>
                            <div className="author-job">Kế Toán</div>
                        </div>
                    </div>
                    <div className="award-info">
                        Winner Photo 2017 Awards <br />
                        Joined Klevr since 2006
                    </div>
                </div>
            </div>

            {/* Nút điều hướng phải */}
            <button className="nav-btn right-btn">
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default Banner;
