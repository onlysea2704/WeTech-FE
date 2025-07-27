import { useState } from "react";
import "./LeftLoginRegisterForm.css";

const LeftLoginRegisterForm = () => {

    const [index, setIndex] = useState(0);

    const texts = [
        {
            title: "Giải Pháp Vượt Trội...",
            content:
                "Sự hài lòng của Quý khách hàng chính là động lực để chúng tôi không ngừng cải tiến và nâng cao chất lượng dịch vụ.",
        },
        {
            title: "Chuyên Nghiệp Dẫn Đầu",
            content:
                "We-tech tự hào đồng hành cùng quý khách hàng trên hành trình phát triển bền vững.",
        },
    ];

    return (
        <div className="login-left">
            <div className="text-slider">
                <h2>{texts[index].title}</h2>
                <p>{texts[index].content}</p>
                <div className="slider-dots">
                    {texts.map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === index ? "active" : ""}`}
                            onClick={() => setIndex(i)}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeftLoginRegisterForm;
