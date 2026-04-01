# Research: Avada Order Editing MVP

## 1. Tổng Quan Thị Trường

### Bối Cảnh
Shopify **không cho phép** khách hàng tự chỉnh sửa đơn hàng sau thanh toán. Mọi thay đổi — dù chỉ là lỗi đánh máy địa chỉ — đều phải qua đội hỗ trợ. Đây là vấn đề ảnh hưởng đến **hàng triệu cửa hàng** và tạo ra gánh nặng vận hành khổng lồ.

### Số Liệu Thị Trường
- **30%** người mua mắc lỗi khi thanh toán
- **60%** ticket hỗ trợ liên quan đến chỉnh sửa đơn hàng
- Mỗi yêu cầu chỉnh sửa tốn **$8-$15** và 5-15 phút xử lý thủ công
- **69%** khách hàng muốn tự giải quyết vấn đề
- **100+ ứng dụng** trong danh mục Order Editing trên Shopify App Store (tháng 3/2026)

### TAM / SAM / SOM
| Chỉ số | Giá trị |
|--------|---------|
| TAM | ~5,5 triệu cửa hàng Shopify đang hoạt động |
| SAM | ~1,32 triệu cửa hàng (sản phẩm vật lý, >10 đơn/tháng) |
| SOM Năm 1 | 2.000-5.000 cài đặt, 500-1.000 trả phí → $132K-$480K ARR |
| SOM Năm 3 | 30.000-50.000 cài đặt → ~$2.5M ARR |

---

## 2. Phân Tích Đối Thủ (Top 6)

### Bảng So Sánh Chính

| Ứng dụng | Giá khởi điểm | Gói miễn phí | Đánh giá | Điểm mạnh | Điểm yếu |
|----------|---------------|-------------|----------|------------|-----------|
| **OrderEditing.com** | $99/tháng | Không | 4.8★ (200+) | Full feature, 100+ tích hợp 3PL | Quá đắt cho SMB |
| **AE: Order Editing** | $39/tháng | Không | 4.9★ (300+) | Built for Shopify, 8 ngôn ngữ | $39 vẫn quá cao cho SMB nhỏ |
| **Cleverific** | $49/tháng | Dev only | 4.2★ (100+) | Shopify Flow, Draft orders | Lỗi tính thuế, tính phí trùng, hỗ trợ bị bỏ rơi |
| **Revize** | $49/tháng | 20 edits | 4.7★ (50+) | AI upsell ở gói Pro | Upsell bị khóa sau $149/tháng |
| **Orderify** | $4.99/tháng | Không | 4.5★ (100+) | Giá rẻ nhất | Tính năng hạn chế, hỗ trợ kém |
| **Recheck** | Miễn phí | 20 edits | 4.6★ (30+) | Giá hợp lý | Chỉ 50 edits ở gói $19 |

### Phân Tích Chi Tiết User Flow Đối Thủ

**OrderEditing.com** (leader):
- Widget trang trạng thái đơn hàng → khách click "Edit Order" → chọn loại chỉnh sửa → xác nhận → auto process
- Hỗ trợ: địa chỉ, sản phẩm, số lượng, hủy, thêm/xóa item, upsell
- Flow: Order Status Page → Edit Portal → Confirm → Auto Refund/Charge

**AE: Order Editing** (Built for Shopify):
- Tích hợp sâu với Shopify Admin → merchant chỉnh sửa trực tiếp
- Customer portal trên order status page + thank you page
- Flow trigger cho mọi edit event

### Khoảng Trống Giá Rõ Ràng

```
Giá       $5    $10    $20    $30    $50    $100   $200   $600
           |      |      |      |      |      |      |      |
Orderify   [==]   |      |      |      |      |      |      |
(cơ bản)   |      |      |      |      |      |      |      |
           |      |      |      |      |      |      |      |
    ← KHOẢNG TRỐNG: Không có app chất lượng ở $10-$30 →
           |      |      |      |      |      |      |      |
AVADA      |   [==========]    |      |      |      |      |  ← MỤC TIÊU
           |      |      |      |      |      |      |      |
Revize/AE  |      |      |      [============]  |      |      |
OrderEditing|     |      |      |      |      [==============]
```

---

## 3. Đối Tượng Mục Tiêu

### Phân Khúc Chính: SMB (Segment B)
| Thuộc tính | Chi tiết |
|-----------|---------|
| Gói Shopify | Basic ($39) / Shopify ($105) |
| Đơn hàng/tháng | 50-2.000 |
| Doanh thu/tháng | $5K-$200K |
| Đội ngũ | 1-5 người |
| Ngân sách app | $10-$50/tháng |
| Quy mô | ~800K-1.2 triệu cửa hàng |

