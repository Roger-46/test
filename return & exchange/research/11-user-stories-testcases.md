# 11 - User Stories & Test Cases: Avada Return & Exchange

## Overview

This document defines user stories with acceptance criteria and comprehensive test cases for every P0 and P1 feature. User stories follow the Given/When/Then format. Test cases cover happy path, edge cases, error handling, and performance scenarios.

**Roles referenced:**
- **Store Owner**: Shopify merchant who owns the store and configures the app
- **Fulfillment Manager**: Staff member responsible for receiving and processing returns
- **CS Agent**: Customer Service agent who reviews and resolves return requests
- **Team Member**: Any staff user with limited permissions
- **Customer**: End customer initiating a return via the storefront portal

**Source references:**
- Features and priorities: File 02 (Feature Matrix)
- User flows and state machine: File 08 (Diagrams - sections 2, 3, 4, 8)
- Opportunity scoring: File 04 (Opportunity Scoring)
- Pricing tiers: File 06 (Competitor Pricing)
- Target personas: File 03 (Target Audience - "Growing Greg" SMB Core, "Scaling Sophia" Mid-Market)

---

## Part 1: P0 User Stories & Test Cases

---

### P0-01: Self-Service Return Portal (Feature #1)

#### User Stories

**US-01.1: Customer looks up an order to initiate a return**
> As a **Customer**, I want to look up my order on the return portal so that I can start a return without contacting support.

**Acceptance Criteria:**
- Given I am on the return portal page
- When I enter my order number and email address
- Then the system validates my order and displays eligible items for return

**US-01.2: Customer views return eligibility per item**
> As a **Customer**, I want to see which items in my order are eligible for return so that I know what I can and cannot return.

**Acceptance Criteria:**
- Given I have looked up a valid order
- When the eligible items are displayed
- Then each item shows its return eligibility status (eligible, window expired, non-returnable) with a clear reason for ineligibility

**US-01.3: Store Owner embeds the return portal on their storefront**
> As a **Store Owner**, I want to embed the return portal on my storefront via theme extension so that customers can access it directly.

**Acceptance Criteria:**
- Given I have installed the Avada Return & Exchange app
- When I activate the theme app extension in my Shopify theme editor
- Then the return portal is accessible at a dedicated page on my storefront

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-01.01 | Valid order lookup | Happy path | Enter valid order # + matching email | Order items displayed with eligibility status |
| TC-01.02 | Invalid order number | Error | Enter non-existent order # | "Order not found" error message displayed |
| TC-01.03 | Email mismatch | Error | Enter valid order # with wrong email | "Order not found" error (no information leak) |
| TC-01.04 | Order with no eligible items | Edge case | Look up order outside return window | All items shown as "Return window expired" |
| TC-01.05 | Partially eligible order | Edge case | Look up order with mix of eligible and non-returnable items | Eligible items selectable; non-returnable items greyed out with reason |
| TC-01.06 | Order already fully returned | Edge case | Look up order where all items have been returned | Message: "All items from this order have already been returned" |
| TC-01.07 | Portal loads on mobile | Mobile | Access portal on mobile browser (iOS/Android) | Fully responsive layout, all elements accessible |
| TC-01.08 | Portal respects custom branding | Happy path | Access portal for store with custom branding configured | Logo, colors, fonts match store branding settings |
| TC-01.09 | Multi-language portal | Happy path | Access portal with browser language set to supported language | Portal text displayed in matching language |
| TC-01.10 | Rate limiting on lookup | Security | Submit 20+ order lookups in 1 minute | Rate limit triggered after threshold; user sees "Too many attempts" |
| TC-01.11 | SQL injection in order field | Security | Enter SQL injection string in order # field | Input sanitized; no database error exposed |
| TC-01.12 | XSS in email field | Security | Enter script tag in email field | Input sanitized; script not executed |
| TC-01.13 | Portal load time | Performance | Load portal page cold start | Page loads in < 2 seconds on 3G connection |
| TC-01.14 | Theme extension activation | Happy path | Enable theme extension in Shopify theme editor | Portal block appears in theme; accessible on storefront |
| TC-01.15 | Customer account login lookup | Happy path | Customer logs in and views their orders | List of orders displayed with return eligibility per order |

---

### P0-02: Return Request Management Dashboard (Feature #2)

#### User Stories

**US-02.1: CS Agent views all return requests**
> As a **CS Agent**, I want to see a list of all return requests with filters so that I can efficiently manage incoming returns.

**Acceptance Criteria:**
- Given I am logged into the Shopify admin app
- When I navigate to the return request list
- Then I see all return requests with columns: Return ID, Order #, Customer, Status, Resolution Type, Date, Total Value
- And I can filter by status, date range, customer, and product
- And I can search by order number or customer email

**US-02.2: CS Agent views return request details**
> As a **CS Agent**, I want to view the full details of a return request so that I can make informed approval decisions.

**Acceptance Criteria:**
- Given I am viewing the return request list
- When I click on a return request
- Then I see order info, returned items with reasons and photos, activity timeline, and available actions (approve, reject, request info, process refund, create exchange, generate label, mark received, add note)

**US-02.3: CS Agent performs bulk actions**
> As a **CS Agent**, I want to select multiple returns and perform bulk actions so that I can process high-volume returns efficiently.

**Acceptance Criteria:**
- Given I have selected multiple return requests via checkboxes
- When I choose a bulk action (approve, generate labels, export)
- Then the action is applied to all selected returns with a progress indicator and summary

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-02.01 | List displays returns | Happy path | Navigate to return list | Returns displayed with correct columns, sorted by newest first |
| TC-02.02 | Filter by status | Happy path | Select "Under Review" status filter | Only returns with status "Under Review" shown |
| TC-02.03 | Search by order number | Happy path | Search for "#1234" | Returns matching order #1234 displayed |
| TC-02.04 | Search by customer email | Happy path | Search for "customer@email.com" | Returns from that customer displayed |
| TC-02.05 | Empty state - no returns | Edge case | New store with no return requests | Empty state with helpful message and CTA |
| TC-02.06 | Bulk approve 50 returns | Happy path | Select 50 returns, click "Approve All" | All 50 approved; success toast with count |
| TC-02.07 | Bulk approve with mixed eligibility | Edge case | Select returns where some cannot be approved | Eligible returns approved; skipped returns listed with reasons |
| TC-02.08 | Export returns to CSV | Happy path | Click "Export" with filters applied | CSV downloaded containing filtered return data |
| TC-02.09 | Pagination with 1000+ returns | Performance | Store with 1000+ returns loads list | First page loads in < 1s; pagination controls work; no browser hang |
| TC-02.10 | Real-time status update | Happy path | Another agent approves a return while viewing list | List updates without manual refresh |
| TC-02.11 | Detail view shows photos | Happy path | Click return with customer-uploaded photos | Photos displayed in gallery view; can zoom |
| TC-02.12 | Add internal note | Happy path | Add a note on a return detail | Note appears in timeline; visible to other agents |
| TC-02.13 | Return detail - activity timeline | Happy path | View return with multiple status changes | All events shown chronologically with timestamps and actors |

