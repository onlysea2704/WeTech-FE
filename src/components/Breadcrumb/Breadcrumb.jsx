import React from 'react';
import './Breadcrumb.css';

const Breadcrumb = () => {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-container">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <a href="#">Trang chủ</a>
        </li>
        <li className="breadcrumb-separator">›</li>
        <li className="breadcrumb-item">
          <a href="#">Khoá học</a>
        </li>
        <li className="breadcrumb-separator">›</li>
        <li className="breadcrumb-item active" aria-current="page">
          Tất cả khoá học
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;