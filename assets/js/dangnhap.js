// Lưu mã xác nhận để kiểm tra khi người dùng nhập
let verifyCode = "";

document.addEventListener("DOMContentLoaded", function () {
// Ẩn form Quên mật khẩu
    document.getElementById("forgotPasswordForm").style.display = "none";
    // Ẩn / Hiện mật khẩu
    const toggles = document.querySelectorAll(".toggle");  // Lấy tất cả icon con mắt
    // Duyệt từng icon
    toggles.forEach(function (toggle) {
        toggle.addEventListener("click", function () {
            const input = this.previousElementSibling; // Lấy ô input đứng ngay trước icon
            // Nếu đang là mật khẩu thì hiện ký tự
            if (input.type === "password") {
                input.type = "text";
                this.style.opacity = "1"; // Làm icon sáng hơn
            }
            // Nếu đang hiện ký tự thì chuyển về dạng mật khẩu
            else {
                input.type = "password";
                this.style.opacity = "0.6"; // Làm icon mờ lại
            }
        });
    });
});

// Đăng nhập
function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Nếu còn ô trống
    if (email == "" || password == "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    // Lấy danh sách tài khoản trong localStorage
    let accountList = localStorage.getItem("danhSachTaiKhoan");

     // Nếu chưa có tài khoản nào
    if (accountList == null) {
        alert("Chưa có tài khoản nào!");
        return;
    }
    const list = accountList.split(";"); // Tách từng tài khoản bằng dấu ;

    let found = false; // Kiểm tra đã tìm thấy tài khoản hay chưa

    // Duyệt toàn bộ danh sách tài khoản
    for (let i = 0; i < list.length; i++) {
        // Bỏ qua phần tử rỗng cuối chuỗi
        if (list[i] == "") {
            continue;
        }
        const account = list[i].split("|"); // Tách dữ liệu thành HọTên | Email | MậtKhẩu
        // Nếu email và mật khẩu đúng
        if (account[1] == email && account[2] == password) {
            found = true;
            break;
        }
    }
     // Nếu đăng nhập thành công
    if (found) {
        alert("Đăng nhập thành công!");
        window.location.href = "index.html"; // Chuyển về trang chủ
    }
    // Nếu sai thông tin
    else {
        alert("Email hoặc mật khẩu không đúng!");
    }
}

// Hiện form Quên mật khẩu
function showForgotPassword() {
    document.getElementById("loginForm").style.display = "none"; // Ẩn form đăng nhập
    document.getElementById("forgotPasswordForm").style.display = "block"; // Hiện form quên mật khẩu
}

// Quay lại đăng nhập
function backToLogin() {
    document.getElementById("forgotPasswordForm").style.display = "none"; // Ẩn form quên mật khẩu
    document.getElementById("loginForm").style.display = "block"; // Hiện lại form đăng nhập
}

// Tạo mã xác nhận
function createCode() {
    verifyCode = ""; // Xóa mã cũ
    // Tạo mã xác nhận gồm 6 chữ số
    for (let i = 0; i < 6; i++) {
        verifyCode += Math.floor(Math.random() * 10);  // Hiện ngẫu nhiên số từ 0 đến 9
    }
    alert("Mã xác nhận của bạn là: " + verifyCode); // Hiển thị mã xác nhận
}

// Cập nhật mật khẩu
function updatePassword() {
    const email = document.getElementById("emailForgot").value.trim();
    const code = document.getElementById("code").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmNewPassword").value.trim();

    // Nếu còn ô trống
    if (email == "" || code == "" || newPassword == "" || confirmPassword == "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    // Nếu mã xác nhận sai
    if (code != verifyCode) {
        alert("Mã xác nhận không đúng!");
        return;
    }
    // Nếu hai mật khẩu không giống nhau
    if (newPassword != confirmPassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    let accountList = localStorage.getItem("danhSachTaiKhoan"); // Lấy danh sách tài khoản

    // Nếu không có tài khoản
    if (accountList == null) {
        alert("Không tìm thấy tài khoản!");
        return;
    }

    const list = accountList.split(";"); // Tách từng tài khoản

    let newList = ""; // Lưu danh sách mới

    let found = false; // Kiểm tra đã tìm thấy email hay chưa

    // Duyệt từng tài khoản
    for (let i = 0; i < list.length; i++) {
        // Bỏ qua phần tử rỗng
        if (list[i] == "") {
            continue;
        }
        const account = list[i].split("|"); // Tách thành HọTên | Email | MậtKhẩu
        // Nếu tìm thấy email cần đổi mật khẩu
        if (account[1] == email) {
            account[2] = newPassword; // Gán mật khẩu mới
            found = true; // Đánh dấu đã tìm thấy
        }
        // Ghép lại chuỗi tài khoản
        newList += account[0] + "|" + account[1] + "|" + account[2] + ";";
    }
    // Nếu cập nhật thành công
    if (found) {
        localStorage.setItem("danhSachTaiKhoan", newList); // Lưu danh sách mới vào localStorage
        alert("Cập nhật mật khẩu thành công!");
        backToLogin(); // Quay về form đăng nhập
    }
    // Nếu email không tồn tại
    else {
        alert("Email không tồn tại!");
    }
}