# Avada Returns & Exchanges — PRD Submit Version

### History

| Phien ban | Ngay | Tac gia | Loai | Mo ta |
|-----------|------|---------|------|-------|
| 1.0 | 13/04/2026 | Roger | A | Tao PRD Submit — rut gon tu MVP, chien luoc FREE app |

> A = Added, M = Modified, D = Deleted

**Jira Parent**: SB-10372 (April 2026)
**Jira Task**: SB-11294 — Build ban MVP app Returns & Exchanges (Submit scope)
**App name**: Avada Returns & Exchanges (plural — consistent voi App Store listing)
**App Store Subtitle**: Automate returns & refunds. 5 free returns/mo

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

| Truong | Gia tri |
|--------|---------|
| **Muc tieu #1** | Pass Shopify App Store review **lan dau** — khong bi reject |
| **Chien luoc** | Submit duoi dang **FREE app** (khong billing) -> giam surface area review |
| **Pham vi** | Chi giu **core features** de app hoat dong end-to-end: customer self-service return + merchant review/approve/refund |
| **Sau khi approve** | Bat full MVP qua **app update** (store credit, photo upload, auto-approve, notifications, billing) — Shopify cho phep, KHONG can re-submit |
| **Free tier** | **5 returns/thang** — du cho reviewer thay app co value |
| **Khac biet so voi MVP** | Ban nay la **subset (tap con)** — cung codebase, cung kien truc, chi an/bo features khong can cho review (feature flags OFF) |
| **Codebase** | 1 codebase duy nhat, toggle features qua `featureFlags` config trong Firestore |

**Triet ly**: MVP la goc (master), Submit = subset voi feature flags OFF. Sau khi Shopify approve -> toggle ON tung feature, release incremental updates.

---

## 2. Personas & User Stories

### 2.1. Personas

| Persona | Profile | Nhu cau chinh |
|---------|---------|---------------|
| **Customer** | Khach mua hang tren Shopify store | Tu tao return request khong can email support |
| **Merchant** | Chu cua hang Shopify (50-2.000 don/thang) | Quan ly returns, approve/reject, xu ly refund tu admin |

### 2.2. User Stories (Submit scope — tat ca P0)

| ID | User Story | Priority |
|----|-----------|----------|
| US-01 | La **customer**, toi muon **tim don hang** bang order# + email, de bat dau quy trinh return | P0 |
| US-02 | La **customer**, toi muon **chon items** muon return va so luong, de return dung thu can thiet | P0 |
| US-03 | La **customer**, toi muon **chon ly do return** (dropdown + detail text), de merchant hieu tinh hinh | P0 |
| US-04 | La **customer**, toi muon **xem warehouse address** de biet gui hang ve dau | P0 |
| US-05 | La **customer**, toi muon **track status return**, de biet request dang o buoc nao | P0 |
| US-06 | La **merchant**, toi muon **xem list return requests** voi filter/search, de quan ly toan bo returns | P0 |
| US-07 | La **merchant**, toi muon **Approve/Reject** return request, de kiem soat chinh sach | P0 |
| US-08 | La **merchant**, toi muon **Process Refund** khi da nhan hang, de hoan tat vong doi return | P0 |
| US-09 | La **merchant**, toi muon **cau hinh return window + return reasons**, de phu hop chinh sach store | P0 |
| US-10 | La **merchant**, toi muon **xem onboarding guide** khi moi cai app, de setup duoc trong vai phut | P0 |

---

## 3. Product Solutions

### 3.1. Solution Overview

App gom 2 phan, dung 1 codebase duy nhat:

| Phan | Cong nghe | Noi dung |
|------|-----------|----------|
| **Admin** | Embedded Shopify Admin app — **Polaris v12** + App Bridge | Dashboard + Return Requests List + Request Detail + Settings + Onboarding |
| **Storefront** | **Theme App Extension** (App Block) + **App Proxy** page | Customer Return Portal: order lookup -> items -> reason -> confirm -> success + tracking |

### 3.2. Scope

#### TRONG scope (Submit — 10 feature nhom)

| # | Feature | Ly do phai co |
|---|---------|---------------|
| 1 | **Customer Return Portal** (lookup -> items -> reason -> confirm) | Core value — customer self-service |
| 2 | **Customer Return Tracking** page (basic: status text + timeline) | Customer transparency |
| 3 | **Admin Return Requests List** (tabs, search, pagination) | Core merchant workflow |
| 4 | **Admin Request Detail** (Approve / Reject / Mark Received / Process Refund) | Core merchant actions |
| 5 | **Admin Settings** (return window + return reasons) | Merchant control — review yeu cau |
| 6 | **Admin Dashboard** (welcome + usage bar + onboarding checklist) | First-time UX cho reviewer |
| 7 | **Shopify Returns API sync** (`returnCreate`, `refundCreate`, `returnClose`) | Built for Shopify §5.12 — BAT BUOC |
| 8 | **GDPR webhooks** (3 endpoints) | BAT BUOC — ly do reject #1 neu thieu |
| 9 | **App uninstall cleanup** | BAT BUOC |
| 10 | **Onboarding** (2 steps) | Reviewer kiem tra first-time UX |

#### NGOAI scope (defer — enable sau khi approve)

