import { useState } from 'react'
import { X } from 'lucide-react'
import { api } from '../../services/api'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess?: (token: string, user?: any) => void
}

export default function LoginModal({ open, onClose, onSuccess }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await api.auth.login({ email, password })
      if (res?.token) {
        localStorage.setItem('servify_token', res.token)
        if ((res as any).expiresAt) localStorage.setItem('servify_token_expires', String((res as any).expiresAt))
        localStorage.setItem('servify_user', JSON.stringify(res.user || {}))
        onSuccess?.(res.token, res.user)
        onClose()
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Iniciar sesión</h3>
          <button onClick={onClose} aria-label="Cerrar" className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 w-full rounded-md border-gray-200 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-md border-gray-200 shadow-sm" />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md">{loading ? 'Entrando...' : 'Entrar'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
