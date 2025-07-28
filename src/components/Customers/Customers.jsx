import React from 'react';
import './Customers.css';
import imageCustomer from '../../assets/customer.jpg'

const testimonials = [
  {
    name: 'Khánh Dư',
    role: 'Chủ doanh nghiệp',
    rating: 5,
    feedback: 'Mọi thủ tục được xử lý nhanh chóng, không rườm rà, không mất thời gian chờ đợi. Nếu biết sớm thì đã không phải loay hoay tìm cách tự xử lý mệt mỏi như trước. Rất hài lòng!',
    img: '/images/user1.png',
  },
  {
    name: 'Trần Dịu',
    role: 'Kế toán viên',
    rating: 5,
    feedback: 'Thủ tục gọn gàng, làm việc chuyên nghiệp, không phải chạy tới lui hay lo thủ tục rắc rối. Dịch vụ nhanh chóng, hỗ trợ nhiệt tình, thực sự yên tâm!',
    img: '/images/user2.png',
  },
  {
    name: 'Vân Nguyên',
    role: 'Kế toán viên',
    rating: 5,
    feedback: 'Thực sự hài lòng! Lần đầu sử dụng nhưng phải nói là quá bất ngờ. Xử lý nhanh chóng, hỗ trợ tận tình, tiết kiệm được bao nhiêu thời gian. Nhờ kế biết đến sớm thì tốt quá!',
    img: '/images/user3.png',
  },
];

const Customers = () => {
  return (
    <div className="testimonials">
      <h2 className="title">Khách hàng của chúng tôi</h2>
      <div className="cards-container">
        {testimonials.map((item, index) => (
          <div className="card" key={index}>
            <div className="user-info">
              <img src={imageCustomer} alt={item.name} className="avatar" />
              <div>
                <h4 className='customer-name'>{item.name}</h4>
                <p className="role">{item.role} <span className="stars">{'⭐'.repeat(item.rating)}</span></p>
              </div>
            </div>
            <p className="feedback">{item.feedback}</p>
          </div>
        ))}
      </div>
      <div className="dots">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default Customers;
