const scroll_To = (selector) => {
  const selectorElement = document.querySelector(selector);
  const headerHeight = 205; // height của header + height của timeline

  const selectorTop = selectorElement.getBoundingClientRect().top + window.scrollY; // lấy vị trí hiện tại tới cạnh trên của thẻ + từ đỉnh đến vị trí hiện tại đã scroll
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
    const isActive = (step == totalStep) ? true : (index < step); // nếu step = total thì tất cả đều active
    el.classList.toggle("order-timeline__dot--active", isActive); // nếu isActive là true thì add nếu là false thì remove
  });
}

function runParallax() {
  document.querySelectorAll(".checkout-personal__img").forEach((img, index) => {
    let startY = img.getBoundingClientRect().top + window.scrollY; // lấy vị trí hiện tại tới cạnh trên của thẻ + từ đỉnh đến vị trí hiện tại đã scroll
    const speed = 0.1; // set speed = 0.1 ảnh sẽ di chuyển bằng 1/10 tốc độ scroll

    window.addEventListener("scroll", function () {
      const scrolled = window.scrollY;
      img.style.transform = `translateY(${(scrolled - startY) * speed}px)`; // đặt lại translate Y
    });
  });
}

function updateTotalPrice(product_item, quantity) {
  const priceElement = product_item.querySelector('.cart-grid__col--price'); // lấy thẻ của cột giá
  const totalElement = product_item.querySelector('.cart-grid__col--total'); // lấy thẻ của cột tổng tiền
  const priceNumber = parseInt(priceElement.textContent.replace(/[^0-9]/g, '')); // lượt bỏ VND
  const total = priceNumber * quantity;
  totalElement.textContent = total.toLocaleString('en-US') + ' VNĐ';
}

function calculate() {
  let total = 0;
  const product_item = document.querySelectorAll(".cart-grid--product-item"); // lấy item product
  product_item.forEach(item => {
    const checkBox = item.querySelector(".cart-grid__col--action input"); // lấy cột click chọn sản phẩm
    const totalElement = item.querySelector(".cart-grid__col--total"); // lấy cột tổng tiền hàng
    if (checkBox.checked) {
      const priceNumber = parseInt(totalElement.textContent.replace(/[^0-9]/g, '')); // Lượt bỏ VNĐ
      total += priceNumber; // cộng dồn vào total
    }
  });
  const format_total = total.toLocaleString('en-US') + " VND"; //sửa lại format VD: 100.000.000 VNĐ
  const column_total_price = document.querySelector(".cart__total-price"); // lấy thẻ giá sản phẩm
  const paymentValue = document.querySelector(".payment-amount__value"); // lấy thẻ giá cần thanh toán chỗ thanh toán 
  paymentValue.textContent = format_total;
  column_total_price.textContent = format_total;
}

//section-3
function saveCartItemQuantity(productId, quantity) {
  const cardItems = JSON.parse(localStorage.getItem("cardItems")) || [];
  const cartItem = cardItems.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity = quantity;
    localStorage.setItem("cardItems", JSON.stringify(cardItems));
  }
}

