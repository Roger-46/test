# Avada Return & Exchange -- PRD MVP (Full)

**Link task Jira:** (TBD)

### Task List

| Ticket | Link | Status |
|--------|------|--------|
| (TBD) | (TBD) | Draft |

### History

| Phien ban | Ngay | Tac gia | Loai | Mo ta |
|-----------|------|---------|------|-------|
| 1.0 | 09/04/2026 | Roger | A | Tao moi PRD MVP |

> A = Added, M = Modified, D = Deleted

---

## Muc Luc

1. [Executive Summary](#1-executive-summary)
2. [Personas & User Stories](#2-personas--user-stories)
3. [Product Solutions](#3-product-solutions)
4. [Design Description](#4-design-description)
5. [Acceptance Criteria](#5-acceptance-criteria)

---

## 1. Executive Summary

- **Day la PRD MVP day du** -- ban goc cho moi phien ban (Submit, Growth, Scale...).
- **Muc tieu**: App return & exchange hoan chinh du cho nhom merchant dau tien su dung vui ve.
- **Chien luoc**: Build full MVP → rut gon thanh ban Submit (xem PRD Submit rieng) → pass review → bat lai full MVP.
- **Van de**: Shopify native returns cuc ky han che -- khong co branded portal, khong exchange flow, khong store credit, khong analytics. Merchant xu ly hon 2 returns/ngay se thay he thong goc hoan toan khong dap ung.
- **Giai phap**: App cho phep khach hang tu tao return request, chon exchange hoac refund/store credit, nhan shipping label, theo doi trang thai. Merchant quan ly returns, cau hinh policy, xem analytics, nhan notifications.
- **Doi tuong**: Merchant SMB tren Shopify (50-600 don/thang, 10-100 returns/thang).
- **Scope**: 17 features day du -- app hoat dong end-to-end, merchant co du cong cu quan ly.

| Metric | Value |
|--------|-------|
| **Target Market** | 3.9M+ cua hang Shopify ban san pham vat ly |
| **Primary Segment** | SMB merchants (50-600 don/thang) |
| **Pricing Range** | Free (50 returns/thang) den $99/thang (2,000 returns/thang) |
| **Projected Y1 ARR** | ~$250K |
| **Projected Y3 ARR** | ~$7.5M |
| **Break-even** | Giua Nam 2 |
| **Go/No-Go** | STRONG GO (85% confidence) |

---

## 2. Personas & User Stories

### Personas

| Persona | Profile | Nhu cau |
|---------|---------|---------|
| **Customer** | Khach mua hang tren Shopify store, muon tra/doi hang | Tu tao return request, chon exchange/refund, nhan label, theo doi trang thai |
| **Merchant** | Chu cua hang Shopify, 50-600 don/thang, 10-100 returns/thang | Giam thoi gian xu ly returns, giu doanh thu qua exchange, cau hinh policy tu dong |

### User Stories (MVP Full -- 22 stories)

| ID | User Story | Priority | Submit? |
|----|-----------|----------|---------|
| US-01 | La **customer**, toi muon **tim don hang bang order number + email** de bat dau quy trinh tra hang. | P0 | ✅ |
| US-02 | La **customer**, toi muon **chon san pham muon tra** tu danh sach items eligible trong don hang. | P0 | ✅ |
| US-03 | La **customer**, toi muon **chon ly do tra hang** (size khong vua, hong, khac mo ta...) de merchant hieu tai sao. | P0 | ✅ |
| US-04 | La **customer**, toi muon **chon phuong thuc giai quyet** (refund, store credit, exchange) de nhan ket qua phu hop. | P0 | ✅ |
| US-05 | La **customer**, toi muon **doi sang variant khac** (size/color) cua cung san pham khi chon exchange. | P0 | ✅ |
| US-06 | La **customer**, toi muon **xem chenh lech gia** truoc khi xac nhan exchange. | P0 | ✅ |
| US-07 | La **customer**, toi muon **nhan store credit (gift card) voi bonus** khi chon store credit thay vi refund. | P0 | ✅ |
| US-08 | La **customer**, toi muon **nhan shipping label** de gui tra hang de dang. | P0 | ✅ |
| US-09 | La **customer**, toi muon **theo doi trang thai return** (submitted, approved, shipped, received, refunded). | P0 | ✅ |
| US-10 | La **customer**, toi muon **nhan email thong bao** khi trang thai return thay doi. | P0 | ✅ (basic) |
| US-11 | La **customer**, toi muon **truy cap return portal** tu storefront cua hang. | P0 | ✅ |
| US-12 | La **merchant**, toi muon **xem danh sach return requests** voi filters va search. | P0 | ✅ |
| US-13 | La **merchant**, toi muon **xem chi tiet return** va approve/reject/generate label/process refund. | P0 | ✅ |
| US-14 | La **merchant**, toi muon **cau hinh return policy** (return window, non-returnable items, restocking fee). | P0 | ✅ |
| US-15 | La **merchant**, toi muon **auto-approve returns** match policy de khong can review thu cong. | P0 | ✅ |
| US-16 | La **merchant**, toi muon **xu ly refund** (original payment, store credit, partial refund). | P0 | ✅ |
| US-17 | La **merchant**, toi muon **xem analytics dashboard** (volume, reasons, resolution types, revenue retained). | P0 | ✅ (basic) |
| US-18 | La **merchant**, toi muon **tuy chinh branding** (logo, colors) tren return portal. | P0 | ✅ |
| US-19 | La **merchant**, toi muon **portal ho tro nhieu ngon ngu** cho khach quoc te. | P0 | ✅ |
| US-20 | La **merchant**, toi muon **setup nhanh trong 10 phut** voi guided wizard. | P0 | ✅ |
| US-21 | La **merchant**, toi muon **nhan email notification** khi customer tao return request. | P0 | |
| US-22 | La **merchant**, toi muon **xem return history** cho moi order. | P0 | |

---

## 3. Product Solutions

### 3.1. Solution Overview

App gom 2 phan:
- **Storefront**: Theme App Extension + App Proxy → Return Portal cho customer (lookup order, chon items, chon resolution, nhan label, track status)
- **Admin**: Embedded Shopify Admin app (Polaris) → Return Requests Dashboard + Return Detail + Policy Settings + Analytics + Branding + Quick-Start Wizard

### 3.2. Scope

**TRONG scope (MVP Full):**

| # | Feature | Submit? | Ly do |
|---|---------|---------|-------|
| 1 | **Customer return portal** (lookup, select items, reason, resolution) | ✅ | Core value -- entry point cho customer |
| 2 | **Variant exchange flow** (size/color swap, price diff) | ✅ | Core value -- revenue retention #1 |
| 3 | **Store credit / gift card refund** (voi bonus incentive) | ✅ | Core value -- revenue retention #2 |
| 4 | **Refund to original payment** | ✅ | Core value -- basic expectation |
| 5 | **Return reason collection** (dropdown + photo upload) | ✅ | Core value -- data collection |
| 6 | **Return shipping labels** (EasyPost/Shippo) | ✅ | Core value -- customer convenience |
| 7 | **Return tracking** (status updates cho customer) | ✅ | Core value -- transparency |
| 8 | **Email notifications** (customer: requested/approved/label/received/refunded) | ✅ basic | Full templates sau |
| 9 | **Return requests dashboard** (IndexTable, filters, search, bulk actions) | ✅ | Core admin -- manage returns |
| 10 | **Return detail page** (approve/reject, label, refund, timeline) | ✅ | Core admin -- process returns |
| 11 | **Configurable return policies** (window, eligibility, restocking fee, per-product) | ✅ | Core admin -- policy engine |
| 12 | **Automated return approval** (auto-approve match policy) | ✅ | Core value -- save time |
| 13 | **Basic analytics dashboard** (volume, reasons, resolutions, revenue retained) | ✅ basic | Charts them sau |
| 14 | **Custom branding** (logo, colors tren portal) | ✅ | Brand consistency |
| 15 | **Multi-language portal** (5 ngon ngu free) | ✅ | International customers |
| 16 | **10-minute quick-start wizard** (auto-import policies, guided setup) | ✅ | Reduce churn #1 |
| 17 | **Merchant email notifications** (khi customer tao return) | | Them sau submit |
| 18 | **Return history per order** | | Them sau submit |
| 19 | **GDPR webhooks** | ✅ | BAT BUOC |
| 20 | **App uninstall cleanup** | ✅ | BAT BUOC |
| 21 | **Idempotency cho refund operations** | ✅ | Tranh duplicate refund |

**NGOAI scope (P1 -- phat trien sau MVP):**
- Instant exchange (ship truoc khi nhan return)
- Cross-product exchange (doi san pham khac)
- Shop Now exchange flow (browse catalog, apply credit)
- Exchange bonus credit
- Product-level analytics
- Fraud detection / Customer blocklist
- QR code returns (box-free)
- SMS notifications
- Green returns (keep the item)
- Shopify Flow integration
- Gift returns
- Automation rules engine

### 3.3. Chien luoc phien ban

**MVP la ban goc** -- build day du, rut gon thanh Submit, sau khi pass → bat lai full MVP.

| Phien ban | Scope | Muc tieu |
|-----------|-------|----------|
| **Submit** | Features #1-16, #19-21 (rut gon UI) | Pass Shopify review (FREE app) |
| **MVP** (ban nay) | Tat ca 21 features | Merchant dau tien dung vui ve |
| **P1** | + Instant exchange, Cross-product, Shop Now, Fraud, Analytics advanced | Competitive advantage |

**Sau khi Submit pass:**
1. Enable merchant email notifications, return history per order
2. Add Billing/Pricing tiers (app update, khong can re-submit)
3. Full Analytics dashboard voi charts
4. → Day chinh la MVP

### 3.4. UI Flow

#### Flow A: Customer Return Portal

```
Storefront → [Return Portal Widget / Link] → click
    ↓
Return Portal (App Proxy page) → Lookup Order:
    ↓
Order Found → Hien thi eligible items:
├── [Select items to return] → chon items + quantity
├── [Select reason per item] → dropdown + optional photo
├── [Select resolution] → Refund / Store Credit (+bonus) / Exchange
│   ├── Refund → confirm → shipping label → done
│   ├── Store Credit → confirm → gift card created → done
│   └── Exchange → [Variant Picker] → price diff → confirm → done
└── [Get Shipping Label] → print/email label → track return
```

**Man hinh 1: Return Portal -- Order Lookup**

```
┌─────────────────────────────────────────┐
│  [Logo]  Returns & Exchanges            │
│                                         │
│  Start Your Return                      │
│                                         │
│  Order Number                           │
│  [#1234________________]               │
│                                         │
│  Email Address                          │
│  [john@example.com______]              │
│                                         │
│  [Look Up Order]                        │
│                                         │
│  Need help? Contact us                  │
└─────────────────────────────────────────┘
```

| Hanh dong | Ket qua |
|-----------|---------|
| Enter order # + email, click Look Up | Tim order, hien thi eligible items |
| Order khong tim thay | "We couldn't find that order. Please check your order number and email." |
| Order ngoai return window | "The return window for this order has expired." |
| Order chua fulfilled | "This order hasn't shipped yet. You can't return items that haven't been fulfilled." |

**Man hinh 2: Select Items to Return**

```
┌─────────────────────────────────────────┐
│  Return Items from Order #1234          │
│  Ordered on April 1, 2026              │
│                                         │
│  ☐ [img] T-Shirt (M, Black)   $29.99  │
│          Qty to return: [1 ▼]           │
│                                         │
│  ☐ [img] Jeans (32, Blue)     $49.99   │
│          Qty to return: [1 ▼]           │
│                                         │
│  ☐ [img] Socks (One Size)     $9.99    │
│          Qty to return: [1 ▼]           │
│                                         │
│  [Continue]                             │
└─────────────────────────────────────────┘
```

**Man hinh 3: Select Return Reason**

```
┌─────────────────────────────────────────┐
│  Why are you returning?                 │
│                                         │
│  T-Shirt (M, Black)                     │
│  Reason: [Size doesn't fit      ▼]     │
│  ┌───────────────────────────┐          │
│  │ Size doesn't fit          │          │
│  │ Item damaged/defective    │          │
│  │ Not as described          │          │
│  │ Changed my mind           │          │
│  │ Arrived too late          │          │
│  │ Other                     │          │
│  └───────────────────────────┘          │
│                                         │
│  Add photos (optional)                  │
│  [+ Upload Photos]  (max 5, 10MB each) │
│                                         │
│  Additional comments                    │
│  [________________________]            │
│                                         │
│  [Back]              [Continue]         │
└─────────────────────────────────────────┘
```

**Man hinh 4: Select Resolution**

```
┌─────────────────────────────────────────┐
│  How would you like to resolve this?    │
│                                         │
│  T-Shirt (M, Black) — $29.99           │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ ○ Refund to original payment    │    │
│  │   $29.99 back to Visa ****4242  │    │
│  │   (5-10 business days)          │    │
│  ├─────────────────────────────────┤    │
│  │ ○ Store Credit                  │    │
│  │   $34.99 store credit ⭐        │    │
│  │   (+$5.00 bonus!)              │    │
│  │   Instant — use on next order   │    │
│  ├─────────────────────────────────┤    │
│  │ ○ Exchange for different size   │    │
│  │   Swap for another variant      │    │
│  │   of this product               │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [Back]              [Continue]         │
└─────────────────────────────────────────┘
```

**Man hinh 5: Exchange -- Variant Picker**

```
┌─────────────────────────────────────────┐
│  Exchange: T-Shirt                      │
│  Current: M, Black — $29.99            │
│                                         │
│  Size:  [S] [M●] [L] [XL]              │
│  Color: [Black●] [White] [Red]          │
│                                         │
│  New: L, Black — $29.99                │
│  Price difference: $0.00                │
│                                         │
│  ⚠ XL, Red — Out of Stock             │
│                                         │
│  [Back]          [Confirm Exchange]     │
└─────────────────────────────────────────┘
```

**Man hinh 6: Review & Confirm**

```
┌─────────────────────────────────────────┐
│  Review Your Return                     │
│                                         │
│  Order #1234                            │
│                                         │
│  Items:                                 │
│  🔄 T-Shirt (M, Black) → L, Black     │
│     Exchange — $0.00 difference         │
│                                         │
│  💰 Jeans (32, Blue)                    │
│     Store Credit — $54.99 ($49.99+$5)   │
│                                         │
│  Return shipping: Prepaid label         │
│  (USPS Priority Mail)                   │
│                                         │
│  By submitting, you agree to the        │
│  store's return policy.                 │
│                                         │
│  [Back]          [Submit Return]        │
└─────────────────────────────────────────┘
```

**Man hinh 7: Return Confirmed + Shipping Label**

```
┌─────────────────────────────────────────┐
│  ✅ Return Request Submitted!            │
│  Return #RET-0042                       │
│                                         │
│  Status: Approved                       │
│  ────────────────────────────────       │
│  ● Submitted   ○ Shipped   ○ Received  │
│  ○ Inspected   ○ Resolved              │
│  ────────────────────────────────       │
│                                         │
│  Your Shipping Label:                   │
│  ┌──────────────────────────┐           │
│  │  USPS Priority Mail      │           │
│  │  Tracking: 9400111...    │           │
│  │  [Print Label]           │           │
│  │  [Email Label to Me]     │           │
│  └──────────────────────────┘           │
│  Label expires in 14 days.              │
│                                         │
│  Next steps:                            │
│  1. Pack your items securely            │
│  2. Attach the shipping label           │
│  3. Drop off at USPS location           │
│                                         │
│  [Track My Return]                      │
└─────────────────────────────────────────┘
```

**Man hinh 8: Return Tracking Page**

```
┌─────────────────────────────────────────┐
│  Return #RET-0042                       │
│  Order #1234                            │
│                                         │
│  Status Timeline:                       │
│  ✅ Submitted — Apr 5, 2:30 PM         │
│  ✅ Approved — Apr 5, 2:31 PM          │
│  ✅ Label Created — Apr 5, 2:31 PM     │
│  ✅ Shipped — Apr 6, 10:15 AM          │
│  ○ In Transit                           │
│  ○ Received                             │
│  ○ Inspected                            │
│  ○ Resolved                             │
│                                         │
│  Tracking: 9400111... (USPS)            │
│  [View on USPS.com]                     │
│                                         │
│  Items:                                 │
│  T-Shirt (M→L, Black) — Exchange       │
│  Jeans (32, Blue) — Store Credit $54.99 │
└─────────────────────────────────────────┘
```

#### Flow B: Merchant Admin

```
Mo app → Dashboard (metrics + recent returns)
       → Returns (list + filters + detail + actions)
       → Settings
           ├── Return Policy (window, eligibility, restocking fee)
           ├── Automation (auto-approve rules)
           ├── Notifications (email templates)
           ├── Branding (logo, colors)
           ├── Shipping (carrier config)
           └── Billing
```

**Man hinh 9: Admin Dashboard**

```
┌──────────────────────────────────────────┐
│  Avada Returns & Exchanges               │
│  Dashboard   Returns   Settings          │
│                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ Returns  │ │ Exchanges│ │ Revenue  │ │
│  │ This Mo  │ │ This Mo  │ │ Retained │ │
│  │   47     │ │   12     │ │  $589    │ │
│  └──────────┘ └──────────┘ └──────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ Pending  │ │ Store    │ │ Returns  │ │
│  │ Review   │ │ Credits  │ │ Left     │ │
│  │    5     │ │  $234    │ │  3/50    │ │
│  └──────────┘ └──────────┘ └──────────┘ │
│                                          │
│  Return Reasons (This Month)             │
│  Size doesn't fit     ████████░░  42%    │
│  Changed mind         ████░░░░░░  21%    │
│  Not as described     ███░░░░░░░  16%    │
│  Damaged/defective    ██░░░░░░░░  12%    │
│  Other                █░░░░░░░░░   9%    │
│                                          │
│  Recent Returns                          │
│  #RET-0047 — Pending — T-Shirt — 5m ago │
│  #RET-0046 — Approved — Jeans — 1h ago  │
│  #RET-0045 — Refunded — Dress — 3h ago  │
│  #RET-0044 — Exchanged — Shoes — 1d ago │
│  [View All Returns →]                    │
└──────────────────────────────────────────┘
```

**Man hinh 10: Return Requests List**

```
┌──────────────────────────────────────────────────────────────┐
│  Returns                              [Export CSV] [Filters] │
│                                                              │
│  Search: [________________________] 🔍                      │
│  Filters: Status [All ▼] Reason [All ▼] Date [Last 30d ▼]  │
│                                                              │
│  ┌────────┬────────┬───────────┬──────────┬────────┬───────┐│
│  │ Return │ Order  │ Customer  │ Status   │ Type   │ Date  ││
│  ├────────┼────────┼───────────┼──────────┼────────┼───────┤│
│  │ 0047   │ #1250  │ John D.   │ ⏳Pending│ Refund │ Today ││
│  │ 0046   │ #1248  │ Sarah M.  │ ✅Approved│Exchange│ Today ││
│  │ 0045   │ #1245  │ Mike R.   │ 💰Refunded│Refund │ Yday  ││
│  │ 0044   │ #1240  │ Lisa W.   │ 🔄Exchanged│Exchange│ 2d  ││
│  │ 0043   │ #1238  │ Tom K.    │ ❌Rejected│Refund │ 3d   ││
│  └────────┴────────┴───────────┴──────────┴────────┴───────┘│
│                                                              │
│  Bulk: [Select All] [Approve Selected] [Generate Labels]    │
│  Showing 1-20 of 47 returns                [< 1 2 3 >]     │
└──────────────────────────────────────────────────────────────┘
```

**Man hinh 11: Return Detail Page**

```
┌──────────────────────────────────────────┐
│  ← Back to Returns                       │
│  Return #RET-0047         ⏳ Pending      │
│  Order #1250 — John Doe                  │
│  john@example.com                        │
│                                          │
│  Items:                                  │
│  ┌──────────────────────────────────┐    │
│  │ [img] T-Shirt (M, Black) $29.99 │    │
│  │ Reason: Size doesn't fit        │    │
│  │ Resolution: Exchange → L, Black │    │
│  │ Photos: [📷 img1] [📷 img2]     │    │
│  │ Comment: "Too tight on chest"   │    │
│  └──────────────────────────────────┘    │
│                                          │
│  Timeline:                               │
│  ✅ Apr 9, 2:30 PM — Submitted          │
│  ⏳ Awaiting review                      │
│                                          │
│  Actions:                                │
│  [Approve] [Reject] [Request More Info]  │
│  [Generate Label] [Process Refund]       │
│                                          │
│  Notes (internal):                       │
│  [Add a note..._______________] [Save]   │
└──────────────────────────────────────────┘
```

**Man hinh 12: Policy Settings**

```
┌──────────────────────────────────────────┐
│  Settings > Return Policy       [Save]   │
│                                          │
│  Return Window                           │
│  Allow returns within: [30 days ▼]       │
│  from: [Fulfillment date ▼]             │
│                                          │
│  Restocking Fee                          │
│  ☐ Charge restocking fee                │
│  Fee: [___]% of item price              │
│                                          │
│  Eligible Items                          │
│  ☑ All products eligible by default     │
│  Non-returnable products:               │
│  [+ Add products or collections]         │
│  • Sale items (collection)              │
│  • Gift cards (product)             [x] │
│                                          │
│  Return Reasons                          │
│  [Drag to reorder]                       │
│  ≡ Size doesn't fit                     │
│  ≡ Item damaged/defective               │
│  ≡ Not as described                     │
│  ≡ Changed my mind                      │
│  ≡ Arrived too late                     │
│  ≡ Other                                │
│  [+ Add custom reason]                   │
│                                          │
│  Photo Requirements                      │
│  Require photos for:                     │
│  ☑ Item damaged/defective               │
│  ☐ Not as described                     │
└──────────────────────────────────────────┘
```

**Man hinh 13: Automation Settings**

```
┌──────────────────────────────────────────┐
│  Settings > Automation          [Save]   │
│                                          │
│  Auto-Approve Returns                    │
│  ☑ Enable auto-approve                  │
│                                          │
│  Auto-approve when ALL conditions met:   │
│  ☑ Within return window                 │
│  ☑ Item is returnable                   │
│  ☑ Customer not blocklisted             │
│  ☐ Order value under: [$___]            │
│                                          │
│  After auto-approve:                     │
│  ☑ Automatically generate shipping label│
│  ☑ Send approval email to customer      │
│  ☑ Send notification to merchant        │
│                                          │
│  Resolution Preferences                  │
│  Default resolution: [Customer choice ▼] │
│  Store credit bonus: [$5.00]             │
│  ☑ Show store credit bonus on portal    │
└──────────────────────────────────────────┘
```

**Man hinh 14: Branding Settings**

```
┌──────────────────────────────────────────┐
│  Settings > Branding            [Save]   │
│                                          │
│  Logo                                    │
│  [Upload Logo] (PNG/SVG, max 2MB)       │
│  [current_logo.png]                ✕    │
│                                          │
│  Colors                                  │
│  Primary:  [#2D9D78] [█████]            │
│  Accent:   [#1A73E8] [█████]            │
│  Text:     [#333333] [█████]            │
│                                          │
│  Portal Header Text                      │
│  [Returns & Exchanges Center___]        │
│                                          │
│  Preview:                                │
│  ┌──────────────────────────────┐        │
│  │  [Logo] Returns & Exchanges │        │
│  │  Start Your Return          │        │
│  │  [Look Up Order]            │        │
│  └──────────────────────────────┘        │
└──────────────────────────────────────────┘
```

**Man hinh 15: Quick-Start Wizard (First-time)**

```
┌──────────────────────────────────────────┐
│  Welcome to Avada Returns & Exchanges!   │
│                                          │
│  Get started in 5 steps (~10 minutes):  │
│                                          │
│  ✅ Step 1: Import Return Policy         │
│     Auto-imported from Shopify!         │
│     Return window: 30 days             │
│     [Review & Customize]               │
│                                          │
│  ✅ Step 2: Set Up Branding              │
│     Logo and colors from your theme     │
│     [Customize]                         │
│                                          │
│  ☐ Step 3: Configure Shipping           │
│     Connect carrier for return labels   │
│     [Set Up Shipping]                   │
│                                          │
│  ☐ Step 4: Customize Email Templates    │
│     Preview return notification emails  │
│     [Preview Emails]                    │
│                                          │
│  ☐ Step 5: Activate Return Portal       │
│     Enable on your storefront           │
│     [Activate Portal]                   │
│     (Opens Theme Editor)                │
│                                          │
│  Progress: ████░░░░░░ 40%              │
│  Need help? [View Setup Guide]          │
└──────────────────────────────────────────┘
```

### 3.5. Interaction with Shopify

**Returns API (GraphQL):**
- `returnCreate` → Tao return request
- `returnApproveRequest` → Approve return
- `returnDeclineRequest` → Decline return
- `returnClose` → Dong return sau khi xu ly xong
- `reverseDeliveryCreateWithShipping` → Tao reverse shipping label
- `reverseFulfillmentOrderDispose` → Xu ly hang tra ve (restock/dispose)

**Refund API (GraphQL):**
- `refundCreate` → Tao refund (original payment, partial)

**Gift Card API (Store Credit):**
- `giftCardCreate` → Tao gift card lam store credit
- `giftCardUpdate` → Cap nhat gift card

**Exchange Flow (Draft Orders):**
- `draftOrderCreate` → Tao draft order cho exchange product
- `draftOrderComplete` → Hoan tat draft order → order moi

**Queries:**
- `return` / `returns` → Lay thong tin returns
- `order.returns` → Returns thuoc order
- `returnableFulfillment` → Fulfillment co the tra hang
- `order.fulfillments` → Check fulfillment status

**Webhooks nhan:**
- `returns/request`, `returns/approve`, `returns/decline`, `returns/close`
- `refunds/create`
- `orders/updated`
- `app/uninstalled` → **cleanup bat buoc**

**GDPR Webhooks (BAT BUOC):**
- `customers/data_request` → export customer data JSON
- `customers/redact` → anonymize customer data
- `shop/redact` → delete all shop data

**Extension Points:**
- Theme App Extension → Return portal widget/link tren storefront
- App Proxy → Host return portal page
- Customer Account Extension → Return portal trong account

### 3.6. Error Messages

| Error | Message | Action |
|-------|---------|--------|
| Order not found | "We couldn't find that order. Please check your order number and email." | Cho nhap lai |
| Return window expired | "The return window for this order has expired. Please contact the store." | Hien thi policy info |
| Order not fulfilled | "This order hasn't shipped yet. You can't return items that haven't been fulfilled." | An return options |
| Item already returned | "This item has already been returned." | Disable item selection |
| Variant out of stock | "Sorry, [Variant] is currently out of stock. Please choose another option." | Disable variant option |
| Payment/refund failed | "We couldn't process your refund. Please try again or contact the store." | Retry button |
| Label generation failed | "We couldn't generate a shipping label. Please contact the store." | Show support contact |
| Photo upload failed | "Upload failed. Please try again. (Max 5 photos, 10MB each)" | Retry |
| Concurrent return | "A return is already in progress for this order. Please wait." | Block duplicate |
| API rate limit | "System is busy. Please try again in a moment." | Auto retry 30s |

### 3.7. Success Messages

| Event | Message |
|-------|---------|
| Order found | "Order found! Select items to return." |
| Return submitted | "Return request submitted successfully! Return #RET-XXXX" |
| Return approved | "Your return has been approved! Here's your shipping label." |
| Label generated | "Shipping label created. Check your email or print below." |
| Return received | "We've received your return! Processing your [refund/exchange/store credit]." |
| Refund issued | "Refund of $X.XX issued to your [payment method]. Allow 5-10 business days." |
| Store credit issued | "Store credit of $X.XX has been added to your account!" |
| Exchange created | "Exchange order created! Your new item will ship soon." |
| Settings saved | "Settings saved successfully." |
| Policy updated | "Return policy updated." |
| Return approved (admin) | "Return #RET-XXXX approved." |
| Return rejected (admin) | "Return #RET-XXXX rejected. Customer notified." |

---

## 4. Design Description

### 4.1. Customer Portal -- Order Lookup

> Trang dau tien khi customer truy cap return portal

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Store logo | Image | N | Avada logo | Tu branding settings | PNG/SVG |
| Portal title | Text | Y | "Returns & Exchanges" | Tu branding settings | Max 50 chars |
| Order number input | Text | Y | — | "#" prefix auto | Format: #XXXX |
| Email input | Email | Y | — | Order email | Valid email |
| Lookup button | Button | Y | "Look Up Order" | Primary CTA | Disable khi empty |
| Error message | Banner | N | — | Hien khi lookup fail | — |
| Help link | Link | N | — | Link den support/policy | — |

### 4.2. Customer Portal -- Item Selection

> Hien thi items eligible cho return

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Order info | Card | Y | — | Order #, date, status | — |
| Item list | List | Y | — | Eligible items only | Filter by policy |
| Item checkbox | Checkbox | Y | false | Select item to return | Min 1 selected |
| Item image | Image | Y | — | Product thumbnail | — |
| Item name | Text | Y | — | Product + variant | — |
| Item price | Currency | Y | — | Line item price | — |
| Qty to return | Select | Y | Max qty | 1 to purchased qty | Min 1 |
| Continue button | Button | Y | "Continue" | Primary CTA | Disable khi 0 selected |

### 4.3. Customer Portal -- Return Reason

> Chon ly do tra hang cho moi item

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Item summary | Card | Y | — | Item being returned | — |
| Reason dropdown | Select | Y | — | Pre-built + custom reasons | Required |
| Photo upload | File | N/Conditional | — | Max 5 photos, 10MB each | Required for specific reasons |
| Comments | Textarea | N | — | Additional details | Max 500 chars |
| Back button | Button | Y | "Back" | Secondary | — |
| Continue button | Button | Y | "Continue" | Primary CTA | Disable khi no reason |

### 4.4. Customer Portal -- Resolution Selection

> Chon phuong thuc giai quyet

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Item summary | Card | Y | — | Item + price | — |
| Refund option | Radio | Y | — | "Refund to [payment method]" | Show payment info |
| Refund amount | Currency | Y | — | Item price - restocking fee | Auto calc |
| Store credit option | Radio | Y | — | "Store Credit $X.XX" | Show bonus |
| Store credit bonus | Badge | N | "$5.00 bonus!" | Bonus amount | From settings |
| Exchange option | Radio | Y | — | "Exchange for different size/color" | Only for items with variants |
| Continue button | Button | Y | "Continue" | Primary CTA | Require selection |

### 4.5. Customer Portal -- Variant Picker (Exchange)

> Chon variant moi khi exchange

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Current variant | Card | Y | — | Current size/color/price | — |
| Size options | Selection | N | Current | Available sizes | OOS = disabled |
| Color options | Selection | N | Current | Available colors | OOS = disabled |
| New variant info | Card | Y | — | New variant + price | — |
| Price difference | Currency | Y | — | New - Old price | Show +/- |
| OOS warning | Banner | N | — | "Out of stock" | Show khi variant OOS |
| Confirm button | Button | Y | "Confirm Exchange" | Primary CTA | Require change |

### 4.6. Customer Portal -- Review & Confirm

> Tong ket truoc khi submit

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Order number | Text | Y | — | #XXXX | — |
| Items summary | List | Y | — | Each item + resolution | — |
| Return shipping | Text | Y | — | Prepaid/customer-paid | — |
| Policy agreement | Checkbox | Y | false | "I agree to return policy" | Required checked |
| Submit button | Button | Y | "Submit Return" | Primary CTA, destructive | Require agreement |

### 4.7. Customer Portal -- Confirmation + Label

> Sau khi submit thanh cong

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Success banner | Banner | Y | — | "Return submitted!" | — |
| Return ID | Text | Y | — | RET-XXXX | — |
| Status | Badge | Y | — | "Approved" / "Pending" | — |
| Status timeline | Progress | Y | — | Visual timeline | — |
| Shipping label | Card | N | — | Label image/PDF + tracking | — |
| Print button | Button | N | "Print Label" | — | — |
| Email button | Button | N | "Email Label" | — | — |
| Label expiry | Text | N | "14 days" | — | — |
| Next steps | List | Y | — | Pack, attach, drop off | — |
| Track button | Button | Y | "Track My Return" | Link to tracking page | — |

### 4.8. Admin -- Dashboard

> Trang mac dinh khi mo app

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Returns this month | Metric | Y | 0 | Count | — |
| Exchanges this month | Metric | Y | 0 | Count | — |
| Revenue retained | Metric | Y | $0 | Exchange + store credit value | — |
| Pending review | Metric | Y | 0 | Awaiting merchant action | — |
| Store credits issued | Metric | Y | $0 | Total gift cards created | — |
| Returns remaining | Metric | Y | 50 | X/50 free plan | — |
| Reasons chart | Bar chart | Y | — | Top 5 reasons | — |
| Recent returns | List | Y | — | 5 items | Return #, status, type, time |
| Onboarding checklist | Card | N | — | Hien cho new merchants | An khi hoan tat |

### 4.9. Admin -- Return Requests List

> Quan ly tat ca returns

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Search | TextField | N | — | Order #, customer name, email | — |
| Status filter | Select | N | All | Pending/Approved/Shipped/Received/Refunded/Exchanged/Rejected | — |
| Reason filter | Select | N | All | Return reasons | — |
| Date filter | DatePicker | N | Last 30 days | Date range | — |
| Return table | IndexTable | Y | — | Return ID, Order, Customer, Status, Type, Date | — |
| Bulk approve | Button | N | — | Approve selected | — |
| Bulk labels | Button | N | — | Generate labels for selected | — |
| Export CSV | Button | N | — | Export filtered list | — |
| Pagination | Pagination | Y | — | 20 per page | — |

### 4.10. Admin -- Return Detail

> Chi tiet 1 return request

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Return ID | Text | Y | — | RET-XXXX | — |
| Status badge | Badge | Y | — | Current status | — |
| Order link | Link | Y | — | Link to Shopify order | — |
| Customer info | Card | Y | — | Name, email | — |
| Items card | Card | Y | — | Items + reason + resolution + photos | — |
| Timeline | Timeline | Y | — | All status changes | — |
| Approve button | Button | N | — | Approve return | Show khi Pending |
| Reject button | Button | N | — | Reject return | Show khi Pending |
| Request info button | Button | N | — | Ask customer for more info | Show khi Pending |
| Generate label | Button | N | — | Create shipping label | Show khi Approved |
| Process refund | Button | N | — | Issue refund/credit | Show khi Received |
| Internal notes | TextField | N | — | Merchant notes | — |

### 4.11. Admin -- Policy Settings

> Cau hinh return policy

| Item | Data Type | Required | Default | Mo ta | Validate |
|------|-----------|----------|---------|-------|----------|
| Return window | Select | Y | 30 days | 7/14/30/45/60/90 days | — |
| Window start | Select | Y | Fulfillment date | Fulfillment date / Order date | — |
| Restocking fee toggle | Checkbox | Y | false | Enable/disable | — |
| Restocking fee % | Number | N | 0 | Percentage | 0-100 |
| Default eligibility | Radio | Y | All eligible | All eligible / All non-returnable | — |
| Non-returnable list | ResourcePicker | N | — | Products/collections | — |
| Return reasons | Sortable list | Y | Pre-built 6 | Drag to reorder | Min 1 |
| Custom reason | TextField | N | — | Add custom | Max 50 chars |
| Photo requirements | Checkbox list | N | — | Per reason | — |
| Save button | Button | Y | "Save" | — | — |

---

## 5. Acceptance Criteria

### Functional -- Customer

☐ Customer truy cap return portal tu storefront (Theme App Extension widget/link)
☐ Customer lookup order bang order number + email
☐ Portal chi hien thi items eligible (within return window, returnable, fulfilled)
☐ Customer chon items va quantity to return
☐ Customer chon return reason tu dropdown + optional photo upload
☐ Customer chon resolution: refund, store credit (+bonus), hoac exchange
☐ Exchange: customer chon variant moi, thay price difference
☐ Variant het hang = disabled + "Out of stock"
☐ Store credit: tao gift card + bonus amount, email cho customer
☐ Review page hien thi summary truoc khi submit
☐ Return confirmed → hien thi Return ID + status + shipping label (neu auto-approve)
☐ Customer theo doi return status (submitted/approved/shipped/received/resolved)
☐ Email notifications: requested, approved, label created, received, refunded/exchanged
☐ Portal responsive mobile (>= 320px)
☐ Portal ho tro 5 ngon ngu (Free plan)
☐ Portal hien thi merchant branding (logo, colors)

### Functional -- Merchant Admin

☐ Dashboard: returns this month, exchanges, revenue retained, pending review, returns remaining
☐ Dashboard: return reasons chart + recent returns list
☐ Returns list: IndexTable voi filters (status, reason, date), search, bulk actions
☐ Return detail: full info, timeline, approve/reject/generate label/process refund
☐ Policy settings: return window, restocking fee, non-returnable items, custom reasons, photo requirements
☐ Automation: auto-approve toggle + conditions + post-approve actions
☐ Branding: upload logo, set colors, preview
☐ Quick-start wizard: 5 steps, auto-import policies, progress indicator
☐ Settings save → toast "Settings saved"
☐ Onboarding checklist cho new merchant
☐ App load < 3 giay

### Shopify App Store -- BAT BUOC pass review

☐ **GDPR webhook: customers/data_request** → return customer data JSON
☐ **GDPR webhook: customers/redact** → anonymize customer data
☐ **GDPR webhook: shop/redact** → delete ALL shop data
☐ **App uninstall** → cleanup theme extension blocks, metafields, webhook subscriptions
☐ **Idempotency keys** cho moi refund/return operations -- KHONG duplicate refund
☐ **Webhook HMAC verification** tren tat ca webhook endpoints
☐ **Privacy Policy + Terms of Service** accessible (link trong app)
☐ **Performance**: storefront portal khong degrade > 10 Lighthouse points
☐ **LCP < 2.5s, INP < 200ms, CLS < 0.1** tren storefront
☐ **Demo store** san sang cho Shopify reviewer
☐ **Video walkthrough** 3-5 phut (customer return flow + merchant admin)
☐ **App listing** day du: description, 6-8 screenshots, icon

### Edge Cases

☐ Order chua fulfilled → khong cho tao return
☐ Order qua return window → hien thi "Return window expired"
☐ Item da return → khong hien thi trong eligible items
☐ Partial return (chon subset items) → tinh toan refund chinh xac
☐ Exchange variant het hang → disable, hien thi "Out of stock"
☐ Exchange tang gia → charge chenh lech qua Shopify
☐ Exchange giam gia → refund chenh lech
☐ Store credit + bonus → tao gift card voi tong chinh xac
☐ Restocking fee → tru % truoc khi refund
☐ Multiple returns cung order → cho phep neu items khac nhau
☐ Concurrent return requests → locking, prevent duplicate
☐ Shipping label expired → cho phep regenerate
☐ Photo upload fail → retry, khong block return submission
☐ API rate limit → queue + retry

### Security

☐ Tat ca API validate shopId (IDOR prevention)
☐ Customer portal verify order belongs to customer (order number + email match)
☐ Webhook HMAC signature verification
☐ Access tokens encrypted in Firestore
☐ No direct Shopify API from frontend
☐ Rate limiting per shop (100 calls/minute)
☐ Audit log cho moi return/refund/exchange operation
☐ Photo uploads scanned for malware, size limited
☐ Gift card codes not exposed in API responses

### Data Model (Firestore)

| Collection | Doc ID | Purpose |
|-----------|--------|---------|
| `shops` | shopId | Shop config, access token, plan, branding |
| `returnSettings` | shopId | Return policy, automation rules, shipping config |
| `returns` | auto | Return request records |
| `returnItems` | auto | Individual items within a return |
| `returnEvents` | auto | Audit log / timeline per return |
| `webhookLogs` | auto | Idempotency (TTL 7 days) |

**`returns` schema:**

| Field | Type | Description |
|-------|------|-------------|
| shopId | string | Shop identifier |
| orderId | string | Shopify order GID |
| orderNumber | string | Order # |
| customerId | string | Customer ID |
| customerEmail | string | Customer email |
| status | string | `submitted` / `approved` / `rejected` / `label_created` / `shipped` / `in_transit` / `received` / `inspected` / `resolved` |
| items | array | Return items (productId, variantId, qty, reason, resolution, photos) |
| resolutionType | string | `refund` / `store_credit` / `exchange` |
| refundAmount | number | Total refund amount |
| storeCreditAmount | number | Gift card value (incl. bonus) |
| exchangeOrderId | string | New order GID (for exchange) |
| shippingLabelUrl | string | Return label URL |
| trackingNumber | string | Return tracking # |
| trackingCarrier | string | Carrier name |
| createdAt | timestamp | — |
| updatedAt | timestamp | — |
| resolvedAt | timestamp | — |

---

## Timeline uoc tinh

### Phase 1: Submit (Tuan 1-8) -- Rut gon tu MVP

| Tuan | Viec | Output |
|------|------|--------|
| 1-2 | Foundation: monorepo, auth, OAuth, Shopify API integration, database schema | Backend skeleton |
| 3-4 | Return portal (customer-facing): order lookup, item selection, reason, resolution | Customer portal done |
| 5-6 | Exchange flow + store credit + shipping labels + return tracking | Core return flow complete |
| 7 | Admin: dashboard + return requests list + return detail + policy settings | Merchant flow done |
| 8 | GDPR, uninstall cleanup, quick-start wizard, branding, testing → **SUBMIT FREE** | App Store ready |

### Phase 2: MVP Full (Tuan 9-10) -- Trong luc cho + sau approval

| Tuan | Viec | Output |
|------|------|--------|
| 9 | Automation rules + email notifications (full) + merchant notifications | Automation complete |
| 10 | Analytics dashboard (charts) + Billing tiers + Return history | MVP complete |

### Phase 3: P1 Differentiation (Tuan 11-20)

| Tuan | Viec | Output |
|------|------|--------|
| 11-13 | Instant exchange + Cross-product exchange | Exchange advanced |
| 14-15 | Shop Now flow + Exchange bonus credit | Revenue retention |
| 16-17 | Product-level analytics + Fraud detection | Analytics + Security |
| 18-20 | QR code returns + SMS + Green returns + Shopify Flow | P1 complete |

**Tong: ~8 tuan submit + ~2 tuan hoan thien MVP + ~10 tuan P1 = 20 tuan den P1 complete.**

---

**Version**: 1.0
**Date**: 2026-04-09
**Author**: Roger
**Status**: Draft
