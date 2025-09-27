import React, { useState } from 'react';
import './CourseInfo.css';
import CourseContent from '../CourseContent/CourseContent';
import CourseIntro from '../CourseIntro/CourseIntro';
import Faq from '../Faq/Faq';

const CourseInfo = ({courseDetails, isPurchased}) => {
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
                {activeTab === 'intro' 
                ? <CourseIntro courseDetails={courseDetails} /> 
                : <CourseContent courseDetails={courseDetails} isPurchased={isPurchased} />}
            </div>
            <Faq />
        </div>
    );
};

export default CourseInfo;