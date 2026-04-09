# 10 - Screen Descriptions & Wireframes: Avada Return & Exchange

**Version:** 1.0 (MVP)
**Date:** 2026-04-09
**Design System:** Shopify Polaris v12+
**Framework:** React (Admin), Liquid + JS (Theme Extension)

---

## Customer-Facing Screens

---

### Screen 1: Return Request Portal (Main Page)

**Purpose:** The entry point where customers initiate a return by looking up their order.

**Route:** `https://{store-domain}/apps/avada-returns` (Theme App Extension embedded page)

```
+------------------------------------------------------------------+
|  [Store Logo]          RETURNS & EXCHANGES                       |
|                                                                  |
|  +------------------------------------------------------------+  |
|  |                                                            |  |
|  |   Start Your Return                                        |  |
|  |                                                            |  |
|  |   Enter your order details to get started.                 |  |
|  |                                                            |  |
|  |   Order Number          Email Address                      |  |
|  |   +------------------+  +------------------------------+  |  |
|  |   | #               |  | you@example.com              |  |  |
|  |   +------------------+  +------------------------------+  |  |
|  |                                                            |  |
|  |   [ Look Up Order ]                                        |  |
|  |                                                            |  |
|  |   --- OR ---                                               |  |
|  |                                                            |  |
|  |   [ Log In to Your Account ]                               |  |
|  |                                                            |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  Already submitted a return?                                     |
|  [ Track Your Return Status ]                                    |
|                                                                  |
|  +--------------------------+  +--------------------------+      |
|  | Free Shipping Labels     |  | Easy Exchanges           |      |
|  | We'll send you a prepaid |  | Swap for a different     |      |
|  | return label.            |  | size or product.         |      |
|  +--------------------------+  +--------------------------+      |
|                                                                  |
|  Powered by Avada  |  Return Policy                              |
+------------------------------------------------------------------+
```

**Polaris Components Used:**
- N/A (Theme App Extension -- uses custom Liquid + CSS matching merchant branding)
- Custom `TextField` inputs for order number and email
- Custom `Button` (primary) for Look Up Order
- Custom `Button` (secondary/outline) for Log In and Track Status

**Key Interactions:**
- On "Look Up Order": validate order number + email via API, redirect to product selection if found
- On error: display inline error "Order not found. Please check your order number and email."
- On "Log In": redirect to Shopify customer account, then show list of eligible orders
- On "Track Your Return Status": redirect to status tracking screen with return ID input

**Mobile Adaptation:**
- Single-column layout
- Order number and email fields stack vertically
- Full-width buttons
- Feature cards stack vertically

**Error States:**
- Order not found: inline banner below form
- Order outside return window: "This order is no longer eligible for return. Contact us for assistance." with link to contact page
- Network error: "Something went wrong. Please try again." with retry button

---

### Screen 2: Product Selection

**Purpose:** Customer selects which items from their order to return.

```
+------------------------------------------------------------------+
|  [Store Logo]          RETURNS & EXCHANGES                       |
|  < Back to Order Lookup                                          |
|                                                                  |
|  Order #1234  |  Placed: March 15, 2026                          |
|                                                                  |
|  Select items to return:                                         |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | [ ] [IMG] Blue Denim Jacket - Size M            $89.00     |  |
|  |          Qty ordered: 1                                    |  |
|  |          Qty to return: [ 1 v ]                            |  |
|  +------------------------------------------------------------+  |
|  | [x] [IMG] White Cotton T-Shirt - Size L         $29.00     |  |
|  |          Qty ordered: 2                                    |  |
|  |          Qty to return: [ 1 v ]                            |  |
|  +------------------------------------------------------------+  |
|  | [IMG] Running Shoes - Size 10         $120.00   NON-       |  |
|  |       Qty ordered: 1                            RETURNABLE |  |
|  +------------------------------------------------------------+  |
|  | [IMG] Leather Belt - Size 32           $45.00   RETURN     |  |
|  |       Qty ordered: 1                            WINDOW     |  |
|  |                                                 EXPIRED    |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  Selected: 1 item  |  Return Value: $29.00                      |
|                                                                  |
|  [ Continue to Return Reasons ]                                  |
|                                                                  |
+------------------------------------------------------------------+
```

**Polaris Components (conceptual -- Theme Extension):**
- Custom `Checkbox` for item selection
- Product image `Thumbnail`
- `Select` dropdown for quantity
- `Badge` for non-returnable / expired items (styled as disabled)
- Summary bar (sticky on mobile) showing selected count and value

**Key Interactions:**
- Checkbox enables/disables quantity selector
- Non-returnable items shown but greyed out with explanation badge
- Expired items shown but greyed out with "Return Window Expired" badge
- "Continue" button disabled until at least 1 item selected
- Multiple items can be selected for a single return request

**Mobile Adaptation:**
- Product images shrink to 48x48px thumbnails
- Quantity selector becomes inline dropdown
- Summary bar sticks to bottom of screen
- Scrollable item list

**Error States:**
- No items eligible: "All items in this order are either non-returnable or past the return window. Contact us for help."
- Quantity exceeds available: "You can only return up to [X] units of this item."

---

### Screen 3: Return Reason Selection

**Purpose:** Customer provides return reason per item with optional photo upload.

```
+------------------------------------------------------------------+
|  [Store Logo]          RETURNS & EXCHANGES                       |
|  < Back to Item Selection                                        |
|                                                                  |
|  Why are you returning?                                          |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | [IMG] White Cotton T-Shirt - Size L              $29.00    |  |
|  |                                                            |  |
|  |  Return Reason:                                            |  |
|  |  +------------------------------------------------------+  |  |
|  |  | Too Small                                          v |  |  |
|  |  +------------------------------------------------------+  |  |
|  |                                                            |  |
|  |  Additional Details (optional):                            |  |
|  |  +------------------------------------------------------+  |  |
|  |  | Fits like an XS, runs very small compared to         |  |  |
|  |  | the size chart.                                      |  |  |
|  |  +------------------------------------------------------+  |  |
|  |                                                            |  |
|  |  Upload Photos (required for sizing issues):               |  |
|  |  +----------+  +----------+  +----------+                  |  |
|  |  | [Photo1] |  | [Photo2] |  | + Add    |                  |  |
|  |  |          |  |          |  |   Photo  |                  |  |
|  |  +----------+  +----------+  +----------+                  |  |
|  |  Up to 5 photos, 10MB each                                |  |
|  |                                                            |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  [ Continue to Resolution Options ]                              |
|                                                                  |
+------------------------------------------------------------------+
```

