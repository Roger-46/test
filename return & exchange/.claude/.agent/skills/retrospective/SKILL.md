---
name: retrospective
description: Learning loop — phân tích output gần nhất, tìm patterns, ghi lessons learned. Trigger khi nói "retrospective", "lessons learned", "review lại".
---

# Skill: Retrospective — Learning Loop

## Mục đích

Phân tích các output đã tạo (Research, PRD, UI, Test Case), so sánh với tiêu chuẩn, tìm patterns lỗi lặp lại, ghi lessons để cải thiện.

---

## Input

- `feature_name` — tính năng cần retrospective (hoặc "all" cho tất cả features gần nhất)
- Folder: `documents/roger/features/{feature}/`

---

## Quy trình

### Bước 1: Thu thập output

Đọc tất cả files trong folder feature:
- `research-{feature}.md`
- `PRD-{feature}.md`
- `UI-{feature}.html`
- `test-case-{feature}.html`
- `release-note-{feature}.md` (nếu có)

### Bước 2: Đánh giá từng file

Dùng skill review tương ứng (nếu chưa review):
- Research → `ba-review-research`
- PRD → `ba-review-prd`
- UI → `ba-review-design`
- Test Case → `ba-review-testcase`

Nếu đã có review score → lấy từ context cuộc trò chuyện.

### Bước 3: Phân tích patterns

| Loại | Câu hỏi |
|------|---------|
| **Recurring issues** | Lỗi nào xuất hiện ≥2 lần qua các features? |
| **Skill gaps** | Skill nào consistently cho output yếu? |
| **Process bottlenecks** | Bước nào tốn thời gian nhất? Review fail nhiều nhất? |
| **Quality trends** | Score có cải thiện hay đi xuống so với feature trước? |

### Bước 4: Ghi lessons

---

## Output Format (trong chat)

```markdown
## Retrospective: {Feature Name}

### Score Summary
| Document | Score | Verdict | Lần review |
|----------|-------|---------|------------|
| Research | X/8 Solid | READY TO PRD | 1 |
| PRD | Y/10 | READY FOR DEV | 2 |
| UI | Z/12 | APPROVED | 1 |
| Test Case | W/8 | READY FOR QA | 1 |

### Patterns Found
1. **[Pattern]** — [Mô tả, xuất hiện ở đâu, bao nhiêu lần]
2. **[Pattern]** — [Mô tả]

### Lessons Learned
| # | Lesson | Apply to |
|---|--------|----------|
| 1 | [Bài học] | [Skill/workflow nào cần cập nhật] |
| 2 | [Bài học] | [Áp dụng ở đâu] |

### Action Items
- [ ] [Cập nhật skill X với rule mới]
- [ ] [Thêm check Y vào review Z]
```

---

## Output File (nếu có lessons quan trọng)

Lưu tại: `.claude/memory/daily-log/{DD-M-YYYY}.md` → thêm section Retrospective

---

## Quy tắc

- **KHÔNG tự sửa file** — chỉ phân tích và ghi lessons
- Nếu tìm thấy pattern lỗi → đề xuất cập nhật skill, KHÔNG tự sửa
- So sánh với features trước nếu có data
- Focus vào **actionable insights** — không triết lý chung chung
- Ghi rõ "apply to [skill/workflow nào]" cho mỗi lesson
