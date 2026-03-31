# Mô Tả Màn Hình & Wireframe
# Avada Order Editing

Tài liệu này mô tả tất cả các màn hình chính trong ứng dụng, bao gồm cả trải nghiệm giao diện cửa hàng dành cho khách hàng và giao diện quản trị dành cho người bán. Mỗi màn hình bao gồm mô tả bố cục, các thành phần Polaris được sử dụng, các tương tác chính và ghi chú về thích ứng trên thiết bị di động.

---

## Phần 1: Màn Hình Dành Cho Khách Hàng (Giao Diện Cửa Hàng)

---

### Màn Hình 1: Trang Trạng Thái Đơn Hàng -- Widget Chỉnh Sửa Đơn Hàng

**Mục đích**: Cho phép khách hàng bắt đầu chỉnh sửa đơn hàng trực tiếp từ Trang Trạng Thái Đơn Hàng của Shopify (trang theo dõi sau mua hàng). Đây là điểm truy cập chính cho khách hàng tự chỉnh sửa.

**Triển khai**: Theme App Extension (Liquid App Block)

#### Mô Tả Bố Cục

```
+-----------------------------------------------------------+
|  Trang Trạng Thái Đơn Hàng Shopify (gốc)                 |
|                                                           |
|  Đơn hàng #1234 đã xác nhận                              |
|  [Chi tiết đơn hàng gốc Shopify...]                      |
|                                                           |
|  +-------------------------------------------------------+|
|  |  WIDGET CHỈNH SỬA ĐƠN HÀNG (App Block)              ||
|  |                                                       ||
|  |  [Biểu tượng chỉnh sửa] Bạn cần thay đổi đơn hàng?  ||
|  |                                                       ||
|  |  Bạn có thể chỉnh sửa đơn hàng trong 2g 45p tới     ||
|  |                                                       ||
|  |  [============================------] Còn 2g 45p      ||
|  |  (thanh tiến trình hiển thị thời gian còn lại)        ||
|  |                                                       ||
|  |  +-------------------+  +-------------------------+  ||
|  |  | Chỉnh Sửa Đơn    |  | Hủy Đơn Hàng            |  ||
|  |  | (Nút Chính)       |  | (Liên Kết Hủy)          |  ||
|  |  +-------------------+  +-------------------------+  ||
|  |                                                       ||
|  |  Thay đổi cho phép: Địa chỉ, Sản phẩm, Số lượng     ||
|  |  (văn bản nhỏ hiển thị những gì có thể chỉnh sửa)    ||
|  +-------------------------------------------------------+|
|                                                           |
|  [Bản đồ/theo dõi gốc Shopify...]                        |
+-----------------------------------------------------------+
```

#### Các Thành Phần Chính

- **Bộ đếm ngược**: Thanh tiến trình trực quan + văn bản hiển thị thời gian chỉnh sửa còn lại
- **Nút Chỉnh Sửa Đơn Hàng**: Hành động chính, mở Trang Chỉnh Sửa Đơn Hàng
- **Liên kết Hủy Đơn Hàng**: Liên kết hủy, mở quy trình hủy đơn
- **Văn bản thay đổi cho phép**: Hiển thị những gì người bán đã bật
- **Trạng thái hết hạn**: Khi cửa sổ thời gian đóng, widget hiển thị "Cửa sổ chỉnh sửa đã đóng" với kiểu mờ

#### Tương Tác

1. Khách hàng nhấn "Chỉnh Sửa Đơn Hàng" -> chuyển hướng đến Trang Chỉnh Sửa Đơn Hàng (Màn Hình 3)
2. Khách hàng nhấn "Hủy Đơn Hàng" -> chuyển hướng đến Quy Trình Hủy Đơn (Màn Hình 5)
3. Bộ đếm ngược chạy theo thời gian thực; khi hết hạn, các nút bị vô hiệu hóa
4. Nếu đơn hàng đã được thực hiện, widget hiển thị "Đơn hàng này đã được vận chuyển và không thể chỉnh sửa nữa"

#### Thích Ứng Di Động

- Widget chiếm toàn bộ chiều rộng trên di động
- Các nút xếp chồng dọc trên màn hình < 400px
- Thanh tiến trình giữ ngang, văn bản xuống dòng bên dưới

---

### Màn Hình 2: Trang Cảm Ơn -- Banner Chỉnh Sửa Đơn Hàng

**Mục đích**: Tiếp cận khách hàng ngay sau khi thanh toán khi họ có khả năng nhận ra lỗi sai cao nhất. Đây là điểm truy cập có tỷ lệ chuyển đổi cao vì khách hàng vẫn đang tương tác.

**Triển khai**: Theme App Extension (Liquid App Block) hoặc Checkout UI Extension

#### Mô Tả Bố Cục

```
+-----------------------------------------------------------+
|  Trang Cảm Ơn Shopify                                    |
|                                                           |
|  Cảm ơn bạn, John! Đơn hàng của bạn đã được xác nhận.   |
|  Đơn hàng #1234                                          |
|                                                           |
|  +-------------------------------------------------------+|
|  |  BANNER CHỈNH SỬA ĐƠN HÀNG (App Block)              ||
|  |                                                       ||
|  |  [Biểu tượng dấu tick]  Đặt hàng thành công!         ||
|  |                                                       ||
|  |  Nhầm lẫn? Bạn vẫn có thể chỉnh sửa đơn hàng.       ||
|  |  Thay đổi địa chỉ, đổi sản phẩm, hoặc điều chỉnh    ||
|  |  số lượng trong 3 giờ tới.                            ||
|  |                                                       ||
|  |  +----------------------------------------------+    ||
|  |  |     Chỉnh Sửa Đơn Hàng (Nút Chính)          |    ||
|  |  +----------------------------------------------+    ||
|  |                                                       ||
|  +-------------------------------------------------------+|
|                                                           |
|  [Tóm tắt đơn hàng gốc Shopify...]                       |
+-----------------------------------------------------------+
```

#### Các Thành Phần Chính

- **Banner tông tích cực**: Nền xanh lá/xanh dương nhạt, giọng điệu an tâm
- **CTA rõ ràng**: Một nút "Chỉnh Sửa Đơn Hàng" nổi bật duy nhất
- **Đề cập cửa sổ thời gian**: "trong 3 giờ tới" (động theo cài đặt người bán)
- **Không gây phiền**: Nằm bên dưới xác nhận đơn hàng, không làm phân tâm trải nghiệm thanh toán tích cực

#### Tương Tác

1. Khách hàng nhấn "Chỉnh Sửa Đơn Hàng" -> chuyển hướng đến Trang Chỉnh Sửa Đơn Hàng (Màn Hình 3)
2. Banner tự ẩn nếu cửa sổ chỉnh sửa đã hết hạn (trường hợp ngoại lệ: tải trang chậm)
3. Nếu người bán đã tắt chỉnh sửa tự phục vụ, block này không được hiển thị

#### Thích Ứng Di Động

- Banner toàn chiều rộng
- Nút kéo dài toàn chiều rộng trên di động
- Văn bản ngắn gọn để tránh cuộn quá nhiều

---

### Màn Hình 3: Trang Chỉnh Sửa Đơn Hàng -- Giao Diện Chỉnh Sửa Chính

**Mục đích**: Giao diện chỉnh sửa chính dành cho khách hàng, nơi khách hàng thực hiện thay đổi đơn hàng. Đây là trang độc lập (không nhúng trong Shopify admin) tải qua URL duy nhất.

**Triển khai**: Widget cửa hàng Preact (Scripttag) hoặc trang riêng qua app proxy

#### Mô Tả Bố Cục

