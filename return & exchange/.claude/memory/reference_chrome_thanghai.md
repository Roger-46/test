---
name: Chrome Profile thanghai - remote debugging
description: Cách mở Chrome profile thanghai với remote debugging để Claude truy cập app qua CDP
type: reference
---

## Mở Chrome Profile "thanghai (claude code)" với Remote Debugging

### Bước 1: Đóng Chrome hiện tại
Đóng tất cả Chrome windows.

### Bước 2: Mở Chrome với debugging port
```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --profile-directory="Profile 26"
```

### Bước 3: Claude kết nối qua Chrome DevTools MCP
- MCP tools (take_snapshot, navigate_page, click, fill, etc.) sẽ kết nối tới Chrome trên port 9222
- Profile 26 = "thanghai (claude code)" đã login sẵn Google + Shopify

### Lưu ý
- Profile phải là "Profile 26" (không phải Default hay profile khác)
- Port 9222 là mặc định cho remote debugging
- Chrome PHẢI được mở với lệnh trên, không phải mở bình thường
- Profile này đã có session login Google (thanghai450@gmail.com) và Shopify admin
