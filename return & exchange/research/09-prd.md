# 09 - Product Requirements Document (PRD): Avada Return & Exchange

**Product Name:** Avada Returns & Exchanges
**Version:** 1.0 (MVP)
**Author:** Roger (BA) + Research Team
**Date:** 2026-04-09
**Status:** Draft
**App Store Name:** Avada Returns & Exchanges
**App Store Subtitle:** Automate returns, exchanges & refunds. 50 free returns/mo

---

## 1. Executive Summary

**Avada Returns & Exchanges** is a Shopify app that provides merchants with a complete self-service return, exchange, and refund management system. The app targets the massive gap in the Shopify ecosystem between free-but-useless return apps (3-5 returns/month) and powerful-but-unaffordable solutions ($155-$340/month).

| Metric | Value |
|--------|-------|
| **Target Market** | 3.9M+ Shopify stores selling physical goods |
| **Primary Segment** | SMB merchants (50-500 orders/month) |
| **Pricing Range** | Free (50 returns/mo) to $99/mo (2,000 returns/mo) |
| **Projected Y1 ARR** | ~$250K |
| **Projected Y2 ARR** | ~$1.85M |
| **Projected Y3 ARR** | ~$7.5M |
| **Break-even** | Mid-Year 2 |
| **Go/No-Go** | STRONG GO (85% confidence, 7.9/10 score) |

