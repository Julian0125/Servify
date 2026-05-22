"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Juan Pérez",
    role: "Plomero Independiente",
    avatar: "JP",
    rating: 5,
    text: "Desde que me uní a Servify, mis ingresos aumentaron un 40%. Antes dependía solo de referidos, ahora tengo clientes constantes cada semana.",
    type: "professional",
  },
  {
    id: 2,
    name: "María Rodríguez",
    role: "Cliente - Ama de casa",
    avatar: "MR",
    rating: 5,
    text: "Encontré un electricista excelente en menos de 10 minutos. Las reseñas me dieron confianza y el trabajo quedó perfecto. Muy recomendado.",
    type: "client",
  },
  {
    id: 3,
    name: "Andrés Gómez",
    role: "Diseñador Gráfico",
    avatar: "AG",
    rating: 5,
    text: "Como freelancer, conseguir clientes era mi mayor reto. Servify me permite mostrar mi portafolio y los clientes me contactan directamente.",
    type: "professional",
  },
  {
    id: 4,
    name: "Carolina Silva",
    role: "Cliente - Emprendedora",
    avatar: "CS",
    rating: 5,
    text: "Necesitaba un fotógrafo para mi negocio. Pude comparar precios, ver trabajos anteriores y elegir el mejor. El proceso fue muy transparente.",
    type: "client",
  },
  {
    id: 5,
    name: "Roberto Martínez",
    role: "Profesor Particular",
    avatar: "RM",
    rating: 5,
    text: "El plan Premium me puso primero en las búsquedas de mi zona. Ahora tengo más estudiantes de los que puedo atender.",
    type: "professional",
  },
  {
    id: 6,
    name: "Laura Herrera",
    role: "Cliente - Padre de familia",
    avatar: "LH",
    rating: 5,
    text: "Contraté un pintor para renovar mi casa. Ver las calificaciones de otros clientes me dio mucha tranquilidad. Excelente servicio.",
    type: "client",
  },
]

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header removed as requested */}

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="p-6">
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 h-8 w-8 text-muted-foreground/20" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-warning fill-warning"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <Badge
                    variant={testimonial.type === "professional" ? "default" : "secondary"}
                    className="ml-auto"
                  >
                    {testimonial.type === "professional" ? "Profesional" : "Cliente"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center p-6 rounded-lg bg-secondary">
            <p className="text-3xl font-bold text-foreground">4.9</p>
            <p className="text-sm text-muted-foreground mt-1">Calificación promedio</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-secondary">
            <p className="text-3xl font-bold text-foreground">95%</p>
            <p className="text-sm text-muted-foreground mt-1">Satisfacción</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-secondary">
            <p className="text-3xl font-bold text-foreground">500+</p>
            <p className="text-sm text-muted-foreground mt-1">Reseñas verificadas</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-secondary">
            <p className="text-3xl font-bold text-foreground">30 min</p>
            <p className="text-sm text-muted-foreground mt-1">Tiempo de respuesta</p>
          </div>
        </div>
      </div>
    </section>
  )
}
