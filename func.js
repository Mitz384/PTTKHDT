// Hàm tính tiền sản phẩm trong giỏ hàng
function calcTotalPrice(product_cart){
  let totalPrice = 0;
  for(let i = 0; i < product_cart.length; i++){
    if($(`#select-prod_${i+1}`).is(":checked")){
      let quantity = document.querySelector(`.input-quantity-${i+1}`).value;
      let price = $(`.prod-price-${i+1}`).text();
      price = price.slice(0, -1);
      price = price.replace(/\./g, '');
      price = parseInt(price);
      totalPrice += quantity * price;
    }
  }
  totalPrice = totalPrice.toLocaleString('de-DE');
  $('.total-price').html(`<p class="prod-price text-primary m-0">Tổng thành tiền: <span class="fw-medium">${totalPrice}</span><span class="fs-10px fw-medium text-decoration-underline" style="vertical-align: super;">đ</span></p>`);
}





// Hàm in thông tin sản phẩm trong giỏ hàng
function printCart(){
  const userAPI = 'http://localhost:3000/user_account';
  fetch(userAPI)
    .then(response => response.json())
    .then(users => {
      const user = users.find(user => user.status == "Logged");
      if(!user){
        console.log("không đăng nhập");
        return;
      }
      const cartShow = $('#cartModal .modal-body');
      cartShow.html('');
      user.cart.forEach((p, index) => {
        cartShow.append($(`
          <div class="d-flex list_prod_cart cart-prod-${index+1}">
            <input type="checkbox" name="" id="select-prod_${index+1}">
            <label for="select-prod_${index+1}">
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
                          <button class="input-group-text text-primary h-100 bg-white border-0 decrease-btn-${index+1}">-</button>
                          <input type="number" class="form-control border-0 text-center input-quantity-${index+1}" value=${p.quantity.quantity}>
                          <button class="input-group-text text-primary h-100 bg-white border-0 increase-btn-${index+1}">+</button>
                        </div>
                      </div>
                      <div class="Price">
                        <h3 class="prod-price-${index+1} fs-20px text-primary fw-medium">${p.info.price}<span class="fs-12px fw-medium text-decoration-underline" style="vertical-align: super;">đ</span></h3>
                      </div>
                    </div>
                    <div class="col-1 d-flex align-items-center">
                      <button class="btn remove-btn-${index+1}">
                        <i class="bi bi-trash-fill" style="font-size; 30px"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>`
        ));
        document.querySelector(`.input-quantity-${index + 1}`).addEventListener('input', (event) => {
          const newQuantity = parseInt(event.target.value);
          p.quantity.quantity = newQuantity; // Cập nhật số lượng mới vào giỏ hàng
          calcTotalPrice(user.cart);})
        $(`.increase-btn-${index + 1}`).on('click', function() {
          let quantityInput = $(`.input-quantity-${index + 1}`);
          let currentValue = parseInt(quantityInput.val());
          quantityInput.val(currentValue + 1);
          p.quantity.quantity = currentValue + 1;
          calcTotalPrice(user.cart); // Tính lại tổng giá tiền
        });
        $(`.decrease-btn-${index + 1}`).on('click', function() {
          let quantityInput = $(`.input-quantity-${index + 1}`);
          let currentValue = parseInt(quantityInput.val());
          if (currentValue > 1) {
            quantityInput.val(currentValue - 1);
            p.quantity.quantity = currentValue - 1;
            calcTotalPrice(user.cart); // Tính lại tổng giá tiền
          }
        });
        $(`.remove-btn-${index + 1}`).on('click', function() {
          removeFromCart(user.id, p.info.name, p.info.color, p.info.size);
        });
      });
      $('input[type=checkbox]').change(() => calcTotalPrice(user.cart));
    })
}


