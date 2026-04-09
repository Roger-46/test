# 12 - Technical Architecture: Avada Return & Exchange

## Overview

This document details the technical architecture for the Avada Return & Exchange app, aligned with the tech stack defined in CLAUDE.md (Node.js, Firebase Functions, Firestore, React/Polaris v12+, BigQuery) and the system diagrams from file 08.

---

## 1. System Architecture

### Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React + Shopify Polaris v12+ | Embedded admin app (Shopify Admin) |
| Theme Extension | Liquid + JavaScript | Customer-facing return portal on storefront |
| Backend | Node.js + Firebase Cloud Functions | API handlers, webhook processors, background workers |
| Primary Database | Firestore (multi-region) | Multi-tenant data store for all transactional data |
| Analytics | BigQuery | Return analytics, product insights, financial reports |
| File Storage | Cloud Storage | Return photos, shipping label PDFs |
| Caching | Redis / Memorystore | Rate limiting, session cache, frequently accessed settings |
| Async Processing | Cloud Tasks + Pub/Sub | Background jobs, webhook async processing |
| Monitoring | Cloud Logging + Cloud Monitoring | Structured logs, alerts, dashboards |
| Shipping | EasyPost / Shippo | Multi-carrier label generation (USPS, FedEx, UPS, DHL) |
| Email | SendGrid | Transactional email notifications |
| SMS | Twilio | SMS notifications (P1) |

### Architecture Principles

1. **Multi-tenant by shopId**: Every Firestore query is scoped by `shopId`. No cross-tenant data access.
2. **Webhook-first**: Shopify data enters via webhooks; heavy processing is queued to Pub/Sub for async execution (respond < 5 seconds per file 08).
3. **Layered backend**: Handlers (orchestrate) -> Services (business logic) -> Repositories (one collection each) -> Helpers/Presenters.
4. **Plan-aware gating**: Feature availability checked at service layer based on shop's plan (free/starter/pro/enterprise from file 02/06).
5. **Cost-conscious**: BigQuery queries include partition filters; Firestore reads minimized; TTL on ephemeral data.

(Ref: File 08 - System Architecture Diagram, Deployment Architecture)

---

## 2. Firestore Schema

All collections are scoped by `shopId` for multi-tenant isolation. Based on the ERD in file 08, section 6.

### Collection: `shops`

Primary settings and configuration for each installed store.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `shopId` | string (PK) | Shopify shop domain (e.g., `mystore.myshopify.com`) | Document ID |
| `shopDomain` | string | Full shop domain | -- |
| `shopName` | string | Store display name | -- |
| `plan` | string | `free` \| `starter` \| `pro` \| `enterprise` | Single-field |
| `monthlyReturnCount` | number | Returns used this billing cycle | -- |
| `monthlyReturnLimit` | number | Plan limit (50/150/500/2000) | -- |
| `billingCycleStart` | timestamp | Current billing cycle start | -- |
| `settings` | map | General app settings | -- |
| `settings.defaultReturnWindow` | number | Default return window in days | -- |
| `settings.autoApproveEnabled` | boolean | Whether auto-approve is active | -- |
| `settings.instantExchangeEnabled` | boolean | Whether instant exchange is active (Pro+) | -- |
| `settings.exchangeBonusEnabled` | boolean | Whether exchange bonus credit is active | -- |
| `settings.exchangeBonusAmount` | number | Bonus amount for choosing exchange | -- |
| `settings.exchangeBonusType` | string | `fixed` \| `percentage` | -- |
| `settings.greenReturnsEnabled` | boolean | Whether keep-item option is active | -- |
| `settings.greenReturnsThreshold` | number | Max item value for keep-item | -- |
| `settings.restockingFeeEnabled` | boolean | Whether restocking fee applies | -- |
| `settings.restockingFeePercent` | number | Restocking fee percentage | -- |
| `settings.requirePhotos` | boolean | Global photo requirement | -- |
| `settings.smsEnabled` | boolean | SMS notifications enabled (Starter+) | -- |
| `settings.fraudDetectionEnabled` | boolean | Fraud detection enabled (Starter+) | -- |
| `branding` | map | Portal branding settings | -- |
| `branding.logoUrl` | string | Store logo URL (Cloud Storage) | -- |
| `branding.primaryColor` | string | Hex color code | -- |
| `branding.secondaryColor` | string | Hex color code | -- |
| `branding.fontFamily` | string | Font family name | -- |
| `branding.customCss` | string | Custom CSS overrides | -- |
| `shipping` | map | Shipping configuration | -- |
| `shipping.defaultCarrier` | string | `usps` \| `fedex` \| `ups` \| `dhl` | -- |
| `shipping.easypostApiKey` | string | Encrypted EasyPost API key | -- |
| `shipping.warehouseAddress` | map | Return warehouse address | -- |
| `shipping.qrCodeEnabled` | boolean | QR code returns enabled (Pro+) | -- |
| `languages` | array[string] | Enabled portal languages (free: max 5) | -- |
| `defaultLanguage` | string | Default portal language | -- |
| `installedAt` | timestamp | App installation date | -- |
| `updatedAt` | timestamp | Last settings update | -- |
| `active` | boolean | Whether app is active | Single-field |
| `wizardCompleted` | boolean | Whether setup wizard was completed | -- |
| `shopifyAccessToken` | string | Encrypted Shopify API token | -- |

---

### Collection: `returnPolicies`

