import { useState, useEffect } from 'react'
import showToast from '../utils/toast'

export default function AdminProfessionals() {
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem('servify_professionals')
        setList(raw ? JSON.parse(raw) : [])
      } catch { setList([]) }
    }
    load()
    window.addEventListener('servify:professionals:updated', load)
    return () => window.removeEventListener('servify:professionals:updated', load)
  }, [])

  const togglePremium = (id: string) => {
    try {
      const raw = localStorage.getItem('servify_professionals')
      if (!raw) return
      const arr = JSON.parse(raw)
      const idx = arr.findIndex((x:any) => x.id === id)
      if (idx >= 0) {
        arr[idx].premium = !arr[idx].premium
        localStorage.setItem('servify_professionals', JSON.stringify(arr))
        setList(arr)
        showToast('Estado actualizado', 'success')
      }
    } catch (e) { console.warn(e); showToast('Error actualizando', 'error') }
  }

  const remove = (id: string) => {
    try {
      const raw = localStorage.getItem('servify_professionals')
      if (!raw) return
      let arr = JSON.parse(raw)
      arr = arr.filter((x:any) => x.id !== id)
      localStorage.setItem('servify_professionals', JSON.stringify(arr))
      setList(arr)
      showToast('Perfil eliminado', 'info')
    } catch (e) { console.warn(e); showToast('Error eliminando', 'error') }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Administración de profesionales (mock)</h2>
        {list.length === 0 ? (
          <p className="text-sm text-gray-600">No hay profesionales locales registrados.</p>
        ) : (
          <div className="space-y-3">
            {list.map((p) => (
              <div key={p.id} className="flex items-center justify-between border rounded p-3">
                <div>
                  <p className="font-medium">{p.name} <span className="text-sm text-gray-500">({p.profession})</span></p>
                  <p className="text-sm text-gray-600">{p.hourlyRate} • {p.distance}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => togglePremium(p.id)} className={`px-3 py-1 rounded ${p.premium ? 'bg-yellow-400' : 'bg-gray-200'}`}>{p.premium ? 'Premium' : 'Marcar Premium'}</button>
                  <button onClick={() => remove(p.id)} className="px-3 py-1 bg-red-600 text-white rounded">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
