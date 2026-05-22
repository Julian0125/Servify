import { useState, useEffect } from 'react'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem('servify_user')
      if (raw) {
        const u = JSON.parse(raw)
        setUser(u)
        setForm({ name: u.name || '', email: u.email || '', plan: u.plan || '' })
      }
    } catch {}
  }, [])

  const save = () => {
    try {
      const raw = localStorage.getItem('servify_user')
      if (!raw) return
      const u = JSON.parse(raw)
      u.name = form.name
      u.email = form.email
      u.plan = form.plan
      localStorage.setItem('servify_user', JSON.stringify(u))
      setUser(u)
      setEditing(false)
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Mi perfil</h2>
          <div>
            <button onClick={() => setEditing(!editing)} className="px-3 py-2 border rounded-md mr-2">{editing ? 'Cancelar' : 'Editar perfil'}</button>
            <a href="#" onClick={() => { localStorage.removeItem('servify_token'); localStorage.removeItem('servify_user'); window.location.hash=''; window.location.reload() }} className="px-3 py-2 bg-red-600 text-white rounded-md">Cerrar sesión</a>
          </div>
        </div>

        {user ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <div className="h-40 w-40 bg-gray-100 rounded-lg flex items-center justify-center text-3xl font-bold">{(user.name||'U').slice(0,2)}</div>
            </div>
            <div className="col-span-2">
              {!editing ? (
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="mt-2 text-sm">Plan: <strong>{user.plan || 'Gratuito'}</strong></p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Plan</label>
                    <input value={form.plan} onChange={(e)=>setForm({...form, plan: e.target.value})} className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2" />
                  </div>
                  <div className="flex justify-end">
                    <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded-md">Guardar</button>
                  </div>
                </div>
              )}

              {/* If this user is a professional, show editable professional profile from localStorage */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Perfil profesional</h3>
                <ProfessionalEditor userEmail={user.email} />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600 mt-6">No hay usuario autenticado. Por favor inicia sesión o regístrate.</p>
        )}
      </div>
    </div>
  )
}

function ProfessionalEditor({ userEmail }: { userEmail: string }) {
  const [prof, setProf] = useState<any>(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem('servify_professionals')
      if (!raw) return
      const arr = JSON.parse(raw)
      let p = arr.find((x:any) => x.email === userEmail)
      if (!p && userEmail) {
        // try to match by name as a fallback for older entries
        p = arr.find((x:any) => x.name && x.name.toLowerCase() === (userEmail.split('@')[0] || '').toLowerCase())
      }
      if (!p && arr.length === 1) p = arr[0]
      if (p) {
        // if found and missing email, attach it to allow consistent lookup
        if (!p.email && userEmail) {
          const idx = arr.findIndex((x:any) => x.id === p.id)
          if (idx >= 0) {
            arr[idx] = {...arr[idx], email: userEmail}
            localStorage.setItem('servify_professionals', JSON.stringify(arr))
            window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
            p = arr[idx]
          }
        }
        setProf(p)
        setForm({...p})
      }
    } catch {}
  }, [userEmail])

  const save = () => {
    try {
      const raw = localStorage.getItem('servify_professionals')
      if (!raw) return
      const arr = JSON.parse(raw)
      const idx = arr.findIndex((x:any) => x.id === prof.id)
      if (idx >= 0) {
        arr[idx] = {...arr[idx], ...form}
        localStorage.setItem('servify_professionals', JSON.stringify(arr))
        window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
        setProf(arr[idx])
        setEditing(false)
      }
    } catch (e) { console.warn(e) }
  }

  if (!prof) return <p className="text-sm text-gray-600">No se encontró perfil profesional asociado.</p>

  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-md">
      {!editing ? (
        <div>
          <p className="font-medium">{prof.name}</p>
          <p className="text-sm text-gray-600">{prof.profession}</p>
          <p className="text-sm mt-2">{prof.hourlyRate}</p>
          <div className="mt-3">
            <button onClick={()=>setEditing(true)} className="px-3 py-2 border rounded-md">Editar perfil profesional</button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Profesión</label>
            <input value={form.profession} onChange={(e)=>setForm({...form, profession: e.target.value})} className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Precio por hora</label>
            <input value={form.hourlyRate} onChange={(e)=>setForm({...form, hourlyRate: e.target.value})} className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2" />
          </div>
          <div className="flex justify-end">
            <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded-md">Guardar</button>
          </div>
        </div>
      )}
    </div>
  )
}
