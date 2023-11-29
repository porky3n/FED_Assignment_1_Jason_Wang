/*Cart*/

window.addEventListener('load', function () {
    document.getElementById('cart-icon').addEventListener('click', function () {
      var cartPopup = document.getElementById('cart-popup');
      cartPopup.style.display = (cartPopup.style.display === 'block') ? 'none' : 'block';
    });


    document.getElementById('checkout-button').addEventListener('click', function () {
        var totalSpan = document.getElementById('total-price');
        var totalPrice = parseFloat(totalSpan.textContent);
    
        
        if (totalPrice === 0) {
          displayErrorMessage("Purchase Failed. Your Cart is Empty.");
        } else {
          var message = `Thank You For Your Purchase! Payment Instructions Sent to Email.`;
          displayPurchaseMessage(message);
          clearShoppingCart();
      }
      });

      function displayPurchaseMessage(message) {
        var purchaseMessage = document.getElementById('product-purchase-message');
        purchaseMessage.textContent = message;
        purchaseMessage.style.display = 'block';
    
        
        setTimeout(function () {
          purchaseMessage.style.display = 'none';
        }, 2000);
      }

      function displayErrorMessage(message) {
        var errorMessage = document.getElementById('fail-purchase-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';

        setTimeout(function () {
            errorMessage.style.display = 'none';
        },2000);
    }
    
  
    var addToCartButtons = document.getElementsByClassName('add-to-cart-button');
  
    Array.from(addToCartButtons).forEach(function (button) {
      button.addEventListener('click', function () {
        var itemName = button.getAttribute('ball-name');
        var itemPrice = parseFloat(button.getAttribute('ball-price'));
  
        addToCart(itemName, 1, itemPrice);
  
        button.textContent = 'Item Added to Cart';
  
        setTimeout(function () {
          button.textContent = 'Add to Cart';
        }, 1500);
      });
    });
  
    function addToCart(itemName, quantity, price) {
      var cartItems = document.getElementById('cart-items');
      var totalSpan = document.getElementById('total-price');
  
      
      var existingItem = Array.from(cartItems.children).find(function (item) {
        return item.dataset.name === itemName;
      });
  
      if (existingItem) {
        
        var currentQuantity = parseInt(existingItem.dataset.quantity);
        var newQuantity = currentQuantity + quantity;
        existingItem.dataset.quantity = newQuantity;
        existingItem.cells[1].textContent = newQuantity;
        existingItem.cells[2].textContent = '$' + (newQuantity * price).toFixed(2);
      } else {
        
        var newRow = cartItems.insertRow();
        newRow.dataset.name = itemName;
        newRow.dataset.quantity = quantity;
  
        var cell1 = newRow.insertCell(0);
        cell1.textContent = itemName;
  
        var cell2 = newRow.insertCell(1);
        cell2.textContent = quantity;
  
        var cell3 = newRow.insertCell(2);
        cell3.textContent = '$' + (quantity * price).toFixed(2);
      }
  
      
      var currentTotal = parseFloat(totalSpan.textContent);
      totalSpan.textContent = (currentTotal + price).toFixed(2);
    }

    function clearShoppingCart() {
      var cartItems = document.getElementById('cart-items');
      var totalSpan = document.getElementById('total-price');

      cartItems.innerHTML = ''; // Clear all rows from the cart
      totalSpan.textContent = '0.00'; // Reset total price to zero
  }
  });
  

/*Close Cart*/
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('close-cart').addEventListener('click', function () {
      document.getElementById('cart-popup').style.display = 'none';
    });
});


/*Hidden Details*/

function showBallInfo(box) {
    const ballInfo = box.querySelector('.ball-info');
    ballInfo.style.display = 'block';
}

function hideBallInfo(box) {
    const ballInfo = box.querySelector('.ball-info');
    ballInfo.style.display = 'none';
}

/*Filter*/

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('category').addEventListener('change', function () {
      var selectedCategory = this.value;
      var balls = document.querySelectorAll('.ball-display-box');

      balls.forEach(function (ball) {
          var ballCategory = ball.getAttribute('data-category');
          var showBall = selectedCategory === 'all' || selectedCategory === ballCategory;
          ball.classList.toggle('hidden', !showBall);
      });
  });
});


document.addEventListener("DOMContentLoaded", function() {

  function sortBalls() {
    var container = document.querySelector('.bowling-ball-container');
    var balls = container.querySelectorAll('.ball-display-box');
    var selectedOption = document.getElementById('price').value;

    var sortedBalls = Array.from(balls).sort(function (a, b) {
      var priceA = parseFloat(a.getAttribute('price'));
      var priceB = parseFloat(b.getAttribute('price'));

      if (selectedOption === 'low') {
        return priceA - priceB;
      } else if (selectedOption === 'high') {
        return priceB - priceA;
      } 
    });

    container.innerHTML = '';

    sortedBalls.forEach(function (ball) {
      container.appendChild(ball);
    });
  }

  document.getElementById('price').addEventListener('change', sortBalls);
});
