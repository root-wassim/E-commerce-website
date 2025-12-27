// Utility Functions

// Declare STORAGE_KEYS and products variables
const STORAGE_KEYS = window.APP_CONFIG?.STORAGE_KEYS || {
  PRODUCTS: "neomarket_products",
}

const products = [
  {
    id: "prod-001",
    title: "NVIDIA RTX 4090 Gaming Graphics Card",
    category: "gpu",
    brand: "NVIDIA",
    price: 1599.99,
    originalPrice: 1899.99,
    primaryImage: "/nvidia-rtx-4090-graphics-card.jpg",
    images: ["/nvidia-rtx-4090-front-view.jpg", "/nvidia-rtx-4090-side-view.jpg", "/nvidia-rtx-4090-ports.jpg"],
    description: "Ultimate gaming performance with 24GB GDDR6X memory, ray tracing, and DLSS 3.0 technology.",
    vendorName: "TechGear Pro",
    vendorId: "vendor-001",
    verified: true,
    rating: 4.8,
    reviewCount: 342,
    stock: 15,
    condition: "new",
    badges: ["new"],
    specs: {
      Memory: "24GB GDDR6X",
      "Boost Clock": "2.52 GHz",
      "Memory Speed": "21 Gbps",
      "CUDA Cores": "16384",
      TDP: "450W",
    },
  },
  {
    id: "prod-002",
    title: "Logitech G Pro X Superlight Wireless Gaming Mouse",
    category: "mice",
    brand: "Logitech",
    price: 149.99,
    originalPrice: null,
    primaryImage: "/logitech-g-pro-x-superlight-gaming-mouse-white.jpg",
    images: ["/logitech-g-pro-x-mouse-top-view.jpg", "/logitech-g-pro-x-mouse-side-view.jpg"],
    description: "Ultra-lightweight wireless gaming mouse with HERO 25K sensor and up to 70 hours of battery life.",
    vendorName: "PeripheralsHub",
    vendorId: "vendor-002",
    verified: true,
    rating: 4.9,
    reviewCount: 528,
    stock: 42,
    condition: "new",
    badges: ["new"],
    specs: {
      Weight: "63g",
      Sensor: "HERO 25K",
      DPI: "100-25,600",
      "Battery Life": "70 hours",
      Connectivity: "LIGHTSPEED Wireless",
    },
  },
  {
    id: "prod-003",
    title: "Corsair K70 RGB Mechanical Gaming Keyboard",
    category: "keyboards",
    brand: "Corsair",
    price: 169.99,
    originalPrice: 199.99,
    primaryImage: "/corsair-k70-rgb-mechanical-keyboard.jpg",
    images: ["/corsair-k70-keyboard-front.jpg", "/corsair-k70-keyboard-rgb-lighting.jpg"],
    description: "Premium mechanical gaming keyboard with Cherry MX switches and per-key RGB backlighting.",
    vendorName: "KeyboardMasters",
    vendorId: "vendor-003",
    verified: true,
    rating: 4.7,
    reviewCount: 412,
    stock: 28,
    condition: "new",
    badges: [],
    specs: {
      "Switch Type": "Cherry MX Red",
      Backlighting: "Per-Key RGB",
      Connectivity: "USB-C Wired",
      "Polling Rate": "1000Hz",
      "Key Rollover": "100% Anti-Ghosting",
    },
  },
  {
    id: "prod-004",
    title: "Samsung Odyssey G9 49-inch Curved Gaming Monitor",
    category: "monitors",
    brand: "Samsung",
    price: 1299.99,
    originalPrice: 1499.99,
    primaryImage: "/samsung-odyssey-g9-curved-gaming-monitor.jpg",
    images: ["/samsung-odyssey-g9-front-view.jpg", "/samsung-odyssey-g9-curved-display.jpg"],
    description: "Immersive 49-inch DQHD curved gaming monitor with 240Hz refresh rate and 1ms response time.",
    vendorName: "DisplayWorld",
    vendorId: "vendor-004",
    verified: true,
    rating: 4.6,
    reviewCount: 245,
    stock: 8,
    condition: "new",
    badges: ["new"],
    specs: {
      Size: "49 inches",
      Resolution: "5120x1440 (DQHD)",
      "Refresh Rate": "240Hz",
      "Response Time": "1ms (GTG)",
      "Panel Type": "VA Curved",
    },
  },
  {
    id: "prod-005",
    title: "AMD Radeon RX 7900 XTX Graphics Card",
    category: "gpu",
    brand: "AMD",
    price: 999.99,
    originalPrice: null,
    primaryImage: "/rx-7900-xtx.jpg",
    images: ["/amd-rx-7900-xtx-front.jpg", "/amd-rx-7900-xtx-cooler.jpg"],
    description: "High-performance gaming GPU with 24GB GDDR6 memory and advanced RDNA 3 architecture.",
    vendorName: "TechGear Pro",
    vendorId: "vendor-001",
    verified: true,
    rating: 4.7,
    reviewCount: 189,
    stock: 22,
    condition: "new",
    badges: [],
    specs: {
      Memory: "24GB GDDR6",
      "Boost Clock": "2.5 GHz",
      "Stream Processors": "6144",
      TDP: "355W",
      Architecture: "RDNA 3",
    },
  },
  {
    id: "prod-006",
    title: "Razer DeathAdder V3 Pro Wireless Gaming Mouse",
    category: "mice",
    brand: "Razer",
    price: 129.99,
    originalPrice: 149.99,
    primaryImage: "/razer-deathadder-v3-pro-gaming-mouse.jpg",
    images: ["/razer-deathadder-v3-side-view.jpg", "/razer-deathadder-v3-pro-gaming-mouse.jpg"],
    description: "Ergonomic wireless gaming mouse with Focus Pro 30K sensor and HyperSpeed wireless technology.",
    vendorName: "PeripheralsHub",
    vendorId: "vendor-002",
    verified: true,
    rating: 4.8,
    reviewCount: 376,
    stock: 35,
    condition: "new",
    badges: [],
    specs: {
      Weight: "63g",
      Sensor: "Focus Pro 30K",
      DPI: "30,000",
      "Battery Life": "90 hours",
      Connectivity: "HyperSpeed Wireless",
    },
  },
  {
    id: "prod-007",
    title: "SteelSeries Apex Pro TKL Mechanical Keyboard",
    category: "keyboards",
    brand: "SteelSeries",
    price: 189.99,
    originalPrice: null,
    primaryImage: "/corsair-k70-rgb-tkl-mechanical-keyboard.jpg",
    images: ["/corsair-k70-rgb-tkl-mechanical-keyboard.jpg", "/corsair-k70-keyboard-rgb-lighting.jpg"],
    description: "Tenkeyless mechanical gaming keyboard with adjustable OmniPoint switches and OLED display.",
    vendorName: "KeyboardMasters",
    vendorId: "vendor-003",
    verified: true,
    rating: 4.7,
    reviewCount: 298,
    stock: 19,
    condition: "new",
    badges: ["new"],
    specs: {
      "Switch Type": "OmniPoint Adjustable",
      Backlighting: "Per-Key RGB",
      Connectivity: "USB Wired",
      Features: "OLED Smart Display",
      "Form Factor": "Tenkeyless (TKL)",
    },
  },
  {
    id: "prod-008",
    title: "ASUS ROG Swift PG27UQ 4K Gaming Monitor",
    category: "monitors",
    brand: "ASUS",
    price: 899.99,
    originalPrice: 1099.99,
    primaryImage: "/asus-rog-swift-oled-gaming-monitor.jpg",
    images: ["/asus-rog-swift-oled-gaming-monitor.jpg", "/samsung-odyssey-g9-front-view.jpg"],
    description: "4K HDR gaming monitor with 144Hz refresh rate, G-SYNC support, and quantum-dot technology.",
    vendorName: "DisplayWorld",
    vendorId: "vendor-004",
    verified: true,
    rating: 4.8,
    reviewCount: 167,
    stock: 12,
    condition: "new",
    badges: [],
    specs: {
      Size: "27 inches",
      Resolution: "3840x2160 (4K UHD)",
      "Refresh Rate": "144Hz",
      "Response Time": "4ms",
      "Panel Type": "IPS with Quantum Dot",
    },
  },
]

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Format date
function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString))
}

