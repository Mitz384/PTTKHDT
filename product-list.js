import * as func from './func.js'


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

// Tìm kiếm
document.getElementById('search-btn').addEventListener('click', function(){
  func.searchProduct();
})

function show(){
  const className = sessionStorage.getItem("className");
  if(className == "product_women_list"){
    document.querySelector('.name-list').innerHTML = "THỜI TRANG NỮ";
  }
  else if(className == "product_kid_list"){
    document.querySelector('.name-list').innerHTML = "THỜI TRANG TRẺ EM";
  }
  else{
    document.querySelector('.name-list').innerHTML = "THỜI TRANG NAM";
  }
  func.moveToListProduct(className);
}
show();

document.querySelector('.kid-toggle').addEventListener('click', () => {
  document.querySelector('.name-list').innerHTML = '';
  document.querySelector('#product').innerHTML = '';
  sessionStorage.setItem("className", 'product_kid_list')
  show();
})

document.querySelector('.women-toggle').addEventListener('click', () => {
  document.querySelector('.name-list').innerHTML = '';
  document.querySelector('#product').innerHTML = '';
  sessionStorage.setItem("className", 'product_women_list')
  show();
})
document.querySelector('.men-toggle').addEventListener('click', () => {
  document.querySelector('.name-list').innerHTML = '';
  document.querySelector('#product').innerHTML = '';
  sessionStorage.setItem("className", 'product_men_list')
  show();
})

const accountAPI = 'http://localhost:3000/user_account'
fetch(accountAPI)
  .then(response => response.json())
  .then(users => {
    const user = users.find(user => user.status == "Logged");
    func.printCart(user.cart);
    })