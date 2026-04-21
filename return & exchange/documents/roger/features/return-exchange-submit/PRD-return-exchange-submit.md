# Avada Return & Exchange — PRD Submit Version

### History

| Phien ban | Ngay | Tac gia | Loai | Mo ta |
|-----------|------|---------|------|-------|
| 1.0 | 13/04/2026 | Roger | A | Tao PRD Submit — rut gon tu MVP |

> A = Added, M = Modified, D = Deleted

---

## Muc Luc

1. [Executive Summary](#1-executive-summary)
2. [Personas & User Stories](#2-personas--user-stories)
3. [Product Solutions](#3-product-solutions)
4. [Design Description](#4-design-description)
5. [Acceptance Criteria](#5-acceptance-criteria)
6. [Timeline](#6-timeline)

---

## 1. Executive Summary

- **Muc tieu #1**: Pass Shopify App Store review lan dau tien — khong bi reject.
- **Chien luoc**: Submit duoi dang FREE app (khong can billing) -> giam complexity, giam surface area bi review, tang xac suat pass.
- **Pham vi**: Chi giu lai cac features **toi thieu** de app hoat dong end-to-end: customer tu submit return request, merchant review + approve/reject + process refund, va dap ung moi yeu cau bat buoc cua Shopify.
- **Sau khi publish**: Bat lai store credit, photo upload, auto-approve, notifications, billing qua app update (Shopify cho phep, khong can re-submit).
- **Free plan**: 5 returns/thang — du gia tri, merchant thay app hoat dong.
- **Khac biet so voi MVP PRD**: Ban nay la tap con (subset) — cung kien truc, cung code, chi an/bo features khong can cho review.

---

## 2. Personas & User Stories

### Personas

| Persona | Profile | Nhu cau |
|---------|---------|---------|
| **Customer** | Khach mua hang tren Shopify store | Tu tao return request ma khong can email support |
| **Merchant** | Chu cua hang Shopify, 50-2.000 don/thang | Quan ly returns, approve/reject, xu ly refund tu admin |

### User Stories (Submit Scope — 10 stories, tat ca P0)

| ID | User Story | Priority |
|----|-----------|----------|
| US-01 | La **customer**, toi muon **tra cuu don hang** bang order number + email, de bat dau quy trinh return. | P0 |
| US-02 | La **customer**, toi muon **chon san pham can tra** va so luong, de chi return nhung items toi muon. | P0 |
| US-03 | La **customer**, toi muon **chon ly do tra hang** tu danh sach co san, de merchant hieu tai sao toi return. | P0 |
| US-04 | La **customer**, toi muon **xem xac nhan return** voi dia chi kho hang, de toi biet gui hang ve dau. | P0 |
| US-05 | La **customer**, toi muon **theo doi trang thai return**, de biet request cua toi dang o buoc nao. | P0 |
| US-06 | La **merchant**, toi muon **xem danh sach return requests** voi tabs, search, pagination, de quan ly tat ca returns. | P0 |
| US-07 | La **merchant**, toi muon **approve hoac reject** return request va **process refund**, de xu ly return nhanh chong. | P0 |
| US-08 | La **merchant**, toi muon **cau hinh return window va return reasons**, de kiem soat chinh sach return. | P0 |
| US-09 | La **merchant**, toi muon **xem dashboard co ban**, de biet app dang hoat dong va co gia tri. | P0 |
| US-10 | La **merchant**, toi muon **onboarding don gian**, de setup app trong vai phut. | P0 |

---

## 3. Product Solutions

### 3.1. Solution Overview

App gom 2 phan:
- **Storefront**: Theme App Extension (App Block) — Customer Return Portal: order lookup -> select items -> return reason -> confirm -> success page + return tracking page
- **Admin**: Embedded Shopify Admin app (Polaris) — Dashboard + Return Requests List + Request Detail + Settings + Onboarding

### 3.2. Scope

**TRONG scope (Submit):**

| # | Feature | Ly do phai co |
|---|---------|---------------|
| 1 | **Customer return portal: order lookup** (order# + email) | Entry point — customer can tra cuu don hang |
| 2 | **Customer select items + quantity** | Core value — chon items muon return |
| 3 | **Customer return reason** (text only, NO photo upload) | Merchant can biet ly do — giam complexity bo photo |
| 4 | **Customer confirm + success page** (auto-refund, NO resolution choice) | End-to-end flow — giam complexity bo store credit choice |
| 5 | **Return tracking page** (basic: status text + date, NO stepper visual) | Customer can theo doi — simple text-based |
| 6 | **Admin Return Requests list** (full: tabs, search, pagination) | Merchant can quan ly returns — Shopify review yeu cau |
| 7 | **Admin Request Detail** (Approve/Reject + Process Refund only) | Core merchant action — NO store credit, NO internal notes |
| 8 | **Admin Settings** (return window + return reasons management ONLY) | Merchant can control — Shopify review yeu cau |
| 9 | **Admin Dashboard** (welcome + link to returns + "Edits left: X/5") | Simple value indicator — NO metrics cards, NO activity feed |
| 10 | **Simple onboarding** (2 steps: configure settings + check portal works) | Shopify reviewer check first-time experience |
| 11 | **GDPR webhooks** (3 endpoints) | BAT BUOC — ly do reject #1 neu thieu |
| 12 | **App uninstall cleanup** | BAT BUOC — ly do reject neu thieu |
| 13 | **Webhook HMAC verification** | BAT BUOC — security requirement |

**NGOAI scope (them sau khi publish qua app update):**

| Feature | Ly do defer | Khi nao them |
|---------|-------------|---------------|
| Store Credit resolution | Submit = refund only, giam complexity | Post-approval update |
| Photo upload on return reason | Khong anh huong core value | Post-approval update |
| Auto-approve logic | Nice-to-have, manual review du cho submit | Post-approval update |
| Non-returnable items management | Merchant dung manual workaround | Post-approval update |
| Restocking fee | Giam complexity cho submit | Post-approval update |
| Return conditions checkboxes | Giam complexity cho submit | Post-approval update |
| Notifications page (email toggles) | Khong anh huong core flow | Post-approval update |
| Dashboard metrics & activity feed | Dashboard basic du cho review | Post-approval update |
| Internal notes on returns | Nice-to-have | Post-approval update |
| Billing/Pricing tiers | FREE app strategy — khong can cho review | Post-approval update |
| Return tracking stepper visual | Text-based du cho submit | Post-approval update (P1) |
| Resolution choice (refund vs store credit) | Submit = auto-refund only | Post-approval update |
| Customer blocklist | Nice-to-have | Post-approval update |
| Return shipping address config | Dung Shopify store address mac dinh | Post-approval update |

### 3.3. Chien luoc Submit

1. **FREE app** — khong implement billing -> giam 1 tuan dev, bo qua billing review
2. **Sau khi publish** -> them billing qua app update (Shopify cho phep, khong can re-submit)
3. **Free tier = 5 returns/thang** — du gia tri, merchant thay app hoat dong
4. **Auto-refund** — customer submit return -> merchant approve -> process refund. Khong co resolution choice (refund vs store credit) -> giam complexity
5. **Demo store** san sang voi sample products + test orders co fulfilled items
6. **Video walkthrough** 3-5 phut (merchant setup flow + customer return flow)
7. **Test account** cho Shopify reviewer (neu can)

### 3.4. UI Flow

#### Flow A: Customer Self-Service Return

```
Storefront Page (App Block) -> Order Lookup (order# + email) -> Validate
    |
    v
Select Items -> chon items + quantity + return reason (text only)
    |
    v
Confirm Return -> review summary -> Submit
    |
    v
Success Page -> Return ID + warehouse address + tracking link
```

**Man hinh 1: Order Lookup (Theme App Extension — App Block)**

```
+---------------------------------------------+
|  Avada Return & Exchange                     |
|                                              |
|  Start a Return                              |
|                                              |
|  Order Number                                |
|  [#1234                              ]       |
|                                              |
|  Email Address                               |
|  [john@example.com                   ]       |
|                                              |
|  [Look Up Order]                             |
|                                              |
|  Need help? Contact us                       |
+---------------------------------------------+
```

| Hanh dong | Ket qua |
|-----------|---------|
| Click "Look Up Order" | Validate order# + email -> hien Select Items |
| Order not found | Error: "Order not found. Please check your order number and email." |
| Order outside return window | Error: "This order is not eligible for returns." |
| All items already returned | Error: "All items in this order have been returned." |

**Man hinh 2: Select Items + Return Reason**

```
+---------------------------------------------+
|  Return for Order #1234                      |
|                                              |
|  Select items to return:                     |
|                                              |
|  [x] [img] T-Shirt (M, Black)    $29.99    |
|       Qty to return: [-] [1] [+]             |
|       Reason: [Size too small       v]       |
|       Details: [optional comment...   ]      |
|                                              |
|  [ ] [img] Jeans (32, Blue)       $49.99    |
|       Qty to return: [-] [1] [+]             |
|       Reason: [Select reason...     v]       |
|       Details: [optional comment...   ]      |
|                                              |
|  Return value: $29.99                        |
|                                              |
|  [Back]              [Continue]              |
+---------------------------------------------+
```

| Hanh dong | Ket qua |
|-----------|---------|
| Check item | Enable qty + reason cho item do |
| Select reason | Bat buoc truoc khi Continue |
| Click Continue | Chuyen sang Confirm screen |
| Khong chon item nao | "Continue" disabled |

**Man hinh 3: Confirm Return**

```
+---------------------------------------------+
|  Review Your Return                          |
|                                              |
|  Items to return:                            |
|  - T-Shirt (M, Black) x1 — $29.99          |
|    Reason: Size too small                    |
|                                              |
|  Refund amount: $29.99                       |
|  Refund to: Original payment method          |
|  Processing time: 5-10 business days         |
|                                              |
|  [x] I confirm that the items meet the      |
|      return conditions.                      |
|                                              |
|  [Back]          [Submit Return Request]     |
+---------------------------------------------+
```

| Hanh dong | Ket qua |
|-----------|---------|
| Click "Submit Return Request" | Tao return request -> Success page |
| Chua check confirmation | "Submit" disabled |
| Click "Back" | Quay lai Select Items |

**Man hinh 4: Success Page**

```
+---------------------------------------------+
|  Return Request Submitted!                   |
|                                              |
|  [checkmark icon]                            |
|                                              |
|  Return ID: RET-001234                       |
|  Status: Submitted — Awaiting review         |
|                                              |
|  Please ship your items to:                  |
|  +---------------------------------------+  |
|  | Acme Store Returns                     |  |
|  | 123 Warehouse Blvd                     |  |
|  | Los Angeles, CA 90001                  |  |
|  | United States                          |  |
|  +---------------------------------------+  |
|                                              |
|  We recommend using a tracked shipping       |
|  service.                                    |
|                                              |
|  [Track Your Return]                         |
+---------------------------------------------+
```

**Man hinh 5: Return Tracking Page**

```
+---------------------------------------------+
|  Track Your Return                           |
|                                              |
|  Return ID: RET-001234                       |
|  Order: #1234                                |
|                                              |
|  Status: Approved                            |
|  Last updated: April 13, 2026               |
|                                              |
|  Items:                                      |
|  - T-Shirt (M, Black) x1                    |
|    Reason: Size too small                    |
|                                              |
|  Resolution: Refund $29.99                   |
|  (to original payment method)                |
|                                              |
|  Timeline:                                   |
|  Apr 12 — Return submitted                  |
|  Apr 13 — Return approved                   |
+---------------------------------------------+
```

> **Luu y**: Tracking page chi hien text + date. KHONG co visual stepper. Stepper la P1 feature.

#### Flow B: Merchant Admin

```
Mo app -> Dashboard (welcome + link returns + edits left counter)
       -> Return Requests (list + tabs + search + pagination)
       -> Request Detail (approve/reject + process refund)
       -> Settings (return window + return reasons)
```

> **Luu y**: Dashboard chi co welcome message va link. KHONG co metrics cards, KHONG co activity feed.

**Man hinh 6: Admin Dashboard**

```
+---------------------------------------------+
|  Avada Return & Exchange                     |
|  Dashboard   Returns   Settings              |
|                                              |
|  Welcome to Avada Return & Exchange!         |
|                                              |
|  Manage your store's return requests         |
|  easily from one place.                      |
|                                              |
|  +---------------------------------------+  |
|  | Returns left: 3/5 this month          |  |
|  +---------------------------------------+  |
|                                              |
|  [View Return Requests ->]                   |
|                                              |
|  +---------------------------------------+  |
|  | Getting Started                        |  |
|  | [x] Configure return settings          |  |
|  | [ ] Check your return portal works     |  |
|  | [Complete Setup ->]                    |  |
|  +---------------------------------------+  |
+---------------------------------------------+
```

| Item | Mo ta |
|------|-------|
| Welcome message | Loi chao + mo ta ngan |
| Returns left counter | X/5 free plan, reset dau thang |
| View Return Requests | Link sang Returns list page |
| Getting Started | Onboarding checklist (an khi hoan tat) |

**Man hinh 7: Admin Return Requests List**

```
+---------------------------------------------+
|  Return Requests                             |
|                                              |
|  [All] [Pending] [Approved] [Completed]      |
|  [Rejected]                                  |
|                                              |
|  Search: [order#, customer name, email  ]    |
|                                              |
|  +---+--------+----------+--------+------+  |
|  | # | Order  | Customer | Status | Date |  |
|  +---+--------+----------+--------+------+  |
|  | RET-001 | #1234 | John D. | Pending | Apr 12 |
|  | RET-002 | #1230 | Jane S. | Approved | Apr 11 |
|  | RET-003 | #1228 | Bob K.  | Refunded | Apr 10 |
|  | RET-004 | #1225 | Alice M.| Rejected | Apr 09 |
|  +---+--------+----------+--------+------+  |
|                                              |
|  [< Previous]  Page 1 of 3  [Next >]        |
+---------------------------------------------+
```

| Item | Mo ta |
|------|-------|
| Tabs | All / Pending Review / Approved / Completed / Rejected |
| Search | Free-text search by order#, customer name, email (debounce 300ms) |
| Table columns | Return ID, Order Name, Customer, Status (badge), Requested Date |
| Pagination | Server-side, 20 items/page |
| Click row | Mo Request Detail page |
| Empty state | "No return requests yet" + link to portal setup |

**Man hinh 8: Admin Request Detail**

```
+---------------------------------------------+
|  <- Return Requests                          |
|  Return RET-001234           [Approve] [Reject]
|  Status: Pending Review                      |
|                                              |
|  +--- Return Info -----------------------+  |
|  | Order: #1234 (link to Shopify order)  |  |
|  | Customer: John Doe (john@example.com) |  |
|  | Requested: April 12, 2026             |  |
|  | Resolution: Refund (auto)             |  |
|  +---------------------------------------+  |
|                                              |
|  +--- Return Items ----------------------+  |
|  | [img] T-Shirt (M, Black)              |  |
|  | Qty: 1 of 2 ordered                   |  |
|  | Price: $29.99                          |  |
|  | Reason: Size too small                 |  |
|  | Detail: "Runs very small, need L"     |  |
|  +---------------------------------------+  |
|                                              |
|  +--- Activity Timeline -----------------+  |
|  | Apr 12 — Return submitted by customer |  |
|  +---------------------------------------+  |
+---------------------------------------------+
```

**Actions theo status:**

| Current Status | Available Actions |
|---------------|-------------------|
| **Requested** | Approve, Reject |
| **Approved** | Process Refund |
| **Refund Issued** | No actions (read-only) |
| **Rejected** | No actions (read-only) |
| **Completed** | No actions (read-only) |

**Action: Approve**
- Changes status to "Approved"
- Activity timeline ghi nhan: "Return approved by merchant"

**Action: Reject**
- Mo modal -> merchant chon rejection reason (dropdown: Outside return window, Item not eligible, Item condition not acceptable, Other)
- Optional: free-text explanation
- Changes status to "Rejected"

**Action: Process Refund**
- Mo confirmation modal:
  - Refund amount (calculated tu return items)
  - Refund method: "Refund to original payment method"
  - Confirm button
- On confirm: Call Shopify `refundCreate` API
- Changes status to "Refund Issued" -> "Completed"
- Call `reverseFulfillmentOrderDispose` de restock items

> **Luu y Submit**: KHONG co Store Credit, KHONG co internal notes, KHONG co Request More Info action.

**Man hinh 9: Admin Settings**

```
+---------------------------------------------+
|  Settings                        [Save]      |
|                                              |
|  +--- Return Window -----------------+       |
|  | Returns accepted within:          |       |
|  | [30] days after fulfillment       |       |
|  +---------------------------------- +       |
|                                              |
|  +--- Return Reasons -----------------+      |
|  | Manage reasons customers can       |      |
|  | choose when returning items:       |      |
|  |                                    |      |
|  | [drag] Size too small        [Edit][x] |  |
|  | [drag] Size too large        [Edit][x] |  |
|  | [drag] Item damaged          [Edit][x] |  |
|  | [drag] Item not as described  [Edit][x] |  |
|  | [drag] Changed my mind       [Edit][x] |  |
|  | [drag] Ordered wrong item    [Edit][x] |  |
|  | [drag] Other                 [Edit][x] |  |
|  |                                    |      |
|  | [+ Add Reason]                     |      |
|  +------------------------------------+      |
|                                              |
|  +--- Return Address -----------------+      |
|  | Address where customers ship       |      |
|  | returns (auto from store address): |      |
|  |                                    |      |
|  | 123 Main St, City, State 12345    |      |
|  | United States                      |      |
|  +------------------------------------+      |
+---------------------------------------------+
```

| Item | Mo ta |
|------|-------|
| Return window | Numeric input: 1-365 days, default 30 |
| Return reasons | List voi drag-to-reorder, edit, delete, add (max 20) |
| Return address | Auto-populated tu Shopify store address. Read-only trong submit (editable trong MVP full) |
| Save button | Luu settings -> toast "Settings saved successfully" |

> **Luu y Submit**: KHONG co auto-approve toggle, KHONG co non-returnable items picker, KHONG co restocking fee, KHONG co return conditions, KHONG co customer blocklist, KHONG co notification toggles.

**Man hinh 10: Onboarding (First-time)**

```
+---------------------------------------------+
|  Welcome to Avada Return & Exchange!         |
|                                              |
|  Get started in 2 steps:                     |
|                                              |
|  [x] Step 1: Configure return settings       |
|      Set your return window and reasons.     |
|      [Go to Settings]                        |
|                                              |
|  [ ] Step 2: Check your return portal        |
|      Make sure the portal works on your      |
|      store.                                  |
|      [Open Portal]                           |
|      (Opens storefront return page)          |
|                                              |
|  Need help? [View Setup Guide]               |
+---------------------------------------------+
```

### 3.5. Interaction with Shopify

**Shopify Returns API (GraphQL):**
- `returnCreate` — khi customer submit return request (tao return tren Shopify)
- `returnApprove` — khi merchant approve return request
- `returnDecline` — khi merchant reject return request
- `refundCreate` — khi merchant process refund
- `returnClose` — khi return completed (sau refund)
- `returnCancel` — neu can cancel return
- `reverseFulfillmentOrderDispose` — khi merchant mark item received (restock inventory)

**Order Query (GraphQL):**
- `order` query — fetch order details cho customer portal (items, fulfillment status, customer email)

**Webhooks nhan:**
- `returns/create`, `returns/update` — sync return status changes
- `app/uninstalled` — **cleanup bat buoc**

**GDPR Webhooks (BAT BUOC):**
- `customers/data_request` — export customer data JSON
- `customers/redact` — anonymize customer data
- `shop/redact` — delete all shop data

**Extension Points:**
- Theme App Extension (App Block) — Return Portal tren storefront page

### 3.6. Error Messages

| Error | Message | Action |
|-------|---------|--------|
| Order not found | "Order not found. Please check your order number and email address." | Cho nhap lai |
| Order outside return window | "This order is not eligible for returns. The return window has expired." | An return options |
| All items already returned | "All items in this order have already been returned." | An return options |
| Order not fulfilled | "This order has not been shipped yet. Returns are only available after delivery." | An return options |
| Refund failed | "We couldn't process the refund. Please try again." | Retry button |
| Monthly limit reached | "This store has reached the monthly return limit. Please try again next month." | An submit button |
| Concurrent request | "This return is being processed. Please try again in a moment." | Retry 30s |
| Network error | "Something went wrong. Please check your connection and try again." | Retry button |

### 3.7. Success Messages

| Event | Message |
|-------|---------|
| Return submitted | "Return request submitted! We'll review it shortly." |
| Return approved | "Return approved. Please ship your items to the address provided." |
| Return rejected | "Return request has been declined. Reason: [reason]" |
| Refund processed | "Refund of $X.XX has been processed. It may take 5-10 business days." |
| Settings saved | "Settings saved successfully." |

---

## 4. Design Description

### 4.1. Storefront — Order Lookup (Theme App Extension — App Block)

> Hien tren storefront page noi merchant add App Block

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Title | Text | Y | "Start a Return" | Tieu de section | Max 100 chars |
| Order number input | Text | Y | — | Placeholder "#1234" | Required, Shopify order format |
| Email input | Email | Y | — | Placeholder "email@example.com" | Required, valid email format |
| Lookup button | Button | Y | "Look Up Order" | Primary CTA -> validate + fetch order | Loading state khi processing |
| Error message | Banner | N | — | Hien khi validation fail | Auto-dismiss sau 5s hoac khi user type |

### 4.2. Storefront — Select Items + Return Reason

> Hien sau khi order lookup thanh cong

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Order number | Text | Y | — | "#XXXX" display | — |
| Items list | List | Y | — | Tat ca eligible line items | Exclude already returned items |
| Item checkbox | Checkbox | Y | unchecked | Chon item de return | Min 1 item checked |
| Product image | Thumbnail | Y | — | 64x64 product image | — |
| Product title | Text | Y | — | Product name + variant | — |
| Unit price | Currency | Y | — | Price per unit | — |
| Qty selector | Stepper | Y | 1 | So luong muon return | Min 1, Max ordered qty |
| Return reason | Select | Y | — | Dropdown tu merchant's configured reasons | Required khi item checked |
| Reason detail | Textarea | N | — | Free-text comment | Max 500 chars |
| Return value | Currency | Y | — | Running subtotal cua items da chon | Auto calc |
| Back button | Button | Y | — | Quay lai Order Lookup | — |
| Continue button | Button | Y | — | Chuyen sang Confirm | Disabled neu no item selected |

### 4.3. Storefront — Confirm Return

> Man hinh review truoc khi submit

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Items summary | List | Y | — | Product name, qty, reason cho tung item | Min 1 item |
| Refund amount | Currency | Y | — | Tong refund | Auto calc |
| Refund method | Text | Y | — | "Original payment method" | — |
| Processing time | Text | Y | — | "5-10 business days" | — |
| Confirmation checkbox | Checkbox | Y | unchecked | "I confirm items meet return conditions" | Required |
| Back button | Button | Y | — | Quay lai Select Items | — |
| Submit button | Button | Y | — | "Submit Return Request" | Disabled khi checkbox unchecked, loading state |

### 4.4. Storefront — Success Page

> Hien sau khi submit thanh cong

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Success icon | Icon | Y | — | Checkmark | — |
| Title | Text | Y | — | "Return Request Submitted!" | — |
| Return ID | Text | Y | — | "RET-XXXXXX" | — |
| Status | Text | Y | — | "Submitted — Awaiting review" | — |
| Warehouse address | Card | Y | — | Merchant return address (tu Shopify store) | — |
| Shipping note | Text | Y | — | "We recommend using a tracked shipping service" | — |
| Track button | Button | Y | — | Link sang tracking page | — |

### 4.5. Storefront — Return Tracking Page

> Accessible qua URL voi return ID, hoac tu order lookup

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Return ID | Text | Y | — | "RET-XXXXXX" | — |
| Order number | Text | Y | — | "#XXXX" | — |
| Current status | Badge | Y | — | Status text voi color | — |
| Last updated | Date | Y | — | Timestamp cua last status change | — |
| Items list | List | Y | — | Items being returned + reason | — |
| Resolution info | Text | N | — | "Refund $XX.XX" khi resolved | Hien khi completed |
| Timeline | List | Y | — | Chronological: date — event text | Simple text, NO stepper |

### 4.6. Admin — Dashboard

> Trang mac dinh khi mo app

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Welcome title | Text | Y | — | "Welcome to Avada Return & Exchange!" | — |
| Welcome description | Text | Y | — | "Manage your store's return requests easily" | — |
| Returns left counter | Card | Y | 5 | "Returns left: X/5 this month" | Reset dau thang |
| View Returns link | Button | Y | — | Link sang Return Requests page | — |
| Onboarding checklist | Card | N | — | 2-step checklist (hien cho new merchants) | An khi hoan tat |
| Empty state | Card | N | — | "No return requests yet" khi chua co data | — |

### 4.7. Admin — Return Requests List

> Danh sach tat ca return requests

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Tabs | Tabs | Y | "All" | All / Pending Review / Approved / Completed / Rejected | — |
| Search input | Text | Y | — | Free-text search by order#, name, email | Debounce 300ms |
| Return ID column | Text | Y | — | "RET-XXXXXX" | — |
| Order Name column | Text | Y | — | "#XXXX" | Link to Shopify order |
| Customer column | Text | Y | — | Customer name | — |
| Status column | Badge | Y | — | Color-coded status badge | — |
| Date column | Date | Y | — | Requested date | — |
| Items count column | Number | Y | — | So items trong return | — |
| Pagination | Pagination | Y | — | 20 items/page, Previous/Next | Server-side |
| Row click | Action | Y | — | Mo Request Detail page | — |
| Empty state | Card | N | — | "No return requests yet" + setup link | — |

### 4.8. Admin — Request Detail

> Chi tiet return request + actions

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Return ID | Text | Y | — | "RET-XXXXXX" | — |
| Status badge | Badge | Y | — | Current status | — |
| Order link | Link | Y | — | Link sang Shopify order | — |
| Customer info | Text | Y | — | Name + email | — |
| Requested date | Date | Y | — | Timestamp | — |
| Resolution type | Text | Y | — | "Refund (auto)" | — |
| Items list | List | Y | — | Product image, title, variant, qty, price, reason, detail | — |
| Activity timeline | List | Y | — | Chronological events: date — action text | Simple list |
| Approve button | Button | N | — | Hien khi status = Requested | Primary |
| Reject button | Button | N | — | Hien khi status = Requested | Destructive |
| Process Refund button | Button | N | — | Hien khi status = Approved | Primary |
| Reject modal | Modal | N | — | Rejection reason dropdown + optional text | Required reason |
| Refund modal | Modal | N | — | Refund amount + confirm | — |

### 4.9. Admin — Settings

> Cau hinh return policy

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Return window | Number | Y | 30 | So ngay sau fulfillment cho phep return | 1-365 days |
| Return reasons list | List | Y | 7 defaults | Sortable list voi edit/delete/add | Max 20 reasons |
| Reason item | Text | Y | — | Reason text | Max 200 chars |
| Add reason button | Button | Y | — | Them reason moi | — |
| Return address | Card | Y | — | Auto-populated tu Shopify store address | Read-only |
| Save button | Button | Y | — | Luu settings -> toast | — |

### 4.10. Admin — Onboarding (First-time)

> Hien cho merchant lan dau mo app, an khi hoan tat

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Welcome title | Text | Y | — | "Welcome to Avada Return & Exchange!" | — |
| Step 1 | Checklist | Y | unchecked | "Configure return settings" -> link Settings | Auto-check khi settings saved |
| Step 2 | Checklist | Y | unchecked | "Check your return portal" -> mo storefront | Auto-check khi merchant visits portal |
| Setup guide link | Link | N | — | Link toi help docs | — |

---

## 5. Acceptance Criteria

### Functional — Customer

- [ ] Customer truy cap return portal tu storefront page (App Block)
- [ ] Order lookup: nhap order# + email -> validate -> hien items
- [ ] Error messages ro rang khi order not found, expired, not fulfilled
- [ ] Select items: check items, chon qty, chon return reason (bat buoc)
- [ ] Optional detail comment (max 500 chars)
- [ ] Return value auto-calculated khi chon items
- [ ] Confirm screen: review items + refund amount + confirmation checkbox
- [ ] Submit tao return request trong Firestore + goi Shopify `returnCreate`
- [ ] Success page hien Return ID + warehouse address + tracking link
- [ ] Tracking page hien status text + date + items + timeline
- [ ] Tracking page update khi merchant approve/reject/refund
- [ ] UI responsive mobile (>= 320px)
- [ ] Loading states tren tat ca buttons khi processing
- [ ] KHONG co photo upload (Submit scope)
- [ ] KHONG co resolution choice (auto-refund only)

### Functional — Merchant Admin

- [ ] Dashboard hien: welcome message + returns left counter (X/5) + link to returns
- [ ] Onboarding checklist cho new merchant (2 steps)
- [ ] Onboarding an sau khi hoan tat
- [ ] Return Requests list: tabs (All/Pending/Approved/Completed/Rejected)
- [ ] Search by order#, customer name, email (debounce 300ms, server-side)
- [ ] Pagination 20 items/page
- [ ] Click row -> mo Request Detail
- [ ] Request Detail: hien return info, items, activity timeline
- [ ] Approve action: change status to Approved
- [ ] Reject action: modal voi reason dropdown + optional text
- [ ] Process Refund: modal voi amount + confirm -> goi Shopify `refundCreate`
- [ ] Restock items qua `reverseFulfillmentOrderDispose`
- [ ] Settings: return window (1-365 days, default 30)
- [ ] Settings: return reasons management (add/edit/delete/reorder, max 20)
- [ ] Settings: return address display (read-only, tu Shopify store)
- [ ] Settings save -> toast "Settings saved successfully"
- [ ] App load < 3 giay
- [ ] Empty states khi chua co data

### Shopify App Store — BAT BUOC pass review

- [ ] **GDPR webhook: customers/data_request** -> return customer data JSON
- [ ] **GDPR webhook: customers/redact** -> anonymize/delete customer PII
- [ ] **GDPR webhook: shop/redact** -> delete ALL shop data after 48h
- [ ] **App uninstall** -> cleanup Firestore data, remove metafields
- [ ] **Webhook HMAC verification** tren tat ca webhook endpoints
- [ ] **Privacy Policy + Terms of Service** accessible (link trong app listing)
- [ ] **Performance**: storefront App Block khong giam qua 10 diem Lighthouse
- [ ] **LCP < 2.5s, INP < 200ms, CLS < 0.1** tren storefront pages
- [ ] **Demo store** san sang cho Shopify reviewer (co products + fulfilled test orders)
- [ ] **Video walkthrough** 3-5 phut (merchant setup + customer return flow)
- [ ] **App listing** day du: description, 6-8 screenshots, app icon

### Edge Cases

- [ ] Order chua fulfilled -> "Returns available after delivery"
- [ ] Tat ca items da returned -> "All items already returned"
- [ ] Partial return -> chi hien items chua return
- [ ] Previously returned items -> exclude tu eligible list
- [ ] Order > return window days -> "Return window expired"
- [ ] Monthly limit (5) reached -> "Return limit reached for this month"
- [ ] Concurrent return requests cho cung order -> "Return being processed, try again"
- [ ] Refund API failure -> rollback status, show error, allow retry
- [ ] Network timeout -> retry button, no partial commit
- [ ] Customer email khong match order -> "Order not found"
- [ ] Order co discount code -> refund calculated on actual paid amount
- [ ] Qty return > ordered qty -> cap at max ordered qty

### Security

- [ ] Tat ca API validate shopId (IDOR prevention)
- [ ] Customer portal verify order belongs to customer (order# + email match)
- [ ] Webhook HMAC signature verification
- [ ] Access tokens encrypted in Firestore
- [ ] No direct Shopify API calls from frontend (proxy qua backend)
- [ ] Rate limiting per shop (100 calls/minute)
- [ ] Input sanitization tren tat ca user inputs
- [ ] Return reason text sanitized (XSS prevention)

### Data Model (Firestore)

| Collection | Doc ID | Purpose |
|-----------|--------|---------|
| `shops` | shopId | Shop config, access token (encrypted), plan info |
| `returnSettings` | shopId | Return policy config (window, reasons) |
| `returnRequests` | auto | Return request data + status |
| `returnItems` | auto | Items trong moi return request |
| `webhookLogs` | auto | Idempotency tracking (TTL 7 ngay) |

**`shops` schema:**

| Field | Type | Description |
|-------|------|-------------|
| shopId | string | Shopify shop domain |
| accessToken | string | Encrypted access token |
| plan | string | `free` (luon la free cho submit version) |
| monthlyReturnCount | number | Dem returns trong thang, reset ngay 1 |
| monthlyReturnLimit | number | 5 (free plan) |
| onboardingCompleted | boolean | Da hoan tat onboarding chua |
| installedAt | timestamp | Thoi diem install |
| uninstalledAt | timestamp | Thoi diem uninstall (nullable) |

**`returnSettings` schema:**

| Field | Type | Description |
|-------|------|-------------|
| shopId | string | Shop identifier |
| returnWindow | number | So ngay cho phep return (default: 30) |
| returnReasons | array | Array of {id, text, position, enabled} |
| returnAddress | object | Auto-populated tu Shopify store address |
| updatedAt | timestamp | — |

**`returnRequests` schema:**

| Field | Type | Description |
|-------|------|-------------|
| shopId | string | Shop identifier |
| shopifyReturnId | string | Shopify Return GID (tu returnCreate) |
| orderId | string | Shopify order GID |
| orderNumber | string | Order # (e.g., "#1234") |
| customerName | string | Ten khach hang |
| customerEmail | string | Email khach hang |
| status | string | `requested` / `approved` / `rejected` / `refund_issued` / `completed` |
| refundAmount | number | Tong so tien refund |
| rejectionReason | string | Ly do reject (nullable) |
| rejectionDetail | string | Chi tiet reject (nullable) |
| createdAt | timestamp | Thoi diem customer submit |
| updatedAt | timestamp | Last status change |

**`returnItems` schema:**

| Field | Type | Description |
|-------|------|-------------|
| returnRequestId | string | Reference to parent returnRequest |
| shopId | string | Shop identifier |
| lineItemId | string | Shopify line item GID |
| productTitle | string | Ten san pham |
| variantTitle | string | Ten variant |
| productImage | string | URL anh san pham |
| quantity | number | So luong return |
| unitPrice | number | Gia per unit |
| returnReason | string | Ly do return (tu danh sach) |
| reasonDetail | string | Free-text comment (nullable, max 500 chars) |
| createdAt | timestamp | — |

**`webhookLogs` schema:**

| Field | Type | Description |
|-------|------|-------------|
| webhookId | string | Idempotency key (Shopify webhook ID) |
| topic | string | Webhook topic |
| shopId | string | Shop identifier |
| processedAt | timestamp | — |
| expireAt | timestamp | TTL 7 ngay — Firestore auto-delete |

---

## 6. Timeline

### Timeline uoc tinh (Submit Version) — 6 tuan

| Tuan | Cong viec | Output |
|------|-----------|--------|
| **Tuan 1** | Foundation: monorepo setup, OAuth flow, Firestore repos (shops, returnSettings), app install/uninstall, Theme App Extension scaffold | Backend skeleton hoat dong |
| **Tuan 2** | Customer Portal: order lookup, select items + reason, confirm + submit, success page. Shopify `returnCreate` integration | Customer submit flow hoan chinh |
| **Tuan 3** | Admin Return Requests: list (tabs, search, pagination), Request Detail (info, items, timeline). Shopify `returnApprove`, `returnDecline` integration | Merchant review flow done |
| **Tuan 4** | Admin Actions: Process Refund (`refundCreate` + `reverseFulfillmentOrderDispose`), return tracking page, Dashboard + Settings pages | End-to-end flow complete |
| **Tuan 5** | GDPR webhooks, uninstall cleanup, webhook HMAC, onboarding, error handling, edge cases, mobile testing, QA | App Store ready |
| **Tuan 6** | App listing (description, screenshots, video), demo store setup (fulfilled orders), final QA -> **SUBMIT** | Submitted |

**Tong: 6 tuan** tu bat dau code den submit.

### Sau khi publish (Post-approval roadmap)

| Thu tu | Feature | Thoi gian uoc tinh |
|--------|---------|-------------------|
| 1 | Store Credit resolution (via `giftCardCreate`) | 3-4 ngay |
| 2 | Photo upload on return reason | 3-4 ngay |
| 3 | Billing/Pricing tiers (via app update) | 1 tuan |
| 4 | Notifications page (email toggles + templates) | 1 tuan |
| 5 | Auto-approve logic | 3-4 ngay |
| 6 | Dashboard metrics + activity feed | 3-4 ngay |
| 7 | Non-returnable items management | 2-3 ngay |
| 8 | Restocking fee | 2-3 ngay |
| 9 | Internal notes on returns | 2-3 ngay |
| 10 | Return tracking stepper visual | 2-3 ngay |

---

**Version**: 1.0
**Created**: 2026-04-13
**Status**: Submit Version PRD — Subset of MVP
