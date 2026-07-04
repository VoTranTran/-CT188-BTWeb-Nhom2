import { fetchApi } from "./fetchApi.js";

const form = document.querySelector("#personalForm");
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('Email').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  const sex = document.getElementById('sex').value;

  let displayDate = '';
    if (dateOfBirth) {
      const date = new Date(dateOfBirth);
      displayDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

  document.getElementById('displayName').textContent = fullName;
  document.getElementById('displayEmail').textContent = email || 'Không có';
  document.getElementById('displayPhone').textContent = phoneNumber;
  document.getElementById('displayBirthday').textContent = displayDate;
  document.getElementById('displayGender').textContent = sex;
  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('infor-display').classList.add('show');
})

document.querySelectorAll(".imgs img").forEach((img, index) => {
  let startY = img.getBoundingClientRect().top + window.scrollY;
  const speed = 0.1;
  
  window.addEventListener("scroll", function() {
    const scrolled = window.scrollY;
    img.style.transform = `translateY(${(scrolled - startY) * speed}px)`;
  });
});


fetchApi("http://localhost:3000/banks")
  .then(data => {
    let htmls = "";
    let value = "";
    const name = document.querySelector("#fullName");
    const phoneNumber = document.querySelector("#phoneNumber");
    data.forEach(item => {
      htmls += `
      <li class="card-item" id="${item.id}">
        <img src="${item.logo}" alt="${item.shortName}">
        <div class="card-title">${item.name}</div>
        <div class="card-circle"></div>
      </li>
      `
      value += `
      <div class="bank-value hidden" id="bankData-${item.id}">
        <div class="bank-name-value">${item.shortName}</div>
        <div class="account-holder-value">Bright English</div>
        <div class="account-number-value">${item.accountNumber}</div>
        <div class="content-value">....</div>
      </div>`
    });
    const bank = document.querySelector("#bank")
    bank.innerHTML = htmls;
    const bankValue = document.querySelector(".grid-card-right")
    bankValue.innerHTML = value;
    document.querySelectorAll(".card-item").forEach(card => {
      card.addEventListener('click', function() {
        document.querySelectorAll('.bank-value').forEach(el => {
        el.classList.remove("active");
        el.classList.add("hidden");
        });

        const card_left = document.querySelector(".grid-card-left");
        card_left.classList.add("active");
        const card_right = document.querySelector(`#bankData-${this.id}`);
        card_right.classList.add("active")
      })
    })
  });

const allKeys = Object.keys(localStorage);
const productKeys = allKeys.filter(key => key.startsWith('Product-'));
if (productKeys.length > 0) {
  const card_empty = document.querySelector(".section-3 .user-card-body .card-empty");
  card_empty.classList.remove("show");
  card_empty.classList.add("hidden");
  const card_non_empty = document.querySelector(".section-3 .user-card-body .card-non-empty");
  card_non_empty.classList.remove("hidden");
  card_non_empty.classList.add("show");
  fetchApi("http://localhost:3000/products")
    .then(products => {
      const cartItems = productKeys.map(key => {
        const productId = key.replace('Product-', '');
        const quantity = parseInt(localStorage.getItem(key));
        const product = products.find(p => p.id == productId);
        return {
          ...product,
          quantity: quantity
        };
      })
      const productTotal = ` (${cartItems.length} sản phẩm)`
      const col_feature_product = document.querySelector(".section-3 .column-feature .col-product");
      col_feature_product.innerHTML += productTotal; 
      let htmls = "";
      cartItems.forEach(item => {
        const priceNumber = parseInt(item.price.replace(/,/g, ''));
        let totalPrice = priceNumber * item.quantity; 
        totalPrice = totalPrice.toLocaleString('en-US') + ' VNĐ';
        htmls += `
        <div class="grid-products">
          <div class="col-action">
            <input type="checkbox">
          </div>
          <div class="col-product">
            <img src="${item.thumbnail}" alt="${item.name}">
            <span>${item.name}</span> 
          </div>
          <div class="col-price">${item.price}</div>
          <div class="col-quantity">${item.quantity}</div>
          <div class="col-total">${totalPrice}</div>
          <div class="col-del"><i class="fa-solid fa-trash-can"></i></div>
        </div>
      `
      })
      const column_products = document.querySelector(".section-3 .user-card-body .column-products");
      column_products.innerHTML = htmls;
      const action_column_feature = document.querySelector(".section-3 .column-feature #selectAll");
      action_column_feature.addEventListener('change', (e) => {
        const isCheck = e.target.checked;
        const action_column_products = document.querySelectorAll(".section-3 .column-products .col-action input");
        action_column_products.forEach(item => {
          item.checked = isCheck;
        });
        calculate();
      })

      const action_column_products = document.querySelectorAll(".section-3 .user-card-body .column-products .grid-products .col-action input");
      action_column_products.forEach(item => {
        item.addEventListener('change', function() {
          calculate();
        });
      });
    });
}

function calculate() {
  let total = 0;
  const grid_products = document.querySelectorAll(".section-3 .user-card-body .column-products .grid-products");
  grid_products.forEach(item => {
    const checkBox = item.querySelector(".col-action input");
    const totalElement = item.querySelector(".col-total");
    if (checkBox.checked) {
      const priceNumber = parseInt(totalElement.textContent.replace(/,/g, ''));
      total += priceNumber;
    }
  });
  const format_total = total.toLocaleString('en-US') + " VND";
  const column_total_price = document.querySelector(".section-3 .user-card-body .column-total-price div span");
  const amount_currency = document.querySelector(".section-5 .payment .payment-body .payment-amount .amount-value");
  amount_currency.innerHTML = format_total;
  column_total_price.innerHTML = format_total;
}