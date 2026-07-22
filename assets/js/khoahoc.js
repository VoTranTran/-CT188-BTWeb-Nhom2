/*
* Tên file: khoahoc.js
* Nhóm thực hiện: Nhóm 2
* Thành viên code chính: Nguyễn An Khang - B2405508
* Thuật toán: Thao tác DOM để quản lý trạng thái (State) giao diện theo quy tắc Event-Driven. 
* Sử dụng LocalStorage để lưu trữ và mô phỏng CSDL Giỏ hàng.
*/

document.addEventListener("DOMContentLoaded", () => {
  // 1. Khởi tạo State ban đầu của giao diện khóa học
  let currentCourse = "mamnon";
  let currentFormat = "online";
  const selectedTeachers = {
    mamnon: "0", // 0: Khóa cơ bản, 1: Khóa nâng cao
    tieuhoc: "0"
  };

  // Hàm tiện ích: Định dạng số thành tiền tệ VNĐ
  function formatCurrency(number) {
    return number.toLocaleString('vi-VN') + 'đ';
  }

  // 2. Logic cốt lõi: Cập nhật giao diện dựa trên State hiện tại
  function updateUI() {
    const teacherIdx = selectedTeachers[currentCourse];

    // 2.1 Cập nhật khu vực Banner Hero (Chỉ hiện banner của khóa học đang chọn)
    document.querySelectorAll(".course-hero-inner").forEach(el => {
      if (el.getAttribute("data-course") === currentCourse) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });

    // 2.2 Cập nhật Lộ trình và Thông số chi tiết (Lọc qua 3 tham số: Khóa học, Hình thức, Cấp độ)
    document.querySelectorAll(".syllabus-list, .course-features").forEach(el => {
      const parentTeacherBox = el.closest(".teacher-box");
      const teacherIdxAttr = parentTeacherBox ? parentTeacherBox.getAttribute("data-teacher") : null;

      // Kiểm tra xem element này có thuộc đúng cấp độ giảng viên đang được chọn hay không
      const isCorrectTeacher = !teacherIdxAttr || teacherIdxAttr === selectedTeachers[currentCourse];

      // Toán tử AND: Phải thỏa mãn cả 3 điều kiện state thì mới cấp class 'active' để hiển thị
      if (el.getAttribute("data-course") === currentCourse &&
        el.getAttribute("data-format") === currentFormat &&
        isCorrectTeacher) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });

    // 2.3 Cập nhật khung Giảng viên phụ trách
    document.querySelectorAll(".teacher-group").forEach(el => {
      if (el.getAttribute("data-course") === currentCourse) {
        el.classList.add("active");
        el.querySelectorAll(".teacher-box").forEach(box => {
          // Nếu id giảng viên khớp với state hiện tại -> Hiển thị
          if (box.getAttribute("data-teacher") === teacherIdx) {
            box.classList.add("active");
          } else {
            box.classList.remove("active");
          }
        });
      } else {
        el.classList.remove("active");
      }
    });

    // 2.4 Thuật toán tính toán và cập nhật Giá tiền động
    const activeFeature = document.querySelector(`.course-features[data-course="${currentCourse}"][data-format="${currentFormat}"]`);
    const baseOld = parseInt(activeFeature.getAttribute("data-old"));
    const baseNew = parseInt(activeFeature.getAttribute("data-new"));

    // Lấy giá trị phụ phí (offset) từ khóa học nâng cao (nếu có)
    const activeTeacherBtn = document.querySelector(`.teacher-group[data-course="${currentCourse}"] .teacher-btn[data-teacher="${teacherIdx}"]`);
    const offset = parseInt(activeTeacherBtn.getAttribute("data-offset"));

    // Render giá tiền mới ra DOM
    document.getElementById("price-old").innerText = formatCurrency(baseOld + offset);
    document.getElementById("price-new").innerText = formatCurrency(baseNew + offset);
  }

  // 3. Lắng nghe sự kiện click trên các TAB chọn độ tuổi (Mầm non / Tiểu học)
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentCourse = e.target.getAttribute("data-target"); // Thay đổi state
      updateUI(); // Cập nhật lại DOM
    });
  });

  // 4. Lắng nghe sự kiện click trên nút Hình thức học (Online / Offline)
  document.querySelectorAll(".format-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".format-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentFormat = e.target.getAttribute("data-format"); // Thay đổi state
      updateUI(); // Cập nhật lại DOM
    });
  });

  // 5. Lắng nghe sự kiện click trên nút Cấp độ khóa học (Cơ bản / Nâng cao)
  document.querySelectorAll(".teacher-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const btnEl = e.currentTarget;
      const course = btnEl.closest(".teacher-group").getAttribute("data-course");
      const teacherId = btnEl.getAttribute("data-teacher");

      selectedTeachers[course] = teacherId; // Cập nhật state nội bộ cấp độ khóa

      document.querySelectorAll(`.teacher-group[data-course="${course}"] .teacher-btn`).forEach(b => b.classList.remove("active"));
      btnEl.classList.add("active");
      updateUI(); // Cập nhật lại DOM
    });
  });

  // 6. Tính năng đọc tham số từ URL Hash (Ví dụ: khoahoc.html#tieuhoc) để tự động nhảy đến tab tương ứng
  function checkHash() {
    const hash = window.location.hash.replace("#", "");
    if (hash === "mamnon" || hash === "tieuhoc") {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      const targetBtn = document.querySelector(`.tab-btn[data-target="${hash}"]`);
      if (targetBtn) {
        targetBtn.classList.add("active");
        currentCourse = hash; // Ép state theo URL
      }
    }
    updateUI();
  }

  window.addEventListener("hashchange", checkHash);
  checkHash(); // Chạy lần đầu khi load trang

  // 7. THUẬT TOÁN XỬ LÝ GIỎ HÀNG BẰNG LOCAL STORAGE
  function addToCard() {
    // Lấy chuỗi JSON từ bộ nhớ cục bộ, ép kiểu về mảng object. Nếu rỗng thì khởi tạo mảng [].
    let cardItems = JSON.parse(localStorage.getItem("cardItems")) || [];

    // Trích xuất dữ liệu thực tế đang hiển thị trên DOM
    let formatName = document.querySelector(".format-btn.active").textContent.trim();
    let levelName = document.querySelector(".teacher-group.active .teacher-box.active h3").textContent.trim();
    let syllabusItem = document.querySelector('.syllabus-list.active');
    let productId = syllabusItem.id;

    // Logic kiểm tra trùng lặp khóa học
    let existingItem = cardItems.find(item => item.id === productId);
    if (existingItem) {
      // Nếu khóa học đã tồn tại trong giỏ, chỉ tăng số lượng
      existingItem.quantity += 1;
    } else {
      // Nếu là khóa học mới, cấu trúc object và push vào mảng
      let card = {
        id: productId,
        courseName: document.querySelector(".tab-btn.active").textContent,
        priceOld: document.querySelector("#price-old").textContent,
        priceNew: document.querySelector("#price-new").textContent,
        teacherName: formatName + " - " + levelName,
        quantity: 1
      };
      cardItems.push(card);
    }

    // Stringify mảng và lưu đè lại vào LocalStorage
    localStorage.setItem("cardItems", JSON.stringify(cardItems));
  }

  // 8. Kích hoạt hiệu ứng Popup thông báo khi người dùng nhấn "Thêm vào giỏ"
  const btnAddCart = document.getElementById("btn-add-cart");
  const cartPopup = document.getElementById("cartPopup");

  btnAddCart.addEventListener("click", (event) => {
    event.preventDefault(); // Ngăn hành vi reset mặc định

    // Kích hoạt class show để tạo animation
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

    addToCard(); // Gọi hàm xử lý dữ liệu giỏ hàng
  });
});