```
+-----------------------------------------------------------+
|  [Logo Cửa Hàng]     Chỉnh Sửa Đơn Hàng #1234  [X Đóng] |
|-----------------------------------------------------------+
|                                                           |
|  PHẦN 1: ĐỊA CHỈ GIAO HÀNG                               |
|  +-------------------------------------------------------+|
|  |  Địa Chỉ Giao Hàng                  [Sửa] (liên kết) ||
|  |                                                       ||
|  |  John Smith                                           ||
|  |  123 Main Street, Apt 4B                              ||
|  |  New York, NY 10001                                   ||
|  |  Hoa Kỳ                                               ||
|  +-------------------------------------------------------+|
|                                                           |
|  (Khi nhấn "Sửa", biểu mẫu nội tuyến mở rộng:)          |
|  +-------------------------------------------------------+|
|  |  Địa Chỉ Giao Hàng                                   ||
|  |                                                       ||
|  |  Tên:      [John        ] Họ:       [Smith       ]    ||
|  |  Địa chỉ 1: [123 Main Street                       ]  ||
|  |  Địa chỉ 2: [Apt 4B                                ]  ||
|  |  Thành phố: [New York    ] Bang:     [NY          ]    ||
|  |  Mã bưu điện: [10001   ] Quốc gia:  [US v       ]    ||
|  |  Điện thoại: [+1 555-0123                           ] ||
|  |                                                       ||
|  |  [Lưu Địa Chỉ]  [Hủy]                               ||
|  +-------------------------------------------------------+|
|                                                           |
|  PHẦN 2: SẢN PHẨM ĐƠN HÀNG                               |
|  +-------------------------------------------------------+|
|  |  [Hình sản  ] Áo Thun - Xanh / Lớn                   ||
|  |  [phẩm      ] $29.99                                  ||
|  |  [50x50     ]                                         ||
|  |  [           ] SL: [ - ] [2] [ + ]                    ||
|  |  [           ]                                        ||
|  |  [           ] [Đổi Phiên Bản] [Xóa Sản Phẩm]       ||
|  +-------------------------------------------------------+|
|  |  [Hình sản  ] Hoodie - Đen / Trung Bình               ||
|  |  [phẩm      ] $59.99                                  ||
|  |  [50x50     ]                                         ||
|  |  [           ] SL: [ - ] [1] [ + ]                    ||
|  |  [           ]                                        ||
|  |  [           ] [Đổi Phiên Bản] [Xóa Sản Phẩm]       ||
|  +-------------------------------------------------------+|
|                                                           |
|  (Khi nhấn "Đổi Phiên Bản", modal/drawer mở ra:)         |
|  +-------------------------------------------------------+|
|  |  Đổi: Áo Thun - Xanh / Lớn                           ||
|  |                                                       ||
|  |  Màu:     [Xanh v]  ->  [Đỏ] [Xanh lá] [Đen]        ||
|  |  Kích cỡ: [Lớn v]   ->  [S] [M] [L] [XL]            ||
|  |                                                       ||
|  |  Giá gốc:  $29.99                                    ||
|  |  Giá mới:  $29.99  (Không thay đổi giá)              ||
|  |                                                       ||
|  |  [Xác Nhận Đổi]  [Hủy]                               ||
|  +-------------------------------------------------------+|
|                                                           |
|  PHẦN 3: TÓM TẮT GIÁ (thanh cố định dưới cùng trên     |
|  di động)                                                 |
|  +-------------------------------------------------------+|
|  |  Tổng gốc:          $119.97                           ||
|  |  Tổng mới:          $109.98                           ||
|  |  Chênh lệch:        -$9.99 (Hoàn tiền)               ||
|  |                                                       ||
|  |                                                       ||
|  |  +----------------------------------------------+    ||
|  |  |     Xem Lại Thay Đổi (Nút Chính)             |    ||
|  |  +----------------------------------------------+    ||
|  +-------------------------------------------------------+|
|                                                           |
|  Thời gian còn lại: 2g 30p                                |
+-----------------------------------------------------------+
```

#### Các Thành Phần Chính

- **Thương hiệu cửa hàng**: Logo, màu sắc của người bán áp dụng qua cài đặt
- **Phần địa chỉ**: Biểu mẫu chỉnh sửa nội tuyến có thể thu gọn
- **Thẻ sản phẩm**: Hình ảnh sản phẩm, tiêu đề, phiên bản, giá, bộ điều chỉnh số lượng, hành động đổi/xóa
- **Đổi phiên bản**: Modal hoặc drawer hiển thị các phiên bản có sẵn với so sánh giá
- **Tóm tắt giá**: Tổng cộng liên tục hiển thị giá gốc, giá mới và chênh lệch (hoàn tiền hoặc tính thêm)
- **Thời gian còn lại**: Nhắc nhở liên tục về cửa sổ chỉnh sửa

#### Tương Tác

1. Sửa địa chỉ -> biểu mẫu nội tuyến với xác thực -> Lưu cập nhật địa chỉ
2. Số lượng +/- -> cập nhật tóm tắt giá theo thời gian thực
3. Đổi Phiên Bản -> mở bộ chọn phiên bản -> hiển thị chênh lệch giá -> xác nhận đổi
4. Xóa Sản Phẩm -> hộp thoại xác nhận ("Xóa Áo Thun khỏi đơn hàng của bạn?") -> cập nhật tóm tắt
5. Xem Lại Thay Đổi -> chuyển đến Xác Nhận Chỉnh Sửa (Màn Hình 4)
6. Nếu sản phẩm hết hàng, tùy chọn phiên bản bị vô hiệu hóa với nhãn "Hết hàng"
7. Không thể xóa tất cả sản phẩm (xóa sản phẩm cuối cùng bị chặn -- gợi ý hủy đơn thay thế)

#### Thích Ứng Di Động

- Bố cục một cột
- Các trường biểu mẫu địa chỉ xếp chồng dọc
- Thẻ sản phẩm toàn chiều rộng với hình ảnh bên trái (thu gọn)
- Tóm tắt giá trở thành thanh cố định dưới cùng với nút "Xem Lại Thay Đổi"
- Đổi phiên bản mở dưới dạng bottom sheet thay vì modal
- Bộ điều chỉnh số lượng sử dụng vùng chạm lớn hơn (tối thiểu 44px)

---

### Màn Hình 4: Xác Nhận Chỉnh Sửa -- Tóm Tắt Các Thay Đổi

**Mục đích**: Hiển thị cho khách hàng bản tóm tắt rõ ràng về tất cả thay đổi trước khi xác nhận. Màn hình này rất quan trọng để ngăn chỉnh sửa nhầm và xây dựng niềm tin thông qua sự minh bạch.

#### Mô Tả Bố Cục

```
+-----------------------------------------------------------+
|  [Logo Cửa Hàng]    Xác Nhận Thay Đổi          [< Quay lại]|
|-----------------------------------------------------------+
|                                                           |
|  TÓM TẮT THAY ĐỔI                                       |
|  +-------------------------------------------------------+|
|  |  [Biểu tượng tick] Đã Cập Nhật Địa Chỉ               ||
|  |  Cũ: 123 Main Street, New York, NY 10001              ||
|  |  Mới: 456 Oak Avenue, Brooklyn, NY 11201              ||
|  +-------------------------------------------------------+|
|  |  [Biểu tượng đổi] Đã Đổi Sản Phẩm                    ||
|  |  Áo Thun Xanh/Lớn -> Áo Thun Đỏ/Trung Bình          ||
|  |  Giá: $29.99 -> $29.99 (không thay đổi)               ||
|  +-------------------------------------------------------+|
|  |  [Biểu tượng trừ] Đã Thay Đổi Số Lượng               ||
|  |  Áo Thun: 2 -> 1 (đã xóa 1)                          ||
|  |  Hoàn tiền: -$29.99                                    ||
|  +-------------------------------------------------------+|
|                                                           |
|  CHI TIẾT GIÁ                                             |
|  +-------------------------------------------------------+|
|  |  Tạm tính gốc:             $119.97                    ||
|  |  Thay đổi:                 -$29.99                    ||
|  |  Điều chỉnh thuế:          -$2.40                     ||
|  |  Vận chuyển:               $0.00 (không thay đổi)     ||
|  |  --------------------------------------------------- ||
|  |  Tổng mới:                 $87.58                     ||
|  |  Bạn sẽ được hoàn:         $32.39                     ||
|  +-------------------------------------------------------+|
|                                                           |
|  (hoặc nếu tính thêm phí:)                                |
|  +-------------------------------------------------------+|
|  |  Phí bổ sung:              $15.00                     ||
|  |  Phương thức thanh toán: Visa kết thúc 4242           ||
|  +-------------------------------------------------------+|
|                                                           |
|  +-------------------------------------------------------+|
|  |  [Ô đánh dấu] Tôi xác nhận các thay đổi cho đơn hàng||
|  +-------------------------------------------------------+|
|                                                           |
|  +------------------------------------------------------+|
|  |          Xác Nhận Thay Đổi (Nút Chính)               ||
|  +------------------------------------------------------+|
|  |          Quay Lại Chỉnh Sửa (Liên Kết)               ||
|  +------------------------------------------------------+|
+-----------------------------------------------------------+
```

