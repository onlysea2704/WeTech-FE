import React, { useState } from "react";
import "./CourseForm.css";

const CourseForm = () => {
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
    imageFile: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu khóa học:", formData);
  };

  return (
    <div className="course-form-container">
      <form className="course-form" onSubmit={handleSubmit}>
        <div className="form-content">
          {/* Cột trái */}
          <div className="form-column-left">
            <div className="form-group-course-info">
              <label>Mã khóa học</label>
              <input
                type="number"
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
              />
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
              <input
                type="text"
                name="typeCourse"
                value={formData.typeCourse}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-course-info">
              <label>Số người đăng ký</label>
              <input
                type="number"
                name="numberRegister"
                value={formData.numberRegister}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-course-info">
              <label>Ngày tạo</label>
              <input
                type="date"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleChange}
              />
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

        <button type="submit" className="submit-btn">
          Lưu khóa học
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
