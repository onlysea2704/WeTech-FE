import React, { useState } from 'react';
import './CourseContent.css';

// --- Cột bên trái ---
const syllabusData = [
  {
    id: 1, title: 'Phần 1: Giới Thiệu', videos: '1/1 Videos', duration: '18m', lessons: [
      { name: 'Chuẩn bị Hồ Sơ', time: '10m' },
      { name: 'Thông tin cần thiết', time: '10m' },
    ]
  },
  {
    id: 2,
    title: 'Phần 2: Soạn Hồ Sơ',
    videos: '5/5 Videos',
    duration: '48m',
    lessons: [
      { name: 'Chuẩn bị Hồ Sơ', time: '10m' },
      { name: 'Thông tin cần thiết', time: '10m' },
      { name: 'Thông tin', time: '10m' },
      { name: 'Thông tin', time: '8m' },
    ],
  },
  {
    id: 3, title: 'Phần 3: Nộp Hồ Sơ', videos: '1/1 Videos', duration: '24m', lessons: [
      { name: 'Chuẩn bị Hồ Sơ', time: '10m' },
      { name: 'Thông tin cần thiết', time: '10m' },
    ]
  },
];

const materialsData = [
  {
    id: 1,
    title: 'Phần 1',
    fileCount: '1 Tài liệu',
    files: [
      { name: 'Danh Sách Chủ Sở Hữu Hưởng Lợi', time: '2:30', isLocked: true },
      { name: 'Giấy Uỷ Quyền', time: '8:05', isLocked: true, isHighlighted: true },
      { name: 'Giấy Đề Nghị', time: '2:25', isLocked: true },
    ],
  },
  {
    id: 2,
    title: 'Soạn Hồ Sơ',
    fileCount: '3 Tài liệu',
    files: [
      { name: 'Danh Sách Chủ Sở Hữu Hưởng Lợi', time: '2:30', isLocked: true },
      { name: 'Giấy Uỷ Quyền', time: '8:05', isLocked: true, isHighlighted: true },
      { name: 'Giấy Đề Nghị', time: '2:25', isLocked: true },
    ]
  },
  {
    id: 3,
    title: 'Phần 3',
    fileCount: '1 Tài liệu',
    files: [
      { name: 'Danh Sách Chủ Sở Hữu Hưởng Lợi', time: '2:30', isLocked: true },
      { name: 'Giấy Uỷ Quyền', time: '8:05', isLocked: true, isHighlighted: true },
      { name: 'Giấy Đề Nghị', time: '2:25', isLocked: true },
    ],
  }
];

// --- Component con cho cột trái ---
const SyllabusAccordion = ({ section, isOpen, onToggle }) => (
  <div className="accordion-item">
    <div className="accordion-header" onClick={onToggle}>
      <div className="accordion-title">
        <strong>{section.title}</strong>
        <span>{`${section.videos} - ${section.duration}`}</span>
      </div>
      <span className="accordion-arrow">{isOpen ? '▲' : '▼'}</span>
    </div>
    {isOpen && (
      <div className="accordion-content">
        {section.lessons.map((lesson, index) => (
          <div key={index} className="lesson-item">
            <p>{lesson.name}</p>
            <span className="lesson-duration">{lesson.time}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

// --- Component con cho cột phải ---
const MaterialAccordion = ({ section, isOpen, onToggle, isActive }) => (
  <div className={`material-section ${isActive ? 'active' : ''}`}>
    <div className="material-header" onClick={onToggle}>
      <div className="material-title">
        <span className="accordion-arrow-material">{isOpen ? '▼' : '▶'}</span>
        <strong>{section.title}</strong>
      </div>
      <span></span>
      <span className="material-time-header">{section.fileCount}</span>
    </div>
    {isOpen && (
      <div className="material-content">
        {section.files.map((file, index) => (
          <div key={index} className="material-item">
            <span className="material-name">
              <i class="fa-solid fa-file-lines"></i> {file.name}
            </span>
            <div className="material-actions">
              <button className="download-btn">Download</button>
              {/* <span>{file.time}</span> */}
              {file.isLocked && <span><i class="fa-solid fa-lock"></i></span>}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// --- Component Content chính ---
const CourseContent = () => {
  const [openSyllabusSection, setOpenSyllabusSection] = useState(1);
  const [openMaterialSection, setOpenMaterialSection] = useState(1);

  const handleSyllabusToggle = (id) => {
    setOpenSyllabusSection(openSyllabusSection === id ? null : id);
  };

  const handleMaterialToggle = (id) => {
    setOpenMaterialSection(openMaterialSection === id ? null : id);
  };

  return (
    <div className="content-layout">
      {/* Cột trái - Syllabus */}
      <div className="syllabus-column">
        {syllabusData.map(section => (
          <SyllabusAccordion
            key={section.id}
            section={section}
            isOpen={openSyllabusSection === section.id}
            onToggle={() => handleSyllabusToggle(section.id)}
          />
        ))}
      </div>

      {/* Cột phải - Tài liệu */}
      <div className="materials-column">
        <div className="materials-card">
          <h4>Tài Liệu Khoá Học</h4>
          <p>Tài liệu thủ tục pháp lý đi kèm tải về máy và thực hành cùng videos.</p>
          {materialsData.map(section => (
            <MaterialAccordion
              key={section.id}
              section={section}
              isOpen={openMaterialSection === section.id}
              onToggle={() => handleMaterialToggle(section.id)}
              isActive={section.id === 'soanHoSo'} // Đánh dấu active dựa trên logic của bạn
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;