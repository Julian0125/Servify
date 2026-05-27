// Helper to load demo client + professional into localStorage for quick testing
export default function loadDemoData() {
  try {
    // fetch the public JSON bundled in the app
    fetch('/data/demo-samples.json')
      .then((res) => res.json())
      .then((json) => {
        if (json.client) {
          const token = `demo_token_${Math.random().toString(36).slice(2,9)}`
          const expires = Date.now() + 1000 * 60 * 60 * 24 // 24h
          localStorage.setItem('servify_token', token)
          localStorage.setItem('servify_token_expires', String(expires))
          localStorage.setItem('servify_user', JSON.stringify({ id: json.client.id, name: json.client.name, email: json.client.email, role: 'client' }))
        }
        if (json.professionals && Array.isArray(json.professionals)) {
          const raw = localStorage.getItem('servify_professionals')
          const arr = raw ? JSON.parse(raw) : []
          json.professionals.forEach((p:any) => {
            if (!arr.find((x:any) => x.id === p.id)) arr.push(p)
          })
          localStorage.setItem('servify_professionals', JSON.stringify(arr))
        } else if (json.professional) {
          // legacy single professional key
          const raw = localStorage.getItem('servify_professionals')
          const arr = raw ? JSON.parse(raw) : []
          if (!arr.find((p:any) => p.id === json.professional.id)) {
            arr.push(json.professional)
            localStorage.setItem('servify_professionals', JSON.stringify(arr))
          }
        }
        // dispatch update so the app picks it up
        window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
        console.info('Demo data loaded into localStorage')
      })
      .catch((err) => console.warn('Error loading demo JSON', err))
  } catch (e) {
    console.warn('Could not load demo data', e)
  }
}

// Also export a quick remover to clean up demo data
export function clearDemoData() {
  try {
    const raw = localStorage.getItem('servify_professionals')
    if (raw) {
      const arr = JSON.parse(raw).filter((p:any) => p.id !== 'p_demo_1' && p.id !== 'p_demo_2')
      localStorage.setItem('servify_professionals', JSON.stringify(arr))
    }
    const userRaw = localStorage.getItem('servify_user')
    if (userRaw) {
      const u = JSON.parse(userRaw)
      if (u && (u.email === 'ana.torres@example.com' || u.email === 'carlos.mendez@example.com' || u.email === 'andres.paredes@example.com')) {
        localStorage.removeItem('servify_user')
        localStorage.removeItem('servify_token')
        localStorage.removeItem('servify_token_expires')
      }
    }
    window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
    console.info('Demo data cleared')
  } catch (e) { console.warn(e) }
}
