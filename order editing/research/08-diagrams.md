# Sơ Đồ Kỹ Thuật - Avada Order Editing

## 1. Sơ Đồ Kiến Trúc Hệ Thống

```mermaid
graph TB
    subgraph "Nền Tảng Shopify"
        SA[Trang Quản Trị Shopify]
        SF[Cửa Hàng Trực Tuyến]
        OSP[Trang Trạng Thái Đơn Hàng]
        TYP[Trang Cảm Ơn]
        SAPI[Shopify GraphQL Admin API]
        SREST[Shopify REST API]
        SWH[Shopify Webhooks]
    end

    subgraph "Ứng Dụng Quản Trị Nhúng"
        PA[Ứng dụng React / Polaris v12+]
        AB[Shopify App Bridge]
        PA --> AB
        AB --> SAPI
    end

    subgraph "Tầng Cửa Hàng Trực Tuyến"
        TE[Theme App Extension<br/>Liquid Blocks]
        SW[Scripttag Widget<br/>Preact]
        TE --> OSP
        TE --> TYP
        SW --> SF
    end

    subgraph "GCP / Firebase Backend"
        subgraph "Firebase Hosting"
            FH[Tài Nguyên Frontend Tĩnh]
        end

        subgraph "Firebase Functions"
            API[Bộ Xử Lý REST API]
            WHH[Bộ Xử Lý Webhook]
            BGW[Worker Chạy Nền]
            CRON[Hàm Theo Lịch]
        end

        subgraph "Tầng Dữ Liệu"
            FS[(Firestore)]
            BQ[(BigQuery)]
        end

        subgraph "Xử Lý Bất Đồng Bộ"
            PS[Cloud Pub/Sub]
            CT[Cloud Tasks]
        end
    end

    subgraph "Dịch Vụ Bên Ngoài"
        GADDR[Google Address Validation API]
        EMAIL[Dịch Vụ Email<br/>SendGrid / Mailgun]
    end

    SA --> PA
    PA --> API
    SW --> API
    TE --> API

    SWH -->|Đã Xác Minh HMAC| WHH
    WHH --> PS
    PS --> BGW
    BGW --> FS
    BGW --> SAPI
    BGW --> EMAIL

    API --> FS
    API --> SAPI
    API --> SREST
    API --> GADDR

    CRON --> CT
    CT --> BGW

    FS -->|Luồng Thay Đổi| BQ
    BGW --> BQ

    PA -->|Bảng Điều Khiển & Phân Tích| BQ

    style SA fill:#5c6ac4,color:#fff
    style SF fill:#5c6ac4,color:#fff
    style FS fill:#f4b400,color:#000
    style BQ fill:#4285f4,color:#fff
    style PS fill:#34a853,color:#fff
```

## 2. Máy Trạng Thái Vòng Đời Chỉnh Sửa Đơn Hàng

```mermaid
stateDiagram-v2
    [*] --> DonHangDuocDat: Đơn hàng được tạo qua Shopify

    DonHangDuocDat --> CuaSoChinhSuaMo: Webhook nhận được &<br/>đánh giá quy tắc chỉnh sửa

    CuaSoChinhSuaMo --> YeuCauChinhSua_KhachHang: Khách hàng yêu cầu chỉnh sửa<br/>(trang trạng thái đơn hàng / widget)
    CuaSoChinhSuaMo --> YeuCauChinhSua_NguoiBan: Người bán yêu cầu chỉnh sửa<br/>(bảng quản trị)
    CuaSoChinhSuaMo --> YeuCauHuy: Khách hàng yêu cầu hủy
    CuaSoChinhSuaMo --> CuaSoChinhSuaDong: Hết thời gian cho phép<br/>(hàm theo lịch)

    YeuCauChinhSua_KhachHang --> DangXacThuc: Xác thực quy tắc chỉnh sửa &<br/>tồn kho khả dụng
    YeuCauChinhSua_NguoiBan --> DangXacThuc: Xác thực theo<br/>ràng buộc Shopify

    DangXacThuc --> ChinhSuaBiTuChoi: Xác thực thất bại<br/>(hết hàng, vi phạm quy tắc,<br/>đã thực hiện giao hàng)
    DangXacThuc --> TinhChenhLechGia: Xác thực thành công

    TinhChenhLechGia --> YeuCauThanhToan: Giá tăng<br/>(thu phí khách hàng)
    TinhChenhLechGia --> YeuCauHoanTien: Giá giảm<br/>(hoàn tiền khách hàng)
    TinhChenhLechGia --> DangXuLyChinhSua: Không thay đổi giá

    YeuCauThanhToan --> DangXuLyChinhSua: Thanh toán thành công
    YeuCauThanhToan --> ChinhSuaBiTuChoi: Thanh toán thất bại
    YeuCauHoanTien --> DangXuLyChinhSua: Đã hoàn tiền

    DangXuLyChinhSua --> ChinhSuaDuocApDung: Shopify API<br/>orderEditCommit thành công
    DangXuLyChinhSua --> ChinhSuaBiTuChoi: Lỗi Shopify API

    ChinhSuaDuocApDung --> ThongBaoDaGui: Email / SMS đã gửi
    ThongBaoDaGui --> CuaSoChinhSuaMo: Cửa sổ vẫn mở<br/>(cho phép chỉnh sửa tiếp)
    ThongBaoDaGui --> CuaSoChinhSuaDong: Cửa sổ hết hạn

    YeuCauHuy --> LuongGiuChan: Hiển thị ưu đãi giữ chân
    LuongGiuChan --> CuaSoChinhSuaMo: Khách hàng được giữ lại<br/>(chấp nhận ưu đãi)
    LuongGiuChan --> DangXuLyHuy: Khách hàng xác nhận hủy
    DangXuLyHuy --> DonHangDaHuy: Hủy qua Shopify API<br/>+ nhập lại tồn kho

    ChinhSuaBiTuChoi --> CuaSoChinhSuaMo: Khách hàng có thể thử lại
    CuaSoChinhSuaDong --> [*]
    DonHangDaHuy --> [*]

    note right of CuaSoChinhSuaMo
        Cửa sổ thời gian được kiểm soát bởi
        cài đặt người bán (ví dụ: 2 giờ,
        trước khi giao hàng, v.v.)
    end note

    note right of TinhChenhLechGia
        So sánh tổng đơn hàng ban đầu
        với tổng mục hàng mới
    end note
```