**Core value proposition:** The most generous free returns app on Shopify -- 50 free returns/month with exchanges, store credit, and auto-approve included. Enterprise features (instant exchange, fraud detection, product analytics) at SMB prices ($29/mo vs. competitors' $155-$340/mo).

---

## 2. Problem Statement

### The Returns Crisis in E-Commerce

Online return rates have surged to **24.5% in 2025** (up from 20.4% in 2024), with fashion/apparel stores facing 30-40% return rates. The actual cost of processing a return is **3-4x what most merchants estimate** when factoring in reverse shipping, restocking, customer service time, inventory depreciation, and lost future revenue.

### Merchant Pain Points (from Primary Research)

**Pain Point #1: Shopify Native Returns is Severely Limited (Severity: 5/5)**

> *"Shopify's native flow does not automate policy enforcement, send proactive return status notifications, route returns to multiple warehouses, or push customers toward exchanges instead of refunds."* -- Refundid

> *"Under two returns a day is usually manageable on Shopify's native tool, but once you pass that threshold, the manual work and policy limitations start to compound."* -- Refundid

**Pain Point #2: Existing Apps Are Too Expensive for SMBs (Severity: 4/5)**

Loop Returns charges $155-$340/month. Even "affordable" options like AfterShip cap free plans at 3 returns and quickly escalate with overage fees.

> *"Why do I need to pay for additional seats on top of the per-return rate."* -- Blundstone UK, 1-star AfterShip review

> *"This app wasted over six weeks of our time. I cannot even comment on whether the app itself is good, because we were never given access to log in or use it."* -- Pretty Little Home, 1-star Loop Returns review (describing mandatory sales calls and inconsistent pricing)

**Pain Point #3: Exchange Flows Are Broken or Non-Existent (Severity: 5/5)**

> *"The exchange feature charged customers full price instead of applying return value credits."* -- Superfit Hero, 1-star AfterShip review

> *"Product exchanges lack sophisticated features like variant-level suggestions, AI-driven upsell logic, or automated in-stock recommendations."* -- Cahoot analysis of Return Prime

**Pain Point #4: Unreliable Customer Support (Severity: 4/5)**

> *"Aftership doesn't care about their long-term customers."* -- MARIEMUR, 1-star review (2 months unresolved label generation issues)

> *"Support staff respond whenever they feel like it -- if they respond at all."* -- Spacefish Army, 1-star Return Prime review

**Pain Point #5: Billing Surprises and Hidden Charges (Severity: 5/5)**

> *"Anywhere I look the app says FREE for the starter plan. Nowhere does it say I will get charged."* -- Shopify Community post (charged $700 on a "free" plan)

> *"Charged $26K USD [due to a tracking number attack] with refusal to refund despite provided evidence."* -- Qwintry, AfterShip user

**Pain Point #6: Onboarding Complexity (Severity: 4/5)**

> *"The most complicated and convoluted procedure... support essentially telling users to figure it out themselves."* -- Loop Returns merchant (month-long installation)

---

## 3. Solution Description

Avada Returns & Exchanges solves these problems through:

1. **Generous Free Tier**: 50 returns/month with store credit, variant exchange, auto-approve, tracking, and analytics -- 10x more generous than any sustainable competitor.

2. **10-Minute Quick-Start Wizard**: Auto-imports Shopify policies, pre-configures carriers, provides pre-built email templates, and guides merchants through a 5-step setup process.

3. **Exchange-First Revenue Retention**: Nudges customers toward exchanges and store credit instead of refunds, with bonus credit incentives. Variant exchange available on the free plan -- a feature competitors charge $20-60/month for.

4. **Affordable Advanced Features**: Instant exchange at $29/month (vs. Loop's $340), fraud detection at $29/month (vs. Loop's $155+), and product-level analytics at $29/month (vs. ReturnGO's $147+).

5. **Transparent Pricing**: No hidden fees, no seat-based charges, no surprise billings, easy month-to-month cancellation.

6. **Branded Customer Portal**: Self-service return portal embedded in the merchant's storefront via Theme App Extension, matching their branding with multi-language support.

---

## 4. Target Audience

### Primary Target: SMB Core Segment ("Growing Greg")

| Attribute | Detail |
|-----------|--------|
| Shopify Plan | Basic, Grow |
| Monthly Revenue | $1,500-$25,000 |
| Monthly Orders | 50-600 |
| Monthly Returns | 10-100 |
| Team Size | 1-4 people |
| Budget | $0-$30/month |
| Current Process | Manual emails or basic app hitting limits |

**Why primary:** Largest addressable volume (~3.5M stores), most underserved by current solutions, fastest acquisition via App Store organic discovery, and community-driven growth through recommendations.

**Key sub-segments:** Fashion/apparel DTC, footwear, beauty/cosmetics, home goods.

### Secondary Target: Mid-Market ("Scaling Sophia")

| Attribute | Detail |
|-----------|--------|
| Shopify Plan | Advanced |
| Monthly Revenue | $15,000-$200,000 |
| Monthly Orders | 500-5,000 |
| Monthly Returns | 100-1,000 |
| Team Size | 8-15 people |
| Budget | $50-$150/month |
| Current Process | Using ReturnGO Premium or AfterShip Pro, frustrated with limitations |

**Why secondary:** Highest ARPU ($45-$50/month), revenue concentration (39% of total revenue from 28% of paid users), and switching opportunity from frustrated competitors.

### Deprioritized (for now): Shopify Plus / Enterprise

Long sales cycles, requires enterprise features (SOC 2, SLA), and small addressable market (~50K stores). Expand after reaching 20,000+ installs in Year 2-3.

### Segment Revenue Potential (Year 3)

| Segment | Target Installs | Paid Conversion | Paying Customers | ARPU | Monthly Revenue |
|---------|----------------|----------------|-----------------|------|----------------|
| Free/Dev | 20,000 | 5% | 1,000 | $9 | $9,000 |
| SMB (Core) | 30,000 | 25% | 7,500 | $18 | $135,000 |
| Mid-Market | 8,000 | 45% | 3,600 | $45 | $162,000 |
| Shopify Plus | 1,500 | 60% | 900 | $120 | $108,000 |
| **Total** | **59,500** | -- | **13,000** | -- | **$414,000/mo** |

---

## 5. Core Features by Phase

### P0 - MVP (Must Have for Launch, Weeks 1-12)

#### F01: Self-Service Return Portal

**Description:** Branded, embeddable portal where customers initiate returns without contacting support. Embedded via Theme App Extension.

**User Story:** As a customer, I want to initiate a return through the store's website without emailing support, so that I can start my return process immediately at any time.

**Acceptance Criteria:**
- Customer can look up order by order number + email or by logging into their account
- Portal displays only eligible items (within return window, not non-returnable)
- Portal matches merchant's branding (logo, colors, fonts)
- Portal is mobile-responsive
- Portal supports at least 5 languages on the free plan
- Customer receives confirmation with return ID and next steps

---

#### F02: Return Request Management Dashboard

**Description:** Admin interface in the Shopify embedded app to view, approve/reject, and manage all return requests.

**User Story:** As a merchant, I want to see all pending return requests in one place with filtering and search, so that I can process returns efficiently.

**Acceptance Criteria:**
- IndexTable displays all return requests with columns: Return ID, Order, Customer, Status, Reason, Date, Resolution Type
- Filters: status, date range, customer, product, reason, resolution type
- Search by order number, customer name, or email
- Bulk actions: approve all, generate labels, export to CSV
- Quick-action buttons for approve, reject, and request more info
- Badge-based status indicators using Polaris Badge component

---

#### F03: Configurable Return Policies

**Description:** Return windows, eligible/non-returnable items, conditions, and per-product rules.

**User Story:** As a merchant, I want to define my return policy rules in the app, so that return eligibility is automatically enforced without manual checks.

**Acceptance Criteria:**
- Set return window (days from order fulfillment)
- Mark specific products or collections as non-returnable
- Set per-product/per-collection return windows
- Define restocking fee percentage (optional)
- Require photo uploads for specific return reasons
- Rules evaluated automatically during customer return request

---

#### F04: Automated Return Approval

**Description:** Auto-approve returns that match policy rules without manual intervention.

**User Story:** As a merchant, I want returns that meet my policy to be automatically approved, so that I don't have to manually review every request.

**Acceptance Criteria:**
- Toggle auto-approve on/off
- Configure rules: within return window, item is returnable, order value threshold, customer not blocklisted
- Auto-approved returns immediately generate shipping labels (if configured)
- Audit log records auto-approval with rule match details
- Available on the Free plan

---

#### F05: Refund Processing

**Description:** Process refunds to original payment method, store credit, or gift card.

**User Story:** As a merchant, I want to issue refunds through the app without manually going to Shopify admin, so that the refund process is streamlined.

**Acceptance Criteria:**
- Refund to original payment via Shopify Refund API
- Issue store credit as Shopify gift card
- Support partial refunds (e.g., restocking fee deducted)
- Refund status syncs with Shopify order
- Merchant can choose resolution type per return

---

#### F06: Store Credit / Gift Card Refunds

**Description:** Issue store credit instead of refund to retain revenue.

**User Story:** As a merchant, I want to offer store credit as a return resolution option (with an incentive), so that I retain revenue instead of issuing refunds.

**Acceptance Criteria:**
- Customer sees store credit as an option during return request with bonus incentive callout (e.g., "+$5 bonus")
- Store credit issued as Shopify gift card with email delivery
- Track store credit issuance, balance, and usage
- Merchant can configure bonus credit amount for choosing store credit over refund
- Available on the Free plan

---

#### F07: Return Reason Collection

**Description:** Customizable return reason dropdowns with optional photo/video upload.

**User Story:** As a merchant, I want to collect structured return reasons from customers, so that I can understand why products are being returned.

**Acceptance Criteria:**
- Pre-built reason categories: Sizing, Damaged/Defective, Not As Described, Changed Mind, Other
- Merchant can add/edit/reorder custom reasons
- Photo upload capability (max 5 images, 10MB each)
- Reason data feeds into analytics dashboard
- Specific reasons can trigger photo requirement

---

#### F08: Email Notifications

**Description:** Automated emails for return status updates.

**User Story:** As a customer, I want to receive email updates about my return status, so that I know what's happening without contacting the store.

**Acceptance Criteria:**
- Trigger emails for: return requested, approved, rejected, label created, item received, refund issued, exchange shipped
- Customizable email templates with merchant branding
- Preview and test emails before going live
- Track email delivery status (sent/failed)
- Available on the Free plan

---

#### F09: Return Shipping Labels

**Description:** Generate prepaid return labels via carrier API integration.

**User Story:** As a customer, I want to receive a prepaid return shipping label, so that I can easily ship my return without visiting a carrier website.

**Acceptance Criteria:**
- Generate labels via EasyPost/Shippo for USPS, FedEx, UPS, DHL
- Label delivered via email and displayed on return status page
- Merchant can choose who pays for return shipping (merchant, customer, or split)
- Tracking number automatically associated with return request
- Label expires after configurable period (default: 14 days)

---

#### F10: Basic Variant Exchange

**Description:** Exchange for different size/color of the same product.

**User Story:** As a customer, I want to exchange my item for a different size or color without going through a separate refund and repurchase, so that the process is simple and fast.

**Acceptance Criteria:**
- Customer selects "Exchange" as resolution type
- Display available variants (sizes, colors) with real-time inventory status
- Handle price differences (charge more or issue credit for less)
- Create exchange order in Shopify upon return receipt
- Reserve exchange item inventory for 7 days
- Available on the Free plan

---

#### F11: Return Tracking

**Description:** Track return shipment status and display to customer.

**User Story:** As a customer, I want to track my return shipment status, so that I know when the store receives my return and when I'll get my refund.

**Acceptance Criteria:**
- Display tracking status on customer-facing status page
- Status stages: Submitted, Approved, Label Created, Shipped, In Transit, Received, Inspected, Resolved
- Pull carrier tracking data automatically
- Email customer when status changes
- Available on the Free plan

---

#### F12: Basic Analytics Dashboard

**Description:** Basic return metrics including volume, reasons, resolution types, and financial impact.

**User Story:** As a merchant, I want to see an overview of my return metrics, so that I can understand patterns and make data-driven decisions.

**Acceptance Criteria:**
- Total returns by period (day/week/month)
- Return reasons breakdown (bar chart)
- Resolution distribution (refund vs. exchange vs. store credit)
- Revenue retained through exchanges and store credit
- Average return processing time
- Available on the Free plan

---

#### F13: Multi-Language Portal

**Description:** Support multiple languages for international customers.

**User Story:** As a merchant with international customers, I want the return portal to display in my customers' language, so that non-English speakers can easily use it.

**Acceptance Criteria:**
- Auto-detect browser language
- Support 5 languages on Free plan (English + 4 configurable)
- Merchant can customize all customer-facing text
- RTL language support for Arabic/Hebrew

---

#### F14: Custom Branding

**Description:** Logo, colors, and fonts on the return portal.

**User Story:** As a merchant, I want the return portal to match my store's look and feel, so that the experience is seamless for my customers.

**Acceptance Criteria:**
- Upload logo
- Configure primary and accent colors
- Choose font family
- Preview branding changes in real-time
- CSS customization for advanced users

---

#### F15: 10-Minute Quick-Start Wizard

**Description:** Guided onboarding that auto-imports Shopify policies and gets merchants live in under 10 minutes.

**User Story:** As a new merchant, I want to set up the returns app quickly without reading documentation, so that I can start processing returns immediately.

**Acceptance Criteria:**
- Step 1: Auto-import Shopify return policy (return window, eligible items)
- Step 2: Upload logo, set colors (pre-populate from store theme)
- Step 3: Configure shipping (connect carrier or use Avada labels)
- Step 4: Preview and customize email templates
- Step 5: Activate portal via Theme App Extension
- Total setup time target: <10 minutes
- Progress indicator showing completion percentage

---

### P1 - MMP Differentiators (Months 2-6, Weeks 13-24)

#### F16: Instant Exchange

**Description:** Ship replacement item before receiving the return. Hold customer's card as security deposit.

**User Story:** As a customer, I want to receive my exchange item immediately without waiting for my return to be received, so that I'm not without the product for weeks.

**Acceptance Criteria:**
- Create exchange order and ship immediately upon approval
- Place hold on customer's payment method as security deposit
- If return not received within configurable window (default: 14 days), charge the hold
- Release hold upon return receipt
- Pro plan ($29/mo) and above
- Merchant can enable/disable per product category

---

#### F17: Cross-Product Exchange

**Description:** Exchange returned item for a completely different product.

**User Story:** As a customer, I want to exchange my return for a different product entirely, so that I can find something that better suits my needs.

**Acceptance Criteria:**
- Customer browses curated product list during exchange flow
- Price difference calculated and collected or credited automatically
- Inventory reserved for 7 days
- Starter plan ($9/mo) and above

---

#### F18: Shop Now Exchange Flow

**Description:** Redirect customer to browse the full store catalog during return, applying return credit.

**User Story:** As a customer, I want to browse the full store catalog during my return and apply my return value as credit, so that I have maximum flexibility in choosing a replacement.

**Acceptance Criteria:**
- Customer receives a unique shopping link with return credit pre-applied
- Credit displayed as a banner on the store
- Price difference collected or issued as store credit
- Session tracks exchange back to original return
- Pro plan ($29/mo) and above

---

#### F19: Exchange Bonus Credit

**Description:** Offer bonus store credit when customer chooses exchange over refund.

**User Story:** As a merchant, I want to incentivize customers to choose exchange instead of refund, so that I retain more revenue.

**Acceptance Criteria:**
- Configurable bonus amount (fixed $ or percentage)
- Bonus displayed prominently on resolution selection screen
- Track bonus credit usage and ROI
- A/B test bonus amounts (future)
- Starter plan ($9/mo) and above

---

#### F20: Automated Workflows / Rules Engine

**Description:** If-then rules for routing, approvals, notifications, and resolutions.

**User Story:** As a merchant, I want to create custom automation rules for different return scenarios, so that my team spends less time on repetitive decisions.

**Acceptance Criteria:**
- Visual rule builder with if-then logic
- Trigger conditions: return reason, order value, product type, customer history, return count
- Actions: auto-approve, auto-reject, route to team member, send custom notification, apply restocking fee
- Rules can be prioritized (first match wins)
- Starter plan ($9/mo) and above

---

#### F21: Return Fraud Detection

**Description:** Flag suspicious returns based on patterns.

**User Story:** As a merchant, I want to be alerted about potentially fraudulent returns, so that I can review them manually before approving.

**Acceptance Criteria:**
- Fraud score calculated per return request (0-100)
- Factors: return frequency, customer return history, high-value items, bracketing patterns, new customer + immediate return
- High-risk returns flagged for manual review (bypass auto-approve)
- Configurable fraud thresholds
- Pro plan ($29/mo) and above

---

#### F22: Product-Level Return Analytics

**Description:** Return rate per product/variant with reason breakdown and actionable insights.

**User Story:** As a merchant, I want to see which products have the highest return rates and why, so that I can fix product issues and reduce returns.

**Acceptance Criteria:**
- Product-level return rate (returns / units sold)
- Variant-level breakdown (e.g., "Size M returned 3x more than Size L")
- Return reason analysis per product
- Trend over time
- Actionable suggestions (e.g., "Consider updating size chart for Product X")
- Pro plan ($29/mo) and above

---

#### F23: Green Returns (Keep the Item)

**Description:** Allow customers to keep low-value items instead of shipping back.

**User Story:** As a merchant, I want customers to keep low-value returned items, so that I save on reverse shipping costs for items that cost less to replace than to ship back.

**Acceptance Criteria:**
- Configure value threshold (items below threshold = keep the item)
- Customer informed they can keep the item during return flow
- Refund or store credit issued immediately without waiting for return shipment
- Track cost savings from green returns
- Available on the Free plan

---

#### F24: QR Code Returns (Box-Free)

**Description:** Generate QR codes for carrier drop-off without printing labels.

**User Story:** As a customer, I want to return my item at a carrier location using just a QR code on my phone, so that I don't need to print a label or find a box.

**Acceptance Criteria:**
- Generate QR code linked to return and carrier
- Display QR code in return confirmation and email
- Compatible with USPS, FedEx, UPS drop-off locations
- Tracking updates when QR code scanned at drop-off
- Pro plan ($29/mo) and above

---

#### F25: Customer Blocklist

**Description:** Block known abusive returners from using self-service returns.

**User Story:** As a merchant, I want to block serial abusive returners from the self-service portal, so that I can require them to contact support instead.

**Acceptance Criteria:**
- Add customers to blocklist by email or customer ID
- Blocklisted customers see "Contact support" instead of return form
- Auto-blocklist based on configurable thresholds (e.g., >5 returns in 60 days)
- Available on the Free plan

---

#### F26: Shopify Flow Integration

**Description:** Trigger Shopify Flow automations from return events.

**User Story:** As a merchant, I want return events to trigger my Shopify Flow automations, so that I can connect returns to my existing workflows.

**Acceptance Criteria:**
- Trigger events: return requested, approved, rejected, received, refunded, exchange created
- Pass return data (customer, product, reason, value) to Flow
- Starter plan ($9/mo) and above

---

### P2 - Growth & Enterprise (Months 4-12, Weeks 25-52)

| # | Feature | Complexity | Target Segment | Plan |
|---|---------|-----------|----------------|------|
| F27 | Multi-warehouse routing | High | Mid-Market+ | Enterprise ($99) |
| F28 | Cross-border returns | High | Mid-Market+ | Enterprise ($99) |
| F29 | In-store returns (POS) | High | Shopify Plus | Enterprise ($99) |
| F30 | Warranty management | High | Mid-Market+ | Enterprise ($99) |
| F31 | API access (REST/GraphQL) | Medium | Mid-Market+ | Pro ($29) |
| F32 | ERP integrations (NetSuite, SAP) | High | Shopify Plus | Enterprise ($99) |
| F33 | 3PL integrations (ShipBob, FBA) | Medium-High | Mid-Market+ | Enterprise ($99) |
| F34 | Helpdesk integrations (Gorgias, Zendesk) | Medium | SMB+ | Pro ($29) |
| F35 | White-label portal (remove Avada branding) | Low | Mid-Market+ | Pro ($29) |
| F36 | Advanced analytics & custom reports | High | Mid-Market+ | Enterprise ($99) |
| F37 | AI-powered return prevention | Very High | Mid-Market+ | Enterprise ($99) |
| F38 | SMS notifications | Low-Medium | SMB+ | Starter ($9) |
| F39 | Gift returns | Medium | All | Free |
| F40 | Partial returns (bundles) | Medium | Mid-Market+ | Starter ($9) |

---

## 6. Pricing Strategy

### Proposed Pricing Tiers

| Plan | Price/mo | Annual (20% off) | Returns/Month | Overage | Target Segment |
|------|----------|-------------------|--------------|---------|----------------|
| **Free** | $0 | -- | 50 | N/A | Solo operators, early-stage SMB |
| **Starter** | $9 | $86.40/yr ($7.20/mo) | 150 | $0.25/return | Growing SMB |
| **Pro** | $29 | $278.40/yr ($23.20/mo) | 500 | $0.50/return | Scaling SMB, Mid-Market |
| **Enterprise** | $99 | $950.40/yr ($79.20/mo) | 2,000 | $0.75/return | Mid-Market, Shopify Plus |

### Feature Availability by Plan

| Feature | Free | Starter ($9) | Pro ($29) | Enterprise ($99) |
|---------|------|-------------|-----------|-------------------|
| Self-service portal | Yes | Yes | Yes | Yes |
| Return policies | Yes | Yes | Yes | Yes |
| Auto-approve | Yes | Yes | Yes | Yes |
| Refund processing | Yes | Yes | Yes | Yes |
| Store credit | Yes | Yes | Yes | Yes |
| Variant exchange | Yes | Yes | Yes | Yes |
| Email notifications | Yes | Yes | Yes | Yes |
| Return tracking | Yes | Yes | Yes | Yes |
| Custom branding | Yes | Yes | Yes | Yes |
| Basic analytics | Yes | Yes | Yes | Yes |
| Multi-language | 5 languages | 10 languages | Unlimited | Unlimited |
| Green returns | Yes | Yes | Yes | Yes |
| Customer blocklist | Yes | Yes | Yes | Yes |
| Quick-start wizard | Yes | Yes | Yes | Yes |
| Cross-product exchange | -- | Yes | Yes | Yes |
| Bonus credit for exchange | -- | Yes | Yes | Yes |
| SMS notifications | -- | Yes | Yes | Yes |
| Fraud alerts | -- | Yes | Yes | Yes |
| Shopify Flow | -- | Yes | Yes | Yes |
| Advanced policy rules | -- | Yes | Yes | Yes |
| Instant exchange | -- | -- | Yes | Yes |
| Shop Now flow | -- | -- | Yes | Yes |
| Product-level analytics | -- | -- | Yes | Yes |
| QR code returns | -- | -- | Yes | Yes |
| White-label portal | -- | -- | Yes | Yes |
| Helpdesk integrations | -- | -- | Yes | Yes |
| API access | -- | -- | Yes | Yes |
| Multi-warehouse routing | -- | -- | -- | Yes |
| Cross-border returns | -- | -- | -- | Yes |
| ERP integrations | -- | -- | -- | Yes |
| Custom reports | -- | -- | -- | Yes |
| AI return prevention | -- | -- | -- | Yes |
| Dedicated support | -- | -- | -- | Yes |

### Competitor Pricing Comparison

| Feature | Avada | Cheapest Competitor Equivalent | Avada Savings |
|---------|-------|-------------------------------|---------------|
| 50 returns/mo + exchange + store credit | $0 (Free) | EcoReturns $29/mo (100 returns but no exchange on free) | 100% |
| 150 returns + cross-product exchange | $9 (Starter) | Return Prime Grow $20 (60 returns) | 55% cheaper, 2.5x returns |
| 500 returns + instant exchange + analytics | $29 (Pro) | ReturnGO Premium $147 (110 returns) | 80% cheaper, 4.5x returns |
| 2,000 returns + enterprise features | $99 (Enterprise) | Loop Advanced $340 (unlimited) | 71% cheaper |

### Pricing Principles

1. **No hidden fees**: All costs visible upfront. No seat-based charges.
2. **Predictable overages**: Per-return overage clearly stated ($0.25-$0.75 vs. competitors' $0.50-$1.25).
3. **Features unlock value, not access**: Core features on free plan. Paid plans add depth and volume.
4. **Easy cancellation**: Month-to-month billing. Cancel anytime with one click. No retention calls.
5. **Annual discount**: 20% for annual billing.

---

## 7. Success Metrics / KPIs

### Phase 1: MVP Launch (Months 1-3)

| KPI | Target | Why It Matters |
|-----|--------|---------------|
| Total installs | 1,500+ | Validates market demand |
| App Store rating | 4.8+ | Drives organic discovery |
| Setup completion rate | >70% | Validates quick-start wizard |
| First return processed within 7 days | >50% of installs | Measures activation |
| Support tickets per install | <0.3 | Validates self-serve design |
| D7 retention | >60% | Product stickiness |
| Reviews collected | 40-60 | Social proof for ranking |

### Phase 2: MMP Growth (Months 4-12)

| KPI | Target | Why It Matters |
|-----|--------|---------------|
| Monthly installs | 800+ | Sustainable growth trajectory |
| Free-to-paid conversion | >15% | Revenue model validation |
| Monthly paid churn | <5% | Product-market fit signal |
| ARPU (paid) | >$20 | Pricing strategy validation |
| NPS score | >50 | Customer satisfaction |
| Exchange adoption rate | >25% of returns | Core value proposition |
| MRR | $20K+ by month 12 | Revenue trajectory |

### Phase 3: Scale (Year 2-3)

| KPI | Target | Why It Matters |
|-----|--------|---------------|
| Total installs | 30K+ (Y2), 70K+ (Y3) | Market share |
| ARR | $1.85M (Y2), $7.5M (Y3) | Revenue growth |
| Exchange adoption | >40% of returns | Revenue retention story |
| Revenue retained per merchant | >$500/mo via exchanges | ROI proof |
| Competitive win rate | >30% of switchers | Positioning validation |
| Monthly paid churn | <4% (Y2), <3% (Y3) | Retention maturity |

---

## 8. Competitive Positioning

### Market Landscape (Top 5 by Category Rank, April 2026)

| Rank | App | Rating | Reviews | Free Plan | Threat |
|------|-----|--------|---------|-----------|--------|
| 1 | ParcelWILL Returns & Exchange | 4.9 | 427 | Yes (6 returns) | HIGH |
| 3 | AfterShip Returns & Exchanges | 4.7 | 1,248 | Yes (shopper-funded) | HIGH |
| 5 | Redo | 4.9 | 512 | Yes (unlimited, subsidized) | MEDIUM-HIGH |
| 6 | Loop Returns & Exchanges | 4.7 | 414 | Yes (limited) | MEDIUM |
| 9 | Return Prime: Return & Exchange | 4.8 | 683 | Yes (5 returns) | HIGH |

### How Avada Differentiates

| Differentiator | Why It Matters | Competitor Comparison |
|----------------|----------------|----------------------|
| **50 free returns/month** | 10x more generous than nearest competitor | AfterShip: 3, Return Prime: 5, ParcelWILL: 6, EcoReturns: 20 |
| **Store credit + variant exchange on free** | Revenue retention from day one | Competitors gate behind $20-$60/month plans |
| **Auto-approve on free** | Automation without paying | Most competitors require paid plans |
| **10-minute quick-start wizard** | Eliminates #1 churn risk (onboarding) | No competitor offers guided auto-setup |
| **Instant exchange at $29/mo** | 91% cheaper than only competitor (Loop $340) | Only Loop offers this feature |
| **Fraud detection at $29/mo** | Enterprise security at SMB price | Only Loop offers at $155+ |
| **Product-level analytics at $29/mo** | Actionable insights for catalog optimization | ReturnGO: $147+, Loop: $155+ |
| **Transparent pricing** | No hidden fees, easy cancellation | AfterShip: billing nightmares, Loop: contract traps |

### Blue Ocean Features (No Competitor Has)

1. **AI Return Prevention Engine**: Predict likely returns before they happen based on order patterns.
2. **Return Reason to Product Improvement Loop**: Aggregate return reasons per product and generate actionable improvement suggestions.
3. **One-Click Migration from Competitors**: Import all policies, templates, and historical data from AfterShip, Loop, ReturnGO, or Return Prime.
4. **Return-Aware Product Recommendations**: During exchange flow, recommend products based on return reason and purchase history.
5. **Embedded Return Prevention Widgets**: Theme extensions that display return-data-driven messaging on product pages.

---

## 9. Risks & Mitigations

| # | Risk | Probability | Impact | Overall | Mitigation |
|---|------|------------|--------|---------|------------|
| 1 | **Shopify native returns improvement** | Medium (30%) | High | HIGH | Focus on features Shopify won't build: exchange flows, analytics, fraud detection. Monitor Shopify Editions announcements. |
| 2 | **Competitor pricing war** | Medium (40%) | Medium | MEDIUM | Move fast on differentiated features. Build switching costs through data and integration depth. |
| 3 | **Exchange technical complexity** | Medium-High (50%) | Medium | MEDIUM | Build incrementally: variant first, then cross-product, then instant. Budget extra engineering time. Study Loop's approach. |
| 4 | **Shipping label complexity** | High (60%) | Medium | MEDIUM | Use EasyPost/Shippo APIs rather than direct carrier integrations. Start with top 3-5 carriers covering 90% of US/EU volume. |
| 5 | **Support cost scaling** | High (60%) | Medium | MEDIUM | Self-service onboarding, comprehensive help center, in-app guidance. Limit live support to paid plans. |
| 6 | **Return fraud liability** | Low-Medium (20%) | Low | LOW | Build fraud detection in P1. Provide fraud alerts on lower tiers. Clear documentation on shared responsibility. |

---

## 10. Technical Architecture Summary

### Stack Overview

| Layer | Technology |
|-------|-----------|
| **Admin App** | React + Polaris v12+, Shopify App Bridge, embedded in Shopify Admin |
| **Customer Portal** | Theme App Extension (Liquid + JS), embedded in merchant storefront |
| **Backend** | Firebase Cloud Functions (Node.js 20) |
| **Database** | Firestore (multi-tenant, multi-region) |
| **File Storage** | Cloud Storage (return photos, label PDFs) |
| **Analytics** | BigQuery (return events, product insights, financial reports) |
| **Async Processing** | Cloud Tasks + Pub/Sub (webhook processing, background jobs) |
| **Caching** | Redis / Memorystore (rate limiting, session cache) |
| **Shipping** | EasyPost / Shippo API (multi-carrier labels) |
| **Email** | SendGrid / Mailgun (transactional notifications) |
| **SMS** | Twilio / MessageBird |

### Key Architectural Decisions

1. **Webhook-first processing**: All Shopify webhooks respond within 1 second (HMAC verify + queue to Pub/Sub), with heavy processing in background workers.
2. **Multi-tenant Firestore**: Each shop is a top-level document with subcollections for returns, items, exchanges, refunds, labels, notifications, and audit logs.
3. **TTL-based data cleanup**: Auto-delete notifications after 90 days, audit logs after 1 year, completed returns after 2 years.
4. **Feature flagging by plan**: Plan-based access control at the API level, not just the UI.

### Key Entities

- **SHOPS**: Store configuration, branding, plan info
- **RETURN_POLICIES**: Rules, windows, eligibility criteria
- **RETURN_REQUESTS**: Core return records with full lifecycle status
- **RETURN_ITEMS**: Individual items within a return
- **EXCHANGES**: Exchange records (variant, cross-product, instant)
- **REFUNDS**: Refund records (original payment, store credit, partial)
- **SHIPPING_LABELS**: Label and tracking data
- **NOTIFICATIONS**: Email/SMS delivery records
- **AUDIT_LOGS**: All status changes and actions

For full diagrams, see: `08-diagrams.md` (System Architecture, State Machine, Exchange Flow, Customer Portal Flow, Data Flow, ERD, Deployment Architecture, Merchant Admin Flow).

---

## 11. Phases & Timeline

### Phase 1: MVP (Weeks 1-12)

| Week | Milestone | Team Focus |
|------|-----------|------------|
| 1-2 | Architecture design, Shopify API integration planning, database schema, Theme App Extension scaffold | All devs |
| 3-4 | Customer return portal (order lookup, item selection, reason collection), Admin dashboard skeleton | 2 FE + 1 BE |
| 5-6 | Policy engine, auto-approve rules, return reason collection, photo upload | BE lead + 1 FE |
| 7-8 | Refund processing (original payment + store credit), gift card integration | BE lead |
| 9-10 | Variant exchange flow, email notification templates, return tracking integration | 2 FE + 1 BE |
| 11 | Quick-start wizard, branding customization, multi-language support | All devs |
| 12 | QA testing, bug fixes, Shopify App Store submission, beta tester onboarding | All + QA |

**MVP Launch Deliverables:** Self-service portal, policy rules, auto-approve, refunds, store credit, variant exchange, email notifications, return tracking, basic analytics, 5-language support, custom branding, quick-start wizard.

### Phase 2: Differentiation (Weeks 13-24)

| Week | Milestone |
|------|-----------|
| 13-15 | Cross-product exchange, Shop Now exchange flow |
| 16-18 | Exchange bonus credit, green returns, customer blocklist |
| 19-21 | Product-level analytics, return reason insights dashboard |
| 22-24 | Fraud detection (basic scoring), QR code returns, SMS notifications, Shopify Flow integration |

### Phase 3: Scale (Weeks 25-52)

| Week | Milestone |
|------|-----------|
| 25-30 | Instant exchange, advanced workflow rules engine |
| 31-36 | Helpdesk integrations (Gorgias, Zendesk), API access, white-label portal |
| 37-42 | Multi-warehouse routing, cross-border returns |
| 43-48 | Advanced analytics, warranty management, gift returns |
| 49-52 | AI return prevention (beta), ERP integrations |

### Resource Plan

| Phase | Engineers | QA | Timeline |
|-------|----------|----|----------|
| MVP (P0) | 3 | 1 | 12 weeks |
| MMP (P1) | 3-4 | 1 | 12 weeks |
| Growth (P2) | 5-7 | 1-2 | 28 weeks |

---

## 12. Open Questions

- [ ] **Carrier API choice**: EasyPost vs. Shippo vs. ShipStation for label generation. Need to evaluate pricing, carrier coverage, and API quality.
- [ ] **Free plan sustainability**: At 50 free returns/month, what is the hosting/API cost per free merchant? Need cost modeling to validate unit economics.
- [ ] **Instant exchange payment hold**: Which Shopify API supports placing a temporary hold on customer payment methods? Need technical spike.
- [ ] **Store credit implementation**: Shopify gift cards vs. draft orders vs. discount codes for store credit -- which approach is most reliable and scalable?
- [ ] **Theme App Extension limits**: Can we embed both the return portal AND status tracking AND return prevention widgets in a single Theme App Extension, or do we need multiple?
- [ ] **Cross-border customs**: How do we handle customs documentation for international returns? Partner with a customs API or build in-house?
- [ ] **Data residency**: Do we need regional data storage for EU (GDPR) merchants, or is Firestore multi-region sufficient?
- [ ] **Redo competitive response**: If Redo continues to offer free unlimited returns subsidized by their funding, how do we position against "free unlimited" with our "free 50" model?
- [ ] **Support model**: Live chat for paid plans only? Email-only for free? What SLA targets per plan?
- [ ] **Migration tooling priority**: Should one-click migration from competitors be a P1 or P2 feature? High strategic value but potentially complex.

---

## Appendices

### A. Financial Projections Summary

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Total installs | 10,500 | 34,500 | 71,500 |
| Paid users (EOY) | 945 | 5,520 | 17,875 |
| Annual revenue | $111,540 | $1,196,160 | $5,555,025 |
| Annual costs | $400,000 | $780,000 | $1,260,000 |
| Net income | -$288,460 | +$416,160 | +$4,295,025 |
| ARR (EOY) | $249,480 | $1,854,720 | $7,507,500 |
| LTV:CAC | 13:1 | 32:1 | 69:1 |

### B. Research References

| File | Contents |
|------|----------|
| 01-market-pain-points.md | Market analysis, merchant pain points with quotes, whitespace opportunities |
| 02-feature-matrix.md | Complete feature list, competitive comparison, blue ocean features |
| 03-target-audience.md | Personas, segment sizing, customer journey, acquisition strategy |
| 04-opportunity-scoring.md | Feature scoring, Go/No-Go assessment, financial projections, roadmap |
| 05-competitor-analysis.md | Detailed profiles of 11 competitors with strengths/weaknesses |
| 06-competitor-pricing.md | Pricing tiers, feature-per-tier comparison, pricing gap analysis |
| 07-aso-keywords.md | Keyword research, app listing strategy, launch plan |
| 08-diagrams.md | 8 technical diagrams (architecture, state machine, flows, ERD, deployment) |
