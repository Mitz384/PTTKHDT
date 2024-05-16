import * as func from './func.js';



// Các option ảnh sản phẩm
function img(imageURL){
  document.querySelector(".slide").src = imageURL;
}


// ---------------------Thông tin sản phẩm--------------------
const product_info = JSON.parse(localStorage.getItem('selectedProduct'));
// Ảnh chính
$('.prod-main-image').attr('src', `${product_info.baseURL}/${product_info.folder}_1.png`);
// Option ảnh
const optionImage = $('.option-image');
optionImage.empty();
for(let i = 1; i <= 6; i++){
  const imgElement = $(`<img src="${product_info.baseURL}/${product_info.folder}_${i}.png" onclick="img('${product_info.baseURL}/${product_info.folder}_${i}.png')">`);
  // Xoá ảnh không tồn tại 
  imgElement.on('error', function() {
    $(this).remove();
  });
  optionImage.append(imgElement);
}
// Option size
if(product_info.folder.includes("_man")){
  document.querySelector('.select-size div:nth-of-type(2)').classList.add('d-none');
  document.querySelector('.select-size div:nth-of-type(3)').classList.add('d-none');
}
else if(product_info.folder.includes("_woman")){
  document.querySelector('.select-size div:nth-of-type(1)').classList.add('d-none');
  document.querySelector('.select-size div:nth-of-type(3)').classList.add('d-none');
}
else{
  document.querySelector('.select-size div:nth-of-type(1)').classList.add('d-none');
  document.querySelector('.select-size div:nth-of-type(2)').classList.add('d-none');
}
// Tên sản phẩm
$('.prod-name').text(product_info.name);
// Giá sản phẩm
$('.prod-price').html(product_info.price + '<span class="fs-5 fw-bold text-decoration-underline" style="vertical-align: super;">đ</span>');
// Màu sản phẩm
const optionColor = $('.option-color');
optionColor.empty();
const colors = product_info.color;
colors.forEach((color) => {
  const c = $(`<span class="rounded-circle" style="background-color: ${color};"></span>`);
  optionColor.append(c);
});

let info = {baseURL: product_info.baseURL, folder: product_info.folder, name: product_info.name, color: '', size: ''};




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
let quantity = {quantity: quantityInput.value, price: product_info.price}

// -----------------Thêm sản phẩm vào giỏ hàng-----------------

document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
  let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  console.log(cart);
  if(info.color != '' && info.size != ''){
    const product = {info : info, quantity : quantity}
    let existingProduct = cart.find(p => p.info.name === product.info.name && p.info.color === product.info.color && p.info.size === product.info.size);
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------Đang sửa -------------------------------- ------------------------------------------------------------------------------------------------------------------------------------
    if (existingProduct) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      existingProduct.quantity.quantity = parseInt(existingProduct.quantity.quantity) + parseInt(product.quantity.quantity);
    } 
    else {
      // Nếu không, thêm sản phẩm mới vào giỏ hàng
      cart.push(product);
    }
    console.log(existingProduct.quantity.quantity);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    alert('Đã thêm sản phẩm vào giỏ hàng!');
    upCart();
  }
  else{
    alert('Chưa chọn thuộc tính sản phẩm!');
  }
});



// -------------------Hiển thị sản phẩm trong giỏ hàng-------------------------
function upCart(){
  const product_cart = JSON.parse(localStorage.getItem('shoppingCart'));
  func.printCart(product_cart);
  func.upDateQuality(product_cart);
}


