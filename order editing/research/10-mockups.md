# Screen Descriptions & Wireframes
# Avada Order Editing

This document describes all key screens in the application, covering both the customer-facing storefront experience and the merchant admin interface. Each screen includes layout descriptions, Polaris components used, key interactions, and mobile adaptation notes.

---

## Part 1: Customer-Facing Screens (Storefront)

---

### Screen 1: Order Status Page -- Edit Order Widget

**Purpose**: Allow customers to initiate order editing directly from Shopify's Order Status Page (post-purchase tracking page). This is the primary entry point for customer self-service editing.

**Implementation**: Theme App Extension (Liquid App Block)

#### Layout Description

```
+-----------------------------------------------------------+
|  Shopify Order Status Page (native)                       |
|                                                           |
|  Order #1234 confirmed                                    |
|  [Shopify native order details...]                        |
|                                                           |
|  +-------------------------------------------------------+|
|  |  EDIT ORDER WIDGET (App Block)                        ||
|  |                                                       ||
|  |  [Edit icon] Need to make changes to your order?      ||
|  |                                                       ||
|  |  You can edit your order within the next 2h 45m       ||
|  |                                                       ||
|  |  [============================------] 2h 45m left     ||
|  |  (progress bar showing time remaining)                ||
|  |                                                       ||
|  |  +-------------------+  +-------------------------+  ||
|  |  | Edit Order        |  | Cancel Order             |  ||
|  |  | (Primary Button)  |  | (Destructive Plain Link) |  ||
|  |  +-------------------+  +-------------------------+  ||
|  |                                                       ||
|  |  Changes allowed: Address, Items, Quantities          ||
|  |  (small text showing what can be edited)              ||
|  +-------------------------------------------------------+|
|                                                           |
|  [Shopify native map/tracking...]                         |
+-----------------------------------------------------------+
```

#### Key Elements

- **Countdown timer**: Visual progress bar + text showing remaining edit window
- **Edit Order button**: Primary action, opens the Edit Order Page
- **Cancel Order link**: Destructive plain link, opens cancellation flow
- **Allowed changes text**: Shows what the merchant has enabled
- **Expired state**: When time window closes, widget shows "Edit window has closed" with dimmed styling

#### Interactions

1. Customer clicks "Edit Order" -> redirects to Edit Order Page (Screen 3)
2. Customer clicks "Cancel Order" -> redirects to Cancellation Flow (Screen 5)
3. Timer counts down in real-time; at expiry, buttons become disabled
4. If order is already fulfilled, widget shows "This order has been shipped and can no longer be edited"

#### Mobile Adaptation

- Widget is full-width on mobile
- Buttons stack vertically on screens < 400px
- Progress bar remains horizontal, text wraps below

---

### Screen 2: Thank-You Page -- Edit Order Banner

**Purpose**: Catch customers immediately after checkout when they are most likely to notice mistakes. This is a high-conversion entry point since customers are still engaged.

**Implementation**: Theme App Extension (Liquid App Block) or Checkout UI Extension

#### Layout Description

```
+-----------------------------------------------------------+
|  Shopify Thank You Page                                   |
|                                                           |
|  Thank you, John! Your order is confirmed.                |
|  Order #1234                                              |
|                                                           |
|  +-------------------------------------------------------+|
|  |  EDIT ORDER BANNER (App Block)                        ||
|  |                                                       ||
|  |  [Checkmark icon]  Order placed successfully!         ||
|  |                                                       ||
|  |  Made a mistake? You can still edit your order.       ||
|  |  Change your address, swap items, or adjust           ||
|  |  quantities within the next 3 hours.                  ||
|  |                                                       ||
|  |  +----------------------------------------------+    ||
|  |  |          Edit My Order (Primary Button)       |    ||
|  |  +----------------------------------------------+    ||
|  |                                                       ||
|  +-------------------------------------------------------+|
|                                                           |
|  [Shopify native order summary...]                        |
+-----------------------------------------------------------+
```

#### Key Elements

- **Success-toned banner**: Light green/blue background, reassuring tone
- **Clear CTA**: Single prominent "Edit My Order" button
- **Time window mention**: "within the next 3 hours" (dynamic based on merchant settings)
- **Non-intrusive**: Sits below the order confirmation, does not distract from the positive checkout experience

#### Interactions

1. Customer clicks "Edit My Order" -> redirects to Edit Order Page (Screen 3)
2. Banner auto-hides if the edit window has already expired (edge case: slow page load)
3. If merchant has disabled self-service editing, this block is not rendered

#### Mobile Adaptation

- Full-width banner
- Button stretches to full width on mobile
- Text is concise to avoid excessive scrolling

---

### Screen 3: Edit Order Page -- Main Editing Interface

**Purpose**: The core customer-facing editing interface where customers make changes to their order. This is a standalone page (not embedded in Shopify admin) that loads via a unique URL.

**Implementation**: Preact storefront widget (Scripttag) or dedicated page via app proxy

#### Layout Description

