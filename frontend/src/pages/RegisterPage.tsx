import { useState } from 'react'
import { api } from '../services/api'
// removed unused import
import showToast from '../utils/toast'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'client' | 'professional'>('client')
  const [profession, setProfession] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [photo, setPhoto] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    // basic validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Introduce un email válido')
      setLoading(false)
      return
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      setLoading(false)
      return
    }
    try {
      const res = await api.auth.register({ name, email, password, role })
      if (res?.token) {
        localStorage.setItem('servify_token', res.token)
        if ((res as any).expiresAt) localStorage.setItem('servify_token_expires', String((res as any).expiresAt))
        localStorage.setItem('servify_user', JSON.stringify(res.user || {}))
        // save professional profile if needed
        if (role === 'professional') {
          const storeRaw = localStorage.getItem('servify_professionals')
          const store = storeRaw ? JSON.parse(storeRaw) : []
          const prof = {
            id: `p_${Math.random().toString(36).slice(2,9)}`,
            name,
            email,
            profession: profession || 'Profesional',
            avatar: name.split(' ').map(s=>s[0]).slice(0,2).join(''),
            rating: 5,
            reviews: 0,
            distance: '0 km',
            verified: true,
            premium: false,
            responseTime: 'Responde en 1 hora',
            hourlyRate: hourlyRate || '$0/hora',
            description: '',
            skills: [],
            categoryId: 'otros',
            photo: photo || '/placeholder-profile.png',
            portfolio: [],
          }
          store.push(prof)
          localStorage.setItem('servify_professionals', JSON.stringify(store))
          // notify app that professionals list changed
          window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
          // go to select plan page
          showToast('Cuenta creada. Completa tu plan para destacar tu perfil', 'success')
          window.location.hash = '#select-plan'
        } else {
          showToast('Cuenta creada correctamente', 'success')
          window.location.hash = '#profile'
        }
        // avoid full reload; App listens for hashchange and custom events
      } else {
        setError('Respuesta inválida del servidor')
      }
    } catch (err: any) {
      setError(err.message || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Crea tu cuenta</h2>
        <p className="text-sm text-gray-600 mb-4">Regístrate como cliente o profesional. Si eres profesional, podrás elegir un plan para destacar tu perfil.</p>
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input required value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Soy</label>
            <select value={role} onChange={(e)=>setRole(e.target.value as any)} className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2">
              <option value="client">Cliente</option>
              <option value="professional">Profesional</option>
            </select>
          </div>

          {role === 'professional' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Profesión</label>
                <input value={profession} onChange={(e)=>setProfession(e.target.value)} className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Precio por hora</label>
                <input value={hourlyRate} onChange={(e)=>setHourlyRate(e.target.value)} placeholder="$50.000/hora" className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Foto de perfil (URL)</label>
                <input value={photo} onChange={(e)=>setPhoto(e.target.value)} className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2" placeholder="/images/me.jpg" />
              </div>
            </>
          )}

          <div className="md:col-span-2 flex items-center justify-end gap-2 mt-2">
            <a href="#login" className="text-sm text-gray-600">Ya tienes cuenta? Inicia sesión</a>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md">{loading ? 'Creando...' : 'Crear cuenta'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
