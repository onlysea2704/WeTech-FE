import React from 'react';
import './CourseIntro.css';

const CourseIntro = ({courseDetails}) => {
  return (
    <div className="intro-section">
      <h2 className="section-title">Mô tả khoá học</h2>
      <p className="course-description">
        {courseDetails?.description}
      </p>

      <h2 className="section-title">Phương pháp học</h2>
      <p className="course-description">
        {courseDetails?.intro1}
      </p>

      <h2 className="section-title">Bạn sẽ học được gì ?</h2>
      <p className="course-description">
        {courseDetails?.intro2}
      </p>
    </div>
  );
};

export default CourseIntro;