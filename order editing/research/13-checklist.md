# Implementation Checklist
# Avada Order Editing

Each item is scoped to a single file or small unit of work, suitable for AI-assisted implementation.

---

## Phase 1: Foundation (Week 1-2)

### 1.1 Project Scaffolding

- [ ] `package.json` -- Initialize root package with workspaces for `packages/functions`, `packages/assets`, `packages/scripttag`
- [ ] `packages/functions/package.json` -- Firebase Functions dependencies (firebase-functions, firebase-admin, @shopify/shopify-api, graphql-request)
- [ ] `packages/assets/package.json` -- React app dependencies (@shopify/polaris, @shopify/app-bridge-react, react-router-dom, react-query)
- [ ] `packages/scripttag/package.json` -- Preact scripttag dependencies (preact, preact-render-to-string)
- [ ] `firebase.json` -- Firebase project config (functions, hosting, firestore, emulators)
- [ ] `.firebaserc` -- Firebase project alias config
- [ ] `firestore.rules` -- Firestore security rules (deny all client-side, allow only server-side via admin SDK)
- [ ] `firestore.indexes.json` -- Initial compound query indexes (see architecture doc section 1)
- [ ] `shopify.app.toml` -- Shopify app config (scopes, webhooks, app proxy, extensions)
- [ ] `packages/assets/vite.config.js` -- Vite config for React app with HMR, proxy to Firebase emulators
- [ ] `packages/scripttag/vite.config.js` -- Vite config for Preact scripttag build (iife output, minified)
- [ ] `.env.example` -- Environment variable template (SHOPIFY_API_KEY, SHOPIFY_API_SECRET, FIREBASE_PROJECT_ID, etc.)

### 1.2 Authentication & Session

- [ ] `packages/functions/src/middleware/auth.js` -- Shopify session token verification middleware (verify JWT from App Bridge)
- [ ] `packages/functions/src/middleware/webhookAuth.js` -- HMAC-SHA256 webhook signature verification middleware
- [ ] `packages/functions/src/middleware/storefrontAuth.js` -- Storefront order token verification (order ID + email hash validation)
- [ ] `packages/functions/src/middleware/rateLimiter.js` -- Rate limiting middleware (per-shop and per-endpoint limits using Firestore counters)
- [ ] `packages/functions/src/helpers/shopify.js` -- Shopify API client factory (create GraphQL/REST clients from shop access token)
- [ ] `packages/functions/src/helpers/crypto.js` -- Encryption helpers for access token storage (AES-256-GCM encrypt/decrypt)
- [ ] `packages/functions/src/helpers/tokenGenerator.js` -- Generate and verify storefront order tokens (HMAC-based, time-limited)

### 1.3 App Installation & OAuth

- [ ] `packages/functions/src/handlers/authHandler.js` -- OAuth flow handler (install, callback, token exchange)
- [ ] `packages/functions/src/services/authService.js` -- OAuth business logic (validate nonce, exchange code for token, create shop record)
- [ ] `packages/functions/src/handlers/billingHandler.js` -- Shopify App Billing handler (create charge, confirm charge, check status)
- [ ] `packages/functions/src/services/billingService.js` -- Billing business logic (plan comparison, usage tracking, upgrade/downgrade)

### 1.4 Firestore Repositories

- [ ] `packages/functions/src/repositories/shopRepository.js` -- CRUD for `shops` collection (getByDomain, create, update, deactivate)
- [ ] `packages/functions/src/repositories/editSettingsRepository.js` -- CRUD for `editSettings` collection (getByShopId, createDefaults, update)
- [ ] `packages/functions/src/repositories/editRuleRepository.js` -- CRUD for `editRules` collection (listByShopId, create, update, delete, getActiveRules)
- [ ] `packages/functions/src/repositories/orderRepository.js` -- CRUD for `orders` collection (create, getByShopifyId, updateEditWindow, listByShop, search)
- [ ] `packages/functions/src/repositories/orderEditRepository.js` -- CRUD for `orderEdits` collection (create, getByOrderId, listByShop, updateStatus)
- [ ] `packages/functions/src/repositories/subscriptionRepository.js` -- CRUD for `subscriptions` collection (getByShopId, create, update, incrementUsage, resetUsage)
- [ ] `packages/functions/src/repositories/notificationRepository.js` -- CRUD for `notifications` collection (create, updateStatus, listByOrder)
- [ ] `packages/functions/src/repositories/analyticsEventRepository.js` -- CRUD for `analyticsEvents` collection (create, listByShop)
- [ ] `packages/functions/src/repositories/webhookLogRepository.js` -- Idempotency check/create for `webhookLogs` collection
- [ ] `packages/functions/src/repositories/upsellOfferRepository.js` -- CRUD for `upsellOffers` collection (listByShopId, create, update, delete, incrementStats)

