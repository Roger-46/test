# 04 - Kiến Trúc Forward-Compatible
# Submit → MVP: Chỉ Thêm, Không Đập Xây Lại

---

## 1. Nguyên Tắc Kiến Trúc

### Rule #1: Code Submit = Subset Của MVP
Mỗi dòng code trong bản Submit phải nằm nguyên trong bản MVP. Khi lên MVP:
- **Thêm file mới** -- OK
- **Thêm function vào file hiện tại** -- OK
- **Thêm field vào schema** -- OK
- **Sửa vài dòng logic** -- OK (ví dụ: thêm condition)
- **Xóa file/function** -- KHÔNG
- **Đổi cấu trúc thư mục** -- KHÔNG
- **Đổi database schema** -- KHÔNG
- **Đổi API route patterns** -- KHÔNG
- **Đổi auth pattern** -- KHÔNG

### Rule #2: Interface Trước, Implementation Sau
Định nghĩa interfaces/contracts cho MVP features, nhưng chỉ implement phần Submit cần. Ví dụ: `editService.processEdit()` xử lý swap/qty/address. MVP chỉ cần thêm code vào trong, không đổi signature.

### Rule #3: Config-Driven Behavior
Tính năng bật/tắt qua config, không qua code branching. Khi MVP thêm feature mới, chỉ cần thêm config key + handler.

---

## 2. Cấu Trúc Thư Mục (Giữ Nguyên Submit → MVP)