## 3. Luồng Khách Hàng Tự Chỉnh Sửa (Sơ Đồ Tuần Tự)

```mermaid
sequenceDiagram
    actor C as Khách Hàng
    participant OSP as Trang Trạng Thái Đơn Hàng<br/>(Theme Extension)
    participant SW as Widget Cửa Hàng<br/>(Preact)
    participant API as Firebase Functions<br/>(Bộ Xử Lý API)
    participant SVC as Dịch Vụ Chỉnh Sửa
    participant FS as Firestore
    participant SHOP as Shopify GraphQL API
    participant EMAIL as Dịch Vụ Email

    C->>OSP: Xem trang trạng thái đơn hàng
    OSP->>API: GET /api/orders/{orderId}/edit-eligibility
    API->>FS: Lấy editSettings của cửa hàng
    API->>FS: Lấy bản ghi đơn hàng
    API->>SVC: checkEditEligibility(order, settings)
    SVC-->>API: {eligible: true, allowedActions, timeRemaining}
    API-->>OSP: Phản hồi đủ điều kiện chỉnh sửa

    OSP->>SW: Hiển thị nút "Chỉnh Sửa Đơn Hàng"

    C->>SW: Nhấn "Chỉnh Sửa Đơn Hàng"
    SW->>API: GET /api/orders/{orderId}/edit-options
    API->>SHOP: query order(id) { lineItems, variants }
    SHOP-->>API: Chi tiết đơn hàng + biến thể khả dụng
    API->>FS: Lấy editRules của cửa hàng
    API-->>SW: {lineItems, swapOptions, quantityLimits}

    SW->>SW: Hiển thị form chỉnh sửa<br/>(đổi sản phẩm, thay đổi số lượng, sửa địa chỉ)

    C->>SW: Chọn thay đổi<br/>(ví dụ: đổi biến thể, thay đổi số lượng)
    SW->>API: POST /api/orders/{orderId}/edits
    Note over API: Nội dung yêu cầu: {changes: [{type, lineItemId, newVariantId, newQty}]}

    API->>SVC: validateEdit(order, changes, rules)
    SVC->>SHOP: query inventoryLevel(variantId)
    SHOP-->>SVC: Tồn kho khả dụng
    SVC->>SVC: Kiểm tra quy tắc chỉnh sửa<br/>(cửa sổ thời gian, số lần chỉnh sửa tối đa, loại cho phép)
    SVC-->>API: Kết quả xác thực

    alt Xác thực thất bại
        API-->>SW: 422 {error: "Sản phẩm hết hàng"}
        SW->>C: Hiển thị thông báo lỗi
    else Xác thực thành công
        API->>SVC: calculatePriceDiff(originalOrder, changes)
        SVC-->>API: {priceDiff: +$5.00, newTotal: $55.00}
        API-->>SW: {valid: true, priceDiff, requiresPayment: true}

        SW->>C: Hiển thị chênh lệch giá & xác nhận

        C->>SW: Xác nhận thay đổi
        SW->>API: POST /api/orders/{orderId}/edits/confirm

        API->>SVC: processEdit(order, changes)
        SVC->>SHOP: mutation orderEditBegin(id)
        SHOP-->>SVC: calculatedOrder

        SVC->>SHOP: mutation orderEditAddVariant / removeVariant / setQuantity
        SHOP-->>SVC: Đơn hàng tính toán đã cập nhật

        alt Giá tăng
            SVC->>SHOP: mutation orderEditCommit(id)<br/>với notifyCustomer: false
            SHOP-->>SVC: Đơn hàng đã cập nhật
            SVC->>SHOP: mutation orderInvoiceSend(id)
            Note over SVC: Khách hàng thanh toán qua liên kết hóa đơn
        else Giá giảm
            SVC->>SHOP: mutation orderEditCommit(id)
            SHOP-->>SVC: Đơn hàng đã cập nhật + đã hoàn tiền
        else Không thay đổi giá
            SVC->>SHOP: mutation orderEditCommit(id)
            SHOP-->>SVC: Đơn hàng đã cập nhật
        end

        SVC->>FS: Lưu bản ghi orderEdit
        SVC->>FS: Tăng số lần chỉnh sửa của cửa hàng (theo dõi sử dụng)

        API-->>SW: {success: true, updatedOrder}
        SW->>C: Hiển thị xác nhận thành công

        API->>EMAIL: Gửi email xác nhận chỉnh sửa
        EMAIL-->>C: "Đơn hàng của bạn đã được cập nhật"
    end
```

## 4. Luồng Chỉnh Sửa Từ Trang Quản Trị Người Bán (Sơ Đồ Tuần Tự)

