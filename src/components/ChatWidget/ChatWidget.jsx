import React, { useState } from "react";
import "./ChatWidget.css";
import iconLogoZalo from '../../assets/icon-zalo.png'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-widget-container">
      {/* Khung chat */}
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <div className="chat-header-info">
              <h3>WeTech</h3>
              <p>Giải pháp phần mềm kế toán</p>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="chat-greeting">
            <p className="greeting-title">Xin chào!</p>
            <p className="greeting-text">Rất vui khi được hỗ trợ bạn</p>
          </div>

          <div className="chat-start">Bắt đầu trò chuyện với WeTech</div>

          <div className="chat-buttons">
            <button className="btn btn-zalo"
            onClick={() => window.open('https://zalo.me/0989466992', '_blank')}>
              <img
                src={iconLogoZalo}
                alt="Zalo"
              />
              Chat bằng Zalo
            </button>

            <button className="btn btn-facebook"
            onClick={() => window.open('https://web.facebook.com/ketoanthuemoclan', '_blank')}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png"
                alt="Facebook"
              />
              Chat bằng Facebook
            </button>

            <button className="btn btn-contact">Liên hệ ngay</button>
          </div>
        </div>
      )}

      {/* Nút tròn nổi */}
      <button
        className="chat-float-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Mở chat"
      >
        
        <i className="fa-solid fa-comments"></i>
      </button>
    </div>
  );
}
