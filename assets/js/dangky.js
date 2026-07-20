// HÀM ĐĂNG KÝ
function dangKy(){
    // Xóa thông báo lỗi cũ
    document.getElementById("fullnameError").textContent = "";
    document.getElementById("accountError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("repasswordError").textContent = "";
    document.getElementById("agreeError").textContent = "";

    // Lấy dữ liệu người dùng nhập
    let fullname = document.getElementById("fullname").value;
    let account = document.getElementById("account").value;
    let password = document.getElementById("password").value;
    let repassword = document.getElementById("repassword").value;
    let agree = document.getElementById("agree").checked;
    let hopLe = true;

    // Họ tên
    if(fullname == ""){
        document.getElementById("fullnameError").textContent = "Vui lòng nhập họ và tên.";
        hopLe = false;
    }

    // Email hoặc số điện thoại
    if(account == ""){
        document.getElementById("accountError").textContent = "Vui lòng nhập Email hoặc số điện thoại.";
        hopLe = false;
    }
    else{
        // Nếu có @ thì xem là Email
        if(account.indexOf("@") != -1){
            // Email phải có dấu .
            if(account.indexOf(".") == -1){
                document.getElementById("accountError").textContent = "Email không hợp lệ.";
                hopLe = false;
            }
        }
        // Không có @ thì xem là số điện thoại
        else{
            // Kiểm tra đủ 10 số
            if(account.length != 10 || isNaN(account)){
                document.getElementById("accountError").textContent = "Số điện thoại không hợp lệ.";
                hopLe = false;
            }
        }
    }

    // Mật khẩu
    if(password == ""){
        document.getElementById("passwordError").textContent = "Vui lòng nhập mật khẩu.";
        hopLe = false;
    }
    else if(password.length < 6){
        document.getElementById("passwordError").textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
        hopLe = false;
    }

    // Nhập lại mật khẩu
    if(repassword == ""){
        document.getElementById("repasswordError").textContent = "Vui lòng nhập lại mật khẩu.";
        hopLe = false;
    }
    else if(password != repassword){
        document.getElementById("repasswordError").textContent = "Mật khẩu không trùng khớp.";
        hopLe = false;
    }

    // Điều khoản
    if(agree == false){
        document.getElementById("agreeError").textContent = "Bạn phải đồng ý với điều khoản.";
        hopLe = false;
    }

    // Nếu còn lỗi thì dừng
    if(hopLe == false){
        return;
    }

    // Lấy danh sách tài khoản từ localStorage
    let danhSachTaiKhoan = localStorage.getItem("danhSachTaiKhoan");

    // Nếu chưa có thì tạo chuỗi rỗng
    if(danhSachTaiKhoan == null){
        danhSachTaiKhoan = "";
    }

    // Tạo chuỗi tài khoản mới
    let taiKhoanMoi = fullname + "|" + account + "|" + password + ";";

    // Thêm vào danh sách
    danhSachTaiKhoan = danhSachTaiKhoan + taiKhoanMoi;

    // Lưu lại localStorage
    localStorage.setItem("danhSachTaiKhoan", danhSachTaiKhoan);

    // Thông báo
    alert("Đăng ký thành công!");

    // Chuyển sang trang đăng nhập
    window.location.href = "dangnhap.html";
}

// HÀM HIỆN / ẨN MẬT KHẨU
function anHienMatKhau(idMatKhau, idConMat){
    let matKhau = document.getElementById(idMatKhau);
    let conMat = document.getElementById(idConMat);

    // Nếu đang ẩn mật khẩu
    if(matKhau.type == "password"){
        matKhau.type = "text";
        conMat.classList.remove("fa-eye");
        conMat.classList.add("fa-eye-slash");
    }
    // Nếu đang hiện mật khẩu
    else{
        matKhau.type = "password";
        conMat.classList.remove("fa-eye-slash");
        conMat.classList.add("fa-eye");
    }
}