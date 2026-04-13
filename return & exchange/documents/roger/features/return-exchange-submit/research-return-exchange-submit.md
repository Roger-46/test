# Research: Shopify App Store Submission — Return & Exchange App

**Ngay**: 13/04/2026
**Tac gia**: Roger
**Muc tieu**: Nghien cuu yeu cau submit app len Shopify App Store, tranh bi reject.

---

## 1. Yeu cau ky thuat bat buoc (Mandatory Technical Requirements)

Shopify co danh sach yeu cau ky thuat **bat buoc** — thieu bat ky muc nao se bi reject ngay:

### 1.1. GDPR Compliance (Bat buoc 100%)

| Webhook | Endpoint | Hanh dong |
|---------|----------|-----------|
| `customers/data_request` | `/webhooks/gdpr/data-request` | Tra ve JSON chua tat ca data cua customer ma app luu tru (return requests, refund history) |
| `customers/redact` | `/webhooks/gdpr/customers-redact` | Xoa/an danh hoa tat ca PII cua customer (ten, email, address trong return records) |
| `shop/redact` | `/webhooks/gdpr/shop-redact` | Xoa **toan bo** data cua shop sau 48h ke tu uninstall |

**Luu y**: Shopify reviewer se trigger thu cac webhook nay. Neu return 4xx/5xx -> reject.

### 1.2. App Uninstall Cleanup

Khi merchant uninstall app (`app/uninstalled` webhook):
- Xoa theme extension blocks (customer return portal)
- Xoa metafields app tao ra (return settings, return policies)
- Xoa script tags (neu co)
- **KHONG** xoa data ngay — giu 48h cho GDPR `shop/redact`
- Revoke access token

### 1.3. Webhook Security

- **HMAC verification** tren TAT CA webhook endpoints
- Shopify gui header `X-Shopify-Hmac-Sha256` — app phai verify bang shared secret
- Thieu HMAC verification = reject

### 1.4. OAuth & Session Management

- Implement dung OAuth flow (authorization code grant)
- Access token phai encrypted at rest
- Session token validation cho embedded app
- Khong hardcode API keys/secrets

### 1.5. Performance (Storefront)

- Theme extension khong duoc giam qua **10 diem Lighthouse**
- **LCP < 2.5s**, **INP < 200ms**, **CLS < 0.1**
- Lazy load resources, khong block render
- Return portal page (App Proxy) phai load nhanh

### 1.6. Idempotency

- Moi mutation (create return, process refund, restock) phai co idempotency key
- Khong duoc tao duplicate refunds cho customer
- Shopify reviewer se test double-click, network retry

### 1.7. Returns API Sync Requirements (§5.12 Built for Shopify)

App **phai** dong bo returns ve Shopify Admin thong qua GraphQL Admin API. Returns chi ton tai trong app database ma khong hien thi trong Shopify Admin -> reject.

| API Mutation | Khi nao goi | Muc dich |
|-------------|-------------|----------|
| `returnCreate` | Customer submit return request | Tao return trong Shopify Admin |
| `refundCreate` | Merchant approve refund | Process refund qua Shopify, khong xu ly ngoai |
| `returnClose` | Return hoan tat (refund + restock done) | Dong return trong Shopify |
| `returnCancel` | Merchant reject return request | Huy return trong Shopify |
| `reverseFulfillmentOrderDispose` | Merchant approve restock | Restock items ve inventory qua Shopify |

**Flow bat buoc:**

```
Customer submit return → app goi returnCreate → Shopify Admin co return
    ↓
Merchant approve → app goi refundCreate → Shopify process refund
    ↓
Restock needed? → app goi reverseFulfillmentOrderDispose → inventory updated
    ↓
Return done → app goi returnClose → Shopify hien thi return completed
```

**Luu y quan trong:**
- Exchange line items (swap san pham) **KHONG** can cho Submit version — chi can return + refund
- Moi return trong app **PHAI** co tuong ung trong Shopify Admin → Orders → Returns
- Reviewer se kiem tra: tao return trong app → vao Shopify Admin → co thay return khong?

---

## 2. Top ly do bi reject (Common Rejection Reasons)

Dua tren Shopify Partner docs, forum reports, va kinh nghiem:

### Reject #1: Thieu GDPR webhooks
- **Ty le**: ~30% app bi reject vi ly do nay
- **Fix**: Implement du 3 GDPR endpoints, test ky truoc submit
- **Test**: Dung Shopify CLI `shopify app webhook trigger` de test

### Reject #2: App khong co gia tri ro rang (No clear value)
- Shopify reviewer mo app → khong hieu app lam gi → reject
- **Fix**: Onboarding flow ro rang, dashboard co data, video walkthrough
- Demo store phai co sample data (fulfilled orders de test return)