#### Các Thành Phần Chính

- **Thẻ thay đổi**: Mỗi thay đổi hiển thị với biểu tượng, giá trị cũ so với mới, và tác động giá
- **Chi tiết giá**: Hiển thị rõ ràng từng dòng với điều chỉnh thuế và vận chuyển
- **Thông báo hoàn tiền/tính phí**: Hiển thị nổi bật về những gì xảy ra về tài chính
- **Ô đánh dấu xác nhận**: Bắt buộc trước khi gửi (ngăn xác nhận nhầm)
- **Phương thức thanh toán**: Hiển thị khi cần tính thêm phí

#### Tương Tác

1. Khách hàng xem lại tất cả thay đổi
2. Đánh dấu ô xác nhận
3. Nhấn "Xác Nhận Thay Đổi" -> trạng thái đang tải -> màn hình thành công
4. Màn hình thành công: "Đơn hàng của bạn đã được cập nhật! Bạn sẽ nhận được email xác nhận trong thời gian ngắn." với liên kết quay lại Trang Trạng Thái Đơn Hàng
5. Nếu thanh toán thất bại (tính thêm phí), hiển thị lỗi: "Không thể xử lý thanh toán. Vui lòng liên hệ hỗ trợ."
6. "Quay Lại Chỉnh Sửa" quay về Trang Chỉnh Sửa Đơn Hàng với các thay đổi được giữ nguyên

#### Thích Ứng Di Động

- Thẻ thay đổi xếp chồng dọc, toàn chiều rộng
- Chi tiết giá sử dụng bố cục thu gọn
- Nút xác nhận cố định ở dưới cùng
- Ô đánh dấu sử dụng vùng chạm lớn

---

### Màn Hình 5: Quy Trình Hủy Đơn -- Chọn Lý Do + Đề Nghị Giữ Chân

**Mục đích**: Khi khách hàng muốn hủy, thu thập lý do và đưa ra đề nghị giữ chân để giảm tỷ lệ hủy đơn. Đây là tính năng P1 nhưng quy trình cơ bản (lý do + xác nhận) là P0.

#### Mô Tả Bố Cục

```
+-----------------------------------------------------------+
|  [Logo Cửa Hàng]    Hủy Đơn Hàng #1234         [< Quay lại]|
|-----------------------------------------------------------+
|                                                           |
|  BƯỚC 1: LÝ DO (hiển thị đầu tiên)                       |
|  +-------------------------------------------------------+|
|  |  Tại sao bạn muốn hủy?                               ||
|  |                                                       ||
|  |  ( ) Tôi đặt nhầm sản phẩm                           ||
|  |  ( ) Tôi tìm được giá tốt hơn ở nơi khác            ||
|  |  ( ) Tôi không còn cần nữa                           ||
|  |  ( ) Vận chuyển quá lâu                               ||
|  |  ( ) Tôi muốn thay đổi đơn hàng (*)                  ||
|  |  ( ) Khác: [________________]                         ||
|  |                                                       ||
|  |  (*) "Bạn có muốn chỉnh sửa đơn hàng thay vì hủy?"  ||
|  |      [Chỉnh Sửa Đơn Hàng] (liên kết đến Màn Hình 3) ||
|  |                                                       ||
|  |  [Tiếp Tục] (nút)                                    ||
|  +-------------------------------------------------------+|
|                                                           |
|  BƯỚC 2: ĐỀ NGHỊ GIỮ CHÂN (P1 -- hiển thị sau lý do)   |
|  +-------------------------------------------------------+|
|  |  Trước khi bạn rời đi...                              ||
|  |                                                       ||
|  |  +--------------------------------------------------+ ||
|  |  | [Biểu tượng quà]                                 | ||
|  |  |                                                  | ||
|  |  | Chúng tôi muốn tặng bạn GIẢM 15% cho đơn hàng  | ||
|  |  | nếu bạn quyết định giữ lại.                      | ||
|  |  |                                                  | ||
|  |  | Tổng mới: $119.97 -> $101.97                     | ||
|  |  | Bạn tiết kiệm: $18.00                           | ||
|  |  |                                                  | ||
|  |  | [Giữ Đơn Hàng Với Giảm 15%] (Nút Chính)         | ||
|  |  | [Không, cảm ơn, hủy đơn hàng] (Liên kết)        | ||
|  |  +--------------------------------------------------+ ||
|  +-------------------------------------------------------+|
|                                                           |
|  BƯỚC 3: XÁC NHẬN                                        |
|  +-------------------------------------------------------+|
|  |  Bạn có chắc muốn hủy Đơn hàng #1234?                ||
|  |                                                       ||
|  |  - Tất cả sản phẩm sẽ được hoàn tiền về phương       ||
|  |    thức thanh toán gốc (Visa kết thúc 4242)           ||
|  |  - Số tiền hoàn: $119.97                              ||
|  |  - Thời gian xử lý hoàn tiền: 5-10 ngày làm việc     ||
|  |                                                       ||
|  |  [Hủy Đơn Hàng] (Nút hủy)                            ||
|  |  [Giữ Đơn Hàng] (Nút chính)                          ||
|  +-------------------------------------------------------+|
|                                                           |
|  BƯỚC 4: THÀNH CÔNG                                      |
|  +-------------------------------------------------------+|
|  |  [Dấu tick]                                           ||
|  |  Đơn hàng của bạn đã được hủy.                        ||
|  |  Hoàn tiền $119.97 sẽ được xử lý trong                ||
|  |  5-10 ngày làm việc.                                   ||
|  |                                                       ||
|  |  [Tiếp Tục Mua Sắm] (liên kết đến cửa hàng)         ||
|  +-------------------------------------------------------+|
+-----------------------------------------------------------+
```

#### Các Thành Phần Chính

- **Chọn lý do**: Nút radio với các lý do phổ biến; "thay đổi đơn hàng" chuyển hướng đến chỉnh sửa
- **Đề nghị giữ chân** (P1): Giảm giá hoặc tín dụng cửa hàng do người bán cấu hình
- **Xác nhận cuối cùng**: Chi tiết hoàn tiền rõ ràng và phương thức thanh toán
- **Chuyển hướng thông minh**: Nếu lý do là "đặt nhầm sản phẩm", gợi ý chỉnh sửa thay vì hủy

#### Tương Tác

1. Chọn lý do -> Tiếp Tục
2. Nếu chọn "muốn thay đổi đơn hàng", hiển thị liên kết "Chỉnh Sửa Đơn Hàng" (chuyển hướng đến Màn Hình 3)
3. (P1) Đề nghị giữ chân hiển thị -> "Giữ Đơn Hàng Với Giảm 15%" áp dụng giảm giá và quay lại trạng thái đơn hàng
4. "Không, cảm ơn, hủy" -> bước xác nhận cuối cùng
5. "Hủy Đơn Hàng" (nút hủy) -> xử lý hủy đơn -> hiển thị thành công
6. Người bán nhận thông báo với lý do hủy cho phân tích

#### Thích Ứng Di Động

- Một cột, các bước hiển thị từng bước một (quy trình wizard)
- Nút radio có vùng chạm lớn
- Thẻ đề nghị giữ chân nổi bật với CTA lớn
- Nút hủy sử dụng kiểu đỏ để rõ ràng

---

### Màn Hình 6: Bán Thêm Trong Chỉnh Sửa (P1)

**Mục đích**: Hiển thị gợi ý sản phẩm khi khách hàng đang chỉnh sửa đơn hàng, tạo thêm doanh thu. Đây là thanh bên trên máy tính và phần dưới cùng trên di động.

#### Mô Tả Bố Cục

