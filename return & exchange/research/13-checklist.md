# 13 - Implementation Checklist: Avada Returns & Exchanges

## Overview

This checklist provides granular, file-level implementation tasks ordered by dependency. Each task specifies the file path, what to implement, and dependencies. Tasks are grouped by phase aligned with the PRD priorities (file 02) and architecture (file 12).

**Project structure reference (from CLAUDE.md):**
```
packages/functions/src/    -> handlers/, services/, repositories/, helpers/, presenters/
packages/assets/src/       -> components/, pages/, hooks/
extensions/theme-extension/ -> blocks/, assets/, locales/, snippets/
```

**Notation:**
- `[Blocked by: X]` = Cannot start until task X is complete
- `[Parallel]` = Can be worked on simultaneously with adjacent tasks
- Priority tags match file 02 feature matrix

---

## Phase 1: MVP (P0) -- Weeks 1-12

### 1.1 Foundation & Infrastructure (Week 1-2)

#### Backend Foundation

- [ ] **Task 1.1.1** -- Firestore schema setup
  - **Path:** `firestore.rules`, `firestore-indexes/indexes.json`
  - **Implement:** Security rules scoping all reads/writes by `shopId`. Define all composite indexes from file 12 section 2 (returnRequests: shopId+status+requestedAt, shopId+orderId, shopId+customerId+requestedAt; returnItems: shopId+returnId, shopId+productId; etc.)
  - **Dependencies:** None (start here)

- [ ] **Task 1.1.2** -- Core type definitions
  - **Path:** `packages/functions/index.d.ts`
  - **Implement:** TypeScript interfaces for all Firestore document types: Shop, ReturnPolicy, ReturnRequest, ReturnItem, Exchange, Refund, StoreCredit, ShippingLabel, ReturnReason, Notification, AuditLog, NotificationTemplate, AutomationRule, BlocklistEntry. Include all fields from file 12 section 2.
  - **Dependencies:** None [Parallel with 1.1.1]

- [ ] **Task 1.1.3** -- Base repository pattern
  - **Path:** `packages/functions/src/repositories/baseRepository.js`
  - **Implement:** Base Firestore repository with standard CRUD operations: `getById(shopId, docId)`, `create(shopId, data)`, `update(shopId, docId, data)`, `delete(shopId, docId)`, `query(shopId, filters, pagination)`. All operations scoped by `shopId` per multi-tenant requirement.
  - **Dependencies:** None [Parallel with 1.1.1]

- [ ] **Task 1.1.4** -- Shop repository
  - **Path:** `packages/functions/src/repositories/shopRepository.js`
  - **Implement:** CRUD for `shops` collection. Methods: `getByShopId`, `create`, `updateSettings`, `updateBranding`, `updatePlan`, `incrementReturnCount`, `resetMonthlyReturnCount`, `deactivate`.
  - **Dependencies:** [Blocked by: 1.1.3]

- [ ] **Task 1.1.5** -- Return request repository
  - **Path:** `packages/functions/src/repositories/returnRequestRepository.js`
  - **Implement:** CRUD for `returnRequests` collection. Methods: `create`, `getById`, `updateStatus`, `list(shopId, filters, pagination)`, `getByOrderId`, `getByCustomerId`, `bulkUpdateStatus`, `countByStatus`.
  - **Dependencies:** [Blocked by: 1.1.3]

- [ ] **Task 1.1.6** -- Return item repository
  - **Path:** `packages/functions/src/repositories/returnItemRepository.js`
  - **Implement:** CRUD for `returnItems` collection. Methods: `create`, `getByReturnId`, `updateCondition`, `getByProductId`.
  - **Dependencies:** [Blocked by: 1.1.3]

- [ ] **Task 1.1.7** -- Remaining repositories (batch)
  - **Paths:**
    - `packages/functions/src/repositories/returnPolicyRepository.js`
    - `packages/functions/src/repositories/exchangeRepository.js`
    - `packages/functions/src/repositories/refundRepository.js`
    - `packages/functions/src/repositories/storeCreditRepository.js`
    - `packages/functions/src/repositories/shippingLabelRepository.js`
    - `packages/functions/src/repositories/returnReasonRepository.js`
    - `packages/functions/src/repositories/notificationRepository.js`
    - `packages/functions/src/repositories/auditLogRepository.js`
    - `packages/functions/src/repositories/notificationTemplateRepository.js`
    - `packages/functions/src/repositories/blocklistRepository.js`
  - **Implement:** Standard CRUD for each collection per file 12 schema. One collection per repository per CLAUDE.md rules.
  - **Dependencies:** [Blocked by: 1.1.3]

- [ ] **Task 1.1.8** -- Helper utilities
  - **Path:** `packages/functions/src/helpers/`
  - **Implement:**
    - `packages/functions/src/helpers/shopifyAuth.js` -- Session token verification, HMAC webhook validation
    - `packages/functions/src/helpers/planGate.js` -- Feature access check by plan (free/starter/pro/enterprise) per file 02/06 pricing tiers
    - `packages/functions/src/helpers/rateLimiter.js` -- Rate limiting for portal API endpoints (Redis-based)
    - `packages/functions/src/helpers/validators.js` -- Input validation for API requests (email format, order number format, file types, file sizes)
    - `packages/functions/src/helpers/errorHandler.js` -- Standardized error response format `{success: false, error: {code, message}}`
  - **Dependencies:** None [Parallel]

- [ ] **Task 1.1.9** -- Response presenters
  - **Path:** `packages/functions/src/presenters/`
  - **Implement:**
    - `packages/functions/src/presenters/returnPresenter.js` -- Format return data for API responses (list view, detail view, portal view)
    - `packages/functions/src/presenters/analyticsPresenter.js` -- Format analytics data for dashboard
  - **Dependencies:** [Blocked by: 1.1.2]

#### Frontend Foundation

- [ ] **Task 1.1.10** -- App shell and routing
  - **Path:** `packages/assets/src/App.jsx`
  - **Implement:** AppBridgeProvider, PolarisProvider, NavigationMenu (Dashboard, Returns, Analytics, Settings), React Router setup with routes per file 12 section 7 component tree.
  - **Dependencies:** None (frontend can start in parallel)