**Polaris Components (conceptual):**
- `Select` dropdown for return reason categories
- `TextField` (multiline) for additional details
- Custom file upload area with drag-and-drop
- Image preview thumbnails with remove button

**Key Interactions:**
- Reason dropdown populated from merchant's configured reasons
- Sub-reasons appear based on category (e.g., "Too Small" / "Too Large" under Sizing)
- Photo upload required if merchant configured it for the selected reason
- Drag and drop or click to upload
- Photos stored in Cloud Storage with return request association
- Repeat per item if multiple items selected

**Mobile Adaptation:**
- Camera access for direct photo capture (in addition to file picker)
- Full-width dropdown
- Photo grid wraps to 2 columns

**Error States:**
- No reason selected: "Please select a return reason."
- Required photo missing: "A photo is required for this return reason."
- File too large: "Photo must be under 10MB. Please try a smaller file."
- Upload failure: "Failed to upload photo. Please try again."

---

### Screen 4: Exchange Selection

**Purpose:** Customer picks a replacement item/variant when choosing exchange resolution.

```
+------------------------------------------------------------------+
|  [Store Logo]          RETURNS & EXCHANGES                       |
|  < Back to Resolution Options                                    |
|                                                                  |
|  Choose Your Resolution                                          |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | ( ) Refund to Original Payment              $29.00         |  |
|  |     Refund to Visa ending in 4242                          |  |
|  +------------------------------------------------------------+  |
|  | ( ) Store Credit                            $34.00         |  |
|  |     +$5.00 bonus for choosing store credit!                |  |
|  |     [BADGE: +$5 BONUS]                                     |  |
|  +------------------------------------------------------------+  |
|  | (o) Exchange for Another Item               $34.00 credit  |  |
|  |     +$5.00 bonus for choosing exchange!                    |  |
|  |     [BADGE: +$5 BONUS]  [BADGE: RECOMMENDED]               |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  --- Exchange Options ---                                        |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Same Product, Different Size/Color:                        |  |
|  |                                                            |  |
|  | Size:  [S] [M] [*L*] [XL] [XXL]                           |  |
|  | Color: [White*] [Black] [Navy]                             |  |
|  |                                                            |  |
|  | White Cotton T-Shirt - Size XL                             |  |
|  | [BADGE: In Stock]  Price: $29.00 (same price)              |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  --- OR ---                                                      |  |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Browse Other Products:                                     |  |
|  |                                                            |  |
|  | [IMG] Premium       [IMG] V-Neck       [IMG] Henley        |  |
|  | Cotton Tee          T-Shirt            Shirt               |  |
|  | $35.00              $32.00             $42.00              |  |
|  | +$1.00 due          +$0 (credit)       +$8.00 due         |  |
|  |                                                            |  |
|  | [ Browse Full Catalog > ]  (Shop Now -- Pro plan)          |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  [ Confirm Exchange: White Cotton T-Shirt - XL ]                 |
|                                                                  |
+------------------------------------------------------------------+
```

**Polaris Components (conceptual):**
- `RadioButton` group for resolution type
- `Badge` for bonus credit, in-stock status, recommendations
- `ButtonGroup` / variant swatch selector for size/color
- Product `Card` grid for cross-product suggestions
- `Banner` for price difference notification

**Key Interactions:**
- Resolution options: Refund, Store Credit, Exchange (with bonus callouts)
- Variant selector shows real-time inventory (In Stock / Low Stock / Out of Stock badges)
- Out-of-stock variants are disabled with "Notify me" option
- Price difference calculated and displayed in real-time
- "Browse Full Catalog" opens Shop Now flow (storefront redirect with credit applied)
- Confirm button shows selected exchange item details

**Mobile Adaptation:**
- Resolution options as full-width cards
- Variant swatches wrap to multiple rows
- Product browse grid becomes 2-column
- Sticky bottom bar with "Confirm Exchange" button

**Error States:**
- Selected variant out of stock: "This variant is currently out of stock. Please select another option."
- Price difference collection failed: "We couldn't process the price difference. Please try again or select a different item."

---

### Screen 5: Shipping Label / Return Instructions

**Purpose:** Customer receives their return shipping label or instructions.

```
+------------------------------------------------------------------+
|  [Store Logo]          RETURNS & EXCHANGES                       |
|  < Back to Exchange Selection                                    |
|                                                                  |
|  How would you like to return your item?                         |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | (o) Prepaid Shipping Label          FREE                   |  |
|  |     We'll email you a USPS label.                          |  |
|  |     Print it and drop off at any post office.              |  |
|  +------------------------------------------------------------+  |
|  | ( ) QR Code (Box-Free)              FREE      [PRO badge]  |  |
|  |     Show QR code at FedEx/UPS.                             |  |
|  |     No box or label needed.                                |  |
|  +------------------------------------------------------------+  |
|  | ( ) Keep the Item                   GREEN RETURN            |  |
|  |     No need to ship anything back.                         |  |
|  |     Your refund/credit will be issued immediately.         |  |
|  +------------------------------------------------------------+  |
|  | ( ) Ship It Yourself                                       |  |
|  |     Send to: 123 Warehouse St, City, ST 12345              |  |
|  |     You pay for shipping.                                  |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  Review Your Return Summary:                                     |
|  +------------------------------------------------------------+  |
|  | Item: White Cotton T-Shirt - Size L (x1)                   |  |
|  | Reason: Too Small                                          |  |
|  | Resolution: Exchange for Size XL (+$5 bonus credit)        |  |
|  | Shipping: Prepaid Label (USPS)                             |  |
|  | Estimated Processing: 5-7 business days after receipt       |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  [ Submit Return Request ]                                       |
|                                                                  |
+------------------------------------------------------------------+
```

