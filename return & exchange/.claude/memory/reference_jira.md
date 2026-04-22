---
name: Jira Integration
description: Jira REST API config - project SB, credentials, sub-task template, parent SB-9350, title prefix [BD][R&E]
type: reference
---

- **Base URL**: `https://space.avada.net`
- **Project**: SB (Shopify Business)
- **Board**: https://space.avada.net/secure/RapidBoard.jspa?rapidView=10026&projectKey=SB
- **Credentials**: `.claude/jira-credentials.json` (Basic auth: haidx / Avada@123)
- **Auth header**: `-u "haidx:Avada@123"`
- **Project ID**: 10500
- **Project Name**: Solar Board
- **Title Prefix**: `[BD][R&E]` (bat buoc cho moi Jira task)

**3 TRIGGER:**

**"tao task jira"** = cho Roger (mac dinh)
**"tao task jira cho dev"** = cho Cuong
**"tao task jira cho toi va dev"** = tao ca 2

Noi dung lay tu feature dang lam trong conversation — Roger KHONG can nhac lai.

---

**1. "tao task jira" / "tao task jira cho toi" (cho Roger)**:
- Tao **Sub-task** (issuetype id: 10002)
- Parent mac dinh: SB-9350
- Assignee: haidx (Roger) — customfield_10700: [{"name":"haidx"}]
- Reviewer: sonnv

**2. "tao task jira cho dev" (cho Cuong)**:
- Tao **1 Task** (issuetype id: 10001), KHONG tach nhieu task
- KHONG can parent
- Assignee: cuongdk (Cuong) — customfield_10700: [{"name":"cuongdk"}]
- Reviewer: sonnv
- Chi tach task khi Roger yeu cau cu the
- Description: CHI CAN link Notion task, KHONG trinh bay noi dung

**Fields chung cho ca 2 loai**:
- Sprint: 52 hoac 53 (hoi Roger neu khong ro)
- Product Owner (customfield_11000): {"id":"10800"} (Roger)

**Lam silently** qua API, khong mo browser, xong bao ket qua trong chat.
