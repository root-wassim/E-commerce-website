// Toast Notification System

const toastIcons = {
  success: "✓",
  error: "✕",
  info: "ℹ",
  warning: "⚠",
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function showToast(message, type = "info", duration = 3000) {
  const container = document.getElementById("toastContainer")
  if (!container) return

  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`

  toast.innerHTML = `
    <div class="toast-icon">${toastIcons[type]}</div>
    <div class="toast-content">
      <div class="toast-message">${escapeHtml(message)}</div>
    </div>
    <button class="toast-close" aria-label="Close">&times;</button>
  `

  const closeBtn = toast.querySelector(".toast-close")
  closeBtn.addEventListener("click", () => removeToast(toast))

  container.appendChild(toast)

  // Auto remove after duration
  if (duration > 0) {
    setTimeout(() => removeToast(toast), duration)
  }

  return toast
}

function removeToast(toast) {
  toast.style.animation = "toastSlideIn 0.3s reverse"
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast)
    }
  }, 300)
}

window.showToast = showToast
window.removeToast = removeToast
