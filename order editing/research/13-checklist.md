# Danh sách kiểm tra triển khai
# Avada Order Editing

Mỗi mục được giới hạn trong một file duy nhất hoặc một đơn vị công việc nhỏ, phù hợp cho việc triển khai có hỗ trợ AI.

---

## Giai đoạn 1: Nền tảng (Tuần 1-2)

### 1.1 Khởi tạo dự án

- [ ] `package.json` -- Khởi tạo package gốc với workspaces cho `packages/functions`, `packages/assets`, `packages/scripttag`
- [ ] `packages/functions/package.json` -- Các dependency cho Firebase Functions (firebase-functions, firebase-admin, @shopify/shopify-api, graphql-request)
- [ ] `packages/assets/package.json` -- Các dependency cho ứng dụng React (@shopify/polaris, @shopify/app-bridge-react, react-router-dom, react-query)
- [ ] `packages/scripttag/package.json` -- Các dependency cho scripttag Preact (preact, preact-render-to-string)
- [ ] `firebase.json` -- Cấu hình dự án Firebase (functions, hosting, firestore, emulators)
- [ ] `.firebaserc` -- Cấu hình alias dự án Firebase
- [ ] `firestore.rules` -- Quy tắc bảo mật Firestore (từ chối tất cả phía client, chỉ cho phép phía server qua admin SDK)
- [ ] `firestore.indexes.json` -- Các index truy vấn kết hợp ban đầu (xem tài liệu kiến trúc phần 1)
- [ ] `shopify.app.toml` -- Cấu hình ứng dụng Shopify (scopes, webhooks, app proxy, extensions)
- [ ] `packages/assets/vite.config.js` -- Cấu hình Vite cho ứng dụng React với HMR, proxy đến Firebase emulators
- [ ] `packages/scripttag/vite.config.js` -- Cấu hình Vite cho build scripttag Preact (đầu ra iife, đã minify)
- [ ] `.env.example` -- Mẫu biến môi trường (SHOPIFY_API_KEY, SHOPIFY_API_SECRET, FIREBASE_PROJECT_ID, v.v.)

### 1.2 Xác thực & Phiên làm việc

- [ ] `packages/functions/src/middleware/auth.js` -- Middleware xác minh session token Shopify (xác minh JWT từ App Bridge)
- [ ] `packages/functions/src/middleware/webhookAuth.js` -- Middleware xác minh chữ ký webhook HMAC-SHA256
- [ ] `packages/functions/src/middleware/storefrontAuth.js` -- Xác minh token đơn hàng storefront (xác thực mã đơn hàng + hash email)
- [ ] `packages/functions/src/middleware/rateLimiter.js` -- Middleware giới hạn tốc độ (giới hạn theo cửa hàng và theo endpoint sử dụng bộ đếm Firestore)
- [ ] `packages/functions/src/helpers/shopify.js` -- Factory tạo Shopify API client (tạo GraphQL/REST clients từ access token cửa hàng)
- [ ] `packages/functions/src/helpers/crypto.js` -- Các hàm hỗ trợ mã hóa để lưu trữ access token (mã hóa/giải mã AES-256-GCM)
- [ ] `packages/functions/src/helpers/tokenGenerator.js` -- Tạo và xác minh token storefront đơn hàng (dựa trên HMAC, giới hạn thời gian)

### 1.3 Cài đặt ứng dụng & OAuth

- [ ] `packages/functions/src/handlers/authHandler.js` -- Trình xử lý luồng OAuth (cài đặt, callback, trao đổi token)
- [ ] `packages/functions/src/services/authService.js` -- Logic nghiệp vụ OAuth (xác thực nonce, đổi mã lấy token, tạo bản ghi cửa hàng)
- [ ] `packages/functions/src/handlers/billingHandler.js` -- Trình xử lý thanh toán ứng dụng Shopify (tạo phí, xác nhận phí, kiểm tra trạng thái)
- [ ] `packages/functions/src/services/billingService.js` -- Logic nghiệp vụ thanh toán (so sánh gói, theo dõi sử dụng, nâng cấp/hạ cấp)

### 1.4 Các Repository Firestore

