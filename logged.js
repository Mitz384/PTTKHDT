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


$('.logout-btn').click(() => func.logOut());


const accountAPI = 'http://localhost:3000/user_account'
fetch(accountAPI)
  .then(response => response.json())
  .then(users => {
    const user = users.find(user => user.status == "Logged");
    func.printCart(user.cart);
    })

document.getElementById('search-btn').addEventListener('click', function(){
  const valueSearch = document.getElementById('search-input').value;
  sessionStorage.setItem("valueSearch", valueSearch);
  window.location.href = './search.html';
})


fetch('http://localhost:3000/user_account')
  .then(response => response.json())
  .then(users => {
    const user = users.find(user => user.status == "Logged");
    console.log(user);
  })