import { useState, useEffect } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { ServiceCategories } from './components/sections/ServiceCategories'
import { ProfessionalProfiles } from './components/sections/ProfessionalProfiles'
import { HowItWorks } from './components/sections/HowItWorks'
import { SubscriptionPlans } from './components/sections/SubscriptionPlans'
import { BusinessModel } from './components/sections/BusinessModel'
import { CTA } from './components/sections/CTA'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SelectPlanPage from './pages/SelectPlanPage'
import ProfilePage from './pages/ProfilePage'
import { api } from './services/api'
import type { Professional, Category, SubscriptionPlan, BusinessMetrics } from './types'

// Mock data para usar cuando el backend no está disponible
const mockProfessionals: Professional[] = [
  {
    id: "1",
    name: "Carlos Rodriguez",
    profession: "Plomero Profesional",
    avatar: "CR",
    rating: 4.9,
    reviews: 127,
    location: "San Alonso, Bucaramanga",
    distance: "1.2 km",
    verified: true,
    premium: true,
    responseTime: "Responde en 30 min",
    hourlyRate: "$45.000/hora",
    description: "Plomero con 15 anos de experiencia. Especialista en instalaciones, reparaciones y mantenimiento.",
    skills: ["Instalaciones", "Reparaciones", "Mantenimiento"],
    categoryId: "plomeria",
    phone: "+57 300 123 4567",
    email: "carlos@email.com"
  },
  {
    id: "2",
    name: "Maria Gonzalez",
    profession: "Electricista Certificada",
    avatar: "MG",
    rating: 4.8,
    reviews: 89,
    location: "Cabecera, Bucaramanga",
    distance: "2.5 km",
    verified: true,
    premium: true,
    responseTime: "Responde en 1 hora",
    hourlyRate: "$50.000/hora",
    description: "Electricista certificada con experiencia en instalaciones residenciales y comerciales.",
    skills: ["Instalaciones", "Emergencias", "Iluminacion"],
    categoryId: "electricidad",
    phone: "+57 300 234 5678",
    email: "maria@email.com"
  },
  {
    id: "3",
    name: "Andres Martinez",
    profession: "Disenador Grafico",
    avatar: "AM",
    rating: 4.7,
    reviews: 64,
    location: "Centro, Bucaramanga",
    distance: "3.1 km",
    verified: true,
    premium: false,
    responseTime: "Responde en 2 horas",
    hourlyRate: "$35.000/hora",
    description: "Disenador grafico freelance especializado en branding, logos y material publicitario.",
    skills: ["Branding", "Logos", "Social Media"],
    categoryId: "programacion",
    phone: "+57 300 345 6789",
    email: "andres@email.com"
  },
  {
    id: "4",
    name: "Laura Perez",
    profession: "Profesora de Matematicas",
    avatar: "LP",
    rating: 5.0,
    reviews: 156,
    location: "Floridablanca",
    distance: "4.8 km",
    verified: true,
    premium: true,
    responseTime: "Responde en 15 min",
    hourlyRate: "$40.000/hora",
    description: "Profesora de matematicas con metodologia personalizada. Preparo para ICFES y universidades.",
    skills: ["ICFES", "Universitario", "Bachillerato"],
    categoryId: "clases",
    phone: "+57 300 456 7890",
    email: "laura@email.com"
  },
  {
    id: "5",
    name: "Roberto Silva",
    profession: "Pintor Profesional",
    avatar: "RS",
    rating: 4.6,
    reviews: 45,
    location: "Giron",
    distance: "5.2 km",
    verified: true,
    premium: false,
    responseTime: "Responde en 3 horas",
    hourlyRate: "$30.000/hora",
    description: "Pintor profesional con mas de 10 anos de experiencia en interiores y exteriores.",
    skills: ["Interiores", "Exteriores", "Acabados"],
    categoryId: "pintura",
    phone: "+57 300 567 8901",
    email: "roberto@email.com"
  },
  {
    id: "6",
    name: "Diana Castro",
    profession: "Fotografa",
    avatar: "DC",
    rating: 4.9,
    reviews: 78,
    location: "Piedecuesta",
    distance: "6.1 km",
    verified: true,
    premium: true,
    responseTime: "Responde en 1 hora",
    hourlyRate: "$80.000/sesion",
    description: "Fotografa profesional especializada en eventos, retratos y fotografia de producto.",
    skills: ["Eventos", "Retratos", "Producto"],
    categoryId: "fotografia",
    phone: "+57 300 678 9012",
    email: "diana@email.com"
  }
]

