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

// ==========================================
// 2. CÁC TÍNH NĂNG GIAO DIỆN (CHẠY KHI DOM SẴN SÀNG)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

  // --- A. LỘ TRÌNH BÀI HỌC - ACCORDION (CODE TRÚC) ---
  const periodItems = document.querySelectorAll(".period-item");

  periodItems.forEach((item) => {
    const btn = item.querySelector(".period-title");
    const content = item.querySelector(".period-inf");

    if (btn && content) {
      btn.addEventListener("click", () => {
        // Đóng các item khác
        periodItems.forEach((i) => {
          if (i !== item) {
            i.classList.remove("active");
            const otherContent = i.querySelector(".period-inf");
            if (otherContent) otherContent.style.height = 0;
          }
        });

        // Bật/tắt item hiện tại
        if (item.classList.contains("active")) {
          item.classList.remove("active");
          content.style.height = 0;
        } else {
          item.classList.add("active");
          content.style.height = content.scrollHeight + "px";
        }
      });
    }
  });

  // --- B. COURSE MORE - XEM THÊM GIẢNG VIÊN (CODE TRÚC) ---
  const moreBtn = document.querySelector(".course-view-more");
  const teacherMore = document.querySelector(".course-more-list");

  if (moreBtn && teacherMore) {
    moreBtn.addEventListener("click", function () {
      teacherMore.classList.toggle("active");
      moreBtn.classList.toggle("active");
    });
  }

  // --- C. SCROLL SPY SIDEBAR (CODE TRÚC) ---
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length > 0 && navLinks.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.remove("active");
              const href = link.getAttribute("href");
              if (href && href.startsWith("#") && href.substring(1) === entry.target.id) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      { threshold: 0.8 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }
});