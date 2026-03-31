# Kiến Trúc Kỹ Thuật
# Avada Order Editing

---

## 1. Lược Đồ Firestore

### Bộ sưu tập: `shops`

Cấu hình cửa hàng chính. Document ID = tên miền cửa hàng Shopify (ví dụ: `my-store.myshopify.com`).

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `shopId` | string | Có | Tên miền cửa hàng Shopify (giống doc ID) |
| `domain` | string | Có | Tên miền tùy chỉnh nếu đã cấu hình |
| `shopifyGid` | string | Có | GID cửa hàng Shopify (`gid://shopify/Shop/123`) |
| `accessToken` | string | Có | Token truy cập API Shopify đã mã hóa |
| `plan` | string | Có | `free \| starter \| growth \| pro \| business \| enterprise` |
| `status` | string | Có | `active \| inactive \| uninstalled` |
| `email` | string | Có | Email chủ cửa hàng |
| `name` | string | Có | Tên cửa hàng |
| `currency` | string | Có | Đơn vị tiền tệ cửa hàng (ISO 4217) |
| `timezone` | string | Có | Múi giờ IANA |
| `shopifyPlan` | string | Không | Tên gói Shopify (basic, shopify, advanced, plus) |
| `installedAt` | timestamp | Có | Thời điểm cài đặt ứng dụng |
| `uninstalledAt` | timestamp | Không | Thời điểm gỡ cài đặt ứng dụng |
| `onboardingCompleted` | boolean | Có | Trình hướng dẫn thiết lập đã hoàn tất chưa |
| `createdAt` | timestamp | Có | Thời gian tạo tài liệu |
| `updatedAt` | timestamp | Có | Thời gian cập nhật lần cuối |

**Chỉ mục:** Không có (chỉ truy vấn theo document ID).

---

### Bộ sưu tập: `editSettings`

Cấu hình hành vi chỉnh sửa theo từng cửa hàng. Mỗi cửa hàng một tài liệu. Document ID = `shopId`.

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `shopId` | string | Có | Tham chiếu đến bộ sưu tập shops |
| `timeWindowMinutes` | number | Có | Thời lượng cửa sổ chỉnh sửa tính bằng phút (mặc định: 120) |
| `timeWindowType` | string | Có | `minutes \| hours \| before_fulfillment` |
| `allowAddressEdit` | boolean | Có | Cho phép chỉnh sửa địa chỉ |
| `allowItemSwap` | boolean | Có | Cho phép hoán đổi biến thể |
| `allowQuantityChange` | boolean | Có | Cho phép thay đổi số lượng |
| `allowAddItem` | boolean | Có | Cho phép thêm sản phẩm mới |
| `allowRemoveItem` | boolean | Có | Cho phép xóa sản phẩm |
| `allowCancellation` | boolean | Có | Cho phép khách hàng hủy đơn |
| `maxEditsPerOrder` | number | Có | Số lần chỉnh sửa tối đa mỗi đơn hàng (mặc định: 5) |
| `notifyMerchantOnEdit` | boolean | Có | Gửi email cho người bán khi có chỉnh sửa |
| `notifyMerchantOnCancel` | boolean | Có | Gửi email cho người bán khi có hủy đơn |
| `notifyCustomerOnMerchantEdit` | boolean | Có | Thông báo cho khách hàng về chỉnh sửa của người bán |
| `merchantNotificationEmail` | string | Không | Email ghi đè cho thông báo người bán |
| `showOnOrderStatusPage` | boolean | Có | Hiển thị widget trên trang trạng thái đơn hàng |
| `showOnThankYouPage` | boolean | Có | Hiển thị widget trên trang cảm ơn |
| `widgetPrimaryColor` | string | Không | Mã hex màu chính tùy chỉnh |
| `widgetText` | object | Không | Ghi đè văn bản tùy chỉnh cho nhãn widget |
| `retentionEnabled` | boolean | Có | Bật luồng giữ chân khi hủy đơn |
| `retentionOffers` | array | Không | Mảng các đối tượng ưu đãi giữ chân |
| `upsellEnabled` | boolean | Có | Bật bán thêm sau mua hàng |
| `storeCreditEnabled` | boolean | Có | Bật tùy chọn hoàn tiền bằng tín dụng cửa hàng |
| `storeCreditBonusPercent` | number | Không | Phần trăm thưởng khi chọn tín dụng cửa hàng |
| `addressValidationEnabled` | boolean | Có | Bật Xác Thực Địa Chỉ Google |
| `createdAt` | timestamp | Có | Thời gian tạo tài liệu |
| `updatedAt` | timestamp | Có | Thời gian cập nhật lần cuối |

**Chỉ mục:** Không có (chỉ truy vấn theo document ID).

---

### Bộ sưu tập: `editRules`

Quy tắc chỉnh sửa theo sản phẩm hoặc bộ sưu tập. Bộ sưu tập con hoặc cấp cao nhất theo phạm vi shopId.

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `id` | string | Có | Document ID tự động tạo |
| `shopId` | string | Có | Tham chiếu đến bộ sưu tập shops |
| `ruleType` | string | Có | `product \| collection \| tag \| all` |
| `targetId` | string | Có | GID sản phẩm/bộ sưu tập Shopify, hoặc `*` cho tất cả |
| `targetTitle` | string | Không | Tên sản phẩm/bộ sưu tập để hiển thị |
| `allowSwap` | boolean | Có | Cho phép hoán đổi biến thể cho mục tiêu này |
| `allowQuantityChange` | boolean | Có | Cho phép thay đổi số lượng |
| `allowRemove` | boolean | Có | Cho phép xóa sản phẩm |
| `swapTargets` | array | Không | Giới hạn hoán đổi đến các GID biến thể cụ thể |
| `minQuantity` | number | Không | Số lượng tối thiểu cho phép |
| `maxQuantity` | number | Không | Số lượng tối đa cho phép |
| `active` | boolean | Có | Quy tắc có đang hoạt động hay không |
| `priority` | number | Có | Mức ưu tiên đánh giá quy tắc (cao hơn = kiểm tra trước) |
| `createdAt` | timestamp | Có | Thời gian tạo tài liệu |
| `updatedAt` | timestamp | Có | Thời gian cập nhật lần cuối |

**Chỉ mục:**
```
shopId ASC, active ASC, ruleType ASC
shopId ASC, targetId ASC
```

---

### Bộ sưu tập: `orders`

Dữ liệu đơn hàng đồng bộ từ Shopify. Theo dõi trạng thái cửa sổ chỉnh sửa.

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `id` | string | Có | Document ID tự động tạo |
| `shopId` | string | Có | Tham chiếu đến bộ sưu tập shops |
| `shopifyOrderId` | string | Có | GID đơn hàng Shopify (`gid://shopify/Order/123`) |
| `shopifyOrderNumber` | number | Có | Số đơn hàng dạng số |
| `orderNumber` | string | Có | Số đơn hàng hiển thị (`#1001`) |
| `customerEmail` | string | Không | Địa chỉ email khách hàng |
| `customerName` | string | Không | Họ tên đầy đủ khách hàng |
| `customerShopifyId` | string | Không | GID khách hàng Shopify |
| `financialStatus` | string | Có | `paid \| partially_refunded \| refunded \| pending` |
| `fulfillmentStatus` | string | Có | `unfulfilled \| partial \| fulfilled` |
| `editWindowStatus` | string | Có | `open \| closed \| expired` |
| `editWindowExpiresAt` | timestamp | Không | Thời điểm cửa sổ chỉnh sửa đóng |
| `editCount` | number | Có | Số lần chỉnh sửa đã áp dụng (mặc định: 0) |
| `cancelledViaApp` | boolean | Có | Đã hủy qua ứng dụng của chúng tôi hay chưa |
| `originalTotalPrice` | number | Có | Tổng đơn hàng gốc theo tiền tệ cửa hàng |
| `currentTotalPrice` | number | Có | Tổng hiện tại sau chỉnh sửa |
| `currency` | string | Có | Tiền tệ đơn hàng (ISO 4217) |
| `lineItems` | array | Có | Bản chụp rút gọn các mục hàng để hiển thị nhanh |
| `shippingAddress` | object | Không | Địa chỉ giao hàng hiện tại |
| `tags` | array | Không | Thẻ đơn hàng Shopify |
| `orderCreatedAt` | timestamp | Có | Thời gian tạo đơn hàng Shopify |
| `lastEditedAt` | timestamp | Không | Thời điểm chỉnh sửa lần cuối |
| `syncedAt` | timestamp | Có | Lần đồng bộ cuối từ Shopify |
| `createdAt` | timestamp | Có | Thời gian tạo tài liệu |
| `updatedAt` | timestamp | Có | Thời gian cập nhật lần cuối |

