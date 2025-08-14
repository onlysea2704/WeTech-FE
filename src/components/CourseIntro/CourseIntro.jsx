import React from 'react';
import './CourseIntro.css';

const CourseIntro = () => {
  return (
    <div className="intro-section">
      <h2 className="section-title">Mô tả khoá học</h2>
      <p>
        Khoá học này sẽ hướng dẫn bạn toàn bộ quy trình đăng ký thành lập công ty TNHH một thành viên – từ việc chuẩn bị hồ sơ cho đến khi có giấy chứng nhận đăng ký doanh nghiệp trong tay, mà không cần thuê dịch vụ bên ngoài.
      </p>

      <h2 className="section-title">Phương pháp học</h2>
      <p>
        Học qua video hướng dẫn thực tế từng bước trên hệ thống – từ tạo tài khoản, điền hồ sơ, ký số đến nhận kết quả. Tải về trọn bộ hồ sơ mẫu kèm checklist thứ tự thực hiện rõ ràng.
      </p>
      <p>Có nhóm hỗ trợ riêng và giảng viên đồng hành, sẵn sàng giải đáp khi cần.</p>

      <h2 className="section-title">Bạn sẽ học được gì ?</h2>
      <ul className="learning-list">
        <li>✅ Điều kiện và lưu ý khi lựa chọn loại hình TNHH một thành viên (khác gì với công ty TNHH hai thành viên trở lên?)</li>
        <li>✅ Cách đặt tên công ty hợp lệ, không trùng, không vi phạm pháp luật.</li>
        <li>✅ Hướng dẫn chi tiết từng bước soạn thảo hồ sơ thành lập công ty theo đúng biểu mẫu hiện hành (theo Thông tư 01/2021/TT-BKHĐT).</li>
        <li>✅ Cách nộp hồ sơ qua Cổng thông tin đăng ký doanh nghiệp quốc gia.</li>
        <li>✅ Quy trình khác dấu, mở tài khoản ngân hàng, thông báo mẫu dấu, bố cáo thành lập.</li>
        <li>✅ Thực hiện kê khai và nộp thuế môn bài, đăng ký chữ ký số, hóa đơn điện tử.</li>
        <li>✅ Các lỗi thường gặp khiến hồ sơ bị trả về và cách xử lý đúng luật.</li>
      </ul>
    </div>
  );
};

export default CourseIntro;