```
avada-order-editing/
├── packages/
│   ├── functions/                    # Firebase Functions backend
│   │   ├── src/
│   │   │   ├── handlers/            # HTTP + Pub/Sub handlers
│   │   │   │   ├── authHandler.js           # [Submit] OAuth flow
│   │   │   │   ├── billingHandler.js        # [MVP] Shopify Billing
│   │   │   │   ├── webhookHandler.js        # [Submit] Webhook receiver
│   │   │   │   ├── orderEventHandler.js     # [Submit] Order webhook processor
│   │   │   │   ├── storefrontEditHandler.js # [Submit] Customer edit API
│   │   │   │   ├── storefrontCancelHandler.js # [Submit] Customer cancel API
│   │   │   │   ├── storefrontAddressHandler.js # [Submit] Customer address API
│   │   │   │   ├── storefrontRetentionHandler.js # [MVP] Retention API
│   │   │   │   ├── adminOrderHandler.js     # [Submit] Admin order API
│   │   │   │   ├── adminSettingsHandler.js  # [Submit] Admin settings API
│   │   │   │   ├── adminRulesHandler.js     # [MVP] Admin edit rules API
│   │   │   │   ├── adminAnalyticsHandler.js # [MVP] Admin analytics API
│   │   │   │   ├── adminUpsellHandler.js    # [Full] Admin upsell API
│   │   │   │   ├── scheduledHandler.js      # [Submit] Edit window expiry
│   │   │   │   ├── notificationHandler.js   # [Submit] Email processor
│   │   │   │   └── appProxyHandler.js       # [Submit] App proxy for storefront
│   │   │   │
│   │   │   ├── services/             # Business logic
│   │   │   │   ├── authService.js           # [Submit]
│   │   │   │   ├── billingService.js        # [MVP]
│   │   │   │   ├── orderSyncService.js      # [Submit]
│   │   │   │   ├── editWindowService.js     # [Submit]
│   │   │   │   ├── editEligibilityService.js # [Submit]
│   │   │   │   ├── editValidationService.js # [Submit]
│   │   │   │   ├── editRuleEngine.js        # [Submit] global rules, [MVP] per-product
│   │   │   │   ├── orderEditService.js      # [Submit] core edit orchestrator
│   │   │   │   ├── shopifyOrderEditService.js # [Submit] Shopify API wrapper
│   │   │   │   ├── addressEditService.js    # [Submit]
│   │   │   │   ├── inventoryService.js      # [Submit]
│   │   │   │   ├── priceDiffService.js      # [Submit]
│   │   │   │   ├── cancellationService.js   # [Submit]
│   │   │   │   ├── refundService.js         # [Submit]
│   │   │   │   ├── notificationService.js   # [Submit]
│   │   │   │   ├── emailService.js          # [Submit]
│   │   │   │   ├── usageService.js          # [Submit]
│   │   │   │   ├── retentionService.js      # [MVP]
│   │   │   │   ├── upsellService.js         # [Full]
│   │   │   │   ├── storeCreditService.js    # [Full]
│   │   │   │   ├── addressValidationService.js # [MVP]
│   │   │   │   ├── analyticsService.js      # [MVP]
│   │   │   │   └── shopifyFlowService.js    # [Full]
│   │   │   │
│   │   │   ├── repositories/         # Firestore CRUD
│   │   │   │   ├── shopRepository.js        # [Submit]
│   │   │   │   ├── editSettingsRepository.js # [Submit]
│   │   │   │   ├── orderRepository.js       # [Submit]
│   │   │   │   ├── orderEditRepository.js   # [Submit]
│   │   │   │   ├── subscriptionRepository.js # [Submit] (basic), [MVP] (full)
│   │   │   │   ├── editRuleRepository.js    # [MVP]
│   │   │   │   ├── notificationRepository.js # [Submit]
│   │   │   │   ├── webhookLogRepository.js  # [Submit]
│   │   │   │   ├── analyticsEventRepository.js # [MVP]
│   │   │   │   └── upsellOfferRepository.js # [Full]
│   │   │   │
│   │   │   ├── middleware/            # Request middleware
│   │   │   │   ├── auth.js                  # [Submit] Session token verify
│   │   │   │   ├── webhookAuth.js           # [Submit] HMAC verify
│   │   │   │   ├── storefrontAuth.js        # [Submit] Order token verify
│   │   │   │   ├── rateLimiter.js           # [Submit] (basic)
│   │   │   │   └── errorHandler.js          # [Submit]
│   │   │   │
│   │   │   ├── helpers/               # Utilities
│   │   │   │   ├── shopify.js               # [Submit] Shopify client factory
│   │   │   │   ├── crypto.js                # [Submit] Token encryption
│   │   │   │   ├── tokenGenerator.js        # [Submit] Storefront tokens
│   │   │   │   ├── constants.js             # [Submit] All constants
│   │   │   │   ├── errors.js                # [Submit] Error classes
│   │   │   │   ├── logger.js                # [Submit] Structured logging
│   │   │   │   ├── emailTemplates.js        # [Submit] Basic, [MVP] Custom
│   │   │   │   ├── pubsub.js               # [MVP] Pub/Sub publisher
│   │   │   │   ├── bigquery.js             # [MVP] BigQuery client
│   │   │   │   └── googleMaps.js           # [MVP] Address validation
│   │   │   │
│   │   │   ├── router.js             # [Submit] Express router
│   │   │   └── index.js              # [Submit] Entry point
│   │   │
│   │   ├── test/                      # Tests
│   │   └── package.json
│   │
│   ├── assets/                        # React admin app
│   │   ├── src/
│   │   │   ├── App.jsx               # [Submit]
│   │   │   ├── routes.jsx            # [Submit] → [MVP] thêm routes
│   │   │   ├── pages/
│   │   │   │   ├── DashboardPage.jsx        # [Submit]
│   │   │   │   ├── OrdersPage.jsx           # [Submit]
│   │   │   │   ├── OrderDetailPage.jsx      # [Submit]
│   │   │   │   ├── SettingsPage.jsx         # [Submit]
│   │   │   │   ├── OnboardingPage.jsx       # [Submit]
│   │   │   │   ├── EditRulesPage.jsx        # [MVP]
│   │   │   │   ├── AnalyticsPage.jsx        # [MVP]
│   │   │   │   ├── SubscriptionPage.jsx     # [MVP]
│   │   │   │   └── UpsellOffersPage.jsx     # [Full]
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── NavigationMenu.jsx       # [Submit] → [MVP] thêm items
│   │   │   │   ├── AppLayout.jsx            # [Submit]
│   │   │   │   ├── dashboard/               # [Submit]
│   │   │   │   ├── orders/                  # [Submit]
│   │   │   │   ├── settings/                # [Submit]
│   │   │   │   ├── onboarding/              # [Submit]
│   │   │   │   ├── rules/                   # [MVP]
│   │   │   │   ├── analytics/               # [MVP]
│   │   │   │   ├── subscription/            # [MVP]
│   │   │   │   └── upsell/                  # [Full]
│   │   │   │
│   │   │   └── hooks/
│   │   │       ├── useDashboard.js          # [Submit]
│   │   │       ├── useOrders.js             # [Submit]
│   │   │       ├── useOrderDetail.js        # [Submit]
│   │   │       ├── useEditSettings.js       # [Submit]
│   │   │       ├── useEditRules.js          # [MVP]
│   │   │       ├── useAnalytics.js          # [MVP]
│   │   │       ├── useSubscription.js       # [MVP]
│   │   │       └── useUpsellOffers.js       # [Full]
│   │   │
│   │   └── package.json
│   │
│   └── scripttag/                     # Preact storefront widget
│       ├── src/
│       │   ├── index.js               # [Submit]
│       │   ├── components/
│       │   │   ├── EditOrderPage.jsx        # [Submit]
│       │   │   ├── LineItemEditor.jsx       # [Submit]
│       │   │   ├── VariantSelector.jsx      # [Submit]
│       │   │   ├── AddressForm.jsx          # [Submit]
│       │   │   ├── EditSummary.jsx          # [Submit]
│       │   │   ├── ConfirmationScreen.jsx   # [Submit]
│       │   │   ├── CancellationFlow.jsx     # [Submit]
│       │   │   ├── CountdownTimer.jsx       # [Submit]
│       │   │   ├── ErrorState.jsx           # [Submit]
│       │   │   ├── RetentionFlow.jsx        # [MVP]
│       │   │   ├── UpsellSection.jsx        # [Full]
│       │   │   ├── RefundChoicePicker.jsx   # [Full]
│       │   │   ├── AddressAutocomplete.jsx  # [MVP]
│       │   │   └── AddressSuggestion.jsx    # [MVP]
│       │   │
│       │   ├── utils/
│       │   │   ├── api.js                   # [Submit]
│       │   │   ├── orderToken.js            # [Submit]
│       │   │   └── i18n.js                  # [Full]
│       │   │
│       │   └── styles/
│       │       └── main.css                 # [Submit]
│       │
│       └── package.json
│
├── extensions/
│   └── theme-extension/               # Theme App Extension
│       ├── blocks/
│       │   ├── order-edit-widget.liquid      # [Submit]
│       │   └── thank-you-banner.liquid       # [MVP]
│       ├── assets/
│       │   ├── order-edit-widget.js          # [Submit]
│       │   ├── order-edit-widget.css         # [Submit]
│       │   ├── thank-you-banner.js           # [MVP]
│       │   └── thank-you-banner.css          # [MVP]
│       ├── snippets/
│       │   └── edit-countdown.liquid          # [Submit]
│       └── locales/
│           ├── en.default.json               # [Submit]
│           ├── vi.json                        # [Full]
│           └── ...                            # [Full]
│
├── firebase.json                      # [Submit]
├── .firebaserc                        # [Submit]
├── firestore.rules                    # [Submit]
├── firestore.indexes.json             # [Submit] tạo đủ cho MVP
├── shopify.app.toml                   # [Submit]
├── package.json                       # [Submit]
└── .env.example                       # [Submit] có đủ keys cho MVP
```

