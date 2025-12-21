import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
// import "./google-login.css"; // CSS cũ có thể không tác động được vào nút của Google

export default function GoogleLoginButton() {
  
  const handleSuccess = async (credentialResponse) => {
    try {
      // credentialResponse.credential chính là chuỗi ID Token (JWT)
      const res = await axios.post(
        "http://localhost:8080/auth/google",
        { idToken: credentialResponse.credential }
      );
      
      // Lưu token từ server trả về
      localStorage.setItem("token", res.data.token);
      console.log("Login success", res.data);

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