| Feature | Ly do defer | Khi nao them |
|---------|-------------|---------------|
| Store Credit resolution | Submit = refund only | P1 — post-approval |
| Photo upload on return reason | Khong anh huong core value | P1 — post-approval |
| Auto-approve logic | Manual review du cho submit | MVP feature — post-approval |
| Non-returnable items picker | Merchant workaround manual | MVP feature |
| Restocking fee | Giam complexity | MVP feature |
| Return conditions checkboxes | Giam complexity | MVP feature |
| Email templates + preview | Shopify default email du cho submit | MVP feature |
| Dashboard metrics + charts | Simple dashboard du cho review | MVP feature |
| Analytics page | Nice-to-have | MVP feature |
| Branding customization | Default theme du cho review | MVP feature |
| Internal notes on returns | Nice-to-have | MVP feature |
| Automation rules builder | Advanced feature | P1 |
| Exchange flow (variant + cross-product) | Complex — rieng P1 | P1 |
| Shipping labels (EasyPost) | Carrier integration complex | P1 |
| Billing / Pricing tiers | FREE app cho submit | Post-approval |
| Multi-language portal | i18n infra sau | P1 |

> **Code rule**: Backend co the co interfaces/placeholder cho cac tinh nang tren (forward-compatible), nhung UI **khong hien** — khong disabled button, khong "Coming soon", khong placeholder text.

### 3.3. Chien Luoc Submit

1. **FREE app** — khong implement billing -> giam 1 tuan dev, bo qua billing review
2. **Free tier = 5 returns/thang** — reset ngay 1 moi thang (hard limit)
3. **Auto-refund only** — customer submit -> merchant approve -> process refund (khong co resolution choice) -> giam complexity
4. **Post-approval**: them billing + 10 features P1 qua app update (Shopify cho phep, khong re-submit)
5. **Demo store** san sang voi sample products + fulfilled test orders + 2-3 test returns san
6. **Video walkthrough** 3-5 phut: merchant setup + customer return flow
7. **Test account** cho Shopify reviewer (neu can access test data)

### 3.4. UI Flow

#### Flow A: Customer Self-Service Return

```
Shopify Order Status Page
   |
   v
[App Block "Request a Return"] -> Portal (App Proxy URL)
   |
   v
Screen 1: Order Lookup (order# + email)
   |
   v
Screen 2: Select Items (checkbox + qty)
   |
   v
Screen 3: Return Reason (dropdown + detail text)
   |
   v
Screen 4: Summary & Confirm (refund amount + warehouse address)
   |
   v
Screen 5: Confirmation (Return ID + ship-to address)
   |
   v
(Customer ships items)
   |
   v
Screen 6: Return Tracking (accessible anytime via URL)
```

#### Flow B: Merchant Admin

```
Install app (OAuth)
   |
   v
Dashboard (welcome + usage bar + onboarding checklist)
   |
   v
Settings (configure return window + reasons) [optional]
   |
   v
Wait for return requests
   |
   v
Return Requests List -> Click row
   |
   v
Request Detail
   |
   +--> Approve -> status=Approved -> customer ships items
   |      |
   |      v
   |    Mark as Received -> status=Received
   |      |
   |      v
   |    Process Refund -> Shopify refundCreate -> status=Completed
   |
   +--> Reject -> modal (reason) -> status=Rejected
```

### 3.5. Interaction with Shopify

#### Shopify Returns API (GraphQL)

| Mutation | Khi goi | Submit scope |
|----------|---------|--------------|
| `returnCreate` (hoac `returnRequest`) | Khi customer submit portal | Y |
| `returnApprove` | Khi merchant approve | Y |
| `returnDecline` | Khi merchant reject | Y |
| `reverseFulfillmentOrderDispose` | Khi merchant mark "Item received" (restock) | Y |
| `refundCreate` | Khi merchant process refund | Y |
| `returnClose` | Khi return completed sau refund | Y |
| `returnCancel` | Neu can cancel | Y |

#### Order Query (GraphQL)

- `order` query — fetch order details cho customer portal (line items, fulfillment status, customer email, pricing)

#### Webhooks (Submit BAT BUOC)

| Topic | Muc dich |
|-------|----------|
| `orders/create` | Track order tu dau |
| `orders/updated` | Sync fulfillment status |
| `refunds/create` | Reconcile refund events |
| `returns/create`, `returns/update` | Sync return status changes |
| `app/uninstalled` | **Cleanup bat buoc** |
| `customers/data_request` | GDPR — export customer data JSON |
| `customers/redact` | GDPR — anonymize PII |
| `shop/redact` | GDPR — delete all shop data (after 48h) |

#### Extension Points

| Extension | Muc dich |
|-----------|----------|
| **Theme App Extension** (App Block) | "Request a Return" block on Order Status Page |
| **App Proxy** | Customer portal URL: `https://{shop}/apps/returns/*` |

### 3.6. Error Messages

| Error | Message | Action |
|-------|---------|--------|
| Order not found | "We couldn't find your order. Please check your order number and email." | Show form again |
| Order outside return window | "This order is no longer eligible for return. The return window has expired." | Contact support link |
| Order not fulfilled | "This order has not been shipped yet. Returns are only available after delivery." | Hide return options |
| All items already returned | "All items in this order have already been returned." | Hide return options |
| No items selected | "Please select at least one item to return." | Disable Continue button |
| Monthly limit reached (merchant) | "You've reached your monthly return limit (5/5 this month)." | Show usage bar |
| Refund failed | "Failed to process refund. Please try again." | Retry button |
| Concurrent edit | "This return is being updated. Please try again in a moment." | Retry after 30s |
| Network timeout | "Something went wrong. Please check your connection." | Retry button |

### 3.7. Success Messages

| Event | Message |
|-------|---------|
| Return submitted | "Return request submitted! Ship your items to the address provided within 14 days." |
| Return approved | "Return approved. Customer has been notified." |
| Return rejected | "Return rejected. Customer has been notified with the reason." |
| Item received | "Item marked as received. You can now process the refund." |
| Refund processed | "Refund of $X.XX processed to customer." |
| Settings saved | "Settings saved successfully." |

