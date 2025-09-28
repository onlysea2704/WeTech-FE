import React from "react";
import "./ProcedureCard.css";
import demoProcedure from "../../assets/demo-procedure.jpg"
import { useNavigate } from "react-router-dom";

const ProcedureCard = ({ image, title, description, realPrice, procedureId }) => {

    const navigate = useNavigate();
    const handleClick = async () => {
        // navigate("/detail-course/" + course.id_course);
        navigate("/process-procedure/" + procedureId);
        window.scrollTo(0, 0);
    }

    return (
        <div className="procedure-card" onClick={handleClick}>
            <img src={demoProcedure} alt={title} className="procedure-image" />
            <h3 className="procedure-title">{title}</h3>
            <p className="procedure-desc">{description}</p>
            <div className="procedure-price">
                {Number(realPrice).toLocaleString("vi-VN")}₫
            </div>
            <div className="procedure-actions">
                <a href="#">→ Chi tiết</a>
                <button>
                    <i className="fa fa-cart-shopping"></i> Đăng Ký Dịch Vụ
                </button>
            </div>
        </div>
    );
};

export default ProcedureCard;
