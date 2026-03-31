---
name: Documentation Workflow Rules
description: Feature documentation structure - 1 folder per feature with research, PRD, UI, test-case files and trigger words
type: feedback
---

**Moi tinh nang = 1 folder** tai `documents/roger/features/{ten-tinh-nang}/`

```
documents/roger/features/{feature}/
├── research-{feature}.md     <- khi Roger noi "research"
├── PRD-{feature}.md          <- khi Roger noi "viet PRD"
├── UI-{feature}.html         <- khi Roger noi "ve UI"
└── test-case-{feature}.md    <- khi Roger noi "viet test case"
```

**Why:** Roger follows a strict BA workflow: Research -> PRD -> UI -> Test case.
**How to apply:** Listen for trigger words and auto-create correct file in correct folder.

**App Interface Library**: `documents/roger/app-interface/{ten-trang}/`
- Roger input anh cac trang -> tham chieu khi design UI moi
- Sau khi Roger chot design -> chup screenshot PNG luu vao day
- Chi tao moi, KHONG xoa/thay anh cu
