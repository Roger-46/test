# 04 - Opportunity Scoring: Shopify Order Editing

## 1. Feature Opportunity Scoring

### Scoring Scale: 1-5 (1 = Low, 5 = High)

| Feature | Market Demand | Competition Gap | Tech Feasibility | Revenue Potential | Time to Market | **Total (25)** | **Priority** |
|---------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Customer self-service address editing | 5 | 2 | 4 | 3 | 5 | **19** | P0 |
| Customer self-service variant/item swap | 5 | 2 | 4 | 3 | 4 | **18** | P0 |
| Self-service order cancellation | 4 | 2 | 4 | 2 | 5 | **17** | P0 |
| Self-service quantity adjustment | 4 | 2 | 5 | 2 | 5 | **18** | P0 |
| Time-window edit controls | 4 | 2 | 5 | 2 | 5 | **18** | P0 |
| Automatic refund/charge handling | 5 | 2 | 3 | 3 | 4 | **17** | P0 |
| Thank-you page + order status widgets | 4 | 2 | 4 | 3 | 4 | **17** | P0 |
| **Post-edit upsell/cross-sell** | 4 | 3 | 3 | **5** | 3 | **18** | P1 |
| Google address validation | 4 | 3 | 4 | 2 | 4 | **17** | P1 |
| Store credit refund option | 3 | 3 | 4 | 4 | 4 | **18** | P1 |
| Shopify Flow integration | 4 | 3 | 3 | 3 | 3 | **16** | P1 |
| Analytics/ROI dashboard | 3 | 4 | 4 | 3 | 3 | **17** | P1 |
| Cancellation retention flow | 3 | **5** | 3 | **5** | 3 | **19** | P1 |
| Multi-language support | 3 | 2 | 4 | 2 | 4 | **15** | P1 |
| **Local delivery order editing** | 4 | **5** | 2 | 3 | 2 | **16** | P2 |
| **Bulk staff-side editing** | 3 | **5** | 2 | 3 | 2 | **15** | P2 |
| Subscription order editing | 3 | 4 | 2 | 3 | 2 | **14** | P2 |
| B2B/wholesale editing | 3 | 4 | 2 | 4 | 2 | **15** | P2 |
| **AI product recommendations** | 2 | **5** | 2 | 4 | 2 | **15** | P2 |
| PDF invoice post-edit | 2 | 3 | 4 | 1 | 4 | **14** | P2 |
| Multi-currency editing | 3 | 4 | 2 | 2 | 2 | **13** | P2 |
| POS integration | 2 | 4 | 2 | 2 | 2 | **12** | P2 |
| Custom webhooks/API | 2 | 3 | 3 | 2 | 3 | **13** | P2 |

### Top Opportunities by Score

1. **Cancellation retention flow** (19) -- High competition gap + high revenue potential. No competitor does this well.
2. **Customer self-service address editing** (19) -- #1 demand driver. Must-have.
3. **Post-edit upsell/cross-sell** (18) -- Direct revenue generation. Key differentiator.
4. **Store credit refund option** (18) -- Revenue retention. Keeps money in the ecosystem.
5. **Self-service variant/item swap** (18) -- Core use case. Table stakes.
6. **Time-window edit controls** (18) -- Operational control for merchants.

---

## 2. Go / No-Go Assessment

### VERDICT: STRONG GO

**Confidence Level: 85%**

### Go Factors

| Factor | Assessment | Weight |
|--------|-----------|--------|
| Market demand | Very high -- 60% of support tickets are order edits | 9/10 |
| Pricing gap | Clear gap between $5 (basic) and $39+ (full-featured) | 9/10 |
| Competition quality | Incumbents have bugs, poor support, high prices | 7/10 |
| Technical feasibility | Shopify Order Editing API is mature (since 2024-07) | 8/10 |
| Avada brand advantage | Existing Shopify merchant base, cross-sell opportunity | 8/10 |
| Revenue model clarity | SaaS subscription with upsell potential | 9/10 |
| Time to market (MVP) | 2-3 months for core features | 7/10 |

**Go Score: 8.1/10**

### Risk Factors

