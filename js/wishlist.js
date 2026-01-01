// Wishlist Manager
window.Wishlist = {
  // Get wishlist items
  getItems() {
    return window.Utils.storage.get("wishlist") || []
  },

  // Add item to wishlist
  addItem(productId) {
    const wishlist = this.getItems()

    if (!wishlist.includes(productId)) {
      wishlist.push(productId)
      window.Utils.storage.set("wishlist", wishlist)
      this.updateBadge()
      return true
    }

    return false
  },

  // Remove item from wishlist
  removeItem(productId) {
    let wishlist = this.getItems()
    wishlist = wishlist.filter((id) => id !== productId)
    window.Utils.storage.set("wishlist", wishlist)
    this.updateBadge()
    return true
  },

  // Check if item is in wishlist
  hasItem(productId) {
    return this.getItems().includes(productId)
  },

  // Toggle item in wishlist
  toggleItem(productId) {
    if (this.hasItem(productId)) {
      this.removeItem(productId)
      return false
    } else {
      this.addItem(productId)
      return true
    }
  },

  // Update badge count
  updateBadge() {
    const badge = document.getElementById("wishlistBadge")
    if (badge) {
      const count = this.getItems().length
      badge.textContent = count
      badge.style.display = count > 0 ? "flex" : "none"
    }
  },
}
