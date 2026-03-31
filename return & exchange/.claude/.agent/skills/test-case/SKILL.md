# Skill: Viết Test Case HTML Interactive

## Mục Đích
Tạo file HTML test case trực quan, interactive — tester điền Pass/Fail/Blocked trực tiếp, lưu localStorage, copy kết quả paste vào chat cho BA.

---

## File Output

```
documents/roger/features/{feature}/test-case-{feature}.html
```

---

## Cấu Trúc Test Case

Mỗi test case là 1 object trong mảng `TEST_CASES`:

```js
{
  id: 'TC-001',           // ID duy nhất
  cat: 'Happy Path',      // Category
  priority: 'High',       // High | Medium | Low
  reviewStatus: 'Pending',// Trạng thái mặc định khi tạo (Pending)
  reviewNote: '',          // Ghi chú từ Claude khi test bằng browser
  desc: 'Mô tả ngắn',    // Tên test case
  pre: 'Precondition',    // Điều kiện trước khi test
  steps: ['Bước 1', 'Bước 2', 'Bước 3'],  // Các bước thực hiện
  expected: 'Kết quả mong đợi'
}
```

### Fields

| Field | Mô tả |
|-------|-------|
| **id** | TC-001, TC-002, ... — unique, prefix tùy feature |
| **cat** | Category — nhóm tính năng |
| **priority** | High / Medium / Low |
| **reviewStatus** | Trạng thái review: Pending / Passed / Failed / Blocked / Skipped |
| **reviewNote** | Ghi chú khi Claude test browser hoặc tester ghi manual |
| **desc** | Tên ngắn gọn của test case |
| **pre** | Điều kiện trước khi test |
| **steps** | Mảng các bước thực hiện (render thành numbered list) |
| **expected** | Kết quả mong đợi |

---

## Categories Chuẩn

Tùy feature mà chọn categories phù hợp. Các category phổ biến:

- **Happy Path** — Luồng thành công chính
- **Filter & Search** — Lọc, tìm kiếm
- **Single Action** — Hành động đơn lẻ (approve, deny, undo...)
- **Bulk Action** — Hành động hàng loạt
- **Summary Cards** — Card tổng hợp
- **Pagination** — Phân trang
- **Status Flow** — Luồng chuyển trạng thái
- **Empty State** — Trạng thái rỗng
- **Security** — Auth, IDOR, permissions
- **Business Rules** — Logic nghiệp vụ
- **UI/UX** — Giao diện, responsive, accessibility
- **Validation** — Kiểm tra input, form validation
- **Error Handling** — Xử lý lỗi, edge cases
- **Integration** — Kết nối hệ thống khác (email, webhook...)
- **Performance** — Tốc độ, load time

---

## Logic Đếm & Hoàn Thành

### Count status
- Đếm theo **reviewStatus hiện tại trong code** (fallback khi localStorage chưa có)
- Ưu tiên: `localStorage > reviewStatus > 'Pending'`
- Normalize case-insensitive: `'passed'` → `'Passed'`

### % Hoàn thành
- **Chỉ Passed + Skipped** được tính là hoàn thành
- Failed, Blocked, Pending **KHÔNG** tính vào % hoàn thành
- Công thức: `done = passed + skipped; pct = Math.round(done/total*100)`

```js
function normalizeStatus(st) {
  if (!st) return 'Pending';
  return st.charAt(0).toUpperCase() + st.slice(1).toLowerCase();
}

// updateSummary
const st = normalizeStatus((saved[tc.id] || {}).status || tc.reviewStatus || 'Pending');
const done = passed + skipped; // CHỈ passed + skipped = hoàn thành
```

---

## HTML Template Đầy Đủ

File HTML gồm 3 phần: **CSS** + **HTML Structure** + **JavaScript Engine**.

### 1. CSS Styles