| Risk | Probability | Impact | Mitigation |
|------|-----------|--------|------------|
| Shopify builds better native editing | 30% | High | Focus on features Shopify won't build (upsells, retention flows, analytics). Shopify hasn't meaningfully improved native editing in years. |
| Price war from competitors | 40% | Medium | Differentiate on features + free tier + brand. Price is one factor among many. |
| API rate limiting at scale | 20% | Medium | Queue-based architecture, efficient API usage patterns. |
| Competitor with VC funding launches | 25% | Medium | Speed to market + Avada ecosystem advantage. |
| Low conversion from free to paid | 35% | Medium | Optimize free tier limits, in-app upgrade prompts, value demonstration. |
| Review manipulation by competitors | 15% | Low | Focus on genuine value, encourage organic reviews, responsive support. |

### No-Go Scenarios (What Would Make Us Walk Away)

1. Shopify announces native customer self-service editing (unlikely -- they haven't in 10+ years)
2. API access for order editing gets restricted or deprecated (opposite trend -- expanding)
3. Market saturated with 5+ apps all under $15/month with full features (not the case today)

---

## 3. Key Risks & Mitigations

### Risk 1: Shopify Platform Risk
**Risk:** Shopify improves native order editing, reducing need for third-party apps.
**Probability:** 30% over 3 years
**Mitigation:**
- Build features Shopify will NEVER build: upsells, retention flows, AI recommendations, advanced analytics
- Create deep integrations that make switching costly
- Revenue features (upsells) are independent of Shopify's native editing

### Risk 2: Incumbent Response
**Risk:** OrderEditing.com or AE lower prices to compete.
**Probability:** 40%
**Mitigation:**
- Incumbents have established pricing that their existing customers accept. Lowering prices hurts their revenue.
- Differentiate on features, not just price
- Build network effects through Shopify Flow marketplace presence

### Risk 3: Technical Complexity
**Risk:** Order editing edge cases (partial fulfillment, subscriptions, multi-currency) are harder than expected.
**Probability:** 50%
**Mitigation:**
- Phase features. Launch with core editing first, add complex scenarios later.
- Extensive testing with real orders on dev stores
- Graceful degradation -- show "contact support" for unsupported edge cases

### Risk 4: Free Tier Abuse
**Risk:** Stores gaming the free tier, never converting to paid.
**Probability:** 60%
**Mitigation:**
- Free tier has clear limits (50 edits/month, no upsells, no analytics)
- In-app value demonstration: "You saved X support tickets this month. Upgrade for unlimited."
- Free tier still provides value: app store reviews, word-of-mouth, ranking

---

## 4. Financial Projections

### Assumptions

| Assumption | Value | Basis |
|-----------|-------|-------|
| Total addressable installs | 100K+ stores could install order editing apps | 100 apps in category, top apps have 200-1,100 reviews |
| Free-to-paid conversion | 8-12% | Industry avg for freemium Shopify apps |
| Monthly churn (paid) | 5-7% | Shopify app average |
| Average paid ARPU | $22/month (Year 1), $28 (Year 2), $35 (Year 3) | Weighted across tiers |
| App store ranking boost | Top 10 in category by Month 6 | Requires 50+ 5-star reviews |

### Year 1 Projections

| Quarter | New Installs | Total Installs | Paying Customers | MRR | ARR |
|---------|-------------|---------------|-----------------|-----|-----|
| Q1 | 500 | 500 | 40 | $880 | $10.6K |
| Q2 | 1,200 | 1,500 | 140 | $3,080 | $37K |
| Q3 | 2,000 | 3,000 | 300 | $6,600 | $79K |
| Q4 | 3,000 | 5,000 | 500 | $11,000 | $132K |

**Year 1 Total:** ~5,000 installs, ~500 paying customers, ~$132K ARR

### Year 2 Projections

| Quarter | New Installs | Total Installs | Paying Customers | MRR | ARR |
|---------|-------------|---------------|-----------------|-----|-----|
| Q1 | 4,000 | 8,000 | 850 | $23,800 | $286K |
| Q2 | 5,000 | 12,000 | 1,300 | $36,400 | $437K |
| Q3 | 6,000 | 16,000 | 1,800 | $50,400 | $605K |
| Q4 | 7,000 | 20,000 | 2,400 | $67,200 | $806K |

**Year 2 Total:** ~20,000 installs, ~2,400 paying customers, ~$806K ARR

### Year 3 Projections

| Quarter | New Installs | Total Installs | Paying Customers | MRR | ARR |
|---------|-------------|---------------|-----------------|-----|-----|
| Q1 | 8,000 | 25,000 | 3,200 | $112,000 | $1.34M |
| Q2 | 9,000 | 30,000 | 4,000 | $140,000 | $1.68M |
| Q3 | 10,000 | 36,000 | 5,000 | $175,000 | $2.1M |
| Q4 | 10,000 | 42,000 | 6,000 | $210,000 | $2.52M |

**Year 3 Total:** ~42,000 installs, ~6,000 paying customers, ~$2.52M ARR

### Revenue Breakdown by Tier (Year 3 Steady State)

| Tier | Price | % of Paying | Customers | MRR |
|------|-------|------------|-----------|-----|
| Starter ($9.99) | $9.99 | 40% | 2,400 | $23,976 |
| Growth ($19.99) | $19.99 | 30% | 1,800 | $35,982 |
| Pro ($29.99) | $29.99 | 20% | 1,200 | $35,988 |
| Business ($49.99) | $49.99 | 7% | 420 | $20,996 |
| Enterprise ($99.99) | $99.99 | 3% | 180 | $17,998 |
| **Total** | | 100% | 6,000 | **$134,940** |

*Note: Year 3 Q4 MRR of $210K includes growth acceleration from Shopify Plus features and B2B launch.*

### Upside Scenarios

| Scenario | Impact | Probability |
|----------|--------|-------------|
| Avada cross-sell from existing app base | +50% installs in Year 1 | 60% |
| "Built for Shopify" badge earned in Month 3 | +30% organic installs | 70% |
| Upsell revenue sharing (% of upsell GMV) | +$2-5 ARPU | 40% |
| Enterprise deal with 10+ Plus merchants | +$50K ARR per deal | 30% |
| Shopify features OrderEditing apps in changelog | One-time spike of 2,000+ installs | 20% |

---

## 5. Recommended Pricing Structure

| Tier | Price | Limits | Target |
|------|-------|--------|--------|
| **Free** | $0 | 50 edits/month, basic features, Avada branding | Free/Dev + SMB trial |
| **Starter** | $9.99/mo | 200 edits, address validation, basic analytics | Small SMB |
| **Growth** | $19.99/mo | Unlimited edits, upsells, store credits, full analytics | Growing SMB |
| **Pro** | $29.99/mo | Everything + Shopify Flow, priority support, no branding | Established SMB |
| **Business** | $49.99/mo | Everything + 3PL integrations, advanced automation | Mid-Market |
| **Enterprise** | $99.99/mo | Everything + B2B editing, subscriptions, Slack support, SOC 2 | Shopify Plus |

**Annual discount:** 20% off (common in category, customers expect it)

**Key pricing principles:**
1. Free tier is generous enough to be useful (50 edits covers stores with ~150-200 orders/month where ~25% need edits)
2. Starter at $9.99 undercuts EVERY competitor with meaningful features
3. Growth at $19.99 is the "sweet spot" -- most conversions happen here
4. Enterprise at $99.99 is still cheaper than competitors' mid-tier ($99-$199/mo for similar features)

---

## 6. Success Metrics

### Launch Metrics (First 90 Days)

| Metric | Target | Stretch |
|--------|--------|---------|
| Total installs | 500 | 1,000 |
| Paying customers | 40 | 80 |
| App store rating | 4.8+ | 5.0 |
| Number of reviews | 20+ | 50+ |
| Free-to-paid conversion | 8% | 12% |
| MRR | $880 | $1,760 |

### Growth Metrics (Monthly, Ongoing)

| Metric | Target |
|--------|--------|
| Install growth rate | 15-25% MoM |
| Paid conversion rate | 10%+ |
| Monthly churn (paid) | <6% |
| Net Revenue Retention | >105% |
| Support response time | <2 hours |
| App store rating | 4.9+ |
| NPS | >50 |

---

## 7. Competitive Moat Strategy

### Short-term (Year 1): Price + Quality
- Best free tier in the market
- Best value at $9.99-$19.99 price point
- Superior reliability (no duplicate orders, no tax bugs)
- Fast, responsive support

### Medium-term (Year 2): Features + Integrations
- Blue ocean features (local delivery editing, bulk editing)
- Deep 3PL integrations
- Shopify Flow marketplace presence
- AI-powered recommendations

### Long-term (Year 3): Ecosystem + Data
- Cross-sell with Avada product suite
- Merchant data insights (anonymous, aggregated)
- Industry benchmarks ("stores like yours reduce tickets by X%")
- Enterprise relationships and case studies
