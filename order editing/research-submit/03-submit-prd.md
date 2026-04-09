# 03 - PRD Bản Submit
# Avada Order Editing - Submission Version

---

## 1. Tổng Quan

| Trường | Giá trị |
|--------|---------|
| **Tên sản phẩm** | Avada Order Editing |
| **Phiên bản** | 0.1 (Submission) |
| **Mục tiêu** | Pass Shopify App Review lần đầu |
| **Nền tảng** | Shopify App (Embedded) |
| **Giá** | Free (50 edits/tháng) |
| **Thời gian phát triển** | ~5-6 tuần |

---

## 2. Tuyên Bố Giá Trị

**"Cho phép khách hàng tự sửa đơn hàng -- địa chỉ, sản phẩm, số lượng -- trực tiếp từ trang theo dõi đơn hàng, không cần liên hệ hỗ trợ. Hoàn toàn miễn phí."**

---

## 3. User Stories Bản Submit

### Customer (Khách Hàng)

| ID | User Story | Mức ưu tiên |
|----|-----------|-------------|
| S-01 | Là khách hàng, tôi muốn sửa địa chỉ giao hàng sau khi đặt đơn, để hàng đến đúng nơi | Bắt buộc |
| S-02 | Là khách hàng, tôi muốn đổi variant (size, màu) sản phẩm, để nhận đúng sản phẩm cần | Bắt buộc |
| S-03 | Là khách hàng, tôi muốn thay đổi số lượng sản phẩm, để tăng/giảm trước khi giao | Bắt buộc |
| S-04 | Là khách hàng, tôi muốn hủy đơn hàng trong thời gian cho phép, để nhận hoàn tiền | Bắt buộc |
| S-05 | Là khách hàng, tôi muốn xem rõ sự thay đổi và chênh lệch giá trước khi xác nhận | Bắt buộc |
| S-06 | Là khách hàng, tôi muốn sửa đơn từ trang Order Status Page | Bắt buộc |

### Merchant (Chủ Cửa Hàng)

| ID | User Story | Mức ưu tiên |
|----|-----------|-------------|
| S-07 | Là merchant, tôi muốn cài đặt thời gian cho phép sửa (ví dụ: 2 giờ) | Bắt buộc |
| S-08 | Là merchant, tôi muốn chọn loại thay đổi nào khách được phép làm | Bắt buộc |
| S-09 | Là merchant, tôi muốn đơn tự động hoàn tiền/thu thêm khi giá thay đổi | Bắt buộc |
| S-10 | Là merchant, tôi muốn tồn kho tự động cập nhật khi đơn bị sửa | Bắt buộc |
| S-11 | Là merchant, tôi muốn nhận email thông báo khi khách sửa đơn | Bắt buộc |
| S-12 | Là merchant, tôi muốn xem dashboard tổng quan hoạt động sửa đơn | Bắt buộc |
| S-13 | Là merchant, tôi muốn xem chi tiết lịch sử sửa của từng đơn | Bắt buộc |

---

## 4. Đặc Tả Tính Năng

### 4.1 Order Status Page Widget (Theme App Extension)

**Mô tả:** Block hiển thị trên trang Order Status Page, cho phép khách hàng bắt đầu sửa đơn.

**Yêu cầu:**
- Hiển thị nút "Sửa Đơn Hàng" và "Hủy Đơn Hàng"
- Đếm ngược thời gian còn lại trong edit window
- Thanh progress bar cho thời gian
- Hiện danh sách thay đổi được phép (địa chỉ, sản phẩm, số lượng)
- Khi hết thời gian: hiện "Thời gian sửa đơn đã hết" với buttons disabled
- Khi đã giao: hiện "Đơn hàng đã được giao và không thể sửa"
- Responsive trên mobile

**Implementation:** Liquid App Block trong Theme App Extension

---

### 4.2 Trang Sửa Đơn Hàng (Customer Edit Page)

**Mô tả:** Trang độc lập cho khách hàng sửa đơn, mở từ widget trên Order Status Page.

**Các section:**

**Section 1: Địa Chỉ Giao Hàng**
- Hiện địa chỉ hiện tại + nút "Sửa"
- Click "Sửa" → form inline: Tên, Địa chỉ 1, Địa chỉ 2, Thành phố, Tỉnh/Bang, Mã bưu điện, Quốc gia, SĐT
- Validate required fields
- Lưu → cập nhật qua Shopify API

