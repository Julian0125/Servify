import type { BusinessMetrics } from '../../types'

export function BusinessModel({ metrics }: { metrics?: BusinessMetrics }) {
  return (
    <section id="modelo" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">Modelo de Negocio</span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Modelo de Negocio</h2>
          <p className="mt-4 text-lg text-gray-600">Resumen del plan de negocio de Servify.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {metrics && (
            <div className="mb-4 text-sm text-gray-600">Mercado: {metrics.marketData?.tam?.label || ''}</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-semibold text-blue-700 mb-2">SOCIOS CLAVE</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Gremios y asociaciones de oficios</li>
                <li>Proveedores de insumos para profesionales</li>
                <li>Desarrolladores y diseñadores freelance</li>
                <li>Cámara de Comercio</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-semibold text-blue-700 mb-2">ACTIVIDADES CLAVE</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Verificación de perfiles de profesionales</li>
                <li>Captación y retención de usuarios</li>
                <li>Gestión del sistema de reseñas</li>
                <li>Soporte al cliente</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg md:col-span-1">
              <h4 className="text-sm font-semibold text-blue-700 mb-2">PROPUESTA DE VALOR</h4>
              <div className="text-sm text-gray-700 font-medium mb-1">Para profesionales</div>
              <ul className="text-sm text-gray-600 list-disc list-inside mb-3">
                <li>Visibilidad digital accesible y económica</li>
                <li>Leads cualificados y constantes</li>
                <li>Perfil verificado con reseñas reales</li>
                <li>Sin necesidad de publicidad propia</li>
              </ul>
              <div className="text-sm text-gray-700 font-medium mb-1">Para clientes</div>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                <li>Profesionales locales verificados</li>
                <li>Búsqueda por precio, zona y calificación</li>
                <li>Reseñas auténticas de usuarios reales</li>
                <li>Acceso 100% gratuito</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-semibold text-blue-700 mb-2">RELACIÓN CLIENTES</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Self-service: registro y perfil autónomo</li>
                <li>Notificaciones automáticas de renovación</li>
                <li>Sistema de calificaciones y reseñas</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-semibold text-blue-700 mb-2">SEGMENTOS CLIENTES</h4>
              <div className="text-sm text-gray-700 font-medium mb-1">Profesionales independientes</div>
              <p className="text-sm text-gray-600 mb-2">Plomeros, electricistas, diseñadores, docentes, técnicos y más oficios locales que buscan estabilidad laboral y visibilidad digital a bajo costo.</p>
              <div className="text-sm text-gray-700 font-medium mb-1">Segmento 2</div>
              <p className="text-sm text-gray-600">Hogares y personas naturales que requieren servicios confiables y cercanos; valoran confianza, rapidez y precios transparentes.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 border rounded-lg md:col-span-2">
              <h4 className="text-sm font-semibold text-blue-700 mb-2">COSTES DE ESTRUCTURA</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Desarrollo y mantenimiento de la plataforma</li>
                <li>Hosting y servidores en la nube</li>
                <li>Honorarios del equipo</li>
                <li>Marketing digital (redes y buscadores)</li>
                <li>Comisiones de pasarela de pago</li>
                <li>Arrendamiento de oficina / coworking</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-semibold text-blue-700 mb-2">RECURSOS CLAVE</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Plataforma tecnológica</li>
                <li>Base de datos de profesionales verificados</li>
                <li>Reputación y comunidad de usuarios</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-semibold text-blue-700 mb-2">CANALES</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Sitio web responsive</li>
                <li>Redes sociales (Instagram, Facebook, TikTok)</li>
                <li>Ventas directas y demostraciones</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-semibold text-blue-700 mb-2">INGRESOS</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Suscripción mensual Plan Básico (~$30K–$40K COP)</li>
                <li>Suscripción mensual Plan Premium (~$55K–$70K COP)</li>
                <li>Planes anuales con descuento (~15%)</li>
                <li>Espacios de visibilidad destacada</li>
                <li>Comisiones por alianzas comerciales (mediano plazo)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
