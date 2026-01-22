import React, { createContext, useState, useCallback } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = "info", duration = 5000) => {
        const id = Date.now();

        const notification = {
            id,
            message,
            type, // 'success', 'error', 'warning', 'info'
            duration,
        };

        setNotifications((prev) => [...prev, notification]);

        // Tự động xóa notification sau duration
        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }

        return id;
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, []);

    const showSuccess = useCallback(
        (message, duration = 5000) => {
            return showNotification(message, "success", duration);
        },
        [showNotification],
    );

    const showError = useCallback(
        (message, duration = 5000) => {
            return showNotification(message, "error", duration);
        },
        [showNotification],
    );

    const showWarning = useCallback(
        (message, duration = 5000) => {
            return showNotification(message, "warning", duration);
        },
        [showNotification],
    );

    const showInfo = useCallback(
        (message, duration = 5000) => {
            return showNotification(message, "info", duration);
        },
        [showNotification],
    );

    const value = {
        notifications,
        showNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeNotification,
    };

    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};
