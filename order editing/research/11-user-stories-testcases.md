# Câu chuyện người dùng & Trường hợp kiểm thử
# Avada Order Editing

---

## Tính năng P0 (MVP)

---

### Tính năng 1: Khách hàng tự chỉnh sửa địa chỉ

**Câu chuyện người dùng (US-01)**
Với tư cách là **khách hàng**, tôi muốn chỉnh sửa địa chỉ giao hàng sau khi đặt hàng, để gói hàng của tôi đến đúng địa chỉ mà không cần liên hệ bộ phận hỗ trợ.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-1.1 | Đơn hàng chưa được thực hiện và nằm trong khung thời gian chỉnh sửa | Khách hàng nhấn "Chỉnh sửa đơn hàng" và thay đổi địa chỉ giao hàng | Địa chỉ giao hàng của đơn hàng được cập nhật trên Shopify và hiển thị xác nhận |
| AC-1.2 | Đơn hàng chưa được thực hiện và nằm trong khung thời gian chỉnh sửa | Khách hàng gửi địa chỉ thiếu các trường bắt buộc (thành phố, mã bưu chính) | Lỗi xác thực nội dòng được hiển thị cho mỗi trường bị thiếu |
| AC-1.3 | Khung thời gian chỉnh sửa của đơn hàng đã hết hạn | Khách hàng truy cập trang chỉnh sửa | Các trường địa chỉ bị vô hiệu hóa và hiển thị thông báo "Khung thời gian chỉnh sửa đã đóng" |
| AC-1.4 | Đơn hàng đã được thực hiện một phần | Khách hàng cố gắng chỉnh sửa địa chỉ | Hệ thống hiển thị "Đơn hàng này đã bắt đầu thực hiện và không thể thay đổi địa chỉ nữa" |
| AC-1.5 | Đơn hàng có cập nhật địa chỉ hợp lệ | Xác nhận chỉnh sửa | Cả khách hàng và người bán đều nhận được thông báo qua email |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-1.1 | Kịch bản thành công | Chỉnh sửa địa chỉ thành công | 1. Khách hàng mở trang trạng thái đơn hàng 2. Nhấn "Chỉnh sửa đơn hàng" 3. Thay đổi địa chỉ đường 4. Nhấn "Lưu thay đổi" | Địa chỉ được cập nhật, hiển thị xác nhận, gửi email |
| TC-1.2 | Kịch bản thành công | Chỉnh sửa tất cả các trường địa chỉ | Thay đổi đường, thành phố, bang, mã bưu chính, quốc gia | Tất cả các trường được cập nhật trong đơn hàng Shopify |
| TC-1.3 | Trường hợp biên | Khung thời gian chỉnh sửa hết hạn trong khi đang chỉnh sửa | Khách hàng mở biểu mẫu chỉnh sửa, đợi đến khi khung thời gian hết hạn, sau đó gửi | Gửi bị từ chối với thông báo "Khung thời gian chỉnh sửa đã hết hạn" |
| TC-1.4 | Trường hợp biên | Đơn hàng được thực hiện giữa lúc tải trang và gửi | Người bán thực hiện đơn hàng trong khi khách hàng đang chỉnh sửa | Gửi bị từ chối với thông báo "Đơn hàng đã được giao" |
| TC-1.5 | Trường hợp biên | Địa chỉ quốc tế với ký tự đặc biệt | Nhập địa chỉ có dấu, umlaut, ký tự CJK | Các ký tự được bảo toàn chính xác trong Shopify |
| TC-1.6 | Lỗi | Các trường bắt buộc để trống | Gửi với thành phố và mã bưu chính trống | Lỗi xác thực nội dòng trên các trường thành phố và mã bưu chính |
| TC-1.7 | Lỗi | Kết hợp quốc gia/mã bưu chính không hợp lệ | Nhập quốc gia Mỹ với định dạng mã bưu chính không phải Mỹ | Lỗi xác thực: "Mã bưu chính không hợp lệ cho quốc gia đã chọn" |
| TC-1.8 | Lỗi | Shopify API gặp lỗi | Shopify trả về lỗi 500 khi cập nhật địa chỉ | Thông báo lỗi thân thiện: "Đã xảy ra lỗi. Vui lòng thử lại." với nút thử lại |
| TC-1.9 | Trường hợp biên | Gửi cùng một địa chỉ | Khách hàng lưu mà không thay đổi gì | Không gọi API, thông báo: "Không phát hiện thay đổi nào" |
| TC-1.10 | Trường hợp biên | Địa chỉ hộp thư bưu điện khi người bán không cho phép | Người bán đã bật quy tắc "không nhận hộp thư bưu điện", khách hàng nhập hộp thư bưu điện | Hiển thị lỗi xác thực |

---

### Tính năng 2: Khách hàng tự đổi sản phẩm/biến thể

**Câu chuyện người dùng (US-02)**
Với tư cách là **khách hàng**, tôi muốn đổi biến thể sản phẩm (kích thước, màu sắc) trên đơn hàng, để tôi nhận được đúng sản phẩm mà không cần liên hệ bộ phận hỗ trợ.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-2.1 | Đơn hàng chưa thực hiện nằm trong khung thời gian chỉnh sửa | Khách hàng chọn biến thể khác (ví dụ: size M sang L) của cùng sản phẩm | Mục hàng được cập nhật với biến thể mới |
| AC-2.2 | Biến thể mới có giá cao hơn | Khách hàng xác nhận đổi | Hiển thị tóm tắt chênh lệch giá; gửi hóa đơn cho số tiền bổ sung |
| AC-2.3 | Biến thể mới có giá thấp hơn | Khách hàng xác nhận đổi | Hoàn tiền chênh lệch được tự động thực hiện |
| AC-2.4 | Biến thể mới hết hàng | Khách hàng cố gắng chọn | Biến thể hiển thị là không khả dụng/bị mờ |
| AC-2.5 | Người bán đã hạn chế đổi sản phẩm này qua quy tắc chỉnh sửa | Khách hàng mở trang chỉnh sửa | Tùy chọn đổi bị ẩn đối với sản phẩm bị hạn chế |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-2.1 | Kịch bản thành công | Đổi biến thể cùng giá | Đổi size M sang L (cùng giá) | Biến thể được cập nhật, không tính phí, gửi email xác nhận |
| TC-2.2 | Kịch bản thành công | Đổi sang biến thể giá cao hơn | Đổi Cotton sang Silk (+$15) | Hiển thị chênh lệch giá, khách hàng xác nhận, gửi hóa đơn $15 |
| TC-2.3 | Kịch bản thành công | Đổi sang biến thể giá thấp hơn | Đổi XL sang S (-$5) | Hiển thị chênh lệch giá, hoàn $5 khi xác nhận |
| TC-2.4 | Trường hợp biên | Đổi khi chỉ còn 1 đơn vị biến thể mới | Đổi sang biến thể có tồn kho = 1 | Đổi thành công, tồn kho giảm xuống 0 |
| TC-2.5 | Trường hợp biên | Hai khách hàng đổi sang cùng biến thể cuối cùng còn hàng đồng thời | Khách hàng A và B đều cố gắng đổi sang đơn vị cuối cùng | Người xác nhận trước thành công; người thứ hai nhận lỗi "Hết hàng" |
| TC-2.6 | Trường hợp biên | Biến thể với nhiều tùy chọn (kích thước + màu sắc) | Đổi từ "Đỏ / M" sang "Xanh / L" | Cả hai giá trị tùy chọn được cập nhật chính xác |
| TC-2.7 | Trường hợp biên | Sản phẩm chỉ có một biến thể | Khách hàng mở chỉnh sửa cho sản phẩm chỉ có một biến thể | Tùy chọn đổi bị ẩn (không có gì để đổi) |
| TC-2.8 | Lỗi | Shopify orderEditBegin thất bại | API trả về "Không thể chỉnh sửa đơn hàng" | Hiển thị thông báo lỗi, không áp dụng thay đổi một phần |
| TC-2.9 | Lỗi | orderEditCommit thất bại sau addVariant | Commit trả về lỗi | Chỉnh sửa được hoàn tác, khách hàng được thông báo, không tính phí |
| TC-2.10 | Trường hợp biên | Đổi biến thể trên đơn hàng có mã giảm giá | Đơn hàng có mã giảm 20%, đổi sang biến thể khác | Giảm giá vẫn được áp dụng cho biến thể mới với tỷ lệ phần trăm chính xác |
| TC-2.11 | Trường hợp biên | Đổi lại biến thể ban đầu | Khách hàng đổi M->L, sau đó L->M trước khi xác nhận | Không có thay đổi ròng, trạng thái ban đầu được khôi phục |