- [ ] `packages/functions/src/repositories/shopRepository.js` -- CRUD cho collection `shops` (getByDomain, create, update, deactivate)
- [ ] `packages/functions/src/repositories/editSettingsRepository.js` -- CRUD cho collection `editSettings` (getByShopId, createDefaults, update)
- [ ] `packages/functions/src/repositories/editRuleRepository.js` -- CRUD cho collection `editRules` (listByShopId, create, update, delete, getActiveRules)
- [ ] `packages/functions/src/repositories/orderRepository.js` -- CRUD cho collection `orders` (create, getByShopifyId, updateEditWindow, listByShop, search)
- [ ] `packages/functions/src/repositories/orderEditRepository.js` -- CRUD cho collection `orderEdits` (create, getByOrderId, listByShop, updateStatus)
- [ ] `packages/functions/src/repositories/subscriptionRepository.js` -- CRUD cho collection `subscriptions` (getByShopId, create, update, incrementUsage, resetUsage)
- [ ] `packages/functions/src/repositories/notificationRepository.js` -- CRUD cho collection `notifications` (create, updateStatus, listByOrder)
- [ ] `packages/functions/src/repositories/analyticsEventRepository.js` -- CRUD cho collection `analyticsEvents` (create, listByShop)
- [ ] `packages/functions/src/repositories/webhookLogRepository.js` -- Kiểm tra/tạo tính idempotent cho collection `webhookLogs`
- [ ] `packages/functions/src/repositories/upsellOfferRepository.js` -- CRUD cho collection `upsellOffers` (listByShopId, create, update, delete, incrementStats)

### 1.5 Các Index Firestore

- [ ] `firestore-indexes/orders.json` -- Các index kết hợp cho truy vấn collection orders
- [ ] `firestore-indexes/orderEdits.json` -- Các index kết hợp cho truy vấn collection orderEdits
- [ ] `firestore-indexes/editRules.json` -- Các index kết hợp cho truy vấn collection editRules

### 1.6 Định nghĩa kiểu & Hằng số

- [ ] `packages/functions/index.d.ts` -- Định nghĩa kiểu TypeScript cho tất cả tài liệu Firestore, request/response API, giao diện service
- [ ] `packages/functions/src/helpers/constants.js` -- Hằng số ứng dụng (giới hạn gói, cài đặt mặc định, loại chỉnh sửa, enum trạng thái, mã lỗi)
- [ ] `packages/functions/src/helpers/errors.js` -- Các lớp lỗi tùy chỉnh (AppError, ValidationError, ShopifyApiError, NotFoundError, RateLimitError)
- [ ] `packages/functions/src/presenters/responsePresenter.js` -- Bộ định dạng phản hồi chuẩn (wrapper {success, data, error})

### 1.7 Hạ tầng Webhook

- [ ] `packages/functions/src/handlers/webhookHandler.js` -- Trình xử lý route webhook (nhận tất cả webhooks, phân phối theo chủ đề)
- [ ] `packages/functions/src/services/webhookService.js` -- Bộ điều phối xử lý webhook (kiểm tra idempotent, publish lên Pub/Sub)
- [ ] `packages/functions/src/helpers/pubsub.js` -- Hàm hỗ trợ publisher Pub/Sub (tạo message có kiểu, publish lên topics)

---

## Giai đoạn 2: Backend cốt lõi (Tuần 3-4)

### 2.1 Đồng bộ đơn hàng & Cửa sổ chỉnh sửa

- [ ] `packages/functions/src/handlers/orderEventHandler.js` -- Subscriber Pub/Sub cho topic `order-events` (điều hướng đến phương thức service phù hợp)
- [ ] `packages/functions/src/services/orderSyncService.js` -- Đồng bộ dữ liệu đơn hàng từ payload webhook sang collection orders trên Firestore
- [ ] `packages/functions/src/services/editWindowService.js` -- Quản lý cửa sổ chỉnh sửa (mở cửa sổ khi tạo đơn, đóng khi hoàn thành, hết hạn khi timeout)
- [ ] `packages/functions/src/handlers/scheduledHandler.js` -- Trình xử lý function theo lịch cho `expireEditWindows` (cron mỗi 5 phút)

### 2.2 Engine chỉnh sửa đơn hàng

- [ ] `packages/functions/src/services/editEligibilityService.js` -- Kiểm tra đơn hàng có đủ điều kiện chỉnh sửa không (cửa sổ, hoàn thành, giới hạn gói, số lần chỉnh sửa)
- [ ] `packages/functions/src/services/editRuleEngine.js` -- Đánh giá quy tắc chỉnh sửa cho đơn hàng/sản phẩm cụ thể (khớp quy tắc theo loại, áp dụng ràng buộc)
- [ ] `packages/functions/src/services/editValidationService.js` -- Xác thực các thay đổi đề xuất (kiểm tra tồn kho, tuân thủ quy tắc, giới hạn gói)
- [ ] `packages/functions/src/services/priceDiffService.js` -- Tính chênh lệch giá cho các chỉnh sửa đề xuất (thay đổi mục hàng, ảnh hưởng thuế, giảm giá)
- [ ] `packages/functions/src/services/orderEditService.js` -- Xử lý chỉnh sửa cốt lõi (điều phối: xác thực -> bắt đầu -> áp dụng mutations -> commit -> lưu)
- [ ] `packages/functions/src/services/shopifyOrderEditService.js` -- Wrapper API GraphQL Shopify cho chỉnh sửa đơn hàng (begin, setQuantity, addVariant, commit)
- [ ] `packages/functions/src/services/inventoryService.js` -- Logic kiểm tra và hoàn kho (truy vấn khả dụng, theo dõi hoàn kho)
- [ ] `packages/functions/src/services/addressEditService.js` -- Logic cập nhật địa chỉ (xác thực, gọi mutation orderUpdate, lưu bản ghi)