function removeFromCart(userID, productName, productColor, productSize) {
  console.log(`http://localhost:3000/user_account/${userID}`);
  fetch(`http://localhost:3000/user_account/${userID}`)
    .then(response => response.json())
    .then(user => {
      if (user.cart.length > 0) {
        const userCart = user.cart;
        // Lọc ra sản phẩm cần xóa
        const updatedCart = userCart.filter(item =>
          item.info.name !== productName ||
          item.info.color !== productColor ||
          item.info.size !== productSize
        );
        // Cập nhật giỏ hàng trên server
        fetch(`http://localhost:3000/user_account/${userID}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cart: updatedCart }),
        })
      }})
    .then(response => {
      if (response.ok) {
        console.log('Giỏ hàng đã được cập nhật.');
      } else {
        console.error('Lỗi khi cập nhật giỏ hàng.');
      }
    })
    .catch(error => console.error('Lỗi:', error));
}

// Tìm kiếm
function searchProduct(valueSearch){
  fetch('http://localhost:3000/product_men_list')
    .then(response => response.json())
    .then(data => {
      const productSearch = data.filter(product => {
        return product.info.name.toLowerCase().includes(valueSearch.toLowerCase());
      })
      const htmls = productSearch.map(prod =>{
        const colorDots = prod.info.colorCode.map(function(color) {
          return `<div class="product-color rounded-circle" style="background-color: ${color}; width: 20px; height: 20px;"></div>`;
          }).join('');
          return `
            <div class="col-lg-3 col-6">
              <a class="card text-decoration-none border-0 rounded overflow-hidden" id="${prod.id}">
                <img src="${prod.info.baseURL}/${prod.info.folder}_1.png" class="rounded-bottom prod-img" alt="">
                <div class="card-body ps-0">
                  <p class="prod-name fs-14px text-primary">${prod.info.name}</p>
                  <h3 class="prod-price fs-20px text-primary fw-semibold">${prod.info.price}<span class="fs-10px" style="vertical-align: super;">đ</span></h3>
                  <div class="prod-color d-flex gap-2">
                    ${colorDots}
                  </div>
                </div>
              </a>
            </div>`;
        }).join('');

        document.querySelector('#product').innerHTML = htmls;
    })
}



// Đăng nhập
function logIn(){
  const email = document.querySelector('.login-form input[type="email"]').value;
  const password = document.querySelector('.login-form input[type="password"]').value;
  let flag = false;
  const userAPI = 'http://localhost:3000/user_account';
  fetch(userAPI)
    .then(response => response.json())
    .then(users => {
      const user = users.find(user => user.email === email && user.password === password);
      if(user){
        console.log("Đăng nhập thành công!");
        document.querySelector('.login-form input[type="email"]').value = '';
        document.querySelector('.login-form input[type="password"]').value = '';
        flag = true;
        fetch(`http://localhost:3000/user_account/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: "Logged" }),
        })
        console.log(user);
        localStorage.setItem('isLoggedIn', flag);
        window.location.href = './loggedin.html';
      }
      else{
        console.log("Email hoặc mật khẩu sai!");
        document.querySelector('.login-form input[type="email"]').value = '';
        document.querySelector('.login-form input[type="password"]').value = '';
        localStorage.setItem('isLoggedIn', flag);
      }
    })
    .catch(error => {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    })
}
// Kiểm tra đăng nhập
function checkLoggedIn() {
  return localStorage.getItem('isLoggedIn') == 'true';
}



// Đăng ký
function signUp(){
  // Lấy giá trị từ form input
  const lastName = document.querySelector('.lName-input').value;
  const firstName = document.querySelector('.fName-input').value;
  const email = document.querySelector('.sign-up-form input[type="email"]').value;
  const phoneNumber = document.querySelector('.sdt-input').value;
  const password = document.querySelector('.sign-up-form input[type="password"]').value;
  // Kiểm tra đầu vào
  if(!email.includes('@gmail.com') || phoneNumber.length > 10 || phoneNumber.length < 10){
    console.log('lỗi');
  }
  else{
    if($('#accept-condition').is(":checked") && confirmOTP()){
      const newUser = {
        userName : lastName + ' ' + firstName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        cart : []
      }
      const userAPI = 'http://localhost:3000/user_accout';
      fetch(userAPI)
        .then(response => response.json())
        .then(users => {
          const user = users.find(user => user.email === email && user.password === password);
          if(user){
            console.log("Email hoặc số điện thoại đã được sử dụng");
            document.querySelector('.lName-input').value = '';
            document.querySelector('.fName-input').value = '';
            document.querySelector('.sign-up-form input[type="email"]').value = '';
            document.querySelector('.sdt-input').value = '';
            document.querySelector('.sign-up-form input[type="password"]').value = '';
          }
          else{
            fetch(userAPI, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newUser)
            })
            .then(response => response.json())
            .then(data => {
              console.log("Đăng ký thành công", data);
              alert("Đăng ký thành công!");

              // Xóa các giá trị input sau khi đăng ký thành công
              document.querySelector('.lName-input').value = '';
              document.querySelector('.fName-input').value = '';
              document.querySelector('.sign-up-form input[type="email"]').value = '';
              document.querySelector('.sdt-input').value = '';
              document.querySelector('.sign-up-form input[type="password"]').value = '';
            })
            .catch(error => {
              console.error('Lỗi khi thêm người dùng mới:', error);
            });
          }
        })
        .catch(error => {
          console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        })
    }
    else{
      alert('Vui lòng chấp nhận điều khoản để tiếp tục để đăng ký')
    }
  }
}
// Sinh OTP
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
  const flag = false;
  localStorage.setItem('isLoggedIn', flag);
  alert('Đã đăng xuất thành công');
  window.location.href = './index.html';
}



