# Technical Diagrams - Avada Order Editing

## 1. System Architecture Diagram

```mermaid
graph TB
    subgraph "Shopify Platform"
        SA[Shopify Admin]
        SF[Storefront]
        OSP[Order Status Page]
        TYP[Thank You Page]
        SAPI[Shopify GraphQL Admin API]
        SREST[Shopify REST API]
        SWH[Shopify Webhooks]
    end

    subgraph "Embedded Admin App"
        PA[React / Polaris v12+ App]
        AB[Shopify App Bridge]
        PA --> AB
        AB --> SAPI
    end

    subgraph "Storefront Layer"
        TE[Theme App Extension<br/>Liquid Blocks]
        SW[Scripttag Widget<br/>Preact]
        TE --> OSP
        TE --> TYP
        SW --> SF
    end

    subgraph "GCP / Firebase Backend"
        subgraph "Firebase Hosting"
            FH[Static Frontend Assets]
        end

        subgraph "Firebase Functions"
            API[REST API Handlers]
            WHH[Webhook Handlers]
            BGW[Background Workers]
            CRON[Scheduled Functions]
        end

        subgraph "Data Layer"
            FS[(Firestore)]
            BQ[(BigQuery)]
        end

        subgraph "Async Processing"
            PS[Cloud Pub/Sub]
            CT[Cloud Tasks]
        end
    end

    subgraph "External Services"
        GADDR[Google Address Validation API]
        EMAIL[Email Service<br/>SendGrid / Mailgun]
    end

    SA --> PA
    PA --> API
    SW --> API
    TE --> API

    SWH -->|HMAC Verified| WHH
    WHH --> PS
    PS --> BGW
    BGW --> FS
    BGW --> SAPI
    BGW --> EMAIL

    API --> FS
    API --> SAPI
    API --> SREST
    API --> GADDR

    CRON --> CT
    CT --> BGW

    FS -->|Change Streams| BQ
    BGW --> BQ

    PA -->|Dashboard & Analytics| BQ

    style SA fill:#5c6ac4,color:#fff
    style SF fill:#5c6ac4,color:#fff
    style FS fill:#f4b400,color:#000
    style BQ fill:#4285f4,color:#fff
    style PS fill:#34a853,color:#fff
```

## 2. Order Edit Lifecycle State Machine

```mermaid
stateDiagram-v2
    [*] --> OrderPlaced: Order created via Shopify

    OrderPlaced --> EditWindowOpen: Webhook received &<br/>edit rules evaluated

    EditWindowOpen --> EditRequested_Customer: Customer initiates edit<br/>(order status page / widget)
    EditWindowOpen --> EditRequested_Merchant: Merchant initiates edit<br/>(admin dashboard)
    EditWindowOpen --> CancelRequested: Customer initiates cancel
    EditWindowOpen --> EditWindowClosed: Time window expires<br/>(scheduled function)

    EditRequested_Customer --> EditValidating: Validate edit rules &<br/>inventory availability
    EditRequested_Merchant --> EditValidating: Validate against<br/>Shopify constraints

    EditValidating --> EditRejected: Validation fails<br/>(out of stock, rule violation,<br/>already fulfilled)
    EditValidating --> PriceDiffCalculated: Validation passes

    PriceDiffCalculated --> PaymentRequired: Price increased<br/>(charge customer)
    PriceDiffCalculated --> RefundRequired: Price decreased<br/>(refund customer)
    PriceDiffCalculated --> EditProcessing: No price change

    PaymentRequired --> EditProcessing: Payment captured
    PaymentRequired --> EditRejected: Payment failed
    RefundRequired --> EditProcessing: Refund issued

    EditProcessing --> EditApplied: Shopify API<br/>orderEditCommit success
    EditProcessing --> EditRejected: Shopify API error

    EditApplied --> NotificationSent: Email / SMS sent
    NotificationSent --> EditWindowOpen: Window still open<br/>(allow further edits)
    NotificationSent --> EditWindowClosed: Window expired

    CancelRequested --> RetentionFlow: Show retention offers
    RetentionFlow --> EditWindowOpen: Customer retained<br/>(accepted offer)
    RetentionFlow --> CancelProcessing: Customer confirms cancel
    CancelProcessing --> OrderCancelled: Cancel via Shopify API<br/>+ restock inventory

    EditRejected --> EditWindowOpen: Customer can retry
    EditWindowClosed --> [*]
    OrderCancelled --> [*]

    note right of EditWindowOpen
        Time-based window controlled by
        merchant settings (e.g., 2 hours,
        before fulfillment, etc.)
    end note

    note right of PriceDiffCalculated
        Compares original order total
        with new line items total
    end note
```