### 2.3 Hủy đơn hàng

- [ ] `packages/functions/src/services/cancellationService.js` -- Xử lý hủy đơn (kiểm tra đủ điều kiện, hủy qua Shopify API, hoàn kho, hoàn tiền)
- [ ] `packages/functions/src/services/refundService.js` -- Xử lý hoàn tiền (tính số tiền, phát hành hoàn tiền qua Shopify, theo dõi trạng thái)

### 2.4 Các Handler API Storefront

- [ ] `packages/functions/src/handlers/storefrontEditHandler.js` -- Các endpoint chỉnh sửa phía khách hàng (đủ điều kiện, tùy chọn, gửi, xác nhận)
- [ ] `packages/functions/src/handlers/storefrontAddressHandler.js` -- Endpoint chỉnh sửa địa chỉ phía khách hàng
- [ ] `packages/functions/src/handlers/storefrontCancelHandler.js` -- Các endpoint hủy đơn phía khách hàng (khởi tạo, xác nhận)

### 2.5 Các Handler API Admin

- [ ] `packages/functions/src/handlers/adminOrderHandler.js` -- Danh sách đơn hàng admin, chi tiết, bắt đầu/commit chỉnh sửa, hủy
- [ ] `packages/functions/src/handlers/adminSettingsHandler.js` -- Lấy/cập nhật cài đặt chỉnh sửa admin
- [ ] `packages/functions/src/handlers/adminRulesHandler.js` -- CRUD quy tắc chỉnh sửa admin
- [ ] `packages/functions/src/handlers/adminSubscriptionHandler.js` -- Xem gói đăng ký admin, nâng cấp

### 2.6 Router API

- [ ] `packages/functions/src/router.js` -- Express router gắn tất cả handlers với middleware (xác thực, giới hạn tốc độ, xử lý lỗi)
- [ ] `packages/functions/src/index.js` -- Điểm vào Firebase Functions (export HTTP function, Pub/Sub subscribers, scheduled functions)

### 2.7 Hệ thống thông báo

- [ ] `packages/functions/src/services/notificationService.js` -- Bộ điều phối thông báo (xác định template, chuẩn bị dữ liệu, publish lên notification-events)
- [ ] `packages/functions/src/services/emailService.js` -- Gửi email qua SendGrid/Mailgun (render template, gửi, xử lý lỗi)
- [ ] `packages/functions/src/handlers/notificationHandler.js` -- Subscriber Pub/Sub cho topic `notification-events`
- [ ] `packages/functions/src/helpers/emailTemplates.js` -- Định nghĩa template email (xác nhận chỉnh sửa, xác nhận hủy, thông báo merchant, hóa đơn)

### 2.8 Theo dõi sử dụng

- [ ] `packages/functions/src/services/usageService.js` -- Theo dõi lượng chỉnh sửa sử dụng theo chu kỳ thanh toán (tăng, kiểm tra giới hạn, reset hàng tháng)
- [ ] `packages/functions/src/handlers/usageResetHandler.js` -- Function theo lịch để reset sử dụng hàng tháng (cron ngày 1 hàng tháng)

---

## Giai đoạn 3: Frontend (Tuần 5-6)

### 3.1 Shell ứng dụng & Điều hướng

- [ ] `packages/assets/src/App.jsx` -- Component ứng dụng gốc với AppProvider, AppBridgeProvider, Routes
- [ ] `packages/assets/src/routes.jsx` -- Định nghĩa route cho tất cả trang admin
- [ ] `packages/assets/src/components/NavigationMenu.jsx` -- Thanh điều hướng bên trái (Bảng điều khiển, Đơn hàng, Quy tắc, Cài đặt, Phân tích, Gói đăng ký)
- [ ] `packages/assets/src/components/AppLayout.jsx` -- Wrapper bố cục dùng chung (điều hướng + vùng nội dung)

### 3.2 Trang bảng điều khiển

- [ ] `packages/assets/src/pages/DashboardPage.jsx` -- Bảng điều khiển chính với thẻ chỉ số, chỉnh sửa gần đây, hành động nhanh
- [ ] `packages/assets/src/components/dashboard/MetricCards.jsx` -- Thẻ chỉ số KPI (tổng chỉnh sửa, hủy đơn, ước tính tiết kiệm)
- [ ] `packages/assets/src/components/dashboard/RecentEditsTable.jsx` -- Bảng 10 lần chỉnh sửa gần nhất với liên kết đơn hàng, loại, trạng thái
- [ ] `packages/assets/src/components/dashboard/QuickActions.jsx` -- Thẻ danh sách thiết lập cho cài đặt mới (cấu hình cài đặt, kích hoạt widget)
- [ ] `packages/assets/src/hooks/useDashboard.js` -- Lấy dữ liệu bảng điều khiển (chỉ số + chỉnh sửa gần đây song song)

