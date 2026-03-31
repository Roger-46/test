# Skill: Viết PRD

## Trigger
Khi Roger nói **"viết PRD"**, **"tạo PRD"**, hoặc **"PRD cho [tính năng]"** → đọc skill này và thực hiện theo đúng quy trình.

---

## Quy trình (Luôn làm đủ 4 bước)

### BƯỚC 1 — Chuẩn bị

Trước khi viết, thực hiện **song song**:

1. **Đọc research files** (nếu có) — tìm trong `documents/roger/research/{feature}/`
2. **Khám phá codebase** — dùng Glob/Grep tìm files liên quan đến feature
3. **Hỏi nếu thiếu** thông tin bắt buộc:
   - Tên feature chính xác
   - Jira ticket ID (nếu chưa có → ghi "[Cập nhật sau]")
   - Scope MVP: những gì IN, những gì OUT

> Nếu đã biết đủ → không hỏi thêm, viết luôn.

---

### BƯỚC 2 — Viết PRD theo template dưới đây

**Ngôn ngữ**: Tiếng Việt nội dung, tiếng Anh cho thuật ngữ kỹ thuật.

**Lưu file** tại: `documents/roger/tài liệu/{tên-feature}/PRD-{TÊN-FEATURE}-MVP.md`

> **Ảnh UI mockup** (HTML + PNG) cũng lưu cùng folder: `documents/roger/tài liệu/{tên-feature}/`

---

## Template chuẩn

```markdown
# [Tên Feature]

**Link task Jira:** [Cập nhật sau]

### Task List

| Ticket | Link | Status |
|--------|------|--------|
| SB-XXXX | [Link] | In Progress |

### History

| Phiên bản | Ngày | Tác giả | Loại | Mô tả |
|-----------|------|---------|------|-------|
| 1.0 | DD/MM/YYYY | Roger | A | Tạo mới |

> A = Added, M = Modified, D = Deleted

---

## Mục Lục

1. [Executive Summary](#1-executive-summary)
2. [Personas & User Stories](#2-personas--user-stories)
3. [Product Solutions](#3-product-solutions)
4. [Design Description](#4-design-description)
5. [Acceptance Criteria](#5-acceptance-criteria)

---

## 1. Executive Summary

- **Vấn đề**: [Pain point cốt lõi — 1 câu]
- **Giải pháp**: [Feature làm gì — 1 câu]
- **Đối tượng**: [Persona(s) sử dụng]
- **Business value**: [Lợi ích cụ thể]
- **Scope**: [Tóm tắt MVP trong 1 câu]

---

## 2. Personas & User Stories

### Personas

| Persona | Profile | Nhu cầu chính |
|---------|---------|---------------|
| [Tên] | [Role, loại shop, tech level] | [Nhu cầu cụ thể] |

### User Stories

Là 1 [role], tôi muốn [action] để [outcome].

---

## 3. Product Solutions

### 3.1. Solution Overview

[1–2 đoạn mô tả feature làm gì + bulleted list tính năng chính]

### 3.2. Scope

**Trong scope (MVP):**
- [Feature A]

**Ngoài scope:**
- [Feature X] — Lý do: [why]

### 3.3. UI Flow

> Figma: [Link — cập nhật sau]

[Mô tả từng màn hình theo thứ tự trải nghiệm]

**[Tên màn hình] — [Điều kiện xuất hiện]**

[Mô tả ngắn user đang ở đâu, thấy gì]

```
[ASCII mockup layout]
```

| Hành động | Kết quả |
|-----------|---------|
| [Action] | [Result] |

### 3.4. Interaction with Shopify *(bỏ nếu không có)*

[Mô tả tương tác với Shopify API/webhooks]

### 3.5. Error Messages *(bỏ nếu không có)*

| Error | Khi nào xảy ra | Message hiển thị | Action |
|-------|----------------|-----------------|--------|
| [Tên] | [Trigger] | "[Exact text]" | [Xử lý] |

### 3.6. Success Messages *(bỏ nếu không có)*

| Event | Khi nào | Message |
|-------|---------|---------|
| [Tên] | [Trigger] | "[Exact text]" |

---

## 4. Design Description

### 4.1. [Tên màn hình]

> Màn hình này mở khi: [trigger condition]

| Item | Data Type | Required | Default | Mô tả | Validate Rule |
|------|-----------|----------|---------|-------|---------------|
| [Component] | Text/Badge/Button/Selection | Y/N | [default] | [Behavior] | [Rules] |

---

## 5. Acceptance Criteria

### Functional Requirements

☐ [Requirement 1 — testable, cụ thể]
☐ [Requirement 2]

### Edge Cases

☐ [Scenario thực tế + expected behavior]
☐ [Ít nhất 3 edge cases]

### Security *(nếu có API)*

☐ Tất cả API validate shopId (IDOR prevention)
☐ Merchant chỉ thấy data của shop mình
```

---

### BƯỚC 3 — Checklist trước khi hoàn thành

```
[ ] File đã lưu tại documents/roger/tài liệu/{feature}/PRD-{FEATURE}-MVP.md
[ ] Header có Jira link, History table, Mục lục
[ ] Executive Summary đủ 5 bullets — đọc 30 giây hiểu hết
[ ] User Stories đúng format "Là 1 [role], tôi muốn... để..."
[ ] UI Flow có ASCII mockup + bảng action → result cho từng màn hình
[ ] Error Messages có exact message text
[ ] Acceptance Criteria dùng ☐, mỗi item testable
[ ] Edge Cases có ít nhất 3 scenarios
[ ] Design Description có bảng chuẩn (Item/DataType/Required/Default/Mô tả/Validate)
[ ] Sub-sections không áp dụng đã bỏ — không để trống
```

---

### BƯỚC 4 — Báo cáo kết quả

Sau khi lưu file, báo Roger:
1. Link file vừa tạo
2. Tóm tắt 3–5 điểm chính của PRD
3. Hỏi có cần điều chỉnh gì không

---

## Ví dụ PRD đã có trong project

| Feature | File |
|---------|------|
| Conversions (Trang duyệt sale affiliate) | `documents/roger/tài liệu/commission/PRD-COMMISSION-MVP.md` |
| Conversions (Bản đầy đủ) | `documents/roger/tài liệu/convesion page/PRD-CONVERSIONS-MVP.md` |

> Đọc các file này làm **reference** cho format và level of detail phù hợp với Affily.

---

## Lưu ý đặc biệt cho Affily

- **Target user chính**: Merchant (Shopify shop owner)
- **Tech stack**: React/Polaris admin, Firebase backend, Firestore DB
- **Multi-tenant**: Mọi data query đều phải scope theo `shopId`
- **Polaris components**: Dùng đúng component name (IndexTable, Badge, Filters, EmptyState...)
- **API format**: `{ success, data, error }` — phải note trong PRD nếu có endpoint mới
