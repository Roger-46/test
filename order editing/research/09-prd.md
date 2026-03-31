# Tài liệu Yêu cầu Sản phẩm (PRD)
# Avada Order Editing

---

## 1. Tổng quan

| Trường | Giá trị |
|-------|-------|
| **Tên sản phẩm** | Avada Order Editing |
| **Phiên bản** | 1.0 (MVP) |
| **Tác giả** | Đội ngũ Sản phẩm Avada |
| **Ngày** | 2026-03-31 |
| **Trạng thái** | Đánh giá PRD |
| **Nền tảng** | Ứng dụng Shopify (Nhúng) |
| **Mục tiêu ra mắt** | Q2 2026 |

---

## 2. Tóm tắt Điều hành

Avada Order Editing là một ứng dụng Shopify giúp người bán cho phép khách hàng tự chỉnh sửa đơn hàng sau khi thanh toán -- thay đổi địa chỉ giao hàng, đổi biến thể sản phẩm, điều chỉnh số lượng và hủy đơn hàng -- tất cả mà không cần liên hệ bộ phận hỗ trợ. Ứng dụng cũng cung cấp cho người bán giao diện quản trị mạnh mẽ để chỉnh sửa phía nhân viên, quy tắc chỉnh sửa có thể cấu hình và phân tích về hoạt động chỉnh sửa cũng như tác động doanh thu. Bằng cách nhắm vào phân khúc SMB chưa được phục vụ đầy đủ với bộ tính năng toàn diện ở mức giá $9.99-$29.99/tháng (trong khi đối thủ thu phí $39-$599/tháng), Avada Order Editing nhắm mục tiêu chiếm thị phần đáng kể trong danh mục với ~1.32 triệu cửa hàng Shopify tiềm năng. Ứng dụng được dự kiến đạt ~$2.5 triệu ARR vào Năm thứ 3.

---

## 3. Phát biểu Vấn đề

Shopify không cho phép khách hàng tự chỉnh sửa đơn hàng của mình. Sau khi thanh toán hoàn tất, khách hàng phải liên hệ đội ngũ hỗ trợ của người bán cho bất kỳ thay đổi nào -- thậm chí chỉ là một lỗi đánh máy trong địa chỉ giao hàng. Điều này tạo ra gánh nặng vận hành khổng lồ và ma sát với khách hàng.

### Vấn đề qua Số liệu

- **30%** người mua sắm mắc ít nhất một lỗi khi thanh toán
- **60%** vé hỗ trợ liên quan đến việc chỉnh sửa đơn hàng
- Mỗi lần chỉnh sửa tốn **$8-$15** và mất 5-15 phút để giải quyết
- **69%** khách hàng thích tự phục vụ
- **20-25%** trả hàng trong thương mại điện tử là do lỗi khách hàng, không phải vấn đề sản phẩm

### Tiếng nói Người bán

> "Tôi dành một giờ mỗi ngày chỉ để thay đổi địa chỉ và đổi kích cỡ."
> -- Người bán SMB (Cộng đồng Shopify)

> "Đội ngũ của chúng tôi sắp bỏ phiếu chuyển sang nền tảng khác vì vấn đề này."
> -- Người bán giao hàng nội địa (Cộng đồng Shopify)

> "Tôi mất một khoản tiền lớn vì nó quyết định xóa thuế khỏi đơn hàng đã chỉnh sửa."
> -- Người dùng Cleverific (Đánh giá App Store)

> "KHÔNG CÀI ĐẶT -- các nhà phát triển đã bỏ rơi ứng dụng này."
> -- Người dùng Cleverific (Đánh giá App Store)

> "Điều này sau đó đã nhân đôi đơn hàng của khách hàng và tính phí họ lần nữa!"
> -- Người dùng Editify (Đánh giá App Store)

### Tại sao Các giải pháp Hiện tại Chưa đủ

1. **Quá đắt**: Các ứng dụng chất lượng bắt đầu từ $39/tháng, khiến người bán SMB không đủ khả năng chi trả
2. **Lỗi và không đáng tin cậy**: Tính phí trùng lặp, tính thuế sai, mất tồn kho
3. **Ứng dụng bị bỏ rơi**: Một số ứng dụng phổ biến đã bị nhà phát triển bỏ rơi
4. **Thiếu tính năng**: Không có ứng dụng nào hỗ trợ tốt việc chỉnh sửa giao hàng nội địa, B2B hoặc đơn hàng đăng ký
5. **Hỗ trợ kém**: Người bán báo cáo phải chờ hàng ngày hoặc hàng tuần để được phản hồi

---

## 4. Đề xuất Giá trị Độc nhất

**"Ứng dụng chỉnh sửa đơn hàng giá cả phải chăng nhất, đáng tin cậy nhất trên Shopify -- được xây dựng cho người bán không đủ khả năng chi trả $99/tháng nhưng không chấp nhận đánh đổi chất lượng."**

### Tại sao Người bán Chọn Avada

