"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Target,
  TrendingUp,
  Wallet,
  Shield,
  MapPin,
  BarChart3,
  Building,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  DollarSign,
} from "lucide-react"

const valueProposition = [
  {
    title: "Enfoque 100% Local",
    description: "Conectamos profesionales y clientes dentro de la misma ciudad o barrio, reduciendo tiempos de desplazamiento.",
    icon: MapPin,
  },
  {
    title: "Verificación de Perfiles",
    description: "Los profesionales completan un proceso de validación de identidad y experiencia antes de aparecer.",
    icon: Shield,
  },
  {
    title: "Reseñas Verificadas",
    description: "Solo usuarios que hayan efectuado un contacto registrado pueden calificar al profesional.",
    icon: CheckCircle,
  },
  {
    title: "Acceso Gratuito para Clientes",
    description: "Los consumidores no pagan nada para buscar, comparar y contactar profesionales.",
    icon: Users,
  },
]

const marketData = {
  tam: { professionals: "79,450", households: "276,556", label: "TAM - Mercado Total" },
  sam: { professionals: "23,835", households: "55,311", label: "SAM - Mercado Direccionable" },
  som: { professionals: "~143", households: "~166", label: "SOM - Objetivo Año 1" },
}

const revenueStreams = [
  {
    title: "Suscripciones Mensuales",
    description: "Fuente principal de ingresos. Profesionales pagan una tarifa mensual según el plan elegido.",
    percentage: "70%",
    icon: Wallet,
  },
  {
    title: "Suscripciones Anuales",
    description: "Pago anual con descuento del 15% como incentivo de permanencia.",
    percentage: "20%",
    icon: TrendingUp,
  },
  {
    title: "Visibilidad Adicional",
    description: "Espacios de publicidad destacada para profesionales que deseen mayor exposición.",
    percentage: "10%",
    icon: Target,
  },
]

const projections = [
  { period: "Mes 3", revenue: "$500K - $900K", subscribers: "20-30" },
  { period: "Mes 6", revenue: "$1.5M - $2.5M", subscribers: "50-65" },
  { period: "Mes 9", revenue: "$2.8M - $4.2M", subscribers: "80-100" },
  { period: "Año 1", revenue: "$4.5M - $6M", subscribers: "120-150" },
  { period: "Año 2", revenue: "$80M - $130M (anual)", subscribers: "200-260" },
]

const risks = [
  {
    risk: "Bajo número de profesionales suscritos",
    level: "Alto",
    mitigation: "Período de acceso gratuito inicial y alianzas con asociaciones de oficios.",
  },
  {
    risk: "Baja adopción por clientes finales",
    level: "Alto",
    mitigation: "Campañas de marketing digital y estrategia de referidos.",
  },
  {
    risk: "Competidor con mayor músculo financiero",
    level: "Medio",
    mitigation: "Construcción rápida de comunidad local y diferenciación por precio.",
  },
  {
    risk: "Problemas técnicos en la plataforma",
    level: "Medio",
    mitigation: "Pruebas exhaustivas y acuerdos de mantenimiento.",
  },
]

const investments = [
  { concept: "Desarrollo MVP (web + app)", amount: "$8M - $15M" },
  { concept: "Diseño de marca e identidad", amount: "$1M - $2M" },
  { concept: "Trámites legales", amount: "$400K - $700K" },
  { concept: "Registro de marca SIC", amount: "$700K - $1M" },
  { concept: "Equipos de cómputo", amount: "$3.5M - $5M" },
  { concept: "Capital de trabajo (3 meses)", amount: "$8M - $15M" },
  { concept: "Marketing de lanzamiento", amount: "$1.5M - $3M" },
]

