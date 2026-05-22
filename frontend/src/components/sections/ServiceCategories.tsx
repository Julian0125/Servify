import { useState, useRef, useEffect } from 'react'
import {
  Wrench, Zap, Paintbrush, GraduationCap, Home, Camera, Code, Scissors,
  Search, SlidersHorizontal, Crown, MessageSquare, Users, Briefcase, Heart, Calculator, Leaf, Video, Coffee, Smile, Ruler, Plus, TrendingUp, Globe
} from 'lucide-react'
import type { Category, Professional } from '../../types'
import { api } from '../../services/api'
import ProfessionalModal from '../ui/ProfessionalModal'

type ExtendedProfessional = Professional & {
  photo?: string
  pricePerHour?: number | string
  bio?: string
  portfolio?: string[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench, Zap, Paintbrush, GraduationCap, Home, Camera, Code, Scissors
}

interface ServiceCategoriesProps {
  categories: Category[]
  onSearch: (query: string, location: string, categoryId: string) => void
  onViewAll?: () => void
}

export function ServiceCategories({ categories, onSearch, onViewAll: _onViewAll }: ServiceCategoriesProps) {
  const [selectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [liveResults, setLiveResults] = useState<ExtendedProfessional[]>([])
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null)
  const borderClass = 'border-blue-500'
  const [allProfessionals, setAllProfessionals] = useState<ExtendedProfessional[]>([])
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'distance'>('relevance')
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement | null>(null)
  const [selectedProfessional, setSelectedProfessional] = useState<ExtendedProfessional | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    return () => { if (debounceTimer) window.clearTimeout(debounceTimer) }
  }, [debounceTimer])

  useEffect(() => {
    let mounted = true
    api.professionals.getAll()
      .then((res) => { if (mounted) setAllProfessionals(res) })
      .catch(async () => {
        try {
          const resp = await fetch('/data/professionals.json')
          if (resp.ok) {
            const local = await resp.json()
            const normalized = local.map((p: any) => ({
              id: p.id || p.name,
              name: p.name,
              profession: p.profession || p.title || '',
              avatar: p.avatar || (p.name ? p.name.split(' ').map((n:string)=>n[0]).slice(0,2).join('') : ''),
              photo: p.photo || p.image || '',
              portfolio: p.portfolio || [],
              rating: p.rating || 0,
              reviews: p.reviews || 0,
              location: p.location || '',
              distance: p.distance || '',
              hourlyRate: p.hourlyRate || (p.pricePerHour ? `$${p.pricePerHour}` : ''),
              description: p.description || p.bio || '',
              responseTime: p.responseTime || '',
              premium: p.premium || false,
              categoryId: p.categoryId || ''
            }))
            if (mounted) setAllProfessionals(normalized)
            return
          }
        } catch (e) {
          // ignore
        }
        if (mounted) setAllProfessionals([])
      })
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const parseDistance = (d?: string) => {
    if (!d) return Number.POSITIVE_INFINITY
    const m = d.match(/[0-9]+\.?[0-9]*/)
    return m ? parseFloat(m[0]) : Number.POSITIVE_INFINITY
  }

  const handleSearch = () => {
    onSearch(searchQuery, '', selectedCategory || '')
  }

  const renderProfessionals = () => {
    try {
      const hasQuery = searchQuery.trim().length > 0
      const base = hasQuery ? liveResults : allProfessionals
      const resultsUnsorted = base
      const results = Array.isArray(resultsUnsorted) ? [...resultsUnsorted].sort((a, b) => {
        if (a.premium !== b.premium) return a.premium ? -1 : 1
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'distance') return parseDistance(a.distance) - parseDistance(b.distance)
        return 0
      }) : []

      const total = results.length
      const totalPages = Math.max(1, Math.ceil(total / itemsPerPage))
      const page = Math.min(Math.max(1, currentPage), totalPages)
      const paginated = results.slice((page - 1) * itemsPerPage, page * itemsPerPage)

      console.debug('ServiceCategories pagination', { total, totalPages, page, currentPage, itemsPerPage, paginatedLength: paginated.length, hasQuery })

      if (results.length === 0) return (<div className="text-center text-gray-500">No hay profesionales que mostrar.</div>)

      return (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((p) => {
              const cat = categories.find(c => c.id === p.categoryId)
              let Icon = cat ? (iconMap[cat.icon] || Wrench) : Wrench
              let iconBg = cat ? (cat.color || 'bg-gray-200') : 'bg-gray-200'
              if (!cat) {
                const rawProf = (p.profession || '').toLowerCase()
                const profText = rawProf.normalize ? rawProf.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : rawProf
                if (profText.includes('plom')) { Icon = Wrench; iconBg = 'bg-blue-500' }
                else if (profText.includes('electr')) { Icon = Zap; iconBg = 'bg-yellow-500' }
                else if (profText.includes('dise') || profText.includes('design')) { Icon = Paintbrush; iconBg = 'bg-pink-500' }
                else if (profText.includes('foto') || profText.includes('phot')) { Icon = Camera; iconBg = 'bg-purple-600' }
                else if (profText.includes('dev') || profText.includes('desarroll') || profText.includes('web')) { Icon = Code; iconBg = 'bg-indigo-600' }
                else if (profText.includes('barber') || profText.includes('hair')) { Icon = Scissors; iconBg = 'bg-rose-500' }
                else if (profText.includes('profes') || profText.includes('profesor') || profText.includes('profesora') || profText.includes('tutor') || profText.includes('docente') || profText.includes('maestr')) { Icon = GraduationCap; iconBg = 'bg-green-600' }
                else if (profText.includes('carpin') || profText.includes('carpintero') || profText.includes('madera')) { Icon = Ruler; iconBg = 'bg-amber-500' }
                else if (profText.includes('cont') || profText.includes('contador') || profText.includes('contab')) { Icon = Calculator; iconBg = 'bg-sky-600' }
                else if (profText.includes('psico') || profText.includes('psic') ) { Icon = Users; iconBg = 'bg-emerald-600' }
                else if (profText.includes('fisio') || profText.includes('fisioter')) { Icon = Plus; iconBg = 'bg-teal-600' }
                else if (profText.includes('chef') || profText.includes('cocin')) { Icon = Coffee; iconBg = 'bg-orange-500' }
                else if (profText.includes('jard') || profText.includes('jardin')) { Icon = Leaf; iconBg = 'bg-lime-600' }
                else if (profText.includes('estil') || profText.includes('imagen') || profText.includes('asesora de imagen')) { Icon = Scissors; iconBg = 'bg-rose-400' }
                else if (profText.includes('mecanic') || profText.includes('mecánico')) { Icon = Wrench; iconBg = 'bg-stone-600' }
                else if (profText.includes('trad') || profText.includes('tradu')) { Icon = Globe; iconBg = 'bg-indigo-500' }
                else if (profText.includes('dent') || profText.includes('odont') || profText.includes('dentista')) { Icon = Smile; iconBg = 'bg-fuchsia-500' }
                else if (profText.includes('enfer') || profText.includes('enfermera')) { Icon = Plus; iconBg = 'bg-red-400' }
                else if (profText.includes('arquitect') || profText.includes('arquitecto')) { Icon = Home; iconBg = 'bg-cyan-600' }
                else if (profText.includes('ingenier') || profText.includes('civil')) { Icon = Ruler; iconBg = 'bg-slate-500' }
                else if (profText.includes('veter') || profText.includes('veterin')) { Icon = Heart; iconBg = 'bg-amber-400' }
                else if (profText.includes('community') || profText.includes('manager')) { Icon = MessageSquare; iconBg = 'bg-violet-600' }
                else if (profText.includes('marketing') || profText.includes('market')) { Icon = TrendingUp; iconBg = 'bg-amber-600' }
                else if (profText.includes('editor') || profText.includes('edita') || profText.includes('video')) { Icon = Video; iconBg = 'bg-slate-400' }
                else if (profText.includes('abog') || profText.includes('law')) { Icon = Briefcase; iconBg = 'bg-slate-600' }
                else if (profText.includes('entren') || profText.includes('trainer') || profText.includes('personal') || profText.includes('fitness')) { Icon = Users; iconBg = 'bg-red-500' }
                else if (profText.includes('nutri') || profText.includes('diet') || profText.includes('nutrition')) { Icon = Heart; iconBg = 'bg-pink-500' }
              }

              const bg = cat ? cat.color : 'bg-gray-200'
              return (
                <div key={p.id} className={`rounded-xl bg-white p-6 border ${borderClass} shadow-md transition hover:shadow-xl hover:scale-[1.01]`} onClick={() => setSelectedProfessional(p)}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-700 overflow-hidden">
                        {p.photo ? (
                          <img src={p.photo} alt={p.name} className="h-20 w-20 object-cover" />
                        ) : (
                          (p.avatar || (p.name || '').split(' ').map((n:any)=>n[0]).slice(0,2).join(''))
                        )}
                      </div>
                      <div className="mt-2 text-center text-xs text-gray-500">{p.responseTime}</div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-lg font-semibold text-gray-900">{p.name}</div>
                          <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
                            <span className={`inline-flex items-center justify-center h-6 w-6 rounded ${iconBg || bg}`}>
                              <Icon className="h-4 w-4 text-white" />
                            </span>
                            <span>{p.profession}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {p.premium && <Crown className="h-5 w-5 text-yellow-500" />}
                            <div className="text-sm font-medium text-gray-800">{p.rating} ★</div>
                          </div>
                          <div className="mt-2 text-sm text-gray-500">{p.reviews} reseñas</div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="text-sm font-medium text-blue-600">{p.hourlyRate}</div>
                        <div className="ml-auto text-xs text-gray-400">{p.distance}</div>
                      </div>

                      <p className="mt-3 text-sm text-gray-500 line-clamp-3">{p.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {total > itemsPerPage && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button className="px-3 py-1 rounded-md border bg-white hover:bg-blue-600 hover:text-white" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 rounded-md border ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-600 hover:text-white'}`}>{i + 1}</button>
              ))}
              <button className="px-3 py-1 rounded-md border bg-white hover:bg-blue-600 hover:text-white" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
            </div>
          )}
        </>
      )
    } catch (err) {
      console.error('Error rendering professionals list', err)
      return <div className="text-center text-red-500">Error al mostrar profesionales — revisa la consola.</div>
    }
  }

  return (
    <section id="servicios" className="py-16 lg:py-24 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">Categorias de Servicio</span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Encuentra el servicio que necesitas</h2>
          <p className="mt-4 text-lg text-gray-600">Explora nuestras categorias y encuentra profesionales verificados cerca de ti</p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Buscar servicios..." className="w-full pl-10 pr-10 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" ref={inputRef} value={searchQuery} onChange={(e)=>{
              const v = e.target.value
              setSearchQuery(v)
              if (debounceTimer) window.clearTimeout(debounceTimer)
              const t = window.setTimeout(async () => {
                if (!v) { setLiveResults([]); return }
                try {
                  const loc = undefined
                  const cat = selectedCategory || undefined
                  const results = await api.professionals.search(v, loc, cat)
                  setLiveResults((results || []).slice(0, 6))
                } catch (err) {
                  try {
                    const q = v.toLowerCase()
                    const filtered = allProfessionals.filter((p: any) => (
                      (p.name && p.name.toLowerCase().includes(q)) ||
                      (p.profession && p.profession.toLowerCase().includes(q)) ||
                      (p.description && p.description.toLowerCase().includes(q))
                    ))
                    setLiveResults(filtered.slice(0, 6))
                  } catch (err2) {
                    setLiveResults([])
                  }
                }
              }, 250)
              setDebounceTimer(t)
            }} onKeyDown={(e)=> e.key === 'Enter' && handleSearch()} />
            {searchQuery && (
              <button aria-label="Borrar búsqueda" onClick={() => { setSearchQuery(''); setLiveResults([]); inputRef.current?.focus(); }} className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-all duration-150 ease-in-out hover:scale-110 hover:text-gray-800 hover:animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform duration-200 hover:rotate-90" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex gap-4 items-center">
            <div className="relative" ref={sortRef}>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Ordenar por:</label>
                <button type="button" onClick={() => setSortOpen(s => !s)} className="inline-flex items-center justify-between gap-3 py-2 px-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-transform duration-150">
                  <span className="text-sm text-gray-700">{sortBy === 'relevance' ? 'Relevancia' : sortBy === 'rating' ? 'Puntuación' : 'Cercanía'}</span>
                  <svg className={`h-4 w-4 text-gray-500 transform transition-transform ${sortOpen ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>

              <div className={`absolute mt-2 right-0 w-44 bg-white rounded-lg shadow-lg ring-1 ring-black/5 z-20 transform transition-all duration-150 ${sortOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <ul className="py-1">
                  <li className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${sortBy === 'relevance' ? 'font-semibold' : ''}`} onClick={() => { setSortBy('relevance'); setSortOpen(false); }}>Relevancia</li>
                  <li className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${sortBy === 'rating' ? 'font-semibold' : ''}`} onClick={() => { setSortBy('rating'); setSortOpen(false); }}>Puntuación</li>
                  <li className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${sortBy === 'distance' ? 'font-semibold' : ''}`} onClick={() => { setSortBy('distance'); setSortOpen(false); }}>Cercanía</li>
                </ul>
              </div>
            </div>

            <button onClick={() => handleSearch()} className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
              <SlidersHorizontal className="h-4 w-4" /> Buscar
            </button>
          </div>
        </div>

        {/* render list */}
        {renderProfessionals()}

        {selectedProfessional && (
          <ProfessionalModal professional={selectedProfessional} open={!!selectedProfessional} onClose={() => setSelectedProfessional(null)} />
        )}

      </div>
    </section>
  )
}

export default ServiceCategories