---

### Tính năng 3: Khách hàng tự điều chỉnh số lượng

**Câu chuyện người dùng (US-03)**
Với tư cách là **khách hàng**, tôi muốn thay đổi số lượng sản phẩm trong đơn hàng, để tôi có thể thêm hoặc bớt sản phẩm trước khi giao hàng.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-3.1 | Đơn hàng chưa thực hiện nằm trong khung thời gian chỉnh sửa | Khách hàng tăng số lượng của một mục hàng | Số lượng được cập nhật và chênh lệch giá được tính toán |
| AC-3.2 | Đơn hàng chưa thực hiện nằm trong khung thời gian chỉnh sửa | Khách hàng giảm số lượng (nhưng không xuống 0) | Số lượng được cập nhật và tính toán hoàn tiền một phần |
| AC-3.3 | Khách hàng giảm số lượng xuống 0 | Khách hàng đặt số lượng về 0 | Mục hàng bị xóa (tương đương với xóa sản phẩm) |
| AC-3.4 | Tăng số lượng vượt quá tồn kho khả dụng | Khách hàng cố gắng thêm nhiều hơn số hàng có sẵn | Hiển thị lỗi "Chỉ còn X đơn vị khả dụng" |
| AC-3.5 | Người bán đã đặt quy tắc số lượng tối đa | Khách hàng cố gắng vượt quá giới hạn | Hiển thị lỗi "Tối đa X đơn vị mỗi đơn hàng cho sản phẩm này" |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-3.1 | Kịch bản thành công | Tăng số lượng thêm 1 | Thay đổi số lượng từ 1 sang 2 cho sản phẩm $25 | Hiển thị chênh lệch giá +$25, gửi hóa đơn khi xác nhận |
| TC-3.2 | Kịch bản thành công | Giảm số lượng | Thay đổi số lượng từ 3 sang 1 cho sản phẩm $25 | Hiển thị chênh lệch giá -$50, hoàn tiền khi xác nhận |
| TC-3.3 | Kịch bản thành công | Xóa sản phẩm bằng cách đặt số lượng=0 | Đặt số lượng về 0 | Mục hàng bị xóa, hoàn tiền toàn bộ giá sản phẩm |
| TC-3.4 | Trường hợp biên | Giảm xuống 0 trên sản phẩm cuối cùng | Đơn hàng có 1 mục hàng, khách hàng đặt số lượng về 0 | Chuyển hướng đến quy trình hủy đơn (không thể có đơn hàng trống) |
| TC-3.5 | Trường hợp biên | Tăng vượt quá tồn kho | Tồn kho = 3, khách hàng cố gắng đặt số lượng = 5 | Bộ tăng giảm giới hạn ở 3 với thông báo "Chỉ còn 3 sản phẩm" |
| TC-3.6 | Trường hợp biên | Số lượng tối thiểu của người bán = 2 | Khách hàng cố gắng đặt số lượng về 1 | Lỗi: "Yêu cầu tối thiểu 2 đơn vị cho sản phẩm này" |
| TC-3.7 | Trường hợp biên | Thay đổi số lượng với giảm giá phần trăm | Sản phẩm giảm 20%, thay đổi số lượng từ 1 sang 3 | Giảm giá được áp dụng chính xác cho cả 3 đơn vị |
| TC-3.8 | Lỗi | Tồn kho thay đổi giữa lúc tải trang và gửi | Trang hiển thị 5 sản phẩm khả dụng, nhưng giảm xuống 2 trước khi gửi | Lỗi khi gửi: "Chỉ còn 2 đơn vị khả dụng" |
| TC-3.9 | Trường hợp biên | Tăng số lượng lớn | Thay đổi số lượng từ 1 sang 100 | Phụ thuộc vào tồn kho; nếu có sẵn, chênh lệch giá được tính chính xác |
| TC-3.10 | Trường hợp biên | Sản phẩm miễn phí (giá = $0) | Thay đổi số lượng sản phẩm miễn phí | Không có chênh lệch giá, số lượng được cập nhật |

---

### Tính năng 4: Khách hàng tự hủy đơn hàng

**Câu chuyện người dùng (US-04)**
Với tư cách là **khách hàng**, tôi muốn hủy đơn hàng trong khung thời gian cho phép, để tôi có thể nhận hoàn tiền mà không cần chờ bộ phận hỗ trợ.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-4.1 | Đơn hàng chưa thực hiện nằm trong khung thời gian hủy | Khách hàng nhấn "Hủy đơn hàng" và xác nhận | Đơn hàng bị hủy trên Shopify, hoàn tiền toàn bộ được thực hiện, và tồn kho được nhập lại |
| AC-4.2 | Đơn hàng ngoài khung thời gian hủy | Khách hàng cố gắng hủy | Hiển thị thông báo "Khung thời gian hủy đã đóng. Vui lòng liên hệ bộ phận hỗ trợ." |
| AC-4.3 | Đơn hàng đã thực hiện một phần | Khách hàng cố gắng hủy | Hiển thị thông báo "Đơn hàng này đã bắt đầu giao hàng và không thể hủy" |
| AC-4.4 | Người bán đã tắt tính năng hủy đơn của khách hàng | Khách hàng xem widget chỉnh sửa | Nút/liên kết "Hủy đơn hàng" không được hiển thị |
| AC-4.5 | Khách hàng hủy đơn hàng | Quá trình hủy được xử lý | Cả khách hàng và người bán đều nhận được email xác nhận hủy |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-4.1 | Kịch bản thành công | Hủy đơn hàng chưa thực hiện | 1. Nhấn "Hủy đơn hàng" 2. Chọn lý do 3. Xác nhận hủy | Đơn hàng bị hủy, hoàn tiền toàn bộ, tồn kho được nhập lại |
| TC-4.2 | Kịch bản thành công | Hủy đơn hàng nhiều sản phẩm | Hủy đơn hàng có 3 mục hàng | Tất cả sản phẩm được hoàn tiền, tất cả tồn kho được nhập lại |
| TC-4.3 | Trường hợp biên | Hủy sau khi chỉnh sửa | Khách hàng chỉnh sửa đơn hàng (đổi hàng), sau đó hủy | Hủy sử dụng trạng thái hiện tại (đã chỉnh sửa), số tiền hoàn chính xác |
| TC-4.4 | Trường hợp biên | Hủy đơn hàng thanh toán bằng thẻ quà tặng + thẻ tín dụng | Đơn hàng chia trên nhiều phương thức thanh toán | Mỗi phương thức thanh toán được hoàn tiền theo tỷ lệ |
| TC-4.5 | Trường hợp biên | Khung thời gian hết hạn trong quy trình hủy | Khách hàng đang ở màn hình xác nhận khi khung thời gian hết hạn | Hủy bị từ chối: "Khung thời gian hủy đã hết hạn" |
| TC-4.6 | Trường hợp biên | Người bán thực hiện đơn hàng trong quy trình hủy | Người bán giao hàng trong khi khách hàng đang ở trang hủy | Hủy bị từ chối: "Đơn hàng đã được giao" |
| TC-4.7 | Lỗi | Shopify orderCancel API gặp lỗi | API trả về lỗi 500 | Lỗi: "Không thể hủy. Vui lòng thử lại hoặc liên hệ bộ phận hỗ trợ." |
| TC-4.8 | Lỗi | Xử lý hoàn tiền thất bại | Đơn hàng bị hủy nhưng hoàn tiền thất bại | Đơn hàng bị hủy, người bán được thông báo về khoản hoàn tiền đang chờ, khách hàng thấy "Hoàn tiền đang được xử lý" |
| TC-4.9 | Trường hợp biên | Nhấn đúp nút hủy | Khách hàng nhấn xác nhận hai lần liên tiếp | Bất biến: chỉ xử lý một lần hủy |
| TC-4.10 | Trường hợp biên | Hủy đơn hàng tổng $0 (được giảm giá hoàn toàn) | Hủy đơn hàng miễn phí | Đơn hàng bị hủy, không cần hoàn tiền, tồn kho được nhập lại |

