---
name: Use Node.js for UTF-8 API calls
description: On Windows, always use Node.js (not curl) for API calls with Vietnamese/Unicode text to avoid encoding issues
type: feedback
---

Trên Windows, LUÔN dùng Node.js thay vì curl khi API call chứa tiếng Việt/Unicode.

**Why:** curl trên Windows không xử lý UTF-8 đúng, dẫn đến title bị lỗi ký tự (ví dụ: "V? Roadmap l? tr?nh" thay vì "Vẽ Roadmap lộ trình").

**How to apply:** Với mọi API call (Notion, Jira, Slack...) có nội dung tiếng Việt, dùng `node -e` với `https` module. Chỉ dùng curl cho API call thuần ASCII.
