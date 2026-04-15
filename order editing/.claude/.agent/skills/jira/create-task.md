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
- **Tháng 4/2026**: `SB-10372`
- Khi Roger thông báo đổi task cha → cập nhật tại đây

### Sprint
- **Hiện tại**: Sprint **52** (cả Mode 1 và Mode 2)
- **Mode 1 (Sub-task)**: Tự kế thừa sprint từ task cha — KHÔNG cần truyền `customfield_10101`
- **Mode 2 (Task)**: Set sprint qua `customfield_10101` (Sprint ID: **52**)

### Lịch đổi Sprint (mỗi 2 tuần, vào thứ 3)
- Sprint 52: hiện tại
- Sprint 53: thứ 3, 15/04/2026
- Sprint 54: thứ 3, 29/04/2026
- *(tiếp tục +1 mỗi 2 tuần vào thứ 3)*
> **Nhắc Roger** khi gần đến ngày đổi sprint để cập nhật.

### Jira Credentials
- **Base URL**: `https://space.avada.net`
- **Auth**: Basic auth `haidx:Avada@123`
- **Project**: `SB`

---

## Mode 1: Task cho Roger (Sub-task)

### Default Field Values
| Field | Giá trị mặc định |
|-------|-----------------|
| Title prefix | **[BD][OM]** (bắt buộc, thêm trước title) |
| Issue Type | Sub-task |
| Assignee | haidx |
| Assignees | haidx (`customfield_10700`) |
| Reviewer | Sơn Nguyễn (`customfield_10900`: `sonnv`) |
| Product Owner | Roger (`customfield_11000`) |
| Sprint | Tự kế thừa từ task cha — không cần set |
| Priority | Low |
| Description | Theo format 4 mục chuẩn (xem bên dưới) |

### Description Format (4 mục chuẩn)

Khi tạo task, description PHẢI theo format 4 mục sau (Jira wiki markup):

```
h3. 1. Vấn đề
• [Bullet 1: pain point chính]
• [Bullet 2: hệ quả]
• [Bullet 3: bối cảnh thị trường / đối thủ]
• [Bullet 4: tại sao cần làm]

h3. 2. Giải pháp
• [Bullet 1: giải pháp chính]
• [Bullet 2: cách hoạt động]
• [Bullet 3: chi tiết kỹ thuật quan trọng]
• [Bullet 4: giá trị cho merchant]

h3. 3. Scope
• [Bullet 1: deliverable chính]
• [Bullet 2: deliverable phụ nếu có]
• [Bullet 3: test case / QA scope]
• [Bullet 4: kết quả review nếu có]

h3. 4. Tài liệu
[Link đến PRD, UI mockup, hoặc tài liệu liên quan]
_(Đang cập nhật...)_ nếu chưa có
```

> **Lưu ý**: Tự suy nội dung từ context cuộc trò chuyện. Nếu Roger chỉ nói "tạo task" mà chưa có đủ thông tin cho cả 4 mục → điền những gì biết, phần còn lại ghi _(Đang cập nhật...)_

### API Call (2 bước: tạo task → set assignee + assignees)

```js
// Bước 1: Tạo task
const body = JSON.stringify({
  fields: {
    project: { key: 'SB' },
    parent: { key: 'SB-10372' },
    summary: '[BD][OM] {TITLE}',
    issuetype: { name: 'Sub-task' },
    priority: { name: 'Low' },
    customfield_10900: [{ name: 'sonnv' }],   // Reviewer: Sơn Nguyễn
    customfield_11000: { value: 'Roger' }      // Product Owner
  }
});
// POST /rest/api/2/issue

// Bước 2: Set Assignee + Assignees (BẮT BUỘC — không set được lúc create)
// PUT /rest/api/2/issue/{KEY}/assignee → { "name": "haidx" }
// PUT /rest/api/2/issue/{KEY} → { "fields": { "customfield_10700": [{ "name": "haidx" }] } }
```

> ⚠️ **KHÔNG ĐƯỢC QUÊN** bước 2 — Jira không cho set assignee trong request create Sub-task.

---

## Mode 2: Task cho Dev

### Default Field Values
| Field | Giá trị mặc định |
|-------|-----------------|
| Title prefix | **[DEV][OE]** (bắt buộc, thêm trước title) |
| Issue Type | Task |
| Assignee | cuongnh01 |
| Assignees | cuongnh01 (`customfield_10700`) |
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
    summary: '[DEV][OE] {TITLE}',
    issuetype: { name: 'Task' },
    priority: { name: 'Low' },
    customfield_10900: [{ name: 'tunght' }],   // Reviewer: tunght
    customfield_11000: { value: 'Roger' },      // Product Owner
    customfield_10101: 52                        // Sprint 52 (cập nhật mỗi 2 tuần)
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
Roger đang trao đổi về "Edit Time Window Settings" → nói "tạo task"
→ Tạo Sub-task "[BD][OM] Edit Time Window Settings" trong SB-10372

### Mode 2 (Dev)
Roger nói "tạo task jira cho dev với title: Order Edit Engine"
→ Tạo Task "[DEV][OE] Order Edit Engine", assign cuongnh01, reviewer tunght, Sprint 52

## Lưu ý
- **Không mở browser** — chỉ dùng REST API
- Khi Roger nói đổi task cha (tháng mới) → cập nhật Parent Task trong file này
- Khi đổi sprint → cập nhật Sprint ID trong Mode 2