| Điểm khác biệt | Avada | Đối thủ |
|----------------|-------|-------------|
| **Giá** | $9.99-$29.99/tháng cho các tính năng cốt lõi | $39-$599/tháng |
| **Gói miễn phí** | 50 lần chỉnh sửa/tháng mãi mãi | Không có hoặc dùng thử 7 ngày |
| **Độ tin cậy** | Xây dựng trên Firebase với giao dịch nguyên tử | Báo cáo về tính phí trùng lặp, lỗi thuế |
| **Tự phục vụ khách hàng** | Tự phục vụ đầy đủ từ Ngày 1 | Thường chỉ dành cho quản trị hoặc hạn chế |
| **Chỉnh sửa giao hàng nội địa** | Lộ trình P2, tính năng độc nhất | Không có |
| **Gợi ý chỉnh sửa AI** | Lộ trình P2, tính năng độc nhất | Không có |
| **Giữ chân khi hủy đơn** | Lộ trình P1 với ưu đãi | Cơ bản hoặc không có |
| **Hỗ trợ** | Đội ngũ hỗ trợ uy tín của Avada | Bị bỏ rơi hoặc chậm |
| **Hệ sinh thái Avada** | Tích hợp với bộ ứng dụng của Avada | Độc lập |

---

## 5. Đối tượng Mục tiêu

### Phân khúc Thị trường

| Phân khúc | Số cửa hàng | Ngân sách | Nỗi đau Hiện tại | Ưu tiên |
|---------|------------|--------|--------------|----------|
| **SMB** (1-10 nhân viên) | ~1 triệu cửa hàng | $10-$50/tháng | Không đủ ngân sách cho ứng dụng $99/tháng; xử lý chỉnh sửa thủ công | Chính |
| **Thị trường Trung bình** (11-100 nhân viên) | ~150K cửa hàng | $50-$200/tháng | Cần tự động hóa + phân tích; ứng dụng hiện tại thiếu tính năng | Phụ |
| **Shopify Plus** (100+ nhân viên) | ~50K cửa hàng | $200-$500/tháng | Cần B2B, đăng ký, chỉnh sửa hàng loạt, truy cập API | Thứ ba |

### Chân dung Khách hàng

#### Sarah -- Chủ cửa hàng SMB
- **Cửa hàng**: Cửa hàng thời trang, 50-200 đơn hàng/tháng
- **Đội ngũ**: Một mình hoặc 1-2 nhân viên bán thời gian
- **Nỗi đau**: Dành hơn 1 giờ mỗi ngày để xử lý thay đổi địa chỉ và đổi kích cỡ qua email
- **Ngân sách**: Tối đa $10-$20/tháng
- **Mục tiêu**: Cho phép khách hàng tự sửa lỗi mà không cần liên hệ cô ấy
- **Trình độ công nghệ**: Thấp-trung bình; cần cài đặt đơn giản, dùng ngay
- **Chỉ số thành công**: Giảm vé hỗ trợ

#### Mike -- Quản lý Vận hành Thị trường Trung bình
- **Cửa hàng**: Đồ gia dụng, 500-2,000 đơn hàng/tháng
- **Đội ngũ**: Đội hỗ trợ 5-10 người
- **Nỗi đau**: Đội hỗ trợ quá tải với các yêu cầu chỉnh sửa lặp đi lặp lại; không có khả năng nhìn thấy các mẫu chỉnh sửa
- **Ngân sách**: $30-$50/tháng
- **Mục tiêu**: Tự động hóa chỉnh sửa, giảm tải hỗ trợ, hiểu sản phẩm nào được chỉnh sửa nhiều nhất
- **Trình độ công nghệ**: Trung bình-cao; thoải mái với tích hợp
- **Chỉ số thành công**: Giảm chi phí hỗ trợ + phân tích chỉnh sửa

#### Jessica -- Người bán Shopify Plus
- **Cửa hàng**: Doanh nghiệp đa thương hiệu, 5,000+ đơn hàng/tháng
- **Đội ngũ**: Đội vận hành + phát triển chuyên trách
- **Nỗi đau**: Cần chỉnh sửa đơn hàng nháp B2B, sửa đổi đăng ký, thao tác hàng loạt
- **Ngân sách**: $100-$500/tháng
- **Mục tiêu**: Tự động hóa hoàn toàn với Shopify Flow, quy trình tùy chỉnh, truy cập API
- **Trình độ công nghệ**: Cao; có nhà phát triển trong đội
- **Chỉ số thành công**: Hiệu quả vận hành + doanh thu từ bán thêm

#### Alex -- Người bán Mới Quan tâm Ngân sách
- **Cửa hàng**: Mới mở, 10-50 đơn hàng/tháng
- **Đội ngũ**: Một mình
- **Nỗi đau**: Chỉnh sửa đơn hàng thủ công trong quản trị Shopify rất tẻ nhạt; không thể biện minh cho ứng dụng trả phí
- **Ngân sách**: $0 (Gói miễn phí)
- **Mục tiêu**: Chỉnh sửa tự phục vụ cơ bản để trông chuyên nghiệp
- **Trình độ công nghệ**: Thấp; cần cài đặt không cần cấu hình
- **Chỉ số thành công**: Sự hài lòng của khách hàng

---

## 6. Câu chuyện Người dùng

### Câu chuyện Người dùng MVP (P0)

#### Tự phục vụ Khách hàng

