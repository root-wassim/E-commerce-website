// Main Application Initialization

document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] NeoMarket initialized")

  window.updateAuthUI()
  window.updateCartBadge()
  window.updateWishlistUI()

  // Setup navigation search
  const navSearch = document.getElementById("navSearch")
  const searchClear = document.getElementById("searchClear")

  if (navSearch) {
    navSearch.addEventListener("input", (e) => {
      const query = e.target.value
      if (searchClear) {
        searchClear.style.display = query ? "flex" : "none"
      }
      if (window.performSearch) {
        window.performSearch(query)
      }
    })

    navSearch.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const query = e.target.value
        if (query) {
          window.location.href = `search.html?q=${encodeURIComponent(query)}`
        }
      }
    })
  }

  if (searchClear) {
    searchClear.addEventListener("click", () => {
      if (navSearch) {
        navSearch.value = ""
        searchClear.style.display = "none"
      }
      const suggestions = document.getElementById("searchSuggestions")
      if (suggestions) {
        suggestions.style.display = "none"
      }
    })
  }

  // Close search suggestions when clicking outside
  document.addEventListener("click", (e) => {
    const searchBar = document.querySelector(".search-bar")
    const suggestions = document.getElementById("searchSuggestions")
    if (searchBar && suggestions && !searchBar.contains(e.target)) {
      suggestions.style.display = "none"
    }
  })

  // Setup profile dropdown
  const profileBtn = document.getElementById("profileBtn")
  const profileDropdown = document.getElementById("profileDropdown")

  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      const isVisible = profileDropdown.style.display === "block"
      profileDropdown.style.display = isVisible ? "none" : "block"
      profileBtn.setAttribute("aria-expanded", !isVisible)
    })

    document.addEventListener("click", () => {
      profileDropdown.style.display = "none"
      profileBtn.setAttribute("aria-expanded", "false")
    })
  }

  // Setup hamburger menu
  const hamburger = document.getElementById("hamburger")
  const mobileMenu = document.getElementById("mobileMenu")

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isVisible = mobileMenu.style.display === "block"
      mobileMenu.style.display = isVisible ? "none" : "block"
    })
  }

  // Homepage specific initialization
  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname.endsWith("/") ||
    window.location.pathname === "/public/" ||
    window.location.pathname === "/public/index.html"
  ) {
    initHomepage()
  }
})

function initHomepage() {
  console.log("[v0] Initializing homepage")

  const featuredProducts = window.getProducts().slice(0, 8)
  if (window.displayProducts) {
    window.displayProducts(featuredProducts, "productGrid")
  }

  // Setup category chips
  const chips = document.querySelectorAll(".category-chips .chip")
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      // Update active state
      chips.forEach((c) => c.classList.remove("chip-active"))
      chip.classList.add("chip-active")

      // Filter products
      const category = chip.dataset.category
      let products
      if (category === "all") {
        products = window.getProducts().slice(0, 8)
      } else {
        products = window.filterProducts({ category }).slice(0, 8)
      }
      if (window.displayProducts) {
        window.displayProducts(products, "productGrid")
      }
    })
  })
}
