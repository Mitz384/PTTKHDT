import * as func from './func.js';

// Các option ảnh sản phẩm
function img(imageURL){
  document.querySelector(".slide").src = imageURL;
}

// Hành vi của logo

document.querySelector('#logo-detail').addEventListener('click', () => {
  if(func.checkLoggedIn()){
    window.location.href = './loggedin.html';
  }
  else{
    window.location.href = './index.html';
  }
})


// ---------------------Thông tin sản phẩm--------------------
const product_info = JSON.parse(localStorage.getItem('selectedProduct'));
// Ảnh chính
$('.prod-main-image').attr('src', `${product_info.info.baseURL}/${product_info.info.folder}_1.png`);
// Option ảnh
const optionImage = $('.option-image');
optionImage.empty();
for(let i = 1; i <= 6; i++){
  const imgElement = $(`<img src="${product_info.info.baseURL}/${product_info.info.folder}_${i}.png">`);
  imgElement.on('error', function() {
    $(this).remove();
  });
  imgElement.on('click', function() {
    img(`${product_info.info.baseURL}/${product_info.info.folder}_${i}.png`);
  });
  optionImage.append(imgElement);
  
}
// Option size
const optionSize = $('.option-size');
optionSize.empty();
const sizes = product_info.info.size;
sizes.forEach((size) => {
  const s = $(`<button class="btn border text-primary">${size}</button>`);
  optionSize.append(s);
});
// Tên sản phẩm
$('.prod-name').text(product_info.info.name);
// Giá sản phẩm
$('.prod-price').html(product_info.info.price + '<span class="fs-5 fw-bold text-decoration-underline" style="vertical-align: super;">đ</span>');
// Màu sản phẩm
const optionColor = $('.option-color');
optionColor.empty();
const colors = product_info.info.colorCode;
colors.forEach((color) => {
  const c = $(`<span class="rounded-circle" style="background-color: ${color};"></span>`);
  optionColor.append(c);
});



let info = {baseURL: product_info.info.baseURL, folder: product_info.info.folder, name: product_info.info.name, color: '', size: '', price: product_info.info.price};


// ---------------------Tên màu sắc---------------------
const colorsName = {
  "rgb(48, 80, 75)" : "Xanh lá",
  "rgb(209, 202, 184)" : "Be",
  "rgb(69, 98, 131)" : "Jeans xanh nhạt", 
  "rgb(0, 0, 0)" : "Đen",
  "rgb(206, 206, 206)" : "Trắng",
  "rgb(68, 74, 91)" : "Jeans xanh đậm",
  "rgb(176, 190, 228)" : "Xanh da trời",
  "rgb(18, 25, 38)" : "Jeans đậm",
  "rgb(125, 83, 37)" : "Nâu",
  "rgb(204, 208, 211)" : "Xám tiêu",
  "rgb(39, 42, 68)" : "Xanh than",
  "rgb(244, 224, 159)" : "Vàng",
  "rgb(199, 170, 215)" : "Tím",
  "rgb(246, 217, 229)" : "Hồng nhạt"

};

// --------------------Thay đổi màu sắc--------------------------
let colorButton = document.querySelectorAll('.option-color span');
let colorShow = document.querySelector('.select-color h5');
colorButton.forEach((color) => {
  color.addEventListener('click', function(){
    if(color.classList.contains('border', 'border-2', 'border-primary')){
      color.classList.remove('border', 'border-2', 'border-primary');
      info.color = '';
      colorShow.textContent = 'Chọn màu sắc: ';
    }
    else{
      colorButton.forEach((c) => {
        c.classList.remove('border', 'border-2', 'border-primary');
      });
      color.classList.add('border', 'border-2', 'border-primary');
      const colorName = colorsName[color.style.backgroundColor];
      info.color = colorName;
      colorShow.textContent = `Chọn màu sắc: ${colorName}`;
    }
  })
})



