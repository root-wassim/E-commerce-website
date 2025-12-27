// Shopping Cart Management

const STORAGE_KEYS = window.APP_CONFIG?.STORAGE_KEYS || {
  CART: "neomarket_cart",
}

function getCart() {
  const cart = localStorage.getItem(STORAGE_KEYS.CART)
  return cart ? JSON.parse(cart) : []
}

function saveCart(cartData) {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartData))
  updateCartBadge()
}

function addToCart(productId, quantity = 1) {
  const product = window.findProductById(productId)
  if (!product) {
    window.showToast("Product not found", "error")
    return false
  }

  if (product.stock < quantity) {
    window.showToast("Not enough stock available", "error")
    return false
  }

  const cart = getCart()
  const existingItem = cart.find((item) => item.productId === productId)

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity
    if (newQuantity > product.stock) {
      window.showToast("Not enough stock available", "error")
      return false
    }
    existingItem.quantity = newQuantity
  } else {
    cart.push({
      id: window.generateId("cart"),
      productId,
      quantity,
      addedAt: new Date().toISOString(),
    })
  }

  saveCart(cart)
  window.showToast("Added to cart", "success")
  return true
}

function removeFromCart(cartItemId) {
  let cart = getCart()
  cart = cart.filter((item) => item.id !== cartItemId)
  saveCart(cart)
  window.showToast("Removed from cart", "success")
}

function updateCartQuantity(cartItemId, quantity) {
  const cart = getCart()
  const item = cart.find((i) => i.id === cartItemId)

  if (!item) return false

  const product = window.findProductById(item.productId)
  if (!product) return false

  if (quantity > product.stock) {
    window.showToast("Not enough stock available", "error")
    return false
  }

  if (quantity <= 0) {
    removeFromCart(cartItemId)
    return true
  }

  item.quantity = quantity
  saveCart(cart)
  return true
}

function getCartWithProducts() {
  const cart = getCart()
  return cart
    .map((item) => {
      const product = window.findProductById(item.productId)
      return {
        ...item,
        product,
      }
    })
    .filter((item) => item.product)
}

function getCartTotal() {
  const cartItems = getCartWithProducts()
  return cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)
}

function getCartCount() {
  const cart = getCart()
  return cart.reduce((count, item) => count + item.quantity, 0)
}

function clearCart() {
  saveCart([])
  window.showToast("Cart cleared", "success")
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge")
  if (badge) {
    const count = getCartCount()
    badge.textContent = count
    badge.style.display = count > 0 ? "flex" : "none"
  }
}

window.getCart = getCart
window.addToCart = addToCart
window.removeFromCart = removeFromCart
window.updateCartQuantity = updateCartQuantity
window.getCartWithProducts = getCartWithProducts
window.getCartTotal = getCartTotal
window.getCartCount = getCartCount
window.clearCart = clearCart
window.updateCartBadge = updateCartBadge
