import aareImage from "../../assets/Aare.png";
import "./JoinCourses.css";

export default function JoinCourses() {
    return (
        <div className="join-courses">
            <div className="join-content">
                <h3>Tham Gia Khoá Học của WeTech</h3>
                <p>Trở thành Học Viên và Học Mọi Khoá Học.</p>
            </div>
            <div className="join-action">
                <div className="input-group">
                    <input type="email" placeholder="Email" />
                    <button>Đăng ký</button>
                </div>
            </div>
            <img src={aareImage} alt="" className="join-bg-image" />
        </div>
    );
}
