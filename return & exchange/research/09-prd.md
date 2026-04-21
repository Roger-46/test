# 09 - Product Requirements Document (PRD): Avada Return & Exchange

**Product Name:** Avada Return & Exchange
**Version:** 2.0 (Lean MVP)
**Author:** Roger (BA) + Research Team
**Date:** 2026-04-10
**Status:** Draft
**App Store Name:** Avada Return & Exchange
**App Store Subtitle:** Automate returns, exchanges & refunds. 50 free returns/mo

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Solution Description](#3-solution-description)
4. [Target Audience](#4-target-audience)
5. [MVP Features](#5-mvp-features-detailed-specifications)
6. [Post-MVP Features](#6-post-mvp-features-p1-p2-phases)
7. [Pricing Strategy](#7-pricing-strategy)
8. [Success Metrics & KPIs](#8-success-metrics--kpis)
9. [Competitive Positioning](#9-competitive-positioning)
10. [Risks & Mitigations](#10-risks--mitigations)
11. [Technical Architecture Summary](#11-technical-architecture-summary)
12. [Timeline](#12-timeline)
13. [Go-to-Market Strategy](#13-go-to-market-strategy)

---

## 1. Executive Summary

Avada Return & Exchange is a Shopify app that enables merchants to manage product returns, issue refunds and store credit, and provide customers with a self-service return portal -- all without requiring manual email communication or Shopify native workarounds.

The returns management software market is valued at $1.93 billion (2026) and growing at 12.9% CAGR. Online return rates have reached 24.5% in 2025, with fashion/apparel stores facing 30-40% return rates. Despite 122+ apps in the Shopify App Store Returns & Exchanges category, a massive pricing gap exists between "free but useless" plans (3-6 returns/month) and "powerful but unaffordable" solutions ($155-$340/month). No current app offers a genuinely useful free tier combined with affordable paid plans that include store credit, auto-approve, and basic automation.

**This PRD defines a Lean MVP** focused on delivering core return management value in 4-6 weeks. The scope has been deliberately reduced to accelerate time-to-market. Features such as exchange flows, automation rule builders, analytics dashboards, portal branding customization, and advanced shipping have been moved to post-MVP phases.

**MVP Core Value Proposition:** A Shopify return management app with the most generous free tier on the market (5 returns/month on Free plan, 100 on Basic) that lets merchants receive, review, and resolve return requests through a clean admin interface, while giving customers a self-service portal to initiate returns without emailing support.

---

## 2. Problem Statement

### The Returns Crisis for Shopify Merchants

E-commerce returns represent one of the most significant operational and financial challenges facing online merchants. Unlike brick-and-mortar retail where return rates average 8.72%, online retail return rates have surged to 24.5% in 2025. Fashion and apparel stores -- the largest Shopify category -- face return rates of 30-40%. The actual cost of processing a return is 3-4x what most merchants estimate when factoring in reverse shipping, restocking, customer service time, inventory depreciation, and lost future revenue.

### Real Merchant Pain Points

Merchants across all existing return apps consistently report the same frustrations. These quotes come directly from Shopify App Store reviews and community forums:

**Pain 1: Shopify's native return system is severely limited.**

> *"Shopify's native flow does not automate policy enforcement, send proactive return status notifications, route returns to multiple warehouses, or push customers toward exchanges instead of refunds."* -- Refundid analysis

> *"Under two returns a day is usually manageable on Shopify's native tool, but once you pass that threshold, the manual work and policy limitations start to compound."* -- Refundid analysis

Shopify's built-in system lacks a branded self-service portal, carrier integrations for label generation, advanced policy enforcement, exchange flows, store credit incentives, return status notifications, and analytics. Any merchant processing more than 2 returns per day finds it completely inadequate.

**Pain 2: Existing apps are too expensive for small-medium stores.**

> *"Why do I need to pay for additional seats on top of the per-return rate."* -- Blundstone UK, 1-star AfterShip review, May 2025

> *"This app wasted over six weeks of our time. I cannot even comment on whether the app itself is good, because we were never given access to log in or use it."* -- Pretty Little Home, 1-star Loop Returns review, Feb 2026

The pricing landscape creates a significant gap: Loop Returns starts at $155/month, ReturnGO has no free plan and starts at $23/month with $1.25 per extra return, AfterShip's "free" plan is shopper-funded (customers pay for return shipping), and Return Prime's free plan allows only 5 returns per month. 74% of Shopify stores are small businesses that cannot justify $150+/month for return management.

**Pain 3: Onboarding is a nightmare.**

> *"The most complicated and convoluted procedure... support essentially telling users to figure it out themselves."* -- Loop Returns merchant reporting a month-long installation

> *One UK merchant spent more than 6 hours trying to set up Return Prime.* -- Cahoot analysis

Returns apps require significant configuration, and merchants frequently report excessive setup time, missed onboarding calls, and incorrect information from support about feature capabilities.

**Pain 4: Billing transparency is non-existent.**

> *"Anywhere I look the app says FREE for the starter plan. Nowhere does it say I will get charged."* -- Shopify Community post about being charged $700 on a "free" AfterShip plan

> *"Charged $26K USD [due to a tracking number attack] with refusal to refund despite provided evidence."* -- Qwintry, Sept 2023

> *"Unauthorized charges for 3 months after cancellation and uninstall."* -- Ars Resort, 1-star AfterShip review, Oct 2025

**Pain 5: Customer support from existing apps is unreliable.**

> *"Aftership doesn't care about their long-term customers."* -- MARIEMUR, 1-star review, after 2 months of unresolved return label issues

> *"Support staff respond whenever they feel like it -- if they respond at all."* -- Spacefish Army, 1-star Return Prime review, Jan 2026

> *"Scheduled onboarding call was never attended."* -- Ouchhh Store, 1-star Return Prime review, March 2026

### The Opportunity

There is a clear whitespace in the market for an affordable, full-featured returns app targeting the massive SMB segment (3.5M+ active Shopify stores) that:
- Offers a genuinely useful free tier (not 3-5 returns/month)
- Provides store credit and auto-approve without requiring paid plans
- Sets up in minutes, not hours or weeks
- Has transparent pricing with no hidden fees
- Delivers reliable, responsive customer support

---

## 3. Solution Description

Avada Return & Exchange is a Shopify embedded app that provides:

**For Merchants (Admin App):**
- A dashboard showing key return metrics at a glance
- A filterable, searchable list of all return requests with status tracking
- A detailed view for each return request with the ability to approve, reject, process refund, issue store credit, add internal notes, and view activity history
- Configurable return policies (return window, conditions, auto-approve toggle, non-returnable items, restocking fees, return reasons)
- Simple email notification toggles (on/off per notification type)

**For Customers (Storefront Portal):**
- Order lookup by order number + email
- Item selection with quantity and return reason
- Photo upload for supporting evidence
- Resolution choice: refund to original payment OR store credit
- Shipping method: "Ship it yourself" (merchant provides return address)
- Return summary and confirmation
- Return status tracking page

**What MVP Explicitly Does NOT Include:**
- Exchange flow (browse products, variant picker, price difference handling)
- Automation rule builder (custom IF/THEN rules)
- Analytics page (charts, trends, top products, financial impact)
- Portal branding customization (custom CSS, color picker, logo upload, live preview)
- Advanced shipping (auto-generated labels, QR codes, carrier integrations)
- SMS notifications
- Fraud detection
- Shopify Flow integration
- Multi-language portal

These features are planned for P1 and P2 phases (see Section 6).

---

## 4. Target Audience

### Primary Target: SMB Core Segment ("Growing Greg")

| Attribute | Detail |
|-----------|--------|
| **Shopify Plan** | Basic, Grow |
| **Monthly Revenue** | $1,500-$25,000 |
| **Monthly Orders** | 50-600 |
| **Monthly Returns** | 10-100 |
| **Team Size** | 1-4 people |
| **Budget for returns app** | $0-$30/month |
| **Current process** | Manual email-based returns OR hitting limits on a competitor's free plan |

This segment represents approximately 3.5M active Shopify stores. These merchants are growing fast enough that manual return handling is becoming a bottleneck, but they cannot justify $150+/month for enterprise return solutions. They are the most underserved segment in the current market.

**Key behaviors:**
- Discovers apps through Shopify App Store search or blog posts
- Installs 2-3 free apps to compare; picks the one that works in under 15 minutes
- Will uninstall immediately if setup is confusing
- Very price sensitive -- will tolerate minor limitations for free
- Writes reviews (both positive and negative) -- critical for app store ranking
- Shares recommendations in merchant communities

**Core verticals to prioritize:**
- Fashion/apparel DTC brands (highest return rates: 26-40%)
- Footwear/shoe stores (sizing-driven returns)
- Beauty/cosmetics (satisfaction-driven returns)
- Home goods (fit/style-driven returns)

### Secondary Target: Free/Dev Segment ("Starting Sarah")

Solo operators with $800-$2,000/month revenue and 2-8 returns/month. They will never pay for a returns app but are critical for app store ranking (install volume), reviews, and future conversion as their stores grow.

### Future Target (Post-MVP): Mid-Market Segment ("Scaling Sophia")

Operations managers at $50K-$150K/month revenue stores with 300-800 returns/month. Highest ARPU ($45-$50/month average) and longest retention. Will be targeted once P1 features (exchange, analytics, automation) are shipped.

---

## 5. MVP Features: Detailed Specifications

### 5.1 Dashboard

**Purpose:** Give merchants a quick overview of their return activity without requiring them to dig through individual requests.

**What is included:**
- **Open Returns count:** Number of return requests in active states (Requested, Under Review, Approved, Shipped)
- **Pending Review count:** Number of return requests specifically awaiting merchant action (status = Requested or Under Review)
- **Recently Resolved count:** Number of returns completed in the last 7 days
- **Recent Activity feed:** A simple chronological list (last 10 items) showing recent return events: "Return #1234 requested by john@example.com", "Return #1230 refund processed", etc. Each item links to the return detail page.

**What is explicitly NOT included (moved to P1/P2):**
- Charts or graphs (no bar charts, line charts, pie charts)
- Return rate calculations or trend analysis
- Revenue impact or financial metrics
- Top returned products list
- Return reason breakdown visualization
- Date range selectors for metrics
- Export functionality

**UI Notes:**
- Uses Polaris `Layout`, `Card`, and `List` components
- Metrics displayed as simple number cards (Polaris `Text` with variant="headingLg")
- Recent Activity displayed as a `ResourceList` with timestamps and links
- Single-page view, no tabs or filters on the dashboard itself

---

### 5.2 Return Requests List

**Purpose:** Allow merchants to view, filter, search, and manage all return requests from a single page.

**What is included:**

**Table Columns:**
- Return ID (auto-generated, e.g., "RET-001234")
- Order Name (Shopify order number, e.g., "#1234")
- Customer Name
- Customer Email
- Status (badge with color coding)
- Resolution Type (Refund / Store Credit / Pending)
- Requested Date
- Items Count (number of items in the return)

**Status Tabs (filter by status group):**
- **All** -- all return requests
- **Pending Review** -- status: Requested, Under Review
- **Approved** -- status: Approved (waiting for customer to ship)
- **In Transit** -- status: Shipped, In Transit
- **Completed** -- status: Refund Issued, Store Credit Issued, Completed
- **Rejected/Closed** -- status: Rejected, Closed

**Search:**
- Free-text search by order number, customer name, or customer email
- Search is server-side with debounced input (300ms delay)

**Sorting:**
- Default: newest first (by requested date, descending)
- Sortable columns: Requested Date, Order Name, Status

**Pagination:**
- Server-side pagination, 20 items per page
- Standard Polaris pagination controls (Previous / Next)

**What is explicitly NOT included (moved to P1/P2):**
- Bulk actions (bulk approve, bulk reject, bulk generate labels)
- Export to CSV
- Date range filter
- Product-level filtering
- Advanced filters (by resolution type, by return reason)
- Saved filter presets
- Inline actions (must click into detail to take action)

**UI Notes:**
- Uses Polaris `IndexTable` with sortable columns
- Status badges use Polaris `Badge` with appropriate tone (info, warning, success, critical)
- Tabs use Polaris `Tabs` component above the table
- Empty state shows illustration with "No return requests yet" message and link to portal setup

---

### 5.3 Request Detail Page

**Purpose:** The primary workspace for merchants to view all information about a return request and take action on it.

**What is included:**

**5.3.1 Return Information Card**
- Return ID and status badge
- Order information: Order Name (linked to Shopify order), order date, order total
- Customer information: name, email (linked to Shopify customer profile)
- Requested date, last updated date
- Resolution type selected by customer (Refund or Store Credit)
- Shipping method: "Ship it yourself" with merchant's return address displayed

**5.3.2 Return Items Card**
- List of items being returned, each showing:
  - Product image thumbnail
  - Product title and variant title
  - Quantity being returned (out of original quantity)
  - Unit price
  - Return reason (from predefined list)
  - Return reason detail (free-text comment from customer, if provided)
  - Customer-uploaded photos (clickable thumbnails that open in a modal/lightbox)

**5.3.3 Actions Available (based on current status)**

| Current Status | Available Actions |
|---------------|-------------------|
| **Requested** | Approve, Reject, Request More Info |
| **Under Review** | Approve, Reject |
| **Approved** | Mark as Shipped (if merchant confirms customer shipped), Process Refund, Issue Store Credit |
| **Shipped / In Transit** | Mark as Received |
| **Received** | Process Refund, Issue Store Credit |
| **Completed** | No actions (read-only) |
| **Rejected / Closed** | No actions (read-only) |

**Action: Approve**
- Changes status to "Approved"
- Optional: add a note visible to the merchant team only
- Triggers "Return Approved" email notification to customer (if enabled)
- If customer selected "Ship it yourself", the approval email includes the merchant's return shipping address

**Action: Reject**
- Opens a modal requiring the merchant to select a rejection reason (from predefined list: Outside return window, Item not eligible, Item condition not acceptable, Suspected fraud, Other)
- Optional: free-text explanation
- Changes status to "Rejected"
- Triggers "Return Rejected" email notification to customer (if enabled) with the rejection reason

**Action: Request More Info**
- Opens a modal with a text field for the merchant to type a message
- Changes status to "Under Review"
- Triggers "More Information Needed" email notification to customer (if enabled) with the merchant's message
- Note: In MVP, the customer must reply via email. There is no in-portal messaging system.

**Action: Process Refund**
- Opens a confirmation modal showing:
  - Refund amount (calculated from return items' unit prices * quantities)
  - Refund method: "Refund to original payment method"
  - Optional: Apply restocking fee (if enabled in settings, shows the percentage deduction)
  - Option to adjust refund amount (partial refund)
- On confirm: Calls Shopify Admin API to create a refund on the order
- Changes status to "Refund Issued" then "Completed"
- Triggers "Refund Processed" email notification to customer (if enabled)

**Action: Issue Store Credit**
- Opens a confirmation modal showing:
  - Store credit amount (same calculation as refund)
  - Delivery method: Shopify Gift Card created and emailed to customer
  - Optional: Apply restocking fee
  - Option to adjust amount
- On confirm: Calls Shopify Admin API to create a gift card, then emails the gift card code to the customer
- Changes status to "Store Credit Issued" then "Completed"
- Triggers "Store Credit Issued" email notification to customer (if enabled)

**5.3.4 Internal Notes**
- A simple text input where merchants can add internal notes (not visible to customer)
- Notes are appended to a chronological list with timestamp and author
- Notes are stored in Firestore as a subcollection or array on the return document

**5.3.5 Activity Timeline**
- A chronological log of all events related to this return:
  - "Return requested by customer" (timestamp)
  - "Return approved by merchant@email.com" (timestamp)
  - "Refund of $45.00 processed" (timestamp)
  - "Note added by merchant@email.com" (timestamp)
- Each entry shows the actor (system, merchant email) and timestamp
- Uses Firestore audit log collection with TTL (auto-delete after 1 year)

**What is explicitly NOT included (moved to P1/P2):**
- Exchange creation (no variant picker, no product browser, no price difference handling)
- Auto-generated shipping labels or QR codes
- Item condition inspection workflow (pass/fail with photos)
- Bulk actions across multiple returns
- In-portal messaging with customers (must use email)
- Restock inventory toggle (manual restock via Shopify admin)
- Print packing slip

**UI Notes:**
- Uses Polaris `Page` with breadcrumb back to Return Requests list
- Information organized in Polaris `Card` sections with `BlockStack`
- Actions displayed as primary and secondary buttons in the page header (Polaris `Page` `primaryAction` and `secondaryActions`)
- Activity timeline uses a custom component with vertical line and dot indicators
- Photos displayed as `Thumbnail` components in a horizontal row

---

### 5.4 Policy Settings

**Purpose:** Allow merchants to configure their return policy rules that determine eligibility and behavior.

**What is included:**

**5.4.1 Return Window**
- Setting: Number of days after order fulfillment that customers can request a return
- Input: Numeric field (default: 30 days)
- Validation: 1-365 days
- Display on portal: "Returns accepted within {X} days of delivery"

**5.4.2 Return Conditions**
- A multi-select list of conditions that items must meet to be eligible for return
- Default options (all checked by default):
  - Item must be unused
  - Item must be in original packaging
  - Item must have tags attached
- Merchants can add custom conditions (free-text, up to 10 custom conditions)
- These conditions are displayed to customers on the return portal before they submit

**5.4.3 Auto-Approve Toggle**
- A simple ON/OFF toggle (default: OFF)
- When ON, returns that meet ALL of the following basic conditions are automatically approved:
  - Within the return window
  - Item is not in the non-returnable list
  - Customer is not in the blocklist (simple email-based blocklist)
- When OFF, all returns go to "Requested" status and require manual merchant review
- Note: This is a simple on/off toggle with fixed conditions. It is NOT a rule builder. Merchants cannot customize which conditions trigger auto-approve beyond the built-in checks.

**What auto-approve explicitly does NOT include (moved to P1):**
- Custom IF/THEN rule builder
- Conditional logic based on order value, product tags, customer history, return reason
- Multiple auto-approve profiles or rules
- Auto-approve with different resolutions based on conditions
- A/B testing of auto-approve rules

**5.4.4 Non-Returnable Items**
- A product picker (using Shopify Resource Picker) that lets merchants select specific products or collections that cannot be returned
- Selected items are displayed as a list with product image, title, and a remove button
- When a customer tries to return a non-returnable item, the portal shows: "This item cannot be returned per store policy"

**5.4.5 Restocking Fee**
- Toggle: Enable/Disable restocking fee (default: OFF)
- When enabled: Percentage input (default: 15%, range: 1-50%)
- The restocking fee is automatically deducted from refund/store credit amounts
- Displayed to customers on the return portal: "A {X}% restocking fee applies to all returns"

**5.4.6 Return Reasons Management**
- A list of predefined return reasons that customers must choose from when submitting a return
- Default reasons (pre-populated, merchant can modify):
  - "Size too small"
  - "Size too large"
  - "Item damaged or defective"
  - "Item not as described"
  - "Changed my mind"
  - "Ordered wrong item"
  - "Better price found elsewhere"
  - "Other"
- Merchants can:
  - Add custom reasons (up to 20 total)
  - Remove or edit existing reasons
  - Reorder reasons (drag and drop)
  - Toggle "Require photo" per reason (e.g., require photo for "Item damaged or defective")
  - Enable/disable individual reasons
- Reasons are displayed as a dropdown in the customer portal

**5.4.7 Customer Blocklist**
- A simple text-based list where merchants can add customer emails to block from submitting returns
- Input: email address field with "Add" button
- Display: list of blocked emails with "Remove" button
- When a blocked customer tries to initiate a return, the portal shows a generic "Unable to process return. Please contact support."

**5.4.8 Return Shipping Address**
- The address where customers should ship returned items
- Fields: Address Line 1, Address Line 2, City, State/Province, ZIP/Postal Code, Country
- Default: Auto-populated from the Shopify store's primary address
- Merchants can override with a different return warehouse address
- This address is displayed to customers after their return is approved

**What is explicitly NOT included in Policy Settings (moved to P1/P2):**
- Per-product or per-collection return window overrides
- Per-product restocking fee overrides
- Rules engine or workflow builder
- Automatic policy import from Shopify store policies page
- Return reason analytics (most-selected reasons chart)
- Multi-warehouse return routing
- Conditional policies based on order value or customer segment

**UI Notes:**
- Uses Polaris `Page` with section navigation (anchor links or `Layout.AnnotatedSection`)
- Each setting group is in its own `Card` with clear heading and description
- Toggle settings use Polaris `Toggle` or `Checkbox`
- Product picker uses Shopify App Bridge `ResourcePicker`
- Return reasons list uses a sortable list with inline editing
- Settings are auto-saved on change with a toast confirmation ("Settings saved")

---

### 5.5 Notifications (Email Toggles)

**Purpose:** Allow merchants to control which email notifications are sent to customers during the return lifecycle.

**What is included:**

A simple list of notification types, each with an ON/OFF toggle:

| Notification Type | Default | Trigger |
|-------------------|---------|---------|
| **Return Requested** | ON | Customer submits a return request |
| **Return Approved** | ON | Merchant approves a return |
| **Return Rejected** | ON | Merchant rejects a return |
| **More Information Needed** | ON | Merchant requests additional info from customer |
| **Refund Processed** | ON | Merchant processes a refund |
| **Store Credit Issued** | ON | Merchant issues store credit |

**Email Content:**
- Each notification type has a fixed, pre-written email template
- Emails include: store name, return ID, order number, relevant details (refund amount, store credit code, rejection reason, etc.)
- Emails are sent from a system email address (e.g., noreply@avadamail.com) with the merchant's store name as the sender name
- All emails are plain text with minimal formatting (no rich HTML templates in MVP)

**What is explicitly NOT included (moved to P1/P2):**
- Email template editor (no WYSIWYG, no HTML editing)
- Email preview
- Custom email subject lines
- Custom sender email address
- Brand colors or logo in emails
- SMS notifications
- Notification history/log visible to merchants
- Test email sending
- Conditional notifications (e.g., different email for high-value returns)
- Multi-language email templates

**UI Notes:**
- Uses a simple Polaris `ResourceList` or `IndexTable` with one row per notification type
- Each row shows: notification name, description, and an ON/OFF toggle
- A single `Card` on the Notifications settings page
- No sub-pages or modals needed

---

### 5.6 Customer Portal (Storefront)

**Purpose:** Allow customers to initiate and track returns without contacting the merchant via email. This is a self-service experience embedded in the merchant's storefront via a Theme App Extension.

**Implementation:** Liquid block (Theme App Extension) that merchants add to a dedicated page in their Shopify theme. The portal is a multi-step form that communicates with the backend API.

---

#### 5.6.1 Step 1: Order Lookup

**What is included:**
- Two input fields: Order Number and Email Address
- A "Look Up Order" button
- Validation: both fields required; order number must match Shopify order name format
- On submit: API call to verify the order exists and the email matches the order's customer email
- Error states:
  - "Order not found. Please check your order number and email address."
  - "This order is not eligible for returns." (if the order is outside the return window or all items are non-returnable)
- Success: display the order details for item selection (Step 2)

**What is explicitly NOT included:**
- Customer account login (no Shopify customer account integration in MVP)
- Order history browsing (customer must know their order number)
- Multiple order lookup in one session

---

#### 5.6.2 Step 2: Select Items to Return

**What is included:**
- Display all eligible line items from the order (excluding non-returnable items and items already returned)
- Each item shows:
  - Product image
  - Product title and variant title
  - Price per unit
  - Original quantity ordered
  - Quantity selector for how many to return (1 to original quantity)
  - Checkbox to select the item for return
- At least one item must be selected to proceed
- Display a running subtotal of the return value

**What is explicitly NOT included:**
- Partial bundle returns
- Gift return mode (hiding prices)
- "Select all" button

---

#### 5.6.3 Step 3: Return Reason + Photos

**What is included:**
- For each selected item, display:
  - Return reason dropdown (populated from merchant's configured return reasons)
  - Optional free-text detail field ("Tell us more about why you're returning this item", max 500 characters)
  - Photo upload (if the selected return reason has "Require photo" enabled):
    - Upload up to 3 photos per item
    - Accepted formats: JPG, PNG, WEBP
    - Max file size: 10MB per photo
    - Photos stored in Cloud Storage with TTL
- If photo is required by the reason but not uploaded, show validation error: "Please upload at least one photo for this return reason."

**What is explicitly NOT included:**
- Video upload
- Photo annotation or markup
- AI-based photo analysis

---

#### 5.6.4 Step 4: Choose Resolution

**What is included:**
- Two resolution options displayed as selectable cards:
  - **Refund to Original Payment Method** -- "We'll refund {amount} to your original payment method. Processing takes 5-10 business days."
  - **Store Credit** -- "Receive {amount} in store credit instantly. Use it on your next purchase." (If store credit amount differs due to bonus, show the bonus amount -- but in MVP, no bonus credit is offered. The amounts are identical.)
- If restocking fee is enabled, both amounts reflect the deduction with a note: "A {X}% restocking fee of {$Y} has been applied."
- Customer must select one option to proceed

**What is explicitly NOT included:**
- Exchange option (no product browsing, no variant selection)
- Bonus credit for choosing store credit over refund (moved to P1)
- Split resolution (some items as refund, some as store credit)

---

#### 5.6.5 Step 5: Shipping Method

**What is included:**
- A single shipping option: **"Ship it yourself"**
  - Display the merchant's return shipping address (from Policy Settings)
  - Instructions: "Please ship your return to the address below. We recommend using a tracked shipping service."
  - Note: "You are responsible for return shipping costs unless otherwise stated by the merchant."
- Customer does not need to enter any shipping information in MVP
- No tracking number input field in MVP (tracking is post-MVP)

**What is explicitly NOT included:**
- Auto-generated prepaid return labels
- QR codes for box-free drop-off
- Carrier selection
- Tracking number input
- Estimated delivery date
- Shipping cost calculator
- "Keep the item" / green returns option

---

#### 5.6.6 Step 6: Summary & Confirm

**What is included:**
- A summary page showing:
  - Items being returned (product name, quantity, reason)
  - Resolution selected (Refund or Store Credit)
  - Return amount (after restocking fee, if applicable)
  - Shipping method and return address
  - Return policy acknowledgment checkbox: "I confirm that the items meet the return conditions listed above."
- A "Submit Return Request" button
- On submit: create the return request in Firestore, trigger the "Return Requested" email notification
- Display a confirmation page with:
  - Return ID (e.g., "RET-001234")
  - Summary of what happens next
  - Merchant's return shipping address (repeated for convenience)
  - A link to the return status tracking page

---

#### 5.6.7 Return Status Tracking Page

**What is included:**
- A page accessible via a unique URL (e.g., `/apps/avada-returns/track?id=RET-001234&email=john@example.com`)
- Order lookup: same as Step 1 (order number + email), then shows all return requests for that order
- For each return request, display:
  - Return ID
  - Current status with a simple progress indicator (text-based, not a visual stepper in MVP):
    - "Submitted" / "Approved" / "Shipped" / "Received" / "Resolved"
  - Items being returned
  - Resolution type
  - Date of last status update
- If the return is completed: show resolution details ("Refund of $45.00 processed on April 10, 2026" or "Store credit of $45.00 issued -- check your email for the gift card code")

**What is explicitly NOT included:**
- Visual progress bar or stepper component (moved to P1 for polish)
- Real-time shipping tracking integration
- In-portal messaging with merchant
- Return modification or cancellation by customer
- Multiple return tracking in a single view

---

### 5.7 Quick-Start Onboarding

**Purpose:** Get merchants from install to their first return processed in under 10 minutes. This is a critical differentiator since onboarding complexity is the #1 churn risk identified in competitor analysis.

**What is included:**

A 3-step guided wizard that appears on first app launch:

**Step 1: Set Return Policy (2 minutes)**
- Return window: numeric input with default of 30 days
- Auto-approve: ON/OFF toggle with explanation
- Restocking fee: ON/OFF toggle with percentage input

**Step 2: Configure Return Reasons (2 minutes)**
- Display default return reasons list
- Merchant can accept defaults or customize
- Toggle "Require photo" per reason

**Step 3: Set Return Address + Activate Portal (2 minutes)**
- Return shipping address (pre-populated from Shopify store address)
- Instructions to add the Theme App Extension block to their storefront
- A "Complete Setup" button that saves all settings and marks onboarding as done

After wizard completion:
- Redirect to dashboard with a success banner: "You're all set! Your return portal is live."
- Show a link to the customer portal for the merchant to test

**What is explicitly NOT included:**
- Auto-import from Shopify store policies page
- Carrier account connection
- Email template customization
- Branding configuration
- Product picker for non-returnable items (can be configured later in Settings)

---

## 6. Post-MVP Features (P1, P2 Phases)

### P1 Features (4 weeks after MVP launch)

These features were cut from MVP to accelerate time-to-market but represent the next wave of value:

| Feature | Description | Why P1 |
|---------|-------------|--------|
| **Exchange Flow** | Variant exchange (same product, different size/color), cross-product exchange, price difference handling, bonus credit for choosing exchange | Highest revenue retention feature. Complex to build correctly. Requires careful Shopify API integration for creating exchange orders. |
| **Automation Rules** | Custom IF/THEN rule builder: auto-approve based on order value, product tags, customer history, return reason. Multiple rule profiles. | Merchants need this as return volume grows. Requires UI complexity (rule builder) that would delay MVP. |
| **Analytics Dashboard** | Return volume charts over time, return reason breakdown pie chart, top returned products table, resolution distribution, financial impact (total refunded vs. store credit issued) | Important for retention and upsell but not required for core return processing. |
| **Portal Branding** | Logo upload, color picker (primary, secondary, background), custom CSS injection, live preview | Makes the portal look professional but default styling is acceptable for launch. |
| **Prepaid Return Labels** | Integration with EasyPost or Shippo API for auto-generating prepaid return shipping labels (USPS, FedEx, UPS). Label PDF download and email to customer. | Requires third-party API integration, carrier account management, and cost-per-label economics. "Ship it yourself" is functional for MVP. |
| **Email Template Editor** | WYSIWYG editor for notification emails, custom subject lines, brand colors, logo, preview functionality | Fixed templates work for MVP. Customization improves brand consistency. |
| **QR Code Returns** | Generate QR codes for box-free drop-off at carrier locations | Requires carrier partnerships and QR code generation. |
| **SMS Notifications** | Return status updates via SMS using Twilio | Additional channel, not critical for core flow. |
| **Green Returns (Keep the Item)** | Allow customers to keep low-value items instead of shipping back, configurable threshold | Reduces reverse logistics costs but requires policy configuration. |
| **Visual Status Tracker** | Customer-facing visual progress stepper with icons and animations | Polish feature for the status tracking page. |
| **Customer Blocklist Enhancement** | Block by customer ID (not just email), block history, automatic fraud scoring | Enhances the basic email blocklist from MVP. |
| **Multi-Language Portal** | Support multiple languages for international customers (starting with 5 languages) | Important for international merchants but not blocking for English-first launch. |

### P2 Features (8+ weeks after MVP launch)

| Feature | Description |
|---------|-------------|
| **Instant Exchange** | Ship replacement before receiving return; hold card for security deposit. Only Loop offers this at $340/mo. |
| **Shop Now Exchange Flow** | Redirect customer to browse full store catalog during return, apply return credit toward any product. |
| **Return Fraud Detection** | Flag suspicious returns based on serial returner patterns, bracketing behavior, and policy abuse. Blocklists and automatic alerts. |
| **Product-Level Return Analytics** | Return rate per product/variant, return reason analysis per SKU, actionable insights ("Size M of Product X has been returned 47 times for 'too small'"). |
| **Shopify Flow Integration** | Trigger Shopify Flow automations from return events (return created, approved, completed). |
| **Helpdesk Integrations** | Native integration with Gorgias, Zendesk, Freshdesk for unified customer service. |
| **Multi-Warehouse Routing** | Route returns to nearest warehouse based on customer location. |
| **Cross-Border Returns** | International label generation, customs documentation, multi-currency refund calculations. |
| **API Access** | REST API for custom integrations with ERP, 3PL, and other systems. |
| **Gift Returns** | Allow gift recipients to return items without revealing the original price. |
| **White-Label Portal** | Remove all Avada branding from the return portal. |
| **AI Return Prevention** | Predict likely returns before they happen, suggest size guide improvements, flag bracketing orders. |
| **Bulk Return Processing** | Process multiple returns simultaneously (bulk approve, bulk refund). |

---

## 7. Pricing Strategy

Based on extensive competitor pricing analysis (see 06-competitor-pricing.md), Avada will launch with a four-tier pricing model designed to capture the massive gap between "free but useless" and "powerful but unaffordable":

| Plan | Monthly Price | Returns/Month | Key Features |
|------|-------------|--------------|--------------|
| **Free** | $0 | 5 | Self-service portal, manual approve/reject, refund processing, store credit, basic email notifications, return reasons, return status tracking |
| **Basic** | $9.99/mo | 100 | All Free + auto-approve toggle, restocking fee, customer blocklist, non-returnable items picker, all notification types, $0.25/extra return |
| **Pro** | $29.99/mo | 500 | All Basic + exchange flow, analytics dashboard, automation rules, portal branding, prepaid labels, multi-language (5), $0.50/extra return |
| **Enterprise** | $99.99/mo | Unlimited | All Pro + instant exchange, Shop Now flow, fraud detection, product-level analytics, API access, white-label, helpdesk integrations, dedicated support, $0.75/extra return (up to plan limit, then contact sales) |

**Important Note:** MVP launch will only include features available on the Free and Basic plans. Pro and Enterprise feature sets will become available as P1/P2 features are shipped.

### Why This Pricing Wins

1. **Free tier is functional, not crippled.** 5 returns/month with self-service portal, refund processing, and store credit is enough for stores with fewer than 50 orders/month to validate the app. This is comparable to Return Prime's 5 free returns but with more features included (store credit, status tracking).

2. **Basic at $9.99 removes friction.** Under $10/month is an impulse purchase for Shopify merchants. No approval needed from business partners or CFOs. Compared to Return Prime Grow ($19.99 for 60 returns), Avada Basic offers 100 returns at half the price.

3. **Pro at $29.99 is the hero plan.** Once P1 features are shipped, this plan will include exchange flow, analytics, automation, and branding -- features that competitors charge $147-$340/month for.

4. **Enterprise at $99.99 captures mid-market switchers.** Merchants paying $155-$340/month for Loop or $297/month for ReturnGO Pro can get equivalent features at a fraction of the cost.

5. **Transparent billing.** No hidden fees, no seat-based charges, no surprise overages beyond the clearly stated per-return cost. Easy cancellation with one click.

### Competitive Price Comparison

| Feature Comparison | Avada (Free) | AfterShip (Free) | Return Prime (Free) | EcoReturns (Free) |
|-------------------|-------------|------------------|--------------------|--------------------|
| Returns/month | 5 | Shopper-funded | 5 | 20 |
| Self-service portal | Yes | Yes | Yes | Yes |
| Refund processing | Yes | Yes | Yes | Yes |
| Store credit | Yes | No (requires $59/mo Pro) | No (requires $19.99 Grow) | No (requires $29/mo) |
| Return tracking | Yes | No | No | No |
| Email notifications | Basic (2 types) | Basic | Yes | Yes |

| Feature Comparison | Avada Basic ($9.99) | AfterShip Essentials ($11) | Return Prime Grow ($19.99) | ReturnGO Starter ($23) |
|-------------------|-------|-------|-------|-------|
| Returns/month | 100 | 20 | 60 | 20 |
| Auto-approve | Yes | No | No | Yes |
| Restocking fee | Yes | No | No | Yes |
| Customer blocklist | Yes | No | No | No |
| Non-returnable items | Yes | Basic | Basic | Yes |

---

## 8. Success Metrics & KPIs

### Launch Phase (Weeks 1-4)

| KPI | Target | Measurement |
|-----|--------|-------------|
| Total installs | 500+ | Shopify Partner Dashboard |
| App Store rating | 4.8+ (from beta reviewers) | Shopify App Store |
| Onboarding completion rate | >70% of installs complete the quick-start wizard | Firestore event tracking |
| First return processed within 7 days of install | >40% of merchants who complete onboarding | Firestore query |
| Uninstall rate (7-day) | <30% | Shopify Partner Dashboard |
| Support tickets per install | <0.3 | Support system |
| Average setup time | <10 minutes | Firestore timestamp tracking (install to onboarding complete) |

### Growth Phase (Weeks 5-12)

| KPI | Target | Measurement |
|-----|--------|-------------|
| Monthly new installs | 300-500 | Shopify Partner Dashboard |
| Free-to-paid conversion rate | >10% | Billing records |
| Monthly paid churn | <6% | Billing records |
| App Store listing conversion (view to install) | >25% | Shopify Partner Dashboard |
| Average returns processed per merchant per month | >5 (shows app is being actively used) | Firestore aggregation |
| Total returns processed across all merchants | 2,000+ per month by week 12 | Firestore aggregation |
| NPS score | >40 | In-app survey after 30 days |

### Scale Phase (Months 4-12)

| KPI | Target | Measurement |
|-----|--------|-------------|
| Total installs | 5,000-8,000 | Shopify Partner Dashboard |
| Paying customers | 500-800 | Billing records |
| MRR | $8,000-$15,000 | Billing records |
| App Store reviews | 100+ with 4.8+ average | Shopify App Store |
| Store credit adoption rate | >30% of resolved returns use store credit | Firestore aggregation |
| Exchange adoption rate (after P1 launch) | >20% of returns become exchanges | Firestore aggregation |

### North Star Metric

**Returns resolved per month across all merchants.** This single metric captures product adoption (more merchants), engagement (more returns processed per merchant), and the core value delivered (returns being resolved efficiently rather than handled manually).

---

## 9. Competitive Positioning

### Market Landscape

The Shopify Returns & Exchanges category has 122+ apps with the following competitive hierarchy:

| Tier | Apps | Characteristics |
|------|------|----------------|
| **Premium** ($150+/mo) | Loop Returns, ReturnGO Pro | Feature-rich but prohibitively expensive for 90% of merchants |
| **Mid-Range** ($20-$60/mo) | AfterShip Pro, Return Prime Grow, ReturnGO Starter | Decent features but still gate core capabilities (store credit, exchanges) behind paid walls |
| **Budget** ($0-$15/mo) | AfterShip Free, Return Prime Free, EcoReturns Free, ParcelWILL Free | Extremely limited free tiers (3-6 returns) that serve as acquisition funnels, not usable tools |
| **Disruptive** | Redo (free returns, subsidized model) | Unsustainable free model that raises long-term trust concerns |

### Avada's Positioning: "The Returns App That Actually Works on a Free Plan"

Avada enters the market in the **Budget tier with Mid-Range capabilities** -- offering genuinely usable return management on the free plan (5 returns with store credit and tracking) while providing mid-range features on the $9.99 plan (auto-approve, 100 returns, restocking fees).

### How Avada Beats Each Major Competitor

**vs. AfterShip Returns (market leader by review count, 1,248 reviews):**
- AfterShip's "free" plan is shopper-funded (customers pay for return shipping). Avada's free plan is genuinely free.
- AfterShip gates store credit behind Pro at $59/mo. Avada includes it on Free.
- AfterShip has chronic billing transparency issues. Avada commits to transparent, no-surprise pricing.
- AfterShip's Essentials ($11/mo) gives 20 returns. Avada Basic ($9.99) gives 100 returns.

**vs. Loop Returns (most feature-rich, $155-$340/mo):**
- Loop abandoned the SMB segment by removing their $29/mo plan. Avada specifically targets SMBs.
- Loop requires multi-week onboarding with sales calls. Avada offers a 10-minute self-service wizard.
- Loop has cancellation difficulties and auto-renewal traps. Avada offers one-click cancellation.
- Post-MVP, Avada will offer instant exchange at $29.99/mo vs. Loop's $340/mo.

**vs. Return Prime (closest direct competitor, $0-$150/mo):**
- Return Prime's free plan: 5 returns, no store credit, no auto-approve. Avada Free: 5 returns with store credit and tracking.
- Return Prime charges $19.99 for basic automation. Avada charges $9.99 for auto-approve with 100 returns.
- Return Prime has persistent bug reports during peak seasons. Avada builds on Firebase/GCP for reliable scaling.
- Return Prime has support reliability issues. Avada prioritizes responsive support as a differentiator.

**vs. ReturnGO (highest rated, 4.9 stars, no free plan):**
- ReturnGO has no free plan at all -- 14-day trial only. Avada offers a permanent free tier.
- ReturnGO charges $1.25 per extra return. Avada charges $0.25 per extra return on Basic.
- ReturnGO's Starter ($23/mo) gives only 20 returns. Avada Basic ($9.99) gives 100 returns.

**vs. Redo (free returns, disruptive model):**
- Redo's "free" model is subsidized, raising sustainability concerns. Avada's pricing is self-sustaining.
- Redo is a multi-product platform (returns + marketing + fulfillment). Avada is specialized in returns, offering deeper features.
- Redo has reported backend calculation issues and slow support. Avada focuses on accurate calculations and responsive support.

### Positioning Statement

**For Shopify merchants who process returns** and are frustrated with either the limitations of Shopify's native returns or the high cost of dedicated return apps, **Avada Return & Exchange** provides a self-service return portal and admin management dashboard **that works out of the box on a free plan** with store credit, return tracking, and transparent pricing. **Unlike** AfterShip, Loop, and Return Prime, **Avada** offers 5x-50x more free returns than competitors, includes store credit on the free plan (competitors charge $20-$60/month for this), and sets up in under 10 minutes without sales calls or week-long onboarding.

---

## 10. Risks & Mitigations

### Risk 1: Shopify Native Returns Improvement

| Dimension | Assessment |
|-----------|-----------|
| **Risk** | Shopify continues improving its built-in returns system, reducing need for third-party apps |
| **Probability** | Medium (30%) |
| **Impact** | High -- could eliminate the Free/Dev segment entirely |
| **Mitigation** | Focus on features Shopify is unlikely to build natively: exchange flows, advanced analytics, fraud detection, customizable portal, integrations. Shopify historically builds basic platform features and leaves advanced capabilities to the app ecosystem. Monitor Shopify Editions announcements closely. |

### Risk 2: Competitor Pricing War

| Dimension | Assessment |
|-----------|-----------|
| **Risk** | AfterShip, ReturnGO, or Return Prime aggressively cuts pricing to match Avada's positioning |
| **Probability** | Medium (40%) |
| **Impact** | Medium -- erodes pricing advantage but not feature/UX advantage |
| **Mitigation** | Move fast on P1 differentiated features (exchange flow, analytics, branding). Build switching costs through data and workflow integration depth. Maintain cost efficiency through automation. Note: AfterShip and Return Prime already have aggressive pricing; the main risk is from ReturnGO or a new entrant. |

### Risk 3: MVP Scope Too Thin for Retention

| Dimension | Assessment |
|-----------|-----------|
| **Risk** | The lean MVP without exchange, analytics, or labels may not provide enough value to retain merchants beyond the trial period |
| **Probability** | Medium-High (50%) |
| **Impact** | High -- high churn in first months would kill momentum |
| **Mitigation** | The MVP scope is deliberately lean to ship fast. P1 features are planned for 4 weeks after MVP launch. Key retention hooks in MVP: store credit (immediate revenue retention value), auto-approve (saves time), and a clean self-service portal (eliminates email back-and-forth). Communicate the P1 roadmap transparently to early adopters ("exchange flow coming in May"). |

### Risk 4: Shipping Label Absence Reduces Perceived Value

| Dimension | Assessment |
|-----------|-----------|
| **Risk** | "Ship it yourself" as the only shipping option may feel incomplete compared to competitors that offer prepaid labels |
| **Probability** | Medium (40%) |
| **Impact** | Medium -- some merchants may choose competitors with label generation |
| **Mitigation** | Position "Ship it yourself" as the default for MVP, clearly communicating that prepaid labels are coming in P1. Many small merchants already handle return shipping this way. Prioritize label integration as the first P1 feature to ship. |

### Risk 5: Support Cost Scaling with Free Tier

| Dimension | Assessment |
|-----------|-----------|
| **Risk** | Free users generate support tickets without contributing revenue |
| **Probability** | High (60%) |
| **Impact** | Medium -- erodes margins |
| **Mitigation** | Self-service onboarding (quick-start wizard), in-app help tooltips, comprehensive help center. Design free tier to be genuinely self-serve. Limit live chat/email support to paid plans. Show in-app upgrade prompts when free users hit limits. |

### Risk 6: Exchange Feature Technical Complexity (P1)

| Dimension | Assessment |
|-----------|-----------|
| **Risk** | Instant exchange and cross-product exchange involve complex order/payment/inventory interactions with Shopify API |
| **Probability** | Medium-High (50%) |
| **Impact** | Medium -- delays P1 delivery timeline |
| **Mitigation** | Begin Shopify API research during MVP development. Study competitors' exchange implementations. Build exchange features incrementally: variant exchange first, then cross-product, then instant exchange. Budget 6 weeks for exchange instead of 4. |

### Risk Summary Matrix

| Risk | Probability | Impact | Rating | Priority Action |
|------|-----------|--------|--------|----------------|
| Shopify native improvement | Medium | High | HIGH | Monitor Shopify Editions |
| Competitor pricing war | Medium | Medium | MEDIUM | Ship P1 fast |
| MVP too thin for retention | Medium-High | High | HIGH | Clear P1 roadmap, fast iteration |
| No shipping labels | Medium | Medium | MEDIUM | Labels as first P1 feature |
| Support cost scaling | High | Medium | MEDIUM | Self-serve design |
| Exchange complexity | Medium-High | Medium | MEDIUM | Begin research during MVP |

---

## 11. Technical Architecture Summary

Full technical diagrams are available in `08-diagrams.md`. Below is a summary of the MVP architecture:

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React + Shopify Polaris v12+ (Embedded Admin App) |
| **Customer Portal** | Theme App Extension (Liquid blocks + vanilla JS) |
| **Backend** | Node.js, Firebase Cloud Functions |
| **Database** | Firestore (multi-tenant, scoped by shopId) |
| **File Storage** | Cloud Storage (return photos) |
| **Async Processing** | Cloud Tasks + Pub/Sub |
| **Email** | SendGrid or Mailgun (transactional emails) |
| **APIs** | Shopify GraphQL Admin API (primary), Shopify REST API (where needed) |

### Key Architecture Decisions for MVP

1. **Multi-tenant Firestore:** All data scoped by `shopId`. Every query must include `shopId` as the first filter. This is non-negotiable for data isolation.

2. **Webhook processing under 5 seconds:** Shopify webhooks (orders/create, orders/updated, refunds/create, app/uninstalled) are acknowledged immediately with 200 OK. Heavy processing is queued to Cloud Tasks/Pub/Sub for background execution.

3. **Handlers orchestrate, Services contain logic:** Backend follows strict separation of concerns. Handlers only orchestrate request/response flow. Business logic lives in Services. Repositories handle one Firestore collection each.

4. **Cloud Storage for photos:** Customer-uploaded return photos are stored in Cloud Storage with a TTL-based cleanup policy (delete after return is completed + 90 days).

5. **Firestore TTL for logs:** Audit logs auto-delete after 1 year. Notification logs auto-delete after 90 days. This controls storage costs at scale.

### Core Firestore Collections (MVP)

| Collection | Purpose | Key Fields |
|-----------|---------|------------|
| `shops` | Store settings, plan, branding | shopId, plan, settings, returnPolicy |
| `returnRequests` | Return request records | shopId, orderId, status, resolutionType |
| `returnItems` | Individual items in a return | returnId, shopId, productId, returnReason |
| `refunds` | Refund/store credit records | returnId, shopId, type, amount, status |
| `notifications` | Email notification log | shopId, returnId, event, status, TTL |
| `auditLogs` | Activity timeline entries | shopId, returnId, action, performedBy, TTL |

### API Endpoints (MVP)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/returns` | GET | List return requests (with filters, pagination) |
| `/api/returns/:id` | GET | Get return request detail |
| `/api/returns` | POST | Create return request (from customer portal) |
| `/api/returns/:id/approve` | POST | Approve a return request |
| `/api/returns/:id/reject` | POST | Reject a return request |
| `/api/returns/:id/refund` | POST | Process refund |
| `/api/returns/:id/store-credit` | POST | Issue store credit |
| `/api/returns/:id/notes` | POST | Add internal note |
| `/api/portal/lookup` | POST | Order lookup (customer portal) |
| `/api/portal/track` | GET | Return status tracking (customer portal) |
| `/api/settings` | GET/PUT | Get/update shop settings |
| `/api/settings/reasons` | GET/PUT | Get/update return reasons |
| `/api/settings/blocklist` | GET/POST/DELETE | Manage customer blocklist |
| `/webhooks/orders-create` | POST | Handle Shopify order webhook |
| `/webhooks/orders-updated` | POST | Handle Shopify order update webhook |
| `/webhooks/app-uninstalled` | POST | Handle app uninstall webhook |

---

## 12. Timeline

### MVP Phase: 4-6 Weeks

| Week | Focus | Deliverables |
|------|-------|-------------|
| **Week 1** | Foundation | Shopify app scaffold, Firestore schema, API architecture, webhook handlers, auth setup |
| **Week 2** | Backend Core | Return request CRUD, refund processing service, store credit service, policy service, notification service |
| **Week 3** | Admin Frontend | Dashboard, Return Requests list (IndexTable, tabs, search, pagination), Request Detail page (info cards, actions, timeline) |
| **Week 4** | Admin Frontend + Settings | Policy Settings page (all sections), Notification toggles, Quick-start wizard |
| **Week 5** | Customer Portal | Theme App Extension: order lookup, item selection, return reason + photos, resolution choice, shipping, summary & confirm, status tracking |
| **Week 6** | Polish & Launch | End-to-end testing, edge case handling, error states, App Store listing preparation, beta tester feedback incorporation, submission to Shopify App Store |

**Parallel tracks during Weeks 1-6:**
- App Store listing optimization (screenshots, description, keywords) -- see 07-aso-keywords.md
- Help center / knowledge base articles
- Beta tester recruitment from existing Avada user base

### P1 Phase: 4 Weeks After MVP Launch

| Week | Focus |
|------|-------|
| **Week 7-8** | Exchange flow (variant exchange, cross-product exchange, price difference handling) |
| **Week 9** | Analytics dashboard, automation rules (auto-approve rule builder) |
| **Week 10** | Portal branding, prepaid return labels (EasyPost/Shippo integration), email template editor |

### P2 Phase: 4-8 Weeks After P1

| Week | Focus |
|------|-------|
| **Week 11-12** | Instant exchange, Shop Now flow, bonus credit |
| **Week 13-14** | Fraud detection, product-level analytics, Shopify Flow integration |
| **Week 15-18** | SMS notifications, QR code returns, multi-language, helpdesk integrations, API access |

### Key Milestones

| Milestone | Target Date | Success Criteria |
|-----------|------------|-----------------|
| MVP code complete | Week 5 | All MVP features working in staging |
| Beta testing complete | Week 6 | 10-20 beta testers have processed real returns |
| App Store submission | End of Week 6 | Listing submitted with optimized screenshots and description |
| App Store approval | Week 7-8 | App approved and publicly available |
| 500 installs | Week 10 | Organic + cross-promotion from Avada ecosystem |
| P1 features shipped | Week 10-11 | Exchange flow, analytics, automation live |
| 100 App Store reviews | Week 16 | 4.8+ average rating |
| First $10K MRR | Week 20 | ~600 paying merchants |

---

## 13. Go-to-Market Strategy

### Pre-Launch (Weeks 4-6, During Final MVP Development)

| Activity | Goal |
|----------|------|
| Create landing page at avada.io/returns | SEO groundwork, email list collection |
| Publish 3-5 comparison blog posts ("Best Free Returns Apps 2026", "Avada vs AfterShip", "Avada vs Loop") | SEO content, brand awareness, target comparison keywords |
| Recruit 20-30 beta testers from existing Avada app user base | Real-world feedback before public launch |
| Prepare App Store listing (screenshots, demo video, optimized description) | Polished listing ready for launch day |
| Prepare beta testers to post reviews on launch day (staggered) | 15-25 reviews in first week |

### Launch Week

| Day | Activity | Goal |
|-----|----------|------|
| Day 1 | Submit to Shopify App Store | Go live |
| Day 1 | Email blast to existing Avada user base | 300-500 installs in first week |
| Day 1-3 | Beta tester reviews posted (staggered) | 15-25 reviews with 5.0 rating |
| Day 2 | Publish launch blog post | SEO, social proof |
| Day 3 | Post in Shopify Community forums (answering return-related questions) | Community awareness |
| Day 5 | Social media campaign | Brand awareness |

### Post-Launch Growth (Weeks 1-12)

**Channel 1: Shopify App Store Organic (Primary)**
- Optimized title: "Avada Return & Exchange"
- Optimized subtitle: "Automate returns, exchanges & refunds. 50 free returns/mo"
- Target keywords: returns, exchange, refund, return label, store credit, return portal, return automation
- Install velocity from Avada ecosystem cross-promotion drives ranking improvement
- Target: top 15 category ranking by month 3

**Channel 2: Content Marketing**
- Weekly blog posts targeting long-tail keywords:
  - "How to Set Up Returns on Shopify in 10 Minutes"
  - "5 Ways to Reduce Refunds with Store Credit"
  - "Best Free Returns Apps for Shopify in 2026"
  - "How to Create a Return Policy for Your Shopify Store"
- Comparison landing pages: vs. AfterShip, vs. Loop, vs. Return Prime, vs. ReturnGO
- Case studies from early adopters showing time saved and revenue retained

**Channel 3: Cross-Promotion from Avada Ecosystem**
- In-app banners in existing Avada apps (email marketing, SEO, reviews)
- Cross-sell recommendation in Avada's app ecosystem navigation
- Target: 200-400 installs/week from ecosystem

**Channel 4: Community Engagement**
- Active participation in Shopify Community forums (answering returns-related questions)
- Presence in e-commerce Facebook groups and Reddit communities (r/shopify, r/ecommerce)
- Share helpful content, not direct promotion

**Channel 5: Partner & Agency Referrals (Month 3+)**
- Build relationships with Shopify agencies for referrals
- Create partner resources (comparison sheets, onboarding guides)
- Target: Shopify Plus partner directory listing (once enterprise features are ready)

### App Store Ranking Targets

| Timeframe | Category Rank Target | Review Target | Rating Target |
|-----------|---------------------|---------------|---------------|
| Month 1 | Top 30 | 40-60 | 4.9+ |
| Month 3 | Top 15 | 120-150 | 4.8+ |
| Month 6 | Top 10 | 250-300 | 4.8+ |
| Month 12 | Top 5 | 500+ | 4.8+ |

### Review Strategy

- **In-app review prompt:** After a merchant successfully processes their 10th return, prompt for a review with a direct link to Shopify App Store
- **Onboarding follow-up:** Send a personal email 7 days after install asking about experience
- **Feature milestone prompts:** When a merchant first uses store credit, celebrate the moment and invite review
- **Support-to-review pipeline:** After resolving a support ticket, ask satisfied merchants to share their experience
- **Respond to every review within 24 hours:** For negative reviews, acknowledge and fix publicly. For positive reviews, thank and highlight the feature they mentioned.

### Messaging by Audience

| Audience | Primary Message | Secondary Message |
|----------|----------------|-------------------|
| **Free/Dev merchants** | "Handle returns without the email chaos. Free forever." | "Set up in 10 minutes. No credit card required." |
| **SMB merchants (Basic plan target)** | "100 returns/month for $9.99. Auto-approve saves you hours." | "Store credit keeps revenue in your store." |
| **Merchants on competitor free plans** | "Still limited to 5 returns/month? Avada gives you 100 for $9.99." | "Switch in minutes. No data migration needed." |
| **Merchants frustrated with competitors** | "Transparent pricing. No surprise charges. Cancel anytime." | "Real human support that responds when you need it." |

---

## Appendix A: Glossary

| Term | Definition |
|------|-----------|
| **Return Request** | A customer's formal request to return one or more items from an order |
| **Resolution** | The outcome of a return: refund to original payment, store credit (gift card), or exchange (P1) |
| **Auto-Approve** | Automatic approval of return requests that meet all configured policy conditions |
| **Store Credit** | A Shopify gift card issued to the customer as an alternative to a payment method refund |
| **Restocking Fee** | A percentage deducted from the refund/credit amount to cover the merchant's cost of processing the return |
| **Non-Returnable** | Products or collections marked by the merchant as ineligible for returns |
| **Return Window** | The number of days after order fulfillment during which a customer can request a return |
| **Theme App Extension** | A Shopify extension mechanism that allows apps to inject content into a merchant's storefront theme |
| **Green Returns** | A policy allowing customers to keep low-value items instead of shipping them back (P1) |
| **Instant Exchange** | Shipping a replacement item before receiving the original return (P2) |

## Appendix B: Referenced Research Documents

| Document | Content |
|----------|---------|
| `01-market-pain-points.md` | Market size, return rates, merchant pain points with real quotes |
| `02-feature-matrix.md` | Complete feature list with competitive comparison |
| `03-target-audience.md` | Detailed personas, segment sizing, acquisition strategy |
| `04-opportunity-scoring.md` | Feature scoring, go/no-go assessment, financial projections |
| `05-competitor-analysis.md` | Detailed profiles of 11 competitors with strengths/weaknesses |
| `06-competitor-pricing.md` | Pricing tiers, feature-per-tier comparison, gap analysis |
| `07-aso-keywords.md` | App Store optimization strategy, keyword research |
| `08-diagrams.md` | System architecture, state machine, ER diagram, flow diagrams |
