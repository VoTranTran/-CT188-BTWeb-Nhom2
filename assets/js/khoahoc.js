document.addEventListener("DOMContentLoaded", () => {
  let currentCourse = "mamnon";
  let currentFormat = "online";
  const selectedTeachers = {
    mamnon: "0",
    tieuhoc: "0"
  };

  function formatCurrency(number) {
    return number.toLocaleString('vi-VN') + 'đ';
  }

  function updateUI() {
    const teacherIdx = selectedTeachers[currentCourse];

    document.querySelectorAll(".course-hero-inner").forEach(el => {
      if (el.getAttribute("data-course") === currentCourse) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });

    document.querySelectorAll(".syllabus-list, .course-features").forEach(el => {
      if (el.getAttribute("data-course") === currentCourse && el.getAttribute("data-format") === currentFormat) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });

    document.querySelectorAll(".teacher-group").forEach(el => {
      if (el.getAttribute("data-course") === currentCourse) {
        el.classList.add("active");
        el.querySelectorAll(".teacher-box").forEach(box => {
          if (box.getAttribute("data-teacher") === teacherIdx) {
            box.classList.add("active");
          } else {
            box.classList.remove("active");
          }
        });
      } else {
        el.classList.remove("active");
      }
    });

    const activeFeature = document.querySelector(`.course-features[data-course="${currentCourse}"][data-format="${currentFormat}"]`);
    const baseOld = parseInt(activeFeature.getAttribute("data-old"));
    const baseNew = parseInt(activeFeature.getAttribute("data-new"));

    const activeTeacherBtn = document.querySelector(`.teacher-group[data-course="${currentCourse}"] .teacher-btn[data-teacher="${teacherIdx}"]`);
    const offset = parseInt(activeTeacherBtn.getAttribute("data-offset"));

    document.getElementById("price-old").innerText = formatCurrency(baseOld + offset);
    document.getElementById("price-new").innerText = formatCurrency(baseNew + offset);
  }

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentCourse = e.target.getAttribute("data-target");
      updateUI();
    });
  });

  document.querySelectorAll(".format-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".format-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentFormat = e.target.getAttribute("data-format");
      updateUI();
    });
  });

  document.querySelectorAll(".teacher-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const btnEl = e.currentTarget;
      const course = btnEl.closest(".teacher-group").getAttribute("data-course");
      const teacherId = btnEl.getAttribute("data-teacher");
      selectedTeachers[course] = teacherId;
      document.querySelectorAll(`.teacher-group[data-course="${course}"] .teacher-btn`).forEach(b => b.classList.remove("active"));
      btnEl.classList.add("active");
      updateUI();
    });
  });

  function checkHash() {
    const hash = window.location.hash.replace("#", "");
    if (hash === "mamnon" || hash === "tieuhoc") {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      const targetBtn = document.querySelector(`.tab-btn[data-target="${hash}"]`);
      if (targetBtn) {
        targetBtn.classList.add("active");
        currentCourse = hash;
      }
    }
    updateUI();
  }

  window.addEventListener("hashchange", checkHash);
  checkHash();

  
  function addToCard() {
    let cardItems = JSON.parse(localStorage.getItem("cardItems")) || [];
    let card = {
      courseName: document.querySelector(".tab-btn.active").textContent,
      priceOld: document.querySelector("#price-old").textContent,
      priceNew: document.querySelector("#price-new").textContent,
      teacherName: document.querySelector(".teacher-group.active .teacher-box.active h3").textContent.trim(),
      quantity: 1
    };
    cardItems.push(card);
    localStorage.setItem("cardItems", JSON.stringify(cardItems)) 
    alert("Đã thêm vào giỏ hàng")
  }


  const btnAddCart = document.getElementById("btn-add-cart");
  const cartPopup = document.getElementById("cartPopup");
  btnAddCart.addEventListener("click", (event) => {
    event.preventDefault();
    cartPopup.classList.remove("hide");
    cartPopup.classList.add("show");
    setTimeout(() => {
      cartPopup.classList.remove("show");
      cartPopup.classList.add("hide");
      setTimeout(() => {
        cartPopup.classList.remove("hide");
      }, 400);
    }, 3000);
    addToCard();
  });
});