| ID | Câu chuyện | Ưu tiên | Chân dung |
|----|-------|----------|---------|
| US-01 | Là **khách hàng**, tôi muốn chỉnh sửa địa chỉ giao hàng sau khi đặt hàng, để gói hàng của tôi đến đúng địa điểm. | P0 | Tất cả |
| US-02 | Là **khách hàng**, tôi muốn đổi biến thể sản phẩm (kích cỡ, màu sắc) trên đơn hàng, để tôi nhận được đúng sản phẩm mà không cần liên hệ hỗ trợ. | P0 | Tất cả |
| US-03 | Là **khách hàng**, tôi muốn thay đổi số lượng sản phẩm trong đơn hàng, để tôi có thể thêm hoặc bớt sản phẩm trước khi giao hàng. | P0 | Tất cả |
| US-04 | Là **khách hàng**, tôi muốn hủy đơn hàng trong khung thời gian cho phép, để tôi có thể được hoàn tiền mà không cần chờ hỗ trợ. | P0 | Tất cả |
| US-05 | Là **khách hàng**, tôi muốn xem tóm tắt rõ ràng về các thay đổi và chênh lệch giá trước khi xác nhận, để tôi không bị bất ngờ bởi các khoản phí. | P0 | Tất cả |
| US-06 | Là **khách hàng**, tôi muốn truy cập chỉnh sửa đơn hàng từ Trang Trạng thái Đơn hàng, để tôi có thể thực hiện thay đổi dễ dàng sau khi thanh toán. | P0 | Tất cả |
| US-07 | Là **khách hàng**, tôi muốn truy cập chỉnh sửa đơn hàng từ Trang Cảm ơn, để tôi có thể sửa lỗi ngay sau khi đặt hàng. | P0 | Tất cả |

#### Quản trị Người bán

| ID | Câu chuyện | Ưu tiên | Chân dung |
|----|-------|----------|---------|
| US-08 | Là **người bán**, tôi muốn cấu hình những thay đổi nào khách hàng có thể thực hiện (địa chỉ, sản phẩm, số lượng, hủy), để tôi duy trì quyền kiểm soát đơn hàng. | P0 | Sarah, Mike |
| US-09 | Là **người bán**, tôi muốn đặt khung thời gian cho phép khách hàng chỉnh sửa sau khi đặt hàng, để chỉnh sửa không ảnh hưởng đến việc hoàn thành đơn. | P0 | Sarah, Mike |
| US-10 | Là **người bán**, tôi muốn chỉnh sửa tự động xử lý hoàn tiền và phụ thu, để tôi không phải xử lý thanh toán thủ công. | P0 | Tất cả |
| US-11 | Là **người bán**, tôi muốn tồn kho tự động được bổ sung khi sản phẩm bị xóa hoặc đổi, để mức tồn kho của tôi luôn chính xác. | P0 | Tất cả |
| US-12 | Là **người bán**, tôi muốn khách hàng và nhân viên nhận thông báo email khi có chỉnh sửa, để mọi người đều được cập nhật. | P0 | Tất cả |
| US-13 | Là **người bán**, tôi muốn tự chỉnh sửa đơn hàng từ bảng quản trị, để tôi có thể xử lý nhanh các yêu cầu qua điện thoại/email. | P0 | Tất cả |
| US-14 | Là **người bán**, tôi muốn bảng điều khiển hiển thị hoạt động chỉnh sửa, để tôi có thể thấy ứng dụng hoạt động như thế nào. | P0 | Mike |

### Câu chuyện Người dùng MMP (P1)

| ID | Câu chuyện | Ưu tiên | Chân dung |
|----|-------|----------|---------|
| US-15 | Là **người bán**, tôi muốn xác thực địa chỉ Google cho các chỉnh sửa, để khách hàng không thể nhập địa chỉ không hợp lệ. | P1 | Mike |
| US-16 | Là **người bán**, tôi muốn hiển thị gợi ý sản phẩm trong quá trình chỉnh sửa, để tôi có thể tạo thêm doanh thu (bán thêm sau mua hàng). | P1 | Mike, Jessica |
| US-17 | Là **người bán**, tôi muốn cung cấp tín dụng cửa hàng thay vì hoàn tiền mặt, để tôi giữ lại doanh thu. | P1 | Sarah, Mike |
| US-18 | Là **người bán**, tôi muốn tích hợp Shopify Flow, để tôi có thể xây dựng tự động hóa tùy chỉnh xung quanh chỉnh sửa đơn hàng. | P1 | Jessica |
| US-19 | Là **người bán**, tôi muốn bảng phân tích với biểu đồ, để tôi có thể thấy xu hướng chỉnh sửa, sản phẩm được chỉnh sửa nhiều nhất và tác động doanh thu. | P1 | Mike, Jessica |
| US-20 | Là **khách hàng**, tôi muốn nhận ưu đãi giữ chân khi tôi cố hủy đơn, để tôi có thể giữ đơn hàng với mức giảm giá. | P1 | Tất cả |
| US-21 | Là **người bán**, tôi muốn hỗ trợ đa ngôn ngữ, để khách hàng quốc tế có thể tự chỉnh sửa bằng ngôn ngữ của họ. | P1 | Mike, Jessica |

### Câu chuyện Người dùng Tăng trưởng (P2)

| ID | Câu chuyện | Ưu tiên | Chân dung |
|----|-------|----------|---------|
| US-22 | Là **người bán**, tôi muốn gợi ý chỉnh sửa được hỗ trợ bởi AI dựa trên mẫu đơn hàng, để các chỉnh sửa phổ biến được điền sẵn. | P2 | Jessica |
| US-23 | Là **người bán**, tôi muốn chỉnh sửa đơn hàng đăng ký, để người đăng ký có thể sửa đổi các đợt giao hàng sắp tới. | P2 | Jessica |
| US-24 | Là **người bán**, tôi muốn chỉnh sửa hàng loạt nhiều đơn hàng cùng lúc từ quản trị, để đội ngũ có thể xử lý thay đổi theo lô hiệu quả. | P2 | Jessica |
| US-25 | Là **người bán**, tôi muốn chỉnh sửa đơn hàng giao nội địa và lấy tại chỗ (ngày, khung giờ, địa chỉ), để khách hàng địa phương có sự linh hoạt. | P2 | Mike |
| US-26 | Là **người bán**, tôi muốn chỉnh sửa đơn hàng B2B/bán sỉ với giá tùy chỉnh, để khách hàng bán sỉ có thể sửa đổi đơn hàng nháp. | P2 | Jessica |

