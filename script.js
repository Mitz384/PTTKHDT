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

// Lấy thông tin đẩy vào local
$('.card').click(function(){
  const productImage = $(this).find('.prod-img').attr('src');
  const productName = $(this).find('.prod-name').text();
  let productPrice = $(this).find('.prod-price').text();
  productPrice = productPrice.slice(0, -1);
  let baseImageURL = productImage.substring(0, productImage.lastIndexOf("/"));
  // Lấy folder
  const folderName = baseImageURL.split('/')[baseImageURL.split('/').length - 1];
  console.log(baseImageURL);
  console.log(folderName);
  // Lấy màu
  let colors = [];
  $(this).find('.product-color').each(function() {
    var color = $(this).css('background-color');
    colors.push(color);
  });
  const product_info = {baseURL: baseImageURL, folder: folderName, name:productName, price: productPrice, color: colors};
  localStorage.setItem('selectedProduct', JSON.stringify(product_info));
  window.location.href = "./detail.html";
})



// In thông tin sản phẩm trong giỏ hàng

if(func.checkLoggedIn()){
const product_cart = JSON.parse(localStorage.getItem('shoppingCart'));
func.printCart(product_cart);
func.upDateQuality(product_cart);
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
$('.logout-btn').click(() => func.logOut());