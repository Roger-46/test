# 05 - Checklist Triển Khai Bản Submit

Mỗi item là 1 đơn vị công việc nhỏ, phù hợp cho AI-assisted implementation.

---

## Phase 1: Foundation (Tuần 1)

### 1.1 Khởi Tạo Dự Án

- [ ] `package.json` -- Khởi tạo root package với workspaces cho `packages/functions`, `packages/assets`, `packages/scripttag`
- [ ] `packages/functions/package.json` -- Dependencies: firebase-functions, firebase-admin, @shopify/shopify-api, graphql-request, express
- [ ] `packages/assets/package.json` -- Dependencies: @shopify/polaris, @shopify/app-bridge-react, react-router-dom, react-query
- [ ] `packages/scripttag/package.json` -- Dependencies: preact
- [ ] `firebase.json` -- Config Firebase: functions, hosting, firestore, emulators
- [ ] `.firebaserc` -- Firebase project alias
- [ ] `firestore.rules` -- Chặn tất cả client-side, chỉ cho phép server-side qua admin SDK
- [ ] `firestore.indexes.json` -- Tạo TẤT CẢ indexes cho cả Submit + MVP (tránh blocking sau)
- [ ] `shopify.app.toml` -- Config app: scopes, webhooks, app proxy, extensions
- [ ] `packages/assets/vite.config.js` -- Vite cho React + HMR + proxy Firebase emulators
- [ ] `packages/scripttag/vite.config.js` -- Vite cho Preact (output iife, minified)
- [ ] `.env.example` -- Template tất cả env vars (kể cả MVP chưa dùng)

### 1.2 Xác Thực & Phiên

- [ ] `packages/functions/src/middleware/auth.js` -- Xác minh session token (JWT) từ App Bridge
- [ ] `packages/functions/src/middleware/webhookAuth.js` -- Xác minh HMAC-SHA256 cho webhooks
- [ ] `packages/functions/src/middleware/storefrontAuth.js` -- Xác minh order token cho customer APIs
- [ ] `packages/functions/src/middleware/rateLimiter.js` -- Giới hạn request cơ bản (Firestore counters)
- [ ] `packages/functions/src/middleware/errorHandler.js` -- Xử lý lỗi global (catch, log, format response)
- [ ] `packages/functions/src/helpers/shopify.js` -- Factory tạo Shopify GraphQL/REST clients
- [ ] `packages/functions/src/helpers/crypto.js` -- Mã hóa access token (AES-256-GCM)
- [ ] `packages/functions/src/helpers/tokenGenerator.js` -- Tạo/xác minh order token cho storefront

### 1.3 Cài Đặt App & OAuth

- [ ] `packages/functions/src/handlers/authHandler.js` -- Flow OAuth: install → callback → token exchange
- [ ] `packages/functions/src/services/authService.js` -- Logic OAuth: validate nonce, đổi code lấy token, tạo shop record

### 1.4 Repositories (Firestore CRUD)

- [ ] `packages/functions/src/repositories/shopRepository.js` -- CRUD collection `shops`
- [ ] `packages/functions/src/repositories/editSettingsRepository.js` -- CRUD collection `editSettings` + tạo defaults
- [ ] `packages/functions/src/repositories/orderRepository.js` -- CRUD collection `orders` + search + pagination
- [ ] `packages/functions/src/repositories/orderEditRepository.js` -- CRUD collection `orderEdits`
- [ ] `packages/functions/src/repositories/subscriptionRepository.js` -- CRUD collection `subscriptions` (basic: free plan + usage)
- [ ] `packages/functions/src/repositories/notificationRepository.js` -- CRUD collection `notifications`
- [ ] `packages/functions/src/repositories/webhookLogRepository.js` -- Idempotency check cho webhooks

### 1.5 Types & Constants

- [ ] `packages/functions/src/helpers/constants.js` -- Tất cả constants (plan limits, edit types, status enums, error codes)
- [ ] `packages/functions/src/helpers/errors.js` -- Custom error classes (AppError, ValidationError, NotFoundError, etc.)
- [ ] `packages/functions/src/helpers/logger.js` -- Structured logging (Cloud Logging compatible)

### 1.6 Webhook Infrastructure