```
+-----------------------------------------------------------+
|  [Store Logo]              Edit Order #1234     [X Close]  |
|-----------------------------------------------------------+
|                                                           |
|  SECTION 1: SHIPPING ADDRESS                              |
|  +-------------------------------------------------------+|
|  |  Shipping Address                    [Edit] (link)    ||
|  |                                                       ||
|  |  John Smith                                           ||
|  |  123 Main Street, Apt 4B                              ||
|  |  New York, NY 10001                                   ||
|  |  United States                                        ||
|  +-------------------------------------------------------+|
|                                                           |
|  (When "Edit" is clicked, inline form expands:)           |
|  +-------------------------------------------------------+|
|  |  Shipping Address                                     ||
|  |                                                       ||
|  |  First Name: [John        ] Last Name: [Smith       ] ||
|  |  Address 1:  [123 Main Street                       ] ||
|  |  Address 2:  [Apt 4B                                ] ||
|  |  City:       [New York    ] State:     [NY          ] ||
|  |  Zip:        [10001      ] Country:    [US v       ]  ||
|  |  Phone:      [+1 555-0123                           ] ||
|  |                                                       ||
|  |  [Save Address]  [Cancel]                             ||
|  +-------------------------------------------------------+|
|                                                           |
|  SECTION 2: ORDER ITEMS                                   |
|  +-------------------------------------------------------+|
|  |  [Product    ] T-Shirt - Blue / Large                 ||
|  |  [Image      ] $29.99                                 ||
|  |  [50x50      ]                                        ||
|  |  [           ] Qty: [ - ] [2] [ + ]                   ||
|  |  [           ]                                        ||
|  |  [           ] [Swap Variant] [Remove Item]           ||
|  +-------------------------------------------------------+|
|  |  [Product    ] Hoodie - Black / Medium                ||
|  |  [Image      ] $59.99                                 ||
|  |  [50x50      ]                                        ||
|  |  [           ] Qty: [ - ] [1] [ + ]                   ||
|  |  [           ]                                        ||
|  |  [           ] [Swap Variant] [Remove Item]           ||
|  +-------------------------------------------------------+|
|                                                           |
|  (When "Swap Variant" is clicked, modal/drawer opens:)    |
|  +-------------------------------------------------------+|
|  |  Swap: T-Shirt - Blue / Large                         ||
|  |                                                       ||
|  |  Color:  [Blue v]  ->  [Red] [Green] [Black]          ||
|  |  Size:   [Large v] ->  [S] [M] [L] [XL]              ||
|  |                                                       ||
|  |  Original: $29.99                                     ||
|  |  New:      $29.99  (No price change)                  ||
|  |                                                       ||
|  |  [Confirm Swap]  [Cancel]                             ||
|  +-------------------------------------------------------+|
|                                                           |
|  SECTION 3: PRICE SUMMARY (sticky footer on mobile)      |
|  +-------------------------------------------------------+|
|  |  Original Total:     $119.97                          ||
|  |  New Total:          $109.98                          ||
|  |  Difference:         -$9.99 (Refund)                  ||
|  |                                                       ||
|  |  +----------------------------------------------+    ||
|  |  |     Review Changes (Primary Button)           |    ||
|  |  +----------------------------------------------+    ||
|  +-------------------------------------------------------+|
|                                                           |
|  Time remaining: 2h 30m                                   |
+-----------------------------------------------------------+
```

#### Key Elements

- **Store branding**: Merchant's logo, colors applied via settings
- **Address section**: Collapsible inline edit form
- **Item cards**: Product image, title, variant, price, quantity stepper, swap/remove actions
- **Variant swap**: Modal or drawer showing available variants with price comparison
- **Price summary**: Running total showing original, new, and difference (refund or charge)
- **Time remaining**: Persistent reminder of edit window

#### Interactions

1. Edit address -> inline form with validation -> Save updates the address
2. Quantity +/- -> updates price summary in real-time
3. Swap Variant -> opens variant selector -> shows price difference -> confirm swap
4. Remove Item -> confirmation dialog ("Remove T-Shirt from your order?") -> updates summary
5. Review Changes -> navigates to Edit Confirmation (Screen 4)
6. If item is out of stock, variant option is disabled with "Out of stock" label
7. Cannot remove all items (last item removal blocked -- suggest cancellation instead)

#### Mobile Adaptation

- Single-column layout
- Address form fields stack vertically
- Product cards are full-width with image on the left (compact)
- Price summary becomes a sticky footer bar with "Review Changes" button
- Variant swap opens as a bottom sheet instead of modal
- Quantity stepper uses larger touch targets (44px minimum)

---

### Screen 4: Edit Confirmation -- Summary of Changes

**Purpose**: Show the customer a clear summary of all changes before they confirm. This screen is critical for preventing accidental edits and building trust through transparency.

#### Layout Description

```
+-----------------------------------------------------------+
|  [Store Logo]         Confirm Your Changes      [< Back]   |
|-----------------------------------------------------------+
|                                                           |
|  CHANGES SUMMARY                                          |
|  +-------------------------------------------------------+|
|  |  [Check icon] Address Updated                         ||
|  |  Old: 123 Main Street, New York, NY 10001             ||
|  |  New: 456 Oak Avenue, Brooklyn, NY 11201              ||
|  +-------------------------------------------------------+|
|  |  [Swap icon] Item Swapped                             ||
|  |  T-Shirt Blue/Large -> T-Shirt Red/Medium             ||
|  |  Price: $29.99 -> $29.99 (no change)                  ||
|  +-------------------------------------------------------+|
|  |  [Minus icon] Quantity Changed                        ||
|  |  T-Shirt: 2 -> 1 (removed 1)                         ||
|  |  Refund: -$29.99                                      ||
|  +-------------------------------------------------------+|
|                                                           |
|  PRICE BREAKDOWN                                          |
|  +-------------------------------------------------------+|
|  |  Original Subtotal:        $119.97                    ||
|  |  Changes:                  -$29.99                    ||
|  |  Tax Adjustment:           -$2.40                     ||
|  |  Shipping:                 $0.00 (no change)          ||
|  |  --------------------------------------------------- ||
|  |  New Total:                $87.58                     ||
|  |  You will be refunded:     $32.39                     ||
|  +-------------------------------------------------------+|
|                                                           |
|  (or if additional charge:)                               |
|  +-------------------------------------------------------+|
|  |  Additional charge:        $15.00                     ||
|  |  Payment method: Visa ending in 4242                  ||
|  +-------------------------------------------------------+|
|                                                           |
|  +-------------------------------------------------------+|
|  |  [Checkbox] I confirm these changes to my order       ||
|  +-------------------------------------------------------+|
|                                                           |
|  +------------------------------------------------------+|
|  |          Confirm Changes (Primary Button)             ||
|  +------------------------------------------------------+|
|  |          Go Back and Edit (Plain Link)                ||
|  +------------------------------------------------------+|
+-----------------------------------------------------------+
```

