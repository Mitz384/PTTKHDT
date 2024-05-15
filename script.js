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



$('.card').click(function(){
  const productImage = $(this).find('.prod-img').attr('src');
  const productName = $(this).find('.prod-name').text();
  let productPrice = $(this).find('.prod-price').text();
  productPrice = productPrice.slice(0, -1);
  const baseImageURL = productImage.substring(0, productImage.lastIndexOf('/')); 
  // Lấy folder
  const folderName = baseImageURL.split('/')[baseImageURL.split('/').length - 1];
  console.log(folderName);
  // Lấy màu
  let colors = [];
  $(this).find('.product-color').each(function() {
    var color = $(this).css('background-color');
    colors.push(color);
  });
  const product = {folder: folderName, name:productName, price: productPrice, color: colors};
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  window.location.href = "./detail/detail.html";
})

let quantityInput = document.querySelector('.input-quantity');
let quantityShow = document.querySelector('.quantity-show');
// Tăng số lượng 
document.querySelector('.increase-btn').addEventListener('click', ()=>{
  let currentValue = parseInt(quantityInput.value);
  quantityInput.value = currentValue + 1;
});
// Giảm số lượng
document.querySelector('.decrease-btn').addEventListener('click', ()=>{
  let currentValue = parseInt(quantityInput.value);
  if(currentValue > 1){
    quantityInput.value = currentValue - 1;
  }
});



// Hàm tính thành tiền
$(document).ready(function() {
  $('#select-prod, .input-quantity').change(function(){
      calcTotalPrice();
  });
  $('.increase-btn, .decrease-btn').click(function(){
    calcTotalPrice();
});
});

function calcTotalPrice(){
  $('.total-price').empty();
  if($('#select-prod').is(":checked")){
  let quantity = document.querySelector('.input-quantity');
  quantity = parseInt(quantity.value);
  let price = document.querySelector(".prod-price").textContent;
  price.slice(0, -1);
  price = price.replace(/\./g, '');
  price = parseInt(price);
  let totalPrice = quantity * price;  
  totalPrice = totalPrice.toLocaleString('de-DE');
  $('.total-price').append(
    $(`<p class="prod-price text-primary m-0">Tổng thành tiền: <span class="fw-medium">${totalPrice}</span><span class="fs-10px fw-medium text-decoration-underline" style="vertical-align: super;">đ</span></p>`)
  )
  }
}