---
name: feature-organizer
description: Organize tài liệu feature vào đúng folder structure. Trigger khi tạo feature mới hoặc "organize docs", "sắp xếp tài liệu".
---

# Skill: Feature Organizer

## Mục đích

Đảm bảo tài liệu feature nằm đúng folder, đúng naming convention, đúng thứ tự.

---

## Folder Structure Chuẩn

```
documents/roger/features/
├── 1-dashboard/
├── 2-conversion-page/
├── 3-auto-tag-referral-orders/
├── 4-payment-schedule/
├── 5-email-notifications/
├── 6-forgot-password/
├── 7-research-feature/
├── {N}-{feature-name}/          ← Feature mới
│   ├── research-{feature}.md
│   ├── PRD-{feature}.md
│   ├── UI-{feature}.html
│   ├── test-case-{feature}.html
│   └── release-note-{feature}.md
```

---

## Quy trình

### Khi tạo feature mới:

1. **Xác định số thứ tự tiếp theo**
   - Scan `documents/roger/features/` → tìm số lớn nhất hiện tại
   - Số mới = số lớn nhất + 1

2. **Tạo folder**
   - Format: `{N}-{feature-name-kebab-case}`
   - Ví dụ: `8-coupon-code-tracking`

3. **Verify naming convention**
   - `research-{feature}.md` — research document
   - `PRD-{feature}.md` — Product Requirements Document
   - `UI-{feature}.html` — UI mockup interactive
   - `test-case-{feature}.html` — Test cases interactive
   - `release-note-{feature}.md` — Release note

### Khi organize existing docs:

1. Scan tất cả files trong `documents/roger/features/`
2. Check file nào nằm sai folder hoặc sai tên
3. Đề xuất di chuyển/rename (hỏi Roger trước khi thực hiện)

---

## Quy tắc

- **Số thứ tự bắt buộc** — không có folder nào không có số
- **Thứ tự theo product flow** — không theo thời gian tạo
- Feature name dùng **kebab-case** (viết-thường-gạch-ngang)
- **KHÔNG** tự tạo folder nếu chưa rõ feature name → hỏi Roger
- **KHÔNG** di chuyển file mà không hỏi Roger trước