export function BusinessModel() {
  return (
    <section id="modelo" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">Modelo de Negocio</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Plan de Negocio Servify
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Marketplace de Servicios Profesionales para conectar trabajadores independientes 
            con hogares en Bucaramanga y su área metropolitana.
          </p>
        </div>

        <Tabs defaultValue="propuesta" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto gap-2">
            <TabsTrigger value="propuesta" className="text-xs sm:text-sm">Propuesta</TabsTrigger>
            <TabsTrigger value="mercado" className="text-xs sm:text-sm">Mercado</TabsTrigger>
            <TabsTrigger value="ingresos" className="text-xs sm:text-sm">Ingresos</TabsTrigger>
            <TabsTrigger value="proyecciones" className="text-xs sm:text-sm">Proyecciones</TabsTrigger>
            <TabsTrigger value="inversiones" className="text-xs sm:text-sm">Inversiones</TabsTrigger>
            <TabsTrigger value="riesgos" className="text-xs sm:text-sm">Riesgos</TabsTrigger>
          </TabsList>

          {/* Propuesta de Valor */}
          <TabsContent value="propuesta" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {valueProposition.map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.title}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Lightbulb className="h-8 w-8 text-primary shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Diferenciador Clave</h4>
                    <p className="text-muted-foreground">
                      A diferencia de plataformas globales como Workana, Fiverr o Upwork (enfocadas en servicios 
                      digitales), Servify está diseñada para el contexto local colombiano, con énfasis en oficios 
                      del hogar y servicios de cercanía.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análisis de Mercado */}
          <TabsContent value="mercado" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(marketData).map(([key, data]) => (
                <Card key={key}>
                  <CardHeader className="pb-3">
                    <Badge variant="outline" className="w-fit">{data.label}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Profesionales</p>
                      <p className="text-2xl font-bold text-foreground">{data.professionals}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hogares</p>
                      <p className="text-2xl font-bold text-primary">{data.households}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Contexto del Mercado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-3xl font-bold text-foreground">77%+</p>
                    <p className="text-sm text-muted-foreground">Población colombiana con acceso a internet</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-3xl font-bold text-foreground">55%+</p>
                    <p className="text-sm text-muted-foreground">Trabajadores en condiciones de informalidad</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-3xl font-bold text-foreground">623,000</p>
                    <p className="text-sm text-muted-foreground">Personas ocupadas en el AMB</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-3xl font-bold text-foreground">44.2%</p>
                    <p className="text-sm text-muted-foreground">Tasa de informalidad laboral en AMB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fuentes de Ingresos */}
          <TabsContent value="ingresos" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {revenueStreams.map((stream) => {
                const Icon = stream.icon
                return (
                  <Card key={stream.title}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <Badge variant="secondary" className="text-lg font-bold">
                          {stream.percentage}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold text-foreground mb-2">{stream.title}</h4>
                      <p className="text-sm text-muted-foreground">{stream.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Estructura de Precios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Plan Básico</h4>
                    <p className="text-2xl font-bold text-foreground">$30,000 - $40,000 COP/mes</p>
                    <p className="text-sm text-muted-foreground">
                      Perfil visible, 5 fotos, posicionamiento estándar, insignia de verificado.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Plan Premium</h4>
                    <p className="text-2xl font-bold text-primary">$55,000 - $70,000 COP/mes</p>
                    <p className="text-sm text-muted-foreground">
                      Mayor visibilidad, 20 fotos, posicionamiento destacado, estadísticas, soporte prioritario.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Proyecciones */}
          <TabsContent value="proyecciones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Proyección de Ingresos y Crecimiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Período</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ingresos Estimados</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Suscriptores</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projections.map((row, index) => (
                        <tr key={row.period} className={index !== projections.length - 1 ? "border-b border-border" : ""}>
                          <td className="py-3 px-4 font-medium text-foreground">{row.period}</td>
                          <td className="py-3 px-4 text-primary font-semibold">{row.revenue}</td>
                          <td className="py-3 px-4 text-muted-foreground">{row.subscribers} profesionales</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  * Proyecciones basadas en escenario conservador con crecimiento mensual gradual y mezcla de 75% Plan Básico / 25% Plan Premium.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Período de Arranque</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground mb-2">3 meses</p>
                  <p className="text-sm text-muted-foreground">
                    Constitución legal, desarrollo MVP, incorporación del primer grupo de profesionales, 
                    configuración de pasarela de pagos.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Punto de Equilibrio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent mb-2">5-8 meses</p>
                  <p className="text-sm text-muted-foreground">
                    Horizonte proyectado para que los ingresos mensuales cubran costos y gastos operativos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Inversiones */}
          <TabsContent value="inversiones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Inversión Inicial Requerida
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {investments.map((item) => (
                    <div 
                      key={item.concept} 
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground">{item.concept}</span>
                      <span className="font-semibold text-foreground">{item.amount}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">TOTAL INVERSIÓN INICIAL</span>
                    <span className="text-xl font-bold text-primary">$23.9M - $43.2M COP</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fuentes de Financiación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary">
                    <h4 className="font-medium text-foreground mb-1">Recursos Propios</h4>
                    <p className="text-sm text-muted-foreground">40-50% de la inversión inicial</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary">
                    <h4 className="font-medium text-foreground mb-1">Convocatorias Públicas</h4>
                    <p className="text-sm text-muted-foreground">iNNpulsa, Fondo Emprender, SENA</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary">
                    <h4 className="font-medium text-foreground mb-1">Ángeles Inversionistas</h4>
                    <p className="text-sm text-muted-foreground">Capital semilla a cambio de participación</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary">
                    <h4 className="font-medium text-foreground mb-1">Crédito de Fomento</h4>
                    <p className="text-sm text-muted-foreground">Bancoldex y líneas para startups</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Riesgos */}
          <TabsContent value="riesgos" className="space-y-6">
            <div className="space-y-4">
              {risks.map((item) => (
                <Card key={item.risk}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-3 md:w-1/3">
                        <AlertTriangle className={`h-5 w-5 shrink-0 ${
                          item.level === "Alto" ? "text-destructive" : "text-warning"
                        }`} />
                        <div>
                          <p className="font-medium text-foreground">{item.risk}</p>
                          <Badge variant={item.level === "Alto" ? "destructive" : "secondary"} className="mt-1">
                            {item.level}
                          </Badge>
                        </div>
                      </div>
                      <div className="md:w-2/3 md:pl-4 md:border-l border-border">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Mitigación: </span>
                          {item.mitigation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
