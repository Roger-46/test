# Full BA Workflow — Luồng Tự Động End-to-End

**Trigger**: Roger nói "làm tính năng {X} full luồng" hoặc "full flow {X}"

Toàn bộ luồng chạy **tự động**, không cần Roger confirm giữa các bước. Nếu review phát hiện vấn đề → tự sửa → review lại → cho đến khi pass.

---

## Bước 0: ESTIMATE TIME

**Trước khi bắt đầu**, báo Roger:

```
## Full Flow: {Feature Name}

**Estimated time**: ~X-Y phút

| Bước | Thời gian ước tính |
|------|--------------------|
| Research + Review | ~5-8 phút |
| PRD + Review | ~5-8 phút |
| UI Design + Review | ~8-12 phút |
| Test Case + Review | ~5-8 phút |
| Notion + Jira | ~1 phút |
| **Tổng** | **~25-40 phút** |

> Thời gian có thể tăng nếu review fail nhiều lần.

Bắt đầu ngay?
```

**CHỜ Roger confirm** trước khi chạy. Đây là điểm DUY NHẤT cần confirm.

---

## Tổng Quan Luồng

```
RESEARCH → review → sửa → PASS
    ↓
  PRD → review → sửa → PASS
    ↓
  UI DESIGN → review → sửa → PASS
    ↓
TEST CASE → review → sửa → PASS
    ↓
NOTION TASK → JIRA SUB-TASK → BÁO KẾT QUẢ
```

**Tổng cộng**: 5 deliverables + 4 expert reviews + 2 task creation

---

## Files Output

```
documents/roger/features/{feature}/
├── research-{feature}.md           ← Bước 1
├── PRD-{feature}.md                ← Bước 3
├── UI-{feature}.html               ← Bước 5
└── test-case-{feature}.html        ← Bước 7
```

---

## Chi Tiết Từng Bước

### Bước 1: RESEARCH

**Agent/Skill**: Gọi agent `planner` hoặc dùng web search để research
**Tham chiếu**: `.claude/.agent/skills/ba-research/README.md`

**Việc cần làm:**
1. Research competitor (ít nhất 3 app tương tự trên Shopify)
2. Phân tích user flow, edge cases
3. Check Shopify API/guidelines liên quan
4. Define scope: Must-have / Nice-to-have / Out-of-scope
5. Technical feasibility check

**Output**: `documents/roger/features/{feature}/research-{feature}.md`

---

### Bước 2: REVIEW RESEARCH → Tự sửa

**Skill**: `ba-review-research`

1. Gọi skill review research — đánh giá 8 tiêu chí
2. Nếu verdict = **READY TO PRD** → chuyển bước 3
3. Nếu verdict = **NEEDS WORK** hoặc **REDO**:
   - Đọc feedback từ reviewer
   - Tự sửa file `research-{feature}.md`
   - Review lại lần 2
   - Lặp cho đến khi READY TO PRD (tối đa 3 lần)

---

### Bước 3: VIẾT PRD

**Tham chiếu**: Research đã pass review ở bước 2

**Việc cần làm:**
1. Viết PRD MVP style, tiếng Việt
2. User Stories (đủ persona: merchant, affiliate, admin)
3. Acceptance Criteria (Given/When/Then)
4. Scope rõ ràng (IN / OUT)
5. Data model (Firestore collections, fields, indexes)
6. API endpoints (nếu cần)
7. Edge cases + Error handling
8. Security considerations

**Output**: `documents/roger/features/{feature}/PRD-{feature}.md`

---

### Bước 4: REVIEW PRD → Tự sửa

**Skill**: `ba-review-prd`

1. Gọi skill review PRD — đánh giá 10 tiêu chí
2. Nếu verdict = **READY FOR DEV** → chuyển bước 5
3. Nếu verdict = **NEEDS REVISION** hoặc **MAJOR REWRITE**:
   - Đọc Ambiguity Map + lỗ hổng
   - Tự sửa file `PRD-{feature}.md`
   - Review lại
   - Lặp cho đến khi READY FOR DEV (tối đa 3 lần)

---

### Bước 5: VẼ UI

**Skill**: `ba-create-ui` (`.claude/.agent/skills/ba-create-ui/SKILL.md`)

**Tham chiếu**:
- PRD đã pass review ở bước 4
- Polaris skill: `.claude/.agent/skills/polaris/`
- Design system: `documents/roger/app-interface/UI-DESIGN-SYSTEM.md`
- ⭐ **PNG screenshots app thực tế**: `documents/roger/app-interface/{trang}/UI*.png` — BẮT BUỘC mở & tham chiếu screenshots cùng loại với trang đang vẽ (list, form, modal, dashboard...)

