# 08 - Technical Diagrams: Avada Return & Exchange

## 1. System Architecture Diagram

```mermaid
graph TB
    subgraph "Shopify Platform"
        SA[Shopify Admin API<br/>GraphQL + REST]
        SW[Shopify Webhooks<br/>orders/create, orders/updated<br/>refunds/create, app/uninstalled]
        SF[Shopify Flow]
        SPOS[Shopify POS]
    end

    subgraph "Frontend - Shopify Admin App"
        FE[React + Polaris v12+<br/>Embedded Admin App]
        FE_DASH[Dashboard]
        FE_LIST[Return Request List]
        FE_DETAIL[Return Detail View]
        FE_SETTINGS[Settings & Policies]
        FE_ANALYTICS[Analytics Dashboard]
        FE_ONBOARD[Quick-Start Wizard]
        FE --> FE_DASH
        FE --> FE_LIST
        FE --> FE_DETAIL
        FE --> FE_SETTINGS
        FE --> FE_ANALYTICS
        FE --> FE_ONBOARD
    end

    subgraph "Theme Extension"
        TE[Theme App Extension<br/>Liquid Blocks]
        RP[Customer Return Portal<br/>Order Lookup + Return Flow]
        RT[Return Status Tracker]
        RW[Return Prevention Widgets<br/>Size Guides, Return Rate Badges]
        TE --> RP
        TE --> RT
        TE --> RW
    end

    subgraph "Firebase Backend"
        CF[Cloud Functions<br/>Node.js Handlers]
        FS[(Firestore<br/>Multi-tenant Database)]
        CS[Cloud Storage<br/>Return Photos]
        CT[Cloud Tasks<br/>Background Jobs]
        CF --> FS
        CF --> CS
        CF --> CT
    end

    subgraph "Integrations"
        SHIP[Shipping Carriers<br/>via EasyPost / Shippo<br/>USPS, FedEx, UPS, DHL]
        EMAIL[Email Service<br/>Transactional Emails<br/>Status Notifications]
        SMS[SMS Service<br/>Twilio / MessageBird]
        HD[Helpdesk Integrations<br/>Gorgias, Zendesk, Freshdesk]
        KLAV[Klaviyo Integration<br/>Email Marketing Flows]
    end

    subgraph "Analytics"
        BQ[(BigQuery<br/>Return Analytics<br/>Product Insights<br/>Financial Reports)]
    end

    FE <-->|App Bridge API| SA
    FE <-->|HTTPS| CF
    TE <-->|HTTPS| CF
    SW -->|Webhook Events| CF
    CF <-->|GraphQL / REST| SA
    CF --> SHIP
    CF --> EMAIL
    CF --> SMS
    CF <--> HD
    CF <--> KLAV
    CF --> SF
    CF --> BQ
    CT -->|Async Processing| CF
    SPOS -.->|Future: P2| CF

    style FE fill:#5C6AC4,color:#fff
    style TE fill:#008060,color:#fff
    style CF fill:#FFA726,color:#fff
    style FS fill:#4FC3F7,color:#fff
    style BQ fill:#7E57C2,color:#fff
    style SHIP fill:#EF5350,color:#fff
```

---

## 2. Return Request Lifecycle State Machine