### 1.5 Firestore Indexes

- [ ] `firestore-indexes/orders.json` -- Compound indexes for orders collection queries
- [ ] `firestore-indexes/orderEdits.json` -- Compound indexes for orderEdits collection queries
- [ ] `firestore-indexes/editRules.json` -- Compound indexes for editRules collection queries

### 1.6 TypeDefs & Constants

- [ ] `packages/functions/index.d.ts` -- TypeScript type definitions for all Firestore documents, API requests/responses, service interfaces
- [ ] `packages/functions/src/helpers/constants.js` -- App constants (plan limits, default settings, edit types, status enums, error codes)
- [ ] `packages/functions/src/helpers/errors.js` -- Custom error classes (AppError, ValidationError, ShopifyApiError, NotFoundError, RateLimitError)
- [ ] `packages/functions/src/presenters/responsePresenter.js` -- Standard response formatter ({success, data, error} wrapper)

### 1.7 Webhook Infrastructure

- [ ] `packages/functions/src/handlers/webhookHandler.js` -- Webhook route handler (receives all webhooks, delegates by topic)
- [ ] `packages/functions/src/services/webhookService.js` -- Webhook processing orchestrator (idempotency check, publish to Pub/Sub)
- [ ] `packages/functions/src/helpers/pubsub.js` -- Pub/Sub publisher helper (create typed messages, publish to topics)

---

## Phase 2: Core Backend (Week 3-4)

### 2.1 Order Sync & Edit Window

- [ ] `packages/functions/src/handlers/orderEventHandler.js` -- Pub/Sub subscriber for `order-events` topic (routes to appropriate service method)
- [ ] `packages/functions/src/services/orderSyncService.js` -- Sync order data from webhook payload to Firestore orders collection
- [ ] `packages/functions/src/services/editWindowService.js` -- Edit window management (open window on order create, close on fulfill, expire on timeout)
- [ ] `packages/functions/src/handlers/scheduledHandler.js` -- Scheduled function handler for `expireEditWindows` (every 5 min cron)

### 2.2 Order Editing Engine

- [ ] `packages/functions/src/services/editEligibilityService.js` -- Check if order is eligible for editing (window, fulfillment, plan limits, edit count)
- [ ] `packages/functions/src/services/editRuleEngine.js` -- Evaluate edit rules for a specific order/product (match rules by type, apply constraints)
- [ ] `packages/functions/src/services/editValidationService.js` -- Validate proposed changes (inventory check, rule compliance, plan limits)
- [ ] `packages/functions/src/services/priceDiffService.js` -- Calculate price difference for proposed edits (line item changes, tax impact, discounts)
- [ ] `packages/functions/src/services/orderEditService.js` -- Core edit processing (orchestrate: validate -> begin -> apply mutations -> commit -> save)
- [ ] `packages/functions/src/services/shopifyOrderEditService.js` -- Shopify GraphQL API wrapper for order editing (begin, setQuantity, addVariant, commit)
- [ ] `packages/functions/src/services/inventoryService.js` -- Inventory check and restock logic (query availability, track restocking)
- [ ] `packages/functions/src/services/addressEditService.js` -- Address update logic (validate, call orderUpdate mutation, save record)

### 2.3 Order Cancellation

- [ ] `packages/functions/src/services/cancellationService.js` -- Cancellation processing (eligibility check, cancel via Shopify API, restock, refund)
- [ ] `packages/functions/src/services/refundService.js` -- Refund processing (calculate amount, issue refund via Shopify, track status)

### 2.4 Storefront API Handlers

