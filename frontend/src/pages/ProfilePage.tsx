import { useState, useEffect } from 'react'
import showToast from '../utils/toast'

// helper: convert File to data URL
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

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
        setForm({ name: u.name || '', email: u.email || '', plan: u.plan || '', photo: u.photo || '' })
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
      if (form.photo) u.photo = form.photo
      else if (form.photo === '') delete u.photo
      localStorage.setItem('servify_user', JSON.stringify(u))
      setUser(u)
      setEditing(false)
      showToast('Perfil guardado', 'success')
    } catch (e) {
      console.warn(e)
      showToast('Error al guardar', 'error')
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-background p-6">
      <div className="w-full max-w-3xl bg-card rounded-lg shadow p-6">
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
              <div className="h-40 w-40 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                {user.photo ? (
                  <img src={user.photo} alt={user.name} className="h-full w-full object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/placeholder.png'}} />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-3xl font-bold">{(user.name||'U').slice(0,2)}</div>
                )}
              </div>
            </div>

            <div className="col-span-2">
              {!editing ? (
                <div>
                  <p className="text-lg font-semibold text-foreground">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="mt-2 text-sm">Plan: <strong>{user.plan || 'Gratuito'}</strong></p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground">Foto de perfil</label>
                    <div className="flex items-center space-x-3">
                      <div className="h-20 w-20 bg-muted rounded-md overflow-hidden">
                        {form.photo ? <img src={form.photo} alt="preview" className="h-full w-full object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/placeholder.png'}} /> : <div className="h-full w-full flex items-center justify-center">{(form.name||'U').slice(0,2)}</div>}
                      </div>
                      <div>
                        <input type="file" accept="image/*" onChange={async (e)=>{
                          const f = e.currentTarget.files && e.currentTarget.files[0]
                          if (!f) return
                          try {
                            const data = await fileToDataUrl(f)
                            setForm({...form, photo: data})
                          } catch (err) { console.warn(err) }
                          e.currentTarget.value = ''
                        }} />
                        {form.photo && <button className="mt-2 text-sm text-red-600" onClick={()=>setForm({...form, photo: ''})}>Eliminar foto</button>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground">Nombre</label>
                    <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="mt-1 w-full rounded-md border border-border shadow-sm p-2 bg-input text-foreground" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground">Email</label>
                    <input value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} className="mt-1 w-full rounded-md border border-border shadow-sm p-2 bg-input text-foreground" />
                  </div>

                  <div className="flex justify-end">
                    <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-md">Guardar</button>
                  </div>
                </div>
              )}

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

  useEffect(() => {
    try {
      const raw = localStorage.getItem('servify_professionals')
      if (!raw) return
      const arr = JSON.parse(raw)
      let p = arr.find((x:any) => x.email === userEmail)
      if (!p && userEmail) p = arr.find((x:any) => x.name && x.name.toLowerCase() === (userEmail.split('@')[0] || '').toLowerCase())
      if (!p && arr.length === 1) p = arr[0]
      if (p) setProf(p)
    } catch (e) { console.warn(e) }
  }, [userEmail])

  if (!prof) return <p className="text-sm text-muted-foreground">No se encontró perfil profesional asociado.</p>

  return (
    <div className="mt-4 bg-card p-4 rounded-md">
      <div className="flex items-center space-x-3">
        <div className="h-14 w-14 rounded-md overflow-hidden bg-muted">
          {prof.photo ? <img src={prof.photo} alt={prof.name} className="h-full w-full object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/placeholder.png'}} /> : <div className="h-full w-full flex items-center justify-center">{(prof.name||'P').slice(0,2)}</div>}
        </div>
        <div>
          <p className="font-medium text-foreground">{prof.name}</p>
          <p className="text-sm text-muted-foreground">{prof.profession}</p>
          <p className="text-sm mt-2">{prof.hourlyRate}</p>
        </div>
      </div>
      <div className="mt-3">
        <button onClick={()=>window.alert('Editor simplificado. Restaurar edición completa más tarde.')} className="px-3 py-2 border rounded-md">Editar perfil profesional</button>
      </div>
    </div>
  )
}
