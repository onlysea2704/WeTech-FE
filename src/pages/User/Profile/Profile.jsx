import React, { useState, useEffect } from 'react';
import './Profile.css';
import avatarImage from '../../../assets/avatar_user.png';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/NavBar/NavBar';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { authAxios } from '../../../services/axios-instance';

const Profile = () => {
    const [avatar, setAvatar] = useState(avatarImage);
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await authAxios.get('/api/auth/get-info');
                const data = res.data;
                setFullname(data.fullname || '');
                setPhone(data.sdt || '');
                setEmail(data.email || '');
                if (data.avatarUrl) {
                    setAvatar(data.avatarUrl);
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            }
        };
        fetchUserProfile();
    }, []);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newAvatarUrl = URL.createObjectURL(file);
            setAvatar(newAvatarUrl);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = { fullname, phone };
            const res = await authAxios.put('/api/user/profile', payload);
            alert('Cập nhật thông tin thành công!');
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin:', error);
            alert('Có lỗi xảy ra khi cập nhật thông tin!');
        }
    };

    return (
        <div>
            <Navbar />
            <Breadcrumb items={[
                { label: 'Trang chủ', link: '/' },
                { label: 'Tài khoản của tôi',},
            ]} />
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

                <form className="profile-form-card" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Họ và Tên</label>
                        <div className="input-wrapper">
                            <input
                                id="fullName"
                                type="text"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                disabled={true}
                            />
                            <i className="fa-solid fa-pen-to-square edit-icon"></i>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <div className="input-wrapper">
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={true}
                            />
                            <i className="fa-solid fa-pen-to-square edit-icon"></i>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            <input
                                id="email"
                                type="email"
                                value={email}
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
