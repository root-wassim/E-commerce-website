// Product Filtering and Display

function createProductCard(product) {
  const inWishlist = window.isInWishlist(product.id)
  const hasDiscount = product.originalPrice && product.originalPrice > product.price

  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="card-image">
        <img src="${product.primaryImage}" alt="${window.escapeHtml(product.title)}" loading="lazy">
        <button class="wishlist-btn ${inWishlist ? "active" : ""}" 
                data-product-id="${product.id}" 
                onclick="handleWishlistClick(event, '${product.id}')"
                aria-label="Add to wishlist">♥</button>
        ${product.badges.includes("new") ? '<span class="badge badge-new">NEW</span>' : ""}
        ${hasDiscount ? '<span class="badge badge-sale" style="left: auto; right: var(--space-md);">SALE</span>' : ""}
      </div>
      <div class="card-body">
        <span class="vendor-name">
          ${window.escapeHtml(product.vendorName)}
          ${product.verified ? '<span class="verified">✓</span>' : ""}
        </span>
        <h3 class="product-title">${window.escapeHtml(product.title)}</h3>
        <div class="rating">
          ${window.generateStarRating(product.rating)}
          <span class="rating-count">(${product.reviewCount})</span>
        </div>
        <div class="price">
          <span class="current-price">${window.formatCurrency(product.price)}</span>
          ${hasDiscount ? `<span class="original-price">${window.formatCurrency(product.originalPrice)}</span>` : ""}
        </div>
        <div class="card-actions">
          <button class="btn-quick-view" onclick="showQuickView('${product.id}')">Quick View</button>
        </div>
      </div>
    </div>
  `
}

function handleWishlistClick(event, productId) {
  event.stopPropagation()
  window.toggleWishlist(productId)
}

function showQuickView(productId) {
  const product = window.findProductById(productId)
  if (!product) return

  const hasDiscount = product.originalPrice && product.originalPrice > product.price

  const content = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2xl);">
      <div>
        <img src="${product.primaryImage}" alt="${window.escapeHtml(product.title)}" 
             style="width: 100%; border-radius: var(--radius-md);">
      </div>
      <div>
        <h2 style="margin-bottom: var(--space-md);">${window.escapeHtml(product.title)}</h2>
        <div class="rating" style="margin-bottom: var(--space-md);">
          ${window.generateStarRating(product.rating)}
          <span class="rating-count">(${product.reviewCount})</span>
        </div>
        <div class="price" style="margin-bottom: var(--space-lg);">
          <span class="current-price">${window.formatCurrency(product.price)}</span>
          ${hasDiscount ? `<span class="original-price">${window.formatCurrency(product.originalPrice)}</span>` : ""}
        </div>
        <p style="color: var(--muted); margin-bottom: var(--space-lg);">
          ${window.escapeHtml(product.description)}
        </p>
        <div style="margin-bottom: var(--space-lg);">
          <strong style="color: var(--text);">Key Specifications:</strong>
          <ul style="margin-top: var(--space-sm); color: var(--muted);">
            ${Object.entries(product.specs)
              .map(([key, value]) => `<li style="margin-bottom: var(--space-xs);">${key}: ${value}</li>`)
              .join("")}
          </ul>
        </div>
        <div style="display: flex; gap: var(--space-md);">
          <button class="btn btn-primary" onclick="addToCart('${product.id}'); closeModal('quickViewModal');" 
                  style="flex: 1;">Add to Cart</button>
          <button class="btn btn-secondary" onclick="window.location.href='product-detail.html?id=${product.id}'">
            View Details
          </button>
        </div>
      </div>
    </div>
  `

  document.getElementById("quickViewContent").innerHTML = content
  window.openModal("quickViewModal")
}

function displayProducts(productsToDisplay, containerId = "productGrid") {
  const container = document.getElementById(containerId)
  if (!container) return

  if (productsToDisplay.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-3xl); color: var(--muted);">
        <p style="font-size: 1.25rem; margin-bottom: var(--space-md);">No products found</p>
        <a href="products.html" class="btn btn-primary">Browse All Products</a>
      </div>
    `
    return
  }

  container.innerHTML = productsToDisplay.map((product) => createProductCard(product)).join("")
}

function filterProducts(filters = {}) {
  let products = window.getProducts()

  // Category filter
  if (filters.category && filters.category !== "all") {
    products = products.filter((p) => p.category === filters.category)
  }

  // Search query
  if (filters.query) {
    const query = filters.query.toLowerCase()
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query),
    )
  }

  // Brand filter
  if (filters.brands && filters.brands.length > 0) {
    products = products.filter((p) => filters.brands.includes(p.brand))
  }

  // Price range
  if (filters.minPrice !== undefined) {
    products = products.filter((p) => p.price >= filters.minPrice)
  }
  if (filters.maxPrice !== undefined) {
    products = products.filter((p) => p.price <= filters.maxPrice)
  }

  // Condition
  if (filters.condition) {
    products = products.filter((p) => p.condition === filters.condition)
  }

  // Sort
  if (filters.sort) {
    switch (filters.sort) {
      case "price-low":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        products.sort((a, b) => b.price - a.price)
        break
      case "rating":
        products.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        products.sort((a, b) => b.id.localeCompare(a.id))
        break
    }
  }

  return products
}

// Search functionality with debounce
const performSearch = window.debounce((query) => {
  if (!query || query.length < 2) {
    document.getElementById("searchSuggestions").style.display = "none"
    return
  }

  const results = filterProducts({ query }).slice(0, 5)
  const suggestionsContainer = document.getElementById("searchSuggestions")

  if (results.length === 0) {
    suggestionsContainer.style.display = "none"
    return
  }

  suggestionsContainer.innerHTML = results
    .map(
      (product) => `
    <a href="product-detail.html?id=${product.id}" class="suggestion-item">
      <img src="${product.primaryImage}" alt="${window.escapeHtml(window.truncate(product.title, 50))}" class="suggestion-image">
      <div class="suggestion-info">
        <div class="suggestion-title">${window.escapeHtml(window.truncate(product.title, 50))}</div>
        <div class="suggestion-price">${window.formatCurrency(product.price)}</div>
      </div>
    </a>
  `,
    )
    .join("")

  suggestionsContainer.style.display = "block"
}, 300)

window.createProductCard = createProductCard
window.handleWishlistClick = handleWishlistClick
window.showQuickView = showQuickView
window.displayProducts = displayProducts
window.filterProducts = filterProducts
window.performSearch = performSearch