#### Key Elements

- **Change cards**: Each change shown with icon, old vs. new values, and price impact
- **Price breakdown**: Clear line-by-line with tax and shipping adjustments
- **Refund/charge callout**: Prominent display of what happens financially
- **Confirmation checkbox**: Required before submitting (prevents accidental confirms)
- **Payment method**: Shown when additional charge is required

#### Interactions

1. Customer reviews all changes
2. Checks confirmation checkbox
3. Clicks "Confirm Changes" -> loading state -> success screen
4. Success screen: "Your order has been updated! You'll receive a confirmation email shortly." with link back to Order Status Page
5. If payment fails (additional charge), show error: "Payment could not be processed. Please contact support."
6. "Go Back and Edit" returns to Edit Order Page with changes preserved

#### Mobile Adaptation

- Change cards stack vertically, full-width
- Price breakdown uses a compact layout
- Confirm button is sticky at bottom
- Checkbox uses large touch target

---

### Screen 5: Cancellation Flow -- Reason Selection + Retention Offer

**Purpose**: When a customer wants to cancel, capture the reason and present a retention offer to reduce cancellation rate. This is a P1 feature but the basic flow (reason + confirm) is P0.

#### Layout Description

```
+-----------------------------------------------------------+
|  [Store Logo]         Cancel Order #1234        [< Back]   |
|-----------------------------------------------------------+
|                                                           |
|  STEP 1: REASON (shown first)                             |
|  +-------------------------------------------------------+|
|  |  Why do you want to cancel?                           ||
|  |                                                       ||
|  |  ( ) I ordered the wrong item                         ||
|  |  ( ) I found a better price elsewhere                 ||
|  |  ( ) I no longer need this                            ||
|  |  ( ) Shipping takes too long                          ||
|  |  ( ) I want to change my order (*)                    ||
|  |  ( ) Other: [________________]                        ||
|  |                                                       ||
|  |  (*) "Would you like to edit your order instead?"     ||
|  |      [Edit Order Instead] (link to Screen 3)          ||
|  |                                                       ||
|  |  [Continue] (button)                                  ||
|  +-------------------------------------------------------+|
|                                                           |
|  STEP 2: RETENTION OFFER (P1 -- shown after reason)      |
|  +-------------------------------------------------------+|
|  |  Before you go...                                     ||
|  |                                                       ||
|  |  +--------------------------------------------------+ ||
|  |  | [Gift icon]                                      | ||
|  |  |                                                  | ||
|  |  | We'd like to offer you 15% OFF your order       | ||
|  |  | if you decide to keep it.                        | ||
|  |  |                                                  | ||
|  |  | New total: $119.97 -> $101.97                    | ||
|  |  | You save: $18.00                                 | ||
|  |  |                                                  | ||
|  |  | [Keep My Order with 15% Off] (Primary)           | ||
|  |  | [No thanks, cancel my order] (Plain link)        | ||
|  |  +--------------------------------------------------+ ||
|  +-------------------------------------------------------+|
|                                                           |
|  STEP 3: CONFIRMATION                                     |
|  +-------------------------------------------------------+|
|  |  Are you sure you want to cancel Order #1234?         ||
|  |                                                       ||
|  |  - All items will be refunded to your original        ||
|  |    payment method (Visa ending in 4242)               ||
|  |  - Refund amount: $119.97                             ||
|  |  - Refund processing time: 5-10 business days         ||
|  |                                                       ||
|  |  [Cancel My Order] (Destructive button)               ||
|  |  [Keep My Order] (Primary button)                     ||
|  +-------------------------------------------------------+|
|                                                           |
|  STEP 4: SUCCESS                                          |
|  +-------------------------------------------------------+|
|  |  [Checkmark]                                          ||
|  |  Your order has been cancelled.                       ||
|  |  A refund of $119.97 will be processed within         ||
|  |  5-10 business days.                                  ||
|  |                                                       ||
|  |  [Continue Shopping] (link to store)                  ||
|  +-------------------------------------------------------+|
+-----------------------------------------------------------+
```

#### Key Elements

- **Reason selection**: Radio buttons with common reasons; "change my order" redirects to editing
- **Retention offer** (P1): Merchant-configurable discount or store credit
- **Final confirmation**: Clear refund details and payment method
- **Smart redirect**: If reason is "ordered wrong item", suggest editing instead

#### Interactions

1. Select reason -> Continue
2. If "want to change my order" selected, show "Edit Order Instead" link (redirect to Screen 3)
3. (P1) Retention offer displayed -> "Keep My Order with 15% Off" applies discount and returns to order status
4. "No thanks, cancel" -> final confirmation step
5. "Cancel My Order" (destructive) -> processes cancellation -> shows success
6. Merchant receives notification with cancellation reason for analytics

#### Mobile Adaptation

- Single-column, steps shown one at a time (wizard flow)
- Radio buttons have large touch targets
- Retention offer card is prominent with large CTA
- Destructive button uses red styling for clarity

---

### Screen 6: Upsell During Edit (P1)

**Purpose**: Show product recommendations while the customer is editing their order, generating additional revenue. This is a sidebar on desktop and a bottom section on mobile.

#### Layout Description