---

## 7. Đặc tả Tính năng

### P0 -- Tính năng MVP (Ra mắt)

| Tính năng | Mô tả | Khách hàng | Người bán | Ghi chú |
|---------|-------------|:--------:|:--------:|-------|
| **Chỉnh sửa Địa chỉ** | Chỉnh sửa địa chỉ giao hàng trên đơn hàng chưa hoàn thành | Có | Có | Xác thực định dạng quốc gia/mã bưu điện |
| **Đổi Sản phẩm** | Đổi biến thể (kích cỡ, màu sắc, v.v.) trong cùng một sản phẩm | Có | Có | Tính lại chênh lệch giá |
| **Thay đổi Số lượng** | Tăng hoặc giảm số lượng sản phẩm | Có | Có | Tuân thủ tồn kho có sẵn |
| **Hủy Đơn hàng** | Hủy toàn bộ đơn hàng với hoàn tiền tự động | Có | Có | Trong khung thời gian |
| **Xóa Sản phẩm** | Xóa từng dòng sản phẩm riêng lẻ | Có | Có | Tự động hoàn tiền sản phẩm đã xóa |
| **Tự động Hoàn tiền/Tính phí** | Tự động xử lý chênh lệch giá | -- | Tự động | Sử dụng Shopify Payment API |
| **Bổ sung Tồn kho** | Bổ sung tồn kho cho sản phẩm đã xóa/đổi | -- | Tự động | Cập nhật tồn kho thời gian thực |
| **Kiểm soát Khung Thời gian** | Khung thời gian chỉnh sửa có thể cấu hình (ví dụ: 30 phút, 1 giờ, cho đến khi hoàn thành) | -- | Cấu hình | Cài đặt theo từng cửa hàng |
| **Quy tắc Chỉnh sửa** | Cấu hình loại chỉnh sửa nào được phép | -- | Cấu hình | Toàn cục và theo bộ sưu tập |
| **Widget Trang Trạng thái Đơn hàng** | Nút "Chỉnh sửa Đơn hàng" trên trang trạng thái đơn hàng | Có | -- | Theme App Extension |
| **Widget Trang Cảm ơn** | Banner "Chỉnh sửa Đơn hàng" trên trang sau thanh toán | Có | -- | Theme App Extension |
| **Trang Chỉnh sửa Đơn hàng** | Giao diện chỉnh sửa đầy đủ cho khách hàng | Có | -- | Tương thích, có thương hiệu |
| **Xác nhận Chỉnh sửa** | Tóm tắt thay đổi với chênh lệch giá trước khi xác nhận | Có | -- | Phân tích chi phí rõ ràng |
| **Thông báo Email** | Thông báo cho khách hàng và người bán khi có chỉnh sửa | Có | Có | Mẫu có thể tùy chỉnh |
| **Chỉnh sửa Đơn hàng Quản trị** | Chỉnh sửa phía nhân viên trong quản trị Shopify | -- | Có | Giao diện Polaris nhúng |
| **Bảng điều khiển** | Tổng quan về chỉnh sửa, tiết kiệm | -- | Có | Số liệu cơ bản |
| **Tương thích Di động** | Tất cả màn hình dành cho khách hàng hoạt động trên di động | Có | -- | Thiết kế ưu tiên di động |

### P1 -- Tính năng MMP (Tháng 2-3)

| Tính năng | Mô tả | Ghi chú |
|---------|-------------|-------|
| **Xác thực Địa chỉ Google** | Xác thực và gợi ý địa chỉ qua Google API | Giảm giao hàng thất bại |
| **Bán thêm Sau Mua hàng** | Gợi ý sản phẩm trong quá trình chỉnh sửa | Theo dõi phân bổ doanh thu |
| **Hoàn tiền Tín dụng Cửa hàng** | Cung cấp tín dụng cửa hàng thay vì hoàn tiền mặt | Giữ lại doanh thu |
| **Tích hợp Shopify Flow** | Kích hoạt và hành động cho tự động hóa Flow | Kích hoạt "Đơn hàng Đã chỉnh sửa", "Đơn hàng Đã hủy" |
| **Bảng Phân tích** | Biểu đồ: chỉnh sửa theo thời gian, sản phẩm được chỉnh sửa nhiều nhất, doanh thu được tiết kiệm | Hỗ trợ BigQuery |
| **Luồng Giữ chân Khi Hủy** | Hiển thị ưu đãi giữ chân (giảm giá, tín dụng cửa hàng) trước khi xác nhận hủy | Giảm tỷ lệ hủy đơn |
| **Đa ngôn ngữ** | Dịch giao diện dành cho khách hàng | Hỗ trợ 10 ngôn ngữ hàng đầu |
| **Thương hiệu Tùy chỉnh** | Tùy chỉnh màu sắc, logo trên trang chỉnh sửa | Phù hợp thương hiệu người bán |

### P2 -- Tính năng Tăng trưởng (Tháng 4-6)

