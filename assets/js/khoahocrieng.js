/*
* Tên file: khoahocrieng.js
* Nhóm thực hiện: Nhóm 2 (BrightEnglish)
* Mục đích: Xử lý sự kiện Thêm vào giỏ hàng và Lưu trữ dữ liệu LocalStorage 
* đồng bộ với hệ thống giỏ hàng chung (cardItems) của dự án.
*/

document.addEventListener("DOMContentLoaded", () => {
  const btnAddCart = document.getElementById("btn-add-cart");
  const cartPopup = document.getElementById("cartPopup");

  // Thuật toán xử lý thêm sản phẩm vào LocalStorage
  function addToCard() {
    // 1. Đọc dữ liệu mảng cardItems từ LocalStorage (đồng bộ key với khoahoc.js)
    let cardItems = JSON.parse(localStorage.getItem("cardItems")) || [];

    // 2. Định nghĩa thông tin sản phẩm khóa học Mầm Non Online Cơ Bản
    const productId = "mamnon-online-coban";
    
    // 3. Kiểm tra xem khóa học này đã tồn tại trong giỏ hàng chưa
    let existingItem = cardItems.find(item => item.id === productId);

    if (existingItem) {
      // Nếu đã có trong giỏ hàng -> Tăng số lượng
      existingItem.quantity += 1;
    } else {
      // Nếu chưa có -> Tạo mới Object đúng cấu trúc của nhóm
      let newItem = {
        id: productId,
        courseName: "Tiếng Anh Mầm Non (3-5 tuổi) - Khóa Cơ Bản",
        priceOld: "1.200.000đ",
        priceNew: "799.000đ",
        teacherName: "Học Online - Cô Ruby Lucy & Cô Anna Elsa",
        quantity: 1
      };
      cardItems.push(newItem);
    }

    // 4. Lưu ngược lại mảng giỏ hàng vào LocalStorage
    localStorage.setItem("cardItems", JSON.stringify(cardItems));
  }

  // Sự kiện khi bấm nút "Thêm vào giỏ hàng"
  if (btnAddCart) {
    btnAddCart.addEventListener("click", (event) => {
      event.preventDefault(); // Ngăn chặn hành vi cuộn/chuyển trang mặc định

      // Gọi hàm lưu dữ liệu vào giỏ
      addToCard();

      // Kích hoạt hiệu ứng Popup thông báo (Lấy từ logic khoahoc.js)
      if (cartPopup) {
        cartPopup.classList.remove("hide");
        cartPopup.classList.add("show");

        // Tự động ẩn popup sau 3 giây (3000ms)
        setTimeout(() => {
          cartPopup.classList.remove("show");
          cartPopup.classList.add("hide");
          setTimeout(() => {
            cartPopup.classList.remove("hide");
          }, 400);
        }, 3000);
      }
    });
  }
});