import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div className="other-solutions-container">
      <div className="left-content">
        <p className="subtitle-service">Dịch vụ hỗ trợ</p>
        <h2 className="title-service">Giải pháp khác từ <span>WETECH</span></h2>
        <p className="description-service">
          Chúng tôi chuyên cung cấp giải pháp phần mềm kế toán giúp tiết kiệm thời gian, chi phí và nâng cao hiệu quả làm việc.
        </p>
        <button className="discover-button">Khám Phá Thêm</button>
        <div className="customer-info">
          <i className="fas fa-users user-icon"></i>
          <span>2000+ Khách hàng</span>
        </div>
      </div>
      <div className="right-content">
        <div className="solution-card">
          <h4><i className="fas fa-file-invoice icon-heading"></i> TOOL MIA PRO 2024</h4>
          <p className='description-services'>Tải hoá đơn điện tử hàng loạt từ Tổng cục thuế.</p>
          <a href="https://wetechsoft.vn/" target='_blank' rel="noopener noreferrer">Xem thêm</a>
        </div>
        <div className="solution-card">
          <h4><i className="fas fa-file-alt icon-heading"></i> TOOL MISA 2024</h4>
          <p className='description-services'>Hỗ trợ tích hợp hàng loạt HĐĐT mua vào, bán ra lên phần mềm misa offline thay vì nhập thủ công từng tờ.</p>
          <a href="https://wetechsoft.vn/" target='_blank' rel="noopener noreferrer">Xem thêm</a>
        </div>
        <div className="solution-card">
          <h4><i className="fas fa-download icon-heading"></i> TAXSOFT 2024</h4>
          <p className='description-services'>Tải hàng loạt 1 lần 10 năm tất cả tờ khai thuế, thông báo, giấy nộp tiền từ TCT.</p>
          <a href="https://wetechsoft.vn/" target='_blank' rel="noopener noreferrer">Xem thêm</a>
        </div>
        <div className="solution-card">
          <h4><i className="fas fa-search icon-heading"></i> TAXBOT 2024</h4>
          <p className='description-services'>
            Phần mềm tra cứu MST hàng loạt: Từ CMT, CCCD → MST và ngược lại. Hỗ trợ thêm chức năng tra cứu tình trạng rủi ro NCC hàng loạt.
          </p>
          <a href="https://wetechsoft.vn/" target='_blank' rel="noopener noreferrer">Xem thêm</a>
        </div>
      </div>
    </div>
  );
};

export default Services;