| Tính năng | Mô tả | Ghi chú |
|---------|-------------|-------|
| **Gợi ý Chỉnh sửa AI** | Điền sẵn các chỉnh sửa phổ biến dựa trên mẫu | Điểm khác biệt đại dương xanh |
| **Chỉnh sửa Đăng ký** | Chỉnh sửa các đợt giao hàng đăng ký sắp tới | Tích hợp với ứng dụng đăng ký |
| **Chỉnh sửa B2B/Bán sỉ** | Chỉnh sửa đơn hàng nháp với giá tùy chỉnh | Tính năng Shopify Plus |
| **Chỉnh sửa Hàng loạt Nhân viên** | Chỉnh sửa hàng loạt nhiều đơn hàng cùng lúc | Điểm khác biệt đại dương xanh |
| **Chỉnh sửa Giao hàng Nội địa** | Chỉnh sửa ngày giao, khung giờ, địa chỉ cho đơn hàng nội địa | Điểm khác biệt đại dương xanh |
| **Đa tiền tệ** | Xử lý chỉnh sửa trên nhiều loại tiền | Người bán quốc tế |
| **Tích hợp POS** | Chỉnh sửa đơn hàng POS | Người bán đa kênh |
| **Bán chéo Trong Chỉnh sửa** | Hiển thị sản phẩm bổ sung với phân bổ doanh thu | Tạo doanh thu |
| **Chỉnh sửa Đặt trước/Đặt hàng chờ** | Chỉnh sửa đơn đặt trước khi hoàn thành | Điểm khác biệt thị trường ngách |

---

## 8. Chiến lược Giá

### Phân tích Gói

| Gói | Giá | Giới hạn Chỉnh sửa | Chân dung Mục tiêu | Tính năng Chính |
|------|-------|-----------|----------------|--------------|
| **Miễn phí** | $0/tháng | 50 chỉnh sửa/tháng | Alex (Người bán mới) | Tự phục vụ khách hàng (địa chỉ, sản phẩm, số lượng, hủy), Widget Trang Trạng thái Đơn hàng, thông báo email cơ bản |
| **Starter** | $9.99/tháng | 200 chỉnh sửa/tháng | Sarah (SMB) | Tất cả trong Miễn phí + Widget Trang Cảm ơn, khung thời gian tùy chỉnh, quy tắc chỉnh sửa theo bộ sưu tập, tùy chỉnh thương hiệu |
| **Growth** | $19.99/tháng | Không giới hạn | Sarah/Mike | Tất cả trong Starter + chỉnh sửa không giới hạn, bảng phân tích, xác thực địa chỉ Google, bán thêm sau mua hàng, hoàn tiền tín dụng cửa hàng, đa ngôn ngữ |
| **Pro** | $29.99/tháng | Không giới hạn | Mike (Thị trường Trung bình) | Tất cả trong Growth + tích hợp Shopify Flow, luồng giữ chân khi hủy, hỗ trợ email ưu tiên, phân tích nâng cao |
| **Business** | $49.99/tháng | Không giới hạn | Mike/Jessica | Tất cả trong Pro + tích hợp 3PL, chỉnh sửa hàng loạt nhân viên, quy tắc tự động hóa nâng cao, chỉnh sửa giao hàng nội địa, hướng dẫn sử dụng chuyên biệt |
| **Enterprise** | $99.99/tháng | Không giới hạn | Jessica (Plus) | Tất cả trong Business + chỉnh sửa B2B, chỉnh sửa đăng ký, truy cập API, thông báo Slack, tích hợp tùy chỉnh, hỗ trợ SLA |

### Lý do Định giá

- **Gói miễn phí** tạo kênh thu hút và xây dựng đánh giá (50 chỉnh sửa đủ cho ~50 đơn hàng/tháng)
- **Starter $9.99** lấp khoảng trống nơi KHÔNG có ứng dụng chất lượng nào dưới $39/tháng
- **Growth $19.99** là điểm ngọt cho người bán SMB cần chỉnh sửa không giới hạn
- **Pro $29.99** thu hút người bán thị trường trung bình muốn tự động hóa
- **$49.99-$99.99** cạnh tranh với ứng dụng cao cấp ở mức giá rẻ hơn nhiều (phạm vi đối thủ $99-$599)

### Mô hình Doanh thu

- Thanh toán dựa trên sử dụng qua Shopify App Billing API
- Dùng thử miễn phí 30 ngày cho tất cả gói trả phí
- Giảm giá năm: 20% (miễn phí 2 tháng)

---

## 9. Chỉ số Thành công (KPI)

### Ra mắt MVP (Tháng 1-2)

| Chỉ số | Mục tiêu | Đo lường |
|--------|--------|-------------|
| Lượt cài đặt ứng dụng | 500+ | Bảng điều khiển Đối tác Shopify |
| Chuyển đổi miễn phí sang trả phí | 8-12% | Phân tích nội bộ |
| Xếp hạng trung bình | 4.8+ sao | Shopify App Store |
| Thời gian cài đặt trung vị | < 5 phút | Theo dõi kênh onboarding |
| Tỷ lệ tự phục vụ khách hàng | 40%+ chỉnh sửa do khách hàng khởi tạo | Phân tích ứng dụng |
| Tỷ lệ chỉnh sửa thành công | 95%+ | Không có chỉnh sửa thất bại/bị kẹt |
| Thời gian phản hồi webhook | < 2 giây (p95) | Giám sát đám mây |
| Không có lỗi nghiêm trọng | 0 tính phí trùng lặp, 0 lỗi thuế | Giám sát lỗi |

### Giai đoạn MMP (Tháng 3-6)