## 3. Customer Self-Service Edit Flow (Sequence Diagram)

```mermaid
sequenceDiagram
    actor C as Customer
    participant OSP as Order Status Page<br/>(Theme Extension)
    participant SW as Storefront Widget<br/>(Preact)
    participant API as Firebase Functions<br/>(API Handler)
    participant SVC as Edit Service
    participant FS as Firestore
    participant SHOP as Shopify GraphQL API
    participant EMAIL as Email Service

    C->>OSP: Views order status page
    OSP->>API: GET /api/orders/{orderId}/edit-eligibility
    API->>FS: Fetch editSettings for shop
    API->>FS: Fetch order record
    API->>SVC: checkEditEligibility(order, settings)
    SVC-->>API: {eligible: true, allowedActions, timeRemaining}
    API-->>OSP: Edit eligibility response

    OSP->>SW: Render "Edit Order" button

    C->>SW: Clicks "Edit Order"
    SW->>API: GET /api/orders/{orderId}/edit-options
    API->>SHOP: query order(id) { lineItems, variants }
    SHOP-->>API: Order details + available variants
    API->>FS: Fetch editRules for shop
    API-->>SW: {lineItems, swapOptions, quantityLimits}

    SW->>SW: Display edit form<br/>(item swap, qty change, address edit)

    C->>SW: Selects changes<br/>(e.g., swap variant, change qty)
    SW->>API: POST /api/orders/{orderId}/edits
    Note over API: Request body: {changes: [{type, lineItemId, newVariantId, newQty}]}

    API->>SVC: validateEdit(order, changes, rules)
    SVC->>SHOP: query inventoryLevel(variantId)
    SHOP-->>SVC: Stock availability
    SVC->>SVC: Check edit rules<br/>(time window, max edits, allowed types)
    SVC-->>API: Validation result

    alt Validation fails
        API-->>SW: 422 {error: "Item out of stock"}
        SW->>C: Show error message
    else Validation passes
        API->>SVC: calculatePriceDiff(originalOrder, changes)
        SVC-->>API: {priceDiff: +$5.00, newTotal: $55.00}
        API-->>SW: {valid: true, priceDiff, requiresPayment: true}

        SW->>C: Show price difference & confirm

        C->>SW: Confirms changes
        SW->>API: POST /api/orders/{orderId}/edits/confirm

        API->>SVC: processEdit(order, changes)
        SVC->>SHOP: mutation orderEditBegin(id)
        SHOP-->>SVC: calculatedOrder

        SVC->>SHOP: mutation orderEditAddVariant / removeVariant / setQuantity
        SHOP-->>SVC: Updated calculated order

        alt Price increased
            SVC->>SHOP: mutation orderEditCommit(id)<br/>with notifyCustomer: false
            SHOP-->>SVC: Order updated
            SVC->>SHOP: mutation orderInvoiceSend(id)
            Note over SVC: Customer pays via invoice link
        else Price decreased
            SVC->>SHOP: mutation orderEditCommit(id)
            SHOP-->>SVC: Order updated + refund issued
        else No price change
            SVC->>SHOP: mutation orderEditCommit(id)
            SHOP-->>SVC: Order updated
        end

        SVC->>FS: Save orderEdit record
        SVC->>FS: Increment shop edit count (usage tracking)

        API-->>SW: {success: true, updatedOrder}
        SW->>C: Show success confirmation

        API->>EMAIL: Send edit confirmation email
        EMAIL-->>C: "Your order has been updated"
    end
```

## 4. Merchant Admin Edit Flow (Sequence Diagram)