---

### P0-03: Configurable Return Policies (Feature #3)

#### User Stories

**US-03.1: Store Owner configures return window**
> As a **Store Owner**, I want to set a return window (e.g., 30 days from delivery) so that returns are only accepted within my policy timeframe.

**Acceptance Criteria:**
- Given I am on the Settings > Return Policies page
- When I set the return window to N days
- Then only orders within N days of delivery/fulfillment are eligible for return on the customer portal

**US-03.2: Store Owner marks products as non-returnable**
> As a **Store Owner**, I want to exclude specific products or collections from returns so that final-sale items cannot be returned.

**Acceptance Criteria:**
- Given I am configuring return policies
- When I add products by ID, tag, or collection to the non-returnable list
- Then those items are shown as "Non-returnable" on the return portal and cannot be selected

**US-03.3: Store Owner creates per-product rules**
> As a **Store Owner**, I want different return rules for different products so that I can have flexible policies (e.g., electronics: 15 days, clothing: 30 days).

**Acceptance Criteria:**
- Given I have created multiple return policy rules
- When a customer initiates a return
- Then the system applies the most specific matching rule for each item

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-03.01 | Set 30-day return window | Happy path | Set window to 30 days; customer returns on day 25 | Return eligible |
| TC-03.02 | Return outside window | Edge case | Set window to 30 days; customer returns on day 31 | Return ineligible; message: "Return window expired" |
| TC-03.03 | Return on exact boundary | Edge case | Set window to 30 days; customer returns on day 30 23:59 | Return eligible (inclusive of last day) |
| TC-03.04 | Non-returnable product tag | Happy path | Tag product as "final-sale"; customer tries to return | Item shown as non-returnable |
| TC-03.05 | Non-returnable collection | Happy path | Mark collection as non-returnable | All products in collection shown as non-returnable |
| TC-03.06 | Per-product policy override | Happy path | Electronics: 15 days, default: 30 days; return electronics on day 20 | Electronics item ineligible; other items eligible |
| TC-03.07 | Policy update propagation | Edge case | Change window from 30 to 14 days | New window applies to new returns; existing approved returns unaffected |
| TC-03.08 | Restocking fee configuration | Happy path | Enable 15% restocking fee | Fee shown to customer during return flow; reflected in refund amount |
| TC-03.09 | No policies configured | Edge case | New store with no custom policies | Default policy applied (30-day window, all items returnable) |
| TC-03.10 | Conflicting rules | Edge case | Product matches multiple rules | Most specific rule wins (product-level > tag-level > collection-level > default) |

---

### P0-04: Automated Return Approval (Feature #4)

#### User Stories

**US-04.1: System auto-approves qualifying returns**
> As a **Store Owner**, I want returns that match my rules to be automatically approved so that customers get instant resolution and my team saves time.

**Acceptance Criteria:**
- Given auto-approve is enabled with configured rules
- When a customer submits a return that matches all auto-approve criteria (within window, item is returnable, customer not blocklisted, no fraud flags, order value within threshold)
- Then the return is immediately approved without manual review
- And the customer receives an approval notification with next steps

**US-04.2: System routes non-qualifying returns to manual review**
> As a **CS Agent**, I want returns that do not match auto-approve rules to be routed to me for manual review so that edge cases are handled with human judgment.

**Acceptance Criteria:**
- Given a return does not match auto-approve criteria
- When the return is submitted
- Then it enters "Under Review" status and appears in the manual review queue

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-04.01 | Auto-approve standard return | Happy path | Submit return within window for returnable item | Return auto-approved; approval email sent |
| TC-04.02 | Auto-approve disabled | Edge case | Store has auto-approve disabled; submit return | Return goes to "Under Review" |
| TC-04.03 | Blocklisted customer | Edge case | Blocklisted customer submits return | Return goes to "Under Review" despite matching rules |
| TC-04.04 | High-value order threshold | Edge case | Auto-approve threshold $100; submit $200 return | Return goes to "Under Review" |
| TC-04.05 | Fraud-flagged return | Edge case | Customer with high fraud score submits return | Return goes to "Under Review" with fraud flag visible to agent |
| TC-04.06 | Multiple items - partial match | Edge case | Order with 3 items: 2 eligible for auto-approve, 1 requires review | Entire return goes to "Under Review" (conservative approach) |
| TC-04.07 | Auto-approve speed | Performance | Submit return that qualifies for auto-approve | Approval happens within 3 seconds of submission |
| TC-04.08 | Auto-approve with label generation | Happy path | Auto-approve enabled + auto-label generation | Return approved AND label generated automatically |

---

### P0-05: Refund Processing (Feature #5)

#### User Stories

**US-05.1: CS Agent processes refund to original payment**
> As a **CS Agent**, I want to issue a refund to the customer's original payment method so that the customer receives their money back.

**Acceptance Criteria:**
- Given a return has been approved and item received
- When I select "Refund to original payment" and confirm
- Then a refund is created via Shopify Admin API
- And the return status updates to "Completed"
- And the customer receives a refund confirmation email

**US-05.2: CS Agent processes partial refund**
> As a **CS Agent**, I want to issue a partial refund (e.g., minus restocking fee) so that I can enforce store policy on item condition.

**Acceptance Criteria:**
- Given a return item failed inspection or has restocking fee
- When I adjust the refund amount and process
- Then the adjusted amount is refunded
- And the reason for adjustment is logged in the audit trail

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-05.01 | Full refund to original payment | Happy path | Process full refund for $50 item | Shopify refund created for $50; customer notified |
| TC-05.02 | Partial refund with restocking fee | Happy path | Process refund with 15% restocking fee on $100 item | $85 refunded; $15 fee noted |
| TC-05.03 | Refund for multi-item return | Happy path | Return 3 items totaling $150 | Single refund for $150 processed |
| TC-05.04 | Refund fails - payment method expired | Error | Original payment method no longer valid | Error displayed; suggest store credit as alternative |
| TC-05.05 | Duplicate refund prevention | Edge case | Attempt to refund an already-refunded return | System blocks with "Refund already processed" |
| TC-05.06 | Refund exceeds order total | Edge case | Attempt refund greater than order value | System blocks with validation error |
| TC-05.07 | Currency handling | Edge case | Process refund for order in EUR | Refund processed in same currency as original order |
| TC-05.08 | Shopify API timeout during refund | Error | Shopify API times out | Retry with exponential backoff; log failure; notify agent |
| TC-05.09 | Refund processing time | Performance | Process refund | Refund initiated within 5 seconds; Shopify processes asynchronously |