**Section 2: Sản Phẩm Trong Đơn**
- Mỗi line item: Ảnh, tên, variant, giá, số lượng
- Nút "Đổi Variant": mở selector hiện các variant khác + giá + tình trạng kho
- Stepper số lượng: +/- với validation min/max và tồn kho
- Nút "Xóa": xác nhận trước khi xóa
- Không cho xóa item cuối cùng (gợi ý hủy đơn thay vì)

**Section 3: Tóm Tắt Giá**
- Tổng ban đầu
- Tổng mới
- Chênh lệch (hoàn tiền hoặc thu thêm)
- Nút "Xem Lại Thay Đổi"

**Section 4: Xác Nhận Thay Đổi**
- Danh sách tất cả thay đổi (cũ → mới)
- Bảng chi tiết giá (subtotal, thuế, shipping, tổng mới)
- Checkbox "Tôi xác nhận thay đổi này"
- Nút "Xác Nhận" → xử lý → màn hình thành công

---

### 4.3 Flow Hủy Đơn Hàng

**Mô tả:** Flow đơn giản cho khách hủy đơn.

**Bước 1:** Chọn lý do hủy (radio buttons)
- Đặt nhầm sản phẩm
- Tìm được giá tốt hơn
- Không cần nữa
- Giao hàng quá lâu
- Khác (nhập text)

**Bước 2:** Xác nhận hủy
- Hiển thị số tiền hoàn
- Phương thức thanh toán gốc
- Thời gian xử lý hoàn tiền
- Nút "Hủy Đơn Hàng" (destructive) + "Giữ Đơn Hàng"

**Bước 3:** Thành công
- "Đơn hàng đã được hủy"
- Thông tin hoàn tiền
- Link quay lại shop

> **Lưu ý:** Bản Submit KHÔNG có retention offer. Chỉ là flow hủy đơn giản. MVP sẽ thêm retention flow giữa bước 1 và 2.

---

### 4.4 Dashboard (Admin)

**Mô tả:** Trang chính khi mở app, hiển thị tổng quan.

**Nội dung:**
- **Welcome banner** (lần đầu): "Chào mừng đến Avada Order Editing! Hoàn tất cài đặt để bắt đầu."
- **4 metric cards:**
  - Tổng lượt sửa (tháng này)
  - Tổng lượt hủy (tháng này)
  - Số tiền tiết kiệm hỗ trợ (ước tính: edits x $10)
  - Tỷ lệ hủy đơn
- **Hoạt động gần đây:** 10 lượt sửa/hủy gần nhất
- **Trạng thái plan:** "Free Plan: X/50 lượt sửa đã dùng tháng này" + progress bar

**Polaris components:** Page, Layout, Card, Badge, ProgressBar, ResourceList

---

### 4.5 Danh Sách Đơn Hàng (Admin)

**Mô tả:** Danh sách đơn hàng đã sửa hoặc đang trong edit window.

**Nội dung:**
- Bảng: Số đơn, Khách hàng, Ngày, Loại sửa, Trạng thái
- Tabs: Tất cả | Đã sửa | Đã hủy | Đang chờ sửa
- Tìm kiếm theo số đơn, tên khách
- Phân trang

**Polaris components:** Page, IndexTable, IndexFilters, Tabs, Pagination, Badge

---

### 4.6 Chi Tiết Đơn Hàng (Admin)

**Mô tả:** Xem chi tiết 1 đơn hàng + toàn bộ lịch sử sửa đổi.

**Nội dung:**
- Header: Số đơn, tên khách, email, ngày đặt
- Trạng thái: Badge (Đã sửa / Đã hủy / Đang chờ), thời gian edit window
- Sản phẩm hiện tại: danh sách line items
- Địa chỉ giao hiện tại
- Timeline sửa đổi: mỗi lần sửa hiện thời gian, loại, chi tiết thay đổi, ai sửa
- Link "Xem trong Shopify" → mở order trong Shopify Admin

**Polaris components:** Page, Layout, Card, Badge, Timeline (custom), ResourceList, Button

---

### 4.7 Trang Cài Đặt (Admin)

**Mô tả:** Cấu hình behavior của app.

**Section 1: Thời Gian Sửa Đơn**
- Dropdown: 30 phút, 1 giờ, 2 giờ, 3 giờ, 6 giờ, 12 giờ, 24 giờ, 48 giờ, Cho đến khi giao hàng
- Mặc định: 2 giờ

**Section 2: Loại Thay Đổi Được Phép**
- [x] Sửa địa chỉ giao hàng
- [x] Đổi variant sản phẩm
- [x] Thay đổi số lượng
- [x] Xóa sản phẩm
- [x] Hủy đơn hàng