| Chỉ số | Mục tiêu | Đo lường |
|--------|--------|-------------|
| Tổng lượt cài đặt | 5,000+ | Bảng điều khiển Đối tác Shopify |
| Người bán trả phí | 500+ | Hồ sơ thanh toán |
| Doanh thu định kỳ hàng tháng | $5K-$10K | Báo cáo tài chính |
| Tỷ lệ rời bỏ | < 5% hàng tháng | Phân tích nhóm |
| Giảm vé hỗ trợ (người bán báo cáo) | 40-60% | Khảo sát + phân tích |
| Doanh thu bán thêm được tạo ra | $50K+ trên tất cả người bán | Phân bổ doanh thu |
| Tỷ lệ giữ chân khi hủy | 15-25% đơn hủy được giữ lại | Phân tích luồng giữ chân |
| Đánh giá App Store | 50+ đánh giá | Shopify App Store |

### Giai đoạn Tăng trưởng (Tháng 6-12)

| Chỉ số | Mục tiêu | Đo lường |
|--------|--------|-------------|
| Tổng lượt cài đặt | 20,000+ | Bảng điều khiển Đối tác Shopify |
| Người bán trả phí | 2,400+ | Hồ sơ thanh toán |
| ARR | $500K-$800K | Báo cáo tài chính |
| Điểm Net Promoter | 50+ | Khảo sát trong ứng dụng |
| Thị phần (theo đánh giá) | Top 5 trong danh mục | Theo dõi App Store |
| Doanh thu trung bình mỗi người bán | $25+/tháng | Doanh thu / người bán trả phí |

---

## 10. Yêu cầu Kỹ thuật

### Phạm vi API Shopify

| Phạm vi | Mục đích |
|-------|---------|
| `read_orders` / `write_orders` | Đọc và chỉnh sửa chi tiết đơn hàng |
| `read_products` / `write_products` | Đọc thông tin sản phẩm/biến thể, quản lý tồn kho |
| `read_inventory` / `write_inventory` | Bổ sung tồn kho khi chỉnh sửa |
| `read_customers` | Đọc thông tin khách hàng cho thông báo |
| `read_shipping` / `write_shipping` | Quản lý thay đổi địa chỉ giao hàng |
| `read_fulfillments` | Kiểm tra trạng thái hoàn thành trước khi cho phép chỉnh sửa |
| `read_locales` | Hỗ trợ đa ngôn ngữ |

### Webhook Cần thiết

| Webhook | Mục đích |
|---------|---------|
| `orders/create` | Theo dõi đơn hàng mới đủ điều kiện chỉnh sửa |
| `orders/updated` | Đồng bộ thay đổi trạng thái đơn hàng |
| `orders/cancelled` | Xử lý hủy đơn từ bên ngoài |
| `orders/fulfilled` | Khóa chỉnh sửa trên đơn hàng đã hoàn thành |
| `orders/partially_fulfilled` | Khóa chỉnh sửa trên dòng sản phẩm đã hoàn thành |
| `app/uninstalled` | Dọn dẹp dữ liệu người bán |
| `shop/update` | Đồng bộ cài đặt cửa hàng |

### API Shopify Được sử dụng

| API | Mục đích |
|-----|---------|
| **GraphQL Admin API** | API chính cho tất cả thao tác đơn hàng (`orderEditBegin`, `orderEditAddVariant`, `orderEditSetQuantity`, `orderEditCommit`) |
| **REST Admin API** | Dự phòng cho các thao tác cụ thể |
| **App Bridge** | Trải nghiệm quản trị nhúng, gọi API trực tiếp |
| **Theme App Extensions** | Widget Trang Trạng thái Đơn hàng và Trang Cảm ơn |
| **Scripttag** | Dự phòng cho cửa hàng không hỗ trợ app blocks |
| **Shopify App Billing API** | Quản lý đăng ký, phí sử dụng |

### Yêu cầu Hiệu suất

| Yêu cầu | Mục tiêu |
|-------------|--------|
| Thời gian tải trang chỉnh sửa | < 2 giây |
| Phản hồi gửi chỉnh sửa | < 3 giây |
| Xử lý webhook | < 5 giây |
| Khả dụng API | 99.9% uptime |
| Chỉnh sửa đồng thời mỗi cửa hàng | Hỗ trợ 10+ đồng thời |
| Lưu trữ dữ liệu | 12 tháng lịch sử chỉnh sửa |

### Hạ tầng

- **Backend**: Node.js trên Firebase Functions (Gen 2)
- **Cơ sở dữ liệu**: Firestore (đa thuê bao, phân vùng theo `shopId`)
- **Frontend**: React + Polaris v12+ (quản trị nhúng), Preact (widget cửa hàng)
- **Phân tích**: BigQuery cho báo cáo tổng hợp
- **CDN**: Firebase Hosting cho tài sản tĩnh
- **Giám sát**: Cloud Logging + Cloud Monitoring + Error Reporting

---

## 11. Định vị Cạnh tranh

### so với OrderEditing.com ($99-$599/tháng)

| Khía cạnh | OrderEditing.com | Avada |
|-----------|-----------------|-------|
| Giá | $99-$599/tháng | $9.99-$99.99/tháng |
| Gói miễn phí | Không | Có (50 chỉnh sửa) |
| Tính năng | Toàn diện nhất | Cốt lõi tương đương, đang phát triển |
| **Góc tiếp cận** | **Rẻ hơn 70-85%** cho tính năng tương đương | |

### so với AE: Order Editing ($39-$259/tháng)