---

## 4. Design Description

> **Polaris v12+ compliance** (BAT BUOC — Shopify Built for Shopify requirement). Tat ca UI admin dung Polaris components.

### 4.0. Polaris Design Spec (Reference)

Tat ca man hinh admin (4.1-4.4) PHAI tuan thu strict spec sau:

#### Typography

| Element | Polaris Component | Spec |
|---------|-------------------|------|
| Page title | `Text variant="headingXl"` | 32px, 600 weight |
| Section/Card title | `Text variant="headingMd"` | 18px, 600 weight |
| Subtitle | `Text variant="headingSm"` | 14px, 600 weight |
| Body text | `Text variant="bodyMd"` | 14px, 400 weight |
| Helper/caption | `Text variant="bodySm" tone="subdued"` | 12px, subdued color |

#### Buttons

| Rule | Value |
|------|-------|
| Height | 40px |
| Primary button | `<Button variant="primary">` — **chi 1 primary per page** |
| Destructive | `<Button variant="primary" tone="critical">` |
| Secondary | `<Button>` (default) |
| Navigation | `<Button url="/path">` (dung `url` prop, KHONG `onClick`) |
| Icon button | `<Button icon={IconName}>` — v9 icons, no Minor/Major suffix |

#### Layout Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `gap="100"` | 4px | Tight stacking |
| `gap="200"` | 8px | Default inline |
| `gap="300"` | 12px | — |
| `gap="400"` | 16px | Default block |
| `gap="500"` | 20px | — |
| `gap="600"` | 24px | Section spacing |
| `gap="800"` | 32px | Page spacing |

#### Cards & Inputs

| Element | Spec |
|---------|------|
| Card | `border-radius: 12px`, `padding: 16px` (Polaris `Card`) |
| Input (TextField) | `height: 40px`, `border-radius: 8px` |
| Select | `height: 40px`, `border-radius: 8px` |
| Checkbox | Polaris `Checkbox`, tap target >= 24x24px |
| Badge | Polaris `Badge` with tone: `info`/`success`/`warning`/`critical`/`attention` |

#### Required Polaris Components (per screen)

| Screen | Required Components |
|--------|---------------------|
| Page wrapper | `Page`, `Layout`, `Layout.Section` |
| Containers | `Card`, `BlockStack`, `InlineStack` |
| Data tables | `IndexTable` (NOT `DataTable` cho list page) |
| Filters | `Tabs`, `IndexFilters` |
| Navigation | `Pagination` (server-side) |
| Feedback | `Banner`, `Toast` (via App Bridge), `Badge`, `Modal` |
| Loading | `SkeletonPage`, `SkeletonBodyText`, `Spinner` |
| Typography | `Text`, `Link` |
| Empty states | `EmptyState` |

> **KHONG duoc dung**: Legacy components (`LegacyCard`, `LegacyStack`, `TextStyle`, `Heading`, `Stack`). Tat ca deprecate tu v11.

---

### 4.1. Admin — Dashboard

> Trang mac dinh khi mo app. Simple: welcome + usage bar + onboarding checklist.

**ASCII Mockup:**

```
+-------------------------------------------------+
|  Avada Returns & Exchanges                      |
|  Dashboard   Returns   Settings                 |
|-------------------------------------------------|
|                                                 |
|  Welcome to Avada Returns & Exchanges!          |
|  Manage return requests easily in one place.    |
|                                                 |
|  +-------------------------------------------+  |
|  | Returns this month                         | |
|  | [====##########]   3 / 5 used              | |
|  | Free plan — resets on the 1st              | |
|  +-------------------------------------------+  |
|                                                 |
|  [View Return Requests ->]                      |
|                                                 |
|  +--- Getting Started ----------------------+   |
|  | [x] Step 1: Configure return settings    |   |
|  | [ ] Step 2: Check your return portal     |   |
|  | [Complete Setup ->]                       |   |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```

**Polaris components**: `Page` title=headingXl + `Layout` + `Card` (BlockStack gap="400") + `ProgressBar` + `Button url="/returns"` + `ResourceList` (onboarding checklist).

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Page title | Text headingXl | Y | "Avada Returns & Exchanges" | — | — |
| Welcome headingMd | Text | Y | "Welcome to Avada Returns & Exchanges!" | — | — |
| Welcome body | Text bodyMd | Y | — | Short intro paragraph | Max 200 chars |
| Usage bar card | Card | Y | — | ProgressBar + "X / 5 used" | Updated khi return created |
| ProgressBar | ProgressBar | Y | 0/5 | Progress color = success < 80%, warning >= 80%, critical = 100% | — |
| Usage hint | Text bodySm subdued | Y | "Free plan — resets on the 1st" | — | — |
| View Returns button | Button primary url="/returns" | Y | — | Primary CTA | — |
| Onboarding checklist | Card | N | — | 2-step checklist (an khi hoan tat) | Hide khi `onboardingCompleted=true` |
| Step 1 checkbox | Checkbox readOnly | Y | unchecked | "Configure return settings" | Auto-check khi settings saved |
| Step 2 checkbox | Checkbox readOnly | Y | unchecked | "Check your return portal" | Auto-check khi merchant visits portal URL |
| Complete Setup button | Button | Y | — | Link to Settings page | — |

---

### 4.2. Admin — Return Requests List

> Danh sach tat ca return requests. Full list page voi tabs + search + pagination.

**ASCII Mockup:**

