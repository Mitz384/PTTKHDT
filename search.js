import * as func from './func.js'

const valueSearch = sessionStorage.getItem("valueSearch");
func.searchProduct(valueSearch);

// Đăng xuất đăng nhập
const isLogin = func.checkLoggedIn();
console.log(isLogin);
const accountLink = document.getElementById('accountLink');
if (isLogin) {
  accountLink.setAttribute('data-bs-target', '#logoutModal')
}
$('.logout-btn').click(() => func.logOut());

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