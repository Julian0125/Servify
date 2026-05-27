import { useState } from 'react'
import { api } from '../services/api'
import { Wrench, Zap, Paintbrush, GraduationCap, Home, Camera, Code, Scissors, Crown, MessageSquare, Users, Briefcase, Heart, Calculator, Leaf, Video, Coffee, Smile, Ruler, Plus, TrendingUp, Globe } from 'lucide-react'
// removed unused import
import showToast from '../utils/toast'
import type { Category } from '../types'

interface RegisterPageProps {
  categories?: Category[]
}

// helper: convert File to data URL
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function RegisterPage({ categories }: RegisterPageProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'client' | 'professional'>('client')
  const [profession, setProfession] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [photo, setPhoto] = useState('')
  const [location, setLocation] = useState('')
  const [phone, setPhone] = useState('')
  const [description, setDescription] = useState('')
  const [portfolio, setPortfolio] = useState<string[]>([])
  const [categoryId, setCategoryId] = useState('otros')
  const [step, setStep] = useState(1) // 1: personal, 2: plan, 3: professional details
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setError(null)
    // Step 1: validate personal info
    if (step === 1) {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        setError('Introduce un email válido')
        return
      }
      if (password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres')
        return
      }
      // advance to plan selection for professionals, or register client now
      if (role === 'professional') {
        setStep(2)
        return
      }
      // client: register now
      setLoading(true)
      try {
        const res = await api.auth.register({ name, email, password, role })
        if (res?.token) {
          localStorage.setItem('servify_token', res.token)
          if ((res as any).expiresAt) localStorage.setItem('servify_token_expires', String((res as any).expiresAt))
          localStorage.setItem('servify_user', JSON.stringify(res.user || {}))
          window.dispatchEvent(new CustomEvent('servify:auth:updated'))
          showToast('Cuenta creada correctamente', 'success')
          window.location.hash = '#profile'
          return
        }
        setError('Respuesta inválida del servidor')
      } catch (err:any) {
        setError(err.message || 'Error al registrarse')
      } finally { setLoading(false) }
      return
    }

    // Step 2: plan selection / simulate purchase
    if (step === 2) {
      if (!selectedPlan) {
        setError('Selecciona un plan para continuar')
        return
      }
      setLoading(true)
      try {
        const res = await api.auth.register({ name, email, password, role })
        if (res?.token) {
          localStorage.setItem('servify_token', res.token)
          if ((res as any).expiresAt) localStorage.setItem('servify_token_expires', String((res as any).expiresAt))
          const userObj = {...(res.user || {}), plan: selectedPlan}
          // Ensure name is saved if user provided it in the form
          if (name) userObj.name = name
          localStorage.setItem('servify_user', JSON.stringify(userObj))
          window.dispatchEvent(new CustomEvent('servify:auth:updated'))
          showToast('Plan seleccionado y cuenta creada. Completa tu perfil profesional.', 'success')
          setStep(3)
          return
        }
        setError('Respuesta inválida del servidor')
      } catch (err:any) {
        setError(err.message || 'Error al procesar compra')
      } finally { setLoading(false) }
      return
    }

    // Step 3: finalize professional profile
    if (step === 3) {
      setLoading(true)
      try {
        const prof = {
          id: `p_${Math.random().toString(36).slice(2,9)}`,
          name,
          email,
          phone: phone || '',
          profession: profession || 'Profesional',
          avatar: name.split(' ').map(s=>s[0]).slice(0,2).join(''),
          rating: 5,
          reviews: 0,
          distance: '0 km',
          verified: true,
          premium: (selectedPlan === 'premium'),
          responseTime: 'Responde en 1 hora',
          hourlyRate: hourlyRate || '$0/hora',
          description: description || '',
          skills: [],
          categoryId: categoryId || 'otros',
          photo: photo || '/placeholder-profile.png',
          portfolio: portfolio || [],
          location: location || ''
        }
        // Try to save via API (backend). If backend unavailable, api.create will fallback to localStorage.
        await api.professionals.create(prof)
        // notify app to refresh professional list
        window.dispatchEvent(new CustomEvent('servify:professionals:updated'))

        // Ensure user is logged in: if no token exists, register/login via fallback
        try {
          const existingToken = localStorage.getItem('servify_token')
          if (!existingToken) {
            const authRes = await api.auth.register({ name, email, password, role })
            if (authRes?.token) {
              localStorage.setItem('servify_token', authRes.token)
              if ((authRes as any).expiresAt) localStorage.setItem('servify_token_expires', String((authRes as any).expiresAt))
              const userObj = { ...(authRes.user || {}), role }
              localStorage.setItem('servify_user', JSON.stringify(userObj))
              window.dispatchEvent(new CustomEvent('servify:auth:updated'))
            }
          }
        } catch (e) {
          console.warn('Could not auto-login after register:', e)
        }

        // Ensure servify_user contains photo and name if professional created provided them
        try {
          const rawUser = localStorage.getItem('servify_user')
          if (rawUser) {
            const u = JSON.parse(rawUser)
            if (prof.photo && u) u.photo = prof.photo
            if (prof.name && u) u.name = prof.name
            localStorage.setItem('servify_user', JSON.stringify(u))
          }
        } catch (e) { /* ignore */ }

        showToast('Perfil profesional creado correctamente', 'success')
        // go to home so user sees the site as logged in
        window.location.hash = ''
        return
      } catch (err:any) {
        setError(err.message || 'Error guardando perfil profesional')
      } finally { setLoading(false) }
    }
  }

  // On mount, check if user was redirected from a plan CTA
  useState(() => {
    try {
      const raw = localStorage.getItem('servify_register_pref')
      if (raw) {
        const pref = JSON.parse(raw)
        if (pref?.role === 'professional') setRole('professional')
        if (pref?.plan) setSelectedPlan(String(pref.plan))
        // leave step at 1 so user fills personal info first; remove pref
        localStorage.removeItem('servify_register_pref')
      }
    } catch (e) { /* ignore */ }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Crea tu cuenta</h2>
          <p className="text-sm text-muted-foreground mb-4">Regístrate como cliente o profesional. El registro profesional tiene varios pasos: datos, plan y perfil.</p>
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        {step === 1 && (
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-muted-foreground">Nombre completo</label>
                <input required value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full rounded-md border border-border shadow-sm p-2 bg-input text-foreground" />
            </div>
            <div>
                <label className="block text-sm font-medium text-muted-foreground">Email</label>
                <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-border shadow-sm p-2 bg-input text-foreground" />
            </div>
            <div>
                <label className="block text-sm font-medium text-muted-foreground">Contraseña</label>
                <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-border shadow-sm p-2 bg-input text-foreground" />
            </div>
            <div>
                <label className="block text-sm font-medium text-muted-foreground">Soy</label>
                <select value={role} onChange={(e)=>setRole(e.target.value as any)} className="mt-1 w-full rounded-md border border-border shadow-sm p-2 bg-input text-foreground">
                <option value="client">Cliente</option>
                <option value="professional">Profesional</option>
              </select>
            </div>
            <div className="md:col-span-2 flex items-center justify-between mt-2">
                <a href="#login" className="text-sm text-muted-foreground">Ya tienes cuenta? Inicia sesión</a>
              <div className="flex gap-2">
                 <button type="button" onClick={() => { setStep(1); }} className="px-4 py-2 border border-border rounded-md">Volver</button>
                 <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded-md">Siguiente</button>
              </div>
            </div>
          </form>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Elige un plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border ${selectedPlan === 'basico' ? 'border-blue-600' : ''}`}>
                  <div className="font-medium text-foreground">Plan Basico</div>
                  <div className="text-sm text-muted-foreground">Perfil verificado, hasta 5 fotos</div>
                <div className="mt-2">
                  <button onClick={() => setSelectedPlan('basico')} className={`px-3 py-2 rounded ${selectedPlan==='basico' ? 'bg-blue-600 text-white' : 'border'}`}>Seleccionar</button>
                </div>
              </div>
              <div className={`p-4 rounded-lg border ${selectedPlan === 'premium' ? 'border-blue-600' : ''}`}>
                  <div className="font-medium text-foreground">Plan Premium</div>
                  <div className="text-sm text-muted-foreground">Hasta 20 fotos, posicionamiento destacado</div>
                <div className="mt-2">
                  <button onClick={() => setSelectedPlan('premium')} className={`px-3 py-2 rounded ${selectedPlan==='premium' ? 'bg-blue-600 text-white' : 'border'}`}>Seleccionar</button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setStep(1)} className="px-4 py-2 border rounded-md">Volver</button>
                <button onClick={() => submit()} className="px-4 py-2 bg-primary text-white rounded-md">Pagar y crear cuenta</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-muted-foreground">Categoría (elige para usar su icono)</label>
                <div className="mt-1 flex items-center gap-3">
                  <select value={categoryId} onChange={(e)=>{ setCategoryId(e.target.value); const c = (categories||[]).find(x=>x.id===e.target.value); if (c && !profession) setProfession(c.name) }} className="flex-1 rounded-md border border-border shadow-sm p-2 bg-input text-foreground">
                    <option value="otros">-- Seleccionar categoría --</option>
                    {(categories||[]).map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  {/* icon preview */}
                  {(() => {
                    const sel = (categories || []).find(c => c.id === categoryId)
                    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Wrench, Zap, Paintbrush, GraduationCap, Home, Camera, Code, Scissors, Crown, MessageSquare, Users, Briefcase, Heart, Calculator, Leaf, Video, Coffee, Smile, Ruler, Plus, TrendingUp, Globe }
                    if (!sel) return null
                    const Icon = iconMap[sel.icon] || Wrench
                    return (
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center ${sel.color || 'bg-gray-200'}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    )
                  })()}
                </div>
                <input placeholder="Si prefieres, especifica una profesión" value={profession} onChange={(e)=>setProfession(e.target.value)} className="mt-2 w-full rounded-md border border-border shadow-sm p-2 bg-input text-foreground" />
            </div>
            <div>
                <label className="block text-sm font-medium text-muted-foreground">Precio por hora</label>
                <input value={hourlyRate} onChange={(e)=>setHourlyRate(e.target.value)} placeholder="$50.000/hora" className="mt-1 w-full rounded-md border border-border shadow-sm p-2 bg-input text-foreground" />
            </div>
            <div>
                <label className="block text-sm font-medium text-muted-foreground">Ubicación</label>
                <input value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Ciudad, Barrio" className="mt-1 w-full rounded-md border border-border shadow-sm p-2 bg-input text-foreground" />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground">Teléfono (ej: +573001234567)</label>
              <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+573001234567" className="mt-1 w-full rounded-md border border-border shadow-sm p-2 bg-input text-foreground" />
            </div>

            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground">Descripción</label>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="mt-1 w-full rounded-md border border-border shadow-sm p-2 bg-input text-foreground" />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground">Foto de perfil (URL o subir)</label>
              <input value={photo} onChange={(e)=>setPhoto(e.target.value)} className="mt-1 w-full rounded-md border border-border shadow-sm p-2 bg-input text-foreground" placeholder="/images/me.jpg" />
              <input type="file" accept="image/*" className="mt-2" onChange={async (e)=>{
                const f = e.target.files && e.target.files[0]
                if (f) {
                  const data = await fileToDataUrl(f)
                  setPhoto(data)
                }
              }} />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Portafolio (subir imágenes)</label>
              <input type="file" accept="image/*" multiple className="mt-1" onChange={async (e)=>{
                const files = e.target.files
                if (files && files.length) {
                  const urls: string[] = []
                  for (let i=0;i<files.length;i++) {
                    // eslint-disable-next-line no-await-in-loop
                    const d = await fileToDataUrl(files[i])
                    urls.push(d)
                  }
                  setPortfolio(prev => [...prev, ...urls])
                }
              }} />
              <div className="mt-2 flex gap-2 overflow-x-auto">
                {portfolio.map((p,i)=> (
                  <img key={i} src={p} className="h-16 w-16 object-cover rounded" alt={`portfolio-${i}`} />
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
              <button type="button" onClick={() => setStep(2)} className="px-4 py-2 border rounded-md">Volver</button>
              <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md">Finalizar registro</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
