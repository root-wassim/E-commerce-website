// Modal Management System

let activeModal = null
let previousFocus = null

function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (!modal) return

  previousFocus = document.activeElement
  modal.style.display = "flex"
  activeModal = modal

  // Lock body scroll
  document.body.style.overflow = "hidden"

  // Focus first focusable element
  const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
  if (focusable.length > 0) {
    focusable[0].focus()
  }

  // Setup event listeners
  const overlay = modal.querySelector(".modal-overlay")
  const closeBtn = modal.querySelector(".modal-close")

  if (overlay) {
    overlay.addEventListener("click", () => closeModal(modalId))
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeModal(modalId))
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (!modal) return

  modal.style.display = "none"
  activeModal = null

  // Unlock body scroll
  document.body.style.overflow = ""

  // Restore focus
  if (previousFocus) {
    previousFocus.focus()
    previousFocus = null
  }
}

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && activeModal) {
    const modalId = activeModal.id
    closeModal(modalId)
  }
})

// Trap focus within modal
document.addEventListener("keydown", (e) => {
  if (!activeModal || e.key !== "Tab") return

  const focusable = activeModal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )
  const firstFocusable = focusable[0]
  const lastFocusable = focusable[focusable.length - 1]

  if (e.shiftKey) {
    if (document.activeElement === firstFocusable) {
      lastFocusable.focus()
      e.preventDefault()
    }
  } else {
    if (document.activeElement === lastFocusable) {
      firstFocusable.focus()
      e.preventDefault()
    }
  }
})

window.openModal = openModal
window.closeModal = closeModal
