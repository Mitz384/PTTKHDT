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

