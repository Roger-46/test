# Research: Shopify App Store Submission — Order Editing App

**Ngày**: 08/04/2026
**Tác giả**: Roger
**Mục tiêu**: Nghiên cứu yêu cầu submit app lên Shopify App Store, tránh bị reject.

---

## 1. Yêu cầu kỹ thuật bắt buộc (Mandatory Technical Requirements)

Shopify có danh sách yêu cầu kỹ thuật **bắt buộc** — thiếu bất kỳ mục nào sẽ bị reject ngay:

### 1.1. GDPR Compliance (Bắt buộc 100%)

| Webhook | Endpoint | Hành động |
|---------|----------|-----------|
| `customers/data_request` | `/webhooks/gdpr/data-request` | Trả về JSON chứa tất cả data của customer mà app lưu trữ |
| `customers/redact` | `/webhooks/gdpr/customers-redact` | Xóa/ẩn danh hóa tất cả PII của customer |
| `shop/redact` | `/webhooks/gdpr/shop-redact` | Xóa **toàn bộ** data của shop sau 48h kể từ uninstall |

**Lưu ý**: Shopify reviewer sẽ trigger thử các webhook này. Nếu return 4xx/5xx → reject.

### 1.2. App Uninstall Cleanup

Khi merchant uninstall app (`app/uninstalled` webhook):
- Xóa theme extension blocks (nếu có)
- Xóa metafields app tạo ra
- Xóa script tags (nếu có)
- **KHÔNG** xóa data ngay — giữ 48h cho GDPR `shop/redact`
- Revoke access token

### 1.3. Webhook Security

- **HMAC verification** trên TẤT CẢ webhook endpoints
- Shopify gửi header `X-Shopify-Hmac-Sha256` — app phải verify bằng shared secret
- Thiếu HMAC verification = reject

### 1.4. OAuth & Session Management

- Implement đúng OAuth flow (authorization code grant)
- Access token phải encrypted at rest
- Session token validation cho embedded app
- Không hardcode API keys/secrets

### 1.5. Performance (Storefront)

- Theme extension không được giảm quá **10 điểm Lighthouse**
- **LCP < 2.5s**, **INP < 200ms**, **CLS < 0.1**
- Lazy load resources, không block render

### 1.6. Idempotency

- Mọi mutation (edit order, cancel, refund) phải có idempotency key
- Không được tạo duplicate charges cho customer
- Shopify reviewer sẽ test double-click, network retry

---

## 2. Top lý do bị reject (Common Rejection Reasons)

Dựa trên Shopify Partner docs, forum reports, và kinh nghiệm:

### Reject #1: Thiếu GDPR webhooks
- **Tỷ lệ**: ~30% app bị reject vì lý do này
- **Fix**: Implement đủ 3 GDPR endpoints, test kỹ trước submit
- **Test**: Dùng Shopify CLI `shopify app webhook trigger` để test

### Reject #2: App không có giá trị rõ ràng (No clear value)
- Shopify reviewer mở app → không hiểu app làm gì → reject
- **Fix**: Onboarding flow rõ ràng, dashboard có data, video walkthrough
- Demo store phải có sample data (không được trống)

### Reject #3: Không cleanup khi uninstall
- Merchant uninstall → app vẫn inject code/widget vào store → reject
- **Fix**: Handle `app/uninstalled` webhook, cleanup theme blocks

### Reject #4: Lỗi UI/UX cơ bản
- Broken links, empty states không handle, lỗi console
- Mobile không responsive
- **Fix**: Test toàn bộ flow trên mobile + desktop, handle empty states

### Reject #5: Thiếu Privacy Policy / Terms of Service
- App listing phải có link Privacy Policy + ToS
- **Fix**: Tạo 2 trang trên website, link vào app listing

### Reject #6: App listing thiếu thông tin
- Cần: description rõ ràng, 4-8 screenshots, app icon
- Screenshots phải đúng kích thước (1600x900 hoặc 1200x675)
- **Fix**: Chuẩn bị trước, không để đến phút cuối

### Reject #7: Performance issues trên storefront
- Widget/extension làm chậm storefront
- **Fix**: Bundle size nhỏ, lazy load, không dùng heavy libraries

### Reject #8: Không handle error states
- Reviewer sẽ test edge cases: expired order, fulfilled order, network error
- **Fix**: Handle tất cả error states với message rõ ràng

---

## 3. Quy trình review của Shopify (What Reviewers Check)

### 3.1. Review Flow

```
Submit app → Auto-check (GDPR, OAuth) → Queue → Manual review (5-10 ngày)
    ↓ fail                                           ↓
  Instant reject                              Reviewer test:
                                              1. Install app
                                              2. Check onboarding
                                              3. Test core features
                                              4. Test edge cases
                                              5. Check storefront impact
                                              6. Uninstall → verify cleanup
                                              7. Approve / Request changes
```

### 3.2. Reviewer checklist (những gì họ kiểm tra)

