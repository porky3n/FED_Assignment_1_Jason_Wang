/*Cart*/
window.addEventListener('load', function () {
  // Event listener for clicking cart icon
  document.getElementById('cart-icon').addEventListener('click', function () {
    var cartPopup = document.getElementById('cart-popup');
    // Toggle display of cart pop-up
    cartPopup.style.display = (cartPopup.style.display === 'block') ? 'none' : 'block';
  });

  // Event listener for clicking checkout button
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

  document.querySelector('.clear-cart').addEventListener('click', function () {
    clearShoppingCart();
    // Remove cart data from local storage
    localStorage.removeItem('cart');
  });
  
  // Function to display purchase success message
  function displayPurchaseMessage(message) {
    var purchaseMessage = document.getElementById('product-purchase-message');
    purchaseMessage.textContent = message;
    purchaseMessage.style.display = 'block';

    // Message to disappear after 2s
    setTimeout(function () {
      purchaseMessage.style.display = 'none';
    }, 2000);
  }

  // Function to display purchase fail message
  function displayErrorMessage(message) {
    var errorMessage = document.getElementById('fail-purchase-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';

    // Message to disappear after 2s
    setTimeout(function () {
      errorMessage.style.display = 'none';
    }, 2000);
  }

  // Get elements with the class 'add-to-cart-button'
  var addToCartButtons = document.getElementsByClassName('add-to-cart-button');

  // Iterate through each 'Add to Cart' button and add an event listener
  Array.from(addToCartButtons).forEach(function (button) {
    button.addEventListener('click', function () {
      var itemName = button.getAttribute('data-ball-name');
      var itemPrice = parseFloat(button.getAttribute('data-ball-price'));

      // Add the item to the cart
      addToCart(itemName, 1, itemPrice);

      // Change button text temporarily to 'Item Added to Cart'
      button.textContent = 'Item Added to Cart';

      // Reset button text after 1.5s
      setTimeout(function () {
        button.textContent = 'Add to Cart';
      }, 1500);
    });
  });

  // Function to add items to cart and local storage
  function addToCart(itemName, quantity, price) {
    var cartItems = document.getElementById('cart-items');
    var totalSpan = document.getElementById('total-price');

    // Check if item already in cart
    var existingItem = Array.from(cartItems.children).find(function (item) {
      return item.dataset.name === itemName;
    });

    if (existingItem) {
      var currentQuantity = parseInt(existingItem.dataset.quantity);
      var newQuantity = currentQuantity + quantity;

      // If item already in cart, only increase quantity count and price accordingly
      existingItem.dataset.quantity = newQuantity;
      existingItem.cells[1].textContent = newQuantity;
      existingItem.cells[2].textContent = '$' + (newQuantity * price).toFixed(2);
    } else {
      // If item not in cart, create a new row in the table
      var newRow = cartItems.insertRow();
      newRow.dataset.name = itemName;
      newRow.dataset.quantity = quantity;

      // Add item details (name,quantity,price) to each cell in the row
      var cell1 = newRow.insertCell(0);
      cell1.textContent = itemName;

      var cell2 = newRow.insertCell(1);
      cell2.textContent = quantity;

      var cell3 = newRow.insertCell(2);
      cell3.textContent = '$' + (quantity * price).toFixed(2);
    }

    // Update the total price
    var currentTotal = parseFloat(totalSpan.textContent);
    totalSpan.textContent = (currentTotal + price).toFixed(2);

    // Store cart items in local storage
    updateLocalStorage();
  }

  // Function to update local storage with current cart items
  function updateLocalStorage() {
    var cartItems = document.getElementById('cart-items');
    var cartData = [];
  
    Array.from(cartItems.children).forEach(function (item) {
      cartData.push({
        name: item.dataset.name,
        quantity: parseInt(item.dataset.quantity),
        price: parseFloat(item.cells[2].textContent.replace('$', '')) / parseInt(item.dataset.quantity) // Fix here
      });
    });
  
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  // Function to clear shopping cart and local storage
  function clearShoppingCart() {
    var cartItems = document.getElementById('cart-items');
    var totalSpan = document.getElementById('total-price');

    cartItems.innerHTML = '';
    totalSpan.textContent = '0.00';

    // Clear local storage
    localStorage.removeItem('cart');
  }

  // On page load, check if any items in local storage and add them back to the cart
  var storedCart = localStorage.getItem('cart');
  if (storedCart) {
    var cartData = JSON.parse(storedCart);
    cartData.forEach(function (item) {
      addToCart(item.name, item.quantity, item.price);
    });
  }
});

/*Close Cart*/
document.addEventListener('DOMContentLoaded', function () {
    //Event listener for clicking close cart button//
    document.getElementById('close-cart').addEventListener('click', function () {
      //Hide the cart when press close//
      document.getElementById('cart-popup').style.display = 'none';
    });
});

/*Hidden Details*/
function showBallInfo(box) {
    //Retrieve hidden ball information//
    const ballInfo = box.querySelector('.ball-info');
    //Display//
    ballInfo.style.display = 'block';
}

function hideBallInfo(box) {
    //Retrieve hidden ball information//
    const ballInfo = box.querySelector('.ball-info');
    //Hide//
    ballInfo.style.display = 'none';
    
}

/*Filter*/
document.addEventListener('DOMContentLoaded', function () {
  // Event listener for changes in the 'category' dropdown
  document.getElementById('category').addEventListener('change', function () {
      //Get value of user selected category//
      var selectedCategory = this.value;
      //Get all elements in the ball display box//
      var balls = document.querySelectorAll('.ball-display-box');

      // Iterate through each ball//
      balls.forEach(function (ball) {
          //Get ball category//
          var ballCategory = ball.getAttribute('data-category');
          //Check if ball category matches category in dropdown filter//
          var showBall = selectedCategory === 'all' || selectedCategory === ballCategory;
          //Toggle 'Hidden' Class if dosent match to hide irrelevent balls//
          ball.classList.toggle('hidden', !showBall);
      });
  });
});


document.addEventListener("DOMContentLoaded", function() {

  // Function to sort balls based on price
  function sortBalls() {
    //Get all elements (bowling ball info) in ball display box//
    var container = document.querySelector('.bowling-ball-container');
    var balls = container.querySelectorAll('.ball-display-box');
    //Retrieve the price sort manner option from the 'price' dropdown//
    var selectedOption = document.getElementById('price').value;

    
    var sortedBalls = Array.from(balls).sort(function (a, b) {

      //Get ball prices from class//
      var priceA = parseFloat(a.getAttribute('data-price'));
      var priceB = parseFloat(b.getAttribute('data-price'));

      //Sort ball in Ascending Price Order//
      if (selectedOption === 'low') {
        //Balls with lower prices will come first in the sorted array.//
        return priceA - priceB;

        //Sort Ball in Descending Price Order//
      } else if (selectedOption === 'high') {
        //Balls with higher prices will come first in the sorted array.//
        return priceB - priceA;
      } 
    });

    //Clear Ball Storing Container//
    container.innerHTML = '';

    // Append the sorted balls back to the container in the requested order based on price//
    sortedBalls.forEach(function (ball) {
      container.appendChild(ball);
    });
  }
  // Event listener for selection in the 'price' dropdown
  document.getElementById('price').addEventListener('change', sortBalls);
});
