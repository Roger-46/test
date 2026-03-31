---
name: Check skills/memory before acting
description: Always check relevant skills and memory files BEFORE executing any task - don't assume defaults
type: feedback
---

Luôn đọc kĩ skill/memory liên quan TRƯỚC khi thực hiện bất kì task nào.

**Why:** Roger đã lưu các config chi tiết (parent task, field formats, templates) vào skill/memory. Khi không đọc kĩ sẽ tạo sai (ví dụ: tạo Task thay vì Sub-task, sai parent).

**How to apply:** Khi Roger yêu cầu làm gì (tạo Jira, Notion, deploy...), bước đầu tiên là tìm và đọc TẤT CẢ file skill/memory liên quan — grep trong TOÀN BỘ `.claude/` (bao gồm cả `skills/`, `workflows/`, `memory/`), không chỉ folder kỹ thuật. Không bao giờ dựa vào assumption.

**Trigger keywords:**
- "full luồng" / "full flow" → BẮT BUỘC check `.claude/workflows/ba-workflows/full-ba-workflow.md` trước — đây là luồng BA, KHÔNG phải luồng code
- "review" → check `ba-review-*` skills
- "tạo task" → check `notion/create-task.md` + `jira/create-task.md`
