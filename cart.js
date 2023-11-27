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
        var balls = document.querySelectorAll('.box2');

        balls.forEach(function (ball) {
            var ballCategory = ball.getAttribute('data-category');
            var showBall = selectedCategory === 'all' || selectedCategory === ballCategory;
            ball.classList.toggle('hidden', !showBall);
        });
    });
});