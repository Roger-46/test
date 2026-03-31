---
name: Notion task không bao gồm testing
description: Khi viết PRD lên Notion task, không bao gồm phần testing (test cases, testing breakdown)
type: feedback
---

Khi đẩy PRD lên Notion task, KHÔNG bao gồm thông tin liên quan đến test:
- Bỏ section "Testing" trong Implementation Breakdown
- Bỏ test cases reference
- Grand Total chỉ tính Backend + Frontend, không tính Testing

**Why:** Testing là việc riêng, không cần nằm trong task description trên Notion.

**How to apply:** Khi viết script đẩy PRD lên Notion, skip các section testing. Chỉ giữ: Business Context, User Stories, Scope, UI Design, Data Model, API, Technical Architecture, Tag Resolution, Edge Cases, Security, Implementation (Backend + Frontend only), Risks, Future.