**Polaris Components (conceptual):**
- `RadioButton` group for shipping method
- `Badge` for PRO features and GREEN RETURN
- Summary `Card` with key-value pairs
- `Button` (primary) for submit

**Key Interactions:**
- Shipping methods shown based on merchant config and customer plan
- QR code option only if merchant on Pro plan and carrier supports it
- "Keep the Item" shown only if item value below merchant's green return threshold
- Summary shows all choices for review before submission
- Submit triggers: create return request, generate label/QR, send confirmation email

**Mobile Adaptation:**
- Shipping options as full-width radio cards
- Summary card full width
- Submit button sticky at bottom

**Error States:**
- Label generation failed: "We couldn't generate your shipping label. Please try again or choose 'Ship It Yourself'."
- Carrier unavailable: "Prepaid labels are temporarily unavailable for your location. Please choose another option."

---

### Screen 6: Return Status Tracking

**Purpose:** Customer tracks the progress of their return request.

```
+------------------------------------------------------------------+
|  [Store Logo]          RETURNS & EXCHANGES                       |
|                                                                  |
|  Return #RET-2026-0042                                           |
|  Order #1234  |  Submitted: April 9, 2026                        |
|                                                                  |
|  +------------------------------------------------------------+  |
|  |                                                            |  |
|  |  [====*=======*=======*=======*=======*======]             |  |
|  |   Submitted  Approved  Shipped  Received  Resolved         |  |
|  |      v          v         v        o         o             |  |
|  |    Apr 9     Apr 9     Apr 10                              |  |
|  |                                                            |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  Current Status: [BADGE: In Transit]                             |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Tracking: USPS 9400111899223456789012                       |  |
|  | [ Track on USPS.com > ]                                    |  |
|  |                                                            |  |
|  | Last Update: In transit, expected delivery Apr 12           |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  Return Details:                                                 |
|  +------------------------------------------------------------+  |
|  | Item: White Cotton T-Shirt - Size L (x1)                   |  |
|  | Reason: Too Small                                          |  |
|  | Resolution: Exchange for Size XL                           |  |
|  | Bonus Credit: +$5.00                                       |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  Activity Timeline:                                              |
|  +------------------------------------------------------------+  |
|  | Apr 10  Shipped - Tracking number assigned                 |  |
|  | Apr 9   Approved - Return label emailed to you             |  |
|  | Apr 9   Submitted - Return request received                |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  Need help? [ Contact Support ]                                  |
|                                                                  |
+------------------------------------------------------------------+
```

**Polaris Components (conceptual):**
- Custom progress stepper (5 stages with dates)
- `Badge` for current status (color-coded)
- `Card` for tracking details with external link
- `Card` for return details
- Reverse-chronological timeline list

**Key Interactions:**
- Progress bar updates in real-time based on carrier tracking and merchant actions
- Tracking link opens carrier website in new tab
- Status auto-refreshes every 60 seconds (or manual refresh button)
- Email notification sent at each status change

**Mobile Adaptation:**
- Progress stepper becomes vertical timeline
- Cards stack full-width
- Tracking link prominent as a button

**Error States:**
- Tracking unavailable: "Tracking information will appear once your return is scanned by the carrier."
- Return rejected: Status bar stops at "Rejected" with reason and contact support link

---

### Screen 7: Order Status Page Widget (Theme App Extension)

**Purpose:** A small widget embedded on Shopify's order status / Thank You page showing return eligibility.

```
+------------------------------------------------------------------+
|                                                                  |
|  (Shopify Order Status Page Content Above)                       |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Need to return or exchange an item?                        |  |
|  |                                                            |  |
|  | This order is eligible for returns until May 15, 2026.     |  |
|  |                                                            |  |
|  | [ Start a Return or Exchange ]                             |  |
|  |                                                            |  |
|  | * Free shipping labels  * Easy exchanges  * Instant credit |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  (Shopify Order Status Page Content Below)                       |
|                                                                  |
+------------------------------------------------------------------+
```

**Polaris Components:** N/A (Liquid block in Theme App Extension)

**Key Interactions:**
- Widget auto-detects order eligibility based on return policy
- Button links to the return portal with order pre-filled
- After return window expires, widget changes to: "The return window for this order has closed."
- If return already submitted, shows: "Return #RET-XXXX is in progress. [Track Status]"

**Mobile Adaptation:**
- Full-width card below order details
- Button fills width

**Error States:**
- Non-returnable order (all digital items): Widget hidden entirely
- API error: Widget hidden (fails gracefully, no broken UI)

---

## Merchant Admin Screens

---

### Screen 8: Dashboard (Overview Metrics)

**Purpose:** Landing page showing key return metrics and pending actions.

**Route:** `/` (default embedded app page)

