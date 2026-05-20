import { useMemo, useState } from 'react'
import SubscriptionModal from '../ui/SubscriptionModal'
import { Check, Crown, Sparkles, Zap } from 'lucide-react'
import type { SubscriptionPlan } from '../../types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Crown, Sparkles
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

interface SubscriptionPlansProps {
  plans: SubscriptionPlan[]
}

export function SubscriptionPlans({ plans }: SubscriptionPlansProps) {
  // show only Básico and Premium monthly plans
  const displayed = useMemo(() => {
    const found = (plans || []).filter(p => {
      const id = (p.id || '').toString().toLowerCase()
      const name = (p.name || '').toString().toLowerCase()
      return id.includes('basic') || id.includes('basico') || name.includes('basic') || name.includes('básic') || name.includes('premium') || id.includes('premium')
    })
    if (found.length > 0) return found
    // fallback defaults
    return [
      {
        id: 'basico', name: 'Plan Básico', description: 'Ideal para comenzar a conseguir clientes', monthlyPrice: 35000, features: ['Perfil verificado en la plataforma','Hasta 5 fotos en portafolio','Posicionamiento estándar en búsquedas'], highlighted: false, icon: 'Zap', cta: 'Comenzar Gratis'
      },
      {
        id: 'premium', name: 'Plan Premium', description: 'Mayor visibilidad y más oportunidades', monthlyPrice: 62500, features: ['Todo lo del Plan Básico','Hasta 20 fotos en portafolio','Posicionamiento destacado'], highlighted: true, icon: 'Crown', cta: 'Elegir Premium'
      }
    ]
  }, [plans])
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null)

  return (
    <section id="planes" className="py-16 lg:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
            Planes de Suscripcion
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Elige el plan perfecto para ti
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Suscribete y comienza a recibir clientes desde el primer dia. 
            Acceso gratuito para clientes que buscan servicios.
          </p>

          {/* Mensual únicamente */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="text-sm font-medium text-gray-900">Planes mensuales</span>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {displayed.map((plan: any) => {
            const Icon = iconMap[plan.icon] || Zap
            const price = plan.monthlyPrice || plan.monthly || 0

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col bg-white rounded-2xl shadow-sm border ${
                  plan.highlighted
                    ? 'border-blue-500 shadow-lg scale-105 z-10'
                    : 'border-gray-200'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded-full">
                      Mas Popular
                    </span>
                  </div>
                )}

                <div className="p-6 text-center border-b border-gray-100">
                  <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${
                    plan.highlighted ? 'bg-blue-600' : 'bg-gray-100'
                  }`}>
                    <Icon className={`h-7 w-7 ${plan.highlighted ? 'text-white' : 'text-gray-700'}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                </div>

                <div className="p-6 flex-1">
                  <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-gray-900">{formatPrice(price)}</div>
                      <p className="text-sm text-gray-500">/mes</p>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-0">
                  <button onClick={() => setSelectedPlan(plan)} className={`w-full py-3 px-4 text-sm font-medium rounded-lg transition-colors ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}>
                    Suscribirse
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional info */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-600">
            Facturación mensual. Cancela en cualquier momento sin penalizaciones.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
            <span className="flex items-center gap-2 text-gray-600">
              <Check className="h-4 w-4 text-green-600" />
              Sin compromiso
            </span>
            <span className="flex items-center gap-2 text-gray-600">
              <Check className="h-4 w-4 text-green-600" />
              Facturación electrónica
            </span>
            <span className="flex items-center gap-2 text-gray-600">
              <Check className="h-4 w-4 text-green-600" />
              Múltiples métodos de pago
            </span>
          </div>
        </div>
      </div>
      {selectedPlan && (
        <SubscriptionModal open={!!selectedPlan} plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </section>
  )
}
