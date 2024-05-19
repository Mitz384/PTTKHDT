import * as func from './func.js'

// Dăng xuất
$('.logout-btn').click(() => func.logOut());


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
      const user = users.find(u => u.status == "Logged");
      if(user){
        let cart = sessionStorage.getItem('cart_pay');
        cart = JSON.parse(cart);
        func.payment(user, cart);
      }
    })
