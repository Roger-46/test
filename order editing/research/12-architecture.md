# Technical Architecture
# Avada Order Editing

---

## 1. Firestore Schema

### Collection: `shops`

Primary store configuration. Document ID = Shopify shop domain (e.g., `my-store.myshopify.com`).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `shopId` | string | Yes | Shopify shop domain (same as doc ID) |
| `domain` | string | Yes | Custom domain if configured |
| `shopifyGid` | string | Yes | Shopify shop GID (`gid://shopify/Shop/123`) |
| `accessToken` | string | Yes | Encrypted Shopify API access token |
| `plan` | string | Yes | `free \| starter \| growth \| pro \| business \| enterprise` |
| `status` | string | Yes | `active \| inactive \| uninstalled` |
| `email` | string | Yes | Shop owner email |
| `name` | string | Yes | Shop name |
| `currency` | string | Yes | Store currency (ISO 4217) |
| `timezone` | string | Yes | IANA timezone |
| `shopifyPlan` | string | No | Shopify plan name (basic, shopify, advanced, plus) |
| `installedAt` | timestamp | Yes | App installation timestamp |
| `uninstalledAt` | timestamp | No | App uninstallation timestamp |
| `onboardingCompleted` | boolean | Yes | Whether setup wizard is complete |
| `createdAt` | timestamp | Yes | Document creation time |
| `updatedAt` | timestamp | Yes | Last update time |

**Indexes:** None (queried by document ID only).

---

### Collection: `editSettings`

Per-shop configuration for edit behavior. One document per shop. Document ID = `shopId`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `shopId` | string | Yes | Reference to shops collection |
| `timeWindowMinutes` | number | Yes | Edit window duration in minutes (default: 120) |
| `timeWindowType` | string | Yes | `minutes \| hours \| before_fulfillment` |
| `allowAddressEdit` | boolean | Yes | Enable address editing |
| `allowItemSwap` | boolean | Yes | Enable variant swapping |
| `allowQuantityChange` | boolean | Yes | Enable quantity changes |
| `allowAddItem` | boolean | Yes | Enable adding new items |
| `allowRemoveItem` | boolean | Yes | Enable removing items |
| `allowCancellation` | boolean | Yes | Enable customer cancellation |
| `maxEditsPerOrder` | number | Yes | Max edits per order (default: 5) |
| `notifyMerchantOnEdit` | boolean | Yes | Send merchant email on edits |
| `notifyMerchantOnCancel` | boolean | Yes | Send merchant email on cancellation |
| `notifyCustomerOnMerchantEdit` | boolean | Yes | Notify customer of merchant edits |
| `merchantNotificationEmail` | string | No | Override email for merchant notifications |
| `showOnOrderStatusPage` | boolean | Yes | Show widget on order status page |
| `showOnThankYouPage` | boolean | Yes | Show widget on thank-you page |
| `widgetPrimaryColor` | string | No | Custom primary color hex |
| `widgetText` | object | No | Custom text overrides for widget labels |
| `retentionEnabled` | boolean | Yes | Enable cancellation retention flow |
| `retentionOffers` | array | No | Array of retention offer objects |
| `upsellEnabled` | boolean | Yes | Enable post-purchase upsell |
| `storeCreditEnabled` | boolean | Yes | Enable store credit refund option |
| `storeCreditBonusPercent` | number | No | Bonus % for choosing store credit |
| `addressValidationEnabled` | boolean | Yes | Enable Google Address Validation |
| `createdAt` | timestamp | Yes | Document creation time |
| `updatedAt` | timestamp | Yes | Last update time |

**Indexes:** None (queried by document ID only).

---

### Collection: `editRules`

Per-product or per-collection edit rules. Subcollection or top-level scoped by shopId.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Auto-generated document ID |
| `shopId` | string | Yes | Reference to shops collection |
| `ruleType` | string | Yes | `product \| collection \| tag \| all` |
| `targetId` | string | Yes | Shopify product/collection GID, or `*` for all |
| `targetTitle` | string | No | Product/collection title for display |
| `allowSwap` | boolean | Yes | Allow variant swaps for this target |
| `allowQuantityChange` | boolean | Yes | Allow quantity changes |
| `allowRemove` | boolean | Yes | Allow item removal |
| `swapTargets` | array | No | Restrict swaps to specific variant GIDs |
| `minQuantity` | number | No | Minimum allowed quantity |
| `maxQuantity` | number | No | Maximum allowed quantity |
| `active` | boolean | Yes | Whether rule is active |
| `priority` | number | Yes | Rule evaluation priority (higher = checked first) |
| `createdAt` | timestamp | Yes | Document creation time |
| `updatedAt` | timestamp | Yes | Last update time |

**Indexes:**
```
shopId ASC, active ASC, ruleType ASC
shopId ASC, targetId ASC
```

---

### Collection: `orders`

Synced order data from Shopify. Tracks edit window state.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Auto-generated document ID |
| `shopId` | string | Yes | Reference to shops collection |
| `shopifyOrderId` | string | Yes | Shopify order GID (`gid://shopify/Order/123`) |
| `shopifyOrderNumber` | number | Yes | Numeric order number |
| `orderNumber` | string | Yes | Display order number (`#1001`) |
| `customerEmail` | string | No | Customer email address |
| `customerName` | string | No | Customer full name |
| `customerShopifyId` | string | No | Shopify customer GID |
| `financialStatus` | string | Yes | `paid \| partially_refunded \| refunded \| pending` |
| `fulfillmentStatus` | string | Yes | `unfulfilled \| partial \| fulfilled` |
| `editWindowStatus` | string | Yes | `open \| closed \| expired` |
| `editWindowExpiresAt` | timestamp | No | When the edit window closes |
| `editCount` | number | Yes | Number of edits applied (default: 0) |
| `cancelledViaApp` | boolean | Yes | Whether cancelled via our app |
| `originalTotalPrice` | number | Yes | Original order total in shop currency |
| `currentTotalPrice` | number | Yes | Current total after edits |
| `currency` | string | Yes | Order currency (ISO 4217) |
| `lineItems` | array | Yes | Simplified line item snapshots for quick display |
| `shippingAddress` | object | No | Current shipping address |
| `tags` | array | No | Shopify order tags |
| `orderCreatedAt` | timestamp | Yes | Shopify order creation time |
| `lastEditedAt` | timestamp | No | Last edit timestamp |
| `syncedAt` | timestamp | Yes | Last sync from Shopify |
| `createdAt` | timestamp | Yes | Document creation time |
| `updatedAt` | timestamp | Yes | Last update time |

