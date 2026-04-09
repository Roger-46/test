# 01 - Yêu Cầu Shopify App Review

## Mục Tiêu

Submit bản app tối thiểu (Submission Version) lên Shopify App Store, pass review thành công trong lần đầu tiên. Bản này **KHÔNG PHẢI MVP** -- đây là bản xương sống (skeleton) có đủ tính năng cốt lõi để Shopify chấp nhận, đồng thời kiến trúc sẵn sàng để phát triển tiếp lên MVP mà không cần refactor lại.

---

## 1. Yêu Cầu Bắt Buộc Từ Shopify (Must Pass)

### 1.1 Yêu Cầu Kỹ Thuật

| # | Yêu cầu | Mô tả | Trạng thái |
|---|---------|-------|-----------|
| 1 | **OAuth hoạt động** | Flow cài đặt app phải hoàn chỉnh: install → authorize → callback → token exchange → redirect vào app | Bắt buộc |
| 2 | **Embedded App** | App phải chạy embedded trong Shopify Admin (không redirect ra ngoài) | Bắt buộc |
| 3 | **App Bridge** | Sử dụng @shopify/app-bridge-react cho navigation, modals, toasts | Bắt buộc |
| 4 | **Polaris UI** | Admin UI phải dùng Shopify Polaris components (không custom UI từ đầu) | Bắt buộc |
| 5 | **Webhook `app/uninstalled`** | Phải xử lý khi merchant gỡ app -- xóa access token, cleanup data | Bắt buộc |
| 6 | **HTTPS everywhere** | Tất cả endpoints phải HTTPS | Bắt buộc |
| 7 | **API version hiện tại** | Dùng API version mới nhất hoặc gần nhất (không dùng deprecated) | Bắt buộc |
| 8 | **Session token auth** | Dùng session token (JWT) cho embedded app, không dùng cookie-based auth | Bắt buộc |
| 9 | **Responsive design** | App phải hoạt động trên cả desktop và mobile admin | Bắt buộc |
| 10 | **Error handling** | Không có unhandled errors, blank screens, hoặc broken states | Bắt buộc |

### 1.2 Yêu Cầu Chức Năng

| # | Yêu cầu | Mô tả |
|---|---------|-------|
| 1 | **App phải thực sự hoạt động** | Tính năng chính phải work end-to-end, không phải mockup hay "coming soon" |
| 2 | **Giá trị rõ ràng** | Reviewer phải hiểu ngay app giải quyết vấn đề gì |
| 3 | **Onboarding flow** | Merchant mới phải biết cách sử dụng app (không cần phức tạp, nhưng rõ ràng) |
| 4 | **Settings hoạt động** | Các cài đặt phải lưu được và ảnh hưởng đến behavior |
| 5 | **Billing integration** | Nếu có paid plan, phải dùng Shopify App Billing API (không payment ngoài) |

### 1.3 Yêu Cầu App Listing

| # | Yêu cầu | Mô tả |
|---|---------|-------|
| 1 | **App name** | Rõ ràng, không misleading, không chứa "Shopify" |
| 2 | **App icon** | 1200x1200px, không chứa text, không copy logo khác |
| 3 | **Screenshots** | Ít nhất 3 screenshots thực tế (không mockup) của app đang chạy |
| 4 | **Description** | Mô tả rõ app làm gì, cho ai, giải quyết vấn đề gì |
| 5 | **Privacy policy URL** | Bắt buộc có privacy policy page |
| 6 | **Support email/URL** | Phải có cách liên hệ support |
| 7 | **Demo store** | Cung cấp demo store hoặc test credentials cho reviewer |
| 8 | **Pricing rõ ràng** | Nếu có paid plans, pricing phải transparent |

### 1.4 Yêu Cầu Bảo Mật

| # | Yêu cầu | Mô tả |
|---|---------|-------|
| 1 | **HMAC verification** | Verify tất cả webhooks và OAuth callbacks |
| 2 | **Token encryption** | Không lưu access token dạng plaintext |
| 3 | **Scope tối thiểu** | Chỉ request scopes thực sự cần dùng |
| 4 | **No data leakage** | Không expose data merchant này cho merchant khác |
| 5 | **GDPR compliance** | Xử lý data deletion requests (shop/redact, customers/redact, customers/data_request webhooks) |