```mermaid
sequenceDiagram
    actor M as Người Bán
    participant APP as Ứng Dụng Quản Trị<br/>(React/Polaris)
    participant AB as App Bridge
    participant API as Firebase Functions
    participant SVC as Dịch Vụ Chỉnh Sửa
    participant FS as Firestore
    participant SHOP as Shopify GraphQL API
    participant PS as Cloud Pub/Sub
    participant EMAIL as Dịch Vụ Email

    M->>APP: Mở bảng điều khiển Chỉnh Sửa Đơn Hàng
    APP->>API: GET /api/orders?status=open&page=1
    API->>FS: Truy vấn đơn hàng (shopId, status, phân trang)
    FS-->>API: Danh sách đơn hàng
    API-->>APP: Danh sách đơn hàng phân trang

    M->>APP: Nhấn vào đơn hàng cụ thể
    APP->>AB: API trực tiếp: query order(id) { chi tiết đầy đủ }
    AB->>SHOP: Truy vấn GraphQL
    SHOP-->>AB: Chi tiết đơn hàng
    AB-->>APP: Dữ liệu đơn hàng (không qua backend)

    M->>APP: Nhấn "Chỉnh Sửa Đơn Hàng"
    APP->>API: POST /api/orders/{orderId}/merchant-edit/begin
    API->>SVC: beginMerchantEdit(order)
    SVC->>SHOP: mutation orderEditBegin(id)
    SHOP-->>SVC: calculatedOrder với các trường có thể chỉnh sửa
    SVC-->>API: Phiên chỉnh sửa với các trường có thể chỉnh sửa
    API-->>APP: {editSession, lineItems, availableProducts}

    APP->>APP: Hiển thị form chỉnh sửa với giá trị hiện tại

    M->>APP: Thực hiện thay đổi<br/>(thêm sản phẩm, thay đổi số lượng, cập nhật địa chỉ)
    M->>APP: Nhấn "Lưu Thay Đổi"
    APP->>API: POST /api/orders/{orderId}/merchant-edit/commit
    Note over API: {changes: [...], notifyCustomer: true, reason: "Yêu cầu của khách hàng"}

    API->>SVC: processMerchantEdit(order, changes)
    SVC->>SHOP: mutation orderEditAddVariant / setQuantity
    SHOP-->>SVC: Đơn hàng tính toán đã cập nhật
    SVC->>SHOP: mutation orderEditCommit(id, staffNote)
    SHOP-->>SVC: Đơn hàng đã xác nhận

    SVC->>FS: Lưu bản ghi orderEdit (editedBy: "merchant")
    SVC->>FS: Ghi vào bộ sưu tập phân tích

    API-->>APP: {success: true, updatedOrder}
    APP->>M: Hiển thị thông báo thành công (Polaris Banner)

    API->>PS: Phát sự kiện "order.edited"
    PS->>EMAIL: Gửi thông báo cho khách hàng
    EMAIL-->>EMAIL: "Người bán đã cập nhật đơn hàng của bạn"
```

## 5. Luồng Giữ Chân Khi Hủy Đơn

```mermaid
sequenceDiagram
    actor C as Khách Hàng
    participant SW as Widget Cửa Hàng
    participant API as Firebase Functions
    participant SVC as Dịch Vụ Hủy Đơn
    participant RS as Dịch Vụ Giữ Chân
    participant FS as Firestore
    participant SHOP as Shopify GraphQL API
    participant EMAIL as Dịch Vụ Email

    C->>SW: Nhấn "Hủy Đơn Hàng"
    SW->>API: POST /api/orders/{orderId}/cancel/init
    API->>FS: Lấy editSettings.cancellation của cửa hàng
    API->>SVC: initCancellation(order, settings)
    SVC->>SVC: Kiểm tra đủ điều kiện hủy<br/>(chưa giao hàng, trong thời gian cho phép)

    alt Không đủ điều kiện
        API-->>SW: {eligible: false, reason: "Đơn hàng đã được giao"}
        SW->>C: Hiển thị thông báo "Không thể hủy"
    else Đủ điều kiện
        SVC->>RS: getRetentionOffers(order, shopSettings)
        RS->>FS: Lấy chiến lược giữ chân của cửa hàng
        RS-->>SVC: Các ưu đãi giữ chân khả dụng

        API-->>SW: {eligible: true, retentionOffers: [...]}

        SW->>SW: Hiển thị lựa chọn lý do hủy
        C->>SW: Chọn lý do: "Tìm được nơi rẻ hơn"

        SW->>SW: Hiển thị ưu đãi giữ chân theo lý do
        Note over SW: Ưu đãi theo lý do:<br/>"Tìm được rẻ hơn" → giảm giá<br/>"Không cần nữa" → hoãn giao hàng<br/>"Sai sản phẩm" → đổi sản phẩm

        rect rgb(255, 248, 220)
            Note over SW: Hiển Thị Ưu Đãi Giữ Chân
            SW->>C: Ưu đãi 1: "Giảm 15% cho đơn hàng này"
            SW->>C: Ưu đãi 2: "Đổi sang sản phẩm khác"
            SW->>C: Ưu đãi 3: "Hoãn giao hàng thay vì hủy"
            SW->>C: Tùy chọn: "Không, cảm ơn, hủy đơn hàng"
        end

        alt Khách hàng chấp nhận ưu đãi giảm giá
            C->>SW: Chấp nhận ưu đãi "Giảm 15%"
            SW->>API: POST /api/orders/{orderId}/cancel/retain
            Note over API: {retentionType: "discount", offerId: "..."}
            API->>RS: applyRetentionOffer(order, offer)
            RS->>SHOP: mutation discountCodeBasicCreate hoặc orderEditBegin + điều chỉnh giá
            SHOP-->>RS: Đã áp dụng giảm giá
            RS->>FS: Ghi nhận giữ chân thành công
            RS->>FS: Cập nhật phân tích (retention_saved)
            API-->>SW: {retained: true, discount: "15%", newTotal}
            SW->>C: "Tuyệt vời! Đã áp dụng giảm 15% cho đơn hàng của bạn"
            API->>EMAIL: Gửi email xác nhận giữ chân

        else Khách hàng chấp nhận đổi sản phẩm
            C->>SW: Chấp nhận đổi sản phẩm
            SW->>API: POST /api/orders/{orderId}/cancel/retain
            Note over API: {retentionType: "swap", newVariantId: "..."}
            API->>RS: applyRetentionOffer(order, offer)
            RS->>SHOP: orderEditBegin → removeVariant → addVariant → commit
            SHOP-->>RS: Đơn hàng đã cập nhật với sản phẩm mới
            RS->>FS: Ghi nhận giữ chân thành công
            API-->>SW: {retained: true, swappedProduct}
            SW->>C: "Đơn hàng đã được cập nhật với lựa chọn mới của bạn"

        else Khách hàng từ chối tất cả ưu đãi
            C->>SW: Nhấn "Không, cảm ơn, hủy đơn hàng"
            SW->>API: POST /api/orders/{orderId}/cancel/confirm
            Note over API: {reason: "Tìm được nơi rẻ hơn"}
            API->>SVC: processCancellation(order, reason)
            SVC->>SHOP: mutation orderCancel(orderId, reason, refund, restock)
            SHOP-->>SVC: Đơn hàng đã hủy
            SVC->>FS: Lưu bản ghi hủy đơn
            SVC->>FS: Ghi phân tích (retention_failed, reason)
            API-->>SW: {cancelled: true, refundAmount}
            SW->>C: "Đơn hàng đã hủy. Hoàn tiền $X đã được thực hiện."
            API->>EMAIL: Gửi email xác nhận hủy đơn
        end
    end
```

