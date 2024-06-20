// scripts.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id, name, price) {
    cart.push({ id, name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    if (window.location.pathname.endsWith('checkout.html')) {
        displayCartOnCheckout();
    }
}

function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalP = document.getElementById('cart-total');
    const errorMessageP = document.getElementById('error-message');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `<span class="cart-item-name">${item.name} - $${item.price}</span> <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>`;
        cartItemsDiv.appendChild(div);
        total += item.price;
    });
    cartTotalP.textContent = `Total: $${total}`;
    if (cart.length === 0) {
        errorMessageP.textContent = 'Your cart is empty. Please add products to your cart before proceeding to checkout.';
    } else {
        errorMessageP.textContent = '';
    }
}

function goToCheckout() {
    if (cart.length === 0) {
        document.getElementById('error-message').textContent = 'Your cart is empty. Please add products to your cart before proceeding to checkout.';
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'checkout.html';
    }
}

function displayCartOnCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalP = document.getElementById('cart-total');
    const errorMessageP = document.getElementById('error-message');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `<span class="cart-item-name">${item.name} - $${item.price}</span> <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>`;
        cartItemsDiv.appendChild(div);
        total += item.price;
    });
    cartTotalP.textContent = `Total: $${total}`;
    if (cart.length === 0) {
        errorMessageP.textContent = 'Your cart is empty. Please add products to your cart before proceeding with the order.';
    } else {
        errorMessageP.textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('checkout.html')) {
        displayCartOnCheckout();

        document.getElementById('checkout-form').addEventListener('submit', function(event) {
            event.preventDefault();
            if (cart.length === 0) {
                document.getElementById('error-message').textContent = 'Your cart is empty. Please add products to your cart before proceeding with the order.';
            } else {
                const name = document.getElementById('name').value;
                const address = document.getElementById('address').value;
                const paymentMethod = document.getElementById('payment-method').value;
                localStorage.setItem('customerName', name);
                localStorage.setItem('customerAddress', address);
                localStorage.setItem('paymentMethod', paymentMethod);
                localStorage.removeItem('cart');
                window.location.href = 'success.html';
            }
        });
    } else if (window.location.pathname.endsWith('success.html')) {
        const name = localStorage.getItem('customerName');
        const address = localStorage.getItem('customerAddress');
        const paymentMethod = localStorage.getItem('paymentMethod');
        const confirmationMessage = `Thank you, ${name}! Your order will be delivered to ${address} within 7 days. Payment Method: ${paymentMethod}.`;
        document.getElementById('confirmation-message').textContent = confirmationMessage;
    } else {
        displayCart();
    }
});
