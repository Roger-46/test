# Full BA Workflow — Luồng Tự Động End-to-End

**Trigger**: Roger nói "làm tính năng {X} full luồng" hoặc "full flow {X}"

Luồng chia **2 phase**:
- **Phase 1** (auto): Estimate → Research → PRD → UI → **DỪNG** chờ Roger review
- **Phase 2** (sau khi Roger confirm): Test Case → Release Note → Notion → Jira → Báo kết quả

Mỗi phase tự sửa khi review fail, tối đa 3 lần/bước.

---

## Bước 0: ESTIMATE TIME

**Trước khi bắt đầu**, báo Roger:

```
## Full Flow: {Feature Name}

**Estimated time**: ~X-Y phút

| Phase | Bước | Thời gian ước tính |
|-------|------|--------------------|
| **Phase 1** | Research + Review | ~5-8 phút |
| | PRD + Review | ~5-8 phút |
| | UI Design + Review | ~8-12 phút |
| | **→ DỪNG chờ Roger review** | |
| **Phase 2** | Test Case + Review | ~5-8 phút |
| | Release Note | ~2 phút |
| | Notion + Jira | ~1 phút |
| | **Tổng** | **~25-40 phút** |

> Phase 1 chạy auto ~20-28 phút, sau đó dừng chờ Roger.
> Phase 2 chạy auto ~8-11 phút sau khi Roger confirm.

Bắt đầu Phase 1?
```

**CHỜ Roger confirm** trước khi chạy Phase 1.

---

## Tổng Quan Luồng

```
━━━ PHASE 1 (auto) ━━━━━━━━━━━━━━━━━━━━━━━
RESEARCH → review → sửa → PASS
    ↓
  PRD → review → sửa → PASS
    ↓
  UI DESIGN → review → sửa → PASS
    ↓
  ⏸️ DỪNG — Roger review Research + PRD + UI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Roger confirm "tiếp tục" / "OK" / feedback

━━━ PHASE 2 (auto) ━━━━━━━━━━━━━━━━━━━━━━━
TEST CASE → review → sửa → PASS
    ↓
RELEASE NOTE
    ↓
NOTION TASK → JIRA SUB-TASK → BÁO KẾT QUẢ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Tổng cộng**: 6 deliverables + 4 expert reviews + 2 task creation
**Confirm points**: 2 (Bước 0 + giữa Phase 1 và Phase 2)

---

## Files Output

```
documents/roger/features/{feature}/
├── research-{feature}.md           ← Bước 1
├── PRD-{feature}.md                ← Bước 3
├── UI-{feature}.html               ← Bước 5
├── test-case-{feature}.html        ← Bước 7
└── release-note-{feature}.md       ← Bước 8.5
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

### ⏸️ CHECKPOINT — KẾT THÚC PHASE 1

**DỪNG LẠI** và báo Roger:

```
## Phase 1 hoàn thành: {Feature Name}

### Files đã tạo
| File | Path | Review |
|------|------|--------|
| Research | `documents/roger/features/{feature}/research-{feature}.md` | {verdict} — {lần review} |
| PRD | `documents/roger/features/{feature}/PRD-{feature}.md` | {verdict} — {lần review} |
| UI Design | `documents/roger/features/{feature}/UI-{feature}.html` | {verdict} — {lần review} |

→ Roger review 3 files trên.
→ Reply **"tiếp tục"** hoặc **"OK"** để chạy Phase 2 (Test Case + Release Note + Notion + Jira).
→ Hoặc feedback cụ thể để tôi sửa trước khi tiếp.
```

**CHỜ Roger reply.** Không tự chạy Phase 2.

- Nếu Roger feedback → sửa file tương ứng → báo lại → chờ confirm tiếp
- Nếu Roger nói "tiếp tục" / "OK" / "phase 2" → chạy Phase 2

---

## ━━━ PHASE 2 (auto sau khi Roger confirm) ━━━

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

### Bước 8.5: VIẾT RELEASE NOTE (MỚI)

**Skill**: `release-note` (`.claude/.agent/skills/release-note/SKILL.md`)

1. Đọc PRD đã pass review
2. Viết release note merchant-facing, tiếng Việt
3. Lưu tại: `documents/roger/features/{feature}/release-note-{feature}.md`

> Bước này chạy auto, không cần review riêng.

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

- **2 điểm confirm**: Bước 0 (trước khi bắt đầu) + Checkpoint giữa Phase 1 và Phase 2
- **Trong mỗi phase**: chạy auto, không dừng hỏi Roger giữa các bước
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

## Parallel Review (Nâng cao — optional)

Khi Roger nói "review kỹ hơn" hoặc feature phức tạp, thay vì self-review đơn lẻ, chạy **multi-perspective review** cho PRD (Bước 4):

1. **Perspective BA**: PRD có đủ sections? User stories cover hết use cases?
2. **Perspective Dev**: Technical feasible? Effort estimate? Architecture constraints?
3. **Perspective QA**: Testable? Edge cases? AC đủ rõ?
4. **Perspective UX**: UI flow logic? Missing states?

Tổng hợp feedback từ 4 perspectives → sửa PRD → review lại.

> Mặc định vẫn chạy self-review (1 skill/bước) để tiết kiệm thời gian.

---

## Rollback Rules

- **Bước 5 (UI) phát hiện PRD thiếu UI specs** → DỪNG, quay lại Bước 3, update PRD sections UI Flow + Design Description, rồi resume Bước 5
- **Bước 7 (Test Case) phát hiện PRD không testable** → DỪNG, quay lại Bước 3, update AC trong PRD, rồi resume Bước 7
- **Review fail 3 lần liên tiếp** → DỪNG toàn bộ, báo Roger với chi tiết vấn đề
- **Roger nói "rollback bước X"** → quay lại bước X, chạy lại từ đó

---

## Scope Change Protocol

Khi Roger yêu cầu thay đổi scope giữa luồng (thêm/bỏ feature):
1. Ghi nhận thay đổi scope
2. Update PRD (Bước 3)
3. Update UI nếu đã vẽ (Bước 5)
4. KHÔNG cần chạy lại research trừ khi Roger yêu cầu
5. Tiếp tục từ bước hiện tại (không restart)

---

**Version**: 3.0
**Updated**: 2026-04-01
**Changelog**:
- v3.0: Thêm Bước 8.5 (Release Note), 2-Phase flow với checkpoint, Parallel Review, Rollback Rules, Scope Change Protocol
- v2.0: Initial full-ba-workflow
**Status**: Active
