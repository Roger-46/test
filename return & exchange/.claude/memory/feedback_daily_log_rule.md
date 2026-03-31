---
name: Daily Log Auto-Update Rule
description: Rule for Claude to automatically update daily log file during conversations, including cross-day handling for after-5PM work
type: feedback
---

Chỉ tạo daily log khi Roger thực sự làm việc trong ngày (có conversation với Claude). Không tạo file cho ngày không làm việc.

**File location**: `D:\affily affiliate marketing\.claude\memory\daily-log\{DD-M-YYYY}.md`

**Khi nào tạo/cập nhật**:
- Chỉ khi có conversation thực sự với Roger trong ngày đó
- Khi hoàn thành task quan trọng (tạo PRD, vẽ UI, fix bug, tạo Jira task, etc.)
- Trước khi kết thúc conversation dài
- **KHÔNG tạo file nếu ngày đó không có làm việc**

**Xử lý cross-day (after 5PM)**:
- Daily log được tạo template lúc 5PM, nhưng Roger có thể làm việc đến 10PM+
- Khi bắt đầu conversation mới vào ngày hôm sau, Claude phải:
  1. Kiểm tra file daily log **ngày hôm trước** — nếu có công việc sau 5PM chưa được ghi → **bổ sung vào file hôm trước**
  2. Tạo/cập nhật file daily log **ngày hôm nay** với công việc mới
- Cách nhận biết: đọc git log, conversation history, hoặc file changes có timestamp sau 5PM ngày trước

**Cách cập nhật**:
- Nếu file chưa tồn tại → tạo mới với template đầy đủ
- Nếu file đã tồn tại → append thêm nội dung mới (không xóa nội dung cũ)
- Viết tiếng Việt, ngắn gọn, dạng bullet points

**Why:** Roger làm việc từ sáng đến tối (~10PM). Daily log tạo template lúc 5PM nhưng chưa capture được phần after-5PM. Cần Claude bổ sung phần này vào ngày hôm sau.

**How to apply:** Đầu mỗi conversation ngày mới → kiểm tra & bổ sung daily log hôm trước. Cuối mỗi conversation hoặc sau task lớn → cập nhật daily log hôm nay.
