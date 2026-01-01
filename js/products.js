// Product Functions
function createProductCard(product) {
  const isInWishlist = window.Wishlist.hasItem(product.id)

  return `
        <div class="product-card">
            <div class="product-image-wrapper">
                <img src="../img_prod/${product.image}" alt="${product.name}" class="product-image">
                ${product.featured ? '<span class="product-badge">Featured</span>' : ""}
                <div class="product-actions">
                    <button class="action-btn ${isInWishlist ? "active" : ""}" onclick="toggleWishlist(${product.id}, this)">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="${isInWishlist ? "currentColor" : "none"}" stroke="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <button class="action-btn" onclick="quickView(${product.id})">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="product-content">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${window.Utils.generateStars(product.rating)}</div>
                    <span class="rating-count">(${product.reviewCount})</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">${window.Utils.formatPrice(product.price)}</div>
                    <button class="btn btn-primary btn-sm product-cart-btn" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `
}

function addToCart(productId) {
  window.Cart.addItem(productId)
  window.Utils.showToast("Added to cart!", "success")
}

function toggleWishlist(productId, btn) {
  const isAdded = window.Wishlist.toggleItem(productId)
  const svg = btn.querySelector("svg path")

  if (isAdded) {
    btn.classList.add("active")
    svg.setAttribute("fill", "currentColor")
    window.Utils.showToast("Added to wishlist!", "success")
  } else {
    btn.classList.remove("active")
    svg.setAttribute("fill", "none")
    window.Utils.showToast("Removed from wishlist!", "info")
  }
}

function quickView(productId) {
  const product = window.PRODUCTS.find((p) => p.id === productId)
  if (!product) return

  const content = document.getElementById("quickViewContent")
  content.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
            <div>
                <img src="../img_prod/${product.image}" alt="${product.name}" style="width: 100%; border-radius: 1rem;">
            </div>
            <div>
                <h2 style="font-family: var(--font-primary); font-size: var(--font-size-2xl); margin-bottom: 1rem;">${product.name}</h2>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <div class="stars">${window.Utils.generateStars(product.rating)}</div>
                    <span style="color: var(--color-text-tertiary);">(${product.reviewCount} reviews)</span>
                </div>
                <p style="color: var(--color-text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">${product.description}</p>
                <div style="font-family: var(--font-primary); font-size: var(--font-size-3xl); color: var(--color-primary); margin-bottom: 1.5rem;">${window.Utils.formatPrice(product.price)}</div>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-primary btn-lg" onclick="addToCart(${product.id}); window.Modal.close('quickViewModal')">Add to Cart</button>
                    <a href="product-detail.html?id=${product.id}" class="btn btn-secondary btn-lg">View Details</a>
                </div>
            </div>
        </div>
    `

  window.Modal.open("quickViewModal")
}
