# Product Requirements Document (PRD)
# Avada Order Editing

---

## 1. Overview

| Field | Value |
|-------|-------|
| **Product Name** | Avada Order Editing |
| **Version** | 1.0 (MVP) |
| **Author** | Avada Product Team |
| **Date** | 2026-03-31 |
| **Status** | PRD Review |
| **Platform** | Shopify App (Embedded) |
| **Target Launch** | Q2 2026 |

---

## 2. Executive Summary

Avada Order Editing is a Shopify app that empowers merchants to let their customers self-edit orders after checkout -- changing shipping addresses, swapping product variants, adjusting quantities, and cancelling orders -- all without contacting support. The app also provides merchants with a powerful admin interface for staff-side editing, configurable edit rules, and analytics on edit activity and revenue impact. By targeting the underserved SMB segment with a comprehensive feature set at $9.99-$29.99/mo (where competitors charge $39-$599/mo), Avada Order Editing aims to capture significant market share in a category with ~1.32M addressable Shopify stores. The app is projected to reach ~$2.5M ARR by Year 3.

---

## 3. Problem Statement

Shopify does not allow customers to edit their own orders natively. Once payment is completed, customers must contact the merchant's support team for any change -- even a simple typo in a shipping address. This creates a massive operational burden and customer friction.

### The Problem in Numbers

- **30%** of shoppers make at least one mistake at checkout
- **60%** of support tickets relate to order modifications
- Each modification costs **$8-$15** and takes 5-15 minutes to resolve
- **69%** of customers prefer self-service resolution
- **20-25%** of ecommerce returns are due to customer error, not product issues

### Merchant Voices

> "I spend an hour every day just changing addresses and swapping sizes."
> -- SMB merchant (Shopify Community)

> "Our team is about to vote on changing platforms because of this."
> -- Local delivery merchant (Shopify Community)

> "I lost a large amount of money because it decided to remove the tax from an edited order."
> -- Cleverific user (App Store review)

> "DO NOT INSTALL -- the developers have abandoned this app."
> -- Cleverific user (App Store review)

> "This then duplicated the customers order and charged them again!"
> -- Editify user (App Store review)

### Why Existing Solutions Fall Short

1. **Too expensive**: Quality apps start at $39/mo, pricing out SMB merchants
2. **Buggy and unreliable**: Duplicate charges, broken tax calculations, lost inventory
3. **Abandoned apps**: Several popular apps have been abandoned by developers
4. **Missing features**: No app covers local delivery editing, B2B, or subscription editing well
5. **Poor support**: Merchants report waiting days or weeks for responses

---

## 4. Unique Value Proposition

**"The most affordable, reliable order editing app on Shopify -- built for merchants who cannot afford $99/mo but refuse to compromise on quality."**

### Why Merchants Choose Avada

| Differentiator | Avada | Competitors |
|----------------|-------|-------------|
| **Price** | $9.99-$29.99/mo for core features | $39-$599/mo |
| **Free tier** | 50 edits/mo forever | None or 7-day trial |
| **Reliability** | Built on Firebase with atomic transactions | Reports of duplicate charges, tax bugs |
| **Customer self-service** | Full self-service from Day 1 | Often admin-only or limited |
| **Local delivery editing** | P2 roadmap, unique feature | Not available |
| **AI edit suggestions** | P2 roadmap, unique feature | Not available |
| **Cancellation retention** | P1 roadmap with offers | Basic or not available |
| **Support** | Avada's established support team | Abandoned or slow |
| **Avada ecosystem** | Integration with Avada's suite of apps | Standalone |

---

## 5. Target Audience

### Market Segments

| Segment | Store Count | Budget | Current Pain | Priority |
|---------|------------|--------|--------------|----------|
| **SMB** (1-10 employees) | ~1M stores | $10-$50/mo | No budget for $99/mo apps; handle edits manually | Primary |
| **Mid-Market** (11-100 employees) | ~150K stores | $50-$200/mo | Need automation + analytics; current apps lack features | Secondary |
| **Shopify Plus** (100+ employees) | ~50K stores | $200-$500/mo | Need B2B, subscriptions, bulk editing, API access | Tertiary |

### Personas

#### Sarah -- SMB Store Owner
- **Store**: Fashion boutique, 50-200 orders/month
- **Team**: Solo or 1-2 part-time staff
- **Pain**: Spends 1+ hour daily handling address changes and size swaps via email
- **Budget**: $10-$20/mo maximum
- **Goal**: Let customers fix their own mistakes without contacting her
- **Tech comfort**: Low-medium; needs plug-and-play setup
- **Success metric**: Support ticket reduction

