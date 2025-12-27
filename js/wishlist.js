// Wishlist Management

const STORAGE_KEYS = window.APP_CONFIG?.STORAGE_KEYS || {
  WISHLIST: "neomarket_wishlist",
}

function getWishlist() {
  const wishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST)
  return wishlist ? JSON.parse(wishlist) : []
}

function saveWishlist(wishlistData) {
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlistData))
}

function addToWishlist(productId) {
  const wishlist = getWishlist()

  if (wishlist.includes(productId)) {
    window.showToast("Already in wishlist", "info")
    return false
  }

  wishlist.push(productId)
  saveWishlist(wishlist)
  window.showToast("Added to wishlist", "success")
  updateWishlistUI()
  return true
}

function removeFromWishlist(productId) {
  let wishlist = getWishlist()
  wishlist = wishlist.filter((id) => id !== productId)
  saveWishlist(wishlist)
  window.showToast("Removed from wishlist", "success")
  updateWishlistUI()
}

function toggleWishlist(productId) {
  const wishlist = getWishlist()
  if (wishlist.includes(productId)) {
    removeFromWishlist(productId)
    return false
  } else {
    addToWishlist(productId)
    return true
  }
}

function isInWishlist(productId) {
  const wishlist = getWishlist()
  return wishlist.includes(productId)
}

function getWishlistProducts() {
  const wishlist = getWishlist()
  return wishlist.map((id) => window.findProductById(id)).filter((p) => p)
}

function updateWishlistUI() {
  const buttons = document.querySelectorAll(".wishlist-btn")
  buttons.forEach((btn) => {
    const productId = btn.dataset.productId
    if (productId) {
      btn.classList.toggle("active", isInWishlist(productId))
    }
  })
}

window.getWishlist = getWishlist
window.addToWishlist = addToWishlist
window.removeFromWishlist = removeFromWishlist
window.toggleWishlist = toggleWishlist
window.isInWishlist = isInWishlist
window.getWishlistProducts = getWishlistProducts
window.updateWishlistUI = updateWishlistUI