Per-product or per-collection return policy overrides.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `policyId` | string (PK) | Auto-generated ID | Document ID |
| `shopId` | string (FK) | Shop identifier | Composite: `shopId` + `scope` |
| `name` | string | Policy name (e.g., "Electronics Policy") | -- |
| `scope` | string | `default` \| `product` \| `collection` \| `tag` | Composite index |
| `scopeValue` | string | Product ID, collection ID, or tag value | -- |
| `returnWindowDays` | number | Return window override | -- |
| `isReturnable` | boolean | Whether items matching this scope are returnable | -- |
| `requirePhotos` | boolean | Photo requirement override | -- |
| `autoApproveEnabled` | boolean | Auto-approve override | -- |
| `autoApproveRules` | map | Auto-approve conditions | -- |
| `autoApproveRules.maxOrderValue` | number | Max order value for auto-approve | -- |
| `autoApproveRules.requireNoFraudFlag` | boolean | Block if fraud flagged | -- |
| `autoApproveRules.requireNotBlocklisted` | boolean | Block if customer blocklisted | -- |
| `restockingFeeEnabled` | boolean | Restocking fee override | -- |
| `restockingFeePercent` | number | Fee percentage override | -- |
| `priority` | number | Higher = checked first (product > tag > collection > default) | -- |
| `createdAt` | timestamp | -- | -- |
| `updatedAt` | timestamp | -- | -- |

**Firestore Index**: Composite index on `shopId` + `scope` + `scopeValue` for policy lookups.

---

### Collection: `returnRequests`

Core collection for all return requests.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `returnId` | string (PK) | Auto-generated | Document ID |
| `shopId` | string (FK) | Shop identifier | Composite: `shopId` + `status` + `requestedAt` |
| `orderId` | string | Shopify order ID | Composite: `shopId` + `orderId` |
| `orderName` | string | Display order name (e.g., "#1234") | -- |
| `customerId` | string | Shopify customer ID | Composite: `shopId` + `customerId` |
| `customerEmail` | string | Customer email | -- |
| `customerName` | string | Customer display name | -- |
| `status` | string | `requested` \| `under_review` \| `approved` \| `rejected` \| `label_generated` \| `qr_issued` \| `keep_item` \| `shipped` \| `in_transit` \| `received` \| `inspecting` \| `completed` \| `closed` | Composite index |
| `resolutionType` | string | `refund` \| `store_credit` \| `exchange` \| `pending` | -- |
| `shippingMethod` | string | `label` \| `qr_code` \| `keep_item` \| `customer_ships` | -- |
| `totalReturnValue` | number | Sum of returned item values | -- |
| `refundAmount` | number | Actual refund amount (after fees) | -- |
| `storeCreditAmount` | number | Store credit amount issued | -- |
| `currency` | string | Order currency (ISO 4217) | -- |
| `isFraudFlagged` | boolean | Whether fraud was detected | -- |
| `fraudScore` | number | Fraud risk score (0-1) | -- |
| `isGiftReturn` | boolean | Whether this is a gift return | -- |
| `notes` | string | Internal notes from agents | -- |
| `autoApproved` | boolean | Whether auto-approve was applied | -- |
| `ruleIdApplied` | string | ID of automation rule that fired | -- |
| `requestedAt` | timestamp | When customer submitted | Composite index (for date range queries) |
| `approvedAt` | timestamp | When approved | -- |
| `shippedAt` | timestamp | When customer shipped | -- |
| `receivedAt` | timestamp | When warehouse received | -- |
| `resolvedAt` | timestamp | When resolution completed | -- |
| `ttl` | timestamp | Auto-delete after 2 years | TTL policy |

**Firestore Indexes**:
- `shopId` ASC + `status` ASC + `requestedAt` DESC (list + filter)
- `shopId` ASC + `orderId` ASC (order lookup)
- `shopId` ASC + `customerId` ASC + `requestedAt` DESC (customer history)
- `shopId` ASC + `requestedAt` DESC (date range queries)

---

### Collection: `returnItems`

Individual items within a return request.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `itemId` | string (PK) | Auto-generated | Document ID |
| `returnId` | string (FK) | Parent return request | Composite: `shopId` + `returnId` |
| `shopId` | string (FK) | Shop identifier | -- |
| `lineItemId` | string | Shopify line item ID | -- |
| `productId` | string | Shopify product ID | Composite: `shopId` + `productId` |
| `variantId` | string | Shopify variant ID | -- |
| `productTitle` | string | Product display name | -- |
| `variantTitle` | string | Variant display name (e.g., "Size M / Blue") | -- |
| `sku` | string | Product SKU | -- |
| `quantity` | number | Quantity being returned | -- |
| `unitPrice` | number | Price per unit | -- |
| `totalPrice` | number | quantity * unitPrice | -- |
| `returnReason` | string | Reason category ID | -- |
| `returnReasonLabel` | string | Human-readable reason label | -- |
| `returnReasonDetail` | string | Additional detail text | -- |
| `conditionOnReceipt` | string | `new` \| `like_new` \| `used` \| `damaged` \| `pending` | -- |
| `restocked` | boolean | Whether item was returned to inventory | -- |
| `photoUrls` | array[string] | Cloud Storage signed URLs | -- |
| `createdAt` | timestamp | -- | -- |

**Firestore Index**: `shopId` + `productId` (for product-level analytics aggregation).

---

### Collection: `exchanges`

Exchange transactions linked to return requests.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `exchangeId` | string (PK) | Auto-generated | Document ID |
| `returnId` | string (FK) | Parent return request | Composite: `shopId` + `returnId` |
| `shopId` | string (FK) | Shop identifier | Composite: `shopId` + `status` |
| `originalProductId` | string | Original product ID | -- |
| `originalVariantId` | string | Original variant ID | -- |
| `newProductId` | string | Replacement product ID | -- |
| `newVariantId` | string | Replacement variant ID | -- |
| `newOrderId` | string | Shopify order ID for exchange | -- |
| `exchangeType` | string | `variant` \| `cross_product` \| `shop_now` | -- |
| `originalPrice` | number | Original item price | -- |
| `newPrice` | number | Replacement item price | -- |
| `priceDifference` | number | newPrice - originalPrice | -- |
| `bonusCreditApplied` | number | Bonus credit amount | -- |
| `isInstantExchange` | boolean | Whether instant exchange was used | -- |
| `securityHoldAmount` | number | Card hold amount for instant exchange | -- |
| `securityHoldStatus` | string | `held` \| `released` \| `charged` \| `none` | -- |
| `inventoryReserved` | boolean | Whether inventory was reserved | -- |
| `status` | string | `pending` \| `order_created` \| `shipped` \| `completed` \| `cancelled` | Composite index |
| `reservedUntil` | timestamp | Inventory hold expiry (7 days) | -- |
| `createdAt` | timestamp | -- | -- |
| `completedAt` | timestamp | -- | -- |

