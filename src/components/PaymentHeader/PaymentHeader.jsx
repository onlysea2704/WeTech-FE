import React from "react";
import "./PaymentHeader.css";
import logoImage from "../../assets/logo.png";

const PaymentHeader = ({ currentStep = 3, isSuccess = false }) => {
    const steps = [
        { id: 1, label: "Thông tin" },
        { id: 2, label: "Thanh toán" },
        { id: 3, label: "Thành công" },
    ];

    return (
        <div>
            {/* HEADER với logo và steps */}
            <div className="header-payment">
                <div className="image-icon-payment">
                    <i className="fa fa-arrow-left back-icon"></i>
                    <img src={logoImage} alt="Logo" className="logo" />
                </div>
                <div className="steps">
                    {steps.map((step, index) => {
                        // Xác định class cho step
                        let stepClass = "step-label";
                        if (currentStep === step.id) {
                            if (step.id === 3) {
                                if (isSuccess === true) stepClass += " success";
                                else if (isSuccess === false) stepClass += " failed";
                                else stepClass += " active";
                            } else {
                                stepClass += " active";
                            }
                        } else if (currentStep > step.id) {
                            stepClass += " done";
                        }

                        return (
                            <div key={step.id} className="step-item">
                                <span className={stepClass}>
                                    {step.label}
                                </span>
                                {index < steps.length - 1 && (
                                    <span
                                        className={`check ${currentStep > step.id ? "done" : ""}`}
                                    >
                                        — ✓ —
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default PaymentHeader;
