/*
* Tên file: khoahocrieng.js
* Nhóm thực hiện: Nhóm 2 (BrightEnglish)
* Mục đích: 
*  1. Xử lý Thêm vào giỏ hàng ĐỘNG (Cách của thầy: đọc dữ liệu qua tham số `btn` truyền từ HTML).
*  2. Xử lý Lộ trình (Accordion), Xem thêm giảng viên (Course More) và Scroll Spy Sidebar.
*/

// ==========================================
// 1. GIỎ HÀNG ĐỘNG (ĐƯỢC ĐẶT Ở GLOBAL SCOPE ĐỂ HTML GỌI ONCLICK)
// ==========================================
function addToCart(btn) {
  console.log("Run")
  if (!btn) return;

  // Tìm thẻ cha chứa toàn bộ thông tin khóa học (thẻ .detail-header-info)
  let parent = btn.closest(".detail-header-info") || btn.closest(".detail-header-card") || document;

  // 1. Lấy Tên khóa học từ thẻ .course-main-title
  let titleEl = parent.querySelector(".course-main-title") || document.querySelector(".course-main-title");
  let courseName = titleEl ? titleEl.innerText.trim() : "Khóa học Tiếng Anh";

  // 2. Lấy Giá mới & Giá cũ
  let priceNewEl = parent.querySelector(".new-price");
  let priceOldEl = parent.querySelector(".old-price");
  let priceNew = priceNewEl ? priceNewEl.innerText.trim() : "";
  let priceOld = priceOldEl ? priceOldEl.innerText.trim() : "";

  // 3. Lấy thông tin chi tiết (badge độ tuổi/hình thức học)
  let detailEl = parent.querySelector(".course-badge");
  let productDetail = detailEl ? detailEl.innerText.trim() : "Học Online / Offline";

  // 4. Tự động sinh ID chuẩn từ Tên khóa học (loại bỏ dấu tiếng Việt)
  let productId = courseName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu tiếng Việt
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")     // Xóa ký tự đặc biệt
    .replace(/\s+/g, "-");           // Thay khoảng trắng thành dấu gạch ngang

  // 5. Đọc giỏ hàng hiện tại từ LocalStorage
  let cardItems = JSON.parse(localStorage.getItem("cardItems")) || [];

  // 6. Kiểm tra trùng lặp
  let existingItem = cardItems.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cardItems.push({
      id: productId,
      courseName: courseName,
      priceOld: priceOld,
      priceNew: priceNew,
      product_detail: productDetail,
      quantity: 1
    });
  }

  // 7. Lưu lại vào LocalStorage
  localStorage.setItem("cardItems", JSON.stringify(cardItems));

  // 8. Bật Popup thông báo "Đã thêm vào giỏ hàng"
  let cartPopup = document.getElementById("cartPopup");
  if (cartPopup) {
    cartPopup.classList.remove("hide");
    cartPopup.classList.add("show");
    
    setTimeout(() => {
      cartPopup.classList.remove("show");
      cartPopup.classList.add("hide");
    }, 2500);
  }
}