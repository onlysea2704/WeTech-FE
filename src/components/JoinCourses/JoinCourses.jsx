import aareImage from "../../assets/Aare.png";
import styles from "./JoinCourses.module.css";

export default function JoinCourses() {
    return (
        <div className={styles["join-courses"]}>
            <div className={styles["join-content"]}>
                <h3>Tham Gia Khoá Học của WeTech</h3>
                <p>Trở thành Học Viên và Học Mọi Khoá Học.</p>
            </div>
            <div className={styles["join-action"]}>
                <div className={styles["input-group"]}>
                    <input type="email" placeholder="Email" />
                    <button>Đăng ký</button>
                </div>
            </div>
            <img src={aareImage} alt="" className={styles["join-bg-image"]} />
        </div>
    );
}
