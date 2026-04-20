# Skill: Tạo Jira Task

## Trigger

### Mode 1: Task cho Roger (mặc định)
Khi Roger nói **"tạo task"** (hoặc tương tự: "tạo ticket", "tạo subtask") trong khi đang trao đổi về 1 tính năng nào đó.

### Mode 2: Task cho Dev
Khi Roger nói **"tạo task jira cho dev"** (hoặc tương tự: "tạo task dev", "task cho dev").

## Hành vi
1. **Tự suy ra title** từ context cuộc trò chuyện hiện tại (tính năng đang bàn), hoặc dùng title Roger chỉ định
2. **Không hỏi** thêm gì — tự làm silently
3. Gọi Jira REST API để tạo task
4. Xong báo kết quả ngắn gọn trong chat (ID + link)

## Config

### Parent Task (cập nhật theo tháng) — chỉ dùng cho Mode 1
- **Tháng 3/2026**: `SB-9350` (Issue ID: `21880`)
- Khi Roger thông báo đổi task cha → cập nhật tại đây

### Sprint
- **Mode 1 (Sub-task)**: Tự kế thừa sprint từ task cha — KHÔNG cần truyền `customfield_10101`
- **Mode 2 (Task)**: Set sprint qua `customfield_10101` (Sprint ID: 51 = Sprint 51 active)

### Jira Credentials
- **Base URL**: `https://space.avada.net`
- **Auth**: Basic auth `haidx:Avada@123`
- **Project**: `SB`

---

## Mode 1: Task cho Roger (Sub-task)

### Default Field Values
| Field | Giá trị mặc định |
|-------|-----------------|
| Title prefix | **[BD][R&E]** (bắt buộc, thêm trước title) |
| Issue Type | Sub-task |
| Assignee | haidx |
| Reviewer | Sơn Nguyễn (`customfield_10900`: `sonnv`) |
| Product Owner | Roger (`customfield_11000`) |
| Sprint | Tự kế thừa từ task cha — không cần set |
| Priority | Low |
| Description | (để trống) |

### API Call

```js
const body = JSON.stringify({
  fields: {
    project: { key: 'SB' },
    parent: { key: 'SB-9350' },
    summary: '[BD][R&E] {TITLE}',
    issuetype: { name: 'Sub-task' },
    priority: { name: 'Low' },
    customfield_10900: [{ name: 'sonnv' }],   // Reviewer: Sơn Nguyễn
    customfield_11000: { value: 'Roger' }      // Product Owner
  }
});
```

---

## Mode 2: Task cho Dev

### Default Field Values
| Field | Giá trị mặc định |
|-------|-----------------|
| Title prefix | **[DEV][R&E]** (bắt buộc, thêm trước title) |
| Issue Type | Task |
| Assignee | cuongnh01 |
| Reviewer | tunght (`customfield_10900`) |
| Product Owner | Roger (`customfield_11000`) |
| Sprint | `customfield_10101`: 51 (Sprint 51 — cập nhật khi đổi sprint) |
| Priority | Low |
| Description | Để trống. Nếu Roger bảo link Notion → thêm `Notion: {notion_url}` |

### API Call (2 bước: tạo task → set assignees)

```js
// Bước 1: Tạo task (assignee/assignees không set được lúc create)
const body = JSON.stringify({
  fields: {
    project: { key: 'SB' },
    summary: '[DEV][R&E] {TITLE}',
    issuetype: { name: 'Task' },
    priority: { name: 'Low' },
    customfield_10900: [{ name: 'tunght' }],   // Reviewer: tunght
    customfield_11000: { value: 'Roger' },      // Product Owner
    customfield_10101: 51                        // Sprint 51
    // description: nếu có Notion URL → thêm vào
  }
});
// POST /rest/api/2/issue

// Bước 2: Set Assignees (customfield_10700) + Assignee
// PUT /rest/api/2/issue/{KEY}
// Body: { "fields": { "customfield_10700": [{ "name": "cuongnh01" }] } }
// + PUT /rest/api/2/issue/{KEY}/assignee → { "name": "cuongnh01" }
```

---

## Output Format
Sau khi tạo xong, báo ngắn gọn:
```
✅ Đã tạo **{KEY}** - "{TITLE}"
Link: http://space.avada.net/browse/{KEY}
```

## Ví dụ

### Mode 1 (Roger)
Roger đang trao đổi về "Return Portal" → nói "tạo task"
→ Tạo Sub-task "[BD][R&E] Return Portal" trong SB-9350

### Mode 2 (Dev)
Roger nói "tạo task jira cho dev với title: Settings page return window"
→ Tạo Task "[DEV][R&E] Settings page return window", assign cuongnh01, reviewer tunght, Sprint 51

## Lưu ý
- **Không mở browser** — chỉ dùng REST API
- Khi Roger nói đổi task cha (tháng mới) → cập nhật Parent Task trong file này
- Khi đổi sprint → cập nhật Sprint ID trong Mode 2
