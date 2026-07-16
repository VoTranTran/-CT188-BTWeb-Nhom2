// HÀM ĐĂNG KÝ
function dangKy(){
    // Xóa thông báo lỗi cũ
    document.getElementById("fullnameError").innerHTML="";
    document.getElementById("accountError").innerHTML="";
    document.getElementById("passwordError").innerHTML="";
    document.getElementById("repasswordError").innerHTML="";
    document.getElementById("agreeError").innerHTML="";

    // Lấy dữ liệu người dùng nhập
    let fullname = document.getElementById("fullname").value;
    let account = document.getElementById("account").value;
    let password = document.getElementById("password").value;
    let repassword = document.getElementById("repassword").value;
    let agree = document.getElementById("agree").checked; // Lấy trạng thái checkbox điều khoản
    let hopLe = true;

    // Họ tên
    if(fullname==""){
        document.getElementById("fullnameError").innerHTML= "Vui lòng nhập họ và tên.";
        hopLe=false;
    }

    // Email hoặc số điện thoại
    if(account == ""){
        document.getElementById("accountError").innerHTML = "Vui lòng nhập Email hoặc số điện thoại.";
        hopLe = false;
    }

    else{
        // Nếu có dấu @ thì xem là Email
        if(account.indexOf("@") != -1){
            // Email phải có dấu .
            if(account.indexOf(".") == -1){
                document.getElementById("accountError").innerHTML = "Email không hợp lệ.";
                hopLe = false;
            }
        }
        // Không có @ thì xem là số điện thoại
        else{
            // Kiểm tra đủ 10 số và chỉ chứa số
            if(account.length != 10 || isNaN(account)){
                document.getElementById("accountError").innerHTML = "Số điện thoại không hợp lệ.";
                hopLe = false;
            }
        }
    }

    // Mật khẩu
    if(password==""){
        document.getElementById("passwordError").innerHTML= "Vui lòng nhập mật khẩu.";
        hopLe=false;
    }
    else if(password.length<6){
        document.getElementById("passwordError").innerHTML= "Mật khẩu phải có ít nhất 6 ký tự.";
        hopLe=false;
    }

    // Nhập lại mật khẩu
    if(repassword==""){
        document.getElementById("repasswordError").innerHTML= "Vui lòng nhập lại mật khẩu.";
        hopLe=false;
    }
    // Hai mật khẩu phải giống nhau
    else if(password!=repassword){
        document.getElementById("repasswordError").innerHTML= "Mật khẩu không trùng khớp.";
        hopLe=false;
    }

    // Điều khoản
    if(agree==false){
        document.getElementById("agreeError").innerHTML= "Bạn phải đồng ý với điều khoản.";
        hopLe=false;
    }

    // Nếu còn lỗi thì dừng
    if(hopLe==false){
        return;
    }

    // Lấy danh sách tài khoản từ localStorage
    let danhSachTaiKhoan = JSON.parse(localStorage.getItem("danhSachTaiKhoan"));

    // Nếu chưa có danh sách thì tạo mảng rỗng
    if(danhSachTaiKhoan == null){
        danhSachTaiKhoan = [];
    }
    // Tạo đối tượng tài khoản mới
    let taiKhoan = {
        fullname: fullname,
        account: account,
        password: password
    };
    danhSachTaiKhoan.push(taiKhoan); // Thêm tài khoản vào danh sách
    localStorage.setItem("danhSachTaiKhoan", JSON.stringify(danhSachTaiKhoan)); // Lưu lại localStorage
    // Thông báo
    alert("Đăng ký thành công!");
    // Chuyển sang trang đăng nhập
    window.location.href="dangnhap.html";
}

function anHienMatKhau(idMatKhau,idConMat){
    let matKhau=document.getElementById(idMatKhau); // Lấy ô nhập mật khẩu
    let conMat=document.getElementById(idConMat); // Lấy icon con mắt
    // Nếu đang ẩn mật khẩu
    if(matKhau.type=="password"){
        matKhau.type="text"; // Hiện mật khẩu
        conMat.classList.remove("fa-eye");
        conMat.classList.add("fa-eye-slash");
    }
    // Nếu đang hiện mật khẩu 
    else{
        matKhau.type="password"; // Ẩn mật khẩu
        conMat.classList.remove("fa-eye-slash"); // Đổi icon về mắt thường
        conMat.classList.add("fa-eye");
    }
}