---

### Tính năng 5: Người bán chỉnh sửa đơn hàng từ trang quản trị

**Câu chuyện người dùng (US-13)**
Với tư cách là **người bán**, tôi muốn tự chỉnh sửa đơn hàng từ bảng điều khiển quản trị, để tôi có thể xử lý nhanh các yêu cầu qua điện thoại/email từ khách hàng.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-5.1 | Người bán đã đăng nhập vào ứng dụng quản trị | Họ chọn một đơn hàng và nhấn "Chỉnh sửa đơn hàng" | Biểu mẫu chỉnh sửa mở ra với các mục hàng, số lượng và địa chỉ hiện tại của đơn hàng |
| AC-5.2 | Người bán thực hiện thay đổi và lưu | Các thay đổi được gửi | Đơn hàng được cập nhật trên Shopify qua orderEditBegin/Commit và bản ghi được lưu |
| AC-5.3 | Người bán bật "Thông báo khách hàng" | Chỉnh sửa được lưu | Khách hàng nhận được thông báo qua email về các thay đổi |
| AC-5.4 | Người bán thêm ghi chú nhân viên | Chỉnh sửa được lưu | Ghi chú được lưu trong bản ghi orderEdit và hiển thị trong lịch sử chỉnh sửa |
| AC-5.5 | Đơn hàng đã được thực hiện | Người bán cố gắng chỉnh sửa | Nút chỉnh sửa bị vô hiệu hóa với tooltip "Không thể chỉnh sửa đơn hàng đã thực hiện" |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-5.1 | Kịch bản thành công | Người bán đổi biến thể | Mở đơn hàng, đổi size M sang L, lưu | Biến thể được cập nhật trên Shopify, lịch sử chỉnh sửa được ghi lại |
| TC-5.2 | Kịch bản thành công | Người bán thay đổi số lượng | Mở đơn hàng, thay đổi số lượng từ 2 sang 3, lưu | Số lượng được cập nhật, chênh lệch giá được tính, gửi hóa đơn cho khách hàng |
| TC-5.3 | Kịch bản thành công | Người bán thêm sản phẩm mới | Mở đơn hàng, tìm kiếm sản phẩm, thêm vào đơn hàng, lưu | Mục hàng mới được thêm qua orderEditAddVariant |
| TC-5.4 | Kịch bản thành công | Người bán xóa mục hàng | Mở đơn hàng, nhấn xóa trên mục hàng, lưu | Sản phẩm bị xóa, hoàn tiền tự động |
| TC-5.5 | Kịch bản thành công | Người bán chỉnh sửa địa chỉ | Mở đơn hàng, thay đổi các trường địa chỉ, lưu | Địa chỉ được cập nhật qua orderUpdate mutation |
| TC-5.6 | Trường hợp biên | Người bán chỉnh sửa đơn hàng mà khách hàng cũng đang chỉnh sửa | Cả hai mở biểu mẫu chỉnh sửa đồng thời | Người commit trước thành công, người thứ hai nhận lỗi xung đột |
| TC-5.7 | Trường hợp biên | Người bán chỉnh sửa đơn hàng ngoài khung thời gian chỉnh sửa của khách hàng | Khung thời gian chỉnh sửa đã hết nhưng người bán muốn chỉnh sửa | Người bán vẫn có thể chỉnh sửa (không giới hạn thời gian cho người bán) |
| TC-5.8 | Lỗi | Token phiên của người bán hết hạn trong khi chỉnh sửa | Token hết hạn giữa chừng | App Bridge xác thực lại, trạng thái chỉnh sửa được bảo toàn |
| TC-5.9 | Trường hợp biên | Người bán thêm sản phẩm rồi xóa trước khi lưu | Thêm sản phẩm, sau đó xóa | Không có thay đổi ròng; hiển thị thông báo "Không có thay đổi để lưu" |
| TC-5.10 | Trường hợp biên | Chỉnh sửa đơn hàng có hơn 50 mục hàng | Mở đơn hàng lớn để chỉnh sửa | Trang tải trong vòng 3 giây, tất cả sản phẩm có thể chỉnh sửa |

---

### Tính năng 6: Kiểm soát khung thời gian

**Câu chuyện người dùng (US-09)**
Với tư cách là **người bán**, tôi muốn đặt khung thời gian cho phép khách hàng chỉnh sửa sau khi đặt hàng, để các chỉnh sửa không ảnh hưởng đến quy trình thực hiện đơn hàng.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-6.1 | Người bán đang ở trang Cài đặt | Họ đặt khung thời gian chỉnh sửa là "2 giờ" | Tất cả đơn hàng mới có khung thời gian chỉnh sửa 2 giờ kể từ thời điểm tạo đơn |
| AC-6.2 | Loại khung thời gian là "before_fulfillment" | Một đơn hàng được tạo | Khung thời gian chỉnh sửa mở cho đến khi bắt đầu thực hiện đơn, bất kể thời gian |
| AC-6.3 | Loại khung thời gian là "minutes" và đặt là 120 | 121 phút trôi qua kể từ khi tạo đơn | Trạng thái khung thời gian chỉnh sửa chuyển thành "đã đóng" |
| AC-6.4 | Người bán thay đổi khung thời gian từ 1 giờ sang 3 giờ | Các đơn hàng hiện có khung thời gian 1 giờ | Các đơn hàng hiện có giữ nguyên khung 1 giờ; chỉ đơn hàng mới có khung 3 giờ |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-6.1 | Kịch bản thành công | Đặt khung thời gian 30 phút | Cài đặt > Khung thời gian > 30 phút > Lưu | Đơn hàng mới có thể chỉnh sửa trong 30 phút |
| TC-6.2 | Kịch bản thành công | Đặt chế độ "cho đến khi thực hiện" | Cài đặt > Khung thời gian > "Cho đến khi bắt đầu thực hiện" > Lưu | Đơn hàng vẫn có thể chỉnh sửa cho đến khi bắt đầu thực hiện |
| TC-6.3 | Kịch bản thành công | Khung thời gian tự động hết hạn | Tạo đơn hàng, đợi khung thời gian hết hạn | Hàm lập lịch đóng khung thời gian chỉnh sửa, widget hiển thị "đã hết hạn" |
| TC-6.4 | Trường hợp biên | Khung thời gian rất ngắn (5 phút) | Đặt khung thời gian 5 phút | Khung thời gian hoạt động chính xác trong 5 phút |
| TC-6.5 | Trường hợp biên | Khung thời gian rất dài (72 giờ) | Đặt khung thời gian 72 giờ | Khung thời gian hoạt động chính xác trong 72 giờ |
| TC-6.6 | Trường hợp biên | Xem xét múi giờ | Người bán ở UTC+9, khách hàng ở UTC-5 | Khung thời gian được tính từ thời điểm tạo đơn theo UTC, không phụ thuộc múi giờ |
| TC-6.7 | Trường hợp biên | Thay đổi khung thời gian khi có đơn hàng đang mở | Thay đổi từ 2 giờ sang 30 phút khi đơn hàng có khung 2 giờ | Đơn hàng hiện có không bị ảnh hưởng, đơn hàng mới có khung 30 phút |
| TC-6.8 | Lỗi | Giá trị khung thời gian không hợp lệ (0 hoặc âm) | Nhập 0 hoặc -1 vào trường khung thời gian | Lỗi xác thực: "Khung thời gian phải ít nhất 5 phút" |

---

### Tính năng 7: Tự động hoàn tiền/tính phí khi thay đổi giá