- [ ] `packages/functions/src/handlers/storefrontEditHandler.js` -- Customer-facing edit endpoints (eligibility, options, submit, confirm)
- [ ] `packages/functions/src/handlers/storefrontAddressHandler.js` -- Customer-facing address edit endpoint
- [ ] `packages/functions/src/handlers/storefrontCancelHandler.js` -- Customer-facing cancellation endpoints (init, confirm)

### 2.5 Admin API Handlers

- [ ] `packages/functions/src/handlers/adminOrderHandler.js` -- Admin order list, detail, edit begin/commit, cancel
- [ ] `packages/functions/src/handlers/adminSettingsHandler.js` -- Admin edit settings get/update
- [ ] `packages/functions/src/handlers/adminRulesHandler.js` -- Admin edit rules CRUD
- [ ] `packages/functions/src/handlers/adminSubscriptionHandler.js` -- Admin subscription view, upgrade

### 2.6 API Router

- [ ] `packages/functions/src/router.js` -- Express router mounting all handlers with middleware (auth, rate limiting, error handling)
- [ ] `packages/functions/src/index.js` -- Firebase Functions entry point (export HTTP function, Pub/Sub subscribers, scheduled functions)

### 2.7 Notification System

- [ ] `packages/functions/src/services/notificationService.js` -- Notification orchestrator (determine template, prepare data, publish to notification-events)
- [ ] `packages/functions/src/services/emailService.js` -- Email sending via SendGrid/Mailgun (template rendering, send, error handling)
- [ ] `packages/functions/src/handlers/notificationHandler.js` -- Pub/Sub subscriber for `notification-events` topic
- [ ] `packages/functions/src/helpers/emailTemplates.js` -- Email template definitions (edit confirmation, cancel confirmation, merchant notification, invoice)

### 2.8 Usage Tracking

- [ ] `packages/functions/src/services/usageService.js` -- Track edit usage per billing cycle (increment, check limit, reset monthly)
- [ ] `packages/functions/src/handlers/usageResetHandler.js` -- Scheduled function for monthly usage reset (1st of month cron)

---

## Phase 3: Frontend (Week 5-6)

### 3.1 App Shell & Navigation

- [ ] `packages/assets/src/App.jsx` -- Root app component with AppProvider, AppBridgeProvider, Routes
- [ ] `packages/assets/src/routes.jsx` -- Route definitions for all admin pages
- [ ] `packages/assets/src/components/NavigationMenu.jsx` -- Left sidebar navigation (Dashboard, Orders, Rules, Settings, Analytics, Subscription)
- [ ] `packages/assets/src/components/AppLayout.jsx` -- Shared layout wrapper (navigation + content area)

### 3.2 Dashboard Page

- [ ] `packages/assets/src/pages/DashboardPage.jsx` -- Main dashboard with metric cards, recent edits, quick actions
- [ ] `packages/assets/src/components/dashboard/MetricCards.jsx` -- KPI metric cards (total edits, cancellations, savings estimate)
- [ ] `packages/assets/src/components/dashboard/RecentEditsTable.jsx` -- Table of last 10 edits with order link, type, status
- [ ] `packages/assets/src/components/dashboard/QuickActions.jsx` -- Setup checklist cards for new installs (configure settings, activate widget)
- [ ] `packages/assets/src/hooks/useDashboard.js` -- Fetch dashboard data (metrics + recent edits in parallel)

### 3.3 Orders Page

- [ ] `packages/assets/src/pages/OrdersPage.jsx` -- Order list page with filters and pagination
- [ ] `packages/assets/src/components/orders/OrderFilters.jsx` -- Filter bar (status, edit window, search, date range)
- [ ] `packages/assets/src/components/orders/OrdersResourceList.jsx` -- Polaris ResourceList for orders with sort/filter
- [ ] `packages/assets/src/components/orders/OrderResourceItem.jsx` -- Individual order row (order number, customer, edit window badge, actions)
- [ ] `packages/assets/src/hooks/useOrders.js` -- Fetch, filter, paginate orders from admin API

### 3.4 Order Detail & Merchant Editing