## 6. Luồng Bán Thêm Sau Mua Hàng (Sơ Đồ Tuần Tự)

```mermaid
sequenceDiagram
    actor C as Khách Hàng
    participant SW as Widget Cửa Hàng
    participant API as Firebase Functions
    participant ES as Dịch Vụ Chỉnh Sửa
    participant US as Dịch Vụ Bán Thêm
    participant FS as Firestore
    participant SHOP as Shopify GraphQL API

    Note over C,SHOP: Khách hàng đang trong luồng chỉnh sửa đơn hàng

    C->>SW: Đang chỉnh sửa đơn hàng (thay đổi sản phẩm/số lượng)
    SW->>API: POST /api/orders/{orderId}/edits
    API->>ES: validateEdit(order, changes)
    ES-->>API: Xác thực thành công

    API->>US: getUpsellRecommendations(order, changes)
    US->>FS: Lấy upsellOffers của cửa hàng
    US->>FS: Lấy quy tắc gợi ý sản phẩm
    US->>US: Khớp quy tắc với giỏ hàng hiện tại<br/>(sản phẩm bổ sung, thường mua cùng,<br/>giảm giá theo số lượng)

    alt Có gợi ý
        US-->>API: {recommendations: [{productId, title, price, reason, discount}]}
        API-->>SW: {editValid: true, priceDiff, upsellOffers: [...]}

        rect rgb(232, 245, 233)
            Note over SW: Hiển Thị Bán Thêm (trước khi xác nhận chỉnh sửa)
            SW->>C: "Khách hàng mua X cũng thường mua Y"
            SW->>C: "Thêm phụ kiện phù hợp - $14.99 (giảm 10%)"
            SW->>C: "Nâng cấp lên combo và tiết kiệm $8"
        end

        alt Khách hàng thêm sản phẩm gợi ý
            C->>SW: Nhấn "Thêm vào đơn hàng" cho sản phẩm gợi ý
            SW->>API: POST /api/orders/{orderId}/edits/confirm
            Note over API: {changes: [...thayDoiBanDau], upsellItems: [{variantId, qty}]}

            API->>ES: processEditWithUpsell(order, changes, upsellItems)
            ES->>SHOP: mutation orderEditBegin(id)
            SHOP-->>ES: calculatedOrder

            loop Cho mỗi thay đổi + sản phẩm bán thêm
                ES->>SHOP: mutation orderEditAddVariant / setQuantity
                SHOP-->>ES: Đơn hàng tính toán đã cập nhật
            end

            ES->>ES: Tính chênh lệch giá cuối cùng<br/>(thay đổi ban đầu + sản phẩm bán thêm)

            alt Cần thanh toán thêm
                ES->>SHOP: mutation orderEditCommit(id)
                SHOP-->>ES: Đơn hàng đã xác nhận
                ES->>SHOP: mutation orderInvoiceSend(id)
                Note over SHOP: Khách hàng nhận hóa đơn cho số tiền bổ sung
            else Giá không đổi hoặc hoàn tiền
                ES->>SHOP: mutation orderEditCommit(id)
                SHOP-->>ES: Đơn hàng đã xác nhận
            end

            ES->>FS: Lưu orderEdit với dữ liệu bán thêm
            ES->>FS: Ghi phân tích chuyển đổi bán thêm
            Note over FS: {editId, upsellOfferId, revenue, accepted: true}

            API-->>SW: {success: true, updatedOrder, upsellApplied: true}
            SW->>C: "Đơn hàng đã cập nhật với sản phẩm bổ sung!"

        else Khách hàng từ chối bán thêm
            C->>SW: Nhấn "Không, cảm ơn, chỉ lưu thay đổi"
            SW->>API: POST /api/orders/{orderId}/edits/confirm
            Note over API: {changes: [...thayDoiBanDau], upsellItems: []}
            API->>ES: processEdit(order, changes)
            ES->>FS: Ghi lượt hiển thị bán thêm (từ chối)
            API-->>SW: {success: true, updatedOrder}
        end

    else Không có gợi ý
        US-->>API: {recommendations: []}
        API-->>SW: {editValid: true, priceDiff, upsellOffers: []}
        Note over SW: Tiếp tục luồng chỉnh sửa bình thường (không hiển thị bán thêm)
    end
```

