import * as func from './func.js'

const valueSearch = sessionStorage.getItem("valueSearch");
func.searchProduct(valueSearch);

document.querySelector('#logo-detail').addEventListener('click', () => {
  if(func.checkLoggedIn()){
    window.location.href = './loggedin.html';
  }
  else{
    window.location.href = './index.html';
  }
})


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

document.getElementById('search-btn').addEventListener('click', function(){
  const valueSearch = document.getElementById('search-input').value;
  sessionStorage.setItem("valueSearch", valueSearch);
  window.location.href = './search.html';
})

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