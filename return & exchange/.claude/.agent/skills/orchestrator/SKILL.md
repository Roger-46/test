---
name: orchestrator
description: Điều phối agent/workflow/skill routing. Đọc file này ĐẦU TIÊN khi nhận bất kỳ yêu cầu nào từ Roger.
---

# Orchestrator — Điều Phối Trung Tâm

## Mục đích

Khi Roger đưa ra yêu cầu, orchestrator phân tích lệnh → route đúng workflow/agent/skill → thực thi.

---

## Routing Table

### BA Workflows (tạo tài liệu, KHÔNG code)

| Trigger | Route | File |
|---------|-------|------|
| "full luồng", "full flow", "làm tính năng X full luồng" | Flow 0: Auto BA Pipeline | `.claude/workflows/ba-workflows/full-ba-workflow.md` |
| "research", "phân tích" | Bước 1-2 trong full-ba-workflow | Research + Review |
| "viết PRD", "PRD cho X" | Bước 3-4 trong full-ba-workflow | PRD + Review |
| "vẽ UI", "design UI", "tạo mockup" | Bước 5-6 trong full-ba-workflow | UI + Review |
| "viết test case" | Bước 7-8 trong full-ba-workflow | Test Case + Review |
| "tạo task notion" | Skill: notion/create-task | `.claude/.agent/skills/notion/create-task.md` |
| "tạo task jira", "tạo task", "tạo task dev" | Skill: jira/create-task | `.claude/.agent/skills/jira/create-task.md` |
| "review research" | Skill: ba-review-research | `.claude/.agent/skills/ba-review-research/SKILL.md` |
| "review PRD" | Skill: ba-review-prd | `.claude/.agent/skills/ba-review-prd/SKILL.md` |
| "review UI", "review design" | Skill: ba-review-design | `.claude/.agent/skills/ba-review-design/SKILL.md` |
| "review test case" | Skill: ba-review-testcase | `.claude/.agent/skills/ba-review-testcase/SKILL.md` |
| "viết release note" | Skill: release-note | `.claude/.agent/skills/release-note/SKILL.md` |

### Dev Workflows (code)

| Trigger | Route | File |
|---------|-------|------|
| "/plan", "lên plan" | Agent: planner | `.claude/.agent/agents/planner.md` |
| "/fix", "sửa bug" | Workflow: fix | `.claude/.agent/workflows/fix.md` |
| "/debug" | Workflow: debug | `.claude/.agent/workflows/debug.md` |
| "/test" | Workflow: test | `.claude/.agent/workflows/test.md` |
| "/review" | Workflow: review | `.claude/.agent/workflows/review.md` |
| "/refactor" | Workflow: refactor | `.claude/.agent/workflows/refactor.md` |
| "/security" | Workflow: security | `.claude/.agent/workflows/security.md` |
| "/perf" | Workflow: perf | `.claude/.agent/workflows/perf.md` |
| "/impact" | Workflow: impact | `.claude/.agent/workflows/impact.md` |
| "/commit" | Workflow: commit | `.claude/.agent/workflows/commit.md` |

### Reports & Operations

| Trigger | Route | File |
|---------|-------|------|
| "báo cáo", "daily report", "tình hình" | Workflow: daily-report | `.claude/.agent/workflows/daily-report.md` |
| "retrospective", "lessons learned" | Skill: retrospective | `.claude/.agent/skills/retrospective/SKILL.md` |
| "organize docs", "sắp xếp tài liệu" | Skill: feature-organizer | `.claude/.agent/skills/feature-organizer/SKILL.md` |
| "/test-checklist" | Workflow: test-checklist | `.claude/.agent/workflows/test-checklist.md` |
| "/browser-test" | Workflow: browser-test | `.claude/.agent/workflows/browser-test.md` |

---

## Pre-flight Checks (MỖI REQUEST)

1. **Check memory**: Đọc `MEMORY.md` → lấy feedback/preferences
2. **Check skills**: Đọc skills liên quan TRƯỚC khi thực thi
3. **Check daily log**: Nếu Roger làm việc → update daily log

---

## Quy tắc

- **"Full luồng" = BA workflow** — KHÔNG BAO GIỜ code
- **Đọc skill TRƯỚC khi thực thi** — không dùng logic tự nghĩ
- **Mỗi bước báo progress** ngắn gọn: "Bước X/N: [tên]... ✅"
- **Ngôn ngữ**: Documents bằng tiếng Việt, UI/customer content bằng tiếng Anh
- **Files BA lưu đúng folder**: `documents/roger/features/{N}-{feature}/`
- Feature folder phải đánh số theo thứ tự (8, 9, 10...)

---

## Context — Team Affily

| Vai trò | Người | Jira username |
|---------|-------|---------------|
| BA/PO | Roger (Hải) | haidx |
| Dev | Cường | cuongnh01 |
| Tester | Thắng Hải | thanghai |
| Reviewer | Tùng | tunght |

**App**: Affily — Shopify Affiliate Marketing App
**Jira Project**: SB
**Stack**: Node.js, Firebase, React, Polaris, Shopify APIs
