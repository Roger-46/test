# Capture App Interface Skill

Skill tự động chụp ảnh toàn bộ giao diện app Luna Affiliate và lưu vào `documents/roger/app-interface/`.

## Khi nào kích hoạt

- Roger nói: "chụp toàn bộ giao diện app", "update giao diện app", "capture app interface"
- Roger nói: "chụp lại trang X" → chụp riêng trang đó
- Sau khi Roger **chốt** design mới → chụp lại trang liên quan

## Quy trình tổng quát

```
1. Login vào Shopify (dùng skill shopify-testing)
2. Lần lượt truy cập từng trang
3. Mỗi trang: đợi load → chụp trạng thái mặc định → thao tác để hiện các sub-view → chụp tiếp
4. Lưu ảnh theo cấu trúc thư mục bên dưới
5. Báo cáo kết quả cho Roger
```

## Cấu trúc thư mục

```
documents/roger/app-interface/
├── admin-dashboard/
│   ├── UI1-dashboard-overview.png          # Trang chính với stats
│   └── UI2-dashboard-empty.png             # Trạng thái trống (nếu có)
│
├── admin-programs/
│   ├── UI1-programs-list.png               # Danh sách programs
│   ├── UI2-programs-list-empty.png         # Trạng thái trống
│   ├── UI3-programs-action-menu.png        # Click action menu trên 1 program
│   ├── UI4-programs-delete-modal.png       # Modal xác nhận xóa
│   ├── UI5-programs-bulk-delete.png        # Chọn nhiều + bulk delete modal
│   └── UI6-programs-copy-link.png          # Copy link action
│
├── admin-programs-new/
│   ├── UI1-program-new-form.png            # Form tạo program mới (trống)
│   ├── UI2-program-new-commission-fixed.png    # Commission type: Fixed
│   ├── UI3-program-new-commission-tiered.png   # Commission type: Tiered
│   └── UI4-program-new-product-scope.png       # Product scope settings
│
├── admin-programs-edit/
│   ├── UI1-program-edit-form.png           # Form edit program (đã có data)
│   └── UI2-program-edit-loading.png        # Loading skeleton
│
├── admin-affiliates/
│   ├── UI1-affiliates-list.png             # Danh sách affiliates
│   ├── UI2-affiliates-list-empty.png       # Trạng thái trống
│   ├── UI3-affiliates-add-modal.png        # Modal thêm affiliate
│   ├── UI4-affiliates-edit-modal.png       # Modal sửa affiliate
│   ├── UI5-affiliates-delete-modal.png     # Modal xác nhận xóa
│   ├── UI6-affiliates-approve-modal.png    # Modal approve (pending affiliate)
│   └── UI7-affiliates-disapprove-modal.png # Modal disapprove
│
├── admin-payouts/
│   ├── UI1-payouts-pending-tab.png         # Tab Pending Payouts
│   ├── UI2-payouts-pending-empty.png       # Pending tab trống
│   ├── UI3-payouts-mark-paid-modal.png     # Modal "Mark as paid"
│   ├── UI4-payouts-bulk-mark-paid.png      # Bulk select + mark as paid
│   ├── UI5-payouts-history-tab.png         # Tab Payout History
│   └── UI6-payouts-history-empty.png       # History tab trống
│
├── admin-settings/
│   └── UI1-settings-page.png               # Trang settings
│
├── admin-devzone/
│   └── UI1-devzone-page.png                # Trang dev zone
│
├── portal-login/
│   ├── UI1-login-page.png                  # Trang login
│   └── UI2-login-error.png                 # Login với error message
│
├── portal-register/
│   ├── UI1-register-page.png               # Trang đăng ký (full)
│   ├── UI2-register-form-filled.png        # Form đã điền
│   └── UI3-register-error.png              # Register với error
│
├── portal-dashboard/
│   ├── UI1-dashboard-overview.png          # Dashboard chính
│   ├── UI2-dashboard-pending-status.png    # Trạng thái pending
│   └── UI3-dashboard-copy-link.png         # Copy affiliate link
│
├── portal-conversions/
│   ├── UI1-conversions-list.png            # Danh sách conversions
│   └── UI2-conversions-empty.png           # Trạng thái trống
│
├── portal-payouts/
│   ├── UI1-payouts-history.png             # Lịch sử payouts
│   └── UI2-payouts-empty.png               # Trạng thái trống
│
└── portal-profile/
    ├── UI1-profile-info.png                # Thông tin account
    ├── UI2-profile-payment-paypal.png      # Payment settings - PayPal
    ├── UI3-profile-payment-bank.png        # Payment settings - Bank Transfer
    └── UI4-profile-change-password.png     # Change password section
```