- [ ] `packages/assets/src/pages/OrderDetailPage.jsx` -- Order detail page with edit history, line items, address, edit/cancel buttons
- [ ] `packages/assets/src/components/orders/OrderHeader.jsx` -- Order header with order number, status badges, edit window countdown
- [ ] `packages/assets/src/components/orders/OrderTimeline.jsx` -- Timeline of edit history events
- [ ] `packages/assets/src/components/orders/LineItemsList.jsx` -- Display current line items with images, titles, quantities, prices
- [ ] `packages/assets/src/components/orders/ShippingAddressCard.jsx` -- Display current shipping address with edit button
- [ ] `packages/assets/src/components/orders/EditOrderModal.jsx` -- Modal for merchant order editing (swap, qty, add product, remove)
- [ ] `packages/assets/src/components/orders/VariantSwapPicker.jsx` -- Product variant selector for swapping (shows available variants with stock)
- [ ] `packages/assets/src/components/orders/QuantityStepper.jsx` -- Quantity +/- stepper with min/max validation
- [ ] `packages/assets/src/components/orders/ProductSearchBar.jsx` -- Search and add new products to order (Polaris Autocomplete)
- [ ] `packages/assets/src/components/orders/PriceDiffSummary.jsx` -- Price difference breakdown (original, changes, new total)
- [ ] `packages/assets/src/components/orders/CancelOrderModal.jsx` -- Cancel confirmation modal with reason picker
- [ ] `packages/assets/src/hooks/useOrderDetail.js` -- Fetch single order with edit history
- [ ] `packages/assets/src/hooks/useOrderEdit.js` -- Merchant edit flow state management (begin, add changes, commit)

### 3.5 Settings Page

- [ ] `packages/assets/src/pages/SettingsPage.jsx` -- Settings page with tabs/sections for all config
- [ ] `packages/assets/src/components/settings/GeneralSettings.jsx` -- Time window config (type, duration), allowed edit actions toggles
- [ ] `packages/assets/src/components/settings/TimeWindowPicker.jsx` -- Time window type selector + duration input
- [ ] `packages/assets/src/components/settings/EditTypeToggles.jsx` -- Checkbox toggles for each edit type (address, swap, qty, cancel, add, remove)
- [ ] `packages/assets/src/components/settings/NotificationSettings.jsx` -- Email notification config (merchant email, toggle merchant/customer notifications)
- [ ] `packages/assets/src/components/settings/WidgetSettings.jsx` -- Widget appearance config (colors, text overrides, visibility toggles)
- [ ] `packages/assets/src/components/settings/WidgetPreview.jsx` -- Live preview of the storefront widget with current settings
- [ ] `packages/assets/src/hooks/useEditSettings.js` -- Get/update edit settings via admin API

### 3.6 Edit Rules Page

- [ ] `packages/assets/src/pages/EditRulesPage.jsx` -- Edit rules list page with create/edit/delete
- [ ] `packages/assets/src/components/rules/RulesTable.jsx` -- Table of all rules with type, target, status, actions
- [ ] `packages/assets/src/components/rules/CreateRuleModal.jsx` -- Modal to create new rule (select type, target, configure options)
- [ ] `packages/assets/src/components/rules/EditRuleModal.jsx` -- Modal to edit existing rule
- [ ] `packages/assets/src/components/rules/ProductPicker.jsx` -- Shopify product/collection picker (App Bridge ResourcePicker)
- [ ] `packages/assets/src/hooks/useEditRules.js` -- CRUD edit rules via admin API

### 3.7 Subscription Page

- [ ] `packages/assets/src/pages/SubscriptionPage.jsx` -- Current plan display, usage meter, plan comparison, upgrade CTA
- [ ] `packages/assets/src/components/subscription/CurrentPlanCard.jsx` -- Current plan name, usage bar (X/Y edits used), billing cycle
- [ ] `packages/assets/src/components/subscription/PlanComparison.jsx` -- Feature comparison grid across all plans
- [ ] `packages/assets/src/hooks/useSubscription.js` -- Fetch current subscription and initiate upgrade

### 3.8 Onboarding

- [ ] `packages/assets/src/pages/OnboardingPage.jsx` -- First-run setup wizard (step 1: welcome, step 2: configure, step 3: activate widget, step 4: done)
- [ ] `packages/assets/src/components/onboarding/WelcomeStep.jsx` -- Welcome message + value proposition
- [ ] `packages/assets/src/components/onboarding/ConfigureStep.jsx` -- Quick settings form (time window, edit types)
- [ ] `packages/assets/src/components/onboarding/ActivateWidgetStep.jsx` -- Instructions to enable theme app extension
- [ ] `packages/assets/src/components/onboarding/CompleteStep.jsx` -- Success state + next steps

