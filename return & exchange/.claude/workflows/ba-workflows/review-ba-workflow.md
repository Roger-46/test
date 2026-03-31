# Review BA Workflow — Luồng Có Review Từng Bước

**Trigger**: Roger nói "làm tính năng {X} có review" hoặc "review flow {X}"

Giống full flow nhưng **dừng sau mỗi mục lớn** để Roger review. Roger nói "tiếp" / "ok" / "tiếp tục" → chạy mục tiếp theo.

---

## Bước 0: ESTIMATE TIME

**Trước khi bắt đầu**, báo Roger:

```
## Review Flow: {Feature Name}

**Estimated time**: ~25-40 phút (không tính thời gian Roger review)

| Bước | Thời gian ước tính | Dừng chờ Roger? |
|------|--------------------|-----------------|
| Research + Expert Review | ~5-8 phút | ⏸️ DỪNG |
| PRD + Expert Review | ~5-8 phút | ⏸️ DỪNG |
| UI Design + Expert Review | ~8-12 phút | ⏸️ DỪNG |
| Test Case + Expert Review | ~5-8 phút | ⏸️ DỪNG |
| Notion + Jira | ~1 phút | — |

> Sẽ dừng **4 lần** để Roger review. Nói "tiếp" để chạy mục kế tiếp.

Bắt đầu ngay?
```

**CHỜ Roger confirm** trước khi chạy.

---

## Tổng Quan Luồng

```
RESEARCH → expert review → tự sửa → PASS → ⏸️ DỪNG CHỜ ROGER
    ↓ (Roger: "tiếp")
  PRD → expert review → tự sửa → PASS → ⏸️ DỪNG CHỜ ROGER
    ↓ (Roger: "tiếp")
  UI DESIGN → expert review → tự sửa → PASS → ⏸️ DỪNG CHỜ ROGER
    ↓ (Roger: "tiếp")
TEST CASE → expert review → tự sửa → PASS → ⏸️ DỪNG CHỜ ROGER
    ↓ (Roger: "tiếp")
NOTION TASK → JIRA SUB-TASK → BÁO KẾT QUẢ
```

---

## Files Output

```
documents/roger/features/{feature}/
├── research-{feature}.md           ← Mục 1
├── PRD-{feature}.md                ← Mục 2
├── UI-{feature}.html               ← Mục 3
└── test-case-{feature}.html        ← Mục 4
```

---

## Chi Tiết Từng Mục

### Mục 1: RESEARCH

**Bên trong mục này chạy auto:**
1. Research (agent/web search) → tạo `research-{feature}.md`
2. Gọi skill `ba-review-research` → expert review
3. Nếu chưa pass → tự sửa → review lại (tối đa 3 lần)

**Khi PASS**, báo Roger:

```
## ⏸️ Mục 1/4: Research — READY TO PRD ✅

**File**: `documents/roger/features/{feature}/research-{feature}.md`
**Expert Review**: READY TO PRD (lần X)

### Tóm tắt nội dung:
- [3-5 bullet points chính từ research]

### Expert Review Highlights:
- Điểm mạnh: [...]
- Đã sửa: [...] (nếu có)

> Roger review file xong, nói **"tiếp"** để chuyển sang viết PRD.
> Hoặc nói **"sửa [nội dung cần sửa]"** nếu muốn chỉnh.
```

**DỪNG. CHỜ Roger.**

Nếu Roger nói "sửa..." → sửa theo yêu cầu → báo lại → chờ tiếp.
Nếu Roger nói "tiếp" / "ok" → chuyển Mục 2.

---

### Mục 2: PRD

**Bên trong mục này chạy auto:**
1. Viết PRD từ research đã pass → tạo `PRD-{feature}.md`
2. Gọi skill `ba-review-prd` → expert review
3. Nếu chưa pass → tự sửa → review lại (tối đa 3 lần)

**Khi PASS**, báo Roger:

```
## ⏸️ Mục 2/4: PRD — READY FOR DEV ✅

**File**: `documents/roger/features/{feature}/PRD-{feature}.md`
**Expert Review**: READY FOR DEV (lần X)

### Tóm tắt nội dung:
- User Stories: X stories
- Acceptance Criteria: X ACs
- Scope: [in/out summary]

### Expert Review Highlights:
- Điểm mạnh: [...]
- Đã sửa: [...] (nếu có)

> Roger review file xong, nói **"tiếp"** để chuyển sang vẽ UI.
> Hoặc nói **"sửa [nội dung cần sửa]"** nếu muốn chỉnh.
```