**Đánh dấu:**
- `[Submit]` = Code cần viết cho bản Submit
- `[MVP]` = Thêm file/code khi lên MVP (không sửa existing)
- `[Full]` = Thêm khi phát triển bản Full (không sửa existing)

---

## 3. Firestore Schema (Tạo Đầy Đủ Từ Bản Submit)

### Nguyên tắc: Tạo schema đầy đủ, chỉ populate fields cần cho Submit

**Collection `shops`** -- Submit dùng tất cả fields

**Collection `editSettings`** -- Submit dùng:
- `timeWindowMinutes`, `timeWindowType`
- `allowAddressEdit`, `allowItemSwap`, `allowQuantityChange`, `allowRemoveItem`, `allowCancellation`
- `notifyMerchantOnEdit`, `notifyMerchantOnCancel`, `notifyCustomerOnMerchantEdit`
- `merchantNotificationEmail`
- `showOnOrderStatusPage`

MVP thêm:
- `showOnThankYouPage` (đã có trong schema, chỉ cần bật)
- `retentionEnabled`, `retentionOffers`
- `upsellEnabled`
- `storeCreditEnabled`, `storeCreditBonusPercent`
- `addressValidationEnabled`
- `widgetPrimaryColor`, `widgetText`

**Collection `orders`** -- Submit dùng tất cả fields cơ bản