**Câu chuyện người dùng (US-10)**
Với tư cách là **người bán**, tôi muốn các chỉnh sửa tự động xử lý hoàn tiền và phí bổ sung, để tôi không phải xử lý thanh toán thủ công.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-7.1 | Chỉnh sửa dẫn đến tổng thấp hơn | Chỉnh sửa được xác nhận | Hoàn tiền tự động được thực hiện về phương thức thanh toán gốc |
| AC-7.2 | Chỉnh sửa dẫn đến tổng cao hơn | Chỉnh sửa được xác nhận | Hóa đơn được gửi cho khách hàng cho số tiền bổ sung |
| AC-7.3 | Chỉnh sửa không thay đổi giá | Chỉnh sửa được xác nhận | Không thực hiện hành động thanh toán nào |
| AC-7.4 | Hoàn tiền thất bại | Hệ thống cố gắng hoàn tiền | Người bán được thông báo; chỉnh sửa vẫn được áp dụng; hoàn tiền được thử lại |
| AC-7.5 | Tóm tắt chênh lệch giá được hiển thị trước khi xác nhận | Khách hàng xem xét các thay đổi | Hiển thị rõ ràng tổng ban đầu, tổng mới và chênh lệch |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-7.1 | Kịch bản thành công | Hoàn tiền khi hạ cấp | Đổi sản phẩm $50 sang sản phẩm $30 | Hoàn tiền $20 tự động |
| TC-7.2 | Kịch bản thành công | Tính phí khi nâng cấp | Đổi sản phẩm $30 sang sản phẩm $50 | Gửi hóa đơn $20 cho khách hàng |
| TC-7.3 | Kịch bản thành công | Không thay đổi giá | Đổi biến thể cùng giá | Không thực hiện hành động thanh toán, chỉnh sửa được xác nhận |
| TC-7.4 | Kịch bản thành công | Nhiều thay đổi với hoàn tiền ròng | Xóa sản phẩm $20, thêm sản phẩm $10 | Hoàn tiền ròng $10 |
| TC-7.5 | Trường hợp biên | Hoàn tiền về thẻ tín dụng hết hạn | Thẻ lưu trữ đã hết hạn | Shopify xử lý qua phương thức thanh toán gốc dự phòng |
| TC-7.6 | Trường hợp biên | Phần lẻ xu trong chênh lệch giá | Thay đổi dẫn đến chênh lệch $0.005 | Làm tròn đến xu gần nhất theo hành vi Shopify |
| TC-7.7 | Trường hợp biên | Tính lại thuế khi thay đổi địa chỉ | Thay đổi địa chỉ sang khu vực thuế khác | Thuế được tính lại, chênh lệch giá bao gồm thay đổi thuế |
| TC-7.8 | Lỗi | Cổng thanh toán hết thời gian | Cổng hết thời gian khi tính phí | Cơ chế thử lại, khách hàng được thông báo về khoản phí đang chờ |
| TC-7.9 | Trường hợp biên | Vượt ngưỡng miễn phí vận chuyển | Xóa sản phẩm, tổng giảm dưới ngưỡng miễn phí vận chuyển | Phí vận chuyển được thêm vào tổng mới nếu áp dụng |
| TC-7.10 | Trường hợp biên | Định dạng tiền tệ | Tiền tệ cửa hàng là JPY (không có số thập phân) | Chênh lệch giá hiển thị chính xác không có chữ số thập phân |

---

### Tính năng 8: Nhập lại tồn kho khi hủy/chỉnh sửa

**Câu chuyện người dùng (US-11)**
Với tư cách là **người bán**, tôi muốn tồn kho tự động được nhập lại khi sản phẩm bị xóa hoặc đổi, để mức tồn kho luôn chính xác.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-8.1 | Một mục hàng bị xóa khỏi đơn hàng | Chỉnh sửa được xác nhận | Tồn kho của sản phẩm bị xóa được nhập lại tại vị trí ban đầu |
| AC-8.2 | Một biến thể được đổi | Chỉnh sửa được xác nhận | Biến thể cũ được nhập lại và biến thể mới bị trừ đi |
| AC-8.3 | Một đơn hàng bị hủy | Hủy được xác nhận | Tất cả mục hàng được nhập lại tồn kho |
| AC-8.4 | Sản phẩm không theo dõi tồn kho | Một sản phẩm bị xóa | Không thực hiện thao tác tồn kho nào (không có lỗi) |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-8.1 | Kịch bản thành công | Xóa sản phẩm nhập lại tồn kho | Xóa 2 đơn vị SKU-A (tồn kho là 10) | Tồn kho SKU-A trở thành 12 |
| TC-8.2 | Kịch bản thành công | Đổi nhập lại cũ, trừ đi mới | Đổi SKU-A (tồn kho 10) sang SKU-B (tồn kho 5) | SKU-A trở thành 11, SKU-B trở thành 4 |
| TC-8.3 | Kịch bản thành công | Hủy nhập lại tất cả | Hủy đơn hàng có 3 sản phẩm (2x SKU-A, 1x SKU-B) | SKU-A += 2, SKU-B += 1 |
| TC-8.4 | Trường hợp biên | Tồn kho nhiều vị trí | Cửa hàng có vị trí kho + bán lẻ | Tồn kho được nhập lại tại vị trí đã được phân bổ |
| TC-8.5 | Trường hợp biên | Sản phẩm bị xóa sau khi đặt hàng | Sản phẩm không còn tồn tại | Nhập lại tồn kho bị bỏ qua im lặng, chỉnh sửa vẫn thành công |
| TC-8.6 | Trường hợp biên | Không theo dõi tồn kho | Sản phẩm đã tắt "Theo dõi tồn kho" | Không thực hiện thao tác nhập lại, không có lỗi |
| TC-8.7 | Trường hợp biên | Giảm số lượng (xóa một phần) | Thay đổi số lượng từ 3 sang 1 | 2 đơn vị được nhập lại tồn kho |
| TC-8.8 | Lỗi | API tồn kho thất bại | Shopify điều chỉnh tồn kho trả về lỗi | Chỉnh sửa vẫn được xác nhận, nhập lại tồn kho được thử lại qua tác vụ nền |

---

### Tính năng 9: Thông báo email cho chỉnh sửa

**Câu chuyện người dùng (US-12)**
Với tư cách là **người bán**, tôi muốn khách hàng và nhân viên nhận được thông báo email khi có chỉnh sửa, để mọi người đều được cập nhật thông tin.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-9.1 | Khách hàng chỉnh sửa đơn hàng | Chỉnh sửa được xác nhận | Khách hàng nhận được email "Đơn hàng đã cập nhật" với chi tiết thay đổi |
| AC-9.2 | Khách hàng chỉnh sửa đơn hàng | Chỉnh sửa được xác nhận | Người bán nhận được email thông báo (nếu đã bật) |
| AC-9.3 | Khách hàng hủy đơn hàng | Quá trình hủy được xử lý | Cả khách hàng và người bán đều nhận được email hủy |
| AC-9.4 | Người bán chỉnh sửa đơn hàng với "Thông báo khách hàng" được chọn | Chỉnh sửa được xác nhận | Khách hàng nhận được email "Đơn hàng đã cập nhật" |
| AC-9.5 | Người bán đã tắt thông báo cho người bán | Chỉnh sửa được thực hiện | Không gửi email cho người bán |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-9.1 | Kịch bản thành công | Thông báo chỉnh sửa của khách hàng | Khách hàng đổi biến thể, xác nhận | Khách hàng nhận email với chi tiết biến thể cũ và mới |
| TC-9.2 | Kịch bản thành công | Thông báo cho người bán | Khách hàng chỉnh sửa đơn hàng | Người bán nhận email với số đơn hàng, tóm tắt thay đổi, tên khách hàng |
| TC-9.3 | Kịch bản thành công | Thông báo hủy | Khách hàng hủy đơn hàng | Cả hai bên nhận email hủy với số tiền hoàn |
| TC-9.4 | Kịch bản thành công | Người bán chỉnh sửa với thông báo | Người bán chỉnh sửa đơn hàng, chọn "Thông báo khách hàng" | Khách hàng nhận email về thay đổi do người bán thực hiện |
| TC-9.5 | Trường hợp biên | Email khách hàng không hợp lệ | Email khách hàng không hợp lệ | Gửi email thất bại im lặng, chỉnh sửa vẫn được xác nhận, lỗi được ghi log |
| TC-9.6 | Trường hợp biên | Nhiều chỉnh sửa liên tiếp | Khách hàng chỉnh sửa 3 lần trong 5 phút | Mỗi chỉnh sửa kích hoạt thông báo riêng (không gộp) |
| TC-9.7 | Trường hợp biên | Dịch vụ email ngừng hoạt động | SendGrid/Mailgun trả về lỗi 500 | Email được xếp hàng để thử lại qua Pub/Sub, chỉnh sửa không bị chặn |
| TC-9.8 | Trường hợp biên | Mô tả thay đổi rất dài | Hơn 20 thay đổi trong một lần chỉnh sửa | Email cắt ngắn với liên kết "Xem tất cả thay đổi" |

