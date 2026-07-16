
document.addEventListener("DOMContentLoaded", () => {
  

  const menuCheckbox = document.getElementById("menu-control");
  const drawerLinks = document.querySelectorAll(".menu-drawer-list a");

  drawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (menuCheckbox) {
        menuCheckbox.checked = false; // Tắt checkbox để đóng drawer
      }
    });
  });

  
  const header = document.querySelector(".header");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

 
  const consultantForm = document.getElementById("consultantForm");

  if (consultantForm) {
    consultantForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Ngăn trình duyệt load lại trang

      // Lấy dữ liệu từ các ô input
      const fullName = document.getElementById("fullName").value.trim();
      const phoneNumber = document.getElementById("phoneNumber").value.trim();
      const learningGoal = document.getElementById("learningGoal").value;

      
      const phoneRegex = /^[0-9]{10,11}$/;
      if (!phoneRegex.test(phoneNumber)) {
        alert("Xin vui lòng nhập số điện thoại hợp lệ (10 - 11 chữ số)!");
        return;
      }

  
      alert(
        `🎉 Đăng ký tư vấn thành công!\n\n` +
        `Chào Ba/Mẹ: ${fullName}\n` +
        `Số điện thoại: ${phoneNumber}\n` +
        `Lớp đăng ký: ${learningGoal}\n\n` +
        `BrightEnglish sẽ liên hệ lại với Ba/Mẹ trong vòng 24 giờ tới để xếp lịch học thử cho bé.`
      );

    
      consultantForm.reset();
    });
  }
});
