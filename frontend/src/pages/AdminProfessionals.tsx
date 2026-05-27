import { useState, useEffect } from 'react'
import showToast from '../utils/toast'

const DEFAULT_PROFESSIONALS = [
  {
    id: 'pro-001',
    name: 'Carlos Méndez',
    profession: 'Plomero',
    rating: 4.8,
    reviews: 124,
    location: 'Centro',
    distance: '1.2 km',
    pricePerHour: 25000,
    bio: 'Plomero con 10 años de experiencia en reparaciones domésticas y proyectos comerciales.',
    skills: ['instalación de tuberías', 'reparaciones', 'mantenimiento'],
    photo: 'https://images.pexels.com/photos/32391495/pexels-photo-32391495.jpeg',
    premium: true,
    portfolio: []
  },
  {
    id: 'pro-002',
    name: 'María Rodríguez',
    profession: 'Electricista',
    rating: 4.7,
    reviews: 98,
    location: 'Chapinero',
    distance: '2.5 km',
    pricePerHour: 30000,
    bio: 'Especialista en instalaciones eléctricas residenciales y mantenimiento industrial ligero.',
    skills: ['instalaciones eléctricas', 'mantenimiento', 'paneles eléctricos'],
    photo: 'https://i.pravatar.cc/400?u=pro-002',
    premium: false,
    portfolio: []
  },
  {
    id: 'pro-003',
    name: 'Andrés López',
    profession: 'Carpintero',
    rating: 4.6,
    reviews: 67,
    location: 'Usaquén',
    distance: '8.1 km',
    pricePerHour: 28000,
    bio: 'Carpintero artesanal y montaje de muebles a medida.',
    skills: ['muebles a medida', 'acabados', 'montaje'],
    photo: 'https://i.pravatar.cc/400?u=pro-003',
    premium: false,
    portfolio: []
  },
  {
    id: 'pro-004',
    name: 'Laura Gómez',
    profession: 'Diseñadora gráfica',
    rating: 4.9,
    reviews: 210,
    location: 'Norte',
    distance: '5.0 km',
    pricePerHour: 45000,
    bio: 'Diseño de identidad visual, materiales comerciales y UX básico.',
    skills: ['identidad visual', 'branding', 'UX'],
    photo: 'https://i.pravatar.cc/400?u=pro-004',
    premium: true,
    portfolio: []
  },
  {
    id: 'pro-005',
    name: 'Juan Pérez',
    profession: 'Desarrollador web',
    rating: 4.8,
    reviews: 156,
    location: 'Suba',
    distance: '9.0 km',
    pricePerHour: 60000,
    bio: 'Desarrollador full-stack (React, Node.js) orientado a MVPs rápidos.',
    skills: ['React', 'Node.js', 'APIs'],
    photo: 'https://i.pravatar.cc/400?u=pro-005',
    premium: false,
    portfolio: []
  }
]

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

  const resetToFirstFive = async () => {
    try {
      const res = await fetch('/data/professionals.json')
      if (!res.ok) throw new Error('No se pudo cargar datos de muestra')
      const text = await res.text()
      let all: any[] = []
      try {
        all = JSON.parse(text)
      } catch (err) {
        console.warn('professionals.json parse failed, attempting salvage', err)
        const first = text.indexOf('[')
        const last = text.lastIndexOf(']')
        if (first !== -1 && last !== -1 && last > first) {
          try {
            all = JSON.parse(text.slice(first, last + 1))
          } catch (err2) {
            console.warn('salvage parse failed, falling back to DEFAULT_PROFESSIONALS', err2)
            all = DEFAULT_PROFESSIONALS
          }
        } else {
          all = DEFAULT_PROFESSIONALS
        }
      }
      if (!Array.isArray(all)) all = DEFAULT_PROFESSIONALS
      const first5 = all.slice(0, 5).map((p: any) => ({
        id: p.id || `p_${Math.random().toString(36).slice(2,9)}`,
        name: p.name,
        profession: p.profession || p.bio || 'Profesional',
        avatar: (p.name || '').split(' ').map((s:string)=>s[0]).slice(0,2).join(''),
        rating: p.rating || 5,
        reviews: p.reviews || 0,
        distance: p.distance || '0 km',
        verified: p.verified ?? true,
        premium: p.premium ?? false,
        responseTime: p.responseTime || 'Responde en 1 hora',
        hourlyRate: p.pricePerHour ? `$${p.pricePerHour}` : (p.hourlyRate || '$0/hora'),
        description: p.bio || p.description || '',
        skills: p.skills || [],
        categoryId: p.categoryId || 'otros',
        photo: p.photo || '/placeholder-profile.png',
        portfolio: p.portfolio || [],
        location: p.location || ''
      }))
      localStorage.setItem('servify_professionals', JSON.stringify(first5))
      setList(first5)
      window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
      showToast('Restablecido a los primeros 5 profesionales', 'success')
    } catch (e:any) { console.warn(e); showToast(e.message || 'Error restableciendo', 'error') }
  }

  const clearAll = () => {
    try {
      localStorage.setItem('servify_professionals', JSON.stringify([]))
      setList([])
      window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
      showToast('Todos los profesionales locales han sido eliminados', 'info')
    } catch (e:any) { console.warn(e); showToast('Error limpiando', 'error') }
  }

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
        window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
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
      window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
      showToast('Perfil eliminado', 'info')
    } catch (e) { console.warn(e); showToast('Error eliminando', 'error') }
  }

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-5xl mx-auto bg-card p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Administración de profesionales (mock)</h2>
          <div className="flex gap-2 mb-4">
            <button onClick={resetToFirstFive} className="px-3 py-2 bg-blue-600 text-white rounded">Restablecer a primeros 5</button>
            <button onClick={clearAll} className="px-3 py-2 bg-red-600 text-white rounded">Borrar todos</button>
          </div>
        {list.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay profesionales locales registrados.</p>
        ) : (
          <div className="space-y-3">
            {list.map((p) => (
              <div key={p.id} className="flex items-center justify-between border border-border rounded p-3 bg-card">
                <div>
                  <p className="font-medium">{p.name} <span className="text-sm text-muted-foreground">({p.profession})</span></p>
                  <p className="text-sm text-muted-foreground">{p.hourlyRate} • {p.distance}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => togglePremium(p.id)} className={`px-3 py-1 rounded ${p.premium ? 'bg-yellow-400' : 'bg-muted'}`}>{p.premium ? 'Premium' : 'Marcar Premium'}</button>
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