```
+-------------------------------------------------+
|  Return Requests                                |
|                                                 |
|  [All] [Pending] [Approved] [Completed] [Rejected] |
|                                                 |
|  Search: [order#, customer name, email      ]   |
|                                                 |
|  +------+--------+----------+--------+------+   |
|  | ID   | Order  | Customer | Status | Date |   |
|  +------+--------+----------+--------+------+   |
|  | R001 | #1234  | John D.  | Pending| Apr12|   |
|  | R002 | #1230  | Jane S.  |Approved| Apr11|   |
|  | R003 | #1228  | Bob K.   |Refunded| Apr10|   |
|  | R004 | #1225  | Alice M. |Rejected| Apr09|   |
|  +------+--------+----------+--------+------+   |
|                                                 |
|  [< Previous]   Page 1 of 3   [Next >]         |
+-------------------------------------------------+
```

**Polaris components**: `Page` + `Tabs` + `IndexFilters` (search) + `IndexTable` + `Pagination` + `Badge` + `EmptyState`.

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Page title | Text headingXl | Y | "Return Requests" | — | — |
| Tabs | Tabs | Y | "All" | All / Pending / Approved / Completed / Rejected | 5 tabs total |
| Search input | TextField via IndexFilters | Y | — | Free-text search | Debounce 300ms, server-side |
| Return ID column | Text bodyMd | Y | — | "R001234" format | — |
| Order column | Link | Y | — | "#1234" -> Shopify order | Open in new tab |
| Customer column | Text bodyMd | Y | — | Customer name | Fallback to email |
| Status column | Badge | Y | — | Color-coded (info/success/warning/critical) | — |
| Date column | Text bodySm | Y | — | Requested date (relative: "2 days ago") | — |
| Items count column | Text bodySm | N | — | So items trong return | — |
| Pagination | Pagination | Y | — | 20 items/page | Server-side |
| Row click | Action | Y | — | Navigate sang Request Detail | — |
| Empty state | EmptyState | N | — | "No return requests yet" + link setup portal | Hien khi total=0 |

**Status Badge Mapping:**

| Status | Badge tone | Text |
|--------|-----------|------|
| Requested | `info` | "Pending" |
| Approved | `success` | "Approved" |
| Received | `attention` | "Received" |
| Refund Issued | `success` | "Refunded" |
| Completed | `success` | "Completed" |
| Rejected | `critical` | "Rejected" |

---

### 4.3. Admin — Request Detail

> Xem chi tiet 1 return request + actions (Approve/Reject/Mark Received/Process Refund).

**ASCII Mockup:**

```
+-------------------------------------------------+
|  <- Return Requests                             |
|  Return R001234              [Approve] [Reject] |
|  Status: Pending Review                         |
|                                                 |
|  +--- Return Info ------------------------+     |
|  | Order: #1234 (-> Shopify)               |    |
|  | Customer: John Doe <john@example.com>   |    |
|  | Requested: April 12, 2026               |    |
|  | Resolution: Refund (auto)               |    |
|  +------------------------------------------+    |
|                                                 |
|  +--- Return Items -----------------------+     |
|  | [img] T-Shirt (M, Black)                |    |
|  | Qty: 1 of 2 ordered                     |    |
|  | Unit price: $29.99                      |    |
|  | Reason: Size too small                  |    |
|  | Detail: "Runs very small"               |    |
|  +------------------------------------------+    |
|                                                 |
|  +--- Activity Timeline ------------------+     |
|  | Apr 12 — Return submitted by customer  |    |
|  +------------------------------------------+    |
+-------------------------------------------------+
```

**Polaris components**: `Page` with `backAction` + `Layout` (2-column) + `Card` (3 cards) + `Button` primary/critical + `Modal` (for Reject + Process Refund) + `Badge` + `Timeline` (custom w/ ResourceList).

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Page title | Text headingXl | Y | — | "Return R001234" | — |
| Back action | Page backAction | Y | — | Return to list page | — |
| Status badge | Badge | Y | — | Current status color | — |
| Info card title | Text headingMd | Y | "Return information" | Card 1 | — |
| Order link | Link | Y | — | "#1234" -> Shopify order | external |
| Customer info | Text bodyMd | Y | — | "Name <email>" | — |
| Requested date | Text bodyMd | Y | — | Full timestamp | — |
| Resolution type | Text bodyMd | Y | — | "Refund (auto)" | Fixed — Submit auto-refund |
| Items card title | Text headingMd | Y | "Return items" | Card 2 | — |
| Product image | Thumbnail | Y | — | 64x64 product image | Fallback placeholder |
| Product title | Text bodyMd | Y | — | Name + variant | — |
| Quantity | Text bodyMd | Y | — | "X of Y ordered" | — |
| Unit price | Text bodyMd | Y | — | Currency format | — |
| Return reason | Text bodyMd | Y | — | From merchant's reasons list | — |
| Reason detail | Text bodySm | N | — | Free-text comment | Max 500 chars |
| Timeline card title | Text headingMd | Y | "Activity" | Card 3 | — |
| Timeline items | ResourceList | Y | — | Chronological events | Simple text + date |
| Approve button | Button primary | N | — | Hien khi status = Requested | Primary action |
| Reject button | Button tone=critical | N | — | Hien khi status = Requested | Opens Reject modal |
| Mark Received button | Button primary | N | — | Hien khi status = Approved | — |
| Process Refund button | Button primary | N | — | Hien khi status = Received | Opens Refund modal |

**Action: Approve** — change status to `approved`, call `returnApprove` mutation, append timeline event, Toast success.