```mermaid
stateDiagram-v2
    [*] --> Requested: Customer submits return

    Requested --> UnderReview: Manual review required
    Requested --> AutoApproved: Matches auto-approve rules
    Requested --> Rejected: Violates policy<br/>(outside window, non-returnable)

    UnderReview --> Approved: Merchant approves
    UnderReview --> Rejected: Merchant rejects
    UnderReview --> MoreInfoNeeded: Request photos/details

    MoreInfoNeeded --> UnderReview: Customer provides info

    AutoApproved --> Approved

    Approved --> LabelGenerated: Return shipping label created
    Approved --> KeepItem: Green return<br/>(low-value item, skip shipping)
    Approved --> QRCodeIssued: QR code for box-free drop-off

    LabelGenerated --> ItemShipped: Customer ships item
    QRCodeIssued --> ItemShipped: Customer drops off item

    ItemShipped --> InTransit: Carrier tracking active
    InTransit --> ItemReceived: Delivered to warehouse

    ItemReceived --> Inspecting: Warehouse inspects item

    Inspecting --> Passed: Item condition acceptable
    Inspecting --> Failed: Item condition unacceptable

    Failed --> PartialRefund: Partial refund issued<br/>(damaged/worn item)
    Failed --> Rejected: Return denied post-inspection

    Passed --> RefundIssued: Refund to original payment
    Passed --> StoreCreditIssued: Store credit / gift card
    Passed --> ExchangeCreated: Exchange order created
    Passed --> RestockedInventory: Item returned to inventory

    KeepItem --> RefundIssued
    KeepItem --> StoreCreditIssued
    KeepItem --> ExchangeCreated

    RefundIssued --> Completed
    StoreCreditIssued --> Completed
    ExchangeCreated --> Completed
    PartialRefund --> Completed
    Rejected --> Closed

    Completed --> [*]
    Closed --> [*]

    state Approved {
        [*] --> DetermineResolution
        DetermineResolution --> SelectShipping: Refund or Store Credit
        DetermineResolution --> InitiateExchange: Exchange selected
    }

    note right of AutoApproved
        Rules engine checks:
        - Within return window
        - Item is returnable
        - Order value threshold
        - Customer not blocklisted
        - No fraud flags
    end note

    note right of KeepItem
        Triggered when:
        - Item value < merchant threshold
        - Shipping cost > item value
        - Sustainability preference
    end note
```

---

## 3. Exchange Flow Diagram

```mermaid
flowchart TB
    Start([Customer Initiates Return]) --> SelectItems[Select Items to Return]
    SelectItems --> ChooseResolution{Choose Resolution Type}

    ChooseResolution -->|Refund| RefundFlow[Standard Refund Flow]
    ChooseResolution -->|Store Credit| CreditFlow[Store Credit Flow]
    ChooseResolution -->|Exchange| ExchangeType{Exchange Type}

    ExchangeType -->|Same Product<br/>Different Variant| VariantExchange[Variant Exchange]
    ExchangeType -->|Different Product| ProductExchange[Cross-Product Exchange]
    ExchangeType -->|Shop Now| ShopNowFlow[Browse Store Catalog]

    VariantExchange --> SelectVariant[Select Size / Color / Option]
    ProductExchange --> SelectProduct[Select Replacement Product]
    ShopNowFlow --> BrowseCatalog[Browse Full Catalog<br/>with Return Credit Applied]

    SelectVariant --> CheckInventory{Inventory Available?}
    SelectProduct --> CheckInventory
    BrowseCatalog --> SelectFromCatalog[Customer Selects Item] --> CheckInventory

    CheckInventory -->|Yes| ReserveInventory[Reserve Exchange Item<br/>Hold for 7 days]
    CheckInventory -->|No| SuggestAlternatives[Suggest In-Stock Alternatives<br/>AI Recommendations]
    SuggestAlternatives --> SelectVariant

    ReserveInventory --> PriceComparison{Price Difference?}

    PriceComparison -->|Same Price| NoCharge[No Additional Charge]
    PriceComparison -->|New Item Costs More<br/>Upsell| CollectDifference[Charge Price Difference<br/>to Customer Payment Method]
    PriceComparison -->|New Item Costs Less<br/>Downsell| IssueCredit[Issue Remaining as<br/>Store Credit]

    NoCharge --> BonusCredit{Merchant Offers<br/>Bonus Credit?}
    CollectDifference --> BonusCredit
    IssueCredit --> BonusCredit

    BonusCredit -->|Yes| ApplyBonus[Apply Bonus Credit<br/>e.g., Extra $5 for choosing exchange]
    BonusCredit -->|No| SkipBonus[Continue without bonus]

    ApplyBonus --> InstantExchange{Instant Exchange<br/>Enabled?}
    SkipBonus --> InstantExchange

    InstantExchange -->|Yes - Pro Plan| CreateNewOrder[Create Exchange Order<br/>Ship Immediately]
    InstantExchange -->|No - Standard| WaitForReturn[Wait for Return Receipt<br/>Then Create Exchange Order]

    CreateNewOrder --> HoldCard[Hold Customer Card<br/>as Security Deposit]
    HoldCard --> ShipExchange[Ship Exchange Item]
    ShipExchange --> AwaitReturn[Await Original Item Return]

    WaitForReturn --> CustomerShips[Customer Ships Return]
    CustomerShips --> ReceiveItem[Receive & Inspect Return]
    ReceiveItem --> CreateExchangeOrder[Create Exchange Order]
    CreateExchangeOrder --> ShipExchangeStd[Ship Exchange Item]

    AwaitReturn --> ReturnReceived{Return Received<br/>Within Window?}
    ReturnReceived -->|Yes| ReleaseHold[Release Card Hold]
    ReturnReceived -->|No - Expired| ChargeCard[Charge Security Deposit]

    ReleaseHold --> ExchangeComplete([Exchange Complete])
    ChargeCard --> ExchangeComplete
    ShipExchangeStd --> ExchangeComplete

    style Start fill:#5C6AC4,color:#fff
    style ExchangeComplete fill:#008060,color:#fff
    style InstantExchange fill:#FFA726,color:#000
    style BonusCredit fill:#7E57C2,color:#fff
    style CheckInventory fill:#EF5350,color:#fff
```