## Quy tắc đặt tên

- **Format**: `UI{số}-{mô-tả-ngắn}.png`
- **Số thứ tự**: Bắt đầu từ 1, tăng dần theo luồng sử dụng
- **Mô tả**: Tiếng Anh, kebab-case, mô tả rõ nội dung màn hình
- **Chỉ tạo mới, KHÔNG xóa/thay ảnh cũ** — Roger tự quản lý ảnh cũ

## Chi tiết từng trang — Cách chụp

### ADMIN APP (Shopify Embedded)

**Base URL**: `https://admin.shopify.com/store/ag-tunght-aff-stg/apps/luna-affiliate-staging`

**Lưu ý quan trọng**:
- App load mất ~10s → luôn `wait_for({ time: 10 })` sau navigate
- Sidebar links bị disabled → dùng URL trực tiếp để navigate
- App nằm trong iframe → screenshot sẽ có cả Shopify Admin wrapper

---

#### 1. admin-dashboard

```javascript
// UI1: Dashboard overview
browser_navigate({ url: "https://admin.shopify.com/store/ag-tunght-aff-stg/apps/luna-affiliate-staging/embed" })
browser_wait_for({ time: 10 })
browser_take_screenshot({ fullPage: true })
// → Lưu: admin-dashboard/UI1-dashboard-overview.png
```

---

#### 2. admin-programs

```javascript
// UI1: Programs list
browser_navigate({ url: ".../embed/programs" })
browser_wait_for({ time: 10 })
browser_take_screenshot({ fullPage: true })
// → Lưu: admin-programs/UI1-programs-list.png

// UI3: Action menu - click "..." button trên 1 program row
browser_snapshot({}) // tìm action button ref
browser_click({ element: "Action menu", ref: "..." })
browser_take_screenshot({ fullPage: true })
// → Lưu: admin-programs/UI3-programs-action-menu.png

// UI4: Delete modal - click "Delete" trong action menu
browser_click({ element: "Delete", ref: "..." })
browser_take_screenshot({ fullPage: true })
// → Lưu: admin-programs/UI4-programs-delete-modal.png
// Đóng modal trước khi tiếp tục
```

---

#### 3. admin-programs-new

```javascript
// UI1: New program form
browser_navigate({ url: ".../embed/programs/new" })
browser_wait_for({ time: 10 })
browser_take_screenshot({ fullPage: true })
// → Lưu: admin-programs-new/UI1-program-new-form.png

// UI2-3: Thay đổi commission type (Fixed vs Tiered)
// Snapshot → tìm commission type dropdown → chọn → screenshot
```

---

#### 4. admin-programs-edit

```javascript
// UI1: Edit program (cần có program ID thật)
// Lấy program ID từ danh sách programs
browser_navigate({ url: ".../embed/programs/{id}" })
browser_wait_for({ time: 10 })
browser_take_screenshot({ fullPage: true })
// → Lưu: admin-programs-edit/UI1-program-edit-form.png
```

---

#### 5. admin-affiliates

```javascript
// UI1: Affiliates list
browser_navigate({ url: ".../embed/affiliates" })
browser_wait_for({ time: 10 })
browser_take_screenshot({ fullPage: true })
// → Lưu: admin-affiliates/UI1-affiliates-list.png

// UI3: Add modal - click "Add affiliate" button
browser_snapshot({})
browser_click({ element: "Add affiliate", ref: "..." })
browser_take_screenshot({ fullPage: true })
// → Lưu: admin-affiliates/UI3-affiliates-add-modal.png

// Đóng modal → click edit trên 1 affiliate → screenshot
// Đóng modal → click delete → screenshot
```

---

#### 6. admin-payouts

```javascript
// UI1: Pending payouts tab (mặc định)
browser_navigate({ url: ".../embed/payouts" })
browser_wait_for({ time: 10 })
browser_take_screenshot({ fullPage: true })
// → Lưu: admin-payouts/UI1-payouts-pending-tab.png

// UI3: Mark as paid modal
browser_snapshot({})
browser_click({ element: "Mark as paid", ref: "..." })
browser_take_screenshot({ fullPage: true })
// → Lưu: admin-payouts/UI3-payouts-mark-paid-modal.png

// UI5: History tab
browser_click({ element: "Payout History", ref: "..." })
browser_wait_for({ time: 3 })
browser_take_screenshot({ fullPage: true })
// → Lưu: admin-payouts/UI5-payouts-history-tab.png
```

---

#### 7. admin-settings & admin-devzone