**Collection `orderEdits`** -- Submit dùng fields cơ bản. MVP thêm populate:
- `upsellAccepted`, `upsellRevenue` (fields có sẵn, chỉ cần populate)
- `retentionOfferId`, `retentionType`

**Collection `subscriptions`** -- Submit: plan="free", usage tracking. MVP: full billing

**Collections chưa dùng trong Submit (nhưng indexes đã tạo sẵn):**
- `editRules` -- MVP
- `upsellOffers` -- Full
- `analyticsEvents` -- MVP

> **Quan trọng:** `firestore.indexes.json` tạo sẵn tất cả indexes cho MVP ngay từ Submit. Vì tạo index mất 5-10 phút mỗi lần deploy, làm trước tránh blocking khi phát triển MVP.

---

## 4. API Routes (Extendable)

### Submit routes:

```javascript
// Storefront (customer-facing)
GET  /api/orders/:orderId/edit-eligibility
GET  /api/orders/:orderId/edit-options
POST /api/orders/:orderId/edits
POST /api/orders/:orderId/edits/confirm
POST /api/orders/:orderId/cancel/init
POST /api/orders/:orderId/cancel/confirm
POST /api/orders/:orderId/address

// Admin (merchant-facing)
GET  /api/admin/orders
GET  /api/admin/orders/:orderId
GET  /api/admin/settings
PUT  /api/admin/settings

// Webhooks
POST /webhooks/:topic

// App Proxy
GET  /app-proxy/*
```

### MVP thêm routes (không sửa routes cũ):

```javascript
// Storefront - thêm mới
POST /api/orders/:orderId/cancel/retain       // Retention offer
POST /api/orders/:orderId/address/validate     // Address validation
GET  /api/orders/:orderId/edit-history        // Edit history

// Admin - thêm mới
POST /api/admin/orders/:orderId/edit/begin     // Merchant edit
POST /api/admin/orders/:orderId/edit/commit    // Merchant edit commit
POST /api/admin/orders/:orderId/cancel         // Merchant cancel
GET  /api/admin/rules                          // Edit rules CRUD
POST /api/admin/rules
PUT  /api/admin/rules/:ruleId
DELETE /api/admin/rules/:ruleId
GET  /api/admin/analytics/overview             // Analytics
GET  /api/admin/analytics/edits
GET  /api/admin/analytics/products
GET  /api/admin/subscription                   // Billing
POST /api/admin/subscription/upgrade
```

---

## 5. Service Layer Pattern (Đặc Biệt Quan Trọng)

### Submit service code structure:

```javascript
// orderEditService.js - Submit version
class OrderEditService {
  async processEdit(order, changes, settings) {
    // 1. Validate
    await this.editValidationService.validate(order, changes, settings);
    
    // 2. Begin edit session
    const session = await this.shopifyEditService.beginEdit(order.shopifyOrderId);
    
    // 3. Apply mutations
    for (const change of changes) {
      await this._applyChange(session, change);
    }
    
    // 4. Commit
    const result = await this.shopifyEditService.commitEdit(session.id);
    
    // 5. Save record
    await this.orderEditRepository.create({ ... });
    
    // 6. Update usage
    await this.usageService.incrementUsage(order.shopId);
    
    // 7. Send notification
    await this.notificationService.sendEditConfirmation(order, changes);
    
    return result;
  }
}
```

