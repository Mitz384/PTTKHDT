function img(imageURL){
  document.querySelector(".slide").src = imageURL;
}


// ---------------------Thông tin sản phẩm--------------------
const product = JSON.parse(localStorage.getItem('selectedProduct'));
// Ảnh chính
$('.prod-main-image').attr('src', `../image/${product.folder}/${product.folder}_1.png`);
// Option ảnh
const optionImage = $('.option-image');
optionImage.empty();
for(let i = 1; i <= 6; i++){
  const imgElement = $(`<img src="../image/${product.folder}/${product.folder}_${i}.png" onclick="img('../image/${product.folder}/${product.folder}_${i}.png')">`);
  // Xoá ảnh không tồn tại 
  imgElement.on('error', function() {
    $(this).remove();
  });
  optionImage.append(imgElement);
}
// Option size
if(product.folder.includes("_man")){
  document.querySelector('.select-size div:nth-of-type(2)').classList.add('d-none');
  document.querySelector('.select-size div:nth-of-type(3)').classList.add('d-none');
}
else if(product.folder.includes("_woman")){
  document.querySelector('.select-size div:nth-of-type(1)').classList.add('d-none');
  document.querySelector('.select-size div:nth-of-type(3)').classList.add('d-none');
}
else{
  document.querySelector('.select-size div:nth-of-type(1)').classList.add('d-none');
  document.querySelector('.select-size div:nth-of-type(2)').classList.add('d-none');
}
// Tên sản phẩm
$('.prod-name').text(product.name);
// Giá sản phẩm
$('.prod-price').html(product.price + '<span class="fs-5 fw-bold text-decoration-underline" style="vertical-align: super;">đ</span>');
// Màu sản phẩm
const optionColor = $('.option-color');
optionColor.empty();
const colors = product.color;
colors.forEach((color) => {
  const c = $(`<span class="rounded-circle" style="background-color: ${color};"></span>`);
  optionColor.append(c);
});




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
      colorShow.textContent = 'Chọn màu sắc: ';
    }
    else{
      colorButton.forEach((c) => {
        c.classList.remove('border', 'border-2', 'border-primary');
      });
      color.classList.add('border', 'border-2', 'border-primary');
      console.log(color.style.backgroundColor);
      const colorName = colorsName[color.style.backgroundColor];
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
});
// Giảm số lượng
document.querySelector('.decrease-btn').addEventListener('click', ()=>{
  let currentValue = parseInt(quantityInput.value);
  if(currentValue > 1){
    quantityInput.value = currentValue - 1;
  }
  quantityShow.textContent = 'Số lượng: ' + quantityInput.value;
});
quantityInput.addEventListener('change', () => {
  quantityShow.textContent = 'Số lượng: ' + quantityInput.value;
});

document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
  alert('Đã thêm sản phẩm vào giỏ hàng!');
})