```html
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', sans-serif; background: #F5F7FA; color: #333; font-size: 14px; }

  .header { background: #fff; border-bottom: 2px solid #E0E0E0; padding: 20px 32px; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
  .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .header-title { font-size: 20px; font-weight: 700; color: #1A1A2E; }
  .header-meta { font-size: 12px; color: #888; margin-top: 2px; }
  .btn-copy { background: #2D9D78; color: #fff; border: none; padding: 9px 20px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
  .btn-copy:hover { background: #238C6A; }
  .btn-copy.copied { background: #4A90E2; }

  .summary { display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
  .summary-card { display: flex; flex-direction: column; align-items: center; padding: 8px 16px; border-radius: 8px; min-width: 80px; border: 1px solid transparent; }
  .summary-card .num { font-size: 22px; font-weight: 700; line-height: 1; }
  .summary-card .lbl { font-size: 11px; font-weight: 500; margin-top: 2px; }
  .s-total   { background: #F0F0F0; border-color: #CCC; color: #444; }
  .s-passed  { background: #E6F4EA; border-color: #A8D5B5; color: #1E7E34; }
  .s-failed  { background: #FDECEA; border-color: #F5B8B5; color: #C62828; }
  .s-blocked { background: #FFF3E0; border-color: #FFCC80; color: #E65100; }
  .s-skipped { background: #E8EAF6; border-color: #9FA8DA; color: #283593; }
  .s-pending { background: #F5F5F5; border-color: #DADADA; color: #777; }

  .progress-wrap { background: #E0E0E0; border-radius: 99px; height: 8px; overflow: hidden; }
  .progress-bar { height: 100%; background: linear-gradient(90deg, #2D9D78, #4ADE80); border-radius: 99px; transition: width 0.4s ease; }

  .filter-bar { background: #fff; padding: 12px 32px; border-bottom: 1px solid #E8E8E8; display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
  .filter-bar label { font-size: 12px; font-weight: 600; color: #666; }
  .filter-bar select { font-size: 13px; padding: 5px 10px; border: 1px solid #D0D0D0; border-radius: 6px; background: #fff; cursor: pointer; }

  .table-wrap { padding: 20px 32px; overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
  thead th { background: #1A1A2E; color: #fff; padding: 11px 14px; text-align: left; font-size: 12px; font-weight: 600; letter-spacing: 0.4px; white-space: nowrap; }
  tbody tr { border-bottom: 1px solid #F0F0F0; transition: background 0.15s; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: #FAFBFC; }
  tbody tr.hidden { display: none; }
  td { padding: 12px 14px; vertical-align: top; }

  .col-id    { width: 72px; font-weight: 700; color: #4A90E2; font-family: monospace; font-size: 13px; white-space: nowrap; }
  .col-cat   { width: 120px; }
  .col-pri   { width: 90px; }
  .col-desc  { width: 180px; font-weight: 600; }
  .col-pre   { width: 160px; color: #555; font-size: 13px; }
  .col-steps { width: 220px; }
  .col-exp   { width: 190px; color: #444; font-size: 13px; }
  .col-stat  { width: 140px; }
  .col-note  { min-width: 140px; }

  .steps-list { list-style: none; padding: 0; counter-reset: step; }
  .steps-list li { padding: 2px 0; font-size: 13px; color: #444; }
  .steps-list li::before { content: counter(step) ". "; counter-increment: step; font-weight: 600; color: #4A90E2; }

  /* Category badges */
  .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; white-space: nowrap; }
  .badge-happy      { background: #E3F2FD; color: #1565C0; }
  .badge-filter     { background: #F3E5F5; color: #6A1B9A; }
  .badge-action     { background: #FFF8E1; color: #BF360C; }
  .badge-bulk       { background: #E8F5E9; color: #2E7D32; }
  .badge-summary    { background: #E1F5FE; color: #01579B; }
  .badge-pagination { background: #FFF3E0; color: #E65100; }
  .badge-empty      { background: #F3E5F5; color: #4A148C; }
  .badge-security   { background: #FFEBEE; color: #B71C1C; }
  .badge-bizrule    { background: #FCE4EC; color: #880E4F; }
  .badge-ui         { background: #E8F5E9; color: #1B5E20; }
  .badge-validation { background: #FFF8E1; color: #F57F17; }
  .badge-error      { background: #FFEBEE; color: #D32F2F; }
  .badge-integration{ background: #E0F7FA; color: #00695C; }
  .badge-perf       { background: #F3E5F5; color: #7B1FA2; }

  /* Priority badges */
  .pri { display: inline-block; padding: 3px 9px; border-radius: 99px; font-size: 11px; font-weight: 700; white-space: nowrap; letter-spacing: 0.3px; }
  .pri-high   { background: #FDECEA; color: #C62828; border: 1px solid #F5B8B5; }
  .pri-medium { background: #FFF8E1; color: #E65100; border: 1px solid #FFE082; }
  .pri-low    { background: #F1F8E9; color: #558B2F; border: 1px solid #C5E1A5; }

  /* Status dropdown */
  .status-select { width: 100%; padding: 6px 8px; border-radius: 6px; border: 1.5px solid #D0D0D0; font-size: 13px; font-weight: 600; cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,...arrow..."); background-repeat: no-repeat; background-position: right 8px center; padding-right: 28px; }
  .status-select.s-pending { background-color: #F5F5F5; color: #666; border-color: #DADADA; }
  .status-select.s-passed  { background-color: #E6F4EA; color: #1E7E34; border-color: #A8D5B5; }
  .status-select.s-failed  { background-color: #FDECEA; color: #C62828; border-color: #F5B8B5; }
  .status-select.s-blocked { background-color: #FFF3E0; color: #E65100; border-color: #FFCC80; }
  .status-select.s-skipped { background-color: #E8EAF6; color: #283593; border-color: #9FA8DA; }

  .note-input { width: 100%; min-height: 52px; padding: 6px 8px; border: 1px solid #E0E0E0; border-radius: 6px; font-size: 12px; color: #444; resize: vertical; font-family: inherit; }
  .note-input:focus { outline: none; border-color: #4A90E2; }

  .toast { position: fixed; bottom: 28px; right: 28px; background: #1A1A2E; color: #fff; padding: 12px 20px; border-radius: 8px; font-size: 13px; font-weight: 500; opacity: 0; transform: translateY(10px); transition: all 0.3s; pointer-events: none; z-index: 999; }
  .toast.show { opacity: 1; transform: translateY(0); }

  @media (max-width: 768px) {
    .header, .filter-bar, .table-wrap { padding-left: 16px; padding-right: 16px; }
    .summary { gap: 8px; }
    .summary-card { min-width: 60px; padding: 6px 10px; }
    .summary-card .num { font-size: 18px; }
  }
</style>
```

