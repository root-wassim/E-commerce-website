// Authentication System

const STORAGE_KEYS = window.APP_CONFIG?.STORAGE_KEYS || {
  USER_SESSION: "neomarket_session",
  USERS: "neomarket_users",
}

function initUsers() {
  const stored = localStorage.getItem(STORAGE_KEYS.USERS)
  if (stored) {
    return JSON.parse(stored)
  }

  const demoUsers = [
    {
      id: "user-admin",
      email: "admin@neomarket.com",
      password: "admin123",
      displayName: "Admin User",
      phone: "+1-555-0100",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: "user-seller",
      email: "seller@neomarket.com",
      password: "seller123",
      displayName: "Pro Seller",
      phone: "+1-555-0200",
      role: "seller",
      createdAt: new Date().toISOString(),
    },
    {
      id: "user-buyer",
      email: "buyer@neomarket.com",
      password: "buyer123",
      displayName: "John Buyer",
      phone: "+1-555-0300",
      role: "buyer",
      createdAt: new Date().toISOString(),
    },
  ]

  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(demoUsers))
  return demoUsers
}

initUsers()

function getCurrentUser() {
  const session = sessionStorage.getItem(STORAGE_KEYS.USER_SESSION)
  return session ? JSON.parse(session) : null
}

function setCurrentUser(user) {
  sessionStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(user))
  updateAuthUI()
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEYS.USER_SESSION)
  window.showToast("Logged out successfully", "success")
  updateAuthUI()

  const protectedPages = ["admin.html", "vendor-dashboard.html"]
  const currentPage = window.location.pathname.split("/").pop()
  if (protectedPages.includes(currentPage)) {
    window.location.href = "index.html"
  }
}

function login(email, password) {
  const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]")
  const user = storedUsers.find((u) => u.email === email && u.password === password)

  if (user) {
    const session = {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
    }
    setCurrentUser(session)
    return { success: true, user: session }
  }

  return { success: false, error: "Invalid email or password" }
}

function register(email, password, displayName, role = "buyer") {
  const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]")

  if (storedUsers.find((u) => u.email === email)) {
    return { success: false, error: "Email already registered" }
  }

  const newUser = {
    id: window.generateId("user"),
    email,
    password,
    displayName,
    phone: "",
    role,
    createdAt: new Date().toISOString(),
  }

  storedUsers.push(newUser)
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(storedUsers))

  const session = {
    id: newUser.id,
    email: newUser.email,
    displayName: newUser.displayName,
    role: newUser.role,
  }
  setCurrentUser(session)

  return { success: true, user: session }
}

function requireAuth(requiredRole = null) {
  const user = getCurrentUser()

  if (!user) {
    window.location.href = "login.html?redirect=" + encodeURIComponent(window.location.pathname)
    return false
  }

  if (requiredRole && user.role !== requiredRole) {
    window.showToast("Access denied", "error")
    window.location.href = "index.html"
    return false
  }

  return true
}

function updateAuthUI() {
  const user = getCurrentUser()
  const authMenu = document.getElementById("authMenu")
  const mobileAuthLinks = document.getElementById("mobileAuthLinks")

  if (!authMenu) return

  if (user) {
    const menuHTML = `
      <div style="padding: var(--space-md); border-bottom: 1px solid var(--glass-border);">
        <strong style="color: var(--text);">${window.escapeHtml(user.displayName)}</strong>
        <div style="font-size: 0.75rem; color: var(--muted);">${window.escapeHtml(user.email)}</div>
      </div>
      ${user.role === "admin" ? '<a href="admin.html">Admin Panel</a>' : ""}
      ${user.role === "seller" || user.role === "admin" ? '<a href="vendor-dashboard.html">Seller Dashboard</a>' : ""}
      <a href="wishlist.html">Wishlist</a>
      <a href="cart.html">Orders</a>
      <button onclick="window.logout()">Logout</button>
    `
    authMenu.innerHTML = menuHTML

    if (mobileAuthLinks) {
      mobileAuthLinks.innerHTML = menuHTML
    }
  } else {
    authMenu.innerHTML = `
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
    `

    if (mobileAuthLinks) {
      mobileAuthLinks.innerHTML = `
        <a href="login.html">Login</a>
        <a href="register.html">Register</a>
      `
    }
  }
}

window.getCurrentUser = getCurrentUser
window.setCurrentUser = setCurrentUser
window.logout = logout
window.login = login
window.register = register
window.requireAuth = requireAuth
window.updateAuthUI = updateAuthUI
