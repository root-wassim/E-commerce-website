// Toast Notifications
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container")
  if (!container) return

  const toast = document.createElement("div")
  toast.className = `toast ${type}`
  toast.textContent = message

  container.appendChild(toast)

  setTimeout(() => {
    toast.style.animation = "fadeOut 0.3s ease"
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}
