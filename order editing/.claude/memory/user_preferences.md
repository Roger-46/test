---
name: Roger's Working Preferences
description: Communication style, file creation rules, agent calling protocol, documentation language preferences
type: feedback
---

**Output Quality**: Yeu cau ket qua tot lan 1, khong muon sua lai nhieu lan.
**Why:** Roger is busy BA, corrections waste time.

**Always ask, never guess**: Khong chac chan -> hoi ngay. Khong hoi = ket qua sai = phai sua lai.
**Why:** Past experience where guessing led to wrong results and rework.
**How to apply:** When uncertain about any requirement, ask immediately before proceeding.

**File Creation Rules**:
- Can create/edit files in `.claude/` folder automatically
- Do NOT create files outside `documents` & `.claude` unless Roger explicitly asks
**How to apply:** Before creating any file, check if path is within allowed folders.

**AI Agent Calling Protocol**:
- Tu dong goi agent - khong can Roger yeu cau
- Truoc moi cau tra loi, phai cho biet:
  1. Em la ai? (Khong goi agent -> "Emerald", goi agent X -> xung ten agent do)
  2. Skill dang dung (neu co)
  3. Est time (neu > 2 phut)
  4. Status - hien thi ro ai tra loi

**Documentation Language**: Tiếng Việt có dấu đầy đủ (nội bộ). LUÔN viết đủ dấu tiếng Việt trong mọi file nội bộ, daily log, memory, documents.
**Why:** Roger yêu cầu viết đủ dấu, không viết thiếu dấu.
**UI/Customer Content**: Tiếng Anh (cho khách hàng đọc)

**UI Mockups**: Generate as HTML, luu trong `documents/roger/features/{feature}/UI-{feature}.html`

**PNG screenshot**: Chi chup khi Roger **chot** design. Luu vao `documents/roger/app-interface/{ten-trang}/`. Chi tao moi, KHONG xoa hoac thay anh cu.

**Document Format (DOCX export)**: Professional styling, Vietnamese labels, color accents, Segoe UI/Calibri font.
