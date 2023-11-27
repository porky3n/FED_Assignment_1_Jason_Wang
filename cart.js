/*Cart*/

window.addEventListener('load', function() {
    document.getElementById('cart-icon').addEventListener('click', function() {
        var cartPopup = document.getElementById('cart-popup');
        cartPopup.style.display = (cartPopup.style.display === 'block') ? 'none' : 'block';
    });

    var addToCartButtons = document.getElementsByClassName('add-to-cart-button');

    Array.from(addToCartButtons).forEach(function(button) {
        button.addEventListener('click', function() {
            var itemName = button.getAttribute('ball-name');
            var itemPrice = parseFloat(button.getAttribute('ball-price'));

            addToCart(itemName, itemPrice);

            
            button.textContent = 'Item Added to Cart';
                
                
            setTimeout(function () {
            button.textContent = 'Add to Cart';}, 1500);


        });
    });

    function addToCart(itemName, price) {
        var cartItems = document.getElementById('cart-items');
        var totalSpan = document.getElementById('total-price');

     
        var listItem = document.createElement('li');
        listItem.textContent = itemName + ' - $' + price;

        
        cartItems.appendChild(listItem);

        
        var currentTotal = parseFloat(totalSpan.textContent);
        totalSpan.textContent = (currentTotal + price).toFixed(2);
       
    }

});