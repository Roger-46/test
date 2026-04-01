# Avada Order Editing — PRD MVP

**Link task Jira:** [Cập nhật sau]

### Task List

| Ticket | Link | Status |
|--------|------|--------|
| SB-XXXX | [Link] | In Progress |

### History

| Phiên bản | Ngày | Tác giả | Loại | Mô tả |
|-----------|------|---------|------|-------|
| 1.0 | 01/04/2026 | Roger | A | Tạo mới PRD MVP |

> A = Added, M = Modified, D = Deleted

---

## Mục Lục

1. [Executive Summary](#1-executive-summary)
2. [Personas & User Stories](#2-personas--user-stories)
3. [Product Solutions](#3-product-solutions)
4. [Design Description](#4-design-description)
5. [Acceptance Criteria](#5-acceptance-criteria)

---

## 1. Executive Summary

- **Vấn đề**: Shopify không cho phép khách hàng tự chỉnh sửa đơn hàng — mọi thay đổi phải qua đội hỗ trợ, gây tốn $8-$15/ticket và 60% tổng ticket hỗ trợ.
- **Giải pháp**: App cho phép khách hàng tự sửa địa chỉ, đổi biến thể, thay đổi số lượng, hủy đơn — và merchant quản lý toàn bộ từ Shopify Admin.
- **Đối tượng**: Merchant SMB trên Shopify (50-2.000 đơn/tháng), ngân sách $10-$50/tháng.
- **Business value**: Giảm 60% ticket hỗ trợ, tăng customer satisfaction, tạo doanh thu từ upsell (P1). Mục tiêu $132K ARR năm 1.
- **Scope MVP**: 14 tính năng P0 — customer self-service + merchant admin + notifications + dashboard.

---

## 2. Personas & User Stories

### Personas

| Persona | Profile | Nhu cầu chính |
|---------|---------|---------------|
| **Sarah** (SMB) | Chủ cửa hàng thời trang, 150-400 đơn/tháng, 1 người, Shopify Basic | Self-service editing để giảm email hỗ trợ, giá < $20/tháng |
| **Mike** (Mid-market) | Quản lý vận hành, 4.000-8.000 đơn/tháng, đội 15 người, Shopify Advanced | Automation, analytics, Shopify Flow (P1) |
| **Alex** (New merchant) | Cửa hàng mới, 10-50 đơn/tháng, 1 mình | Gói miễn phí, cài đặt nhanh |
| **Customer** | Khách mua hàng trên cửa hàng Shopify | Tự sửa lỗi địa chỉ, đổi size/color mà không cần email support |

### User Stories (MVP — P0)

#### Customer Self-Service

| ID | User Story | Priority |
|----|-----------|----------|
| US-01 | Là **khách hàng**, tôi muốn **chỉnh sửa địa chỉ giao hàng** sau khi đặt hàng, để gói hàng đến đúng nơi. | P0 |
| US-02 | Là **khách hàng**, tôi muốn **đổi biến thể sản phẩm** (size, color) trên đơn hàng, để nhận đúng sản phẩm mà không cần liên hệ hỗ trợ. | P0 |
| US-03 | Là **khách hàng**, tôi muốn **thay đổi số lượng** sản phẩm, để tăng/giảm trước khi giao hàng. | P0 |
| US-04 | Là **khách hàng**, tôi muốn **hủy đơn hàng** trong khung thời gian cho phép, để được hoàn tiền mà không cần chờ hỗ trợ. | P0 |
| US-05 | Là **khách hàng**, tôi muốn **xem tóm tắt thay đổi và chênh lệch giá** trước khi xác nhận, để không bị bất ngờ. | P0 |
| US-06 | Là **khách hàng**, tôi muốn **truy cập chỉnh sửa từ Order Status Page**, để dễ dàng sửa lỗi sau thanh toán. | P0 |
| US-07 | Là **khách hàng**, tôi muốn **truy cập chỉnh sửa từ Thank You Page**, để sửa lỗi ngay sau khi đặt hàng. | P0 |

#### Merchant Admin

| ID | User Story | Priority |
|----|-----------|----------|
| US-08 | Là **merchant**, tôi muốn **cấu hình loại chỉnh sửa cho phép** (address, swap, quantity, cancel), để kiểm soát quyền khách hàng. | P0 |
| US-09 | Là **merchant**, tôi muốn **đặt khung thời gian chỉnh sửa** (30 phút → until fulfillment), để edit không ảnh hưởng fulfillment. | P0 |
| US-10 | Là **merchant**, tôi muốn **auto refund/charge khi giá thay đổi**, để không phải xử lý payment thủ công. | P0 |
| US-11 | Là **merchant**, tôi muốn **auto restock inventory** khi cancel/giảm quantity, để tồn kho chính xác. | P0 |
| US-12 | Là **merchant**, tôi muốn **nhận email notification** khi có edit/cancel, để luôn cập nhật. | P0 |
| US-13 | Là **merchant**, tôi muốn **tự edit đơn hàng từ admin**, để xử lý nhanh yêu cầu qua phone/email. | P0 |
| US-14 | Là **merchant**, tôi muốn **xem dashboard hoạt động edit**, để thấy app hoạt động ra sao. | P0 |

---

## 3. Product Solutions

### 3.1. Solution Overview

Avada Order Editing cung cấp giải pháp self-service cho khách hàng chỉnh sửa đơn hàng sau thanh toán, kết hợp admin panel cho merchant quản lý và cấu hình.

**Kiến trúc 3 lớp:**
- **Storefront Layer**: Theme App Extension widgets (Order Status Page + Thank You Page) → mở Edit Portal cho khách hàng
- **Admin Layer**: Embedded Shopify Admin app (Polaris) → merchant settings, order management, dashboard
- **Backend Layer**: Firebase Functions → xử lý edit logic, Shopify API calls, notifications

### 3.2. Scope

**Trong scope (MVP):**
- Customer self-service: edit address, swap variant, change quantity, cancel order
- Order Status Page widget + Thank You Page widget
- Edit confirmation với price diff summary
- Merchant admin: settings, edit time window, toggle edit types
- Merchant order editing từ admin
- Auto refund/charge via Shopify Payment
- Auto restock inventory
- Email notifications (merchant + customer)
- Dashboard với basic metrics
- Mobile-responsive customer UI

**Ngoài scope:**
- Google address validation — P1 (cần API key riêng)
- Upsell/cross-sell — P1 (feature riêng, revenue tracking)
- Store credit option — P1
- Shopify Flow integration — P1
- Retention offers khi cancel — P1
- Multi-language — P1
- Custom edit rules per product/collection — P1
- B2B, subscription, bulk edits — P2
- Local delivery edits — P2
- AI suggestions — P2

### 3.3. UI Flow

#### Flow A: Customer Self-Service Edit

```
Khách hàng vào Order Status Page / Thank You Page
    ↓
[Widget "Edit Your Order"] — nút nổi bật, branded
    ↓ click
[Edit Portal Page] — hiển thị order summary + edit options
    ↓
Chọn loại edit:
├── [Edit Address] → Form địa chỉ mới → Preview → Confirm
├── [Swap Product] → Chọn variant mới → Price diff → Confirm
├── [Change Quantity] → +/- quantity → Price diff → Confirm
└── [Cancel Order] → Confirm dialog → Cancel + Refund
    ↓
[Confirmation Page] — "Your order has been updated!"
    ↓
Email notification → merchant + customer
```

**Màn hình 1: Order Status Page — Widget**

Khách hàng đang ở trang trạng thái đơn hàng, thấy widget "Edit Your Order" nổi bật.

```
┌─────────────────────────────────────┐
│  Order #1234                        │
│  Status: Unfulfilled                │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  ✏️ Need to make changes?     │  │
│  │                               │  │
│  │  You can edit your order      │  │
│  │  within [2 hours]             │  │
│  │                               │  │
│  │  [Edit Your Order]  ← button  │  │
│  └───────────────────────────────┘  │
│                                     │
│  Items:                             │
│  - T-Shirt (M, Black) x1  $29.99   │
│  - Jeans (32, Blue) x1    $49.99   │
│                                     │
│  Total: $79.98                      │
└─────────────────────────────────────┘
```

| Hành động | Kết quả |
|-----------|---------|
| Click "Edit Your Order" | Mở Edit Portal Page (new page hoặc modal) |
| Nếu hết time window | Widget ẩn đi hoặc hiện "Edit window has expired" |
| Nếu order đã fulfilled | Widget ẩn đi |

**Màn hình 2: Edit Portal — Chọn loại chỉnh sửa**

Khách hàng thấy order details + các nút edit cho từng phần.

```
┌──────────────────────────────────────┐
│  Edit Order #1234                    │
│  ⏱ Time remaining: 1h 45m           │
│                                      │
│  ┌──────────────────────────────┐    │
│  │ 📍 Shipping Address          │    │
│  │ John Doe                      │    │
│  │ 123 Main St, NYC 10001       │    │
│  │                    [Change]   │    │
│  └──────────────────────────────┘    │
│                                      │
│  ┌──────────────────────────────┐    │
│  │ 🛍 Items                      │    │
│  │                               │    │
│  │ T-Shirt (M, Black)    $29.99 │    │
│  │ Qty: [1] [-][+]    [Swap]    │    │
│  │                               │    │
│  │ Jeans (32, Blue)      $49.99 │    │
│  │ Qty: [1] [-][+]    [Swap]    │    │
│  └──────────────────────────────┘    │
│                                      │
│  Subtotal: $79.98                    │
│  Shipping: $5.00                     │
│  Tax: $7.00                          │
│  Total: $91.98                       │
│                                      │
│  [Cancel This Order]  ← destructive │
└──────────────────────────────────────┘
```

| Hành động | Kết quả |
|-----------|---------|
| Click "Change" (Address) | Mở form chỉnh sửa địa chỉ inline |
| Click "Swap" (Product) | Mở variant picker cho sản phẩm đó |
| Click [-] / [+] (Quantity) | Tăng/giảm quantity, cập nhật giá real-time |
| Click "Cancel This Order" | Mở confirmation dialog |

**Màn hình 3: Swap Variant**

Khách chọn biến thể mới cho sản phẩm.

```
┌──────────────────────────────────────┐
│  Swap: T-Shirt                       │
│                                      │
│  Current: M, Black — $29.99          │
│                                      │
│  Size:    [S] [M●] [L] [XL]         │
│  Color:   [Black●] [White] [Red]     │
│                                      │
│  New selection: L, Red — $29.99      │
│  Price difference: $0.00             │
│                                      │
│  [Cancel]        [Apply Change]      │
└──────────────────────────────────────┘
```

| Hành động | Kết quả |
|-----------|---------|
| Chọn variant mới | Preview hiện giá mới + diff |
| Variant hết hàng | Disable option, hiện "Out of stock" |
| Click "Apply Change" | Quay về Edit Portal, hiện variant mới + updated price |
| Click "Cancel" | Quay về Edit Portal, không thay đổi |

**Màn hình 4: Edit Confirmation (trước khi submit)**

Tóm tắt tất cả thay đổi trước khi confirm.

```
┌──────────────────────────────────────┐
│  Review Your Changes                 │
│                                      │
│  Changes:                            │
│  ✏️ Address: 123 Main St → 456 Oak   │
│  🔄 T-Shirt: M Black → L Red        │
│  📦 Jeans: Qty 1 → 2 (+$49.99)      │
│                                      │
│  ┌──────────────────────────────┐    │
│  │ Price Summary                 │    │
│  │ Original total:    $91.98     │    │
│  │ New total:         $141.97    │    │
│  │ Additional charge: +$49.99   │    │
│  └──────────────────────────────┘    │
│                                      │
│  ⚠️ You will be charged $49.99       │
│  to the original payment method.     │
│                                      │
│  [Go Back]      [Confirm Changes]    │
└──────────────────────────────────────┘
```

| Hành động | Kết quả |
|-----------|---------|
| Click "Confirm Changes" | Submit edit → Shopify API → Success page |
| Click "Go Back" | Quay về Edit Portal |
| Nếu giảm giá | Hiện "You will be refunded $X.XX" |
| Nếu giá không đổi | Hiện "No additional charges" |

**Màn hình 5: Success Page**

```
┌──────────────────────────────────────┐
│  ✅ Order Updated Successfully!       │
│                                      │
│  Order #1234 has been updated.       │
│  A confirmation email has been sent  │
│  to john@example.com.               │
│                                      │
│  [View Updated Order]                │
└──────────────────────────────────────┘
```

**Màn hình 6: Cancel Confirmation Dialog**

```
┌──────────────────────────────────────┐
│  Cancel Order #1234?                 │
│                                      │
│  This action cannot be undone.       │
│                                      │
│  You will receive a full refund of   │
│  $91.98 to your original payment     │
│  method within 5-10 business days.   │
│                                      │
│  Reason for cancellation (optional): │
│  [________________________]          │
│                                      │
│  [Keep Order]    [Cancel Order]      │
└──────────────────────────────────────┘
```

#### Flow B: Merchant Admin

```
Merchant mở app trong Shopify Admin
    ↓
[Dashboard] — overview metrics
    ↓
├── [Orders] — list đơn hàng có thể edit → click → edit flow giống customer
├── [Settings] — cấu hình time window, edit types, notifications
└── [Analytics] — basic stats (P0: numbers only, P1: charts)
```

**Màn hình 7: Admin Dashboard**

```
┌─────────────────────────────────────────┐
│  Avada Order Editing                     │
│  ─────────────────────────────────────── │
│  Dashboard   Orders   Settings           │
│                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Today   │ │ This    │ │ Support │   │
│  │ Edits   │ │ Month   │ │ Tickets │   │
│  │   12    │ │   247   │ │ Saved   │   │
│  │ +3 ↑   │ │ +18% ↑ │ │  ~148   │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Cancel- │ │ Edits   │ │ Revenue │   │
│  │ lations │ │ Remain- │ │ Impact  │   │
│  │    5    │ │ ing     │ │ -$245   │   │
│  │         │ │  38/50  │ │         │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                          │
│  Recent Activity                         │
│  ───────────────────────────────────     │
│  #1234 — Address changed — 2m ago       │
│  #1230 — Variant swapped — 15m ago      │
│  #1228 — Cancelled — 1h ago             │
│  #1225 — Quantity changed — 2h ago      │
└─────────────────────────────────────────┘
```

**Màn hình 8: Admin Settings**

```
┌─────────────────────────────────────────┐
│  Settings                                │
│  ─────────────────────────────────────── │
│                                          │
│  Edit Time Window                        │
│  ┌──────────────────────────────────┐   │
│  │ Allow edits for: [2 hours ▼]     │   │
│  │ Options: 30min | 1h | 2h | 4h   │   │
│  │          | 12h | 24h | Until     │   │
│  │          fulfillment             │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Allowed Edit Types                      │
│  ┌──────────────────────────────────┐   │
│  │ ☑ Edit shipping address          │   │
│  │ ☑ Swap product variants          │   │
│  │ ☑ Change quantity                │   │
│  │ ☑ Cancel order                   │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Notifications                           │
│  ┌──────────────────────────────────┐   │
│  │ ☑ Email merchant on edit         │   │
│  │ ☑ Email merchant on cancel       │   │
│  │ ☑ Email customer on changes      │   │
│  │ Notification email:              │   │
│  │ [owner@store.com          ]      │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Widget Display                          │
│  ┌──────────────────────────────────┐   │
│  │ ☑ Show on Order Status Page      │   │
│  │ ☑ Show on Thank You Page         │   │
│  │ Primary color: [#000000]         │   │
│  └──────────────────────────────────┘   │
│                                          │
│  [Discard]                     [Save]   │
└─────────────────────────────────────────┘
```

### 3.4. Interaction with Shopify

**Order Editing API (GraphQL):**
- `orderEditBegin` → bắt đầu edit session
- `orderEditAddVariant` / `orderEditSetQuantity` → thay đổi items
- `orderEditCommit` → áp dụng changes (Shopify auto handles refund/charge)

**Order Update (REST):**
- `PUT /admin/api/2024-07/orders/{id}.json` → update shipping address

**Order Cancel (GraphQL):**
- `orderCancel` mutation → cancel + refund + restock

**Webhooks nhận:**
- `orders/edited` → log edit event, update dashboard
- `orders/cancelled` → log cancel event
- `orders/updated` → sync order status
- `app/uninstalled` → cleanup shop data

**Extension Points:**
- Theme App Extension → Order Status Page block + Thank You Page block
- Embedded App → Polaris admin UI

### 3.5. Error Messages

| Error | Khi nào xảy ra | Message hiển thị | Action |
|-------|----------------|-----------------|--------|
| Edit window expired | Khách click edit sau khi hết time window | "The edit window for this order has expired. Please contact the store for assistance." | Ẩn edit options, hiện contact info |
| Order already fulfilled | Đơn đã được fulfill | "This order has already been shipped and can no longer be edited." | Ẩn edit widget |
| Variant out of stock | Variant được chọn hết hàng | "Sorry, [Variant Name] is currently out of stock. Please choose another option." | Disable variant option |
| Payment failed | Charge thêm tiền thất bại | "We couldn't process the additional charge. Please try again or contact the store." | Rollback edit, cho phép retry |
| Max edits reached | Đạt giới hạn edit/đơn hàng | "You've reached the maximum number of edits for this order." | Ẩn edit options |
| Concurrent edit | 2 người edit cùng lúc | "This order is currently being edited. Please try again in a few moments." | Retry sau 30s |
| API rate limit | Quá nhiều requests | "We're experiencing high traffic. Please try again in a moment." | Auto retry với backoff |
| Plan limit reached | Merchant hết quota edits | Widget vẫn hiện nhưng edit fail → merchant nhận email nâng cấp | Notify merchant to upgrade |

### 3.6. Success Messages

| Event | Khi nào | Message |
|-------|---------|---------|
| Address updated | Sau khi confirm address change | "Shipping address updated successfully! A confirmation email has been sent." |
| Variant swapped | Sau khi confirm variant swap | "Product updated successfully! [Refund/Charge message if applicable]" |
| Quantity changed | Sau khi confirm quantity change | "Quantity updated! [Refund/Charge message if applicable]" |
| Order cancelled | Sau khi confirm cancel | "Order cancelled. A refund of $X.XX will be processed within 5-10 business days." |
| Settings saved | Merchant save settings | "Settings saved successfully." |

---

## 4. Design Description

### 4.1. Storefront — Edit Widget (Order Status Page / Thank You Page)

> Widget hiện khi: order chưa fulfilled VÀ trong time window VÀ merchant đã enable widget

| Item | Data Type | Required | Default | Mô tả | Validate Rule |
|------|-----------|----------|---------|-------|---------------|
| Widget container | Card | Y | — | Bordered card with icon | — |
| Title text | Text | Y | "Need to make changes?" | Customizable via settings | Max 100 chars |
| Description | Text | Y | "You can edit your order within [time]" | Dynamic time remaining | — |
| Edit button | Button | Y | "Edit Your Order" | Primary action | — |
| Time remaining | Badge/Text | Y | — | Countdown timer | Ẩn khi hết giờ |
| Expired state | Text | N | "Edit window has expired" | Hiện khi hết time window | — |

### 4.2. Storefront — Edit Portal Page

> Page mở khi: customer click "Edit Your Order" từ widget

| Item | Data Type | Required | Default | Mô tả | Validate Rule |
|------|-----------|----------|---------|-------|---------------|
| Order number | Text | Y | — | Order #XXXX | — |
| Time remaining | Badge | Y | — | Countdown, auto-update | Redirect khi hết giờ |
| Address section | Card | Y | — | Current address + Change button | Chỉ hiện nếu allowAddressEdit = true |
| Address form | Form | N | — | Name, Address 1/2, City, State, Zip, Country, Phone | Required fields theo country |
| Items list | List | Y | — | Product image + name + variant + price | — |
| Quantity controls | Stepper | N | Current qty | [-] [qty] [+] | Min: 1, Max: available stock |
| Swap button | Button | N | — | "Swap" per line item | Chỉ hiện nếu allowItemSwap = true |
| Variant picker | Selection | N | — | Size/Color grid | Out of stock = disabled |
| Price summary | Card | Y | — | Original / New / Diff | Auto calculate |
| Cancel button | Button | N | — | "Cancel This Order" | Destructive style, chỉ hiện nếu allowCancellation = true |
| Confirm button | Button | Y | — | "Confirm Changes" | Disabled nếu no changes |

### 4.3. Storefront — Confirmation Page

> Page hiện khi: customer submit changes thành công

| Item | Data Type | Required | Default | Mô tả | Validate Rule |
|------|-----------|----------|---------|-------|---------------|
| Success icon | Icon | Y | ✅ | Checkmark | — |
| Title | Text | Y | "Order Updated Successfully!" | — | — |
| Changes summary | List | Y | — | Liệt kê từng thay đổi | — |
| Refund/Charge note | Text | N | — | "You will be refunded $X.XX" | Chỉ hiện nếu có price diff |
| Email note | Text | Y | — | "Confirmation email sent to..." | — |
| View order link | Link | Y | — | Quay về Order Status Page | — |

### 4.4. Admin — Dashboard Page

> Trang mặc định khi merchant mở app

| Item | Data Type | Required | Default | Mô tả | Validate Rule |
|------|-----------|----------|---------|-------|---------------|
| Today's edits | Metric card | Y | 0 | Số edits hôm nay | — |
| This month edits | Metric card | Y | 0 | Số edits tháng này + % change | — |
| Support tickets saved | Metric card | Y | 0 | Estimated = edits * 0.6 | — |
| Cancellations | Metric card | Y | 0 | Số cancellations tháng này | — |
| Edits remaining | Metric card | Y | plan limit | Remaining / Total | Chỉ hiện cho gói có limit |
| Revenue impact | Metric card | Y | $0 | Tổng refund - charge | — |
| Recent activity | List | Y | — | 10 recent edits/cancels | Sortable by time |
| Activity row | Row | Y | — | Order # + type + time ago | Link to order |

### 4.5. Admin — Settings Page

> Merchant cấu hình behavior

| Item | Data Type | Required | Default | Mô tả | Validate Rule |
|------|-----------|----------|---------|-------|---------------|
| Time window | Selection | Y | 2 hours | Dropdown: 30m/1h/2h/4h/12h/24h/Until fulfillment | — |
| Allow address edit | Checkbox | Y | true | Toggle | — |
| Allow variant swap | Checkbox | Y | true | Toggle | — |
| Allow quantity change | Checkbox | Y | true | Toggle | — |
| Allow cancellation | Checkbox | Y | true | Toggle | — |
| Max edits per order | Number | Y | 5 | Input | Min: 1, Max: 20 |
| Notify merchant on edit | Checkbox | Y | true | Toggle | — |
| Notify merchant on cancel | Checkbox | Y | true | Toggle | — |
| Notify customer on merchant edit | Checkbox | Y | true | Toggle | — |
| Notification email | Email | N | Shop owner email | Override email | Valid email format |
| Show on Order Status Page | Checkbox | Y | true | Toggle | — |
| Show on Thank You Page | Checkbox | Y | true | Toggle | — |
| Widget primary color | Color picker | N | #000000 | Hex color | Valid hex |

### 4.6. Admin — Orders Page

> Merchant xem và edit đơn hàng

| Item | Data Type | Required | Default | Mô tả | Validate Rule |
|------|-----------|----------|---------|-------|---------------|
| Search | TextField | N | — | Search by order # or customer name | — |
| Status filter | Selection | N | All | All / Editable / Edited / Cancelled / Expired | — |
| Orders table | IndexTable | Y | — | Sortable, paginated | 20 per page |
| Order number | Text | Y | — | #XXXX, link to edit | — |
| Customer | Text | Y | — | Customer name | — |
| Date | Text | Y | — | Order date | — |
| Status | Badge | Y | — | Editable (green) / Edited (blue) / Cancelled (red) / Expired (gray) | — |
| Edit window | Text | Y | — | Time remaining or "Expired" | — |
| Edit count | Text | Y | — | X/Y edits used | — |
| Actions | Button | N | — | "Edit" button | Chỉ hiện nếu editable |

---

## 5. Acceptance Criteria

### Functional Requirements

#### Customer Self-Service
☐ Khách hàng có thể truy cập edit portal từ Order Status Page qua widget
☐ Khách hàng có thể truy cập edit portal từ Thank You Page qua widget
☐ Widget hiển thị countdown timer cho thời gian còn lại
☐ Widget tự ẩn khi hết time window hoặc order đã fulfilled
☐ Khách hàng có thể chỉnh sửa shipping address (name, address 1/2, city, state, zip, country, phone)
☐ Khách hàng có thể swap variant (size, color, etc.) trong cùng product
☐ Variant hết hàng hiển thị "Out of stock" và bị disabled
☐ Khách hàng có thể tăng/giảm quantity (min: 1, max: available stock)
☐ Khách hàng có thể cancel order với lý do (optional)
☐ Tất cả thay đổi hiển thị preview với price diff TRƯỚC khi confirm
☐ Sau confirm, hiển thị success page + gửi confirmation email
☐ Nếu edit tăng giá → charge thêm vào payment method gốc
☐ Nếu edit giảm giá → auto refund về payment method gốc
☐ Cancel order → full refund + auto restock all items
☐ UI responsive trên mobile (>= 320px width)

#### Merchant Admin
☐ Dashboard hiển thị: today's edits, month total, cancellations, support tickets saved, edits remaining
☐ Recent activity list hiển thị 10 events gần nhất
☐ Settings page cho phép cấu hình: time window, edit types, notifications, widget display
☐ Settings persist trong Firestore, scoped by shopId
☐ Orders page hiển thị danh sách orders với status filter + search
☐ Merchant có thể edit order từ admin (same flow như customer nhưng không có time window restriction)
☐ Save settings hiển thị success toast
☐ App load trong < 3 giây

#### Backend & API
☐ Tất cả API endpoints validate shopId (IDOR prevention)
☐ Order edit sử dụng Shopify GraphQL Order Editing API (orderEditBegin → changes → orderEditCommit)
☐ Address update sử dụng Shopify REST API (PUT orders/{id})
☐ Order cancel sử dụng Shopify GraphQL orderCancel mutation
☐ Webhook handlers respond < 5 giây
☐ Idempotency keys cho mọi payment operations
☐ Edit session locking — chặn concurrent edits trên cùng order
☐ Rate limiting: max 10 edits/phút per shop
☐ Response format: `{ success: boolean, data: object, error: string }`

#### Notifications
☐ Email merchant khi customer edit order (nếu enabled)
☐ Email merchant khi customer cancel order (nếu enabled)
☐ Email customer khi merchant edit order (nếu enabled)
☐ Email chứa: order #, changes summary, new total, timestamp

### Edge Cases

☐ **Partial fulfillment**: Nếu order có items đã fulfilled → chỉ cho edit/cancel unfulfilled items, hiển thị fulfilled items as read-only
☐ **Concurrent edits**: Nếu 2 người cùng edit 1 order → person thứ 2 nhận error "Order is being edited", auto retry sau 30s
☐ **Order > 60 ngày**: Widget không hiện hoặc hiện "Contact support" — không gọi API edit
☐ **Discount code applied**: Khi swap variant → recalculate discount trên new variant, hiện new discount amount
☐ **Free shipping threshold**: Khi giảm quantity khiến tổng < free shipping threshold → hiện warning "Shipping fee of $X.XX will apply"
☐ **Payment method expired**: Khi charge thêm fail → rollback edit, hiện error, suggest customer contact store
☐ **Last item removal**: Không cho remove item cuối cùng — suggest cancel thay vì remove
☐ **Quantity > stock**: Khi tăng quantity > available inventory → cap at max stock, hiện warning
☐ **Edit after cancel**: Nếu order đã cancelled → widget không hiện, hiện "This order has been cancelled"
☐ **Network timeout**: Nếu API call timeout → show retry button, không commit partial changes
☐ **Max edits reached**: Khi order đã edit 5 lần (default max) → widget hiện "Maximum edits reached"

### Security

☐ Tất cả API validate `shopId` — merchant chỉ thấy data của shop mình
☐ Customer edit portal verify order belongs to customer (email match hoặc order token)
☐ Webhook endpoints verify Shopify HMAC signature
☐ Access tokens encrypted at rest trong Firestore
☐ No direct Shopify API calls from frontend — all proxied through backend
☐ Rate limiting per shop: max 100 API calls/minute
☐ Audit log cho mọi edit/cancel event (who, what, when)

### Data Model (Firestore)

**Collections:**

| Collection | Document ID | Scope | Purpose |
|-----------|-------------|-------|---------|
| `shops` | shopId | — | Shop config, access token, plan |
| `editSettings` | shopId | shopId | Edit behavior config |
| `orderEdits` | auto-generated | shopId | Audit log per edit event |
| `webhookLogs` | auto-generated | shopId | Idempotency tracking (TTL: 7 days) |

**`orderEdits` document:**

| Field | Type | Description |
|-------|------|-------------|
| shopId | string | Shop identifier |
| orderId | string | Shopify order GID |
| orderNumber | string | Human-readable order # |
| editType | string | `address` / `swap` / `quantity` / `cancel` |
| editedBy | string | `customer` / `merchant` |
| changes | object | Before/after snapshot |
| priceDiff | number | Price difference (positive = charge, negative = refund) |
| status | string | `success` / `failed` / `pending` |
| customerEmail | string | Customer email |
| createdAt | timestamp | Edit timestamp |

---

**Version**: 1.0
**Created**: 2026-04-01
**Status**: PRD Review