### 2. HTML Structure

```html
<div class="header">
  <div class="header-top">
    <div>
      <div class="header-title">🧪 Test Case — {Feature Name}</div>
      <div class="header-meta" id="meta">v1.0 · {Date} · Affily Admin (Merchant) · Store: ag-tunght-aff-stg</div>
    </div>
    <button class="btn-copy" onclick="copyResults()" id="btnCopy">📋 Copy Results</button>
  </div>
  <div class="summary">
    <div class="summary-card s-total"><span class="num" id="cnt-total">0</span><span class="lbl">Total</span></div>
    <div class="summary-card s-passed"><span class="num" id="cnt-passed">0</span><span class="lbl">Passed ✅</span></div>
    <div class="summary-card s-failed"><span class="num" id="cnt-failed">0</span><span class="lbl">Failed ❌</span></div>
    <div class="summary-card s-blocked"><span class="num" id="cnt-blocked">0</span><span class="lbl">Blocked 🚧</span></div>
    <div class="summary-card s-skipped"><span class="num" id="cnt-skipped">0</span><span class="lbl">Skipped ⏭</span></div>
    <div class="summary-card s-pending"><span class="num" id="cnt-pending">0</span><span class="lbl">Pending ⏳</span></div>
    <div style="flex:1; display:flex; flex-direction:column; justify-content:center; gap:4px;">
      <div style="font-size:12px; color:#666; font-weight:600;">
        <span id="pct">0</span>% hoàn thành (<span id="done-count">0</span>/<span id="total-count">0</span> cases)
      </div>
      <div class="progress-wrap"><div class="progress-bar" id="progressBar" style="width:0%"></div></div>
    </div>
  </div>
</div>

<div class="filter-bar">
  <label>Category:</label>
  <select onchange="applyFilter()" id="filterCat">
    <option value="all">Tất cả</option>
    <!-- Thêm options theo categories của feature -->
  </select>
  <label>Priority:</label>
  <select onchange="applyFilter()" id="filterPri">
    <option value="all">Tất cả</option>
    <option value="High">🔴 High</option>
    <option value="Medium">🟡 Medium</option>
    <option value="Low">🟢 Low</option>
  </select>
  <label>Status:</label>
  <select onchange="applyFilter()" id="filterStat">
    <option value="all">Tất cả</option>
    <option value="Pending">⏳ Pending</option>
    <option value="Passed">✅ Passed</option>
    <option value="Failed">❌ Failed</option>
    <option value="Blocked">🚧 Blocked</option>
    <option value="Skipped">⏭ Skipped</option>
  </select>
  <span style="font-size:12px; color:#aaa; margin-left:auto;">💾 Tự động lưu vào browser</span>
</div>

<div class="table-wrap">
<table id="testTable">
<thead>
  <tr>
    <th class="col-id">ID</th>
    <th class="col-cat">Category</th>
    <th class="col-pri">Priority</th>
    <th class="col-desc">Mô tả</th>
    <th class="col-pre">Precondition</th>
    <th class="col-steps">Steps</th>
    <th class="col-exp">Expected Result</th>
    <th class="col-stat">Status</th>
    <th class="col-note">Ghi chú</th>
  </tr>
</thead>
<tbody id="tableBody"></tbody>
</table>
</div>

<div class="toast" id="toast"></div>
```

