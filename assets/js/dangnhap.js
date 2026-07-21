// LƯU MÃ XÁC NHẬN
let maXacNhan = "";

// TẠO MÃ XÁC NHẬN 6 SỐ
function taoMaXacNhan(){
    maXacNhan = "";
    // Ngẫu nhiên 6 chữ số
    for(let i = 0; i < 6; i++){
        maXacNhan += Math.floor(Math.random() * 10);
    }
    // Hiển thị mã xác nhận
    alert("Mã xác nhận của bạn là: " + maXacNhan);
}

// HÀM ĐĂNG NHẬP
function dangNhap(){
    // Xóa thông báo lỗi cũ
    document.getElementById("accountError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    // Lấy dữ liệu người dùng nhập
    let account = document.getElementById("account").value;
    let password = document.getElementById("password").value;
    let hopLe = true;

    // Kiểm tra tài khoản
    if(account == ""){
        document.getElementById("accountError").textContent = "Vui lòng nhập Email hoặc số điện thoại.";
        hopLe = false;
    }

    // Kiểm tra mật khẩu
    if(password == ""){
        document.getElementById("passwordError").textContent = "Vui lòng nhập mật khẩu.";
        hopLe = false;
    }

    // Nếu còn lỗi
    if(hopLe == false){
        return;
    }

    // Lấy danh sách tài khoản
    let danhSachTaiKhoan = localStorage.getItem("danhSachTaiKhoan");

    // Chưa có tài khoản
    if(danhSachTaiKhoan == null || danhSachTaiKhoan == ""){
        alert("Bạn chưa có tài khoản.");
        return;
    }

    // Tách từng tài khoản
    let ds = danhSachTaiKhoan.split(";");

    let dangNhapThanhCong = false;

    // Kiểm tra từng tài khoản
    for(let i = 0; i < ds.length - 1; i++){
        let thongTin = ds[i].split("|");
        let taiKhoan = thongTin[1];
        let matKhau = thongTin[2];
        if(account == taiKhoan && password == matKhau){
            dangNhapThanhCong = true;
            // Lưu tài khoản đang đăng nhập
            localStorage.setItem("nguoiDungDangNhap", taiKhoan);
            break;
        }
    }

    // Kết quả đăng nhập
    if(dangNhapThanhCong){
        alert("Đăng nhập thành công!");
        window.location.href = "trangchu.html";
    }
    else{
        document.getElementById("accountError").textContent = "Email hoặc số điện thoại hoặc mật khẩu không đúng.";
    }
}

// HÀM CẬP NHẬT MẬT KHẨU
function capNhatMatKhau(){
    // Xóa thông báo lỗi
    document.getElementById("accountErrorForgot").textContent = "";
    document.getElementById("codeError").textContent = "";
    document.getElementById("passwordErrorForgot").textContent = "";
    document.getElementById("repasswordErrorForgot").textContent = "";

    // Lấy dữ liệu
    let account = document.getElementById("accountForgot").value;
    let code = document.getElementById("code").value;
    let password = document.getElementById("passwordForgot").value;
    let repassword = document.getElementById("repasswordForgot").value;

    let hopLe = true;

    // Kiểm tra tài khoản
    if(account == ""){
        document.getElementById("accountErrorForgot").textContent = "Vui lòng nhập Email hoặc số điện thoại.";
        hopLe = false;
    }

    // Kiểm tra mã xác nhận
    if(code == ""){
        document.getElementById("codeError").textContent = "Vui lòng nhập mã xác nhận.";
        hopLe = false;
    }
    else if(code != maXacNhan){
        document.getElementById("codeError").textContent = "Mã xác nhận không đúng.";
        hopLe = false;
    }

    // Kiểm tra mật khẩu
    if(password == ""){
        document.getElementById("passwordErrorForgot").textContent = "Vui lòng nhập mật khẩu mới.";
        hopLe = false;
    }
    else if(password.length < 6){
        document.getElementById("passwordErrorForgot").textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
        hopLe = false;
    }

    // Kiểm tra nhập lại mật khẩu
    if(repassword == ""){
        document.getElementById("repasswordErrorForgot").textContent = "Vui lòng nhập lại mật khẩu.";
        hopLe = false;
    }
    else if(password != repassword){
        document.getElementById("repasswordErrorForgot").textContent = "Mật khẩu không trùng khớp.";
        hopLe = false;
    }

    // Nếu còn lỗi
    if(hopLe == false){
        return;
    }

    // Lấy danh sách tài khoản
    let danhSachTaiKhoan = localStorage.getItem("danhSachTaiKhoan");

    if(danhSachTaiKhoan == null || danhSachTaiKhoan == ""){
        alert("Chưa có tài khoản.");
        return;
    }

    // Tách thành mảng
    let ds = danhSachTaiKhoan.split(";");
    let chuoiMoi = "";
    let timThay = false;

    // Duyệt từng tài khoản
    for(let i = 0; i < ds.length - 1; i++){
        let thongTin = ds[i].split("|");
        let hoTen = thongTin[0];
        let taiKhoan = thongTin[1];
        let matKhau = thongTin[2];

        // Nếu đúng tài khoản thì đổi mật khẩu
        if(taiKhoan == account){
            matKhau = password;
            timThay = true;
        }
        chuoiMoi += hoTen + "|" + taiKhoan + "|" + matKhau + ";";
    }

    // Không tìm thấy tài khoản
    if(timThay == false){
        document.getElementById("accountErrorForgot").textContent = "Email hoặc số điện thoại không tồn tại.";
        return;
    }

    // Lưu lại
    localStorage.setItem("danhSachTaiKhoan", chuoiMoi);
    alert("Đổi mật khẩu thành công!");
    window.location.href = "dangnhap.html";
}

// HIỆN / ẨN MẬT KHẨU ĐĂNG NHẬP
function anHienMatKhauDangNhap(){
    let matKhau = document.getElementById("password");
    let conMat = document.getElementById("conMatDangNhap");

    if(matKhau.type == "password"){
        matKhau.type = "text";
        conMat.classList.remove("fa-eye");
        conMat.classList.add("fa-eye-slash");
    }
    else{
        matKhau.type = "password";
        conMat.classList.remove("fa-eye-slash");
        conMat.classList.add("fa-eye");
    }
}

// HIỆN / ẨN MẬT KHẨU DÙNG CHUNG
function anHienMatKhau(idMatKhau,idConMat){
    let matKhau = document.getElementById(idMatKhau);
    let conMat = document.getElementById(idConMat);

    if(matKhau.type == "password"){
        matKhau.type = "text";
        conMat.classList.remove("fa-eye");
        conMat.classList.add("fa-eye-slash");
    }
    else{
        matKhau.type = "password";
        conMat.classList.remove("fa-eye-slash");
        conMat.classList.add("fa-eye");
    }
}

// MỞ FORM QUÊN MẬT KHẨU
function moQuenMatKhau(){
    document.getElementById("formDangNhap").style.display = "none";
    document.getElementById("formQuenMatKhau").style.display = "block";
}

// QUAY LẠI ĐĂNG NHẬP
function quayLaiDangNhap(){
    document.getElementById("formDangNhap").style.display = "block";
    document.getElementById("formQuenMatKhau").style.display = "none";
}