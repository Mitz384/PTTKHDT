// Hàm tính tiền sản phẩm trong giỏ hàng
function calcTotalPrice(product_cart){
  let totalPrice = 0;
  product_cart.forEach((p) => {
    let productId = p.ID;
    if($(`#select-prod_${productId}`).is(":checked")){
      let quantity = document.querySelector(`.input-quantity-${productId}`).value;
      let price = $(`.prod-price-${productId}`).text();
      price = price.slice(0, -1);
      price = price.replace(/\./g, '');
      price = parseInt(price);
      totalPrice += quantity * price;  
    }
  });
  totalPrice = totalPrice.toLocaleString('de-DE');
  $('.total-price').html(`<p class="prod-price text-primary m-0">Tổng thành tiền: <span class="fw-medium">${totalPrice}</span><span class="fs-10px fw-medium text-decoration-underline" style="vertical-align: super;">đ</span></p>`);
}

// Thay đổi số lượng
function upDateQuality(product_cart){
  product_cart.forEach((p) => {
    // Tăng số lượng 
    const productId = p.ID;
    document.querySelector(`.increase-btn-${productId}`).addEventListener('click', ()=>{
      let quantityInput = document.querySelector(`.input-quantity-${productId}`);
      let currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
      p.quantity.quantity = quantityInput.value;
      calcTotalPrice(product_cart);
    });
  
    // Giảm số lượng
    document.querySelector(`.decrease-btn-${productId}`).addEventListener('click', ()=>{
      let quantityInput = document.querySelector(`.input-quantity-${productId}`);
      let currentValue = parseInt(quantityInput.value);
      if(currentValue > 1){
        quantityInput.value = currentValue - 1;
        p.quantity.quantity = quantityInput.value;
        
      }
      calcTotalPrice(product_cart); // Tính lại tổng giá tiền
    });
  });
}

// Hàm in thông tin sản phẩm trong giỏ hàng
function printCart(prod){
  const cartShow = $('#cartModal .modal-body');
  document.querySelector('#cartModal .modal-body').innerHTML = '';
  if(prod == null || prod.length == 0){
    document.querySelector('.total-price').innerHTML = '';
    cartShow.append(
      $(`<p>Không có sản phẩm trong giỏ hàng</p>`)
    );
  }
  else{
    let productID = 1;
    prod.forEach((p) => {
      p.ID = productID;
      cartShow.append(
        $(`
        <div class="d-flex list_prod_cart cart-prod-${productID}">
          <input type="checkbox" name="" id="select-prod_${productID}">
          <label for="select-prod_${productID}">
            <div class="container">
              <div class="row">
                <div class="col-4">
                  <img src="${p.info.baseURL}/${p.info.folder}_1.png" alt="" class="rounded overflow-hidden"  style="max-width: 100%; height: auto;">
                </div>
                <div class="col-8 pe-0 modal-product-description d-flex align-iteams-center justify-content-between pe-3"
                  <div class="col-11 d-flex flex-column gap-3 ">
                    <div class="selected-info d-flex flex-column gap-2 w-100">
                      <p class="fs-14px m-0">${p.info.name}</p>
                      <div class="d-flex gap-5">
                        <p class="fs-14px text-secondary-emphasis mb-0">Màu: ${p.info.color}</p>
                        <p class="fs-14px text-secondary-emphasis mb-0">Size: ${p.info.size}</p>
                      </div>
                      <div class="add-quantity">
                        <div class="input-group border rounded" style="width: 30%;">
                          <button class="input-group-text text-primary h-100 bg-white border-0 decrease-btn-${productID}">-</button>
                          <input type="number" class="form-control border-0 text-center input-quantity-${productID}" value=${p.quantity.quantity}>
                          <button class="input-group-text text-primary h-100 bg-white border-0 increase-btn-${productID}">+</button>
                        </div>
                      </div>
                      <div class="Price">
                        <h3 class="prod-price-${productID} fs-20px text-primary fw-medium">${p.quantity.price}<span class="fs-12px fw-medium text-decoration-underline" style="vertical-align: super;">đ</span></h3>
                      </div>
                    </div>
                    <div class="col-1 d-flex align-items-center">
                      <button class="btn remove-btn" onclick="removeFromCart(${prod}, ${productID})">
                        <i class="bi bi-trash-fill" style="font-size; 30px"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>`
        )
      );
      productID++;
    });
  }
  $('.increase-btn, .decrease-btn').click(() => calcTotalPrice(prod));
  $('input[type=checkbox]').change(() => calcTotalPrice(prod));
  // $('.remove-btn').click(() => removeFromCart(prod, p.ID))
  $('.remove-btn').each((index, button) => {
    $(button).click(() => removeFromCart(prod, prod[index].ID));
  })
}
// Xoá sản phẩm khỏi giỏ hàng
function removeFromCart(product_cart, productId){
  product_cart = product_cart.filter(p => p.ID !== productId);
  document.querySelector(`.cart-prod-${productId}`).remove();
  localStorage.setItem('shoppingCart', JSON.stringify(product_cart));
  alert('Đã xoá sản phẩm khỏi giỏ hàng!');
  calcTotalPrice(product_cart);
  printCart(product_cart)
}

export {printCart, upDateQuality}