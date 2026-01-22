// Helper để hiển thị notification khi 401/403
// Được sử dụng trong axios interceptor
export let notificationHelper = null;

export const setNotificationHelper = (helper) => {
    notificationHelper = helper;
};

export const showAuthErrorNotification = () => {
    if (notificationHelper) {
        notificationHelper.showError("Đăng nhập để tiếp tục");
    } else {
        // Fallback nếu notification không sẵn có
        console.warn("Notification helper not initialized");
    }
};