### 3.3 Trang đơn hàng

- [ ] `packages/assets/src/pages/OrdersPage.jsx` -- Trang danh sách đơn hàng với bộ lọc và phân trang
- [ ] `packages/assets/src/components/orders/OrderFilters.jsx` -- Thanh bộ lọc (trạng thái, cửa sổ chỉnh sửa, tìm kiếm, khoảng ngày)
- [ ] `packages/assets/src/components/orders/OrdersResourceList.jsx` -- Polaris ResourceList cho đơn hàng với sắp xếp/lọc
- [ ] `packages/assets/src/components/orders/OrderResourceItem.jsx` -- Dòng đơn hàng riêng lẻ (số đơn hàng, khách hàng, badge cửa sổ chỉnh sửa, hành động)
- [ ] `packages/assets/src/hooks/useOrders.js` -- Lấy, lọc, phân trang đơn hàng từ admin API

### 3.4 Chi tiết đơn hàng & Chỉnh sửa phía Merchant

- [ ] `packages/assets/src/pages/OrderDetailPage.jsx` -- Trang chi tiết đơn hàng với lịch sử chỉnh sửa, mục hàng, địa chỉ, nút chỉnh sửa/hủy
- [ ] `packages/assets/src/components/orders/OrderHeader.jsx` -- Header đơn hàng với số đơn hàng, badge trạng thái, đếm ngược cửa sổ chỉnh sửa
- [ ] `packages/assets/src/components/orders/OrderTimeline.jsx` -- Dòng thời gian các sự kiện lịch sử chỉnh sửa
- [ ] `packages/assets/src/components/orders/LineItemsList.jsx` -- Hiển thị các mục hàng hiện tại với hình ảnh, tiêu đề, số lượng, giá
- [ ] `packages/assets/src/components/orders/ShippingAddressCard.jsx` -- Hiển thị địa chỉ giao hàng hiện tại với nút chỉnh sửa
- [ ] `packages/assets/src/components/orders/EditOrderModal.jsx` -- Modal chỉnh sửa đơn hàng phía merchant (hoán đổi, số lượng, thêm sản phẩm, xóa)
- [ ] `packages/assets/src/components/orders/VariantSwapPicker.jsx` -- Bộ chọn biến thể sản phẩm để hoán đổi (hiển thị các biến thể có sẵn với tồn kho)
- [ ] `packages/assets/src/components/orders/QuantityStepper.jsx` -- Bộ tăng/giảm số lượng +/- với xác thực min/max
- [ ] `packages/assets/src/components/orders/ProductSearchBar.jsx` -- Tìm kiếm và thêm sản phẩm mới vào đơn hàng (Polaris Autocomplete)
- [ ] `packages/assets/src/components/orders/PriceDiffSummary.jsx` -- Bảng phân tích chênh lệch giá (gốc, thay đổi, tổng mới)
- [ ] `packages/assets/src/components/orders/CancelOrderModal.jsx` -- Modal xác nhận hủy đơn với bộ chọn lý do
- [ ] `packages/assets/src/hooks/useOrderDetail.js` -- Lấy đơn hàng đơn lẻ với lịch sử chỉnh sửa
- [ ] `packages/assets/src/hooks/useOrderEdit.js` -- Quản lý trạng thái luồng chỉnh sửa phía merchant (bắt đầu, thêm thay đổi, commit)

### 3.5 Trang cài đặt

- [ ] `packages/assets/src/pages/SettingsPage.jsx` -- Trang cài đặt với các tab/phần cho tất cả cấu hình
- [ ] `packages/assets/src/components/settings/GeneralSettings.jsx` -- Cấu hình cửa sổ thời gian (loại, thời lượng), bật/tắt các hành động chỉnh sửa cho phép
- [ ] `packages/assets/src/components/settings/TimeWindowPicker.jsx` -- Bộ chọn loại cửa sổ thời gian + nhập thời lượng
- [ ] `packages/assets/src/components/settings/EditTypeToggles.jsx` -- Bật/tắt checkbox cho từng loại chỉnh sửa (địa chỉ, hoán đổi, số lượng, hủy, thêm, xóa)
- [ ] `packages/assets/src/components/settings/NotificationSettings.jsx` -- Cấu hình thông báo email (email merchant, bật/tắt thông báo merchant/khách hàng)
- [ ] `packages/assets/src/components/settings/WidgetSettings.jsx` -- Cấu hình giao diện widget (màu sắc, tùy chỉnh văn bản, bật/tắt hiển thị)
- [ ] `packages/assets/src/components/settings/WidgetPreview.jsx` -- Xem trước trực tiếp widget storefront với cài đặt hiện tại
- [ ] `packages/assets/src/hooks/useEditSettings.js` -- Lấy/cập nhật cài đặt chỉnh sửa qua admin API