---

### Collection: `refunds`

Refund records linked to return requests.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `refundId` | string (PK) | Auto-generated | Document ID |
| `returnId` | string (FK) | Parent return request | Composite: `shopId` + `returnId` |
| `shopId` | string (FK) | Shop identifier | -- |
| `shopifyRefundId` | string | Shopify refund ID (from Admin API) | -- |
| `type` | string | `original_payment` \| `store_credit` \| `gift_card` \| `partial` | -- |
| `amount` | number | Refund amount | -- |
| `currency` | string | ISO 4217 currency code | -- |
| `restockingFeeAmount` | number | Fee deducted | -- |
| `status` | string | `pending` \| `processed` \| `failed` | -- |
| `giftCardId` | string | Shopify gift card ID (if store credit) | -- |
| `failureReason` | string | Error message if failed | -- |
| `processedAt` | timestamp | When refund completed | -- |
| `createdAt` | timestamp | -- | -- |

---

### Collection: `storeCredits`

Tracks store credits issued to customers.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `creditId` | string (PK) | Auto-generated | Document ID |
| `shopId` | string (FK) | Shop identifier | Composite: `shopId` + `customerId` |
| `customerId` | string | Shopify customer ID | Composite index |
| `customerEmail` | string | Customer email | -- |
| `giftCardId` | string | Shopify gift card ID | -- |
| `giftCardCode` | string | Masked gift card code (last 4 only) | -- |
| `amount` | number | Original credit amount | -- |
| `remainingBalance` | number | Current remaining balance | -- |
| `currency` | string | ISO 4217 | -- |
| `source` | string | `return_refund` \| `exchange_bonus` \| `exchange_downsell` \| `promotional` | -- |
| `returnId` | string (FK) | Source return request | -- |
| `active` | boolean | Whether credit is active | -- |
| `issuedAt` | timestamp | -- | -- |
| `expiresAt` | timestamp | Expiry date (optional) | -- |

---

### Collection: `shippingLabels`

Return shipping labels and QR codes.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `labelId` | string (PK) | Auto-generated | Document ID |
| `returnId` | string (FK) | Parent return request | Composite: `shopId` + `returnId` |
| `shopId` | string (FK) | Shop identifier | -- |
| `carrier` | string | `usps` \| `fedex` \| `ups` \| `dhl` | -- |
| `trackingNumber` | string | Carrier tracking number | -- |
| `trackingUrl` | string | Public tracking URL | -- |
| `labelUrl` | string | Cloud Storage URL for label PDF | -- |
| `qrCodeUrl` | string | Cloud Storage URL for QR code image | -- |
| `labelType` | string | `prepaid` \| `qr_code` | -- |
| `shippingCost` | number | Cost charged by carrier | -- |
| `currency` | string | ISO 4217 | -- |
| `easypostShipmentId` | string | EasyPost shipment reference | -- |
| `status` | string | `created` \| `in_transit` \| `delivered` \| `expired` | -- |
| `createdAt` | timestamp | -- | -- |
| `expiresAt` | timestamp | Label expiry date | -- |

---

### Collection: `returnReasons`

Configurable return reasons per shop.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `reasonId` | string (PK) | Auto-generated | Document ID |
| `shopId` | string (FK) | Shop identifier | Composite: `shopId` + `active` + `sortOrder` |
| `label` | string | Display label (e.g., "Too Small") | -- |
| `category` | string | `sizing` \| `defective` \| `not_as_described` \| `changed_mind` \| `other` | -- |
| `requiresPhoto` | boolean | Whether photos are required for this reason | -- |
| `active` | boolean | Whether reason is available | Composite index |
| `sortOrder` | number | Display order | -- |
| `createdAt` | timestamp | -- | -- |

---

### Collection: `notifications`

Email and SMS notification records.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `notificationId` | string (PK) | Auto-generated | Document ID |
| `shopId` | string (FK) | Shop identifier | -- |
| `returnId` | string (FK) | Parent return request | -- |
| `type` | string | `email` \| `sms` | -- |
| `event` | string | `return_requested` \| `return_approved` \| `return_rejected` \| `label_created` \| `item_received` \| `refund_issued` \| `exchange_shipped` \| `store_credit_issued` | -- |
| `recipient` | string | Email or phone number | -- |
| `subject` | string | Email subject line | -- |
| `templateId` | string | Template used | -- |
| `status` | string | `pending` \| `sent` \| `failed` | -- |
| `failureReason` | string | Error if failed | -- |
| `sentAt` | timestamp | -- | -- |
| `ttl` | timestamp | Auto-delete after 90 days | TTL policy |

---

### Collection: `auditLogs`

Immutable audit trail for all return actions.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `logId` | string (PK) | Auto-generated | Document ID |
| `shopId` | string (FK) | Shop identifier | Composite: `shopId` + `returnId` + `createdAt` |
| `returnId` | string (FK) | Parent return request | Composite index |
| `action` | string | `created` \| `approved` \| `rejected` \| `refunded` \| `exchanged` \| `note_added` \| `status_changed` \| `label_generated` \| `item_received` \| `fraud_flagged` | -- |
| `performedBy` | string | `system` \| `auto_approve` \| `rule:{ruleId}` \| merchant email | -- |
| `previousState` | map | State before change | -- |
| `newState` | map | State after change | -- |
| `metadata` | map | Additional context | -- |
| `createdAt` | timestamp | -- | -- |
| `ttl` | timestamp | Auto-delete after 1 year | TTL policy |

---

### Collection: `notificationTemplates`

