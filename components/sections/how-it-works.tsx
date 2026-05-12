"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  UserPlus,
  Search,
  MessageSquare,
  Star,
  FileCheck,
  CreditCard,
  Users,
  TrendingUp,
} from "lucide-react"

const clientSteps = [
  {
    step: 1,
    title: "Busca el servicio",
    description: "Explora las categorías o usa el buscador para encontrar el profesional que necesitas.",
    icon: Search,
  },
  {
    step: 2,
    title: "Compara perfiles",
    description: "Revisa portafolios, calificaciones, reseñas y precios de múltiples profesionales.",
    icon: Users,
  },
  {
    step: 3,
    title: "Contacta al profesional",
    description: "Envía un mensaje o llama directamente al profesional que elijas.",
    icon: MessageSquare,
  },
  {
    step: 4,
    title: "Califica el servicio",
    description: "Después del trabajo, deja tu reseña para ayudar a otros usuarios.",
    icon: Star,
  },
]

const professionalSteps = [
  {
    step: 1,
    title: "Regístrate en la plataforma",
    description: "Crea tu cuenta y completa tu perfil con información profesional.",
    icon: UserPlus,
  },
  {
    step: 2,
    title: "Verifica tu identidad",
    description: "Sube tus documentos para obtener la insignia de profesional verificado.",
    icon: FileCheck,
  },
  {
    step: 3,
    title: "Elige tu plan",
    description: "Selecciona el plan de suscripción que mejor se adapte a tus necesidades.",
    icon: CreditCard,
  },
  {
    step: 4,
    title: "Recibe clientes",
    description: "Tu perfil estará visible y comenzarás a recibir contactos de clientes.",
    icon: TrendingUp,
  },
]

function StepCard({ step, isLast }: { step: typeof clientSteps[0]; isLast: boolean }) {
  const Icon = step.icon

  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Connector line */}
      {!isLast && (
        <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border" />
      )}

      {/* Step number */}
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold shadow-lg">
        {step.step}
      </div>

      {/* Icon */}
      <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
        <Icon className="h-6 w-6 text-foreground" />
      </div>

      {/* Content */}
      <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-xs">{step.description}</p>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">Cómo Funciona</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, rápido y seguro
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Conectamos profesionales con clientes en pocos pasos
          </p>
        </div>

        <Tabs defaultValue="clients" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="clients">Para Clientes</TabsTrigger>
            <TabsTrigger value="professionals">Para Profesionales</TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-8">
                  {clientSteps.map((step, index) => (
                    <StepCard
                      key={step.step}
                      step={step}
                      isLast={index === clientSteps.length - 1}
                    />
                  ))}
                </div>

                <div className="mt-12 p-6 rounded-lg bg-accent/10 border border-accent/20 text-center">
                  <p className="text-lg font-medium text-foreground">
                    El acceso a la plataforma es{" "}
                    <span className="text-accent font-bold">100% gratuito</span> para clientes
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Busca, compara y contacta profesionales sin ningún costo
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professionals">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-8">
                  {professionalSteps.map((step, index) => (
                    <StepCard
                      key={step.step}
                      step={step}
                      isLast={index === professionalSteps.length - 1}
                    />
                  ))}
                </div>

                <div className="mt-12 p-6 rounded-lg bg-primary/10 border border-primary/20 text-center">
                  <p className="text-lg font-medium text-foreground">
                    Prueba gratis por{" "}
                    <span className="text-primary font-bold">7 días</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Sin compromiso. Cancela cuando quieras.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