### 3.6 Trang quy tắc chỉnh sửa

- [ ] `packages/assets/src/pages/EditRulesPage.jsx` -- Trang danh sách quy tắc chỉnh sửa với tạo/sửa/xóa
- [ ] `packages/assets/src/components/rules/RulesTable.jsx` -- Bảng tất cả quy tắc với loại, đối tượng, trạng thái, hành động
- [ ] `packages/assets/src/components/rules/CreateRuleModal.jsx` -- Modal tạo quy tắc mới (chọn loại, đối tượng, cấu hình tùy chọn)
- [ ] `packages/assets/src/components/rules/EditRuleModal.jsx` -- Modal chỉnh sửa quy tắc hiện có
- [ ] `packages/assets/src/components/rules/ProductPicker.jsx` -- Bộ chọn sản phẩm/bộ sưu tập Shopify (App Bridge ResourcePicker)
- [ ] `packages/assets/src/hooks/useEditRules.js` -- CRUD quy tắc chỉnh sửa qua admin API

### 3.7 Trang gói đăng ký

- [ ] `packages/assets/src/pages/SubscriptionPage.jsx` -- Hiển thị gói hiện tại, đồng hồ sử dụng, so sánh gói, CTA nâng cấp
- [ ] `packages/assets/src/components/subscription/CurrentPlanCard.jsx` -- Tên gói hiện tại, thanh sử dụng (X/Y lần chỉnh sửa đã dùng), chu kỳ thanh toán
- [ ] `packages/assets/src/components/subscription/PlanComparison.jsx` -- Bảng so sánh tính năng giữa tất cả các gói
- [ ] `packages/assets/src/hooks/useSubscription.js` -- Lấy gói đăng ký hiện tại và khởi tạo nâng cấp

### 3.8 Hướng dẫn ban đầu

- [ ] `packages/assets/src/pages/OnboardingPage.jsx` -- Trình hướng dẫn thiết lập lần đầu (bước 1: chào mừng, bước 2: cấu hình, bước 3: kích hoạt widget, bước 4: hoàn tất)
- [ ] `packages/assets/src/components/onboarding/WelcomeStep.jsx` -- Lời chào mừng + giá trị cốt lõi
- [ ] `packages/assets/src/components/onboarding/ConfigureStep.jsx` -- Form cài đặt nhanh (cửa sổ thời gian, loại chỉnh sửa)
- [ ] `packages/assets/src/components/onboarding/ActivateWidgetStep.jsx` -- Hướng dẫn bật theme app extension
- [ ] `packages/assets/src/components/onboarding/CompleteStep.jsx` -- Trạng thái thành công + các bước tiếp theo

### 3.9 Theme Extension (Widget Storefront)

- [ ] `extensions/theme-extension/blocks/order-edit-widget.liquid` -- Widget trang trạng thái đơn hàng với đếm ngược, nút chỉnh sửa, liên kết hủy
- [ ] `extensions/theme-extension/blocks/thank-you-banner.liquid` -- Banner trang cảm ơn với CTA chỉnh sửa
- [ ] `extensions/theme-extension/assets/order-edit-widget.js` -- JS phía client của widget (bộ đếm ngược, gọi API, quản lý trạng thái)
- [ ] `extensions/theme-extension/assets/order-edit-widget.css` -- Styles widget (responsive, tùy chỉnh qua CSS vars)
- [ ] `extensions/theme-extension/assets/thank-you-banner.js` -- JS phía client của banner
- [ ] `extensions/theme-extension/assets/thank-you-banner.css` -- Styles banner
- [ ] `extensions/theme-extension/snippets/edit-countdown.liquid` -- Component đếm ngược có thể tái sử dụng
- [ ] `extensions/theme-extension/locales/en.default.json` -- Bản dịch tiếng Anh cho văn bản widget

### 3.10 Trang chỉnh sửa phía khách hàng (Scripttag/App Proxy)