```
+-------------------------------------------+---------------+
|  Trang Chỉnh Sửa Đơn Hàng (Màn Hình 3)  | THANH BÊN     |
|                                           | BÁN THÊM      |
|  [Giao diện chỉnh sửa chính              |               |
|   như mô tả trong Màn Hình 3]            | Bạn cũng có   |
|                                           | thể thích:    |
|                                           |               |
|                                           | +----------+  |
|                                           | |[Hình sản |  |
|                                           | | phẩm     |  |
|                                           | | 80x80]   |  |
|                                           | |           |  |
|                                           | | Thắt Lưng |  |
|                                           | | Phối Hợp  |  |
|                                           | | $19.99    |  |
|                                           | |           |  |
|                                           | | [Thêm vào |  |
|                                           | |  Đơn Hàng]|  |
|                                           | +----------+  |
|                                           |               |
|                                           | +----------+  |
|                                           | |[Hình sản |  |
|                                           | | phẩm]    |  |
|                                           | | Tất       |  |
|                                           | | $9.99     |  |
|                                           | | [Thêm]    |  |
|                                           | +----------+  |
|                                           |               |
|                                           | +----------+  |
|                                           | |[Hình sản |  |
|                                           | | phẩm]    |  |
|                                           | | Mũ        |  |
|                                           | | $24.99    |  |
|                                           | | [Thêm]    |  |
|                                           | +----------+  |
+-------------------------------------------+---------------+
```

#### Các Thành Phần Chính

- **Thẻ sản phẩm**: Hình ảnh, tiêu đề, giá, nút "Thêm vào Đơn Hàng"
- **Gợi ý**: Dựa trên sản phẩm trong đơn hàng (sản phẩm bổ sung, cùng bộ sưu tập, thường mua cùng nhau)
- **Phân bổ doanh thu**: Theo dõi doanh thu bán thêm tạo ra từ chỉnh sửa
- **Tối đa 3-4 gợi ý**: Tránh làm khách hàng choáng ngợp

#### Tương Tác

1. Khách hàng nhấn "Thêm vào Đơn Hàng" -> sản phẩm được thêm vào đơn hàng với số lượng 1
2. Tóm tắt giá cập nhật ngay lập tức
3. Sản phẩm bán thêm đã thêm xuất hiện trong phần sản phẩm đơn hàng với huy hiệu "Vừa Thêm"
4. Khách hàng có thể xóa sản phẩm bán thêm như bất kỳ sản phẩm nào khác
5. Doanh thu bán thêm được theo dõi và phân bổ cho ứng dụng để phân tích

#### Thích Ứng Di Động

- Thanh bên trở thành phần cuộn ngang bên dưới sản phẩm đơn hàng
- Thẻ sản phẩm hiển thị dạng băng chuyền ngang (2-3 hiển thị)
- Nút "Thêm vào Đơn Hàng" sử dụng kiểu thu gọn
- Phần có thể thu gọn: "Gợi ý cho bạn (3)" với mở rộng/thu gọn

---

## Phần 2: Màn Hình Quản Trị Người Bán (Polaris)

Tất cả màn hình quản trị người bán được nhúng trong Shopify Admin sử dụng React + Polaris v12+ và App Bridge.

---

### Màn Hình 7: Bảng Điều Khiển -- Tổng Quan

**Mục đích**: Cung cấp cho người bán cái nhìn tổng quan về hiệu suất chỉnh sửa đơn hàng trong cửa hàng. Đây là trang đích khi mở ứng dụng.

#### Mô Tả Bố Cục

```
+-----------------------------------------------------------+
|  Header Quản Trị Shopify                                  |
|-----------------------------------------------------------+
|  Avada Order Editing                                      |
|  [Bảng Điều Khiển] [Đơn Hàng] [Quy Tắc] [Phân Tích] [Cài Đặt]|
|-----------------------------------------------------------+
|                                                           |
|  BANNER CHÀO MỪNG (chỉ lần đầu)                          |
|  +-------------------------------------------------------+|
|  |  Chào mừng đến với Avada Order Editing!               ||
|  |  Hoàn tất thiết lập để khách hàng chỉnh sửa đơn hàng.||
|  |  [Hoàn Tất Thiết Lập] (Chính)     [Bỏ Qua] (Liên kết)||
|  +-------------------------------------------------------+|
|                                                           |
|  BỘ CHỌN KHOẢNG THỜI GIAN                                |
|  [7 ngày qua v]  [Hôm nay] [7n] [30n] [90n] [Tùy chỉnh] |
|                                                           |
|  THẺ CHỈ SỐ (lưới 4 cột)                                 |
|  +-------------+ +-------------+ +-------------+ +-------+|
|  | Tổng Chỉnh   | | $ Hỗ Trợ   | | Doanh Thu   | | Tỷ Lệ||
|  | Sửa          | | Tiết Kiệm   | | Bán Thêm    | | Hủy  ||
|  |    247       | |   $2,470    | |   $890      | | 3.2%||
|  |  +12% so     | |  +15% so    | |  +8% so     | | -1% ||
|  |  với kỳ trước| |  với kỳ trước| |  với kỳ trước| | so  ||
|  +-------------+ +-------------+ +-------------+ +-------+|
|                                                           |
|  PHÂN LOẠI CHỈNH SỬA         HOẠT ĐỘNG GẦN ĐÂY          |
|  +---------------------------+ +-------------------------+|
|  | [Biểu đồ tròn]           | | 10:32 SA - Đơn hàng    ||
|  |                           | | #1234 Địa chỉ đã thay  ||
|  | Địa chỉ: 45%             | | đổi bởi khách hàng     ||
|  | Đổi sản phẩm: 25%        | |                         ||
|  | Số lượng: 20%             | | 10:15 SA - Đơn hàng    ||
|  | Hủy đơn: 10%             | | #1230 Sản phẩm đã đổi  ||
|  |                           | | bởi khách hàng         ||
|  |                           | |                         ||
|  |                           | | 9:48 SA - Đơn hàng     ||
|  |                           | | #1228 Đã hủy bởi khách ||
|  |                           | | hàng. Lý do: Sai sản   ||
|  |                           | | phẩm                   ||
|  |                           | |                         ||
|  |                           | | [Xem Tất Cả Hoạt Động] ||
|  +---------------------------+ +-------------------------+|
|                                                           |
|  SỬ DỤNG GÓI                                             |
|  +-------------------------------------------------------+|
|  |  Gói Starter: 142 / 200 lượt chỉnh sửa tháng này     ||
|  |  [=============================-------] 71%           ||
|  |  [Nâng Cấp Gói]                                       ||
|  +-------------------------------------------------------+|
+-----------------------------------------------------------+
```

#### Thành Phần Polaris

- `Page` với tiêu đề và tab điều hướng
- `Layout` với `Layout.Section` cho lưới
- `Card` cho thẻ chỉ số, thẻ biểu đồ, nguồn cấp hoạt động
- `Badge` cho thay đổi phần trăm (tích cực = xanh lá, tiêu cực = đỏ)
- `ProgressBar` cho sử dụng gói
- `Button` cho CTA
- `DatePicker` hoặc bộ chọn khoảng thời gian tùy chỉnh
- `Banner` cho chào mừng/hướng dẫn (có thể bỏ qua)
- `ResourceList` cho hoạt động gần đây

#### Tương Tác Chính

1. Bộ chọn khoảng thời gian cập nhật tất cả chỉ số và biểu đồ
2. Nhấn vào thẻ chỉ số chuyển đến phân tích chi tiết (Màn Hình 11)
3. Nhấn vào mục hoạt động chuyển đến chi tiết đơn hàng (Màn Hình 12)
4. "Nâng Cấp Gói" mở quy trình nâng cấp thanh toán
5. "Hoàn Tất Thiết Lập" chuyển đến Cài Đặt với hướng dẫn thiết lập

#### Thích Ứng Di Động

- Thẻ chỉ số xếp lưới 2x2 trên máy tính bảng, một cột trên di động
- Biểu đồ tròn và nguồn cấp hoạt động xếp chồng dọc
- Bộ chọn ngày sử dụng dropdown thu gọn

---

