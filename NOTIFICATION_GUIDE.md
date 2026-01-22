# Hướng dẫn sử dụng Notification System

Bạn đã thiết lập thành công một hệ thống thông báo để thay thế `alert()`. Dưới đây là cách sử dụng:

## 1. Cấu trúc Files

```
src/
├── context/
│   ├── CartContext.js
│   └── NotificationContext.js (NEW)
├── hooks/
│   └── useNotification.js (NEW)
├── components/
│   └── Notification/
│       ├── Notification.jsx (NEW)
│       └── Notification.module.css (NEW)
└── App.js (UPDATED)
```

## 2. Cách sử dụng trong Components

### Trong một Component bất kỳ:

```jsx
import React from "react";
import { useNotification } from "../hooks/useNotification";

function MyComponent() {
    const { showSuccess, showError, showWarning, showInfo } = useNotification();

    const handleSuccess = () => {
        showSuccess("Thao tác thành công!");
    };

    const handleError = () => {
        showError("Có lỗi xảy ra!");
    };

    const handleWarning = () => {
        showWarning("Cảnh báo!", 3000); // Tắt sau 3 giây
    };

    const handleInfo = () => {
        showInfo("Thông tin");
    };

    return (
        <div>
            <button onClick={handleSuccess}>Thành công</button>
            <button onClick={handleError}>Lỗi</button>
            <button onClick={handleWarning}>Cảnh báo</button>
            <button onClick={handleInfo}>Thông tin</button>
        </div>
    );
}

export default MyComponent;
```

## 3. API Methods

### Các hàm có sẵn:

```javascript
const {
    showSuccess, // Hiển thị thông báo thành công (xanh)
    showError, // Hiển thị thông báo lỗi (đỏ)
    showWarning, // Hiển thị cảnh báo (vàng)
    showInfo, // Hiển thị thông tin (xanh dương)
    showNotification, // Hàm tổng quát
    removeNotification, // Xóa thông báo theo ID
    notifications, // Mảng thông báo hiện tại
} = useNotification();
```

### Tham số:

```javascript
// Dạng cơ bản
showSuccess(message);
showError(message);
showWarning(message);
showInfo(message);

// Với duration (milliseconds)
showSuccess(message, duration);
showError(message, duration);
showWarning(message, duration);
showInfo(message, duration);

// Ví dụ
showSuccess("Lưu thành công!", 5000); // Tắt sau 5 giây
showError("Lỗi máy chủ!", 7000); // Tắt sau 7 giây
showInfo("Đang tải...", 0); // Không tắt tự động (0)
```

## 4. Ví dụ thực tế

### Thay thế alert() thông thường:

**Trước:**

```javascript
alert("Thao tác thành công!");
```

**Sau:**

```javascript
const { showSuccess } = useNotification();
showSuccess("Thao tác thành công!");
```

### Trong API call:

```javascript
import { useNotification } from '../hooks/useNotification';
import axios from 'axios';

function LoginForm() {
  const { showSuccess, showError } = useNotification();

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post('/api/login', credentials);
      showSuccess('Đăng nhập thành công!');
      // Redirect...
    } catch (error) {
      showError(error.response?.data?.message || 'Đăng nhập thất bại!');
    }
  };

  return (
    // Form...
  );
}
```

## 5. Tuỳ chỉnh Styling

Bạn có thể tuỳ chỉnh CSS trong `src/components/Notification/Notification.module.css`:

- `.notificationContainer` - Container chứa tất cả thông báo
- `.notification` - Styling cho mỗi thông báo
- `.success`, `.error`, `.warning`, `.info` - Styling theo loại
- Animation `slideIn`, `slideOut` - Hiệu ứng chuyển động

## 6. Tính năng

✅ Tự động tắt sau duration (mặc định 5 giây)
✅ Có thể tắt thủ công bằng nút close
✅ Hỗ trợ 4 loại thông báo (success, error, warning, info)
✅ Animation mượt mà
✅ Responsive (mobile friendly)
✅ Stacking thông báo
✅ Customize được duration và message

## 7. Lưu ý

- Phải sử dụng `useNotification` trong các component nằm trong `<NotificationProvider>`
- Nếu gặp lỗi "useNotification must be used within NotificationProvider", check xem component có bên trong `App` không
- Thông báo sẽ tự động xóa sau duration (trừ khi set duration = 0)