Custom email/SMS templates per shop.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `templateId` | string (PK) | Auto-generated | Document ID |
| `shopId` | string (FK) | Shop identifier | Composite: `shopId` + `event` |
| `event` | string | Notification event type | Composite index |
| `type` | string | `email` \| `sms` | -- |
| `subject` | string | Email subject (supports variables) | -- |
| `body` | string | Template body (supports variables: `{{customerName}}`, `{{orderName}}`, `{{returnId}}`, `{{trackingUrl}}`) | -- |
| `language` | string | Language code (e.g., `en`, `fr`) | -- |
| `active` | boolean | Whether template is active | -- |
| `createdAt` | timestamp | -- | -- |
| `updatedAt` | timestamp | -- | -- |

---

### Collection: `automationRules`

If-then automation rules (P1).

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `ruleId` | string (PK) | Auto-generated | Document ID |
| `shopId` | string (FK) | Shop identifier | Composite: `shopId` + `active` + `priority` |
| `name` | string | Rule display name | -- |
| `conditions` | array[map] | Array of condition objects | -- |
| `conditions[].field` | string | `return_reason` \| `item_value` \| `order_value` \| `product_tag` \| `customer_return_count` | -- |
| `conditions[].operator` | string | `equals` \| `not_equals` \| `greater_than` \| `less_than` \| `contains` | -- |
| `conditions[].value` | any | Comparison value | -- |
| `actions` | array[map] | Array of action objects | -- |
| `actions[].type` | string | `auto_approve` \| `set_resolution` \| `generate_label` \| `send_notification` \| `keep_item` \| `flag_fraud` | -- |
| `actions[].params` | map | Action-specific parameters | -- |
| `active` | boolean | Whether rule is active | Composite index |
| `priority` | number | Execution order (higher = first) | -- |
| `createdAt` | timestamp | -- | -- |
| `updatedAt` | timestamp | -- | -- |

---

### Collection: `blocklist`

Customer blocklist for fraud prevention.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `blockId` | string (PK) | Auto-generated | Document ID |
| `shopId` | string (FK) | Shop identifier | Composite: `shopId` + `customerEmail` |
| `customerEmail` | string | Blocked customer email | Composite index |
| `customerId` | string | Shopify customer ID | -- |
| `reason` | string | Why blocked | -- |
| `blockedBy` | string | Agent who blocked | -- |
| `createdAt` | timestamp | -- | -- |

---

## 3. BigQuery Data Model

Analytics data is streamed from Firebase to BigQuery for complex queries and product insights. Tables are designed for cost-efficient querying with partitioning and clustering.

(Ref: File 08 - Data Flow Diagram, Analytics Pipeline section)

### Table: `return_events`

Primary event table for all return lifecycle events.

| Column | Type | Description |
|--------|------|-------------|
| `event_id` | STRING | Unique event ID |
| `shop_id` | STRING | Shop identifier |
| `return_id` | STRING | Return request ID |
| `order_id` | STRING | Shopify order ID |
| `customer_id` | STRING | Shopify customer ID |
| `event_type` | STRING | `return_created` \| `return_approved` \| `return_rejected` \| `item_shipped` \| `item_received` \| `refund_processed` \| `store_credit_issued` \| `exchange_created` \| `exchange_completed` \| `fraud_flagged` |
| `resolution_type` | STRING | `refund` \| `store_credit` \| `exchange` |
| `total_value` | FLOAT64 | Return value |
| `refund_amount` | FLOAT64 | Refund amount |
| `store_credit_amount` | FLOAT64 | Store credit amount |
| `exchange_value` | FLOAT64 | Exchange item value |
| `bonus_credit` | FLOAT64 | Bonus credit applied |
| `currency` | STRING | ISO 4217 |
| `is_auto_approved` | BOOLEAN | Whether auto-approved |
| `is_fraud_flagged` | BOOLEAN | Whether fraud flagged |
| `is_instant_exchange` | BOOLEAN | Whether instant exchange |
| `is_green_return` | BOOLEAN | Whether keep-item |
| `created_at` | TIMESTAMP | Event timestamp |
| `event_date` | DATE | Partition column |

**Partitioning**: By `event_date` (DAY) -- all queries MUST include partition filter.
**Clustering**: `shop_id`, `event_type`
**Retention**: 3 years

---

### Table: `return_items`

Item-level return data for product analytics.

| Column | Type | Description |
|--------|------|-------------|
| `item_id` | STRING | Unique item return ID |
| `shop_id` | STRING | Shop identifier |
| `return_id` | STRING | Return request ID |
| `product_id` | STRING | Shopify product ID |
| `variant_id` | STRING | Shopify variant ID |
| `product_title` | STRING | Product name |
| `variant_title` | STRING | Variant name |
| `sku` | STRING | Product SKU |
| `quantity` | INT64 | Quantity returned |
| `unit_price` | FLOAT64 | Unit price |
| `return_reason` | STRING | Reason category |
| `return_reason_detail` | STRING | Detailed reason |
| `condition_on_receipt` | STRING | Item condition when received |
| `was_restocked` | BOOLEAN | Whether item was restocked |
| `was_exchanged` | BOOLEAN | Whether item was exchanged |
| `exchange_type` | STRING | Exchange type if exchanged |
| `created_at` | TIMESTAMP | Event timestamp |
| `event_date` | DATE | Partition column |

**Partitioning**: By `event_date` (DAY)
**Clustering**: `shop_id`, `product_id`
**Retention**: 3 years

---

### Table: `financial_summary`

Aggregated financial metrics per shop per month.