## 7. Sơ Đồ Luồng Dữ Liệu

```mermaid
graph TB
    subgraph "Nguồn Dữ Liệu"
        SWH[Shopify Webhooks<br/>orders/create, orders/updated,<br/>orders/cancelled, app/uninstalled]
        CUST[Hành Động Khách Hàng<br/>chỉnh sửa, hủy, chấp nhận bán thêm]
        MERCH[Hành Động Người Bán<br/>chỉnh sửa, thay đổi cài đặt, cập nhật quy tắc]
    end

    subgraph "Tầng Tiếp Nhận (Firebase Functions)"
        WHR[Bộ Nhận Webhook<br/>Xác thực HMAC + kiểm tra trùng lặp]
        APIR[Bộ Định Tuyến API<br/>Xác thực + giới hạn tần suất]
    end

    subgraph "Tầng Xử Lý"
        PS[Cloud Pub/Sub Topics]
        CT[Cloud Tasks<br/>Trì Hoãn / Theo Lịch]

        PS --- T1[order.created]
        PS --- T2[order.edited]
        PS --- T3[order.cancelled]
        PS --- T4[edit.requested]
        PS --- T5[notification.send]

        BGW[Worker Chạy Nền]
        T1 --> BGW
        T2 --> BGW
        T3 --> BGW
        T4 --> BGW
        T5 --> BGW
    end

    subgraph "Lưu Trữ Dữ Liệu (Firestore)"
        FS_SHOPS[(shops<br/>shopId, domain, settings,<br/>plan, accessToken)]
        FS_ORDERS[(orders<br/>shopId, orderId, status,<br/>editWindow, lineItems)]
        FS_EDITS[(orderEdits<br/>shopId, orderId, editType,<br/>changes, status, priceDiff)]
        FS_SETTINGS[(editSettings<br/>shopId, timeWindow, rules,<br/>allowedActions)]
        FS_SUBS[(subscriptions<br/>shopId, plan, usage,<br/>billingCycle)]
        FS_NOTIF[(notifications<br/>shopId, type, recipient,<br/>sentAt, TTL)]
    end

    subgraph "Đường Ống Phân Tích"
        BQ[(BigQuery)]
        BQ_EDITS[Bảng chỉnh sửa<br/>phân vùng theo ngày<br/>phân cụm theo shopId]
        BQ_CANCEL[Bảng hủy đơn<br/>phân vùng theo ngày]
        BQ_UPSELL[Bảng chuyển đổi bán thêm<br/>phân vùng theo ngày]
        BQ_USAGE[Bảng chỉ số sử dụng<br/>phân vùng theo ngày<br/>phân cụm theo shopId, plan]

        BQ --- BQ_EDITS
        BQ --- BQ_CANCEL
        BQ --- BQ_UPSELL
        BQ --- BQ_USAGE
    end

    subgraph "Tầng Đầu Ra"
        DASH[Bảng Quản Trị<br/>React/Polaris]
        EMAILS[Thông Báo Email]
        SAPI_OUT[Cập Nhật Shopify API]
    end

    SWH --> WHR
    CUST --> APIR
    MERCH --> APIR

    WHR --> PS
    APIR --> PS

    BGW --> FS_ORDERS
    BGW --> FS_EDITS
    BGW --> FS_NOTIF

    APIR --> FS_SHOPS
    APIR --> FS_SETTINGS
    APIR --> FS_SUBS

    BGW -->|Chèn trực tuyến| BQ
    CT -->|Tổng hợp hàng ngày| BQ

    FS_EDITS -.->|Luồng thay đổi<br/>Cloud Function trigger| BQ_EDITS
    FS_NOTIF -.->|Tự động xóa TTL<br/>sau 30 ngày| FS_NOTIF

    BQ --> DASH
    BGW --> EMAILS
    BGW --> SAPI_OUT

    style BQ fill:#4285f4,color:#fff
    style PS fill:#34a853,color:#fff
    style FS_SHOPS fill:#f4b400,color:#000
    style FS_ORDERS fill:#f4b400,color:#000
    style FS_EDITS fill:#f4b400,color:#000
```

## 8. Sơ Đồ Quan Hệ Thực Thể (ERD)

