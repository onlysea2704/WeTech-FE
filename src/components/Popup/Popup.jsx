import Lottie from "lottie-react";
import animation from "../../assets/sign-up.json";
import styles from "./Popup.module.css";

const Popup = ({ message }) => {
    return (
        <div className={`${styles["app-container"]} ${styles.blurred}`}>
            <div className={styles["animation-overlay"]}>
                <div className={styles["animation-popup"]}>
                    <div className={styles["animation-header"]}>
                        <p>{message}</p>
                    </div>
                    <div
                        className={styles["animation-body"]}
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 16px" }}
                    >
                        <Lottie animationData={animation} loop={true} style={{ height: 180, width: 180 }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
