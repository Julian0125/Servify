import { useState } from 'react'
import {
  Users, Target, TrendingUp, Wallet, Shield, MapPin, BarChart3, Building,
  Lightbulb, AlertTriangle, CheckCircle, DollarSign
} from 'lucide-react'
import type { BusinessMetrics } from '../../types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, Target, TrendingUp, Wallet, Shield, MapPin, CheckCircle, DollarSign
}

interface BusinessModelProps {
  metrics: BusinessMetrics
}

export function BusinessModel({ metrics }: BusinessModelProps) {
  const [activeTab, setActiveTab] = useState('propuesta')

  const tabs = [
    { id: 'propuesta', label: 'Propuesta' },
    { id: 'mercado', label: 'Mercado' },
    { id: 'ingresos', label: 'Ingresos' },
    { id: 'proyecciones', label: 'Proyecciones' },
    { id: 'inversiones', label: 'Inversiones' },
    { id: 'riesgos', label: 'Riesgos' },
  ]

  return (
    <section id="modelo" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
            Modelo de Negocio
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Plan de Negocio Servify
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Marketplace de Servicios Profesionales para conectar trabajadores independientes 
            con hogares en Bucaramanga y su area metropolitana.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Propuesta de Valor */}
          {activeTab === 'propuesta' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {metrics.valuePropositions.map((item) => {
                  const Icon = iconMap[item.icon] || MapPin
                  return (
                    <div key={item.title} className="p-6 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  )
                })}
              </div>

              <div className="p-6 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex items-start gap-4">
                  <Lightbulb className="h-8 w-8 text-blue-600 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Diferenciador Clave</h4>
                    <p className="text-gray-600">
                      A diferencia de plataformas globales como Workana, Fiverr o Upwork, 
                      Servify esta disenada para el contexto local colombiano, con enfasis en 
                      oficios del hogar y servicios de cercania.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analisis de Mercado */}
          {activeTab === 'mercado' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(metrics.marketData).map(([key, data]) => (
                  <div key={key} className="p-6 rounded-xl border border-gray-100">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full mb-4">
                      {data.label}
                    </span>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Profesionales</p>
                        <p className="text-2xl font-bold text-gray-900">{data.professionals}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Hogares</p>
                        <p className="text-2xl font-bold text-blue-600">{data.households}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Contexto del Mercado</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-3xl font-bold text-gray-900">77%+</p>
                    <p className="text-sm text-gray-600">Poblacion colombiana con acceso a internet</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-3xl font-bold text-gray-900">55%+</p>
                    <p className="text-sm text-gray-600">Trabajadores en condiciones de informalidad</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-3xl font-bold text-gray-900">623,000</p>
                    <p className="text-sm text-gray-600">Personas ocupadas en el AMB</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-3xl font-bold text-gray-900">44.2%</p>
                    <p className="text-sm text-gray-600">Tasa de informalidad laboral en AMB</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fuentes de Ingresos */}
          {activeTab === 'ingresos' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {metrics.revenueStreams.map((stream) => {
                  const Icon = iconMap[stream.icon] || Wallet
                  return (
                    <div key={stream.title} className="p-6 rounded-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                          <Icon className="h-6 w-6 text-green-600" />
                        </div>
                        <span className="text-lg font-bold text-gray-900">{stream.percentage}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{stream.title}</h4>
                      <p className="text-sm text-gray-600">{stream.description}</p>
                    </div>
                  )
                })}
              </div>

              <div className="p-6 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Estructura de Precios</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Plan Basico</h4>
                    <p className="text-2xl font-bold text-gray-900">$30,000 - $40,000 COP/mes</p>
                    <p className="text-sm text-gray-600">
                      Perfil visible, 5 fotos, posicionamiento estandar, insignia de verificado.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Plan Premium</h4>
                    <p className="text-2xl font-bold text-blue-600">$55,000 - $70,000 COP/mes</p>
                    <p className="text-sm text-gray-600">
                      Mayor visibilidad, 20 fotos, posicionamiento destacado, estadisticas, soporte prioritario.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Proyecciones */}
          {activeTab === 'proyecciones' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Periodo</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Ingresos Estimados</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Suscriptores</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.projections.map((row, index) => (
                      <tr key={row.period} className={index !== metrics.projections.length - 1 ? 'border-b border-gray-200' : ''}>
                        <td className="py-3 px-4 font-medium text-gray-900">{row.period}</td>
                        <td className="py-3 px-4 text-blue-600 font-semibold">{row.revenue}</td>
                        <td className="py-3 px-4 text-gray-600">{row.subscribers} profesionales</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Periodo de Arranque</h4>
                  <p className="text-3xl font-bold text-gray-900 mb-2">3 meses</p>
                  <p className="text-sm text-gray-600">
                    Constitucion legal, desarrollo MVP, incorporacion del primer grupo de profesionales.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Punto de Equilibrio</h4>
                  <p className="text-3xl font-bold text-green-600 mb-2">5-8 meses</p>
                  <p className="text-sm text-gray-600">
                    Horizonte proyectado para que los ingresos mensuales cubran costos operativos.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Inversiones */}
          {activeTab === 'inversiones' && (
            <div className="space-y-6">
              <div className="space-y-3">
                {metrics.investments.map((item) => (
                  <div 
                    key={item.concept}
                    className="flex items-center justify-between py-3 px-4 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-600">{item.concept}</span>
                    <span className="font-semibold text-gray-900">{item.amount}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">TOTAL INVERSION INICIAL</span>
                  <span className="text-xl font-bold text-blue-600">$23.9M - $43.2M COP</span>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Building className="h-5 w-5 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Fuentes de Financiacion</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-1">Recursos Propios</h4>
                    <p className="text-sm text-gray-600">40-50% de la inversion inicial</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-1">Convocatorias Publicas</h4>
                    <p className="text-sm text-gray-600">iNNpulsa, Fondo Emprender, SENA</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-1">Angeles Inversionistas</h4>
                    <p className="text-sm text-gray-600">Capital semilla a cambio de participacion</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-1">Credito de Fomento</h4>
                    <p className="text-sm text-gray-600">Bancoldex y lineas para startups</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Riesgos */}
          {activeTab === 'riesgos' && (
            <div className="space-y-4">
              {metrics.risks.map((item) => (
                <div key={item.risk} className="p-6 rounded-xl border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-3 md:w-1/3">
                      <AlertTriangle className={`h-5 w-5 shrink-0 ${
                        item.level === 'Alto' ? 'text-red-500' : 'text-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{item.risk}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${
                          item.level === 'Alto' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.level}
                        </span>
                      </div>
                    </div>
                    <div className="md:w-2/3 md:pl-4 md:border-l border-gray-100">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">Mitigacion: </span>
                        {item.mitigation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
