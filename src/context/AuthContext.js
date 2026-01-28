import React, { createContext, useState, useEffect, useContext } from "react";
import { authAxios } from "../services/axios-instance";
import avatarImage from "../assets/avatar_user.png";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = sessionStorage.getItem("authToken");

            if (!token) {
                setLoading(false);
                return;
            }

            // Sync from localStorage if available first for immediate UI
            const storedFullname = localStorage.getItem("fullname");
            const storedEmail = localStorage.getItem("email");
            const storedLinkImage = localStorage.getItem("linkImage");

            if (storedFullname && storedEmail) {
                setUser({
                    fullname: storedFullname,
                    email: storedEmail,
                    linkImage: storedLinkImage || avatarImage,
                });
            }

            try {
                // Verify token and get latest info
                // Note: modify this endpoint if you have a specific /me endpoint,
                // in Profile.jsx it uses /api/auth/get-info
                const res = await authAxios.get("/api/auth/get-info");
                if (res.data) {
                    const userData = {
                        fullname: res.data.fullname,
                        email: res.data.email,
                        linkImage: res.data.linkImage || avatarImage,
                        phone: res.data.sdt,
                        ...res.data,
                    };
                    setUser(userData);
                    // Update localStorage to keep in sync
                    localStorage.setItem("fullname", userData.fullname);
                    localStorage.setItem("email", userData.email);
                    if (userData.linkImage) {
                        localStorage.setItem("linkImage", userData.linkImage);
                    }
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                // If token invalid, maybe logout? For now just stay as is or null
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = (userData, token) => {
        sessionStorage.setItem("authToken", token);
        localStorage.setItem("fullname", userData.fullname);
        localStorage.setItem("email", userData.email);
        localStorage.setItem("linkImage", userData.linkImage || "");

        setUser({
            fullname: userData.fullname,
            email: userData.email,
            linkImage: userData.linkImage || avatarImage,
            ...userData,
        });
    };

    const logout = () => {
        sessionStorage.removeItem("authToken");
        const finishedLession = localStorage.getItem("completedVideos");
        localStorage.clear();
        if (finishedLession) localStorage.setItem("completedVideos", finishedLession);
        setUser(null);
    };

    const updateProfile = (updatedData) => {
        setUser((prev) => {
            const newUser = { ...prev, ...updatedData };
            // Update localStorage
            if (updatedData.fullname) localStorage.setItem("fullname", updatedData.fullname);
            if (updatedData.email) localStorage.setItem("email", updatedData.email);
            if (updatedData.linkImage) localStorage.setItem("linkImage", updatedData.linkImage);
            return newUser;
        });
    };

    const value = {
        user,
        loading,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
