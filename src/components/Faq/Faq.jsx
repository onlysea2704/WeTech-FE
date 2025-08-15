import React, { useState } from 'react';
import './Faq.css';

// Dữ liệu cho các câu hỏi và câu trả lời
const faqData = [
  {
    question: 'Có thể sử dụng tên tiếng nước ngoài cho doanh nghiệp không?',
    answer: 'Có, doanh nghiệp có thể đăng ký tên bằng tiếng nước ngoài. Tên này phải được viết bằng các chữ cái Latin và có thể kèm theo các chữ số.',
  },
  {
    question: 'Sau khi đăng ký kinh doanh, cần làm những thủ tục gì tiếp theo?',
    answer:
      'Sau khi nhận được Giấy chứng nhận đăng ký doanh nghiệp, bạn đừng vội mừng mà quên mất rằng còn một loạt các thủ tục thành lập doanh nghiệp khác cần hoàn thiện như: Công bố thành lập doanh nghiệp; Khắc dấu pháp lý cho công ty theo quy định của pháp luật; Mở tài khoản ngân hàng doanh nghiệp; Đăng ký mã số thuế, kê khai và nộp các loại thuế theo quy định. Ngoài ra, tùy theo ngành nghề kinh doanh, bạn có thể cần xin thêm các giấy phép con hoặc thực hiện các thủ tục khác theo quy định của Nghị định 01/2021/NĐ-CP về đăng ký doanh nghiệp và Thông tư số 01/2021/TT-BKHĐT ngày 16/3/2021 của Bộ Kế hoạch và Đầu tư.',
  },
  {
    question: 'Có thể thành lập doanh nghiệp ONLINE được không?',
    answer: 'Có, bạn hoàn toàn có thể thực hiện thủ tục thành lập doanh nghiệp trực tuyến thông qua Cổng thông tin quốc gia về đăng ký doanh nghiệp.',
  },
  {
    question: 'Có thể sử dụng địa chỉ nhà ở làm địa chỉ trụ sở được không?',
    answer: 'Có, pháp luật cho phép sử dụng địa chỉ nhà riêng (nhà ở) để làm trụ sở chính của công ty, miễn là không phải là căn hộ chung cư hoặc nhà tập thể có chức năng để ở.',
  },
];

// Component Item cho mỗi câu hỏi
const FaqItem = ({ item, index, openIndex, setOpenIndex }) => {
  const isOpen = index === openIndex;

  const toggleOpen = () => {
    setOpenIndex(isOpen ? null : index);
  };

  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <div className="faq-question" onClick={toggleOpen}>
        <p>{item.question}</p>
        <span className="faq-icon"></span>
      </div>
      <div className="faq-answer">
        <div className="faq-answer-content">{item.answer}</div>
      </div>
    </div>
  );
};

// Component chính
const Faq = () => {
  // Mặc định mở mục thứ 2 giống trong ảnh
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-container">
      <h2 className="faq-title">CÂU HỎI THƯỜNG GẶP</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <FaqItem
            key={index}
            item={item}
            index={index}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default Faq;