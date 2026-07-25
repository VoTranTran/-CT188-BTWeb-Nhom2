const scroll_To = (selector) => {
  const selectorElement = document.querySelector(selector);
  const headerHeight = 205;

  const selectorTop = selectorElement.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: selectorTop - headerHeight,
    behavior: "smooth"
  });
}

function setupTimelineScroll() {
  const icons = document.querySelectorAll('.order-timeline__icon');
  const sections = ['.cart-section', '.checkout-personal', '.checkout-payment'];

  icons.forEach((icon, index) => {
    icon.addEventListener('click', function () {
      scroll_To(sections[index]); //chạy theo index trong sections
    });
  });
}

function add_class(selector, className) {
  const selectorElement = document.querySelector(selector);
  selectorElement.classList.add(className);
}

function updateTimeLine(step) {
  const totalStep = 3;
  const bar = document.querySelector(".order-timeline__bar");
  const percentBar = (step / totalStep) * 100;
  bar.style.backgroundSize = `${percentBar}% 100%`; // set lại style background-size

  document.querySelectorAll(".order-timeline__icon").forEach((el, index) => {
    const isActive = (step == totalStep) ? true : (index < step); // nếu step = total thì tất cả đều active
    el.classList.toggle("order-timeline__icon--active", isActive); // nếu isActive là true thì add nếu là false thì remove
  });

  document.querySelectorAll(".order-timeline__dot").forEach((el, index) => {
    const isActive = (step == totalStep) ? true : (index < step);
    el.classList.toggle("order-timeline__dot--active", isActive);
  });
}

function runParallax() {
  document.querySelectorAll(".checkout-personal__img").forEach((img, index) => {
    let startY = img.getBoundingClientRect().top + window.scrollY;
    const speed = 0.1;

    window.addEventListener("scroll", function () {
      const scrolled = window.scrollY;
      img.style.transform = `translateY(${(scrolled - startY) * speed}px)`;
    });
  });
}

function updateTotalPrice(product_item, quantity) {
  const priceElement = product_item.querySelector('.cart-grid__col--price');
  const totalElement = product_item.querySelector('.cart-grid__col--total');
  const priceNumber = parseInt(priceElement.textContent.replace(/[^0-9]/g, ''));
  const total = priceNumber * quantity;
  totalElement.textContent = total.toLocaleString('en-US') + ' VNĐ';
}

function calculate() {
  let total = 0;
  const product_item = document.querySelectorAll(".cart-grid--product-item");
  product_item.forEach(item => {
    const checkBox = item.querySelector(".cart-grid__col--action input");
    const totalElement = item.querySelector(".cart-grid__col--total");
    if (checkBox.checked) {
      const priceNumber = parseInt(totalElement.textContent.replace(/[^0-9]/g, ''));
      total += priceNumber;
    }
  });
  const format_total = total.toLocaleString('en-US') + " VND";
  const column_total_price = document.querySelector(".cart__total-price");
  const paymentValue = document.querySelector(".payment-amount__value");
  paymentValue.textContent = format_total;
  column_total_price.textContent = format_total;
}

//section-3
function quantityButtons() {
  const btn_minus = document.querySelectorAll(".cart-grid__btn-qty--minus");
  btn_minus.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const product_item = this.closest('.cart-grid--product-item');
      const quantity = product_item.querySelector(".cart-grid__qty-value");
      let currentQuantity = parseInt(quantity.textContent);
      if (currentQuantity > 1) {
        currentQuantity--;
        quantity.textContent = currentQuantity;
        updateTotalPrice(product_item, currentQuantity);
        calculate();
      } else if (currentQuantity == 1) {
        const grid_ProductId = product_item.id;
        if (confirm("Xoá sản phẩm này ra khỏi giỏ hàng")) {
          localStorage.removeItem(grid_ProductId);
          product_item.remove();
        }
      }
    })
  })
  document.querySelectorAll(".cart-grid__btn-qty--plus").forEach(function (btn) {
    btn.addEventListener('click', function () {
      const product_item = this.closest('.cart-grid--product-item');
      const quantity = product_item.querySelector(".cart-grid__qty-value");
      let currentQuantity = parseInt(quantity.textContent);
      currentQuantity++;
      quantity.textContent = currentQuantity;
      updateTotalPrice(product_item, currentQuantity);
      calculate();
    });
  });
}


