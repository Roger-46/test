---
name: Daily Git Push at 5:30 PM
description: Every day at 5:30 PM, auto push all code in luna-affiliate repo to remote. Roger wants this as end-of-day routine.
type: feedback
---

Cứ 5h30 chiều (múi giờ Việt Nam, UTC+7) hàng ngày, push toàn bộ code của folder luna-affiliate lên remote.
**Why:** Roger muốn đảm bảo code được backup cuối ngày.
**How to apply:** Đã setup Windows Task Scheduler "LunaAffiliate-DailyPush" chạy tự động. Nếu Roger nhắc "push code" / "end of day" → git add, commit, push trên branch hiện tại (feature/roger).