```
+------------------------------------------------------------------+
| Avada Returns & Exchanges                    [Plan: Free] [?Help]|
+------------------------------------------------------------------+
|                                                                  |
|  Welcome back, Greg!                              April 9, 2026  |
|                                                                  |
|  +----------+  +----------+  +----------+  +----------+         |
|  | OPEN     |  | PENDING  |  | REVENUE  |  | EXCHANGE |         |
|  | RETURNS  |  | REVIEW   |  | RETAINED |  | RATE     |         |
|  |    12    |  |    3     |  | $1,240   |  |   34%    |         |
|  | +8% WoW  |  | Action!  |  | +12% MoM |  | +5% MoM  |         |
|  +----------+  +----------+  +----------+  +----------+         |
|                                                                  |
|  Usage: 32 / 50 returns this month          [Upgrade for More]   |
|  [=========================================-----------]          |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Needs Your Attention                                [See All]|  |
|  |------------------------------------------------------------|  |
|  | [!] #RET-0042  |  Jane D.  | Under Review | Damaged Item  |  |
|  | [!] #RET-0041  |  Mike S.  | Under Review | Not As Desc.  |  |
|  | [!] #RET-0040  |  Lisa T.  | Under Review | Changed Mind  |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +---------------------------+  +---------------------------+    |
|  | Returns by Reason         |  | Resolution Distribution   |    |
|  | [Bar Chart]               |  | [Donut Chart]             |    |
|  | Sizing     |||||||  42%   |  |   Refund: 45%             |    |
|  | Damaged    |||||    28%   |  |   Exchange: 34%           |    |
|  | Wrong Item ||||     18%   |  |   Store Credit: 21%       |    |
|  | Other      ||       12%   |  |                           |    |
|  +---------------------------+  +---------------------------+    |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Recent Activity                                             |  |
|  |------------------------------------------------------------|  |
|  | 10:32 AM  Return #0042 submitted by Jane D.                |  |
|  | 10:15 AM  Return #0039 refund processed ($45.00)           |  |
|  |  9:48 AM  Return #0038 exchange shipped (Order #1456)      |  |
|  |  9:30 AM  Return #0037 auto-approved                       |  |
|  +------------------------------------------------------------+  |
|                                                                  |
+------------------------------------------------------------------+
```

**Polaris Components:**
- `Page` with title and action buttons
- `Layout` with sections
- `Card` for each metric (with `Badge` for trend)
- `ProgressBar` for usage meter
- `IndexTable` for pending review items
- `Card` with embedded charts (use Polaris Viz or custom SVG)
- `Card` with activity timeline

**Key Interactions:**
- Click metric card: navigates to filtered return list
- Click "Pending Review" item: navigates to return detail
- Click "Upgrade for More": opens billing page
- Usage bar turns yellow at 80%, red at 95%
- Charts interactive: hover for values, click segments to filter

**Mobile Adaptation:**
- Metric cards in 2x2 grid
- Charts stack vertically
- Activity timeline becomes scrollable list

**Error States:**
- No data yet: "No returns processed yet. Your dashboard will populate as returns come in."
- API error loading metrics: "Unable to load metrics. [Retry]"

---

### Screen 9: Return Requests List

**Purpose:** Filterable, searchable list of all return requests.

**Route:** `/returns`

```
+------------------------------------------------------------------+
| Returns                                     [ Export ] [ Filter ] |
+------------------------------------------------------------------+
|                                                                  |
|  Search: [Search by order #, customer, email...        ] [Go]    |
|                                                                  |
|  Filters:  [All Status v] [All Reasons v] [Date Range v]        |
|            [Resolution v] [Product v]                             |
|                                                                  |
|  Active Filters: Status: Under Review  [x]                       |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | [ ] | Return ID   | Order  | Customer    | Status    |     |  |
|  |     |             |        |             |           | ... |  |
|  |------------------------------------------------------------|  |
|  | [ ] | #RET-0042   | #1234  | Jane D.     | [Under    |     |  |
|  |     | Apr 9       |        | jane@e.com  |  Review]  |     |  |
|  |     | 1 item      |        |             |           |     |  |
|  |------------------------------------------------------------|  |
|  | [ ] | #RET-0041   | #1230  | Mike S.     | [Under    |     |  |
|  |     | Apr 8       |        | mike@e.com  |  Review]  |     |  |
|  |     | 2 items     |        |             |           |     |  |
|  |------------------------------------------------------------|  |
|  | [ ] | #RET-0040   | #1228  | Lisa T.     | [Approved]|     |  |
|  |     | Apr 8       |        | lisa@e.com  |           |     |  |
|  |     | 1 item      |        |             |           |     |  |
|  |------------------------------------------------------------|  |
|  | [ ] | #RET-0039   | #1225  | Tom W.      |[Completed]|     |  |
|  |     | Apr 7       |        | tom@e.com   |           |     |  |
|  |     | 1 item      |        |             |           |     |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  Selected: 2  [ Bulk Approve ] [ Bulk Generate Labels ]          |
|                                                                  |
|  Showing 1-20 of 42 returns      [ < Prev ]  1  2  3  [ Next >] |
|                                                                  |
+------------------------------------------------------------------+
```

**Polaris Components:**
- `Page` with title and primary action (Export)
- `TextField` for search with search icon
- `Filters` component with `Select` dropdowns
- `Tag` for active filter pills
- `IndexTable` with selectable rows
- `Badge` for status (color-coded: Under Review = yellow, Approved = blue, Completed = green, Rejected = red)
- `Pagination` at bottom
- `ActionList` for bulk actions (appears when rows selected)

**Badge Color Mapping:**

| Status | Badge Variant |
|--------|--------------|
| Requested | `attention` (yellow) |
| Under Review | `attention` (yellow) |
| Approved | `info` (blue) |
| Rejected | `critical` (red) |
| Shipped / In Transit | `info` (blue) |
| Received | `info` (blue) |
| Completed | `success` (green) |
| Closed | `subdued` (grey) |

**Key Interactions:**
- Click row: navigate to return detail (Screen 10)
- Checkbox selection enables bulk actions bar
- Bulk Approve: confirm modal, then batch-approve selected returns
- Bulk Generate Labels: generate labels for all selected and email to customers
- Export: CSV download of filtered results
- Filters update URL params for bookmarkable/shareable views

**Mobile Adaptation:**
- IndexTable becomes card-based list (each return as a card)
- Search bar full-width
- Filters collapse into a "Filter" button that opens a sheet
- Bulk actions accessible via a floating action button

**Error States:**
- No results: "No returns match your filters. [Clear Filters]"
- Search no results: "No returns found for '[query]'."
- Export failed: "Export failed. Please try again."