- [ ] **Task 1.1.11** -- Shared hooks
  - **Path:** `packages/assets/src/hooks/`
  - **Implement:**
    - `packages/assets/src/hooks/useShopSettings.js` -- Fetch and cache shop settings via Admin API
    - `packages/assets/src/hooks/usePlanGate.js` -- Check feature availability; return `{allowed, planRequired}` for UI gating
    - `packages/assets/src/hooks/useApi.js` -- Base API hook with error handling, loading states
  - **Dependencies:** [Blocked by: 1.1.10]

#### Webhook Infrastructure

- [ ] **Task 1.1.12** -- Webhook handler and Pub/Sub setup
  - **Path:** `packages/functions/src/handlers/webhookHandler.js`
  - **Implement:** Express routes for all 9 webhook topics from file 12 section 5. HMAC verification. Publish to Pub/Sub topics. Return 200 OK within 1 second. Topics: `return.order_created`, `return.order_updated`, `return.request_created`, `return.approved`, `return.completed`, `exchange.created`, `refund.processed`, `analytics.event`.
  - **Dependencies:** [Blocked by: 1.1.8 (shopifyAuth)]

---

### 1.2 Core Return Flow (Week 3-5)

#### Policy Engine

- [ ] **Task 1.2.1** -- Policy service
  - **Path:** `packages/functions/src/services/policyService.js`
  - **Implement:** `checkEligibility(shopId, orderId, lineItems)` -- evaluate return window, non-returnable items, per-product rules, policy priority (product > tag > collection > default per file 12 returnPolicies schema). `getApplicablePolicy(shopId, productId, tags, collectionIds)`. `importFromShopify(shopId)` -- read Shopify store policies and create defaults.
  - **Dependencies:** [Blocked by: 1.1.7 (returnPolicyRepository), 1.1.4 (shopRepository)]

- [ ] **Task 1.2.2** -- Auto-approve service
  - **Path:** `packages/functions/src/services/autoApproveService.js`
  - **Implement:** Evaluate auto-approve rules from file 08 state machine: within window, item is returnable, order value within threshold, customer not blocklisted, no fraud flags. Return `{approved: boolean, reason: string}`. If approved, create audit log entry "Auto-approved by system".
  - **Dependencies:** [Blocked by: 1.2.1, 1.1.7 (blocklistRepository)]

#### Return Request Processing

- [ ] **Task 1.2.3** -- Return service
  - **Path:** `packages/functions/src/services/returnService.js`
  - **Implement:** `createReturn(shopId, returnData)` -- validate items, check eligibility via policyService, check plan return limit, calculate totals, create returnRequest + returnItems documents, run autoApproveService, publish `return.request_created` to Pub/Sub, create audit log. `approveReturn(shopId, returnId, resolution)`. `rejectReturn(shopId, returnId, reason)`. `requestMoreInfo(shopId, returnId, message)`. `markReceived(shopId, returnId, condition)`. `getReturnDetail(shopId, returnId)` -- aggregate return + items + exchange + refund + labels + timeline.
  - **Dependencies:** [Blocked by: 1.2.1, 1.2.2, 1.1.5, 1.1.6]

- [ ] **Task 1.2.4** -- Portal API handler
  - **Path:** `packages/functions/src/handlers/portalHandler.js`
  - **Implement:** REST endpoints from file 12 section 4.1: `POST /api/portal/lookup`, `POST /api/portal/returns`, `GET /api/portal/returns/:returnId/status`, `POST /api/portal/returns/:returnId/photos`. Rate limiting via rateLimiter helper. Input validation. Photo upload to Cloud Storage (max 5 files, 10MB each, image types only).
  - **Dependencies:** [Blocked by: 1.2.3, 1.1.8]

- [ ] **Task 1.2.5** -- Admin API handler (returns)
  - **Path:** `packages/functions/src/handlers/adminReturnHandler.js`
  - **Implement:** REST endpoints from file 12 section 4.2: GET list (paginated/filtered), GET detail, PUT approve, PUT reject, PUT request-info, POST refund, POST exchange, POST label, PUT receive, POST notes, POST bulk/approve, POST bulk/labels, GET export. Session token auth via middleware.
  - **Dependencies:** [Blocked by: 1.2.3, 1.1.8]

#### Customer Portal (Theme Extension)

