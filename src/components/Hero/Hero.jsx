import React, { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import previousIcon from "../../assets/previous-icon.png";
import nextIcon from "../../assets/next-icon.png";
import heroImage from "../../assets/hero.jpg";

const heroImages = [heroImage, heroImage, heroImage];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, isTransitioning]);

    // Handle previous button click
    const handlePrevious = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1));
        setTimeout(() => setIsTransitioning(false), 500);
    };

    // Handle next button click
    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    return (
        <div className={styles["legal-service-container"]}>
            <div className={styles["hero-slider"]}>
                {heroImages.map((image, index) => (
                    <div
                        key={index}
                        className={`${styles["hero-slide"]} ${
                            index === currentIndex ? styles.active : ""
                        } ${index === currentIndex - 1 || (currentIndex === 0 && index === heroImages.length - 1) ? styles.prev : ""}`}
                    >
                        <img src={image} alt={`Hero ${index + 1}`} />
                    </div>
                ))}
            </div>
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <h1>
                        Cung cấp giải pháp hồ sơ pháp lý
                        <br />
                        cho Doanh Nghiệp, Hộ kinh doanh
                    </h1>
                    <div className={styles.buttons}>
                        <button>Nhanh Gọn</button>
                        <button>Tiết Kiệm</button>
                        <button>Hiệu Quả</button>
                    </div>
                </div>
                <div className={styles["slider-buttons"]}>
                    <img
                        src={previousIcon}
                        alt="previous image"
                        className={styles["previous-icon"]}
                        onClick={handlePrevious}
                    />
                    <img src={nextIcon} alt="next image" className={styles["next-icon"]} onClick={handleNext} />
                </div>
            </div>
        </div>
    );
};

export default Hero;