| Khía cạnh | AE | Avada |
|-----------|-----|-------|
| Giá | $39-$259/tháng | $9.99-$99.99/tháng |
| Gói miễn phí | Không | Có |
| Đánh giá | 219 (5.0 sao) | Người mới gia nhập |
| **Góc tiếp cận** | **Giá khởi điểm rẻ hơn 75%**, gói miễn phí để thu hút | |

### so với Cleverific ($49-$299/tháng)

| Khía cạnh | Cleverific | Avada |
|-----------|-----------|-------|
| Giá | $49-$299/tháng | $9.99-$99.99/tháng |
| Xếp hạng | 4.6 sao (đang giảm) | Mục tiêu 4.8+ |
| Vấn đề | Lỗi thuế, cảm giác bị bỏ rơi | Xây dựng mới, không có di sản cũ |
| **Góc tiếp cận** | **Độ tin cậy + công nghệ hiện đại**, người bán đang rời đi tích cực | |

### so với Orderify ($4.99-$99.99/tháng)

| Khía cạnh | Orderify | Avada |
|-----------|---------|-------|
| Giá | $4.99-$99.99/tháng | $0-$99.99/tháng |
| Tính năng | Chỉ chỉnh sửa cơ bản | Toàn diện |
| Tự phục vụ | Hạn chế | Tự phục vụ khách hàng đầy đủ |
| **Góc tiếp cận** | **Nhiều tính năng hơn** ở mức giá tương tự, tự phục vụ khách hàng | |

### Tóm tắt Định vị

```
                    Giá Cao
                       |
          OrderEditing ---- AE: Order Editing
                       |
              Cleverific
                       |
        ---------------+--------------- Nhiều Tính năng
                       |
              Revize   |
                       |
          Orderify     |  *** Avada Order Editing ***
                       |  (Giá trị tốt nhất: nhiều tính năng, giá thấp)
                    Giá Thấp
```

---

## 12. Rủi ro & Biện pháp Giảm thiểu

| # | Rủi ro | Khả năng | Tác động | Biện pháp Giảm thiểu |
|---|------|-----------|--------|------------|
| 1 | **Shopify thêm tính năng tự phục vụ chỉnh sửa đơn hàng gốc** | Trung bình | Nghiêm trọng | Tập trung vào tính năng nâng cao (bán thêm, giữ chân, phân tích) mà Shopify khó xây dựng gốc. Tạo chi phí chuyển đổi qua tích hợp. |
| 2 | **Đối thủ hạ giá** để đáp trả | Trung bình | Cao | Duy trì tốc độ phát triển tính năng. Gói miễn phí tạo lợi thế phòng thủ. Hệ sinh thái Avada tạo sự gắn bó. |
| 3 | **Lỗi tính phí trùng lặp / thuế** (rủi ro danh tiếng) | Thấp | Nghiêm trọng | Giao dịch nguyên tử. Kiểm thử kỹ lưỡng. Khóa idempotency trên tất cả thao tác thanh toán. Triển khai theo giai đoạn. |
| 4 | **Thay đổi API Shopify** (thay đổi phá vỡ API chỉnh sửa đơn hàng) | Thấp | Cao | Ghim phiên bản API. Giám sát changelog Shopify. Duy trì lớp trừu tượng trên API Shopify. |
| 5 | **Chuyển đổi miễn phí sang trả phí thấp** | Trung bình | Trung bình | Tối ưu giới hạn gói miễn phí (50 chỉnh sửa đủ để chứng minh giá trị nhưng buộc nâng cấp). Lời nhắc nâng cấp trong ứng dụng ở mức sử dụng 80%. |
| 6 | **Lượng hỗ trợ** từ người dùng miễn phí | Cao | Trung bình | Onboarding tự phục vụ. Trung tâm trợ giúp trong ứng dụng. Chatbot AI cho câu hỏi phổ biến. Diễn đàn cộng đồng. |
| 7 | **Hiệu suất ở quy mô lớn** (cửa hàng lượng đơn cao) | Thấp | Cao | Firebase tự động mở rộng. Giới hạn tốc độ theo cửa hàng. Xử lý nền dựa trên hàng đợi. Kiểm thử tải trước khi ra mắt. |
| 8 | **Đánh giá tiêu cực từ lỗi ban đầu** | Trung bình | Cao | Beta riêng với 20-50 người bán trước. SLA phản hồi lỗi nhanh (< 4 giờ). Tiếp cận chủ động với người dùng đầu tiên. |
| 9 | **Tiếp nhận chậm** trong thị trường đông đúc | Trung bình | Trung bình | Chiến lược ASO tích cực. Gói miễn phí cho tăng trưởng tự nhiên. Quảng bá chéo Avada. Tiếp thị nội dung. |
| 10 | **Quyền riêng tư dữ liệu / GDPR** | Thấp | Cao | Thu thập dữ liệu tối thiểu. Chính sách lưu trữ dữ liệu. Xóa dữ liệu người bán khi gỡ cài đặt. Chính sách bảo mật. |

---

## 13. Giai đoạn & Lịch trình

### Giai đoạn 1: MVP (Tuần 1-8)

**Mục tiêu**: Ra mắt với tính năng tự phục vụ chỉnh sửa đơn hàng cốt lõi cho khách hàng và quản trị cơ bản cho người bán.

