// Admin Dashboard Functions
window.Admin = {
  // Get all orders
  getOrders() {
    // Return mock orders for demo
    return [
      {
        id: "ORD-125",
        customer: "John Doe",
        vendor: "TechGaming Store",
        products: "NVIDIA GeForce RTX 4090",
        total: 1599.99,
        date: "2025-12-30",
        status: "pending",
      },
      {
        id: "ORD-124",
        customer: "Jane Smith",
        vendor: "Gaming Pro Shop",
        products: "Logitech G Pro X Superlight",
        total: 149.99,
        date: "2025-12-30",
        status: "processing",
      },
      {
        id: "ORD-123",
        customer: "Mike Johnson",
        vendor: "Next-Gen Gaming",
        products: "AMD Ryzen 9 7950X",
        total: 549.99,
        date: "2025-12-29",
        status: "completed",
      },
    ]
  },

  // Get all users
  getUsers() {
    return [
      {
        id: 1,
        name: "Demo Buyer",
        email: "buyer@demo.com",
        role: "buyer",
        joined: "2025-01-15",
        status: "active",
      },
      {
        id: 2,
        name: "Demo Seller",
        email: "seller@demo.com",
        role: "seller",
        joined: "2025-01-10",
        status: "active",
      },
      {
        id: 3,
        name: "Demo Admin",
        email: "admin@demo.com",
        role: "admin",
        joined: "2025-01-01",
        status: "active",
      },
    ]
  },

  // Get statistics
  getStats() {
    const orders = this.getOrders()
    const users = this.getUsers()
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

    return {
      totalOrders: orders.length,
      totalRevenue: totalRevenue.toFixed(2),
      totalUsers: users.length,
      totalProducts: window.PRODUCTS ? window.PRODUCTS.length : 0,
      pendingOrders: orders.filter((o) => o.status === "pending").length,
    }
  },

  // Load products for admin panel
  loadProducts() {
    const tbody = document.getElementById("adminProductsList")
    if (!tbody || !window.PRODUCTS) return

    tbody.innerHTML = ""

    window.PRODUCTS.forEach((product) => {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${product.image}" alt="${product.name}" 
              style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">
            <div>
              <div style="font-weight: 600;">${product.name}</div>
              <div style="font-size: 0.875rem; color: var(--color-text-tertiary);">${product.category}</div>
            </div>
          </div>
        </td>
        <td>${product.vendor || "N/A"}</td>
        <td>${product.category}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>
          <span class="badge ${product.stock > 10 ? "badge-success" : "badge-warning"}">
            ${product.stock} units
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-secondary" onclick="Admin.editProduct(${product.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="Admin.deleteProduct(${product.id})">Delete</button>
        </td>
      `
      tbody.appendChild(row)
    })

    // Update total products count
    const totalProductsEl = document.getElementById("totalProducts")
    if (totalProductsEl) {
      totalProductsEl.textContent = window.PRODUCTS.length
    }
  },

  // Edit product
  editProduct(productId) {
    console.log("[v0] Edit product:", productId)
    window.Toasts.show("Edit functionality coming soon", "info")
  },

  // Delete product
  deleteProduct(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("[v0] Delete product:", productId)
      window.Toasts.show("Product deleted successfully", "success")
      // In a real app, remove from array and reload
      this.loadProducts()
    }
  },
}
