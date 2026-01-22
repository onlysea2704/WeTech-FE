import React from "react";
import styles from "./NotFoundPage.module.css";
import notFoundImage from "../../../assets/not-found-page.png";
import Navbar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";

const NotFoundPage = () => {
    return (
        <div>
            <Navbar />
            <div className={styles["not-found-container"]}>
                {/* Breadcrumb section */}
                <div className={styles["breadcrumb"]}>
                    <p>404 PAGE</p>
                    <span>
                        Home <span className={styles["double-div"]}>//</span> Pages
                    </span>
                </div>

                {/* Main content */}
                <div className={styles["content-wrapper"]}>
                    <div className={styles["text-content"]}>
                        <h1>SORRY, PAGE NOT FOUND!</h1>
                        <p className={`${styles["message"]} ${styles["orange-text"]}`}>
                            Oops! Bọn mình đang "tút tát" lại trang web!
                        </p>
                        <p className={styles["message"]}>
                            Trang sẽ hoạt động trở lại trong thời gian ngắn. Quay lại sau chút xíu nhé~ Cảm ơn bạn đã
                            đồng hành!
                        </p>
                        <button className={styles["home-button"]} onClick={() => (window.location.href = "/")}>
                            ← Back To Home
                        </button>
                    </div>
                    <div className={styles["image-content"]}>
                        <img src={notFoundImage} alt="404 Page Not Found Illustration" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NotFoundPage;