#### Mike -- Mid-Market Operations Manager
- **Store**: Home goods, 500-2,000 orders/month
- **Team**: 5-10 person support team
- **Pain**: Support team overwhelmed with repetitive edit requests; no visibility into edit patterns
- **Budget**: $30-$50/mo
- **Goal**: Automate edits, reduce support load, understand what products get edited most
- **Tech comfort**: Medium-high; comfortable with integrations
- **Success metric**: Support cost reduction + edit analytics

#### Jessica -- Shopify Plus Merchant
- **Store**: Multi-brand enterprise, 5,000+ orders/month
- **Team**: Dedicated ops + dev team
- **Pain**: Needs B2B draft order editing, subscription modifications, bulk operations
- **Budget**: $100-$500/mo
- **Goal**: Full automation with Shopify Flow, custom workflows, API access
- **Tech comfort**: High; has developers on staff
- **Success metric**: Operational efficiency + revenue from upsells

#### Alex -- Budget-Conscious New Merchant
- **Store**: Just launched, 10-50 orders/month
- **Team**: Solo
- **Pain**: Manually editing orders in Shopify admin is tedious; cannot justify paid app
- **Budget**: $0 (Free tier)
- **Goal**: Basic self-service editing to appear professional
- **Tech comfort**: Low; needs zero-config setup
- **Success metric**: Customer satisfaction

---

## 6. User Stories

### MVP User Stories (P0)

#### Customer Self-Service

| ID | Story | Priority | Persona |
|----|-------|----------|---------|
| US-01 | As a **customer**, I want to edit my shipping address after placing an order, so that my package arrives at the correct location. | P0 | All |
| US-02 | As a **customer**, I want to swap a product variant (size, color) on my order, so that I get the right item without contacting support. | P0 | All |
| US-03 | As a **customer**, I want to change the quantity of items in my order, so that I can add or remove items before shipment. | P0 | All |
| US-04 | As a **customer**, I want to cancel my order within the allowed time window, so that I can get a refund without waiting for support. | P0 | All |
| US-05 | As a **customer**, I want to see a clear summary of my changes and any price difference before confirming, so that I am not surprised by charges. | P0 | All |
| US-06 | As a **customer**, I want to access order editing from the Order Status Page, so that I can make changes easily after checkout. | P0 | All |
| US-07 | As a **customer**, I want to access order editing from the Thank You Page, so that I can fix mistakes immediately after placing my order. | P0 | All |

#### Merchant Admin

| ID | Story | Priority | Persona |
|----|-------|----------|---------|
| US-08 | As a **merchant**, I want to configure which changes customers can make (address, items, quantity, cancel), so that I maintain control over my orders. | P0 | Sarah, Mike |
| US-09 | As a **merchant**, I want to set a time window for how long after order placement customers can make edits, so that edits do not interfere with fulfillment. | P0 | Sarah, Mike |
| US-10 | As a **merchant**, I want edits to automatically handle refunds and additional charges, so that I do not have to process payments manually. | P0 | All |
| US-11 | As a **merchant**, I want inventory to be automatically restocked when items are removed or swapped, so that my stock levels stay accurate. | P0 | All |
| US-12 | As a **merchant**, I want customers and staff to receive email notifications when edits are made, so that everyone stays informed. | P0 | All |
| US-13 | As a **merchant**, I want to edit orders myself from the admin panel, so that I can handle phone/email requests quickly. | P0 | All |
| US-14 | As a **merchant**, I want a dashboard showing edit activity, so that I can see how the app is performing. | P0 | Mike |

### MMP User Stories (P1)

| ID | Story | Priority | Persona |
|----|-------|----------|---------|
| US-15 | As a **merchant**, I want Google address validation on edits, so that customers cannot enter invalid addresses. | P1 | Mike |
| US-16 | As a **merchant**, I want to show product recommendations during edits, so that I can generate additional revenue (post-purchase upsell). | P1 | Mike, Jessica |
| US-17 | As a **merchant**, I want to offer store credit instead of cash refunds, so that I retain revenue. | P1 | Sarah, Mike |
| US-18 | As a **merchant**, I want Shopify Flow integration, so that I can build custom automation around order edits. | P1 | Jessica |
| US-19 | As a **merchant**, I want an analytics dashboard with charts, so that I can see trends in edits, top edited products, and revenue impact. | P1 | Mike, Jessica |
| US-20 | As a **customer**, I want to see a retention offer when I try to cancel, so that I might keep my order with a discount. | P1 | All |
| US-21 | As a **merchant**, I want multi-language support, so that my international customers can self-edit in their language. | P1 | Mike, Jessica |

