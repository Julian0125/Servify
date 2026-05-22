import { useState } from 'react'
import { api } from '../services/api'
import showToast from '../utils/toast'

async function demoLoginAsClient() {
  try {
    const res = await fetch('/data/demo-samples.json')
    if (!res.ok) throw new Error('No se encontró demo-samples.json')
    const j = await res.json()
    const token = `demo_token_${Math.random().toString(36).slice(2,9)}`
    const expires = Date.now() + 24 * 60 * 60 * 1000
    localStorage.setItem('servify_token', token)
    localStorage.setItem('servify_token_expires', String(expires))
    localStorage.setItem('servify_user', JSON.stringify({ id: j.client.id, name: j.client.name, email: j.client.email, role: 'client' }))
    // ensure professional exists for search/demo
    const arrRaw = localStorage.getItem('servify_professionals')
    const arr = arrRaw ? JSON.parse(arrRaw) : []
    if (j.professional && !arr.find((p:any) => p.id === j.professional.id)) {
      arr.push(j.professional)
      localStorage.setItem('servify_professionals', JSON.stringify(arr))
      window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
    }
    showToast('Sesión iniciada como cliente demo', 'success')
    window.location.hash = ''
    setTimeout(() => window.location.reload(), 300)
  } catch (e:any) {
    showToast(e.message || 'Error iniciando sesión demo', 'error')
  }
}

async function demoLoginAsProfessional() {
  try {
    const res = await fetch('/data/demo-samples.json')
    if (!res.ok) throw new Error('No se encontró demo-samples.json')
    const j = await res.json()
    const token = `demo_token_${Math.random().toString(36).slice(2,9)}`
    const expires = Date.now() + 24 * 60 * 60 * 1000
    const arrRaw = localStorage.getItem('servify_professionals')
    const arr = arrRaw ? JSON.parse(arrRaw) : []
    if (j.professional && !arr.find((p:any) => p.id === j.professional.id)) {
      arr.push(j.professional)
      localStorage.setItem('servify_professionals', JSON.stringify(arr))
      window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
    }
    localStorage.setItem('servify_token', token)
    localStorage.setItem('servify_token_expires', String(expires))
    localStorage.setItem('servify_user', JSON.stringify({ id: j.professional.id, name: j.professional.name, email: j.professional.email, role: 'professional' }))
    showToast('Sesión iniciada como profesional demo', 'success')
    window.location.hash = '#profile'
    setTimeout(() => window.location.reload(), 300)
  } catch (e:any) {
    showToast(e.message || 'Error iniciando sesión demo', 'error')
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    // client-side validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Introduce un email válido')
      setLoading(false)
      return
    }
    try {
      const res = await api.auth.login({ email, password })
      if (res?.token) {
        localStorage.setItem('servify_token', res.token)
        if ((res as any).expiresAt) localStorage.setItem('servify_token_expires', String((res as any).expiresAt))
        localStorage.setItem('servify_user', JSON.stringify(res.user || {}))
        // redirect to home
        showToast('Sesión iniciada correctamente', 'success')
        window.location.hash = ''
        setTimeout(()=> window.location.reload(), 500)
      } else {
        setError('Respuesta inválida del servidor')
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Servify"
            className="h-16 w-16 rounded-lg object-cover mb-3"
            onError={(e)=>{ const t = e.currentTarget as HTMLImageElement; if (!t.src.includes('/logo.svg')) t.src = '/logo.svg' }}
          />
          <h2 className="text-2xl font-bold mb-1">Iniciar sesión</h2>
          <p className="text-sm text-gray-600 mb-4 text-center">Accede a tu cuenta para gestionar reservas, ver profesionales y más.</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2" />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-blue-600">¿Olvidaste tu contraseña?</a>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md">{loading ? 'Entrando...' : 'Entrar'}</button>
          </div>
        </form>

        <div className="mt-4 border-t pt-4 space-y-2">
          <button onClick={demoLoginAsClient} className="w-full px-4 py-2 bg-gray-100 text-sm rounded-md">Entrar como cliente demo</button>
          <button onClick={demoLoginAsProfessional} className="w-full px-4 py-2 bg-gray-800 text-white text-sm rounded-md">Entrar como profesional demo</button>
        </div>
      </div>
    </div>
  )
}
