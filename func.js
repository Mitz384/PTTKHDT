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
  if(checkLoggedIn()){
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
  else{
    alert("Bạn cần đăng nhập để xem giỏ hàng");
  }
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



// Đăng nhập
function logIn(){
  const email = document.querySelector('.login-form input[type="email"]').value;
  const password = document.querySelector('.login-form input[type="password"]').value;
  const users = JSON.parse(localStorage.getItem('userAccount'));
  if(users == null) {
    alert('Vui lòng đăng ký!');
    return;
  }
  let flag = false;
  for(let i = 0; i < users.length; i++){
    console.log(users[i]);
    if(email == users[i].email && password == users[i].password){
      flag = true;
    }
  }
  if(flag == true){
    alert('Đăng nhập thành công!');
    window.location.href = './loggedin.html';
  }
  else{
    alert('Sai mật khẩu hoặc email!');
    document.querySelector('.login-form input[type="email"]').value = '';
    document.querySelector('.login-form input[type="password"]').value = '';
    localStorage.removeItem('isLoggedIn');
  }
  localStorage.setItem('isLoggedIn', flag);
}
// Kiểm tra đăng nhập
function checkLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}



// Đăng ký
function signUp(){
  // Lấy giá trị từ form input
  const lastName = document.querySelector('.lName-input').value;
  const firstName = document.querySelector('.fName-input').value;
  const email = document.querySelector('.sign-up-form input[type="email"]').value;
  const phoneNumber = document.querySelector('.sdt-input').value;
  const password = document.querySelector('.sign-up-form input[type="password"]').value;
  const newUser = {
    username : lastName + ' ' + firstName,
    email : email,
    phoneNumber : phoneNumber,
    password : password
  }
  const users = JSON.parse(localStorage.getItem('userAccount')) || [];
  // Kiểm tra đầu vào
  if(!email.includes('@gmail.com') || phoneNumber.length > 10 || phoneNumber.length < 10){
    console.log('lỗi');
  }
  else{
    if($('#accept-condition').is(":checked") && confirmOTP()){
      let isUserExist = users.some(user => user.email === newUser.email || user.phoneNumber === newUser.phoneNumber);
      if(!isUserExist){
        users.push(newUser);
        localStorage.setItem('userAccount', JSON.stringify(users));
        alert("Đăng ký thành công!");
        document.querySelector('.lName-input').value = '';
        document.querySelector('.fName-input').value = '';
        document.querySelector('.sign-up-form input[type="email"]').value = '';
        document.querySelector('.sdt-input').value = '';
        document.querySelector('.sign-up-form input[type="password"]').value = '';
        document.querySelector('.OTP-input').value = '';
        document.querySelector('.confirm-otp-btn').classList.add('hidden');
        document.querySelector('.send-otp-btn').classList.remove('hidden');
        document.querySelector('#accept-condition').checked = false;
      } 
      else {
        alert("Email hoặc số điện thoại đã được sử dụng");
      }
    }
    else{
      alert('Vui lòng chấp nhận điều khoản để tiếp tục để đăng ký')
    }
    
  }
  console.log(users);
}
// OTP
function OTP(){
  const otp = generateOTP();
  sessionStorage.setItem('otp', otp);
  alert(`Mã OTP của bạn là: ${otp}`);
  document.querySelector('.send-otp-btn').classList.add('hidden');
  document.querySelector('.confirm-otp-btn').classList.remove('hidden');
}
// Gửi mã OTP
function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString().substring(0, 6);
}
// Xác thực OTP
function confirmOTP(){
  const otp_input = document.querySelector('.OTP-input').value;
  const otp_confirm = sessionStorage.getItem('otp');
  if(otp_input == otp_confirm){
    return true;
  }
  else{
    return false;
  }
}


// Đăng xuất
function logOut(){
  localStorage.removeItem('isLoggedIn');
  alert('Đã đăng xuất thành công');
  window.location.href = './index.html';
}
export {printCart, upDateQuality, signUp, OTP, confirmOTP, logIn, checkLoggedIn, logOut}