### Growth User Stories (P2)

| ID | Story | Priority | Persona |
|----|-------|----------|---------|
| US-22 | As a **merchant**, I want AI-powered edit suggestions based on order patterns, so that common edits are pre-filled. | P2 | Jessica |
| US-23 | As a **merchant**, I want to edit subscription orders, so that subscribers can modify upcoming deliveries. | P2 | Jessica |
| US-24 | As a **merchant**, I want to bulk-edit multiple orders at once from the admin, so that my team can process batch changes efficiently. | P2 | Jessica |
| US-25 | As a **merchant**, I want to edit local delivery and pickup orders (date, time slot, address), so that my local customers have flexibility. | P2 | Mike |
| US-26 | As a **merchant**, I want B2B/wholesale order editing with custom pricing, so that my wholesale customers can modify draft orders. | P2 | Jessica |

---

## 7. Feature Specification

### P0 -- MVP Features (Launch)

| Feature | Description | Customer | Merchant | Notes |
|---------|-------------|:--------:|:--------:|-------|
| **Address Editing** | Edit shipping address on unfulfilled orders | Yes | Yes | Validate country/zip format |
| **Item Swap** | Swap variant (size, color, etc.) within the same product | Yes | Yes | Recalculate price difference |
| **Quantity Change** | Increase or decrease item quantities | Yes | Yes | Respect inventory availability |
| **Order Cancellation** | Cancel entire order with automatic refund | Yes | Yes | Within time window |
| **Item Removal** | Remove individual line items | Yes | Yes | Auto-refund removed items |
| **Auto Refund/Charge** | Automatically process price difference | -- | Auto | Use Shopify Payment API |
| **Inventory Restock** | Restock inventory for removed/swapped items | -- | Auto | Real-time stock update |
| **Time Window Controls** | Configurable edit window (e.g., 30 min, 1 hour, until fulfillment) | -- | Config | Per-store setting |
| **Edit Rules** | Configure which edit types are allowed | -- | Config | Global and per-collection |
| **Order Status Page Widget** | "Edit Order" button on order status page | Yes | -- | Theme App Extension |
| **Thank-You Page Widget** | "Edit Order" banner on post-checkout page | Yes | -- | Theme App Extension |
| **Edit Order Page** | Full editing interface for customers | Yes | -- | Responsive, branded |
| **Edit Confirmation** | Summary of changes with price diff before confirming | Yes | -- | Clear cost breakdown |
| **Email Notifications** | Notify customer and merchant on edit | Yes | Yes | Customizable templates |
| **Admin Order Editing** | Staff-side editing within Shopify admin | -- | Yes | Embedded Polaris UI |
| **Dashboard** | Overview of edits, savings | -- | Yes | Basic metrics |
| **Mobile Responsive** | All customer-facing screens work on mobile | Yes | -- | Mobile-first design |

### P1 -- MMP Features (Month 2-3)

| Feature | Description | Notes |
|---------|-------------|-------|
| **Google Address Validation** | Validate and suggest addresses via Google API | Reduce failed deliveries |
| **Post-Purchase Upsell** | Recommend products during edit flow | Revenue attribution tracking |
| **Store Credit Refund** | Offer store credit instead of cash refund | Retain revenue |
| **Shopify Flow Integration** | Triggers and actions for Flow automations | "Order Edited", "Order Cancelled" triggers |
| **Analytics Dashboard** | Charts: edits over time, top edited products, revenue saved | BigQuery-powered |
| **Cancellation Retention Flow** | Show retention offer (discount, store credit) before confirming cancel | Reduce cancellation rate |
| **Multi-Language** | Translate customer-facing UI | Support top 10 languages |
| **Custom Branding** | Customize colors, logo on edit pages | Match merchant brand |

### P2 -- Growth Features (Month 4-6)