### 3.9 Theme Extension (Storefront Widgets)

- [ ] `extensions/theme-extension/blocks/order-edit-widget.liquid` -- Order Status Page widget with countdown, edit button, cancel link
- [ ] `extensions/theme-extension/blocks/thank-you-banner.liquid` -- Thank-You Page banner with edit CTA
- [ ] `extensions/theme-extension/assets/order-edit-widget.js` -- Widget client-side JS (countdown timer, API calls, state management)
- [ ] `extensions/theme-extension/assets/order-edit-widget.css` -- Widget styles (responsive, customizable via CSS vars)
- [ ] `extensions/theme-extension/assets/thank-you-banner.js` -- Banner client-side JS
- [ ] `extensions/theme-extension/assets/thank-you-banner.css` -- Banner styles
- [ ] `extensions/theme-extension/snippets/edit-countdown.liquid` -- Reusable countdown component
- [ ] `extensions/theme-extension/locales/en.default.json` -- English translations for widget text

### 3.10 Customer Edit Page (Scripttag/App Proxy)

- [ ] `packages/scripttag/src/index.js` -- Preact app entry point, mount to DOM
- [ ] `packages/scripttag/src/components/EditOrderPage.jsx` -- Full edit page layout (header, line items, address, confirmation)
- [ ] `packages/scripttag/src/components/LineItemEditor.jsx` -- Editable line item (variant dropdown, quantity stepper, remove button)
- [ ] `packages/scripttag/src/components/VariantSelector.jsx` -- Dropdown to pick new variant with price/stock info
- [ ] `packages/scripttag/src/components/AddressForm.jsx` -- Address edit form with country/province dropdowns
- [ ] `packages/scripttag/src/components/EditSummary.jsx` -- Change summary with price diff before confirmation
- [ ] `packages/scripttag/src/components/ConfirmationScreen.jsx` -- Post-edit confirmation screen (success message, updated order details)
- [ ] `packages/scripttag/src/components/CancellationFlow.jsx` -- Cancel order flow (reason picker, confirmation)
- [ ] `packages/scripttag/src/components/CountdownTimer.jsx` -- Edit window countdown timer
- [ ] `packages/scripttag/src/components/ErrorState.jsx` -- Error state component (not eligible, expired, server error)
- [ ] `packages/scripttag/src/utils/api.js` -- API client for storefront endpoints (fetch wrapper with token auth)
- [ ] `packages/scripttag/src/utils/orderToken.js` -- Token generation/parsing for storefront auth
- [ ] `packages/scripttag/src/styles/main.css` -- Main stylesheet (responsive, CSS custom properties for theming)

### 3.11 App Proxy Handler

- [ ] `packages/functions/src/handlers/appProxyHandler.js` -- App proxy route handler (serve customer edit page, verify proxy signature)

---

## Phase 4: Polish & Launch (Week 7-8)

### 4.1 Analytics Backend

- [ ] `packages/functions/src/services/analyticsService.js` -- Analytics data aggregation (query BigQuery for dashboard metrics)
- [ ] `packages/functions/src/handlers/analyticsHandler.js` -- Pub/Sub subscriber for `analytics-events` topic (write to BigQuery)
- [ ] `packages/functions/src/handlers/adminAnalyticsHandler.js` -- Admin API handler for analytics endpoints (overview, edits, products, export)
- [ ] `packages/functions/src/helpers/bigquery.js` -- BigQuery client wrapper (query, streaming insert, table management)
- [ ] `packages/functions/src/handlers/analyticsSyncHandler.js` -- Scheduled function for daily Firestore-to-BigQuery sync

### 4.2 Analytics Frontend

- [ ] `packages/assets/src/pages/AnalyticsPage.jsx` -- Analytics dashboard page with date range picker and charts
- [ ] `packages/assets/src/components/analytics/OverviewMetrics.jsx` -- Summary metric cards (total edits, retention rate, upsell revenue, savings)
- [ ] `packages/assets/src/components/analytics/EditsChart.jsx` -- Line/bar chart of edits over time (daily/weekly)
- [ ] `packages/assets/src/components/analytics/EditTypeBreakdown.jsx` -- Pie/donut chart of edits by type
- [ ] `packages/assets/src/components/analytics/TopEditedProducts.jsx` -- Table of most-edited products
- [ ] `packages/assets/src/components/analytics/ExportButton.jsx` -- CSV export trigger
- [ ] `packages/assets/src/hooks/useAnalytics.js` -- Fetch analytics data with date range parameters

