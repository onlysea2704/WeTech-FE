import axios from "axios";
const authAxios = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

authAxios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
            sessionStorage.removeItem("authToken");
            alert("Đăng nhập để tiếp tục");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    },
);

const publicAxios = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

export { authAxios, publicAxios };