---

### P0-06: Store Credit / Gift Card Refunds (Feature #6)

#### User Stories

**US-06.1: Customer chooses store credit**
> As a **Customer**, I want to receive store credit instead of a refund so that I can shop again at the store.

**Acceptance Criteria:**
- Given I am choosing a resolution for my return
- When I select "Store Credit"
- Then I understand I will receive a gift card/store credit for the return value
- And if the store offers a bonus, I see the incentive (e.g., "+$5 bonus for choosing store credit")

**US-06.2: System issues store credit as Shopify gift card**
> As a **Store Owner**, I want store credits issued as Shopify gift cards so that the credit integrates with my checkout natively.

**Acceptance Criteria:**
- Given a return is resolved with store credit
- When the system processes the store credit
- Then a Shopify gift card is created with the correct amount
- And the customer receives the gift card code via email

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-06.01 | Issue store credit | Happy path | Customer selects store credit for $50 return | Shopify gift card created for $50; code emailed |
| TC-06.02 | Store credit with bonus | Happy path | Store offers $5 bonus; customer selects store credit for $50 | Gift card created for $55 |
| TC-06.03 | Store credit tracking in Firestore | Happy path | Issue store credit | STORE_CREDITS document created with correct source, amount, returnId |
| TC-06.04 | Gift card creation fails | Error | Shopify gift card API fails | Retry; log error; notify agent for manual resolution |
| TC-06.05 | Store credit for exchange downsell | Edge case | Customer exchanges $50 item for $30 item | $20 store credit issued for difference |
| TC-06.06 | Multiple store credits for same customer | Edge case | Same customer gets store credit from 2 returns | Two separate gift cards issued; both tracked in STORE_CREDITS |
| TC-06.07 | Free plan includes store credit | Plan validation | Free plan merchant processes store credit | Feature works; not gated |

---

### P0-07: Return Reason Collection (Feature #7)

#### User Stories

**US-07.1: Customer selects return reason per item**
> As a **Customer**, I want to select a reason for returning each item so that the store understands why I am returning.

**Acceptance Criteria:**
- Given I am on the return reason selection step
- When I select a reason category (sizing, defective, not as described, changed mind, other)
- Then I can provide additional detail (sub-reason or free text)
- And if the policy requires photos for this reason, I am prompted to upload

**US-07.2: Store Owner customizes return reasons**
> As a **Store Owner**, I want to define custom return reasons with categories so that I collect data relevant to my products.

**Acceptance Criteria:**
- Given I am on the Settings > Return Reasons page
- When I add, edit, reorder, or deactivate return reasons
- Then the portal reflects my custom reasons in the configured order

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-07.01 | Select sizing reason | Happy path | Select "Too Small" with detail "Runs small at the waist" | Reason and detail saved to RETURN_ITEMS |
| TC-07.02 | Upload photos for defective item | Happy path | Select "Damaged/Defective"; upload 3 photos | Photos uploaded to Cloud Storage; URLs stored in RETURN_ITEMS.photoUrls |
| TC-07.03 | Photo upload exceeds limit | Edge case | Attempt to upload 6 photos (limit: 5) | Error: "Maximum 5 photos allowed" |
| TC-07.04 | Photo file too large | Edge case | Upload 15MB photo (limit: 10MB) | Error: "File too large. Maximum 10MB per photo" |
| TC-07.05 | Invalid file type | Edge case | Upload .exe file as "photo" | Error: "Only image files (JPG, PNG, HEIC) accepted" |
| TC-07.06 | Custom return reason | Happy path | Store Owner adds "Color different from photos" reason | New reason appears in portal dropdown |
| TC-07.07 | Reason required validation | Edge case | Try to proceed without selecting a reason | Validation: "Please select a return reason" |
| TC-07.08 | Return multiple items with different reasons | Happy path | Return 2 items with different reasons each | Each item has its own reason and detail saved |

---

### P0-08: Email Notifications (Feature #8)

#### User Stories

**US-08.1: Customer receives status update emails**
> As a **Customer**, I want to receive email notifications when my return status changes so that I stay informed without contacting support.

**Acceptance Criteria:**
- Given my return status has changed (approved, rejected, label created, item received, refund issued, exchange shipped)
- When the status change is processed
- Then I receive an email with clear next steps within 2 minutes

**US-08.2: Store Owner customizes email templates**
> As a **Store Owner**, I want to customize email notification templates so that they match my brand voice and design.

**Acceptance Criteria:**
- Given I am on Settings > Notification Templates
- When I edit a template (subject line, body, branding)
- Then future notifications use my customized template

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-08.01 | Approval notification sent | Happy path | Return approved (manual or auto) | Customer receives approval email within 2 minutes |
| TC-08.02 | Rejection notification with reason | Happy path | Return rejected with reason "Outside return window" | Email includes rejection reason and contact info |
| TC-08.03 | Label created notification | Happy path | Shipping label generated | Email contains label download link and instructions |
| TC-08.04 | Refund issued notification | Happy path | Refund processed | Email confirms refund amount and method |
| TC-08.05 | Email delivery failure | Error | Customer's email bounces | Failure logged; notification status set to "failed" |
| TC-08.06 | Custom template rendering | Happy path | Store Owner customizes approval email | Next approval uses custom template with store branding |
| TC-08.07 | Email contains return tracking link | Happy path | Label created for return | Email includes tracking URL |
| TC-08.08 | Notification TTL cleanup | Performance | Notifications older than 90 days | Auto-deleted by Firestore TTL (per NOTIFICATIONS schema) |
| TC-08.09 | Multi-language email | Edge case | Customer's locale is Spanish; store supports Spanish | Email sent in Spanish |

---

### P0-09: Return Shipping Labels (Feature #9)

#### User Stories

**US-09.1: System generates a prepaid return label**
> As a **Customer**, I want to receive a prepaid return shipping label so that I can ship my return easily.

**Acceptance Criteria:**
- Given my return has been approved
- When a label is generated (automatically or by CS Agent)
- Then I receive a downloadable PDF label via email
- And a tracking number is created and associated with my return

**US-09.2: CS Agent selects carrier for label**
> As a **CS Agent**, I want to choose which carrier to use for a return label so that I can optimize for cost or speed.