| Column | Type | Description |
|--------|------|-------------|
| `summary_id` | STRING | Unique row ID |
| `shop_id` | STRING | Shop identifier |
| `period_month` | DATE | First day of month |
| `total_returns` | INT64 | Total return requests |
| `total_return_value` | FLOAT64 | Total value of returned items |
| `total_refunded` | FLOAT64 | Total refunded to original payment |
| `total_store_credit` | FLOAT64 | Total issued as store credit |
| `total_exchange_value` | FLOAT64 | Total value of exchange orders |
| `total_bonus_credit` | FLOAT64 | Total bonus credit issued |
| `revenue_retained` | FLOAT64 | store_credit + exchange_value + bonus_credit |
| `revenue_retained_pct` | FLOAT64 | revenue_retained / total_return_value |
| `exchange_rate` | FLOAT64 | % of returns that became exchanges |
| `avg_resolution_time_hours` | FLOAT64 | Average time from request to resolution |
| `total_shipping_cost` | FLOAT64 | Total return shipping costs |
| `total_restocking_fees` | FLOAT64 | Total restocking fees collected |
| `green_returns_count` | INT64 | Keep-item returns |
| `fraud_flagged_count` | INT64 | Fraud-flagged returns |
| `currency` | STRING | Primary currency |

**Partitioning**: By `period_month` (MONTH)
**Clustering**: `shop_id`
**Populated by**: Scheduled Cloud Function (daily aggregation)

---

### Table: `product_return_rates`

Product-level return rate analytics.

| Column | Type | Description |
|--------|------|-------------|
| `record_id` | STRING | Unique row ID |
| `shop_id` | STRING | Shop identifier |
| `product_id` | STRING | Shopify product ID |
| `variant_id` | STRING | Shopify variant ID |
| `product_title` | STRING | Product name |
| `variant_title` | STRING | Variant name |
| `total_sold` | INT64 | Total units sold (from Shopify orders) |
| `total_returned` | INT64 | Total units returned |
| `return_rate` | FLOAT64 | total_returned / total_sold |
| `top_return_reason` | STRING | Most common return reason |
| `top_reason_count` | INT64 | Count of top reason |
| `total_refund_value` | FLOAT64 | Total refund value for this product |
| `total_exchange_value` | FLOAT64 | Total exchange value |
| `period_month` | DATE | Aggregation period |
| `updated_at` | TIMESTAMP | Last updated |

**Partitioning**: By `period_month` (MONTH)
**Clustering**: `shop_id`, `product_id`
**Populated by**: Scheduled Cloud Function (daily aggregation)

---

## 4. API Endpoints (REST)

All API endpoints follow the pattern defined in CLAUDE.md: handlers orchestrate, services contain logic, response format `{success, data, error}`.

### 4.1 Customer Portal API

Base path: `/api/portal`

| Method | Path | Description | Auth | Request Body | Response |
|--------|------|-------------|------|-------------|----------|
| POST | `/api/portal/lookup` | Look up order for return | Public (rate limited) | `{orderNumber, email}` | `{success, data: {order, eligibleItems[]}}` |
| POST | `/api/portal/returns` | Create return request | Public (rate limited) | `{shopId, orderId, items[], resolutionType, shippingMethod}` | `{success, data: {returnId, status, nextSteps}}` |
| GET | `/api/portal/returns/:returnId/status` | Get return status and tracking | Public (token) | -- | `{success, data: {status, tracking, timeline[]}}` |
| POST | `/api/portal/returns/:returnId/photos` | Upload return photos | Public (token) | Multipart form data | `{success, data: {photoUrls[]}}` |

**Portal Lookup Request:**
```json
{
  "orderNumber": "#1234",
  "email": "customer@example.com"
}
```

**Portal Lookup Response:**
```json
{
  "success": true,
  "data": {
    "order": {
      "orderId": "gid://shopify/Order/123",
      "orderName": "#1234",
      "createdAt": "2026-03-01T10:00:00Z",
      "fulfilledAt": "2026-03-03T14:00:00Z",
      "currency": "USD"
    },
    "eligibleItems": [
      {
        "lineItemId": "gid://shopify/LineItem/456",
        "productId": "gid://shopify/Product/789",
        "variantId": "gid://shopify/ProductVariant/101",
        "productTitle": "Classic T-Shirt",
        "variantTitle": "Size M / Blue",
        "quantity": 2,
        "returnableQuantity": 2,
        "unitPrice": 29.99,
        "imageUrl": "https://cdn.shopify.com/...",
        "eligible": true,
        "eligibilityReason": null
      },
      {
        "lineItemId": "gid://shopify/LineItem/457",
        "productTitle": "Gift Card",
        "eligible": false,
        "eligibilityReason": "This item is non-returnable"
      }
    ],
    "returnPolicy": {
      "returnWindowDays": 30,
      "daysRemaining": 22,
      "greenReturnsEnabled": true,
      "greenReturnsThreshold": 15.00,
      "exchangeBonusEnabled": true,
      "exchangeBonusAmount": 5.00
    }
  }
}
```

**Create Return Request:**
```json
{
  "shopId": "mystore.myshopify.com",
  "orderId": "gid://shopify/Order/123",
  "items": [
    {
      "lineItemId": "gid://shopify/LineItem/456",
      "variantId": "gid://shopify/ProductVariant/101",
      "quantity": 1,
      "returnReason": "sizing",
      "returnReasonDetail": "Too small at the waist",
      "photoUrls": ["https://storage.googleapis.com/..."]
    }
  ],
  "resolutionType": "exchange",
  "exchangeDetails": {
    "type": "variant",
    "newVariantId": "gid://shopify/ProductVariant/102"
  },
  "shippingMethod": "label"
}
```

---

### 4.2 Admin API

Base path: `/api/admin`
Auth: Shopify App Bridge session token (verified via middleware).

