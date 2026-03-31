---
name: Full luồng = BA Workflow, NOT coding
description: When Roger says "full luồng" or "full flow", run the BA workflow pipeline - never write code
type: feedback
---

Khi Roger nói "full luồng", "full flow", "làm full luồng tính năng X" → chạy BA workflow tại `.claude/workflows/ba-workflows/full-ba-workflow.md`.

**Why:** Roger đã 3 lần phải sửa vì Claude nhầm "full luồng" thành "implement full feature" rồi nhảy vào code. "Full luồng" là quy trình BA (Research → PRD → UI → Test Case → Notion → Jira), KHÔNG phải coding.

**How to apply:**
- Trigger words: "full luồng", "full flow", "làm tính năng X full luồng"
- Đọc workflow file TRƯỚC, chạy đúng pipeline
- KHÔNG động vào folder `packages/` — chỉ tạo documents trong `documents/roger/features/`
- Output: research → PRD → UI (HTML) → test case (HTML) → Notion task → Jira sub-task
