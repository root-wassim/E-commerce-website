// Authentication Manager
window.Auth = {
  // Check if user is logged in
  isAuthenticated() {
    return !!window.Utils.storage.get("currentUser")
  },

  // Get current user
  getCurrentUser() {
    return window.Utils.storage.get("currentUser")
  },

  // Login
  async login(email, password) {
    // Check demo users
    const demoUser = Object.values(window.DEMO_USERS).find((u) => u.email === email && u.password === password)

    if (demoUser) {
      const user = {
        id: Date.now(),
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role,
      }
      window.Utils.storage.set("currentUser", user)
      return { success: true, user }
    }

    // Check registered users
    const users = window.Utils.storage.get("users") || []
    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      const userData = { ...user }
      delete userData.password
      window.Utils.storage.set("currentUser", userData)
      return { success: true, user: userData }
    }

    return { success: false, message: "Invalid email or password" }
  },

  // Register
  async register(name, email, password, role = "buyer") {
    const users = window.Utils.storage.get("users") || []

    // Check if email already exists
    if (users.find((u) => u.email === email)) {
      return { success: false, message: "Email already registered" }
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    window.Utils.storage.set("users", users)

    return { success: true }
  },

  // Logout
  logout() {
    window.Utils.storage.remove("currentUser")
    window.location.href = "index.html"
  },

  // Update UI based on auth state
  updateUI() {
    const user = this.getCurrentUser()
    const loginLink = document.getElementById("loginLink")
    const registerLink = document.getElementById("registerLink")
    const dashboardLink = document.getElementById("dashboardLink")
    const adminLink = document.getElementById("adminLink")
    const logoutBtn = document.getElementById("logoutBtn")

    if (user) {
      if (loginLink) loginLink.style.display = "none"
      if (registerLink) registerLink.style.display = "none"

      if (user.role === "seller" && dashboardLink) {
        dashboardLink.style.display = "block"
      }

      if (user.role === "admin" && adminLink) {
        adminLink.style.display = "block"
      }

      if (logoutBtn) {
        logoutBtn.style.display = "block"
        logoutBtn.addEventListener("click", () => this.logout())
      }
    }
  },
}
