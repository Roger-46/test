# Edit Products — Feature (Deferred from MVP Submit)

**Status:** Deferred — sẽ thêm sau khi app approved trên Shopify App Store
**Extracted from:** PRD-order-editing-mvp.md (2026-04-17)
**Lý do defer:** Giảm scope cho bản submit đầu tiên. Các đối thủ cũng không yêu cầu tính năng này cho bản đầu.

---

## 1. User Stories

| ID | User Story | Priority |
|----|-----------|----------|
| US-02 | Là **customer**, tôi muốn **đổi biến thể sản phẩm** (size, color), để nhận đúng sản phẩm. | P0 |
| US-03 | Là **customer**, tôi muốn **thay đổi số lượng** sản phẩm trước khi giao. | P0 |
| US-05 | Là **customer**, tôi muốn **xem chênh lệch giá** trước khi xác nhận thay đổi. | P0 |

---

## 2. Scope

| # | Feature | Mô tả |
|---|---------|-------|
| 1 | **Customer swap variant** | Đổi size, color trong cùng product |
| 2 | **Customer change quantity** | Tăng/giảm số lượng sản phẩm |
| 3 | **Price diff preview** | Hiển thị chênh lệch giá trước khi confirm |
| 4 | **Settings: Allow variant swap** | Checkbox bật/tắt quyền swap variant |
| 5 | **Settings: Allow qty change** | Checkbox bật/tắt quyền đổi số lượng |

---

## 3. UI Flow

### 3.1. Edit Portal — Items section

Trong Edit Portal, phần "Edit products" hiển thị danh sách items với:
- Product image + name + variant + price
- Stock status (e.g. "12 in stock", "Only 3 left")
- Qty controls: [-] [qty] [+]
- "Change variant →" link mở Swap Variant screen
- Price difference bar: hiển thị chênh lệch giá realtime
- "Save changes" button

```
┌──────────────────────────────────────┐
│  🛍 Edit products                ▼  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ 👕 Classic T-Shirt            │  │
│  │    M / Black · $29.99         │  │
│  │    12 in stock        [-][1][+]│  │
│  │    Change variant →           │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ 👖 Slim Fit Jeans             │  │
│  │    32 / Blue · $49.99         │  │
│  │    Only 3 left        [-][1][+]│  │
│  │    Change variant →           │  │
│  └────────────────────────────────┘  │
│                                      │
│  Price difference          $0.00    │
│  [Save changes]                      │
└──────────────────────────────────────┘
```

### 3.2. Swap Variant Screen

Khi customer click "Change variant →", mở trang Swap Variant:
- Current selection hiển thị variant hiện tại
- Dropdown select cho từng option (Size, Color)
- Variant hết hàng = disabled + "(Out of stock)"
- New selection + price diff preview
- Apply Change / Cancel buttons

```
┌──────────────────────────────────────┐
│  Swap: Classic T-Shirt    [← Back]  │
│                                      │
│  Current: M, Black — $29.99         │
│                                      │
│  Size:  [Dropdown: S/M/L/XL/XXL]    │
│  Color: [Dropdown: Black/White/Red]  │
│                                      │
│  New selection: L, Black — $29.99   │
│  Price difference: $0.00             │
│                                      │
│  [Cancel]         [Apply Change]     │
└──────────────────────────────────────┘
```

### 3.3. Review Changes (product-related)

Trong Review Changes screen, hiển thị:

```
│  🔄 T-Shirt: M Black → L White (+$5.00)  │
│  📦 Jeans: Qty 1 → 2 (+$49.99)           │
```

### 3.4. Qty Controls — Behavior

| Action | Kết quả |
|--------|---------|
| Click [+] | Tăng qty +1, cập nhật price diff realtime |
| Click [-] | Giảm qty -1 (min = 1) |
| Qty = max stock | Disable nút [+] |
| Qty giảm xuống 0 | Hiện confirm: "Remove this item? (Suggest cancel if last item)" |

---

## 4. Interaction with Shopify

