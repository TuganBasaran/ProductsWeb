const API_URL = "https://dummyjson.com";

// Add to Cart Function
async function addToCart(productId, quantity) {
    try {
        const response = await fetch(`${API_URL}/carts/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 1, // Test için sabit bir userId kullanıyoruz
                products: [{ id: parseInt(productId), quantity: parseInt(quantity) }]
            })
        });

        if (response.ok) {
            const cart = await response.json();
            alert(`Added to Cart! Total: $${cart.total}, Discounted Total: $${cart.discountedTotal}`);
        } else {
            const error = await response.json();
            alert(`Failed to add to cart: ${error.message}`);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
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