- [ ] `packages/scripttag/src/index.js` -- Điểm vào ứng dụng Preact, mount vào DOM
- [ ] `packages/scripttag/src/components/EditOrderPage.jsx` -- Bố cục trang chỉnh sửa đầy đủ (header, mục hàng, địa chỉ, xác nhận)
- [ ] `packages/scripttag/src/components/LineItemEditor.jsx` -- Mục hàng có thể chỉnh sửa (dropdown biến thể, bộ tăng giảm số lượng, nút xóa)
- [ ] `packages/scripttag/src/components/VariantSelector.jsx` -- Dropdown chọn biến thể mới với thông tin giá/tồn kho
- [ ] `packages/scripttag/src/components/AddressForm.jsx` -- Form chỉnh sửa địa chỉ với dropdown quốc gia/tỉnh thành
- [ ] `packages/scripttag/src/components/EditSummary.jsx` -- Tóm tắt thay đổi với chênh lệch giá trước khi xác nhận
- [ ] `packages/scripttag/src/components/ConfirmationScreen.jsx` -- Màn hình xác nhận sau chỉnh sửa (thông báo thành công, chi tiết đơn hàng đã cập nhật)
- [ ] `packages/scripttag/src/components/CancellationFlow.jsx` -- Luồng hủy đơn hàng (bộ chọn lý do, xác nhận)
- [ ] `packages/scripttag/src/components/CountdownTimer.jsx` -- Bộ đếm ngược cửa sổ chỉnh sửa
- [ ] `packages/scripttag/src/components/ErrorState.jsx` -- Component trạng thái lỗi (không đủ điều kiện, hết hạn, lỗi server)
- [ ] `packages/scripttag/src/utils/api.js` -- API client cho các endpoint storefront (fetch wrapper với xác thực token)
- [ ] `packages/scripttag/src/utils/orderToken.js` -- Tạo/phân tích token cho xác thực storefront
- [ ] `packages/scripttag/src/styles/main.css` -- Stylesheet chính (responsive, CSS custom properties cho theming)

### 3.11 Trình xử lý App Proxy

- [ ] `packages/functions/src/handlers/appProxyHandler.js` -- Trình xử lý route app proxy (phục vụ trang chỉnh sửa khách hàng, xác minh chữ ký proxy)

---

## Giai đoạn 4: Hoàn thiện & Ra mắt (Tuần 7-8)

### 4.1 Backend phân tích

- [ ] `packages/functions/src/services/analyticsService.js` -- Tổng hợp dữ liệu phân tích (truy vấn BigQuery cho chỉ số bảng điều khiển)
- [ ] `packages/functions/src/handlers/analyticsHandler.js` -- Subscriber Pub/Sub cho topic `analytics-events` (ghi vào BigQuery)
- [ ] `packages/functions/src/handlers/adminAnalyticsHandler.js` -- Handler API admin cho các endpoint phân tích (tổng quan, chỉnh sửa, sản phẩm, xuất)
- [ ] `packages/functions/src/helpers/bigquery.js` -- Wrapper client BigQuery (truy vấn, streaming insert, quản lý bảng)
- [ ] `packages/functions/src/handlers/analyticsSyncHandler.js` -- Function theo lịch để đồng bộ Firestore sang BigQuery hàng ngày

### 4.2 Frontend phân tích

- [ ] `packages/assets/src/pages/AnalyticsPage.jsx` -- Trang bảng điều khiển phân tích với bộ chọn khoảng ngày và biểu đồ
- [ ] `packages/assets/src/components/analytics/OverviewMetrics.jsx` -- Thẻ chỉ số tổng quan (tổng chỉnh sửa, tỷ lệ giữ chân, doanh thu upsell, tiết kiệm)
- [ ] `packages/assets/src/components/analytics/EditsChart.jsx` -- Biểu đồ đường/cột của chỉnh sửa theo thời gian (hàng ngày/hàng tuần)
- [ ] `packages/assets/src/components/analytics/EditTypeBreakdown.jsx` -- Biểu đồ tròn/donut của chỉnh sửa theo loại
- [ ] `packages/assets/src/components/analytics/TopEditedProducts.jsx` -- Bảng các sản phẩm được chỉnh sửa nhiều nhất
- [ ] `packages/assets/src/components/analytics/ExportButton.jsx` -- Nút kích hoạt xuất CSV
- [ ] `packages/assets/src/hooks/useAnalytics.js` -- Lấy dữ liệu phân tích với tham số khoảng ngày

### 4.3 P1: Luồng giữ chân khi hủy đơn

- [ ] `packages/functions/src/services/retentionService.js` -- Logic giữ chân (khớp lý do với ưu đãi, áp dụng giảm giá/hoán đổi, theo dõi kết quả)
- [ ] `packages/functions/src/handlers/storefrontRetentionHandler.js` -- API storefront cho giữ chân (lấy ưu đãi theo lý do, áp dụng ưu đãi giữ chân)
- [ ] `packages/scripttag/src/components/RetentionFlow.jsx` -- Giao diện giữ chân phía khách hàng (bộ chọn lý do, thẻ ưu đãi, chấp nhận/từ chối)
- [ ] `packages/assets/src/components/settings/RetentionSettings.jsx` -- Cấu hình ưu đãi giữ chân phía merchant (ánh xạ lý do-ưu đãi)

### 4.4 P1: Upsell sau mua hàng