---

### Tính năng 10: Widget trang trạng thái đơn hàng (Theme Extension)

**Câu chuyện người dùng (US-06)**
Với tư cách là **khách hàng**, tôi muốn truy cập chỉnh sửa đơn hàng từ Trang trạng thái đơn hàng, để tôi có thể thực hiện thay đổi dễ dàng sau khi thanh toán.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-10.1 | Đơn hàng nằm trong khung thời gian chỉnh sửa | Khách hàng xem Trang trạng thái đơn hàng | Widget "Chỉnh sửa đơn hàng" hiển thị với bộ đếm ngược |
| AC-10.2 | Khung thời gian chỉnh sửa đã hết | Khách hàng xem Trang trạng thái đơn hàng | Widget hiển thị "Khung thời gian chỉnh sửa đã đóng" với các nút bị vô hiệu hóa |
| AC-10.3 | Đơn hàng đã được thực hiện | Khách hàng xem Trang trạng thái đơn hàng | Widget hiển thị "Đơn hàng này đã được giao" |
| AC-10.4 | Người bán đã cài đặt và kích hoạt ứng dụng | Theme đã bật app blocks | Widget hiển thị tại vị trí app block được chỉ định |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-10.1 | Kịch bản thành công | Widget hiển thị với bộ đếm ngược | Truy cập trang trạng thái đơn hàng cho đơn có thể chỉnh sửa | Widget hiển thị với nút "Chỉnh sửa đơn hàng" và bộ đếm ngược |
| TC-10.2 | Kịch bản thành công | Nhấn "Chỉnh sửa đơn hàng" | Nhấn nút chính | Chuyển hướng đến trang chỉnh sửa đơn hàng với ngữ cảnh đơn hàng |
| TC-10.3 | Trường hợp biên | Bộ đếm ngược về 0 khi đang xem | Bộ đếm hết hạn khi trang đang mở | Widget chuyển sang trạng thái "đã hết hạn" mà không cần tải lại trang |
| TC-10.4 | Trường hợp biên | Ứng dụng bị gỡ nhưng block vẫn còn | Người bán gỡ cài đặt ứng dụng | Widget được ẩn một cách nhẹ nhàng (không làm hỏng bố cục) |
| TC-10.5 | Trường hợp biên | Nhiều tab trình duyệt | Trang trạng thái đơn hàng mở ở 2 tab, chỉnh sửa ở một tab | Tab thứ hai phản ánh trạng thái cập nhật ở lần gọi API tiếp theo |
| TC-10.6 | Trường hợp biên | Theme không hỗ trợ app block | Theme cổ điển không có app blocks | Scripttag dự phòng hiển thị widget |
| TC-10.7 | Kịch bản thành công | Hiển thị trên di động | Xem trên điện thoại rộng 375px | Các nút xếp dọc, bộ đếm ngược hiển thị, sử dụng đầy đủ |

---

### Tính năng 11: Widget trang cảm ơn (Theme Extension)

**Câu chuyện người dùng (US-07)**
Với tư cách là **khách hàng**, tôi muốn truy cập chỉnh sửa đơn hàng từ Trang cảm ơn, để tôi có thể sửa lỗi ngay sau khi đặt hàng.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-11.1 | Khách hàng vừa hoàn thành thanh toán | Trang cảm ơn tải | Hiển thị banner "Chỉnh sửa đơn hàng" với lời kêu gọi hành động rõ ràng |
| AC-11.2 | Khách hàng nhấn "Chỉnh sửa đơn hàng" | Họ nhấn nút | Họ được chuyển hướng đến trang chỉnh sửa đơn hàng |
| AC-11.3 | Người bán đã tắt widget trang cảm ơn | Khách hàng hoàn thành thanh toán | Không hiển thị widget |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-11.1 | Kịch bản thành công | Banner hiển thị sau thanh toán | Hoàn thành thanh toán | Banner xuất hiện với thông điệp "Đặt nhầm?" |
| TC-11.2 | Kịch bản thành công | Nhấn để chỉnh sửa | Nhấn "Chỉnh sửa đơn hàng" | Chuyển hướng đến trang chỉnh sửa với đơn hàng được tải sẵn |
| TC-11.3 | Trường hợp biên | Tải lại trang | Tải lại trang cảm ơn | Widget vẫn hiển thị chính xác |
| TC-11.4 | Trường hợp biên | Thanh toán nhanh (Shop Pay) | Hoàn thành qua Shop Pay | Widget hiển thị trên trang cảm ơn |
| TC-11.5 | Trường hợp biên | Người bán tắt widget | Widget bị tắt trong cài đặt | Trang cảm ơn tải mà không có widget |
| TC-11.6 | Kịch bản thành công | Hiển thị trên di động | Hoàn thành thanh toán trên di động | Banner chiếm toàn bộ chiều rộng, nút dễ nhấn |

---

### Tính năng 12: Giao diện chỉnh sửa tương thích di động

**Câu chuyện người dùng**
Với tư cách là **khách hàng**, tôi muốn giao diện chỉnh sửa hoạt động tốt trên điện thoại, để tôi có thể sửa đơn hàng trên bất kỳ thiết bị nào.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-12.1 | Khách hàng đang trên thiết bị di động (chiều rộng 320-428px) | Họ mở trang chỉnh sửa | Tất cả các phần tử hiển thị, cuộn được và nhấn được mà không cần cuộn ngang |
| AC-12.2 | Khách hàng đang trên máy tính bảng (768-1024px) | Họ mở trang chỉnh sửa | Bố cục thích ứng với chiều rộng máy tính bảng với khoảng cách phù hợp |
| AC-12.3 | Bất kỳ trường nhập liệu nào được chọn trên di động | Bàn phím mở | Biểu mẫu cuộn để giữ trường đang hoạt động hiển thị |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-12.1 | Kịch bản thành công | iPhone SE (375px) | Hoàn thành toàn bộ quy trình chỉnh sửa | Tất cả các bước hoàn thành được, không cuộn ngang, nút chiếm toàn bộ chiều rộng |
| TC-12.2 | Kịch bản thành công | Điện thoại Android (360px) | Hoàn thành toàn bộ quy trình chỉnh sửa | Giống như trên |
| TC-12.3 | Kịch bản thành công | iPad (768px) | Hoàn thành toàn bộ quy trình chỉnh sửa | Bố cục hai cột khi phù hợp, khoảng cách thoải mái |
| TC-12.4 | Trường hợp biên | Điện thoại ngang | Xoay thiết bị khi đang chỉnh sửa | Bố cục điều chỉnh, nội dung không bị cắt |
| TC-12.5 | Trường hợp biên | Màn hình rất nhỏ (320px) | iPhone 5/SE thế hệ đầu | Nội dung vừa vặn, chữ đọc được, nút sử dụng được |
| TC-12.6 | Trường hợp biên | Vùng chạm | Nhấn các nút và liên kết | Tất cả các phần tử tương tác ít nhất 44x44px |

---

## Tính năng P1 (MMP)

---

### Tính năng 13: Xác thực địa chỉ Google

