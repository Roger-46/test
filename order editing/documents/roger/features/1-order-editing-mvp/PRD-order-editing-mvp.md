# Avada Order Editing — PRD MVP (Full)

**Link task Jira:** SB-10644

### Task List

| Ticket | Link | Status |
|--------|------|--------|
| SB-10644 | [Link](http://space.avada.net/browse/SB-10644) | In Progress |
| SB-10797 | [Link](http://space.avada.net/browse/SB-10797) | Doing |
| SB-11174 | [Link](http://space.avada.net/browse/SB-11174) | To Do (DEV task — Cương) |

### History

| Phiên bản | Ngày | Tác giả | Loại | Mô tả |
|-----------|------|---------|------|-------|
| 1.0 | 01/04/2026 | Roger | A | Tạo mới PRD MVP |
| 2.0 | 07/04/2026 | Roger | M | Viết lại — phiên bản submit-first |
| 3.0 | 08/04/2026 | Roger | M | Restore full MVP scope — MVP là bản gốc, Submit rút gọn từ đây |
| 4.0 | 13/04/2026 | Roger | M | Dashboard: thêm Quickstart (3-step), Helpdesk, 4 metric cards, portal link, date range filter |
| 5.0 | 17/04/2026 | Roger | M | Sync PRD theo UI: inline edit trên OSP (bỏ Edit Portal riêng), Dashboard 2 metrics, Quickstart 3 steps, Orders→Activity, Settings thêm max edits/notifications, bỏ tags storefront, bỏ widget/color settings |
| 6.0 | 24/04/2026 | Roger | M | **Settings revamp**: (1) swap layout — Allowed Edit Types ↑ / Edit Limits / Notifications; (2) Edit Limits: bỏ dropdown, đổi sang checkbox "Allow edits for" + 2 input hours/minutes, default OFF; (3) giữ `Maximum edits per order` (checkbox + number input, default OFF = unlimited) — **count theo session-based** (1 session = multiple saves trong 5 phút); (4) Notifications: 2 checkbox → radio group `notificationLevel` (`"all"` default / `"cancel_only"`). **Email delivery hybrid**: cancel event gửi ngay, edit events debounce 5 phút (reset mỗi save), max-wait cap 10 phút. 1 session = 1 email = +1 vào maxEdits count. **Email template đơn giản hóa**: giữ header + summary + before/after diff + 1 CTA "View order in Shopify"; bỏ secondary CTA, footer, "No action required", refund box. **Thêm UI spec page**: Email Notifications (triggers, placeholders, design rules, edge cases). **Data model**: thêm `timeWindowEnabled/Hours/Minutes`, `maxEditsEnabled/PerOrder`, `notificationLevel`; `orderEdits` thêm session fields (`sessionId`, `sessionStartAt`, `sessionLastActionAt`, `sessionStatus`, `actions[]`, `emailSentAt`). **Branding**: đồng bộ "Avada Order Editing" toàn bộ. |
| 6.1 | 24/04/2026 | Roger | A | Thêm section **3.8. Business Logic — Edit Session, Email Delivery, Max Edits Counting** — document chi tiết 5 sub-sections: (1) Session state machine + rules; (2) Email hybrid delivery table + flow diagram; (3) Max edits session-based counting + hit-limit behavior; (4) Activity page session display (active vs completed); (5) Technical implementation notes (cron, concurrency, webhook). |
| 6.2 | 24/04/2026 | Roger | M | **Đổi session logic từ debounce → fixed window**: 5 phút cố định tính từ save đầu, KHÔNG reset khi có save thêm. Bỏ "max-wait cap 10 phút" (không cần). Bỏ field `sessionLastActionAt` khỏi `orderEdits` schema. Update section 3.8 (state machine, email flow, cron query), email spec page, edge cases. Save thêm sau 5 phút → session mới = +1 count + 1 email mới. |
| 6.3 | 24/04/2026 | Roger | M | **Activity page**: đổi column "Date" → **"Last updated"** (rõ ràng hơn, match industry standard GitHub/Jira). Clarify behavior: column update realtime trong session active = timestamp `lastActionAt` của action cuối; frozen khi session đóng. **Thêm lại field `lastActionAt` vào `orderEdits` schema** (chỉ dùng cho display, KHÔNG ảnh hưởng session timing — session vẫn đóng đúng 5 phút từ `sessionStartAt`). Update 2 ASCII mockups + fields table + section 3.8.4 + UI HTML + acceptance criteria. |

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
- **Scope**: 16 items active (2 deferred sang epic edit-products) — app hoạt động end-to-end, merchant có đủ công cụ quản lý.

---

## 2. Personas & User Stories

### Personas

| Persona | Profile | Nhu cầu |
|---------|---------|---------|
| **Customer** | Khách mua hàng trên Shopify store | Tự sửa lỗi đơn hàng mà không cần email support |
| **Merchant** | Chủ cửa hàng Shopify, 50-2.000 đơn/tháng | Giảm ticket hỗ trợ, cấu hình quyền chỉnh sửa |

### User Stories (MVP Full — 16 stories tổng, 13 active + 3 deferred)

| ID | User Story | Priority |
|----|-----------|----------|
| US-01 | Là **customer**, tôi muốn **chỉnh sửa địa chỉ giao hàng** sau khi đặt hàng, để gói hàng đến đúng nơi. | P0 |
| ~~US-02~~ | ~~Đổi biến thể sản phẩm~~ | **Deferred** → [edit-products](../edit-products/PRD-edit-products.md) |
| ~~US-03~~ | ~~Thay đổi số lượng~~ | **Deferred** → [edit-products](../edit-products/PRD-edit-products.md) |
| US-04 | Là **customer**, tôi muốn **hủy đơn hàng** trong khung thời gian cho phép. | P0 |
| US-05 | Là **customer**, tôi muốn **xem chênh lệch giá** trước khi xác nhận thay đổi. | P0 |
| US-06 | Là **customer**, tôi muốn **truy cập chỉnh sửa từ Order Status Page + Thank You Page**. | P0 |
| US-07 | Là **merchant**, tôi muốn **cấu hình loại chỉnh sửa cho phép + khung thời gian**. | P0 |
| US-08 | Là **merchant**, tôi muốn **xem dashboard** edits/cancels + revenue saved + analytics. | P0 |
| US-09 | Là **merchant**, tôi muốn **xem lịch sử activity** (edit/cancel) với chi tiết thay đổi. | P0 |
| US-10 | Là **merchant**, tôi muốn **chỉnh sửa đơn hàng từ admin** (swap, qty, address, add/remove items, cancel). | P0 |
| US-11 | Là **merchant**, tôi muốn **nhận email notification** khi customer edit/cancel đơn. | P0 |
| US-12 | Là **customer**, tôi muốn **nhận email xác nhận** khi edit thành công. | P0 |
| ~~US-13~~ | ~~Cấu hình widget (text, color, vị trí)~~ | **Deferred** → P1 |
| US-14 | Là **merchant**, tôi muốn **xem edit history/audit trail** cho mỗi order. | P0 |
| US-15 | Là **customer/merchant**, tôi muốn **thêm/sửa order note**, để ghi chú yêu cầu đặc biệt cho đơn hàng. | P0 |
| US-16 | Là **merchant**, tôi muốn **thêm/sửa order tags** từ admin, để phân loại và quản lý đơn hàng dễ hơn. | P0 |

> **US-15 (Note)**: Cả customer và merchant đều có thể chỉnh sửa. Merchant có toggle bật/tắt quyền note cho customer trong Settings.
> **US-16 (Tags)**: Chỉ merchant edit từ admin. Customer không edit tags trên storefront (MVP).

---

## 3. Product Solutions

### 3.1. Solution Overview

App gồm 2 phần:
- **Storefront**: Theme App Extension block trên Order Status Page (New Customer Accounts). Edit options hiển thị **inline** dạng accordion — click để expand form, save ngay mỗi action (không có Edit Portal riêng, không có Review & Confirm).
- **Admin**: Embedded Shopify Admin app (Polaris) gồm 3 trang: **Dashboard** (metrics + quickstart), **Activity** (edit log), **Settings** (time window, edit types, notifications).

### 3.2. Scope

**TRONG scope (MVP Full):**

| # | Feature | Lý do |
|---|---------|-------|
| 1 | **Customer edit address** | Core value — use case #1 |
| ~~2~~ | ~~Customer swap variant~~ | **Deferred** → [edit-products](../edit-products/PRD-edit-products.md) |
| ~~3~~ | ~~Customer change quantity~~ | **Deferred** → [edit-products](../edit-products/PRD-edit-products.md) |
| 4 | **Customer cancel order + auto refund/restock** | Core value — giảm friction |
| 5 | **Widget Order Status Page + Thank You Page** | Entry point cho customer |
| 6 | **Order note** (customer + merchant) | Ghi chú đặc biệt cho đơn hàng. MC có toggle bật/tắt cho KH |
| 7 | **Order tags** (merchant-only) | Phân loại đơn hàng. Chỉ MC edit từ admin |
| 8 | **Admin Dashboard** (greeting, date filter, 2 metrics, quickstart, helpdesk) | Trang chính merchant |
| 9 | **Admin Activity page** (table edit log + detail modals) | Lịch sử thay đổi |
| 10 | **Merchant edit orders từ admin** (address, note, tags, cancel) | Edit từ Shopify Order page |
| 11 | **Admin Settings** (time window, max edits, edit types, notifications) | Cấu hình app |
| 12 | **Email notifications** (merchant) | Email MC khi customer edit/cancel |
| 13 | **Edit history / Audit trail** | Theo dõi ai edit gì, lúc nào (qua Activity page) |
| 14 | **Quickstart** (3-step: configure → enable app → add widget) | First-time experience |
| 15 | **Helpdesk** (live chat card trong Dashboard) | Support access |
| 16 | **GDPR webhooks** | BẮT BUỘC |
| 17 | **App uninstall cleanup** | BẮT BUỘC |
| 18 | **Transaction safety / idempotency** | Tránh duplicate charge |

**NGOÀI scope (P1 — phát triển sau MVP):**
- Widget customization (text, color, position)
- Customer edit tags on storefront
- Customer email notification on edit
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
| **Submit** | Features #1-6, #8(basic), #9(basic), #11, #14-18 | Pass Shopify review (FREE app) |
| **MVP** (bản này) | Tất cả 18 features | Merchant đầu tiên dùng vui vẻ |
| **P1** | + Widget customization, Customer tags, Upsell, Retention, i18n, Flow, Address validation | Competitive advantage |

**Sau khi Submit pass:**
1. Enable Activity page, Merchant editing, Email notifications
2. Add Billing/Pricing tiers (app update, không cần re-submit)
3. → Đây chính là MVP

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
║  │ email xác    │    │ "View your   │    │ (New Customer Accounts)│  ║
║  │ nhận đơn hàng│    │  order"      │    │                        │  ║
║  └──────────────┘    └──────────────┘    │  ┌──────────────────┐  │  ║
║                                          │  │ BLOCK APP INLINE │  │  ║
║                                          │  │ "Edit your order" │  │  ║
║                                          │  │                   │  │  ║
║                                          │  │ 📍 Edit address ▶│  │  ║
║                                          │  │ 📝 Add note     ▶│  │  ║
║                                          │  │ ❌ Cancel order  ▶│  │  ║
║                                          │  │                   │  │  ║
║                                          │  │ Click → expand   │  │  ║
║                                          │  │ form → Save ngay │  │  ║
║                                          │  └──────────────────┘  │  ║
║                                          └────────────────────────┘  ║
╠═══════════════════════════════════════════════════════════════════════╣
║                        MERCHANT JOURNEY                              ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  ┌──────────────┐    ┌──────────────┐    ┌────────────────────────┐  ║
║  │ Shopify App  │───>│ Cài app      │───>│ DASHBOARD              │  ║
║  │ Store        │    │ (OAuth)      │    │ Metrics + Quickstart   │  ║
║  └──────────────┘    └──────────────┘    │                        │  ║
║                                          │  ├─> Activity          │  ║
║                                          │  ├─> Settings          │  ║
║                                          │  └─> Theme Editor      │  ║
║                                          └────────────────────────┘  ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

#### FLOW A: CUSTOMER — SỬA ĐƠN HÀNG (Inline trên Order Status Page)

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
BƯỚC 2: Order Status Page (New Customer Accounts) — block app inline
════════════════════════════════════════════════════════════════════
┌──────────────────────────────────────────────────┐
│  ← Order #1234        Confirmed Apr 14           │
│                                                  │
│  [Column trái]                    [Column phải]  │
│  ✓ Confirmed                      Order summary  │
│  ┌────────────────────────────┐   👕 T-Shirt     │
│  │ Edit your order  ⏱1h 45m  │   👖 Jeans       │
│  │                            │                  │
│  │ 📍 Edit shipping address ▶│   Total: $91.98  │
│  │ 📝 Add order note        ▶│                  │
│  │ ❌ Cancel this order     ▶│                  │
│  └────────────────────────────┘                  │
│                                                  │
│  Contact info · Payment · Addresses             │
└──────────────────────────────────────────────────┘

Đặc điểm:
- Block app nằm inline trong Order Status Page
- 3 options dạng accordion — click để expand form
- Chỉ 1 option expanded tại 1 thời điểm
- Save từng action riêng (không batch → review → confirm)
```

**Bước 3a: Click "Edit shipping address" → form expand inline**
```
┌────────────────────────────────────────────────┐
│ 📍 Edit shipping address                    ▼ │
│ ─────────────────────────────────────────────  │
│   Full name:     [John Doe           ]         │
│   Company:       [                   ]         │
│   Address:       [123 Main Street    ]         │
│   Apartment:     [Apt 4B             ]         │
│   City:          [New York  ] State: [NY ▼]    │
│   ZIP:           [10001     ] Country:[US ▼]   │
│   Phone:         [+1 (555) 123-4567 ]          │
│                                                │
│   [Save address] ◄── Save ngay, toast hiện     │
└────────────────────────────────────────────────┘
             │
             ▼
  Toast: "Address updated" ✅
  Form collapse, block quay về state gốc
  Order thực tế đã được update qua Shopify API
```

**Bước 3b: Click "Add order note" → textarea expand inline**
```
┌────────────────────────────────────────────────┐
│ 📝 Add order note                           ▼ │
│ ─────────────────────────────────────────────  │
│   [Textarea: Add a note (e.g. gift wrap,      │
│    delivery instructions)...]                  │
│                                                │
│   [Save note] ◄── Save ngay                   │
└────────────────────────────────────────────────┘
             │
             ▼
  Toast: "Note saved" ✅
```

**Bước 3c: Click "Cancel this order" → confirm + reason inline**
```
┌────────────────────────────────────────────────┐
│ ❌ Cancel this order                        ▼ │
│ ─────────────────────────────────────────────  │
│   This action cannot be undone. You will       │
│   receive a full refund of $91.98.             │
│                                                │
│   Reason (optional):                           │
│   [Select a reason...                       ▼] │
│   • Ordered wrong item                         │
│   • Changed my mind                            │
│   • Item no longer needed                      │
│   • Shipping takes too long                    │
│   • Duplicate order                            │
│   • Found cheaper elsewhere                    │
│   • Other → hiện textarea bổ sung              │
│                                                │
│   [Cancel order] ◄── Destructive button        │
└────────────────────────────────────────────────┘
             │
             ▼
BƯỚC 4: Success
═══════════════
┌────────────────────────────────────────────────┐
│  ✅ Order Updated Successfully!                 │
│  Order #1234 has been updated.                 │
│  A confirmation email has been sent.           │
│  [View Updated Order]                          │
└────────────────────────────────────────────────┘

Sau khi cancel → quay lại OSP → block "Edit your order" ẨN HOÀN TOÀN
(vì order đã cancelled)
```

> **Lưu ý về flow:**
> - **KHÔNG có Edit Portal riêng** — tất cả edit diễn ra inline trên Order Status Page
> - **KHÔNG có Review & Confirm screen** — mỗi action save trực tiếp (address, note, cancel)
> - **KHÔNG có batch editing** — customer thay đổi gì save luôn cái đó

---

#### FLOW B: MERCHANT — CÀI ĐẶT APP LẦN ĐẦU (Chi tiết từng click)

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
BƯỚC 3: Dashboard (lần đầu — Quickstart expanded)
═══════════════════════════════════════════════════
┌────────────────────────────────────────────────────────────┐
│  Avada Order Editing                                       │
│  [Dashboard●]  [Activity]  [Settings]                      │
│                                                            │
│  Hi [Shop Name]                                            │
│  Overview of your order editing activity                   │
│                                                            │
│  [Today●] [Last 7 days] [Last 30 days]                    │
│                                                            │
│  ┌─────────────┐ ┌──────────────┐ ┌─────────────┐         │
│  │ Total Edits │ │Cancellations │ │Edits Remain.│         │
│  │     0       │ │      0       │ │   0/50      │         │
│  └─────────────┘ └──────────────┘ └─────────────┘         │
│                                                            │
│  ┌─ Quickstart ───────────────────────────── ▲ ✕ ─┐       │
│  │  0 of 3 tasks complete [░░░░░░░░░░░░░░]         │       │
│  │                                                  │       │
│  │  ┌────────────────────────────────────────────┐ │       │
│  │  │ ☐ Configure order editing feature          │ │       │
│  │  │   Set up edit types, time window, widget   │ │       │
│  │  │   [Configure Now] ◄── CLICK                │ │       │
│  │  └────────────────────────────────────────────┘ │       │
│  │  ☐ Enable app                                   │       │
│  │  ☐ Add order editing widget                     │       │
│  └──────────────────────────────────────────────────┘       │
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
│  Settings                         [Discard] [Save]         │
│                                                            │
│  ── Allowed Edit Types ──                                  │
│  ☑ Edit shipping address  ◄── BẬT/TẮT                     │
│  ☑ Cancel order           ◄── BẬT/TẮT                     │
│  ☑ Edit order note        ◄── BẬT/TẮT                     │
│                                                            │
│  ── Edit Limits ──                                         │
│  ☐ Allow edits for ◄── DEFAULT OFF (edits until fulfilled) │
│     (khi check mới hiện 2 input hours + minutes)           │
│  ☐ Maximum edits per order ◄── DEFAULT OFF (unlimited)    │
│     (khi check mới hiện number input, default 5)           │
│                                                            │
│  ── Notifications ──                                       │
│  Choose when to receive email:                             │
│  ◉ Email me for all changes                                │
│  ○ Email me only when an order is canceled                 │
│                                                            │
│  [Save] → Toast: "Settings saved successfully" ✅          │
│  → Quickstart Step 1 auto-check ✅                         │
└────────────────────────────────────────────────────────────┘
                         │
        Click sidebar [Dashboard] quay lại
                         │
                         ▼
BƯỚC 5: Quickstart — Step 2 "Enable app"
════════════════════════════════════════
Click step 2 → expand → [Enable app] button
    │
    ▼
  → Shopify Theme Editor mở ra, trang App embeds
  → Merchant bật toggle app embed
  → Quay lại app → [Refresh status] → auto-check ✅
  → Progress bar: 2 of 3 complete
                         │
        Click step 3 "Add order editing widget"
                         │
                         ▼
BƯỚC 6: Theme Editor (Shopify native)
═════════════════════════════════════
Click [Open Theme Editor] trong Quickstart
    │
    ▼
┌────────────────────────────────────────────────────────────┐
│  Shopify Theme Customizer                                  │
│                                                            │
│  Sections → Order Status Page                              │
│  → [+ Add block] ◄── CLICK                                │
│  → Tìm "Avada Order Editing" ◄── CLICK                    │
│  → [Save] ◄── CLICK                                       │
│                                                            │
│  → Quickstart Step 3 auto-check ✅                         │
│  → Progress bar: 3 of 3 complete 🎉                        │
└────────────────────────────────────────────────────────────┘
```

---

#### FLOW C: MERCHANT — SỬ DỤNG HÀNG NGÀY (Sau khi setup xong)

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
│  Overview of your order editing activity                   │
│                                                            │
│  [Today●] [Last 7 days] [Last 30 days]                    │
│                                                            │
│  ┌──────────────────┐ ┌──────────────────┐                │
│  │   Total Edits    │ │  Cancellations   │                │
│  │       12         │ │        5         │                │
│  │   +3 vs yest.    │ │    2.0% rate     │                │
│  └──────────────────┘ └──────────────────┘                │
│                                                            │
│  ┌── Helpdesk ─────────────────────────────────────────┐  │
│  │  [Chat with us] ◄── CLICK mở live chat              │  │
│  └─────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
                         │
        Click sidebar [Activity] để xem lịch sử
                         │
                         ▼
BƯỚC 3: Activity page
═════════════════════
┌────────────────────────────────────────────────────────────┐
│  Activity                                                  │
│  All order changes made by customers                       │
│                                                            │
│  ┌─────────┬──────────────┬────────┬────────────┬────────┐│
│  │ Order   │ Customer     │Changes │Last updated│Details ││
│  ├─────────┼──────────────┼────────┼────────────┼────────┤│
│  │ #1234   │ John Doe     │Address │ just now   │View →  ││
│  │ #1230   │ Sarah Chen   │Address │ 15m ago    │View →  ││
│  │ #1228   │ Mike R.      │Cancel  │ 1h ago     │View →  ││
│  │ #1225   │ Alex T.      │Note    │ 2h ago     │View →  ││
│  │ #1215   │ Ryan Lee     │Addr+Note│6h ago     │View →  ││
│  └─────────┴──────────────┴────────┴────────────┴────────┘│
│                        [1] [2]                             │
└────────────────────────────────────────────────────────────┘
                         │
        Click "View →" → mở modal chi tiết
                         │
                         ▼
Modal: Before/After comparison (Address / Cancel / Note / Tags / Multi)
- Address: 2-column before/after với strikethrough
- Cancel: reason + refund amount + refund status + restock status
- Note: before/after text
- Tags: before/after chips
- Multi: kết hợp nhiều change trong cùng 1 edit
```

---

#### FLOW TỔNG HỢP — MỘT TRANG NHÌN TẤT CẢ

```
                    ┌──────────────┐
                    │ SHOPIFY APP  │
                    │ STORE        │
                    └──────┬───────┘
                           │ Install + OAuth
                           ▼
              ┌────────────────────────────┐
              │      ADMIN DASHBOARD       │
              │  2 metrics + Quickstart    │
              │   + Helpdesk               │
              └─────┬──────────┬───────────┘
                    │          │
           ┌────────┘          └────────┐
           ▼                            ▼
    ┌──────────────┐            ┌──────────────┐
    │  ACTIVITY    │            │   SETTINGS   │
    │  Edit log    │            │  Time window │
    │  + Detail    │            │  Edit types  │
    │    modals    │            │ Notifications│
    └──────────────┘            └──────────────┘


═══════════════════════════════════════════════════

    CUSTOMER SIDE (inline trên Order Status Page):

    ┌───────────┐     ┌────────────────────────────────┐
    │  Shopify  │────>│  ORDER STATUS PAGE             │
    │  Email    │     │  (New Customer Accounts)       │
    └───────────┘     │  ┌──────────────────────────┐  │
                      │  │ Block "Edit your order"  │  │
                      │  │                          │  │
                      │  │ 📍 Edit address   ▶ ─┐   │  │
                      │  │ 📝 Add note       ▶ ┼─┼──┼──> Save ngay → Toast
                      │  │ ❌ Cancel order   ▶ ─┘   │  │
                      │  └──────────────────────────┘  │
                      └────────────────────────────────┘
```

**Màn hình 1: Block "Edit your order" trên Order Status Page**

```
┌────────────────────────────────────────┐
│  Edit your order        ⏱ 1h 45m      │
│  ─────────────────────────────────────  │
│  📍 Edit shipping address          ▶  │
│  ─────────────────────────────────────  │
│  📝 Add order note                 ▶  │
│  ─────────────────────────────────────  │
│  ❌ Cancel this order              ▶  │
└────────────────────────────────────────┘
```

| Hành động | Kết quả |
|-----------|---------|
| Click option | Expand form inline, chỉ 1 option mở 1 lúc |
| Save từng form | Save ngay → Toast confirmation, form collapse |
| Hết time window | Block ẩn hoàn toàn |
| Order đã fulfilled | Block ẩn hoàn toàn |
| Order đã cancelled | Block ẩn hoàn toàn |

> **Quy tắc hiển thị block:** Chỉ hiện khi **cả 3 điều kiện** thỏa đồng thời:
> 1. Order chưa cancelled
> 2. Order chưa fulfilled
> 3. Còn trong time window (chưa hết hạn edit)

**Màn hình 2: Edit Address (inline expanded)**

```
┌────────────────────────────────────────┐
│  📍 Edit shipping address          ▼  │
│  ────────────────────────────────────  │
│  Full name:  [John Doe             ]   │
│  Company:    [                     ]   │
│  Address:    [123 Main Street      ]   │
│  Apartment:  [Apt 4B               ]   │
│  City:    [New York]  State: [NY ▼]    │
│  ZIP:     [10001]  Country: [US  ▼]    │
│  Phone:   [+1 (555) 123-4567       ]   │
│                                        │
│  [Save address] → Toast: "Address      │
│                    updated" ✅          │
└────────────────────────────────────────┘
```

**Màn hình 3: Add Note (inline expanded)**

```
┌────────────────────────────────────────┐
│  📝 Add order note                 ▼  │
│  ────────────────────────────────────  │
│  [Textarea: Add a note (gift wrap,     │
│   delivery instructions)...]            │
│                                        │
│  [Save note] → Toast: "Note saved" ✅  │
└────────────────────────────────────────┘
```

**Màn hình 4: Cancel Order (inline expanded)**

```
┌────────────────────────────────────────┐
│  ❌ Cancel this order              ▼  │
│  ────────────────────────────────────  │
│  This action cannot be undone. You     │
│  will receive a full refund of $91.98. │
│                                        │
│  Reason (optional):                    │
│  [Select a reason...              ▼]   │
│  • Ordered wrong item                  │
│  • Changed my mind                     │
│  • Item no longer needed               │
│  • Shipping takes too long             │
│  • Duplicate order                     │
│  • Found cheaper elsewhere             │
│  • Other → hiện textarea bổ sung       │
│                                        │
│  [Cancel order] (destructive red)      │
└────────────────────────────────────────┘
```

**Màn hình 5: Success (sau khi save một action)**

```
┌──────────────────────────────────────┐
│  ✅ Order Updated Successfully!       │
│  Order #1234 has been updated.       │
│  A confirmation email has been sent  │
│  to john@example.com.                │
│  [View Updated Order]                │
└──────────────────────────────────────┘
```

#### Flow B: Merchant Admin

```
Mở app → Dashboard (2 metric cards + Quickstart + Helpdesk)
       → Activity (edit log table + detail modals)
       → Settings (time window, max edits, edit types, notifications)
```

**Màn hình 6: Admin Dashboard**

```
┌───────────────────────────────────────────────────────────┐
│  Dashboard                                                │
│                                                           │
│  Hi [Shop Name]                                           │
│  Overview of your order editing activity                  │
│                                                           │
│  [Today●] [Last 7 days] [Last 30 days]                   │
│                                                           │
│  ┌──────────────┐ ┌──────────────┐                        │
│  │ Total Edits  │ │Cancellations │                        │
│  │     12       │ │      5       │                        │
│  │ +3 vs yest.  │ │  2.0% rate   │                        │
│  └──────────────┘ └──────────────┘                        │
│                                                           │
│  ┌─ Quickstart ────────────────────── ▲ ✕ ─┐             │
│  │  2 of 3 tasks complete [████████░]      │             │
│  │                                          │             │
│  │  ✅ Configure order editing feature     │             │
│  │  ✅ Enable app                          │             │
│  │  ☐  Add order editing widget            │             │
│  │     [Open Theme Editor] [Refresh status] │             │
│  └──────────────────────────────────────────┘             │
│                                                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Helpdesk                                          │  │
│  │  Our support team is ready to help with our        │  │
│  │  in-app live chat.                                 │  │
│  │  [💬 Chat with us]                                 │  │
│  └────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
```

**Màn hình 7: Admin Activity (Edit Log)**

```
┌────────────────────────────────────────────────────────────┐
│  Activity                                                  │
│  All order changes made by customers                       │
│                                                            │
│  ┌─────────┬──────────────┬────────┬────────────┬────────┐│
│  │ Order   │ Customer     │Changes │Last updated│Details ││
│  ├─────────┼──────────────┼────────┼────────────┼────────┤│
│  │ #1234   │ John Doe     │Address │ just now   │View →  ││
│  │ #1230   │ Sarah Chen   │Address │ 15m ago    │View →  ││
│  │ #1228   │ Mike R.      │Cancel  │ 1h ago     │View →  ││
│  │ #1225   │ Alex T.      │Note    │ 2h ago     │View →  ││
│  │ #1215   │ Ryan Lee     │Addr+Note│6h ago     │View →  ││
│  └─────────┴──────────────┴────────┴────────────┴────────┘│
│                        [1] [2]                             │
└────────────────────────────────────────────────────────────┘
```

Click "View →" → mở modal chi tiết with before/after comparison.

Modal types:
- **Address**: 2 columns (before strikethrough red / after green)
- **Cancel**: reason + refund amount + refund status + restock status
- **Note**: before/after text
- **Tags**: before/after chips
- **Multi**: kết hợp nhiều change trong cùng 1 edit + price summary

**Màn hình 8: Admin Settings**

```
┌─────────────────────────────────────────┐
│  Settings            [Discard] [Save]    │
│                                          │
│  ── Allowed Edit Types ──                │
│  Choose what customers can modify on     │
│  their orders.                           │
│  ☑ Edit shipping address                 │
│  ☑ Cancel order                          │
│  ☑ Edit order note                       │
│                                          │
│  ── Edit Limits ──                       │
│  Control when and how often customers    │
│  can edit their orders.                  │
│  ☐ Allow edits for (default OFF)         │
│     (khi check: [2] hours [0] minutes)   │
│  ☐ Maximum edits per order (default OFF) │
│     (khi check: number input [5])        │
│                                          │
│  ── Notifications ──                     │
│  Choose when to receive email:           │
│  ◉ Email me for all changes              │
│  ○ Email me only when an order is        │
│    canceled                              │
│                                          │
│  Save → Toast: "Settings saved" ✅        │
└─────────────────────────────────────────┘
```

**Màn hình 9: Quickstart (nhúng trong Dashboard)**

Quickstart là card trong Dashboard, accordion — chỉ 1 step expanded 1 lúc. Progress bar.

```
┌────────────────────────────────────── ▲ ✕─┐
│  Quickstart                                │
│  2 of 3 tasks complete [████████░]         │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │ ✅ Configure order editing feature   │  │
│  │    Set up edit types, time window,   │  │
│  │    and widget display.               │  │
│  │    [Configure Now]                   │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  ✅ Enable app                             │
│                                            │
│  ☐  Add order editing widget               │
│     [Open Theme Editor] [Refresh status]   │
└────────────────────────────────────────────┘
```

| Element | Mô tả |
|---------|-------|
| Title | "Quickstart" |
| Progress bar | "X of 3 tasks complete" + visual bar |
| `▲` button | Collapse/expand toàn bộ card |
| `✕` button | Dismiss — ẩn vĩnh viễn, lưu `onboardingDismissed: true` |
| **Step 1: Configure order editing feature** | Auto-check khi merchant lưu Settings lần đầu. Expanded: mô tả + "Configure Now" button → link Settings |
| **Step 2: Enable app** | Auto-check khi merchant bật app embed trong Theme Editor. Expanded: mô tả + "Enable app" button + "Refresh status" |
| **Step 3: Add order editing widget** | Auto-check khi theme extension block activated trên Order Status Page. Expanded: mô tả + "Open Theme Editor" button + "Refresh status" |
| Accordion | Click step → expand step đó, collapse các step khác |
| Khi 3/3 completed | Card ẩn tự động |
| Dismiss (✕) | Lưu `onboardingDismissed: true` → không hiện lại |

**Hành vi:**
- Quickstart hiện **phía dưới** 2 metric cards, **phía trên** Helpdesk
- Mới cài app → card expanded, step 1 mở rộng mặc định
- Click step → accordion: mở step đó, đóng step khác
- Step completed có icon ✅ (filled green circle + checkmark)
- Step chưa completed có icon ☐ (dashed circle)
- Đã hoàn thành 3/3 hoặc dismiss (✕) → card ẩn
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

**Address Update (REST):**
- `PUT /admin/api/2024-07/orders/{id}.json` → update shipping address

**Order Note + Tags Update (REST / GraphQL):**
- `PUT /admin/api/2024-07/orders/{id}.json` với `note` / `tags` field
- Hoặc `orderUpdate` GraphQL mutation

**Order Cancel (GraphQL):**
- `orderCancel` mutation với `refund: true`, `restock: true`
- Shopify tự refund về payment gốc + restock — app KHÔNG cần gọi riêng refundCreate

**Webhooks nhận:**
- `orders/edited`, `orders/cancelled`, `orders/updated`, `orders/fulfilled`
- `app/uninstalled` → **cleanup bắt buộc**

**GDPR Webhooks (BẮT BUỘC):**
- `customers/data_request` → export customer data JSON
- `customers/redact` → anonymize customer data
- `shop/redact` → delete all shop data

**Extension Points:**
- Theme App Extension → Order Status Page block (New Customer Accounts)

### 3.6. Error Messages

| Error | Message | Action |
|-------|---------|--------|
| Edit window expired | "The edit window for this order has expired. Please contact the store." | Ẩn block |
| Order fulfilled | "This order has already been shipped." | Ẩn block |
| Order cancelled | — | Ẩn block |
| Max edits reached | "Maximum edits reached for this order." | Ẩn block |
| Concurrent edit | "This order is being edited. Please try again." | Retry 30s |
| Save address failed | "We couldn't update the address. Please try again." | Form giữ nguyên, retry |
| Save note failed | "We couldn't save the note. Please try again." | Form giữ nguyên, retry |
| Cancel failed | "We couldn't cancel the order. Please contact the store." | Hiện error, không rollback |

### 3.7. Success Messages

| Event | Message |
|-------|---------|
| Address updated | "Address updated" (toast) |
| Note saved | "Note saved" (toast) |
| Order cancelled | Success screen: "Order Updated Successfully! Order #XXXX has been updated. A confirmation email has been sent." |
| Settings saved | "Settings saved successfully" (toast) |

### 3.8. Business Logic — Edit Session, Email Delivery, Max Edits Counting

> ⚠️ **Quan trọng cho dev**: 3 feature sau dùng chung 1 concept "edit session" với 5-min window. Đọc kỹ trước khi implement.

#### 3.8.1. Edit Session concept

**Định nghĩa**: 1 edit session = chuỗi save actions của customer trong cùng 1 order, trong khoảng thời gian **5 phút cố định tính từ save đầu tiên**. Window KHÔNG reset khi có save tiếp theo.

**Session state machine:**
```
[No session] 
     │ Customer click Save lần đầu
     ▼
[active] ← session_start = now, session_end = now + 5 phút (fixed)
     │
     ├─ Save tiếp trong 5 phút từ session_start
     │  → append action vào actions[]
     │  → KHÔNG reset timer, KHÔNG extend session_end
     │
     └─ Đạt session_end (5 phút từ save đầu)
        → session_status = "completed"
        → trigger gửi email merchant (nếu "all" mode)
        → increment edit count (nếu maxEditsEnabled)
```

**Rule quan trọng:**
- Window **cố định 5 phút** từ save đầu — không reset, không extend
- Sau 5 phút, nếu customer tiếp tục save → **session mới** bắt đầu (+1 count, +1 email)
- **Cancel order KHÔNG thuộc session** — luôn là 1 document riêng trong `orderEdits`
- **Merchant edit từ admin KHÔNG tính session** — mỗi merchant action = 1 document riêng
- Session **scope theo order** — customer edit 2 orders khác nhau = 2 sessions riêng

#### 3.8.2. Email delivery — Hybrid logic

| Event type | Delivery timing | Batch? |
|---|---|---|
| **Cancel order** | **Immediate** (gửi ngay) | Không |
| **Additional payment required** | **Immediate** | Không |
| **Edit events** (address / note / variant) | **5 phút cố định từ save đầu** (gửi khi session đóng) | Có — gom mọi saves trong session thành 1 email |

**Flow gửi email edit:**
```
t=0:00  Customer save address → session mở, email scheduled tại t=5:00 (FIXED)
t=1:30  Customer save note    → append action, KHÔNG reschedule (vẫn t=5:00)
t=3:00  Customer save variant → append action, KHÔNG reschedule (vẫn t=5:00)
t=5:00  Session đóng → send 1 email duy nhất với 3 changes

Nếu t=5:30 customer save thêm → session MỚI, email mới scheduled tại t=10:30
```

**Flow gửi email cancel:**
```
t=0:00  Customer click Cancel (với hoặc không có edit session đang mở)
        → gửi email cancel NGAY (không đợi session close)
        → session edit (nếu có) vẫn tiếp tục cho các edit khác
```

**Email content khi có multiple changes:**
- Subject: `[Shop] Order #1234 was edited by the customer`
- Body section "What changed" — list tất cả actions với before/after riêng
- Nếu session có >1 action: `edit_type = "Multiple changes"` (badge màu xanh)
- Nếu session chỉ 1 action: `edit_type` là tên action cụ thể (Shipping address / Note / ...)

#### 3.8.3. Max edits per order — Session-based counting

**Setting** (ở Admin Settings):
- Checkbox `Maximum edits per order` — default **OFF** (unlimited)
- Khi ON → input number (1-20, default 5)

**Đếm logic:**
- **1 session = 1 unit** vào count (không phải 1 save = 1 unit)
- Count tăng khi session **đóng** (đúng 5 phút từ save đầu)
- Cancel **không** tính vào count (separate bucket)

**Behavior khi hit limit:**
```
Customer đã dùng 5/5 edits
     ↓
Customer mở Order Status Page
     ↓
Widget "Edit your order" vẫn hiển thị
     ↓
Customer click expand "Edit shipping address"
     ↓
Form hiện nhưng Save button DISABLED
Message: "You've reached the maximum edits for this order. 
         Please contact the store for further changes."
     ↓
Customer vẫn có thể click "Cancel this order" (separate bucket)
```

**Edge case — Hit limit trong session đang mở:**
- Session hiện tại đã mở → count đã +1
- Customer tiếp tục save trong session → KHÔNG +1 count
- Session đóng → bắt đầu block

#### 3.8.4. Activity page — Session display

**Entry active session** (trong 5 phút window):
- Badge `● Editing in progress (Xm)` — pulse animation, count-up timer
- Column **Changes** update realtime (append badge mỗi action mới)
- Column **Last updated** update realtime (= timestamp của action cuối cùng, refresh mỗi save mới)
- Click "View →" → modal hiện data hiện tại (có thể chưa final)

```
┌─────────┬──────────┬──────────────────┬────────────┬────────┐
│ #1234   │ Jane Doe │🔵 Address 🟤 Note│ just now   │View →  │
│         │          │● Editing (2m)    │            │        │
└─────────┴──────────┴──────────────────┴────────────┴────────┘
```

**Entry completed session** (sau khi session đóng):
- Không có badge progress
- Changes + Last updated frozen
- Modal hiện full before/after final

```
┌─────────┬──────────┬──────────────────┬────────────┬────────┐
│ #1234   │ Jane Doe │🔵 Address 🟤 Note│ 5m ago     │View →  │
│         │          │🟢 Variant        │            │        │
└─────────┴──────────┴──────────────────┴────────────┴────────┘
```

**Update rule cho "Last updated"**:
- Khi session active: hiển thị relative time của `lastActionAt` (action cuối trong `actions[]`)
- Khi customer save thêm: `lastActionAt = now` → Last updated hiển thị "just now"
- Khi session đóng: `lastActionAt` KHÔNG đổi nữa, Last updated tiếp tục tick ("1m ago", "5m ago", ...)
- **Lưu ý**: `lastActionAt` chỉ dùng cho display, KHÔNG ảnh hưởng tới session timing (session vẫn đóng đúng 5 phút từ `sessionStartAt`)

#### 3.8.5. Technical implementation notes

**Cron job** (Cloud Scheduler chạy mỗi 1 phút):
- Query: `sessions WHERE status = "active" AND (now - session_start >= 5min)`
- Action mỗi match:
  1. Set `status = "completed"`
  2. Increment order's edit count (nếu maxEditsEnabled)
  3. Trigger send email (nếu notificationLevel = "all")

**Concurrency**:
- Dùng Firestore transaction khi customer save: READ session → CHECK is active → APPEND action → WRITE
- Tránh race condition: nếu 2 tabs save đồng thời

**Webhook `orders/updated` từ Shopify**:
- Vẫn listen để sync order data (financial_status, fulfillment_status)
- Không dùng để trigger email (email trigger bởi session state machine của app)

---

## 4. Design Description

### 4.1. Storefront — Block "Edit your order" (Theme App Extension)

> Hiện khi: order chưa cancelled AND chưa fulfilled AND còn trong time window
> Block nằm **inline** trong Order Status Page (New Customer Accounts), KHÔNG phải widget CTA mở page riêng.

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Title | Text | Y | "Edit your order" | Tiêu đề block | — |
| Timer badge | Badge | Y | — | Countdown "1h 45m remaining" | Ẩn nếu setting = "Until fulfillment" |
| Option: Edit address | Row | N | Shown | Click → expand form inline | Hiện nếu allowAddressEdit |
| Option: Add note | Row | N | Shown | Click → expand textarea inline | Hiện nếu allowNoteEdit |
| Option: Cancel order | Row | N | Shown | Click → expand confirm + reason | Hiện nếu allowCancel |
| Accordion behavior | — | Y | Single-open | Chỉ 1 option expand 1 lúc | — |

**Chi tiết spec countdown timer:** xem file `UI-countdown-timer.html` — full spec 3 states (Normal / Urgent / Expired), format rules, edge cases.

### 4.2. Storefront — Inline Edit Forms

> Mỗi option expand → form riêng, **save ngay** khi bấm Save (không batch, không có Review & Confirm).

**Form 1 — Edit shipping address:**

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Address form | Form | Y | Current address | Các field bên dưới | Hiện nếu allowAddressEdit |

**Address Form — Field Requirements:**

| Field | Type | Required | Max length | Validate | Ghi chú |
|-------|------|----------|------------|----------|---------|
| Full name | Text | **Y** | 100 | Không để trống, trim whitespace | First + Last name gộp |
| Company | Text | N | 100 | — | Hiện label "(optional)" |
| Address | Text | **Y** | 200 | Không để trống | Địa chỉ dòng 1 (số nhà, tên đường) |
| Apartment, suite, etc. | Text | N | 100 | — | Hiện label "(optional)" |
| City | Text | **Y** | 100 | Không để trống | — |
| State / Province | Text hoặc Select | Tùy country | 100 | Nếu country có danh sách states → Select dropdown. Nếu không → Text tự nhập | US, CA, AU → dropdown. Các nước khác → text |
| ZIP / Postal code | Text | Tùy country | 20 | Format theo country: US = 5 hoặc 9 số (XXXXX hoặc XXXXX-XXXX), CA = A1A 1A1, UK = postcode format. Nước không dùng ZIP → không bắt buộc | Chỉ validate format, không validate tồn tại |
| Country | Select | **Y** | — | Dropdown danh sách countries. Khi đổi country → reset State + ZIP validation | Pre-select country hiện tại của order |
| Phone | Tel | N | 20 | Nếu nhập: chỉ cho phép số, +, -, (, ), khoảng trắng. Tối thiểu 7 số | Hiện label "(optional)". Giữ format quốc tế |

**Validation behavior:**
- Validate **on blur** (khi rời field) — không validate realtime khi đang gõ
- Hiện error message ngay dưới field bị lỗi (màu đỏ `#D72C0D`)
- Button "Save address" **disabled** khi có field required trống hoặc có lỗi validation
- Khi đổi **Country**: tự động cập nhật State dropdown (nếu có) + thay đổi ZIP format validation
- Không cho submit nếu address **giống hệt** address hiện tại (button disabled, hiện note "No changes detected")
| Save button | Button | Y | "Save address" | → Call API + Toast "Address updated" | Disabled nếu no changes |

**Form 2 — Add order note:**

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Note textarea | Textarea | N | Current note | Placeholder: "Add a note (e.g. gift wrap, delivery instructions)..." | Max 500 chars |
| Save button | Button | Y | "Save note" | → Call API + Toast "Note saved" | — |

**Form 3 — Cancel order:**

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Refund notice | Text | Y | — | "This action cannot be undone. You will receive a full refund of $XX.XX." | — |
| Reason dropdown | Select | N | "Select a reason..." | 7 options: Ordered wrong item / Changed my mind / Item no longer needed / Shipping takes too long / Duplicate order / Found cheaper elsewhere / Other | — |
| Other textarea | Textarea | N | — | Hiện khi chọn "Other" | Max 300 chars |
| Cancel button | Button | Y | "Cancel order" | Destructive red → `orderCancel` API + Success screen | — |

### 4.3. Admin — Dashboard

> Trang mặc định khi mở app

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Page title | Text | Y | "Dashboard" | — | — |
| Greeting | Text | Y | "Hi [Shop Name]" | Subtitle: "Overview of your order editing activity" | — |
| Date filter | Button group | Y | "Today" | Pill buttons: Today / Last 7 days / Last 30 days | — |
| Total Edits | Metric | Y | 0 | Tổng lượt sửa trong khoảng thời gian + delta vs kỳ trước ("+3 vs yesterday") | — |
| Cancellations | Metric | Y | 0 | Tổng lượt hủy + cancel rate (%) | — |
| Quickstart card | Card | N | Expanded | 3-step checklist | Ẩn khi 3/3 hoặc dismiss |
| Quickstart step 1 | Accordion | Y | unchecked | "Configure order editing feature" → Settings | Auto-check khi settings saved |
| Quickstart step 2 | Accordion | Y | unchecked | "Enable app" → Theme Editor app embed | Auto-check khi app embed active |
| Quickstart step 3 | Accordion | Y | unchecked | "Add order editing widget" → Theme Editor | Auto-check khi theme block active |
| Quickstart `▲` | Toggle | Y | Expanded | Collapse/expand | — |
| Quickstart `✕` | Button | Y | — | Dismiss | Lưu onboardingDismissed |
| Helpdesk card | Card | Y | — | Luôn hiện ở cuối dashboard (không dismiss được) | — |
| Helpdesk button | Button | Y | "💬 Chat with us" | Mở live chat widget (Crisp/Tidio/Intercom) | — |

### 4.4. Admin — Settings

> Cấu hình edit behavior

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| **Allowed Edit Types** | Section | — | — | Section header + subtitle "Choose what customers can modify on their orders." | — |
| Allow address edit | Checkbox | Y | true | "Edit shipping address" | — |
| Allow cancel order | Checkbox | Y | true | "Cancel order" | — |
| Allow edit order note | Checkbox | Y | true | "Edit order note" | — |
| **Edit Limits** | Section | — | — | Section header + subtitle "Control when and how often customers can edit their orders." | — |
| Enable time window | Checkbox | Y | false | "Allow edits for" — default OFF (edit cho tới khi fulfilled). Khi check → hiện 2 input hours + minutes. | — |
| Time window hours | Number | Conditional | 2 | Input "hours" — chỉ hiện khi "Enable time window" checked | 0-720 |
| Time window minutes | Number | Conditional | 0 | Input "minutes" — chỉ hiện khi "Enable time window" checked | 0-59 |
| Enable max edits | Checkbox | Y | false | "Maximum edits per order" — default OFF (unlimited). Khi check → hiện number input. | — |
| Max edits per order | Number | Conditional | 5 | Số sessions tối đa per order (1 session = multiple saves trong 5 phút). Chỉ dùng khi "Enable max edits" checked. | 1-20 |
| **Notifications** | Section | — | — | Section header + subtitle "Choose when you want to be notified by email." | — |
| Notification level | Radio group | Y | `"all"` | 2 options (radio, mutually exclusive):<br/>◉ `"all"` — "Email me for all changes"<br/>○ `"cancel_only"` — "Email me only when an order is canceled" | — |
| Save button | Button | Y | "Save" | → Toast "Settings saved successfully" | — |
| Discard button | Button | Y | "Discard" | Revert changes | — |

### 4.5. Admin — Activity

> Table log tất cả thay đổi của customer trên orders

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Page title | Text | Y | "Activity" | Subtitle: "All order changes made by customers" | — |
| Activity table | Table | Y | — | 5 cột: Order / Customer / Changes / Last updated / Details | — |
| Order link | Link | Y | — | #XXXX → link sang Shopify admin order page | Open new tab |
| Customer | Text | Y | — | Name + email (2 dòng) | — |
| Changes badges | Badges | Y | — | Address (info) / Cancel (critical) / Note (default) / Tags (default). Multi = nhiều badge cùng hàng | — |
| Last updated | Text | Y | — | Relative time của action cuối ("just now", "2m ago", "1 day ago"). **Update realtime** mỗi khi customer save thêm trong session active. Sau khi session đóng → frozen. | — |
| View link | Link | Y | — | "View →" → mở detail modal | — |
| Pagination | Buttons | Y | — | Page 1, 2, ... (5 items/page) | — |

**Detail modals** (trigger khi click "View →"):

| Modal Type | Content |
|-----------|---------|
| Address | Before/After 2-column (red strikethrough / green) |
| Cancel | Reason + Refund amount + Refund status + Restock status |
| Note | Before/After text (italic, 2-column) |
| Tags | Before/After tag chips (2-column) |
| Multi | Multiple sections + price summary (original total / new total / additional charge) |

---

## 5. Acceptance Criteria

### Functional — Customer

☐ Block "Edit your order" hiện inline trên Order Status Page (không phải widget CTA riêng)
☐ Block hiển thị countdown timer (xem full spec ở UI-countdown-timer.html)
☐ Block ẩn khi: order cancelled, order fulfilled, hoặc hết time window (bất kỳ 1 trong 3 → ẩn)
☐ 3 options hiển thị dạng accordion — chỉ 1 option expand 1 lúc
☐ Customer click "Edit shipping address" → expand form inline
☐ Customer click "Add order note" → expand textarea inline
☐ Customer click "Cancel this order" → expand confirm + reason dropdown
☐ Mỗi form save độc lập (Save address / Save note / Cancel order) — KHÔNG có Review & Confirm
☐ Save address thành công → Toast "Address updated" + form collapse
☐ Save note thành công → Toast "Note saved" + form collapse
☐ Cancel order → redirect sang Success screen, block ẩn khi quay lại OSP
☐ Cancel order: refund auto về payment gốc + restock (Shopify handle qua orderCancel API)
☐ Reason dropdown: 7 options, khi chọn "Other" → hiện textarea bổ sung
☐ UI responsive mobile (>= 320px)

### Functional — Merchant Admin

☐ Dashboard page title "Dashboard"
☐ Dashboard greeting "Hi [Shop Name]" + subtitle
☐ Dashboard date filter: pill buttons Today / Last 7 days / Last 30 days (Today = default active)
☐ Dashboard: **2 metric cards** — Total Edits (+delta vs previous period), Cancellations (+cancel rate %)
☐ Dashboard: Quickstart card hiện khi chưa hoàn thành 3 bước
☐ Quickstart: progress bar "X of 3 tasks complete" cập nhật đúng
☐ Quickstart: accordion — click step expand, collapse step khác
☐ Step 1 "Configure order editing feature" → auto-check khi Settings saved, có "Configure Now" button
☐ Step 2 "Enable app" → auto-check khi app embed active, có "Enable app" + "Refresh status" buttons
☐ Step 3 "Add order editing widget" → auto-check khi theme block active, có "Open Theme Editor" + "Refresh status"
☐ Quickstart: dismiss (✕) → ẩn vĩnh viễn, lưu onboardingDismissed
☐ Quickstart: collapse/expand (▲) toàn bộ card hoạt động
☐ Quickstart: khi 3/3 → card ẩn tự động
☐ Helpdesk card luôn hiện ở cuối dashboard (không dismiss được)
☐ Helpdesk "💬 Chat with us" → mở live chat widget
☐ **Activity page**: table với 5 cột (Order, Customer, Changes, **Last updated**, Details)
☐ Activity: Order link → mở Shopify admin order page (new tab)
☐ Activity: Changes badges đúng màu (Address=info, Cancel=critical, Note=default, Tags=default)
☐ Activity: **"Last updated" column update realtime** trong session active (= timestamp `lastActionAt` của action cuối). Khi customer save thêm → column update ngay. Session đóng → frozen
☐ Activity: Entry active session hiện badge `● Editing in progress (Xm)` với count-up timer + pulse animation
☐ Activity: click "View →" → mở detail modal theo loại (Address/Cancel/Note/Tags/Multi)
☐ Activity: modal Before/After 2-column với strikethrough đỏ / xanh
☐ Activity: pagination (5 items/page)
☐ Settings sections (theo thứ tự): **Allowed Edit Types → Edit Limits → Notifications**
☐ Settings: 3 allowed edit types (address, cancel, note) — toggle bật/tắt
☐ Settings: "Allow edits for" checkbox — default **OFF** (edit cho tới khi fulfilled). Khi check → hiện 2 input (hours 0-720, minutes 0-59)
☐ Settings: "Maximum edits per order" checkbox — default **OFF** (unlimited). Khi check → hiện number input (1-20, default 5). Count theo **session-based** (1 session = multiple saves trong 5 phút)
☐ Settings: Notification level radio group — 2 options (`"all"` default / `"cancel_only"`) lưu vào field `notificationLevel`
☐ **Email delivery hybrid**: Cancel event → gửi email ngay; Edit events → gửi khi session đóng (**5 phút cố định từ save đầu**, không reset khi có save thêm)
☐ **Session batching**: Multiple saves trong 5 phút từ save đầu = 1 session = 1 email = +1 vào maxEdits count. Session đóng **đúng 5 phút** từ save đầu
☐ **Hit max edits UI**: Khi reach limit → disable all Save buttons + show message "You've reached the maximum edits for this order. Please contact the store for further changes." Cancel vẫn allowed
☐ Settings save → Toast "Settings saved successfully" + [Discard] reset
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

☐ Partial fulfillment → block ẩn (không edit được khi đã ship một phần)
☐ Concurrent edits → "Order is being edited" error, retry 30s
☐ Order > 60 ngày → block không hiện
☐ Timer hết khi đang edit → cho hoàn thành form đang mở, không bắt đầu edit mới
☐ Merchant đổi time window → order cũ giữ nguyên, chỉ áp dụng order mới
☐ Tab minimize/focus lại → sync timer từ server, không dựa vào client timer
☐ Network timeout → retry button, no partial commit
☐ orderCancel API lỗi → rollback, hiện error, MC phải xử lý thủ công

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

**`editSettings` schema:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| shopId | string | — | Shop identifier (doc ID) |
| allowAddressEdit | boolean | `true` | Cho phép customer edit shipping address |
| allowCancelOrder | boolean | `true` | Cho phép customer hủy đơn |
| allowEditNote | boolean | `true` | Cho phép customer edit order note |
| timeWindowEnabled | boolean | `false` | Có giới hạn thời gian edit không. Default `false` = customer có thể edit cho tới khi order fulfilled |
| timeWindowHours | number | `2` | Hours — chỉ dùng khi `timeWindowEnabled = true` (0-720) |
| timeWindowMinutes | number | `0` | Minutes — chỉ dùng khi `timeWindowEnabled = true` (0-59) |
| maxEditsEnabled | boolean | `false` | Có giới hạn số edit sessions per order không. Default `false` = unlimited |
| maxEditsPerOrder | number | `5` | Max sessions per order (1-20). Chỉ dùng khi `maxEditsEnabled = true`. 1 session = multiple saves trong 5 phút cùng 1 order |
| notificationLevel | string | `"all"` | `"all"` = email mọi thay đổi (edit + cancel) / `"cancel_only"` = chỉ email khi cancel |
| updatedAt | timestamp | — | Last update |

**`orderEdits` schema:**

> 1 document = 1 edit session (có thể chứa nhiều actions nếu customer làm nhiều saves trong 5 phút).

| Field | Type | Description |
|-------|------|-------------|
| shopId | string | Shop identifier |
| orderId | string | Shopify order GID |
| orderNumber | string | Order # |
| sessionId | string | Unique session ID (ex: `sess_abc123`) |
| sessionStartAt | timestamp | Timestamp save đầu tiên của session — window cố định 5 phút từ đây. **KHÔNG đổi khi có save thêm** |
| lastActionAt | timestamp | Timestamp action cuối cùng trong session. Update mỗi save mới. **Chỉ dùng cho display** (column "Last updated" ở Activity page), KHÔNG ảnh hưởng session timing |
| sessionStatus | string | `active` (đang trong window 5 phút từ start) / `completed` (đã đóng) |
| actions | array | List các saves trong session: `[{ type, at, before, after }, ...]`. Mỗi action có `type: "address" \| "note" \| "tags" \| "variant"` |
| editType | string | Summary type: tên action nếu chỉ có 1; `"multi"` nếu nhiều actions |
| editedBy | string | `customer` / `merchant` |
| priceDiff | number | Tổng price diff của session (+ = charge, - = refund) |
| emailSentAt | timestamp | Thời điểm merchant email gửi (null nếu chưa gửi) |
| status | string | `success` / `failed` |
| createdAt | timestamp | — |

> **Cancel** là separate document (không gom vào session). `editType = "cancel"`, always 1 action, email gửi ngay.

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
| 7 | Activity page (detail modals) + Merchant editing từ Shopify Order | Admin full |
| 8 | Email notifications + Billing | MVP complete |

**Tổng: ~6 tuần submit + ~2 tuần hoàn thiện MVP = 8 tuần đến MVP full.**

---

**Version**: 5.0
**Updated**: 2026-04-17
**Status**: Submit-First PRD (sync theo UI mockup)