// --------------------Thay đổi size-----------------------------
let sizeButton = document.querySelectorAll('.select-size button');
let sizeShow = document.querySelector('.select-size h5');
sizeButton.forEach((button) => {
  button.addEventListener('click', function(){
    // Kiểm tra tồn tại
    if(button.classList.contains('text-white', 'bg-primary')){
      button.classList.remove('text-white', 'bg-primary');
      button.classList.add('text-primary', 'bg-white');
      info.size = '';
      sizeShow.textContent = 'Chọn size: ';
    }
    else{
    // Xoá hiệu ứng
      sizeButton.forEach((btn) => {
        btn.classList.remove('text-white', 'bg-primary');
        btn.classList.add('text-primary', 'bg-white');
      })
      // Thay đổi hiệu ứng khi click
      button.classList.add('text-white', 'bg-primary');
      button.classList.remove('text-primary', 'bg-white');
      // Hiển thị size đã chọn
      info.size = button.textContent;
      sizeShow.textContent = 'Chọn size: ' + button.textContent;
    }
  })
})



// ---------------------Thay đổi số lượng---------------------
let quantityInput = document.querySelector('.input-quantity');
let quantityShow = document.querySelector('.quantity-show');
// Tăng số lượng 
document.querySelector('.increase-btn').addEventListener('click', ()=>{
  let currentValue = parseInt(quantityInput.value);
  quantityInput.value = currentValue + 1;
  quantityShow.textContent = 'Số lượng: ' + quantityInput.value;
  quantity.quantity = quantityInput.value;
});
// Giảm số lượng
document.querySelector('.decrease-btn').addEventListener('click', ()=>{
  let currentValue = parseInt(quantityInput.value);
  if(currentValue > 1){
    quantityInput.value = currentValue - 1;
  }
  quantityShow.textContent = 'Số lượng: ' + quantityInput.value;
  quantity.quantity = quantityInput.value;
});
quantityInput.addEventListener('change', () => {
  quantityShow.textContent = 'Số lượng: ' + quantityInput.value;
  quantity.quantity = quantityInput.value;
});
let quantity = {quantity: quantityInput.value}

// -----------------Thêm sản phẩm vào giỏ hàng-----------------

document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
  const userAPI = 'http://localhost:3000/user_account';
  fetch(userAPI)
    .then(response => response.json())
    .then(users => {
      const user = users.find(user => user.status == "Logged");
      if(info.color == '' || info.size == ''){
        alert('Chưa chọn thuộc tính sản phẩm!');
      }
      else{
        const product = {
          info: info, 
          quantity: quantity
        }
        // Kiểm tra tồn tại 
        let exist = user.cart.findIndex(p => p.info.name === product.info.name && p.info.color === product.info.color && p.info.size === product.info.size);
        if(exist != -1){
          user.cart[exist].quantity.quantity = parseInt(user.cart[exist].quantity.quantity) + parseInt(product.quantity.quantity)
        }
        else{
          user.cart.push(product);
        }
        fetch(`http://localhost:3000/user_account/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: user.cart }),
      })
      }
    })
})

const accountAPI = 'http://localhost:3000/user_account'
fetch(accountAPI)
  .then(response => response.json())
  .then(users => {
    const user = users.find(user => user.status == "Logged");
    func.printCart(user.cart);
    })

// Tìm kiếm
document.getElementById('search-btn').addEventListener('click', function(){
  func.searchProduct();
})


// Đăng xuất đăng nhập
const isLogin = func.checkLoggedIn();
console.log(isLogin);
const accountLink = document.getElementById('accountLink');
if (isLogin) {
  accountLink.setAttribute('data-bs-target', '#logoutModal')
}
// Đăng nhập
$('.login-btn').click(() => {
  if(func.logIn() == true){
    window.location.href = './loggedin.html';
  }
});
// Đăng ký
$('.send-otp-btn').click(() => func.OTP());
$('.confirm-otp-btn').click(() => {
  (func.confirmOTP() == true) ? alert('Xác thực OTP thành công') : alert('Xác thực OTP thất bại');
});
$('.sign-up-btn').click(() => func.signUp());
// Dăng xuất
$('.logout-btn').click(() => func.logOut());;


// Click menu
$('.product_men_list').click(() => {
  sessionStorage.setItem("className", 'product_men_list');
  window.location.href = './product-list.html';
})
$('.product_women_list').click(() => {
  sessionStorage.setItem("className", 'product_women_list');
  window.location.href = './product-list.html';
})
$('.product_kid_list').click(() => {
  sessionStorage.setItem("className", 'product_kid_list');
  window.location.href = './product-list.html';
})

fetch('http://localhost:3000/user_account')
  .then(response => response.json())
  .then(users => {
    const user = users.find(user => user.status == "Logged");
    console.log(user);
  })