### Màn Hình 8: Danh Sách Đơn Hàng -- Đơn Hàng Có Lịch Sử Chỉnh Sửa

**Mục đích**: Hiển thị cho người bán tất cả đơn hàng đã được chỉnh sửa hoặc đủ điều kiện chỉnh sửa, với khả năng lọc và tìm kiếm.

#### Mô Tả Bố Cục

```
+-----------------------------------------------------------+
|  Avada Order Editing                                      |
|  [Bảng Điều Khiển] [Đơn Hàng] [Quy Tắc] [Phân Tích] [Cài Đặt]|
|-----------------------------------------------------------+
|                                                           |
|  Đơn Hàng                                    [Xuất CSV]   |
|                                                           |
|  BỘ LỌC                                                  |
|  [Tìm kiếm đơn hàng...     ]                             |
|  [Trạng thái: Tất cả v] [Loại chỉnh sửa: Tất cả v] [Khoảng thời gian v]|
|                                                           |
|  TAB                                                      |
|  [Tất cả] [Đã sửa (142)] [Đã hủy (18)] [Đang chờ (3)]   |
|                                                           |
|  BẢNG ĐƠN HÀNG                                           |
|  +-------------------------------------------------------+|
|  | Đơn hàng | Khách hàng  | Ngày     | Loại    | Trạng   ||
|  |          |             |          | Sửa     | thái    ||
|  |----------+-------------+----------+---------+---------||
|  | #1234    | John Smith  | 30 Th3   | Địa chỉ | Đã sửa ||
|  |          |             | 10:32 SA | Đổi SP  | [Huy hiệu]||
|  |----------+-------------+----------+---------+---------||
|  | #1230    | Jane Doe    | 30 Th3   | Đổi     | Đã sửa ||
|  |          |             | 10:15 SA | SP      | [Huy hiệu]||
|  |----------+-------------+----------+---------+---------||
|  | #1228    | Bob Wilson  | 30 Th3   | Hủy     | Đã hủy ||
|  |          |             | 9:48 SA  |         | [Huy hiệu]||
|  |----------+-------------+----------+---------+---------||
|  | #1225    | Alice Brown | 29 Th3   | Thay đổi| Đã sửa ||
|  |          |             | 4:22 CH  | SL      | [Huy hiệu]||
|  |----------+-------------+----------+---------+---------||
|  | #1220    | Tom Lee     | 29 Th3   | --      | Đang    ||
|  |          |             | 2:10 CH  |         | chờ     ||
|  |          |             |          |         | [Huy hiệu]||
|  +-------------------------------------------------------+|
|                                                           |
|  Hiển thị 1-20 của 163 đơn hàng      [< Trước] [Sau >]   |
+-----------------------------------------------------------+
```

#### Thành Phần Polaris

- `Page` với tiêu đề
- `IndexTable` cho danh sách đơn hàng (cột có thể sắp xếp)
- `IndexFilters` cho tìm kiếm, trạng thái, loại chỉnh sửa, bộ lọc khoảng thời gian
- `Tabs` cho lọc nhanh (Tất cả, Đã sửa, Đã hủy, Đang chờ)
- `Badge` với màu trạng thái (Đã sửa = thông tin, Đã hủy = nghiêm trọng, Đang chờ = chú ý)
- `Pagination` cho chuyển trang
- `Button` cho Xuất CSV

#### Tương Tác Chính

1. Nhấn dòng đơn hàng -> chuyển đến Chi Tiết Đơn Hàng (Màn Hình 12)
2. Tìm kiếm theo số đơn hàng, tên khách hàng, hoặc email
3. Lọc theo trạng thái (Đã sửa, Đã hủy, Đang chờ), loại chỉnh sửa, khoảng thời gian
4. Sắp xếp theo ngày, số đơn hàng, khách hàng
5. Xuất kết quả đã lọc dưới dạng CSV
6. Trạng thái "Đang chờ" nghĩa là đơn hàng đang trong cửa sổ chỉnh sửa và đủ điều kiện để sửa

#### Thích Ứng Di Động

- Bảng trở thành danh sách thẻ trên di động
- Mỗi thẻ hiển thị: Đơn hàng #, Khách hàng, Ngày, Huy hiệu trạng thái
- Bộ lọc thu gọn thành nút "Lọc" mở ra sheet
- Thanh tìm kiếm vẫn hiển thị ở trên cùng

---

### Màn Hình 9: Quy Tắc Chỉnh Sửa -- Cấu Hình Cửa Sổ Thời Gian & Thay Đổi Cho Phép

**Mục đích**: Cho phép người bán cấu hình những gì khách hàng có thể chỉnh sửa, khi nào có thể chỉnh sửa, và các hạn chế theo sản phẩm cụ thể.

#### Mô Tả Bố Cục

```
+-----------------------------------------------------------+
|  Avada Order Editing                                      |
|  [Bảng Điều Khiển] [Đơn Hàng] [Quy Tắc] [Phân Tích] [Cài Đặt]|
|-----------------------------------------------------------+
|                                                           |
|  Quy Tắc Chỉnh Sửa                               [Lưu]  |
|                                                           |
|  PHẦN 1: CÀI ĐẶT CHUNG                                   |
|  +-------------------------------------------------------+|
|  |  Tự Phục Vụ Khách Hàng                                ||
|  |                                                       ||
|  |  Bật chỉnh sửa tự phục vụ cho khách hàng [Bật/Tắt BẬT]||
|  |                                                       ||
|  |  Cửa Sổ Thời Gian Chỉnh Sửa                          ||
|  |  Khách hàng có thể chỉnh sửa bao lâu sau khi đặt?    ||
|  |  [3 giờ v]  (dropdown: 30 phút, 1g, 2g, 3g, 6g,     ||
|  |             12g, 24g, 48g, Cho đến khi thực hiện)     ||
|  |                                                       ||
|  |  Thay Đổi Cho Phép                                    ||
|  |  [x] Địa chỉ giao hàng                                ||
|  |  [x] Đổi phiên bản sản phẩm (kích cỡ, màu sắc, v.v.)||
|  |  [x] Thay đổi số lượng                                ||
|  |  [x] Xóa sản phẩm                                     ||
|  |  [x] Hủy đơn hàng                                     ||
|  |  [ ] Thêm sản phẩm mới (P1)                           ||
|  |  [ ] Sửa địa chỉ thanh toán (sắp ra mắt)             ||
|  +-------------------------------------------------------+|
|                                                           |
|  PHẦN 2: QUY TẮC SẢN PHẨM/BỘ SƯU TẬP                    |
|  +-------------------------------------------------------+|
|  |  Quy Tắc Theo Sản Phẩm                                ||
|  |  Ghi đè cài đặt chung cho sản phẩm hoặc              ||
|  |  bộ sưu tập cụ thể.                                   ||
|  |                                                       ||
|  |  +--------------------------------------------------+ ||
|  |  | Bộ sưu tập: "Giảm Giá Cuối Cùng"                 | ||
|  |  | Quy tắc: Không cho phép chỉnh sửa      [Sửa]    | ||
|  |  | [Xóa]                                             | ||
|  |  +--------------------------------------------------+ ||
|  |  | Sản phẩm: "Nhẫn Khắc Tùy Chỉnh"                 | ||
|  |  | Quy tắc: Chỉ địa chỉ (không đổi SP)   [Sửa]    | ||
|  |  | [Xóa]                                             | ||
|  |  +--------------------------------------------------+ ||
|  |                                                       ||
|  |  [+ Thêm Quy Tắc]                                    ||
|  +-------------------------------------------------------+|
|                                                           |
|  PHẦN 3: CÀI ĐẶT HỦY ĐƠN                                |
|  +-------------------------------------------------------+|
|  |  Chính Sách Hủy Đơn                                   ||
|  |                                                       ||
|  |  Cho phép khách hàng hủy đơn        [Bật/Tắt BẬT]   ||
|  |                                                       ||
|  |  Cửa sổ thời gian hủy đơn                             ||
|  |  [Giống cửa sổ chỉnh sửa v]                          ||
|  |                                                       ||
|  |  Yêu cầu lý do hủy đơn             [Bật/Tắt BẬT]    ||
|  |                                                       ||
|  |  Lý do hủy đơn (mỗi dòng một lý do):                 ||
|  |  +--------------------------------------------------+ ||
|  |  | Tôi đặt nhầm sản phẩm                            | ||
|  |  | Tôi tìm được giá tốt hơn ở nơi khác             | ||
|  |  | Tôi không còn cần nữa                            | ||
|  |  | Vận chuyển quá lâu                                | ||
|  |  | Khác                                              | ||
|  |  +--------------------------------------------------+ ||
|  |                                                       ||
|  |  Đề nghị giữ chân (P1)             [Bật/Tắt TẮT]    ||
|  |  Đề nghị giảm giá trước khi hủy                       ||
|  +-------------------------------------------------------+|
|                                                           |
|  PHẦN 4: CÀI ĐẶT HOÀN TIỀN                               |
|  +-------------------------------------------------------+|
|  |  Hoàn Tiền Tự Động                                    ||
|  |                                                       ||
|  |  Tự động xử lý hoàn tiền            [Bật/Tắt BẬT]   ||
|  |  cho giảm giá                                         ||
|  |                                                       ||
|  |  Phương thức hoàn tiền                                ||
|  |  (o) Phương thức thanh toán gốc                       ||
|  |  ( ) Tín dụng cửa hàng (P1)                          ||
|  |  ( ) Để khách hàng chọn (P1)                          ||
|  |                                                       ||
|  |  Tự động tính phí cho tăng giá     [Bật/Tắt BẬT]    ||
|  +-------------------------------------------------------+|
+-----------------------------------------------------------+
```