| Method | Path | Description | Request/Response |
|--------|------|-------------|-----------------|
| GET | `/api/admin/returns` | List returns (paginated, filterable) | Query: `?status=under_review&page=1&limit=20&sort=requestedAt:desc` |
| GET | `/api/admin/returns/:returnId` | Get return detail | Response includes items, exchange, refund, labels, timeline |
| PUT | `/api/admin/returns/:returnId/approve` | Approve return | `{resolutionType, notes}` |
| PUT | `/api/admin/returns/:returnId/reject` | Reject return | `{reason, notes}` |
| PUT | `/api/admin/returns/:returnId/request-info` | Request more info | `{message}` |
| POST | `/api/admin/returns/:returnId/refund` | Process refund | `{type, amount, notes}` |
| POST | `/api/admin/returns/:returnId/exchange` | Create exchange | `{exchangeType, newVariantId, isInstant}` |
| POST | `/api/admin/returns/:returnId/label` | Generate shipping label | `{carrier}` |
| PUT | `/api/admin/returns/:returnId/receive` | Mark item received | `{condition, notes}` |
| POST | `/api/admin/returns/:returnId/notes` | Add internal note | `{content}` |
| POST | `/api/admin/returns/bulk/approve` | Bulk approve | `{returnIds[]}` |
| POST | `/api/admin/returns/bulk/labels` | Bulk generate labels | `{returnIds[], carrier}` |
| GET | `/api/admin/returns/export` | Export returns CSV | Query: `?dateFrom=&dateTo=&status=` |

---

### 4.3 Settings API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/settings` | Get all shop settings |
| PUT | `/api/admin/settings` | Update shop settings |
| GET | `/api/admin/settings/policies` | List return policies |
| POST | `/api/admin/settings/policies` | Create return policy |
| PUT | `/api/admin/settings/policies/:policyId` | Update return policy |
| DELETE | `/api/admin/settings/policies/:policyId` | Delete return policy |
| GET | `/api/admin/settings/reasons` | List return reasons |
| POST | `/api/admin/settings/reasons` | Create return reason |
| PUT | `/api/admin/settings/reasons/:reasonId` | Update return reason |
| DELETE | `/api/admin/settings/reasons/:reasonId` | Delete return reason |
| GET | `/api/admin/settings/templates` | List notification templates |
| PUT | `/api/admin/settings/templates/:templateId` | Update notification template |
| GET | `/api/admin/settings/automation-rules` | List automation rules |
| POST | `/api/admin/settings/automation-rules` | Create automation rule |
| PUT | `/api/admin/settings/automation-rules/:ruleId` | Update automation rule |
| DELETE | `/api/admin/settings/automation-rules/:ruleId` | Delete automation rule |
| GET | `/api/admin/settings/blocklist` | List blocked customers |
| POST | `/api/admin/settings/blocklist` | Add to blocklist |
| DELETE | `/api/admin/settings/blocklist/:blockId` | Remove from blocklist |

---

### 4.4 Analytics API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/analytics/overview` | Dashboard overview metrics | 
| GET | `/api/admin/analytics/reasons` | Return reasons breakdown |
| GET | `/api/admin/analytics/resolutions` | Resolution type distribution |
| GET | `/api/admin/analytics/trends` | Returns volume over time |
| GET | `/api/admin/analytics/products` | Product-level return rates (Pro+) |
| GET | `/api/admin/analytics/products/:productId` | Product detail with variant breakdown (Pro+) |
| GET | `/api/admin/analytics/financial` | Financial impact report (Pro+) |

All analytics endpoints accept query params: `?dateFrom=&dateTo=&period=7d|30d|90d|custom`

---

### 4.5 Onboarding API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/onboarding/status` | Get wizard progress |
| POST | `/api/admin/onboarding/import-policies` | Auto-import Shopify policies |
| PUT | `/api/admin/onboarding/step/:stepNumber` | Save wizard step data |
| POST | `/api/admin/onboarding/complete` | Mark wizard as completed |
| POST | `/api/admin/onboarding/skip` | Skip wizard |

---

## 5. Shopify Webhooks

Webhook handlers must verify HMAC and respond within 5 seconds. Heavy processing is published to Pub/Sub for async execution.

(Ref: File 08 - Webhook Processing Flow sequence diagram)

| Webhook Topic | Trigger | Processing Logic |
|---------------|---------|-----------------|
| `orders/create` | New order placed | Store order data for return eligibility lookup. Update product sold counts for analytics. |
| `orders/updated` | Order status changes | Update fulfillment dates (triggers return window start). Detect cancellations that affect pending returns. |
| `orders/fulfilled` | Order fulfilled | Start return window countdown. Enable order for return portal lookup. |
| `refunds/create` | Refund created (external) | Sync refund status if refund was created outside the app. Prevent duplicate refund processing. |
| `products/update` | Product data changes | Update product titles/variants in cached data. Sync inventory levels for exchange availability. |
| `app/uninstalled` | Merchant uninstalls app | Mark shop as inactive. Queue data cleanup (retain for 30 days per policy). Revoke access tokens. |
| `customers/data_request` | GDPR data request | Generate customer return data export. |
| `customers/redact` | GDPR customer deletion | Delete customer PII from all collections. |
| `shop/redact` | GDPR shop deletion | Delete all shop data from Firestore and BigQuery. |

### Webhook Processing Pattern

```
1. Receive webhook POST
2. Verify HMAC signature (reject with 401 if invalid)
3. Publish event to Pub/Sub topic (e.g., `return.order_updated`)
4. Return 200 OK immediately (< 1 second)
5. Background worker picks up from Pub/Sub
6. Process business logic (read Firestore, call Shopify API, etc.)
7. Update Firestore, send notifications, stream to BigQuery
```

### Pub/Sub Topics

| Topic | Published By | Consumed By |
|-------|-------------|-------------|
| `return.order_created` | orders/create webhook | OrderSyncWorker |
| `return.order_updated` | orders/updated webhook | OrderSyncWorker |
| `return.request_created` | Portal API (create return) | ReturnProcessingWorker, NotificationWorker, FraudDetectionWorker, AnalyticsWorker |
| `return.approved` | Admin API (approve) or AutoApproveService | LabelGenerationWorker, NotificationWorker, AnalyticsWorker |
| `return.completed` | RefundService or ExchangeService | InventoryWorker, NotificationWorker, AnalyticsWorker |
| `exchange.created` | ExchangeService | ShopifyOrderWorker, InventoryWorker, NotificationWorker |
| `refund.processed` | RefundService | NotificationWorker, AnalyticsWorker |
| `analytics.event` | All services | BigQueryStreamWorker |