- [ ] `packages/functions/src/services/upsellService.js` -- Engine gợi ý upsell (khớp quy tắc, lọc còn hàng, xếp hạng theo ưu tiên)
- [ ] `packages/functions/src/handlers/adminUpsellHandler.js` -- CRUD admin cho ưu đãi upsell
- [ ] `packages/scripttag/src/components/UpsellSection.jsx` -- Hiển thị upsell phía khách hàng (thẻ sản phẩm với nút thêm vào đơn hàng)
- [ ] `packages/assets/src/pages/UpsellOffersPage.jsx` -- Trang quản lý ưu đãi upsell admin
- [ ] `packages/assets/src/components/upsell/CreateOfferModal.jsx` -- Form tạo ưu đãi upsell mới
- [ ] `packages/assets/src/components/upsell/OfferPerformance.jsx` -- Chỉ số hiệu suất ưu đãi upsell (lượt hiển thị, chuyển đổi, doanh thu)
- [ ] `packages/assets/src/hooks/useUpsellOffers.js` -- CRUD ưu đãi upsell qua admin API

### 4.5 P1: Hoàn tiền bằng tín dụng cửa hàng

- [ ] `packages/functions/src/services/storeCreditService.js` -- Logic tín dụng cửa hàng (tạo thẻ quà tặng Shopify, tính thưởng, gửi mã qua email)
- [ ] `packages/scripttag/src/components/RefundChoicePicker.jsx` -- Giao diện khách hàng chọn giữa hoàn tiền và tín dụng cửa hàng

### 4.6 P1: Xác thực địa chỉ Google

- [ ] `packages/functions/src/services/addressValidationService.js` -- Tích hợp API xác thực địa chỉ Google (xác thực, gợi ý, tự động hoàn thành)
- [ ] `packages/functions/src/helpers/googleMaps.js` -- Wrapper client API Google Maps
- [ ] `packages/scripttag/src/components/AddressAutocomplete.jsx` -- Component input tự động hoàn thành sử dụng Google Places
- [ ] `packages/scripttag/src/components/AddressSuggestion.jsx` -- Component gợi ý "Bạn có phải ý là?"

### 4.7 P1: Tích hợp Shopify Flow

- [ ] `packages/functions/src/services/shopifyFlowService.js` -- Bộ gửi trigger Shopify Flow (gửi sự kiện trigger cho chỉnh sửa/hủy)
- [ ] `shopify.app.toml` -- Thêm định nghĩa trigger Flow (order_edited, order_cancelled với schema payload)

### 4.8 P1: Hỗ trợ đa ngôn ngữ

- [ ] `extensions/theme-extension/locales/fr.json` -- Bản dịch tiếng Pháp
- [ ] `extensions/theme-extension/locales/de.json` -- Bản dịch tiếng Đức
- [ ] `extensions/theme-extension/locales/es.json` -- Bản dịch tiếng Tây Ban Nha
- [ ] `extensions/theme-extension/locales/pt-BR.json` -- Bản dịch tiếng Bồ Đào Nha (Brazil)
- [ ] `extensions/theme-extension/locales/ja.json` -- Bản dịch tiếng Nhật
- [ ] `extensions/theme-extension/locales/ko.json` -- Bản dịch tiếng Hàn
- [ ] `extensions/theme-extension/locales/zh-CN.json` -- Bản dịch tiếng Trung Giản thể
- [ ] `extensions/theme-extension/locales/zh-TW.json` -- Bản dịch tiếng Trung Phồn thể
- [ ] `extensions/theme-extension/locales/it.json` -- Bản dịch tiếng Ý
- [ ] `packages/scripttag/src/utils/i18n.js` -- Tiện ích i18n cho trang chỉnh sửa storefront (phát hiện ngôn ngữ, tra cứu chuỗi, fallback)
- [ ] `packages/scripttag/src/locales/en.json` -- Chuỗi tiếng Anh cho trang chỉnh sửa
- [ ] `packages/scripttag/src/locales/fr.json` -- Chuỗi tiếng Pháp cho trang chỉnh sửa (lặp lại cho mỗi ngôn ngữ)

### 4.9 Xử lý lỗi & Giám sát

- [ ] `packages/functions/src/middleware/errorHandler.js` -- Middleware xử lý lỗi toàn cục (bắt, ghi log, định dạng phản hồi)
- [ ] `packages/functions/src/helpers/logger.js` -- Hàm hỗ trợ ghi log có cấu trúc (tương thích Cloud Logging, correlation IDs)
- [ ] `packages/functions/src/helpers/monitoring.js` -- Chỉ số giám sát Cloud tùy chỉnh (độ trễ chỉnh sửa, tỷ lệ lỗi, sử dụng)

### 4.10 Kiểm thử

