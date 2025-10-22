import React from 'react';
import './Profile.css';
import { useState } from 'react';
import avatarImage from '../../../assets/customer1.jpg';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/NavBar/NavBar';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

const Profile = () => {

    // State để lưu trữ URL của ảnh đại diện để hiển thị
    const [avatar, setAvatar] = useState(avatarImage);

    // Hàm xử lý khi người dùng chọn một file ảnh mới
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Tạo một URL tạm thời cho file ảnh và cập nhật state
            const newAvatarUrl = URL.createObjectURL(file);
            setAvatar(newAvatarUrl);
        }
    };

    return (
        <div>
            <Navbar />
            <Breadcrumb />
            <div className="profile-page-container">
                <h1 className="main-title">MY PROFILE</h1>

                <div className="avatar-wrapper">
                    <img src={avatar} alt="User Avatar" className="avatar-img" />
                    <label htmlFor="avatar-upload" className="camera-icon">
                        <i className="fa-solid fa-camera"></i>
                    </label>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                    />
                </div>

                <form className="profile-form-card">
                    <div className="form-group">
                        <label htmlFor="fullName">Họ và Tên</label>
                        <div className="input-wrapper">
                            <input id="fullName" type="text" defaultValue="Thuy Duong" />
                            <i className="fa-solid fa-pen-to-square edit-icon"></i>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <div className="input-wrapper">
                            <input id="phone" type="tel" defaultValue="0834 085 578" />
                            <i className="fa-solid fa-pen-to-square edit-icon"></i>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            {/* Thêm thuộc tính readOnly để không cho phép chỉnh sửa */}
                            <input
                                id="email"
                                type="email"
                                defaultValue="thuyduong123@gmail.com"
                                readOnly
                            />
                        </div>
                    </div>

                    <button type="submit" className="save-button">Lưu</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;