```
+-------------------------------------------+---------------+
|  Edit Order Page (Screen 3)               | UPSELL SIDEBAR|
|                                           |               |
|  [Main editing interface                  | You might     |
|   as described in Screen 3]               | also like:    |
|                                           |               |
|                                           | +----------+  |
|                                           | |[Product  |  |
|                                           | | Image    |  |
|                                           | | 80x80]   |  |
|                                           | |           |  |
|                                           | | Matching  |  |
|                                           | | Belt      |  |
|                                           | | $19.99    |  |
|                                           | |           |  |
|                                           | | [Add to   |  |
|                                           | |  Order]   |  |
|                                           | +----------+  |
|                                           |               |
|                                           | +----------+  |
|                                           | |[Product  |  |
|                                           | | Image]   |  |
|                                           | | Socks     |  |
|                                           | | $9.99     |  |
|                                           | | [Add]     |  |
|                                           | +----------+  |
|                                           |               |
|                                           | +----------+  |
|                                           | |[Product  |  |
|                                           | | Image]   |  |
|                                           | | Hat       |  |
|                                           | | $24.99    |  |
|                                           | | [Add]     |  |
|                                           | +----------+  |
+-------------------------------------------+---------------+
```

#### Key Elements

- **Product cards**: Image, title, price, "Add to Order" button
- **Recommendations**: Based on items in the order (complementary products, same collection, frequently bought together)
- **Revenue attribution**: Track upsell revenue generated through edits
- **Maximum 3-4 recommendations**: Avoid overwhelming the customer

#### Interactions

1. Customer clicks "Add to Order" -> item is added to the order with quantity 1
2. Price summary updates immediately
3. Added upsell items appear in the order items section with a "Just Added" badge
4. Customer can remove upsell items like any other item
5. Upsell revenue is tracked and attributed to the app for analytics

#### Mobile Adaptation

- Sidebar becomes a horizontal scrollable section below the order items
- Product cards are displayed in a horizontal carousel (2-3 visible)
- "Add to Order" buttons use compact styling
- Section is collapsible: "Recommended for you (3)" with expand/collapse

---

## Part 2: Merchant Admin Screens (Polaris)

All merchant admin screens are embedded in the Shopify Admin using React + Polaris v12+ and App Bridge.

---

### Screen 7: Dashboard -- Overview

**Purpose**: Give merchants an at-a-glance view of how order editing is performing in their store. This is the landing page when the app is opened.

#### Layout Description

```
+-----------------------------------------------------------+
|  Shopify Admin Header                                     |
|-----------------------------------------------------------+
|  Avada Order Editing                                      |
|  [Dashboard] [Orders] [Edit Rules] [Analytics] [Settings] |
|-----------------------------------------------------------+
|                                                           |
|  WELCOME BANNER (first-time only)                         |
|  +-------------------------------------------------------+|
|  |  Welcome to Avada Order Editing!                      ||
|  |  Complete setup to let your customers edit orders.     ||
|  |  [Complete Setup] (Primary)         [Dismiss] (Plain) ||
|  +-------------------------------------------------------+|
|                                                           |
|  DATE RANGE SELECTOR                                      |
|  [Last 7 days v]  [Today] [7d] [30d] [90d] [Custom]      |
|                                                           |
|  METRIC CARDS (4-column grid)                             |
|  +-------------+ +-------------+ +-------------+ +-------+|
|  | Total Edits  | | Support $   | | Upsell Rev  | | Cxl  ||
|  |              | | Saved       | |             | | Rate ||
|  |    247       | |   $2,470    | |   $890      | | 3.2%||
|  |  +12% vs     | |  +15% vs    | |  +8% vs     | | -1% ||
|  |  last period | |  last period| |  last period| | vs  ||
|  +-------------+ +-------------+ +-------------+ +-------+|
|                                                           |
|  EDIT TYPES BREAKDOWN           RECENT ACTIVITY           |
|  +---------------------------+ +-------------------------+|
|  | [Donut Chart]             | | 10:32 AM - Order #1234 ||
|  |                           | | Address changed by      ||
|  | Address: 45%              | | customer                ||
|  | Item Swap: 25%            | |                         ||
|  | Quantity: 20%             | | 10:15 AM - Order #1230 ||
|  | Cancellation: 10%        | | Item swapped by         ||
|  |                           | | customer                ||
|  |                           | |                         ||
|  |                           | | 9:48 AM - Order #1228  ||
|  |                           | | Cancelled by customer   ||
|  |                           | | Reason: Wrong item      ||
|  |                           | |                         ||
|  |                           | | [View All Activity]     ||
|  +---------------------------+ +-------------------------+|
|                                                           |
|  PLAN USAGE                                               |
|  +-------------------------------------------------------+|
|  |  Starter Plan: 142 / 200 edits used this month       ||
|  |  [=============================-------] 71%           ||
|  |  [Upgrade Plan]                                       ||
|  +-------------------------------------------------------+|
+-----------------------------------------------------------+
```

#### Polaris Components

- `Page` with title and navigation tabs
- `Layout` with `Layout.Section` for grid
- `Card` for metric cards, chart card, activity feed
- `Badge` for percentage changes (positive = green, negative = red)
- `ProgressBar` for plan usage
- `Button` for CTAs
- `DatePicker` or custom date range selector
- `Banner` for welcome/onboarding (dismissible)
- `ResourceList` for recent activity

#### Key Interactions

1. Date range selector updates all metrics and charts
2. Clicking a metric card navigates to detailed analytics (Screen 11)
3. Clicking an activity item navigates to the order detail (Screen 12)
4. "Upgrade Plan" opens billing upgrade flow
5. "Complete Setup" navigates to Settings with guided setup

#### Mobile Adaptation

- Metric cards stack in 2x2 grid on tablet, single column on mobile
- Donut chart and activity feed stack vertically
- Date selector uses compact dropdown

---

### Screen 8: Orders List -- Orders with Edit History

**Purpose**: Show merchants all orders that have been edited or are eligible for editing, with filtering and search capabilities.

#### Layout Description