### MVP chỉ cần thêm vào cuối function:

```javascript
// orderEditService.js - MVP version (thêm 2 dòng)
async processEdit(order, changes, settings, upsellItems = []) {  // thêm param
  // ... existing code giữ nguyên ...
  
  // 8. [MVP] Process upsell nếu có
  if (upsellItems.length > 0) {
    await this.upsellService.processUpsell(order, upsellItems);
  }
  
  // 9. [MVP] Trigger Shopify Flow
  await this.shopifyFlowService?.triggerOrderEdited(order, changes);
  
  return result;
}
```

**Pattern này áp dụng cho tất cả services** -- Submit viết logic core, MVP thêm logic ở cuối hoặc thêm conditions, không sửa core logic.

---

## 6. Component Pattern Cho Frontend

### Submit Navigation:

```jsx
// NavigationMenu.jsx - Submit
const items = [
  { label: 'Dashboard', url: '/' },
  { label: 'Đơn hàng', url: '/orders' },
  { label: 'Cài đặt', url: '/settings' },
];
```

### MVP chỉ thêm items:

```jsx
// NavigationMenu.jsx - MVP (thêm items)
const items = [
  { label: 'Dashboard', url: '/' },
  { label: 'Đơn hàng', url: '/orders' },
  { label: 'Quy tắc sửa', url: '/rules' },        // MVP thêm
  { label: 'Phân tích', url: '/analytics' },        // MVP thêm
  { label: 'Cài đặt', url: '/settings' },
  { label: 'Gói dịch vụ', url: '/subscription' },   // MVP thêm
];
```

### Routes tương tự:

```jsx
// routes.jsx - Submit
<Route path="/" element={<DashboardPage />} />
<Route path="/orders" element={<OrdersPage />} />
<Route path="/orders/:id" element={<OrderDetailPage />} />
<Route path="/settings" element={<SettingsPage />} />
<Route path="/onboarding" element={<OnboardingPage />} />

// routes.jsx - MVP thêm
<Route path="/rules" element={<EditRulesPage />} />
<Route path="/analytics" element={<AnalyticsPage />} />
<Route path="/subscription" element={<SubscriptionPage />} />
```

---

## 7. Bảng Tóm Tắt: Submit → MVP Migration

| Thành phần | Submit | MVP Action | Effort |
|-----------|--------|------------|--------|
| **Firestore schema** | Đầy đủ | Không cần sửa | 0 |
| **Firestore indexes** | Đầy đủ | Không cần sửa | 0 |
| **OAuth/Auth** | Đầy đủ | Không cần sửa | 0 |
| **Webhook handling** | Đầy đủ | Không cần sửa | 0 |
| **Order edit engine** | Core logic | Thêm upsell param | Nhỏ |
| **Cancellation** | Basic flow | Thêm retention step | Nhỏ |
| **Address editing** | Basic | Thêm Google validation | Nhỏ |
| **Dashboard** | 4 metrics | Thêm charts | Trung bình |
| **Settings page** | Global settings | Thêm sections | Nhỏ |
| **Navigation** | 3 items | Thêm items | Rất nhỏ |
| **Routes** | 5 routes | Thêm routes | Rất nhỏ |
| **Theme Extension** | OSP widget | Thêm TYP banner | Nhỏ |
| **Storefront edit page** | Core editing | Thêm upsell section | Trung bình |
| **Billing** | Free only | Thêm billing handler + UI | Trung bình |
| **Edit rules** | Global only | Thêm per-product rules | Trung bình |
| **Analytics** | Không có | Thêm page + BigQuery | Trung bình |
| **Merchant editing** | Không có | Thêm edit modal | Trung bình |

**Tổng effort MVP (sau Submit):** ~3-4 tuần thêm features, KHÔNG CẦN refactor.

---

*Kiến trúc này đảm bảo rằng mỗi dòng code viết cho bản Submit đều sống trong bản MVP và bản Full. Không có code throwaway.*
