document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // FORM ĐĂNG NHẬP
  // =========================

  const loginForm = document.getElementById("loginForm");
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");

  // Mặc định chỉ hiển thị form đăng nhập
  if (forgotPasswordForm) {
    forgotPasswordForm.style.display = "none";
  }

  // =========================
  // XỬ LÝ ĐĂNG NHẬP
  // =========================

  window.login = function () {

    // Lấy dữ liệu người dùng nhập
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Kiểm tra ô trống
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Lấy danh sách tài khoản
    let danhSachTaiKhoan = localStorage.getItem("danhSachTaiKhoan");

    if (danhSachTaiKhoan === null || danhSachTaiKhoan === "") {
      alert("Chưa có tài khoản nào!");
      return;
    }

    // Tách thành từng tài khoản
    let cacTaiKhoan = danhSachTaiKhoan.split(";");

    let dangNhapThanhCong = false;

    for (let i = 0; i < cacTaiKhoan.length; i++) {

      if (cacTaiKhoan[i] === "") {
        continue;
      }

      let thongTin = cacTaiKhoan[i].split("|");

      let taiKhoan = thongTin[1];
      let matKhau = thongTin[2];

      if (email === taiKhoan && password === matKhau) {

        dangNhapThanhCong = true;

        break;
      }

    }

    if (dangNhapThanhCong) {

      alert("Đăng nhập thành công!");

      window.location.href = "./index.html";

    } else {

      alert("Sai Email hoặc Mật khẩu!");

    }

  };

  // =========================
  // HIỂN THỊ FORM QUÊN MẬT KHẨU
  // =========================

  window.showForgotPassword = function () {

    loginForm.style.display = "none";

    forgotPasswordForm.style.display = "block";

  };

  // =========================
  // QUAY LẠI FORM ĐĂNG NHẬP
  // =========================

  window.quayLaiDangNhap = function () {

    forgotPasswordForm.style.display = "none";

    loginForm.style.display = "block";

  };

  // =========================
  // HIỆN / ẨN MẬT KHẨU
  // =========================

  const toggles = document.querySelectorAll(".toggle");

  toggles.forEach(function (toggle) {

    toggle.addEventListener("click", function () {

      const input = this.previousElementSibling;

      if (input.type === "password") {

        input.type = "text";

        this.style.opacity = "1";

      } else {

        input.type = "password";

        this.style.opacity = "0.6";

      }

    });

  });

});
// =========================
// BIẾN LƯU MÃ XÁC NHẬN
// =========================

let verificationCode = "";

// =========================
// TẠO MÃ XÁC NHẬN
// =========================

window.createCode = function () {

  verificationCode = "";

  for (let i = 0; i < 6; i++) {

    verificationCode += Math.floor(Math.random() * 10);

  }

  alert("Mã xác nhận của bạn là: " + verificationCode);

};

// =========================
// CẬP NHẬT MẬT KHẨU
// =========================

window.updatePassword = function () {

  const email = document.getElementById("emailForgot").value.trim();

  const code = document.getElementById("code").value.trim();

  const newPassword = document.getElementById("newPassword").value;

  const confirmNewPassword =
    document.getElementById("confirmNewPassword").value;

  // Kiểm tra nhập đầy đủ

  if (!email || !code || !newPassword || !confirmNewPassword) {

    alert("Vui lòng điền đầy đủ thông tin!");

    return;

  }

  // Kiểm tra mã xác nhận

  if (code !== verificationCode) {

    alert("Mã xác nhận không đúng!");

    return;

  }

  // Kiểm tra mật khẩu nhập lại

  if (newPassword !== confirmNewPassword) {

    alert("Mật khẩu nhập lại không khớp!");

    return;

  }

  // Lấy danh sách tài khoản

  let danhSachTaiKhoan = localStorage.getItem("danhSachTaiKhoan");

  if (danhSachTaiKhoan === null || danhSachTaiKhoan === "") {

    alert("Không tìm thấy tài khoản!");

    return;

  }

  // Tách danh sách tài khoản

  let cacTaiKhoan = danhSachTaiKhoan.split(";");

  let timThay = false;

  let danhSachMoi = "";

  for (let i = 0; i < cacTaiKhoan.length; i++) {

    if (cacTaiKhoan[i] === "") {

      continue;

    }

    let thongTin = cacTaiKhoan[i].split("|");

    let hoTen = thongTin[0];

    let taiKhoan = thongTin[1];

    let matKhau = thongTin[2];

    if (taiKhoan === email) {

      matKhau = newPassword;

      timThay = true;

    }

    danhSachMoi += hoTen + "|" + taiKhoan + "|" + matKhau + ";";

  }

  // Không tìm thấy tài khoản

  if (!timThay) {

    alert("Email không tồn tại!");

    return;

  }

  // Lưu lại danh sách mới

  localStorage.setItem("danhSachTaiKhoan", danhSachMoi);

  alert("Cập nhật mật khẩu thành công!");

  // Xóa dữ liệu nhập

  document.getElementById("emailForgot").value = "";
  document.getElementById("code").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("confirmNewPassword").value = "";

  verificationCode = "";

  // Quay về form đăng nhập

  forgotPasswordForm.style.display = "none";

  loginForm.style.display = "block";

};