**Câu chuyện người dùng (US-15)**
Với tư cách là **người bán**, tôi muốn xác thực địa chỉ Google khi chỉnh sửa, để khách hàng không thể nhập địa chỉ không hợp lệ gây ra giao hàng thất bại.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-13.1 | Xác thực địa chỉ Google được bật | Khách hàng nhập địa chỉ | Địa chỉ được xác thực qua Google Address Validation API |
| AC-13.2 | Địa chỉ có vấn đề nhỏ (thiếu số phòng) | Xác thực trả về gợi ý | Khách hàng thấy "Bạn có phải ý là...?" với địa chỉ đã sửa |
| AC-13.3 | Địa chỉ hoàn toàn không hợp lệ | Xác thực trả về UNCONFIRMED | Khách hàng thấy lỗi: "Chúng tôi không thể xác minh địa chỉ này" với tùy chọn tiếp tục |
| AC-13.4 | Google API không khả dụng | Khách hàng gửi địa chỉ | Chỉnh sửa tiếp tục mà không xác thực (giảm cấp nhẹ nhàng) |
| AC-13.5 | Người bán đang dùng gói Miễn phí | Xác thực địa chỉ là tính năng trả phí | Xác thực bị bỏ qua; địa chỉ được chấp nhận nguyên trạng |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-13.1 | Kịch bản thành công | Địa chỉ hợp lệ | Nhập "123 Main St, New York, NY 10001" | Địa chỉ được xác nhận, hiển thị dấu tích xanh |
| TC-13.2 | Kịch bản thành công | Gợi ý địa chỉ | Nhập "123 Main St" (thiếu thành phố) | Hiển thị gợi ý: "Bạn có phải ý là 123 Main St, New York, NY?" |
| TC-13.3 | Kịch bản thành công | Khách hàng chấp nhận gợi ý | Nhấn "Sử dụng địa chỉ được gợi ý" | Địa chỉ gợi ý được điền vào biểu mẫu |
| TC-13.4 | Trường hợp biên | Khách hàng từ chối gợi ý | Nhấn "Sử dụng địa chỉ đã nhập" | Sử dụng địa chỉ gốc |
| TC-13.5 | Trường hợp biên | Địa chỉ quốc tế | Nhập địa chỉ ở Nhật Bản | Google xác thực địa chỉ quốc tế chính xác |
| TC-13.6 | Lỗi | Giới hạn tốc độ Google API | Quá nhiều yêu cầu | Chuyển sang không xác thực, chỉnh sửa tiếp tục |
| TC-13.7 | Lỗi | API key Google không hợp lệ | API key cấu hình sai | Chuyển dự phòng im lặng, không hiển thị lỗi cho người dùng |
| TC-13.8 | Trường hợp biên | Tự động hoàn thành | Bắt đầu gõ địa chỉ | Gợi ý tự động hoàn thành xuất hiện từ Google Places |

---

### Tính năng 14: Bán thêm sau mua hàng trong quy trình chỉnh sửa

**Câu chuyện người dùng (US-16)**
Với tư cách là **người bán**, tôi muốn hiển thị đề xuất sản phẩm trong khi chỉnh sửa, để tôi có thể tạo thêm doanh thu từ tương tác chỉnh sửa.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-14.1 | Người bán đã cấu hình các ưu đãi bán thêm | Khách hàng đang ở màn hình xác nhận chỉnh sửa | Các đề xuất sản phẩm liên quan được hiển thị trước nút xác nhận |
| AC-14.2 | Khách hàng thêm sản phẩm bán thêm | Họ nhấn "Thêm vào đơn hàng" | Sản phẩm được bao gồm trong chỉnh sửa với chênh lệch giá cập nhật |
| AC-14.3 | Khách hàng từ chối tất cả bán thêm | Họ nhấn "Không, cảm ơn" | Chỉnh sửa tiếp tục bình thường không có sản phẩm bán thêm |
| AC-14.4 | Không có ưu đãi bán thêm phù hợp | Khách hàng đang chỉnh sửa | Không hiển thị phần bán thêm (UX gọn gàng) |
| AC-14.5 | Doanh thu bán thêm được theo dõi | Khách hàng chấp nhận bán thêm | Doanh thu được ghi nhận cho bán thêm trong phân tích |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-14.1 | Kịch bản thành công | Bán thêm hiển thị khi chỉnh sửa | Chỉnh sửa đơn hàng, đến bước xác nhận | Phần "Bạn cũng có thể thích..." hiển thị với 1-3 sản phẩm |
| TC-14.2 | Kịch bản thành công | Khách hàng thêm bán thêm | Nhấn "Thêm vào đơn hàng" trên sản phẩm đề xuất | Sản phẩm được thêm, chênh lệch giá cập nhật bao gồm bán thêm |
| TC-14.3 | Kịch bản thành công | Khách hàng từ chối | Nhấn "Không, cảm ơn, lưu thay đổi" | Chỉnh sửa tiếp tục không có bán thêm |
| TC-14.4 | Trường hợp biên | Sản phẩm bán thêm hết hàng | Sản phẩm đề xuất có tồn kho 0 | Sản phẩm không hiển thị trong đề xuất |
| TC-14.5 | Trường hợp biên | Khách hàng đã có sản phẩm đề xuất | Sản phẩm bán thêm đã có trong đơn hàng | Sản phẩm không hiển thị (không trùng lặp) |
| TC-14.6 | Trường hợp biên | Nhiều ưu đãi bán thêm phù hợp | 5 ưu đãi phù hợp với đơn hàng | Hiển thị 3 ưu đãi hàng đầu theo ưu tiên, liên kết "Xem thêm" cho phần còn lại |
| TC-14.7 | Kịch bản thành công | Ghi nhận doanh thu | Khách hàng chấp nhận bán thêm | Sự kiện phân tích được ghi với số tiền doanh thu bán thêm |
| TC-14.8 | Trường hợp biên | Bán thêm có giảm giá | Ưu đãi bao gồm giảm giá 10% | Hiển thị giá đã giảm, gạch ngang giá gốc |

---

### Tính năng 15: Tùy chọn hoàn tiền bằng tín dụng cửa hàng

**Câu chuyện người dùng (US-17)**
Với tư cách là **người bán**, tôi muốn cung cấp tín dụng cửa hàng thay vì hoàn tiền mặt, để tôi giữ lại doanh thu khi khách hàng chỉnh sửa đơn hàng giảm giá.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-15.1 | Tín dụng cửa hàng được bật và cần hoàn tiền | Khách hàng xác nhận chỉnh sửa dẫn đến giá thấp hơn | Khách hàng được cung cấp lựa chọn: "Hoàn tiền về phương thức thanh toán gốc" hoặc "Nhận tín dụng cửa hàng" |
| AC-15.2 | Khách hàng chọn tín dụng cửa hàng | Họ chọn "Tín dụng cửa hàng" | Thẻ quà tặng / tín dụng cửa hàng được phát hành cho số tiền hoàn |
| AC-15.3 | Khách hàng chọn hoàn tiền về phương thức gốc | Họ chọn "Hoàn tiền về phương thức thanh toán" | Hoàn tiền tiêu chuẩn được xử lý |
| AC-15.4 | Tín dụng cửa hàng bị tắt | Cần hoàn tiền | Hoàn tiền trực tiếp về phương thức thanh toán gốc (không hiển thị lựa chọn) |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-15.1 | Kịch bản thành công | Khách hàng chọn tín dụng cửa hàng | Chỉnh sửa dẫn đến hoàn -$15, chọn "Tín dụng cửa hàng" | Tạo thẻ quà tặng $15, gửi mã qua email cho khách hàng |
| TC-15.2 | Kịch bản thành công | Khách hàng chọn hoàn tiền | Chỉnh sửa dẫn đến hoàn -$15, chọn "Hoàn tiền về thẻ" | Hoàn $15 về phương thức thanh toán gốc |
| TC-15.3 | Trường hợp biên | Thưởng tín dụng cửa hàng | Người bán cung cấp thưởng 10% cho tín dụng cửa hàng | Khách hàng thấy "Hoàn $15 HOẶC tín dụng cửa hàng $16.50" |
| TC-15.4 | Trường hợp biên | Hủy với tín dụng cửa hàng | Hủy đơn hàng, chọn tín dụng cửa hàng | Toàn bộ số tiền đơn hàng được phát hành dưới dạng tín dụng cửa hàng |
| TC-15.5 | Trường hợp biên | API thẻ quà tặng Shopify thất bại | Lỗi API khi tạo thẻ quà tặng | Chuyển sang hoàn tiền tiêu chuẩn, thông báo cho người bán |
| TC-15.6 | Trường hợp biên | Số tiền hoàn nhỏ | Hoàn tiền là $0.50 | Vẫn cung cấp tùy chọn tín dụng cửa hàng |

---

### Tính năng 16: Tích hợp Shopify Flow