**`lineItems` array element:**
```json
{
  "shopifyLineItemId": "gid://shopify/LineItem/123",
  "variantId": "gid://shopify/ProductVariant/456",
  "productId": "gid://shopify/Product/789",
  "title": "Classic T-Shirt",
  "variantTitle": "Medium / Blue",
  "quantity": 2,
  "price": "25.00",
  "imageUrl": "https://cdn.shopify.com/..."
}
```

**`shippingAddress` object:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "address1": "123 Main St",
  "address2": "Apt 4B",
  "city": "New York",
  "province": "New York",
  "provinceCode": "NY",
  "country": "United States",
  "countryCode": "US",
  "zip": "10001",
  "phone": "+1-555-123-4567"
}
```

**Indexes:**
```
shopId ASC, editWindowStatus ASC, orderCreatedAt DESC
shopId ASC, shopifyOrderId ASC
shopId ASC, customerEmail ASC, orderCreatedAt DESC
shopId ASC, fulfillmentStatus ASC, editWindowStatus ASC
editWindowStatus ASC, editWindowExpiresAt ASC  (for scheduled expiry)
```

---

### Collection: `orderEdits`

Record of every edit or cancellation performed.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Auto-generated document ID |
| `shopId` | string | Yes | Reference to shops collection |
| `orderId` | string | Yes | Reference to orders collection doc ID |
| `shopifyOrderId` | string | Yes | Shopify order GID |
| `editType` | string | Yes | `item_swap \| quantity_change \| address_edit \| add_item \| remove_item \| cancel` |
| `initiatedBy` | string | Yes | `customer \| merchant` |
| `status` | string | Yes | `pending \| processing \| applied \| rejected \| failed` |
| `changes` | array | Yes | Array of change detail objects |
| `priceDiff` | number | Yes | Positive = charge customer, negative = refund, 0 = no change |
| `newTotalPrice` | number | Yes | Order total after this edit |
| `refundId` | string | No | Shopify refund GID if refund was issued |
| `invoiceUrl` | string | No | Invoice URL if additional charge needed |
| `reason` | string | No | Customer-provided reason for the edit |
| `staffNote` | string | No | Merchant-provided note |
| `previousState` | object | No | Snapshot of changed fields before edit |
| `newState` | object | No | Snapshot of changed fields after edit |
| `upsellAccepted` | boolean | No | Whether customer accepted a post-edit upsell |
| `upsellRevenue` | number | No | Revenue from accepted upsell items |
| `retentionOfferId` | string | No | ID of retention offer that saved the order |
| `retentionType` | string | No | `discount \| swap \| delay` |
| `requestedAt` | timestamp | Yes | When the edit was requested |
| `processedAt` | timestamp | No | When the edit was completed |
| `createdAt` | timestamp | Yes | Document creation time |

**`changes` array element:**
```json
{
  "type": "item_swap",
  "lineItemId": "gid://shopify/LineItem/123",
  "fromVariantId": "gid://shopify/ProductVariant/456",
  "fromVariantTitle": "Medium / Blue",
  "toVariantId": "gid://shopify/ProductVariant/789",
  "toVariantTitle": "Large / Blue",
  "fromQuantity": 2,
  "toQuantity": 2,
  "priceDiff": "5.00"
}
```

**Indexes:**
```
shopId ASC, orderId ASC, requestedAt DESC
shopId ASC, editType ASC, requestedAt DESC
shopId ASC, status ASC, requestedAt DESC
shopId ASC, initiatedBy ASC, requestedAt DESC
shopId ASC, requestedAt DESC
```

---

### Collection: `subscriptions`

Billing and plan data. One active document per shop.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Auto-generated document ID |
| `shopId` | string | Yes | Reference to shops collection |
| `plan` | string | Yes | `free \| starter \| growth \| pro \| business \| enterprise` |
| `status` | string | Yes | `active \| frozen \| cancelled \| pending` |
| `shopifyChargeId` | string | No | Shopify recurring application charge ID |
| `monthlyEditLimit` | number | Yes | 50, 200, or -1 (unlimited) |
| `currentMonthUsage` | number | Yes | Edits used in current billing cycle |
| `billingCycleStart` | timestamp | Yes | Current billing cycle start |
| `billingCycleEnd` | timestamp | Yes | Current billing cycle end |
| `trialEndsAt` | timestamp | No | Free trial end date |
| `cancelledAt` | timestamp | No | Plan cancellation date |
| `createdAt` | timestamp | Yes | Document creation time |
| `updatedAt` | timestamp | Yes | Last update time |

**Indexes:**
```
shopId ASC, status ASC
status ASC, billingCycleEnd ASC  (for monthly reset cron)
```

---

### Collection: `upsellOffers`

Merchant-configured post-edit upsell offers.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Auto-generated document ID |
| `shopId` | string | Yes | Reference to shops collection |
| `title` | string | Yes | Internal offer name |
| `offerType` | string | Yes | `complementary \| upgrade \| bundle \| discount` |
| `triggerType` | string | Yes | `product \| collection \| cart_value \| edit_type` |
| `triggerValue` | string | Yes | Product GID, collection GID, or threshold value |
| `recommendedProducts` | array | Yes | Array of product variant GIDs to recommend |
| `discountPercent` | number | No | Discount percentage on upsell product |
| `discountType` | string | No | `percentage \| fixed_amount` |
| `discountValue` | number | No | Discount amount |
| `priority` | number | Yes | Display order (lower = first) |
| `active` | boolean | Yes | Whether offer is active |
| `impressions` | number | Yes | Total times shown (denormalized counter) |
| `conversions` | number | Yes | Total times accepted (denormalized counter) |
| `revenue` | number | Yes | Total revenue generated (denormalized) |
| `createdAt` | timestamp | Yes | Document creation time |
| `updatedAt` | timestamp | Yes | Last update time |

**Indexes:**
```
shopId ASC, active ASC, triggerType ASC, priority ASC
```

---

### Collection: `notifications`

Email/SMS notification log with TTL.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Auto-generated document ID |
| `shopId` | string | Yes | Reference to shops collection |
| `orderId` | string | No | Reference to orders collection |
| `editId` | string | No | Reference to orderEdits collection |
| `type` | string | Yes | `edit_confirmation \| cancel_confirmation \| retention_offer \| upsell_accepted \| invoice \| merchant_notification` |
| `channel` | string | Yes | `email` |
| `recipient` | string | Yes | Email address |
| `subject` | string | Yes | Email subject line |
| `status` | string | Yes | `queued \| sent \| failed \| bounced` |
| `templateId` | string | Yes | Email template identifier |
| `templateData` | object | Yes | Dynamic template variables |
| `errorMessage` | string | No | Error details if send failed |
| `sentAt` | timestamp | No | When email was sent |
| `createdAt` | timestamp | Yes | Document creation time |
| `expiresAt` | timestamp | Yes | TTL: auto-delete after 30 days |

**Indexes:**
```
shopId ASC, type ASC, createdAt DESC
shopId ASC, status ASC, createdAt DESC
```

**TTL Policy:** `expiresAt` field, Firestore TTL auto-deletion.

---

### Collection: `analyticsEvents`

Raw event stream for analytics pipeline. Short-lived with TTL.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Auto-generated document ID |
| `shopId` | string | Yes | Reference to shops collection |
| `eventType` | string | Yes | `edit_applied \| edit_rejected \| cancel_completed \| retention_success \| retention_failed \| upsell_shown \| upsell_accepted \| upsell_declined \| widget_viewed \| edit_page_opened` |
| `orderId` | string | No | Related order doc ID |
| `editId` | string | No | Related edit doc ID |
| `eventData` | object | Yes | Event-specific payload |
| `createdAt` | timestamp | Yes | Event timestamp |
| `expiresAt` | timestamp | Yes | TTL: auto-delete after 90 days |

**Indexes:**
```
shopId ASC, eventType ASC, createdAt DESC
```

**TTL Policy:** `expiresAt` field, Firestore TTL auto-deletion. Data is synced to BigQuery before expiry.

---

### Collection: `webhookLogs`

Idempotency tracking for Shopify webhooks. Short-lived with TTL.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Shopify webhook `X-Shopify-Webhook-Id` header value |
| `shopId` | string | Yes | Shop domain from webhook |
| `topic` | string | Yes | Webhook topic (e.g., `orders/create`) |
| `receivedAt` | timestamp | Yes | When webhook was received |
| `expiresAt` | timestamp | Yes | TTL: auto-delete after 7 days |

**TTL Policy:** `expiresAt` field, 7-day auto-deletion.

---

## 2. API Endpoints

All endpoints are hosted on Firebase Functions. Base path: `/api`

### Authentication
- **Storefront endpoints** (customer-facing): Authenticated via order token (order ID + email hash) passed as query param or header
- **Admin endpoints** (merchant-facing): Authenticated via Shopify App Bridge session token (JWT verified against app secret)
- **Webhook endpoints**: Authenticated via HMAC-SHA256 signature verification

### Storefront API (Customer-Facing)

| Method | Path | Description | Auth | Request | Response |
|--------|------|-------------|------|---------|----------|
| GET | `/api/orders/:orderId/edit-eligibility` | Check if order is eligible for editing | Order token | Query: `token` | `{eligible, allowedActions[], timeRemaining, editWindowExpiresAt}` |
| GET | `/api/orders/:orderId/edit-options` | Get editable line items with swap/qty options | Order token | Query: `token` | `{lineItems[], swapOptions{}, quantityLimits{}}` |
| POST | `/api/orders/:orderId/edits` | Submit edit changes for validation and price calculation | Order token | `{changes[{type, lineItemId, newVariantId, newQty}]}` | `{valid, priceDiff, newTotal, upsellOffers[]}` |
| POST | `/api/orders/:orderId/edits/confirm` | Confirm and apply the validated edit | Order token | `{changes[], upsellItems[]}` | `{success, updatedOrder, refundAmount, invoiceUrl}` |
| POST | `/api/orders/:orderId/cancel/init` | Initialize cancellation flow (check eligibility, get retention offers) | Order token | `{}` | `{eligible, retentionOffers[], reason}` |
| POST | `/api/orders/:orderId/cancel/confirm` | Confirm order cancellation | Order token | `{reason}` | `{cancelled, refundAmount}` |
| POST | `/api/orders/:orderId/cancel/retain` | Accept a retention offer instead of cancelling | Order token | `{retentionType, offerId, newVariantId?}` | `{retained, discount?, swappedProduct?}` |
| POST | `/api/orders/:orderId/address` | Update shipping address | Order token | `{address{address1, address2, city, province, country, zip, phone}}` | `{success, updatedAddress}` |
| POST | `/api/orders/:orderId/address/validate` | Validate address via Google API | Order token | `{address{...}}` | `{valid, suggestions[], confidence}` |
| GET | `/api/orders/:orderId/edit-history` | Get edit history for an order | Order token | Query: `token` | `{edits[]}` |

### Admin API (Merchant-Facing)

| Method | Path | Description | Auth | Request | Response |
|--------|------|-------------|------|---------|----------|
| GET | `/api/admin/orders` | List orders with edit status | Session token | Query: `status, page, limit, search, sort` | `{orders[], pagination{page, totalPages, total}}` |
| GET | `/api/admin/orders/:orderId` | Get order detail with edit history | Session token | - | `{order, edits[], editEligibility}` |
| POST | `/api/admin/orders/:orderId/edit/begin` | Begin merchant edit session | Session token | `{}` | `{editSession, lineItems[], availableProducts[]}` |
| POST | `/api/admin/orders/:orderId/edit/commit` | Commit merchant edit | Session token | `{changes[], notifyCustomer, staffNote}` | `{success, updatedOrder, priceDiff}` |
| POST | `/api/admin/orders/:orderId/cancel` | Cancel order as merchant | Session token | `{reason, notifyCustomer, restock}` | `{success, refundAmount}` |
| GET | `/api/admin/settings` | Get shop edit settings | Session token | - | `{settings}` |
| PUT | `/api/admin/settings` | Update shop edit settings | Session token | `{settings{...}}` | `{success, settings}` |
| GET | `/api/admin/rules` | List edit rules | Session token | Query: `page, limit` | `{rules[], pagination}` |
| POST | `/api/admin/rules` | Create edit rule | Session token | `{ruleType, targetId, allowSwap, ...}` | `{success, rule}` |
| PUT | `/api/admin/rules/:ruleId` | Update edit rule | Session token | `{allowSwap, minQuantity, ...}` | `{success, rule}` |
| DELETE | `/api/admin/rules/:ruleId` | Delete edit rule | Session token | - | `{success}` |
| GET | `/api/admin/analytics/overview` | Dashboard metrics overview | Session token | Query: `startDate, endDate` | `{totalEdits, editsByType, cancellations, retentionRate, upsellRevenue}` |
| GET | `/api/admin/analytics/edits` | Edit analytics detail | Session token | Query: `startDate, endDate, groupBy` | `{data[], chart{labels, datasets}}` |
| GET | `/api/admin/analytics/products` | Top edited products | Session token | Query: `startDate, endDate, limit` | `{products[{productId, title, editCount, editTypes}]}` |
| GET | `/api/admin/analytics/export` | Export analytics CSV | Session token | Query: `startDate, endDate, type` | CSV file download |
| GET | `/api/admin/subscription` | Get current subscription | Session token | - | `{plan, usage, limit, billingCycle}` |
| POST | `/api/admin/subscription/upgrade` | Initiate plan upgrade | Session token | `{plan}` | `{confirmationUrl}` |
| GET | `/api/admin/upsell-offers` | List upsell offers | Session token | - | `{offers[]}` |
| POST | `/api/admin/upsell-offers` | Create upsell offer | Session token | `{offerType, triggerType, ...}` | `{success, offer}` |
| PUT | `/api/admin/upsell-offers/:offerId` | Update upsell offer | Session token | `{...}` | `{success, offer}` |
| DELETE | `/api/admin/upsell-offers/:offerId` | Delete upsell offer | Session token | - | `{success}` |

### Webhook Endpoints

| Method | Path | Shopify Topic | Description |
|--------|------|---------------|-------------|
| POST | `/webhooks/orders/create` | `orders/create` | Sync new order, open edit window |
| POST | `/webhooks/orders/updated` | `orders/updated` | Sync order state, close window if fulfilled |
| POST | `/webhooks/orders/cancelled` | `orders/cancelled` | Mark order cancelled, void pending edits |
| POST | `/webhooks/orders/fulfilled` | `orders/fulfilled` | Close edit window |
| POST | `/webhooks/orders/partially-fulfilled` | `orders/partially_fulfilled` | Update fulfillment status |
| POST | `/webhooks/app/uninstalled` | `app/uninstalled` | Cleanup: clear tokens, mark inactive |
| POST | `/webhooks/shop/update` | `shop/update` | Sync shop settings changes |

### App Proxy Endpoint

| Method | Path | Description |
|--------|------|-------------|
| GET/POST | `/app-proxy/*` | Proxied requests from storefront (customer edit pages) |

---

## 3. Shopify Webhooks Processing

### Webhook Handler Pattern

All webhook handlers follow this flow:
1. Receive POST from Shopify
2. Verify HMAC-SHA256 signature
3. Check idempotency (deduplicate by webhook ID in `webhookLogs`)
4. Respond 200 OK immediately (within 5 seconds)
5. Publish message to Cloud Pub/Sub for async processing

### Webhook Details

#### `orders/create`
- **Pub/Sub Topic:** `order-events`
- **Processing:**
  1. Fetch `editSettings` for the shop
  2. Calculate `editWindowExpiresAt` = `orderCreatedAt` + `timeWindowMinutes`
  3. Create document in `orders` collection with `editWindowStatus: "open"`
  4. Schedule Cloud Task for edit window expiry (if using time-based window)
  5. Log `analyticsEvents` entry

#### `orders/updated`
- **Pub/Sub Topic:** `order-events`
- **Processing:**
  1. Fetch existing order document by `shopifyOrderId`
  2. If not found (edited outside our app), skip
  3. Compare fulfillment status changes
  4. If `fulfillmentStatus` changed to `partial` or `fulfilled`, set `editWindowStatus: "closed"`
  5. Update `financialStatus`, `currentTotalPrice`, `lineItems` snapshot
  6. Update `syncedAt`

#### `orders/cancelled`
- **Pub/Sub Topic:** `order-events`
- **Processing:**
  1. Update order document: `editWindowStatus: "closed"`, `cancelledViaApp: false` (external cancel)
  2. Find any pending `orderEdits` and set `status: "void"`
  3. Log analytics event

#### `orders/fulfilled`
- **Pub/Sub Topic:** `order-events`
- **Processing:**
  1. Update `fulfillmentStatus: "fulfilled"`, `editWindowStatus: "closed"`

#### `orders/partially_fulfilled`
- **Pub/Sub Topic:** `order-events`
- **Processing:**
  1. Update `fulfillmentStatus: "partial"`
  2. If `timeWindowType` is `before_fulfillment`, set `editWindowStatus: "closed"`

#### `app/uninstalled`
- **Pub/Sub Topic:** `app-events`
- **Processing:**
  1. Update shop document: `status: "uninstalled"`, `uninstalledAt: now()`
  2. Clear `accessToken` (security)
  3. Update subscription: `status: "cancelled"`
  4. Log analytics event
  5. Do NOT delete merchant data (allow re-install recovery)

#### `shop/update`
- **Pub/Sub Topic:** `app-events`
- **Processing:**
  1. Update shop document with new shop name, email, currency, timezone if changed

---

## 4. Shopify GraphQL Mutations

### Order Editing Mutations

#### Begin Edit Session
```graphql
mutation orderEditBegin($id: ID!) {
  orderEditBegin(id: $id) {
    calculatedOrder {
      id
      originalOrder {
        id
        name
        currentTotalPriceSet {
          shopMoney { amount currencyCode }
        }
      }
      addedLineItems(first: 50) {
        edges {
          node {
            id
            title
            quantity
            originalUnitPriceSet {
              shopMoney { amount currencyCode }
            }
          }
        }
      }
      lineItems(first: 100) {
        edges {
          node {
            id
            title
            variant { id title }
            quantity
            originalUnitPriceSet {
              shopMoney { amount currencyCode }
            }
          }
        }
      }
    }
    userErrors { field message }
  }
}
```

#### Set Line Item Quantity
```graphql
mutation orderEditSetQuantity($id: ID!, $lineItemId: ID!, $quantity: Int!) {
  orderEditSetQuantity(
    id: $id
    lineItemId: $lineItemId
    quantity: $quantity
    restock: true
  ) {
    calculatedOrder {
      id
      lineItems(first: 100) {
        edges {
          node { id quantity }
        }
      }
    }
    userErrors { field message }
  }
}
```

#### Add Variant (for item swap or adding new item)
```graphql
mutation orderEditAddVariant($id: ID!, $variantId: ID!, $quantity: Int!) {
  orderEditAddVariant(
    id: $id
    variantId: $variantId
    quantity: $quantity
  ) {
    calculatedOrder {
      id
      addedLineItems(first: 50) {
        edges {
          node {
            id
            title
            quantity
            originalUnitPriceSet {
              shopMoney { amount currencyCode }
            }
          }
        }
      }
    }
    userErrors { field message }
  }
}
```

#### Add Line Item Discount (for retention offers)
```graphql
mutation orderEditAddLineItemDiscount(
  $id: ID!
  $lineItemId: ID!
  $discount: OrderEditAppliedDiscountInput!
) {
  orderEditAddLineItemDiscount(
    id: $id
    lineItemId: $lineItemId
    discount: $discount
  ) {
    calculatedOrder { id }
    addedDiscountStagedChange {
      id
      value {
        ... on MoneyV2 { amount currencyCode }
        ... on PricingPercentageValue { percentage }
      }
    }
    userErrors { field message }
  }
}
```

#### Commit Edit
```graphql
mutation orderEditCommit($id: ID!, $notifyCustomer: Boolean, $staffNote: String) {
  orderEditCommit(
    id: $id
    notifyCustomer: $notifyCustomer
    staffNote: $staffNote
  ) {
    order {
      id
      name
      currentTotalPriceSet {
        shopMoney { amount currencyCode }
      }
      lineItems(first: 100) {
        edges {
          node {
            id
            title
            quantity
            variant { id title }
          }
        }
      }
    }
    userErrors { field message }
  }
}
```

### Order Address Update
```graphql
mutation orderUpdate($input: OrderInput!) {
  orderUpdate(input: $input) {
    order {
      id
      shippingAddress {
        address1 address2 city province provinceCode
        country countryCode zip phone
      }
    }
    userErrors { field message }
  }
}
```

**Input:**
```json
{
  "id": "gid://shopify/Order/123",
  "shippingAddress": {
    "address1": "456 New St",
    "city": "New York",
    "province": "New York",
    "countryCode": "US",
    "zip": "10002"
  }
}
```

### Order Cancellation
```graphql
mutation orderCancel($orderId: ID!, $reason: OrderCancelReason!, $refund: Boolean!, $restock: Boolean!) {
  orderCancel(
    orderId: $orderId
    reason: $reason
    refund: $refund
    restock: $restock
  ) {
    job { id done }
    orderCancelUserErrors { field message code }
  }
}
```

### Invoice (for additional charges)
```graphql
mutation orderInvoiceSend($id: ID!) {
  orderInvoiceSend(id: $id) {
    order {
      id
      paymentTerms {
        paymentSchedules(first: 1) {
          edges {
            node { dueAt completedAt }
          }
        }
      }
    }
    userErrors { field message }
  }
}
```

### Product Query (for swap options)
```graphql
query productVariants($productId: ID!) {
  product(id: $productId) {
    id
    title
    variants(first: 100) {
      edges {
        node {
          id
          title
          price
          availableForSale
          inventoryQuantity
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
          }
        }
      }
    }
  }
}
```

### Gift Card (for store credit)
```graphql
mutation giftCardCreate($input: GiftCardCreateInput!) {
  giftCardCreate(input: $input) {
    giftCard {
      id
      lastCharacters
      initialValue { amount currencyCode }
    }
    userErrors { field message }
  }
}
```

---

## 5. Background Jobs

### Cloud Pub/Sub Topics

| Topic | Subscribers | Purpose |
|-------|-------------|---------|
| `order-events` | `processOrderEvent` | Handle order create/update/cancel/fulfill webhooks |
| `edit-events` | `processEditEvent` | Handle edit applied/rejected events, update analytics |
| `notification-events` | `processNotification` | Send email notifications (decoupled from edit flow) |
| `analytics-events` | `processAnalyticsEvent` | Write events to BigQuery |
| `app-events` | `processAppEvent` | Handle app install/uninstall |
| `dlq-events` | (Dead Letter) | Failed messages after max retries, for manual review |

### Pub/Sub Message Schema

```json
{
  "type": "order.created | order.updated | order.cancelled | edit.applied | notification.send",
  "shopId": "my-store.myshopify.com",
  "data": { },
  "timestamp": "2026-04-01T10:00:00Z",
  "correlationId": "uuid-v4"
}
```

### Cloud Tasks Queues

| Queue | Purpose | Rate Limit | Retry |
|-------|---------|------------|-------|
| `edit-window-expiry` | Schedule edit window closure at exact expiry time | 10/sec | 3 retries, exponential backoff |
| `email-send` | Rate-limited email sending | 5/sec | 5 retries |
| `analytics-sync` | Batch sync events to BigQuery | 2/sec | 3 retries |
| `shopify-api` | Rate-limited Shopify API calls (for bulk operations) | 2/sec per store | 5 retries, exponential backoff |

### Scheduled Functions (Cloud Scheduler)

| Schedule | Function | Description |
|----------|----------|-------------|
| Every 5 minutes | `expireEditWindows` | Query orders where `editWindowStatus = "open"` AND `editWindowExpiresAt < now()`, set to `"expired"` |
| 1st of each month, 00:00 UTC | `resetMonthlyUsage` | Reset `currentMonthUsage` to 0 for all active subscriptions |
| Daily at 02:00 UTC | `syncAnalyticsToBigQuery` | Batch export `analyticsEvents` from Firestore to BigQuery |
| Daily at 03:00 UTC | `generateDailyAggregates` | Compute daily aggregate metrics per shop in BigQuery |
| Weekly, Sunday 04:00 UTC | `cleanupStaleData` | Remove orphaned documents, verify data consistency |

---

## 6. Frontend Component Tree

### Admin App (React + Polaris)

```
<AppProvider>                           # Polaris AppProvider + i18n
├── <AppBridgeProvider>                 # Shopify App Bridge
│   ├── <NavigationMenu>                # Left sidebar navigation
│   └── <Routes>
│       ├── <DashboardPage>             # /
│       │   ├── <DashboardHeader>       # Page title + date range picker
│       │   ├── <MetricCards>           # KPI cards (edits, cancels, savings)
│       │   │   ├── <MetricCard>        # Individual metric card
│       │   │   └── <MetricCard>
│       │   ├── <RecentEditsTable>      # Last 10 edits
│       │   │   └── <EditRow>
│       │   └── <QuickActions>          # Setup incomplete? CTA cards
│       │
│       ├── <OrdersPage>                # /orders
│       │   ├── <OrderFilters>          # Status, search, date filters
│       │   ├── <OrdersResourceList>    # Polaris ResourceList
│       │   │   └── <OrderResourceItem> # Individual order row
│       │   └── <Pagination>
│       │
│       ├── <OrderDetailPage>           # /orders/:orderId
│       │   ├── <OrderHeader>           # Order #, status badges
│       │   ├── <OrderTimeline>         # Edit history timeline
│       │   │   └── <TimelineEvent>
│       │   ├── <LineItemsList>         # Current line items
│       │   │   └── <LineItemCard>
│       │   ├── <ShippingAddressCard>   # Current shipping address
│       │   ├── <EditOrderModal>        # Modal for merchant editing
│       │   │   ├── <VariantSwapPicker> # Product variant selector
│       │   │   ├── <QuantityStepper>   # Qty +/- control
│       │   │   ├── <ProductSearchBar>  # Add new product search
│       │   │   ├── <PriceDiffSummary>  # Price change breakdown
│       │   │   └── <EditConfirmation>  # Confirm changes
│       │   └── <CancelOrderModal>      # Cancel confirmation modal
│       │
│       ├── <SettingsPage>              # /settings
│       │   ├── <GeneralSettings>       # Time window, allowed actions
│       │   │   ├── <TimeWindowPicker>
│       │   │   └── <EditTypeToggles>
│       │   ├── <NotificationSettings>  # Email notification config
│       │   │   └── <TemplatePreview>
│       │   ├── <WidgetSettings>        # Widget appearance config
│       │   │   ├── <ColorPicker>
│       │   │   └── <WidgetPreview>
│       │   ├── <RetentionSettings>     # Cancellation retention config
│       │   │   └── <RetentionOfferForm>
│       │   └── <AdvancedSettings>      # Rate limits, data retention
│       │
│       ├── <EditRulesPage>             # /rules
│       │   ├── <RulesTable>            # List all rules
│       │   │   └── <RuleRow>
│       │   ├── <CreateRuleModal>       # Add new rule
│       │   │   ├── <ProductPicker>     # Shopify resource picker
│       │   │   └── <RuleConfigForm>
│       │   └── <EditRuleModal>         # Edit existing rule
│       │
│       ├── <AnalyticsPage>             # /analytics
│       │   ├── <DateRangePicker>
│       │   ├── <OverviewMetrics>       # Summary cards
│       │   ├── <EditsChart>            # Line/bar chart of edits over time
│       │   ├── <EditTypeBreakdown>     # Pie chart by edit type
│       │   ├── <TopEditedProducts>     # Table of most edited products
│       │   ├── <RetentionMetrics>      # Retention rate, revenue saved
│       │   ├── <UpsellMetrics>         # Upsell conversion, revenue
│       │   └── <ExportButton>          # CSV export
│       │
│       ├── <UpsellOffersPage>          # /upsell-offers
│       │   ├── <OffersTable>
│       │   │   └── <OfferRow>
│       │   ├── <CreateOfferModal>
│       │   │   ├── <ProductPicker>
│       │   │   └── <OfferConfigForm>
│       │   └── <OfferPerformance>      # Impressions, conversions, revenue
│       │
│       ├── <SubscriptionPage>          # /subscription
│       │   ├── <CurrentPlanCard>       # Current plan + usage meter
│       │   ├── <PlanComparison>        # Feature comparison grid
│       │   └── <UpgradeButton>
│       │
│       └── <OnboardingPage>            # /onboarding (first-run)
│           ├── <WelcomeStep>
│           ├── <ConfigureStep>         # Set basic settings
│           ├── <ActivateWidgetStep>    # Enable theme extension
│           └── <CompleteStep>          # Success + next steps
```

### Custom Hooks

```
hooks/
├── useOrders.js                # Fetch, filter, paginate orders
├── useOrderDetail.js           # Fetch single order with edit history
├── useEditSettings.js          # Get/update edit settings
├── useEditRules.js             # CRUD edit rules
├── useAnalytics.js             # Fetch analytics data with date range
├── useSubscription.js          # Current plan, usage, upgrade
├── useUpsellOffers.js          # CRUD upsell offers
├── useOrderEdit.js             # Merchant edit flow state machine
├── useAppBridgeAction.js       # App Bridge toast, redirect, modal
└── usePagination.js            # Cursor/offset pagination
```

---

## 7. Theme Extension Structure

### App Blocks

```
extensions/theme-extension/
├── blocks/
│   ├── order-edit-widget.liquid        # Order Status Page widget
│   ├── thank-you-banner.liquid         # Thank-You Page banner
│   └── edit-order-button.liquid        # Standalone edit button block
├── assets/
│   ├── order-edit-widget.css           # Widget styles
│   ├── order-edit-widget.js            # Widget client-side logic
│   ├── thank-you-banner.css
│   └── thank-you-banner.js
├── locales/
│   ├── en.default.json                 # English (default)
│   ├── fr.json                         # French
│   ├── de.json                         # German
│   ├── es.json                         # Spanish
│   ├── pt-BR.json                      # Portuguese (Brazil)
│   ├── ja.json                         # Japanese
│   ├── ko.json                         # Korean
│   ├── zh-CN.json                      # Chinese (Simplified)
│   ├── zh-TW.json                      # Chinese (Traditional)
│   └── it.json                         # Italian
└── snippets/
    ├── edit-countdown.liquid           # Reusable countdown component
    └── edit-status-badge.liquid        # Edit status indicator
```

### `order-edit-widget.liquid` Block Schema

```json
{
  "name": "Order Edit Widget",
  "target": "section",
  "settings": [
    {
      "type": "color",
      "id": "primary_color",
      "label": "Primary button color",
      "default": "#5c6ac4"
    },
    {
      "type": "text",
      "id": "edit_button_text",
      "label": "Edit button text",
      "default": "Edit Order"
    },
    {
      "type": "text",
      "id": "cancel_button_text",
      "label": "Cancel button text",
      "default": "Cancel Order"
    },
    {
      "type": "checkbox",
      "id": "show_countdown",
      "label": "Show countdown timer",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_cancel",
      "label": "Show cancel button",
      "default": true
    }
  ]
}
```

### App Proxy

The storefront edit page is served via Shopify App Proxy:
- **Proxy URL:** `https://my-store.myshopify.com/apps/order-edit/*`
- **Target:** Firebase Functions `/app-proxy/*`
- **Purpose:** Serves the customer edit page within the store's domain (branded, themed)

### Scripttag Fallback

For themes that do not support app blocks (vintage themes):
```
packages/scripttag/src/
├── index.js                # Entry point
├── components/
│   ├── EditWidget.jsx      # Preact widget component
│   └── CountdownTimer.jsx  # Countdown timer
├── styles/
│   └── widget.css          # Inline styles (no external CSS dependency)
└── utils/
    ├── api.js              # API client
    └── orderToken.js       # Token generation/validation
```

---

## 8. BigQuery Schema

### Dataset: `order_editing`

#### Table: `edits`
Partitioned by `DATE(created_at)`, clustered by `shop_id, edit_type`.

| Column | Type | Description |
|--------|------|-------------|
| `edit_id` | STRING | Firestore document ID |
| `shop_id` | STRING | Shop domain |
| `order_id` | STRING | Firestore order document ID |
| `shopify_order_id` | STRING | Shopify order GID |
| `edit_type` | STRING | `item_swap, quantity_change, address_edit, add_item, remove_item` |
| `initiated_by` | STRING | `customer, merchant` |
| `status` | STRING | `applied, rejected, failed` |
| `price_diff` | FLOAT64 | Price difference (positive = charge) |
| `original_total` | FLOAT64 | Order total before edit |
| `new_total` | FLOAT64 | Order total after edit |
| `currency` | STRING | ISO 4217 currency code |
| `upsell_accepted` | BOOLEAN | Whether upsell was accepted |
| `upsell_revenue` | FLOAT64 | Revenue from upsell |
| `changes_count` | INT64 | Number of individual changes |
| `plan` | STRING | Merchant plan at time of edit |
| `created_at` | TIMESTAMP | Edit timestamp |

#### Table: `cancellations`
Partitioned by `DATE(created_at)`, clustered by `shop_id`.

| Column | Type | Description |
|--------|------|-------------|
| `cancellation_id` | STRING | Firestore document ID |
| `shop_id` | STRING | Shop domain |
| `order_id` | STRING | Firestore order document ID |
| `shopify_order_id` | STRING | Shopify order GID |
| `reason` | STRING | Customer-provided reason |
| `refund_amount` | FLOAT64 | Total refund amount |
| `store_credit_chosen` | BOOLEAN | Whether store credit was chosen |
| `retention_offered` | BOOLEAN | Whether retention was offered |
| `retention_accepted` | BOOLEAN | Whether retention was accepted |
| `retention_type` | STRING | discount, swap, delay, or null |
| `retention_value` | FLOAT64 | Discount value if applicable |
| `currency` | STRING | ISO 4217 currency code |
| `plan` | STRING | Merchant plan at time of cancel |
| `created_at` | TIMESTAMP | Cancellation timestamp |

#### Table: `upsell_conversions`
Partitioned by `DATE(created_at)`, clustered by `shop_id, offer_id`.

| Column | Type | Description |
|--------|------|-------------|
| `event_id` | STRING | Unique event ID |
| `shop_id` | STRING | Shop domain |
| `offer_id` | STRING | Upsell offer ID |
| `order_id` | STRING | Order document ID |
| `event_type` | STRING | `impression, click, accepted, declined` |
| `product_id` | STRING | Recommended product GID |
| `revenue` | FLOAT64 | Revenue if accepted |
| `currency` | STRING | ISO 4217 currency code |
| `created_at` | TIMESTAMP | Event timestamp |

#### Table: `widget_events`
Partitioned by `DATE(created_at)`, clustered by `shop_id, event_type`.

| Column | Type | Description |
|--------|------|-------------|
| `event_id` | STRING | Unique event ID |
| `shop_id` | STRING | Shop domain |
| `event_type` | STRING | `widget_viewed, edit_button_clicked, cancel_button_clicked, edit_page_opened, edit_confirmed` |
| `source` | STRING | `order_status_page, thank_you_page, customer_account` |
| `order_id` | STRING | Order ID if applicable |
| `device_type` | STRING | `mobile, tablet, desktop` |
| `created_at` | TIMESTAMP | Event timestamp |

#### Table: `daily_shop_metrics`
Partitioned by `DATE(metric_date)`, clustered by `shop_id, plan`.

| Column | Type | Description |
|--------|------|-------------|
| `shop_id` | STRING | Shop domain |
| `metric_date` | DATE | Aggregation date |
| `plan` | STRING | Merchant plan |
| `total_edits` | INT64 | Total edits for the day |
| `customer_edits` | INT64 | Customer-initiated edits |
| `merchant_edits` | INT64 | Merchant-initiated edits |
| `address_edits` | INT64 | Address edit count |
| `item_swaps` | INT64 | Item swap count |
| `quantity_changes` | INT64 | Quantity change count |
| `cancellations` | INT64 | Cancellation count |
| `cancellations_retained` | INT64 | Cancellations prevented by retention |
| `upsell_impressions` | INT64 | Upsell impression count |
| `upsell_conversions` | INT64 | Upsell acceptance count |
| `upsell_revenue` | FLOAT64 | Total upsell revenue |
| `total_refunded` | FLOAT64 | Total refund amount |
| `total_charged` | FLOAT64 | Total additional charges |
| `store_credit_issued` | FLOAT64 | Total store credit issued |

### BigQuery Views

```sql
-- Monthly metrics per shop (for dashboard)
CREATE VIEW `order_editing.monthly_shop_metrics` AS
SELECT
  shop_id,
  DATE_TRUNC(metric_date, MONTH) AS month,
  SUM(total_edits) AS total_edits,
  SUM(cancellations) AS total_cancellations,
  SAFE_DIVIDE(SUM(cancellations_retained), SUM(cancellations + cancellations_retained)) AS retention_rate,
  SUM(upsell_revenue) AS total_upsell_revenue,
  SUM(total_refunded) AS total_refunded
FROM `order_editing.daily_shop_metrics`
GROUP BY shop_id, month;

-- Global platform metrics (for internal reporting)
CREATE VIEW `order_editing.platform_metrics` AS
SELECT
  metric_date,
  COUNT(DISTINCT shop_id) AS active_shops,
  SUM(total_edits) AS platform_edits,
  SUM(upsell_revenue) AS platform_upsell_revenue
FROM `order_editing.daily_shop_metrics`
GROUP BY metric_date;
```

---

## 9. Infrastructure Cost Estimates

### Per-Install Cost Model

Assumptions per install:
- Average 30 edits/month for active stores
- 3 webhook events per order (create, update, fulfill)
- Average 100 orders/month per store
- 70% of installs are free tier
- BigQuery queries: ~10 per active merchant per day

### Firebase Functions

| Resource | Unit Cost | Per 1K Installs/mo | Per 10K Installs/mo | Per 50K Installs/mo |
|----------|-----------|---------------------|---------------------|---------------------|
| Invocations (API + webhooks + background) | $0.40/million | ~$2 | ~$20 | ~$100 |
| Compute (GB-seconds) | $0.0000025/GB-s | ~$15 | ~$150 | ~$750 |
| Networking (egress) | $0.12/GB | ~$3 | ~$30 | ~$150 |
| **Subtotal** | | **~$20** | **~$200** | **~$1,000** |

### Firestore

| Resource | Unit Cost | Per 1K Installs/mo | Per 10K Installs/mo | Per 50K Installs/mo |
|----------|-----------|---------------------|---------------------|---------------------|
| Document reads | $0.06/100K | ~$5 | ~$50 | ~$250 |
| Document writes | $0.18/100K | ~$3 | ~$30 | ~$150 |
| Storage | $0.18/GB | ~$1 | ~$5 | ~$25 |
| **Subtotal** | | **~$9** | **~$85** | **~$425** |

### BigQuery

| Resource | Unit Cost | Per 1K Installs/mo | Per 10K Installs/mo | Per 50K Installs/mo |
|----------|-----------|---------------------|---------------------|---------------------|
| Storage | $0.02/GB/mo | ~$0.50 | ~$5 | ~$25 |
| Queries | $5/TB scanned | ~$2 | ~$15 | ~$60 |
| Streaming inserts | $0.01/200MB | ~$0.50 | ~$5 | ~$25 |
| **Subtotal** | | **~$3** | **~$25** | **~$110** |

### Cloud Pub/Sub + Cloud Tasks

| Resource | Unit Cost | Per 1K Installs/mo | Per 10K Installs/mo | Per 50K Installs/mo |
|----------|-----------|---------------------|---------------------|---------------------|
| Pub/Sub messages | $0.04/million | ~$0.20 | ~$2 | ~$10 |
| Cloud Tasks | Free tier (1M) | ~$0 | ~$0 | ~$5 |
| **Subtotal** | | **~$0.20** | **~$2** | **~$15** |

### Email Sending (SendGrid)

| Plan | Cost | Per 1K Installs/mo | Per 10K Installs/mo | Per 50K Installs/mo |
|------|------|---------------------|---------------------|---------------------|
| Free (100/day) then Essentials | $0-$19.95/mo | ~$0 | ~$20 | ~$90 |

### Google Address Validation API (P1)

| Resource | Unit Cost | Per 1K Installs/mo | Per 10K Installs/mo | Per 50K Installs/mo |
|----------|-----------|---------------------|---------------------|---------------------|
| Address validations | $0.005/request | ~$3 | ~$30 | ~$150 |

### Total Monthly Infrastructure Cost

| Scale | Total/mo | Cost per Install/mo | Notes |
|-------|----------|---------------------|-------|
| **1K installs** | ~$35 | ~$0.035 | Well within free tiers for many services |
| **10K installs** | ~$365 | ~$0.036 | Linear scaling, good unit economics |
| **50K installs** | ~$1,800 | ~$0.036 | Volume discounts apply at this scale |

### Revenue vs. Cost (Break-Even Analysis)

Assuming 30% conversion to paid at $15 ARPU:

| Scale | Monthly Revenue | Monthly Cost | Gross Margin |
|-------|----------------|--------------|--------------|
| 1K installs | $4,500 | $35 | 99.2% |
| 10K installs | $45,000 | $365 | 99.2% |
| 50K installs | $225,000 | $1,800 | 99.2% |

Note: These estimates exclude personnel costs, Shopify Partner fees (15% for new partners), and marketing spend.

---

*End of Technical Architecture*