```
+-----------------------------------------------------------+
|  Avada Order Editing                                      |
|  [Dashboard] [Orders] [Edit Rules] [Analytics] [Settings] |
|-----------------------------------------------------------+
|                                                           |
|  Orders                                       [Export CSV]|
|                                                           |
|  FILTERS                                                  |
|  [Search orders...        ]                               |
|  [Status: All v] [Edit type: All v] [Date range v]        |
|                                                           |
|  TABS                                                     |
|  [All] [Edited (142)] [Cancelled (18)] [Pending Edit (3)] |
|                                                           |
|  ORDER TABLE                                              |
|  +-------------------------------------------------------+|
|  | Order    | Customer    | Date     | Edit    | Status  ||
|  |          |             |          | Type    |         ||
|  |----------+-------------+----------+---------+---------||
|  | #1234    | John Smith  | Mar 30   | Address | Edited  ||
|  |          |             | 10:32 AM | Swap    | [Badge] ||
|  |----------+-------------+----------+---------+---------||
|  | #1230    | Jane Doe    | Mar 30   | Item    | Edited  ||
|  |          |             | 10:15 AM | Swap    | [Badge] ||
|  |----------+-------------+----------+---------+---------||
|  | #1228    | Bob Wilson  | Mar 30   | Cancel  | Cxl     ||
|  |          |             | 9:48 AM  |         | [Badge] ||
|  |----------+-------------+----------+---------+---------||
|  | #1225    | Alice Brown | Mar 29   | Qty     | Edited  ||
|  |          |             | 4:22 PM  | Change  | [Badge] ||
|  |----------+-------------+----------+---------+---------||
|  | #1220    | Tom Lee     | Mar 29   | --      | Pending ||
|  |          |             | 2:10 PM  |         | [Badge] ||
|  +-------------------------------------------------------+|
|                                                           |
|  Showing 1-20 of 163 orders          [< Prev] [Next >]   |
+-----------------------------------------------------------+
```

#### Polaris Components

- `Page` with title
- `IndexTable` for the order list (sortable columns)
- `IndexFilters` for search, status, edit type, date range filters
- `Tabs` for quick filtering (All, Edited, Cancelled, Pending)
- `Badge` with status colors (Edited = info, Cancelled = critical, Pending = attention)
- `Pagination` for navigating pages
- `Button` for Export CSV

#### Key Interactions

1. Click order row -> navigates to Order Detail (Screen 12)
2. Search by order number, customer name, or email
3. Filter by status (Edited, Cancelled, Pending), edit type, date range
4. Sort by date, order number, customer
5. Export filtered results as CSV
6. "Pending" status means the order is within the edit window and eligible for editing

#### Mobile Adaptation

- Table becomes a card-based list on mobile
- Each card shows: Order #, Customer, Date, Status badge
- Filters collapse into a "Filter" button that opens a sheet
- Search bar remains visible at top

---

### Screen 9: Edit Rules -- Configure Time Windows & Allowed Changes

**Purpose**: Let merchants configure what customers can edit, when they can edit, and any product-specific restrictions.

#### Layout Description

```
+-----------------------------------------------------------+
|  Avada Order Editing                                      |
|  [Dashboard] [Orders] [Edit Rules] [Analytics] [Settings] |
|-----------------------------------------------------------+
|                                                           |
|  Edit Rules                                    [Save]     |
|                                                           |
|  SECTION 1: GLOBAL SETTINGS                               |
|  +-------------------------------------------------------+|
|  |  Customer Self-Service                                ||
|  |                                                       ||
|  |  Enable customer self-service editing  [Toggle ON]    ||
|  |                                                       ||
|  |  Edit Time Window                                     ||
|  |  How long after order placement can customers edit?   ||
|  |  [3 hours v]  (dropdown: 30min, 1h, 2h, 3h, 6h,     ||
|  |               12h, 24h, 48h, Until fulfillment)       ||
|  |                                                       ||
|  |  Allowed Changes                                      ||
|  |  [x] Shipping address                                 ||
|  |  [x] Swap product variants (size, color, etc.)        ||
|  |  [x] Change quantities                                ||
|  |  [x] Remove items                                     ||
|  |  [x] Cancel order                                     ||
|  |  [ ] Add new items (P1)                               ||
|  |  [ ] Edit billing address (coming soon)               ||
|  +-------------------------------------------------------+|
|                                                           |
|  SECTION 2: PRODUCT/COLLECTION RULES                      |
|  +-------------------------------------------------------+|
|  |  Product-Specific Rules                               ||
|  |  Override global settings for specific products       ||
|  |  or collections.                                      ||
|  |                                                       ||
|  |  +--------------------------------------------------+ ||
|  |  | Collection: "Final Sale"                          | ||
|  |  | Rule: No editing allowed                [Edit]    | ||
|  |  | [Remove]                                          | ||
|  |  +--------------------------------------------------+ ||
|  |  | Product: "Custom Engraved Ring"                   | ||
|  |  | Rule: Address only (no item changes)    [Edit]    | ||
|  |  | [Remove]                                          | ||
|  |  +--------------------------------------------------+ ||
|  |                                                       ||
|  |  [+ Add Rule]                                         ||
|  +-------------------------------------------------------+|
|                                                           |
|  SECTION 3: CANCELLATION SETTINGS                         |
|  +-------------------------------------------------------+|
|  |  Cancellation Policy                                  ||
|  |                                                       ||
|  |  Allow customer cancellations    [Toggle ON]          ||
|  |                                                       ||
|  |  Cancellation time window                             ||
|  |  [Same as edit window v]                              ||
|  |                                                       ||
|  |  Require cancellation reason     [Toggle ON]          ||
|  |                                                       ||
|  |  Cancellation reasons (one per line):                 ||
|  |  +--------------------------------------------------+ ||
|  |  | I ordered the wrong item                          | ||
|  |  | I found a better price elsewhere                  | ||
|  |  | I no longer need this                             | ||
|  |  | Shipping takes too long                           | ||
|  |  | Other                                             | ||
|  |  +--------------------------------------------------+ ||
|  |                                                       ||
|  |  Retention offer (P1)           [Toggle OFF]          ||
|  |  Offer discount before cancelling                     ||
|  +-------------------------------------------------------+|
|                                                           |
|  SECTION 4: REFUND SETTINGS                               |
|  +-------------------------------------------------------+|
|  |  Auto-Refund                                          ||
|  |                                                       ||
|  |  Automatically process refunds   [Toggle ON]          ||
|  |  for price reductions                                 ||
|  |                                                       ||
|  |  Refund method                                        ||
|  |  (o) Original payment method                          ||
|  |  ( ) Store credit (P1)                                ||
|  |  ( ) Let customer choose (P1)                         ||
|  |                                                       ||
|  |  Auto-charge for price increases [Toggle ON]          ||
|  +-------------------------------------------------------+|
+-----------------------------------------------------------+
```

