"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

const stats = [
  { value: "79,450+", label: "Profesionales potenciales" },
  { value: "276,556", label: "Hogares en el AMB" },
  { value: "4.9", label: "Calificación promedio" },
  { value: "24/7", label: "Disponibilidad" },
]

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/10 blur-3xl rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Marketplace #1 en Bucaramanga
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Conecta con{" "}
              <span className="text-primary">profesionales</span>{" "}
              de confianza cerca de ti
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Servify es la plataforma que conecta profesionales independientes verificados 
              con hogares que necesitan servicios confiables. Plomeros, electricistas, 
              diseñadores y más, a solo un clic de distancia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="gap-2">
                <Link href="#servicios">
                  Buscar Profesionales
                  <Search className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <Link href="#planes">
                  Soy Profesional
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-accent" />
                <span>Perfiles verificados</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-5 w-5 text-warning" />
                <span>Reseñas reales</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Cerca de ti</span>
              </div>
            </div>
          </div>

          {/* Right content - Stats cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl bg-card p-6 shadow-lg border border-border/50 ${
                    index === 0 ? "col-span-2" : ""
                  }`}
                >
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-full px-4 py-2 text-sm font-medium shadow-lg">
              Gratis para clientes
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