```mermaid
erDiagram
    SHOPS {
        string shopId PK "Tên miền cửa hàng Shopify"
        string domain "mystore.myshopify.com"
        string accessToken "Token API Shopify (đã mã hóa)"
        string plan "free | starter | growth | pro | business | enterprise"
        string status "active | inactive | uninstalled"
        timestamp installedAt
        timestamp uninstalledAt
        object appSettings "Tùy chọn ứng dụng toàn cục"
    }

    EDIT_SETTINGS {
        string id PK "tự động tạo"
        string shopId FK "Tham chiếu đến shops"
        number timeWindowMinutes "Thời lượng cửa sổ chỉnh sửa (ví dụ: 120)"
        string timeWindowType "minutes | hours | before_fulfillment"
        boolean allowAddressEdit
        boolean allowItemSwap
        boolean allowQuantityChange
        boolean allowAddItem
        boolean allowRemoveItem
        boolean allowCancellation
        number maxEditsPerOrder "Số lần chỉnh sửa tối đa mỗi đơn hàng"
        object retentionSettings "Cấu hình giữ chân khi hủy"
        object upsellSettings "Cấu hình bán thêm sau mua hàng"
        object notificationSettings "Cấu hình mẫu email"
    }

    ORDERS {
        string id PK "tự động tạo"
        string shopId FK "Tham chiếu đến shops"
        string shopifyOrderId "GID đơn hàng Shopify"
        string orderNumber "Mã đọc được #1001"
        string customerEmail
        string customerName
        string financialStatus "paid | partially_refunded | refunded"
        string fulfillmentStatus "unfulfilled | partial | fulfilled"
        string editWindowStatus "open | closed | expired"
        timestamp editWindowExpiresAt
        number editCount "Số lần chỉnh sửa đã thực hiện"
        number originalTotal "Tổng đơn hàng ban đầu"
        number currentTotal "Tổng hiện tại sau chỉnh sửa"
        string currency "USD, EUR, v.v."
        timestamp orderCreatedAt
        timestamp lastEditedAt
        timestamp syncedAt
    }

    ORDER_EDITS {
        string id PK "tự động tạo"
        string shopId FK "Tham chiếu đến shops"
        string orderId FK "Tham chiếu đến orders"
        string shopifyOrderId
        string editType "item_swap | quantity_change | address_edit | add_item | remove_item | cancel"
        string initiatedBy "customer | merchant"
        string status "pending | processing | applied | rejected | failed"
        array changes "Mảng các đối tượng thay đổi"
        number priceDiff "Dương = thu phí, âm = hoàn tiền"
        string refundId "ID hoàn tiền Shopify nếu có"
        string reason "Lý do từ khách hàng"
        string staffNote "Ghi chú từ người bán"
        object previousState "Ảnh chụp trước khi chỉnh sửa"
        object newState "Ảnh chụp sau khi chỉnh sửa"
        timestamp requestedAt
        timestamp processedAt
    }

    EDIT_RULES {
        string id PK "tự động tạo"
        string shopId FK "Tham chiếu đến shops"
        string ruleType "product | collection | tag | all"
        string targetId "ID Sản phẩm/Bộ sưu tập hoặc * cho tất cả"
        boolean allowSwap
        boolean allowQuantityChange
        boolean allowRemove
        array swapTargets "ID sản phẩm/biến thể được phép đổi"
        number minQuantity
        number maxQuantity
        boolean active
    }

    SUBSCRIPTIONS {
        string id PK "tự động tạo"
        string shopId FK "Tham chiếu đến shops"
        string plan "free | starter | growth | pro | business | enterprise"
        string shopifyChargeId "ID phí định kỳ"
        string status "active | frozen | cancelled | pending"
        number monthlyEditLimit "50 | 200 | unlimited"
        number currentMonthUsage "Số lần chỉnh sửa đã dùng trong chu kỳ"
        timestamp billingCycleStart
        timestamp billingCycleEnd
        timestamp createdAt
    }

    UPSELL_OFFERS {
        string id PK "tự động tạo"
        string shopId FK "Tham chiếu đến shops"
        string offerType "complementary | upgrade | bundle | discount"
        string triggerType "product | collection | cart_value | edit_type"
        string triggerValue "ID sản phẩm, ID bộ sưu tập, hoặc ngưỡng"
        array recommendedProducts "ID sản phẩm/biến thể được gợi ý"
        number discountPercent "Giảm giá tùy chọn cho bán thêm"
        string discountType "percentage | fixed_amount"
        number priority "Thứ tự hiển thị"
        boolean active
        timestamp createdAt
    }

    NOTIFICATIONS {
        string id PK "tự động tạo"
        string shopId FK "Tham chiếu đến shops"
        string orderId FK "Tham chiếu đến orders"
        string editId FK "Tham chiếu đến orderEdits"
        string type "edit_confirmation | cancel_confirmation | retention_offer | upsell_accepted | invoice"
        string channel "email | sms"
        string recipient "Email hoặc số điện thoại khách hàng"
        string status "queued | sent | failed | bounced"
        string templateId "Tham chiếu mẫu email"
        object templateData "Biến động của mẫu"
        timestamp sentAt
        timestamp expiresAt "TTL cho tự động xóa"
    }

    ANALYTICS_EVENTS {
        string id PK "tự động tạo"
        string shopId FK "Tham chiếu đến shops"
        string eventType "edit | cancel | retention | upsell | widget_view"
        string orderId
        string editId
        object eventData "Dữ liệu sự kiện cụ thể"
        timestamp createdAt
        timestamp expiresAt "TTL 90 ngày"
    }

    SHOPS ||--o{ ORDERS : "có nhiều"
    SHOPS ||--|| EDIT_SETTINGS : "có một"
    SHOPS ||--o{ EDIT_RULES : "có nhiều"
    SHOPS ||--|| SUBSCRIPTIONS : "có một đang hoạt động"
    SHOPS ||--o{ UPSELL_OFFERS : "có nhiều"
    ORDERS ||--o{ ORDER_EDITS : "có nhiều"
    ORDERS ||--o{ NOTIFICATIONS : "có nhiều"
    ORDER_EDITS ||--o{ NOTIFICATIONS : "kích hoạt"
    SHOPS ||--o{ ANALYTICS_EVENTS : "có nhiều"
```

## 9. Kiến Trúc Triển Khai

