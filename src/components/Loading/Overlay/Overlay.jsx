import styles from "./Overlay.module.css";

export default function Overlay() {
    return (
        <div className={styles.overlay}>
            <div className={styles.loaderContainer}>
                <div className={styles.loader}></div>
                <p>Đang tải dữ liệu...</p>
            </div>
        </div>
    );
}