**Action: Reject** — open Modal:
- Dropdown: "Outside return window" / "Item not eligible" / "Item condition" / "Other" (required)
- TextField: Optional explanation (max 500)
- Confirm: call `returnDecline`, status -> `rejected`, Toast success.

**Action: Mark Received** — change status to `received`, call `reverseFulfillmentOrderDispose` (restock action), Toast success.

**Action: Process Refund** — open Modal:
- Display: Refund amount (auto-calc tu items), refund method "Original payment method"
- Confirm: call `refundCreate` + `returnClose`, status -> `refund_issued` -> `completed`, Toast success.

> **Submit scope**: KHONG co Store Credit, KHONG co internal notes, KHONG co "Request More Info" action.

---

### 4.4. Admin — Settings

> Cau hinh return window + return reasons. Single save button.

**ASCII Mockup:**

```
+-------------------------------------------------+
|  Settings                            [Save]     |
|                                                 |
|  +--- Return Window ----------------------+    |
|  | Returns accepted within:                |    |
|  | [ 30 ] days after fulfillment           |    |
|  +------------------------------------------+   |
|                                                 |
|  +--- Return Reasons ---------------------+    |
|  | Reasons customers can choose when       |    |
|  | returning items:                        |    |
|  |                                         |    |
|  | [::]  Size too small        [Edit] [x] |    |
|  | [::]  Size too large        [Edit] [x] |    |
|  | [::]  Item damaged          [Edit] [x] |    |
|  | [::]  Not as described      [Edit] [x] |    |
|  | [::]  Changed my mind       [Edit] [x] |    |
|  | [::]  Ordered wrong item    [Edit] [x] |    |
|  | [::]  Other                 [Edit] [x] |    |
|  |                                         |    |
|  | [+ Add reason]                          |    |
|  +------------------------------------------+   |
|                                                 |
|  +--- Return Address ---------------------+    |
|  | (auto from your Shopify store address) |    |
|  | 123 Main St, City, State 12345         |    |
|  | United States                           |    |
|  +------------------------------------------+   |
+-------------------------------------------------+
```

**Polaris components**: `Page` primaryAction + `Layout` (AnnotatedSection style) + `Card` x3 + `TextField` + `Button` icon={DragHandleIcon, EditIcon, DeleteIcon}.

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Page title | Text headingXl | Y | "Settings" | — | — |
| Save button | Page primaryAction | Y | — | Single primary button | Disabled khi no changes |
| Window card title | Text headingMd | Y | "Return window" | — | — |
| Return window input | TextField type="number" suffix="days" | Y | 30 | Days after fulfillment | Min 1, Max 365 |
| Reasons card title | Text headingMd | Y | "Return reasons" | — | — |
| Reason item | ResourceList item | Y | — | Drag handle + text + Edit + Delete | — |
| Reason text | TextField (inline edit) | Y | — | Reason label | Max 200 chars, not empty |
| Drag handle | Button icon=DragHandleIcon | Y | — | Drag to reorder | — |
| Edit button | Button icon=EditIcon | Y | — | Toggle edit mode | — |
| Delete button | Button icon=DeleteIcon tone=critical | Y | — | Remove reason | Confirm modal |
| Add reason button | Button icon=PlusIcon | Y | — | Add new reason | Max 20 reasons total |
| Address card title | Text headingMd | Y | "Return address" | — | — |
| Address display | Text bodyMd | Y | — | Auto from Shopify shop.address | Read-only (Submit) |

> **Submit scope**: KHONG co auto-approve toggle, KHONG co non-returnable items, KHONG co restocking fee, KHONG co return conditions, KHONG co customer blocklist, KHONG co notification toggles, KHONG co editable return address (read-only tu Shopify).

---

### 4.5. Storefront — Order Lookup (App Block on Order Status Page + App Proxy Portal)

> Entry point: customer lookup don hang bang order# + email.

**ASCII Mockup:**

```
+---------------------------------------------+
|  Request a Return                           |
|                                             |
|  Enter your order details to begin:         |
|                                             |
|  Order number                               |
|  [#1234                                 ]   |
|                                             |
|  Email address                              |
|  [john@example.com                      ]   |
|                                             |
|  [Look Up Order]                            |
|                                             |
|  Need help? Contact us.                     |
+---------------------------------------------+
```

**Rendering**: Liquid App Block (Theme App Extension) + App Proxy page at `https://{shop}/apps/returns/start`. Minimal CSS, inherits theme fonts/colors, responsive mobile >= 320px.

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Block title | Heading | Y | "Request a Return" (merchant configurable in theme) | Section title | Max 100 chars |
| Subtitle | Text | Y | "Enter your order details to begin" | — | — |
| Order number input | Text input | Y | — | Placeholder "#1234" | Required, Shopify order format |
| Email input | Email input | Y | — | Placeholder "email@example.com" | Required, valid email RFC 5322 |
| Lookup button | Button primary | Y | "Look Up Order" | Submit form | Loading state khi processing |
| Error message | Banner (Liquid equivalent) | N | — | Hien khi validation fail | Auto-clear khi user types |
| Help text | Text link | N | — | "Contact us" link (merchant support) | Optional per merchant config |

---

### 4.6. Storefront — Select Items + Return Reason

> Sau khi order lookup thanh cong: chon items + qty + reason.

**ASCII Mockup:**

