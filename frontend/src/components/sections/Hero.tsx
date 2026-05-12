import { Search, MapPin, Star, Shield, ArrowRight } from 'lucide-react'

const stats = [
  { value: '79,450+', label: 'Profesionales potenciales' },
  { value: '276,556', label: 'Hogares en el AMB' },
  { value: '4.9', label: 'Calificacion promedio' },
  { value: '24/7', label: 'Disponibilidad' },
]

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-100/50 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green-100/50 blur-3xl rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Marketplace #1 en Bucaramanga
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Conecta con{' '}
              <span className="text-blue-600">profesionales</span>{' '}
              de confianza cerca de ti
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Servify es la plataforma que conecta profesionales independientes verificados 
              con hogares que necesitan servicios confiables. Plomeros, electricistas, 
              disenadores y mas, a solo un clic de distancia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Buscar Profesionales
                <Search className="h-4 w-4" />
              </a>
              <a
                href="#planes"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Soy Profesional
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Perfiles verificados</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Resenas reales</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Cerca de ti</span>
              </div>
            </div>
          </div>

          {/* Right content - Stats cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl bg-white p-6 shadow-lg border border-gray-100 ${
                    index === 0 ? 'col-span-2' : ''
                  }`}
                >
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-green-600 text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg">
              Gratis para clientes
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