**DỪNG. CHỜ Roger.**

---

### Mục 3: UI DESIGN

**Bên trong mục này chạy auto:**
1. Vẽ UI từ PRD đã pass → tạo `UI-{feature}.html`
   - Đọc Polaris skill + app interface + design system
2. Gọi skill `ba-review-design` → expert review (Polaris + App Consistency + UX)
3. Nếu chưa pass → tự sửa → review lại (tối đa 3 lần)

**Khi PASS**, báo Roger:

```
## ⏸️ Mục 3/4: UI Design — APPROVED ✅

**File**: `documents/roger/features/{feature}/UI-{feature}.html`
**Expert Review**: APPROVED (lần X)

### Tóm tắt:
- Số màn hình: X
- Polaris Compliance: ✅
- App Consistency: ✅
- States: empty / error / loading ✅

### Expert Review Highlights:
- Điểm mạnh: [...]
- Đã sửa: [...] (nếu có)

> Roger mở file HTML để xem, nói **"tiếp"** để chuyển sang viết test case.
> Hoặc nói **"sửa [nội dung cần sửa]"** nếu muốn chỉnh.
```

**DỪNG. CHỜ Roger.**

---

### Mục 4: TEST CASE

**Bên trong mục này chạy auto:**
1. Viết test case từ PRD + UI → tạo `test-case-{feature}.html`
2. Gọi skill `ba-review-testcase` → expert review + Coverage Matrix
3. Nếu chưa pass → tự sửa → review lại (tối đa 3 lần)

**Khi PASS**, báo Roger:

```
## ⏸️ Mục 4/4: Test Case — READY FOR QA ✅

**File**: `documents/roger/features/{feature}/test-case-{feature}.html`
**Expert Review**: READY FOR QA (lần X)

### Tóm tắt:
- Tổng test cases: X
- Coverage: X/Y AC (Z%)
- Categories: Happy Path (X), Validation (X), Security (X), ...

### Expert Review Highlights:
- Điểm mạnh: [...]
- Đã sửa: [...] (nếu có)

> Roger review xong, nói **"tiếp"** để tạo Notion + Jira tasks.
> Hoặc nói **"sửa [nội dung cần sửa]"** nếu muốn chỉnh.
```

**DỪNG. CHỜ Roger.**

---

### Mục 5: TẠO TASKS + BÁO KẾT QUẢ

**Chạy auto, không dừng:**
1. Tạo Notion task (skill `notion/create-task`) → lấy URL
2. Tạo Jira sub-task (skill `jira/create-task`, parent: theo bảng tháng) → lấy URL
3. Báo kết quả:

```
## Hoàn thành: {Feature Name}

### Files đã tạo
| File | Path |
|------|------|
| Research | `documents/roger/features/{feature}/research-{feature}.md` |
| PRD | `documents/roger/features/{feature}/PRD-{feature}.md` |
| UI Design | `documents/roger/features/{feature}/UI-{feature}.html` |
| Test Case | `documents/roger/features/{feature}/test-case-{feature}.html` |

### Review Summary
| Bước | Verdict | Lần review |
|------|---------|------------|
| Research | READY TO PRD | X |
| PRD | READY FOR DEV | X |
| Design | APPROVED | X |
| Test Case | READY FOR QA | X |

### Tasks
| Platform | Link |
|----------|------|
| Notion | {notion_url} |
| Jira | {jira_key} — {jira_url} |
```

---

## Quy Tắc

- **Trong mỗi mục**: chạy auto (tạo file → expert review → tự sửa nếu fail)
- **Giữa các mục**: DỪNG chờ Roger
- **Roger nói "tiếp"** / "ok" / "tiếp tục" / "next" → chạy mục kế tiếp
- **Roger nói "sửa [X]"** → sửa theo yêu cầu → báo lại → chờ tiếp
- **Roger nói "bỏ qua"** / "skip" → bỏ mục hiện tại, chuyển mục kế tiếp
- **Tối đa 3 lần expert review** mỗi mục — lần 3 vẫn fail → dừng báo Roger
- **Files lưu đúng folder**: `documents/roger/features/{feature}/`

---

## Parent Task Jira (cập nhật theo tháng)

| Tháng | Task Key | Issue ID |
|-------|----------|----------|
| 3/2026 | SB-9350 | 21880 |

---

**Version**: 1.0
**Created**: 2026-03-15
**Status**: Active
