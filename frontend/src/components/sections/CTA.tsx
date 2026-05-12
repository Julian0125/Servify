import { ArrowRight, Users, Briefcase } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-16 lg:py-24 bg-blue-600">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Unete a Servify hoy
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Forma parte del marketplace de servicios profesionales #1 de Bucaramanga. 
              Ya sea que busques servicios o quieras ofrecer los tuyos.
            </p>
          </div>

          {/* Right content - CTAs */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Busco Servicios
              </h3>
              <p className="text-sm text-blue-100 mb-4">
                Acceso gratuito. Encuentra profesionales verificados cerca de ti.
              </p>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors"
              >
                Explorar Servicios
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 mb-4">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Soy Profesional
              </h3>
              <p className="text-sm text-blue-100 mb-4">
                Prueba gratis 7 dias. Aumenta tus ingresos con nuevos clientes.
              </p>
              <a
                href="#planes"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-white bg-transparent border border-white/50 rounded-lg hover:bg-white/10 transition-colors"
              >
                Ver Planes
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
