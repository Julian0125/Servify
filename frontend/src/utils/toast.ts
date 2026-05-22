export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) {
  const id = `servify_toast_${Date.now()}`
  const el = document.createElement('div')
  el.id = id
  el.className = `fixed right-4 top-4 z-50 max-w-sm rounded-md px-4 py-2 shadow-lg text-sm text-white ${
    type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600'
  }`
  el.textContent = message
  document.body.appendChild(el)
  setTimeout(() => {
    const e = document.getElementById(id)
    if (e) {
      e.style.transition = 'opacity 300ms'
      e.style.opacity = '0'
      setTimeout(() => e.remove(), 350)
    }
  }, duration)
}

export default showToast