| Feature | Description | Notes |
|---------|-------------|-------|
| **AI Edit Suggestions** | Pre-fill common edits based on patterns | Blue ocean differentiator |
| **Subscription Editing** | Edit upcoming subscription deliveries | Integration with subscription apps |
| **B2B/Wholesale Editing** | Edit draft orders with custom pricing | Shopify Plus feature |
| **Bulk Staff Editing** | Batch edit multiple orders at once | Blue ocean differentiator |
| **Local Delivery Editing** | Edit delivery date, time slot, address for local orders | Blue ocean differentiator |
| **Multi-Currency** | Handle edits across currencies | International merchants |
| **POS Integration** | Edit POS orders | Omnichannel merchants |
| **Cross-Sell During Edit** | Show complementary products with revenue attribution | Revenue generation |
| **Pre-Order/Backorder Editing** | Edit pre-orders before fulfillment | Niche differentiator |

---

## 8. Pricing Strategy

### Tier Breakdown

| Tier | Price | Edit Limit | Target Persona | Key Features |
|------|-------|-----------|----------------|--------------|
| **Free** | $0/mo | 50 edits/mo | Alex (New merchant) | Customer self-service (address, items, quantity, cancel), Order Status Page widget, basic email notifications |
| **Starter** | $9.99/mo | 200 edits/mo | Sarah (SMB) | Everything in Free + Thank-You Page widget, custom time windows, edit rules per collection, branding customization |
| **Growth** | $19.99/mo | Unlimited | Sarah/Mike | Everything in Starter + unlimited edits, analytics dashboard, Google address validation, post-purchase upsell, store credit refund, multi-language |
| **Pro** | $29.99/mo | Unlimited | Mike (Mid-Market) | Everything in Growth + Shopify Flow integration, cancellation retention flow, priority email support, advanced analytics |
| **Business** | $49.99/mo | Unlimited | Mike/Jessica | Everything in Pro + 3PL integration, bulk staff editing, advanced automation rules, local delivery editing, dedicated onboarding |
| **Enterprise** | $99.99/mo | Unlimited | Jessica (Plus) | Everything in Business + B2B editing, subscription editing, API access, Slack notifications, custom integrations, SLA support |

### Pricing Rationale

- **Free tier** creates acquisition funnel and builds reviews (50 edits covers ~50 orders/month)
- **$9.99 Starter** fills the gap where NO quality app exists below $39/mo
- **$19.99 Growth** is the sweet spot for SMB merchants who need unlimited edits
- **$29.99 Pro** captures mid-market merchants who want automation
- **$49.99-$99.99** competes with premium apps at fraction of the cost ($99-$599 competitor range)

### Revenue Model

- Usage-based billing via Shopify App Billing API
- 30-day free trial on all paid plans
- Annual discount: 20% off (2 months free)

---

## 9. Success Metrics (KPIs)

### MVP Launch (Month 1-2)

| Metric | Target | Measurement |
|--------|--------|-------------|
| App installs | 500+ | Shopify Partner Dashboard |
| Free-to-paid conversion | 8-12% | Internal analytics |
| Average rating | 4.8+ stars | Shopify App Store |
| Median setup time | < 5 minutes | Onboarding funnel tracking |
| Customer self-service adoption | 40%+ of edits are customer-initiated | App analytics |
| Edit success rate | 95%+ | No failed/stuck edits |
| Webhook response time | < 2 seconds (p95) | Cloud monitoring |
| Zero critical bugs | 0 duplicate charges, 0 tax errors | Error monitoring |

### MMP Phase (Month 3-6)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Total installs | 5,000+ | Shopify Partner Dashboard |
| Paying merchants | 500+ | Billing records |
| Monthly recurring revenue | $5K-$10K | Financial reporting |
| Churn rate | < 5% monthly | Cohort analysis |
| Support ticket reduction (merchant-reported) | 40-60% | Survey + analytics |
| Upsell revenue generated | $50K+ across all merchants | Revenue attribution |
| Cancellation retention rate | 15-25% of cancellations retained | Retention flow analytics |
| App Store reviews | 50+ reviews | Shopify App Store |

### Growth Phase (Month 6-12)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Total installs | 20,000+ | Shopify Partner Dashboard |
| Paying merchants | 2,400+ | Billing records |
| ARR | $500K-$800K | Financial reporting |
| Net Promoter Score | 50+ | In-app survey |
| Market share (by reviews) | Top 5 in category | App Store tracking |
| Average revenue per merchant | $25+/mo | Revenue / paying merchants |

---

## 10. Technical Requirements

### Shopify API Scopes

| Scope | Purpose |
|-------|---------|
| `read_orders` / `write_orders` | Read and edit order details |
| `read_products` / `write_products` | Read product/variant info, manage inventory |
| `read_inventory` / `write_inventory` | Restock inventory on edit |
| `read_customers` | Read customer info for notifications |
| `read_shipping` / `write_shipping` | Manage shipping address changes |
| `read_fulfillments` | Check fulfillment status before allowing edits |
| `read_locales` | Multi-language support |

