# 02 - Tập Tính Năng Bản Submit

## Nguyên Tắc Chọn Tính Năng

1. **Tối thiểu để pass review** -- Shopify cần thấy app thực sự hoạt động, giải quyết vấn đề thực
2. **End-to-end flow hoàn chỉnh** -- Từ cài đặt → cấu hình → khách hàng dùng → merchant thấy kết quả
3. **Forward-compatible** -- Code/kiến trúc của bản Submit là nền tảng cho MVP, không cần rewrite
4. **Không show tính năng chưa có** -- Không "Coming soon", không disabled buttons cho features P1/P2

---

## 1. Tính Năng Bản Submit (Submit Version)

### Phạm vi: Chỉ 1 flow chính hoạt động hoàn chỉnh

> **Flow cốt lõi:** Khách hàng tự sửa đơn hàng từ Order Status Page → Merchant thấy lịch sử sửa trong admin

### 1.1 Customer-Facing (Storefront)

| Tính năng | Có/Không | Lý do |
|-----------|---------|-------|
| **Sửa địa chỉ giao hàng** | **CÓ** | Pain point #1, đơn giản nhất, chứng minh giá trị ngay |
| **Đổi variant (size, màu)** | **CÓ** | Pain point lớn, cần để reviewer thấy app useful |
| **Thay đổi số lượng** | **CÓ** | Đi cùng đổi variant, logic tương tự |
| **Hủy đơn hàng** | **CÓ** | Flow riêng biệt nhưng đơn giản, merchant rất cần |
| Widget trên Order Status Page | **CÓ** | Entry point chính cho khách hàng |
| Widget trên Thank-You Page | **KHÔNG** | Thêm sau khi lên MVP, không ảnh hưởng review |
| Upsell/Cross-sell | **KHÔNG** | P1, thêm sau |
| Store credit refund | **KHÔNG** | P1, thêm sau |
| Retention flow khi hủy | **KHÔNG** | P1, thêm sau |
| Google Address Validation | **KHÔNG** | P1, thêm sau |
| Đa ngôn ngữ | **KHÔNG** | P1, chỉ cần English cho submit |

### 1.2 Merchant Admin

| Tính năng | Có/Không | Lý do |
|-----------|---------|-------|
| **Dashboard cơ bản** | **CÓ** | Landing page khi mở app, hiển thị tổng quan |
| **Danh sách đơn hàng đã sửa** | **CÓ** | Merchant cần thấy kết quả hoạt động |
| **Chi tiết đơn + lịch sử sửa** | **CÓ** | Reviewer cần thấy data flow hoàn chỉnh |
| **Cài đặt edit window** | **CÓ** | Merchant cần control thời gian cho phép sửa |
| **Cài đặt loại sửa được phép** | **CÓ** | Merchant cần control khách được sửa gì |
| **Cài đặt thông báo email** | **CÓ** | Bật/tắt email notification |
| **Onboarding đơn giản** | **CÓ** | Merchant mới biết cách bắt đầu |
| Merchant tự sửa đơn hàng | **KHÔNG** | Thêm khi lên MVP, Shopify native đã có cơ bản |
| Edit rules per product/collection | **KHÔNG** | MVP, settings global đủ cho submit |
| Analytics dashboard (charts) | **KHÔNG** | MVP, dashboard cơ bản đủ cho submit |
| Shopify Flow integration | **KHÔNG** | P1 |
| Subscription page (billing) | **KHÔNG** | Submit bản Free, chưa cần billing |

### 1.3 Backend/Infrastructure

