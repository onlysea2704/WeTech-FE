import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authAxios } from "../../services/axios-instance";
// import "./google-login.css"; // CSS cũ có thể không tác động được vào nút của Google

export default function GoogleLoginButton() {

  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      // credentialResponse.credential chính là chuỗi ID Token (JWT)
      const res = await axios.post(
        "http://localhost:8080/auth/google",
        { idToken: credentialResponse.credential }
      );

      // localStorage.setItem("token", res.data.token);
      // console.log("Login success", res.data);
      // navigator("/");

      sessionStorage.setItem('authToken', res.data);
      const userInfo = await authAxios.get('/api/auth/get-info');
      localStorage.setItem('fullName', userInfo.data.fullname);
      localStorage.setItem('email', userInfo.data.email);
      if (userInfo.data.linkImage) {
        localStorage.setItem('linkImage', userInfo.data.linkImage);
      }
      localStorage.setItem('userId', userInfo.data.userId);
      if (userInfo.data.role === 'USER') {
        navigate("/");
      }
      else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login API error", error);
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="google-login-container">
      {/* Component này sẽ hiển thị nút "Sign in with Google" chuẩn */}
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap // Tùy chọn: Hiện popup gợi ý đăng nhập ở góc màn hình
      />
    </div>
  );
}