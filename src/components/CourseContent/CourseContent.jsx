import React, { useState, useEffect } from 'react';
import { publicAxios } from "../../services/axios-instance";
import './CourseContent.css';

// --- Component con cho cột trái ---
const SyllabusAccordion = ({ section, isOpen, onToggle }) => {
  // 👉 Hàm định dạng tổng thời lượng
  const getTotalDurationFormatted = (videos = []) => {
    const totalSeconds = videos.reduce((sum, v) => sum + (v.duration || 0), 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  // 👉 Hàm định dạng từng video
  const formatVideoDuration = (duration) => {
    if (!duration) return "0m";
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
    return `${seconds}s`;
  };

  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={onToggle}>
        <div className="accordion-title">
          <strong>{section.name}</strong>
          <span>
            {`${section?.videos?.length || 0} videos - ${getTotalDurationFormatted(section?.videos)}`}
          </span>
        </div>
        <span className="accordion-arrow">
          <i
            className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"
              }`}
          ></i>
        </span>
      </div>

      {isOpen && (
        <div className="accordion-content">
          {section?.videos?.map((video, index) => (
            <div key={index} className="lesson-item">
              <p>{video?.description}</p>
              <span className="lesson-duration">
                {formatVideoDuration(video?.duration)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


// --- Component con cho cột phải ---
const MaterialAccordion = ({ section, isOpen, onToggle, isActive, isPurchased }) => {
  const handleDownload = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <div className={`material-section ${isActive ? "active" : ""}`}>
      <div className="material-header" onClick={onToggle}>
        <div className="material-title">
          <span className="accordion-arrow-material">
            <i className={`fa-solid ${isOpen ? "fa-angle-down" : "fa-angle-right"}`}></i>
          </span>
          <strong>{section.name}</strong>
        </div>
        <span className="material-time-header">{section?.documentSections?.length || 0}</span>
      </div>
      {isOpen && (
        <div className="material-content">
          {section?.documentSections?.map((document, index) => (
            <div key={index} className="material-item">
              <span className="material-name">
                <i className="fa-solid fa-file-lines"></i> {document?.name}
              </span>
              <div className="material-actions">
                <button
                  className="download-btn"
                  disabled={!isPurchased}
                  onClick={() => isPurchased && handleDownload(document?.link)}
                >
                  Download
                </button>
                {!isPurchased && (
                  <span>
                    <i className="fa-solid fa-lock"></i>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


// --- Component Content chính ---
const CourseContent = ({ courseDetails, isPurchased }) => {

  const [sections, setSections] = useState([]);
  const [sectionDetails, setSectionDetails] = useState([]);
  const [openSyllabusSection, setOpenSyllabusSection] = useState(1);
  const [openMaterialSection, setOpenMaterialSection] = useState(1);
  const [videoResponse, setVideoResponse] = useState([]);
  const [documentResponse, setDocumentResponse] = useState([]);
  // Fetch course sections
  useEffect(() => {
    if (!courseDetails) return;
    const fetchSections = async () => {
      try {
        const response = await publicAxios.get(`/api/section/get-section-by-course-id?courseId=${courseDetails?.courseId}`);
        const videoResponse = await publicAxios.get(`/api/video/find-by-courseId?courseId=${courseDetails?.courseId}`);
        const documentResponse = await publicAxios.get(`/api/document/find-by-courseId?courseId=${courseDetails?.courseId}`);
        console.log(videoResponse.data);
        setVideoResponse(videoResponse.data);
        console.log(documentResponse.data);
        setDocumentResponse(documentResponse.data);
        setSections(response.data);
        setSectionDetails(response.data);
      } catch (error) {
        console.error("Error fetching course sections:", error);
      }
    };

    fetchSections();
  }, [courseDetails]);

  // useEffect(() => {
  //   const fetchSectionDetails = async (sectionId) => {
  //     try {
  //       // Fetch videos and documents for each section
  //       const videoResponse = await publicAxios.get(`/api/video/find-by-sectionId?sectionId=${sectionId}`);
  //       const documentResponse = await publicAxios.get(`/api/document/get-by-section-id?sectionId=${sectionId}`);
  //       // Update section with videos and 
  //       setSectionDetails(prev =>
  //         prev.map(section =>
  //           section.sectionId === sectionId
  //             ? { ...section, videos: videoResponse.data, documents: documentResponse.data }
  //             : section
  //         )
  //       );
  //     } catch (error) {
  //       console.error("Error fetching section details:", error);
  //     }
  //   };

  //   if (sections.length > 0) {
  //     console.log(sections)
  //     sections.forEach(section => {
  //       fetchSectionDetails(section.sectionId);
  //     });
  //   }
  // }, [sections]);

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
        {videoResponse.map(section => (
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
          {documentResponse.map(section => (
            <MaterialAccordion
              key={section.sectionId}
              section={section}
              isOpen={openMaterialSection === section.sectionId}
              onToggle={() => handleMaterialToggle(section.sectionId)}
              isPurchased={isPurchased}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
