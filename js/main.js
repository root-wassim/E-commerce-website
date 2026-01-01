// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Update auth UI
  window.Auth.updateUI()

  // Update cart badge
  window.Cart.updateBadge()

  // Update wishlist badge
  window.Wishlist.updateBadge()

  // Setup user menu dropdown
  setupUserMenu()

  // Setup search
  setupSearch()

  // Load trending products on homepage
  if (document.getElementById("trendingProducts")) {
    loadTrendingProducts()
  }
})

function setupUserMenu() {
  const userBtn = document.getElementById("userMenuBtn")
  const dropdown = document.getElementById("userDropdown")

  if (userBtn && dropdown) {
    userBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      dropdown.classList.toggle("active")
    })

    document.addEventListener("click", () => {
      dropdown.classList.remove("active")
    })
  }
}

function setupSearch() {
  const searchForm = document.getElementById("searchForm")
  const searchInput = document.getElementById("searchInput")

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const query = searchInput.value.trim()
      if (query) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`
      }
    })
  }
}

function loadTrendingProducts() {
  const container = document.getElementById("trendingProducts")
  if (!container) return

  const featuredProducts = window.PRODUCTS.filter((p) => p.featured).slice(0, 8)

  container.innerHTML = featuredProducts.map((product) => window.createProductCard(product)).join("")
}
