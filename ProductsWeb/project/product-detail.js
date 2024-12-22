const API_URL = "https://dummyjson.com";

// Show Modal Function
function showModal(title, message, total = '', discountedTotal = '') {
    const modal = document.getElementById('cart-alert-modal');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-message').innerText = message;

    if (total && discountedTotal) {
        document.getElementById('modal-total').innerText = `Cart Total: $${total}`;
        document.getElementById('modal-discounted-total').innerText = `Discounted Total: $${discountedTotal}`;
    } else {
        document.getElementById('modal-total').innerText = '';
        document.getElementById('modal-discounted-total').innerText = '';
    }

    modal.style.display = 'flex';

    document.getElementById('close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Add to Cart Function
async function addToCart(productId, quantity) {
    try {
        const response = await fetch(`${API_URL}/carts/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 1, // Test için sabit bir userId
                products: [{ id: parseInt(productId), quantity: parseInt(quantity) }]
            })
        });

        if (response.ok) {
            const cart = await response.json();
            showModal(
                'Add to Cart',
                'Products added to shopping cart successfully!',
                cart.total,
                cart.discountedTotal
            );
        } else {
            const error = await response.json();
            showModal(
                'Add to Cart',
                `Failed to add to cart: ${error.message}`
            );
        }
    } catch (error) {
        showModal(
            'Add to Cart',
            `An error occurred: ${error.message}`
        );
    }
}

// Load Product Details
async function loadProductDetails(productId) {
    const response = await fetch(`${API_URL}/products/${productId}`);
    const product = await response.json();

    const productDetailContainer = document.getElementById('product-detail');
    productDetailContainer.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h1>${product.title}</h1>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <p>Brand: ${product.brand}</p>
        <p>Stock: ${product.stock}</p>
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" min="1" value="1">
        <button id="add-to-cart">Add to Cart</button>
    `;

    document.getElementById('add-to-cart').addEventListener('click', () => {
        const quantity = document.getElementById('quantity').value;
        addToCart(productId, quantity);
    });
}

// Get Product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (productId) {
    loadProductDetails(productId);
} else {
    alert('No Product ID!');
}
