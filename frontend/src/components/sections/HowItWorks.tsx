import { useState } from 'react'
import { UserPlus, Search, MessageSquare, Star, FileCheck, CreditCard, Users, TrendingUp } from 'lucide-react'

const clientSteps = [
  { step: 1, title: 'Busca el servicio', description: 'Explora las categorias o usa el buscador para encontrar el profesional.', icon: Search },
  { step: 2, title: 'Compara perfiles', description: 'Revisa portafolios, calificaciones, resenas y precios.', icon: Users },
  { step: 3, title: 'Contacta al profesional', description: 'Envia un mensaje o llama directamente.', icon: MessageSquare },
  { step: 4, title: 'Califica el servicio', description: 'Despues del trabajo, deja tu resena para ayudar a otros.', icon: Star },
]

const professionalSteps = [
  { step: 1, title: 'Registrate en la plataforma', description: 'Crea tu cuenta y completa tu perfil profesional.', icon: UserPlus },
  { step: 2, title: 'Verifica tu identidad', description: 'Sube tus documentos para obtener la insignia de verificado.', icon: FileCheck },
  { step: 3, title: 'Elige tu plan', description: 'Selecciona el plan de suscripcion que mejor se adapte.', icon: CreditCard },
  { step: 4, title: 'Recibe clientes', description: 'Tu perfil estara visible y comenzaras a recibir contactos.', icon: TrendingUp },
]

interface StepCardProps {
  step: typeof clientSteps[0]
  isLast: boolean
}

function StepCard({ step, isLast }: StepCardProps) {
  const Icon = step.icon

  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Connector line */}
      {!isLast && (
        <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200" />
      )}

      {/* Step number */}
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold shadow-lg">
        {step.step}
      </div>

      {/* Icon */}
      <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
        <Icon className="h-6 w-6 text-gray-700" />
      </div>

      {/* Content */}
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
      <p className="mt-2 text-sm text-gray-600 max-w-xs">{step.description}</p>
    </div>
  )
}

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'clients' | 'professionals'>('clients')

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
            Como Funciona
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, rapido y seguro
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Conectamos profesionales con clientes en pocos pasos
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'clients'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Para Clientes
            </button>
            <button
              onClick={() => setActiveTab('professionals')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'professionals'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Para Profesionales
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="grid md:grid-cols-4 gap-8">
            {(activeTab === 'clients' ? clientSteps : professionalSteps).map((step, index, arr) => (
              <StepCard key={step.step} step={step} isLast={index === arr.length - 1} />
            ))}
          </div>

          <div className={`mt-12 p-6 rounded-lg text-center ${
            activeTab === 'clients' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <p className="text-lg font-medium text-gray-900">
              {activeTab === 'clients' ? (
                <>El acceso a la plataforma es <span className="text-green-600 font-bold">100% gratuito</span> para clientes</>
              ) : (
                <>Prueba gratis por <span className="text-blue-600 font-bold">7 dias</span></>
              )}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {activeTab === 'clients'
                ? 'Busca, compara y contacta profesionales sin ningun costo'
                : 'Sin compromiso. Cancela cuando quieras.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