### Reject #3: Khong cleanup khi uninstall
- Merchant uninstall → app van inject code/widget vao store → reject
- **Fix**: Handle `app/uninstalled` webhook, cleanup theme blocks

### Reject #4: Loi UI/UX co ban
- Broken links, empty states khong handle, loi console
- Mobile khong responsive
- **Fix**: Test toan bo flow tren mobile + desktop, handle empty states

### Reject #5: Thieu Privacy Policy / Terms of Service
- App listing phai co link Privacy Policy + ToS
- **Fix**: Tao 2 trang tren website, link vao app listing

### Reject #6: App listing thieu thong tin
- Can: description ro rang, 4-8 screenshots, app icon
- Screenshots phai dung kich thuoc (1600x900 hoac 1200x675)
- **Fix**: Chuan bi truoc, khong de den phut cuoi

### Reject #7: Performance issues tren storefront
- Return portal widget/extension lam cham storefront
- **Fix**: Bundle size nho, lazy load, khong dung heavy libraries

### Reject #8: Khong handle error states
- Reviewer se test edge cases: unfulfilled order (chua du dieu kien return), expired return window, network error
- **Fix**: Handle tat ca error states voi message ro rang

### Reject #9: Returns khong sync ve Shopify
- Return chi ton tai trong app database ma **KHONG** hien thi trong Shopify Admin Orders → reject
- Reviewer se: tao return trong app → vao Shopify Admin → kiem tra Orders → Returns tab
- **Fix**: Moi return PHAI goi `returnCreate` API, moi refund PHAI goi `refundCreate` API
- Return status trong app phai match voi Shopify Admin (approved, refunded, closed)

### Reject #10: Refund khong thong qua Shopify API
- App tu xu ly refund (goi Stripe/PayPal truc tiep) ma khong goi `refundCreate` qua Shopify → reject
- Shopify yeu cau: **TAT CA** refunds phai di qua Shopify API de merchant thay trong Admin
- **Fix**: Luon dung `refundCreate` mutation — Shopify se tu dong goi payment gateway

---

## 3. Quy trinh review cua Shopify (What Reviewers Check)

### 3.1. Review Flow

```
Submit app → Auto-check (GDPR, OAuth) → Queue → Manual review (5-10 ngay)
    ↓ fail                                           ↓
  Instant reject                              Reviewer test:
                                              1. Install app
                                              2. Check onboarding
                                              3. Test core features (return flow)
                                              4. Test edge cases
                                              5. Check storefront impact
                                              6. Verify returns in Shopify Admin
                                              7. Uninstall → verify cleanup
                                              8. Approve / Request changes
```

### 3.2. Reviewer checklist (nhung gi ho kiem tra)

| Buoc | Reviewer lam gi | Chung ta can |
|------|-----------------|--------------|
| 1 | Cai app tren dev store | OAuth flow hoat dong |
| 2 | Mo app lan dau | Onboarding hien, huong dan ro rang |
| 3 | Hoan tat onboarding | Settings luu dung (return window, return reasons) |
| 4 | Tao test order + fulfill it | Demo store co san pham, order da fulfilled |
| 5 | Vao customer portal, submit return request | Portal hoat dong: lookup order → chon items → chon reason → confirm |
| 6 | Vao admin, xem return request | Admin hien return moi, detail day du |
| 7 | Approve return + process refund | Approve flow hoat dong, refund qua Shopify API |
| 8 | Check return trong Shopify Admin → Order → Returns | Return PHAI hien trong Shopify Admin (khong chi trong app) |
| 9 | Kiem tra mobile | Responsive, khong bi vo layout (ca portal lan admin) |
| 10 | Check performance | Lighthouse score, bundle size, portal load time |
| 11 | Uninstall app | Portal bien mat, theme blocks cleanup |
| 12 | Check GDPR | Trigger GDPR webhooks, verify response 200 |

### 3.3. Timeline review

- **Auto-check**: Ngay lap tuc (vai phut)
- **Manual review queue**: 5-10 ngay lam viec
- **Neu bi request changes**: Fix + resubmit → them 3-5 ngay
- **Best case**: 7 ngay tu submit den publish
- **Worst case**: 3-4 tuan neu bi reject 1-2 lan

---

## 4. Feature set toi thieu de pass review

### Nguyen tac: "It nhung hoat dong hoan hao"

Shopify khong yeu cau app phai nhieu feature — ho yeu cau app phai:
1. **Co gia tri ro rang** cho merchant
2. **Hoat dong end-to-end** khong loi
3. **Comply GDPR** + security
4. **Khong anh huong** storefront performance
5. **Sync returns ve Shopify Admin** (dac biet cho returns app)

### Feature set de xuat (Submit version)