#### Thành Phần Polaris

- `Page` với tiêu đề và hành động chính (Lưu)
- `Layout` với `Layout.AnnotatedSection` cho mỗi phần
- `Card` cho mỗi nhóm cài đặt
- `SettingToggle` hoặc `Toggle` cho cài đặt bật/tắt
- `Select` cho dropdown (cửa sổ thời gian, phương thức hoàn tiền)
- `ChoiceList` cho ô đánh dấu (thay đổi cho phép)
- `ResourceList` cho quy tắc sản phẩm/bộ sưu tập
- `TextField` (nhiều dòng) cho lý do hủy đơn
- `RadioButton` cho phương thức hoàn tiền
- `Button` cho Thêm Quy Tắc

#### Tương Tác Chính

1. Bật/tắt tự phục vụ -> ngay lập tức bật/tắt chỉnh sửa của khách hàng
2. Thay đổi cửa sổ thời gian -> áp dụng cho tất cả đơn hàng mới (đơn hàng hiện tại giữ cửa sổ gốc)
3. Thêm quy tắc sản phẩm/bộ sưu tập -> mở modal với bộ chọn sản phẩm/bộ sưu tập + cấu hình quy tắc
4. Lưu -> xác thực và lưu tất cả cài đặt -> hiển thị toast "Đã lưu cài đặt"
5. Tính năng "Sắp ra mắt" hiển thị nhưng bị vô hiệu hóa với tooltip giải thích khả dụng trong tương lai

#### Thích Ứng Di Động

- Các phần xếp chồng dọc
- Phần có chú thích hiển thị tiêu đề phía trên nội dung (không phải cạnh nhau)
- Modal chọn sản phẩm trở thành toàn màn hình trên di động
- Nút Lưu cố định ở dưới cùng

---

### Màn Hình 10: Cài Đặt -- Cài Đặt Chung, Thông Báo, Thương Hiệu

**Mục đích**: Cấu hình cài đặt ứng dụng chung bao gồm thông báo, thương hiệu và tích hợp.

#### Mô Tả Bố Cục

```
+-----------------------------------------------------------+
|  Avada Order Editing                                      |
|  [Bảng Điều Khiển] [Đơn Hàng] [Quy Tắc] [Phân Tích] [Cài Đặt]|
|-----------------------------------------------------------+
|                                                           |
|  Cài Đặt                                      [Lưu]      |
|                                                           |
|  PHẦN 1: THÔNG BÁO                                        |
|  +-------------------------------------------------------+|
|  |  Thông Báo Email                                      ||
|  |                                                       ||
|  |  Gửi email cho khách hàng khi:                        ||
|  |  [x] Đơn hàng được chỉnh sửa                         ||
|  |  [x] Đơn hàng bị hủy                                 ||
|  |  [x] Hoàn tiền được xử lý                            ||
|  |                                                       ||
|  |  Gửi email cho người bán khi:                         ||
|  |  [x] Khách hàng chỉnh sửa đơn hàng                   ||
|  |  [x] Khách hàng hủy đơn hàng                         ||
|  |  [ ] Cửa sổ chỉnh sửa hết hạn                        ||
|  |                                                       ||
|  |  Email thông báo: [store@example.com         ]        ||
|  |                                                       ||
|  |  [Xem Trước Mẫu Email]                               ||
|  +-------------------------------------------------------+|
|                                                           |
|  PHẦN 2: THƯƠNG HIỆU                                      |
|  +-------------------------------------------------------+|
|  |  Thương Hiệu Giao Diện Khách Hàng                    ||
|  |                                                       ||
|  |  Màu chính:      [#2563EB] [Bộ chọn màu]             ||
|  |  Kiểu nút:       [Bo tròn v]                         ||
|  |  Hiển thị logo:   [Bật/Tắt BẬT]                      ||
|  |                                                       ||
|  |  Tiêu đề trang chỉnh sửa:                            ||
|  |  [Chỉnh Sửa Đơn Hàng Của Bạn                   ]     ||
|  |                                                       ||
|  |  Mô tả trang chỉnh sửa:                              ||
|  |  [Thực hiện thay đổi cho đơn hàng bên dưới.    ]     ||
|  |                                                       ||
|  |  [Xem Trước] (mở xem trước trang khách hàng)         ||
|  +-------------------------------------------------------+|
|                                                           |
|  PHẦN 3: GÓI & THANH TOÁN                                 |
|  +-------------------------------------------------------+|
|  |  Gói Hiện Tại: Starter ($9.99/tháng)                  ||
|  |  Lượt chỉnh sửa đã dùng: 142 / 200 tháng này        ||
|  |  [=============================-------] 71%           ||
|  |  Ngày thanh toán tiếp theo: 15 tháng 4, 2026          ||
|  |                                                       ||
|  |  [Nâng Cấp Gói] [Xem Lịch Sử Thanh Toán]            ||
|  +-------------------------------------------------------+|
|                                                           |
|  PHẦN 4: TÍCH HỢP (P1)                                    |
|  +-------------------------------------------------------+|
|  |  Shopify Flow         [Đã kết nối] [Huy hiệu: Hoạt động]||
|  |  Google Address API   [Chưa kết nối] [Kết Nối]       ||
|  |  Thông báo Slack     [Chưa kết nối] [Kết Nối] (P2)  ||
|  +-------------------------------------------------------+|
|                                                           |
|  PHẦN 5: DỮ LIỆU & QUYỀN RIÊNG TƯ                        |
|  +-------------------------------------------------------+|
|  |  Lưu trữ dữ liệu: [12 tháng v]                      ||
|  |  [Xuất Tất Cả Dữ Liệu]  [Xóa Tất Cả Dữ Liệu]      ||
|  +-------------------------------------------------------+|
+-----------------------------------------------------------+
```

#### Thành Phần Polaris

- `Page` với tiêu đề và hành động chính (Lưu)
- `Layout` với `Layout.AnnotatedSection`
- `Card` cho mỗi nhóm cài đặt
- `ChoiceList` cho ô đánh dấu thông báo
- `TextField` cho email, tiêu đề, mô tả
- `ColorPicker` hoặc `TextField` với mẫu màu cho màu chính
- `Select` cho kiểu nút, lưu trữ dữ liệu
- `ProgressBar` cho sử dụng gói
- `Badge` cho trạng thái tích hợp
- `Button` cho Xem Trước, Nâng Cấp, Kết Nối

#### Tương Tác Chính

