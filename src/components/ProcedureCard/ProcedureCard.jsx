import React from "react";
import styles from "./ProcedureCard.module.css";
import demoProcedure from "../../assets/demo-procedure.jpg";
import { useNavigate } from "react-router-dom";

const ProcedureCard = ({ image, title, description, realPrice, procedureId }) => {
    const navigate = useNavigate();
    const handleClick = async () => {
        // navigate("/detail-course/" + course.id_course);
        navigate("/process-procedure/" + procedureId);
        window.scrollTo(0, 0);
    };

    return (
        <div className={styles["procedure-card"]} onClick={handleClick}>
            <img src={demoProcedure} alt={title} className={styles["procedure-image"]} />
            <h3 className={styles["procedure-title"]}>{title}</h3>
            <p className={styles["procedure-desc"]}>{description}</p>
            <div className={styles["procedure-price"]}>{Number(realPrice).toLocaleString("vi-VN")}₫</div>
            <div className={styles["procedure-actions"]}>
                <a href="#">→ Chi tiết</a>
                <button>
                    <i className="fa fa-cart-shopping"></i> Đăng Ký Dịch Vụ
                </button>
            </div>
        </div>
    );
};

export default ProcedureCard;
