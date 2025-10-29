// Tiny toast utility: creates a singleton toast element in document.body
let toastEl;
let hideTimer;

function ensureToast() {
  if (typeof document === 'undefined') return null;
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'dmi-toast';
    toastEl.setAttribute('role', 'status');
    toastEl.setAttribute('aria-live', 'polite');
  }
  // Always ensure it sits inside the footer when available
  const footer = document.querySelector('.form-footer');
  if (footer && toastEl.parentElement !== footer) {
    footer.appendChild(toastEl);
  } else if (!footer && toastEl.parentElement !== document.body) {
    document.body.appendChild(toastEl);
  }
  return toastEl;
}

export function showToast(message, opts = {}) {
  const el = ensureToast();
  if (!el) return;
  window.clearTimeout(hideTimer);
  el.textContent = String(message || '');
  el.classList.add('visible');
  const { duration = 1200 } = opts;
  hideTimer = window.setTimeout(() => hideToast(), duration);
}

export function hideToast() {
  if (!toastEl) return;
  toastEl.classList.remove('visible');
}


