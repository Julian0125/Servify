import { useState, useEffect } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { ServiceCategories } from './components/sections/ServiceCategories'
import { ProfessionalProfiles } from './components/sections/ProfessionalProfiles'
import { HowItWorks } from './components/sections/HowItWorks'
import { SubscriptionPlans } from './components/sections/SubscriptionPlans'
import { Testimonials } from './components/sections/Testimonials'
import { BusinessModel } from './components/sections/BusinessModel'
import { CTA } from './components/sections/CTA'
import { api } from './services/api'
import type { Professional, Category, SubscriptionPlan, Testimonial, BusinessMetrics } from './types'

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

const mockTestimonials: Testimonial[] = [
  { id: 1, name: "Juan Perez", role: "Plomero Independiente", avatar: "JP", rating: 5, text: "Desde que me uni a Servify, mis ingresos aumentaron un 40%.", type: "professional" },
  { id: 2, name: "Maria Rodriguez", role: "Cliente - Ama de casa", avatar: "MR", rating: 5, text: "Encontre un electricista excelente en menos de 10 minutos.", type: "client" },
  { id: 3, name: "Andres Gomez", role: "Disenador Grafico", avatar: "AG", rating: 5, text: "Servify me permite mostrar mi portafolio y los clientes me contactan directamente.", type: "professional" },
  { id: 4, name: "Carolina Silva", role: "Cliente - Emprendedora", avatar: "CS", rating: 5, text: "Pude comparar precios, ver trabajos anteriores y elegir el mejor.", type: "client" },
  { id: 5, name: "Roberto Martinez", role: "Profesor Particular", avatar: "RM", rating: 5, text: "El plan Premium me puso primero en las busquedas de mi zona.", type: "professional" },
  { id: 6, name: "Laura Herrera", role: "Cliente - Padre de familia", avatar: "LH", rating: 5, text: "Ver las calificaciones me dio mucha tranquilidad. Excelente servicio.", type: "client" },
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
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials)
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics>(mockBusinessMetrics)
  const [loading, setLoading] = useState(true)
  const [usingMockData, setUsingMockData] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profData, catData, planData, testData, bizData] = await Promise.all([
          api.professionals.getAll(),
          api.categories.getAll(),
          api.subscriptions.getAll(),
          api.testimonials.getAll(),
          api.business.getMetrics()
        ])
        setProfessionals(profData)
        setCategories(catData)
        setPlans(planData)
        setTestimonials(testData)
        setBusinessMetrics(bizData)
        setUsingMockData(false)
      } catch (error) {
        console.log('Backend no disponible, usando datos de demostración')
        setUsingMockData(true)
        try {
          const res = await fetch('/data/professionals.json')
          if (res.ok) {
            const local = await res.json()
            // set local data (component will handle missing fields)
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
          data = await res.json()
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
      <Header />
      <main>
        <Hero />
        <ServiceCategories categories={categories} onSearch={handleSearch} onViewAll={handleViewAll} />
        <ProfessionalProfiles professionals={professionals} onViewAll={handleViewAll} />
        <HowItWorks />
        <SubscriptionPlans plans={plans} />
        <Testimonials testimonials={testimonials} />
        <BusinessModel metrics={businessMetrics} />
        <CTA />
      </main>
      <Footer />
      
      {usingMockData && (
        <div className="fixed bottom-4 right-4 bg-yellow-500 text-yellow-900 px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
          Modo Demo - Backend no conectado
        </div>
      )}
    </div>
  )
}

export default App
