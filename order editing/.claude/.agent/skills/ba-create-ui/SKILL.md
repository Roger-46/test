---
name: ba-create-ui
description: Vẽ UI mockup HTML cho feature mới — BẮT BUỘC tham chiếu PNG screenshots giao diện app hiện tại trong app-interface/ để đảm bảo consistency. Trigger khi Roger nói "vẽ UI", "tạo UI", "design UI cho [feature]".
---

# Skill: Vẽ UI — Tạo HTML Mockup

## Trigger

Khi Roger nói **"vẽ UI"**, **"tạo UI"**, **"design UI"**, hoặc **"UI cho [feature]"** → đọc skill này và thực hiện theo đúng quy trình.

---

## Nguyên tắc cốt lõi

1. **App interface hiện tại là "source of truth"** — UI mới PHẢI trông giống phần còn lại của app. Nếu khác → dev không merge được.
2. **Polaris v12 là luật** — Dùng đúng component, pattern, token.
3. **PRD là spec** — Mọi user flow trong PRD phải có UI tương ứng.

---

## Quy trình (5 bước)

### BƯỚC 1 — Load context (BẮT BUỘC, không bỏ qua)

Thực hiện **song song** tất cả các việc sau:

#### 1a. Đọc PRD
```
documents/roger/features/{feature}/PRD-{feature}.md
```
- Nắm user flows, acceptance criteria, error messages
- Liệt kê TẤT CẢ màn hình cần vẽ