**Phần tử mảng `lineItems`:**
```json
{
  "shopifyLineItemId": "gid://shopify/LineItem/123",
  "variantId": "gid://shopify/ProductVariant/456",
  "productId": "gid://shopify/Product/789",
  "title": "Classic T-Shirt",
  "variantTitle": "Medium / Blue",
  "quantity": 2,
  "price": "25.00",
  "imageUrl": "https://cdn.shopify.com/..."
}
```

**Đối tượng `shippingAddress`:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "address1": "123 Main St",
  "address2": "Apt 4B",
  "city": "New York",
  "province": "New York",
  "provinceCode": "NY",
  "country": "United States",
  "countryCode": "US",
  "zip": "10001",
  "phone": "+1-555-123-4567"
}
```

**Chỉ mục:**
```
shopId ASC, editWindowStatus ASC, orderCreatedAt DESC
shopId ASC, shopifyOrderId ASC
shopId ASC, customerEmail ASC, orderCreatedAt DESC
shopId ASC, fulfillmentStatus ASC, editWindowStatus ASC
editWindowStatus ASC, editWindowExpiresAt ASC  (cho hết hạn theo lịch)
```

---

### Bộ sưu tập: `orderEdits`

Bản ghi mọi lần chỉnh sửa hoặc hủy đã thực hiện.

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `id` | string | Có | Document ID tự động tạo |
| `shopId` | string | Có | Tham chiếu đến bộ sưu tập shops |
| `orderId` | string | Có | Tham chiếu đến doc ID bộ sưu tập orders |
| `shopifyOrderId` | string | Có | GID đơn hàng Shopify |
| `editType` | string | Có | `item_swap \| quantity_change \| address_edit \| add_item \| remove_item \| cancel` |
| `initiatedBy` | string | Có | `customer \| merchant` |
| `status` | string | Có | `pending \| processing \| applied \| rejected \| failed` |
| `changes` | array | Có | Mảng các đối tượng chi tiết thay đổi |
| `priceDiff` | number | Có | Dương = tính phí khách hàng, âm = hoàn tiền, 0 = không thay đổi |
| `newTotalPrice` | number | Có | Tổng đơn hàng sau lần chỉnh sửa này |
| `refundId` | string | Không | GID hoàn tiền Shopify nếu đã hoàn tiền |
| `invoiceUrl` | string | Không | URL hóa đơn nếu cần tính phí thêm |
| `reason` | string | Không | Lý do chỉnh sửa do khách hàng cung cấp |
| `staffNote` | string | Không | Ghi chú do người bán cung cấp |
| `previousState` | object | Không | Bản chụp các trường đã thay đổi trước khi chỉnh sửa |
| `newState` | object | Không | Bản chụp các trường đã thay đổi sau khi chỉnh sửa |
| `upsellAccepted` | boolean | Không | Khách hàng có chấp nhận bán thêm sau chỉnh sửa hay không |
| `upsellRevenue` | number | Không | Doanh thu từ các sản phẩm bán thêm đã chấp nhận |
| `retentionOfferId` | string | Không | ID của ưu đãi giữ chân đã cứu đơn hàng |
| `retentionType` | string | Không | `discount \| swap \| delay` |
| `requestedAt` | timestamp | Có | Thời điểm yêu cầu chỉnh sửa |
| `processedAt` | timestamp | Không | Thời điểm hoàn tất chỉnh sửa |
| `createdAt` | timestamp | Có | Thời gian tạo tài liệu |

**Phần tử mảng `changes`:**
```json
{
  "type": "item_swap",
  "lineItemId": "gid://shopify/LineItem/123",
  "fromVariantId": "gid://shopify/ProductVariant/456",
  "fromVariantTitle": "Medium / Blue",
  "toVariantId": "gid://shopify/ProductVariant/789",
  "toVariantTitle": "Large / Blue",
  "fromQuantity": 2,
  "toQuantity": 2,
  "priceDiff": "5.00"
}
```

**Chỉ mục:**
```
shopId ASC, orderId ASC, requestedAt DESC
shopId ASC, editType ASC, requestedAt DESC
shopId ASC, status ASC, requestedAt DESC
shopId ASC, initiatedBy ASC, requestedAt DESC
shopId ASC, requestedAt DESC
```

---

### Bộ sưu tập: `subscriptions`

Dữ liệu thanh toán và gói dịch vụ. Mỗi cửa hàng một tài liệu đang hoạt động.

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `id` | string | Có | Document ID tự động tạo |
| `shopId` | string | Có | Tham chiếu đến bộ sưu tập shops |
| `plan` | string | Có | `free \| starter \| growth \| pro \| business \| enterprise` |
| `status` | string | Có | `active \| frozen \| cancelled \| pending` |
| `shopifyChargeId` | string | Không | ID phí ứng dụng định kỳ Shopify |
| `monthlyEditLimit` | number | Có | 50, 200, hoặc -1 (không giới hạn) |
| `currentMonthUsage` | number | Có | Số lần chỉnh sửa đã dùng trong chu kỳ thanh toán hiện tại |
| `billingCycleStart` | timestamp | Có | Bắt đầu chu kỳ thanh toán hiện tại |
| `billingCycleEnd` | timestamp | Có | Kết thúc chu kỳ thanh toán hiện tại |
| `trialEndsAt` | timestamp | Không | Ngày kết thúc dùng thử miễn phí |
| `cancelledAt` | timestamp | Không | Ngày hủy gói dịch vụ |
| `createdAt` | timestamp | Có | Thời gian tạo tài liệu |
| `updatedAt` | timestamp | Có | Thời gian cập nhật lần cuối |

**Chỉ mục:**
```
shopId ASC, status ASC
status ASC, billingCycleEnd ASC  (cho cron đặt lại hàng tháng)
```

---

### Bộ sưu tập: `upsellOffers`

Ưu đãi bán thêm sau chỉnh sửa do người bán cấu hình.

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `id` | string | Có | Document ID tự động tạo |
| `shopId` | string | Có | Tham chiếu đến bộ sưu tập shops |
| `title` | string | Có | Tên ưu đãi nội bộ |
| `offerType` | string | Có | `complementary \| upgrade \| bundle \| discount` |
| `triggerType` | string | Có | `product \| collection \| cart_value \| edit_type` |
| `triggerValue` | string | Có | GID sản phẩm, GID bộ sưu tập, hoặc giá trị ngưỡng |
| `recommendedProducts` | array | Có | Mảng các GID biến thể sản phẩm được đề xuất |
| `discountPercent` | number | Không | Phần trăm giảm giá cho sản phẩm bán thêm |
| `discountType` | string | Không | `percentage \| fixed_amount` |
| `discountValue` | number | Không | Số tiền giảm giá |
| `priority` | number | Có | Thứ tự hiển thị (thấp hơn = hiện trước) |
| `active` | boolean | Có | Ưu đãi có đang hoạt động hay không |
| `impressions` | number | Có | Tổng số lần hiển thị (bộ đếm phi chuẩn hóa) |
| `conversions` | number | Có | Tổng số lần chấp nhận (bộ đếm phi chuẩn hóa) |
| `revenue` | number | Có | Tổng doanh thu đã tạo (phi chuẩn hóa) |
| `createdAt` | timestamp | Có | Thời gian tạo tài liệu |
| `updatedAt` | timestamp | Có | Thời gian cập nhật lần cuối |

**Chỉ mục:**
```
shopId ASC, active ASC, triggerType ASC, priority ASC
```

---

### Bộ sưu tập: `notifications`

Nhật ký thông báo Email/SMS với TTL.

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `id` | string | Có | Document ID tự động tạo |
| `shopId` | string | Có | Tham chiếu đến bộ sưu tập shops |
| `orderId` | string | Không | Tham chiếu đến bộ sưu tập orders |
| `editId` | string | Không | Tham chiếu đến bộ sưu tập orderEdits |
| `type` | string | Có | `edit_confirmation \| cancel_confirmation \| retention_offer \| upsell_accepted \| invoice \| merchant_notification` |
| `channel` | string | Có | `email` |
| `recipient` | string | Có | Địa chỉ email |
| `subject` | string | Có | Dòng tiêu đề email |
| `status` | string | Có | `queued \| sent \| failed \| bounced` |
| `templateId` | string | Có | Mã định danh mẫu email |
| `templateData` | object | Có | Biến mẫu động |
| `errorMessage` | string | Không | Chi tiết lỗi nếu gửi thất bại |
| `sentAt` | timestamp | Không | Thời điểm email được gửi |
| `createdAt` | timestamp | Có | Thời gian tạo tài liệu |
| `expiresAt` | timestamp | Có | TTL: tự động xóa sau 30 ngày |

**Chỉ mục:**
```
shopId ASC, type ASC, createdAt DESC
shopId ASC, status ASC, createdAt DESC
```

**Chính sách TTL:** Trường `expiresAt`, tự động xóa TTL của Firestore.

---

### Bộ sưu tập: `analyticsEvents`

Luồng sự kiện thô cho pipeline phân tích. Ngắn hạn với TTL.

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `id` | string | Có | Document ID tự động tạo |
| `shopId` | string | Có | Tham chiếu đến bộ sưu tập shops |
| `eventType` | string | Có | `edit_applied \| edit_rejected \| cancel_completed \| retention_success \| retention_failed \| upsell_shown \| upsell_accepted \| upsell_declined \| widget_viewed \| edit_page_opened` |
| `orderId` | string | Không | Doc ID đơn hàng liên quan |
| `editId` | string | Không | Doc ID chỉnh sửa liên quan |
| `eventData` | object | Có | Dữ liệu tải trọng riêng theo sự kiện |
| `createdAt` | timestamp | Có | Thời điểm sự kiện |
| `expiresAt` | timestamp | Có | TTL: tự động xóa sau 90 ngày |

**Chỉ mục:**
```
shopId ASC, eventType ASC, createdAt DESC
```

**Chính sách TTL:** Trường `expiresAt`, tự động xóa TTL của Firestore. Dữ liệu được đồng bộ sang BigQuery trước khi hết hạn.

---

### Bộ sưu tập: `webhookLogs`

Theo dõi tính bất biến (idempotency) cho webhook Shopify. Ngắn hạn với TTL.

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `id` | string | Có | Giá trị header `X-Shopify-Webhook-Id` của webhook Shopify |
| `shopId` | string | Có | Tên miền cửa hàng từ webhook |
| `topic` | string | Có | Chủ đề webhook (ví dụ: `orders/create`) |
| `receivedAt` | timestamp | Có | Thời điểm nhận webhook |
| `expiresAt` | timestamp | Có | TTL: tự động xóa sau 7 ngày |

**Chính sách TTL:** Trường `expiresAt`, tự động xóa sau 7 ngày.

---

## 2. Các Endpoint API

Tất cả endpoint được lưu trữ trên Firebase Functions. Đường dẫn gốc: `/api`

### Xác thực
- **Endpoint mặt tiền cửa hàng** (phía khách hàng): Xác thực qua token đơn hàng (ID đơn hàng + mã băm email) truyền dưới dạng tham số truy vấn hoặc header
- **Endpoint quản trị** (phía người bán): Xác thực qua token phiên Shopify App Bridge (JWT được xác minh với app secret)
- **Endpoint webhook**: Xác thực qua xác minh chữ ký HMAC-SHA256

### API Mặt Tiền Cửa Hàng (Phía Khách Hàng)

| Phương thức | Đường dẫn | Mô tả | Xác thực | Yêu cầu | Phản hồi |
|-------------|-----------|-------|----------|----------|----------|
| GET | `/api/orders/:orderId/edit-eligibility` | Kiểm tra đơn hàng có đủ điều kiện chỉnh sửa không | Token đơn hàng | Query: `token` | `{eligible, allowedActions[], timeRemaining, editWindowExpiresAt}` |
| GET | `/api/orders/:orderId/edit-options` | Lấy các mục hàng có thể chỉnh sửa với tùy chọn hoán đổi/số lượng | Token đơn hàng | Query: `token` | `{lineItems[], swapOptions{}, quantityLimits{}}` |
| POST | `/api/orders/:orderId/edits` | Gửi thay đổi chỉnh sửa để xác thực và tính giá | Token đơn hàng | `{changes[{type, lineItemId, newVariantId, newQty}]}` | `{valid, priceDiff, newTotal, upsellOffers[]}` |
| POST | `/api/orders/:orderId/edits/confirm` | Xác nhận và áp dụng chỉnh sửa đã xác thực | Token đơn hàng | `{changes[], upsellItems[]}` | `{success, updatedOrder, refundAmount, invoiceUrl}` |
| POST | `/api/orders/:orderId/cancel/init` | Khởi tạo luồng hủy đơn (kiểm tra điều kiện, lấy ưu đãi giữ chân) | Token đơn hàng | `{}` | `{eligible, retentionOffers[], reason}` |
| POST | `/api/orders/:orderId/cancel/confirm` | Xác nhận hủy đơn hàng | Token đơn hàng | `{reason}` | `{cancelled, refundAmount}` |
| POST | `/api/orders/:orderId/cancel/retain` | Chấp nhận ưu đãi giữ chân thay vì hủy đơn | Token đơn hàng | `{retentionType, offerId, newVariantId?}` | `{retained, discount?, swappedProduct?}` |
| POST | `/api/orders/:orderId/address` | Cập nhật địa chỉ giao hàng | Token đơn hàng | `{address{address1, address2, city, province, country, zip, phone}}` | `{success, updatedAddress}` |
| POST | `/api/orders/:orderId/address/validate` | Xác thực địa chỉ qua Google API | Token đơn hàng | `{address{...}}` | `{valid, suggestions[], confidence}` |
| GET | `/api/orders/:orderId/edit-history` | Lấy lịch sử chỉnh sửa của đơn hàng | Token đơn hàng | Query: `token` | `{edits[]}` |

### API Quản Trị (Phía Người Bán)

| Phương thức | Đường dẫn | Mô tả | Xác thực | Yêu cầu | Phản hồi |
|-------------|-----------|-------|----------|----------|----------|
| GET | `/api/admin/orders` | Liệt kê đơn hàng với trạng thái chỉnh sửa | Token phiên | Query: `status, page, limit, search, sort` | `{orders[], pagination{page, totalPages, total}}` |
| GET | `/api/admin/orders/:orderId` | Lấy chi tiết đơn hàng với lịch sử chỉnh sửa | Token phiên | - | `{order, edits[], editEligibility}` |
| POST | `/api/admin/orders/:orderId/edit/begin` | Bắt đầu phiên chỉnh sửa của người bán | Token phiên | `{}` | `{editSession, lineItems[], availableProducts[]}` |
| POST | `/api/admin/orders/:orderId/edit/commit` | Xác nhận chỉnh sửa của người bán | Token phiên | `{changes[], notifyCustomer, staffNote}` | `{success, updatedOrder, priceDiff}` |
| POST | `/api/admin/orders/:orderId/cancel` | Hủy đơn hàng với tư cách người bán | Token phiên | `{reason, notifyCustomer, restock}` | `{success, refundAmount}` |
| GET | `/api/admin/settings` | Lấy cài đặt chỉnh sửa cửa hàng | Token phiên | - | `{settings}` |
| PUT | `/api/admin/settings` | Cập nhật cài đặt chỉnh sửa cửa hàng | Token phiên | `{settings{...}}` | `{success, settings}` |
| GET | `/api/admin/rules` | Liệt kê quy tắc chỉnh sửa | Token phiên | Query: `page, limit` | `{rules[], pagination}` |
| POST | `/api/admin/rules` | Tạo quy tắc chỉnh sửa | Token phiên | `{ruleType, targetId, allowSwap, ...}` | `{success, rule}` |
| PUT | `/api/admin/rules/:ruleId` | Cập nhật quy tắc chỉnh sửa | Token phiên | `{allowSwap, minQuantity, ...}` | `{success, rule}` |
| DELETE | `/api/admin/rules/:ruleId` | Xóa quy tắc chỉnh sửa | Token phiên | - | `{success}` |
| GET | `/api/admin/analytics/overview` | Tổng quan chỉ số bảng điều khiển | Token phiên | Query: `startDate, endDate` | `{totalEdits, editsByType, cancellations, retentionRate, upsellRevenue}` |
| GET | `/api/admin/analytics/edits` | Chi tiết phân tích chỉnh sửa | Token phiên | Query: `startDate, endDate, groupBy` | `{data[], chart{labels, datasets}}` |
| GET | `/api/admin/analytics/products` | Sản phẩm được chỉnh sửa nhiều nhất | Token phiên | Query: `startDate, endDate, limit` | `{products[{productId, title, editCount, editTypes}]}` |
| GET | `/api/admin/analytics/export` | Xuất CSV phân tích | Token phiên | Query: `startDate, endDate, type` | Tải xuống tệp CSV |
| GET | `/api/admin/subscription` | Lấy gói đăng ký hiện tại | Token phiên | - | `{plan, usage, limit, billingCycle}` |
| POST | `/api/admin/subscription/upgrade` | Khởi tạo nâng cấp gói | Token phiên | `{plan}` | `{confirmationUrl}` |
| GET | `/api/admin/upsell-offers` | Liệt kê ưu đãi bán thêm | Token phiên | - | `{offers[]}` |
| POST | `/api/admin/upsell-offers` | Tạo ưu đãi bán thêm | Token phiên | `{offerType, triggerType, ...}` | `{success, offer}` |
| PUT | `/api/admin/upsell-offers/:offerId` | Cập nhật ưu đãi bán thêm | Token phiên | `{...}` | `{success, offer}` |
| DELETE | `/api/admin/upsell-offers/:offerId` | Xóa ưu đãi bán thêm | Token phiên | - | `{success}` |

### Endpoint Webhook

| Phương thức | Đường dẫn | Chủ đề Shopify | Mô tả |
|-------------|-----------|----------------|-------|
| POST | `/webhooks/orders/create` | `orders/create` | Đồng bộ đơn hàng mới, mở cửa sổ chỉnh sửa |
| POST | `/webhooks/orders/updated` | `orders/updated` | Đồng bộ trạng thái đơn hàng, đóng cửa sổ nếu đã hoàn thành |
| POST | `/webhooks/orders/cancelled` | `orders/cancelled` | Đánh dấu đơn hàng đã hủy, hủy bỏ chỉnh sửa đang chờ |
| POST | `/webhooks/orders/fulfilled` | `orders/fulfilled` | Đóng cửa sổ chỉnh sửa |
| POST | `/webhooks/orders/partially-fulfilled` | `orders/partially_fulfilled` | Cập nhật trạng thái hoàn thành |
| POST | `/webhooks/app/uninstalled` | `app/uninstalled` | Dọn dẹp: xóa token, đánh dấu không hoạt động |
| POST | `/webhooks/shop/update` | `shop/update` | Đồng bộ thay đổi cài đặt cửa hàng |

### Endpoint App Proxy

| Phương thức | Đường dẫn | Mô tả |
|-------------|-----------|-------|
| GET/POST | `/app-proxy/*` | Yêu cầu proxy từ mặt tiền cửa hàng (trang chỉnh sửa đơn hàng khách hàng) |

---

## 3. Xử Lý Webhook Shopify

### Mô Hình Xử Lý Webhook

Tất cả trình xử lý webhook tuân theo luồng này:
1. Nhận POST từ Shopify
2. Xác minh chữ ký HMAC-SHA256
3. Kiểm tra tính bất biến (loại bỏ trùng lặp bằng webhook ID trong `webhookLogs`)
4. Phản hồi 200 OK ngay lập tức (trong vòng 5 giây)
5. Đẩy tin nhắn vào Cloud Pub/Sub để xử lý bất đồng bộ

### Chi Tiết Webhook

#### `orders/create`
- **Chủ đề Pub/Sub:** `order-events`
- **Xử lý:**
  1. Lấy `editSettings` cho cửa hàng
  2. Tính `editWindowExpiresAt` = `orderCreatedAt` + `timeWindowMinutes`
  3. Tạo tài liệu trong bộ sưu tập `orders` với `editWindowStatus: "open"`
  4. Lên lịch Cloud Task cho hết hạn cửa sổ chỉnh sửa (nếu dùng cửa sổ theo thời gian)
  5. Ghi mục `analyticsEvents`

#### `orders/updated`
- **Chủ đề Pub/Sub:** `order-events`
- **Xử lý:**
  1. Lấy tài liệu đơn hàng hiện có theo `shopifyOrderId`
  2. Nếu không tìm thấy (đã chỉnh sửa bên ngoài ứng dụng), bỏ qua
  3. So sánh thay đổi trạng thái hoàn thành
  4. Nếu `fulfillmentStatus` thay đổi thành `partial` hoặc `fulfilled`, đặt `editWindowStatus: "closed"`
  5. Cập nhật `financialStatus`, `currentTotalPrice`, bản chụp `lineItems`
  6. Cập nhật `syncedAt`

#### `orders/cancelled`
- **Chủ đề Pub/Sub:** `order-events`
- **Xử lý:**
  1. Cập nhật tài liệu đơn hàng: `editWindowStatus: "closed"`, `cancelledViaApp: false` (hủy bên ngoài)
  2. Tìm bất kỳ `orderEdits` đang chờ nào và đặt `status: "void"`
  3. Ghi sự kiện phân tích

#### `orders/fulfilled`
- **Chủ đề Pub/Sub:** `order-events`
- **Xử lý:**
  1. Cập nhật `fulfillmentStatus: "fulfilled"`, `editWindowStatus: "closed"`

#### `orders/partially_fulfilled`
- **Chủ đề Pub/Sub:** `order-events`
- **Xử lý:**
  1. Cập nhật `fulfillmentStatus: "partial"`
  2. Nếu `timeWindowType` là `before_fulfillment`, đặt `editWindowStatus: "closed"`

#### `app/uninstalled`
- **Chủ đề Pub/Sub:** `app-events`
- **Xử lý:**
  1. Cập nhật tài liệu cửa hàng: `status: "uninstalled"`, `uninstalledAt: now()`
  2. Xóa `accessToken` (bảo mật)
  3. Cập nhật đăng ký: `status: "cancelled"`
  4. Ghi sự kiện phân tích
  5. KHÔNG xóa dữ liệu người bán (cho phép khôi phục khi cài đặt lại)

#### `shop/update`
- **Chủ đề Pub/Sub:** `app-events`
- **Xử lý:**
  1. Cập nhật tài liệu cửa hàng với tên cửa hàng, email, tiền tệ, múi giờ mới nếu có thay đổi

---

## 4. Mutation GraphQL Shopify

### Mutation Chỉnh Sửa Đơn Hàng

#### Bắt đầu Phiên Chỉnh Sửa
```graphql
mutation orderEditBegin($id: ID!) {
  orderEditBegin(id: $id) {
    calculatedOrder {
      id
      originalOrder {
        id
        name
        currentTotalPriceSet {
          shopMoney { amount currencyCode }
        }
      }
      addedLineItems(first: 50) {
        edges {
          node {
            id
            title
            quantity
            originalUnitPriceSet {
              shopMoney { amount currencyCode }
            }
          }
        }
      }
      lineItems(first: 100) {
        edges {
          node {
            id
            title
            variant { id title }
            quantity
            originalUnitPriceSet {
              shopMoney { amount currencyCode }
            }
          }
        }
      }
    }
    userErrors { field message }
  }
}
```

#### Đặt Số Lượng Mục Hàng
```graphql
mutation orderEditSetQuantity($id: ID!, $lineItemId: ID!, $quantity: Int!) {
  orderEditSetQuantity(
    id: $id
    lineItemId: $lineItemId
    quantity: $quantity
    restock: true
  ) {
    calculatedOrder {
      id
      lineItems(first: 100) {
        edges {
          node { id quantity }
        }
      }
    }
    userErrors { field message }
  }
}
```

#### Thêm Biến Thể (cho hoán đổi sản phẩm hoặc thêm sản phẩm mới)
```graphql
mutation orderEditAddVariant($id: ID!, $variantId: ID!, $quantity: Int!) {
  orderEditAddVariant(
    id: $id
    variantId: $variantId
    quantity: $quantity
  ) {
    calculatedOrder {
      id
      addedLineItems(first: 50) {
        edges {
          node {
            id
            title
            quantity
            originalUnitPriceSet {
              shopMoney { amount currencyCode }
            }
          }
        }
      }
    }
    userErrors { field message }
  }
}
```

#### Thêm Giảm Giá Mục Hàng (cho ưu đãi giữ chân)
```graphql
mutation orderEditAddLineItemDiscount(
  $id: ID!
  $lineItemId: ID!
  $discount: OrderEditAppliedDiscountInput!
) {
  orderEditAddLineItemDiscount(
    id: $id
    lineItemId: $lineItemId
    discount: $discount
  ) {
    calculatedOrder { id }
    addedDiscountStagedChange {
      id
      value {
        ... on MoneyV2 { amount currencyCode }
        ... on PricingPercentageValue { percentage }
      }
    }
    userErrors { field message }
  }
}
```

#### Xác Nhận Chỉnh Sửa
```graphql
mutation orderEditCommit($id: ID!, $notifyCustomer: Boolean, $staffNote: String) {
  orderEditCommit(
    id: $id
    notifyCustomer: $notifyCustomer
    staffNote: $staffNote
  ) {
    order {
      id
      name
      currentTotalPriceSet {
        shopMoney { amount currencyCode }
      }
      lineItems(first: 100) {
        edges {
          node {
            id
            title
            quantity
            variant { id title }
          }
        }
      }
    }
    userErrors { field message }
  }
}
```

### Cập Nhật Địa Chỉ Đơn Hàng
```graphql
mutation orderUpdate($input: OrderInput!) {
  orderUpdate(input: $input) {
    order {
      id
      shippingAddress {
        address1 address2 city province provinceCode
        country countryCode zip phone
      }
    }
    userErrors { field message }
  }
}
```

**Đầu vào:**
```json
{
  "id": "gid://shopify/Order/123",
  "shippingAddress": {
    "address1": "456 New St",
    "city": "New York",
    "province": "New York",
    "countryCode": "US",
    "zip": "10002"
  }
}
```

### Hủy Đơn Hàng
```graphql
mutation orderCancel($orderId: ID!, $reason: OrderCancelReason!, $refund: Boolean!, $restock: Boolean!) {
  orderCancel(
    orderId: $orderId
    reason: $reason
    refund: $refund
    restock: $restock
  ) {
    job { id done }
    orderCancelUserErrors { field message code }
  }
}
```

### Hóa Đơn (cho phí phát sinh thêm)
```graphql
mutation orderInvoiceSend($id: ID!) {
  orderInvoiceSend(id: $id) {
    order {
      id
      paymentTerms {
        paymentSchedules(first: 1) {
          edges {
            node { dueAt completedAt }
          }
        }
      }
    }
    userErrors { field message }
  }
}
```

### Truy Vấn Sản Phẩm (cho tùy chọn hoán đổi)
```graphql
query productVariants($productId: ID!) {
  product(id: $productId) {
    id
    title
    variants(first: 100) {
      edges {
        node {
          id
          title
          price
          availableForSale
          inventoryQuantity
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
          }
        }
      }
    }
  }
}
```

### Thẻ Quà Tặng (cho tín dụng cửa hàng)
```graphql
mutation giftCardCreate($input: GiftCardCreateInput!) {
  giftCardCreate(input: $input) {
    giftCard {
      id
      lastCharacters
      initialValue { amount currencyCode }
    }
    userErrors { field message }
  }
}
```

---

## 5. Tác Vụ Nền

### Chủ Đề Cloud Pub/Sub

| Chủ đề | Người đăng ký | Mục đích |
|--------|---------------|----------|
| `order-events` | `processOrderEvent` | Xử lý webhook tạo/cập nhật/hủy/hoàn thành đơn hàng |
| `edit-events` | `processEditEvent` | Xử lý sự kiện chỉnh sửa đã áp dụng/bị từ chối, cập nhật phân tích |
| `notification-events` | `processNotification` | Gửi thông báo email (tách biệt khỏi luồng chỉnh sửa) |
| `analytics-events` | `processAnalyticsEvent` | Ghi sự kiện vào BigQuery |
| `app-events` | `processAppEvent` | Xử lý cài đặt/gỡ cài đặt ứng dụng |
| `dlq-events` | (Hàng chờ lỗi) | Tin nhắn thất bại sau số lần thử tối đa, để xem xét thủ công |

### Lược Đồ Tin Nhắn Pub/Sub

```json
{
  "type": "order.created | order.updated | order.cancelled | edit.applied | notification.send",
  "shopId": "my-store.myshopify.com",
  "data": { },
  "timestamp": "2026-04-01T10:00:00Z",
  "correlationId": "uuid-v4"
}
```

### Hàng Đợi Cloud Tasks

| Hàng đợi | Mục đích | Giới hạn tốc độ | Thử lại |
|-----------|----------|-----------------|---------|
| `edit-window-expiry` | Lên lịch đóng cửa sổ chỉnh sửa tại thời điểm hết hạn chính xác | 10/giây | 3 lần thử lại, backoff theo cấp số nhân |
| `email-send` | Gửi email có giới hạn tốc độ | 5/giây | 5 lần thử lại |
| `analytics-sync` | Đồng bộ hàng loạt sự kiện sang BigQuery | 2/giây | 3 lần thử lại |
| `shopify-api` | Gọi API Shopify có giới hạn tốc độ (cho hoạt động hàng loạt) | 2/giây mỗi cửa hàng | 5 lần thử lại, backoff theo cấp số nhân |

### Hàm Theo Lịch (Cloud Scheduler)

| Lịch trình | Hàm | Mô tả |
|------------|------|-------|
| Mỗi 5 phút | `expireEditWindows` | Truy vấn đơn hàng có `editWindowStatus = "open"` VÀ `editWindowExpiresAt < now()`, đặt thành `"expired"` |
| Ngày 1 mỗi tháng, 00:00 UTC | `resetMonthlyUsage` | Đặt lại `currentMonthUsage` về 0 cho tất cả đăng ký đang hoạt động |
| Hàng ngày lúc 02:00 UTC | `syncAnalyticsToBigQuery` | Xuất hàng loạt `analyticsEvents` từ Firestore sang BigQuery |
| Hàng ngày lúc 03:00 UTC | `generateDailyAggregates` | Tính toán chỉ số tổng hợp hàng ngày cho mỗi cửa hàng trong BigQuery |
| Hàng tuần, Chủ nhật 04:00 UTC | `cleanupStaleData` | Xóa tài liệu mồ côi, xác minh tính nhất quán dữ liệu |

---

## 6. Cây Thành Phần Frontend

### Ứng Dụng Quản Trị (React + Polaris)

```
<AppProvider>                           # Polaris AppProvider + đa ngôn ngữ
├── <AppBridgeProvider>                 # Shopify App Bridge
│   ├── <NavigationMenu>                # Thanh điều hướng bên trái
│   └── <Routes>
│       ├── <DashboardPage>             # /
│       │   ├── <DashboardHeader>       # Tiêu đề trang + bộ chọn khoảng thời gian
│       │   ├── <MetricCards>           # Thẻ KPI (chỉnh sửa, hủy, tiết kiệm)
│       │   │   ├── <MetricCard>        # Thẻ chỉ số đơn lẻ
│       │   │   └── <MetricCard>
│       │   ├── <RecentEditsTable>      # 10 chỉnh sửa gần nhất
│       │   │   └── <EditRow>
│       │   └── <QuickActions>          # Thiết lập chưa hoàn tất? Thẻ CTA
│       │
│       ├── <OrdersPage>                # /orders
│       │   ├── <OrderFilters>          # Bộ lọc trạng thái, tìm kiếm, ngày
│       │   ├── <OrdersResourceList>    # Polaris ResourceList
│       │   │   └── <OrderResourceItem> # Hàng đơn hàng đơn lẻ
│       │   └── <Pagination>
│       │
│       ├── <OrderDetailPage>           # /orders/:orderId
│       │   ├── <OrderHeader>           # Đơn hàng #, huy hiệu trạng thái
│       │   ├── <OrderTimeline>         # Dòng thời gian lịch sử chỉnh sửa
│       │   │   └── <TimelineEvent>
│       │   ├── <LineItemsList>         # Các mục hàng hiện tại
│       │   │   └── <LineItemCard>
│       │   ├── <ShippingAddressCard>   # Địa chỉ giao hàng hiện tại
│       │   ├── <EditOrderModal>        # Modal chỉnh sửa của người bán
│       │   │   ├── <VariantSwapPicker> # Bộ chọn biến thể sản phẩm
│       │   │   ├── <QuantityStepper>   # Điều khiển số lượng +/-
│       │   │   ├── <ProductSearchBar>  # Tìm kiếm thêm sản phẩm mới
│       │   │   ├── <PriceDiffSummary>  # Bảng phân tích thay đổi giá
│       │   │   └── <EditConfirmation>  # Xác nhận thay đổi
│       │   └── <CancelOrderModal>      # Modal xác nhận hủy đơn
│       │
│       ├── <SettingsPage>              # /settings
│       │   ├── <GeneralSettings>       # Cửa sổ thời gian, hành động cho phép
│       │   │   ├── <TimeWindowPicker>
│       │   │   └── <EditTypeToggles>
│       │   ├── <NotificationSettings>  # Cấu hình thông báo email
│       │   │   └── <TemplatePreview>
│       │   ├── <WidgetSettings>        # Cấu hình giao diện widget
│       │   │   ├── <ColorPicker>
│       │   │   └── <WidgetPreview>
│       │   ├── <RetentionSettings>     # Cấu hình giữ chân khi hủy đơn
│       │   │   └── <RetentionOfferForm>
│       │   └── <AdvancedSettings>      # Giới hạn tốc độ, lưu trữ dữ liệu
│       │
│       ├── <EditRulesPage>             # /rules
│       │   ├── <RulesTable>            # Liệt kê tất cả quy tắc
│       │   │   └── <RuleRow>
│       │   ├── <CreateRuleModal>       # Thêm quy tắc mới
│       │   │   ├── <ProductPicker>     # Bộ chọn tài nguyên Shopify
│       │   │   └── <RuleConfigForm>
│       │   └── <EditRuleModal>         # Sửa quy tắc hiện có
│       │
│       ├── <AnalyticsPage>             # /analytics
│       │   ├── <DateRangePicker>
│       │   ├── <OverviewMetrics>       # Thẻ tóm tắt
│       │   ├── <EditsChart>            # Biểu đồ đường/cột chỉnh sửa theo thời gian
│       │   ├── <EditTypeBreakdown>     # Biểu đồ tròn theo loại chỉnh sửa
│       │   ├── <TopEditedProducts>     # Bảng sản phẩm được chỉnh sửa nhiều nhất
│       │   ├── <RetentionMetrics>      # Tỷ lệ giữ chân, doanh thu tiết kiệm
│       │   ├── <UpsellMetrics>         # Chuyển đổi bán thêm, doanh thu
│       │   └── <ExportButton>          # Xuất CSV
│       │
│       ├── <UpsellOffersPage>          # /upsell-offers
│       │   ├── <OffersTable>
│       │   │   └── <OfferRow>
│       │   ├── <CreateOfferModal>
│       │   │   ├── <ProductPicker>
│       │   │   └── <OfferConfigForm>
│       │   └── <OfferPerformance>      # Lượt hiển thị, chuyển đổi, doanh thu
│       │
│       ├── <SubscriptionPage>          # /subscription
│       │   ├── <CurrentPlanCard>       # Gói hiện tại + đồng hồ sử dụng
│       │   ├── <PlanComparison>        # Lưới so sánh tính năng
│       │   └── <UpgradeButton>
│       │
│       └── <OnboardingPage>            # /onboarding (lần chạy đầu tiên)
│           ├── <WelcomeStep>
│           ├── <ConfigureStep>         # Thiết lập cài đặt cơ bản
│           ├── <ActivateWidgetStep>    # Bật phần mở rộng giao diện
│           └── <CompleteStep>          # Thành công + bước tiếp theo
```

### Hook Tùy Chỉnh

```
hooks/
├── useOrders.js                # Lấy, lọc, phân trang đơn hàng
├── useOrderDetail.js           # Lấy một đơn hàng với lịch sử chỉnh sửa
├── useEditSettings.js          # Lấy/cập nhật cài đặt chỉnh sửa
├── useEditRules.js             # CRUD quy tắc chỉnh sửa
├── useAnalytics.js             # Lấy dữ liệu phân tích với khoảng thời gian
├── useSubscription.js          # Gói hiện tại, mức sử dụng, nâng cấp
├── useUpsellOffers.js          # CRUD ưu đãi bán thêm
├── useOrderEdit.js             # Máy trạng thái luồng chỉnh sửa người bán
├── useAppBridgeAction.js       # App Bridge toast, chuyển hướng, modal
└── usePagination.js            # Phân trang con trỏ/offset
```

---

## 7. Cấu Trúc Phần Mở Rộng Giao Diện

### Khối Ứng Dụng

```
extensions/theme-extension/
├── blocks/
│   ├── order-edit-widget.liquid        # Widget Trang Trạng Thái Đơn Hàng
│   ├── thank-you-banner.liquid         # Banner Trang Cảm Ơn
│   └── edit-order-button.liquid        # Khối nút chỉnh sửa đơn hàng độc lập
├── assets/
│   ├── order-edit-widget.css           # Kiểu widget
│   ├── order-edit-widget.js            # Logic phía máy khách widget
│   ├── thank-you-banner.css
│   └── thank-you-banner.js
├── locales/
│   ├── en.default.json                 # Tiếng Anh (mặc định)
│   ├── fr.json                         # Tiếng Pháp
│   ├── de.json                         # Tiếng Đức
│   ├── es.json                         # Tiếng Tây Ban Nha
│   ├── pt-BR.json                      # Tiếng Bồ Đào Nha (Brazil)
│   ├── ja.json                         # Tiếng Nhật
│   ├── ko.json                         # Tiếng Hàn
│   ├── zh-CN.json                      # Tiếng Trung (Giản thể)
│   ├── zh-TW.json                      # Tiếng Trung (Phồn thể)
│   └── it.json                         # Tiếng Ý
└── snippets/
    ├── edit-countdown.liquid           # Thành phần đếm ngược có thể tái sử dụng
    └── edit-status-badge.liquid        # Chỉ báo trạng thái chỉnh sửa
```

### Lược Đồ Khối `order-edit-widget.liquid`

```json
{
  "name": "Order Edit Widget",
  "target": "section",
  "settings": [
    {
      "type": "color",
      "id": "primary_color",
      "label": "Màu nút chính",
      "default": "#5c6ac4"
    },
    {
      "type": "text",
      "id": "edit_button_text",
      "label": "Văn bản nút chỉnh sửa",
      "default": "Edit Order"
    },
    {
      "type": "text",
      "id": "cancel_button_text",
      "label": "Văn bản nút hủy",
      "default": "Cancel Order"
    },
    {
      "type": "checkbox",
      "id": "show_countdown",
      "label": "Hiển thị bộ đếm ngược",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_cancel",
      "label": "Hiển thị nút hủy",
      "default": true
    }
  ]
}
```

### App Proxy

Trang chỉnh sửa mặt tiền cửa hàng được phục vụ qua Shopify App Proxy:
- **URL Proxy:** `https://my-store.myshopify.com/apps/order-edit/*`
- **Đích:** Firebase Functions `/app-proxy/*`
- **Mục đích:** Phục vụ trang chỉnh sửa khách hàng trong tên miền cửa hàng (có thương hiệu, có giao diện)

### Dự Phòng Scripttag

Cho giao diện không hỗ trợ khối ứng dụng (giao diện cũ):
```
packages/scripttag/src/
├── index.js                # Điểm vào
├── components/
│   ├── EditWidget.jsx      # Thành phần widget Preact
│   └── CountdownTimer.jsx  # Bộ đếm ngược
├── styles/
│   └── widget.css          # Kiểu nội tuyến (không phụ thuộc CSS bên ngoài)
└── utils/
    ├── api.js              # Client API
    └── orderToken.js       # Tạo/xác thực token
```

---

## 8. Lược Đồ BigQuery

### Tập dữ liệu: `order_editing`

#### Bảng: `edits`
Phân vùng theo `DATE(created_at)`, phân cụm theo `shop_id, edit_type`.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `edit_id` | STRING | Document ID Firestore |
| `shop_id` | STRING | Tên miền cửa hàng |
| `order_id` | STRING | Document ID đơn hàng Firestore |
| `shopify_order_id` | STRING | GID đơn hàng Shopify |
| `edit_type` | STRING | `item_swap, quantity_change, address_edit, add_item, remove_item` |
| `initiated_by` | STRING | `customer, merchant` |
| `status` | STRING | `applied, rejected, failed` |
| `price_diff` | FLOAT64 | Chênh lệch giá (dương = tính phí) |
| `original_total` | FLOAT64 | Tổng đơn hàng trước chỉnh sửa |
| `new_total` | FLOAT64 | Tổng đơn hàng sau chỉnh sửa |
| `currency` | STRING | Mã tiền tệ ISO 4217 |
| `upsell_accepted` | BOOLEAN | Đã chấp nhận bán thêm hay chưa |
| `upsell_revenue` | FLOAT64 | Doanh thu từ bán thêm |
| `changes_count` | INT64 | Số lượng thay đổi riêng lẻ |
| `plan` | STRING | Gói người bán tại thời điểm chỉnh sửa |
| `created_at` | TIMESTAMP | Thời điểm chỉnh sửa |

#### Bảng: `cancellations`
Phân vùng theo `DATE(created_at)`, phân cụm theo `shop_id`.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `cancellation_id` | STRING | Document ID Firestore |
| `shop_id` | STRING | Tên miền cửa hàng |
| `order_id` | STRING | Document ID đơn hàng Firestore |
| `shopify_order_id` | STRING | GID đơn hàng Shopify |
| `reason` | STRING | Lý do do khách hàng cung cấp |
| `refund_amount` | FLOAT64 | Tổng số tiền hoàn trả |
| `store_credit_chosen` | BOOLEAN | Đã chọn tín dụng cửa hàng hay chưa |
| `retention_offered` | BOOLEAN | Đã đề nghị giữ chân hay chưa |
| `retention_accepted` | BOOLEAN | Đã chấp nhận giữ chân hay chưa |
| `retention_type` | STRING | discount, swap, delay, hoặc null |
| `retention_value` | FLOAT64 | Giá trị giảm giá nếu áp dụng |
| `currency` | STRING | Mã tiền tệ ISO 4217 |
| `plan` | STRING | Gói người bán tại thời điểm hủy |
| `created_at` | TIMESTAMP | Thời điểm hủy |

#### Bảng: `upsell_conversions`
Phân vùng theo `DATE(created_at)`, phân cụm theo `shop_id, offer_id`.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `event_id` | STRING | ID sự kiện duy nhất |
| `shop_id` | STRING | Tên miền cửa hàng |
| `offer_id` | STRING | ID ưu đãi bán thêm |
| `order_id` | STRING | Document ID đơn hàng |
| `event_type` | STRING | `impression, click, accepted, declined` |
| `product_id` | STRING | GID sản phẩm được đề xuất |
| `revenue` | FLOAT64 | Doanh thu nếu chấp nhận |
| `currency` | STRING | Mã tiền tệ ISO 4217 |
| `created_at` | TIMESTAMP | Thời điểm sự kiện |

#### Bảng: `widget_events`
Phân vùng theo `DATE(created_at)`, phân cụm theo `shop_id, event_type`.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `event_id` | STRING | ID sự kiện duy nhất |
| `shop_id` | STRING | Tên miền cửa hàng |
| `event_type` | STRING | `widget_viewed, edit_button_clicked, cancel_button_clicked, edit_page_opened, edit_confirmed` |
| `source` | STRING | `order_status_page, thank_you_page, customer_account` |
| `order_id` | STRING | ID đơn hàng nếu áp dụng |
| `device_type` | STRING | `mobile, tablet, desktop` |
| `created_at` | TIMESTAMP | Thời điểm sự kiện |

#### Bảng: `daily_shop_metrics`
Phân vùng theo `DATE(metric_date)`, phân cụm theo `shop_id, plan`.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `shop_id` | STRING | Tên miền cửa hàng |
| `metric_date` | DATE | Ngày tổng hợp |
| `plan` | STRING | Gói người bán |
| `total_edits` | INT64 | Tổng chỉnh sửa trong ngày |
| `customer_edits` | INT64 | Chỉnh sửa do khách hàng khởi tạo |
| `merchant_edits` | INT64 | Chỉnh sửa do người bán khởi tạo |
| `address_edits` | INT64 | Số lần chỉnh sửa địa chỉ |
| `item_swaps` | INT64 | Số lần hoán đổi sản phẩm |
| `quantity_changes` | INT64 | Số lần thay đổi số lượng |
| `cancellations` | INT64 | Số lần hủy đơn |
| `cancellations_retained` | INT64 | Số hủy đơn được ngăn chặn bằng giữ chân |
| `upsell_impressions` | INT64 | Số lượt hiển thị bán thêm |
| `upsell_conversions` | INT64 | Số lần chấp nhận bán thêm |
| `upsell_revenue` | FLOAT64 | Tổng doanh thu bán thêm |
| `total_refunded` | FLOAT64 | Tổng số tiền hoàn trả |
| `total_charged` | FLOAT64 | Tổng phí phát sinh thêm |
| `store_credit_issued` | FLOAT64 | Tổng tín dụng cửa hàng đã phát hành |

### View BigQuery

```sql
-- Chỉ số hàng tháng theo cửa hàng (cho bảng điều khiển)
CREATE VIEW `order_editing.monthly_shop_metrics` AS
SELECT
  shop_id,
  DATE_TRUNC(metric_date, MONTH) AS month,
  SUM(total_edits) AS total_edits,
  SUM(cancellations) AS total_cancellations,
  SAFE_DIVIDE(SUM(cancellations_retained), SUM(cancellations + cancellations_retained)) AS retention_rate,
  SUM(upsell_revenue) AS total_upsell_revenue,
  SUM(total_refunded) AS total_refunded
FROM `order_editing.daily_shop_metrics`
GROUP BY shop_id, month;

-- Chỉ số nền tảng toàn cục (cho báo cáo nội bộ)
CREATE VIEW `order_editing.platform_metrics` AS
SELECT
  metric_date,
  COUNT(DISTINCT shop_id) AS active_shops,
  SUM(total_edits) AS platform_edits,
  SUM(upsell_revenue) AS platform_upsell_revenue
FROM `order_editing.daily_shop_metrics`
GROUP BY metric_date;
```

---

## 9. Ước Tính Chi Phí Hạ Tầng

### Mô Hình Chi Phí Theo Lượt Cài Đặt

Giả định cho mỗi lượt cài đặt:
- Trung bình 30 lần chỉnh sửa/tháng cho các cửa hàng hoạt động
- 3 sự kiện webhook mỗi đơn hàng (tạo, cập nhật, hoàn thành)
- Trung bình 100 đơn hàng/tháng mỗi cửa hàng
- 70% lượt cài đặt là gói miễn phí
- Truy vấn BigQuery: ~10 mỗi người bán hoạt động mỗi ngày

### Firebase Functions

| Tài nguyên | Chi phí đơn vị | Mỗi 1K cài đặt/tháng | Mỗi 10K cài đặt/tháng | Mỗi 50K cài đặt/tháng |
|------------|---------------|----------------------|----------------------|----------------------|
| Lượt gọi (API + webhook + nền) | $0.40/triệu | ~$2 | ~$20 | ~$100 |
| Tính toán (GB-giây) | $0.0000025/GB-s | ~$15 | ~$150 | ~$750 |
| Mạng (lưu lượng ra) | $0.12/GB | ~$3 | ~$30 | ~$150 |
| **Tổng phụ** | | **~$20** | **~$200** | **~$1,000** |

### Firestore

| Tài nguyên | Chi phí đơn vị | Mỗi 1K cài đặt/tháng | Mỗi 10K cài đặt/tháng | Mỗi 50K cài đặt/tháng |
|------------|---------------|----------------------|----------------------|----------------------|
| Đọc tài liệu | $0.06/100K | ~$5 | ~$50 | ~$250 |
| Ghi tài liệu | $0.18/100K | ~$3 | ~$30 | ~$150 |
| Lưu trữ | $0.18/GB | ~$1 | ~$5 | ~$25 |
| **Tổng phụ** | | **~$9** | **~$85** | **~$425** |

### BigQuery

| Tài nguyên | Chi phí đơn vị | Mỗi 1K cài đặt/tháng | Mỗi 10K cài đặt/tháng | Mỗi 50K cài đặt/tháng |
|------------|---------------|----------------------|----------------------|----------------------|
| Lưu trữ | $0.02/GB/tháng | ~$0.50 | ~$5 | ~$25 |
| Truy vấn | $5/TB quét | ~$2 | ~$15 | ~$60 |
| Chèn luồng | $0.01/200MB | ~$0.50 | ~$5 | ~$25 |
| **Tổng phụ** | | **~$3** | **~$25** | **~$110** |

### Cloud Pub/Sub + Cloud Tasks

| Tài nguyên | Chi phí đơn vị | Mỗi 1K cài đặt/tháng | Mỗi 10K cài đặt/tháng | Mỗi 50K cài đặt/tháng |
|------------|---------------|----------------------|----------------------|----------------------|
| Tin nhắn Pub/Sub | $0.04/triệu | ~$0.20 | ~$2 | ~$10 |
| Cloud Tasks | Gói miễn phí (1M) | ~$0 | ~$0 | ~$5 |
| **Tổng phụ** | | **~$0.20** | **~$2** | **~$15** |

### Gửi Email (SendGrid)

| Gói | Chi phí | Mỗi 1K cài đặt/tháng | Mỗi 10K cài đặt/tháng | Mỗi 50K cài đặt/tháng |
|-----|---------|----------------------|----------------------|----------------------|
| Miễn phí (100/ngày) rồi Essentials | $0-$19.95/tháng | ~$0 | ~$20 | ~$90 |

### API Xác Thực Địa Chỉ Google (P1)

| Tài nguyên | Chi phí đơn vị | Mỗi 1K cài đặt/tháng | Mỗi 10K cài đặt/tháng | Mỗi 50K cài đặt/tháng |
|------------|---------------|----------------------|----------------------|----------------------|
| Xác thực địa chỉ | $0.005/yêu cầu | ~$3 | ~$30 | ~$150 |

### Tổng Chi Phí Hạ Tầng Hàng Tháng

| Quy mô | Tổng/tháng | Chi phí mỗi cài đặt/tháng | Ghi chú |
|---------|-----------|---------------------------|---------|
| **1K cài đặt** | ~$35 | ~$0.035 | Nằm trong gói miễn phí của nhiều dịch vụ |
| **10K cài đặt** | ~$365 | ~$0.036 | Mở rộng tuyến tính, kinh tế đơn vị tốt |
| **50K cài đặt** | ~$1,800 | ~$0.036 | Giảm giá theo khối lượng áp dụng ở quy mô này |

### Doanh Thu so với Chi Phí (Phân Tích Điểm Hòa Vốn)

Giả định 30% chuyển đổi sang trả phí với ARPU $15:

| Quy mô | Doanh thu hàng tháng | Chi phí hàng tháng | Biên lợi nhuận gộp |
|---------|---------------------|---------------------|---------------------|
| 1K cài đặt | $4,500 | $35 | 99.2% |
| 10K cài đặt | $45,000 | $365 | 99.2% |
| 50K cài đặt | $225,000 | $1,800 | 99.2% |

Lưu ý: Các ước tính này chưa bao gồm chi phí nhân sự, phí Shopify Partner (15% cho đối tác mới), và chi phí marketing.

---

*Kết thúc Kiến Trúc Kỹ Thuật*
