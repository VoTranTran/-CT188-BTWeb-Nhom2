document.addEventListener("DOMContentLoaded", function () {
  // 1. Lắng nghe sự kiện Submit Form Đăng Ký
  const formRegister = document.querySelector(".form-register");

  if (formRegister) {
    formRegister.addEventListener("submit", function (e) {
      e.preventDefault(); // Chặn hành vi reload lại trang mặc định của form

      // Lấy giá trị các ô input
      const fullname = document.getElementById("fullname").value.trim();
      
      // Lấy ô email hoặc account (tùy id ô input trong HTML của bạn)
      const emailInput = document.getElementById("email") || document.getElementById("account");
      const account = emailInput ? emailInput.value.trim() : "";
      
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const agree = document.getElementById("agree").checked;

      // --- PHẦN 1: KIỂM TRA LỖI VÀ BÁO ALERT (CỦA CODE 1) ---

      // Kiểm tra ô trống cơ bản
      if (!fullname || !account || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }

      // Kiểm tra mật khẩu nhập lại
      if (password !== confirmPassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
      }

      // Kiểm tra tích chọn điều khoản
      if (!agree) {
        alert("Bạn phải đồng ý với Điều khoản sử dụng và Chính sách bảo mật!");
        return;
      }

      // --- PHẦN 2: LƯU VÀO LOCALSTORAGE ĐỂ TRUYỀN SANG TRANG ĐĂNG NHẬP ---

      // Lấy danh sách tài khoản hiện có từ localStorage
      let danhSachTaiKhoan = localStorage.getItem("danhSachTaiKhoan");

      // Nếu chưa có danh sách thì tạo chuỗi rỗng
      if (danhSachTaiKhoan === null) {
        danhSachTaiKhoan = "";
      }

      // Tạo chuỗi lưu tài khoản mới dạng: HọTên|TàiKhoản|MậtKhẩu;
      const taiKhoanMoi = fullname + "|" + account + "|" + password + ";";

      // Cộng nối tài khoản mới vào danh sách
      danhSachTaiKhoan += taiKhoanMoi;

      // Lưu lại danh sách mới vào localStorage
      localStorage.setItem("danhSachTaiKhoan", danhSachTaiKhoan);

      // --- PHẦN 3: THÔNG BÁO VÀ CHUYỂN HƯỚNG ---
      alert("Đăng ký tài khoản thành công!");
      window.location.href = "./dangnhap.html";
    });
  }

  // 2. Xử lý Ẩn / Hiện Mật Khẩu (Toggle Password) - GIỮ NGUYÊN NGHUYÊN BẢN CODE 1
  const toggles = document.querySelectorAll(".toggle");

  toggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      // Tìm ô input nằm ngay trước icon mắt
      const input = this.previousElementSibling;

      if (input && input.tagName === "INPUT") {
        if (input.type === "password") {
          input.type = "text";
          this.style.opacity = "1"; // Tăng độ sáng icon khi đang mở mắt
        } else {
          input.type = "password";
          this.style.opacity = "0.6"; // Làm mờ lại icon khi nhắm mắt
        }
      }
    });
  });
});