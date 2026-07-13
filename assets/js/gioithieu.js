const moreBtn = document.querySelector(".teacher-view-more");
const teacherMore = document.querySelector(".teacher-more");
moreBtn.addEventListener("click", function () {
  teacherMore.classList.toggle("active");
  moreBtn.classList.toggle("active");
});