### 3. JavaScript Engine

```html
<script>
const FEATURE = '{feature-slug}';  // VD: 'conversions', 'affiliates'
const VERSION = 'v1';
const STORAGE_KEY = `testcase_${FEATURE}_${VERSION}`;

const TEST_CASES = [
  // ---- HAPPY PATH ----
  {
    id: 'TC-001', cat: 'Happy Path', priority: 'High',
    reviewStatus: 'Pending', reviewNote: '',
    desc: 'Mô tả test case',
    pre: 'Precondition',
    steps: ['Bước 1', 'Bước 2'],
    expected: 'Kết quả mong đợi'
  },
  // ... thêm test cases
];

// =============================================
// RENDER ENGINE
// =============================================
const BADGE_CLASS = {
  'Happy Path': 'badge-happy', 'Filter & Search': 'badge-filter',
  'Single Action': 'badge-action', 'Bulk Action': 'badge-bulk',
  'Summary Cards': 'badge-summary', 'Status Flow': 'badge-bizrule',
  'Pagination': 'badge-pagination', 'Empty State': 'badge-empty',
  'Security': 'badge-security', 'Business Rules': 'badge-bizrule',
  'UI/UX': 'badge-ui', 'Validation': 'badge-validation',
  'Error Handling': 'badge-error', 'Integration': 'badge-integration',
  'Performance': 'badge-perf'
};
const STATUS_CLASS = {
  'Pending': 's-pending', 'Passed': 's-passed', 'Failed': 's-failed',
  'Blocked': 's-blocked', 'Skipped': 's-skipped',
  'passed': 's-passed', 'failed': 's-failed', 'blocked': 's-blocked', 'skipped': 's-skipped'
};
function normalizeStatus(st) {
  if (!st) return 'Pending';
  return st.charAt(0).toUpperCase() + st.slice(1).toLowerCase();
}
const PRI_CLASS = { 'High': 'pri-high', 'Medium': 'pri-medium', 'Low': 'pri-low' };

function loadSaved() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function save(id, field, val) {
  const data = loadSaved();
  if (!data[id]) data[id] = {};
  data[id][field] = val;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  updateSummary();
}

function renderTable() {
  const saved = loadSaved();
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = TEST_CASES.map(tc => {
    const s = saved[tc.id] || {};
    const status = normalizeStatus(s.status || tc.reviewStatus || 'Pending');
    const note = s.note || tc.reviewNote || '';
    const statusClass = STATUS_CLASS[status] || 's-pending';
    const priClass = PRI_CLASS[tc.priority] || 'pri-medium';
    const stepsHtml = `<ol class="steps-list">${tc.steps.map(st => `<li>${st}</li>`).join('')}</ol>`;
    return `
    <tr data-id="${tc.id}" data-cat="${tc.cat}" data-status="${status}" data-pri="${tc.priority}">
      <td class="col-id">${tc.id}</td>
      <td class="col-cat"><span class="badge ${BADGE_CLASS[tc.cat] || ''}">${tc.cat}</span></td>
      <td class="col-pri"><span class="pri ${priClass}">${tc.priority}</span></td>
      <td class="col-desc">${tc.desc}</td>
      <td class="col-pre">${tc.pre}</td>
      <td class="col-steps">${stepsHtml}</td>
      <td class="col-exp">${tc.expected}</td>
      <td class="col-stat">
        <select class="status-select ${statusClass}" onchange="onStatusChange('${tc.id}', this)">
          <option ${status==='Pending'?'selected':''}>Pending</option>
          <option ${status==='Passed'?'selected':''}>Passed</option>
          <option ${status==='Failed'?'selected':''}>Failed</option>
          <option ${status==='Blocked'?'selected':''}>Blocked</option>
          <option ${status==='Skipped'?'selected':''}>Skipped</option>
        </select>
      </td>
      <td class="col-note"><textarea class="note-input" placeholder="Bug ID, link, ghi chú..." onchange="onNoteChange('${tc.id}', this)" onblur="onNoteChange('${tc.id}', this)">${note}</textarea></td>
    </tr>`;
  }).join('');
  updateSummary();
}

function onStatusChange(id, sel) {
  const val = sel.value;
  const cls = STATUS_CLASS[val] || 's-pending';
  sel.className = `status-select ${cls}`;
  sel.closest('tr').dataset.status = val;
  save(id, 'status', val);
  applyFilter();
}
function onNoteChange(id, ta) { save(id, 'note', ta.value); }

function updateSummary() {
  const saved = loadSaved();
  let passed=0, failed=0, blocked=0, skipped=0, pending=0;
  TEST_CASES.forEach(tc => {
    const st = normalizeStatus((saved[tc.id] || {}).status || tc.reviewStatus || 'Pending');
    if (st==='Passed') passed++;
    else if (st==='Failed') failed++;
    else if (st==='Blocked') blocked++;
    else if (st==='Skipped') skipped++;
    else pending++;
  });
  const total = TEST_CASES.length;
  const done = passed + skipped;  // CHỈ passed + skipped = hoàn thành
  const pct = total ? Math.round(done/total*100) : 0;
  document.getElementById('cnt-total').textContent = total;
  document.getElementById('cnt-passed').textContent = passed;
  document.getElementById('cnt-failed').textContent = failed;
  document.getElementById('cnt-blocked').textContent = blocked;
  document.getElementById('cnt-skipped').textContent = skipped;
  document.getElementById('cnt-pending').textContent = pending;
  document.getElementById('pct').textContent = pct;
  document.getElementById('done-count').textContent = done;
  document.getElementById('total-count').textContent = total;
  document.getElementById('progressBar').style.width = pct + '%';
}

function applyFilter() {
  const cat = document.getElementById('filterCat').value;
  const stat = document.getElementById('filterStat').value;
  const pri = document.getElementById('filterPri').value;
  document.querySelectorAll('#tableBody tr').forEach(tr => {
    const matchCat  = cat  === 'all' || tr.dataset.cat    === cat;
    const matchStat = stat === 'all' || tr.dataset.status === stat;
    const matchPri  = pri  === 'all' || tr.dataset.pri    === pri;
    tr.classList.toggle('hidden', !(matchCat && matchStat && matchPri));
  });
}

function copyResults() {
  const saved = loadSaved();
  let passed=[], failed=[], blocked=[], skipped=[], pending=[];
  TEST_CASES.forEach(tc => {
    const s = saved[tc.id] || {};
    const st = normalizeStatus(s.status || tc.reviewStatus || 'Pending');
    const note = s.note ? ` — Ghi chú: ${s.note}` : '';
    const line = `- ${tc.id} [${tc.priority}] ${tc.desc}${note}`;
    if (st==='Passed')  passed.push(`- ${tc.id}: ${tc.desc}`);
    else if (st==='Failed')  failed.push(line);
    else if (st==='Blocked') blocked.push(line);
    else if (st==='Skipped') skipped.push(line);
    else pending.push(`- ${tc.id}: ${tc.desc}`);
  });
  const total = TEST_CASES.length;
  const done = passed.length + skipped.length;
  const pct = total ? Math.round(done/total*100) : 0;
  const today = new Date().toLocaleDateString('vi-VN');
  let result = `=== TEST RESULTS: ${FEATURE} ===\n`;
  result += `Date: ${today}\n`;
  result += `Total: ${total} | Passed: ${passed.length} | Failed: ${failed.length} | Blocked: ${blocked.length} | Skipped: ${skipped.length} | Pending: ${pending.length}\n`;
  result += `Progress: ${pct}% hoàn thành (${done}/${total} cases passed/skipped)\n\n`;
  if (failed.length)  result += `FAILED CASES:\n${failed.join('\n')}\n\n`;
  if (blocked.length) result += `BLOCKED CASES:\n${blocked.join('\n')}\n\n`;
  if (skipped.length) result += `SKIPPED CASES:\n${skipped.join('\n')}\n\n`;
  if (passed.length)  result += `PASSED: ${passed.map(l=>l.split(':')[0].replace('- ','')).join(', ')}\n`;
  if (pending.length) result += `PENDING: ${pending.map(l=>l.split(':')[0].replace('- ','')).join(', ')}\n`;

  navigator.clipboard.writeText(result).then(() => {
    showToast('✅ Đã copy! Paste vào chat với Claude để báo cáo kết quả.');
    const btn = document.getElementById('btnCopy');
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = '📋 Copy Results'; btn.classList.remove('copied'); }, 2000);
  });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

renderTable();
</script>
```

