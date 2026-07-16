// Lưu mã xác nhận
let maXacNhan = "";
// TẠO MÃ XÁC NHẬN 6 SỐ
function taoMaXacNhan() {
    maXacNhan = ""; // Xóa mã cũ
    for (let i = 0; i < 6; i++) { // Tạo ngẫu nhiên 6 chữ số
        maXacNhan += Math.floor(Math.random() * 10);
    } 
    alert("Mã xác nhận của bạn là: " + maXacNhan);  // Hiển thị mã xác nhận
}

// ĐĂNG NHẬP
function dangNhap() {
    // Xóa thông báo lỗi cũ
    document.getElementById("accountError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";

    // Lấy dữ liệu người đăng nhập
    let account = document.getElementById("account").value;
    let password = document.getElementById("password").value;
    let hopLe = true; // Biến kiểm tra dữ liệu hợp lệ

    // Kiểm tra Email hoặc số điện thoại
    if (account == "") {
        document.getElementById("accountError").innerHTML = "Vui lòng nhập Email hoặc số điện thoại.";
        hopLe = false;
    }

    // Kiểm tra mật khẩu
    if (password == "") {
        document.getElementById("passwordError").innerHTML = "Vui lòng nhập mật khẩu.";
        hopLe = false;
    }

    // Nếu có lỗi thì dừng
    if (hopLe == false) { 
        return; 
    }

    // Lấy danh sách tài khoản từ localStorage
    let danhSachTaiKhoan = JSON.parse(localStorage.getItem("danhSachTaiKhoan"));
    // Nếu chưa có tài khoản
    if (danhSachTaiKhoan == null || danhSachTaiKhoan.length == 0) {
        alert("Bạn chưa có tài khoản.");
        return;
    }
    let dangNhapThanhCong = false; // Biến kiểm tra đăng nhập thành công

    // Duyệt từng tài khoản
    for (let i = 0; i < danhSachTaiKhoan.length; i++) {
        // So sánh tài khoản và mật khẩu
        if (account == danhSachTaiKhoan[i].account && password == danhSachTaiKhoan[i].password) { 
            dangNhapThanhCong = true;
            // Lưu người đang đăng nhập
            localStorage.setItem("nguoiDungDangNhap", JSON.stringify(danhSachTaiKhoan[i]));
            break;
        }
    }

    // Đăng nhập thành công
    if (dangNhapThanhCong) {
        alert("Đăng nhập thành công!");
        window.location.href = "trangchu.html"; // Chuyển sang trang chủ
    }
    // Sai tài khoản hoặc mật khẩu
    else {
        document.getElementById("accountError").innerHTML = "Email hoặc số điện thoại hoặc mật khẩu không đúng.";
    }
}

// QUÊN MẬT KHẨU
function capNhatMatKhau() {
    // Xóa thông báo lỗi cũ
    document.getElementById("accountErrorForgot").innerHTML = "";
    document.getElementById("codeError").innerHTML = "";
    document.getElementById("passwordErrorForgot").innerHTML = "";
    document.getElementById("repasswordErrorForgot").innerHTML = "";

    // Lấy dữ liệu người dùng nhập
    let account=document.getElementById("accountForgot").value;
    let code = document.getElementById("code").value;
    let password=document.getElementById("passwordForgot").value;
    let repassword=document.getElementById("repasswordForgot").value;
    let hopLe = true;  // Biến kiểm tra hợp lệ

    // Kiểm tra Email hoặc số điện thoại
    if (account == "") {
        document.getElementById("accountErrorForgot").innerHTML = "Vui lòng nhập Email hoặc số điện thoại.";
        hopLe = false;
    }

    // Kiểm tra mã xác nhận
    if (code == "") {
        document.getElementById("codeError").innerHTML = "Vui lòng nhập mã xác nhận.";
        hopLe = false;
    }
    // Kiểm tra mã có đúng không
    else if (code != maXacNhan) {
        document.getElementById("codeError").innerHTML = "Mã xác nhận không đúng.";
        hopLe = false;
    }

    // Kiểm tra mật khẩu
    if (password == "") {
        document.getElementById("passwordErrorForgot").innerHTML = "Vui lòng nhập mật khẩu mới.";
        hopLe = false;
    }
    // Kiểm tra độ dài mật khẩu
    else if (password.length < 6) {
        document.getElementById("passwordErrorForgot").innerHTML = "Mật khẩu phải có ít nhất 6 ký tự.";
        hopLe = false;
    }

    // Kiểm tra nhập lại mật khẩu
    if (repassword == "") {
        document.getElementById("repasswordErrorForgot").innerHTML = "Vui lòng nhập lại mật khẩu.";
        hopLe = false;
    }
    // Kiểm tra hai mật khẩu có giống nhau không
    else if (password != repassword) {
        document.getElementById("repasswordErrorForgot").innerHTML = "Mật khẩu không trùng khớp.";
        hopLe = false;
    }

    // Nếu có lỗi thì dừng
    if (hopLe == false) {
        return;
    }

    // Lấy danh sách tài khoản
    let danhSachTaiKhoan = JSON.parse(localStorage.getItem("danhSachTaiKhoan"));
    // Nếu chưa có tài khoản
    if (danhSachTaiKhoan == null || danhSachTaiKhoan.length == 0) {
        alert("Chưa có tài khoản.");
        return;
    }
    let timThay = false; // Biến kiểm tra tìm thấy tài khoản
    // Tìm tài khoản cần đổi mật khẩu
    for (let i = 0; i < danhSachTaiKhoan.length; i++) {
        if (danhSachTaiKhoan[i].account == account) {
            danhSachTaiKhoan[i].password = password;// Cập nhật mật khẩu
            timThay = true;
            break;
        }}
    // Không tìm thấy tài khoản
    if (!timThay) {
        document.getElementById("accountError").innerHTML = "Email hoặc số điện thoại không tồn tại.";
        return;
    }
    // Lưu lại localStorage
    localStorage.setItem("danhSachTaiKhoan",JSON.stringify(danhSachTaiKhoan));
    alert("Đổi mật khẩu thành công!");
    window.location.href = "dangnhap.html"; // Quay về trang đăng nhập
}

// HIỆN, ẨN MẬT KHẨU ĐĂNG NHẬP 
function anHienMatKhauDangNhap(){
    let matKhau=document.getElementById("password"); // Lấy ô nhập mật khẩu
    let conMat=document.getElementById("conMatDangNhap");  // Lấy icon con mắt
    // Nếu đang ẩn mật khẩu
    if(matKhau.type=="password"){
        matKhau.type="text";
        conMat.classList.remove("fa-eye");
        conMat.classList.add("fa-eye-slash");
    }
    // Nếu đang hiện mật khẩu
    else{
        matKhau.type="password"; // Ẩn mật khẩu
        conMat.classList.remove("fa-eye-slash");
        conMat.classList.add("fa-eye");
    }
}

// HIỆN, ẨN MẬT KHẨU DÙNG CHUNG
function anHienMatKhau(idMatKhau,idConMat){
    let matKhau=document.getElementById(idMatKhau); // Lấy ô nhập theo id
    let conMat=document.getElementById(idConMat); // Lấy icon theo id
    // Hiện hoặc ẩn mật khẩu
    if(matKhau.type=="password"){
        matKhau.type="text";
        conMat.classList.remove("fa-eye");
        conMat.classList.add("fa-eye-slash");
    }
    else{
        matKhau.type="password";
        conMat.classList.remove("fa-eye-slash");
        conMat.classList.add("fa-eye");
    }
}

// MỞ FORM QUÊN MẬT KHẨU 
function moQuenMatKhau(){
    document.getElementById("formDangNhap").style.display="none"; // Ẩn form đăng nhập
    document.getElementById("formQuenMatKhau").style.display="block"; // Hiện form quên mật khẩu
}

// QUAY LẠI ĐĂNG NHẬP
function quayLaiDangNhap(){
    document.getElementById("formDangNhap").style.display="block"; // Hiện form đăng nhập
    document.getElementById("formQuenMatKhau").style.display="none"; // Ẩn form quên mật khẩu
}