---

## 4. Customer Return Portal Flow

```mermaid
flowchart TB
    Entry([Customer Visits Return Portal]) --> Lookup[Order Lookup]

    Lookup --> LookupMethod{Lookup Method}
    LookupMethod -->|Order # + Email| ValidateOrder[Validate Order]
    LookupMethod -->|Login to Account| AccountOrders[Show Customer Orders]

    ValidateOrder --> OrderFound{Order Found?}
    OrderFound -->|No| ErrorMsg[Show Error:<br/>Order Not Found]
    ErrorMsg --> Lookup
    OrderFound -->|Yes| CheckEligibility{Return Eligible?}

    AccountOrders --> SelectOrder[Select Order to Return] --> CheckEligibility

    CheckEligibility -->|No - Outside Window| NotEligible[Show: Return Window Expired<br/>Contact support for help]
    CheckEligibility -->|No - Non-returnable| NonReturnable[Show: This item cannot be returned<br/>per store policy]
    CheckEligibility -->|Yes| SelectItems[Select Items to Return]

    SelectItems --> ItemList[Display Order Items<br/>with Checkboxes]
    ItemList --> SelectQuantity[Select Quantity per Item]
    SelectQuantity --> SelectReason[Select Return Reason<br/>per Item]

    SelectReason --> ReasonDropdown{Reason Category}
    ReasonDropdown -->|Sizing Issue| SizeDetail[Specify: Too Small / Too Large]
    ReasonDropdown -->|Damaged/Defective| DamageDetail[Describe Damage]
    ReasonDropdown -->|Not As Described| DescDetail[Describe Difference]
    ReasonDropdown -->|Changed Mind| MindDetail[Optional Comment]
    ReasonDropdown -->|Other| OtherDetail[Provide Details]

    SizeDetail --> PhotoRequired{Photo Required<br/>by Policy?}
    DamageDetail --> PhotoRequired
    DescDetail --> PhotoRequired
    MindDetail --> PhotoRequired
    OtherDetail --> PhotoRequired

    PhotoRequired -->|Yes| UploadPhotos[Upload Photos<br/>Max 5 images, 10MB each<br/>Stored in Cloud Storage]
    PhotoRequired -->|No| ChooseResolution

    UploadPhotos --> ChooseResolution{Choose Resolution}

    ChooseResolution -->|Refund to Original| RefundOption[Refund to Original Payment]
    ChooseResolution -->|Store Credit| CreditOption[Store Credit / Gift Card<br/>Show Bonus: +$5 incentive]
    ChooseResolution -->|Exchange| ExchangeOption[Exchange for Another Item<br/>Show Bonus: +$5 incentive]

    RefundOption --> ShippingMethod
    CreditOption --> ShippingMethod
    ExchangeOption --> ExchangeSelection[Select Exchange Item<br/>Variant or Product] --> ShippingMethod

    ShippingMethod{Return Shipping Method}
    ShippingMethod -->|Prepaid Label| GenerateLabel[Generate Return Label<br/>USPS / FedEx / UPS]
    ShippingMethod -->|QR Code| GenerateQR[Generate QR Code<br/>for Box-Free Drop-off]
    ShippingMethod -->|Keep Item| KeepItemOption[Green Return:<br/>Keep the Item]
    ShippingMethod -->|Customer Pays| CustomerShip[Customer Arranges Shipping<br/>Provide Warehouse Address]

    GenerateLabel --> ReviewSummary
    GenerateQR --> ReviewSummary
    KeepItemOption --> ReviewSummary
    CustomerShip --> ReviewSummary

    ReviewSummary[Review Return Summary<br/>Items, Reasons, Resolution, Shipping]
    ReviewSummary --> Submit[Submit Return Request]

    Submit --> Confirmation[Confirmation Page<br/>Return ID, Next Steps,<br/>Tracking Link, Email Sent]

    Confirmation --> TrackStatus[Track Return Status<br/>Real-time Updates]

    TrackStatus --> StatusPage[Status Page Shows:<br/>Submitted > Approved > Shipped ><br/>Received > Inspected > Resolved]

    style Entry fill:#5C6AC4,color:#fff
    style Confirmation fill:#008060,color:#fff
    style CreditOption fill:#7E57C2,color:#fff
    style ExchangeOption fill:#FFA726,color:#000
```