---

### Screen 10: Return Request Detail

**Purpose:** Single return view with all information and available actions.

**Route:** `/returns/{returnId}`

```
+------------------------------------------------------------------+
| < Returns          Return #RET-0042        [BADGE: Under Review] |
+------------------------------------------------------------------+
|                                                                  |
|  +---------------------------+  +---------------------------+    |
|  | Order Details             |  | Customer Details          |    |
|  |---------------------------|  |---------------------------|    |
|  | Order: #1234              |  | Jane Doe                  |    |
|  | Date: March 15, 2026      |  | jane@example.com          |    |
|  | Total: $148.00            |  | 3 previous orders         |    |
|  | Fulfillment: Fulfilled    |  | 0 previous returns        |    |
|  | [View in Shopify >]       |  | [BADGE: Low Risk]         |    |
|  +---------------------------+  +---------------------------+    |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Return Items                                                |  |
|  |------------------------------------------------------------|  |
|  | [IMG] White Cotton T-Shirt - Size L         Qty: 1         |  |
|  |       Return Reason: Too Small                              |  |
|  |       Detail: "Fits like an XS, runs very small"            |  |
|  |       Photos: [Photo1] [Photo2]                             |  |
|  |       Requested Resolution: Exchange for Size XL            |  |
|  |       Item Value: $29.00                                    |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Actions                                                     |  |
|  |------------------------------------------------------------|  |
|  |  [ Approve Return ]  [ Reject Return ]  [ Request Info ]   |  |
|  |                                                            |  |
|  |  Resolution:                                               |  |
|  |  [ Process Refund ]  [ Issue Store Credit ]                |  |
|  |  [ Create Exchange Order ]                                 |  |
|  |                                                            |  |
|  |  Shipping:                                                 |  |
|  |  [ Generate Label ]  [ Mark as Received ]                  |  |
|  |                                                            |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Internal Notes                              [ Add Note ]    |  |
|  |------------------------------------------------------------|  |
|  | No notes yet.                                               |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Activity Timeline                                           |  |
|  |------------------------------------------------------------|  |
|  | Apr 9, 10:32 AM  Return requested by customer               |  |
|  |                  Reason: Too Small                           |  |
|  |                  Resolution: Exchange for Size XL            |  |
|  +------------------------------------------------------------+  |
|                                                                  |
+------------------------------------------------------------------+
```

**Polaris Components:**
- `Page` with back navigation and `Badge` for status
- `Layout` with two-column top section
- `Card` for order details with `Link` to Shopify admin
- `Card` for customer details with `Badge` for fraud risk
- `Card` for return items with `Thumbnail`, `TextStyle`, photo gallery
- `Card` for actions with `ButtonGroup`
- `Card` for internal notes with `TextField` (multiline)
- `Card` for activity timeline (reverse-chronological list)

**Key Interactions:**
- **Approve**: Sets status to Approved, triggers notification email. If auto-approve rules matched, shows "Auto-approved by rule: [rule name]"
- **Reject**: Opens modal with rejection reason (required) and optional message to customer. Sends rejection email.
- **Request Info**: Opens modal to type message requesting photos/details. Sends email to customer.
- **Process Refund**: Opens modal with amount (pre-filled), refund method (original payment / store credit / partial). Calls Shopify Refund API.
- **Issue Store Credit**: Creates Shopify gift card, emails to customer with code.
- **Create Exchange Order**: Opens exchange flow -- select replacement item, confirm price difference, create Shopify draft order.
- **Generate Label**: Select carrier, generate label, email to customer.
- **Mark as Received**: Set condition (new/like_new/used/damaged), optionally restock inventory.
- **Add Note**: Internal note visible only to merchant team.
- Click photos to view full-size in lightbox.

**Mobile Adaptation:**
- Two-column top section becomes single column (stacked)
- Action buttons become a dropdown menu ("More Actions")
- Timeline scrollable

**Error States:**
- Refund API failure: "Refund could not be processed. Please try again or process manually in Shopify admin."
- Label generation failure: "Label generation failed. Check carrier settings and try again."
- Exchange item out of stock: "The selected exchange item is no longer in stock."

---

### Screen 11: Return Policy Settings

**Purpose:** Configure return windows, eligible items, and policy rules.

**Route:** `/settings/policies`

```
+------------------------------------------------------------------+
| Settings > Return Policies                            [ Save ]   |
+------------------------------------------------------------------+
|                                                                  |
|  +------------------------------------------------------------+  |
|  | General Return Window                                       |  |
|  |------------------------------------------------------------|  |
|  | Return window (days):  [ 30 ]                               |  |
|  | Starts from:  (o) Order fulfillment date                    |  |
|  |               ( ) Order creation date                       |  |
|  |               ( ) Delivery date                             |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Auto-Approve Rules                         [Toggle: ON]     |  |
|  |------------------------------------------------------------|  |
|  | Auto-approve returns when ALL conditions met:               |  |
|  | [x] Within return window                                    |  |
|  | [x] Item is not on non-returnable list                      |  |
|  | [x] Customer not on blocklist                               |  |
|  | [ ] Order value under $[ 500 ]                              |  |
|  | [ ] Customer has fewer than [ 3 ] returns in [ 60 ] days    |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Non-Returnable Items                                        |  |
|  |------------------------------------------------------------|  |
|  | Products:                                                   |  |
|  |   + Running Shoes (SKU: RS-001)                 [Remove]    |  |
|  |   + Gift Cards                                  [Remove]    |  |
|  |   [ + Add Product ]                                        |  |
|  |                                                            |  |
|  | Collections:                                                |  |
|  |   + Final Sale                                  [Remove]    |  |
|  |   [ + Add Collection ]                                     |  |
|  |                                                            |  |
|  | Product Tags:                                               |  |
|  |   + "no-return"                                 [Remove]    |  |
|  |   [ + Add Tag ]                                            |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Restocking Fee                              [Toggle: OFF]   |  |
|  |------------------------------------------------------------|  |
|  | Fee percentage:  [ 15 ] %                                   |  |
|  | Apply to:  [x] All returns  [ ] Only "Changed Mind" returns |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Return Reasons                                               |  |
|  |------------------------------------------------------------|  |
|  | [Drag] Too Small            Sizing     Photo: Required  [E] |  |
|  | [Drag] Too Large            Sizing     Photo: Optional  [E] |  |
|  | [Drag] Damaged/Defective    Defective  Photo: Required  [E] |  |
|  | [Drag] Not As Described     Quality    Photo: Required  [E] |  |
|  | [Drag] Changed Mind         Preference Photo: No        [E] |  |
|  | [Drag] Other                Other      Photo: Optional  [E] |  |
|  |                                                            |  |
|  | [ + Add Custom Reason ]                                     |  |
|  +------------------------------------------------------------+  |
|                                                                  |
+------------------------------------------------------------------+
```

