import React, { useState, useEffect } from 'react';
import { publicAxios } from "../../services/axios-instance";
import './CourseContent.css';

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
      <span className="material-time-header">{section.fileCount}</span>
    </div>
    {isOpen && (
      <div className="material-content">
        {section.files.map((file, index) => (
          <div key={index} className="material-item">
            <span className="material-name">
              <i className="fa-solid fa-file-lines"></i> {file.name}
            </span>
            <div className="material-actions">
              <button className="download-btn">Download</button>
              {file.isLocked && <span><i className="fa-solid fa-lock"></i></span>}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// --- Component Content chính ---
const CourseContent = ({ courseDetails }) => {
  const [sections, setSections] = useState([]);
  const [sectionDetails, setSectionDetails] = useState([]);
  const [openSyllabusSection, setOpenSyllabusSection] = useState(1);
  const [openMaterialSection, setOpenMaterialSection] = useState(1);

  useEffect(() => {
    // Fetch course sections
    if (!courseDetails) return;
    const fetchSections = async () => {
      try {
        console.log(courseDetails)
        const response = await publicAxios.get(`/api/section/get-section-by-course-id?courseId=${courseDetails?.courseId}`);
        setSections(response.data);
      } catch (error) {
        console.error("Error fetching course sections:", error);
      }
    };

    fetchSections();
  }, [courseDetails]);

  useEffect(() => {
    const fetchSectionDetails = async (sectionId) => {
      try {
        // Fetch videos and documents for each section
        const videoResponse = await publicAxios.get(`/api/video/find-by-sectionId?sectionId=${sectionId}`);
        const documentResponse = await publicAxios.get(`/api/document/get-by-section-id?sectionId=${sectionId}`);

        console.log(videoResponse.data);
        console.log(documentResponse.data);
        // Update section with videos and documents
        setSectionDetails(prevSections =>
          prevSections.map(section =>
            section.sectionId === sectionId
              ? { ...section, videos: videoResponse.data, documents: documentResponse.data }
              : section
          )
        );
      } catch (error) {
        console.error("Error fetching section details:", error);
      }
    };

    if (sections.length > 0) {
      sections.forEach(section => {
        fetchSectionDetails(section.sectionId);
      });
    }
  }, [sections]); 

  // Toggle syllabus section
  const handleSyllabusToggle = (id) => {
    setOpenSyllabusSection(openSyllabusSection === id ? null : id);
  };

  // Toggle material section
  const handleMaterialToggle = (id) => {
    setOpenMaterialSection(openMaterialSection === id ? null : id);
  };

  return (
    <div className="content-layout">
      {/* Cột trái - Syllabus */}
      <div className="syllabus-column">
        {sections.map(section => (
          <SyllabusAccordion
            key={section.sectionId}
            section={section}
            isOpen={openSyllabusSection === section.sectionId}
            onToggle={() => handleSyllabusToggle(section.sectionId)}
          />
        ))}
      </div>

      {/* Cột phải - Tài liệu */}
      <div className="materials-column">
        <div className="materials-card">
          <h4>Tài Liệu Khoá Học</h4>
          <p>Tài liệu thủ tục pháp lý đi kèm tải về máy và thực hành cùng videos.</p>
          {sectionDetails.map(section => (
            <MaterialAccordion
              key={section.id}
              section={section}
              isOpen={openMaterialSection === section.id}
              onToggle={() => handleMaterialToggle(section.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
