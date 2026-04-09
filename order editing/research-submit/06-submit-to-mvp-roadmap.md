# 06 - Lộ Trình: Submit → MVP → Full

---

## 1. Tổng Quan Timeline

```
Tuần 1-5:  SUBMIT VERSION (Pass App Review)
           ↓
Tuần 6-9:  MVP VERSION (Paid plans + Core differentiators)
           ↓
Tuần 10-16: FULL VERSION (Blue ocean features)
```

---

## 2. Từ Submit Lên MVP: Chính Xác Cần Thêm Gì

### 2.1 Backend - Thêm Files Mới

| File cần thêm | Mô tả | Effort |
|---------------|-------|--------|
| `billingHandler.js` | Xử lý Shopify Billing API (create charge, confirm) | Trung bình |
| `billingService.js` | Logic billing: tạo charge, check status, upgrade/downgrade | Trung bình |
| `retentionService.js` | Logic retention: match lý do → offers, áp dụng discount | Trung bình |
| `storefrontRetentionHandler.js` | API cho retention flow | Nhỏ |
| `addressValidationService.js` | Google Address Validation API | Nhỏ |
| `googleMaps.js` | Client wrapper cho Google Maps API | Nhỏ |
| `editRuleRepository.js` | CRUD cho editRules collection | Nhỏ |
| `adminRulesHandler.js` | API CRUD cho edit rules | Nhỏ |
| `analyticsService.js` | Aggregation queries cho dashboard | Trung bình |
| `adminAnalyticsHandler.js` | API cho analytics endpoints | Nhỏ |
| `analyticsEventRepository.js` | CRUD cho analytics events | Nhỏ |
| `adminSubscriptionHandler.js` | API cho subscription view/upgrade | Nhỏ |

### 2.2 Backend - Sửa Files Hiện Tại (Nhẹ)

| File sửa | Thay đổi | Effort |
|----------|---------|--------|
| `router.js` | Thêm routes mới cho billing, rules, analytics, retention | Rất nhỏ |
| `index.js` | Export thêm functions nếu cần | Rất nhỏ |
| `orderEditService.js` | Thêm upsell param, flow trigger call | Nhỏ |
| `cancellationService.js` | Thêm retention check trước khi cancel | Nhỏ |
| `storefrontCancelHandler.js` | Thêm endpoint cancel/retain | Nhỏ |
| `editRuleEngine.js` | Thêm per-product/collection rule matching | Trung bình |
| `editSettingsRepository.js` | Thêm default values cho MVP fields | Rất nhỏ |
| `constants.js` | Thêm plan tiers, new error codes | Rất nhỏ |
| `emailTemplates.js` | Thêm templates cho retention, invoice | Nhỏ |

### 2.3 Frontend Admin - Thêm Pages Mới

| Page mới | Mô tả | Effort |
|----------|-------|--------|
| `EditRulesPage.jsx` + components | Quản lý edit rules per product/collection | Trung bình |
| `AnalyticsPage.jsx` + components | Dashboard analytics với charts | Trung bình |
| `SubscriptionPage.jsx` + components | Plan comparison, usage, upgrade | Trung bình |
| `EditOrderModal.jsx` | Merchant tự sửa đơn từ admin | Trung bình |

### 2.4 Frontend Admin - Sửa Files Hiện Tại (Nhẹ)

| File sửa | Thay đổi | Effort |
|----------|---------|--------|
| `NavigationMenu.jsx` | Thêm 3 menu items | Rất nhỏ |
| `routes.jsx` | Thêm 3 routes | Rất nhỏ |
| `SettingsPage.jsx` | Thêm sections: branding, retention, address validation | Nhỏ |
| `OrderDetailPage.jsx` | Thêm nút "Sửa đơn" + EditOrderModal | Nhỏ |
| `DashboardPage.jsx` | Thêm chart component (optional) | Nhỏ |

### 2.5 Storefront - Thêm Files Mới

| File mới | Mô tả | Effort |
|----------|-------|--------|
| `thank-you-banner.liquid` + JS + CSS | Widget trên Thank-You Page | Nhỏ |
| `RetentionFlow.jsx` | UI retention offers khi hủy đơn | Trung bình |
| `AddressAutocomplete.jsx` | Autocomplete địa chỉ Google | Nhỏ |
| `AddressSuggestion.jsx` | "Bạn có muốn nói...?" suggestion | Nhỏ |

### 2.6 Storefront - Sửa Files Hiện Tại (Nhẹ)

| File sửa | Thay đổi | Effort |
|----------|---------|--------|
| `CancellationFlow.jsx` | Thêm RetentionFlow step giữa reason và confirm | Nhỏ |
| `AddressForm.jsx` | Thêm AddressAutocomplete nếu enabled | Nhỏ |
| `EditOrderPage.jsx` | Layout adjustment cho address validation | Rất nhỏ |