**Polaris Components:**
- `Page` with `primaryAction` (Save)
- `Card` for each settings section
- `TextField` (numeric) for return window days
- `RadioButton` group for window start
- `SettingToggle` for auto-approve and restocking fee
- `Checkbox` for auto-approve conditions
- `ResourceList` with removable items for non-returnable products
- `ResourcePicker` modal for adding products/collections
- Drag-and-drop sortable list for return reasons
- `Button` for add actions

**Key Interactions:**
- Save button validates all fields and persists to Firestore
- ResourcePicker opens Shopify product/collection picker modal
- Return reasons are drag-and-drop sortable
- Edit button [E] on reasons opens inline edit or modal
- Toggle auto-approve ON shows condition checkboxes
- Toggle restocking fee ON shows percentage and scope

**Mobile Adaptation:**
- All sections stack vertically
- ResourcePicker still works (Shopify provides mobile-friendly picker)
- Drag-and-drop may need tap-and-hold on mobile

**Error States:**
- Invalid return window: "Return window must be between 1 and 365 days."
- Save failed: "Settings could not be saved. Please try again."

---

### Screen 12: Automation Rules

**Purpose:** Create if-then automation rules for return processing workflows.

**Route:** `/settings/automations`

```
+------------------------------------------------------------------+
| Settings > Automation Rules                   [ + Create Rule ]  |
+------------------------------------------------------------------+
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Active Rules (3)                                            |  |
|  |------------------------------------------------------------|  |
|  | [ON]  Auto-approve low-value returns                        |  |
|  |       IF order value < $50                                  |  |
|  |       AND reason is NOT "Damaged/Defective"                 |  |
|  |       THEN auto-approve + generate label                   |  |
|  |       [Edit] [Delete]                                       |  |
|  |------------------------------------------------------------|  |
|  | [ON]  Green return for items under $15                       |  |
|  |       IF item value < $15                                   |  |
|  |       THEN mark as "Keep the Item" + issue store credit     |  |
|  |       [Edit] [Delete]                                       |  |
|  |------------------------------------------------------------|  |
|  | [ON]  Flag frequent returners                                |  |
|  |       IF customer has > 3 returns in 60 days                |  |
|  |       THEN flag for manual review + add to watchlist        |  |
|  |       [Edit] [Delete]                                       |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Inactive Rules (1)                                          |  |
|  |------------------------------------------------------------|  |
|  | [OFF] VIP auto-approve                                      |  |
|  |       IF customer tag = "VIP"                               |  |
|  |       THEN auto-approve + instant exchange                  |  |
|  |       [Edit] [Delete]                                       |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  --- Rule Editor (Create New) ---                                |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Rule Name: [ Auto-approve loyalty customers ]               |  |
|  |                                                            |  |
|  | IF:                                                         |  |
|  |  Condition:  [Customer tag  v]  [equals  v]  [loyal   ]    |  |
|  |  [ + Add Condition (AND) ]                                 |  |
|  |                                                            |  |
|  | THEN:                                                       |  |
|  |  Action:  [Auto-approve return          v]                 |  |
|  |  Action:  [Send custom email            v]                 |  |
|  |  [ + Add Action ]                                          |  |
|  |                                                            |  |
|  | Priority: [ 4 ] (lower = higher priority)                   |  |
|  |                                                            |  |
|  | [ Save Rule ]  [ Cancel ]                                   |  |
|  +------------------------------------------------------------+  |
|                                                                  |
+------------------------------------------------------------------+
```

**Polaris Components:**
- `Page` with primary action (Create Rule)
- `Card` for active and inactive rules groups
- `SettingToggle` for rule on/off
- `TextField` for rule name
- `Select` dropdowns for condition fields, operators, and action types
- `Button` for add condition/action
- `TextField` (numeric) for priority
- `ButtonGroup` for Save/Cancel

**Key Interactions:**
- Create Rule: opens rule editor (inline or modal)
- Conditions: customer tag, order value, return reason, product type, return count in period
- Operators: equals, not equals, greater than, less than, contains
- Actions: auto-approve, auto-reject, flag for review, generate label, send custom email, apply restocking fee, mark as green return
- Rules evaluated in priority order (first match wins)
- Toggle ON/OFF immediately activates/deactivates rule
- Starter plan ($9/mo) and above

**Mobile Adaptation:**
- Rule cards full-width
- Rule editor condition/action dropdowns stack vertically
- Edit/Delete as swipe actions on mobile

**Error States:**
- Duplicate rule name: "A rule with this name already exists."
- Invalid condition: "Please complete all condition fields."
- Plan limit: "Upgrade to Starter to create automation rules."

---

### Screen 13: Analytics

**Purpose:** Return analytics with charts, product insights, and financial reporting.

**Route:** `/analytics`