```
+---------------------------------------------+
|  Return for Order #1234                     |
|                                             |
|  Select items to return:                    |
|                                             |
|  [x] [img] T-Shirt (M, Black)      $29.99  |
|       Qty: [-] 1 [+]                        |
|       Reason: [Size too small        v]     |
|       Details: [optional comment...   ]     |
|                                             |
|  [ ] [img] Jeans (32, Blue)         $49.99  |
|       Qty: [-] 1 [+]                        |
|       Reason: [Select a reason...    v]     |
|       Details: [                      ]     |
|                                             |
|  Return value: $29.99                       |
|                                             |
|  [Back]              [Continue]             |
+---------------------------------------------+
```

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Order number | Text | Y | — | "#XXXX" display | — |
| Items list | List | Y | — | Tat ca eligible line items | Exclude already-returned items |
| Item checkbox | Checkbox | Y | unchecked | Chon item de return | Min 1 item checked |
| Product image | Thumbnail 64x64 | Y | — | Product image | Fallback placeholder |
| Product title | Text | Y | — | Name + variant | — |
| Unit price | Currency | Y | — | Price per unit | — |
| Qty selector | Stepper +/- | Y | 1 | So luong muon return | Min 1, Max ordered qty |
| Return reason | Select | Y | — | Dropdown tu merchant configured reasons | Required khi item checked |
| Reason detail | Textarea | N | — | Free-text comment | Max 500 chars, no HTML |
| Return value | Currency | Y | $0 | Running subtotal | Auto calc |
| Back button | Button secondary | Y | — | Quay lai Order Lookup | — |
| Continue button | Button primary | Y | — | Sang Summary | Disabled khi no items selected or reason missing |

> **Submit scope**: KHONG co photo upload. Textarea detail only.

---

### 4.7. Storefront — Return Reason (integrated in 4.6)

Trong ban Submit, Return Reason duoc **integrated inline** trong Select Items screen (4.6) — khong co man hinh rieng. Don gian hoa flow. KHONG co photo upload.

---

### 4.8. Storefront — Summary & Confirm

> Review truoc khi submit.

**ASCII Mockup:**

```
+---------------------------------------------+
|  Review Your Return                         |
|                                             |
|  Items to return:                           |
|  • T-Shirt (M, Black) x1  —  $29.99        |
|    Reason: Size too small                   |
|                                             |
|  Refund amount:     $29.99                  |
|  Refund to:         Original payment method |
|  Processing time:   5-10 business days      |
|                                             |
|  Ship returns to:                           |
|  +-----------------------------------+      |
|  | 123 Main St, City, State 12345   |      |
|  | United States                     |      |
|  +-----------------------------------+      |
|                                             |
|  [x] I confirm items meet return conditions |
|                                             |
|  [Back]          [Submit Return Request]    |
+---------------------------------------------+
```

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Items summary | List | Y | — | Product name + qty + reason | Min 1 item |
| Refund amount | Currency | Y | — | Auto calc tu items | — |
| Refund method | Text | Y | "Original payment method" | Fixed label | — |
| Processing time | Text | Y | "5-10 business days" | Fixed label | — |
| Warehouse address card | Card | Y | — | Tu Shopify shop.address | — |
| Confirmation checkbox | Checkbox | Y | unchecked | "I confirm items meet return conditions" | Required before submit |
| Back button | Button secondary | Y | — | Quay lai Select Items | — |
| Submit button | Button primary | Y | "Submit Return Request" | Disabled khi checkbox unchecked | Loading state |

---

### 4.9. Storefront — Confirmation

> Hien sau khi submit thanh cong.

**ASCII Mockup:**

```
+---------------------------------------------+
|                                             |
|           [checkmark icon]                  |
|                                             |
|   Return Request Submitted!                 |
|                                             |
|   Return ID: RET-001234                     |
|   Status: Submitted — Awaiting review       |
|                                             |
|   Please ship your items to:                |
|   +---------------------------------+       |
|   | Acme Store Returns              |       |
|   | 123 Warehouse Blvd              |       |
|   | Los Angeles, CA 90001           |       |
|   | United States                    |       |
|   +---------------------------------+       |
|                                             |
|   We recommend using a tracked shipping     |
|   service.                                  |
|                                             |
|   [Track Your Return]                       |
+---------------------------------------------+
```

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Success icon | Icon | Y | — | Checkmark | — |
| Title | Heading | Y | "Return Request Submitted!" | — | — |
| Return ID | Text | Y | — | "RET-XXXXXX" format | — |
| Status text | Text | Y | "Submitted — Awaiting review" | — | — |
| Warehouse address | Card | Y | — | Tu Shopify store address | — |
| Shipping note | Text | Y | "We recommend using a tracked shipping service" | — | — |
| Track button | Button primary | Y | "Track Your Return" | Link to Tracking page with return ID | — |

---

### 4.10. Storefront — Return Tracking

> Customer xem status anytime. Accessible via URL with return ID. KHONG co visual stepper (text-based).

**ASCII Mockup:**

```
+---------------------------------------------+
|  Track Your Return                          |
|                                             |
|  Return ID: RET-001234                      |
|  Order:     #1234                           |
|                                             |
|  Status:       Approved                     |
|  Last updated: April 13, 2026              |
|                                             |
|  Items:                                     |
|  • T-Shirt (M, Black) x1                    |
|    Reason: Size too small                   |
|                                             |
|  Resolution: Refund $29.99                  |
|  (to original payment method)               |
|                                             |
|  Timeline:                                  |
|  Apr 12 — Return submitted                 |
|  Apr 13 — Return approved                  |
+---------------------------------------------+
```

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Return ID | Text | Y | — | "RET-XXXXXX" | — |
| Order number | Text | Y | — | "#XXXX" | — |
| Current status | Badge-like text | Y | — | Status label | Color-coded |
| Last updated | Date | Y | — | Timestamp last status change | Relative format |
| Items list | List | Y | — | Items being returned + reason | — |
| Resolution info | Text | N | — | "Refund $XX.XX" khi resolved | Hien khi status >= approved |
| Timeline | List | Y | — | Chronological date + event | Simple text list, NO stepper |