function checkBoxEvent() {
  const checkBoxAll = document.querySelector(".cart-grid__col--action input");
  const checkBoxs = document.querySelectorAll(".cart-grid--product-item .cart-grid__col--action input");
  checkBoxAll.addEventListener('change', (e) => {
    const isCheck = e.target.checked;
    checkBoxs.forEach(item => {
      item.checked = isCheck;
    });
    calculate();
  })
  checkBoxs.forEach(item => {
    item.addEventListener('change', function () {
      checkBoxAll.checked = [...checkBoxs].every(p => p.checked);
      calculate();
    });
  });
}

function deleteEvent() {
  let cardItems = JSON.parse(localStorage.getItem("cardItems")) || null;
  const deleteAllButton = document.querySelector(".cart__features .cart-grid__col--del i");
  const deleteButtons = document.querySelectorAll(".cart-grid--product-item .cart-grid__col--del i");
  let col_product_feature = document.querySelector(".cart__features .cart-grid__col--product");
  deleteAllButton.addEventListener('click', function () {
    if (confirm("xoá tất cả sản phẩm trong giỏ hàng")) {
      localStorage.removeItem("cardItems");
      document.querySelectorAll(".cart-grid--product-item").forEach(el => el.remove());
      col_product_feature.textContent = `Tất cả (0 sản phẩm)`;
    }
  })

  deleteButtons.forEach((item, index) => {
    item.addEventListener('click', function () {
      if (confirm("Xoá sản phẩm này ra khỏi giỏ hàng")) {
        const productRow = item.closest(".cart-grid--product-item");
        const productId = productRow.getAttribute("id");
        console.log(productId);
        cardItems = cardItems.filter(p => p.id !== productId);

        localStorage.setItem('cardItems', JSON.stringify(cardItems));
        productRow.remove();
        col_product_feature.textContent = `Tất cả (${cardItems.length} sản phẩm)`;
        calculate();
      }
    });
  });
}

function btn_products() {
  const btn_submit = document.querySelector(".cart__btn-submit");
  btn_submit.addEventListener('click', () => {
    const hasBoxChecked = document.querySelector(".cart-grid--product-item .cart-grid__col--action input:checked"); // lấy input được chọn 
    if (hasBoxChecked) { // nếu chưa có sản phẩm nào được chọn trả về null
      updateTimeLine(1);
      scroll_To(".checkout-personal");
    } else {
      alert("Vui lòng chọn 1 sản phẩm trước khi xác nhận");
    }
  });
}

// end section-3

// section-5

