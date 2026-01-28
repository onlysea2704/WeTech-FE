import React, { useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import LeftLoginRegisterForm from "../../../components/LeftLoginRegisterForm/LeftLoginRegisterForm";
import { authAxios } from "../../../services/axios-instance";
import { publicAxios } from "../../../services/axios-instance";
import GoogleLoginButton from "../../../components/GoogleLoginButton/GoogleLoginButton";
import { useNotification } from "../../../hooks/useNotification";
import { useAuth } from "../../../context/AuthContext";

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState("");
    const navigate = useNavigate();
    const { showError } = useNotification();
    const { login: contextLogin } = useAuth();
    const handleClose = async () => {
        navigate("/");
    };

    const [info, setInfo] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault(); // không reload trang
        if (!email || !password) return;
        login(email, password);
    };

    useEffect(() => {
        const getDeviceInfo = () => {
            const ua = navigator.userAgent;
            // Screen resolution (ổn định)
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            // CPU cores
            const cpuCores = navigator.hardwareConcurrency || "Unknown";
            // RAM in GB
            const ram = navigator.deviceMemory ? navigator.deviceMemory + " GB" : "Unknown";
            // GPU info (cực kỳ quan trọng)
            const getGPU = () => {
                try {
                    const canvas = document.createElement("canvas");
                    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
                    if (!gl) return "Unknown GPU";
                    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
                    return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Unknown GPU";
                } catch (err) {
                    return "Unknown GPU";
                }
            };
            const gpu = getGPU();
            // Platform (Win32, MacIntel, Linux x86_64…)
            const platform = navigator.platform;
            setInfo({
                userAgent: ua,
                screen: `${screenWidth}x${screenHeight}`,
                cpuCores,
                ram,
                gpu,
                platform,
            });
        };

        getDeviceInfo();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const token = await publicAxios.post("/api/auth/login", {
                username: email,
                password,
                deviceInfoRequest: info,
            });
            sessionStorage.setItem("authToken", token.data.token);
            const userInfo = await authAxios.get("/api/auth/get-info");

            // Use context login
            contextLogin(userInfo.data, token.data.token);

            localStorage.setItem("userId", userInfo.data.userId);

            if (userInfo.data.role === "USER") {
                navigate("/");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            showError("Sai tài khoản hoặc mật khẩu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles["login-background"]}>
            <div className={styles["login-wrapper"]}>
                <LeftLoginRegisterForm />
                <div className={styles["login-right"]}>
                    <div className={styles["login-box"]}>
                        <div className={styles["login-header"]}>
                            <h2>Đăng nhập</h2>
                            <button className={styles["close-btn"]} onClick={handleClose}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <p className={styles["register-text"]}>
                            Bạn chưa có tài khoản? <Link to="/register">Đăng Ký</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email / Tên đăng nhập"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className={styles["password-input-container"]}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles["password-toggle-btn"]}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                </button>
                            </div>
                            <p className={styles["forgot-password"]}>
                                {" "}
                                <Link to="/forgot-password">Quên mật khẩu?</Link>{" "}
                            </p>
                            <button type="submit" className={styles["btn-login"]} disabled={loading}>
                                {loading ? <i className="fas fa-spinner fa-spin"></i> : "Đăng Nhập"}
                            </button>
                        </form>
                        <div className={styles.divider}>
                            <span className={styles.line}></span>
                            <span>or</span>
                            <span className={styles.line}></span>
                        </div>
                        <GoogleLoginButton />
                        <p className={styles.terms}>
                            Protected by reCAPTCHA and subject to the Prism <a href="a">Privacy Policy</a> and{" "}
                            <a href="a">Terms of Service</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
