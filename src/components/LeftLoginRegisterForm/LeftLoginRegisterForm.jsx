import { useState, useEffect } from "react";
import styles from "./LeftLoginRegisterForm.module.css";
import backgroundLogin from "../../assets/background_login.png";
import backgroundRegister from "../../assets/background_register.jpg";

const LeftLoginRegisterForm = () => {
    const [index, setIndex] = useState(0);

    const slides = [
        {
            title: "Giải Pháp Vượt Trội...",
            content:
                "Sự hài lòng của Quý khách hàng chính là động lực để chúng tôi không ngừng cải tiến và nâng cao chất lượng dịch vụ.",
            backgroundImage: backgroundLogin,
        },
        {
            title: "Chuyên Nghiệp Dẫn Đầu",
            content: "We-tech tự hào đồng hành cùng quý khách hàng trên hành trình phát triển bền vững.",
            backgroundImage: backgroundRegister,
        },
    ];

    // Auto-advance slideshow every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const handleDotClick = (i) => {
        setIndex(i);
    };

    return (
        <div className={styles["login-left"]}>
            <div
                key={index}
                className={styles["fixed-background"]}
                style={{ backgroundImage: `url(${slides[index].backgroundImage})` }}
            ></div>
            <div className={styles["dark-overlay"]}></div>
            <div className={styles["text-slider"]} key={`text-${index}`}>
                <h2>{slides[index].title}</h2>
                <p>{slides[index].content}</p>
                <div className={styles["slider-dots"]}>
                    {slides.map((_, i) => (
                        <span
                            key={i}
                            className={`${styles.dot} ${i === index ? styles.active : ""}`}
                            onClick={() => handleDotClick(i)}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeftLoginRegisterForm;