function quantityButtons() {
  const btn_minus = document.querySelectorAll(".cart-grid__btn-qty--minus"); // lấy tất cả thẻ giảm số lượng sản phẩm
  btn_minus.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const product_item = this.closest('.cart-grid--product-item'); // lấy product item của btn được click 
      const quantity = product_item.querySelector(".cart-grid__qty-value"); // lấy số lượng 
      let currentQuantity = parseInt(quantity.textContent);
      if (currentQuantity > 1) {
        currentQuantity--; // giảm số lượng đi 1
        quantity.textContent = currentQuantity; // đặt lại số lượng mới
        updateTotalPrice(product_item, currentQuantity);
        saveCartItemQuantity(product_item.id, currentQuantity);
        calculate();
      } else if (currentQuantity == 1) {
        const grid_ProductId = product_item.id; // lấy id của sản phẩm
        if (confirm("Xoá sản phẩm này ra khỏi giỏ hàng")) { // nếu đồng ý thẻ xoá product ra khỏi giỏ hàng
          let cardItems = JSON.parse(localStorage.getItem("cardItems")) || null;
          cardItems = cardItems.filter(p => p.id !== grid_ProductId);
          localStorage.setItem('cardItems', JSON.stringify(cardItems));

          let col_product_feature = document.querySelector(".cart__features .cart-grid__col--product");
          col_product_feature.textContent = `Tất cả (${cardItems.length} sản phẩm)`;

          product_item.remove();
        }
      }
    })
  })
  document.querySelectorAll(".cart-grid__btn-qty--plus").forEach(function (btn) { // lấy tất cả btn tăng số lượng sản phẩm
    btn.addEventListener('click', function () {
      const product_item = this.closest('.cart-grid--product-item'); // lấy product item của thẻ được click
      const quantity = product_item.querySelector(".cart-grid__qty-value"); // lấy số lượng
      let currentQuantity = parseInt(quantity.textContent);
      currentQuantity++; // tăng số lượng lên 1
      quantity.textContent = currentQuantity; // đặt lại số lượng
      updateTotalPrice(product_item, currentQuantity);
      saveCartItemQuantity(product_item.id, currentQuantity);
      calculate();
    });
  });
}


function checkBoxEvent() {
  const checkBoxAll = document.querySelector(".cart-grid__col--action input"); // lấy tất cả thẻ input 
  const checkBoxs = document.querySelectorAll(".cart-grid--product-item .cart-grid__col--action input"); // lấy thẻ input ở cột feature
  checkBoxAll.addEventListener('change', (e) => {
    const isCheck = e.target.checked; // kiểm tra xem input có được tick không
    checkBoxs.forEach(item => {
      item.checked = isCheck; // đặt lại toàn bộ input của các sản phẩm theo input của feature
    });
    calculate(); // gọi hàm tính lại số tiền
  })
  checkBoxs.forEach(item => {
    item.addEventListener('change', function () {
      checkBoxAll.checked = [...checkBoxs].every(p => p.checked); // chuyển qua thành mảng nếu tất cả products đều được tích thì set lại input feature cũng được tick
      calculate();
    });
  });
}

function deleteEvent() {
  let cardItems = JSON.parse(localStorage.getItem("cardItems")) || null;
  const deleteAllButton = document.querySelector(".cart__features .cart-grid__col--del i"); // lấy icon thùng rác của cột feature
  const deleteButtons = document.querySelectorAll(".cart-grid--product-item .cart-grid__col--del i"); // lấy tất cả icon thùng rác của products
  let col_product_feature = document.querySelector(".cart__features .cart-grid__col--product");
  deleteAllButton.addEventListener('click', function () {
    if (confirm("xoá tất cả sản phẩm trong giỏ hàng")) {
      localStorage.removeItem("cardItems"); // xoá cardItems ra khỏi localstorage xem như xoá toàn bộ
      document.querySelectorAll(".cart-grid--product-item").forEach(el => el.remove());
      col_product_feature.textContent = `Tất cả (0 sản phẩm)`;
    }
  })

  deleteButtons.forEach((item, index) => {
    item.addEventListener('click', function () {
      if (confirm("Xoá sản phẩm này ra khỏi giỏ hàng")) {
        const productRow = item.closest(".cart-grid--product-item"); // lấy product item
        const productId = productRow.getAttribute("id"); // lấy id
        cardItems = cardItems.filter(p => p.id !== productId); // lọc id của sản phẩm đó

        localStorage.setItem('cardItems', JSON.stringify(cardItems)); // đặt lại localstorage
        productRow.remove();
        col_product_feature.textContent = `Tất cả (${cardItems.length} sản phẩm)`;
        calculate();
      }
    });
  });
}