#### Polaris Components

- `Page` with title and primary action (Save)
- `Layout` with `Layout.AnnotatedSection` for each section
- `Card` for each settings group
- `SettingToggle` or `Toggle` for on/off settings
- `Select` for dropdowns (time window, refund method)
- `ChoiceList` for checkboxes (allowed changes)
- `ResourceList` for product/collection rules
- `TextField` (multiline) for cancellation reasons
- `RadioButton` for refund method
- `Button` for Add Rule

#### Key Interactions

1. Toggle self-service on/off -> immediately enables/disables customer editing
2. Change time window -> applies to all new orders (existing orders keep their original window)
3. Add product/collection rule -> opens a modal with product/collection picker + rule configuration
4. Save -> validates and persists all settings -> shows toast "Settings saved"
5. "Coming soon" features are visible but disabled with a tooltip explaining the future availability

#### Mobile Adaptation

- Sections stack vertically
- Annotated sections show title above content (not side-by-side)
- Product picker modal becomes full-screen on mobile
- Save button is sticky at the bottom

---

### Screen 10: Settings -- General Settings, Notifications, Branding

**Purpose**: Configure general app settings including notifications, branding, and integrations.

#### Layout Description

```
+-----------------------------------------------------------+
|  Avada Order Editing                                      |
|  [Dashboard] [Orders] [Edit Rules] [Analytics] [Settings] |
|-----------------------------------------------------------+
|                                                           |
|  Settings                                      [Save]     |
|                                                           |
|  SECTION 1: NOTIFICATIONS                                 |
|  +-------------------------------------------------------+|
|  |  Email Notifications                                  ||
|  |                                                       ||
|  |  Send email to customer when:                         ||
|  |  [x] Order is edited                                  ||
|  |  [x] Order is cancelled                               ||
|  |  [x] Refund is processed                              ||
|  |                                                       ||
|  |  Send email to merchant when:                         ||
|  |  [x] Customer edits an order                          ||
|  |  [x] Customer cancels an order                        ||
|  |  [ ] Edit window expires                              ||
|  |                                                       ||
|  |  Notification email: [store@example.com         ]     ||
|  |                                                       ||
|  |  [Preview Email Templates]                            ||
|  +-------------------------------------------------------+|
|                                                           |
|  SECTION 2: BRANDING                                      |
|  +-------------------------------------------------------+|
|  |  Customer-Facing Branding                             ||
|  |                                                       ||
|  |  Primary color:   [#2563EB] [Color picker]            ||
|  |  Button style:    [Rounded v]                         ||
|  |  Show store logo: [Toggle ON]                         ||
|  |                                                       ||
|  |  Edit page heading:                                   ||
|  |  [Edit Your Order                               ]     ||
|  |                                                       ||
|  |  Edit page description:                               ||
|  |  [Make changes to your order below.             ]     ||
|  |                                                       ||
|  |  [Preview] (opens preview of customer-facing page)    ||
|  +-------------------------------------------------------+|
|                                                           |
|  SECTION 3: PLAN & BILLING                                |
|  +-------------------------------------------------------+|
|  |  Current Plan: Starter ($9.99/mo)                     ||
|  |  Edits used: 142 / 200 this month                    ||
|  |  [=============================-------] 71%           ||
|  |  Next billing date: April 15, 2026                    ||
|  |                                                       ||
|  |  [Upgrade Plan] [View Billing History]                ||
|  +-------------------------------------------------------+|
|                                                           |
|  SECTION 4: INTEGRATIONS (P1)                             |
|  +-------------------------------------------------------+|
|  |  Shopify Flow         [Connected] [Badge: Active]     ||
|  |  Google Address API   [Not Connected] [Connect]       ||
|  |  Slack Notifications  [Not Connected] [Connect] (P2)  ||
|  +-------------------------------------------------------+|
|                                                           |
|  SECTION 5: DATA & PRIVACY                                |
|  +-------------------------------------------------------+|
|  |  Data retention: [12 months v]                        ||
|  |  [Export All Data]  [Delete All Data]                  ||
|  +-------------------------------------------------------+|
+-----------------------------------------------------------+
```

#### Polaris Components

- `Page` with title and primary action (Save)
- `Layout` with `Layout.AnnotatedSection`
- `Card` for each settings group
- `ChoiceList` for notification checkboxes
- `TextField` for email, heading, description
- `ColorPicker` or `TextField` with color swatch for primary color
- `Select` for button style, data retention
- `ProgressBar` for plan usage
- `Badge` for integration status
- `Button` for Preview, Upgrade, Connect

#### Key Interactions