// Generate unique ID
function generateId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Get URL parameters
function getUrlParams() {
  const params = new URLSearchParams(window.location.search)
  const result = {}
  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}

// Update URL parameter
function updateUrlParam(key, value) {
  const url = new URL(window.location)
  if (value) {
    url.searchParams.set(key, value)
  } else {
    url.searchParams.delete(key)
  }
  window.history.pushState({}, "", url)
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// Truncate text
function truncate(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + "..."
}

// Generate star rating HTML
function generateStarRating(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  let html = ""
  for (let i = 0; i < fullStars; i++) {
    html += "★"
  }
  if (hasHalfStar) {
    html += "☆"
  }
  for (let i = 0; i < emptyStars; i++) {
    html += "☆"
  }
  return html
}

// Get products from storage
function getProducts() {
  const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS)
  if (stored) {
    return JSON.parse(stored)
  }
  return window.APP_CONFIG?.products || []
}

// Save products to storage
function saveProducts(productsData) {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(productsData))
}

// Find product by ID
function findProductById(productId) {
  const products = getProducts()
  return products.find((p) => p.id === productId)
}

window.formatCurrency = formatCurrency
window.formatDate = formatDate
window.generateId = generateId
window.debounce = debounce
window.getUrlParams = getUrlParams
window.updateUrlParam = updateUrlParam
window.escapeHtml = escapeHtml
window.truncate = truncate
window.generateStarRating = generateStarRating
window.getProducts = getProducts
window.saveProducts = saveProducts
window.findProductById = findProductById
