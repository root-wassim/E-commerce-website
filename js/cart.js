// Cart Manager
window.Cart = {
  // Get cart items
  getItems() {
    return window.Utils.storage.get("cart") || []
  },

  // Add item to cart
  addItem(productId, quantity = 1) {
    const cart = this.getItems()
    const existingItem = cart.find((item) => item.productId === productId)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ productId, quantity })
    }

    window.Utils.storage.set("cart", cart)
    this.updateBadge()
    return true
  },

  // Remove item from cart
  removeItem(productId) {
    let cart = this.getItems()
    cart = cart.filter((item) => item.productId !== productId)
    window.Utils.storage.set("cart", cart)
    this.updateBadge()
    return true
  },

  // Update item quantity
  updateQuantity(productId, quantity) {
    const cart = this.getItems()
    const item = cart.find((item) => item.productId === productId)

    if (item) {
      item.quantity = quantity
      window.Utils.storage.set("cart", cart)
      this.updateBadge()
      return true
    }

    return false
  },

  // Clear cart
  clear() {
    window.Utils.storage.remove("cart")
    this.updateBadge()
  },

  // Get cart total
  getTotal() {
    const cart = this.getItems()
    return cart.reduce((total, item) => {
      const product = window.PRODUCTS.find((p) => p.id === item.productId)
      return total + (product ? product.price * item.quantity : 0)
    }, 0)
  },

  // Update badge count
  updateBadge() {
    const badge = document.getElementById("cartBadge")
    if (badge) {
      const count = this.getItems().reduce((sum, item) => sum + item.quantity, 0)
      badge.textContent = count
      badge.style.display = count > 0 ? "flex" : "none"
    }
  },
}