function selectBank() {
  const bankCards = document.querySelectorAll(".payment-method-item");
  const bankDetails = document.querySelectorAll(".bank-detail");
  const cardDots = document.querySelectorAll(".payment-method-item__dot");
  const confirmBtn = document.querySelector(".payment-info__submit-btn");

  bankCards.forEach(card => {
    card.addEventListener('click', function () {
      bankDetails.forEach(el => {
        el.classList.remove("bank-detail--active");
        el.classList.add("bank-detail--hidden");
      });

      add_class(".payment-info", "show");
      add_class(".payment-default", "hidden");

      const currentDots = this.querySelector(".payment-method-item__dot");
      cardDots.forEach(dot => {
        if (dot === currentDots) {
          dot.classList.add("payment-method-item__dot--active");
        } else {
          dot.classList.remove("payment-method-item__dot--active");
        }
      });

      const bankId = this.id;
      const targetBankData = document.querySelector(`#bankData-${bankId}`);
      if (targetBankData) {
        targetBankData.classList.remove("bank-detail--hidden");
        targetBankData.classList.add("bank-detail--active");
      }
    });
  });
  confirmBtn.addEventListener("click", function () {
    if (confirm("Bạn có chắc muốn chuyển khoản không")) {
      alert("Chuyển khoản thành công");
      updateTimeLine(3);
    }
  })
}
// end section_5
function renderCardItems() {
  const cardItems = JSON.parse(localStorage.getItem("cardItems"));
  if (cardItems.length > 0) {
    const emptyCartView = document.querySelector(".cart__content--empty");
    const nonEmptyCartView = document.querySelector(".cart__content--non-empty");
    emptyCartView.classList.add("cart__content--hidden");
    nonEmptyCartView.classList.remove("cart__content--hidden");


    const column_products = document.querySelector(".cart__products-list");

    const productTotal = `Tất cả (${cardItems.length} sản phẩm)`;
    const col_feature_product = document.querySelector(".cart__features .cart-grid__col--product");
    col_feature_product.textContent = productTotal;

    cardItems.forEach(item => {
      const priceNumber = parseInt(item.priceNew.replace(/[^0-9]/g, ''));
      let totalPrice = priceNumber * item.quantity;
      totalPrice = totalPrice.toLocaleString('en-US') + ' VNĐ';

      const gridProducts = document.createElement("div");
      gridProducts.className = "cart-grid cart-grid--product-item";
      gridProducts.id = item.id;

      const colAction = document.createElement("div");
      colAction.className = "cart-grid__col--action";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      colAction.appendChild(checkbox);

      const colProduct = document.createElement("div");
      colProduct.className = "cart-grid__col--product";

      const img = document.createElement("img");
      img.src = "assets/images/bcbca4f6-70c3-4893-9cc5-211e4b6cf2ab-removebg-preview.png";
      img.alt = item.courseName;
      img.className = "cart-grid__product-img";

      const span = document.createElement("span");
      span.className = "cart-grid__product-name";
      span.textContent = `${item.courseName} - ${item.product_detail}`;

      colProduct.appendChild(img);
      colProduct.appendChild(span);


      const colPrice = document.createElement("div");
      colPrice.className = "cart-grid__col--price";
      colPrice.textContent = item.priceNew;

      const colQuantity = document.createElement("div");
      colQuantity.className = "cart-grid__col--quantity";

      const btnMinus = document.createElement("button");
      btnMinus.className = "cart-grid__btn-qty cart-grid__btn-qty--minus";
      btnMinus.textContent = "-";

      const spanQuantity = document.createElement("span");
      spanQuantity.className = "cart-grid__qty-value";
      spanQuantity.textContent = item.quantity;

      const btnPlus = document.createElement("button");
      btnPlus.className = "cart-grid__btn-qty cart-grid__btn-qty--plus";
      btnPlus.textContent = "+";

      colQuantity.appendChild(btnMinus);
      colQuantity.appendChild(spanQuantity);
      colQuantity.appendChild(btnPlus);

      const colTotal = document.createElement("div");
      colTotal.className = "cart-grid__col--total";
      colTotal.textContent = totalPrice;


      const colDel = document.createElement("div");
      colDel.className = "cart-grid__col cart-grid__col--del";
      const iconDel = document.createElement("i");
      iconDel.className = "fa-solid fa-trash-can";
      colDel.appendChild(iconDel);


      gridProducts.appendChild(colAction);
      gridProducts.appendChild(colProduct);
      gridProducts.appendChild(colPrice);
      gridProducts.appendChild(colQuantity);
      gridProducts.appendChild(colTotal);
      gridProducts.appendChild(colDel);


      column_products.appendChild(gridProducts);
    });

    checkBoxEvent();
    quantityButtons();
    deleteEvent();
    btn_products();
  }
}

function saveInfo() {
  let isValid = true;

  const fullNameElement = document.querySelector("#fullName");
  fullNameElement.addEventListener("blur", function () {
    const label_error = document.querySelector(".full-name__label--error");
    const labelFullName = fullNameElement.nextElementSibling;
    if (!fullNameElement.value) {
      label_error.style.display = "block";
      isValid = false;
    } else {
      label_error.style.display = "none";
      labelFullName.style.top = "-10px";
      isValid = true;
    }
  });

  const phoneNumberElement = document.querySelector("#phoneNumber");
  phoneNumberElement.addEventListener("blur", function () {
    const label_error = phoneNumberElement.nextElementSibling.nextElementSibling;
    const labelPhoneNumer = phoneNumberElement.nextElementSibling;
    const label_invalid = phoneNumberElement.nextElementSibling.nextElementSibling.nextElementSibling;
    if (!phoneNumberElement.value) {
      label_error.style.display = "block";
      isValid = false;
    } else {
      if (isNaN(phoneNumberElement.value) || phoneNumberElement.value.length != 10) {
        label_error.style.display = "none";
        label_invalid.style.display = "block";
        labelPhoneNumer.style.top = "-10px";
        isValid = false;
      } else {
        label_error.style.display = "none";
        label_invalid.style.display = "none";
        labelPhoneNumer.style.top = "-10px";
        isValid = true;
      }
    }
  });
  const form = document.querySelector("#personalForm");
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (isValid) {
      alert("Thông tin của bạn đã được lưu");
      scroll_To(".checkout-payment");
      updateTimeLine(2);
    }
  })
}

function setupfunction() {
  setupTimelineScroll();
  renderCardItems();
  runParallax();
  saveInfo();
  selectBank();
}

document.addEventListener("DOMContentLoaded", function () {
  setupfunction();
});