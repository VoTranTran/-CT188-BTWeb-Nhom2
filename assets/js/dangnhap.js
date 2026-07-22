// Lưu mã xác nhận
let verifyCode = "";

document.addEventListener("DOMContentLoaded", function () {
// Ẩn form Quên mật khẩu
    document.getElementById("forgotPasswordForm").style.display = "none";
    // Ẩn / Hiện mật khẩu
    const toggles = document.querySelectorAll(".toggle");
    toggles.forEach(function (toggle) {
        toggle.addEventListener("click", function () {
            const input = this.previousElementSibling;
            if (input.type === "password") {
                input.type = "text";
                this.style.opacity = "1";
            }
            else {
                input.type = "password";
                this.style.opacity = "0.6";
            }
        });
    });
});

// Đăng nhập
function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    if (email == "" || password == "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    let accountList = localStorage.getItem("danhSachTaiKhoan");
    if (accountList == null) {
        alert("Chưa có tài khoản nào!");
        return;
    }
    const list = accountList.split(";");
    let found = false;
    for (let i = 0; i < list.length; i++) {
        if (list[i] == "") {
            continue;
        }
        const account = list[i].split("|");
        if (account[1] == email && account[2] == password) {
            found = true;
            break;
        }
    }
    if (found) {
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
    }
    else {
        alert("Email hoặc mật khẩu không đúng!");
    }
}

// Hiện form Quên mật khẩu
function showForgotPassword() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("forgotPasswordForm").style.display = "block";
}

// Quay lại đăng nhập
function backToLogin() {
    document.getElementById("forgotPasswordForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

// Tạo mã xác nhận
function createCode() {
    verifyCode = "";
    for (let i = 0; i < 6; i++) {
        verifyCode += Math.floor(Math.random() * 10);
    }
    alert("Mã xác nhận của bạn là: " + verifyCode);
}

// Cập nhật mật khẩu
function updatePassword() {
    const email = document.getElementById("emailForgot").value.trim();
    const code = document.getElementById("code").value.trim();
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmNewPassword").value;

    if (email == "" || code == "" || newPassword == "" || confirmPassword == "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    if (code != verifyCode) {
        alert("Mã xác nhận không đúng!");
        return;
    }
    if (newPassword != confirmPassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    let accountList = localStorage.getItem("danhSachTaiKhoan");

    if (accountList == null) {
        alert("Không tìm thấy tài khoản!");
        return;
    }

    const list = accountList.split(";");

    let newList = "";

    let found = false;

    for (let i = 0; i < list.length; i++) {
        if (list[i] == "") {
            continue;
        }
        const account = list[i].split("|");
        if (account[1] == email) {
            account[2] = newPassword;
            found = true;
        }
        newList += account[0] + "|" + account[1] + "|" + account[2] + ";";
    }
    if (found) {
        localStorage.setItem("danhSachTaiKhoan", newList);
        alert("Cập nhật mật khẩu thành công!");
        backToLogin();
    }
    else {
        alert("Email không tồn tại!");
    }
}