### Webhooks Required

| Webhook | Purpose |
|---------|---------|
| `orders/create` | Track new orders eligible for editing |
| `orders/updated` | Sync order state changes |
| `orders/cancelled` | Handle external cancellations |
| `orders/fulfilled` | Lock editing on fulfilled orders |
| `orders/partially_fulfilled` | Lock editing on fulfilled line items |
| `app/uninstalled` | Cleanup merchant data |
| `shop/update` | Sync shop settings |

### Shopify APIs Used

| API | Purpose |
|-----|---------|
| **GraphQL Admin API** | Primary API for all order mutations (`orderEditBegin`, `orderEditAddVariant`, `orderEditSetQuantity`, `orderEditCommit`) |
| **REST Admin API** | Fallback for specific operations |
| **App Bridge** | Embedded admin experience, direct API calls |
| **Theme App Extensions** | Order Status Page and Thank-You Page widgets |
| **Scripttag** | Fallback for stores not supporting app blocks |
| **Shopify App Billing API** | Subscription management, usage charges |

### Performance Requirements

| Requirement | Target |
|-------------|--------|
| Edit page load time | < 2 seconds |
| Edit submission response | < 3 seconds |
| Webhook processing | < 5 seconds |
| API availability | 99.9% uptime |
| Concurrent edits per store | Support 10+ simultaneous |
| Data retention | 12 months edit history |

### Infrastructure

- **Backend**: Node.js on Firebase Functions (Gen 2)
- **Database**: Firestore (multi-tenant, scoped by `shopId`)
- **Frontend**: React + Polaris v12+ (embedded admin), Preact (storefront widget)
- **Analytics**: BigQuery for aggregated reporting
- **CDN**: Firebase Hosting for static assets
- **Monitoring**: Cloud Logging + Cloud Monitoring + Error Reporting

---

## 11. Competitive Positioning

### vs. OrderEditing.com ($99-$599/mo)

| Dimension | OrderEditing.com | Avada |
|-----------|-----------------|-------|
| Price | $99-$599/mo | $9.99-$99.99/mo |
| Free tier | No | Yes (50 edits) |
| Features | Most comprehensive | Comparable core, growing |
| **Our angle** | **70-85% cheaper** for equivalent features | |

### vs. AE: Order Editing ($39-$259/mo)

| Dimension | AE | Avada |
|-----------|-----|-------|
| Price | $39-$259/mo | $9.99-$99.99/mo |
| Free tier | No | Yes |
| Reviews | 219 (5.0 stars) | New entrant |
| **Our angle** | **75% cheaper entry point**, free tier for acquisition | |

### vs. Cleverific ($49-$299/mo)

| Dimension | Cleverific | Avada |
|-----------|-----------|-------|
| Price | $49-$299/mo | $9.99-$99.99/mo |
| Rating | 4.6 stars (declining) | Target 4.8+ |
| Issues | Tax bugs, abandoned feel | Built fresh, no legacy |
| **Our angle** | **Reliability + modern stack**, merchants are actively leaving | |

### vs. Orderify ($4.99-$99.99/mo)

| Dimension | Orderify | Avada |
|-----------|---------|-------|
| Price | $4.99-$99.99/mo | $0-$99.99/mo |
| Features | Basic editing only | Comprehensive |
| Self-service | Limited | Full customer self-service |
| **Our angle** | **More features** at similar price, customer self-service | |

### Positioning Summary

```
                    High Price
                       |
          OrderEditing ---- AE: Order Editing
                       |
              Cleverific
                       |
        ---------------+--------------- Feature Rich
                       |
              Revize   |
                       |
          Orderify     |  *** Avada Order Editing ***
                       |  (Best value: rich features, low price)
                    Low Price
```

---