---

## 3. Checklist Upgrade Submit → MVP

### Tuần 6: Billing + Edit Rules
- [ ] Implement Shopify Billing API (billingHandler + billingService)
- [ ] Tạo SubscriptionPage (plan comparison, upgrade flow)
- [ ] Implement per-product/collection edit rules (editRuleEngine upgrade)
- [ ] Tạo EditRulesPage + components
- [ ] Test billing flow end-to-end (create charge → confirm → active)
- [ ] Thêm paid plan limits vào usageService

### Tuần 7: Merchant Editing + Thank-You Page
- [ ] Implement merchant edit flow (adminOrderHandler: begin/commit)
- [ ] Tạo EditOrderModal component
- [ ] Thêm vào OrderDetailPage
- [ ] Implement Thank-You Page widget (liquid + JS + CSS)
- [ ] Test merchant edit end-to-end
- [ ] Test Thank-You Page widget

### Tuần 8: Analytics + Address Validation
- [ ] Implement analytics aggregation (analyticsService + BigQuery hoặc Firestore queries)
- [ ] Tạo AnalyticsPage + chart components
- [ ] Implement Google Address Validation (addressValidationService)
- [ ] Thêm AddressAutocomplete vào storefront
- [ ] Test analytics data accuracy
- [ ] Test address validation flow

### Tuần 9: Retention + Polish
- [ ] Implement cancellation retention flow (retentionService)
- [ ] Tạo RetentionFlow storefront component
- [ ] Thêm retention settings vào SettingsPage
- [ ] Update CancellationFlow để include retention step
- [ ] Custom email templates cho retention
- [ ] Full regression testing
- [ ] Update app listing với features mới + screenshots mới

---

## 4. Từ MVP Lên Full: Features P2

### Tuần 10-12: Revenue Features
- [ ] Post-purchase upsell (upsellService + UpsellSection)
- [ ] Store credit refund (storeCreditService + RefundChoicePicker)
- [ ] Upsell offers management (UpsellOffersPage)
- [ ] Revenue attribution analytics

### Tuần 13-14: Automation & Integration
- [ ] Shopify Flow integration (triggers + actions)
- [ ] Multi-language support (i18n system)
- [ ] Custom branding (colors, logo, text)
- [ ] Advanced email templates (customizable)

### Tuần 15-16: Blue Ocean
- [ ] AI edit suggestions (rule-based first)
- [ ] Local delivery order editing workaround
- [ ] Bulk staff-side editing
- [ ] Advanced analytics + ROI dashboard

### Tuần 17+: Enterprise
- [ ] B2B/wholesale editing
- [ ] Subscription order editing
- [ ] 3PL integrations
- [ ] Custom API/webhooks
- [ ] SOC 2 compliance
- [ ] Multi-currency editing

---

## 5. Risk: Scope Creep Prevention

### Câu hỏi kiểm tra trước khi thêm bất cứ thứ gì vào Submit:

1. **Shopify reviewer có kiểm tra cái này không?** Nếu không → để MVP
2. **App có pass review mà không có cái này không?** Nếu có → để MVP
3. **Cái này có thêm 1+ ngày development không?** Nếu có → xem xét kỹ
4. **Cái này có ảnh hưởng kiến trúc nếu thêm sau không?** Nếu không → để MVP
5. **Merchant đầu tiên có cần cái này để thấy giá trị không?** Nếu không → để MVP

### Submit = Pass Review. MVP = Impress Users. Full = Win Market.

Đừng nhầm lẫn 3 mục tiêu này.

---

## 6. Metric Theo Dõi Từng Giai Đoạn

### Submit (Tuần 1-5)
| Metric | Mục tiêu |
|--------|---------|
| App review pass | Lần đầu tiên |
| Thời gian submit | ≤ 5 tuần từ ngày bắt đầu code |
| Số files code | ~92 files |
| Bugs blocking submit | 0 |

### MVP (Tuần 6-9)
| Metric | Mục tiêu |
|--------|---------|
| Installs đầu tiên | 100+ trong tháng 1 |
| Paying customers | 10+ |
| Rating | 4.8+ |
| Support tickets | < 5/tuần |
| Free-to-paid conversion | 8%+ |

### Full (Tuần 10-16)
| Metric | Mục tiêu |
|--------|---------|
| Total installs | 500+ |
| MRR | $500+ |
| Reviews | 20+ |
| Category ranking | Top 15 |
| Upsell revenue (across merchants) | $1,000+ |

---

*Lộ trình này đảm bảo:*
1. *Submit nhanh nhất có thể (5 tuần)*
2. *MVP thêm tính năng mà không refactor (4 tuần thêm)*
3. *Full app trong 16 tuần từ ngày bắt đầu*
4. *Mỗi dòng code viết cho Submit đều tồn tại trong sản phẩm cuối cùng*
