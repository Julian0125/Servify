import { useState } from 'react'
import { X } from 'lucide-react'
import { api } from '../../services/api'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess?: (token: string, user?: any) => void
}

export default function RegisterModal({ open, onClose, onSuccess }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'client' | 'professional'>('client')
  const [profession, setProfession] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [photo, setPhoto] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await api.auth.register({ name, email, password, role })
      if (res?.token) {
          localStorage.setItem('servify_token', res.token)
          if ((res as any).expiresAt) localStorage.setItem('servify_token_expires', String((res as any).expiresAt))
          localStorage.setItem('servify_user', JSON.stringify(res.user || {}))
          // If professional, save a lightweight profile to local mock DB so it appears in the frontend
          if (role === 'professional') {
            try {
              const storeRaw = localStorage.getItem('servify_professionals')
              const store = storeRaw ? JSON.parse(storeRaw) : []
              const prof = {
                id: `p_${Math.random().toString(36).slice(2,9)}`,
                name,
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
                categoryId: categoryId || 'otros',
                photo: photo || '/placeholder-profile.png',
                portfolio: [],
              }
              store.push(prof)
              localStorage.setItem('servify_professionals', JSON.stringify(store))
              // notify app to refresh
              window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
            } catch (e) {
              console.warn('Error saving local professional', e)
            }
          }
          onSuccess?.(res.token, res.user)
          onClose()
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Crear cuenta</h3>
          <button onClick={onClose} aria-label="Cerrar" className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} type="text" className="mt-1 w-full rounded-md border-gray-200 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 w-full rounded-md border-gray-200 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-md border-gray-200 shadow-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Soy</label>
            <div className="flex gap-2">
              <label className={`px-3 py-2 border rounded-md ${role === 'client' ? 'bg-gray-100' : ''}`}>
                <input className="hidden" type="radio" name="role" checked={role === 'client'} onChange={() => setRole('client')} /> Cliente
              </label>
              <label className={`px-3 py-2 border rounded-md ${role === 'professional' ? 'bg-gray-100' : ''}`}>
                <input className="hidden" type="radio" name="role" checked={role === 'professional'} onChange={() => setRole('professional')} /> Profesional
              </label>
            </div>
          </div>

          {role === 'professional' && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Profesión / Título</label>
                <input value={profession} onChange={(e) => setProfession(e.target.value)} type="text" className="mt-1 w-full rounded-md border-gray-200 shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Precio por hora / sesión</label>
                <input value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} type="text" className="mt-1 w-full rounded-md border-gray-200 shadow-sm" placeholder="$50.000/hora" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Categoría</label>
                <input value={categoryId} onChange={(e) => setCategoryId(e.target.value)} type="text" className="mt-1 w-full rounded-md border-gray-200 shadow-sm" placeholder="pintura, plomeria, fotografia" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL foto de perfil (opcional)</label>
                <input value={photo} onChange={(e) => setPhoto(e.target.value)} type="text" className="mt-1 w-full rounded-md border-gray-200 shadow-sm" placeholder="/images/myphoto.jpg" />
              </div>
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md">{loading ? 'Creando...' : 'Crear cuenta'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