```mermaid
graph TB
    subgraph "Tầng Khách Hàng"
        BROWSER[Trình Duyệt Người Bán<br/>iFrame Quản Trị Shopify]
        CUST_BROWSER[Trình Duyệt Khách Hàng<br/>Cửa Hàng / Trạng Thái Đơn Hàng]
    end

    subgraph "CDN / Biên"
        CF[Firebase Hosting CDN<br/>Mạng Biên Toàn Cầu]
    end

    subgraph "Dự Án GCP: avada-order-editing"
        subgraph "Tính Toán"
            FF_API[Firebase Functions<br/>Bộ Xử Lý API<br/>Node.js 18 | 256MB-1GB RAM<br/>us-central1]
            FF_WH[Firebase Functions<br/>Bộ Xử Lý Webhook<br/>Node.js 18 | 256MB RAM<br/>us-central1]
            FF_BG[Firebase Functions<br/>Worker Chạy Nền<br/>Kích hoạt bởi Pub/Sub<br/>Node.js 18 | 512MB RAM]
            FF_CRON[Firebase Functions<br/>Hàm Theo Lịch<br/>Kích hoạt bởi Cloud Scheduler<br/>Hết hạn cửa sổ chỉnh sửa, đặt lại sử dụng]
        end

        subgraph "Tin Nhắn & Lập Lịch"
            PUBSUB[Cloud Pub/Sub]
            PUBSUB_T1[Topic: order-events]
            PUBSUB_T2[Topic: edit-events]
            PUBSUB_T3[Topic: notification-events]
            PUBSUB_DLQ[Topic Thư Chết<br/>Thử lại tin nhắn thất bại]

            TASKS[Cloud Tasks]
            TASKS_Q1[Hàng đợi: delayed-edits]
            TASKS_Q2[Hàng đợi: bulk-operations]

            SCHEDULER[Cloud Scheduler]
            SCHED_1[Mỗi 5 phút: hết hạn cửa sổ chỉnh sửa]
            SCHED_2[Hàng tháng: đặt lại bộ đếm sử dụng]
            SCHED_3[Hàng ngày: đồng bộ phân tích sang BigQuery]
        end

        subgraph "Cơ Sở Dữ Liệu"
            FIRESTORE[(Cloud Firestore<br/>Chế Độ Native<br/>nam5 đa vùng)]
            FIRESTORE_IDX[Chỉ Mục Kết Hợp<br/>shopId + status<br/>shopId + orderCreatedAt<br/>shopId + editWindowStatus]
        end

        subgraph "Phân Tích"
            BIGQUERY[(BigQuery<br/>Dataset: order_editing)]
            BQ_P[Bảng Phân Vùng<br/>theo _PARTITIONDATE]
            BQ_C[Phân Cụm theo<br/>shopId, plan, eventType]
        end

        subgraph "Bảo Mật"
            SA[Tài Khoản Dịch Vụ<br/>Quyền tối thiểu cho mỗi hàm]
            SM[Secret Manager<br/>Khóa API, token]
        end

        subgraph "Giám Sát"
            LOG[Cloud Logging<br/>Log có cấu trúc]
            MON[Cloud Monitoring<br/>Cảnh báo & bảng điều khiển]
            TRACE[Cloud Trace<br/>Theo dõi yêu cầu]
        end
    end

    subgraph "Bên Ngoài"
        SHOPIFY[Nền Tảng Shopify<br/>GraphQL Admin API<br/>REST Admin API<br/>Webhooks]
        SENDGRID[Nhà Cung Cấp Email<br/>SendGrid]
        GADDR_API[Google Maps<br/>Address Validation API]
    end

    BROWSER --> CF
    CUST_BROWSER --> CF
    CF --> FF_API

    SHOPIFY -->|Webhooks| FF_WH
    FF_WH --> PUBSUB
    PUBSUB --> PUBSUB_T1
    PUBSUB --> PUBSUB_T2
    PUBSUB --> PUBSUB_T3
    PUBSUB_T1 --> FF_BG
    PUBSUB_T2 --> FF_BG
    PUBSUB_T3 --> FF_BG
    PUBSUB_T1 -.->|Khi thất bại| PUBSUB_DLQ

    SCHEDULER --> SCHED_1
    SCHEDULER --> SCHED_2
    SCHEDULER --> SCHED_3
    SCHED_1 --> FF_CRON
    SCHED_2 --> FF_CRON
    SCHED_3 --> FF_CRON

    TASKS --> TASKS_Q1
    TASKS --> TASKS_Q2
    TASKS_Q1 --> FF_BG
    TASKS_Q2 --> FF_BG

    FF_API --> FIRESTORE
    FF_BG --> FIRESTORE
    FF_CRON --> FIRESTORE
    FIRESTORE --> FIRESTORE_IDX

    FF_BG --> BIGQUERY
    FF_CRON --> BIGQUERY
    BIGQUERY --> BQ_P
    BIGQUERY --> BQ_C

    FF_API --> SHOPIFY
    FF_BG --> SHOPIFY
    FF_BG --> SENDGRID
    FF_API --> GADDR_API

    FF_API --> SM
    FF_WH --> SM

    FF_API --> LOG
    FF_BG --> LOG
    LOG --> MON

    style FIRESTORE fill:#f4b400,color:#000
    style BIGQUERY fill:#4285f4,color:#fff
    style PUBSUB fill:#34a853,color:#fff
    style CF fill:#ff9800,color:#fff
```

## 10. Luồng Xử Lý Webhook

