"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Wrench,
  Zap,
  Paintbrush,
  GraduationCap,
  Home,
  Camera,
  Code,
  Scissors,
  Search,
  MapPin,
  SlidersHorizontal,
} from "lucide-react"

const categories = [
  { id: "plomeria", name: "Plomería", icon: Wrench, count: 45, color: "bg-blue-500" },
  { id: "electricidad", name: "Electricidad", icon: Zap, count: 38, color: "bg-yellow-500" },
  { id: "pintura", name: "Pintura", icon: Paintbrush, count: 52, color: "bg-pink-500" },
  { id: "clases", name: "Clases Particulares", icon: GraduationCap, count: 67, color: "bg-green-500" },
  { id: "limpieza", name: "Limpieza", icon: Home, count: 89, color: "bg-cyan-500" },
  { id: "fotografia", name: "Fotografía", icon: Camera, count: 34, color: "bg-purple-500" },
  { id: "programacion", name: "Programación", icon: Code, count: 41, color: "bg-orange-500" },
  { id: "belleza", name: "Belleza", icon: Scissors, count: 56, color: "bg-rose-500" },
]

const locations = [
  "Todas las zonas",
  "Bucaramanga Centro",
  "Cabecera",
  "San Alonso",
  "Floridablanca",
  "Girón",
  "Piedecuesta",
]

export function ServiceCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("Todas las zonas")

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section id="servicios" className="py-16 lg:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">Categorías de Servicio</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Encuentra el servicio que necesitas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explora nuestras categorías y encuentra profesionales verificados cerca de ti
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar servicios..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[200px]">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Ubicación" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCategories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.id

            return (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                  isSelected ? "ring-2 ring-primary shadow-lg" : ""
                }`}
                onClick={() => setSelectedCategory(isSelected ? null : category.id)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${category.color}`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.count} profesionales
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* View all button */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Ver todas las categorías
          </Button>
        </div>
      </div>
    </section>
  )
}
