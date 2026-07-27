// Chờ cho toàn bộ cấu trúc DOM (HTML) được tải xong rồi mới thực thi JavaScript
document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. XỬ LÝ ĐÓNG DRAWER MENU TRÊN DI ĐỘNG
  // ==========================================
  
  // Lấy ra thẻ input checkbox dùng để bật/tắt menu mobile
  const menuCheckbox = document.getElementById("menu-control");
  
  // Lấy tất cả các thẻ liên kết (<a>) bên trong danh sách menu mobile
  const drawerLinks = document.querySelectorAll(".menu-drawer-list a");

  // Duyệt qua từng đường dẫn liên kết trong menu
  drawerLinks.forEach(link => {
    // Lắng nghe sự kiện click khi người dùng bấm vào một mục menu
    link.addEventListener("click", () => {
      if (menuCheckbox) {
        // Bỏ chọn checkbox để kích hoạt CSS ẩn thanh menu đi
        menuCheckbox.checked = false; 
      }
    });
  });

  // ==========================================
  // 2. XỬ LÝ HIỆU ỨNG THANH HEADER KHI CUỘN TRANG
  // ==========================================
  
  // Truy vấn đến thẻ header chính của trang web
  const header = document.querySelector(".header");
  
  // Lắng nghe sự kiện cuộn chuột (scroll) của người dùng trên toàn trang
  window.addEventListener("scroll", () => {
    // Nếu vị trí cuộn xuống lớn hơn 50px so với đỉnh trang
    if (window.scrollY > 50) {
      // Thêm class 'header-scrolled' để kích hoạt hiệu ứng CSS (ví dụ: đổi màu nền, thêm shadow)
      header.classList.add("header-scrolled");
    } else {
      // Xóa class 'header-scrolled' khi người dùng cuộn ngược lại đỉnh trang
      header.classList.remove("header-scrolled");
    }
  });

  // ==========================================
  // 3. XỬ LÝ KIỂM TRA & GỬI FORM ĐĂNG KÝ TƯ VẤN
  // ==========================================
  
  // Lấy ra thẻ form nhận tư vấn lộ trình
  const consultantForm = document.getElementById("consultantForm");

  // Kiểm tra xem form có tồn tại trên trang hiện tại hay không
  if (consultantForm) {
    // Lắng nghe sự kiện người dùng bấm nút Gửi (Submit)
    consultantForm.addEventListener("submit", (event) => {
      // Ngăn chặn hành vi mặc định của trình duyệt (tránh việc làm mới/reload lại trang)
      event.preventDefault(); 

      // Lấy dữ liệu người dùng nhập từ các ô input và loại bỏ khoảng trắng dư thừa hai đầu (.trim())
      const fullName = document.getElementById("fullName").value.trim();
      const phoneNumber = document.getElementById("phoneNumber").value.trim();
      const learningGoal = document.getElementById("learningGoal").value;

      // Định nghĩa biểu thức chính quy (Regex) kiểm tra số điện thoại: chỉ chứa 10-11 chữ số
      const phoneRegex = /^[0-9]{10,11}$/;
      
      // Kiểm tra nếu số điện thoại không khớp với định dạng chuẩn
      if (!phoneRegex.test(phoneNumber)) {
        // Hiển thị thông báo lỗi và dừng thực thi hàm
        alert("Xin vui lòng nhập số điện thoại hợp lệ (10 - 11 chữ số)!");
        return;
      }

      // Hiển thị thông báo xác nhận đăng ký thành công kèm thông tin phụ huynh đã điền
      alert(
        `🎉 Đăng ký tư vấn thành công!\n\n` +
        `Chào Ba/Mẹ: ${fullName}\n` +
        `Số điện thoại: ${phoneNumber}\n` +
        `Lớp đăng ký: ${learningGoal}\n\n` +
        `BrightEnglish sẽ liên hệ lại với Ba/Mẹ trong vòng 24 giờ tới để xếp lịch học thử cho bé.`
      );
      
      // Reset lại các ô input trong form về trạng thái trống sau khi đăng ký thành công
      consultantForm.reset();
    });
  }
});