---

## 5. Data Flow Diagram

```mermaid
flowchart LR
    subgraph "Shopify Platform"
        SO[Shopify Orders]
        SP[Shopify Products]
        SC[Shopify Customers]
        SPAY[Shopify Payments]
        SINV[Shopify Inventory]
    end

    subgraph "Inbound Webhooks"
        WH_OC[orders/create]
        WH_OU[orders/updated]
        WH_RC[refunds/create]
        WH_AU[app/uninstalled]
        WH_PI[products/update]
    end

    subgraph "Firebase Cloud Functions"
        direction TB
        WH_Handler[Webhook Handlers<br/>Verify HMAC, Queue Processing]
        API_Handler[API Handlers<br/>Return Portal + Admin APIs]

        subgraph "Services Layer"
            RS[Return Service<br/>Create, Update, Process]
            ES[Exchange Service<br/>Variant, Product, Instant]
            RFS[Refund Service<br/>Original Payment, Store Credit]
            PS[Policy Service<br/>Eligibility, Rules Engine]
            NS[Notification Service<br/>Email, SMS]
            SS[Shipping Service<br/>Labels, QR Codes, Tracking]
            AS[Analytics Service<br/>Events, Aggregations]
            FDS[Fraud Detection Service<br/>Score, Block, Alert]
        end

        subgraph "Repositories"
            RR[(ReturnRequests)]
            SR[(Shops / Settings)]
            RIR[(ReturnItems)]
            ER[(Exchanges)]
            SLR[(ShippingLabels)]
            NR[(Notifications)]
            ALR[(AuditLogs)]
        end
    end

    subgraph "External Services"
        EP[EasyPost / Shippo<br/>Label Generation]
        EM[Email Provider<br/>SendGrid / Mailgun]
        SMSP[SMS Provider<br/>Twilio]
    end

    subgraph "Analytics Pipeline"
        BQ[(BigQuery)]
        BQ_RET[Return Events Table<br/>Partitioned by date]
        BQ_PROD[Product Return Rates<br/>Clustered by product_id]
        BQ_FIN[Financial Impact<br/>Partitioned by month]
    end

    SO -->|Webhook| WH_OC --> WH_Handler
    SO -->|Webhook| WH_OU --> WH_Handler
    SPAY -->|Webhook| WH_RC --> WH_Handler
    SP -->|Webhook| WH_PI --> WH_Handler

    WH_Handler --> RS
    WH_Handler --> RFS

    API_Handler --> RS
    API_Handler --> ES
    API_Handler --> RFS
    API_Handler --> PS
    API_Handler --> SS

    RS --> RR
    RS --> RIR
    RS --> NS
    RS --> AS
    RS --> FDS
    ES --> ER
    ES --> SINV
    RFS --> SPAY
    SS --> EP
    SS --> SLR
    NS --> EM
    NS --> SMSP
    NS --> NR
    AS --> BQ

    BQ --> BQ_RET
    BQ --> BQ_PROD
    BQ --> BQ_FIN

    PS --> SR
    FDS --> ALR

    style WH_Handler fill:#FFA726,color:#000
    style API_Handler fill:#FFA726,color:#000
    style BQ fill:#7E57C2,color:#fff
    style RS fill:#4FC3F7,color:#000
    style ES fill:#4FC3F7,color:#000
```