**Việc cần làm:**
1. ⭐ **Load PNG screenshots** các trang cùng loại trong `app-interface/` — xem visual thực tế
2. Map từng user flow trong PRD → màn hình UI
3. Dùng đúng Polaris v12 components
4. Consistent với app interface hiện tại (màu, spacing, typography, patterns) — **đối chiếu trực tiếp với screenshots**
5. Bao gồm: empty state, error state, loading state
6. Tạo HTML mockup interactive

> **Nguyên tắc**: UI mới PHẢI trông giống phần còn lại của app. Nếu design khác visual so với screenshots → dev không merge được.

**Output**: `documents/roger/features/{feature}/UI-{feature}.html`

---

### Bước 6: REVIEW DESIGN → Tự sửa

**Skill**: `ba-review-design`

1. Gọi skill review design — đánh giá 12 tiêu chí (Polaris + App Consistency + UX)
2. ⭐ **So sánh trực tiếp với PNG screenshots** trong `app-interface/` — bước này là blocking
3. Nếu verdict = **APPROVED** → chuyển bước 7
4. Nếu verdict = **NEEDS FIXES** hoặc **REDESIGN**:
   - Sửa Polaris violations
   - Sửa inconsistency với app hiện tại (dựa trên screenshots)
   - Bổ sung missing states
   - Review lại
   - Lặp cho đến khi APPROVED (tối đa 3 lần)

---

### Bước 7: VIẾT TEST CASE

**Skill**: `test-case` (`.claude/.agent/skills/test-case/SKILL.md`)
**Tham chiếu**: PRD (AC) + UI (interactions)

**Việc cần làm:**
1. Map tất cả AC trong PRD → test cases
2. Cover: Happy Path, Validation, Error Handling, Security, UI/UX, Integration
3. Viết steps cụ thể — QA đọc phải chạy được ngay
4. Tạo HTML interactive (tester điền Pass/Fail trực tiếp)

**Output**: `documents/roger/features/{feature}/test-case-{feature}.html`

---

### Bước 8: REVIEW TEST CASE → Tự sửa

**Skill**: `ba-review-testcase`

1. Gọi skill review test case — đánh giá 8 tiêu chí + Coverage Matrix
2. Nếu verdict = **READY FOR QA** → chuyển bước 9
3. Nếu verdict = **NEEDS MORE CASES** hoặc **REWRITE**:
   - Bổ sung test cases thiếu (từ reviewer suggestions)
   - Làm rõ steps mơ hồ
   - Review lại
   - Lặp cho đến khi READY FOR QA (tối đa 3 lần)

---

### Bước 9: TẠO NOTION TASK

**Skill**: `notion/create-task` (`.claude/.agent/skills/notion/create-task.md`)

1. Title = tên tính năng
2. Trạng thái = Doing
3. Ngày = hôm nay
4. Nội dung = tóm tắt từ PRD (theo format 8 sections trong skill)
5. Gọi API silently → lấy Notion URL

---

### Bước 10: TẠO JIRA SUB-TASK

**Skill**: `jira/create-task` (`.claude/.agent/skills/jira/create-task.md`)

**Parent task tháng 3/2026**: `SB-9350` (Issue ID: `21880`)

1. Title = `[BD][AFF] {tên tính năng}`
2. Description = `Notion: {notion_url}`
3. Gọi API silently → lấy Jira URL

---

### Bước 11: BÁO KẾT QUẢ

Báo tổng kết ngắn gọn trong chat:

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
| Research | READY TO PRD | 1 |
| PRD | READY FOR DEV | 2 (sửa 1 lần) |
| Design | APPROVED | 1 |
| Test Case | READY FOR QA | 1 |

### Tasks
| Platform | Link |
|----------|------|
| Notion | {notion_url} |
| Jira | {jira_key} — {jira_url} |
```

---

## Quy Tắc Chung

- **Không dừng hỏi Roger** giữa các bước — chạy auto từ đầu đến cuối
- **Tự sửa khi review fail** — đọc feedback, sửa file, review lại
- **Tối đa 3 lần review** mỗi bước — nếu lần 3 vẫn fail → dừng lại báo Roger
- **Luôn dùng đúng skill** — không tự review bằng logic thường, phải gọi skill tương ứng
- **Files lưu đúng folder**: `documents/roger/features/{feature}/`
- **Mỗi bước báo progress** ngắn gọn: "Bước X/11: [tên bước]... ✅"
- **Ngôn ngữ**: Documents bằng tiếng Việt, UI/customer content bằng tiếng Anh

---

## Parent Task Jira (cập nhật theo tháng)

| Tháng | Task Key | Issue ID |
|-------|----------|----------|
| 3/2026 | SB-9350 | 21880 |

> Khi Roger thông báo tháng mới → cập nhật bảng này + cập nhật skill `jira/create-task.md`

---

**Version**: 2.0
**Updated**: 2026-03-15
**Status**: Active