| Tuần | Cột mốc | Sản phẩm bàn giao |
|------|-----------|--------------|
| 1-2 | **Nền tảng** | Thiết lập dự án, scaffolding ứng dụng Shopify, schema Firestore, xác thực/thanh toán, xử lý webhook |
| 3-4 | **Engine Chỉnh sửa Cốt lõi** | Tích hợp API chỉnh sửa đơn hàng (begin/commit), chỉnh sửa địa chỉ, đổi sản phẩm, thay đổi số lượng, hủy, tự động hoàn tiền/tính phí, bổ sung tồn kho |
| 5-6 | **Giao diện Khách hàng** | Trang Chỉnh sửa Đơn hàng (cửa hàng), widget Trang Trạng thái Đơn hàng, widget Trang Cảm ơn, luồng xác nhận chỉnh sửa, thông báo email |
| 7 | **Giao diện Quản trị** | Bảng điều khiển, cấu hình quy tắc chỉnh sửa, chỉnh sửa đơn hàng quản trị, trang cài đặt |
| 8 | **QA + Ra mắt** | Kiểm thử end-to-end, beta riêng (20-50 cửa hàng), sửa lỗi, đăng App Store, ra mắt công khai |

### Giai đoạn 2: MMP (Tháng 3-4)

**Mục tiêu**: Tạo sự khác biệt với các tính năng tạo doanh thu và tự động hóa.

| Tháng | Cột mốc | Sản phẩm bàn giao |
|-------|-----------|--------------|
| 3 | **Tính năng Doanh thu** | Bán thêm sau mua hàng trong quá trình chỉnh sửa, tùy chọn hoàn tiền tín dụng cửa hàng, luồng giữ chân khi hủy |
| 3 | **Độ tin cậy** | Xác thực địa chỉ Google, quy tắc chỉnh sửa nâng cao (theo sản phẩm, theo bộ sưu tập) |
| 4 | **Tự động hóa** | Tích hợp Shopify Flow (kích hoạt + hành động), mẫu email nâng cao |
| 4 | **Phân tích** | Bảng phân tích với BigQuery, xu hướng chỉnh sửa, sản phẩm được chỉnh sửa nhiều nhất, tác động doanh thu |
| 4 | **Quốc tế hóa** | Hỗ trợ đa ngôn ngữ (10 ngôn ngữ hàng đầu), thương hiệu tùy chỉnh |

### Giai đoạn 3: Tăng trưởng (Tháng 5-12)

**Mục tiêu**: Mở rộng sang phân khúc cao cấp và tính năng đại dương xanh.

| Tháng | Cột mốc | Sản phẩm bàn giao |
|-------|-----------|--------------|
| 5-6 | **Tính năng AI** | Gợi ý chỉnh sửa AI, gợi ý sản phẩm thông minh |
| 5-6 | **Giao hàng Nội địa** | Chỉnh sửa ngày/giờ/địa chỉ giao hàng cho đơn hàng nội địa |
| 7-8 | **Doanh nghiệp** | Chỉnh sửa B2B/bán sỉ, chỉnh sửa đơn hàng đăng ký, chỉnh sửa hàng loạt nhân viên |
| 9-10 | **Hệ sinh thái** | Đa tiền tệ, tích hợp POS, tích hợp 3PL |
| 11-12 | **Mở rộng** | Truy cập API cho nhà phát triển, thông báo Slack, tự động hóa nâng cao, tối ưu hiệu suất |

---

## 14. Câu hỏi Mở

| # | Câu hỏi | Người phụ trách | Trạng thái |
|---|----------|-------|--------|
| 1 | Chúng ta có nên hỗ trợ chỉnh sửa đơn hàng đã hoàn thành (chỉ thay đổi địa chỉ) hay nghiêm ngặt chỉ đơn chưa hoàn thành? | Sản phẩm | Mở |
| 2 | Tuổi tối đa của đơn hàng để chỉnh sửa là bao lâu? (Đối thủ cho phép 60 ngày; người bán muốn không giới hạn) | Sản phẩm | Mở |
| 3 | Chỉnh sửa địa chỉ thanh toán có nên được đưa vào MVP không? (Hạn chế API Shopify áp dụng) | Kỹ thuật | Mở |
| 4 | Chúng ta xử lý đơn hàng có giảm giá tùy chỉnh / mã giảm giá trong quá trình chỉnh sửa như thế nào? | Kỹ thuật | Mở |
| 5 | Gói miễn phí có nên yêu cầu thương hiệu Avada ("Được cung cấp bởi Avada") trên trang dành cho khách hàng không? | Sản phẩm | Mở |
| 6 | Chúng ta có cần tính năng dành riêng cho Shopify Plus (mở rộng thanh toán, scripts) trong MVP không? | Sản phẩm | Đã giải quyết: Không, Giai đoạn 3 |
| 7 | Chúng ta nên xây dựng ứng dụng di động cho chỉnh sửa người bán hay dựa vào web tương thích? | Sản phẩm | Đã giải quyết: Web tương thích |
| 8 | Chính sách lưu trữ dữ liệu cho lịch sử chỉnh sửa là gì? (Chi phí lưu trữ so với nhu cầu người bán) | Kỹ thuật | Mở |
| 9 | Chúng ta xử lý hoàn thành một phần như thế nào -- khách hàng có thể chỉnh sửa chỉ các sản phẩm chưa hoàn thành không? | Kỹ thuật | Mở |
| 10 | Chúng ta có nên tích hợp với các ứng dụng hiện có của Avada (Email Marketing, SEO) từ khi ra mắt không? | Sản phẩm | Mở |

---

*Kết thúc PRD -- Avada Order Editing v1.0*