function btn_products() {
  const btn_submit = document.querySelector(".cart__btn-submit"); // lấy btn submit
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
  const bankCards = document.querySelectorAll(".payment-method-item"); // lấy tất cả banks
  const bankDetails = document.querySelectorAll(".bank-detail"); // lấy tất cả thông tin của tất cả banks
  const cardDots = document.querySelectorAll(".payment-method-item__dot"); 
  const confirmBtn = document.querySelector(".payment-info__submit-btn");

  bankCards.forEach(card => {
    card.addEventListener('click', function () {
      bankDetails.forEach(el => {
        el.classList.remove("bank-detail--active"); // ẩn tất cả thông tin của tất cả banks
        el.classList.add("bank-detail--hidden"); 
      });

      const payment_infoElement = document.querySelector(".payment-info");
      payment_infoElement.classList.add("show"); // hiện thông tin của cột feature

      const payment_defaultElement = document.querySelector(".payment-default");
      payment_defaultElement.classList.add("hidden"); // ẩn đi thông tin mặc định "vui lòng chọn ngân hàng"

      const currentDots = this.querySelector(".payment-method-item__dot"); // lấy dot của thẻ hiện tại được click
      cardDots.forEach(dot => {
        if (dot === currentDots) { // nếu đúng thì thêm class active nếu sai thì remove active
          dot.classList.add("payment-method-item__dot--active");
        } else {
          dot.classList.remove("payment-method-item__dot--active");
        }
      });

      const bankId = this.id; // lấy id bank của thẻ được click
      const targetBankData = document.querySelector(`#bankData-${bankId}`); // lấy đúng id bank được click
      if (targetBankData) {
        targetBankData.classList.remove("bank-detail--hidden"); // hiện thông tin của ngân hàng được click
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
  const cardItems = JSON.parse(localStorage.getItem("cardItems")) || "";
  if (cardItems != "" && cardItems.length > 0) {
    const emptyCartView = document.querySelector(".cart__content--empty"); // lấy thẻ chứa các sản phẩm
    const nonEmptyCartView = document.querySelector(".cart__content--non-empty"); // lấy thẻ chứa thông tin mặt định "chưa có sản phẩm"
    emptyCartView.classList.add("cart__content--hidden"); 
    nonEmptyCartView.classList.remove("cart__content--hidden");


    const column_products = document.querySelector(".cart__products-list"); // lấy danh sách chứa sản phẩm

    const productTotal = `Tất cả (${cardItems.length} sản phẩm)`; 
    const col_feature_product = document.querySelector(".cart__features .cart-grid__col--product");
    col_feature_product.textContent = productTotal;

    cardItems.forEach(item => {
      const priceNumber = parseInt(item.priceNew.replace(/[^0-9]/g, ''));
      let totalPrice = priceNumber * item.quantity;
      totalPrice = totalPrice.toLocaleString('en-US') + ' VNĐ';

      const gridProducts = document.createElement("div"); // tạo thẻ div bao bọc bên ngoài
      gridProducts.className = "cart-grid cart-grid--product-item";
      gridProducts.id = item.id;

      const colAction = document.createElement("div"); 
      colAction.className = "cart-grid__col--action";  
      const checkbox = document.createElement("input"); // thẻ input để tick chọn sản phẩm mua
      checkbox.type = "checkbox";
      colAction.appendChild(checkbox);

      const colProduct = document.createElement("div");
      colProduct.className = "cart-grid__col--product";

      const img = document.createElement("img"); // tạo thẻ img của product
      img.src = "assets/images/bcbca4f6-70c3-4893-9cc5-211e4b6cf2ab-removebg-preview.png";
      img.alt = item.courseName;
      img.className = "cart-grid__product-img";

      const span = document.createElement("span"); // tạo thẻ span chứa tên của product
      span.className = "cart-grid__product-name";
      span.textContent = `${item.courseName} - ${item.product_detail}`;

      colProduct.appendChild(img);
      colProduct.appendChild(span);


      const colPrice = document.createElement("div"); // tạo thẻ div chứa giá của sản phẩm
      colPrice.className = "cart-grid__col--price";
      colPrice.textContent = item.priceNew; 

      const colQuantity = document.createElement("div"); // tạo thẻ div chứa số lượng sản phẩm
      colQuantity.className = "cart-grid__col--quantity";

      const btnMinus = document.createElement("button"); // thẻ button để click giảm sản phẩm
      btnMinus.className = "cart-grid__btn-qty cart-grid__btn-qty--minus";
      btnMinus.textContent = "-";

      const spanQuantity = document.createElement("span");// thẻ span chứa số lượng sản phẩm
      spanQuantity.className = "cart-grid__qty-value";
      spanQuantity.textContent = item.quantity;

      const btnPlus = document.createElement("button"); // thẻ btn để click tăng sản phẩm
      btnPlus.className = "cart-grid__btn-qty cart-grid__btn-qty--plus";
      btnPlus.textContent = "+";

      colQuantity.appendChild(btnMinus);
      colQuantity.appendChild(spanQuantity);
      colQuantity.appendChild(btnPlus);

      const colTotal = document.createElement("div"); // thẻ thẻ div chứa thông tin thành tiền của sản phẩm
      colTotal.className = "cart-grid__col--total";
      colTotal.textContent = totalPrice;


      const colDel = document.createElement("div");// tạo thẻ div chứa icon thùng rác
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

  const fullNameElement = document.querySelector("#fullName"); // lấy thông tin người dùng nhập full name
  fullNameElement.addEventListener("blur", function () {
    const label_error = document.querySelector(".full-name__label--error"); // lấy thẻ label để khi người không nhập thì hiện lên
    const labelFullName = fullNameElement.nextElementSibling; // lấy anh em kế tiếp của thẻ input full name
    if (!fullNameElement.value) { // nếu như chưa nhập
      label_error.style.display = "block"; // hiển thị label error
      isValid = false; // đặt lại là chưa đúng
    } else { // nhập đúng
      label_error.style.display = "none"; // ẩn label error
      labelFullName.style.top = "-10px"; //set lại vị trí của label
      isValid = true;
    }
  });

  const phoneNumberElement = document.querySelector("#phoneNumber"); // lấy input phoneNumber
  phoneNumberElement.addEventListener("blur", function () {
    const label_error = phoneNumberElement.nextElementSibling.nextElementSibling; // lấy label error bằng cách lấy 2 anh kế tiếp của input phoneNumber
    const labelPhoneNumer = phoneNumberElement.nextElementSibling; 
    const label_invalid = phoneNumberElement.nextElementSibling.nextElementSibling.nextElementSibling; // lấy label invalid bằng cách lấy 3 anh kế tiếp của input phoneNumber
    if (!phoneNumberElement.value) { // nếu chưa nhập (trống)
      label_error.style.display = "block"; // hiện thị label chưa nhập
      isValid = false; 
    } else {
      if (isNaN(phoneNumberElement.value) || phoneNumberElement.value.length != 10) { // nếu không phải là số hoặc không đủ 10 số 
        label_error.style.display = "none"; // tắt label chưa nhập
        label_invalid.style.display = "block"; // hiển thị label nhập sai
        labelPhoneNumer.style.top = "-10px"; // đặt lại vị trí của label
        isValid = false;
      } else { // nhập đúng
        label_error.style.display = "none"; // ẩn label chưa nhập
        label_invalid.style.display = "none"; // ẩn label không hợp lệ
        labelPhoneNumer.style.top = "-10px"; 
        isValid = true;
      }
    }
  });

  const noteElement = document.querySelector("#note");
  noteElement.addEventListener("blur", function() {
    labelNote = noteElement.nextElementSibling;
    if(noteElement.value != "") {
      labelNote.style.top = "-10px";
    }
  });
  
  const form = document.querySelector("#personalForm");
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (isValid) { // nếu tất cả thông tin đúng
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