1. Bật/tắt thông báo
2. Xem Trước Mẫu Email -> mở modal hiển thị xem trước email với dữ liệu mẫu
3. Thay đổi thương hiệu -> nút Xem Trước hiển thị xem trước trực tiếp trong modal
4. Nâng Cấp Gói -> mở xác nhận thanh toán Shopify
5. Kết nối tích hợp -> quy trình OAuth hoặc nhập API key
6. Xuất Tất Cả Dữ Liệu -> tạo tải xuống CSV của tất cả lịch sử chỉnh sửa
7. Xóa Tất Cả Dữ Liệu -> hộp thoại xác nhận với "gõ DELETE để xác nhận"

#### Thích Ứng Di Động

- Phần có chú thích xếp chồng dọc
- Bộ chọn màu sử dụng đầu vào màu gốc di động
- Phần sử dụng gói nổi bật ở trên cùng trên di động

---

### Màn Hình 11: Phân Tích -- Biểu Đồ và Thông Tin Chi Tiết

**Mục đích**: Cung cấp cho người bán phân tích trực quan về xu hướng chỉnh sửa, tác động doanh thu và tiết kiệm vận hành. Đây là tính năng P1 nhưng cấu trúc trang được thiết kế từ Ngày 1.

#### Mô Tả Bố Cục

```
+-----------------------------------------------------------+
|  Avada Order Editing                                      |
|  [Bảng Điều Khiển] [Đơn Hàng] [Quy Tắc] [Phân Tích] [Cài Đặt]|
|-----------------------------------------------------------+
|                                                           |
|  Phân Tích                                                |
|  [30 ngày qua v]  [Hôm nay] [7n] [30n] [90n] [Tùy chỉnh]|
|                                                           |
|  CHỈ SỐ TÓM TẮT (4 thẻ)                                 |
|  +-------------+ +-------------+ +-------------+ +-------+|
|  | Tổng Chỉnh   | | $ Hỗ Trợ   | | Doanh Thu   | | Thời ||
|  | Sửa          | | Tiết Kiệm   | | Bán Thêm    | | Gian ||
|  | 1,247        | | $12,470     | | $4,320      | | Chỉnh||
|  |              | |             | |             | | Sửa  ||
|  | +18% so với  | | +22%        | | +35%        | | TB   ||
|  | kỳ trước     | |             | |             | | 8 phút||
|  +-------------+ +-------------+ +-------------+ +-------+|
|                                                           |
|  BIỂU ĐỒ 1: CHỈNH SỬA THEO THỜI GIAN                    |
|  +-------------------------------------------------------+|
|  |  [Biểu đồ đường/cột]                                 ||
|  |                                                       ||
|  |  ^                                                    ||
|  |  |    ___                                             ||
|  |  |   /   \      ___                                   ||
|  |  |  /     \    /   \    ___                           ||
|  |  | /       \  /     \  /   \                          ||
|  |  |/         \/       \/     \                         ||
|  |  +-------------------------------------------->       ||
|  |  1 Th3   8 Th3   15 Th3   22 Th3   29 Th3            ||
|  |                                                       ||
|  |  Chú thích: [--] Chỉnh sửa  [--] Hủy đơn            ||
|  +-------------------------------------------------------+|
|                                                           |
|  BIỂU ĐỒ 2: SẢN PHẨM       BIỂU ĐỒ 3: LOẠI CHỈNH SỬA  |
|  ĐƯỢC SỬA NHIỀU NHẤT                                      |
|  +---------------------------+ +-------------------------+|
|  | [Biểu đồ cột - Ngang]    | | [Biểu đồ tròn]         ||
|  |                           | |                         ||
|  | Áo Thun Basic    ████ 89 | | Địa chỉ: 42%           ||
|  | Hoodie Classic   ███  67 | | Đổi SP: 28%            ||
|  | Giày Sneakers Pro ██  45 | | Số lượng: 18%          ||
|  | Váy Elegant      ██   38 | | Hủy đơn: 12%          ||
|  | Mũ Summer        █    22 | |                         ||
|  +---------------------------+ +-------------------------+|
|                                                           |
|  BIỂU ĐỒ 4: LÝ DO HỦY ĐƠN                               |
|  +-------------------------------------------------------+|
|  | [Biểu đồ cột ngang]                                  ||
|  |                                                       ||
|  | Sai sản phẩm     ██████████████  38%                  ||
|  | Giá tốt hơn      ████████       22%                   ||
|  | Không cần nữa    ██████         18%                   ||
|  | Vận chuyển chậm  ████           12%                   ||
|  | Khác             ███            10%                   ||
|  +-------------------------------------------------------+|
|                                                           |
|  BẢNG: TÁC ĐỘNG DOANH THU                                 |
|  +-------------------------------------------------------+|
|  | Chỉ số                   | Kỳ này      | Thay đổi    ||
|  |-------------------------+-------------+---------------||
|  | Yêu cầu hỗ trợ tránh được | 1,247     | -62%          ||
|  | Chi phí hỗ trợ tiết kiệm  | $12,470   | +22%          ||
|  | Doanh thu bán thêm        | $4,320    | +35%          ||
|  | Đơn hủy được giữ lại      | 47        | +12%          ||
|  | Doanh thu giữ lại         | $8,900    | +28%          ||
|  | ROI ứng dụng ròng         | 42x       | +15%          ||
|  +-------------------------------------------------------+|
+-----------------------------------------------------------+
```

#### Thành Phần Polaris

- `Page` với tiêu đề
- `Card` cho mỗi phần biểu đồ
- `Layout` với các phần cho lưới biểu đồ
- Thành phần biểu đồ tùy chỉnh (sử dụng thư viện biểu đồ như Recharts hoặc Chart.js)
- `DataTable` cho bảng tác động doanh thu
- `Badge` cho thay đổi phần trăm
- Bộ chọn khoảng thời gian (thành phần tùy chỉnh hoặc `DatePicker`)

#### Tương Tác Chính

1. Bộ chọn khoảng thời gian cập nhật tất cả biểu đồ và chỉ số
2. Di chuột qua điểm dữ liệu biểu đồ hiển thị tooltip với giá trị chính xác
3. Nhấn vào sản phẩm trong "Sản Phẩm Được Sửa Nhiều Nhất" chuyển đến danh sách Đơn Hàng đã lọc
4. Xuất biểu đồ dưới dạng PNG hoặc dữ liệu dưới dạng CSV
5. Bảng tác động doanh thu tự động tính toán dựa trên chi phí hỗ trợ mỗi yêu cầu do người bán cấu hình ($8-$15 mặc định)

#### Thích Ứng Di Động

- Biểu đồ xếp chồng dọc trong một cột
- Biểu đồ có thể cuộn ngang nếu cần
- Chỉ số tóm tắt sử dụng lưới 2x2
- Bảng dữ liệu có thể cuộn ngang

---

### Màn Hình 12: Chi Tiết Đơn Hàng -- Lịch Sử Chỉnh Sửa & Dòng Thời Gian Đơn Hàng

**Mục đích**: Hiển thị lịch sử chỉnh sửa và dòng thời gian đầy đủ cho một đơn hàng, cho phép người bán xem mọi thay đổi đã thực hiện và bởi ai.

#### Mô Tả Bố Cục