1. Toggle notifications on/off
2. Preview Email Templates -> opens modal showing email preview with sample data
3. Change branding -> Preview button shows live preview in modal
4. Upgrade Plan -> opens Shopify billing confirmation
5. Connect integrations -> OAuth flow or API key input
6. Export All Data -> generates CSV download of all edit history
7. Delete All Data -> confirmation dialog with "type DELETE to confirm"

#### Mobile Adaptation

- Annotated sections stack vertically
- Color picker uses native mobile color input
- Plan usage section is prominent at the top on mobile

---

### Screen 11: Analytics -- Charts and Insights

**Purpose**: Provide merchants with visual analytics on editing patterns, revenue impact, and operational savings. This is a P1 feature but the page structure is designed from Day 1.

#### Layout Description

```
+-----------------------------------------------------------+
|  Avada Order Editing                                      |
|  [Dashboard] [Orders] [Edit Rules] [Analytics] [Settings] |
|-----------------------------------------------------------+
|                                                           |
|  Analytics                                                |
|  [Last 30 days v]  [Today] [7d] [30d] [90d] [Custom]     |
|                                                           |
|  SUMMARY METRICS (4 cards)                                |
|  +-------------+ +-------------+ +-------------+ +-------+|
|  | Total Edits  | | Support $   | | Upsell Rev  | | Avg  ||
|  | 1,247        | | Saved       | | $4,320      | | Time ||
|  |              | | $12,470     | |             | | to   ||
|  | +18% vs prev | | +22%        | | +35%        | | Edit ||
|  |              | |             | |             | | 8min ||
|  +-------------+ +-------------+ +-------------+ +-------+|
|                                                           |
|  CHART 1: EDITS OVER TIME                                 |
|  +-------------------------------------------------------+|
|  |  [Line/Bar Chart]                                     ||
|  |                                                       ||
|  |  ^                                                    ||
|  |  |    ___                                             ||
|  |  |   /   \      ___                                   ||
|  |  |  /     \    /   \    ___                           ||
|  |  | /       \  /     \  /   \                          ||
|  |  |/         \/       \/     \                         ||
|  |  +-------------------------------------------->       ||
|  |  Mar 1   Mar 8   Mar 15   Mar 22   Mar 29            ||
|  |                                                       ||
|  |  Legend: [--] Edits  [--] Cancellations               ||
|  +-------------------------------------------------------+|
|                                                           |
|  CHART 2: TOP EDITED         CHART 3: EDIT TYPES         |
|  PRODUCTS                                                 |
|  +---------------------------+ +-------------------------+|
|  | [Bar Chart - Horizontal]  | | [Donut Chart]           ||
|  |                           | |                         ||
|  | T-Shirt Basic   ████ 89  | | Address: 42%            ||
|  | Hoodie Classic  ███  67  | | Item Swap: 28%          ||
|  | Sneakers Pro    ██   45  | | Quantity: 18%           ||
|  | Dress Elegant   ██   38  | | Cancellation: 12%      ||
|  | Hat Summer      █    22  | |                         ||
|  +---------------------------+ +-------------------------+|
|                                                           |
|  CHART 4: CANCELLATION REASONS                            |
|  +-------------------------------------------------------+|
|  | [Horizontal Bar Chart]                                ||
|  |                                                       ||
|  | Wrong item        ██████████████  38%                 ||
|  | Better price      ████████       22%                  ||
|  | No longer needed  ██████         18%                  ||
|  | Shipping slow     ████           12%                  ||
|  | Other             ███            10%                  ||
|  +-------------------------------------------------------+|
|                                                           |
|  TABLE: REVENUE IMPACT                                    |
|  +-------------------------------------------------------+|
|  | Metric                  | This Period | Change        ||
|  |-------------------------+-------------+---------------||
|  | Support tickets avoided | 1,247       | -62%          ||
|  | Support cost saved      | $12,470     | +22%          ||
|  | Upsell revenue          | $4,320      | +35%          ||
|  | Retained cancellations  | 47          | +12%          ||
|  | Revenue retained        | $8,900      | +28%          ||
|  | Net app ROI             | 42x         | +15%          ||
|  +-------------------------------------------------------+|
+-----------------------------------------------------------+
```

#### Polaris Components

- `Page` with title
- `Card` for each chart section
- `Layout` with sections for chart grid
- Custom chart components (use a charting library like Recharts or Chart.js)
- `DataTable` for revenue impact table
- `Badge` for percentage changes
- Date range selector (custom component or `DatePicker`)

#### Key Interactions

1. Date range selector updates all charts and metrics
2. Hover over chart data points shows tooltip with exact values
3. Click on a product in "Top Edited Products" navigates to filtered Orders list
4. Export charts as PNG or data as CSV
5. Revenue impact table auto-calculates based on merchant-configured support cost per ticket ($8-$15 default)

#### Mobile Adaptation

- Charts stack vertically in single column
- Charts are horizontally scrollable if needed
- Summary metrics use 2x2 grid
- Data table is horizontally scrollable

---

### Screen 12: Order Detail -- Single Order Edit History & Timeline

**Purpose**: Show the complete edit history and timeline for a single order, allowing merchants to see every change made and by whom.

#### Layout Description