> **Submit scope**: Text-based timeline only. Visual stepper la P1.

---

## 5. Acceptance Criteria

### 5.1. Functional — Customer

- [ ] Customer access return portal via App Block on Order Status Page
- [ ] Customer truy cap portal qua App Proxy URL `https://{shop}/apps/returns/start`
- [ ] Lookup order bang order# + email -> validate -> hien Items
- [ ] Error ro rang khi order not found / expired / not fulfilled / all returned
- [ ] Select items voi checkbox + qty stepper + reason dropdown
- [ ] Optional detail textarea (max 500 chars, no HTML)
- [ ] Return value auto-calculated khi chon items
- [ ] Summary screen hien items + refund amount + warehouse address + confirmation checkbox
- [ ] Submit tao return trong Firestore + goi Shopify `returnCreate`
- [ ] Confirmation hien Return ID + ship-to address + tracking button
- [ ] Tracking page hien status text + date + items + timeline
- [ ] Tracking page update khi merchant approve/reject/refund (no stepper)
- [ ] UI responsive mobile >= 320px
- [ ] Loading states tren tat ca buttons khi processing
- [ ] KHONG co photo upload (Submit scope)
- [ ] KHONG co resolution choice (auto-refund only)

### 5.2. Functional — Merchant

- [ ] Dashboard hien welcome + usage bar (X/5) + onboarding checklist (cho new merchants)
- [ ] Usage bar chinh xac (count returns trong month, reset ngay 1)
- [ ] Onboarding an khi hoan tat 2 steps
- [ ] Return Requests list voi 5 tabs (All/Pending/Approved/Completed/Rejected)
- [ ] Search by order#, customer name, email (debounce 300ms, server-side)
- [ ] Pagination 20 items/page server-side
- [ ] Click row -> Request Detail
- [ ] Request Detail hien 3 cards: Info + Items + Activity Timeline
- [ ] Approve button -> status updated, `returnApprove` called, customer notified (Shopify email)
- [ ] Reject modal with required reason dropdown + optional text -> `returnDecline`
- [ ] Mark Received button -> status updated, `reverseFulfillmentOrderDispose` called (restock)
- [ ] Process Refund modal voi amount + confirm -> `refundCreate` + `returnClose`
- [ ] Settings save return window (1-365 days) + return reasons (max 20)
- [ ] Settings save success toast: "Settings saved successfully"
- [ ] Return address auto-populate tu Shopify shop address (read-only)
- [ ] App load < 3 giay
- [ ] Empty state khi no returns

### 5.3. Shopify App Store — MANDATORY (pass review)

- [ ] **GDPR webhook**: `customers/data_request` — return customer data JSON
- [ ] **GDPR webhook**: `customers/redact` — anonymize customer PII
- [ ] **GDPR webhook**: `shop/redact` — delete ALL shop data after 48h
- [ ] **App uninstall**: cleanup Firestore data + metafields
- [ ] **Idempotency keys** for all refund + return mutations (webhookId in webhookLogs)
- [ ] **Webhook HMAC** verification on tat ca webhook endpoints
- [ ] **Returns sync** to Shopify Admin Orders tab (via `returnCreate` + `refundCreate`)
- [ ] **Privacy Policy** + **Terms of Service** accessible (link trong app listing)
- [ ] **Performance**: storefront App Block < 10 Lighthouse points drop
- [ ] **Core Web Vitals**: LCP < 2.5s, INP < 200ms, CLS < 0.1 on storefront
- [ ] **Demo store** ready (sample products + fulfilled orders + 2-3 sample returns)
- [ ] **Video walkthrough** 3-5 min (merchant setup + customer return flow)
- [ ] **App listing** complete: description, 6-8 screenshots, app icon
- [ ] **Polaris v12 compliance**: dung App Bridge + Polaris v12 components (no Legacy*)

### 5.4. Edge Cases

- [ ] Order chua fulfilled -> "Returns available after delivery"
- [ ] Order > returnWindowDays -> "Return window expired"
- [ ] Partial fulfillment -> chi hien items da fulfilled
- [ ] All items already returned -> "All items already returned"
- [ ] Previously returned items excluded tu eligible list
- [ ] Discount code applied -> refund calculated on **actual paid amount** (not list price)
- [ ] Qty return > ordered qty -> cap at max ordered qty
- [ ] Concurrent merchant edits -> optimistic locking (updatedAt check)
- [ ] Network timeout -> retry, no partial commit (transaction)
- [ ] Monthly limit (5) reached -> show upgrade prompt, disable new submit
- [ ] Customer email not match order -> "Order not found"
- [ ] Refund API failure -> rollback status, show error, allow retry

### 5.5. Security

