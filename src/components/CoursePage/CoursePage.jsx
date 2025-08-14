import React, { useState } from 'react';
import './CoursePage.css';
import CourseContent from '../CourseContent/CourseContent';
import CourseIntro from '../CourseIntro/CourseIntro';

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState('content'); // 'intro' hoặc 'content'

  return (
    <div className="course-container">
      <div className="course-tabs">
        <button
          className={`tab-button ${activeTab === 'intro' ? 'active' : ''}`}
          onClick={() => setActiveTab('intro')}
        >
          Giới Thiệu
        </button>
        <button
          className={`tab-button ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          Nội dung
        </button>
      </div>

      <div className="course-content">
        {activeTab === 'intro' ? <CourseIntro /> : <CourseContent />}
      </div>
    </div>
  );
};

export default CoursePage;