```
+-----------------------------------------------------------+
|  Avada Order Editing                                      |
|  [< Quay Lại Đơn Hàng]                                   |
|-----------------------------------------------------------+
|                                                           |
|  Đơn Hàng #1234                                          |
|  John Smith | john@example.com | 30 Th3, 2026 10:32 SA   |
|                                              [Xem trong   |
|                                               Shopify]    |
|                                                           |
|  THANH TRẠNG THÁI                                         |
|  +-------------------------------------------------------+|
|  | Trạng thái: [Đã Sửa] (Huy hiệu)                     ||
|  | Cửa sổ chỉnh sửa: Đã đóng (hết hạn 30 Th3, 1:32 CH) ||
|  | Tổng lượt chỉnh sửa: 2                               ||
|  | Thay đổi giá: -$29.99 (đã hoàn tiền)                 ||
|  +-------------------------------------------------------+|
|                                                           |
|  TRẠNG THÁI ĐƠN HÀNG HIỆN TẠI    HÀNH ĐỘNG CHỈNH SỬA   |
|  (Cột trái - 2/3)                 (Cột phải - 1/3)       |
|  +---------------------------+   +----------------------+ |
|  | Sản phẩm:                 |   | Hành Động Nhân Viên: | |
|  |                           |   |                      | |
|  | [Ảnh] Áo Thun Đỏ/TB      |   | [Chỉnh Sửa Đơn]     | |
|  |       $29.99 x 1          |   | (mở trình sửa admin) | |
|  |                           |   |                      | |
|  | [Ảnh] Hoodie Đen/TB       |   | [Hủy Đơn Hàng]      | |
|  |       $59.99 x 1          |   |                      | |
|  |                           |   | [Gửi Lại Link Sửa]  | |
|  | Tạm tính: $89.98          |   | (gửi email cho khách | |
|  | Thuế: $7.20               |   |  hàng với link trang  | |
|  | Vận chuyển: $5.99         |   |  chỉnh sửa)          | |
|  | Tổng: $103.17             |   |                      | |
|  |                           |   +----------------------+ |
|  | Địa Chỉ Giao Hàng:       |                            |
|  | 456 Oak Ave               |                            |
|  | Brooklyn, NY 11201        |                            |
|  +---------------------------+                            |
|                                                           |
|  DÒNG THỜI GIAN CHỈNH SỬA                                |
|  +-------------------------------------------------------+|
|  |  [Dòng thời gian - dọc]                               ||
|  |                                                       ||
|  |  O  30 Th3, 10:32 SA - Khách hàng đã sửa đơn hàng   ||
|  |  |  Thay đổi:                                          ||
|  |  |  - Địa chỉ: 123 Main St -> 456 Oak Ave             ||
|  |  |  - Áo Thun: Xanh/Lớn -> Đỏ/Trung Bình             ||
|  |  |  Thay đổi giá: $0.00                               ||
|  |  |  Sửa bởi: Khách hàng (tự phục vụ)                  ||
|  |  |                                                    ||
|  |  O  30 Th3, 10:45 SA - Khách hàng đã sửa đơn hàng   ||
|  |  |  Thay đổi:                                          ||
|  |  |  - Áo Thun: SL 2 -> 1 (đã xóa 1)                  ||
|  |  |  Thay đổi giá: -$29.99                             ||
|  |  |  Hoàn tiền: $29.99 về Visa kết thúc 4242            ||
|  |  |  Sửa bởi: Khách hàng (tự phục vụ)                  ||
|  |  |                                                    ||
|  |  O  30 Th3, 10:00 SA - Đơn hàng được đặt             ||
|  |  |  Tổng gốc: $149.96                                 ||
|  |  |  Sản phẩm: Áo Thun Xanh/Lớn x2, Hoodie Đen/TB x1 ||
|  |  |                                                    ||
|  +-------------------------------------------------------+|
+-----------------------------------------------------------+
```

#### Thành Phần Polaris

- `Page` với breadcrumb ("Quay Lại Đơn Hàng") và tiêu đề
- `Layout` với bố cục hai cột (2/3 + 1/3)
- `Card` cho trạng thái đơn hàng hiện tại, hành động chỉnh sửa, dòng thời gian
- `Badge` cho trạng thái đơn hàng
- `ResourceList` hoặc danh sách tùy chỉnh cho sản phẩm đơn hàng
- `Timeline` (thành phần tùy chỉnh) cho lịch sử chỉnh sửa
- `Button` cho hành động nhân viên (Chỉnh Sửa Đơn, Hủy, Gửi Lại Link)
- `Link` cho "Xem trong Shopify" (mở trang đơn hàng trong Shopify Admin)

#### Tương Tác Chính

1. "Xem trong Shopify" -> mở trang đơn hàng Shopify admin trong tab mới (qua App Bridge)
2. "Chỉnh Sửa Đơn" -> mở trình sửa nội tuyến (cùng khả năng như Màn Hình 3 nhưng trong admin)
3. "Hủy Đơn Hàng" -> hộp thoại xác nhận -> xử lý hủy đơn với hoàn tiền
4. "Gửi Lại Link Sửa" -> gửi email cho khách hàng với URL trang chỉnh sửa
5. Các mục dòng thời gian có thể mở rộng để hiển thị chi tiết đầy đủ của mỗi thay đổi
6. Mỗi mục dòng thời gian hiển thị ai đã thực hiện chỉnh sửa (khách hàng so với tên nhân viên)

#### Thích Ứng Di Động

- Bố cục hai cột xếp thành một cột (hành động bên dưới trạng thái đơn hàng)
- Các mục dòng thời gian có thể thu gọn (hiển thị tóm tắt, chạm để mở rộng)
- Nút "Xem trong Shopify" sử dụng điều hướng App Bridge trên admin di động
- Các nút hành động nhân viên được gom vào dropdown "Thêm hành động"

---

## Sơ Đồ Luồng Màn Hình

```
HÀNH TRÌNH KHÁCH HÀNG:
                                    
  Trang Cảm Ơn ──────┐            
  (Màn Hình 2)        │            
                      ▼            
  Trang Trạng   ──> Trang Chỉnh ──> Xác Nhận Chỉnh ──> Thành Công
  Thái Đơn Hàng     Sửa Đơn Hàng    Sửa (Màn Hình 4)          
  (Màn Hình 1)      (Màn Hình 3)                            
       │                 │                                  
       │                 ├──> Thanh Bên Bán Thêm (Màn Hình 6)    
       │                 │    (P1, hiển thị cùng Màn Hình 3)
       ▼                 │                                  
  Quy Trình Hủy ◄───────┘                                  
  (Màn Hình 5)                                               
       │                                                    
       ├──> Đề Nghị Giữ Chân (P1)                           
       │         │                                          
       │         ├──> Giữ Đơn Hàng (áp dụng giảm giá)         
       │         └──> Tiếp Tục Hủy                    
       └──> Đã Xác Nhận Hủy                               

HÀNH TRÌNH NGƯỜI BÁN:

  Bảng Điều Khiển ──> Danh Sách ──> Chi Tiết Đơn Hàng               
  (Màn Hình 7)        Đơn Hàng      (Màn Hình 12)                
                      (Màn Hình 8)       │                       
       │                            ├──> Sửa Nội Tuyến        
       │                            └──> Hủy / Gửi Lại    
       │                                                    
       ├──> Quy Tắc Chỉnh Sửa (Màn Hình 9)                          
       ├──> Phân Tích (Màn Hình 11)                          
       └──> Cài Đặt (Màn Hình 10)                           
```

---

## Nguyên Tắc Thiết Kế

1. **Rõ ràng hơn là phức tạp**: Mọi màn hình phải dễ hiểu ngay lập tức. Không dùng thuật ngữ chuyên môn, không mơ hồ về những gì sẽ xảy ra khi nhấn nút.

2. **Xây dựng niềm tin qua minh bạch**: Luôn hiển thị cho khách hàng chính xác những gì sẽ thay đổi, chi phí bao nhiêu và cách hoàn tiền hoạt động. Không bất ngờ.

3. **Ưu tiên di động cho khách hàng**: Hơn 60% người mua sắm sử dụng di động. Mọi màn hình dành cho khách hàng phải hoạt động hoàn hảo trên màn hình nhỏ.

4. **Hiệu quả quản trị**: Người bán phải có thể hiểu hoạt động chỉnh sửa trong vòng dưới 10 giây từ bảng điều khiển. Các hành động phổ biến nên cách 1-2 lần nhấn.

5. **Tiết lộ dần dần**: Hiển thị thông tin cần thiết trước, chi tiết khi có yêu cầu. Sử dụng phần thu gọn, modal và điều hướng chi tiết.

6. **Nhất quán với Shopify**: Màn hình admin tuân theo các mẫu Polaris v12+ chính xác. Màn hình dành cho khách hàng phù hợp với thương hiệu cửa hàng của người bán.

7. **Ngăn ngừa lỗi hơn xử lý lỗi**: Sử dụng bước xác nhận, trạng thái vô hiệu hóa cho tùy chọn không khả dụng, và thông báo xác thực rõ ràng để ngăn ngừa sai sót.

---

*Kết thúc Mô Tả Màn Hình & Wireframe -- Avada Order Editing v1.0*