```mermaid
sequenceDiagram
    actor M as Merchant
    participant APP as Admin App<br/>(React/Polaris)
    participant AB as App Bridge
    participant API as Firebase Functions
    participant SVC as Edit Service
    participant FS as Firestore
    participant SHOP as Shopify GraphQL API
    participant PS as Cloud Pub/Sub
    participant EMAIL as Email Service

    M->>APP: Opens Order Editing dashboard
    APP->>API: GET /api/orders?status=open&page=1
    API->>FS: Query orders (shopId, status, pagination)
    FS-->>API: Order list
    API-->>APP: Paginated order list

    M->>APP: Clicks on specific order
    APP->>AB: Direct API: query order(id) { full details }
    AB->>SHOP: GraphQL query
    SHOP-->>AB: Order details
    AB-->>APP: Order data (no backend round-trip)

    M->>APP: Clicks "Edit Order"
    APP->>API: POST /api/orders/{orderId}/merchant-edit/begin
    API->>SVC: beginMerchantEdit(order)
    SVC->>SHOP: mutation orderEditBegin(id)
    SHOP-->>SVC: calculatedOrder with editableFields
    SVC-->>API: Edit session with editable fields
    API-->>APP: {editSession, lineItems, availableProducts}

    APP->>APP: Render edit form with current values

    M->>APP: Makes changes<br/>(add product, change qty, update address)
    M->>APP: Clicks "Save Changes"
    APP->>API: POST /api/orders/{orderId}/merchant-edit/commit
    Note over API: {changes: [...], notifyCustomer: true, reason: "Customer request"}

    API->>SVC: processMerchantEdit(order, changes)
    SVC->>SHOP: mutation orderEditAddVariant / setQuantity
    SHOP-->>SVC: Updated calculated order
    SVC->>SHOP: mutation orderEditCommit(id, staffNote)
    SHOP-->>SVC: Committed order

    SVC->>FS: Save orderEdit record (editedBy: "merchant")
    SVC->>FS: Log to analytics collection

    API-->>APP: {success: true, updatedOrder}
    APP->>M: Show success toast (Polaris Banner)

    API->>PS: Publish "order.edited" event
    PS->>EMAIL: Send customer notification
    EMAIL-->>EMAIL: "The merchant updated your order"
```

## 5. Cancellation Retention Flow

```mermaid
sequenceDiagram
    actor C as Customer
    participant SW as Storefront Widget
    participant API as Firebase Functions
    participant SVC as Cancel Service
    participant RS as Retention Service
    participant FS as Firestore
    participant SHOP as Shopify GraphQL API
    participant EMAIL as Email Service

    C->>SW: Clicks "Cancel Order"
    SW->>API: POST /api/orders/{orderId}/cancel/init
    API->>FS: Fetch editSettings.cancellation for shop
    API->>SVC: initCancellation(order, settings)
    SVC->>SVC: Check cancellation eligibility<br/>(not fulfilled, within window)

    alt Not eligible
        API-->>SW: {eligible: false, reason: "Order already shipped"}
        SW->>C: Show "Cannot cancel" message
    else Eligible
        SVC->>RS: getRetentionOffers(order, shopSettings)
        RS->>FS: Fetch retention strategies for shop
        RS-->>SVC: Available retention offers

        API-->>SW: {eligible: true, retentionOffers: [...]}

        SW->>SW: Show cancellation reason picker
        C->>SW: Selects reason: "Found cheaper elsewhere"

        SW->>SW: Display targeted retention offers based on reason
        Note over SW: Reason-specific offers:<br/>"Found cheaper" → discount<br/>"Don't need anymore" → delay delivery<br/>"Wrong item" → swap product

        rect rgb(255, 248, 220)
            Note over SW: Retention Offer Display
            SW->>C: Offer 1: "Get 15% off this order"
            SW->>C: Offer 2: "Swap to a different product"
            SW->>C: Offer 3: "Delay delivery instead"
            SW->>C: Option: "No thanks, cancel order"
        end

        alt Customer accepts discount offer
            C->>SW: Accepts "15% off" offer
            SW->>API: POST /api/orders/{orderId}/cancel/retain
            Note over API: {retentionType: "discount", offerId: "..."}
            API->>RS: applyRetentionOffer(order, offer)
            RS->>SHOP: mutation discountCodeBasicCreate or orderEditBegin + adjust prices
            SHOP-->>RS: Discount applied
            RS->>FS: Log retention success
            RS->>FS: Update analytics (retention_saved)
            API-->>SW: {retained: true, discount: "15%", newTotal}
            SW->>C: "Great! 15% discount applied to your order"
            API->>EMAIL: Send retention confirmation

        else Customer accepts swap offer
            C->>SW: Accepts product swap
            SW->>API: POST /api/orders/{orderId}/cancel/retain
            Note over API: {retentionType: "swap", newVariantId: "..."}
            API->>RS: applyRetentionOffer(order, offer)
            RS->>SHOP: orderEditBegin → removeVariant → addVariant → commit
            SHOP-->>RS: Order updated with swapped product
            RS->>FS: Log retention success
            API-->>SW: {retained: true, swappedProduct}
            SW->>C: "Order updated with your new selection"

        else Customer rejects all offers
            C->>SW: Clicks "No thanks, cancel order"
            SW->>API: POST /api/orders/{orderId}/cancel/confirm
            Note over API: {reason: "Found cheaper elsewhere"}
            API->>SVC: processCancellation(order, reason)
            SVC->>SHOP: mutation orderCancel(orderId, reason, refund, restock)
            SHOP-->>SVC: Order cancelled
            SVC->>FS: Save cancellation record
            SVC->>FS: Log analytics (retention_failed, reason)
            API-->>SW: {cancelled: true, refundAmount}
            SW->>C: "Order cancelled. Refund of $X issued."
            API->>EMAIL: Send cancellation confirmation
        end
    end
```

