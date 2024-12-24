const API_URL = "https://dummyjson.com";

// Load Categories
async function loadCategories() {
  const response = await fetch(`${API_URL}/products/categories`);
  const categories = await response.json();
  const categoriesDropdown = document.getElementById("categories");
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.innerHTML = `
      ${category.name}
    `;
    option.value = category.slug;
    categoriesDropdown.appendChild(option);
  });
}

// Load Products
async function loadProducts(
  category = "all",
  searchQuery = "",
  sortType = "default"
) {
  let url = `${API_URL}/products`;
  if (category !== "all") {
    if (sortType !== "default") {
      let sortBy = "price";
      let order = sortType === "low-high" ? "asc" : "desc";

      url += `/category/${category}?sortBy=${sortBy}&order=${order}&limit=0`;
    } else {
      url += `/category/${category}?limit=0`;
    }
  } else {
    if (sortType !== "default") {
      let sortBy = "price";
      let order = sortType === "low-high" ? "asc" : "desc";

      url += `?sortBy=${sortBy}&order=${order}&limit=0`;
    } else {
      url += "?limit=0";
    }
  }

  const response = await fetch(url);
  const { products } = await response.json();
  let filteredProducts = products;

  if (searchQuery) {
    filteredProducts = products.filter((product) => {
      if (product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
    });
  }

  displayProducts(filteredProducts);
}

// Display Products
function displayProducts(products) {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.thumbnail}" alt="${product.title}">
            </a>
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <p>Rating: ${product.rating}</p>
            <p>Rating Count: ${product.reviews.length} </p>
        `;
    productsContainer.appendChild(productDiv);
  });
}

// Event Listeners
document.getElementById("get-products").addEventListener("click", async () => {
  const category = document.getElementById("categories").value;
  const sortType = document.getElementById("sort").value;
  const searchQuery = document.getElementById("search").value;
  await loadProducts(category, searchQuery, sortType);
});

// On Page Load
window.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadProducts();
});
