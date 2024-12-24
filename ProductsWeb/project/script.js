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

//  if (category !== "all") {
        //    url += `&category=${category}`;
        //  }

// // Load Products
// async function loadProducts(
//   category = "all",
//   searchQuery = "",
//   sortType = "default"
// ) {
//   let url = `${API_URL}/products`;
//   if (category !== "all") {
//     url += `/search?category=${category}`;
//     if (!searchQuery) {
//       if (sortType !== "default") {
//         let sortBy = "price";
//         let order = sortType === "low-high" ? "asc" : "desc";
//         url += `&sortBy=${sortBy}&order=${order}`;
//       }
//     } else {
//       let sortBy = "price";
//       url += `&q=${searchQuery}`;
//       let order = sortType === "low-high" ? "asc" : "desc";
//       if (sortType !== "default") {
//         let sortBy = "price";
//         let order = sortType === "low-high" ? "asc" : "desc";
//         url += `&sortBy=${sortBy}&order=${order}`;
//       }
//     }
//   } else {
//     if (!searchQuery) {
      
//       if (sortType !== "default") {
//         let sortBy = "price";
//         let order = sortType === "low-high" ? "asc" : "desc";
//         url += `?sortBy=${sortBy}&order=${order}`;
//       }
//     } else {
//       let sortBy = "price";
//       let order = sortType === "low-high" ? "asc" : "desc";
      
//       if (sortType !== "default") {
//         let sortBy = "price";
//         let order = sortType === "low-high"
//               ? "asc"
//               : "desc";
//         url += `&sortBy=${sortBy}&order=${order}`;
//       }
//     }
//   }  
//   const response = await fetch(url);
//   const { products } = await response.json();

//   displayProducts(products);
// }


  async function loadProducts(
    category = "all",
    searchQuery = "",
    sortType = "defa"
  ) {
    let url = `${API_URL}/products`;

    if (category !== "all") {
      url += `/category/${category}`;
    }

    if (searchQuery) {
      url += `/search?q=${searchQuery}`;
    }

    if (sortType && sortType !== "default") {
      let sortBy = "price"; // where the sorting will be done
      let order = sortType === "low-high" ? "asc" : "desc"; // ascending or descending order
      url += `?sortBy=${sortBy}&order=${order}`;
    }

    const response = await fetch(url);
    const { products } = await response.json();

    displayProducts(products);
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
  console.log(category, sortType, searchQuery);
  await loadProducts(category, searchQuery, sortType);
});

// document.getElementById("categories").addEventListener("change", async () => {
//   const category = document.getElementById("categories").value;
//   const sortType = document.getElementById("sort").value;
//   const searchQuery = document.getElementById("search").value;
//   await loadProducts(category, searchQuery, sortType);
// });

// document.getElementById("search").addEventListener("input", async () => {
//   const category = document.getElementById("categories").value;
//   const sortType = document.getElementById("sort").value;
//   const searchQuery = document.getElementById("search").value;
//   await loadProducts(category, searchQuery, sortType);
// });

// On Page Load
window.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadProducts();
});
