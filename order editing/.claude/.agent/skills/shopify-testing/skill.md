# Shopify App Browser Testing Skill

Skill dùng để truy cập và test app LUNA Affiliate trên Shopify store thật bằng Playwright MCP.

## QUAN TRỌNG

- Credentials lưu tại `.claude/store-credentials.local.json` (file local, không commit lên git)
- Khi Roger yêu cầu test → đọc file credentials → tự login và test
- File `.gitignore` đã có rule `*.local.json` để tránh commit nhầm

## Store Information

- **Email:** thanghai450@gmail.com
- **Password:** avada@123
- **Login method:** Google Sign-in (via Shopify login)

## Quy trình truy cập app

### Bước 1: Login vào Shopify

```
1. Navigate: https://accounts.shopify.com/lookup
2. Nhập email: thanghai450@gmail.com → Enter
3. Trang chuyển sang Google Sign-in
4. Chọn account "thanghai" (nếu hiện account chooser)
   HOẶC nhập password nếu Google yêu cầu
5. Tự động redirect về Shopify Account
```

### Bước 2: Truy cập app

```
Navigate: https://admin.shopify.com/store/ag-tunght-aff-stg/apps/luna-affiliate-staging
Wait: 10s cho app load (embedded app trong iframe)
```

### Bước 3: Navigate giữa các trang

Vì sidebar links trong embedded app bị disabled, phải **navigate bằng URL trực tiếp**:

| Trang | URL |
|-------|-----|
| Dashboard | `/apps/luna-affiliate-staging/embed` |
| Programs | `/apps/luna-affiliate-staging/embed/programs` |
| Affiliates | `/apps/luna-affiliate-staging/embed/affiliates` |
| Conversions | `/apps/luna-affiliate-staging/embed/conversions` |
| Payouts | `/apps/luna-affiliate-staging/embed/payouts` |
| Settings | `/apps/luna-affiliate-staging/embed/settings` |
| Dev Zone | `/apps/luna-affiliate-staging/embed/dev_zone` |

**Base URL:** `https://admin.shopify.com/store/ag-tunght-aff-stg`

## Lưu ý quan trọng

### Loading time
- App load mất ~10s mỗi trang → luôn `wait_for({ time: 10 })` sau khi navigate
- Page title trống khi đang load → đợi title có chữ "Shopify" mới snapshot

### Browser session
- Nếu Chrome bị đóng/kill → phải login lại từ đầu
- `browser_close` sẽ mất session → tránh gọi trừ khi cần thiết
- Nếu lỗi "Browser is already in use" → cần `browser_close` rồi navigate lại

### Embedded app (iframe)
- App content nằm trong iframe → snapshot sẽ thấy cả Shopify Admin + app content
- Các ref trong iframe có prefix `f{N}e` (vd: `f9e13`, `f10e17`)
- Sidebar links có attribute `disabled` → KHÔNG click được, dùng URL navigate

### Screenshot
- Lưu vào `documents/roger/app-review/` hoặc `documents/roger/app-interface/`
- Dùng `fullPage: true` để chụp toàn bộ
- Đặt tên file có ý nghĩa: `{số}-{tên-trang}.png`

## Code mẫu: Full login + access flow

```javascript
// 1. Login
browser_navigate({ url: "https://accounts.shopify.com/lookup" })
browser_type({ element: "Email", ref: "e20", text: "thanghai450@gmail.com", submit: true })
// → Google Sign-in
browser_click({ element: "thanghai account", ref: "..." }) // chọn account
// → Redirect về Shopify

// 2. Access app
browser_navigate({ url: "https://admin.shopify.com/store/ag-tunght-aff-stg/apps/luna-affiliate-staging" })
browser_wait_for({ time: 10 })

// 3. Snapshot app content
browser_snapshot({})

// 4. Screenshot
browser_take_screenshot({ fullPage: true, filename: "app-dashboard.png" })

// 5. Navigate to Programs
browser_navigate({ url: "https://admin.shopify.com/store/ag-tunght-aff-stg/apps/luna-affiliate-staging/embed/programs" })
browser_wait_for({ time: 10 })
browser_snapshot({})
```

## Shopify Admin URLs (không cần app)

| Purpose | URL |
|---------|-----|
| Admin Home | `https://admin.shopify.com/store/ag-tunght-aff-stg` |
| Orders | `.../store/ag-tunght-aff-stg/orders` |
| Products | `.../store/ag-tunght-aff-stg/products` |
| Customers | `.../store/ag-tunght-aff-stg/customers` |
| Theme Editor | `.../store/ag-tunght-aff-stg/themes` |
| Settings | `.../store/ag-tunght-aff-stg/settings` |

## Affiliate Portal

### Portal Information

- **Base URL:** `https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg`
- **Shop Handle:** `ag-tunght-aff-stg`

### Portal Credentials (Affiliate Account)

- **Email:** thanghai450@gmail.com
- **Password:** ib.DtmtLgW(c

### Portal URLs

| Trang | URL |
|-------|-----|
| Login | `https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg/login` |
| Register | `https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg/register` |
| Dashboard | `https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg` |
| Conversions | `https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg/conversions` |
| Payouts | `https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg/payouts` |
| Profile | `https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg/profile` |

### Quy trình login Portal

```
1. Navigate: https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg/login
2. Nhập email: thanghai450@gmail.com
3. Nhập password: ib.DtmtLgW(c
4. Click "Sign In"
5. Redirect về Dashboard
```

### Code mẫu: Portal login flow

```javascript
// 1. Navigate to login
browser_navigate({ url: "https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg/login" })
browser_wait_for({ time: 5 })

// 2. Fill login form
browser_snapshot({}) // tìm ref của email & password inputs
browser_fill({ element: "Email", ref: "...", text: "thanghai450@gmail.com" })
browser_fill({ element: "Password", ref: "...", text: "ib.DtmtLgW(c" })
browser_click({ element: "Sign In", ref: "..." })
browser_wait_for({ time: 5 })

// 3. Now on Dashboard - navigate to other pages
browser_navigate({ url: "https://luna-affiliate-staging.firebaseapp.com/portal/ag-tunght-aff-stg/conversions" })
browser_wait_for({ time: 5 })
browser_snapshot({})
```

## Storefront URLs

| Purpose | URL |
|---------|-----|
| Homepage | `https://ag-tunght-aff-stg.myshopify.com` |
| All Products | `https://ag-tunght-aff-stg.myshopify.com/collections/all` |
| Cart | `https://ag-tunght-aff-stg.myshopify.com/cart` |

## Testing Workflows

### Review UX toàn bộ app
1. Login → access app
2. Navigate lần lượt qua từng trang (dùng URL)
3. Mỗi trang: `wait 10s` → `snapshot` → `screenshot`
4. Ghi nhận issues vào report
5. Lưu report: `documents/roger/app-review/`

### Test 1 tính năng cụ thể
1. Login → access app
2. Navigate đến trang liên quan
3. Thao tác (click, fill form, submit)
4. Verify kết quả (snapshot, screenshot)
5. Check console errors: `browser_console_messages`

### Test affiliate flow (storefront)
1. Mở storefront với referral link: `https://ag-tunght-aff-stg.myshopify.com?ref={code}`
2. Browse products → Add to cart → Checkout
3. Verify conversion tracking trong app admin

## Debugging

```javascript
// Check console errors
browser_console_messages({ level: "error" })

// Check network requests
browser_network_requests({})

// Take screenshot for visual verification
browser_take_screenshot({ fullPage: true })

// Check Firebase logs (backend)
// grep -i "error" firebase-debug.log | tail -50
```