**Acceptance Criteria:**
- Given I am generating a label for an approved return
- When I select a carrier (USPS, FedEx, UPS, DHL)
- Then the label is generated via EasyPost/Shippo with the selected carrier

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-09.01 | Generate USPS label | Happy path | Select USPS; generate label | Label PDF created; tracking number assigned; SHIPPING_LABELS doc created |
| TC-09.02 | Generate FedEx label | Happy path | Select FedEx; generate label | Label generated with FedEx tracking |
| TC-09.03 | Invalid customer address | Error | Customer address is incomplete | Error: "Please verify the return address" |
| TC-09.04 | Carrier API unavailable | Error | EasyPost API returns 503 | Retry with backoff; show error to agent if retries exhausted |
| TC-09.05 | Bulk label generation | Happy path | Select 10 returns; generate labels | All 10 labels generated; progress indicator shown |
| TC-09.06 | Label expiry | Edge case | Label not used within 30 days | Label status set to "expired"; customer notified |
| TC-09.07 | Shipping cost recorded | Happy path | Generate label | SHIPPING_LABELS.shippingCost populated with actual carrier charge |
| TC-09.08 | Customer downloads label | Happy path | Customer clicks label link in email | PDF downloads successfully; correct label displayed |
| TC-09.09 | Label for international return | Edge case | Customer in UK, warehouse in US | International label generated with customs info (P2 scope; graceful message for now) |

---

### P0-10: Basic Variant Exchange (Feature #10)

#### User Stories

**US-10.1: Customer exchanges for different size/color**
> As a **Customer**, I want to exchange my item for a different size or color so that I get the right product without a separate purchase.

**Acceptance Criteria:**
- Given I am selecting a resolution for my return
- When I choose "Exchange" and select a different variant (size/color) of the same product
- Then the system checks inventory availability
- And displays the variant options with stock status
- And creates the exchange record upon submission

**US-10.2: System handles price difference in variant exchange**
> As a **Customer**, I want the price difference handled automatically if my exchange variant has a different price so that I am charged or credited correctly.

**Acceptance Criteria:**
- Given I am exchanging for a variant with a different price
- When the exchange is created
- Then the price difference is calculated and displayed
- And if the new variant costs more, I am charged the difference
- And if the new variant costs less, I receive store credit for the remainder

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-10.01 | Exchange same-price variant | Happy path | Exchange Size M for Size L (same price) | Exchange created; no additional charge |
| TC-10.02 | Exchange higher-price variant | Happy path | Exchange $40 variant for $50 variant | Customer charged $10 difference |
| TC-10.03 | Exchange lower-price variant | Happy path | Exchange $50 variant for $40 variant | $10 issued as store credit |
| TC-10.04 | Exchange variant out of stock | Edge case | Select variant with 0 inventory | Message: "This variant is out of stock"; suggest alternatives |
| TC-10.05 | Inventory reservation | Happy path | Select in-stock variant for exchange | Inventory reserved for 7 days (per EXCHANGES.reservedUntil) |
| TC-10.06 | Reservation expires | Edge case | Exchange not completed within 7 days | Inventory reservation released; exchange cancelled |
| TC-10.07 | Last item in stock reserved | Edge case | Select variant with qty=1; another customer tries to buy | Reserved item not available for purchase |
| TC-10.08 | Variant exchange on free plan | Plan validation | Free plan merchant uses variant exchange | Feature works; not gated behind paid plan |
| TC-10.09 | Exchange for product with only 1 variant | Edge case | Product has no other variants | "No other variants available for exchange" |

---

### P0-11: Return Tracking (Feature #11)

#### User Stories

**US-11.1: Customer tracks return shipment status**
> As a **Customer**, I want to track my return shipment so that I know when my item will be received.

**Acceptance Criteria:**
- Given I have shipped my return with a tracking number
- When I visit the return status page
- Then I see real-time tracking updates (shipped, in transit, delivered)
- And I see estimated delivery date

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-11.01 | Track active shipment | Happy path | Visit status page with active shipment | Current status, location, and ETA displayed |
| TC-11.02 | Tracking number not yet scanned | Edge case | Label generated but not yet dropped off | Status: "Awaiting carrier pickup" |
| TC-11.03 | Shipment delivered | Happy path | Carrier marks delivered | Status updates to "Delivered"; return status moves to "Item Received" |
| TC-11.04 | Tracking page loads without auth | Happy path | Access tracking via link in email (no login required) | Tracking info displayed for specific return only |
| TC-11.05 | Carrier API delay | Edge case | Carrier tracking data delayed by hours | Show last known status with timestamp |

---

### P0-12: Basic Analytics Dashboard (Feature #12)

#### User Stories

**US-12.1: Store Owner views return metrics overview**
> As a **Store Owner**, I want to see key return metrics at a glance so that I understand my return operations health.

**Acceptance Criteria:**
- Given I am on the Analytics dashboard
- When the page loads
- Then I see: total returns (period), return rate, average resolution time, revenue retained via exchanges/store credit, exchange conversion rate, top return reasons (chart), resolution distribution (refund vs exchange vs store credit)

**US-12.2: Store Owner filters analytics by date range**
> As a **Store Owner**, I want to filter analytics by date range so that I can compare performance across periods.

**Acceptance Criteria:**
- Given I am on the Analytics dashboard
- When I select a date range (last 7 days, 30 days, 90 days, custom)
- Then all metrics update to reflect the selected period

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-12.01 | Dashboard loads with data | Happy path | Navigate to analytics with 100+ returns | All charts and metrics render correctly |
| TC-12.02 | Dashboard empty state | Edge case | New store with 0 returns | Friendly empty state with explanation |
| TC-12.03 | Date range filter | Happy path | Select "Last 30 days" | Metrics recalculate for 30-day window |
| TC-12.04 | Return reasons chart | Happy path | View reasons breakdown | Bar chart showing reason categories with counts |
| TC-12.05 | Revenue retained metric | Happy path | Store has mix of refunds and exchanges | Correctly calculates exchange/credit amount as "retained" |
| TC-12.06 | Analytics load time | Performance | Dashboard with 10,000 returns in history | Page loads in < 3 seconds; charts render smoothly |
| TC-12.07 | Export analytics | Happy path | Click export | CSV/PDF with current analytics data downloaded |

---

### P0-13: Multi-Language Portal (Feature #13)

#### User Stories

**US-13.1: Customer sees portal in their language**
> As a **Customer**, I want to see the return portal in my preferred language so that I can complete the return process without language barriers.

**Acceptance Criteria:**
- Given the store has enabled multiple languages
- When I access the return portal
- Then the portal displays in my browser's preferred language (if supported) or the store's default language

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-13.01 | Portal in English (default) | Happy path | Access with English browser | Portal in English |
| TC-13.02 | Portal in French | Happy path | Access with French browser; French enabled | Portal in French |
| TC-13.03 | Unsupported language fallback | Edge case | Access with Japanese browser; Japanese not enabled | Falls back to store default language |
| TC-13.04 | Free plan: 5 language limit | Plan validation | Free plan store tries to enable 6th language | Upgrade prompt shown |
| TC-13.05 | RTL language support | Edge case | Portal accessed in Arabic | Layout switches to right-to-left |