### 4.3 P1: Cancellation Retention Flow

- [ ] `packages/functions/src/services/retentionService.js` -- Retention logic (match reason to offers, apply discount/swap, track results)
- [ ] `packages/functions/src/handlers/storefrontRetentionHandler.js` -- Storefront API for retention (get offers by reason, apply retention offer)
- [ ] `packages/scripttag/src/components/RetentionFlow.jsx` -- Customer-facing retention UI (reason picker, offer cards, accept/decline)
- [ ] `packages/assets/src/components/settings/RetentionSettings.jsx` -- Merchant config for retention offers (reason-to-offer mapping)

### 4.4 P1: Post-Purchase Upsell

- [ ] `packages/functions/src/services/upsellService.js` -- Upsell recommendation engine (match rules, filter in-stock, rank by priority)
- [ ] `packages/functions/src/handlers/adminUpsellHandler.js` -- Admin CRUD for upsell offers
- [ ] `packages/scripttag/src/components/UpsellSection.jsx` -- Customer-facing upsell display (product cards with add-to-order buttons)
- [ ] `packages/assets/src/pages/UpsellOffersPage.jsx` -- Admin upsell offer management page
- [ ] `packages/assets/src/components/upsell/CreateOfferModal.jsx` -- Create new upsell offer form
- [ ] `packages/assets/src/components/upsell/OfferPerformance.jsx` -- Upsell offer performance metrics (impressions, conversions, revenue)
- [ ] `packages/assets/src/hooks/useUpsellOffers.js` -- CRUD upsell offers via admin API

### 4.5 P1: Store Credit Refund

- [ ] `packages/functions/src/services/storeCreditService.js` -- Store credit logic (create Shopify gift card, calculate bonus, email code)
- [ ] `packages/scripttag/src/components/RefundChoicePicker.jsx` -- Customer UI to choose between refund and store credit

### 4.6 P1: Google Address Validation

- [ ] `packages/functions/src/services/addressValidationService.js` -- Google Address Validation API integration (validate, suggest, autocomplete)
- [ ] `packages/functions/src/helpers/googleMaps.js` -- Google Maps API client wrapper
- [ ] `packages/scripttag/src/components/AddressAutocomplete.jsx` -- Autocomplete input component using Google Places
- [ ] `packages/scripttag/src/components/AddressSuggestion.jsx` -- "Did you mean?" suggestion component

### 4.7 P1: Shopify Flow Integration

- [ ] `packages/functions/src/services/shopifyFlowService.js` -- Shopify Flow trigger dispatcher (send trigger events for edit/cancel)
- [ ] `shopify.app.toml` -- Add Flow trigger definitions (order_edited, order_cancelled with payload schema)

### 4.8 P1: Multi-Language Support

- [ ] `extensions/theme-extension/locales/fr.json` -- French translations
- [ ] `extensions/theme-extension/locales/de.json` -- German translations
- [ ] `extensions/theme-extension/locales/es.json` -- Spanish translations
- [ ] `extensions/theme-extension/locales/pt-BR.json` -- Portuguese (Brazil) translations
- [ ] `extensions/theme-extension/locales/ja.json` -- Japanese translations
- [ ] `extensions/theme-extension/locales/ko.json` -- Korean translations
- [ ] `extensions/theme-extension/locales/zh-CN.json` -- Chinese Simplified translations
- [ ] `extensions/theme-extension/locales/zh-TW.json` -- Chinese Traditional translations
- [ ] `extensions/theme-extension/locales/it.json` -- Italian translations
- [ ] `packages/scripttag/src/utils/i18n.js` -- i18n utility for storefront edit page (locale detection, string lookup, fallback)
- [ ] `packages/scripttag/src/locales/en.json` -- English strings for edit page
- [ ] `packages/scripttag/src/locales/fr.json` -- French strings for edit page (repeat for each language)

### 4.9 Error Handling & Monitoring

