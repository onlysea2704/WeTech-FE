import React from "react";
import "./ProcedureCard.css";
import demoProcedure from "../../assets/demo-procedure.jpg"

const ProcedureCard = ({ image, title, desc, price }) => {
    return (
        <div className="procedure-card">
            <img src={demoProcedure} alt={title} className="procedure-image" />
            <h3 className="procedure-title">{title}</h3>
            <p className="procedure-desc">{desc}</p>
            <div className="procedure-price">{price}₫</div>
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