## 6. Post-Purchase Upsell Flow (Sequence Diagram)

```mermaid
sequenceDiagram
    actor C as Customer
    participant SW as Storefront Widget
    participant API as Firebase Functions
    participant ES as Edit Service
    participant US as Upsell Service
    participant FS as Firestore
    participant SHOP as Shopify GraphQL API

    Note over C,SHOP: Customer is in the middle of an order edit flow

    C->>SW: Editing order (changing item/qty)
    SW->>API: POST /api/orders/{orderId}/edits
    API->>ES: validateEdit(order, changes)
    ES-->>API: Validation passes

    API->>US: getUpsellRecommendations(order, changes)
    US->>FS: Fetch upsellOffers for shop
    US->>FS: Fetch product recommendation rules
    US->>US: Match rules to current cart<br/>(complementary items, frequently bought together,<br/>volume discounts)

    alt Recommendations available
        US-->>API: {recommendations: [{productId, title, price, reason, discount}]}
        API-->>SW: {editValid: true, priceDiff, upsellOffers: [...]}

        rect rgb(232, 245, 233)
            Note over SW: Upsell Display (before edit confirmation)
            SW->>C: "Customers who bought X also bought Y"
            SW->>C: "Add matching accessory - $14.99 (10% off)"
            SW->>C: "Upgrade to bundle and save $8"
        end

        alt Customer adds upsell product
            C->>SW: Clicks "Add to order" on recommendation
            SW->>API: POST /api/orders/{orderId}/edits/confirm
            Note over API: {changes: [...originalChanges], upsellItems: [{variantId, qty}]}

            API->>ES: processEditWithUpsell(order, changes, upsellItems)
            ES->>SHOP: mutation orderEditBegin(id)
            SHOP-->>ES: calculatedOrder

            loop For each change + upsell item
                ES->>SHOP: mutation orderEditAddVariant / setQuantity
                SHOP-->>ES: Updated calculated order
            end

            ES->>ES: Calculate final price diff<br/>(original changes + upsell items)

            alt Additional payment needed
                ES->>SHOP: mutation orderEditCommit(id)
                SHOP-->>ES: Order committed
                ES->>SHOP: mutation orderInvoiceSend(id)
                Note over SHOP: Customer receives invoice for additional amount
            else Price neutral or refund
                ES->>SHOP: mutation orderEditCommit(id)
                SHOP-->>ES: Order committed
            end

            ES->>FS: Save orderEdit with upsell data
            ES->>FS: Log upsell conversion analytics
            Note over FS: {editId, upsellOfferId, revenue, accepted: true}

            API-->>SW: {success: true, updatedOrder, upsellApplied: true}
            SW->>C: "Order updated with added items!"

        else Customer declines upsell
            C->>SW: Clicks "No thanks, just save changes"
            SW->>API: POST /api/orders/{orderId}/edits/confirm
            Note over API: {changes: [...originalChanges], upsellItems: []}
            API->>ES: processEdit(order, changes)
            ES->>FS: Log upsell impression (declined)
            API-->>SW: {success: true, updatedOrder}
        end

    else No recommendations
        US-->>API: {recommendations: []}
        API-->>SW: {editValid: true, priceDiff, upsellOffers: []}
        Note over SW: Proceed with normal edit flow (no upsell shown)
    end
```

## 7. Data Flow Diagram

```mermaid
graph TB
    subgraph "Data Sources"
        SWH[Shopify Webhooks<br/>orders/create, orders/updated,<br/>orders/cancelled, app/uninstalled]
        CUST[Customer Actions<br/>edit, cancel, upsell accept]
        MERCH[Merchant Actions<br/>edit, settings change, rule update]
    end

    subgraph "Ingestion Layer (Firebase Functions)"
        WHR[Webhook Receiver<br/>HMAC validation + idempotency]
        APIR[API Router<br/>Auth + rate limiting]
    end

    subgraph "Processing Layer"
        PS[Cloud Pub/Sub Topics]
        CT[Cloud Tasks<br/>Delayed / Scheduled]

        PS --- T1[order.created]
        PS --- T2[order.edited]
        PS --- T3[order.cancelled]
        PS --- T4[edit.requested]
        PS --- T5[notification.send]

        BGW[Background Workers]
        T1 --> BGW
        T2 --> BGW
        T3 --> BGW
        T4 --> BGW
        T5 --> BGW
    end

    subgraph "Data Storage (Firestore)"
        FS_SHOPS[(shops<br/>shopId, domain, settings,<br/>plan, accessToken)]
        FS_ORDERS[(orders<br/>shopId, orderId, status,<br/>editWindow, lineItems)]
        FS_EDITS[(orderEdits<br/>shopId, orderId, editType,<br/>changes, status, priceDiff)]
        FS_SETTINGS[(editSettings<br/>shopId, timeWindow, rules,<br/>allowedActions)]
        FS_SUBS[(subscriptions<br/>shopId, plan, usage,<br/>billingCycle)]
        FS_NOTIF[(notifications<br/>shopId, type, recipient,<br/>sentAt, TTL)]
    end

    subgraph "Analytics Pipeline"
        BQ[(BigQuery)]
        BQ_EDITS[edits table<br/>partitioned by date<br/>clustered by shopId]
        BQ_CANCEL[cancellations table<br/>partitioned by date]
        BQ_UPSELL[upsell_conversions table<br/>partitioned by date]
        BQ_USAGE[usage_metrics table<br/>partitioned by date<br/>clustered by shopId, plan]

        BQ --- BQ_EDITS
        BQ --- BQ_CANCEL
        BQ --- BQ_UPSELL
        BQ --- BQ_USAGE
    end

    subgraph "Output Layer"
        DASH[Admin Dashboard<br/>React/Polaris]
        EMAILS[Email Notifications]
        SAPI_OUT[Shopify API Updates]
    end

    SWH --> WHR
    CUST --> APIR
    MERCH --> APIR

    WHR --> PS
    APIR --> PS

    BGW --> FS_ORDERS
    BGW --> FS_EDITS
    BGW --> FS_NOTIF

    APIR --> FS_SHOPS
    APIR --> FS_SETTINGS
    APIR --> FS_SUBS

    BGW -->|Streaming insert| BQ
    CT -->|Daily aggregation| BQ

    FS_EDITS -.->|Change stream<br/>Cloud Function trigger| BQ_EDITS
    FS_NOTIF -.->|TTL auto-delete<br/>after 30 days| FS_NOTIF

    BQ --> DASH
    BGW --> EMAILS
    BGW --> SAPI_OUT

    style BQ fill:#4285f4,color:#fff
    style PS fill:#34a853,color:#fff
    style FS_SHOPS fill:#f4b400,color:#000
    style FS_ORDERS fill:#f4b400,color:#000
    style FS_EDITS fill:#f4b400,color:#000
```

## 8. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    SHOPS {
        string shopId PK "Shopify shop domain"
        string domain "mystore.myshopify.com"
        string accessToken "Shopify API token (encrypted)"
        string plan "free | starter | growth | pro | business | enterprise"
        string status "active | inactive | uninstalled"
        timestamp installedAt
        timestamp uninstalledAt
        object appSettings "Global app preferences"
    }

    EDIT_SETTINGS {
        string id PK "auto-generated"
        string shopId FK "References shops"
        number timeWindowMinutes "Edit window duration (e.g., 120)"
        string timeWindowType "minutes | hours | before_fulfillment"
        boolean allowAddressEdit
        boolean allowItemSwap
        boolean allowQuantityChange
        boolean allowAddItem
        boolean allowRemoveItem
        boolean allowCancellation
        number maxEditsPerOrder "Max edits allowed per order"
        object retentionSettings "Cancellation retention config"
        object upsellSettings "Post-purchase upsell config"
        object notificationSettings "Email template config"
    }

    ORDERS {
        string id PK "auto-generated"
        string shopId FK "References shops"
        string shopifyOrderId "Shopify order GID"
        string orderNumber "Human-readable #1001"
        string customerEmail
        string customerName
        string financialStatus "paid | partially_refunded | refunded"
        string fulfillmentStatus "unfulfilled | partial | fulfilled"
        string editWindowStatus "open | closed | expired"
        timestamp editWindowExpiresAt
        number editCount "Number of edits made"
        number originalTotal "Original order total"
        number currentTotal "Current total after edits"
        string currency "USD, EUR, etc."
        timestamp orderCreatedAt
        timestamp lastEditedAt
        timestamp syncedAt
    }

    ORDER_EDITS {
        string id PK "auto-generated"
        string shopId FK "References shops"
        string orderId FK "References orders"
        string shopifyOrderId
        string editType "item_swap | quantity_change | address_edit | add_item | remove_item | cancel"
        string initiatedBy "customer | merchant"
        string status "pending | processing | applied | rejected | failed"
        array changes "Array of change objects"
        number priceDiff "Positive = charge, negative = refund"
        string refundId "Shopify refund ID if applicable"
        string reason "Customer-provided reason"
        string staffNote "Merchant-provided note"
        object previousState "Snapshot before edit"
        object newState "Snapshot after edit"
        timestamp requestedAt
        timestamp processedAt
    }

    EDIT_RULES {
        string id PK "auto-generated"
        string shopId FK "References shops"
        string ruleType "product | collection | tag | all"
        string targetId "Product/Collection ID or * for all"
        boolean allowSwap
        boolean allowQuantityChange
        boolean allowRemove
        array swapTargets "Allowed swap product/variant IDs"
        number minQuantity
        number maxQuantity
        boolean active
    }

    SUBSCRIPTIONS {
        string id PK "auto-generated"
        string shopId FK "References shops"
        string plan "free | starter | growth | pro | business | enterprise"
        string shopifyChargeId "Recurring charge ID"
        string status "active | frozen | cancelled | pending"
        number monthlyEditLimit "50 | 200 | unlimited"
        number currentMonthUsage "Edits used this cycle"
        timestamp billingCycleStart
        timestamp billingCycleEnd
        timestamp createdAt
    }

    UPSELL_OFFERS {
        string id PK "auto-generated"
        string shopId FK "References shops"
        string offerType "complementary | upgrade | bundle | discount"
        string triggerType "product | collection | cart_value | edit_type"
        string triggerValue "Product ID, collection ID, or threshold"
        array recommendedProducts "Product/variant IDs to recommend"
        number discountPercent "Optional discount on upsell"
        string discountType "percentage | fixed_amount"
        number priority "Display order"
        boolean active
        timestamp createdAt
    }

    NOTIFICATIONS {
        string id PK "auto-generated"
        string shopId FK "References shops"
        string orderId FK "References orders"
        string editId FK "References orderEdits"
        string type "edit_confirmation | cancel_confirmation | retention_offer | upsell_accepted | invoice"
        string channel "email | sms"
        string recipient "Customer email or phone"
        string status "queued | sent | failed | bounced"
        string templateId "Email template reference"
        object templateData "Dynamic template variables"
        timestamp sentAt
        timestamp expiresAt "TTL for auto-deletion"
    }

    ANALYTICS_EVENTS {
        string id PK "auto-generated"
        string shopId FK "References shops"
        string eventType "edit | cancel | retention | upsell | widget_view"
        string orderId
        string editId
        object eventData "Event-specific payload"
        timestamp createdAt
        timestamp expiresAt "TTL 90 days"
    }

    SHOPS ||--o{ ORDERS : "has many"
    SHOPS ||--|| EDIT_SETTINGS : "has one"
    SHOPS ||--o{ EDIT_RULES : "has many"
    SHOPS ||--|| SUBSCRIPTIONS : "has one active"
    SHOPS ||--o{ UPSELL_OFFERS : "has many"
    ORDERS ||--o{ ORDER_EDITS : "has many"
    ORDERS ||--o{ NOTIFICATIONS : "has many"
    ORDER_EDITS ||--o{ NOTIFICATIONS : "triggers"
    SHOPS ||--o{ ANALYTICS_EVENTS : "has many"
```

## 9. Deployment Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        BROWSER[Merchant Browser<br/>Shopify Admin iFrame]
        CUST_BROWSER[Customer Browser<br/>Storefront / Order Status]
    end

    subgraph "CDN / Edge"
        CF[Firebase Hosting CDN<br/>Global Edge Network]
    end

    subgraph "GCP Project: avada-order-editing"
        subgraph "Compute"
            FF_API[Firebase Functions<br/>API Handlers<br/>Node.js 18 | 256MB-1GB RAM<br/>us-central1]
            FF_WH[Firebase Functions<br/>Webhook Handlers<br/>Node.js 18 | 256MB RAM<br/>us-central1]
            FF_BG[Firebase Functions<br/>Background Workers<br/>Pub/Sub triggered<br/>Node.js 18 | 512MB RAM]
            FF_CRON[Firebase Functions<br/>Scheduled Functions<br/>Cloud Scheduler triggered<br/>Edit window expiry, usage reset]
        end

        subgraph "Messaging & Scheduling"
            PUBSUB[Cloud Pub/Sub]
            PUBSUB_T1[Topic: order-events]
            PUBSUB_T2[Topic: edit-events]
            PUBSUB_T3[Topic: notification-events]
            PUBSUB_DLQ[Dead Letter Topic<br/>Failed message retry]

            TASKS[Cloud Tasks]
            TASKS_Q1[Queue: delayed-edits]
            TASKS_Q2[Queue: bulk-operations]

            SCHEDULER[Cloud Scheduler]
            SCHED_1[Every 5 min: expire edit windows]
            SCHED_2[Monthly: reset usage counters]
            SCHED_3[Daily: sync analytics to BigQuery]
        end

        subgraph "Database"
            FIRESTORE[(Cloud Firestore<br/>Native Mode<br/>nam5 multi-region)]
            FIRESTORE_IDX[Compound Indexes<br/>shopId + status<br/>shopId + orderCreatedAt<br/>shopId + editWindowStatus]
        end

        subgraph "Analytics"
            BIGQUERY[(BigQuery<br/>Dataset: order_editing)]
            BQ_P[Partitioned Tables<br/>by _PARTITIONDATE]
            BQ_C[Clustered by<br/>shopId, plan, eventType]
        end

        subgraph "Security"
            SA[Service Accounts<br/>Least privilege per function]
            SM[Secret Manager<br/>API keys, tokens]
        end

        subgraph "Monitoring"
            LOG[Cloud Logging<br/>Structured logs]
            MON[Cloud Monitoring<br/>Alerts & dashboards]
            TRACE[Cloud Trace<br/>Request tracing]
        end
    end

    subgraph "External"
        SHOPIFY[Shopify Platform<br/>GraphQL Admin API<br/>REST Admin API<br/>Webhooks]
        SENDGRID[Email Provider<br/>SendGrid]
        GADDR_API[Google Maps<br/>Address Validation API]
    end

    BROWSER --> CF
    CUST_BROWSER --> CF
    CF --> FF_API

    SHOPIFY -->|Webhooks| FF_WH
    FF_WH --> PUBSUB
    PUBSUB --> PUBSUB_T1
    PUBSUB --> PUBSUB_T2
    PUBSUB --> PUBSUB_T3
    PUBSUB_T1 --> FF_BG
    PUBSUB_T2 --> FF_BG
    PUBSUB_T3 --> FF_BG
    PUBSUB_T1 -.->|On failure| PUBSUB_DLQ

    SCHEDULER --> SCHED_1
    SCHEDULER --> SCHED_2
    SCHEDULER --> SCHED_3
    SCHED_1 --> FF_CRON
    SCHED_2 --> FF_CRON
    SCHED_3 --> FF_CRON

    TASKS --> TASKS_Q1
    TASKS --> TASKS_Q2
    TASKS_Q1 --> FF_BG
    TASKS_Q2 --> FF_BG

    FF_API --> FIRESTORE
    FF_BG --> FIRESTORE
    FF_CRON --> FIRESTORE
    FIRESTORE --> FIRESTORE_IDX

    FF_BG --> BIGQUERY
    FF_CRON --> BIGQUERY
    BIGQUERY --> BQ_P
    BIGQUERY --> BQ_C

    FF_API --> SHOPIFY
    FF_BG --> SHOPIFY
    FF_BG --> SENDGRID
    FF_API --> GADDR_API

    FF_API --> SM
    FF_WH --> SM

    FF_API --> LOG
    FF_BG --> LOG
    LOG --> MON

    style FIRESTORE fill:#f4b400,color:#000
    style BIGQUERY fill:#4285f4,color:#fff
    style PUBSUB fill:#34a853,color:#fff
    style CF fill:#ff9800,color:#fff
```

## 10. Webhook Processing Flow

```mermaid
sequenceDiagram
    participant SHOP as Shopify Platform
    participant FF as Firebase Function<br/>(Webhook Handler)
    participant HMAC as HMAC Validator
    participant IDEM as Idempotency Check
    participant FS as Firestore
    participant PS as Cloud Pub/Sub
    participant BG as Background Worker<br/>(Pub/Sub triggered)
    participant SVC as Service Layer
    participant SAPI as Shopify GraphQL API
    participant EMAIL as Email Service
    participant BQ as BigQuery
    participant DLQ as Dead Letter Queue

    SHOP->>FF: POST /webhooks/{topic}<br/>Headers: X-Shopify-Hmac-Sha256,<br/>X-Shopify-Topic, X-Shopify-Shop-Domain

    FF->>HMAC: Verify HMAC-SHA256 signature
    Note over HMAC: Compare computed HMAC<br/>using app secret vs header value

    alt HMAC invalid
        HMAC-->>FF: Invalid signature
        FF-->>SHOP: 401 Unauthorized
    else HMAC valid
        HMAC-->>FF: Signature verified

        FF->>IDEM: Check webhook ID in Firestore
        FF->>FS: GET webhookLogs/{webhookId}

        alt Already processed
            FS-->>FF: Document exists (duplicate)
            FF-->>SHOP: 200 OK (idempotent, skip)
        else New webhook
            FS-->>FF: Document not found

            FF->>FS: SET webhookLogs/{webhookId}<br/>{topic, shopDomain, receivedAt, TTL: 7d}

            FF->>PS: Publish message to topic
            Note over FF,PS: Topic selected by webhook type:<br/>orders/create → order-events<br/>orders/updated → order-events<br/>orders/cancelled → order-events<br/>app/uninstalled → app-events

            FF-->>SHOP: 200 OK
            Note over FF,SHOP: Response within 5 seconds<br/>(Shopify requirement)
        end
    end

    Note over PS,BG: Async processing begins

    PS->>BG: Deliver message (auto-retry on failure)

    alt orders/create
        BG->>SVC: handleOrderCreated(orderData)
        SVC->>FS: Fetch editSettings for shop
        SVC->>SVC: Calculate edit window expiry<br/>(now + timeWindowMinutes)
        SVC->>FS: CREATE orders/{id}<br/>{shopifyOrderId, editWindowStatus: "open",<br/>editWindowExpiresAt, lineItems, customer}
        SVC->>BQ: Insert order_created event

    else orders/updated
        BG->>SVC: handleOrderUpdated(orderData)
        SVC->>FS: GET orders by shopifyOrderId
        SVC->>SVC: Detect changes<br/>(fulfillment status, payment status)

        alt Fulfillment started
            SVC->>FS: UPDATE orders/{id}<br/>{editWindowStatus: "closed",<br/>fulfillmentStatus: "partial"}
            SVC->>BQ: Insert edit_window_closed event
        else Other update
            SVC->>FS: UPDATE orders/{id} with new data
        end

    else orders/cancelled
        BG->>SVC: handleOrderCancelled(orderData)
        SVC->>FS: UPDATE orders/{id}<br/>{editWindowStatus: "closed", status: "cancelled"}
        SVC->>FS: Query related orderEdits<br/>UPDATE status to "void"
        SVC->>BQ: Insert order_cancelled event

    else app/uninstalled
        BG->>SVC: handleAppUninstalled(shopDomain)
        SVC->>FS: UPDATE shops/{shopId}<br/>{status: "uninstalled", uninstalledAt}
        SVC->>FS: Clear sensitive data (accessToken)
        SVC->>BQ: Insert app_uninstalled event
    end

    alt Processing fails (3 retries exhausted)
        BG-->>PS: NACK (not acknowledged)
        PS->>DLQ: Move to dead letter topic
        DLQ->>FS: Log failed webhook for manual review
        Note over DLQ: Alert via Cloud Monitoring
    end
```

---

## Diagram Index

| # | Diagram | Type | Purpose |
|---|---------|------|---------|
| 1 | System Architecture | Component | Full system overview with all services and connections |
| 2 | Order Edit Lifecycle | State Machine | All possible states an order edit can be in |
| 3 | Customer Self-Service Edit | Sequence | End-to-end customer edit flow with payment handling |
| 4 | Merchant Admin Edit | Sequence | Merchant-initiated edit via admin dashboard |
| 5 | Cancellation Retention | Sequence | Cancel flow with retention offers to reduce churn |
| 6 | Post-Purchase Upsell | Sequence | Upsell recommendations during edit flow |
| 7 | Data Flow | Data Flow | How data moves through the system |
| 8 | Entity Relationships | ERD | Firestore collections and their relationships |
| 9 | Deployment Architecture | Infrastructure | GCP/Firebase resource topology |
| 10 | Webhook Processing | Sequence | Webhook receipt, validation, and async processing |