---

## 6. Entity Relationship Diagram

```mermaid
erDiagram
    SHOPS {
        string shopId PK
        string shopDomain
        string shopName
        string plan "free|starter|pro|enterprise"
        object settings
        object branding "logo, colors, fonts"
        timestamp installedAt
        timestamp updatedAt
        boolean active
    }

    RETURN_POLICIES {
        string policyId PK
        string shopId FK
        int returnWindowDays "e.g., 30"
        boolean requirePhotos
        boolean autoApproveEnabled
        object autoApproveRules
        array nonReturnableProducts
        array nonReturnableTags
        boolean exchangeBonusEnabled
        number exchangeBonusAmount
        boolean greenReturnsEnabled
        number greenReturnsThreshold
        boolean restockingFeeEnabled
        number restockingFeePercent
        array returnReasons
        timestamp createdAt
        timestamp updatedAt
    }

    RETURN_REQUESTS {
        string returnId PK
        string shopId FK
        string orderId FK
        string orderName "e.g., #1234"
        string customerId
        string customerEmail
        string customerName
        string status "requested|under_review|approved|rejected|shipped|received|inspected|completed|closed"
        string resolutionType "refund|store_credit|exchange"
        string shippingMethod "label|qr_code|keep_item|customer_ships"
        number totalReturnValue
        number refundAmount
        number storeCreditAmount
        boolean isFraudFlagged
        number fraudScore
        string notes
        timestamp requestedAt
        timestamp approvedAt
        timestamp shippedAt
        timestamp receivedAt
        timestamp resolvedAt
        timestamp ttl "Auto-delete after 2 years"
    }

    RETURN_ITEMS {
        string itemId PK
        string returnId FK
        string shopId FK
        string lineItemId
        string productId
        string variantId
        string productTitle
        string variantTitle
        int quantity
        number unitPrice
        string returnReason
        string returnReasonDetail
        string conditionOnReceipt "new|like_new|used|damaged"
        boolean restocked
        array photoUrls
        timestamp createdAt
    }

    EXCHANGES {
        string exchangeId PK
        string returnId FK
        string shopId FK
        string originalVariantId
        string newVariantId
        string newProductId
        string newOrderId "Shopify order ID for exchange"
        string exchangeType "variant|cross_product|shop_now"
        number originalPrice
        number newPrice
        number priceDifference
        number bonusCreditApplied
        boolean isInstantExchange
        string status "pending|order_created|shipped|completed|cancelled"
        timestamp reservedUntil "Inventory hold expiry"
        timestamp createdAt
        timestamp completedAt
    }

    REFUNDS {
        string refundId PK
        string returnId FK
        string shopId FK
        string shopifyRefundId "Shopify refund ID"
        string type "original_payment|store_credit|gift_card|partial"
        number amount
        string currency
        string status "pending|processed|failed"
        string giftCardId "If store credit"
        timestamp processedAt
        timestamp createdAt
    }

    STORE_CREDITS {
        string creditId PK
        string shopId FK
        string customerId
        string customerEmail
        string giftCardId "Shopify gift card ID"
        number amount
        number remainingBalance
        string currency
        string source "return_refund|exchange_bonus|exchange_downsell|promotional"
        string returnId FK
        boolean active
        timestamp issuedAt
        timestamp expiresAt
    }

    SHIPPING_LABELS {
        string labelId PK
        string returnId FK
        string shopId FK
        string carrier "usps|fedex|ups|dhl"
        string trackingNumber
        string trackingUrl
        string labelUrl "PDF download link"
        string qrCodeUrl "QR code image if box-free"
        string labelType "prepaid|qr_code"
        number shippingCost
        string status "created|in_transit|delivered|expired"
        timestamp createdAt
        timestamp expiresAt
    }

    RETURN_REASONS {
        string reasonId PK
        string shopId FK
        string label "e.g., Too Small"
        string category "sizing|defective|not_as_described|changed_mind|other"
        boolean requiresPhoto
        boolean active
        int sortOrder
        timestamp createdAt
    }

    NOTIFICATIONS {
        string notificationId PK
        string shopId FK
        string returnId FK
        string type "email|sms"
        string event "return_requested|return_approved|return_rejected|label_created|item_received|refund_issued|exchange_shipped"
        string recipient
        string subject
        string status "sent|failed|pending"
        timestamp sentAt
        timestamp ttl "Auto-delete after 90 days"
    }

    AUDIT_LOGS {
        string logId PK
        string shopId FK
        string returnId FK
        string action "created|approved|rejected|refunded|exchanged|note_added|status_changed"
        string performedBy "system|merchant_email"
        object previousState
        object newState
        timestamp createdAt
        timestamp ttl "Auto-delete after 1 year"
    }

    SHOPS ||--o{ RETURN_POLICIES : "configures"
    SHOPS ||--o{ RETURN_REQUESTS : "receives"
    SHOPS ||--o{ RETURN_REASONS : "defines"
    RETURN_REQUESTS ||--o{ RETURN_ITEMS : "contains"
    RETURN_REQUESTS ||--o| EXCHANGES : "may create"
    RETURN_REQUESTS ||--o| REFUNDS : "may issue"
    RETURN_REQUESTS ||--o| SHIPPING_LABELS : "may generate"
    RETURN_REQUESTS ||--o{ NOTIFICATIONS : "triggers"
    RETURN_REQUESTS ||--o{ AUDIT_LOGS : "logs"
    RETURN_REQUESTS }o--o| STORE_CREDITS : "may issue"
    EXCHANGES }o--o| STORE_CREDITS : "may use bonus"
```

