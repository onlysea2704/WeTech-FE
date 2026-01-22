import React, { useContext } from "react";
import { NotificationContext } from "../../context/NotificationContext";
import styles from "./Notification.module.css";

const NotificationItem = ({ notification, onRemove }) => {
    const getIcon = (type) => {
        switch (type) {
            case "success":
                return "✓";
            case "error":
                return "✕";
            case "warning":
                return "⚠";
            case "info":
                return "ℹ";
            default:
                return "•";
        }
    };

    return (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
            <div className={styles.notificationContent}>
                <span className={styles.icon}>{getIcon(notification.type)}</span>
                <span className={styles.message}>{notification.message}</span>
            </div>
            <button
                className={styles.closeBtn}
                onClick={() => onRemove(notification.id)}
                aria-label="Close notification"
            >
                ×
            </button>
        </div>
    );
};

export const Notification = () => {
    const { notifications, removeNotification } = useContext(NotificationContext);

    return (
        <div className={styles.notificationContainer}>
            {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} onRemove={removeNotification} />
            ))}
        </div>
    );
};

export default Notification;
