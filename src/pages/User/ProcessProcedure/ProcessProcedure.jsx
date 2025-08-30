import React, { useState } from 'react';
import './ProcessProcedure.css';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/NavBar/NavBar';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
// import HoSo from './HoSo'; // Import component cho tab đầu tiên

const ProcessProcedure = () => {
    // Sử dụng useState để theo dõi tab đang hoạt động
    const [activeTab, setActiveTab] = useState(0); // Bắt đầu ở tab 2 như trong hình

    const tabs = [
        { id: 0, title: 'Hồ Sơ' },
        { id: 1, title: 'Thời hạn giải quyết' },
        { id: 2, title: 'Kết quả hồ sơ' },
        { id: 3, title: 'Phí, Lệ phí' },
    ];

    // Hàm để chuyển tới tab tiếp theo
    const handleNext = () => {
        setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));
    };

    // Hàm để quay lại tab trước đó
    const handlePrev = () => {
        setActiveTab((prev) => Math.max(prev - 1, 0));
    };

    // Hàm render nội dung dựa trên tab đang hoạt động
    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
                // return <HoSo />; // Render component HoSo
                return (
                    <div className="tab-content">
                        <ul>
                            <li>03 ngày làm việc kể từ ngày nhận được hồ sơ.</li>
                        </ul>
                    </div>
                );
            case 1:
                return (
                    <div className="tab-content">
                        <ul>
                            <li>03 ngày làm việc kể từ ngày nhận được hồ sơ.</li>
                        </ul>
                    </div>
                );
            case 2:
                return (
                    <div className="tab-content">
                        <ul>
                            <li>Giấy chứng nhận đăng ký doanh nghiệp.</li>
                        </ul>
                    </div>
                );
            case 3:
                return (
                    <div className="tab-content">
                        <ul>
                            <li>Lệ phí đăng ký doanh nghiệp: 50.000 đồng/lần.</li>
                            <li>Phí công bố nội dung đăng ký doanh nghiệp: 100.000 đồng/lần.</li>
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    return (

        <div>
            <Navbar />
            <Breadcrumb/>
            <div className="stepper-container">
                <h1 className="main-title">ĐĂNG KÝ THÀNH LẬP MỚI VỚI CÔNG TY CỔ PHẦN</h1>
                <div className="stepper-header">
                    {tabs.map((tab, index) => (
                        <div
                            key={tab.id}
                            className={`step ${activeTab === tab.id ? 'active' : ''} ${activeTab > tab.id ? 'completed' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="step-number">{index + 1}</span>
                            <span className="step-title">{tab.title}</span>
                        </div>
                    ))}
                </div>

                <div className="stepper-body">
                    {renderTabContent()}
                </div>

                <div className="stepper-footer">
                    <button onClick={handlePrev} disabled={activeTab === 0}>
                        Trước
                    </button>
                    <button onClick={handleNext} disabled={activeTab === tabs.length - 1}>
                        Tiếp theo
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProcessProcedure;