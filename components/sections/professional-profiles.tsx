"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Star,
  MapPin,
  Clock,
  Shield,
  MessageSquare,
  Phone,
  ChevronLeft,
  ChevronRight,
  Crown,
} from "lucide-react"

interface Professional {
  id: string
  name: string
  profession: string
  avatar: string
  rating: number
  reviews: number
  location: string
  distance: string
  verified: boolean
  premium: boolean
  responseTime: string
  hourlyRate: string
  description: string
  skills: string[]
}

const professionals: Professional[] = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    profession: "Plomero Profesional",
    avatar: "CR",
    rating: 4.9,
    reviews: 127,
    location: "San Alonso, Bucaramanga",
    distance: "1.2 km",
    verified: true,
    premium: true,
    responseTime: "Responde en 30 min",
    hourlyRate: "$45.000/hora",
    description: "Plomero con 15 años de experiencia. Especialista en instalaciones, reparaciones y mantenimiento de sistemas hidráulicos.",
    skills: ["Instalaciones", "Reparaciones", "Mantenimiento"],
  },
  {
    id: "2",
    name: "María González",
    profession: "Electricista Certificada",
    avatar: "MG",
    rating: 4.8,
    reviews: 89,
    location: "Cabecera, Bucaramanga",
    distance: "2.5 km",
    verified: true,
    premium: true,
    responseTime: "Responde en 1 hora",
    hourlyRate: "$50.000/hora",
    description: "Electricista certificada con experiencia en instalaciones residenciales y comerciales. Trabajo garantizado.",
    skills: ["Instalaciones", "Emergencias", "Iluminación"],
  },
  {
    id: "3",
    name: "Andrés Martínez",
    profession: "Diseñador Gráfico",
    avatar: "AM",
    rating: 4.7,
    reviews: 64,
    location: "Centro, Bucaramanga",
    distance: "3.1 km",
    verified: true,
    premium: false,
    responseTime: "Responde en 2 horas",
    hourlyRate: "$35.000/hora",
    description: "Diseñador gráfico freelance especializado en branding, logos y material publicitario para emprendedores.",
    skills: ["Branding", "Logos", "Social Media"],
  },
  {
    id: "4",
    name: "Laura Pérez",
    profession: "Profesora de Matemáticas",
    avatar: "LP",
    rating: 5.0,
    reviews: 156,
    location: "Floridablanca",
    distance: "4.8 km",
    verified: true,
    premium: true,
    responseTime: "Responde en 15 min",
    hourlyRate: "$40.000/hora",
    description: "Profesora de matemáticas con metodología personalizada. Preparo estudiantes para ICFES y universidades.",
    skills: ["ICFES", "Universitario", "Bachillerato"],
  },
  {
    id: "5",
    name: "Roberto Silva",
    profession: "Pintor Profesional",
    avatar: "RS",
    rating: 4.6,
    reviews: 45,
    location: "Girón",
    distance: "5.2 km",
    verified: true,
    premium: false,
    responseTime: "Responde en 3 horas",
    hourlyRate: "$30.000/hora",
    description: "Pintor profesional con más de 10 años de experiencia en pintura de interiores y exteriores.",
    skills: ["Interiores", "Exteriores", "Acabados"],
  },
  {
    id: "6",
    name: "Diana Castro",
    profession: "Fotógrafa",
    avatar: "DC",
    rating: 4.9,
    reviews: 78,
    location: "Piedecuesta",
    distance: "6.1 km",
    verified: true,
    premium: true,
    responseTime: "Responde en 1 hora",
    hourlyRate: "$80.000/sesión",
    description: "Fotógrafa profesional especializada en eventos, retratos y fotografía de producto para emprendedores.",
    skills: ["Eventos", "Retratos", "Producto"],
  },
]

function ProfessionalCard({ professional }: { professional: Professional }) {
  return (
    <Card className={`h-full flex flex-col transition-all hover:shadow-lg ${professional.premium ? "border-primary/50" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-14 w-14 border-2 border-background shadow-md">
                <AvatarImage src={`/avatars/${professional.id}.jpg`} alt={professional.name} />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {professional.avatar}
                </AvatarFallback>
              </Avatar>
              {professional.verified && (
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-accent flex items-center justify-center">
                  <Shield className="h-3 w-3 text-accent-foreground" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{professional.name}</h3>
                {professional.premium && (
                  <Crown className="h-4 w-4 text-warning" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{professional.profession}</p>
            </div>
          </div>
          <Badge variant={professional.premium ? "default" : "secondary"} className="shrink-0">
            {professional.hourlyRate}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {professional.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {professional.skills.map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star className="h-4 w-4 text-warning fill-warning" />
            <span className="font-medium text-foreground">{professional.rating}</span>
            <span>({professional.reviews} reseñas)</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{professional.location}</span>
            <span className="text-primary font-medium">• {professional.distance}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{professional.responseTime}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t gap-2">
        <Button variant="outline" size="sm" className="flex-1 gap-2">
          <MessageSquare className="h-4 w-4" />
          Mensaje
        </Button>
        <Button size="sm" className="flex-1 gap-2">
          <Phone className="h-4 w-4" />
          Contactar
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ProfessionalProfiles() {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(professionals.length / itemsPerPage)

  const currentProfessionals = professionals.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  return (
    <section id="profesionales" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <Badge variant="outline" className="mb-4">Profesionales Destacados</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Los mejor calificados cerca de ti
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Profesionales verificados con las mejores reseñas de la comunidad. 
              Ordenados por cercanía y calificación.
            </p>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground px-2">
              {currentPage + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Professionals grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProfessionals.map((professional) => (
            <ProfessionalCard key={professional.id} professional={professional} />
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Ver todos los profesionales
          </Button>
        </div>
      </div>
    </section>
  )
}