- [ ] `packages/functions/src/middleware/errorHandler.js` -- Global error handling middleware (catch, log, format response)
- [ ] `packages/functions/src/helpers/logger.js` -- Structured logging helper (Cloud Logging compatible, correlation IDs)
- [ ] `packages/functions/src/helpers/monitoring.js` -- Custom Cloud Monitoring metrics (edit latency, error rate, usage)

### 4.10 Testing

- [ ] `packages/functions/test/services/orderEditService.test.js` -- Unit tests for order edit service (happy paths, edge cases, error handling)
- [ ] `packages/functions/test/services/editEligibilityService.test.js` -- Unit tests for edit eligibility checks
- [ ] `packages/functions/test/services/cancellationService.test.js` -- Unit tests for cancellation flow
- [ ] `packages/functions/test/services/editRuleEngine.test.js` -- Unit tests for rule evaluation
- [ ] `packages/functions/test/services/priceDiffService.test.js` -- Unit tests for price difference calculation
- [ ] `packages/functions/test/handlers/webhookHandler.test.js` -- Unit tests for webhook HMAC verification and routing
- [ ] `packages/functions/test/middleware/auth.test.js` -- Unit tests for auth middleware (valid token, expired, missing)
- [ ] `packages/functions/test/repositories/orderRepository.test.js` -- Integration tests for order repository with Firestore emulator
- [ ] `packages/functions/test/integration/editFlow.test.js` -- Integration test for full edit flow (begin -> validate -> commit)
- [ ] `packages/functions/test/integration/cancelFlow.test.js` -- Integration test for full cancellation flow

### 4.11 Deployment & App Store

- [ ] `.github/workflows/deploy.yml` -- CI/CD pipeline (lint, test, build, deploy to Firebase)
- [ ] `.github/workflows/test.yml` -- PR test pipeline (lint, unit tests, integration tests with emulators)
- [ ] `packages/functions/.eslintrc.js` -- ESLint config for backend (Avada standards)
- [ ] `packages/assets/.eslintrc.js` -- ESLint config for frontend (React + Polaris)

---

## File Count Summary

| Phase | Files | Description |
|-------|-------|-------------|
| Phase 1: Foundation | ~35 | Project setup, auth, repositories, types |
| Phase 2: Core Backend | ~25 | Edit engine, webhooks, APIs, notifications |
| Phase 3: Frontend | ~55 | Admin pages, storefront widgets, customer edit page |
| Phase 4: Polish | ~40 | Analytics, P1 features, testing, deployment |
| **Total** | **~155** | |

---

## Dependency Order

Implementation should follow this order within each phase:

### Phase 1
1. Project scaffolding (1.1)
2. TypeDefs & Constants (1.6)
3. Crypto & helpers (1.2 - crypto, tokenGenerator, shopify)
4. Repositories (1.4)
5. Auth middleware (1.2 - auth, webhookAuth, storefrontAuth)
6. OAuth & Billing (1.3)
7. Webhook infrastructure (1.7)
8. Firestore indexes (1.5)

### Phase 2
1. Order sync & edit window (2.1)
2. Edit eligibility & rule engine (2.2 - eligibility, rules, validation)
3. Shopify order edit wrapper (2.2 - shopifyOrderEditService)
4. Core edit service (2.2 - orderEditService, priceDiffService, addressEditService, inventoryService)
5. Cancellation & refund (2.3)
6. API handlers - storefront (2.4)
7. API handlers - admin (2.5)
8. Router & entry point (2.6)
9. Notifications (2.7)
10. Usage tracking (2.8)

### Phase 3
1. App shell & navigation (3.1)
2. Hooks (3.2-3.8 hooks first)
3. Dashboard page (3.2)
4. Settings page (3.5)
5. Orders page (3.3)
6. Order detail & merchant editing (3.4)
7. Edit rules page (3.6)
8. Subscription page (3.7)
9. Onboarding (3.8)
10. Theme extension widgets (3.9)
11. Customer edit page (3.10)
12. App proxy handler (3.11)

### Phase 4
1. Analytics backend (4.1)
2. Analytics frontend (4.2)
3. P1 features in parallel (4.3-4.8)
4. Error handling & monitoring (4.9)
5. Testing (4.10)
6. Deployment (4.11)

---

*End of Implementation Checklist*