const mockCategories: Category[] = [
  { id: "plomeria", name: "Plomeria", icon: "Wrench", count: 45, color: "bg-blue-500" },
  { id: "electricidad", name: "Electricidad", icon: "Zap", count: 38, color: "bg-yellow-500" },
  { id: "pintura", name: "Pintura", icon: "Paintbrush", count: 52, color: "bg-pink-500" },
  { id: "clases", name: "Clases Particulares", icon: "GraduationCap", count: 67, color: "bg-green-500" },
  { id: "limpieza", name: "Limpieza", icon: "Home", count: 89, color: "bg-cyan-500" },
  { id: "fotografia", name: "Fotografia", icon: "Camera", count: 34, color: "bg-purple-500" },
  { id: "programacion", name: "Programacion", icon: "Code", count: 41, color: "bg-orange-500" },
  { id: "belleza", name: "Belleza", icon: "Scissors", count: 56, color: "bg-rose-500" },
]

const mockPlans: SubscriptionPlan[] = [
  {
    id: "basico",
    name: "Plan Basico",
    icon: "Zap",
    description: "Ideal para comenzar a conseguir clientes",
    monthlyPrice: 35000,
    yearlyPrice: 306000,
    features: [
      "Perfil verificado en la plataforma",
      "Hasta 5 fotos en portafolio",
      "Posicionamiento estandar en busquedas",
      "Insignia de verificado",
      "Notificaciones de contactos",
      "Soporte por correo electronico"
    ],
    highlighted: false,
    cta: "Comenzar Gratis"
  },
  {
    id: "premium",
    name: "Plan Premium",
    icon: "Crown",
    description: "Mayor visibilidad y mas oportunidades",
    monthlyPrice: 62500,
    yearlyPrice: 637500,
    features: [
      "Todo lo del Plan Basico",
      "Hasta 20 fotos en portafolio",
      "Posicionamiento destacado",
      "Sello Premium visible",
      "Estadisticas de perfil",
      "Soporte prioritario",
      "Apareces primero en tu zona",
      "Badge de profesional premium"
    ],
    highlighted: true,
    cta: "Elegir Premium"
  },
  {
    id: "enterprise",
    name: "Plan Empresarial",
    icon: "Sparkles",
    description: "Para equipos y empresas de servicios",
    monthlyPrice: 150000,
    yearlyPrice: 1530000,
    features: [
      "Todo lo del Plan Premium",
      "Multiples perfiles de empleados",
      "Dashboard de administracion",
      "Reportes avanzados",
      "API de integracion",
      "Account manager dedicado",
      "Facturacion empresarial",
      "Onboarding personalizado"
    ],
    highlighted: false,
    cta: "Contactar Ventas"
  }
]