### Persona Chính: Sarah — Chủ cửa hàng SMB
- Cửa hàng thời trang, 150-400 đơn/tháng
- Dành 1 giờ/ngày xử lý email thay đổi địa chỉ/đổi size
- Không đủ ngân sách $99/tháng nhưng cần automation
- Trigger mua: gói miễn phí hào phóng + giá dưới $20/tháng

### Persona Phụ: Mike — Quản lý vận hành thị trường tầm trung
- 4.000-8.000 đơn/tháng, đội CSKH 3 người
- Cần Shopify Flow, analytics, upsell
- Ngân sách: $50-$150/tháng

---

## 4. Shopify API & Technical Feasibility

### API Chỉnh Sửa Đơn Hàng
Shopify cung cấp **Order Editing API** (GraphQL Admin API) hoàn thiện từ 2024-07:

**Mutations chính:**
- `orderEditBegin` — Bắt đầu phiên chỉnh sửa
- `orderEditAddVariant` — Thêm biến thể mới
- `orderEditSetQuantity` — Thay đổi số lượng
- `orderEditRemoveLineItemDiscount` — Xóa giảm giá
- `orderEditCommit` — Áp dụng thay đổi

**Mutations địa chỉ:**
- `orderUpdate` (REST) — Cập nhật shipping address trực tiếp
- Không cần Order Editing API cho thay đổi địa chỉ

**Order cancellation:**
- `orderCancel` (GraphQL) — Hủy + refund + restock trong 1 mutation

**Webhooks liên quan:**
- `orders/edited` — Khi đơn hàng được chỉnh sửa
- `orders/cancelled` — Khi đơn hàng bị hủy
- `orders/updated` — Cập nhật chung
- `app/uninstalled` — Cleanup

### Hạn Chế API
1. **Giới hạn 60 ngày** — Không thể chỉnh sửa đơn hàng > 60 ngày
2. **Đơn giao hàng nội địa** — API chặn chỉnh sửa loại đơn này
3. **Đơn đã fulfilled** — Không thể chỉnh sửa items đã giao
4. **Multi-currency** — Hạn chế khi tiền tệ đơn hàng ≠ tiền tệ cửa hàng
5. **Rate limits** — 2 requests/second (REST), cost-based (GraphQL)

### Storefront Extension Points
- **Order Status Page** — `Shopify::Checkout::OrderStatusPage` (Theme App Extension block)
- **Thank You Page** — `Shopify::Checkout::ThankYouPage` block
- **Customer Account** — App Proxy hoặc Customer Account Extension

### Đánh Giá Khả Thi

| Tính năng MVP | Khả thi | API | Độ phức tạp |
|--------------|---------|-----|-------------|
| Chỉnh sửa địa chỉ | ✅ Cao | REST orderUpdate | Trung bình |
| Đổi biến thể | ✅ Cao | GraphQL Order Editing | Trung bình |
| Thay đổi số lượng | ✅ Cao | GraphQL Order Editing | Thấp |
| Hủy đơn | ✅ Cao | GraphQL orderCancel | Trung bình |
| Auto refund/charge | ✅ Cao | Shopify handles via Order Editing | Trung bình-Cao |
| Widget Order Status | ✅ Cao | Theme App Extension | Trung bình |
| Widget Thank You | ✅ Cao | Theme App Extension | Trung bình |
| Settings admin | ✅ Cao | Firestore + Polaris | Thấp |
| Email notifications | ✅ Cao | SendGrid/Mailgun | Thấp |
| Dashboard analytics | ✅ Cao | Firestore aggregation | Trung bình |

**Kết luận:** Tất cả tính năng MVP đều **khả thi** với API hiện tại. Không có blockers kỹ thuật.

---

## 5. Scope Definition

### Must-have (P0 — MVP Launch)

**Customer-facing (Storefront):**
1. **Chỉnh sửa địa chỉ giao hàng** — Form chỉnh sửa với autocomplete
2. **Đổi biến thể sản phẩm** — Swap size/color/etc trong cùng sản phẩm
3. **Thay đổi số lượng** — Tăng/giảm quantity
4. **Hủy đơn hàng** — Cancel với auto refund + restock
5. **Xem tóm tắt chỉnh sửa** — Hiển thị price diff trước khi confirm
6. **Widget Order Status Page** — Nút "Edit Order" trên trang trạng thái đơn hàng
7. **Widget Thank You Page** — Nút "Edit Order" trên trang cảm ơn