```
+-----------------------------------------------------------+
|  Avada Order Editing                                      |
|  [< Back to Orders]                                       |
|-----------------------------------------------------------+
|                                                           |
|  Order #1234                                              |
|  John Smith | john@example.com | Mar 30, 2026 10:32 AM   |
|                                              [View in     |
|                                               Shopify]    |
|                                                           |
|  STATUS BAR                                               |
|  +-------------------------------------------------------+|
|  | Status: [Edited] (Badge)                              ||
|  | Edit window: Closed (expired Mar 30, 1:32 PM)         ||
|  | Total edits: 2                                        ||
|  | Price change: -$29.99 (refunded)                      ||
|  +-------------------------------------------------------+|
|                                                           |
|  CURRENT ORDER STATE              EDIT ACTIONS            |
|  (Left Column - 2/3)             (Right Column - 1/3)    |
|  +---------------------------+   +----------------------+ |
|  | Items:                    |   | Staff Actions:       | |
|  |                           |   |                      | |
|  | [Img] T-Shirt Red/Medium  |   | [Edit Order]         | |
|  |       $29.99 x 1          |   | (opens admin editor) | |
|  |                           |   |                      | |
|  | [Img] Hoodie Black/Medium |   | [Cancel Order]       | |
|  |       $59.99 x 1          |   |                      | |
|  |                           |   | [Resend Edit Link]   | |
|  | Subtotal: $89.98          |   | (sends email to      | |
|  | Tax: $7.20                |   |  customer with edit   | |
|  | Shipping: $5.99           |   |  page link)          | |
|  | Total: $103.17            |   |                      | |
|  |                           |   +----------------------+ |
|  | Shipping Address:         |                            |
|  | 456 Oak Ave               |                            |
|  | Brooklyn, NY 11201        |                            |
|  +---------------------------+                            |
|                                                           |
|  EDIT TIMELINE                                            |
|  +-------------------------------------------------------+|
|  |  [Timeline - vertical]                                ||
|  |                                                       ||
|  |  O  Mar 30, 10:32 AM - Customer edited order         ||
|  |  |  Changes:                                          ||
|  |  |  - Address: 123 Main St -> 456 Oak Ave             ||
|  |  |  - T-Shirt: Blue/Large -> Red/Medium               ||
|  |  |  Price change: $0.00                               ||
|  |  |  Edited by: Customer (self-service)                ||
|  |  |                                                    ||
|  |  O  Mar 30, 10:45 AM - Customer edited order         ||
|  |  |  Changes:                                          ||
|  |  |  - T-Shirt: Qty 2 -> 1 (removed 1)                ||
|  |  |  Price change: -$29.99                             ||
|  |  |  Refund: $29.99 to Visa ending 4242                ||
|  |  |  Edited by: Customer (self-service)                ||
|  |  |                                                    ||
|  |  O  Mar 30, 10:00 AM - Order placed                  ||
|  |  |  Original total: $149.96                           ||
|  |  |  Items: T-Shirt Blue/Large x2, Hoodie Black/M x1  ||
|  |  |                                                    ||
|  +-------------------------------------------------------+|
+-----------------------------------------------------------+
```

#### Polaris Components

- `Page` with breadcrumb ("Back to Orders") and title
- `Layout` with two-column layout (2/3 + 1/3)
- `Card` for current order state, edit actions, timeline
- `Badge` for order status
- `ResourceList` or custom list for order items
- `Timeline` (custom component) for edit history
- `Button` for staff actions (Edit Order, Cancel, Resend Link)
- `Link` for "View in Shopify" (opens order in Shopify Admin)

#### Key Interactions

1. "View in Shopify" -> opens the Shopify admin order page in a new tab (via App Bridge)
2. "Edit Order" -> opens an inline editor (same capabilities as Screen 3 but within admin)
3. "Cancel Order" -> confirmation dialog -> processes cancellation with refund
4. "Resend Edit Link" -> sends the customer an email with the edit page URL
5. Timeline entries are expandable to show full detail of each change
6. Each timeline entry shows who made the edit (customer vs. staff member name)

#### Mobile Adaptation

- Two-column layout stacks to single column (actions below order state)
- Timeline entries are collapsible (show summary, tap to expand)
- "View in Shopify" button uses App Bridge navigation on mobile admin
- Staff action buttons are grouped in a "More actions" dropdown

---

## Screen Flow Diagram

```
CUSTOMER JOURNEY:
                                    
  Thank-You Page ─────┐            
  (Screen 2)          │            
                      ▼            
  Order Status  ──> Edit Order ──> Edit Confirmation ──> Success
  Page               Page              (Screen 4)          
  (Screen 1)         (Screen 3)                            
       │                 │                                  
       │                 ├──> Upsell Sidebar (Screen 6)    
       │                 │    (P1, shown alongside Screen 3)
       ▼                 │                                  
  Cancel Flow ◄──────────┘                                  
  (Screen 5)                                               
       │                                                    
       ├──> Retention Offer (P1)                           
       │         │                                          
       │         ├──> Keep Order (discount applied)         
       │         └──> Proceed to Cancel                    
       └──> Cancel Confirmed                               


MERCHANT JOURNEY:

  Dashboard ──> Orders List ──> Order Detail               
  (Screen 7)    (Screen 8)      (Screen 12)                
       │                            │                       
       │                            ├──> Inline Edit        
       │                            └──> Cancel / Resend    
       │                                                    
       ├──> Edit Rules (Screen 9)                          
       ├──> Analytics (Screen 11)                          
       └──> Settings (Screen 10)                           
```

---

## Design Principles

1. **Clarity over cleverness**: Every screen should be immediately understandable. No jargon, no ambiguity about what will happen when a button is clicked.

2. **Trust through transparency**: Always show the customer exactly what will change, what it will cost, and how refunds work. No surprises.

3. **Mobile-first for customers**: 60%+ of shoppers are on mobile. Every customer-facing screen must work flawlessly on small screens.

4. **Admin efficiency**: Merchants should be able to understand their edit activity in under 10 seconds from the dashboard. Common actions should be 1-2 clicks away.

5. **Progressive disclosure**: Show essential information first, details on demand. Use collapsible sections, modals, and drill-down navigation.

6. **Consistent with Shopify**: Admin screens follow Polaris v12+ patterns exactly. Customer-facing screens match the merchant's store branding.

7. **Error prevention over error handling**: Use confirmation steps, disabled states for unavailable options, and clear validation messages to prevent mistakes.

---

*End of Screen Descriptions & Wireframes -- Avada Order Editing v1.0*
