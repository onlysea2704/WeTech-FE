import React from "react";
import "./PaymentHeader.css";

const PaymentHeader = ({ currentStep = 3, isSuccess = false }) => {
    const steps = [
        { id: 1, label: "Thông tin" },
        { id: 2, label: "Thanh toán" },
        { id: 3, label: "Thành công" },
    ];

    return (
        <div className="header-payment">
            <div className="steps">
                {steps.map((step, index) => {
                    let status = "";
                    if (currentStep > step.id) status = "done";
                    else if (currentStep === step.id) {
                        status = "active";
                        if (step.id === 3 && isSuccess) status = "success";
                        if (step.id === 3 && isSuccess === false) status = "failed"; // Keep existing logic just in case, though usually 3 is just active or success
                    }

                    return (
                        <div key={step.id} className={`step-item ${status}`}>
                            <div className="step-circle">
                                {status === "done" || status === "success" ? (
                                    <i className="fa-solid fa-check"></i>
                                ) : (
                                    <span>{step.id}</span>
                                )}
                            </div>
                            <span className="step-label">{step.label}</span>
                            {index < steps.length - 1 && <div className="step-line"></div>}
                        </div>
                    );
                })}
            </div>

            <div></div>
        </div>
    );
};

export default PaymentHeader;