---

### P0-14: Custom Branding (Feature #14)

#### User Stories

**US-14.1: Store Owner customizes portal appearance**
> As a **Store Owner**, I want to set my logo, brand colors, and fonts on the return portal so that it looks like part of my store.

**Acceptance Criteria:**
- Given I am on Settings > Portal Customization
- When I upload a logo, select primary/secondary colors, and choose a font
- Then the customer-facing portal reflects these branding choices

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-14.01 | Set logo | Happy path | Upload 200x200 PNG logo | Logo displayed on portal header |
| TC-14.02 | Set brand colors | Happy path | Set primary color to #FF5733 | Portal buttons and accents use #FF5733 |
| TC-14.03 | Invalid logo format | Edge case | Upload .svg file (if restricted) | Error with accepted formats list |
| TC-14.04 | Logo too large | Edge case | Upload 5MB logo (limit: 2MB) | Error: "Logo must be under 2MB" |
| TC-14.05 | Preview before save | Happy path | Edit branding settings | Live preview shown before saving |
| TC-14.06 | Reset to defaults | Happy path | Click "Reset to default" | Portal reverts to Avada default branding |

---

### P0-15: 10-Minute Quick-Start Wizard (Feature #22 in Feature Matrix)

#### User Stories

**US-15.1: Store Owner completes guided setup**
> As a **Store Owner**, I want a step-by-step setup wizard that imports my existing Shopify settings so that I can go live in under 10 minutes.

**Acceptance Criteria:**
- Given I have just installed the app and opened it for the first time
- When I am presented with the Quick-Start Wizard
- Then I am guided through 5 steps:
  1. Import Shopify policies (auto-detect return window, items)
  2. Configure return portal (upload logo, set colors)
  3. Set up shipping (connect carrier or use Avada labels)
  4. Email templates (preview and customize)
  5. Activate portal (enable theme extension)
- And the wizard auto-populates defaults from my Shopify store data
- And I can complete all steps in under 10 minutes

(Ref: File 08 - Merchant Admin Flow, Quick-Start Wizard section)

**US-15.2: Store Owner skips wizard and configures manually**
> As a **Store Owner**, I want to skip the wizard and configure settings manually if I prefer.

**Acceptance Criteria:**
- Given I am on the wizard
- When I click "Skip" or "Configure Later"
- Then I am taken to the main dashboard with a banner prompting me to complete setup

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-15.01 | Complete wizard end-to-end | Happy path | Follow all 5 steps to completion | Portal activated; settings saved; dashboard accessible |
| TC-15.02 | Auto-import Shopify policies | Happy path | Step 1: system reads Shopify shipping/refund policies | Return window and eligible items pre-populated from Shopify data |
| TC-15.03 | Skip wizard | Happy path | Click "Skip" on step 1 | Dashboard loads; "Complete Setup" banner shown |
| TC-15.04 | Resume wizard after partial completion | Edge case | Complete steps 1-3; close app; reopen | Wizard resumes at step 4 |
| TC-15.05 | Wizard time tracking | Performance | Complete all 5 steps | Total time < 10 minutes for average merchant |
| TC-15.06 | Wizard on mobile | Mobile | Complete wizard on tablet/mobile | All steps accessible and functional on mobile |
| TC-15.07 | No existing Shopify policies | Edge case | New store with no policies configured | Wizard provides sensible defaults (30-day window, all items returnable) |
| TC-15.08 | Theme extension activation | Happy path | Step 5: activate portal | Theme extension enabled; portal accessible on storefront |

---

### P0-16: Shopify Order Sync (Feature #15)

#### User Stories

**US-16.1: System syncs orders from Shopify in real-time**
> As a **Store Owner**, I want orders to sync automatically from Shopify so that customers can look up any order on the return portal.

**Acceptance Criteria:**
- Given the app is installed and active
- When a new order is created or updated in Shopify
- Then the order data is received via webhook (orders/create, orders/updated) and processed within 5 seconds
- And the order is available for return lookup on the portal

(Ref: File 08 - Data Flow Diagram, Webhook Processing Flow)

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-16.01 | New order synced | Happy path | Place new order in Shopify | Order available for return lookup within seconds |
| TC-16.02 | Order updated (fulfilled) | Happy path | Mark order as fulfilled | Fulfillment date updates; return window starts counting |
| TC-16.03 | Webhook HMAC verification | Security | Send forged webhook without valid HMAC | Rejected with 401; not processed |
| TC-16.04 | Webhook responds < 5 seconds | Performance | Webhook received | 200 OK returned < 1 second; heavy processing queued async (per file 08 webhook flow) |
| TC-16.05 | Duplicate webhook handling | Edge case | Same webhook delivered twice (Shopify retry) | Idempotent processing; no duplicate records |
| TC-16.06 | App uninstalled webhook | Happy path | Merchant uninstalls app | app/uninstalled webhook processed; data cleanup initiated |

---

## Part 2: P1 User Stories & Test Cases

---

### P1-01: Instant Exchange (Feature #16)

#### User Stories

**US-P1-01.1: Customer receives exchange before returning original**
> As a **Customer**, I want my exchange item shipped immediately so that I don't have to wait for my return to be received.

**Acceptance Criteria:**
- Given the store has instant exchange enabled (Pro plan) and I have selected an exchange
- When I confirm the exchange
- Then a new order is created and shipped immediately
- And my payment method is held as a security deposit
- And I have a return window to send back the original item
- And if I fail to return within the window, the security deposit is charged

(Ref: File 08 - Exchange Flow Diagram, Instant Exchange branch)

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-P1-01.01 | Instant exchange happy path | Happy path | Customer selects exchange; instant enabled | New order created; exchange item shipped; card held |
| TC-P1-01.02 | Security deposit charged | Edge case | Customer fails to return within window | Card charged for original item value |
| TC-P1-01.03 | Security deposit released | Happy path | Original item returned within window | Card hold released |
| TC-P1-01.04 | Card hold fails | Error | Payment method cannot be held | Fallback to standard exchange (wait for return) |
| TC-P1-01.05 | Instant exchange on free plan | Plan validation | Free plan merchant tries instant exchange | Feature gated; upgrade prompt shown |
| TC-P1-01.06 | Instant exchange + price difference | Edge case | Instant exchange for more expensive variant | Card held for original + difference charged immediately |

---

### P1-02: Cross-Product Exchange (Feature #17)

#### User Stories