---

## 7. Deployment Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        ADMIN[Shopify Admin<br/>Embedded App<br/>React + Polaris]
        STORE[Shopify Storefront<br/>Theme Extension<br/>Liquid + JS]
        MOBILE[Mobile Browsers<br/>Responsive Portal]
    end

    subgraph "CDN / Hosting"
        FH[Firebase Hosting<br/>Static Assets<br/>SPA, CSS, JS]
    end

    subgraph "Google Cloud Platform"
        subgraph "Compute"
            CF1[Cloud Functions<br/>API Handlers<br/>Node.js 20]
            CF2[Cloud Functions<br/>Webhook Processors<br/>Node.js 20]
            CF3[Cloud Functions<br/>Background Workers<br/>Triggered by Cloud Tasks]
            CF4[Cloud Functions<br/>Scheduled Jobs<br/>Pub/Sub Cron]
        end

        subgraph "Data Storage"
            FS[(Firestore<br/>Primary Database<br/>Multi-region)]
            GCS[Cloud Storage<br/>Return Photos<br/>Shipping Labels PDFs]
            RC[Redis / Memorystore<br/>Rate Limiting<br/>Session Cache]
        end

        subgraph "Async Processing"
            CT[Cloud Tasks<br/>Queued Jobs]
            PS_PUB[Pub/Sub Topics<br/>return.created<br/>return.approved<br/>return.completed<br/>exchange.created<br/>refund.processed]
        end

        subgraph "Analytics & Monitoring"
            BQ[(BigQuery<br/>Analytics Warehouse)]
            CL[Cloud Logging<br/>Structured Logs]
            CM[Cloud Monitoring<br/>Alerts & Dashboards]
        end
    end

    subgraph "External APIs"
        SHOPIFY_API[Shopify Admin API<br/>GraphQL + REST]
        EASYPOST[EasyPost API<br/>Multi-carrier Labels]
        SENDGRID[SendGrid<br/>Transactional Email]
        TWILIO[Twilio<br/>SMS Notifications]
    end

    ADMIN --> FH
    STORE --> CF1
    MOBILE --> FH

    FH --> CF1
    SHOPIFY_API -->|Webhooks| CF2

    CF1 --> FS
    CF1 --> GCS
    CF1 --> RC
    CF1 --> CT

    CF2 --> PS_PUB
    PS_PUB --> CF3

    CF3 --> FS
    CF3 --> SHOPIFY_API
    CF3 --> EASYPOST
    CF3 --> SENDGRID
    CF3 --> TWILIO
    CF3 --> BQ

    CF4 -->|Daily| BQ
    CF4 -->|Hourly| FS

    CT --> CF3

    CF1 --> CL
    CF2 --> CL
    CF3 --> CL
    CL --> CM

    style CF1 fill:#FFA726,color:#000
    style CF2 fill:#FFA726,color:#000
    style CF3 fill:#FFA726,color:#000
    style CF4 fill:#FFA726,color:#000
    style FS fill:#4FC3F7,color:#000
    style BQ fill:#7E57C2,color:#fff
    style GCS fill:#66BB6A,color:#000
    style FH fill:#5C6AC4,color:#fff