- [ ] Tat ca API endpoints validate `shopId` (IDOR prevention)
- [ ] Customer portal verify order ownership (order# + email match exactly)
- [ ] Webhook HMAC signature verification (reject 401 khi fail)
- [ ] Access tokens encrypted at rest (Firestore field-level encryption)
- [ ] No direct Shopify API calls from frontend (proxy qua backend)
- [ ] Rate limiting per shop (100 req/min, 429 response)
- [ ] Input sanitization tat ca user inputs (XSS prevention)
- [ ] Return reason detail sanitized (strip HTML tags)
- [ ] Audit log for return/refund operations (who/when/what)

### 5.6. Data Model (Firestore)

| Collection | Doc ID | Purpose |
|-----------|--------|---------|
| `shops` | shopId | Shop config + encrypted access token + plan info + usage counters |
| `returnSettings` | shopId | Return policy config (window, reasons, address) |
| `returnRequests` | auto | Return request data + status + Shopify reference IDs |
| `returnItems` | auto (subcol `returnRequests/{id}/items` hoac separate) | Items trong moi return |
| `webhookLogs` | auto | Idempotency tracking (TTL 7 ngay) |

**`shops` schema:**

| Field | Type | Description |
|-------|------|-------------|
| shopId | string | Shopify shop domain (e.g., `acme.myshopify.com`) |
| accessToken | string | Encrypted Shopify Admin API access token |
| plan | string | `free` (Submit always free) |
| monthlyReturnCount | number | Dem returns thang hien tai |
| monthlyReturnLimit | number | 5 (Submit fixed) |
| onboardingCompleted | boolean | Da hoan tat 2-step onboarding |
| installedAt | timestamp | — |
| uninstalledAt | timestamp | Nullable |

**`returnSettings` schema:**

| Field | Type | Description |
|-------|------|-------------|
| shopId | string | — |
| returnWindowDays | number | Default 30, range 1-365 |
| returnReasons | array | `[{id, text, position, enabled}]` max 20 |
| returnAddress | object | Auto from Shopify shop.address |
| updatedAt | timestamp | — |

**`returnRequests` schema:**

| Field | Type | Description |
|-------|------|-------------|
| shopId | string | — |
| shopifyReturnId | string | GID tu `returnCreate` |
| orderId | string | Shopify order GID |
| orderNumber | string | "#1234" |
| customerEmail | string | — |
| customerName | string | — |
| status | string | `requested` \| `approved` \| `received` \| `refund_issued` \| `completed` \| `rejected` |
| resolutionType | string | `refund` (Submit fixed) |
| totalRefundAmount | number | Currency cents |
| submittedAt | timestamp | — |
| approvedAt | timestamp | Nullable |
| rejectedAt | timestamp | Nullable |
| receivedAt | timestamp | Nullable |
| refundedAt | timestamp | Nullable |
| shopifyRefundId | string | GID tu `refundCreate`, nullable |
| rejectionReason | string | Nullable |
| rejectionDetail | string | Nullable |

**`returnItems` schema:**

| Field | Type | Description |
|-------|------|-------------|
| returnRequestId | string | Parent reference |
| shopId | string | — |
| productId | string | Shopify product GID |
| variantId | string | Shopify variant GID |
| productTitle | string | — |
| variantTitle | string | — |
| productImage | string | URL |
| quantity | number | Qty returning |
| unitPrice | number | Currency cents |
| reason | string | Tu merchant reasons list |
| reasonDetail | string | Nullable, max 500 chars |

**`webhookLogs` schema (TTL 7 days):**

| Field | Type | Description |
|-------|------|-------------|
| webhookId | string | Idempotency key (Shopify webhook ID) |
| topic | string | Webhook topic |
| shopId | string | — |
| processedAt | timestamp | — |
| expireAt | timestamp | TTL field — Firestore auto-delete |

---

## 6. Timeline

### 6.1. Build Timeline (6 tuan to submit)

| Tuan | Cong viec | Output |
|------|-----------|--------|
| **Tuan 1** | Foundation: monorepo, OAuth flow, Firestore repos (`shops`, `returnSettings`), install/uninstall, Theme App Extension scaffold | Backend skeleton hoat dong |
| **Tuan 2** | Returns engine: `returnCreate`, eligibility check, refund calculation. Customer Portal core (lookup + items + reason + submit + success) | Customer submit flow complete |
| **Tuan 3** | Storefront polish: Theme App Extension + App Proxy routing, tracking page, responsive mobile | Storefront flow complete |
| **Tuan 4** | Admin Polaris app: Dashboard + Return Requests List + Detail + Settings (full Polaris v12) | Merchant flow complete |
| **Tuan 5** | GDPR webhooks (3 endpoints), uninstall cleanup, HMAC verification, onboarding, error handling, edge cases, mobile testing, QA | App Store ready |
| **Tuan 6** | App listing content (description, 6-8 screenshots, app icon), video walkthrough 3-5 min, demo store setup, final QA -> **SUBMIT** | Submitted |

**Total: 6 tuan** from code start to submission.

### 6.2. Post-Approval Roadmap

After Shopify approve, toggle feature flags ON + release app updates:

| Thu tu | Feature | Thoi gian |
|--------|---------|-----------|
| 1 | Billing (Shopify Billing API) + Pricing tiers | 1 tuan |
| 2 | Email notifications (merchant customizable templates) | 1 tuan |
| 3 | Photo upload on return reason | 3-4 ngay |
| 4 | Store Credit resolution (via `giftCardCreate`) | 1 tuan |
| 5 | Auto-approve + rules engine | 1 tuan |
| 6 | Non-returnable items picker + restocking fee | 3-4 ngay |
| 7 | Analytics dashboard (metrics + charts) | 1 tuan |
| 8 | Exchange flow (variant + cross-product) | 2 tuan |
| 9 | Shipping labels (EasyPost integration) | 1 tuan |
| 10 | Branding customization (portal CSS + logo) | 1 tuan |

---

**Version**: 1.0
**Created**: 2026-04-13
**Status**: Submit Version PRD — Subset of MVP
**Strategy**: FREE app, 5 returns/month, 6-week build to Shopify App Store submission
**Codebase**: Shared with MVP, features toggled via `featureFlags` config