| Bước | Reviewer làm gì | Chúng ta cần |
|------|-----------------|--------------|
| 1 | Cài app trên dev store | OAuth flow hoạt động |
| 2 | Mở app lần đầu | Onboarding hiện, hướng dẫn rõ ràng |
| 3 | Hoàn tất onboarding | Settings lưu đúng, widget enable |
| 4 | Tạo test order | Demo store có sản phẩm, checkout hoạt động |
| 5 | Vào Order Status Page | Widget hiện đúng, countdown chạy |
| 6 | Test edit address | Flow hoàn chỉnh, address update trên Shopify |
| 7 | Test swap variant | Picker hoạt động, price diff đúng |
| 8 | Test cancel order | Refund process, restock |
| 9 | Kiểm tra mobile | Responsive, không bị vỡ layout |
| 10 | Check performance | Lighthouse score, bundle size |
| 11 | Uninstall app | Widget biến mất, data cleanup |
| 12 | Check GDPR | Trigger GDPR webhooks |

### 3.3. Timeline review

- **Auto-check**: Ngay lập tức (vài phút)
- **Manual review queue**: 5-10 ngày làm việc
- **Nếu bị request changes**: Fix + resubmit → thêm 3-5 ngày
- **Best case**: 7 ngày từ submit đến publish
- **Worst case**: 3-4 tuần nếu bị reject 1-2 lần

---

## 4. Feature set tối thiểu để pass review

### Nguyên tắc: "Ít nhưng hoạt động hoàn hảo"

Shopify không yêu cầu app phải nhiều feature — họ yêu cầu app phải:
1. **Có giá trị rõ ràng** cho merchant
2. **Hoạt động end-to-end** không lỗi
3. **Comply GDPR** + security
4. **Không ảnh hưởng** storefront performance

### Feature set đề xuất (Submit version)

| # | Feature | Bắt buộc? | Lý do |
|---|---------|-----------|-------|
| 1 | Customer edit address | Core | Giá trị chính của app |
| 2 | Customer swap variant | Core | Giá trị chính của app |
| 3 | Customer change qty | Core | Đi kèm swap, dễ implement |
| 4 | Customer cancel order | Core | Use case phổ biến |
| 5 | Widget Order Status Page | Core | Entry point duy nhất |
| 6 | Admin Settings | Core | Merchant cần control |
| 7 | Admin Dashboard (basic) | Core | Reviewer cần thấy app có value |
| 8 | GDPR webhooks | Bắt buộc | Reject nếu thiếu |
| 9 | Uninstall cleanup | Bắt buộc | Reject nếu thiếu |
| 10 | Onboarding (2 steps) | Nên có | Reviewer check first-time UX |

### Những gì KHÔNG cần cho submit

| Feature | Lý do bỏ |
|---------|----------|
| Email notifications | Không ảnh hưởng core value |
| Analytics/Charts | Nice-to-have, không bắt buộc |
| Billing/Pricing | FREE app = không cần |
| Merchant editing | Merchant dùng Shopify Admin native |
| Orders list page | Dashboard recent activity đủ |
| Thank You Page widget | Order Status Page đủ |
| Upsell/Retention | Post-launch feature |

---

## 5. Timeline ước tính (Submit)

### Giả định
- 1 dev fulltime
- Backend + Frontend
- Đã có monorepo setup, Firebase config

### Timeline chi tiết

| Tuần | Công việc | Deliverable |
|------|-----------|-------------|
| **Tuần 1** | Foundation: OAuth, auth, Firestore repos, shop install/uninstall | Backend skeleton chạy được |
| **Tuần 2** | Edit engine: eligibility check, order edit API (address, swap, qty), cancel + refund | Core APIs hoạt động |
| **Tuần 3** | Storefront: theme extension widget, edit portal page (App Proxy) | Customer flow end-to-end |
| **Tuần 4** | Admin: dashboard, settings, onboarding (Polaris) | Merchant flow done |
| **Tuần 5** | GDPR, uninstall cleanup, error handling, edge cases, testing | App Store ready |
| **Tuần 6** | App listing (screenshots, video, description), demo store setup, final QA → **SUBMIT** | Submitted |

**Tổng: 6 tuần**

### Tips giảm thời gian
- Dùng Shopify App template (OAuth đã có)
- Polaris components (không custom UI)
- Firebase emulators để test local
- Chuẩn bị app listing song song với dev (tuần 4-5)

### Checklist trước khi submit

- [ ] GDPR 3 webhooks hoạt động
- [ ] Uninstall cleanup hoạt động
- [ ] HMAC verification trên tất cả webhooks
- [ ] Demo store có products + test orders
- [ ] Video walkthrough 3-5 phút
- [ ] Screenshots 6-8 tấm (desktop + mobile)
- [ ] Privacy Policy + Terms of Service links
- [ ] App description rõ ràng, không spam keywords
- [ ] Test trên mobile (responsive)
- [ ] Lighthouse score > 90 (storefront)
- [ ] Không có console errors
- [ ] Empty states handled
- [ ] Error messages user-friendly

---

**Kết luận**: Submit version chỉ cần 10 features (6 core + 4 mandatory). Tập trung làm ít nhưng chất lượng cao. FREE app strategy giúp bỏ qua billing complexity, tăng khả năng pass review lần đầu.