```

### Webhook Processing Flow (Must Respond < 5 Seconds)

```mermaid
sequenceDiagram
    participant S as Shopify
    participant WH as Webhook Handler<br/>(Cloud Function)
    participant PS as Pub/Sub
    participant W as Background Worker<br/>(Cloud Function)
    participant DB as Firestore
    participant EXT as External APIs

    S->>WH: POST /webhooks/orders/updated
    WH->>WH: Verify HMAC signature
    WH->>PS: Publish to topic<br/>(return.order_updated)
    WH-->>S: 200 OK (< 1 second)

    Note over WH,S: Webhook responds immediately.<br/>Heavy processing happens async.

    PS->>W: Trigger background worker
    W->>DB: Read return request data
    W->>W: Process business logic
    W->>DB: Update return status
    W->>EXT: Send notification / Update Shopify
```

---

## 8. Merchant Admin Flow

```mermaid
flowchart TB
    Login([Merchant Opens App<br/>in Shopify Admin]) --> FirstTime{First Visit?}

    FirstTime -->|Yes| Wizard[Quick-Start Wizard<br/>10-Minute Setup]
    FirstTime -->|No| Dashboard

    subgraph "Quick-Start Wizard"
        Wizard --> W1[Step 1: Import Shopify Policies<br/>Auto-detect return window, items]
        W1 --> W2[Step 2: Configure Return Portal<br/>Upload logo, set colors]
        W2 --> W3[Step 3: Set Up Shipping<br/>Connect carrier or use Avada labels]
        W3 --> W4[Step 4: Email Templates<br/>Preview & customize notifications]
        W4 --> W5[Step 5: Activate Portal<br/>Enable theme extension block]
        W5 --> Dashboard
    end

    Dashboard[Dashboard<br/>Key Metrics Overview]

    Dashboard --> Metrics[Quick Stats:<br/>Open Returns, Pending Review,<br/>Revenue Retained, Exchange Rate]

    Dashboard --> ReturnList[Return Request List]
    Dashboard --> AnalyticsPage[Analytics & Reports]
    Dashboard --> SettingsPage[Settings]

    subgraph "Return List View"
        ReturnList --> Filters[Filter & Search<br/>Status, Date, Customer, Product]
        Filters --> BulkSelect[Select Multiple Returns]
        BulkSelect --> BulkActions{Bulk Actions}
        BulkActions -->|Approve All| BulkApprove[Bulk Approve]
        BulkActions -->|Generate Labels| BulkLabels[Bulk Label Generation]
        BulkActions -->|Export| BulkExport[Export to CSV]

        Filters --> SingleReturn[Click Single Return]
    end

    subgraph "Return Detail View"
        SingleReturn --> DetailView[Return Detail Page]
        DetailView --> OrderInfo[Order Information<br/>Customer, Items, Dates]
        DetailView --> ReturnItemsList[Return Items<br/>with Reasons & Photos]
        DetailView --> Timeline[Activity Timeline<br/>Status Changes, Notes]

        DetailView --> Actions{Available Actions}
        Actions -->|Approve| ApproveReturn[Approve Return<br/>Select Resolution Type]
        Actions -->|Reject| RejectReturn[Reject Return<br/>Add Reason, Send Email]
        Actions -->|Request Info| RequestInfo[Request More Info<br/>Ask for Photos/Details]
        Actions -->|Process Refund| ProcessRefund[Issue Refund<br/>Original / Store Credit / Partial]
        Actions -->|Create Exchange| CreateExchange[Create Exchange Order<br/>Select Replacement Item]
        Actions -->|Generate Label| GenLabel[Generate Shipping Label<br/>Select Carrier]
        Actions -->|Mark Received| MarkReceived[Mark Item Received<br/>Set Condition]
        Actions -->|Add Note| AddNote[Internal Note<br/>for Team Communication]
    end

    subgraph "Analytics Page"
        AnalyticsPage --> OverviewMetrics[Overview Metrics<br/>Total Returns, Rate, Avg Time]
        AnalyticsPage --> ReasonChart[Return Reasons Breakdown<br/>Bar Chart by Category]
        AnalyticsPage --> ResolutionChart[Resolution Distribution<br/>Refund vs Exchange vs Credit]
        AnalyticsPage --> ProductInsights[Product-Level Insights<br/>Top Returned Products<br/>Variant-Level Return Rates]
        AnalyticsPage --> FinancialReport[Financial Impact<br/>Total Refunded, Revenue Retained<br/>Exchange Conversion Rate]
        AnalyticsPage --> TrendChart[Trends Over Time<br/>Returns Volume, Resolution Mix]
    end

    subgraph "Settings Page"
        SettingsPage --> PolicySettings[Return Policies<br/>Windows, Rules, Eligibility]
        SettingsPage --> PortalSettings[Portal Customization<br/>Branding, Layout, Language]
        SettingsPage --> ShippingSettings[Shipping Configuration<br/>Carriers, Label Preferences]
        SettingsPage --> NotifSettings[Notification Templates<br/>Email & SMS Content]
        SettingsPage --> AutomationSettings[Automation Rules<br/>Auto-approve, Workflows]
        SettingsPage --> FraudSettings[Fraud Prevention<br/>Blocklist, Thresholds, Alerts]
        SettingsPage --> IntegrationSettings[Integrations<br/>Gorgias, Klaviyo, Shopify Flow]
        SettingsPage --> BillingSettings[Billing & Plan<br/>Current Plan, Usage, Upgrade]
    end

    style Login fill:#5C6AC4,color:#fff
    style Dashboard fill:#008060,color:#fff
    style Wizard fill:#FFA726,color:#000
    style DetailView fill:#4FC3F7,color:#000
```

---

## Summary

This document contains 8 comprehensive technical diagrams covering the full architecture and user flows for the Avada Return & Exchange app:

| # | Diagram | Purpose |
|---|---------|---------|
| 1 | System Architecture | Overall system topology and integrations |
| 2 | Return Request Lifecycle | State machine with all status transitions and edge cases |
| 3 | Exchange Flow | Complete exchange process including variant, cross-product, Shop Now, instant exchange, and price difference handling |
| 4 | Customer Return Portal | End-to-end customer journey from order lookup to tracking |
| 5 | Data Flow | How data moves between Shopify, Firebase, external services, and BigQuery |
| 6 | Entity Relationship | Full database schema with all collections and relationships |
| 7 | Deployment Architecture | GCP/Firebase topology with async processing and webhook flow |
| 8 | Merchant Admin Flow | Admin dashboard navigation, actions, and settings |

All diagrams are based on the feature matrix (02), target audience requirements (03), opportunity scoring (04), and competitive analysis (05-06) from previous research files. The architecture is designed to support the proposed pricing tiers: Free (50 returns), Starter ($9/150 returns), Pro ($29/500 returns), and Enterprise ($99/2,000 returns).