---

## 6. Infrastructure Cost Estimates

Monthly cost estimates based on usage tiers. Costs scale with active shops and return volume.

### Year 1 Estimates (0-10,000 installs, ~1,000 paid)

| Service | Usage | Monthly Cost |
|---------|-------|-------------|
| Firebase Cloud Functions | ~2M invocations/mo | $0 (free tier covers) - $40 |
| Firestore | ~5M reads, 1M writes/mo | $0 (free tier) - $50 |
| Cloud Storage | ~10GB (photos, labels) | $2 - $5 |
| BigQuery | ~50GB storage, ~1TB queries/mo | $1 (storage) + $5 (queries) |
| Cloud Tasks / Pub/Sub | ~500K messages/mo | $0 (free tier) |
| Redis / Memorystore | Basic tier, 1GB | $30 - $50 |
| EasyPost | ~5,000 labels/mo @ $0.05/label | $250 |
| SendGrid | ~50,000 emails/mo | $0 (free tier) - $20 |
| Twilio SMS | ~2,000 SMS/mo @ $0.0075 | $15 |
| Cloud Logging / Monitoring | Standard | $0 - $20 |
| **Total Year 1** | | **$300 - $500/mo** |

### Year 2 Estimates (10,000-35,000 installs, ~5,500 paid)

| Service | Usage | Monthly Cost |
|---------|-------|-------------|
| Cloud Functions | ~15M invocations/mo | $200 - $400 |
| Firestore | ~30M reads, 8M writes/mo | $200 - $400 |
| Cloud Storage | ~100GB | $20 - $30 |
| BigQuery | ~500GB storage, ~10TB queries/mo | $10 + $50 |
| Cloud Tasks / Pub/Sub | ~3M messages/mo | $10 - $20 |
| Redis / Memorystore | Standard tier, 5GB | $150 - $200 |
| EasyPost | ~30,000 labels/mo | $1,500 |
| SendGrid | ~300,000 emails/mo | $90 |
| Twilio SMS | ~15,000 SMS/mo | $115 |
| Cloud Logging / Monitoring | Enhanced | $50 - $100 |
| **Total Year 2** | | **$2,400 - $3,900/mo** |

### Year 3 Estimates (35,000-70,000 installs, ~17,000 paid)

| Service | Usage | Monthly Cost |
|---------|-------|-------------|
| Cloud Functions | ~60M invocations/mo | $800 - $1,200 |
| Firestore | ~120M reads, 30M writes/mo | $800 - $1,200 |
| Cloud Storage | ~500GB | $100 |
| BigQuery | ~2TB storage, ~50TB queries/mo | $40 + $250 |
| Cloud Tasks / Pub/Sub | ~15M messages/mo | $50 - $80 |
| Redis / Memorystore | Standard tier, 15GB | $400 - $500 |
| EasyPost | ~150,000 labels/mo | $7,500 |
| SendGrid | ~1.5M emails/mo | $400 |
| Twilio SMS | ~75,000 SMS/mo | $565 |
| Cloud Logging / Monitoring | Enhanced | $150 - $200 |
| **Total Year 3** | | **$11,000 - $12,000/mo** |

### Cost as % of Revenue

| Year | Monthly Revenue (from file 04) | Monthly Infra Cost | Infra % of Revenue |
|------|-------------------------------|-------------------|-------------------|
| 1 | ~$8,000 avg | ~$400 | ~5% |
| 2 | ~$100,000 avg | ~$3,200 | ~3.2% |
| 3 | ~$460,000 avg | ~$11,500 | ~2.5% |

Infrastructure costs are well within healthy SaaS margins. The largest variable cost is EasyPost label generation, which can be offset by passing shipping costs to merchants or customers.

---

## 7. Frontend Component Tree

Built with React + Shopify Polaris v12+ as an embedded Shopify admin app.

(Ref: File 08 - Merchant Admin Flow diagram)