- [ ] **Task 1.2.6** -- Return portal Liquid block
  - **Path:** `extensions/theme-extension/blocks/return-portal.liquid`
  - **Implement:** Main portal page layout. Order lookup form (order # + email). Renders container for JavaScript-driven return flow. Custom branding variables (logo, colors from shop settings). Schema settings for block configuration in theme editor.
  - **Dependencies:** None [Parallel with backend]

- [ ] **Task 1.2.7** -- Portal JavaScript
  - **Path:** `extensions/theme-extension/assets/return-portal.js`
  - **Implement:** Order lookup API call, display eligible items, return reason selection with sub-reasons, photo upload UI (drag-drop + camera on mobile), resolution selection (refund/store credit/exchange with bonus display), exchange variant selector with inventory check, shipping method selection, review summary, form submission, confirmation page with return ID and tracking link. All per file 08 Customer Return Portal Flow diagram.
  - **Dependencies:** [Blocked by: 1.2.4, 1.2.6]

- [ ] **Task 1.2.8** -- Portal CSS
  - **Path:** `extensions/theme-extension/assets/return-portal.css`
  - **Implement:** Responsive portal styles. Custom property support for branding (--avada-primary-color, --avada-font). Mobile-first responsive layout. Photo upload drag-drop zone. Status badge styles. Step progress indicator.
  - **Dependencies:** None [Parallel]

- [ ] **Task 1.2.9** -- Portal locales (English default + 4 languages)
  - **Paths:**
    - `extensions/theme-extension/locales/en.default.json`
    - `extensions/theme-extension/locales/fr.json`
    - `extensions/theme-extension/locales/de.json`
    - `extensions/theme-extension/locales/es.json`
    - `extensions/theme-extension/locales/pt-BR.json`
  - **Implement:** All portal strings: button labels, form fields, error messages, status labels, confirmation text. 5 languages for free plan per file 02.
  - **Dependencies:** None [Parallel]

---

### 1.3 Refunds & Store Credit (Week 5-6)

- [ ] **Task 1.3.1** -- Refund service
  - **Path:** `packages/functions/src/services/refundService.js`
  - **Implement:** `processRefund(shopId, returnId, type, amount)` -- create Shopify refund via Admin API (GraphQL mutation `refundCreate`), handle partial refunds with restocking fee calculation, create refund document in Firestore, update return status to "completed", publish `refund.processed` event, create audit log. Error handling: retry on Shopify API timeout, handle expired payment methods.
  - **Dependencies:** [Blocked by: 1.2.3, 1.1.7 (refundRepository)]

- [ ] **Task 1.3.2** -- Store credit service
  - **Path:** `packages/functions/src/services/storeCreditService.js`
  - **Implement:** `issueStoreCredit(shopId, returnId, customerId, amount, source)` -- create Shopify gift card via Admin API (GraphQL mutation `giftCardCreate`), apply exchange bonus if applicable, create storeCredit document, send notification with gift card code, create audit log. Handle bonus types: fixed amount or percentage per shop settings.
  - **Dependencies:** [Blocked by: 1.3.1]

---

### 1.4 Exchange Flow (Week 6-8)

- [ ] **Task 1.4.1** -- Exchange service (variant exchange)
  - **Path:** `packages/functions/src/services/exchangeService.js`
  - **Implement:** `createVariantExchange(shopId, returnId, originalVariantId, newVariantId)` -- check inventory via Shopify Inventory API, reserve inventory (set reservedUntil = now + 7 days), calculate price difference, create exchange document, create Shopify draft order for exchange item, handle upsell (charge customer) and downsell (issue store credit), publish `exchange.created` event, create audit log. `cancelExchange(shopId, exchangeId)` -- release inventory reservation. `completeExchange(shopId, exchangeId)` -- finalize order.
  - **Dependencies:** [Blocked by: 1.2.3, 1.3.2, 1.1.7 (exchangeRepository)]

- [ ] **Task 1.4.2** -- Exchange variant selector component
  - **Path:** `extensions/theme-extension/snippets/exchange-selector.liquid`
  - **Implement:** Variant grid showing available sizes/colors with stock status. Price difference display. Out-of-stock indicator with "Notify Me" option. Integrate with portal JavaScript to call exchange API.
  - **Dependencies:** [Blocked by: 1.4.1, 1.2.7]

---

### 1.5 Notifications (Week 7-8)

- [ ] **Task 1.5.1** -- Notification service
  - **Path:** `packages/functions/src/services/notificationService.js`
  - **Implement:** `sendNotification(shopId, returnId, event, recipient)` -- load template from notificationTemplates collection, render variables (customerName, orderName, returnId, trackingUrl, refundAmount), send via SendGrid (email) or Twilio (SMS, P1), create notification document, handle delivery failures. `getDefaultTemplates()` -- seed default templates on install for all events from file 12 notifications schema.
  - **Dependencies:** [Blocked by: 1.1.7 (notificationRepository, notificationTemplateRepository)]

- [ ] **Task 1.5.2** -- Notification background worker
  - **Path:** `packages/functions/src/handlers/notificationWorker.js`
  - **Implement:** Pub/Sub subscriber for `return.request_created`, `return.approved`, `return.completed`, `exchange.created`, `refund.processed`. For each event, determine which notifications to send (customer email, merchant email if configured) and call notificationService. Runs async after webhook/API processing.
  - **Dependencies:** [Blocked by: 1.5.1, 1.1.12]

---

### 1.6 Shipping Labels (Week 8-9)

- [ ] **Task 1.6.1** -- Shipping service
  - **Path:** `packages/functions/src/services/shippingService.js`
  - **Implement:** `generateLabel(shopId, returnId, carrier)` -- call EasyPost API to create shipment and purchase label, store label PDF in Cloud Storage, create shippingLabel document with tracking number, publish notification event. `getTrackingStatus(trackingNumber)` -- poll carrier tracking API. `generateQRCode(shopId, returnId)` -- generate QR code image for box-free returns (P1). `bulkGenerateLabels(shopId, returnIds, carrier)` -- batch label generation.
  - **Dependencies:** [Blocked by: 1.2.3, 1.1.7 (shippingLabelRepository)]

- [ ] **Task 1.6.2** -- Return status tracker (theme extension)
  - **Path:** `extensions/theme-extension/blocks/return-status-tracker.liquid`, `extensions/theme-extension/assets/return-tracker.js`
  - **Implement:** Status page block showing return progress: Submitted > Approved > Shipped > Received > Resolved. Tracking information from carrier. Auto-refresh every 60 seconds. Accessible via link in notification emails (no auth required, secured by return token).
  - **Dependencies:** [Blocked by: 1.6.1, 1.2.4]

---

### 1.7 Analytics Dashboard (Week 9-10)

- [ ] **Task 1.7.1** -- Analytics service
  - **Path:** `packages/functions/src/services/analyticsService.js`
  - **Implement:** `streamEvent(eventData)` -- stream return events to BigQuery `return_events` table. `getOverviewMetrics(shopId, dateRange)` -- query BigQuery for dashboard metrics (total returns, return rate, avg resolution time, revenue retained). `getReasonBreakdown(shopId, dateRange)`. `getResolutionDistribution(shopId, dateRange)`. `getTrends(shopId, dateRange)`.
  - **Dependencies:** [Blocked by: 1.1.12 (Pub/Sub)]

- [ ] **Task 1.7.2** -- BigQuery table setup
  - **Path:** `packages/functions/src/helpers/bigquerySetup.js` (or migration script)
  - **Implement:** Create BigQuery dataset and tables: `return_events` (partitioned by event_date, clustered by shop_id + event_type), `return_items` (partitioned by event_date, clustered by shop_id + product_id), `financial_summary` (partitioned by period_month, clustered by shop_id), `product_return_rates` (partitioned by period_month, clustered by shop_id + product_id). Per file 12 section 3.
  - **Dependencies:** None [Parallel]

- [ ] **Task 1.7.3** -- Analytics background worker
  - **Path:** `packages/functions/src/handlers/analyticsWorker.js`
  - **Implement:** Pub/Sub subscriber for `analytics.event`. Stream events to BigQuery. Scheduled Cloud Function (daily) to aggregate `financial_summary` and `product_return_rates` tables.
  - **Dependencies:** [Blocked by: 1.7.1, 1.7.2]

- [ ] **Task 1.7.4** -- Analytics dashboard page
  - **Path:** `packages/assets/src/pages/AnalyticsPage.jsx`
  - **Implement:** Components per file 12 component tree: DateRangePicker, OverviewMetrics (KPI cards), ReturnReasonsChart (Polaris bar chart), ResolutionPieChart, TrendLineChart (returns over time). Uses `useAnalytics` hook to fetch data from Analytics API.
  - **Dependencies:** [Blocked by: 1.7.1, 1.1.11]

- [ ] **Task 1.7.5** -- Analytics API handler
  - **Path:** `packages/functions/src/handlers/analyticsHandler.js`
  - **Implement:** REST endpoints from file 12 section 4.4: GET overview, GET reasons, GET resolutions, GET trends. Date range filtering. Plan-aware gating for product-level analytics (Pro+).
  - **Dependencies:** [Blocked by: 1.7.1, 1.1.8]

---

### 1.8 Admin Dashboard & UI (Week 9-11)

- [ ] **Task 1.8.1** -- Dashboard page
  - **Path:** `packages/assets/src/pages/DashboardPage.jsx`
  - **Implement:** MetricsCards (open returns, pending review, revenue retained, exchange rate), RecentReturnsTable (last 10), SetupBanner (if wizard incomplete), PlanUsageBanner (return count vs limit). Per file 12 component tree.
  - **Dependencies:** [Blocked by: 1.1.11, 1.2.5]

- [ ] **Task 1.8.2** -- Return list page
  - **Path:** `packages/assets/src/pages/ReturnListPage.jsx`
  - **Implement:** Components: ReturnFilters (status, date range, customer, product), ReturnSearchBar, BulkActionBar (approve, labels, export), ReturnDataTable (Polaris IndexTable with selection), Pagination. Uses `useReturnList` hook.
  - **Dependencies:** [Blocked by: 1.1.11, 1.2.5]

- [ ] **Task 1.8.3** -- Return list hook
  - **Path:** `packages/assets/src/hooks/useReturnList.js`
  - **Implement:** Paginated fetch from `/api/admin/returns` with filter/sort state management. Debounced search. Bulk selection state. Export trigger.
  - **Dependencies:** [Blocked by: 1.1.11]

- [ ] **Task 1.8.4** -- Return detail page
  - **Path:** `packages/assets/src/pages/ReturnDetailPage.jsx`
  - **Implement:** Components per file 12: ReturnHeader (ID, status badge, actions), OrderInfoCard, ReturnItemsCard (with photo gallery), ExchangeInfoCard, RefundInfoCard, ShippingInfoCard, ActivityTimeline, ActionButtons (approve, reject, refund, exchange, label, receive), AddNoteForm, FraudAlertBanner. Uses `useReturnDetail` hook.
  - **Dependencies:** [Blocked by: 1.1.11, 1.2.5]

- [ ] **Task 1.8.5** -- Return detail hook
  - **Path:** `packages/assets/src/hooks/useReturnDetail.js`
  - **Implement:** Fetch single return with all related data (items, exchange, refund, labels, audit log). Action handlers for approve, reject, refund, exchange, label, receive, note.
  - **Dependencies:** [Blocked by: 1.1.11]

- [ ] **Task 1.8.6** -- Shared UI components
  - **Paths:**
    - `packages/assets/src/components/StatusBadge.jsx` -- Return status badge with color coding
    - `packages/assets/src/components/ActivityTimeline.jsx` -- Chronological event display
    - `packages/assets/src/components/PhotoGallery.jsx` -- Return photo viewer with zoom
    - `packages/assets/src/components/ConfirmationModal.jsx` -- Destructive action confirmation
    - `packages/assets/src/components/PlanUpgradeModal.jsx` -- Feature gating upgrade prompt
    - `packages/assets/src/components/EmptyState.jsx` -- Friendly empty states for all pages
  - **Implement:** Reusable Polaris-based components used across multiple pages.
  - **Dependencies:** None [Parallel]

---

### 1.9 Settings & Configuration (Week 10-11)

- [ ] **Task 1.9.1** -- Settings API handler
  - **Path:** `packages/functions/src/handlers/settingsHandler.js`
  - **Implement:** All settings REST endpoints from file 12 section 4.3: GET/PUT settings, CRUD for policies, reasons, templates. Session token auth.
  - **Dependencies:** [Blocked by: 1.1.4, 1.1.7, 1.1.8]

- [ ] **Task 1.9.2** -- Settings page
  - **Path:** `packages/assets/src/pages/SettingsPage.jsx`
  - **Implement:** Tab-based settings layout per file 12 component tree: ReturnPoliciesTab, PortalCustomizationTab, ShippingConfigTab, NotificationsTab, ReturnReasonsTab, LanguagesTab, BillingTab. Each tab as lazy-loaded component.
  - **Dependencies:** [Blocked by: 1.9.1, 1.1.11]

- [ ] **Task 1.9.3** -- Return policies settings
  - **Path:** `packages/assets/src/components/settings/ReturnPoliciesTab.jsx`
  - **Implement:** DefaultPolicyForm (return window, restocking fee, photo requirement), PolicyOverridesList with add/edit/delete for per-product/tag/collection overrides. Priority display.
  - **Dependencies:** [Blocked by: 1.9.2]

- [ ] **Task 1.9.4** -- Portal customization settings
  - **Path:** `packages/assets/src/components/settings/PortalCustomizationTab.jsx`
  - **Implement:** LogoUploader (drag-drop, 2MB max), ColorPicker (primary/secondary), FontSelector, live PortalPreview iframe showing real-time changes.
  - **Dependencies:** [Blocked by: 1.9.2]

- [ ] **Task 1.9.5** -- Shipping configuration settings
  - **Path:** `packages/assets/src/components/settings/ShippingConfigTab.jsx`
  - **Implement:** CarrierSelector (USPS, FedEx, UPS, DHL), WarehouseAddressForm, EasyPost API key input (encrypted storage).
  - **Dependencies:** [Blocked by: 1.9.2]

- [ ] **Task 1.9.6** -- Notification template settings
  - **Path:** `packages/assets/src/components/settings/NotificationsTab.jsx`
  - **Implement:** EmailTemplateEditor for each event type (return_requested, approved, rejected, label_created, item_received, refund_issued, exchange_shipped, store_credit_issued). Variable insertion ({{customerName}}, {{orderName}}, etc.). Preview rendering.
  - **Dependencies:** [Blocked by: 1.9.2]

- [ ] **Task 1.9.7** -- Return reasons settings
  - **Path:** `packages/assets/src/components/settings/ReturnReasonsTab.jsx`
  - **Implement:** DraggableReasonsList with add/edit/delete/reorder. Photo requirement toggle per reason. Active/inactive toggle.
  - **Dependencies:** [Blocked by: 1.9.2]

- [ ] **Task 1.9.8** -- Language settings
  - **Path:** `packages/assets/src/components/settings/LanguagesTab.jsx`
  - **Implement:** Toggle list of available languages. Free plan: max 5 (show upgrade prompt for more). Default language selector.
  - **Dependencies:** [Blocked by: 1.9.2]

- [ ] **Task 1.9.9** -- Billing and plan settings
  - **Path:** `packages/assets/src/components/settings/BillingTab.jsx`
  - **Implement:** CurrentPlanCard (plan name, return usage/limit, billing cycle), UsageProgressBar, UpgradePlanOptions showing all 4 tiers per file 02/06 pricing.
  - **Dependencies:** [Blocked by: 1.9.2]

---

### 1.10 Quick-Start Wizard (Week 11-12)

- [ ] **Task 1.10.1** -- Onboarding API handler
  - **Path:** `packages/functions/src/handlers/onboardingHandler.js`
  - **Implement:** REST endpoints from file 12 section 4.5: GET status, POST import-policies, PUT step/:stepNumber, POST complete, POST skip.
  - **Dependencies:** [Blocked by: 1.2.1 (policyService), 1.9.1]

- [ ] **Task 1.10.2** -- Onboarding wizard page
  - **Path:** `packages/assets/src/pages/OnboardingWizardPage.jsx`
  - **Implement:** 5-step wizard per file 08 Merchant Admin Flow: WizardProgress indicator, ImportPoliciesStep (auto-import from Shopify API), PortalBrandingStep (logo + colors), ShippingSetupStep (carrier config), EmailTemplatesStep (preview defaults), ActivatePortalStep (enable theme extension). Resume from last completed step. Skip option.
  - **Dependencies:** [Blocked by: 1.10.1, 1.9.2]

- [ ] **Task 1.10.3** -- Onboarding hook
  - **Path:** `packages/assets/src/hooks/useOnboarding.js`
  - **Implement:** Wizard state management: current step, step completion status, auto-save on step change, skip handling.
  - **Dependencies:** [Blocked by: 1.1.11]

---

### 1.11 App Installation & Lifecycle (Week 11-12)

- [ ] **Task 1.11.1** -- App install handler
  - **Path:** `packages/functions/src/handlers/installHandler.js`
  - **Implement:** OAuth callback handler. Create `shops` document with default settings. Seed default return reasons (sizing, defective, not as described, changed mind, other). Seed default notification templates. Subscribe to webhooks (orders/create, orders/updated, orders/fulfilled, refunds/create, products/update, app/uninstalled, GDPR topics). Set plan to "free" with 50 return limit.
  - **Dependencies:** [Blocked by: 1.1.4, 1.1.7, 1.5.1]

- [ ] **Task 1.11.2** -- App uninstall handler
  - **Path:** `packages/functions/src/handlers/uninstallHandler.js`
  - **Implement:** Process `app/uninstalled` webhook. Mark shop as inactive. Schedule data cleanup after 30-day retention. Revoke access tokens.
  - **Dependencies:** [Blocked by: 1.1.12, 1.1.4]

- [ ] **Task 1.11.3** -- GDPR handlers
  - **Path:** `packages/functions/src/handlers/gdprHandler.js`
  - **Implement:** `customers/data_request` -- export customer return data. `customers/redact` -- delete customer PII from all collections. `shop/redact` -- delete all shop data from Firestore and BigQuery.
  - **Dependencies:** [Blocked by: 1.1.7]

---

### 1.12 Testing & QA (Week 12)

- [ ] **Task 1.12.1** -- Unit tests for services
  - **Paths:** `packages/functions/src/services/__tests__/`
  - **Implement:** Tests for policyService, autoApproveService, returnService, refundService, storeCreditService, exchangeService, notificationService, shippingService, analyticsService. Cover happy paths and edge cases from file 11 test cases.
  - **Dependencies:** [Blocked by: all service tasks]

- [ ] **Task 1.12.2** -- Integration tests for API endpoints
  - **Paths:** `packages/functions/src/handlers/__tests__/`
  - **Implement:** Tests for portal API (lookup, create return), admin API (list, detail, approve, reject, refund, exchange), settings API, analytics API. Use Firebase emulators.
  - **Dependencies:** [Blocked by: all handler tasks]

- [ ] **Task 1.12.3** -- Frontend component tests
  - **Paths:** `packages/assets/src/__tests__/`
  - **Implement:** Component tests for critical UI: ReturnListPage, ReturnDetailPage, OnboardingWizard, SettingsPage. Use React Testing Library.
  - **Dependencies:** [Blocked by: all frontend page tasks]

---

## Phase 2: MMP - P1 Differentiators (Weeks 13-24)

### 2.1 Advanced Exchange Features (Week 13-16)

- [ ] **Task 2.1.1** -- Cross-product exchange
  - **Path:** `packages/functions/src/services/exchangeService.js` (extend)
  - **Implement:** Add `createCrossProductExchange(shopId, returnId, originalVariantId, newProductId, newVariantId)` to existing exchangeService. Browse catalog endpoint. Price difference calculation across different products. Plan gating: Starter+ only.
  - **Dependencies:** [Blocked by: 1.4.1]

- [ ] **Task 2.1.2** -- Shop Now exchange flow
  - **Path:** `packages/functions/src/services/exchangeService.js` (extend), `extensions/theme-extension/assets/return-portal.js` (extend)
  - **Implement:** `createShopNowSession(shopId, returnId, creditAmount)` -- generate unique session with return credit. Frontend: redirect to store catalog with credit banner, apply credit at checkout via Shopify discount/gift card mechanism. Handle overspend (charge difference) and underspend (issue remaining as store credit). Plan gating: Pro+ only.
  - **Dependencies:** [Blocked by: 2.1.1]

- [ ] **Task 2.1.3** -- Instant exchange
  - **Path:** `packages/functions/src/services/exchangeService.js` (extend)
  - **Implement:** Add `createInstantExchange(shopId, returnId, newVariantId)`. Create exchange order immediately (Shopify order create mutation). Place card hold on customer payment method via Shopify Payments API. Set return deadline. Background scheduled job to check return deadline and charge if expired. Plan gating: Pro+ only.
  - **Dependencies:** [Blocked by: 2.1.1]

- [ ] **Task 2.1.4** -- Exchange bonus credit
  - **Path:** `packages/functions/src/services/exchangeService.js` (extend)
  - **Implement:** Apply bonus credit from shop settings when customer chooses exchange or store credit over refund. Support fixed amount and percentage-based bonus. Display bonus in portal resolution options.
  - **Dependencies:** [Blocked by: 1.4.1, 1.3.2]

- [ ] **Task 2.1.5** -- Exchange UI updates (portal)
  - **Path:** `extensions/theme-extension/assets/return-portal.js` (extend), `extensions/theme-extension/snippets/exchange-selector.liquid` (extend)
  - **Implement:** Cross-product browse UI, Shop Now redirect flow, instant exchange option (with card hold disclosure), bonus credit display on resolution selection step.
  - **Dependencies:** [Blocked by: 2.1.1, 2.1.2, 2.1.3, 2.1.4]

---

### 2.2 Automation & Fraud (Week 16-19)

- [ ] **Task 2.2.1** -- Automation rules engine
  - **Path:** `packages/functions/src/services/automationService.js`
  - **Implement:** `evaluateRules(shopId, returnRequest)` -- load active rules by priority, evaluate conditions (return_reason, item_value, order_value, product_tag, customer_return_count), execute actions (auto_approve, set_resolution, generate_label, send_notification, keep_item, flag_fraud). Log rule execution in audit trail. Plan gating: Starter+.
  - **Dependencies:** [Blocked by: 1.1.7 (automationRuleRepository), 1.2.2]

- [ ] **Task 2.2.2** -- Automation rules UI
  - **Path:** `packages/assets/src/components/settings/AutomationRulesTab.jsx`
  - **Implement:** RulesList (name, status, trigger count), RuleBuilder (visual condition builder: field + operator + value, action selector with params). Active/inactive toggle. Priority drag-reorder. Plan gate check via usePlanGate hook.
  - **Dependencies:** [Blocked by: 2.2.1, 1.9.2]

- [ ] **Task 2.2.3** -- Fraud detection service
  - **Path:** `packages/functions/src/services/fraudDetectionService.js`
  - **Implement:** `calculateFraudScore(shopId, customerId, returnData)` -- evaluate signals: return frequency (>5 in 30 days), return value pattern, serial return behavior, blocklist check, address mismatch. Return score 0-1. Flag returns above threshold (default 0.7). Route flagged returns to manual review. Plan gating: Starter+.
  - **Dependencies:** [Blocked by: 1.1.7 (blocklistRepository), 1.2.3]

- [ ] **Task 2.2.4** -- Fraud prevention settings UI
  - **Path:** `packages/assets/src/components/settings/FraudPreventionTab.jsx`
  - **Implement:** FraudSettings (threshold slider, enable/disable), BlocklistManager (add/remove customer emails, import CSV, search). FraudAlertBanner component on ReturnDetailPage.
  - **Dependencies:** [Blocked by: 2.2.3, 1.9.2]

---

### 2.3 Product Analytics (Week 19-21)

- [ ] **Task 2.3.1** -- Product analytics service
  - **Path:** `packages/functions/src/services/analyticsService.js` (extend)
  - **Implement:** `getProductReturnRates(shopId, dateRange)` -- query BigQuery `product_return_rates` table. `getProductDetail(shopId, productId)` -- variant-level breakdown with top reasons. `getFinancialImpact(shopId, dateRange)` -- revenue retained, refund costs, exchange value, shipping costs. Plan gating: Pro+.
  - **Dependencies:** [Blocked by: 1.7.1, 1.7.2, 1.7.3]

- [ ] **Task 2.3.2** -- Product analytics UI
  - **Path:** `packages/assets/src/pages/AnalyticsPage.jsx` (extend)
  - **Implement:** ProductInsightsTable (ranked by return rate), ProductDrillDown modal (variant breakdown, reason analysis, actionable insights like "Size M returned 47x for too small"), FinancialSummary cards. Plan gate: show upgrade prompt for Free plan.
  - **Dependencies:** [Blocked by: 2.3.1, 1.7.4]

---

### 2.4 Additional P1 Features (Week 20-24)

- [ ] **Task 2.4.1** -- Green returns (keep the item)
  - **Path:** `packages/functions/src/services/returnService.js` (extend)
  - **Implement:** In `createReturn`, check if item value < greenReturnsThreshold. If yes, offer keep-item option. If customer selects keep-item, skip label generation, immediately process refund or store credit. Update state machine per file 08 (Approved -> KeepItem -> RefundIssued/StoreCreditIssued).
  - **Dependencies:** [Blocked by: 1.2.3, 1.3.1]

- [ ] **Task 2.4.2** -- QR code returns
  - **Path:** `packages/functions/src/services/shippingService.js` (extend)
  - **Implement:** Add `generateQRCode(shopId, returnId)` -- generate QR code via EasyPost/carrier API for box-free drop-off. Store QR image in Cloud Storage. Add QR option to portal shipping method selection. Plan gating: Pro+.
  - **Dependencies:** [Blocked by: 1.6.1]

- [ ] **Task 2.4.3** -- SMS notification support
  - **Path:** `packages/functions/src/services/notificationService.js` (extend)
  - **Implement:** Add SMS channel. `sendSMS(phoneNumber, message)` via Twilio. SMS templates with variable substitution. Delivery status tracking. Plan gating: Starter+.
  - **Dependencies:** [Blocked by: 1.5.1]

- [ ] **Task 2.4.4** -- Gift returns
  - **Path:** `packages/functions/src/services/returnService.js` (extend), `extensions/theme-extension/assets/return-portal.js` (extend)
  - **Implement:** Gift return mode: suppress all price displays, restrict resolution to store credit only (no refund to original payment), issue store credit to gift recipient (not original purchaser). Gift receipt lookup.
  - **Dependencies:** [Blocked by: 1.2.3, 1.3.2]

- [ ] **Task 2.4.5** -- Partial returns (bundles)
  - **Path:** `packages/functions/src/services/returnService.js` (extend)
  - **Implement:** Support returning individual items from bundle orders. Proportional value calculation for bundled items. Handle mixed eligibility within a bundle.
  - **Dependencies:** [Blocked by: 1.2.3]

- [ ] **Task 2.4.6** -- Customer blocklist
  - **Path:** `packages/functions/src/services/blocklistService.js`
  - **Implement:** `addToBlocklist(shopId, customerEmail, reason)`, `removeFromBlocklist(shopId, blockId)`, `isBlocked(shopId, customerEmail)`. Integrate with portal lookup (show generic "contact support" message) and autoApproveService (route to manual review).
  - **Dependencies:** [Blocked by: 1.1.7 (blocklistRepository)]

- [ ] **Task 2.4.7** -- Shopify Flow integration
  - **Path:** `packages/functions/src/services/shopifyFlowService.js`
  - **Implement:** Publish Flow triggers for events: return_created, return_approved, return_completed, exchange_created, refund_processed. Event payload with returnId, orderId, customerId, resolutionType, amount. Register as Shopify Flow action/trigger provider. Plan gating: Starter+.
  - **Dependencies:** [Blocked by: 1.1.12]

---

## Phase 3: Growth - P2 Features (Weeks 25-52)

### 3.1 Enterprise Features (Week 25-36)

- [ ] **Task 3.1.1** -- Multi-warehouse routing
  - **Path:** `packages/functions/src/services/warehouseService.js`
  - **Implement:** Warehouse configuration (multiple addresses per shop). Routing logic: route return to nearest warehouse based on customer location. Label generation with correct destination. Plan gating: Enterprise only.
  - **Dependencies:** [Blocked by: 1.6.1]

- [ ] **Task 3.1.2** -- Cross-border returns
  - **Path:** `packages/functions/src/services/shippingService.js` (extend)
  - **Implement:** International label generation with customs documentation. Multi-currency refund calculations. Regional carrier selection. Consolidated return shipping. Plan gating: Enterprise only.
  - **Dependencies:** [Blocked by: 1.6.1, 3.1.1]

- [ ] **Task 3.1.3** -- API access (public REST API)
  - **Path:** `packages/functions/src/handlers/publicApiHandler.js`
  - **Implement:** Authenticated REST API for external integrations per file 02 feature #35. API key management. Rate limiting. Endpoints: list returns, get return detail, create return, update status. OpenAPI/Swagger documentation. Plan gating: Pro+.
  - **Dependencies:** [Blocked by: 1.2.5]

- [ ] **Task 3.1.4** -- Helpdesk integrations
  - **Paths:**
    - `packages/functions/src/services/integrations/gorgiasService.js`
    - `packages/functions/src/services/integrations/zendeskService.js`
    - `packages/functions/src/services/integrations/freshdeskService.js`
  - **Implement:** Native integrations: push return data to helpdesk tickets, create sidebar widgets showing return status, allow agents to approve/reject from helpdesk. Plan gating: Pro+.
  - **Dependencies:** [Blocked by: 1.2.3]

- [ ] **Task 3.1.5** -- Helpdesk integration settings UI
  - **Path:** `packages/assets/src/components/settings/IntegrationsTab.jsx`
  - **Implement:** ShopifyFlowCard (status, event list), HelpdeskIntegrationCard (connect Gorgias/Zendesk/Freshdesk with API key), KlaviyoIntegrationCard (connect for email marketing flows).
  - **Dependencies:** [Blocked by: 3.1.4, 1.9.2]

---

### 3.2 Advanced Analytics & AI (Week 37-48)

- [ ] **Task 3.2.1** -- Advanced analytics and custom reports
  - **Path:** `packages/functions/src/services/analyticsService.js` (extend)
  - **Implement:** Custom report builder (select metrics, dimensions, date ranges). CSV/PDF export. Scheduled report emails. BigQuery custom query builder with safety constraints. Plan gating: Enterprise.
  - **Dependencies:** [Blocked by: 2.3.1]

- [ ] **Task 3.2.2** -- Warranty management
  - **Path:** `packages/functions/src/services/warrantyService.js`, `packages/functions/src/repositories/warrantyRepository.js`
  - **Implement:** New `warranties` collection. Warranty period tracking per product. Warranty claim submission separate from return flow. Warranty-specific policies and approval rules. Plan gating: Enterprise.
  - **Dependencies:** [Blocked by: 1.2.3]

- [ ] **Task 3.2.3** -- AI return prevention (beta)
  - **Path:** `packages/functions/src/services/aiReturnPreventionService.js`
  - **Implement:** Analyze return patterns to predict likely returns. Identify high-risk orders. Generate product improvement suggestions from return reason data (file 02 Blue Ocean #2). Storefront widget showing return rate insights on product pages (theme extension). Plan gating: Enterprise.
  - **Dependencies:** [Blocked by: 2.3.1, 1.7.3]

- [ ] **Task 3.2.4** -- Return prevention widget (theme extension)
  - **Path:** `extensions/theme-extension/blocks/return-prevention-widget.liquid`
  - **Implement:** Product page widget: "Customers who ordered their usual size found this fits perfectly" or return rate badge. Data from BigQuery product_return_rates table via API. Plan gating: Enterprise.
  - **Dependencies:** [Blocked by: 3.2.3]

---

### 3.3 Additional P2 Features (Week 37-52)

- [ ] **Task 3.3.1** -- In-store returns (POS)
  - **Path:** `packages/functions/src/services/posReturnService.js`
  - **Implement:** Accept online-order returns at physical locations via Shopify POS. POS UI extension. Instant refund/exchange at counter. Plan gating: Enterprise / Shopify Plus.
  - **Dependencies:** [Blocked by: 1.2.3]

- [ ] **Task 3.3.2** -- ERP integrations
  - **Paths:**
    - `packages/functions/src/services/integrations/netsuiteService.js`
    - `packages/functions/src/services/integrations/sapService.js`
  - **Implement:** Sync return data with ERP systems. Automatic accounting entries for refunds and exchanges. Inventory sync. Plan gating: Enterprise.
  - **Dependencies:** [Blocked by: 1.2.3]

- [ ] **Task 3.3.3** -- 3PL integrations
  - **Path:** `packages/functions/src/services/integrations/thirdPartyLogisticsService.js`
  - **Implement:** Connect to ShipBob, Fulfillment by Amazon, etc. for return routing and processing. Plan gating: Enterprise.
  - **Dependencies:** [Blocked by: 3.1.1]

- [ ] **Task 3.3.4** -- White-label portal
  - **Path:** `packages/functions/src/services/brandingService.js` (extend)
  - **Implement:** Remove all Avada branding from customer portal. Custom domain support. Plan gating: Pro+.
  - **Dependencies:** [Blocked by: 1.2.6]

- [ ] **Task 3.3.5** -- Return-to-donate
  - **Path:** `packages/functions/src/services/returnService.js` (extend)
  - **Implement:** Option for customers to donate items instead of returning. Integration with donation partners. Tax receipt generation. Plan gating: All plans.
  - **Dependencies:** [Blocked by: 1.2.3]

- [ ] **Task 3.3.6** -- Packing slips
  - **Path:** `packages/functions/src/services/packingSlipService.js`
  - **Implement:** Auto-generate packing slips for return shipments. PDF generation with return details, items, and instructions. Attach to label email. Plan gating: Pro+.
  - **Dependencies:** [Blocked by: 1.6.1]

- [ ] **Task 3.3.7** -- Bulk return processing
  - **Path:** `packages/functions/src/services/returnService.js` (extend)
  - **Implement:** Process multiple returns simultaneously for multi-box orders. Batch refund processing. Batch label generation improvements. Plan gating: Pro+.
  - **Dependencies:** [Blocked by: 1.2.3, 1.2.5]

- [ ] **Task 3.3.8** -- Item condition validation with photos
  - **Path:** `packages/functions/src/services/inspectionService.js`
  - **Implement:** Photo verification workflow for returned item condition before approval. Agent reviews photos and sets condition (new, like_new, used, damaged). Condition affects refund amount (partial refund for damaged). Plan gating: Pro+.
  - **Dependencies:** [Blocked by: 1.2.3]

---

## Task Summary

| Phase | Tasks | Estimated Weeks | Key Features |
|-------|-------|----------------|-------------|
| Phase 1: MVP (P0) | 52 tasks | 12 weeks | Portal, policies, auto-approve, refunds, store credit, variant exchange, labels, tracking, analytics, notifications, wizard |
| Phase 2: MMP (P1) | 18 tasks | 12 weeks | Instant exchange, cross-product exchange, Shop Now, bonus credit, automation rules, fraud detection, product analytics, green returns, QR codes, SMS, gift returns, blocklist, Shopify Flow |
| Phase 3: Growth (P2) | 14 tasks | 28 weeks | Multi-warehouse, cross-border, API, helpdesk integrations, advanced analytics, AI prevention, POS, ERP, 3PL, warranty, white-label |
| **Total** | **84 tasks** | **52 weeks** | All 45 features from file 02 feature matrix |

### Critical Path (MVP)

```
1.1.1 (schema) + 1.1.2 (types) + 1.1.3 (base repo)
    |
    v
1.1.4-1.1.7 (repositories)
    |
    v
1.2.1 (policy service) --> 1.2.2 (auto-approve) --> 1.2.3 (return service)
    |                                                       |
    v                                                       v
1.2.4 (portal API) + 1.2.5 (admin API) ----------> 1.3.1 (refund) --> 1.3.2 (store credit)
    |                       |                               |
    v                       v                               v
1.2.6-1.2.9 (theme ext)   1.8.1-1.8.6 (admin UI)   1.4.1 (exchange service)
    |                                                       |
    v                                                       v
1.5.1-1.5.2 (notifications)                         1.6.1-1.6.2 (shipping labels)
                                                           |
                                                           v
                                                    1.7.1-1.7.5 (analytics)
                                                           |
                                                           v
                                                    1.9.1-1.9.9 (settings UI)
                                                           |
                                                           v
                                                    1.10.1-1.10.3 (wizard)
                                                           |
                                                           v
                                                    1.11.1-1.11.3 (install/lifecycle)
                                                           |
                                                           v
                                                    1.12.1-1.12.3 (testing)
```

All task IDs, file paths, and feature references trace back to the feature matrix (file 02), architecture (file 12), and pricing tiers (file 06).
