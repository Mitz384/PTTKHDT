import * as func from './func.js';

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


document.querySelector('#product_men_list_demo').innerHTML = func.productDemo('product_men_list');
document.querySelector('#product_women_list_demo').innerHTML = func.productDemo('product_women_list');
document.querySelector('#product_kid_list_demo').innerHTML = func.productDemo('product_kid_list');


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


// Tìm kiếm
document.getElementById('search-btn').addEventListener('click', function(){
  func.searchProduct();
  window.location.href = './product-list.html';
})