```
<App>
├── <AppBridgeProvider>
├── <PolarisProvider>
├── <NavigationMenu>
│   ├── Dashboard
│   ├── Returns
│   ├── Analytics
│   └── Settings
│
├── <Routes>
│   ├── <DashboardPage>
│   │   ├── <MetricsCards>           // Open returns, pending review, revenue retained, exchange rate
│   │   ├── <RecentReturnsTable>     // Last 10 returns with quick actions
│   │   ├── <SetupBanner>           // Show if wizard incomplete
│   │   └── <PlanUsageBanner>       // Show return usage vs limit
│   │
│   ├── <OnboardingWizardPage>
│   │   ├── <WizardProgress>        // Step indicator (1-5)
│   │   ├── <ImportPoliciesStep>    // Step 1: Auto-import from Shopify
│   │   ├── <PortalBrandingStep>    // Step 2: Logo, colors, fonts
│   │   ├── <ShippingSetupStep>     // Step 3: Carrier configuration
│   │   ├── <EmailTemplatesStep>    // Step 4: Preview and customize
│   │   └── <ActivatePortalStep>    // Step 5: Enable theme extension
│   │
│   ├── <ReturnListPage>
│   │   ├── <ReturnFilters>         // Status, date range, customer, product filters
│   │   ├── <ReturnSearchBar>       // Search by order # or email
│   │   ├── <BulkActionBar>         // Approve, labels, export
│   │   ├── <ReturnDataTable>       // Polaris DataTable with selection
│   │   │   └── <ReturnRow>         // Single return row with status badge
│   │   └── <Pagination>
│   │
│   ├── <ReturnDetailPage>
│   │   ├── <ReturnHeader>          // Return ID, status badge, actions dropdown
│   │   ├── <OrderInfoCard>         // Order details, customer info
│   │   ├── <ReturnItemsCard>       // Items with reasons, photos, condition
│   │   │   └── <ReturnItemRow>     // Single item with photo gallery
│   │   ├── <ExchangeInfoCard>      // Exchange details (if applicable)
│   │   ├── <RefundInfoCard>        // Refund details (if applicable)
│   │   ├── <ShippingInfoCard>      // Label, tracking, carrier info
│   │   ├── <ActivityTimeline>      // Chronological event log
│   │   │   └── <TimelineEvent>     // Single event with timestamp
│   │   ├── <ActionButtons>         // Approve, reject, refund, exchange, etc.
│   │   ├── <AddNoteForm>           // Internal note input
│   │   └── <FraudAlertBanner>      // Shown if fraud flagged
│   │
│   ├── <AnalyticsPage>
│   │   ├── <DateRangePicker>       // 7d, 30d, 90d, custom
│   │   ├── <OverviewMetrics>       // KPI cards: total, rate, avg time, retained
│   │   ├── <ReturnReasonsChart>    // Bar chart by reason category
│   │   ├── <ResolutionPieChart>    // Refund vs Exchange vs Store Credit
│   │   ├── <TrendLineChart>        // Returns volume over time
│   │   ├── <ProductInsightsTable>  // Top returned products (Pro+)
│   │   │   └── <ProductDrillDown>  // Variant-level breakdown
│   │   └── <FinancialSummary>      // Revenue impact cards (Pro+)
│   │
│   ├── <SettingsPage>
│   │   ├── <SettingsTabs>          // Tab navigation
│   │   ├── <ReturnPoliciesTab>
│   │   │   ├── <DefaultPolicyForm>
│   │   │   └── <PolicyOverridesList>
│   │   │       └── <PolicyOverrideForm>
│   │   ├── <PortalCustomizationTab>
│   │   │   ├── <LogoUploader>
│   │   │   ├── <ColorPicker>
│   │   │   ├── <FontSelector>
│   │   │   └── <PortalPreview>     // Live preview iframe
│   │   ├── <ShippingConfigTab>
│   │   │   ├── <CarrierSelector>
│   │   │   └── <WarehouseAddressForm>
│   │   ├── <NotificationsTab>
│   │   │   ├── <EmailTemplateEditor>
│   │   │   └── <SmsTemplateEditor>  // Starter+
│   │   ├── <AutomationRulesTab>     // Starter+
│   │   │   ├── <RulesList>
│   │   │   └── <RuleBuilder>
│   │   ├── <ReturnReasonsTab>
│   │   │   └── <DraggableReasonsList>
│   │   ├── <FraudPreventionTab>     // Starter+
│   │   │   ├── <FraudSettings>
│   │   │   └── <BlocklistManager>
│   │   ├── <LanguagesTab>
│   │   │   └── <LanguageToggleList>
│   │   ├── <IntegrationsTab>        // Pro+
│   │   │   ├── <ShopifyFlowCard>
│   │   │   ├── <HelpdeskIntegrationCard>
│   │   │   └── <KlaviyoIntegrationCard>
│   │   └── <BillingTab>
│   │       ├── <CurrentPlanCard>
│   │       ├── <UsageProgressBar>
│   │       └── <UpgradePlanOptions>
│   │
│   └── <PlanUpgradeModal>           // Shown when feature is plan-gated
│
└── <GlobalComponents>
    ├── <ToastProvider>              // Success/error notifications
    ├── <ConfirmationModal>          // Destructive action confirmations
    └── <ErrorBoundary>              // Graceful error handling
```

### Shared Hooks

| Hook | Purpose |
|------|---------|
| `useShopSettings` | Fetch and cache shop settings |
| `useReturnList` | Paginated return list with filters |
| `useReturnDetail` | Single return with all related data |
| `useAnalytics` | Analytics data with date range |
| `usePlanGate` | Check if feature is available on current plan |
| `useBulkAction` | Handle bulk operations with progress |
| `useOnboarding` | Wizard state management |
| `useNotificationTemplates` | Template CRUD |
| `useAutomationRules` | Rules CRUD |

---

## 8. Theme Extension Structure

Customer-facing portal delivered via Theme App Extension (Liquid blocks).

```
extensions/theme-extension/
├── blocks/
│   ├── return-portal.liquid          // Main return portal block
│   ├── return-status-tracker.liquid  // Status tracking block
│   └── return-prevention-widget.liquid // Product page return rate badge (P2)
├── assets/
│   ├── return-portal.js             // Portal JavaScript (order lookup, form handling)
│   ├── return-portal.css            // Portal styles (supports custom branding)
│   └── return-tracker.js            // Tracking page JavaScript
├── locales/
│   ├── en.default.json              // English translations
│   ├── fr.json                      // French
│   ├── de.json                      // German
│   ├── es.json                      // Spanish
│   └── pt-BR.json                   // Brazilian Portuguese
└── snippets/
    ├── return-form.liquid            // Return form partial
    ├── exchange-selector.liquid      // Exchange variant/product selector
    └── photo-uploader.liquid         // Photo upload component
```

---

## Summary

This architecture document covers:

| Section | Key Decisions |
|---------|--------------|
| Firestore Schema | 14 collections with field definitions, indexes, and TTL policies |
| BigQuery Model | 4 tables with partitioning (date/month) and clustering (shopId, productId) |
| API Endpoints | 40+ REST endpoints across Portal, Admin, Settings, Analytics, and Onboarding |
| Webhooks | 9 Shopify webhook topics with async Pub/Sub processing pattern |
| Infrastructure | Cost estimates from $400/mo (Y1) to $11,500/mo (Y3), maintaining 2.5-5% of revenue |
| Frontend | Full component tree with 25+ page/section components and 9 shared hooks |
| Theme Extension | 3 Liquid blocks, 5 locale files, customer-facing portal architecture |

All designs reference the system architecture, data flow, ERD, and deployment diagrams from file 08. Feature gating aligns with the pricing tiers from file 02 and file 06 (Free: 50 returns, Starter: $9/150, Pro: $29/500, Enterprise: $99/2000).
