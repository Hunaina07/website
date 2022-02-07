import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase,ref,set } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyCT8nSpnYHy0DFPYw87S8mA4eaD1Ob4xpc",
    authDomain: "build-website-f797c.firebaseapp.com",
    databaseURL: "https://build-website-f797c-default-rtdb.firebaseio.com",
    projectId: "build-website-f797c",
    storageBucket: "build-website-f797c.appspot.com",
    messagingSenderId: "373454540084",
    appId: "1:373454540084:web:626f6f28d01092dd51a961",
    measurementId: "G-NXQG0TS8EK"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();

//   ref
// const db = firebase.db().ref("contactform")
document.getElementById('contactform').addEventListener('submit',submitForm)


function  submitForm(e){
    e.preventDefault();
    var name = getElementVal('name');
    var contact = getElementVal('contact');
    var address = getElementVal('address');
  
    saveMessages(name,contact,address)
}
var saveMessages =(name,contact,address) => {
    var newContactForm = db.push ();
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture : imageUrl
      });
    }
    


var getElementVal  = (id) => {
    return document.getElementById('id').value;
}
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}
function ready(){
var removeCartItemButtons = document.getElementsByClassName('btn-danger')
console.log(removeCartItemButtons)
for (var i=0;i<removeCartItemButtons.length;i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
     
}
 var quantityInputs = document.getElementsByClassName('cart-quantity-input')
 for (var i=0;i<quantityInputs.length;i++){
     var input = quantityInputs[i]
     input.addEventListener('change',quantityChanged)
 }
 var addToCartButtons = document.getElementsByClassName('add-cart')
 for (var i=0;i<addToCartButtons.length;i++){
     var button = addToCartButtons[i]
     button.addEventListener('click',addToCartClicked)
 }
 document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchasedClick)
}
function purchasedClick(){
    alert('Thankyou for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
     while(cartItems.hasChildNodes()){
         cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
    var name=document.getElementById("name");
    var contact=document.getElementById("contact");
    var address=document.getElementById("address");
    var obj={
        name:name.value,
        contact:contact.value,
        address:address.value
    }
    console.log(obj)
    set(ref(db, 'users/' ), {
        name:name.value,
        contact:contact.value,
        address:address.value
      });
    }


function removeCartItem(event) {
    var buttonClicked =  event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
function quantityChanged(event){
var input = event.target
if(isNaN(input.value) || input.value <=0){
    input.value=1
}
updateCartTotal()
}

function addToCartClicked(event){
   var button = event.target
   var shopItem = button.parentElement.parentElement.parentElement
   var title = shopItem.getElementsByClassName('product-title')[0].innerText
   var price =shopItem.getElementsByClassName('price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('product-img ')[0].src
    console.log(title,price,imageSrc)
     addItemToCart(title,price,imageSrc)
     updateCartTotal()
}   
function addItemToCart(title,price,imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
     var cartItems = document.getElementsByClassName('cart-items')[0]
     var cartItemsNames = cartItems.getElementsByClassName('cart-item-title')
      for (var i = 0;i<cartItemsNames.length;i++){
          if(cartItemsNames[i].innerText == title){
              alert("This item is already added to the cart")
                return;
            }
      }
     var cartRowContents = `
      <div class="cart-item cart-column">
     <img class="cart-item-image" src="${imageSrc}" width="100" height="100" alt="">
      <span class="cart-item-title">${title}</span> 
   </div>
   <span class="cart-price cart-column">${price}</span>
   <div class="cart-quantity cart-column">
     <input class="cart-quantity-input" value="1" type="number">
      <button class="btn btn-danger" type="button">Remove</button>
   </div>  `

   cartRow.innerHTML=cartRowContents
     cartItems.append(cartRow)
     cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
     cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
    }

function updateCartTotal(){
   var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
   var total=0;
  for (var i=0;i<cartRows.length;i++){
      var cartRow =  cartRows[i]
      var priceElement =  cartRow.getElementsByClassName('cart-price')[0]
       var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')
       [0]
       console.log( priceElement,quantityElement)
        var price =parseFloat(priceElement.innerText.replace("Rs",""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText = "Rs" +  total
    
}


