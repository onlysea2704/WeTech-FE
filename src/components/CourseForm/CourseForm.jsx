import React, { useState, useEffect } from "react";
import "./CourseForm.css";
import { useParams } from "react-router-dom";
import { publicAxios } from "../../services/axios-instance";
import Popup from "../Popup/Popup";

const CourseForm = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
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

  const typeCourseOptions = [
    "Thành lập Công ty",
    "Thành lập Hộ kinh doanh",
    "Giải thể Công ty",
    "Giải thể Hộ kinh doanh",
    "Đăng ký thay đổi",
    "Sáp nhập Tỉnh",
    "Cập nhật lên CCCD",
  ];

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
        if (course.linkImage) setPreviewImage(course.linkImage);
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
      setLoading(true);
      const { imageFile, ...courseData } = formData;
      const formDataToSend = new FormData();
      formDataToSend.append(
        "course",
        new Blob([JSON.stringify(courseData)], { type: "application/json" })
      );
      if (imageFile) formDataToSend.append("image", imageFile);

      const res = await publicAxios.post(
        "/api/course/update-course",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Cập nhật thành công:", res.data);
      alert("Lưu khóa học thành công!");
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lưu khóa học:", error);
      alert("Có lỗi xảy ra khi lưu khóa học!");
    }
  };

  return (
    <>
      <div className="course-form-container">
        <div className="course-form">
          <div className="form-content">

            {/* Hàng 1: Mã khóa học + Loại khóa học */}
            <div className="form-row">
              <div className="form-group-course-info">
                <label>Mã khóa học</label>
                <input type="number" name="courseId" value={formData.courseId} readOnly />
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
            </div>

            {/* Hàng 2: Tiêu đề + Tác giả */}
            <div className="form-row">
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
            </div>

            {/* Hàng 3: Giá gốc + Giá khuyến mãi */}
            <div className="form-row">
              <div className="form-group-course-info">
                <label>Giá gốc</label>
                <input
                  type="number"
                  name="realPrice"
                  value={formData.realPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group-course-info">
                <label>Giá khuyến mãi</label>
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Hàng 4: Số người đăng ký + Ngày tạo */}
            <div className="form-row">
              <div className="form-group-course-info">
                <label>Số người đăng ký</label>
                <input type="number" name="numberRegister" value={formData.numberRegister} readOnly />
              </div>
              <div className="form-group-course-info">
                <label>Ngày tạo</label>
                <input type="date" name="createdAt" value={formData.createdAt} readOnly />
              </div>
            </div>

            {/* Hàng 5: Mô tả */}
            <div className="form-group-course-info full-width course-description">
              <label>Mô tả khóa học</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Hàng 6: Giới thiệu 1 */}
            <div className="form-group-course-info full-width course-description">
              <label>Phương pháp học</label>
              <textarea
                name="intro1"
                value={formData.intro1}
                onChange={handleChange}
              />
            </div>

            {/* Hàng 7: Giới thiệu 2 */}
            <div className="form-group-course-info full-width course-description">
              <label>Bạn sẽ học được điều gì?</label>
              <textarea
                name="intro2"
                value={formData.intro2}
                onChange={handleChange}
              />
            </div>

            {/* Hàng 8: Ảnh khóa học */}
            <div className="form-group-course-info full-width">
              <label>Ảnh khóa học</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {previewImage && (
                <div className="image-preview">
                  <img src={previewImage} alt="preview" />
                </div>
              )}
            </div>

            <button type="button" className="submit-btn" onClick={handleSave}>
              Lưu khóa học
            </button>
          </div>
        </div>
      </div>
      {loading && <Popup message='Đang lưu thông tin khóa học' />}
    </>
  );
};

export default CourseForm;