---

## Quy Tắc Quan Trọng

### Khi tạo file mới
1. Đọc PRD/spec của feature để hiểu user flow
2. List tất cả test cases theo categories phù hợp
3. Mỗi test case: `reviewStatus: 'Pending'`, `reviewNote: ''`
4. Generate HTML file hoàn chỉnh (1 file duy nhất, self-contained)
5. Lưu vào `documents/roger/features/{feature}/test-case-{feature}.html`

### Khi Claude test bằng browser (Playwright MCP)
- Cập nhật `reviewStatus` và `reviewNote` trực tiếp trong code
- `reviewNote` ghi: Round nào, kết quả cụ thể, số liệu trước/sau
- VD: `reviewNote: 'Round 3: Selected 3 Pending → Deny selected → Toast "Denied 3 conversion(s)" → Cards: Pending 28→25'`

### Khi tester test manual
- Tester mở file HTML trên browser, chọn status từ dropdown
- Data lưu localStorage tự động
- Click "Copy Results" → paste vào chat cho Claude phân tích

---

## Workflow với Roger

1. Claude tạo HTML test case → Roger mở trên browser
2. Claude test bằng Playwright MCP → cập nhật reviewStatus/reviewNote trong code
3. Tester test manual → chọn status dropdown (lưu localStorage)
4. Click **"Copy Results"** → Paste vào chat với Claude
5. Claude đọc kết quả → báo cáo summary, đề xuất fix bugs

---

## Màu Sắc

### Status

| Status | Màu nền | Màu chữ | Border |
|--------|---------|---------|--------|
| Pending | #F5F5F5 | #666 | #DADADA |
| Passed | #E6F4EA | #1E7E34 | #A8D5B5 |
| Failed | #FDECEA | #C62828 | #F5B8B5 |
| Blocked | #FFF3E0 | #E65100 | #FFCC80 |
| Skipped | #E8EAF6 | #283593 | #9FA8DA |

### Priority

| Priority | Màu nền | Màu chữ |
|----------|---------|---------|
| High | #FDECEA | #C62828 |
| Medium | #FFF8E1 | #E65100 |
| Low | #F1F8E9 | #558B2F |