```
+------------------------------------------------------------------+
| Analytics                    [Date Range: Last 30 Days v] [Export]|
+------------------------------------------------------------------+
|                                                                  |
|  +----------+  +----------+  +----------+  +----------+         |
|  | TOTAL    |  | RETURN   |  | AVG      |  | REVENUE  |         |
|  | RETURNS  |  | RATE     |  | PROCESS  |  | RETAINED |         |
|  |   127    |  |  18.3%   |  | 4.2 days |  | $3,820   |         |
|  | +15% MoM |  | -2% MoM  |  | -0.5 day |  | +22% MoM |         |
|  +----------+  +----------+  +----------+  +----------+         |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Returns Over Time                                           |  |
|  |------------------------------------------------------------|  |
|  | [Line Chart - X: dates, Y: count]                           |  |
|  |          ___                                                |  |
|  |    ___--/   \___       ___                                  |  |
|  | __/             \___--/   \___                               |  |
|  | Apr 1    Apr 8    Apr 15   Apr 22    Apr 30                 |  |
|  | --- Returns  --- Exchanges  --- Refunds                     |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +---------------------------+  +---------------------------+    |
|  | Return Reasons            |  | Resolution Distribution   |    |
|  |---------------------------|  |---------------------------|    |
|  | [Bar Chart]               |  | [Donut Chart]             |    |
|  | Too Small     |||||| 38% |  |                           |    |
|  | Too Large     ||||   22% |  |  Refund      42%          |    |
|  | Damaged       |||    15% |  |  Exchange    34%          |    |
|  | Not as Desc.  |||    14% |  |  Store Credit 24%         |    |
|  | Changed Mind  ||     11% |  |                           |    |
|  +---------------------------+  +---------------------------+    |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Top Returned Products                    [PRO badge]        |  |
|  |------------------------------------------------------------|  |
|  | #  Product                 Returns  Rate    Top Reason      |  |
|  |------------------------------------------------------------|  |
|  | 1  White Cotton T-Shirt      23    32.4%   Too Small (61%)  |  |
|  | 2  Blue Denim Jacket         18    24.1%   Too Large (44%)  |  |
|  | 3  Slim Fit Chinos           14    28.7%   Too Small (72%)  |  |
|  | 4  Summer Dress              11    19.2%   Not as Desc (55%)|  |
|  | 5  Running Shorts             9    12.1%   Changed Mind(67%)|  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Financial Impact                         [PRO badge]        |  |
|  |------------------------------------------------------------|  |
|  | Total Return Value:          $8,450                         |  |
|  | Refunded to Payment:         $3,549  (42%)                  |  |
|  | Retained via Exchange:       $2,873  (34%)                  |  |
|  | Retained via Store Credit:   $2,028  (24%)                  |  |
|  | Revenue Retained Total:      $4,901  (58%)                  |  |
|  | Avg Shipping Label Cost:     $6.20                          |  |
|  | Green Returns Savings:       $186 (30 returns kept)         |  |
|  +------------------------------------------------------------+  |
|                                                                  |
+------------------------------------------------------------------+
```

**Polaris Components:**
- `Page` with date range `Select` and Export `Button`
- `Card` for metric tiles with `Badge` for trends
- `Card` for line chart (Polaris Viz `LineChart` or custom)
- `Card` for bar chart and donut chart
- `IndexTable` for top returned products (Pro plan)
- `Card` for financial summary with key-value rows
- `Badge` for PRO features (locked for free plan)

**Key Interactions:**
- Date range filter affects all charts and metrics
- Click product in "Top Returned" table: drills into variant-level breakdown
- Export: download CSV/PDF report
- Charts are interactive (hover for values, click to filter)
- Pro badge items locked for Free/Starter plans with "Upgrade" CTA

**Mobile Adaptation:**
- Metric tiles in 2x2 grid
- Charts full-width, scrollable horizontally
- Product table becomes card-based list
- Financial summary as a simple list

**Error States:**
- No data for period: "No returns were processed during this period."
- Chart loading error: "Unable to load chart data. [Retry]"

---

### Screen 14: Branding / Customization Settings

**Purpose:** Customize the look and feel of the customer-facing return portal.

**Route:** `/settings/branding`

```
+------------------------------------------------------------------+
| Settings > Portal Branding                            [ Save ]   |
+------------------------------------------------------------------+
|                                                                  |
|  +---------------------------+  +---------------------------+    |
|  | Branding                  |  | Live Preview              |    |
|  |---------------------------|  |---------------------------|    |
|  | Logo:                     |  | +---------------------+   |    |
|  | [Upload Logo] [Remove]    |  | | [Logo]              |   |    |
|  |                           |  | | RETURNS & EXCHANGES |   |    |
|  | Store Name:               |  | |                     |   |    |
|  | [ Greg's Fashion ]        |  | | Start Your Return   |   |    |
|  |                           |  | |                     |   |    |
|  | Primary Color:            |  | | Order #  [______]   |   |    |
|  | [#2C6ECB] [Color Picker]  |  | | Email    [______]   |   |    |
|  |                           |  | |                     |   |    |
|  | Accent Color:             |  | | [Look Up Order]     |   |    |
|  | [#008060] [Color Picker]  |  | |                     |   |    |
|  |                           |  | | Powered by Avada    |   |    |
|  | Background Color:         |  | +---------------------+   |    |
|  | [#FFFFFF] [Color Picker]  |  |                           |    |
|  |                           |  | [Desktop] [Mobile]       |    |
|  | Font Family:              |  |                           |    |
|  | [Inter          v]        |  |                           |    |
|  |                           |  |                           |    |
|  | Button Style:             |  |                           |    |
|  | (o) Rounded               |  |                           |    |
|  | ( ) Square                |  |                           |    |
|  | ( ) Pill                  |  |                           |    |
|  |                           |  |                           |    |
|  | "Powered by Avada":       |  |                           |    |
|  | [x] Show  [PRO: Remove]   |  |                           |    |
|  |                           |  |                           |    |
|  +---------------------------+  +---------------------------+    |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Custom Text / Language                                      |  |
|  |------------------------------------------------------------|  |
|  | Language: [English          v]   [+ Add Language]           |  |
|  |                                                            |  |
|  | Portal Title:     [ Returns & Exchanges             ]      |  |
|  | Subtitle:         [ Enter your order details to...  ]      |  |
|  | Submit Button:    [ Submit Return Request            ]      |  |
|  | Success Message:  [ Your return has been submitted!  ]      |  |
|  |                                                            |  |
|  | [ Reset to Defaults ]                                       |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Custom CSS (Advanced)                                       |  |
|  |------------------------------------------------------------|  |
|  | +--------------------------------------------------------+ |  |
|  | | .avada-return-portal {                                  | |  |
|  | |   /* Add custom CSS here */                             | |  |
|  | | }                                                       | |  |
|  | +--------------------------------------------------------+ |  |
|  +------------------------------------------------------------+  |
|                                                                  |
+------------------------------------------------------------------+
```

