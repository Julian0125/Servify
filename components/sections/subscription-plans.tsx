"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Check, Crown, Sparkles, Zap } from "lucide-react"

const plans = [
  {
    id: "basico",
    name: "Plan Básico",
    icon: Zap,
    description: "Ideal para comenzar a conseguir clientes",
    monthlyPrice: 35000,
    yearlyPrice: 306000,
    features: [
      "Perfil verificado en la plataforma",
      "Hasta 5 fotos en portafolio",
      "Posicionamiento estándar en búsquedas",
      "Insignia de verificado",
      "Notificaciones de contactos",
      "Soporte por correo electrónico",
    ],
    highlighted: false,
    cta: "Comenzar Gratis",
  },
  {
    id: "premium",
    name: "Plan Premium",
    icon: Crown,
    description: "Mayor visibilidad y más oportunidades",
    monthlyPrice: 62500,
    yearlyPrice: 637500,
    features: [
      "Todo lo del Plan Básico",
      "Hasta 20 fotos en portafolio",
      "Posicionamiento destacado",
      "Sello Premium visible",
      "Estadísticas de perfil (visitas, contactos)",
      "Soporte prioritario",
      "Apareces primero en tu zona",
      "Badge de profesional premium",
    ],
    highlighted: true,
    cta: "Elegir Premium",
  },
  {
    id: "enterprise",
    name: "Plan Empresarial",
    icon: Sparkles,
    description: "Para equipos y empresas de servicios",
    monthlyPrice: 150000,
    yearlyPrice: 1530000,
    features: [
      "Todo lo del Plan Premium",
      "Múltiples perfiles de empleados",
      "Dashboard de administración",
      "Reportes avanzados",
      "API de integración",
      "Account manager dedicado",
      "Facturación empresarial",
      "Onboarding personalizado",
    ],
    highlighted: false,
    cta: "Contactar Ventas",
  },
]

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function SubscriptionPlans() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="planes" className="py-16 lg:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">Planes de Suscripción</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Elige el plan perfecto para ti
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Suscríbete y comienza a recibir clientes desde el primer día. 
            Acceso gratuito para clientes que buscan servicios.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Label 
              htmlFor="billing-toggle" 
              className={!isYearly ? "font-medium text-foreground" : "text-muted-foreground"}
            >
              Mensual
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label 
              htmlFor="billing-toggle" 
              className={isYearly ? "font-medium text-foreground" : "text-muted-foreground"}
            >
              Anual
              <Badge variant="secondary" className="ml-2">
                Ahorra 15%
              </Badge>
            </Label>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice

            return (
              <Card 
                key={plan.id}
                className={`relative flex flex-col ${
                  plan.highlighted 
                    ? "border-primary shadow-lg scale-105 z-10" 
                    : "border-border"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Más Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${
                    plan.highlighted ? "bg-primary" : "bg-secondary"
                  }`}>
                    <Icon className={`h-7 w-7 ${
                      plan.highlighted ? "text-primary-foreground" : "text-foreground"
                    }`} />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-foreground">
                      {formatPrice(price)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isYearly ? "/año" : "/mes"}
                    </p>
                    {isYearly && (
                      <p className="text-xs text-accent mt-1">
                        {formatPrice(price / 12)}/mes facturado anualmente
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4">
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Additional info */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Todos los planes incluyen período de prueba gratuito de 7 días. 
            Cancela cuando quieras sin penalizaciones.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Check className="h-4 w-4 text-accent" />
              Sin compromiso
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <Check className="h-4 w-4 text-accent" />
              Facturación electrónica
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <Check className="h-4 w-4 text-accent" />
              Múltiples métodos de pago
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