**Section 3: Thông Báo Email**
- [x] Gửi email cho khách khi đơn được sửa
- [x] Gửi email cho khách khi đơn bị hủy
- [x] Gửi email cho merchant khi khách sửa đơn
- [x] Gửi email cho merchant khi khách hủy đơn
- Ô nhập email merchant (mặc định: email shop)

**Section 4: Hoàn Tiền**
- Tự động hoàn tiền khi giá giảm: [Toggle ON]
- Tự động gửi invoice khi giá tăng: [Toggle ON]

**Polaris components:** Page, Layout, AnnotatedSection, Card, Select, ChoiceList, Toggle, TextField

---

### 4.8 Onboarding (Admin)

**Mô tả:** Welcome flow cho merchant mới cài app. Đơn giản, 3 bước.

**Bước 1: Chào mừng**
- "Avada Order Editing giúp khách hàng tự sửa đơn hàng, giảm đến 60% ticket hỗ trợ"
- Nút "Bắt Đầu Cài Đặt"

**Bước 2: Cấu Hình Nhanh**
- Chọn thời gian edit window
- Chọn loại thay đổi cho phép
- (Pre-filled với defaults hợp lý)

**Bước 3: Kích Hoạt Widget**
- Hướng dẫn bật Theme App Extension trong theme editor
- Link trực tiếp đến theme customizer
- "Sau khi bật, khách hàng sẽ thấy nút 'Sửa Đơn Hàng' trên trang theo dõi đơn."

---

## 5. Luồng Dữ Liệu End-to-End

```
1. Merchant cài app
   → OAuth → Lưu shop + accessToken → Tạo editSettings mặc định
   → Hiện onboarding

2. Khách đặt hàng trên Shopify
   → Webhook orders/create → Tạo record trong orders collection
   → Tính editWindowExpiresAt → editWindowStatus = "open"

3. Khách mở Order Status Page
   → Widget check edit eligibility (API call)
   → Hiện nút "Sửa Đơn" nếu eligible

4. Khách sửa đơn
   → Chọn thay đổi → Validate (tồn kho, rules) → Tính chênh lệch giá
   → Xác nhận → orderEditBegin → mutations → orderEditCommit
   → Lưu orderEdit record → Gửi email → Cập nhật dashboard

5. Merchant mở app
   → Dashboard hiện metrics + recent activity
   → Click vào đơn → Xem chi tiết + timeline sửa đổi
```

---

## 6. Không Có Trong Bản Submit (Rõ Ràng)

Những thứ sau **KHÔNG được hiện trong UI** của bản Submit. Không disabled button, không "Coming soon", không placeholder:

- Thank-You Page widget
- Merchant edit từ admin (dùng Shopify native)
- Edit rules per product/collection
- Post-purchase upsell
- Cancellation retention offers
- Store credit refund
- Google Address Validation
- Shopify Flow integration
- Analytics charts
- Billing / Paid plans
- Multi-language
- AI suggestions
- B2B / Subscription editing
- Bulk editing
- 3PL integrations

> Code backend có thể có placeholder/interfaces cho các tính năng trên (để forward-compatible), nhưng UI **không hiện gì** liên quan.

---

## 7. Tiêu Chí Chấp Nhận Bản Submit

| # | Tiêu chí | Pass |
|---|---------|------|
| 1 | Merchant cài app thành công trên dev store | |
| 2 | Onboarding flow chạy đúng 3 bước | |
| 3 | Settings lưu và apply đúng | |
| 4 | Widget hiện trên Order Status Page với countdown | |
| 5 | Khách sửa được địa chỉ giao hàng | |
| 6 | Khách đổi được variant sản phẩm | |
| 7 | Khách thay đổi được số lượng | |
| 8 | Khách hủy được đơn hàng | |
| 9 | Hoàn tiền/thu thêm tự động đúng | |
| 10 | Tồn kho cập nhật đúng khi sửa/hủy | |
| 11 | Email notification gửi được | |
| 12 | Dashboard hiện metrics đúng | |
| 13 | Danh sách đơn hàng hoạt động với filter/search | |
| 14 | Chi tiết đơn hàng hiện timeline đúng | |
| 15 | Uninstall → cleanup data đúng | |
| 16 | Reinstall → hoạt động bình thường | |
| 17 | Mobile responsive (admin + storefront) | |
| 18 | Không có JavaScript errors trong console | |

---

*Kết thúc PRD - Avada Order Editing Submission Version v0.1*
