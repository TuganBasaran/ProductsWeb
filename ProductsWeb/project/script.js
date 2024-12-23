const API_URL = "https://dummyjson.com";

// Load Categories
async function loadCategories() {
    const response = await fetch(`${API_URL}/products/category-list`);
    const categories = await response.json();
    const categoriesDropdown = document.getElementById('categories');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoriesDropdown.appendChild(option);
    });
}

// Load and Sort Products
async function loadProducts(category = "all", sortType = "low-high") {
    let sortBy = "price"; //where the sorting will be done
    let order = sortType === "low-high" ? "asc" : "desc"; // ascending or descending order

    let url = `${API_URL}/products?sortBy=${sortBy}&order=${order}`;
    if (category !== "all") url = `${API_URL}/products/category/${category}?sortBy=${sortBy}&order=${order}`;

    const response = await fetch(url);
    const { products } = await response.json();
    displayProducts(products);
}

// Display Products
function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.thumbnail}" alt="${product.title}">
            </a>
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <p>Rating: ${product.rating} (${product.ratingCount})</p>
        `;
        productsContainer.appendChild(productDiv);
    });
}

// Event Listeners
document.getElementById('get-products').addEventListener('click', () => {
    const category = document.getElementById('categories').value;
    const sortType = document.getElementById('sort').value;
    loadProducts(category, sortType);
});

// On Page Load
window.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadProducts();
});