**Polaris Components:**
- `Page` with Save action
- `Layout` two-column (settings left, preview right)
- `DropZone` for logo upload
- `TextField` for store name and custom text
- `ColorPicker` for color fields
- `Select` for font family
- `RadioButton` for button style
- `Checkbox` for "Powered by" toggle
- `Card` for live preview (iframe or rendered component)
- `Tabs` in preview for Desktop/Mobile toggle
- `Select` for language with add button
- `TextField` (code editor) for custom CSS

**Key Interactions:**
- All changes reflect in live preview immediately
- Desktop/Mobile toggle shows responsive preview
- "Powered by Avada" removal only on Pro plan (locked otherwise)
- Language dropdown switches all editable text fields to selected language
- Custom CSS applies to the portal with live preview
- Save persists all branding settings

**Mobile Adaptation:**
- Preview collapses into an expandable section
- Settings take full width
- Color pickers use mobile-native selectors

**Error States:**
- Logo too large: "Logo must be under 2MB. Please upload a smaller file."
- Invalid hex color: "Please enter a valid hex color code."
- CSS error: "Your CSS contains errors. Please review and fix before saving."

---

## Component Reference

### Polaris v12+ Components Used Across Screens

| Component | Screens Used | Purpose |
|-----------|-------------|---------|
| `Page` | 8, 9, 10, 11, 12, 13, 14 | Top-level page wrapper with title and actions |
| `Layout` | 8, 10, 14 | Multi-column layouts |
| `Card` | 8, 9, 10, 11, 12, 13, 14 | Content grouping |
| `IndexTable` | 9, 13 | Sortable, selectable data tables |
| `Badge` | 8, 9, 10, 13 | Status indicators, plan badges |
| `Button` / `ButtonGroup` | All screens | Actions and CTAs |
| `TextField` | 9, 10, 11, 12, 14 | Text input fields |
| `Select` | 9, 11, 12, 13 | Dropdown selections |
| `Checkbox` | 11 | Multi-select options |
| `RadioButton` | 11 | Single-select options |
| `SettingToggle` | 11, 12 | Feature on/off toggles |
| `ProgressBar` | 8 | Usage meter |
| `Pagination` | 9 | List navigation |
| `Tag` | 9 | Active filter indicators |
| `Filters` | 9 | Filter bar for lists |
| `Modal` | 10, 12 | Confirmation dialogs, editors |
| `Banner` | 8, 10 | Alerts and notifications |
| `DropZone` | 14 | File upload areas |
| `ColorPicker` | 14 | Color selection |
| `Tabs` | 14 | View switching (desktop/mobile) |
| `Thumbnail` | 10 | Product images |
| `Link` | 10 | Navigation links |
| `Tooltip` | 8, 13 | Contextual help |
| `EmptyState` | 8, 9 | Zero-data states |

### Status Color System

| Status | Color | Hex | Context |
|--------|-------|-----|---------|
| Pending / Under Review | Yellow | `#FFC453` | Needs attention |
| Approved / In Progress | Blue | `#5C6AC4` | Actively processing |
| Completed / Success | Green | `#008060` | Successfully resolved |
| Rejected / Error | Red | `#D72C0D` | Failed or denied |
| Closed / Inactive | Grey | `#8C9196` | No longer active |

---

## Navigation Structure

```
+------------------------------------------------------------------+
|  Avada Returns & Exchanges                                        |
|                                                                  |
|  [NAV]                                                           |
|  +-- Dashboard (Screen 8)                                        |
|  +-- Returns (Screen 9)                                          |
|  |   +-- Return Detail (Screen 10)                               |
|  +-- Analytics (Screen 13)                                       |
|  +-- Settings                                                    |
|      +-- Return Policies (Screen 11)                             |
|      +-- Automation Rules (Screen 12)                            |
|      +-- Portal Branding (Screen 14)                             |
|      +-- Notification Templates                                  |
|      +-- Shipping Configuration                                  |
|      +-- Integrations                                            |
|      +-- Billing & Plan                                          |
+------------------------------------------------------------------+
```

**Customer-Facing Screens (Theme App Extension):**
```
+-- Return Portal (Screen 1)
|   +-- Product Selection (Screen 2)
|   +-- Return Reason (Screen 3)
|   +-- Exchange Selection (Screen 4)
|   +-- Shipping / Review (Screen 5)
|   +-- Confirmation
+-- Return Status Tracking (Screen 6)
+-- Order Status Widget (Screen 7)
```

---

## Responsive Breakpoints

| Breakpoint | Width | Target |
|-----------|-------|--------|
| Mobile | < 640px | Phone (portrait) |
| Tablet | 640-1024px | Tablet / Phone (landscape) |
| Desktop | > 1024px | Desktop browser |

**General mobile rules:**
- All multi-column layouts collapse to single column
- Tables become card-based lists
- Action buttons move to bottom of screen (sticky)
- Charts scroll horizontally
- Modals become full-screen sheets
- Navigation collapses to hamburger menu (Polaris handles this)