- [ ] `packages/functions/test/services/orderEditService.test.js` -- Unit tests cho service chỉnh sửa đơn hàng (luồng thành công, trường hợp biên, xử lý lỗi)
- [ ] `packages/functions/test/services/editEligibilityService.test.js` -- Unit tests cho kiểm tra đủ điều kiện chỉnh sửa
- [ ] `packages/functions/test/services/cancellationService.test.js` -- Unit tests cho luồng hủy đơn
- [ ] `packages/functions/test/services/editRuleEngine.test.js` -- Unit tests cho đánh giá quy tắc
- [ ] `packages/functions/test/services/priceDiffService.test.js` -- Unit tests cho tính chênh lệch giá
- [ ] `packages/functions/test/handlers/webhookHandler.test.js` -- Unit tests cho xác minh HMAC webhook và điều hướng
- [ ] `packages/functions/test/middleware/auth.test.js` -- Unit tests cho middleware xác thực (token hợp lệ, hết hạn, thiếu)
- [ ] `packages/functions/test/repositories/orderRepository.test.js` -- Integration tests cho order repository với Firestore emulator
- [ ] `packages/functions/test/integration/editFlow.test.js` -- Integration test cho luồng chỉnh sửa đầy đủ (bắt đầu -> xác thực -> commit)
- [ ] `packages/functions/test/integration/cancelFlow.test.js` -- Integration test cho luồng hủy đơn đầy đủ

### 4.11 Triển khai & App Store

- [ ] `.github/workflows/deploy.yml` -- Pipeline CI/CD (lint, test, build, triển khai lên Firebase)
- [ ] `.github/workflows/test.yml` -- Pipeline test PR (lint, unit tests, integration tests với emulators)
- [ ] `packages/functions/.eslintrc.js` -- Cấu hình ESLint cho backend (tiêu chuẩn Avada)
- [ ] `packages/assets/.eslintrc.js` -- Cấu hình ESLint cho frontend (React + Polaris)

---

## Tổng kết số lượng file

| Giai đoạn | Số file | Mô tả |
|-----------|---------|-------|
| Giai đoạn 1: Nền tảng | ~35 | Thiết lập dự án, xác thực, repositories, kiểu dữ liệu |
| Giai đoạn 2: Backend cốt lõi | ~25 | Engine chỉnh sửa, webhooks, APIs, thông báo |
| Giai đoạn 3: Frontend | ~55 | Trang admin, widget storefront, trang chỉnh sửa khách hàng |
| Giai đoạn 4: Hoàn thiện | ~40 | Phân tích, tính năng P1, kiểm thử, triển khai |
| **Tổng cộng** | **~155** | |

---

## Thứ tự phụ thuộc

Việc triển khai nên tuân theo thứ tự này trong mỗi giai đoạn:

### Giai đoạn 1
1. Khởi tạo dự án (1.1)
2. Định nghĩa kiểu & Hằng số (1.6)
3. Mã hóa & hàm hỗ trợ (1.2 - crypto, tokenGenerator, shopify)
4. Repositories (1.4)
5. Middleware xác thực (1.2 - auth, webhookAuth, storefrontAuth)
6. OAuth & Thanh toán (1.3)
7. Hạ tầng webhook (1.7)
8. Các index Firestore (1.5)

### Giai đoạn 2
1. Đồng bộ đơn hàng & cửa sổ chỉnh sửa (2.1)
2. Đủ điều kiện chỉnh sửa & engine quy tắc (2.2 - eligibility, rules, validation)
3. Wrapper chỉnh sửa đơn hàng Shopify (2.2 - shopifyOrderEditService)
4. Service chỉnh sửa cốt lõi (2.2 - orderEditService, priceDiffService, addressEditService, inventoryService)
5. Hủy đơn & hoàn tiền (2.3)
6. Các handler API - storefront (2.4)
7. Các handler API - admin (2.5)
8. Router & điểm vào (2.6)
9. Thông báo (2.7)
10. Theo dõi sử dụng (2.8)

### Giai đoạn 3
1. Shell ứng dụng & điều hướng (3.1)
2. Hooks (3.2-3.8 hooks trước)
3. Trang bảng điều khiển (3.2)
4. Trang cài đặt (3.5)
5. Trang đơn hàng (3.3)
6. Chi tiết đơn hàng & chỉnh sửa phía merchant (3.4)
7. Trang quy tắc chỉnh sửa (3.6)
8. Trang gói đăng ký (3.7)
9. Hướng dẫn ban đầu (3.8)
10. Widget theme extension (3.9)
11. Trang chỉnh sửa phía khách hàng (3.10)
12. Trình xử lý app proxy (3.11)

### Giai đoạn 4
1. Backend phân tích (4.1)
2. Frontend phân tích (4.2)
3. Các tính năng P1 song song (4.3-4.8)
4. Xử lý lỗi & giám sát (4.9)
5. Kiểm thử (4.10)
6. Triển khai (4.11)

---

*Kết thúc Danh sách kiểm tra triển khai*
