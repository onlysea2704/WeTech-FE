import React from "react";
import styles from "./Services.module.css";
import toolMisaProIcon from "../../assets/tool-misa-pro-2024.png";
import toolMisaIcon from "../../assets/tool-misa-2024.png";
import taxSoftIcon from "../../assets/taxsoft.png";
import taxBoxIcon from "../../assets/taxbox.png";
import customerOne from "../../assets/customer-one.png";
import customerTwo from "../../assets/customer-two.png";
import customerThree from "../../assets/customer-three.png";

const Services = () => {
    return (
        <div className={styles["other-solutions-container"]}>
            <div className={styles["left-content"]}>
                <p className={styles["subtitle-service"]}>Dịch vụ hỗ trợ</p>
                <h2 className={styles["title-service"]}>
                    Giải pháp khác từ <span>WETECH</span>
                </h2>
                <p className={styles["description-service"]}>
                    Chúng tôi chuyên cung cấp giải pháp phần mềm kế toán giúp tiết kiệm thời gian, chi phí và nâng cao
                    hiệu quả làm việc.
                </p>
                <button className={styles["discover-button"]}>Khám Phá Thêm</button>
                <div className={styles["customer-info"]}>
                    <div className={styles["customer-info-container"]}>
                        <img src={customerOne} alt="" />
                        <img src={customerTwo} alt="" />
                        <img src={customerThree} alt="" />
                    </div>
                    <span>2000+ Khách hàng</span>
                </div>
            </div>
            <div className={styles["right-content"]}>
                <div className={styles["solution-card"]}>
                    <h4>
                        <img src={toolMisaProIcon} className={styles["service-icon"]} alt="" /> TOOL MIA PRO 2024
                    </h4>
                    <p className={styles["description-services"]}>Tải hoá đơn điện tử hàng loạt từ Tổng cục thuế.</p>
                    <a href="https://wetechsoft.vn/" target="_blank" rel="noopener noreferrer">
                        Xem thêm
                    </a>
                </div>
                <div className={styles["solution-card"]}>
                    <h4>
                        <img src={toolMisaIcon} className={styles["service-icon"]} alt="" /> TOOL MISA 2024
                    </h4>
                    <p className={styles["description-services"]}>
                        Hỗ trợ tích hợp hàng loạt HĐĐT mua vào, bán ra lên phần mềm misa offline thay vì nhập thủ công
                        từng tờ.
                    </p>
                    <a href="https://wetechsoft.vn/" target="_blank" rel="noopener noreferrer">
                        Xem thêm
                    </a>
                </div>
                <div className={styles["solution-card"]}>
                    <h4>
                        <img src={taxSoftIcon} className={styles["service-icon"]} alt="" /> TAXSOFT 2024
                    </h4>
                    <p className={styles["description-services"]}>
                        Tải hàng loạt 1 lần 10 năm tất cả tờ khai thuế, thông báo, giấy nộp tiền từ TCT.
                    </p>
                    <a href="https://wetechsoft.vn/" target="_blank" rel="noopener noreferrer">
                        Xem thêm
                    </a>
                </div>
                <div className={styles["solution-card"]}>
                    <h4>
                        <img src={taxBoxIcon} className={styles["service-icon"]} alt="" /> TAXBOT 2024
                    </h4>
                    <p className={styles["description-services"]}>
                        Phần mềm tra cứu MST hàng loạt: Từ CMT, CCCD → MST và ngược lại. Hỗ trợ thêm chức năng tra cứu
                        tình trạng rủi ro NCC hàng loạt.
                    </p>
                    <a href="https://wetechsoft.vn/" target="_blank" rel="noopener noreferrer">
                        Xem thêm
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Services;
