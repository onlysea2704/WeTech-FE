import React, { useState } from 'react';
import './FaqPage.css';
import answerImage from '../../../assets/error-image.png'; // <-- THAY ĐỔI đường dẫn đến hình ảnh của bạn
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/NavBar/NavBar';

// Dữ liệu câu hỏi và câu trả lời
const faqData = [
    {
        question: 'Tôi chưa rành pháp lý, có thể tự làm thủ tục thành lập công ty được không?',
        answer: 'Hoàn toàn có thể. Khóa học được thiết kế dành riêng cho người mới, không cần nền tảng pháp lý hay kinh nghiệm trước đó. Bạn sẽ được hướng dẫn từng bước cụ thể từ cách chọn loại hình doanh nghiệp, tra cứu tên công ty, điền biểu mẫu, đến cách nộp hồ sơ online hoặc trực tiếp. Tất cả đều có video hướng dẫn chi tiết kèm ví dụ thực tế và mẫu điền sẵn -- bạn chỉ cần làm theo là có thể tự mình hoàn tất thủ tục.',
    },
    {
        question: 'Nếu hồ sơ bị sai hoặc bị trả lại thì sao?',
        answer: 'Trong trường hợp hồ sơ bị sai sót, khóa học sẽ hướng dẫn bạn cách chỉnh sửa và nộp lại một cách chính xác. Chúng tôi cũng cung cấp các lỗi thường gặp để bạn có thể tránh.',
    },
    {
        question: 'Tôi có được cập nhật nội dung mới không?',
        answer: 'Có. Mọi cập nhật về quy định hoặc thủ tục pháp lý mới sẽ được bổ sung vào khóa học và bạn có thể truy cập miễn phí.',
    },
    {
        question: 'Khóa học có cấp chứng chỉ không?',
        answer: 'Sau khi hoàn thành khóa học, bạn sẽ nhận được một chứng chỉ điện tử để xác nhận đã hoàn tất chương trình đào tạo.',
    },
    {
        question: 'Tôi có phải đóng thêm chi phí nhà nước không?',
        answer: 'Có, khóa học chỉ cung cấp kiến thức và hướng dẫn. Bạn vẫn cần đóng các lệ phí nhà nước theo quy định khi nộp hồ sơ thành lập doanh nghiệp.',
    },
];

const FaqPage = () => {
    // State để theo dõi mục nào đang được mở, mặc định là mục đầu tiên (index 0)
    const [openIndex, setOpenIndex] = useState(0);

    // Hàm xử lý khi người dùng nhấn vào một câu hỏi
    const handleToggle = (index) => {
        // Nếu nhấn vào mục đang mở thì đóng lại, ngược lại thì mở mục mới
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            <Navbar />
            <div className="faq-page-container">
                <div className="breadcrumb">
                    <p>Câu hỏi thường gặp</p>
                    <span>Home / Pages</span>
                </div>

                <main className="faq-accordion-container">
                    {faqData.map((item, index) => (
                        <div className="faq-page-item" key={index}>
                            <div
                                className={`faq-question-page ${openIndex === index ? 'active' : ''}`}
                                onClick={() => handleToggle(index)}
                            >
                                <p>{item.question}</p>
                                <span className="faq-page-icon">{openIndex === index ? '−' : '+'}</span>
                            </div>
                            {openIndex === index && (
                                <div className="faq-page-answer">
                                    <p className="answer-text">{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default FaqPage;