---

## 2. Yêu Cầu Cho "Built for Shopify" Badge

> **Lưu ý:** Badge này không bắt buộc cho lần submit đầu. Tuy nhiên, kiến trúc bản Submit nên đáp ứng sẵn để sau này apply badge dễ dàng.

| # | Yêu cầu | Ưu tiên cho Submit |
|---|---------|-------------------|
| 1 | Dùng latest Shopify API version | Bắt buộc (làm luôn) |
| 2 | Dùng App Bridge đúng cách | Bắt buộc (làm luôn) |
| 3 | Dùng Polaris v12+ | Bắt buộc (làm luôn) |
| 4 | Xử lý tất cả mandatory webhooks | Bắt buộc (làm luôn) |
| 5 | Session token authentication | Bắt buộc (làm luôn) |
| 6 | Responsive trên mobile admin | Bắt buộc (làm luôn) |
| 7 | Không dùng deprecated APIs | Bắt buộc (làm luôn) |
| 8 | Performance tốt (load < 3s) | Nên làm |
| 9 | Accessibility (WCAG 2.1 AA) | Nên làm |
| 10 | Theme App Extension (không ScriptTag) | Nên làm |

**Kết luận:** Hầu hết yêu cầu Built for Shopify trùng với yêu cầu submit. Làm đúng từ đầu = apply badge sau không cần sửa gì.

---

## 3. Lý Do Shopify Reject Phổ Biến (Cần Tránh)

| # | Lý do reject | Cách tránh |
|---|-------------|-----------|
| 1 | **App không hoạt động khi review** | Test kỹ trên dev store, cung cấp demo store cho reviewer |
| 2 | **Blank screen / JavaScript errors** | Error boundary components, fallback UI |
| 3 | **OAuth flow lỗi** | Test install/uninstall/reinstall nhiều lần |
| 4 | **Không xử lý app/uninstalled webhook** | Implement từ ngày 1 |
| 5 | **UI không dùng Polaris** | Dùng 100% Polaris components cho admin |
| 6 | **Request scopes không cần thiết** | Chỉ request scopes thực sự dùng |
| 7 | **Pricing không rõ ràng** | Free plan rõ ràng, paid plan có trial |
| 8 | **Không có privacy policy** | Tạo trang privacy policy trước khi submit |
| 9 | **Screenshots không khớp thực tế** | Chụp từ app thật đang chạy |
| 10 | **Tính năng "coming soon"** | Không hiện features chưa hoạt động |

---

## 4. Checklist Trước Khi Submit

### Kỹ thuật
- [ ] OAuth install/callback hoạt động
- [ ] App embedded trong Shopify Admin
- [ ] Session token authentication
- [ ] Webhook `app/uninstalled` xử lý đúng
- [ ] GDPR webhooks (shop/redact, customers/redact, customers/data_request)
- [ ] HMAC verification cho webhooks
- [ ] Access token encrypted trong database
- [ ] API version hiện tại (2024-10 trở lên)
- [ ] Polaris v12+ cho tất cả admin UI
- [ ] App Bridge cho navigation/modals
- [ ] HTTPS trên tất cả endpoints
- [ ] Không có console errors trong browser
- [ ] Mobile responsive

### Chức năng
- [ ] Tính năng chính hoạt động end-to-end
- [ ] Settings lưu và apply đúng
- [ ] Onboarding/welcome screen cho merchant mới
- [ ] Error states được xử lý (không blank screen)
- [ ] Loading states cho async operations

### App Store Listing
- [ ] App name đã chọn
- [ ] App icon 1200x1200px
- [ ] Ít nhất 3 screenshots thực tế
- [ ] Description đầy đủ
- [ ] Privacy policy URL
- [ ] Support email
- [ ] Demo store cho reviewer
- [ ] Pricing tiers cấu hình xong

### Testing
- [ ] Test install trên dev store mới
- [ ] Test uninstall và reinstall
- [ ] Test trên cả desktop và mobile admin
- [ ] Test với store có 0 orders
- [ ] Test với store có orders thật

---

*Tài liệu này dựa trên Shopify App Store Review Guidelines và kinh nghiệm submit app thực tế.*