// Demo sản phẩm
function productDemo(className){
  const productAPI = `http://localhost:3000/${className}`;
  fetch(productAPI)
    .then(function(response) {
      return response.json();
    })
    .then(function(products) {
      const firstProducts = products.slice(0, 4);
      const htmls = firstProducts.map(function(product) {
        const colorDots = product.info.colorCode.map(function(color) {
          return `<div class="product-color rounded-circle" style="background-color: ${color}; width: 20px; height: 20px;"></div>`;
        }).join('');

        return `
        <div class="col-lg-3 col-6">
          <a class="card text-decoration-none border-0 rounded overflow-hidden" id="${product.id}">
            <img src="${product.info.baseURL}/${product.info.folder}_1.png" class="rounded-bottom prod-img" alt="">
            <div class="card-body ps-0">
              <p class="prod-name fs-14px text-primary">${product.info.name}</p>
              <h3 class="prod-price fs-20px text-primary fw-semibold">${product.info.price}<span class="fs-10px" style="vertical-align: super;">đ</span></h3>
              <div class="prod-color d-flex gap-2">
                ${colorDots}
              </div>
            </div>
          </a>
        </div>`;
      }).join('');

      document.getElementById(`${className}_demo`).innerHTML = htmls;
      
      document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function(){
          const productId = this.getAttribute('id');
          fetch(`http://localhost:3000/${className}/${productId}`)
            .then(response => response.json())
            .then(product => {
              console.log(product);
              localStorage.setItem('selectedProduct', JSON.stringify(product));
              window.location.href = "./detail.html";
            })
            .catch(error => {
              console.error('Lỗi', error);
            });
        });
      });
    })
    .catch(function(error) {
      console.error('Lỗi', error);
    });
}


// Trang danh sách sản phẩm
function moveToListProduct(className){
  const productAPI = `http://localhost:3000/${className}`;
  fetch(productAPI)
    .then(function(response) {
      return response.json();
    })
    .then(function(products) {
      const htmls = products.map(function(product) {
        const colorDots = product.info.colorCode.map(function(color) {
          return `<div class="product-color rounded-circle" style="background-color: ${color}; width: 20px; height: 20px;"></div>`;
        }).join('');

        return `
        <div class="col-lg-3 col-6">
          <a class="card text-decoration-none border-0 rounded overflow-hidden" id="${product.id}">
            <img src="${product.info.baseURL}/${product.info.folder}_1.png" class="rounded-bottom prod-img" alt="">
            <div class="card-body ps-0">
              <p class="prod-name fs-14px text-primary">${product.info.name}</p>
              <h3 class="prod-price fs-20px text-primary fw-semibold">${product.info.price}<span class="fs-10px" style="vertical-align: super;">đ</span></h3>
              <div class="prod-color d-flex gap-2">
                ${colorDots}
              </div>
            </div>
          </a>
        </div>`;
      }).join('');

      document.getElementById('product').innerHTML = htmls;
      
      document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function(){
          const productId = this.getAttribute('id');
          fetch(`http://localhost:3000/${className}/${productId}`)
            .then(response => response.json())
            .then(product => {
              console.log(product);
              localStorage.setItem('selectedProduct', JSON.stringify(product));
              window.location.href = "./detail.html";
            })
            .catch(error => {
              console.error('Lỗi', error);
            });
        });
      });
    })
    .catch(function(error) {
      console.error('Lỗi', error);
    });
}
export {printCart, signUp, OTP, confirmOTP, logIn, checkLoggedIn, logOut, moveToListProduct, productDemo, searchProduct}