**Câu chuyện người dùng (US-18)**
Với tư cách là **người bán**, tôi muốn tích hợp Shopify Flow, để tôi có thể xây dựng tự động hóa tùy chỉnh xung quanh chỉnh sửa đơn hàng.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-16.1 | Người bán đã cài đặt Shopify Flow | Một đơn hàng được chỉnh sửa | Trigger "Đơn hàng đã chỉnh sửa" kích hoạt trong Shopify Flow với chi tiết chỉnh sửa |
| AC-16.2 | Người bán đã cài đặt Shopify Flow | Một đơn hàng bị hủy qua ứng dụng | Trigger "Đơn hàng đã hủy" kích hoạt với chi tiết hủy |
| AC-16.3 | Người bán tạo workflow Flow | Họ sử dụng trigger của Avada Order Editing | Họ có thể truy cập loại chỉnh sửa, chênh lệch giá, người khởi tạo và trường lý do |
| AC-16.4 | Một action Flow được cấu hình | Trigger kích hoạt | Action được kết nối thực thi (ví dụ: gắn thẻ đơn hàng, gửi tin Slack) |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-16.1 | Kịch bản thành công | Trigger chỉnh sửa kích hoạt | Khách hàng chỉnh sửa đơn hàng | Trigger "Đơn hàng đã chỉnh sửa" kích hoạt với payload chính xác |
| TC-16.2 | Kịch bản thành công | Trigger hủy kích hoạt | Khách hàng hủy đơn hàng | Trigger "Đơn hàng đã hủy" kích hoạt với lý do và số tiền hoàn |
| TC-16.3 | Kịch bản thành công | Workflow Flow thực thi | Tạo Flow: "Khi đơn hàng được chỉnh sửa, gắn thẻ đơn hàng là 'đã chỉnh sửa'" | Đơn hàng được gắn thẻ sau khi chỉnh sửa |
| TC-16.4 | Trường hợp biên | Flow chưa cài đặt | Đơn hàng được chỉnh sửa nhưng người bán chưa có Flow | Trigger được gửi nhưng bị Shopify bỏ qua im lặng |
| TC-16.5 | Trường hợp biên | Nhiều trigger liên tiếp nhanh | 5 chỉnh sửa trong 1 phút | Tất cả 5 trigger kích hoạt độc lập |
| TC-16.6 | Lỗi | Flow API không khả dụng | Endpoint Shopify Flow bị lỗi | Lỗi trigger được ghi log, chỉnh sửa vẫn hoàn thành |

---

### Tính năng 17: Bảng điều khiển phân tích

**Câu chuyện người dùng (US-19)**
Với tư cách là **người bán**, tôi muốn có bảng điều khiển phân tích, để tôi có thể xem xu hướng chỉnh sửa, sản phẩm được chỉnh sửa nhiều nhất và tác động doanh thu.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-17.1 | Người bán mở trang Phân tích | Có dữ liệu cho khoảng thời gian đã chọn | Biểu đồ hiển thị: tổng chỉnh sửa, chỉnh sửa theo loại, sản phẩm được chỉnh sửa nhiều nhất, doanh thu tiết kiệm được |
| AC-17.2 | Người bán chọn khoảng thời gian | Họ thay đổi từ "7 ngày qua" sang "30 ngày qua" | Biểu đồ cập nhật phản ánh khoảng thời gian đã chọn |
| AC-17.3 | Không có dữ liệu | Người bán mở Phân tích vào ngày đầu tiên | Trạng thái trống: "Chưa có dữ liệu chỉnh sửa. Dữ liệu sẽ xuất hiện sau lần chỉnh sửa đầu tiên của khách hàng." |
| AC-17.4 | Người bán đang dùng gói Miễn phí | Họ mở Phân tích | Hiển thị các chỉ số cơ bản (tổng chỉnh sửa, tổng hủy). Biểu đồ nâng cao bị giới hạn. |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-17.1 | Kịch bản thành công | Xem bảng điều khiển | Mở trang Phân tích | Biểu đồ tải trong vòng 2 giây, dữ liệu khớp với bản ghi chỉnh sửa |
| TC-17.2 | Kịch bản thành công | Thay đổi khoảng thời gian | Chọn "30 ngày qua" | Tất cả biểu đồ cập nhật dữ liệu 30 ngày |
| TC-17.3 | Kịch bản thành công | Sản phẩm được chỉnh sửa nhiều nhất | Xem biểu đồ "Sản phẩm được chỉnh sửa nhiều nhất" | Sản phẩm sắp xếp theo tần suất chỉnh sửa, hiển thị số lượng và phần trăm |
| TC-17.4 | Kịch bản thành công | Chỉ số doanh thu tiết kiệm | Xem phần doanh thu | Hiển thị "Chi phí hỗ trợ tiết kiệm ước tính" dựa trên số lần chỉnh sửa x chi phí trung bình |
| TC-17.5 | Trường hợp biên | Trạng thái trống | Cài đặt mới, không có dữ liệu | Hiển thị thông báo trạng thái trống, không có lỗi |
| TC-17.6 | Trường hợp biên | Tập dữ liệu lớn | Cửa hàng có hơn 10,000 chỉnh sửa | Bảng điều khiển tải trong vòng 3 giây (tối ưu BigQuery) |
| TC-17.7 | Trường hợp biên | Xuất dữ liệu | Nhấn "Xuất CSV" | CSV được tải xuống với tất cả bản ghi chỉnh sửa cho khoảng thời gian đã chọn |

---

### Tính năng 18: Quy trình giữ chân khi hủy đơn

**Câu chuyện người dùng (US-20)**
Với tư cách là **khách hàng**, tôi muốn thấy ưu đãi giữ chân khi tôi cố gắng hủy, để tôi có thể giữ đơn hàng với một ưu đãi tốt hơn.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-18.1 | Quy trình giữ chân được bật và khách hàng nhấn "Hủy đơn hàng" | Màn hình hủy tải | Hiển thị bộ chọn lý do trước nút hủy |
| AC-18.2 | Khách hàng chọn lý do | Họ chọn "Tìm thấy rẻ hơn ở nơi khác" | Hiển thị ưu đãi giữ chân nhắm mục tiêu (ví dụ: "Giảm 15% cho đơn hàng này") |
| AC-18.3 | Khách hàng chấp nhận ưu đãi giữ chân | Họ nhấn "Áp dụng giảm giá 15%" | Giảm giá được áp dụng cho đơn hàng, hủy bị ngăn chặn |
| AC-18.4 | Khách hàng từ chối tất cả ưu đãi | Họ nhấn "Không, cảm ơn, hủy đơn hàng" | Đơn hàng bị hủy bình thường |
| AC-18.5 | Quy trình giữ chân bị tắt | Khách hàng nhấn "Hủy đơn hàng" | Quy trình hủy tiêu chuẩn (lý do + xác nhận) không có ưu đãi |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-18.1 | Kịch bản thành công | Giữ chân với giảm giá | Chọn "Tìm thấy rẻ hơn", chấp nhận giảm 15% | Giảm giá được áp dụng, đơn hàng được giữ, phân tích được ghi |
| TC-18.2 | Kịch bản thành công | Giữ chân với đổi hàng | Chọn "Sai sản phẩm", chấp nhận đổi sản phẩm | Đổi được xử lý, đơn hàng được giữ |
| TC-18.3 | Kịch bản thành công | Khách hàng từ chối giữ chân | Từ chối tất cả ưu đãi, xác nhận hủy | Đơn hàng bị hủy bình thường |
| TC-18.4 | Trường hợp biên | Ưu đãi giữ chân hết hạn | Mã giảm giá đã hết hạn | Ưu đãi không hiển thị, hoặc hiển thị ưu đãi dự phòng |
| TC-18.5 | Trường hợp biên | Khách hàng được giữ rồi hủy lại | Chấp nhận ưu đãi, sau đó cố hủy lại | Lần hủy thứ hai hiển thị ưu đãi lại hoặc tiến hành trực tiếp |
| TC-18.6 | Trường hợp biên | Phân tích giữ chân | Xem chỉ số giữ chân trong bảng điều khiển | Hiển thị tỷ lệ giữ chân, doanh thu tiết kiệm, ưu đãi phổ biến |

---

### Tính năng 19: Hỗ trợ đa ngôn ngữ

**Câu chuyện người dùng (US-21)**
Với tư cách là **người bán**, tôi muốn hỗ trợ đa ngôn ngữ, để khách hàng quốc tế có thể tự chỉnh sửa bằng ngôn ngữ của họ.

**Tiêu chí chấp nhận**

