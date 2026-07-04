import { fetchApi } from "./fetchApi.js";
fetchApi("http://localhost:3000/products")
  .then(data => {
    let htmls = "";
    data.forEach(item => {
      htmls += `
        <div class="inner-list">
          <img src="${item.thumbnail}" alt="${item.name}">
          <div class="card-body">
            <div>${item.name}</div>
            <div class="card-meta">
              <ul>
                <li><i class="fa-solid fa-book"></i><strong>${item.lectures}</strong></li>
                <li><i class="fa-solid fa-user-group"></i><strong>${item.members}</strong></li>
                <li><i class="fa-solid fa-calendar"></i><strong>Khai giảng: ${item.startDate}</strong></li>
                <li><i class="fa-solid fa-calendar"></i><strong>Lịch học: ${item.studyDays}</strong></li>
                <li><i class="fa-regular fa-clock"></i><strong>Giờ học: ${item.studyTime}</strong></li>
              </ul>
            </div>
            <div class="author">
              <a href="#">
                <div class="thour-infor">Đội Ngũ Bright English</div>
              </a>
            </div>
            <span class="current-price">${item.price}</span>
            <span class="old-price"><del>${item.oldPrice}</del></span>
          </div>
          <button class="add-to-cart-btn" id="Product-${item.id}">Thêm vào giỏ hàng</button>
        </div> 
        `;
    });
    const inner_list = document.querySelector(".index .inner-wrap")
    inner_list.innerHTML = htmls;

    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
      btn.addEventListener('click', function(){
        const id = this.id;
        localStorage.setItem(id, "1"); 
      })
    })
  })