const mockBusinessMetrics: BusinessMetrics = {
  marketData: {
    tam: { professionals: "79,450", households: "276,556", label: "TAM - Mercado Total" },
    sam: { professionals: "23,835", households: "55,311", label: "SAM - Mercado Direccionable" },
    som: { professionals: "~143", households: "~166", label: "SOM - Objetivo Ano 1" }
  },
  valuePropositions: [
    { title: "Enfoque 100% Local", description: "Conectamos profesionales y clientes dentro de la misma ciudad.", icon: "MapPin" },
    { title: "Verificacion de Perfiles", description: "Los profesionales completan un proceso de validacion.", icon: "Shield" },
    { title: "Resenas Verificadas", description: "Solo usuarios registrados pueden calificar.", icon: "CheckCircle" },
    { title: "Acceso Gratuito para Clientes", description: "Los consumidores no pagan nada.", icon: "Users" }
  ],
  revenueStreams: [
    { title: "Suscripciones Mensuales", description: "Fuente principal de ingresos.", percentage: "70%", icon: "Wallet" },
    { title: "Suscripciones Anuales", description: "Pago anual con descuento del 15%.", percentage: "20%", icon: "TrendingUp" },
    { title: "Visibilidad Adicional", description: "Espacios de publicidad destacada.", percentage: "10%", icon: "Target" }
  ],
  projections: [
    { period: "Mes 3", revenue: "$500K - $900K", subscribers: "20-30" },
    { period: "Mes 6", revenue: "$1.5M - $2.5M", subscribers: "50-65" },
    { period: "Mes 9", revenue: "$2.8M - $4.2M", subscribers: "80-100" },
    { period: "Ano 1", revenue: "$4.5M - $6M", subscribers: "120-150" },
    { period: "Ano 2", revenue: "$80M - $130M (anual)", subscribers: "200-260" }
  ],
  investments: [
    { concept: "Desarrollo MVP (web + app)", amount: "$8M - $15M" },
    { concept: "Diseno de marca e identidad", amount: "$1M - $2M" },
    { concept: "Tramites legales", amount: "$400K - $700K" },
    { concept: "Registro de marca SIC", amount: "$700K - $1M" },
    { concept: "Equipos de computo", amount: "$3.5M - $5M" },
    { concept: "Capital de trabajo (3 meses)", amount: "$8M - $15M" },
    { concept: "Marketing de lanzamiento", amount: "$1.5M - $3M" }
  ],
  risks: [
    { risk: "Bajo numero de profesionales suscritos", level: "Alto", mitigation: "Periodo de acceso gratuito inicial." },
    { risk: "Baja adopcion por clientes finales", level: "Alto", mitigation: "Campanas de marketing digital." },
    { risk: "Competidor con mayor musculo financiero", level: "Medio", mitigation: "Construccion rapida de comunidad local." },
    { risk: "Problemas tecnicos en la plataforma", level: "Medio", mitigation: "Pruebas exhaustivas y mantenimiento." }
  ]
}