- [ ] `packages/functions/src/handlers/webhookHandler.js` -- Nhận webhooks, route theo topic
- [ ] `packages/functions/src/services/webhookService.js` -- Xử lý webhook: idempotency check → process

---

## Phase 2: Core Backend (Tuần 2)

### 2.1 Đồng Bộ Đơn Hàng & Edit Window

- [ ] `packages/functions/src/handlers/orderEventHandler.js` -- Xử lý webhook orders/*
- [ ] `packages/functions/src/services/orderSyncService.js` -- Sync data đơn hàng từ webhook vào Firestore
- [ ] `packages/functions/src/services/editWindowService.js` -- Quản lý edit window (mở, đóng, hết hạn)
- [ ] `packages/functions/src/handlers/scheduledHandler.js` -- Hàm scheduled: expire edit windows (chạy mỗi 5 phút)

### 2.2 Engine Sửa Đơn Hàng

- [ ] `packages/functions/src/services/editEligibilityService.js` -- Kiểm tra đơn có đủ điều kiện sửa không
- [ ] `packages/functions/src/services/editRuleEngine.js` -- Đánh giá rules (Submit: global only)
- [ ] `packages/functions/src/services/editValidationService.js` -- Validate thay đổi (tồn kho, rules, usage limit)
- [ ] `packages/functions/src/services/priceDiffService.js` -- Tính chênh lệch giá
- [ ] `packages/functions/src/services/orderEditService.js` -- Orchestrator: validate → begin → apply → commit → save
- [ ] `packages/functions/src/services/shopifyOrderEditService.js` -- Wrapper Shopify GraphQL mutations (begin, setQuantity, addVariant, commit)
- [ ] `packages/functions/src/services/inventoryService.js` -- Kiểm tra/cập nhật tồn kho
- [ ] `packages/functions/src/services/addressEditService.js` -- Sửa địa chỉ qua Shopify API

### 2.3 Hủy Đơn & Hoàn Tiền

- [ ] `packages/functions/src/services/cancellationService.js` -- Xử lý hủy đơn (eligibility → cancel → restock → refund)
- [ ] `packages/functions/src/services/refundService.js` -- Xử lý hoàn tiền qua Shopify API

### 2.4 API Handlers - Storefront (Khách Hàng)

- [ ] `packages/functions/src/handlers/storefrontEditHandler.js` -- Endpoints: eligibility, options, submit, confirm
- [ ] `packages/functions/src/handlers/storefrontAddressHandler.js` -- Endpoint: sửa địa chỉ
- [ ] `packages/functions/src/handlers/storefrontCancelHandler.js` -- Endpoints: init cancel, confirm cancel

### 2.5 API Handlers - Admin (Merchant)

- [ ] `packages/functions/src/handlers/adminOrderHandler.js` -- Endpoints: danh sách đơn, chi tiết đơn
- [ ] `packages/functions/src/handlers/adminSettingsHandler.js` -- Endpoints: get/update settings

### 2.6 Router & Entry Point

- [ ] `packages/functions/src/router.js` -- Express router gắn tất cả handlers + middleware
- [ ] `packages/functions/src/index.js` -- Entry point: export HTTP function, scheduled functions

### 2.7 Email Thông Báo

- [ ] `packages/functions/src/services/notificationService.js` -- Orchestrator: chọn template, chuẩn bị data, gửi
- [ ] `packages/functions/src/services/emailService.js` -- Gửi email qua SendGrid/Mailgun
- [ ] `packages/functions/src/helpers/emailTemplates.js` -- Templates: xác nhận sửa, xác nhận hủy, thông báo merchant

### 2.8 Theo Dõi Usage

- [ ] `packages/functions/src/services/usageService.js` -- Đếm lượt sửa/tháng, kiểm tra limit

### 2.9 GDPR Handlers

- [ ] `packages/functions/src/handlers/gdprHandler.js` -- Xử lý 3 GDPR webhooks bắt buộc

### 2.10 App Proxy

- [ ] `packages/functions/src/handlers/appProxyHandler.js` -- Phục vụ trang sửa đơn cho khách, verify proxy signature

---

## Phase 3: Frontend Admin (Tuần 3)

### 3.1 App Shell

- [ ] `packages/assets/src/App.jsx` -- Root: AppProvider, AppBridgeProvider, Routes
- [ ] `packages/assets/src/routes.jsx` -- Định nghĩa routes cho Submit pages
- [ ] `packages/assets/src/components/NavigationMenu.jsx` -- Navigation: Dashboard, Đơn hàng, Cài đặt
- [ ] `packages/assets/src/components/AppLayout.jsx` -- Layout wrapper chung

### 3.2 Dashboard

- [ ] `packages/assets/src/pages/DashboardPage.jsx` -- Trang chính: metrics, recent edits, plan usage
- [ ] `packages/assets/src/components/dashboard/MetricCards.jsx` -- 4 cards: edits, cancels, savings, cancel rate
- [ ] `packages/assets/src/components/dashboard/RecentEditsTable.jsx` -- 10 lượt sửa gần nhất
- [ ] `packages/assets/src/components/dashboard/QuickActions.jsx` -- Setup checklist cho merchant mới
- [ ] `packages/assets/src/hooks/useDashboard.js` -- Fetch dashboard data

### 3.3 Danh Sách Đơn Hàng

- [ ] `packages/assets/src/pages/OrdersPage.jsx` -- Trang danh sách đơn + filters + tabs
- [ ] `packages/assets/src/components/orders/OrderFilters.jsx` -- Filter: trạng thái, tìm kiếm, ngày
- [ ] `packages/assets/src/components/orders/OrdersResourceList.jsx` -- Polaris IndexTable cho đơn hàng
- [ ] `packages/assets/src/hooks/useOrders.js` -- Fetch, filter, paginate đơn hàng

### 3.4 Chi Tiết Đơn Hàng

- [ ] `packages/assets/src/pages/OrderDetailPage.jsx` -- Chi tiết đơn + timeline sửa đổi
- [ ] `packages/assets/src/components/orders/OrderHeader.jsx` -- Header: số đơn, trạng thái, edit window
- [ ] `packages/assets/src/components/orders/OrderTimeline.jsx` -- Timeline lịch sử sửa
- [ ] `packages/assets/src/components/orders/LineItemsList.jsx` -- Danh sách sản phẩm hiện tại
- [ ] `packages/assets/src/components/orders/ShippingAddressCard.jsx` -- Địa chỉ giao hiện tại
- [ ] `packages/assets/src/hooks/useOrderDetail.js` -- Fetch chi tiết đơn + lịch sử sửa

### 3.5 Cài Đặt

- [ ] `packages/assets/src/pages/SettingsPage.jsx` -- Trang cài đặt với sections
- [ ] `packages/assets/src/components/settings/GeneralSettings.jsx` -- Edit window + allowed actions
- [ ] `packages/assets/src/components/settings/TimeWindowPicker.jsx` -- Dropdown chọn thời gian
- [ ] `packages/assets/src/components/settings/EditTypeToggles.jsx` -- Checkboxes cho loại sửa
- [ ] `packages/assets/src/components/settings/NotificationSettings.jsx` -- Cấu hình email thông báo
- [ ] `packages/assets/src/hooks/useEditSettings.js` -- Get/update settings

### 3.6 Onboarding

- [ ] `packages/assets/src/pages/OnboardingPage.jsx` -- Wizard 3 bước
- [ ] `packages/assets/src/components/onboarding/WelcomeStep.jsx` -- Chào mừng + value proposition
- [ ] `packages/assets/src/components/onboarding/ConfigureStep.jsx` -- Cấu hình nhanh
- [ ] `packages/assets/src/components/onboarding/ActivateWidgetStep.jsx` -- Hướng dẫn bật theme extension

---

## Phase 4: Storefront Widget (Tuần 4, nửa đầu)

### 4.1 Theme Extension

- [ ] `extensions/theme-extension/blocks/order-edit-widget.liquid` -- Widget trên Order Status Page
- [ ] `extensions/theme-extension/assets/order-edit-widget.js` -- JS: countdown, API calls, state
- [ ] `extensions/theme-extension/assets/order-edit-widget.css` -- CSS responsive
- [ ] `extensions/theme-extension/snippets/edit-countdown.liquid` -- Component đếm ngược
- [ ] `extensions/theme-extension/locales/en.default.json` -- Bản dịch English

### 4.2 Trang Sửa Đơn Hàng (Preact)

- [ ] `packages/scripttag/src/index.js` -- Entry point Preact
- [ ] `packages/scripttag/src/components/EditOrderPage.jsx` -- Layout chính: address, items, summary
- [ ] `packages/scripttag/src/components/LineItemEditor.jsx` -- Sửa line item: variant dropdown, qty stepper, remove
- [ ] `packages/scripttag/src/components/VariantSelector.jsx` -- Chọn variant mới với giá + tồn kho
- [ ] `packages/scripttag/src/components/AddressForm.jsx` -- Form sửa địa chỉ
- [ ] `packages/scripttag/src/components/EditSummary.jsx` -- Tóm tắt thay đổi + chênh lệch giá
- [ ] `packages/scripttag/src/components/ConfirmationScreen.jsx` -- Màn hình xác nhận + thành công
- [ ] `packages/scripttag/src/components/CancellationFlow.jsx` -- Flow hủy đơn: chọn lý do → xác nhận
- [ ] `packages/scripttag/src/components/CountdownTimer.jsx` -- Đếm ngược edit window
- [ ] `packages/scripttag/src/components/ErrorState.jsx` -- Hiển thị lỗi: hết hạn, server error
- [ ] `packages/scripttag/src/utils/api.js` -- API client cho storefront endpoints
- [ ] `packages/scripttag/src/utils/orderToken.js` -- Xử lý token cho storefront auth
- [ ] `packages/scripttag/src/styles/main.css` -- CSS responsive, CSS custom properties

---

## Phase 5: Polish & Submit (Tuần 4 nửa sau + Tuần 5)

### 5.1 Email Templates

- [ ] Template HTML: Xác nhận sửa đơn (cho khách)
- [ ] Template HTML: Xác nhận hủy đơn (cho khách)
- [ ] Template HTML: Thông báo cho merchant khi khách sửa
- [ ] Template HTML: Thông báo cho merchant khi khách hủy

### 5.2 Error Handling & Edge Cases

- [ ] Error boundary component cho React admin app
- [ ] Empty state cho dashboard (merchant mới, chưa có data)
- [ ] Empty state cho danh sách đơn (chưa có đơn nào sửa)
- [ ] Handling khi edit window hết hạn giữa lúc đang sửa
- [ ] Handling khi đơn bị fulfill giữa lúc đang sửa
- [ ] Double-click prevention trên tất cả submit buttons
- [ ] Loading states cho tất cả async operations

### 5.3 Testing

- [ ] Test OAuth install trên dev store mới
- [ ] Test uninstall app → data cleanup
- [ ] Test reinstall app → hoạt động bình thường
- [ ] Test sửa địa chỉ end-to-end
- [ ] Test đổi variant end-to-end
- [ ] Test thay đổi số lượng end-to-end
- [ ] Test hủy đơn end-to-end
- [ ] Test auto refund khi giá giảm
- [ ] Test auto invoice khi giá tăng
- [ ] Test inventory restock khi sửa/hủy
- [ ] Test email notifications gửi đúng
- [ ] Test edit window expire đúng
- [ ] Test trên mobile (admin + storefront)
- [ ] Test với store có 0 orders
- [ ] Kiểm tra không có console errors

### 5.4 App Store Listing

- [ ] Chụp ít nhất 3 screenshots thực tế từ app
- [ ] Viết app description (tiếng Anh)
- [ ] Tạo trang Privacy Policy
- [ ] Chuẩn bị demo store với orders test
- [ ] Cấu hình pricing (Free plan only)
- [ ] Review và submit

---

## Tóm Tắt Số Lượng

| Phase | Số files | Thời gian |
|-------|---------|----------|
| Phase 1: Foundation | ~25 files | 1 tuần |
| Phase 2: Core Backend | ~22 files | 1 tuần |
| Phase 3: Frontend Admin | ~20 files | 1 tuần |
| Phase 4: Storefront Widget | ~15 files | 3-4 ngày |
| Phase 5: Polish & Submit | ~10 tasks | 4-5 ngày |
| **Tổng** | **~92 files** | **~5 tuần** |

So với bản MVP đầy đủ (~155 files), bản Submit chỉ cần **~60% số lượng code**.

---

*Kết thúc Checklist Triển Khai - Bản Submit*