| # | Điều kiện ban đầu | Khi | Thì |
|---|-------|------|------|
| AC-19.1 | Cửa hàng đã cấu hình nhiều ngôn ngữ | Khách hàng truy cập bằng tiếng Pháp | Tất cả văn bản widget, nút và thông báo hiển thị bằng tiếng Pháp |
| AC-19.2 | Ngôn ngữ không được hỗ trợ | Khách hàng truy cập bằng ngôn ngữ không được hỗ trợ | Widget chuyển về tiếng Anh |
| AC-19.3 | Người bán tùy chỉnh bản dịch | Họ chỉnh sửa bản dịch tiếng Pháp trong cài đặt | Bản dịch tùy chỉnh ghi đè mặc định |

**Trường hợp kiểm thử**

| ID | Loại | Kịch bản | Các bước | Kết quả mong đợi |
|----|------|----------|-------|-----------------|
| TC-19.1 | Kịch bản thành công | Khách hàng Pháp | Truy cập trang trạng thái đơn hàng bằng locale tiếng Pháp | Widget hiển thị "Modifier la commande", "Annuler la commande" |
| TC-19.2 | Kịch bản thành công | Khách hàng Đức | Truy cập bằng locale tiếng Đức | Widget hiển thị "Bestellung bearbeiten" |
| TC-19.3 | Trường hợp biên | Ngôn ngữ RTL (tiếng Ả Rập) | Truy cập bằng locale tiếng Ả Rập | Widget hiển thị RTL, căn chỉnh văn bản chính xác |
| TC-19.4 | Trường hợp biên | Ngôn ngữ không được hỗ trợ | Truy cập bằng tiếng Thái | Chuyển về tiếng Anh |
| TC-19.5 | Trường hợp biên | Chuỗi dịch dài | Bản dịch tiếng Đức dài hơn 40% | Bố cục không bị vỡ, văn bản xuống dòng chính xác |
| TC-19.6 | Kịch bản thành công | Bản dịch tùy chỉnh | Người bán ghi đè văn bản "Hủy" tiếng Pháp | Hiển thị văn bản tùy chỉnh thay vì mặc định |

---

## Trường hợp kiểm thử xuyên suốt

---

### Hiệu suất

| ID | Kịch bản | Mục tiêu | Phương pháp kiểm thử |
|----|----------|--------|-------------|
| PERF-01 | Tải trang chỉnh sửa lần đầu (cold start) | < 2 giây | Kiểm tra hiệu suất Lighthouse |
| PERF-02 | Tải trang chỉnh sửa lần đầu (warm) | < 1 giây | Tab Network trong DevTools trình duyệt |
| PERF-03 | Phản hồi API: GET /edit-eligibility | < 300ms (p95) | Kiểm tra tải với k6/Artillery |
| PERF-04 | Phản hồi API: POST /edits/confirm | < 500ms (p95) | Kiểm tra tải |
| PERF-05 | Phản hồi xử lý webhook cho Shopify | < 2 giây (p95) | Cloud Monitoring |
| PERF-06 | Tải trang bảng điều khiển quản trị | < 2 giây | Lighthouse |
| PERF-07 | Bảng điều khiển phân tích với dữ liệu 30 ngày | < 3 giây | Thủ công + thời gian truy vấn BigQuery |
| PERF-08 | 10 chỉnh sửa đồng thời trên cùng cửa hàng | Tất cả thành công, không có race condition | Kiểm tra tải đồng thời |
| PERF-09 | Hiển thị widget trên Trang trạng thái đơn hàng | < 500ms | Web Vitals (LCP) |
| PERF-10 | Tác vụ nền (xử lý chỉnh sửa) | < 10 giây từ đầu đến cuối | Cloud Monitoring |

### Bảo mật

| ID | Kịch bản | Kết quả mong đợi | Phương pháp kiểm thử |
|----|----------|-----------------|-------------|
| SEC-01 | Webhook không có header HMAC hợp lệ | 401 Không được phép | Gửi webhook giả mạo |
| SEC-02 | Gọi API không có token phiên | 401 Không được phép | Gọi API không có header xác thực |
| SEC-03 | Khách hàng cố chỉnh sửa đơn hàng của khách hàng khác (IDOR) | 403 Bị cấm | Thay đổi orderId trong yêu cầu sang đơn hàng của khách hàng khác |
| SEC-04 | Cửa hàng A cố truy cập dữ liệu của Cửa hàng B | Kết quả trống / 403 | Gọi API với token Cửa hàng A nhưng shopId Cửa hàng B |
| SEC-05 | SQL injection trong trường tìm kiếm | Không bị injection, đầu vào được làm sạch | Nhập payload SQL vào trường tìm kiếm/lọc |
| SEC-06 | XSS trong trường địa chỉ | HTML được escape, không thực thi script | Nhập `<script>alert(1)</script>` vào địa chỉ |
| SEC-07 | Giới hạn tốc độ trên endpoint chỉnh sửa | 429 sau ngưỡng | Gửi 100 yêu cầu trong 10 giây |
| SEC-08 | Token truy cập được mã hóa khi lưu trữ | Token không đọc được trong Firestore | Kiểm tra trực tiếp tài liệu Firestore |
| SEC-09 | Bảo vệ CSRF trên endpoint mutation | Yêu cầu bị từ chối nếu không có token CSRF | Gửi POST không có xác thực origin/CSRF |
| SEC-10 | Token phiên hết hạn | 401, yêu cầu xác thực lại | Sử dụng token sau khi TTL hết hạn |

### Tương thích di động

| ID | Kịch bản | Thiết bị | Kết quả mong đợi |
|----|----------|---------|-----------------|
| MOB-01 | Widget trang trạng thái đơn hàng | iPhone SE, iPhone 14, Pixel 7, Samsung Galaxy S23 | Widget hiển thị chính xác, nút nhấn được |
| MOB-02 | Trang chỉnh sửa đơn hàng | Cùng thiết bị | Biểu mẫu sử dụng được, dropdown hoạt động, bàn phím không che đầu vào |
| MOB-03 | Modal xác nhận chỉnh sửa | Cùng thiết bị | Modal cuộn được, nút hiển thị mà không cần cuộn |
| MOB-04 | Bảng điều khiển quản trị (di động người bán) | iPad, iPhone 14 Pro Max | Bảng điều khiển sử dụng được nhưng khuyến nghị desktop cho trải nghiệm đầy đủ |
| MOB-05 | Kích thước vùng chạm | Tất cả thiết bị di động | Tất cả phần tử tương tác >= 44x44px |

### Giới hạn tốc độ

| ID | Kịch bản | Ngưỡng | Kết quả mong đợi |
|----|----------|-----------|-----------------|
| RATE-01 | Gửi chỉnh sửa của khách hàng | 10 mỗi phút mỗi đơn hàng | 429 sau yêu cầu thứ 10 với header retry-after |
| RATE-02 | Gọi API mỗi cửa hàng | 100 mỗi phút | 429 với thông báo "Vượt quá giới hạn tốc độ" |
| RATE-03 | Xử lý webhook mỗi cửa hàng | 50 mỗi phút | Tràn hàng đợi được xử lý qua Pub/Sub backpressure |
| RATE-04 | Gọi Admin API | 200 mỗi phút mỗi người bán | 429 với retry-after |

### Tính toàn vẹn dữ liệu

| ID | Kịch bản | Kết quả mong đợi |
|----|----------|-----------------|
| DATA-01 | Chỉnh sửa đồng thời trên cùng đơn hàng | Khóa lạc quan ngăn mất cập nhật |
| DATA-02 | Chỉnh sửa thất bại giữa chừng qua Shopify mutations | Hoàn tác nguyên tử, không có trạng thái một phần |
| DATA-03 | Ghi Firestore thất bại sau khi Shopify commit | Thử lại nền đảm bảo tính nhất quán dữ liệu |
| DATA-04 | Độ chính xác bộ đếm sử dụng | Số lượng chỉnh sửa hàng tháng khớp với bản ghi chỉnh sửa thực tế |
| DATA-05 | Tính đầy đủ lịch sử chỉnh sửa | Mỗi chỉnh sửa đã xác nhận đều có bản ghi orderEdit tương ứng |

---

*Kết thúc Câu chuyện người dùng & Trường hợp kiểm thử*
