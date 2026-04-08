# Avada Order Editing — PRD Submit Version

**Link task Jira:** SB-10644

### Task List

| Ticket | Link | Status |
|--------|------|--------|
| SB-10644 | [Link](http://space.avada.net/browse/SB-10644) | In Progress |

### History

| Phiên bản | Ngày | Tác giả | Loại | Mô tả |
|-----------|------|---------|------|-------|
| 1.0 | 08/04/2026 | Roger | A | Tạo PRD Submit — rút gọn từ MVP |

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

- **Mục tiêu #1**: Pass Shopify App Store review lần đầu tiên — không bị reject.
- **Chiến lược**: Submit dưới dạng FREE app (không cần billing) → giảm complexity, giảm surface area bị review, tăng xác suất pass.
- **Phạm vi**: Chỉ giữ lại các features **tối thiểu** để app hoạt động end-to-end, có giá trị rõ ràng cho merchant, và đáp ứng mọi yêu cầu bắt buộc của Shopify.
- **Sau khi publish**: Bật lại billing, analytics, email, merchant editing qua app update (Shopify cho phép, không cần re-submit).
- **Free plan**: 50 edits/tháng — đủ giá trị, merchant thấy app hoạt động.
- **Khác biệt so với MVP PRD**: Bản này là tập con (subset) — cùng kiến trúc, cùng code, chỉ ẩn/bỏ features không cần cho review.

---

## 2. Personas & User Stories

### Personas

| Persona | Profile | Nhu cầu |
|---------|---------|---------|
| **Customer** | Khách mua hàng trên Shopify store | Tự sửa lỗi đơn hàng mà không cần email support |
| **Merchant** | Chủ cửa hàng Shopify, 50-2.000 đơn/tháng | Giảm ticket hỗ trợ, cấu hình quyền chỉnh sửa |

### User Stories (Submit Scope — 8 stories, tất cả P0)

| ID | User Story | Priority |
|----|-----------|----------|
| US-01 | Là **customer**, tôi muốn **chỉnh sửa địa chỉ giao hàng** sau khi đặt hàng, để gói hàng đến đúng nơi. | P0 |
| US-02 | Là **customer**, tôi muốn **đổi biến thể sản phẩm** (size, color), để nhận đúng sản phẩm mình muốn. | P0 |
| US-03 | Là **customer**, tôi muốn **thay đổi số lượng** sản phẩm trước khi giao. | P0 |
| US-04 | Là **customer**, tôi muốn **hủy đơn hàng** và nhận hoàn tiền trong khung thời gian cho phép. | P0 |
| US-05 | Là **customer**, tôi muốn **xem chênh lệch giá** trước khi xác nhận thay đổi, để không bị bất ngờ. | P0 |
| US-06 | Là **customer**, tôi muốn **truy cập chỉnh sửa từ Order Status Page**, vì đó là trang tôi thấy sau khi đặt hàng. | P0 |
| US-07 | Là **merchant**, tôi muốn **cấu hình loại chỉnh sửa cho phép và khung thời gian**, để kiểm soát quyền khách hàng. | P0 |
| US-08 | Là **merchant**, tôi muốn **xem dashboard tổng quan** edits/cancels, để biết app đang hoạt động và có giá trị. | P0 |

---

## 3. Product Solutions

### 3.1. Solution Overview

App gồm 2 phần:
- **Storefront**: Theme App Extension widget trên Order Status Page → mở Edit Portal cho customer
- **Admin**: Embedded Shopify Admin app (Polaris) → Dashboard + Settings

### 3.2. Scope

**TRONG scope (Submit):**

| # | Feature | Lý do phải có |
|---|---------|---------------|
| 1 | **Customer edit address** | Core value — use case #1 của merchant |
| 2 | **Customer swap variant** | Core value — use case #2 |
| 3 | **Customer change quantity** | Core value — đi kèm swap, đơn giản |
| 4 | **Customer cancel order + auto refund/restock** | Core value — giảm friction cho customer |
| 5 | **Widget Order Status Page** | Entry point duy nhất cho customer truy cập edit |
| 6 | **Admin Settings** (time window + edit types) | Merchant cần control — Shopify review yêu cầu |
| 7 | **Admin Dashboard** (basic metrics + recent activity) | Shopify review yêu cầu app có value rõ ràng |
| 8 | **GDPR webhooks** (3 endpoints) | BẮT BUỘC — lý do reject #1 nếu thiếu |
| 9 | **App uninstall cleanup** | BẮT BUỘC — lý do reject #3 nếu thiếu |
| 10 | **Simple onboarding** (2-step checklist) | Shopify reviewer check first-time experience |

**NGOÀI scope (thêm sau khi publish qua app update):**

| Feature | Lý do defer | Khi nào thêm |
|---------|-------------|---------------|
| Thank You Page widget | Order Status Page đủ cho submit | Post-approval update |
| Email notifications | Không ảnh hưởng core value | Post-approval update |
| Merchant order editing từ admin | Merchant dùng Shopify Admin native | Post-approval update |
| Billing/Pricing tiers | FREE app strategy — không cần cho review | Post-approval update |
| Analytics charts | Nice-to-have, dashboard basic đủ | Post-approval update |
| Orders list page | Dashboard recent activity thay thế | Post-approval update |
| Upsell, retention, store credit | P1 feature | Phase 2 |
| Edit rules per product/collection | P1 feature | Phase 2 |
| Multi-language | P1 feature | Phase 2 |
| Google address validation | P1 feature | Phase 2 |

### 3.3. Chiến lược Submit

1. **FREE app** — không implement billing → giảm 1 tuần dev, bỏ qua billing review
2. **Sau khi publish** → thêm billing qua app update (Shopify cho phép, không cần re-submit)
3. **Free tier = 50 edits/tháng** — đủ giá trị, merchant thấy app hoạt động
4. **Demo store** sẵn sàng với sample products + test orders
5. **Video walkthrough** 3-5 phút (merchant setup flow + customer edit flow)
6. **Test account** cho Shopify reviewer (nếu cần)

### 3.4. UI Flow

#### Flow A: Customer Self-Service

```
Order Status Page → [Widget "Edit Your Order"] → click
    ↓
Edit Portal (App Proxy page) → chọn loại edit:
├── [Change Address] → Form → Preview → Confirm → Success
├── [Swap Variant] → Picker → Price diff → Confirm → Success
├── [Change Qty] → +/- → Price diff → Confirm → Success
└── [Cancel Order] → Reason → Confirm → Success
```

**Màn hình 1: Widget trên Order Status Page**

```
┌─────────────────────────────────────┐
│  Need to make changes?              │
│  You can edit your order within     │
│  [2 hours]. 1h 45m remaining       │
│                                     │
│  [Edit Your Order]                  │
└─────────────────────────────────────┘
```

| Hành động | Kết quả |
|-----------|---------|
| Click "Edit Your Order" | Mở Edit Portal page (App Proxy) |
| Hết time window | Widget ẩn hoặc hiện "Edit window expired" |
| Order đã fulfilled | Widget ẩn |

**Màn hình 2: Edit Portal**

```
┌──────────────────────────────────────┐
│  Edit Order #1234      1h 45m       │
│                                      │
│  Shipping Address                    │
│  John Doe, 123 Main St...  [Change]  │
│                                      │
│  Items                               │
│  T-Shirt (M, Black)    $29.99       │
│  Qty: [-][1][+]              [Swap]  │
│                                      │
│  Jeans (32, Blue)       $49.99      │
│  Qty: [-][1][+]              [Swap]  │
│                                      │
│  Total: $91.98                       │
│                                      │
│  [Cancel Order]    [Review Changes]  │
└──────────────────────────────────────┘
```

**Màn hình 3: Swap Variant**

```
┌──────────────────────────────────────┐
│  Swap: T-Shirt                       │
│  Current: M, Black — $29.99         │
│                                      │
│  Size:  [S] [M] [L] [XL]            │
│  Color: [Black] [White] [Red]        │
│                                      │
│  New: L, Black — $29.99             │
│  Diff: $0.00                         │
│                                      │
│  [Cancel]        [Apply Change]      │
└──────────────────────────────────────┘
```

**Màn hình 4: Review & Confirm Changes**

```
┌──────────────────────────────────────┐
│  Review Your Changes                 │
│                                      │
│  Address: 123 Main → 456 Oak         │
│  T-Shirt: M Black → L Red           │
│  Jeans: Qty 1 → 2 (+$49.99)         │
│                                      │
│  Original: $91.98                    │
│  New total: $141.97                  │
│  Additional charge: +$49.99         │
│                                      │
│  [Go Back]      [Confirm Changes]    │
└──────────────────────────────────────┘
```

**Màn hình 5: Cancel Order**

```
┌──────────────────────────────────────┐
│  Cancel Order #1234?                 │
│  This action cannot be undone.       │
│  Refund: $91.98 (5-10 business days) │
│  Reason: [Select...        ]        │
│  [Keep Order]    [Cancel Order]      │
└──────────────────────────────────────┘
```

**Màn hình 6: Success**

```
┌──────────────────────────────────────┐
│  Order Updated Successfully!         │
│  Order #1234 has been updated.       │
│  [View Updated Order]                │
└──────────────────────────────────────┘
```

#### Flow B: Merchant Admin (Dashboard + Settings only)

```
Mở app → Dashboard (metrics + recent activity)
       → Settings (time window, edit types, widget toggle, color)
```

> **Lưu ý**: Không có Orders list page. Merchant xem edits qua Dashboard recent activity.
> Merchant cần edit order trực tiếp → dùng Shopify Admin native.

**Màn hình 7: Admin Dashboard**

```
┌─────────────────────────────────────────┐
│  Avada Order Editing                     │
│  Dashboard   Settings                    │
│                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Edits   │ │ Cancels │ │ Edits   │   │
│  │ Today   │ │ Today   │ │ Left    │   │
│  │   12    │ │    2    │ │  38/50  │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                          │
│  Recent Activity                         │
│  #1234 — Address changed — 2m ago       │
│  #1230 — Variant swapped — 15m ago      │
│  #1228 — Cancelled — 1h ago             │
│  #1225 — Qty changed — 2h ago           │
│  #1220 — Address changed — 3h ago       │
└─────────────────────────────────────────┘
```

| Item | Mô tả |
|------|-------|
| Edits Today | Tổng số lần edit trong ngày (address + swap + qty) |
| Cancels Today | Tổng số cancel trong ngày |
| Edits Left | Số edit còn lại trong tháng (X/50 free plan) |
| Recent Activity | 10 items gần nhất: order #, edit type, thời gian |

**Màn hình 8: Admin Settings**

```
┌─────────────────────────────────────────┐
│  Settings                    [Save]      │
│                                          │
│  Edit Time Window                        │
│  Allow edits for: [2 hours]              │
│                                          │
│  Allowed Edit Types                      │
│  [x] Edit shipping address               │
│  [x] Swap product variants               │
│  [x] Change quantity                     │
│  [x] Cancel order                        │
│                                          │
│  Widget Display                          │
│  [x] Show on Order Status Page           │
│  Primary color: [#2D9D78]               │
└─────────────────────────────────────────┘
```

| Item | Mô tả |
|------|-------|
| Time window | 30m / 1h / 2h / 4h / 12h / 24h / Until fulfillment |
| Edit types | 4 checkboxes, tất cả bật mặc định |
| Widget toggle | Bật/tắt widget trên Order Status Page |
| Primary color | Màu nút chính của widget |

**Màn hình 9: Onboarding (First-time)**

```
┌─────────────────────────────────────────┐
│  Welcome to Avada Order Editing!        │
│                                          │
│  Get started in 2 steps:                │
│                                          │
│  [x] Step 1: Configure edit settings    │
│    [Go to Settings]                     │
│                                          │
│  [ ] Step 2: Enable widget on your store │
│    [Enable Widget]                      │
│    (Opens Theme Editor)                 │
│                                          │
│  Need help? [View Setup Guide]          │
└─────────────────────────────────────────┘
```

### 3.5. Interaction with Shopify

**Order Editing API (GraphQL):**
- `orderEditBegin` → `orderEditAddVariant` / `orderEditSetQuantity` → `orderEditCommit`
- Shopify auto handles refund/charge khi commit

**Address Update (REST):**
- `PUT /admin/api/2024-07/orders/{id}.json` → update shipping address

**Order Cancel (GraphQL):**
- `orderCancel` mutation → cancel + refund + restock

**Webhooks nhận:**
- `orders/edited`, `orders/cancelled`, `orders/updated`
- `app/uninstalled` → **cleanup bắt buộc**

**GDPR Webhooks (BẮT BUỘC):**
- `customers/data_request` → export customer data JSON
- `customers/redact` → anonymize customer data
- `shop/redact` → delete all shop data

**Extension Points:**
- Theme App Extension → Order Status Page block

### 3.6. Error Messages

| Error | Message | Action |
|-------|---------|--------|
| Edit window expired | "The edit window for this order has expired. Please contact the store." | Ẩn edit options |
| Order fulfilled | "This order has already been shipped." | Ẩn widget |
| Variant out of stock | "Sorry, [Variant] is currently out of stock." | Disable option |
| Payment failed | "We couldn't process the charge. Please try again." | Rollback, allow retry |
| Max edits reached | "Maximum edits reached for this order." | Ẩn edit options |
| Monthly limit reached | "This store has reached the monthly edit limit." | Ẩn widget |
| Concurrent edit | "This order is being edited. Please try again." | Retry 30s |

### 3.7. Success Messages

| Event | Message |
|-------|---------|
| Address updated | "Shipping address updated successfully!" |
| Variant swapped | "Product updated! [Refund/Charge info if any]" |
| Quantity changed | "Quantity updated! [Refund/Charge info if any]" |
| Order cancelled | "Order cancelled. Refund of $X.XX within 5-10 business days." |
| Settings saved | "Settings saved successfully." |

---

## 4. Design Description

### 4.1. Storefront — Edit Widget (Theme App Extension)

> Hiện khi: order chưa fulfilled AND trong time window AND shop chưa hết monthly limit

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Title | Text | Y | "Need to make changes?" | Tiêu đề widget | Max 100 chars |
| Description | Text | Y | "You can edit your order within [time]" | Dynamic theo time window | — |
| Edit button | Button | Y | "Edit Your Order" | Primary CTA → mở Edit Portal | — |
| Timer | Badge | Y | — | Countdown, auto-update mỗi phút | Ẩn khi hết giờ |

### 4.2. Storefront — Edit Portal (App Proxy Page)

> Mở khi: customer click Edit button từ widget

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Order number | Text | Y | — | #XXXX | — |
| Timer | Badge | Y | — | Countdown | Redirect khi hết |
| Address section | Card | Y | — | Current address + Change button | Hiện nếu allowAddressEdit |
| Address form | Form | N | — | Name, Addr, City, State, Zip, Country, Phone | Required per country |
| Items list | List | Y | — | Product image + variant + price | — |
| Qty controls | Stepper | N | Current qty | [-] [qty] [+] | Min 1, Max stock |
| Swap button | Button | N | — | Per line item | Hiện nếu allowItemSwap |
| Variant picker | Selection | N | — | Size/Color grid | OOS = disabled |
| Price summary | Card | Y | — | Original / New / Diff | Auto calc |
| Cancel button | Button | N | — | "Cancel This Order" | Destructive, hiện nếu allowCancellation |
| Confirm button | Button | Y | — | "Confirm Changes" | Disabled nếu no changes |

### 4.3. Storefront — Swap Variant Modal

> Mở khi: customer click Swap trên một line item

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Product name | Text | Y | — | Tên sản phẩm | — |
| Current variant | Text | Y | — | Variant hiện tại + giá | — |
| Option selectors | Selection | Y | — | Size/Color grid theo product options | — |
| New variant info | Text | Y | — | Variant mới + giá | Update realtime |
| Price diff | Text | Y | — | Chênh lệch giá (+ hoặc -) | — |
| Cancel button | Button | Y | — | Đóng modal | — |
| Apply button | Button | Y | — | "Apply Change" | Disabled nếu variant = current |

### 4.4. Storefront — Review Changes

> Màn hình preview tất cả thay đổi trước khi confirm

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Changes list | List | Y | — | Before → After cho từng thay đổi | Min 1 change |
| Original total | Currency | Y | — | Tổng tiền ban đầu | — |
| New total | Currency | Y | — | Tổng tiền mới | — |
| Price diff | Currency | Y | — | Charge thêm / Refund | Highlight nếu > $0 |
| Go back button | Button | Y | — | Quay lại Edit Portal | — |
| Confirm button | Button | Y | — | "Confirm Changes" | Primary, loading state |

### 4.5. Storefront — Cancel Order

> Confirm dialog khi customer chọn Cancel

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Warning text | Text | Y | — | "This action cannot be undone" | — |
| Refund amount | Currency | Y | — | Số tiền hoàn lại | — |
| Refund note | Text | Y | — | "5-10 business days" | — |
| Reason select | Select | N | — | Dropdown reasons | Optional |
| Keep order button | Button | Y | — | Quay lại | — |
| Cancel button | Button | Y | — | "Cancel Order" | Destructive, loading state |

### 4.6. Storefront — Success Page

> Hiện sau khi confirm thành công

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Success icon | Icon | Y | — | Checkmark | — |
| Title | Text | Y | — | "Order Updated Successfully!" / "Order Cancelled" | Dynamic |
| Subtitle | Text | Y | — | "Order #XXXX has been updated." | — |
| Refund info | Text | N | — | Hiện nếu có refund | — |
| View order button | Button | Y | — | Link về Order Status Page | — |

### 4.7. Admin — Dashboard

> Trang mặc định khi mở app

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Edits today | Metric card | Y | 0 | Tổng edits trong ngày | — |
| Cancels today | Metric card | Y | 0 | Tổng cancels trong ngày | — |
| Edits remaining | Metric card | Y | 50 | X/50 free plan, reset đầu tháng | — |
| Recent activity | List | Y | — | 10 items gần nhất | Order #, edit type, time ago |
| Onboarding checklist | Card | N | — | Hiện cho new merchants | Ẩn khi hoàn tất 2 steps |
| Empty state | Card | N | — | "No edits yet" khi chưa có data | — |

### 4.8. Admin — Settings

> Cấu hình edit behavior

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Time window | Select | Y | 2 hours | 30m / 1h / 2h / 4h / 12h / 24h / Until fulfillment | — |
| Allow address edit | Checkbox | Y | true | Bật/tắt quyền sửa địa chỉ | — |
| Allow variant swap | Checkbox | Y | true | Bật/tắt quyền đổi variant | — |
| Allow qty change | Checkbox | Y | true | Bật/tắt quyền thay đổi số lượng | — |
| Allow cancel | Checkbox | Y | true | Bật/tắt quyền hủy đơn | — |
| Show widget | Checkbox | Y | true | Bật/tắt widget trên Order Status Page | — |
| Primary color | Color picker | N | #2D9D78 | Màu nút chính của widget | Valid hex |
| Save button | Button | Y | — | Lưu settings → toast "Settings saved" | — |

### 4.9. Admin — Onboarding (First-time)

> Hiện cho merchant lần đầu mở app, ẩn khi hoàn tất

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Welcome title | Text | Y | — | "Welcome to Avada Order Editing!" | — |
| Step 1 | Checklist | Y | unchecked | "Configure edit settings" → link Settings | Auto-check khi settings saved |
| Step 2 | Checklist | Y | unchecked | "Enable widget on your store" → mở Theme Editor | Auto-check khi widget enabled |
| Setup guide link | Link | N | — | Link tới help docs | — |

---

## 5. Acceptance Criteria

### Functional — Customer

- [ ] Customer truy cập edit portal từ Order Status Page widget
- [ ] Widget hiển thị countdown timer, auto-update
- [ ] Widget ẩn khi hết time window hoặc order fulfilled
- [ ] Customer edit shipping address (name, address, city, state, zip, country, phone)
- [ ] Customer swap variant trong cùng product, xem price diff
- [ ] Variant hết hàng = disabled + "Out of stock"
- [ ] Customer tăng/giảm quantity (min 1, max available stock)
- [ ] Customer cancel order với reason (optional)
- [ ] Preview tất cả changes + price diff TRƯỚC khi confirm
- [ ] Tăng giá → charge thêm; giảm giá → auto refund; cancel → full refund + restock
- [ ] Success page sau confirm với thông tin phù hợp
- [ ] UI responsive mobile (>= 320px)
- [ ] Loading states trên tất cả buttons khi processing

### Functional — Merchant Admin

- [ ] Dashboard hiển thị: edits today, cancels today, edits remaining (X/50)
- [ ] Recent activity list (10 items gần nhất)
- [ ] Empty state khi chưa có data
- [ ] Settings: configure time window, edit types, widget display, primary color
- [ ] Settings save → toast "Settings saved successfully"
- [ ] Onboarding checklist cho new merchant (2 steps: settings + enable widget)
- [ ] Onboarding ẩn sau khi hoàn tất
- [ ] App load < 3 giây

### Shopify App Store — BẮT BUỘC pass review

- [ ] **GDPR webhook: customers/data_request** → return customer data JSON
- [ ] **GDPR webhook: customers/redact** → anonymize/delete customer PII
- [ ] **GDPR webhook: shop/redact** → delete ALL shop data after 48h
- [ ] **App uninstall** → cleanup theme extension blocks, metafields
- [ ] **Idempotency keys** cho mọi payment/edit operations — KHÔNG duplicate charge
- [ ] **Webhook HMAC verification** trên tất cả webhook endpoints
- [ ] **Privacy Policy + Terms of Service** accessible (link trong app listing)
- [ ] **Performance**: storefront widget không giảm quá 10 điểm Lighthouse
- [ ] **LCP < 2.5s, INP < 200ms, CLS < 0.1** trên storefront pages
- [ ] **Demo store** sẵn sàng cho Shopify reviewer (có products + test orders)
- [ ] **Video walkthrough** 3-5 phút (merchant setup + customer edit flow)
- [ ] **App listing** đầy đủ: description, 6-8 screenshots, app icon

### Edge Cases

- [ ] Partial fulfillment → chỉ cho edit unfulfilled items
- [ ] Concurrent edits → "Order is being edited" error, retry 30s
- [ ] Order > 60 ngày → widget không hiện
- [ ] Discount code → recalculate đúng sau edit
- [ ] Last item qty = 0 → suggest cancel thay vì remove
- [ ] Quantity > available stock → cap at max
- [ ] Payment method expired → rollback, error message rõ ràng
- [ ] Network timeout → retry button, no partial commit
- [ ] Monthly limit (50) reached → widget hiện "Edit limit reached"

### Security

- [ ] Tất cả API validate shopId (IDOR prevention)
- [ ] Customer portal verify order belongs to customer (order token)
- [ ] Webhook HMAC signature verification
- [ ] Access tokens encrypted in Firestore
- [ ] No direct Shopify API calls from frontend
- [ ] Rate limiting per shop (100 calls/minute)
- [ ] Audit log cho mọi edit/cancel operation

### Data Model (Firestore)

| Collection | Doc ID | Purpose |
|-----------|--------|---------|
| `shops` | shopId | Shop config, access token (encrypted), plan info |
| `editSettings` | shopId | Edit behavior config (time window, allowed types, colors) |
| `orderEdits` | auto | Audit log per edit event |
| `webhookLogs` | auto | Idempotency tracking (TTL 7 ngày) |

**`shops` schema:**

| Field | Type | Description |
|-------|------|-------------|
| shopId | string | Shopify shop domain |
| accessToken | string | Encrypted access token |
| plan | string | `free` (luôn là free cho submit version) |
| monthlyEditCount | number | Đếm edits trong tháng, reset ngày 1 |
| monthlyEditLimit | number | 50 (free plan) |
| onboardingCompleted | boolean | Đã hoàn tất onboarding chưa |
| installedAt | timestamp | Thời điểm install |
| uninstalledAt | timestamp | Thời điểm uninstall (nullable) |

**`editSettings` schema:**

| Field | Type | Description |
|-------|------|-------------|
| shopId | string | Shop identifier |
| timeWindow | string | `30m` / `1h` / `2h` / `4h` / `12h` / `24h` / `until_fulfillment` |
| allowAddressEdit | boolean | Default: true |
| allowItemSwap | boolean | Default: true |
| allowQtyChange | boolean | Default: true |
| allowCancellation | boolean | Default: true |
| showWidget | boolean | Default: true |
| primaryColor | string | Hex color, default: #2D9D78 |
| updatedAt | timestamp | — |

**`orderEdits` schema:**

| Field | Type | Description |
|-------|------|-------------|
| shopId | string | Shop identifier |
| orderId | string | Shopify order GID |
| orderNumber | string | Order # |
| editType | string | `address` / `swap` / `quantity` / `cancel` |
| editedBy | string | `customer` (submit version chỉ có customer) |
| changes | object | Before/after snapshot |
| priceDiff | number | + = charge thêm, - = refund |
| status | string | `success` / `failed` |
| createdAt | timestamp | — |

**`webhookLogs` schema:**

| Field | Type | Description |
|-------|------|-------------|
| webhookId | string | Idempotency key (Shopify webhook ID) |
| topic | string | Webhook topic |
| shopId | string | Shop identifier |
| processedAt | timestamp | — |
| expireAt | timestamp | TTL 7 ngày — Firestore auto-delete |

---

## Timeline ước tính (Submit Version)

| Tuần | Công việc | Output |
|------|-----------|--------|
| **Tuần 1** | Foundation: monorepo setup, OAuth flow, Firestore repos (shops, editSettings), app install/uninstall | Backend skeleton hoạt động |
| **Tuần 2** | Edit engine: eligibility check, order edit APIs (address, swap, qty), cancel + refund logic | Core APIs working end-to-end |
| **Tuần 3** | Storefront: Theme App Extension widget, Edit Portal page (App Proxy), variant picker | Customer flow hoàn chỉnh |
| **Tuần 4** | Admin: Dashboard (metrics + activity), Settings page, Onboarding checklist (Polaris) | Merchant flow done |
| **Tuần 5** | GDPR webhooks, uninstall cleanup, error handling, edge cases, mobile testing, QA | App Store ready |
| **Tuần 6** | App listing (description, screenshots, video), demo store setup, final QA → **SUBMIT** | Submitted |

**Tổng: 6 tuần** từ bắt đầu code đến submit.

### Sau khi publish (Post-approval roadmap)

| Thứ tự | Feature | Thời gian ước tính |
|--------|---------|-------------------|
| 1 | Billing/Pricing tiers (via app update) | 1 tuần |
| 2 | Email notifications | 1 tuần |
| 3 | Orders list page | 3-4 ngày |
| 4 | Analytics charts | 3-4 ngày |
| 5 | Merchant order editing | 1 tuần |
| 6 | Thank You Page widget | 3-4 ngày |

---

**Version**: 1.0
**Created**: 2026-04-08
**Status**: Submit Version PRD — Subset of MVP