## 12. Risks & Mitigations

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| 1 | **Shopify adds native self-service editing** | Medium | Critical | Focus on advanced features (upsell, retention, analytics) that Shopify is unlikely to build natively. Build switching costs via integrations. |
| 2 | **Competitors lower prices** in response | Medium | High | Maintain feature velocity. Free tier creates moat. Avada ecosystem creates stickiness. |
| 3 | **Duplicate charge / tax bugs** (reputation risk) | Low | Critical | Atomic transactions. Extensive testing. Idempotency keys on all payment operations. Staged rollout. |
| 4 | **Shopify API changes** (breaking changes to order edit API) | Low | High | Pin API versions. Monitor Shopify changelog. Maintain abstraction layer over Shopify APIs. |
| 5 | **Low free-to-paid conversion** | Medium | Medium | Optimize free tier limits (50 edits is enough to demonstrate value but forces upgrade). In-app upgrade prompts at 80% usage. |
| 6 | **Support volume** from free users | High | Medium | Self-service onboarding. In-app help center. AI chatbot for common questions. Community forum. |
| 7 | **Performance at scale** (high-volume stores) | Low | High | Firebase auto-scaling. Rate limiting per store. Queue-based background processing. Load testing before launch. |
| 8 | **Negative reviews from early bugs** | Medium | High | Private beta with 20-50 merchants first. Rapid bug response SLA (< 4 hours). Proactive outreach to early users. |
| 9 | **Slow adoption** in crowded market | Medium | Medium | Aggressive ASO strategy. Free tier for organic growth. Avada cross-promotion. Content marketing. |
| 10 | **Data privacy / GDPR** | Low | High | Minimal data collection. Data retention policies. Merchant data deletion on uninstall. Privacy policy. |

---

## 13. Phases & Timeline

### Phase 1: MVP (Weeks 1-8)

**Goal**: Launch with core customer self-service editing and basic merchant admin.

| Week | Milestone | Deliverables |
|------|-----------|--------------|
| 1-2 | **Foundation** | Project setup, Shopify app scaffolding, Firestore schema, auth/billing, webhook handlers |
| 3-4 | **Core Editing Engine** | Order edit API integration (begin/commit), address editing, item swap, quantity change, cancel, auto refund/charge, inventory restock |
| 5-6 | **Customer UI** | Edit Order Page (storefront), Order Status Page widget, Thank-You Page widget, edit confirmation flow, email notifications |
| 7 | **Admin UI** | Dashboard, edit rules configuration, admin order editing, settings page |
| 8 | **QA + Launch** | End-to-end testing, private beta (20-50 stores), bug fixes, App Store listing, public launch |

### Phase 2: MMP (Month 3-4)

**Goal**: Differentiate with revenue-generating features and automation.

| Month | Milestone | Deliverables |
|-------|-----------|--------------|
| 3 | **Revenue Features** | Post-purchase upsell during edit, store credit refund option, cancellation retention flow |
| 3 | **Reliability** | Google address validation, advanced edit rules (per-product, per-collection) |
| 4 | **Automation** | Shopify Flow integration (triggers + actions), advanced email templates |
| 4 | **Analytics** | Analytics dashboard with BigQuery, edit trends, top edited products, revenue impact |
| 4 | **Internationalization** | Multi-language support (top 10 languages), custom branding |

### Phase 3: Growth (Month 5-12)

**Goal**: Expand to premium segments and blue ocean features.

| Month | Milestone | Deliverables |
|-------|-----------|--------------|
| 5-6 | **AI Features** | AI edit suggestions, smart product recommendations |
| 5-6 | **Local Delivery** | Edit delivery date/time/address for local orders |
| 7-8 | **Enterprise** | B2B/wholesale editing, subscription order editing, bulk staff editing |
| 9-10 | **Ecosystem** | Multi-currency, POS integration, 3PL integrations |
| 11-12 | **Scale** | API access for developers, Slack notifications, advanced automation, performance optimization |

---

## 14. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | Should we support editing fulfilled orders (address change only) or strictly unfulfilled? | Product | Open |
| 2 | What is the maximum order age for editing? (Competitors allow 60 days; merchants want unlimited) | Product | Open |
| 3 | Should billing address editing be included in MVP? (Shopify API limitations apply) | Engineering | Open |
| 4 | How do we handle orders with custom discounts / discount codes during editing? | Engineering | Open |
| 5 | Should the free tier require Avada branding ("Powered by Avada") on customer-facing pages? | Product | Open |
| 6 | Do we need Shopify Plus-specific features (checkout extensibility, scripts) in MVP? | Product | Resolved: No, Phase 3 |
| 7 | Should we build a mobile app for merchant editing or rely on responsive web? | Product | Resolved: Responsive web |
| 8 | What is the data retention policy for edit history? (Storage cost vs. merchant need) | Engineering | Open |
| 9 | How do we handle partial fulfillment -- can customers edit only unfulfilled items? | Engineering | Open |
| 10 | Should we integrate with Avada's existing apps (Email Marketing, SEO) from launch? | Product | Open |

---

*End of PRD -- Avada Order Editing v1.0*
