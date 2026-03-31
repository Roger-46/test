---
name: Playwright MCP Login Flow
description: Cách kết nối Playwright MCP vào app Shopify staging - không cần Roger làm gì
type: reference
---

## Cách mở app Shopify staging tự động qua Playwright MCP

### Điều kiện
- Chrome phải đóng hoàn toàn trước (Playwright cần exclusive access vào Chrome profile)
- `.mcp.json` config Playwright dùng `--browser chrome --user-data-dir "C:\\Users\\A\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 26"`

### Flow tự động (không cần Roger)
1. `taskkill //F //IM chrome.exe` - đóng Chrome
2. Playwright MCP tự mở Chrome với Profile 26 "thanghai (claude code)"
3. Navigate đến app: `https://admin.shopify.com/store/ag-tunght-aff-stg/apps/luna-affiliate-staging/embed`
4. Nếu chưa login → Shopify redirect sang Google OAuth:
   - Email: `thanghai450@gmail.com` (tự điền từ profile)
   - Password: `avada@123`
   - Click Next → tự redirect về Shopify admin → app load
5. Đợi 5-8s cho app iframe load xong

### Lưu ý
- Google OAuth KHÔNG bị block khi dùng Playwright (khác với Chrome DevTools MCP)
- Profile 26 lưu cookies → lần sau có thể không cần login lại
- Storefront password: `1`
- App URL patterns:
  - Embed: `/embed` (dashboard)
  - Conversions: `/embed/conversions`
  - Affiliates: `/embed/affiliates`
  - Programs: `/embed/programs`
  - Settings: `/embed/settings`