```mermaid
sequenceDiagram
    participant SHOP as Nền Tảng Shopify
    participant FF as Firebase Function<br/>(Bộ Xử Lý Webhook)
    participant HMAC as Bộ Xác Thực HMAC
    participant IDEM as Kiểm Tra Trùng Lặp
    participant FS as Firestore
    participant PS as Cloud Pub/Sub
    participant BG as Worker Chạy Nền<br/>(Kích hoạt bởi Pub/Sub)
    participant SVC as Tầng Dịch Vụ
    participant SAPI as Shopify GraphQL API
    participant EMAIL as Dịch Vụ Email
    participant BQ as BigQuery
    participant DLQ as Hàng Đợi Thư Chết

    SHOP->>FF: POST /webhooks/{topic}<br/>Headers: X-Shopify-Hmac-Sha256,<br/>X-Shopify-Topic, X-Shopify-Shop-Domain

    FF->>HMAC: Xác minh chữ ký HMAC-SHA256
    Note over HMAC: So sánh HMAC đã tính<br/>sử dụng app secret với giá trị header

    alt HMAC không hợp lệ
        HMAC-->>FF: Chữ ký không hợp lệ
        FF-->>SHOP: 401 Không được phép
    else HMAC hợp lệ
        HMAC-->>FF: Chữ ký đã xác minh

        FF->>IDEM: Kiểm tra webhook ID trong Firestore
        FF->>FS: GET webhookLogs/{webhookId}

        alt Đã xử lý rồi
            FS-->>FF: Tài liệu tồn tại (trùng lặp)
            FF-->>SHOP: 200 OK (idempotent, bỏ qua)
        else Webhook mới
            FS-->>FF: Không tìm thấy tài liệu

            FF->>FS: SET webhookLogs/{webhookId}<br/>{topic, shopDomain, receivedAt, TTL: 7 ngày}

            FF->>PS: Phát tin nhắn đến topic
            Note over FF,PS: Topic được chọn theo loại webhook:<br/>orders/create → order-events<br/>orders/updated → order-events<br/>orders/cancelled → order-events<br/>app/uninstalled → app-events

            FF-->>SHOP: 200 OK
            Note over FF,SHOP: Phản hồi trong vòng 5 giây<br/>(yêu cầu của Shopify)
        end
    end

    Note over PS,BG: Bắt đầu xử lý bất đồng bộ

    PS->>BG: Gửi tin nhắn (tự động thử lại khi thất bại)

    alt orders/create
        BG->>SVC: handleOrderCreated(orderData)
        SVC->>FS: Lấy editSettings của cửa hàng
        SVC->>SVC: Tính thời điểm hết hạn cửa sổ chỉnh sửa<br/>(hiện tại + timeWindowMinutes)
        SVC->>FS: TẠO orders/{id}<br/>{shopifyOrderId, editWindowStatus: "open",<br/>editWindowExpiresAt, lineItems, customer}
        SVC->>BQ: Chèn sự kiện order_created

    else orders/updated
        BG->>SVC: handleOrderUpdated(orderData)
        SVC->>FS: LẤY orders theo shopifyOrderId
        SVC->>SVC: Phát hiện thay đổi<br/>(trạng thái giao hàng, trạng thái thanh toán)

        alt Bắt đầu giao hàng
            SVC->>FS: CẬP NHẬT orders/{id}<br/>{editWindowStatus: "closed",<br/>fulfillmentStatus: "partial"}
            SVC->>BQ: Chèn sự kiện edit_window_closed
        else Cập nhật khác
            SVC->>FS: CẬP NHẬT orders/{id} với dữ liệu mới
        end

    else orders/cancelled
        BG->>SVC: handleOrderCancelled(orderData)
        SVC->>FS: CẬP NHẬT orders/{id}<br/>{editWindowStatus: "closed", status: "cancelled"}
        SVC->>FS: Truy vấn orderEdits liên quan<br/>CẬP NHẬT status thành "void"
        SVC->>BQ: Chèn sự kiện order_cancelled

    else app/uninstalled
        BG->>SVC: handleAppUninstalled(shopDomain)
        SVC->>FS: CẬP NHẬT shops/{shopId}<br/>{status: "uninstalled", uninstalledAt}
        SVC->>FS: Xóa dữ liệu nhạy cảm (accessToken)
        SVC->>BQ: Chèn sự kiện app_uninstalled
    end

    alt Xử lý thất bại (đã thử lại 3 lần)
        BG-->>PS: NACK (không xác nhận)
        PS->>DLQ: Chuyển đến topic thư chết
        DLQ->>FS: Ghi webhook thất bại để xem xét thủ công
        Note over DLQ: Cảnh báo qua Cloud Monitoring
    end
```

---

## Mục Lục Sơ Đồ

| # | Sơ Đồ | Loại | Mục Đích |
|---|-------|------|----------|
| 1 | Kiến Trúc Hệ Thống | Thành phần | Tổng quan toàn bộ hệ thống với tất cả dịch vụ và kết nối |
| 2 | Vòng Đời Chỉnh Sửa Đơn Hàng | Máy trạng thái | Tất cả trạng thái có thể của một lần chỉnh sửa đơn hàng |
| 3 | Khách Hàng Tự Chỉnh Sửa | Tuần tự | Luồng chỉnh sửa khách hàng từ đầu đến cuối với xử lý thanh toán |
| 4 | Chỉnh Sửa Từ Quản Trị Người Bán | Tuần tự | Chỉnh sửa do người bán thực hiện qua bảng quản trị |
| 5 | Giữ Chân Khi Hủy Đơn | Tuần tự | Luồng hủy đơn với ưu đãi giữ chân để giảm tỷ lệ rời bỏ |
| 6 | Bán Thêm Sau Mua Hàng | Tuần tự | Gợi ý bán thêm trong luồng chỉnh sửa |
| 7 | Luồng Dữ Liệu | Luồng dữ liệu | Cách dữ liệu di chuyển qua hệ thống |
| 8 | Quan Hệ Thực Thể | ERD | Các bộ sưu tập Firestore và quan hệ giữa chúng |
| 9 | Kiến Trúc Triển Khai | Hạ tầng | Cấu trúc tài nguyên GCP/Firebase |
| 10 | Xử Lý Webhook | Tuần tự | Nhận webhook, xác thực và xử lý bất đồng bộ |