| Tính năng | Có/Không | Lý do |
|-----------|---------|-------|
| **OAuth + session management** | **CÓ** | Bắt buộc |
| **Webhook handling** (orders/create, orders/updated, app/uninstalled) | **CÓ** | Bắt buộc |
| **GDPR webhooks** | **CÓ** | Bắt buộc |
| **Order edit engine** (begin/commit qua Shopify API) | **CÓ** | Core logic |
| **Auto refund/charge** | **CÓ** | Phải xử lý tiền đúng |
| **Inventory restock** | **CÓ** | Tồn kho phải chính xác |
| **Email notifications** (cơ bản) | **CÓ** | Thông báo khi sửa/hủy |
| **Edit window management** | **CÓ** | Hết hạn tự động |
| **Usage tracking** (đếm số lần sửa) | **CÓ** | Chuẩn bị cho billing sau |
| Shopify Billing API | **KHÔNG** | Submit Free only, thêm billing khi lên MVP |
| BigQuery analytics | **KHÔNG** | MVP, Firestore queries đủ cho submit |
| Pub/Sub async processing | **KHÔNG** | Submit xử lý sync, thêm async khi scale |
| Cloud Tasks / Scheduled functions | **CÓ** (cơ bản) | Cần cho expire edit windows |

---

## 2. So Sánh Submit vs MVP vs Full

| Tính năng | Submit | MVP | Full |
|-----------|--------|-----|------|
| **Sửa địa chỉ** | CÓ | CÓ | CÓ |
| **Đổi variant** | CÓ | CÓ | CÓ |
| **Thay đổi số lượng** | CÓ | CÓ | CÓ |
| **Hủy đơn** | CÓ | CÓ | CÓ |
| **Order Status Page widget** | CÓ | CÓ | CÓ |
| **Thank-You Page widget** | -- | CÓ | CÓ |
| **Dashboard cơ bản** | CÓ | CÓ | CÓ |
| **Settings (global)** | CÓ | CÓ | CÓ |
| **Email notifications** | Cơ bản | Tùy chỉnh | Tùy chỉnh |
| **Edit rules per product** | -- | CÓ | CÓ |
| **Merchant edit từ admin** | -- | CÓ | CÓ |
| **Google Address Validation** | -- | CÓ | CÓ |
| **Post-purchase upsell** | -- | -- | CÓ |
| **Cancellation retention** | -- | -- | CÓ |
| **Store credit refund** | -- | -- | CÓ |
| **Shopify Flow** | -- | -- | CÓ |
| **Analytics (charts)** | -- | CÓ | CÓ |
| **Billing integration** | -- | CÓ | CÓ |
| **Đa ngôn ngữ** | -- | -- | CÓ |
| **AI suggestions** | -- | -- | CÓ |
| **B2B/Wholesale** | -- | -- | CÓ |
| **Subscription editing** | -- | -- | CÓ |
| **Bulk editing** | -- | -- | CÓ |

---

## 3. Pricing Cho Bản Submit

### Chỉ 1 plan: **Free**

| Thuộc tính | Giá trị |
|-----------|---------|
| Giá | $0 |
| Giới hạn | 50 edits/tháng |
| Tính năng | Tất cả tính năng bản Submit |
| Branding | "Powered by Avada" trên widget |
| Trial | Không cần (đã free) |

**Lý do chỉ có Free:**
1. **Không cần implement Billing API** = ít code hơn = submit nhanh hơn
2. **Reviewer dễ test hơn** = không cần tạo test charge
3. **Thu hút installs sớm** = builds reviews và ranking
4. **Thêm paid plans khi lên MVP** = chỉ cần thêm billing code, không ảnh hưởng existing features

---

## 4. Scopes API Cần Thiết (Tối Thiểu)

```
read_orders, write_orders
read_products
read_inventory, write_inventory
read_customers
read_fulfillments
```

**KHÔNG request trong bản Submit:**
- `write_products` -- không cần sửa products
- `read_shipping`, `write_shipping` -- sửa address qua order update mutation
- `read_locales` -- chưa cần multi-language

> **Quan trọng:** Khi lên MVP nếu cần thêm scopes, merchant phải re-authorize. Nên chỉ request đúng những gì cần, nhưng plan trước scope nào sẽ cần thêm cho MVP.

---

## 5. Webhooks Cần Đăng Ký