**US-P1-02.1: Customer exchanges for a different product**
> As a **Customer**, I want to exchange my returned item for a completely different product so that I can find something I actually want.

**Acceptance Criteria:**
- Given I am on the exchange selection step
- When I choose "Exchange for a different product"
- Then I can browse and select any product from the store catalog
- And the price difference is calculated and handled (charge or credit)

(Ref: File 08 - Exchange Flow Diagram, Cross-Product Exchange branch)

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-P1-02.01 | Cross-product same price | Happy path | Exchange $50 product A for $50 product B | Exchange created; no additional charge |
| TC-P1-02.02 | Cross-product upsell | Happy path | Exchange $30 item for $50 item | Customer charged $20 difference |
| TC-P1-02.03 | Cross-product downsell | Happy path | Exchange $50 item for $30 item | $20 store credit issued |
| TC-P1-02.04 | Cross-product exchange plan gating | Plan validation | Free plan merchant; customer tries cross-product exchange | Feature gated; only variant exchange available |
| TC-P1-02.05 | Product with variants | Happy path | Select product B with multiple variants | Customer must also select specific variant |
| TC-P1-02.06 | Digital product selected for exchange | Edge case | Customer selects a digital product | Error: "Digital products are not eligible for exchange" |

---

### P1-03: Shop Now Exchange Flow (Feature #18)

#### User Stories

**US-P1-03.1: Customer browses full catalog with return credit**
> As a **Customer**, I want to browse the full store catalog during my return and apply my return credit so that the return feels like a shopping experience.

**Acceptance Criteria:**
- Given I have selected "Shop Now" as my exchange option
- When I am redirected to the store catalog
- Then my return credit amount is displayed
- And I can add items to cart with the credit applied automatically
- And any remaining credit is issued as store credit
- And any excess is charged to my payment method

(Ref: File 08 - Exchange Flow Diagram, Shop Now branch)

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-P1-03.01 | Shop Now with exact credit | Happy path | Return credit $50; select $50 item | No additional charge; exchange completed |
| TC-P1-03.02 | Shop Now with overspend | Happy path | Return credit $50; select $75 item | Customer pays $25 difference at checkout |
| TC-P1-03.03 | Shop Now with underspend | Happy path | Return credit $50; select $30 item | $20 issued as store credit |
| TC-P1-03.04 | Shop Now with multiple items | Happy path | Return credit $100; select 3 items totaling $90 | $10 store credit issued |
| TC-P1-03.05 | Shop Now session expiry | Edge case | Customer doesn't complete purchase within session | Credit preserved; customer can resume |
| TC-P1-03.06 | Shop Now plan gating | Plan validation | Starter plan merchant | Feature gated to Pro plan |

---

### P1-04: Exchange Upsell / Bonus Credit (Feature #19)

#### User Stories

**US-P1-04.1: Customer sees bonus credit for choosing exchange**
> As a **Customer**, I want to receive bonus store credit when I choose an exchange over a refund so that I am incentivized to keep shopping.

**Acceptance Criteria:**
- Given the store has enabled exchange bonus credit
- When I see the resolution options (refund vs store credit vs exchange)
- Then the exchange/store credit options show the bonus amount (e.g., "+$5 bonus")
- And if I choose exchange or store credit, the bonus is applied to my credit

(Ref: File 08 - Exchange Flow Diagram, Bonus Credit section)

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-P1-04.01 | Bonus credit displayed | Happy path | Store offers $5 bonus; customer views resolution options | "+$5 bonus" shown next to exchange and store credit options |
| TC-P1-04.02 | Bonus applied to exchange | Happy path | Customer selects exchange with $5 bonus | EXCHANGES.bonusCreditApplied = 5 |
| TC-P1-04.03 | Bonus applied to store credit | Happy path | Customer selects store credit with $5 bonus | Gift card amount = return value + bonus |
| TC-P1-04.04 | No bonus for refund | Happy path | Customer selects refund | No bonus applied; standard refund amount |
| TC-P1-04.05 | Bonus disabled | Edge case | Store has bonus disabled | No bonus shown on resolution options |
| TC-P1-04.06 | Percentage-based bonus | Edge case | Store offers 10% bonus on $100 return | Bonus = $10 |

---

### P1-05: Automated Workflows / Rules Engine (Feature #20)

#### User Stories

**US-P1-05.1: Store Owner creates if-then automation rules**
> As a **Store Owner**, I want to create automation rules (e.g., "If return reason is defective AND item value < $20, then auto-approve and keep item") so that common scenarios are handled without manual intervention.

**Acceptance Criteria:**
- Given I am on Settings > Automation Rules
- When I create a rule with conditions (return reason, item value, customer segment, product tag) and actions (auto-approve, generate label, send notification, set resolution)
- Then the rule is applied to matching returns automatically

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-P1-05.01 | Create and trigger rule | Happy path | Rule: "If reason=defective AND value<$20, auto-approve + keep item" | Matching return auto-approved with keep-item resolution |
| TC-P1-05.02 | Multiple rules matching | Edge case | Two rules match same return | Rules execute in priority order; first match wins |
| TC-P1-05.03 | Rule with invalid condition | Error | Create rule with impossible condition | Validation error shown |
| TC-P1-05.04 | Disable rule | Happy path | Disable existing rule | Rule stops firing; existing returns unaffected |
| TC-P1-05.05 | Rule execution logged | Happy path | Rule fires | Audit log entry: "Auto-approved by rule: [rule name]" |

---

### P1-06: Return Fraud Detection (Feature #21)

#### User Stories

**US-P1-06.1: System flags suspicious returns**
> As a **CS Agent**, I want to see fraud risk flags on return requests so that I can investigate suspicious activity before approving.

**Acceptance Criteria:**
- Given a return request is submitted
- When the system evaluates fraud signals (serial returner, high return frequency, policy abuse patterns, blocklisted customer)
- Then a fraud score is calculated and stored (RETURN_REQUESTS.fraudScore)
- And high-risk returns are flagged and routed to manual review even if auto-approve is enabled

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-P1-06.01 | Serial returner flagged | Happy path | Customer with 10+ returns in 30 days | Fraud flag shown; routed to manual review |
| TC-P1-06.02 | Blocklisted customer | Happy path | Customer on blocklist submits return | Return flagged; agent notified |
| TC-P1-06.03 | Normal customer not flagged | Happy path | Customer with 1 return in 6 months | No fraud flag; auto-approve proceeds normally |
| TC-P1-06.04 | Fraud score persisted | Happy path | Return flagged with score 0.85 | RETURN_REQUESTS.isFraudFlagged = true, fraudScore = 0.85 |
| TC-P1-06.05 | Fraud detection on Starter plan | Plan validation | Starter plan merchant | Fraud alerts available |

