import * as func from './func.js';

fetch('http://localhost:3000/user_account')
  .then(response => response.json())
  .then(users => {
    const user = users.find(u => u.status == "Logged");
    console.log(user);
  })

// Thao tác của nút 'Xem thêm'
const seeMorebtn = document.querySelectorAll('.more');
seeMorebtn.forEach(function(button){
  // Hành vi hover của chuột
  button.addEventListener('mouseover', function(){
    this.classList.add('active');
  });
  button.addEventListener('mouseout', function() {
    this.classList.remove('active');
  });

  // Hành vi ấn của thiết bị di động
  button.addEventListener('touchstart', function(){
    this.classList.add('active');
  });
  button.addEventListener('touchend', function(){
    this.classList.remove('active');
  });
});

// --------------------------Sản phẩm demo---------------------
document.querySelector('#product_men_list_demo').innerHTML = func.productDemo('product_men_list');
document.querySelector('#product_women_list_demo').innerHTML = func.productDemo('product_women_list');
document.querySelector('#product_kid_list_demo').innerHTML = func.productDemo('product_kid_list');


// --------------------------Đăng xuất đăng nhập---------------------------
const isLogin = func.checkLoggedIn();
const accountLink = document.getElementById('accountLink');
if (isLogin) {
  accountLink.setAttribute('data-bs-target', '#logoutModal')
}
fetch('http://localhost:3000/user_account')
  .then(response => response.json())
  .then(users => {
    const user = users.find(u => u.status == "Logged");
  })
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
$('.logout-btn').click(() => func.logOut());



// -----------------Click menu---------------------
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


// -----------------------Tìm kiếm---------------------------
document.getElementById('search-btn').addEventListener('click', function(){
  const valueSearch = document.getElementById('search-input').value;
  sessionStorage.setItem("valueSearch", valueSearch);
  window.location.href = './search.html';
})


// -------------------------Hiển thị giỏ hàng-------------------------
const accountAPI = 'http://localhost:3000/user_account'
fetch(accountAPI)
  .then(response => response.json())
  .then(users => {
    const user = users.find(user => user.status == "Logged");
    func.printCart(user.cart);
    })



// -----------------------Thanh toán------------------------
$('.payment-btn').click(() => {
  fetch('http://localhost:3000/user_account')
    .then(response => response.json())
    .then(users => {
      const user = users.find(u => u.status == "Logged");
      if(user){
        let cart = [];
        for(let i = 0; i < user.cart.length; i++){
          if($(`#select-prod_${i+1}`).is(":checked")){
            cart.push(user.cart[i]);
          }
        }
        sessionStorage.setItem('cart_pay', JSON.stringify(cart));
        window.location.href = './payment.html';
      }
      else{
        alert('Bạn cần đăng nhập để thanh toán!');
      }
    })
})