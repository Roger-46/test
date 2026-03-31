# 02 - Feature Matrix: Shopify Order Editing

## 1. Full Feature List

### P0 - Must-Have (Launch blockers)

| Feature | Complexity | Target Segment | Classification |
|---------|-----------|----------------|----------------|
| Customer self-service address editing | Medium | All | Table stakes |
| Customer self-service item swap (variant change) | Medium | All | Table stakes |
| Customer self-service quantity adjustment | Low | All | Table stakes |
| Customer self-service order cancellation | Medium | All | Table stakes |
| Merchant-side order editing (admin) | Medium | All | Table stakes |
| Time-window controls (edit deadline) | Low | All | Table stakes |
| Automatic refund/charge on price changes | High | All | Table stakes |
| Inventory restocking on cancellation/edit | Medium | All | Table stakes |
| Email notifications for edits | Low | All | Table stakes |
| Shopify order status page widget | Medium | All | Table stakes |
| Thank-you page editing widget | Medium | All | Table stakes |
| Mobile-responsive editing interface | Medium | All | Table stakes |

### P1 - High Priority (Month 2-3)

| Feature | Complexity | Target Segment | Classification |
|---------|-----------|----------------|----------------|
| Google-powered address validation | Medium | All | Differentiator |
| Post-purchase upsell during edit flow | High | SMB+ | Differentiator |
| Store credit refund option | Medium | SMB+ | Differentiator |
| Shopify Flow integration | Medium | SMB+ | Differentiator |
| Customer account page widget | Medium | All | Table stakes |
| Customizable edit rules (per product/collection) | Medium | SMB+ | Differentiator |
| Discount code application post-purchase | Medium | All | Table stakes |
| Shipping method changes | Medium | All | Table stakes |
| Multi-language support | Medium | All | Table stakes |
| Analytics dashboard (edits, cancellations, upsells) | Medium | SMB+ | Differentiator |
| Order edit confirmation emails (customizable) | Low | All | Table stakes |

### P2 - Nice-to-Have (Month 4-6)

| Feature | Complexity | Target Segment | Classification |
|---------|-----------|----------------|----------------|
| AI-powered product recommendations during edits | High | Mid-market+ | Blue ocean |
| Subscription order editing support | High | Mid-market+ | Differentiator |
| B2B/wholesale order editing | High | Plus | Differentiator |
| Bulk order editing (staff-side) | High | Mid-market+ | Blue ocean |
| Local delivery/pickup order editing workaround | High | SMB+ | Blue ocean |
| PDF invoice generation post-edit | Medium | SMB+ | Differentiator |
| Cancellation retention flow (offer discount to keep order) | Medium | SMB+ | Differentiator |
| Restocking fee configuration | Low | SMB+ | Differentiator |
| Order merge capability | High | Mid-market+ | Differentiator |
| Shopify POS integration | High | Mid-market+ | Differentiator |
| 3PL / fulfillment integration (ShipStation, etc.) | Medium | Mid-market+ | Table stakes |
| Custom webhook/API for edit events | Medium | Plus | Differentiator |
| Edit audit trail / change log | Medium | Mid-market+ | Differentiator |
| Multi-currency order editing | High | Mid-market+ | Blue ocean |
| White-label / no branding | Low | Plus | Differentiator |
| SOC 2 compliance | High | Plus | Differentiator |

---

## 2. Feature Comparison Matrix

### Legend
- Full = Fully supported
- Partial = Limited support / workaround needed
- None = Not supported
- ? = Unknown / not confirmed

| Feature | Shopify Native | OrderEditing.com | AE: Order Editing | Cleverific | Revize | Orderify | **Avada (Target)** |
|---------|---------------|-----------------|-------------------|------------|--------|----------|-------------------|
| **Customer Self-Service** | | | | | | | |
| Address editing | None | Full | Full | Full | Full | Partial | Full |
| Item/variant swap | None | Full | Full | Full | Full | Partial | Full |
| Quantity change | None | Full | Full | Full | Full | Full | Full |
| Add products | None | Full | Full | Full | Full | None | Full |
| Remove products | None | Full | Full | Full | Full | None | Full |
| Order cancellation | None | Full | Full | Full | Full | Full | Full |
| Discount code apply | None | Full | Full | Partial | Full | None | Full |
| Shipping method change | None | Full | Full | Partial | Full | None | Full |
| **Merchant Admin** | | | | | | | |
| Admin order editing | Full (limited) | Full | Full | Full | Partial | None | Full |
| Bulk order editing | None | None | None | Partial | None | None | Full |
| Draft order editing | None | None | None | Full | None | None | Full |
| **Address & Validation** | | | | | | | |
| Address validation | None | Full | Full (Google) | None | Partial | None | Full (Google) |
| Billing address edit | None | Partial | Partial | Partial | None | None | Partial |
| **Revenue Features** | | | | | | | |
| Post-edit upsells | None | Full | Full | None | Full | None | Full |
| Thank-you page upsell | None | Partial | Partial | None | Full | None | Full |
| Store credit refunds | None | Partial | Partial | Partial | Full | Full | Full |
| Cancellation retention | None | Partial | Partial | None | Partial | None | Full |
| **Technical** | | | | | | | |
| Shopify Flow | None | Full | Full | Full | Partial | None | Full |
| Subscription orders | None | Partial | Partial | Partial | Partial | None | Full |
| Local delivery orders | None | None | None | None | None | None | Full |
| Multi-currency | Partial | Partial | Partial | Partial | Full | None | Full |
| POS integration | None | None | Full | None | None | None | Full |
| 3PL integrations | None | Full (100+) | Full | Full | Full (100+) | Partial | Full |
| **Analytics** | | | | | | | |
| Edit analytics | None | Partial | Full | Partial | Partial | None | Full |
| Revenue attribution | None | Partial | Partial | None | Partial | None | Full |
| Support ticket savings | None | Partial | Partial | None | Partial | None | Full |
| **Pricing** | | | | | | | |
| Free plan | N/A | No | No | No | Yes (20 edits) | No | **Yes (50 edits)** |
| Entry paid price | N/A | $99/mo | $39/mo | $49/mo | $49/mo | $4.99/mo | **$9.99/mo** |
| Built for Shopify badge | N/A | No | Yes | No | No | No | **Target: Yes** |