**Merchant-facing (Admin):**
8. **Chỉnh sửa đơn hàng từ admin** — Merchant edit giống customer nhưng từ Shopify Admin
9. **Cấu hình khung thời gian** — 30 phút → "until fulfillment"
10. **Bật/tắt loại chỉnh sửa** — Toggle cho từng loại (address, swap, quantity, cancel)
11. **Auto refund/charge** — Xử lý chênh lệch giá tự động
12. **Auto restock inventory** — Hoàn kho khi cancel/giảm quantity
13. **Email notifications** — Thông báo cho merchant + customer
14. **Dashboard hoạt động** — Thống kê edits, cancellations, savings

### Nice-to-have (P1 — Tháng 2-3)
- Xác thực địa chỉ Google
- Upsell recommendations trong edit flow
- Store credit option
- Shopify Flow integration
- Analytics dashboard với charts
- Retention offers khi cancel
- Multi-language support
- Custom edit rules per product/collection

### Out-of-scope (P2+)
- Chỉnh sửa đơn giao hàng nội địa
- AI-powered edit suggestions
- Subscription order edits
- Batch order edits
- B2B/wholesale order edits
- POS integration

---

## 6. Mô Hình Kinh Doanh

### Pricing Strategy

| Gói | Giá/tháng | Edits/tháng | Tính năng chính |
|-----|-----------|-------------|-----------------|
| **Free** | $0 | 50 | Self-service edits, basic analytics |
| **Starter** | $9.99 | 200 | + Address validation, full analytics |
| **Growth** | $19.99 | 500 | + Upsell, store credit, branding |
| **Pro** | $29.99 | 1.000 | + Shopify Flow, priority support |

**Nguyên tắc:** Không phí ẩn, không phụ trội, giảm giá 20% thanh toán năm, dùng thử 14 ngày.

### Dự Báo Năm 1
- Q1: 500 installs → 40 trả phí → $880 MRR
- Q2: 1.500 installs → 140 trả phí → $3.080 MRR
- Q3: 3.000 installs → 300 trả phí → $6.600 MRR
- Q4: 5.000 installs → 500 trả phí → $11.000 MRR → **$132K ARR**

---

## 7. Rủi Ro & Giảm Thiểu

| Rủi ro | Xác suất | Tác động | Giảm thiểu |
|--------|----------|----------|------------|
| Shopify xây tính năng edit gốc | 30% | Cao | Focus vào features Shopify sẽ không build (upsell, retention, analytics) |
| Đối thủ giảm giá | 40% | TB | Khác biệt bằng feature + brand Avada |
| Lỗi duplicate/charge | 20% | Cao | Atomic transactions, idempotency keys, thorough testing |
| Conversion free→paid thấp | 35% | TB | Optimize free tier limits, in-app upgrade prompts |
| Rate limit API | 20% | TB | Queue-based architecture, efficient API usage |

---

## 8. Edge Cases

### Chỉnh sửa đơn hàng
- Đơn hàng đã fulfilled 1 phần → chỉ edit items chưa fulfilled
- Đơn hàng > 60 ngày → hiển thị "Contact support"
- Đơn hàng với discount code → recalculate discount sau edit
- Đơn hàng local delivery → block edit, hiển thị message
- Nhiều lần edit cùng lúc → locking mechanism
- Edit timeout (session expire) → auto-rollback

### Hủy đơn hàng
- Đơn đã fulfilled → không cho cancel
- Partial fulfillment → chỉ cancel unfulfilled items
- Payment pending → queue cancel, retry

### Pricing/Refund
- Edit tăng giá → charge thêm qua Shopify Payment
- Edit giảm giá → auto refund
- Cancel → full refund + restock
- Free shipping threshold → recalculate khi quantity thay đổi
- Tax recalculation → dùng Shopify's built-in tax engine

---

## 9. Kết Luận & Khuyến Nghị

### GO/NO-GO: ✅ TIẾN HÀNH MẠNH MẼ

**Điểm tin cậy: 85%**

**Lý do chính:**
1. **Khoảng trống giá rõ ràng** — Không có app chất lượng ở $10-$30/tháng
2. **Nhu cầu thị trường cao** — 60% support tickets là order edits
3. **API hoàn thiện** — Shopify Order Editing API stable từ 2024
4. **Lợi thế Avada** — Brand recognition, cross-sell từ app ecosystem
5. **Đối thủ yếu ở SMB** — Quá đắt hoặc quá cơ bản

**Hành động tiếp theo:** Viết PRD MVP chi tiết với acceptance criteria cho từng feature P0.

---

**Nguồn tham khảo:**
- Shopify App Store — Danh mục Order Editing (100+ apps)
- Shopify Community — Pain points từ merchants
- Shopify Dev Docs — Order Editing API
- Review analysis: OrderEditing.com, AE, Cleverific, Revize, Orderify, Recheck
- Research docs: `research/01-07` (market analysis, competitor, pricing)
- Architecture docs: `research/12-architecture.md`