| # | Feature | Bat buoc? | Ly do |
|---|---------|-----------|-------|
| 1 | Customer return portal (lookup → items → reason → confirm) | Core | Gia tri chinh cua app — customer tu submit return |
| 2 | Admin return request list | Core | Merchant can xem tat ca returns |
| 3 | Admin return detail + approve/reject | Core | Merchant can xu ly return |
| 4 | Admin process refund | Core | Hoan tat return flow — refund qua Shopify API |
| 5 | Admin return settings (return window + reasons) | Core | Merchant can control chinh sach return |
| 6 | Shopify Returns API sync | Bat buoc | returnCreate, refundCreate, returnClose, returnCancel |
| 7 | GDPR webhooks | Bat buoc | Reject neu thieu |
| 8 | Uninstall cleanup | Bat buoc | Reject neu thieu |
| 9 | HMAC webhook verification | Bat buoc | Reject neu thieu |
| 10 | Onboarding (2-3 steps) | Nen co | Reviewer check first-time UX |

### Nhung gi KHONG can cho submit

| Feature | Ly do bo |
|---------|----------|
| Store credit (refund to credit) | Khong anh huong core value, them sau |
| Exchange (swap san pham) | Complex feature, khong can cho submit |
| Analytics/Charts | Nice-to-have, khong bat buoc |
| Email notifications | Khong anh huong core value |
| Billing/Pricing | FREE app = khong can |
| Branding/Customization portal | Default styling du cho review |
| Return shipping labels | Integration phuc tap, them sau |
| Auto-approve rules | Nice-to-have, manual approve du |

---

## 5. Timeline uoc tinh (Submit)

### Gia dinh
- 1 dev fulltime
- Backend + Frontend
- Da co monorepo setup, Firebase config

### Timeline chi tiet

| Tuan | Cong viec | Deliverable |
|------|-----------|-------------|
| **Tuan 1** | Foundation: OAuth, auth, Firestore repos, shop install/uninstall, return settings schema | Backend skeleton chay duoc |
| **Tuan 2** | Return engine: returnCreate API, refundCreate, returnClose/Cancel, reverseFulfillmentOrderDispose, eligibility check (fulfilled + within window) | Core APIs hoat dong, sync ve Shopify Admin |
| **Tuan 3** | Storefront: theme extension widget (return button), return portal page (App Proxy): order lookup → item selection → reason → confirmation | Customer flow end-to-end |
| **Tuan 4** | Admin: return list, return detail (approve/reject/refund), settings page, onboarding (Polaris) | Merchant flow done |
| **Tuan 5** | GDPR, uninstall cleanup, error handling, edge cases (unfulfilled order, expired window, partial return), testing | App Store ready |
| **Tuan 6** | App listing (screenshots, video, description), demo store setup (fulfilled orders), final QA → **SUBMIT** | Submitted |

**Tong: 6 tuan**

### Tips giam thoi gian
- Dung Shopify App template (OAuth da co)
- Polaris components (khong custom UI)
- Firebase emulators de test local
- Chuan bi app listing song song voi dev (tuan 4-5)
- Demo store: tao 5-10 fulfilled orders truoc de test return flow

### Checklist truoc khi submit

- [ ] GDPR 3 webhooks hoat dong
- [ ] Uninstall cleanup hoat dong
- [ ] HMAC verification tren tat ca webhooks
- [ ] `returnCreate` sync ve Shopify Admin khi customer submit return
- [ ] `refundCreate` sync ve Shopify Admin khi merchant process refund
- [ ] `returnClose` goi khi return hoan tat
- [ ] `returnCancel` goi khi merchant reject return
- [ ] Return hien trong Shopify Admin → Orders → Returns tab
- [ ] Demo store co fulfilled orders + test returns
- [ ] Video walkthrough 3-5 phut (customer portal + admin flow)
- [ ] Screenshots 6-8 tam (desktop + mobile)
- [ ] Privacy Policy + Terms of Service links
- [ ] App description ro rang, khong spam keywords
- [ ] Test tren mobile (responsive) — ca portal lan admin
- [ ] Lighthouse score > 90 (storefront)
- [ ] Khong co console errors
- [ ] Empty states handled (no returns yet, no orders found)
- [ ] Error messages user-friendly (order not found, return window expired, already returned)
- [ ] Edge cases: unfulfilled order → show message, partial fulfillment → chi cho return fulfilled items

---

**Ket luan**: Submit version chi can 10 features (5 core + 5 mandatory/recommended). Dac biet quan trong: **moi return PHAI sync ve Shopify Admin** qua Returns API — day la diem khac biet lon so voi app thong thuong. Tap trung lam it nhung chat luong cao. FREE app strategy giup bo qua billing complexity, tang kha nang pass review lan dau. Exchange feature se bo sung sau khi app da duoc approve.