```javascript
// Settings
browser_navigate({ url: ".../embed/settings" })
browser_wait_for({ time: 10 })
browser_take_screenshot({ fullPage: true })

// Dev Zone
browser_navigate({ url: ".../embed/dev_zone" })
browser_wait_for({ time: 10 })
browser_take_screenshot({ fullPage: true })
```

---

### AFFILIATE PORTAL

**Base URL**: `https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg`

**Affiliate Account**:
- Email: `thanghai450@gmail.com`
- Password: `ib.DtmtLgW(c`

---

#### 8. portal-login & portal-register

```javascript
// UI1: Login page
browser_navigate({ url: "https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg/login" })
browser_wait_for({ time: 5 })
browser_take_screenshot({ fullPage: true })
// → Lưu: portal-login/UI1-login-page.png

// UI1: Register page
browser_navigate({ url: "https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg/register" })
browser_wait_for({ time: 5 })
browser_take_screenshot({ fullPage: true })
// → Lưu: portal-register/UI1-register-page.png
```

---

#### 9. Login vào Portal

```javascript
// Navigate to login
browser_navigate({ url: "https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg/login" })
browser_wait_for({ time: 5 })
browser_snapshot({})

// Fill form & login
browser_fill({ element: "Email", ref: "...", text: "thanghai450@gmail.com" })
browser_fill({ element: "Password", ref: "...", text: "ib.DtmtLgW(c" })
browser_click({ element: "Sign In", ref: "..." })
browser_wait_for({ time: 5 })
```

---

#### 10. portal-dashboard, conversions, payouts, profile

```javascript
// Dashboard
browser_navigate({ url: "https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg" })
browser_wait_for({ time: 5 })
browser_take_screenshot({ fullPage: true })
// → Lưu: portal-dashboard/UI1-dashboard-overview.png

// Conversions
browser_navigate({ url: "https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg/conversions" })
browser_wait_for({ time: 5 })
browser_take_screenshot({ fullPage: true })
// → Lưu: portal-conversions/UI1-conversions-list.png

// Payouts
browser_navigate({ url: "https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg/payouts" })
browser_wait_for({ time: 5 })
browser_take_screenshot({ fullPage: true })
// → Lưu: portal-payouts/UI1-payouts-history.png

// Profile - cần scroll xuống để chụp hết các section
browser_navigate({ url: "https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg/profile" })
browser_wait_for({ time: 5 })
browser_take_screenshot({ fullPage: true })
// → Lưu: portal-profile/UI1-profile-info.png
// → Chụp thêm: thay đổi payment method dropdown để hiện PayPal vs Bank form
```

## Workflow khi Roger yêu cầu

### "Chụp toàn bộ giao diện app"

1. **Login** vào Shopify (theo skill shopify-testing)
2. **Tạo folders** nếu chưa có
3. **Chụp ADMIN** theo thứ tự:
   - Dashboard → Programs → Programs New → Programs Edit → Affiliates → Payouts → Settings → DevZone
4. **Chụp PORTAL** theo thứ tự:
   - Login → Register → Dashboard → Conversions → Payouts → Profile
5. Mỗi trang: chụp trạng thái mặc định trước, rồi thao tác để hiện sub-view (modal, tab, dropdown...)
6. **Báo cáo**: Liệt kê tất cả ảnh đã chụp, ghi chú trang nào có thay đổi so với lần trước

### "Chụp lại trang X" hoặc "Update giao diện trang X"

1. Login (nếu chưa)
2. Navigate đến trang X
3. Chụp tất cả UI states của trang đó
4. Lưu vào folder tương ứng
5. Báo cáo

### "Chụp trang mới" (trang chưa có trong danh sách)

1. Hỏi Roger trang đó ở đâu (URL, tên)
2. Tạo folder mới theo convention: `{area}-{tên-trang}/`
3. Chụp và đặt tên `UI1-...`, `UI2-...`
4. **Update skill này** — thêm trang mới vào danh sách

## Lưu ý đặc biệt

- **Chỉ tạo mới ảnh, KHÔNG xóa/thay ảnh cũ** — Roger tự quản lý
- Nếu trang không có data (empty state) → vẫn chụp, đánh dấu `empty` trong tên
- Nếu modal/dropdown không mở được (thiếu data) → bỏ qua, ghi chú trong báo cáo
- Nếu app chưa chạy (emulators tắt) → báo Roger bật app trước
- Screenshot dùng `fullPage: true` để chụp toàn bộ nội dung
- Sau khi chụp xong toàn bộ → tổng hợp báo cáo dạng bảng