### Bắt buộc cho Submit

| Webhook | Mục đích |
|---------|---------|
| `app/uninstalled` | Cleanup khi gỡ app |
| `orders/create` | Track đơn mới, mở edit window |
| `orders/updated` | Sync trạng thái đơn hàng |
| `orders/fulfilled` | Đóng edit window |
| `orders/partially_fulfilled` | Cập nhật fulfillment status |
| `shop/update` | Sync thông tin shop |

### GDPR Mandatory Webhooks

| Webhook | Mục đích |
|---------|---------|
| `customers/data_request` | Trả về data khách hàng |
| `customers/redact` | Xóa data khách hàng |
| `shop/redact` | Xóa data shop (48h sau uninstall) |

---

## 6. Ước Lượng Thời Gian Phát Triển

| Phase | Thời gian | Nội dung |
|-------|----------|---------|
| Foundation | 1 tuần | Scaffolding, OAuth, webhooks, Firestore schema, auth middleware |
| Core Backend | 1 tuần | Edit engine, address/variant/qty/cancel services, API handlers |
| Frontend Admin | 1 tuần | Dashboard, orders list, order detail, settings, onboarding |
| Storefront Widget | 3-4 ngày | Theme App Extension, edit page (Preact), confirmation flow |
| Email + Polish | 2-3 ngày | Email notifications, error handling, responsive check |
| Testing + Fix | 3-4 ngày | End-to-end testing, fix bugs, chuẩn bị demo store |
| App Listing | 1-2 ngày | Screenshots, description, privacy policy, submit |
| **Tổng** | **~5-6 tuần** | |

---

## 7. Quyết Định Kiến Trúc Quan Trọng (Ảnh Hưởng Đến MVP)

### Làm đúng từ đầu (bản Submit) để không phải sửa khi lên MVP:

| Quyết định | Submit làm gì | Tại sao |
|-----------|--------------|--------|
| **Firestore schema** | Schema đầy đủ như MVP (có fields cho upsell, retention, etc.) | Thêm field dễ, đổi schema khó |
| **API route structure** | `/api/storefront/*` và `/api/admin/*` tách biệt | MVP thêm endpoints, không đổi structure |
| **Service layer pattern** | Mỗi domain 1 service (editService, cancellationService, etc.) | MVP thêm services mới, không sửa cũ |
| **Repository pattern** | Mỗi collection 1 repository | MVP thêm repositories, không đổi cũ |
| **Middleware stack** | Auth → Rate limit → Handler | MVP thêm middleware, không đổi stack |
| **Theme Extension** (không ScriptTag) | Dùng Theme App Extension từ đầu | Không phải migrate từ ScriptTag sang Extension |
| **Preact cho storefront** | Widget dùng Preact | MVP thêm components, không đổi framework |
| **Environment config** | `.env` với tất cả config keys (kể cả chưa dùng) | MVP chỉ thêm values, không đổi config structure |
| **Error handling pattern** | Custom error classes + global handler | MVP thêm error types, không đổi pattern |
| **Firestore indexes** | Tạo indexes cho cả queries MVP cần | Tạo index mất thời gian deploy, làm trước |

### KHÔNG làm trong Submit (thêm khi MVP):

| Thành phần | Tại sao không làm |
|-----------|-------------------|
| **Pub/Sub async** | Submit traffic thấp, sync đủ. MVP thêm Pub/Sub wrapper quanh existing sync code |
| **BigQuery** | Submit dùng Firestore queries cho dashboard. MVP thêm BigQuery pipeline |
| **Shopify Billing** | Submit free only. MVP thêm billing handlers |
| **Shopify Flow** | P1 feature. MVP thêm flow triggers |
| **i18n system** | Submit English only. MVP thêm i18n wrapper |

---

*Tài liệu này định nghĩa rõ ranh giới giữa bản Submit và MVP, đảm bảo mọi dòng code viết cho Submit đều là nền tảng cho MVP.*
