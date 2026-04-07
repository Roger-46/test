# Avada Order Editing — PRD MVP (Submit-First)

**Link task Jira:** SB-10644

### Task List

| Ticket | Link | Status |
|--------|------|--------|
| SB-10644 | [Link](http://space.avada.net/browse/SB-10644) | In Progress |

### History

| Phiên bản | Ngày | Tác giả | Loại | Mô tả |
|-----------|------|---------|------|-------|
| 1.0 | 01/04/2026 | Roger | A | Tạo mới PRD MVP |
| 2.0 | 07/04/2026 | Roger | M | Viết lại — phiên bản submit-first, cắt scope tối thiểu |

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

- **Mục tiêu #1**: Submit lên Shopify App Store nhanh nhất, pass review lần đầu.
- **Chiến lược**: Ship FREE app (không cần billing) → giảm complexity → dễ pass review. Thêm billing sau qua app update (không cần re-submit).
- **Vấn đề**: Shopify không cho khách hàng tự chỉnh sửa đơn hàng — mọi thay đổi phải qua đội hỗ trợ.
- **Giải pháp**: App cho phép khách hàng tự sửa địa chỉ, đổi biến thể, thay đổi số lượng, hủy đơn từ Order Status Page.
- **Đối tượng**: Merchant SMB trên Shopify.
- **Scope**: 6 features cốt lõi — chỉ đủ để app hoạt động end-to-end, có giá trị thực, pass Shopify review.

---

## 2. Personas & User Stories

### Personas

| Persona | Profile | Nhu cầu |
|---------|---------|---------|
| **Customer** | Khách mua hàng trên Shopify store | Tự sửa lỗi đơn hàng mà không cần email support |
| **Merchant** | Chủ cửa hàng Shopify, 50-2.000 đơn/tháng | Giảm ticket hỗ trợ, cấu hình quyền chỉnh sửa |

### User Stories (Submit Scope — chỉ 8 stories)

| ID | User Story | Priority |
|----|-----------|----------|
| US-01 | Là **customer**, tôi muốn **chỉnh sửa địa chỉ giao hàng** sau khi đặt hàng, để gói hàng đến đúng nơi. | P0 |
| US-02 | Là **customer**, tôi muốn **đổi biến thể sản phẩm** (size, color), để nhận đúng sản phẩm. | P0 |
| US-03 | Là **customer**, tôi muốn **thay đổi số lượng** sản phẩm trước khi giao. | P0 |
| US-04 | Là **customer**, tôi muốn **hủy đơn hàng** trong khung thời gian cho phép. | P0 |
| US-05 | Là **customer**, tôi muốn **xem chênh lệch giá** trước khi xác nhận thay đổi. | P0 |
| US-06 | Là **customer**, tôi muốn **truy cập chỉnh sửa từ Order Status Page**. | P0 |
| US-07 | Là **merchant**, tôi muốn **cấu hình loại chỉnh sửa cho phép + khung thời gian**. | P0 |
| US-08 | Là **merchant**, tôi muốn **xem dashboard** edits/cancels cơ bản. | P0 |

---

## 3. Product Solutions

### 3.1. Solution Overview

App gồm 2 phần:
- **Storefront**: Theme App Extension widget trên Order Status Page → mở Edit Portal cho customer
- **Admin**: Embedded Shopify Admin app (Polaris) → Settings + Dashboard

### 3.2. Scope

**TRONG scope (Submit):**

| # | Feature | Lý do phải có |
|---|---------|---------------|
| 1 | **Customer edit address** | Core value — use case #1 của merchant |
| 2 | **Customer swap variant** | Core value — use case #2 |
| 3 | **Customer change quantity** | Core value — đơn giản, đi kèm swap |
| 4 | **Customer cancel order** | Core value — giảm friction |
| 5 | **Widget Order Status Page** | Entry point duy nhất cho customer |
| 6 | **Admin Settings** | Merchant cần control — Shopify review yêu cầu |
| 7 | **Admin Dashboard** (basic) | Shopify review yêu cầu app có value rõ ràng |
| 8 | **GDPR webhooks** | BẮT BUỘC — lý do reject #1 |
| 9 | **App uninstall cleanup** | BẮT BUỘC — lý do reject #3 |
| 10 | **Onboarding** (simple) | Shopify review check first-time experience |

**NGOÀI scope (thêm sau khi publish):**
- Thank You Page widget → app update
- Merchant order editing từ admin → app update
- Email notifications → app update
- Analytics/Charts → app update
- Billing/Pricing tiers → app update (không cần re-submit)
- Upsell, retention, store credit → P1
- Edit rules per product/collection → P1
- Multi-language → P1
- Google address validation → P1

### 3.3. Chiến lược Submit

1. **FREE app** — không implement billing → giảm 1 tuần dev, dễ pass review
2. **Sau khi publish** → thêm billing qua app update (Shopify cho phép, không cần re-submit)
3. **Free tier = 50 edits/tháng** — đủ giá trị, merchant thấy app hoạt động
4. **Demo store** sẵn sàng + video walkthrough 3-5 phút
5. **Test account** cho Shopify reviewer

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
│  ✏️ Need to make changes?           │
│  You can edit your order within     │
│  [2 hours]. ⏱ 1h 45m remaining     │
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
│  Edit Order #1234     ⏱ 1h 45m      │
│                                      │
│  📍 Shipping Address                 │
│  John Doe, 123 Main St...  [Change]  │
│                                      │
│  🛍 Items                            │
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
│  Size:  [S] [M●] [L] [XL]           │
│  Color: [Black●] [White] [Red]       │
│                                      │
│  New: L, Black — $29.99             │
│  Diff: $0.00                         │
│                                      │
│  [Cancel]        [Apply Change]      │
└──────────────────────────────────────┘
```

**Màn hình 4: Review & Confirm**

```
┌──────────────────────────────────────┐
│  Review Your Changes                 │
│                                      │
│  📍 Address: 123 Main → 456 Oak      │
│  🔄 T-Shirt: M Black → L Red        │
│  📦 Jeans: Qty 1 → 2 (+$49.99)      │
│                                      │
│  Original: $91.98                    │
│  New total: $141.97                  │
│  ⚠️ Additional charge: +$49.99      │
│                                      │
│  [Go Back]      [Confirm Changes]    │
└──────────────────────────────────────┘
```

**Màn hình 5: Success**

```
┌──────────────────────────────────────┐
│  ✅ Order Updated Successfully!       │
│  Order #1234 has been updated.       │
│  [View Updated Order]                │
└──────────────────────────────────────┘
```

**Màn hình 6: Cancel Order**

```
┌──────────────────────────────────────┐
│  Cancel Order #1234?                 │
│  This action cannot be undone.       │
│  Refund: $91.98 (5-10 business days) │
│  Reason: [Select...        ▼]       │
│  [Keep Order]    [Cancel Order]      │
└──────────────────────────────────────┘
```

#### Flow B: Merchant Admin

```
Mở app → Dashboard (metrics + recent activity)
       → Settings (time window, edit types)
```

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
└─────────────────────────────────────────┘
```

**Màn hình 8: Admin Settings**

```
┌─────────────────────────────────────────┐
│  Settings                    [Save]      │
│                                          │
│  Edit Time Window                        │
│  Allow edits for: [2 hours ▼]            │
│                                          │
│  Allowed Edit Types                      │
│  ☑ Edit shipping address                │
│  ☑ Swap product variants                │
│  ☑ Change quantity                      │
│  ☑ Cancel order                         │
│                                          │
│  Widget Display                          │
│  ☑ Show on Order Status Page            │
│  Primary color: [#2D9D78]               │
└─────────────────────────────────────────┘
```

**Màn hình 9: Onboarding (First-time)**

```
┌─────────────────────────────────────────┐
│  Welcome to Avada Order Editing! 👋     │
│                                          │
│  Get started in 2 steps:                │
│                                          │
│  ☑ Step 1: Configure edit settings      │
│    [Go to Settings]                     │
│                                          │
│  ☐ Step 2: Enable widget on your store  │
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

> Hiện khi: order chưa fulfilled AND trong time window

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Title | Text | Y | "Need to make changes?" | — | Max 100 chars |
| Description | Text | Y | "You can edit your order within [time]" | Dynamic | — |
| Edit button | Button | Y | "Edit Your Order" | Primary CTA | — |
| Timer | Badge | Y | — | Countdown, auto-update | Ẩn khi hết giờ |

### 4.2. Storefront — Edit Portal (App Proxy Page)

> Mở khi: customer click Edit button từ widget

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Order number | Text | Y | — | #XXXX | — |
| Timer | Badge | Y | — | Countdown | Redirect khi hết |
| Address section | Card | Y | — | Current address + Change | Hiện nếu allowAddressEdit |
| Address form | Form | N | — | Name, Addr, City, State, Zip, Country, Phone | Required per country |
| Items list | List | Y | — | Product + variant + price | — |
| Qty controls | Stepper | N | Current qty | [-] [qty] [+] | Min 1, Max stock |
| Swap button | Button | N | — | Per line item | Hiện nếu allowItemSwap |
| Variant picker | Selection | N | — | Size/Color grid | OOS = disabled |
| Price summary | Card | Y | — | Original / New / Diff | Auto calc |
| Cancel button | Button | N | — | "Cancel This Order" | Destructive, hiện nếu allowCancellation |
| Confirm button | Button | Y | — | "Confirm Changes" | Disabled nếu no changes |

### 4.3. Admin — Dashboard

> Trang mặc định khi mở app

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Edits today | Metric | Y | 0 | Count | — |
| Cancels today | Metric | Y | 0 | Count | — |
| Edits remaining | Metric | Y | 50 | X/50 free plan | — |
| Recent activity | List | Y | — | 10 items | Order #, type, time |
| Onboarding checklist | Card | N | — | Hiện cho new merchants | Ẩn khi hoàn tất |

### 4.4. Admin — Settings

> Cấu hình edit behavior

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Time window | Select | Y | 2 hours | 30m/1h/2h/4h/12h/24h/Until fulfillment | — |
| Allow address edit | Checkbox | Y | true | — | — |
| Allow variant swap | Checkbox | Y | true | — | — |
| Allow qty change | Checkbox | Y | true | — | — |
| Allow cancel | Checkbox | Y | true | — | — |
| Show widget | Checkbox | Y | true | Order Status Page | — |
| Primary color | Color | N | #2D9D78 | Widget color | Valid hex |

---

## 5. Acceptance Criteria

### Functional — Customer

☐ Customer truy cập edit portal từ Order Status Page widget
☐ Widget hiển thị countdown timer
☐ Widget ẩn khi hết time window hoặc order fulfilled
☐ Customer edit shipping address (name, address, city, state, zip, country, phone)
☐ Customer swap variant trong cùng product
☐ Variant hết hàng = disabled + "Out of stock"
☐ Customer tăng/giảm quantity (min 1, max stock)
☐ Customer cancel order với reason (optional)
☐ Preview price diff TRƯỚC khi confirm
☐ Tăng giá → charge thêm; giảm giá → auto refund; cancel → full refund + restock
☐ Success page sau confirm
☐ UI responsive mobile (>= 320px)

### Functional — Merchant Admin

☐ Dashboard: edits today, cancels today, edits remaining (X/50)
☐ Recent activity list (10 items)
☐ Settings: configure time window, edit types, widget display
☐ Settings save → toast "Settings saved"
☐ Onboarding checklist cho new merchant (2 steps: settings + enable widget)
☐ App load < 3 giây

### Shopify App Store — BẮT BUỘC pass review

☐ **GDPR webhook: customers/data_request** → return customer data JSON
☐ **GDPR webhook: customers/redact** → anonymize customer data
☐ **GDPR webhook: shop/redact** → delete ALL shop data
☐ **App uninstall** → cleanup theme extension blocks, metafields, script tags
☐ **Idempotency keys** cho mọi payment/edit operations — KHÔNG duplicate charge
☐ **Webhook HMAC verification** trên tất cả webhook endpoints
☐ **Privacy Policy + Terms of Service** accessible (link trong app)
☐ **Performance**: storefront widget không degrade > 10 Lighthouse points
☐ **LCP < 2.5s, INP < 200ms, CLS < 0.1** trên storefront
☐ **Demo store** sẵn sàng cho Shopify reviewer
☐ **Video walkthrough** 3-5 phút (merchant setup + customer edit flow)
☐ **App listing** đầy đủ: description, 6-8 screenshots, icon

### Edge Cases

☐ Partial fulfillment → chỉ edit unfulfilled items
☐ Concurrent edits → "Order is being edited" error, retry 30s
☐ Order > 60 ngày → widget không hiện
☐ Discount code → recalculate sau edit
☐ Last item removal → suggest cancel thay vì remove
☐ Quantity > stock → cap at max
☐ Payment method expired → rollback, error message
☐ Network timeout → retry button, no partial commit

### Security

☐ Tất cả API validate shopId (IDOR prevention)
☐ Customer portal verify order belongs to customer (order token)
☐ Webhook HMAC signature verification
☐ Access tokens encrypted in Firestore
☐ No direct Shopify API from frontend
☐ Rate limiting per shop (100 calls/minute)
☐ Audit log cho mọi edit/cancel

### Data Model (Firestore)

| Collection | Doc ID | Purpose |
|-----------|--------|---------|
| `shops` | shopId | Shop config, access token, plan |
| `editSettings` | shopId | Edit behavior config |
| `orderEdits` | auto | Audit log per edit event |
| `webhookLogs` | auto | Idempotency (TTL 7 days) |

**`orderEdits` schema:**

| Field | Type | Description |
|-------|------|-------------|
| shopId | string | Shop identifier |
| orderId | string | Shopify order GID |
| orderNumber | string | Order # |
| editType | string | `address` / `swap` / `quantity` / `cancel` |
| editedBy | string | `customer` |
| changes | object | Before/after snapshot |
| priceDiff | number | + = charge, - = refund |
| status | string | `success` / `failed` |
| createdAt | timestamp | — |

---

## Timeline ước tính (Submit-First)

| Tuần | Việc | Output |
|------|------|--------|
| 1 | Foundation: monorepo, auth, OAuth, repositories | Backend skeleton |
| 2 | Edit engine: eligibility, edit API, cancel, refund | Core APIs working |
| 3 | Storefront: theme extension widget + edit page (Preact) | Customer flow done |
| 4 | Admin: dashboard + settings + onboarding (Polaris) | Merchant flow done |
| 5 | GDPR, uninstall cleanup, error handling, testing | App Store ready |
| 6 | App listing, screenshots, video, demo store → **SUBMIT** | 🚀 Submitted |

**Tổng: ~6 tuần** từ bắt đầu code đến submit.

---

**Version**: 2.0
**Updated**: 2026-04-07
**Status**: Submit-First PRD
