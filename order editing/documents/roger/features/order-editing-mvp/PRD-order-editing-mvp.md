# Avada Order Editing — PRD MVP (Full)

**Link task Jira:** SB-10644

### Task List

| Ticket | Link | Status |
|--------|------|--------|
| SB-10644 | [Link](http://space.avada.net/browse/SB-10644) | In Progress |

### History

| Phiên bản | Ngày | Tác giả | Loại | Mô tả |
|-----------|------|---------|------|-------|
| 1.0 | 01/04/2026 | Roger | A | Tạo mới PRD MVP |
| 2.0 | 07/04/2026 | Roger | M | Viết lại — phiên bản submit-first |
| 3.0 | 08/04/2026 | Roger | M | Restore full MVP scope — MVP là bản gốc, Submit rút gọn từ đây |
| 4.0 | 13/04/2026 | Roger | M | Dashboard: thêm Quickstart (3-step), Helpdesk, 4 metric cards, portal link, date range filter |

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

- **Đây là PRD MVP đầy đủ** — bản gốc cho mọi phiên bản (Submit, Growth, Scale...).
- **Mục tiêu**: App order editing hoàn chỉnh đủ cho nhóm merchant đầu tiên sử dụng vui vẻ.
- **Chiến lược**: Build full MVP → rút gọn thành bản Submit (xem PRD Submit riêng) → pass review → bật lại full MVP.
- **Vấn đề**: Shopify không cho khách hàng tự chỉnh sửa đơn hàng — mọi thay đổi phải qua đội hỗ trợ.
- **Giải pháp**: App cho phép khách hàng tự sửa địa chỉ, đổi biến thể, thay đổi số lượng, hủy đơn. Merchant quản lý, chỉnh sửa đơn hàng, xem analytics, nhận notifications.
- **Đối tượng**: Merchant SMB trên Shopify (50-2.000 đơn/tháng).
- **Scope**: 14 features đầy đủ — app hoạt động end-to-end, merchant có đủ công cụ quản lý.

---

## 2. Personas & User Stories

### Personas

| Persona | Profile | Nhu cầu |
|---------|---------|---------|
| **Customer** | Khách mua hàng trên Shopify store | Tự sửa lỗi đơn hàng mà không cần email support |
| **Merchant** | Chủ cửa hàng Shopify, 50-2.000 đơn/tháng | Giảm ticket hỗ trợ, cấu hình quyền chỉnh sửa |

### User Stories (MVP Full — 14 stories)

| ID | User Story | Priority | Submit? |
|----|-----------|----------|---------|
| US-01 | Là **customer**, tôi muốn **chỉnh sửa địa chỉ giao hàng** sau khi đặt hàng, để gói hàng đến đúng nơi. | P0 | ✅ |
| US-02 | Là **customer**, tôi muốn **đổi biến thể sản phẩm** (size, color), để nhận đúng sản phẩm. | P0 | ✅ |
| US-03 | Là **customer**, tôi muốn **thay đổi số lượng** sản phẩm trước khi giao. | P0 | ✅ |
| US-04 | Là **customer**, tôi muốn **hủy đơn hàng** trong khung thời gian cho phép. | P0 | ✅ |
| US-05 | Là **customer**, tôi muốn **xem chênh lệch giá** trước khi xác nhận thay đổi. | P0 | ✅ |
| US-06 | Là **customer**, tôi muốn **truy cập chỉnh sửa từ Order Status Page + Thank You Page**. | P0 | ✅ (chỉ OSP) |
| US-07 | Là **merchant**, tôi muốn **cấu hình loại chỉnh sửa cho phép + khung thời gian**. | P0 | ✅ |
| US-08 | Là **merchant**, tôi muốn **xem dashboard** edits/cancels + revenue saved + analytics. | P0 | ✅ (basic) |
| US-09 | Là **merchant**, tôi muốn **xem danh sách orders** editable với filters/search. | P0 | |
| US-10 | Là **merchant**, tôi muốn **chỉnh sửa đơn hàng từ admin** (giống customer nhưng nhanh hơn). | P0 | |
| US-11 | Là **merchant**, tôi muốn **nhận email notification** khi customer edit/cancel đơn. | P0 | |
| US-12 | Là **customer**, tôi muốn **nhận email xác nhận** khi edit thành công. | P0 | |
| US-13 | Là **merchant**, tôi muốn **cấu hình widget** (text, color, vị trí). | P0 | ✅ (basic) |
| US-14 | Là **merchant**, tôi muốn **xem edit history/audit trail** cho mỗi order. | P0 | |

---

## 3. Product Solutions

### 3.1. Solution Overview

App gồm 2 phần:
- **Storefront**: Theme App Extension widget trên Order Status Page → mở Edit Portal cho customer
- **Admin**: Embedded Shopify Admin app (Polaris) → Settings + Dashboard

### 3.2. Scope

**TRONG scope (MVP Full):**

| # | Feature | Submit? | Lý do |
|---|---------|---------|-------|
| 1 | **Customer edit address** | ✅ | Core value — use case #1 |
| 2 | **Customer swap variant** | ✅ | Core value — use case #2 |
| 3 | **Customer change quantity** | ✅ | Core value — đi kèm swap |
| 4 | **Customer cancel order + auto refund/restock** | ✅ | Core value — giảm friction |
| 5 | **Widget Order Status Page** | ✅ | Entry point cho customer |
| 6 | **Widget Thank You Page** | | Thêm sau submit |
| 7 | **Admin Dashboard** (full: metrics + charts + recent activity) | ✅ basic | Charts thêm sau |
| 8 | **Admin Orders list** (filters, search, edit status) | | Thêm sau submit |
| 9 | **Admin Settings** (time window, edit types, notifications, widget) | ✅ basic | Full settings sau |
| 10 | **Merchant edit orders từ admin** | | Thêm sau submit |
| 11 | **Email notifications** (merchant + customer) | | Thêm sau submit |
| 12 | **Edit history / Audit trail** | | Thêm sau submit |
| 13 | **Quickstart** (3-step checklist nhúng trong Dashboard) | ✅ | First-time experience |
| 13b | **Helpdesk** (live chat card nhúng trong Dashboard) | ✅ | Support access |
| 14 | **Usage tracking + Billing** (Free/Starter/Growth) | | Submit FREE, billing sau |
| 15 | **GDPR webhooks** | ✅ | BẮT BUỘC |
| 16 | **App uninstall cleanup** | ✅ | BẮT BUỘC |
| 17 | **Transaction safety / idempotency** | ✅ | Tránh duplicate charge |

**NGOÀI scope (P1 — phát triển sau MVP):**
- Upsell/cross-sell trong edit flow
- Cancellation retention flow
- Store credit refund option
- Google address validation
- Shopify Flow integration
- Multi-language support (i18n)
- Custom edit rules per product/collection
- Monitoring + Error tracking (Sentry)

### 3.3. Chiến lược phiên bản

**MVP là bản gốc** — build đầy đủ, rút gọn thành Submit, sau khi pass → bật lại full MVP.

| Phiên bản | Scope | Mục tiêu |
|-----------|-------|----------|
| **Submit** | Features #1-5, #7(basic), #9(basic), #13, #15-17 | Pass Shopify review (FREE app) |
| **MVP** (bản này) | Tất cả 17 features | Merchant đầu tiên dùng vui vẻ |
| **P1** | + Upsell, Retention, i18n, Flow, Address validation | Competitive advantage |

**Sau khi Submit pass:**
1. Enable Orders page, Merchant editing, Email notifications
2. Add Billing/Pricing tiers (app update, không cần re-submit)
3. Full Dashboard với charts
4. → Đây chính là MVP

### 3.4. UI Flow

---

#### LUỒNG TỔNG QUAN — TẤT CẢ ENTRY POINTS

```
╔═══════════════════════════════════════════════════════════════════════╗
║                        CUSTOMER JOURNEY                              ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  ┌──────────────┐    ┌──────────────┐    ┌────────────────────────┐  ║
║  │ Shopify gửi  │───>│ Khách click  │───>│ ORDER STATUS PAGE      │  ║
║  │ email xác    │    │ "View your   │    │ (trang Shopify native) │  ║
║  │ nhận đơn hàng│    │  order"      │    │                        │  ║
║  └──────────────┘    └──────────────┘    │  ┌──────────────────┐  │  ║
║                                          │  │ WIDGET CỦA APP   │  │  ║
║                                          │  │ "Edit Your Order" │  │  ║
║                                          │  └────────┬─────────┘  │  ║
║                                          └───────────┼────────────┘  ║
║                                                      │               ║
║                                                      ▼               ║
║                                          ┌────────────────────────┐  ║
║                                          │ EDIT PORTAL            │  ║
║                                          │ (App Proxy page)       │  ║
║                                          │                        │  ║
║                                          │ ┌──────┐ ┌──────────┐ │  ║
║                                          │ │Sửa   │ │Đổi variant│ │  ║
║                                          │ │địa chỉ│ │Đổi số lượng│ │  ║
║                                          │ └──────┘ └──────────┘ │  ║
║                                          │ ┌──────────────────┐  │  ║
║                                          │ │  Hủy đơn hàng    │  │  ║
║                                          │ └──────────────────┘  │  ║
║                                          └────────────────────────┘  ║
╠═══════════════════════════════════════════════════════════════════════╣
║                        MERCHANT JOURNEY                              ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  ┌──────────────┐    ┌──────────────┐    ┌────────────────────────┐  ║
║  │ Shopify App  │───>│ Cài app      │───>│ DASHBOARD              │  ║
║  │ Store        │    │ (OAuth)      │    │ Set up guide + Metrics │  ║
║  └──────────────┘    └──────────────┘    │                        │  ║
║                                          │  ├─> Settings           │  ║
║                                          │  ├─> Orders (MVP)       │  ║
║                                          │  └─> Theme Editor       │  ║
║                                          └────────────────────────┘  ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

#### FLOW A: CUSTOMER — SỬA ĐƠN HÀNG (Chi tiết từng click)

```
BƯỚC 1: Khách nhận email
═══════════════════════
┌─────────────────────────────────┐
│  📧 Shopify Order Confirmation  │
│                                 │
│  "Your order #1234 is confirmed"│
│                                 │
│  [View your order]  ◄── CLICK   │
└────────────┬────────────────────┘
             │
             ▼
BƯỚC 2: Order Status Page (Shopify native + widget app)
═══════════════════════════════════════════════════════
┌────────────────────────────────────────────────┐
│  Order #1234 confirmed                         │
│  Thank you John!                               │
│                                                │
│  ┌────── WIDGET CỦA APP (Theme Extension) ──┐ │
│  │                                           │ │
│  │  ✏️ Need to make changes?                 │ │
│  │  You can edit within ⏱ 1h 45m             │ │
│  │                                           │ │
│  │  [Edit Your Order]  ◄── CLICK             │ │
│  │                                           │ │
│  └───────────────────────────────────────────┘ │
│                                                │
│  📦 Shipping to: John, 123 Main St...         │
│  🗺️ [Map tracking...]                         │
└────────────┬───────────────────────────────────┘
             │
             ▼
BƯỚC 3: Edit Portal (App Proxy page — trang của app)
════════════════════════════════════════════════════
┌────────────────────────────────────────────────┐
│  Edit Order #1234                 ⏱ 1h 45m    │
│                                                │
│  ┌── SHIPPING ADDRESS ────────────────────┐   │
│  │  📍 John Doe                           │   │
│  │  123 Main Street, New York, NY 10001   │   │
│  │                              [Change] ◄── CLICK để sửa địa chỉ
│  └────────────────────────────────────────┘   │
│                                                │
│  ┌── ORDER ITEMS ─────────────────────────┐   │
│  │  🖼 T-Shirt (M, Black)     $29.99     │   │
│  │     Qty: [-] [1] [+] ◄── CLICK +/-    │   │
│  │                        [Swap] ◄── CLICK để đổi variant
│  │                                        │   │
│  │  🖼 Jeans (32, Blue)       $49.99     │   │
│  │     Qty: [-] [1] [+]         [Swap]   │   │
│  └────────────────────────────────────────┘   │
│                                                │
│  Total: $79.98                                │
│                                                │
│  [Cancel Order] ◄── CLICK     [Review Changes] ◄── CLICK
│       │                              │         │
└───────┼──────────────────────────────┼─────────┘
        │                              │
        ▼                              ▼
   Đi tới FLOW D                  Đi tới BƯỚC 6
   (Hủy đơn)                     (Review & Confirm)
```

**Bước 3a: Click [Change] → Sửa địa chỉ (inline form)**
```
┌── SHIPPING ADDRESS ── (đang sửa) ────────────┐
│  📍 Edit Shipping Address                      │
│                                                │
│  First Name: [John        ] Last: [Doe       ] │
│  Address:    [123 Main Street               ]  │
│  Address 2:  [                              ]  │
│  City:       [New York    ] State: [NY     ▼]  │
│  Zip:        [10001       ] Country: [US   ▼]  │
│  Phone:      [+1 555-0123                   ]  │
│                                                │
│  [Cancel]              [Save Address] ◄── CLICK│
└────────────────────────────────────────────────┘
             │
             ▼
  Quay lại Edit Portal với địa chỉ mới hiển thị
  Price summary cập nhật (thuế có thể thay đổi)
```

**Bước 3b: Click [Swap] → Đổi variant (modal/drawer)**
```
BƯỚC 4: Swap Variant
═════════════════════
┌────────────────────────────────────────────────┐
│  Swap: T-Shirt                                 │
│  Current: M, Black — $29.99                    │
│                                                │
│  Size:   [S] [M●] [L] [XL]  ◄── CLICK chọn   │
│  Color:  [Black●] [White] [Red]  ◄── CLICK    │
│                                                │
│  ⚠️ Red / XL — Out of stock (disabled)        │
│                                                │
│  New: L, White — $34.99                        │
│  Price diff: +$5.00                            │
│                                                │
│  [Cancel]              [Apply Change] ◄── CLICK│
└────────────────────────────────────────────────┘
             │
             ▼
  Quay lại Edit Portal
  Line item cập nhật: "T-Shirt (L, White) $34.99"
  Price summary cập nhật: +$5.00
```

**Bước 3c: Click [+] hoặc [-] → Đổi số lượng (inline)**
```
BƯỚC 5: Change Quantity
═══════════════════════
  Qty: [-] [1] [+]  ◄── Click [+]
         │
         ▼
  Qty: [-] [2] [+]    ← Cập nhật ngay, giá tổng thay đổi
                         Price summary: +$49.99

  Nếu click [-] xuống 0:
  → Hiện confirm: "Remove this item? (Suggest cancel if last item)"
```

```
BƯỚC 6: Review & Confirm (sau khi thay đổi xong, click [Review Changes])
═════════════════════════════════════════════════════════════════════════
┌────────────────────────────────────────────────┐
│  Review Your Changes                           │
│                                                │
│  📍 Address changed                            │
│     123 Main St → 456 Oak Ave, Brooklyn        │
│                                                │
│  🔄 T-Shirt swapped                            │
│     M, Black → L, White (+$5.00)               │
│                                                │
│  📦 Jeans quantity changed                      │
│     x1 → x2 (+$49.99)                          │
│                                                │
│  ┌─────────────────────────────────────────┐   │
│  │  Original total:    $79.98              │   │
│  │  Changes:           +$54.99             │   │
│  │  Tax adjustment:    +$4.40              │   │
│  │  ─────────────────────────────          │   │
│  │  New total:         $139.37             │   │
│  │  ⚠️ Additional charge: +$59.39         │   │
│  │  Payment: Visa ending 4242             │   │
│  └─────────────────────────────────────────┘   │
│                                                │
│  [Go Back] ◄── quay Edit Portal                │
│                   [Confirm Changes] ◄── CLICK  │
└────────────────────────┬───────────────────────┘
                         │
                         ▼
BƯỚC 7: Success
═══════════════
┌────────────────────────────────────────────────┐
│                                                │
│  ✅ Order Updated Successfully!                 │
│                                                │
│  Order #1234 has been updated.                 │
│  A confirmation email has been sent.           │
│                                                │
│  Changes applied:                              │
│  • Address updated                             │
│  • T-Shirt: M Black → L White                  │
│  • Jeans: x1 → x2                              │
│  • Additional charge: $59.39                   │
│                                                │
│  [View Updated Order] ◄── quay lại OSP         │
│                                                │
└────────────────────────────────────────────────┘
```

---

#### FLOW B: CUSTOMER — HỦY ĐƠN HÀNG (Chi tiết từng click)

```
Từ Edit Portal, click [Cancel Order]
            │
            ▼
BƯỚC 1: Chọn lý do
═══════════════════
┌────────────────────────────────────────────────┐
│  Cancel Order #1234                            │
│                                                │
│  Why do you want to cancel?                    │
│                                                │
│  ( ) I ordered the wrong item     ◄── CLICK   │
│  ( ) Found a better price elsewhere            │
│  ( ) I no longer need this                     │
│  ( ) Shipping takes too long                   │
│  ( ) Other: [_______________]                  │
│                                                │
│  [Back to Edit] ◄──          [Continue] ◄──    │
└──────────────────────────────────┬─────────────┘
                                   │
                                   ▼
BƯỚC 2: Xác nhận hủy
═════════════════════
┌────────────────────────────────────────────────┐
│  Are you sure?                                 │
│  This action cannot be undone.                 │
│                                                │
│  ┌─────────────────────────────────────────┐   │
│  │  Refund amount:    $79.98               │   │
│  │  Payment method:   Visa ending 4242     │   │
│  │  Refund timeline:  5-10 business days   │   │
│  └─────────────────────────────────────────┘   │
│                                                │
│  [Keep My Order] ◄── quay lại Edit Portal      │
│                     [Cancel Order] ◄── CLICK   │
│                     (nút đỏ, destructive)      │
└──────────────────────────────────┬─────────────┘
                                   │
                                   ▼
BƯỚC 3: Hủy thành công
═══════════════════════
┌────────────────────────────────────────────────┐
│                                                │
│  ❌ Order #1234 Cancelled                       │
│                                                │
│  Your order has been cancelled.                │
│  Refund of $79.98 will be processed            │
│  within 5-10 business days.                    │
│                                                │
│  [Continue Shopping] ◄── link về store          │
│                                                │
└────────────────────────────────────────────────┘
```

---

#### FLOW C: MERCHANT — CÀI ĐẶT APP LẦN ĐẦU (Chi tiết từng click)

```
BƯỚC 1: Cài app
════════════════
Shopify App Store → Tìm "Avada Order Editing" → [Install] ◄── CLICK
    │
    ▼
BƯỚC 2: OAuth
═════════════
┌────────────────────────────────────────────────┐
│  Avada Order Editing wants to access:          │
│                                                │
│  ✓ View and manage orders                      │
│  ✓ View products                               │
│  ✓ Manage inventory                            │
│                                                │
│  [Install app] ◄── CLICK                       │
└────────────────────────┬───────────────────────┘
                         │
                         ▼
BƯỚC 3: Dashboard (lần đầu — Set up guide expanded)
════════════════════════════════════════════════════
┌────────────────────────────────────────────────────────────┐
│  Avada Order Editing                                       │
│  [Dashboard●]  [Orders]  [Settings]                        │
│                                                            │
│  Hi [Shop Name]                                            │
│  Welcome to Avada Order Editing                            │
│                                                            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │ Edits 0 │ │ Cancel 0│ │  0/50   │ │ $0 saved│        │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│                                                            │
│  ┌─ Set up guide ──────────────────────────── ^ ✕ ─┐      │
│  │  0 of 4 tasks complete [░░░░░░░░░░░░░░]         │      │
│  │                                                  │      │
│  │  ┌────────────────────────────────────────────┐  │      │
│  │  │ ☐ Configure order editing feature          │  │      │
│  │  │   Choose which changes customers can make  │  │      │
│  │  │   [Configure Now] ◄── CLICK                │  │      │
│  │  └────────────────────────────────────────────┘  │      │
│  │  ☐ Select plan                                   │      │
│  │  ☐ Add order editing widget                      │      │
│  │  ☐ Test an order edit                            │      │
│  └──────────────────────────────────────────────────┘      │
│                                                            │
│  Recent Activity: No activity yet                          │
│                                                            │
│  ┌── Helpdesk ──────────────────────────────────────┐      │
│  │  Our support team is ready to help.              │      │
│  │  [Chat with us] ◄── CLICK mở live chat           │      │
│  └──────────────────────────────────────────────────┘      │
└────────────────────────────────────────────────────────────┘
                         │
        Click [Configure Now]
                         │
                         ▼
BƯỚC 4: Settings page
═════════════════════
┌────────────────────────────────────────────────────────────┐
│  Settings                                      [Save]      │
│                                                            │
│  Edit Time Window                                          │
│  Allow edits for: [2 hours ▼] ◄── CHỌN thời gian          │
│                                                            │
│  Allowed Edit Types                                        │
│  ☑ Edit shipping address  ◄── BẬT/TẮT                    │
│  ☑ Swap product variants  ◄── BẬT/TẮT                    │
│  ☑ Change quantity        ◄── BẬT/TẮT                    │
│  ☑ Cancel order           ◄── BẬT/TẮT                    │
│                                                            │
│  Widget Display                                            │
│  ☑ Show on Order Status Page                              │
│  Primary color: [#2D9D78] ◄── CHỌN màu                   │
│                                                            │
│  [Save] ◄── CLICK                                          │
│  → Toast: "Settings saved successfully" ✅                  │
│  → Set up guide Step 1 auto-check ✅                        │
└────────────────────────────────────────────────────────────┘
                         │
        Click sidebar [Dashboard] quay lại
                         │
                         ▼
BƯỚC 5: Set up guide — Step 2 "Select plan"
═══════════════════════════════════════════
(Bản Submit: Free only → auto-check ngay)
→ Set up guide Step 2 auto-check ✅
→ Progress bar: 2 of 4 complete
                         │
        Click step 3 "Add order editing widget"
                         │
                         ▼
BƯỚC 6: Theme Editor (Shopify native)
═════════════════════════════════════
Click [Open Theme Editor] trong Set up guide
    │
    ▼
┌────────────────────────────────────────────────────────────┐
│  Shopify Theme Customizer                                  │
│                                                            │
│  Sections → Order Status Page                              │
│  → [+ Add block] ◄── CLICK                                │
│  → Tìm "Avada Order Editing Widget" ◄── CLICK             │
│  → [Save] ◄── CLICK                                       │
│                                                            │
│  → Set up guide Step 3 auto-check ✅                        │
│  → Progress bar: 3 of 4 complete                           │
└────────────────────────────────────────────────────────────┘
                         │
        Quay lại app Dashboard
                         │
                         ▼
BƯỚC 7: Test an order edit
══════════════════════════
Click [Create Test Order] trong Set up guide
    │
    ▼
  Merchant tạo 1 test order trên dev store
  → Mở email confirmation → click "View your order"
  → Thấy widget → thử edit
  → Quay lại Dashboard → thấy activity mới
  → Set up guide Step 4 auto-check ✅
  → Progress bar: 4 of 4 complete 🎉
  → Banner: "You're all set!" → auto-hide
```

---

#### FLOW D: MERCHANT — SỬ DỤNG HÀNG NGÀY (Sau khi setup xong)

```
BƯỚC 1: Mở app
═══════════════
Shopify Admin sidebar → Apps → Avada Order Editing
    │
    ▼
BƯỚC 2: Dashboard
═════════════════
┌────────────────────────────────────────────────────────────┐
│  Hi [Shop Name]                                            │
│                                                            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │ Edits   │ │ Cancels │ │ Remaining│ │ Saved   │        │
│  │  12     │ │   2     │ │ 38/50   │ │ $470    │        │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│                                                            │
│  ┌── Support tickets avoided: 148 ── Orders canceled: 5 ─┐│
│                                                            │
│  Recent Activity                              [View all]   │
│  #1234 — 📍 Address changed — 2m ago          [Address]   │
│  #1230 — 🔄 Variant swapped — 15m ago         [Swap]     │
│  #1228 — ❌ Cancelled — 1h ago                 [Cancel]   │
│                                                            │
│  [View all] ◄── CLICK → Orders page (MVP)                 │
│                                                            │
│  ┌── Helpdesk ─────────────────────────────────────────┐  │
│  │  [Chat with us] ◄── CLICK mở live chat              │  │
│  └─────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

---

#### FLOW TỔNG HỢP — MỘT TRANG NHÌN TẤT CẢ

```
                    ┌──────────────┐
                    │ SHOPIFY APP  │
                    │ STORE        │
                    └──────┬───────┘
                           │ Install
                           ▼
                    ┌──────────────┐
                    │ OAuth Screen │
                    └──────┬───────┘
                           │ Authorize
                           ▼
              ┌────────────────────────────┐
              │      ADMIN DASHBOARD       │
              │  (Metrics + Set up guide   │
              │   + Activity + Helpdesk)   │
              └─────┬──────────┬───────────┘
                    │          │
           ┌────────┘          └────────┐
           ▼                            ▼
    ┌──────────────┐            ┌──────────────┐
    │  SETTINGS    │            │  ORDERS LIST │
    │  (Time window│            │  (MVP)       │
    │   Edit types │            └──────┬───────┘
    │   Widget)    │                   │
    └──────────────┘                   ▼
                                ┌──────────────┐
                                │ ORDER DETAIL │
                                │ + Edit History│
                                │ (MVP)        │
                                └──────────────┘


═══════════════════════════════════════════════════

    CUSTOMER SIDE (bên khách hàng):

    ┌───────────┐     ┌──────────────────┐     ┌──────────────┐
    │  Shopify  │────>│  ORDER STATUS    │────>│  EDIT PORTAL │
    │  Email    │     │  PAGE + Widget   │     │  (App Proxy) │
    └───────────┘     └──────────────────┘     └──────┬───────┘
                                                      │
                              ┌────────────┬──────────┼──────────┐
                              │            │          │          │
                              ▼            ▼          ▼          ▼
                        ┌──────────┐ ┌──────────┐ ┌──────┐ ┌────────┐
                        │  Sửa     │ │  Đổi     │ │ Đổi  │ │  Hủy   │
                        │  Địa chỉ │ │  Variant │ │ Qty  │ │  Đơn   │
                        └────┬─────┘ └────┬─────┘ └──┬───┘ └───┬────┘
                             │            │          │         │
                             └────────────┼──────────┘         │
                                          ▼                    ▼
                                   ┌──────────────┐    ┌──────────────┐
                                   │  REVIEW &    │    │  Chọn lý do  │
                                   │  CONFIRM     │    │  → Xác nhận  │
                                   └──────┬───────┘    └──────┬───────┘
                                          │                   │
                                          ▼                   ▼
                                   ┌──────────────┐    ┌──────────────┐
                                   │  SUCCESS     │    │  HỦY THÀNH   │
                                   │  Đơn đã sửa  │    │  CÔNG + Refund│
                                   └──────────────┘    └──────────────┘
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
Mở app → Dashboard (metrics + charts + recent activity)
       → Orders (list + filters + edit modal)
       → Settings (time window, edit types, notifications, widget, billing)
```

**Màn hình 7: Admin Dashboard**

```
┌───────────────────────────────────────────────────────────┐
│  Hi [Shop Name]                                           │
│  Welcome to Avada Order Editing                           │
│                                                           │
│  📅 Last 30 days                                          │
│                                                           │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────┐│
│  │ Total      │ │ Total      │ │ Edits      │ │ Est.   ││
│  │ Edits      │ │ Cancels    │ │ Remaining  │ │ Saved  ││
│  │            │ │            │ │            │ │        ││
│  │    47      │ │     5      │ │   38/50    │ │ $470   ││
│  └────────────┘ └────────────┘ └────────────┘ └────────┘│
│                                                           │
│  ┌───────────────────────────────────────────── ··· ^─┐  │
│  │  Quickstart                      2 / 3 completed   │  │
│  │                                                    │  │
│  │  ✅ Configure edit settings                        │  │
│  │  ✅ Enable widget on your store                    │  │
│  │  ☐  Test an order edit                             │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  Edit portal link                                         │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Order Status Page  Widget enabled ✅       [📋]  │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  Recent Activity                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  #1234 — 📍 Address changed        — 2m ago       │  │
│  │  #1230 — 🔄 Variant swapped        — 15m ago      │  │
│  │  #1228 — ❌ Cancelled               — 1h ago       │  │
│  │  #1225 — 📦 Quantity changed        — 3h ago       │  │
│  │                                                    │  │
│  │                           [View all activity →]    │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Helpdesk                                          │  │
│  │  Our support team is ready to help with our        │  │
│  │  in-app live chat.                                 │  │
│  │  [💬 Chat with us]                                 │  │
│  └────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
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

**Màn hình 9: Set up guide (nhúng trong Dashboard)**

Set up guide là card nằm ngay trong Dashboard, theo mô hình accordion -- chỉ 1 step expanded tại 1 thời điểm. Có progress bar trực quan.

```
┌────────────────────────────────────────── ^ ✕─┐
│  Set up guide                                  │
│  Use this personalized guide to get Order      │
│  Editing up and running.                       │
│                                                │
│  2 of 4 tasks complete  [████████░░░░░░░]      │
│                                                │
│  ┌──────────────────────────────────────────┐  │
│  │ ✅ Configure order editing feature       │  │
│  │                                          │  │
│  │    Choose which order changes customers  │  │
│  │    are allowed to make, such as quantity │  │
│  │    updates, item swaps, address changes. │  │
│  │                                          │  │
│  │    [Configure Now]        [Preview img]  │  │
│  └──────────────────────────────────────────┘  │
│                                                │
│  ✅ Select plan                                │
│                                                │
│  ☐  Add order editing widget                   │
│                                                │
│  ☐  Test an order edit                         │
└────────────────────────────────────────────────┘
```

| Element | Mô tả |
|---------|-------|
| Title | "Set up guide" |
| Subtitle | "Use this personalized guide to get Order Editing up and running." |
| Progress bar | "X of 4 tasks complete" + visual bar |
| `^` button | Collapse/expand toàn bộ card |
| `✕` button | Dismiss — ẩn vĩnh viễn, lưu `onboardingDismissed: true` |
| **Step 1: Configure order editing feature** | Auto-check khi merchant lưu Settings lần đầu. Expanded: mô tả + preview image + "Configure Now" button → link Settings |
| **Step 2: Select plan** | Auto-check khi merchant chọn plan (Submit: auto-check vì Free). Expanded: mô tả + "View Plans" button |
| **Step 3: Add order editing widget** | Auto-check khi theme extension block activated. Expanded: mô tả + preview widget image + "Open Theme Editor" button |
| **Step 4: Test an order edit** | Auto-check khi có 1+ record trong orderEdits. Expanded: mô tả + "Create Test Order" button |
| Accordion | Click step → expand step đó, collapse các step khác |
| Khi 4/4 completed | Hiện banner "You're all set!" → auto-hide sau |
| Dismiss (✕) | Lưu `onboardingDismissed: true` → không hiện lại |

**Hành vi:**
- Set up guide hiện **phía trên** Recent Activity, **phía dưới** secondary metrics
- Mới cài app → card expanded, step 1 mở rộng mặc định
- Click step → accordion: mở step đó, đóng step khác
- Step completed có icon ✅ (filled green circle + checkmark)
- Step chưa completed có icon ☐ (dashed circle)
- Đã hoàn thành 4/4 hoặc dismiss (✕) → card ẩn
- Merchant quay lại sau khi dismiss → không hiện lại (trừ khi reinstall)

---

**Màn hình 10: Helpdesk (nhúng trong Dashboard)**

Helpdesk là card cố định ở cuối Dashboard, luôn hiện.

```
┌────────────────────────────────────────────┐
│  Helpdesk                                  │
│  Our support team is ready to help with    │
│  our in-app live chat.                     │
│  [Chat with us]                            │
└────────────────────────────────────────────┘
```

| Element | Mô tả |
|---------|-------|
| Title | "Helpdesk" |
| Description | "Our support team is ready to help with our in-app live chat." |
| Button | "Chat with us" → mở Crisp/Tidio/Intercom chat widget (tùy team chọn) |
| Vị trí | Luôn ở cuối Dashboard, sau Recent Activity |
| Hiển thị | Luôn hiện (không dismiss được) |

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
| Welcome header | Text | Y | "Hi [Shop Name]" | Greeting + app name | — |
| Date range filter | Select | Y | "Last 30 days" | Lọc metrics theo khoảng thời gian | — |
| Total Edits | Metric | Y | 0 | Tổng lượt sửa trong khoảng thời gian | — |
| Total Cancels | Metric | Y | 0 | Tổng lượt hủy trong khoảng thời gian | — |
| Edits Remaining | Metric | Y | 50 | X/50 free plan (tháng hiện tại) | — |
| Est. Saved | Metric | Y | $0 | Ước tính tiết kiệm = edits × $10/ticket | — |
| Quickstart card | Card | N | Expanded | 3-step checklist, hiện cho new merchants | Ẩn khi 3/3 hoặc dismiss |
| Quickstart step 1 | Checkbox | Y | unchecked | "Configure edit settings" → link Settings | Auto-check khi settings saved |
| Quickstart step 2 | Checkbox | Y | unchecked | "Enable widget on your store" → link Theme Editor | Auto-check khi widget active |
| Quickstart step 3 | Checkbox | Y | unchecked | "Test an order edit" → link tạo test order | Auto-check khi có 1+ orderEdit |
| Quickstart `···` | Menu | Y | — | "Dismiss quickstart" | Lưu onboardingDismissed |
| Quickstart `^` | Toggle | Y | Expanded | Collapse/expand | — |
| Edit portal link | Card | Y | — | Trạng thái widget: "Widget enabled ✅" hoặc "Widget not enabled ⚠️" | — |
| Recent activity | List | Y | — | 10 items, mỗi item: order #, icon loại, mô tả, thời gian | — |
| View all activity | Link | Y | — | Đi đến Orders page (MVP) | — |
| Helpdesk card | Card | Y | — | Luôn hiện ở cuối dashboard | — |
| Helpdesk button | Button | Y | "Chat with us" | Mở live chat widget (Crisp/Tidio/Intercom) | — |

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

☐ Dashboard: welcome header "Hi [Shop Name]"
☐ Dashboard: date range filter (Last 30 days default)
☐ Dashboard: 4 metric cards — Total Edits, Total Cancels, Edits Remaining (X/50), Est. Saved ($)
☐ Dashboard: Edit portal link — hiện trạng thái widget (enabled/not enabled)
☐ Dashboard: recent activity list (10 items) với icon theo loại edit + "View all activity" link
☐ Dashboard: Set up guide card hiện khi chưa hoàn thành 4 bước
☐ Set up guide: progress bar "X of 4 tasks complete" cập nhật đúng
☐ Set up guide: accordion — click step expand, collapse step khác
☐ Step 1 "Configure order editing feature" → auto-check khi settings saved, expanded có mô tả + preview + CTA
☐ Step 2 "Select plan" → auto-check khi plan đã chọn (Free = auto-check)
☐ Step 3 "Add order editing widget" → auto-check khi theme extension active, expanded có preview widget
☐ Step 4 "Test an order edit" → auto-check khi có 1+ order edit record
☐ Set up guide: dismiss (✕) → ẩn vĩnh viễn, lưu onboardingDismissed
☐ Set up guide: collapse/expand (▲) toàn bộ card hoạt động
☐ Set up guide: khi 4/4 → hiện "You're all set!" → auto-hide sau
☐ Helpdesk card luôn hiện ở cuối dashboard
☐ Helpdesk "Chat with us" → mở live chat widget
☐ Settings: configure time window, edit types, widget display
☐ Settings save → toast "Settings saved"
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

## Timeline ước tính

### Phase 1: Submit (Tuần 1-6) — Rút gọn từ MVP
| Tuần | Việc | Output |
|------|------|--------|
| 1 | Foundation: monorepo, auth, OAuth, repositories | Backend skeleton |
| 2 | Edit engine: eligibility, edit API, cancel, refund | Core APIs working |
| 3 | Storefront: theme extension widget + edit page (Preact) | Customer flow done |
| 4 | Admin: dashboard (basic) + settings + onboarding (Polaris) | Merchant flow done |
| 5 | GDPR, uninstall cleanup, error handling, testing | App Store ready |
| 6 | App listing, screenshots, video → **SUBMIT FREE** | Submitted |

### Phase 2: MVP Full (Tuần 7-8) — Trong lúc chờ + sau approval
| Tuần | Việc | Output |
|------|------|--------|
| 7 | Orders page + Merchant editing + Edit history | Admin full |
| 8 | Email notifications + Billing + Dashboard charts | MVP complete |

**Tổng: ~6 tuần submit + ~2 tuần hoàn thiện MVP = 8 tuần đến MVP full.**

---

**Version**: 4.0
**Updated**: 2026-04-13
**Status**: Submit-First PRD