**Order Editing API (GraphQL):**
- `orderEditBegin` → mở edit session
- `orderEditAddVariant` → swap variant (remove old + add new)
- `orderEditSetQuantity` → thay đổi số lượng
- `orderEditCommit` → commit tất cả thay đổi
- `staffNote`: truyền kèm khi commit, format: `[Avada Order Editing] Customer swapped: {Product} {Old} → {New}` hoặc `[Avada Order Editing] Customer changed quantity: {Product} {Old Qty} → {New Qty}`

**Xử lý chênh lệch giá sau khi commit:**

| Trường hợp | Xử lý | Chi tiết |
|-------------|--------|----------|
| Giá tăng (customer trả thêm) | Auto charge | Gửi invoice qua `orderEditCommit` → customer thanh toán qua checkout link |
| Giá giảm (refund) | **Auto refund** | App tự động refund về payment method gốc, KHÔNG cần merchant review/duyệt |

> **Quyết định:** Auto refund — không yêu cầu merchant duyệt.
> **Lý do:** Đa số đối thủ (AE, Revize, Orderify) đều auto refund. Chỉ Shopify native mới bắt MC duyệt thủ công. Auto refund giảm friction cho cả customer và merchant.
> **Tương lai:** Có thể thêm setting cho MC chọn refund method (original payment / store credit) ở phase sau.

---

## 5. Design Description

### 5.1. Edit Portal — Items list

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Items list | List | Y | — | Product + variant + price | — |
| Qty controls | Stepper | N | Current qty | [-] [qty] [+] | Min 1, Max stock |
| Swap button | Button | N | — | Per line item | Hiện nếu allowItemSwap |
| Price diff | Currency | Y | $0.00 | Realtime update khi đổi qty/variant | Auto calc |
| Save button | Button | Y | — | "Save changes" → Review Changes | Disabled nếu no changes |

### 5.2. Swap Variant Screen

| Item | Data Type | Required | Default | Mô tả | Validate |
|------|-----------|----------|---------|-------|----------|
| Product name | Text | Y | — | Tên sản phẩm | — |
| Current variant | Text | Y | — | Variant hiện tại + giá | — |
| Option selectors | Select (dropdown) | Y | — | Dropdown cho từng option (Size, Color) | OOS = disabled |
| New variant info | Text | Y | — | Variant mới + giá | Update realtime |
| Price diff | Currency | Y | — | Chênh lệch giá (+ hoặc -) | — |
| Cancel button | Button | Y | — | Quay lại Edit Portal | — |
| Apply button | Button | Y | — | "Apply Change" | Disabled nếu variant = current |

### 5.3. Settings — Edit types

| Item | Data Type | Required | Default | Mô tả |
|------|-----------|----------|---------|-------|
| Allow variant swap | Checkbox | Y | true | Bật/tắt quyền đổi variant |
| Allow qty change | Checkbox | Y | true | Bật/tắt quyền thay đổi số lượng |

---

## 6. Acceptance Criteria

- [ ] Customer swap variant trong cùng product, xem price diff
- [ ] Variant hết hàng = disabled + "(Out of stock)" trong dropdown
- [ ] Customer tăng/giảm quantity (min 1, max available stock)
- [ ] Price difference cập nhật realtime khi đổi qty hoặc variant
- [ ] Tăng giá → charge thêm qua checkout link; giảm giá → auto refund về payment gốc (không cần MC duyệt)
- [ ] Preview tất cả product changes trước khi confirm (Review Changes screen)
- [ ] Settings: merchant bật/tắt swap variant và change qty riêng biệt
- [ ] staffNote ghi vào Shopify Order Timeline khi swap/change qty

---

## 7. Error Messages

| Error | Message | Action |
|-------|---------|--------|
| Variant out of stock | "Sorry, [Variant] is currently out of stock." | Disable option trong dropdown |
| Qty > available stock | "Only [X] items available." | Cap at max |
| Last item qty = 0 | "Remove this item? You may want to cancel the order instead." | Suggest cancel |
| Payment failed | "We couldn't process the additional charge. Please try again." | Rollback, allow retry |

## 8. Success Messages

| Event | Message |
|-------|---------|
| Variant swapped | "Product updated! [Refund/Charge info if any]" |
| Quantity changed | "Quantity updated! [Refund/Charge info if any]" |