function App() {
  const [professionals, setProfessionals] = useState<Professional[]>(mockProfessionals)
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [plans, setPlans] = useState<SubscriptionPlan[]>(mockPlans)
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics>(mockBusinessMetrics)
  const [user, setUser] = useState<any>(() => {
    try {
      const u = localStorage.getItem('servify_user')
      return u ? JSON.parse(u) : null
    } catch {
      return null
    }
  })
  // token and modal flags removed (not used) to satisfy strict TS checks
  const [routeHash, setRouteHash] = useState<string>(() => (typeof window !== 'undefined' ? window.location.hash : ''))

  // On mount, merge local stored professionals into current state
  useEffect(() => {
    const mergeLocal = () => {
      try {
        const raw = localStorage.getItem('servify_professionals')
        if (!raw) return
        const local = JSON.parse(raw)
        setProfessionals((prev) => {
          // avoid duplicates by id
          const ids = new Set(prev.map(p => p.id))
          const merged = [...prev]
          for (const p of local) if (!ids.has(p.id)) merged.push(p)
          return merged
        })
      } catch (e) {
        console.warn('Error merging local professionals', e)
      }
    }
    mergeLocal()
    // If there are no local professionals saved, populate with first 5 from static data
    async function ensureLocalDefaults() {
      try {
        const raw = localStorage.getItem('servify_professionals')
        const parsed = raw ? JSON.parse(raw) : null
        if (Array.isArray(parsed) && parsed.length > 0) return
        const res = await fetch('/data/professionals.json')
        if (!res.ok) return
        const all = await res.json()
        const first5 = (all || []).slice(0, 5).map((p: any) => ({
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
          hourlyRate: p.pricePerHour ? `$${p.pricePerHour}` : (p.hourlyRate || ''),
          description: p.bio || p.description || '',
          skills: p.skills || [],
          categoryId: p.categoryId || inferCategoryIdFromProfession(p.profession || p.bio),
          photo: p.photo || '/placeholder-profile.png',
          portfolio: p.portfolio || [],
          location: p.location || ''
        }))
        localStorage.setItem('servify_professionals', JSON.stringify(first5))
        window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
        // merge into state immediately
        setProfessionals((prev) => {
          const ids = new Set(prev.map(p => p.id))
          const merged = [...prev]
          for (const p of first5) if (!ids.has(p.id)) merged.push(p)
          return merged
        })
      } catch (e) {
        console.warn('Error ensuring local defaults', e)
      }
    }
    ensureLocalDefaults()
    window.addEventListener('servify:professionals:updated', mergeLocal)
    return () => window.removeEventListener('servify:professionals:updated', mergeLocal)
  }, [])

  // Session expiry checker
  useEffect(() => {
    const checkExpiry = () => {
      try {
        const expires = localStorage.getItem('servify_token_expires')
        if (expires) {
          const ts = Number(expires)
          if (ts && Date.now() > ts) {
            // expired
            localStorage.removeItem('servify_token')
            localStorage.removeItem('servify_token_expires')
            localStorage.removeItem('servify_user')
            setUser(null)
          }
        }
      } catch {}
    }
    checkExpiry()
    const id = setInterval(checkExpiry, 1000 * 60)
    return () => clearInterval(id)
  }, [])
  // Hash change listener to update route state
  useEffect(() => {
    const handler = () => setRouteHash(window.location.hash)
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  // Listen for auth updates (register/login/logout) so app state reflects localStorage
  useEffect(() => {
    const onAuth = () => {
      try {
        const raw = localStorage.getItem('servify_user')
        setUser(raw ? JSON.parse(raw) : null)
      } catch { setUser(null) }
      // after auth updated, try to restore scroll to where Plans used to be
      try {
        setTimeout(() => {
          const target = document.getElementById('planes')
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            return
          }
          const rawY = sessionStorage.getItem('servify_scroll_before_auth')
          if (rawY) {
            const y = Number(rawY)
            if (!Number.isNaN(y)) window.scrollTo({ top: y, left: 0, behavior: 'smooth' })
            sessionStorage.removeItem('servify_scroll_before_auth')
          }
        }, 200)
      } catch {}
    }
    window.addEventListener('servify:auth:updated', onAuth)
    return () => window.removeEventListener('servify:auth:updated', onAuth)
  }, [])

  // Save scroll position before navigating to the login screen
  useEffect(() => {
    const saveBeforeLogin = () => { try { sessionStorage.setItem('servify_scroll_before_auth', String(window.scrollY)) } catch {} }
    const links = Array.from(document.querySelectorAll('a[href="#login"]'))
    for (const a of links) a.addEventListener('click', saveBeforeLogin)
    return () => { for (const a of links) a.removeEventListener('click', saveBeforeLogin) }
  }, [])
  // Scroll to top only for full-page route hashes (not in-page anchors)
  useEffect(() => {
    try {
      const pageRoutes = ['#login', '#register', '#select-plan', '#profile']
      if (pageRoutes.includes(routeHash)) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
    } catch {}
  }, [routeHash])
  const [loading, setLoading] = useState(true)
  const [usingMockData, setUsingMockData] = useState(false)

  function inferCategoryIdFromProfession(text?: string) {
    if (!text) return 'otros'
    const p = text.toLowerCase()
    if (p.includes('plom')) return 'plomeria'
    if (p.includes('electr') || p.includes('electric')) return 'electricidad'
    if (p.includes('pint') || p.includes('pintor')) return 'pintura'
    if (p.includes('foto') || p.includes('fotograf')) return 'fotografia'
    if (p.includes('desarroll') || p.includes('web') || p.includes('dev')) return 'programacion'
    if (p.includes('clase') || p.includes('profesor')) return 'clases'
    if (p.includes('limpieza') || p.includes('limpi')) return 'limpieza'
    if (p.includes('belleza') || p.includes('estil')) return 'belleza'
    return 'otros'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profData, catData, planData, bizData] = await Promise.all([
          api.professionals.getAll(),
          api.categories.getAll(),
          api.subscriptions.getAll(),
          api.business.getMetrics()
        ])
        setProfessionals(profData)
        setCategories(catData)
        setPlans(planData)
        setBusinessMetrics(bizData)
        setUsingMockData(false)
      } catch (error) {
        console.log('Backend no disponible, usando datos de demostración')
        setUsingMockData(true)
        try {
          const res = await fetch('/data/professionals.json')
          if (res.ok) {
            const rawLocal = await res.json()
            const local = rawLocal.map((p: any) => ({
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
              hourlyRate: p.pricePerHour ? `$${p.pricePerHour}` : (p.hourlyRate || ''),
              description: p.bio || p.description || '',
              skills: p.skills || [],
              categoryId: p.categoryId || inferCategoryIdFromProfession(p.profession || p.bio),
              photo: p.photo || '/placeholder-profile.png',
              portfolio: p.portfolio || [],
              location: p.location || ''
            }))
            // set local data with inferred categoryId so searches by category work
            setProfessionals(local)
          } else {
            // keep existing mockProfessionals
            console.warn('No se encontró /data/professionals.json, usando mock interno')
          }
        } catch (e) {
          console.warn('Error cargando JSON local:', e)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSearch = async (query: string, location: string, categoryId: string) => {
    if (usingMockData) {
      // Filtrar datos locales (si existe el JSON con portafolios reales)
      try {
        const res = await fetch('/data/professionals.json')
        let data = mockProfessionals
        if (res.ok) {
          // use the local JSON which includes `photo` and `portfolio`
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const rawLocal = await res.json()
          data = rawLocal.map((p: any) => ({
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
            hourlyRate: p.pricePerHour ? `$${p.pricePerHour}` : (p.hourlyRate || ''),
            description: p.bio || p.description || '',
            skills: p.skills || [],
            categoryId: p.categoryId || inferCategoryIdFromProfession(p.profession || p.bio),
            photo: p.photo || '/placeholder-profile.png',
            portfolio: p.portfolio || [],
            location: p.location || ''
          }))
        }
        let filtered = data
        if (query) {
          filtered = filtered.filter((p: any) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            (p.profession || '').toLowerCase().includes(query.toLowerCase())
          )
        }
        if (categoryId) {
          filtered = filtered.filter((p: any) => p.categoryId === categoryId)
        }
        filtered.sort((a: any, b: any) => {
          if (a.premium && !b.premium) return -1
          if (!a.premium && b.premium) return 1
          return (b.rating || 0) - (a.rating || 0)
        })
        setProfessionals(filtered)
      } catch (e) {
        console.error('Error filtrando datos locales:', e)
        setProfessionals(mockProfessionals)
      }
    } else {
      try {
        const results = await api.professionals.search(query, location, categoryId)
        setProfessionals(results)
      } catch (error) {
        console.error('Error searching:', error)
      }
    }
  }

  const handleViewAll = async () => {
    // Load all professionals into the search/results area and scroll to section
    try {
      if (usingMockData) {
        // try to load local JSON first
        const res = await fetch('/data/professionals.json')
        if (res.ok) {
          const local = await res.json()
          setProfessionals(local)
        } else {
          setProfessionals(mockProfessionals)
        }
      } else {
        const all = await api.professionals.getAll()
        setProfessionals(all)
      }
      // smooth scroll to the profesionales section (search results area)
      setTimeout(() => {
        const el = document.getElementById('profesionales')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (e) {
      console.warn('Error cargando todos los profesionales', e)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando Servify...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={() => {
        localStorage.removeItem('servify_token')
        localStorage.removeItem('servify_user')
        setUser(null)
      }} />
      <main>
        {/* Simple hash-based routing for pages */}
        {(() => {
          const hash = routeHash || (typeof window !== 'undefined' ? window.location.hash : '')
          if (hash === '#login') return <LoginPage />
          if (hash === '#register') return <RegisterPage categories={categories} />
          if (hash === '#select-plan') return <SelectPlanPage />
          if (hash === '#profile') return <ProfilePage />
          return (
            <>
              <Hero />
              <ServiceCategories categories={categories} onSearch={handleSearch} onViewAll={handleViewAll} />
              <ProfessionalProfiles professionals={professionals} onViewAll={handleViewAll} />
              <HowItWorks />
              {!user && <SubscriptionPlans plans={plans} />}
              <BusinessModel metrics={businessMetrics} />
              <CTA />
            </>
          )
        })()}
        
      </main>
      <Footer />
      
      
      {/* demo banner removed per UX request */}
    </div>
  )
}

export default App
