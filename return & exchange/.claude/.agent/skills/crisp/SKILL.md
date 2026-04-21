# Skill: Crisp Chat

## Trigger
Khi Roger nhắc tới **"crisp"**, hoặc yêu cầu liên quan:
- "check crisp", "đọc chat crisp", "chat mới nhất"
- "cs nào đang trực", "ai đang online"
- "conversation của ... nói gì", "inbox đang có gì"
- "gửi tin nhắn crisp", "reply user ..."
- "list contacts crisp", "export leads"

## Hành vi
1. **KHÔNG hỏi** — dùng credentials trong skill này tự gọi Crisp API
2. Dùng **Node.js `fetch`** (không dùng curl — UTF-8 Windows)
3. Kết quả trả về cho Roger: tóm tắt gọn trong chat, dùng bảng khi nhiều items

---

## Credentials

```
CRISP_IDENTIFIER=bf3b704a-8496-457a-a1d2-8152a915b1b4
CRISP_APP_KEY=778684af6652902b7932124bbb2874b361d3f8da58d1e86839fe8281dc6f279b
```

- **Plugin ID**: `ac458101-9f92-400a-b182-8e6f308f9fc9`
- **Base URL**: `https://api.crisp.chat/v1`
- **Auth**: `Basic base64(identifier:key)`
- **Required header**: `X-Crisp-Tier: plugin`

## Connected Websites

| Name | Domain | Website ID |
|------|--------|------------|
| Solar | solar.avada.io | `4c596ff3-74ec-42aa-a5a6-086556f7cd79` |
| Avada | avada.io | `72a663b0-4cda-4e3b-8878-426bdd79364c` |
| AOV.ai | help.aov.ai | `af3eac71-f176-46a3-9ec4-37cff9ad09c3` |
| Avada Docs | docs.avada.io | `dbb461f3-42ba-4046-bd39-cb50fc8f63f3` |

---

## Boilerplate

```js
const id = 'bf3b704a-8496-457a-a1d2-8152a915b1b4';
const key = '778684af6652902b7932124bbb2874b361d3f8da58d1e86839fe8281dc6f279b';
const auth = Buffer.from(id + ':' + key).toString('base64');

async function crisp(path, opts = {}) {
  const res = await fetch('https://api.crisp.chat/v1' + path, {
    method: opts.method || 'GET',
    headers: {
      'Authorization': 'Basic ' + auth,
      'X-Crisp-Tier': 'plugin',
      'Content-Type': 'application/json'
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });
  return { status: res.status, json: await res.json() };
}
```

## Common Endpoints

| Task | Endpoint |
|------|----------|
| Verify auth | `GET /plugin/connect/account/` |
| List websites | `GET /plugin/connect/websites/all` |
| List conversations | `GET /website/{wid}/conversations/{page}` (page ≥ 1, per_page ≥ 10) |
| Get messages | `GET /website/{wid}/conversation/{session_id}/messages` |
| Send message | `POST /website/{wid}/conversation/{session_id}/message` |
| List operators | `GET /website/{wid}/operators/list` |
| List contacts | `GET /website/{wid}/people/profiles/{page}` |
| Search contact | `GET /website/{wid}/people/profile/{email}` |

## Known Scope Limitations
- ❌ `website:availability:read` — KHÔNG có → không query được availability trực tiếp
- ✅ Workaround "ai đang trực": sort operators theo `updated_at` của recent conversations → operator có conversation <5 phút coi như đang trực

---

## Recipe 1: Ai đang trực

```js
for (const w of websites) {
  const r = await crisp(`/website/${w.id}/conversations/1`);
  const opMap = new Map();
  for (const c of r.json.data || []) {
    if (c.assigned?.user_id) {
      const prev = opMap.get(c.assigned.user_id) || 0;
      opMap.set(c.assigned.user_id, Math.max(prev, c.updated_at || 0));
    }
  }
  // Cross-reference với /operators/list để map user_id -> email
}
```

## Recipe 2: Đọc conversation mới nhất

```js
const c = (await crisp(`/website/${wid}/conversations/1`)).json.data[0];
const msgs = (await crisp(`/website/${wid}/conversation/${c.session_id}/messages`)).json.data;
const last10 = msgs.slice(-10);
for (const m of last10) {
  const who = m.from === 'user' ? 'USER' : `OP[${m.user?.nickname || '?'}]`;
  const content = typeof m.content === 'string' ? m.content : (m.content?.text || '');
  console.log(`[${new Date(m.timestamp).toISOString().slice(11,19)}] ${who}: ${content}`);
}
```

## Recipe 3: Gửi tin nhắn vào conversation

```js
await crisp(`/website/${wid}/conversation/${sessionId}/message`, {
  method: 'POST',
  body: {
    type: 'text',
    from: 'operator',
    origin: 'chat',
    content: 'Hello from bot'
  }
});
```

## Recipe 4: Tìm contact theo email

```js
const r = await crisp(`/website/${wid}/people/profile/${encodeURIComponent(email)}`);
if (r.status === 200) console.log(r.json.data);  // profile + segments
```

---

## Notes
- Pagination: page bắt đầu từ 1, `per_page` min = 10 (underflow 416 nếu nhỏ hơn)
- Timestamps: milliseconds Unix
- Reference doc: https://docs.crisp.chat/references/rest-api/v1/