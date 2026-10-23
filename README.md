# Sổ nhỏ · Little Roster

Ứng dụng quản lý sinh viên chạy trực tiếp trên trình duyệt, không cần cài thư viện hay dịch vụ bên ngoài. Giao diện tự chọn tiếng Việt hoặc tiếng Anh theo ngôn ngữ trình duyệt. Hồ sơ và ảnh tải lên được lưu cục bộ trong `localStorage` của trình duyệt trên thiết bị này.

## Chạy ứng dụng

Mở `index.html` trong trình duyệt, hoặc chạy máy chủ tĩnh trong thư mục dự án:

```powershell
python -m http.server 8000
```

Sau đó truy cập `http://localhost:8000`.

## Tính năng

- Danh sách sinh viên, tìm kiếm và sắp xếp theo tên.
- Màn hình chi tiết hồ sơ, màn hình thêm và chỉnh sửa.
- Thêm, đọc, cập nhật và xóa hồ sơ; chỉnh sửa và xóa đều cần xác nhận.
- Tên, mã số, email và ảnh đại diện qua đường dẫn hoặc tải ảnh từ thiết bị.
- Kiểm tra trường bắt buộc, định dạng email và dữ liệu trùng lặp.
- Dữ liệu tự lưu cục bộ sau mỗi thay đổi.

## English

A standalone student directory with list, detail, and add/edit screens. It supports student CRUD, photo links and device uploads, confirmation before edits and deletion, and automatic Vietnamese/English selection from the browser language. Student records and uploaded photos are stored locally in this browser with `localStorage`.
