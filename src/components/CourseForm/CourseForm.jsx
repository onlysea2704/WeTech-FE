import React, { useState, useEffect } from "react";
import "./CourseForm.css";
import { useParams } from "react-router-dom";
import { publicAxios } from "../../services/axios-instance";

const CourseForm = () => {
  const { courseId } = useParams(); // lấy id từ param
  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    description: "",
    author: "",
    realPrice: "",
    salePrice: "",
    typeCourse: "",
    intro1: "",
    intro2: "",
    numberRegister: "",
    createdAt: "",
    linkImage: "",
    imageFile: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Danh sách loại khóa học (chỉ cần string)
  const typeCourseOptions = [
    'Thành lập Công ty',
    'Thành lập Hộ kinh doanh',
    'Giải thể Công ty',
    'Giải thể Hộ kinh doanh',
    'Đăng ký thay đổi',
    'Sáp nhập Tỉnh',
    'Cập nhật lên CCCD',
  ];

  // Lấy dữ liệu khóa học từ API
  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const res = await publicAxios.get(
          `/api/course/find-by-course-id?courseId=${courseId}`
        );
        const course = res.data;
        setFormData({
          courseId: course.courseId,
          title: course.title || "",
          description: course.description || "",
          author: course.author || "",
          realPrice: course.realPrice || "",
          salePrice: course.salePrice || "",
          typeCourse: course.typeCourse || "",
          intro1: course.intro1 || "",
          intro2: course.intro2 || "",
          numberRegister: course.numberRegister || "",
          createdAt: course.createdAt ? course.createdAt.substring(0, 10) : "",
          linkImage: course.linkImage || "",
          imageFile: null,
        });
        if (course.linkImage) {
          setPreviewImage(course.linkImage);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khóa học:", error);
      }
    };

    if (courseId) fetchCourseById();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      // Tách object course (không chứa imageFile)
      const { imageFile, ...courseData } = formData;

      // Tạo formData
      const formDataToSend = new FormData();

      // courseData phải là JSON string
      formDataToSend.append("course", new Blob([JSON.stringify(courseData)], { type: "application/json" }));

      // Nếu có file ảnh thì append
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const res = await publicAxios.post("/api/course/update-course", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Cập nhật thành công:", res.data);
      alert("Lưu khóa học thành công!");
    } catch (error) {
      console.error("Lỗi khi lưu khóa học:", error);
      alert("Có lỗi xảy ra khi lưu khóa học!");
    }
  };

  return (
    <div className="course-form-container">
      <div className="course-form">
        <div className="form-content">
          {/* Cột trái */}
          <div className="form-column-left">
            <div className="form-group-course-info">
              <label>Mã khóa học</label>
              <input type="number" name="courseId" value={formData.courseId} readOnly />
            </div>

            <div className="form-group-course-info">
              <label>Tiêu đề</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-course-info">
              <label>Tác giả</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-course-info">
              <label>Giá gốc</label>
              <input
                type="number"
                step="0.01"
                name="realPrice"
                value={formData.realPrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-course-info">
              <label>Giá khuyến mãi</label>
              <input
                type="number"
                step="0.01"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-course-info">
              <label>Loại khóa học</label>
              <select
                name="typeCourse"
                value={formData.typeCourse}
                onChange={handleChange}
              >
                <option value="">-- Chọn loại khóa học --</option>
                {typeCourseOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group-course-info">
              <label>Số người đăng ký</label>
              <input type="number" name="numberRegister" value={formData.numberRegister} readOnly />
            </div>

            <div className="form-group-course-info">
              <label>Ngày tạo</label>
              <input type="date" name="createdAt" value={formData.createdAt} readOnly />
            </div>
          </div>

          {/* Cột phải */}
          <div className="form-column-right">
            <div className="form-group-course-info">
              <label>Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-course-info">
              <label>Giới thiệu 1</label>
              <textarea
                name="intro1"
                value={formData.intro1}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-course-info">
              <label>Giới thiệu 2</label>
              <textarea
                name="intro2"
                value={formData.intro2}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-course-info">
              <label>Ảnh khóa học</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {previewImage && (
                <div className="image-preview">
                  <img src={previewImage} alt="preview" />
                </div>
              )}
            </div>
          </div>
        </div>

        <button type="button" className="submit-btn" onClick={handleSave}>
          Lưu khóa học
        </button>
      </div>
    </div>
  );
};

export default CourseForm;