---

### P1-07: Product-Level Return Analytics (Feature #23)

#### User Stories

**US-P1-07.1: Store Owner views return rate per product**
> As a **Store Owner**, I want to see which products have the highest return rates so that I can identify and fix problematic items.

**Acceptance Criteria:**
- Given I am on Analytics > Product Insights
- When the page loads
- Then I see a ranked list of products by return rate
- And I can drill down to variant-level return rates and top return reasons per variant
- And I see actionable insights (e.g., "Size M returned 47 times for 'too small' -- consider updating size chart")

(Ref: File 02 - Blue Ocean #2: Return Reason to Product Improvement Loop)

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-P1-07.01 | Top returned products list | Happy path | Navigate to product insights | Products ranked by return rate with counts |
| TC-P1-07.02 | Variant-level drill down | Happy path | Click on product | Variant breakdown with return reasons per variant |
| TC-P1-07.03 | Financial impact per product | Happy path | View product detail | Total refunds, credits, and exchanges for that product |
| TC-P1-07.04 | Analytics powered by BigQuery | Happy path | Product insights load | Data queried from BigQuery (BQ_PROD table, clustered by product_id per file 08) |
| TC-P1-07.05 | Plan gating on Pro | Plan validation | Free plan merchant navigates to product insights | Upgrade prompt shown |

---

### P1-08: Green Returns - Keep the Item (Feature #24)

#### User Stories

**US-P1-08.1: Customer keeps low-value item instead of returning**
> As a **Customer**, I want the option to keep my item and still receive a refund/credit so that I avoid the hassle of shipping.

**Acceptance Criteria:**
- Given the store has green returns enabled with a threshold (e.g., items under $15)
- When I initiate a return for an eligible item
- Then I see the option "Keep the item and receive [refund/store credit]"
- And if I choose this option, no shipping label is generated
- And the return is resolved immediately

(Ref: File 08 - State Machine, KeepItem branch)

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-P1-08.01 | Keep item offered for low-value | Happy path | $10 item; threshold is $15 | "Keep the item" option shown |
| TC-P1-08.02 | Keep item not offered for high-value | Happy path | $50 item; threshold is $15 | Keep-item option not shown; standard return flow |
| TC-P1-08.03 | Keep item with store credit | Happy path | Customer keeps item, selects store credit | Store credit issued; no label generated; return completed |
| TC-P1-08.04 | Keep item on free plan | Plan validation | Free plan merchant | Feature available on free plan |
| TC-P1-08.05 | Threshold configuration | Happy path | Store Owner sets threshold to $20 | Items under $20 now show keep-item option |

---

### P1-09: QR Code Returns (Feature #25)

#### User Stories

**US-P1-09.1: Customer gets QR code for box-free drop-off**
> As a **Customer**, I want a QR code instead of a label so that I can drop off my return at a carrier location without printing or boxing.

**Acceptance Criteria:**
- Given my return has been approved
- When QR code option is available and I select it
- Then I receive a QR code image via email
- And I can present the QR code at a carrier drop-off location

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-P1-09.01 | Generate QR code | Happy path | Select QR code option | QR code generated; emailed to customer |
| TC-P1-09.02 | QR code tracking | Happy path | Customer drops off with QR | Tracking updates when carrier scans QR |
| TC-P1-09.03 | QR code plan gating | Plan validation | Free plan merchant | Feature gated to Pro plan |

---

### P1-10: SMS Notifications (Feature #26)

#### User Stories

**US-P1-10.1: Customer receives SMS status updates**
> As a **Customer**, I want to receive SMS notifications for return status changes so that I get instant updates on my phone.

**Acceptance Criteria:**
- Given the store has SMS notifications enabled and I have provided a phone number
- When my return status changes
- Then I receive an SMS with the status update and a link to the tracking page

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-P1-10.01 | SMS sent on approval | Happy path | Return approved; customer has phone number | SMS sent via Twilio within 1 minute |
| TC-P1-10.02 | No phone number | Edge case | Customer has no phone on file | No SMS sent; email only |
| TC-P1-10.03 | International phone number | Happy path | Customer has +44 UK number | SMS delivered to international number |
| TC-P1-10.04 | SMS delivery failure | Error | Invalid phone number | Failure logged; notification status "failed" |
| TC-P1-10.05 | SMS plan gating | Plan validation | Free plan merchant | Feature gated to Starter plan |

---

### P1-11: Gift Returns (Feature #27)

#### User Stories

**US-P1-11.1: Gift recipient returns without seeing price**
> As a **Customer** who received a gift, I want to return the item without seeing the original price so that the gift giver's spending remains private.

**Acceptance Criteria:**
- Given the store has gift returns enabled
- When a gift recipient initiates a return
- Then they can look up the order by gift receipt or order number
- And no prices are displayed during the return flow
- And the resolution is store credit (not refund to original payment)

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-P1-11.01 | Gift return hides prices | Happy path | Gift recipient initiates return | No prices shown anywhere in portal |
| TC-P1-11.02 | Gift return issues store credit | Happy path | Gift return completed | Store credit issued to recipient (not original purchaser) |
| TC-P1-11.03 | Gift return - no refund option | Happy path | Gift recipient views resolution options | Only "Store Credit" available; no "Refund to original payment" |

---

### P1-12: Customer Blocklist (Feature #29)

#### User Stories

**US-P1-12.1: Store Owner blocks abusive returners**
> As a **Store Owner**, I want to block specific customers from using the return portal so that known abusers cannot exploit my return policy.

**Acceptance Criteria:**
- Given I have added a customer email to the blocklist
- When that customer tries to initiate a return
- Then they see a generic message directing them to contact support
- And the system does not reveal they are blocklisted

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-P1-12.01 | Blocked customer denied | Happy path | Blocklisted customer looks up order | "Please contact support for assistance with your return" |
| TC-P1-12.02 | No information leak | Security | Blocklisted customer | Message does not indicate they are blocked |
| TC-P1-12.03 | Add to blocklist | Happy path | Add email to blocklist | Customer blocked on next return attempt |
| TC-P1-12.04 | Remove from blocklist | Happy path | Remove email from blocklist | Customer can use portal again |
| TC-P1-12.05 | Blocklist on free plan | Plan validation | Free plan merchant | Feature available on free plan |

---

### P1-13: Shopify Flow Integration (Feature #30)

#### User Stories

**US-P1-13.1: Return events trigger Shopify Flow automations**
> As a **Store Owner**, I want return events to trigger Shopify Flow so that I can build custom automations (e.g., tag customers, send Klaviyo emails, update spreadsheets).

**Acceptance Criteria:**
- Given the app publishes events to Shopify Flow
- When a return event occurs (return_created, return_approved, return_completed, exchange_created, refund_processed)
- Then the event is available as a trigger in Shopify Flow
- And event payload includes return details (returnId, orderId, customerId, resolution, amount)

#### Test Cases

| ID | Scenario | Type | Steps | Expected Result |
|----|----------|------|-------|-----------------|
| TC-P1-13.01 | Flow trigger on return created | Happy path | Submit new return; Flow workflow listens for return_created | Flow triggered with correct payload |
| TC-P1-13.02 | Flow trigger on exchange | Happy path | Exchange created; Flow workflow listens | exchange_created event fires |
| TC-P1-13.03 | Flow event payload accuracy | Happy path | Inspect event payload in Flow | All fields (returnId, orderId, customerId, etc.) present and correct |
| TC-P1-13.04 | Flow plan gating | Plan validation | Free plan merchant | Feature gated to Starter plan |

---

## Part 3: Cross-Cutting Test Cases

---

### Performance Test Cases

| ID | Scenario | Threshold | Method |
|----|----------|-----------|--------|
| PERF-01 | Portal page cold start load time | < 2 seconds (3G) | Lighthouse audit |
| PERF-02 | Dashboard load with 10,000+ returns | < 3 seconds | Load test with seeded data |
| PERF-03 | Webhook processing (200 OK response) | < 1 second | Measure from webhook receipt to 200 response (per file 08 webhook flow) |
| PERF-04 | Auto-approve processing | < 3 seconds from submission | End-to-end measurement |
| PERF-05 | Label generation API call | < 5 seconds | Measure EasyPost/Shippo response time |
| PERF-06 | Analytics dashboard with 50,000 returns | < 5 seconds | BigQuery query performance |
| PERF-07 | Concurrent return submissions (100 simultaneous) | All succeed; no data corruption | Load test |
| PERF-08 | Firestore read operations per return detail | < 5 reads per page load | Monitor Firestore usage |
| PERF-09 | Bulk approve 100 returns | < 30 seconds total | Batch processing efficiency |
| PERF-10 | BigQuery analytics query cost | < $0.01 per dashboard load | Cost monitoring |

---

### Integration Test Cases

| ID | Scenario | Systems | Expected Result |
|----|----------|---------|-----------------|
| INT-01 | Shopify order sync via webhook | Shopify -> Firebase | Order data available in Firestore within 5 seconds |
| INT-02 | Refund creates Shopify refund | Firebase -> Shopify Admin API | Shopify order shows refund in admin |
| INT-03 | Store credit creates Shopify gift card | Firebase -> Shopify Admin API | Gift card created and usable at checkout |
| INT-04 | Exchange creates Shopify draft order | Firebase -> Shopify Admin API | Draft order created with correct items and pricing |
| INT-05 | Label generation via EasyPost | Firebase -> EasyPost | Label PDF generated; tracking number returned |
| INT-06 | Email notification via SendGrid | Firebase -> SendGrid | Email delivered; status tracked |
| INT-07 | SMS notification via Twilio | Firebase -> Twilio | SMS delivered to customer phone |
| INT-08 | Analytics event to BigQuery | Firebase -> BigQuery | Event row inserted; queryable within minutes |
| INT-09 | Shopify Flow event trigger | Firebase -> Shopify Flow | Flow automation triggered with correct payload |
| INT-10 | Return photo upload to Cloud Storage | Portal -> Cloud Storage | Photo accessible via signed URL |
| INT-11 | Inventory adjustment on exchange | Firebase -> Shopify Inventory API | Inventory decremented for new variant; incremented for returned variant |

---

### Mobile Test Cases

| ID | Scenario | Device | Expected Result |
|----|----------|--------|-----------------|
| MOB-01 | Portal responsive on iPhone | iPhone 14 Safari | Full portal functional; no horizontal scroll |
| MOB-02 | Portal responsive on Android | Samsung Galaxy S24 Chrome | Full portal functional; tap targets accessible |
| MOB-03 | Photo upload from mobile camera | iOS/Android | Camera opens; photo captured and uploaded |
| MOB-04 | QR code display on mobile | Mobile browser | QR code scannable from carrier's device |
| MOB-05 | Admin dashboard on tablet | iPad Pro | Dashboard usable; charts render correctly |
| MOB-06 | Return portal on slow 3G | Throttled mobile | Portal loads within 4 seconds; graceful degradation |

---

### Security Test Cases

| ID | Scenario | Attack Vector | Expected Result |
|----|----------|--------------|-----------------|
| SEC-01 | Webhook HMAC verification | Forged webhook | Rejected with 401 (per file 08 webhook flow) |
| SEC-02 | IDOR on return details | Access other shop's return by ID | 403 Forbidden; all queries scoped by shopId (per Firestore rules) |
| SEC-03 | IDOR on customer portal | Access other customer's return | Requires matching email + order number; no enumeration possible |
| SEC-04 | SQL/NoSQL injection | Malicious input in search/filter fields | Input sanitized; no database errors |
| SEC-05 | XSS in return notes/reasons | Script tags in user input | Output escaped; no script execution |
| SEC-06 | Rate limiting on API endpoints | Rapid API calls (1000/min) | Rate limit enforced; 429 returned after threshold |
| SEC-07 | Photo upload malware | Upload executable disguised as image | File type validation rejects non-image files |
| SEC-08 | Signed URL expiry on photos | Access photo URL after expiry | URL returns 403; not publicly accessible |
| SEC-09 | App API authentication | Unauthenticated API call | 401 returned; all endpoints require valid session |
| SEC-10 | Multi-tenant data isolation | Shop A queries Shop B data | All Firestore queries include shopId filter; zero cross-tenant access |
| SEC-11 | PII in logs | Check Cloud Logging | No customer emails, payment details, or PII in logs |
| SEC-12 | Gift card code exposure | Gift card in API responses | Codes masked in API responses; full code only in customer email |

---

## Summary

| Category | Stories | Test Cases |
|----------|---------|------------|
| P0 Features (16 features) | 28 user stories | 118 test cases |
| P1 Features (13 features) | 18 user stories | 62 test cases |
| Cross-cutting (Performance) | -- | 10 test cases |
| Cross-cutting (Integration) | -- | 11 test cases |
| Cross-cutting (Mobile) | -- | 6 test cases |
| Cross-cutting (Security) | -- | 12 test cases |
| **Total** | **46 user stories** | **219 test cases** |

All user stories and test cases trace back to the feature matrix (file 02), system diagrams (file 08), competitive requirements (file 05), and target personas (file 03). Test cases cover the complete return lifecycle state machine from file 08, including all branches: auto-approve, manual review, green returns, variant exchange, cross-product exchange, Shop Now, instant exchange, and fraud detection paths.