#### 1b. Đọc Design System
```
documents/roger/app-interface/UI-DESIGN-SYSTEM.md
```
- Color palette (Primary #2D9D78, Blue #4A90E2, etc.)
- Typography scale (H1=32px, H2=24px, H3=18px, Body=14px, Label=12px)
- Spacing grid (8px system: 4, 8, 16, 24, 32, 48px)
- Component styles (button height 40px, input height 40px, border-radius, shadows)

#### 1c. ⭐ Load PNG screenshots giao diện app hiện tại (QUAN TRỌNG NHẤT)

Đọc screenshots từ `documents/roger/app-interface/` để hiểu visual thực tế:

**Admin pages:**
```
documents/roger/app-interface/admin-dashboard/       → Dashboard layout, stats cards
documents/roger/app-interface/admin-programs/         → List page, action menu, modals
documents/roger/app-interface/admin-programs-new/     → Form page layout
documents/roger/app-interface/admin-programs-edit/    → Edit form layout
documents/roger/app-interface/admin-affiliates/       → List + modals (add, delete, approve)
documents/roger/app-interface/admin-payouts/          → Tabs, modals, bulk actions
documents/roger/app-interface/admin-settings/         → Settings page layout
documents/roger/app-interface/admin-devzone/          → Dev tools page
```

**Portal pages:**
```
documents/roger/app-interface/portal-login/           → Login form layout
documents/roger/app-interface/portal-register/        → Register form layout
documents/roger/app-interface/portal-dashboard/       → Portal dashboard
documents/roger/app-interface/portal-conversions/     → Conversions list
documents/roger/app-interface/portal-payouts/         → Payouts list
documents/roger/app-interface/portal-profile/         → Profile sections
```

**Cách dùng screenshots:**
- Mở ẢNH (dùng Read tool) các trang **cùng loại** với trang đang vẽ
- Ví dụ: Vẽ trang list mới → mở `admin-programs/UI1-programs-list.png` + `admin-affiliates/UI1-affiliates-list.png` để xem pattern list hiện tại
- Ví dụ: Vẽ modal mới → mở `admin-affiliates/UI2-affiliates-add-modal.png` + `admin-programs/UI3-programs-delete-modal.png` để xem pattern modal
- Ví dụ: Vẽ form mới → mở `admin-programs-new/UI1-program-new-form.png` để xem form layout

**Mapping pattern cần tham chiếu:**

| Đang vẽ | Phải mở screenshots |
|----------|-------------------|
| List page (table/index) | `admin-programs/UI1-*`, `admin-affiliates/UI1-*`, `admin-payouts/UI1-*` |
| Form page (create/edit) | `admin-programs-new/UI1-*`, `admin-programs-edit/UI1-*` |
| Modal (add/edit/delete) | `admin-affiliates/UI2-*`, `admin-affiliates/UI3-*`, `admin-programs/UI3-*`, `admin-programs/UI4-*` |
| Dashboard | `admin-dashboard/UI1-*`, `portal-dashboard/UI1-*` |
| Tabs | `admin-payouts/UI1-*`, `admin-payouts/UI3-*` |
| Portal page | `portal-*/UI1-*` |
| Login/Register | `portal-login/UI1-*`, `portal-register/UI1-*` |
| Settings | `admin-settings/UI1-*` |

#### 1d. Đọc Polaris skill
```
.claude/.agent/skills/polaris/SKILL.md
.claude/.agent/skills/polaris/references/layout.md
.claude/.agent/skills/polaris/references/components.md
.claude/.agent/skills/polaris/references/buttons.md
.claude/.agent/skills/polaris/references/icons.md
```

---

### BƯỚC 2 — Phân tích & lên danh sách màn hình

Từ PRD, liệt kê:
1. **Màn hình chính** — default state
2. **Sub-views** — modals, tabs, dropdowns, popups
3. **States** — empty, loading, error, success
4. **Interactions** — form fill, button click, confirmation

Trình bày cho Roger duyệt trước khi vẽ:

```
## Danh sách màn hình sẽ vẽ

### Trang: [Tên trang]
1. Default view — [mô tả ngắn]
2. Modal: [tên modal] — [trigger]
3. Empty state — [khi nào hiện]
4. Error state — [loại error]

### Trang: [Tên trang 2]
...

**Tổng: X màn hình**
```

> Nếu Roger đã nói rõ cần vẽ gì → bỏ qua bước này, vẽ luôn.

---

### BƯỚC 3 — Vẽ UI (HTML mockup)

**Output file**: `documents/roger/features/{feature}/UI-{feature}.html`

#### Quy tắc vẽ:

1. **Visual consistency** — Dựa vào screenshots đã load ở bước 1c:
   - **Cùng màu sắc** với app hiện tại (lấy từ Design System)
   - **Cùng font size** (scale H1→Label đúng như app)
   - **Cùng spacing** (grid 8px, padding/margin consistent)
   - **Cùng border-radius** (4px input, 8px card)
   - **Cùng shadow** (box-shadow consistent)
   - **Cùng button style** (height 40px, border-radius, colors)
   - **Cùng table/list pattern** (nếu vẽ list → phải giống list trong app)
   - **Cùng modal pattern** (nếu vẽ modal → phải giống modal trong app)

2. **Polaris v12 components** — Dùng đúng tên component:
   - `Page`, `Layout`, `Layout.Section`, `Card`, `BlockStack`, `InlineStack`, `Box`
   - `Text` (KHÔNG dùng `TextStyle`), `Badge`, `Banner`
   - `Button` (primary chỉ 1 trên page), `ButtonGroup`
   - `IndexTable` cho list có bulk actions
   - `FormLayout`, `TextField`, `Select`, `Checkbox`
   - `Modal` cho dialog
   - `EmptyState` cho empty
   - `SkeletonPage`, `SkeletonBodyText` cho loading

3. **States đầy đủ**:
   - Default (có data)
   - Empty (không data) — dùng `EmptyState` component
   - Loading — dùng `Skeleton` components
   - Error — inline error hoặc `Banner` critical

4. **Interactive HTML**:
   - Tab switching (nếu có tabs)
   - Modal open/close (click button → hiện modal)
   - Form validation preview
   - State toggle (data/empty/loading)

#### Template HTML cơ bản:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UI Mockup — {Feature Name}</title>
    <style>
        /* === BASE STYLES (copy từ Design System) === */
        :root {
            --primary: #2D9D78;
            --primary-hover: #247F62;
            --blue: #4A90E2;
            --red: #D72C0D;
            --yellow: #B98900;
            --gray-100: #F6F6F7;
            --gray-200: #E4E5E7;
            --gray-500: #8C9196;
            --gray-900: #1A1C1E;
            --white: #FFFFFF;
            --font-family: -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, sans-serif;
            --radius-input: 4px;
            --radius-card: 8px;
            --shadow-card: 0 1px 3px rgba(0,0,0,0.08);
        }
        /* ... (thêm styles theo design system) ... */
    </style>
</head>
<body>
    <!-- UI mockup content -->
    <script>
        // Interactive behaviors (tab switching, modal toggle, etc.)
    </script>
</body>
</html>
```

---

### BƯỚC 4 — Self-check trước khi giao

Checklist BẮT BUỘC kiểm tra:

```
[ ] Đã load & tham chiếu screenshots app hiện tại (bước 1c)
[ ] Color palette đúng Design System (không dùng màu ngoài palette)
[ ] Typography đúng scale (H1=32px, H2=24px, H3=18px, Body=14px)
[ ] Spacing theo grid 8px
[ ] Button style consistent (height 40px, colors, border-radius)
[ ] List/Table pattern giống app hiện tại
[ ] Modal pattern giống app hiện tại
[ ] Form pattern giống app hiện tại
[ ] Có empty state (EmptyState component)
[ ] Có loading state (Skeleton)
[ ] Có error state (Banner/inline)
[ ] Tất cả user flows trong PRD đều có UI
[ ] Interactive (tabs, modals, toggles hoạt động)
```

> **Nếu có mục nào không pass → sửa ngay, KHÔNG giao cho Roger.**

---

### BƯỚC 5 — Báo cáo

Sau khi lưu file, báo Roger:
1. Link file vừa tạo
2. Danh sách màn hình đã vẽ
3. Screenshots đã tham chiếu (ghi rõ trang nào)
4. Ghi chú nếu có điểm khác biệt so với app hiện tại (và lý do)

---

## Ví dụ thực tế

### Roger nói: "vẽ UI cho trang Conversions admin"

**Bước 1c — Load screenshots:**
- Mở `admin-programs/UI1-programs-list.png` → xem pattern list page (header, filters, table)
- Mở `admin-affiliates/UI1-affiliates-list.png` → xem pattern list page khác
- Mở `admin-payouts/UI1-payouts-pending-tab.png` → xem pattern tabs
- Mở `admin-programs/UI3-programs-delete-modal.png` → xem pattern modal
- Mở `admin-payouts/UI2-payouts-mark-paid-modal.png` → xem pattern action modal

**Rút ra patterns:**
- List page: Page title + action button ở header → Filters → IndexTable → Pagination
- Modal: Overlay dark → Card center → Title + body + footer buttons
- Tabs: Tab bar ở trên table, underline active tab
- Bulk actions: Checkbox column → select bar ở top

**Vẽ UI:** Áp dụng ĐÚNG patterns trên vào trang Conversions mới.

---

## Lưu ý đặc biệt

- **KHÔNG sáng tạo style mới** khi app đã có pattern tương tự → copy pattern
- **Nếu feature cần pattern chưa có trong app** (ví dụ: chart, timeline) → ghi chú rõ "Pattern mới, chưa có trong app" và đề xuất style phù hợp
- **Admin pages** dùng Shopify Polaris (embedded app)
- **Portal pages** dùng custom design (xem Design System)
- **Không mix** — Admin page KHÔNG dùng style portal và ngược lại