---

## 3. Shopify Native Order Editing Limitations

| Limitation | Impact | Opportunity |
|-----------|--------|------------|
| Customers CANNOT edit their own orders | Critical -- all edits go through support | Core value prop of every order editing app |
| Cannot edit fulfilled or partially fulfilled items | High -- common for split fulfillments | Apps can manage through workarounds |
| Cannot edit local delivery/pickup orders | High -- growing segment of merchants | Major differentiator opportunity |
| Cannot edit orders >60 days old | Medium -- pre-order/custom stores affected | Draft order recreation workaround |
| Cannot edit orders paid via Shop Pay Installments | Medium -- growing payment method | Technical limitation, limited workaround |
| Cannot edit multi-currency orders (non-store currency) | Medium -- international stores | Support via Shopify Markets integration |
| Cannot add subscription products via edit | Medium -- subscription stores affected | Deep subscription app integration needed |
| CSV exports break after edits | Medium -- operational impact | Clean export/reporting as a feature |
| Tax may not recalculate properly | High -- compliance risk | Accurate tax engine integration |
| Cannot edit billing address after payment | Medium -- customer frustration | At minimum update Shopify records |

---

## 4. Blue Ocean Features (What NO Competitor Has)

### 4.1 AI-Powered Smart Edit Suggestions
**What:** When a customer opens the edit flow, AI analyzes their behavior and suggests likely corrections (e.g., "Did you mean size M based on your previous orders?").
**Why no one has it:** Requires ML model trained on edit patterns + order history analysis.
**Feasibility:** Medium -- can start with rule-based then evolve to ML.

### 4.2 Local Delivery / Pickup Order Editing
**What:** Full editing support for orders with local delivery or in-store pickup shipping methods.
**Why no one has it:** Shopify API blocks editing these orders. Requires creative workaround (cancel + recreate seamlessly behind the scenes).
**Feasibility:** Medium-High -- complex but technically possible.

### 4.3 Bulk Staff-Side Order Editing
**What:** Let staff select multiple orders and apply batch edits (change address for all, swap product across orders, bulk cancel with retention offers).
**Why no one has it:** Complex UI + API rate limiting challenges.
**Feasibility:** Medium -- start with simple bulk address updates.

### 4.4 Edit-to-Retain Cancellation Flow
**What:** When a customer tries to cancel, show a smart retention flow: "Would you like to change your order instead?" with variant swap, discount offer, or delayed shipping options.
**Why no one has it:** Most apps treat cancellation as a binary action. Some offer basic discounts but no intelligent retention flow.
**Feasibility:** Medium -- UI-heavy but valuable.

### 4.5 Pre-Order / Backorder Edit Support
**What:** Full editing for orders older than 60 days (pre-orders, custom items) via intelligent draft order management.
**Why no one has it:** 60-day API limitation assumed to be hard block.
**Feasibility:** Medium -- requires draft order recreation strategy.

### 4.6 Cross-Sell During Edit with Revenue Attribution
**What:** During the edit flow, recommend complementary products with full attribution analytics (show exactly how much revenue the edit flow generated).
**Why no one has it:** Most apps have basic upsells but no attribution. None show ROI dashboards comparing upsell revenue to app cost.
**Feasibility:** Medium -- analytics + recommendation engine.

---

## 5. Competitive Positioning Summary

### The Gap We Fill

```
Price      $5    $15    $25    $50    $100   $200   $400   $600
           |      |      |      |      |      |      |      |
Orderify   [==]   |      |      |      |      |      |      |
(basic)    |      |      |      |      |      |      |      |
           |      |      |      |      |      |      |      |
Vista      |   [====]    |      |      |      |      |      |
(new/thin) |      |      |      |      |      |      |      |
           |      |      |      |      |      |      |      |
AVADA      |      [==========]  |      |      |      |      |  <-- OUR SWEET SPOT
(target)   |      |      |      |      |      |      |      |
           |      |      |      |      |      |      |      |
Revize     |      |      |  [========]  |      |      |      |
AE         |      |      |      [============]  |      |      |
Cleverific |      |      |      [============]  |      |      |
           |      |      |      |      |      |      |      |
OrderEditing|     |      |      |      [====================]
(.com)     |      |      |      |      |      |      |      |
```

**Our position:** Premium features at SMB-friendly pricing ($9.99-$49.99/mo), with a generous free tier (50 edits/month) to drive viral adoption. Differentiate through:
1. Best-in-class free tier
2. Blue ocean features (local delivery editing, bulk editing, AI suggestions)
3. Superior analytics/ROI dashboard
4. Competitive mid-tier pricing
