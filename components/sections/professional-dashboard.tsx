"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  MessageSquare,
  Phone,
  Star,
  TrendingUp,
  Calendar,
  Clock,
  Users,
  Crown,
  Settings,
  Bell,
  Image,
  FileText,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

const stats = [
  {
    title: "Visitas al Perfil",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Eye,
    description: "Este mes",
  },
  {
    title: "Contactos Recibidos",
    value: "89",
    change: "+8%",
    trend: "up",
    icon: MessageSquare,
    description: "Este mes",
  },
  {
    title: "Llamadas",
    value: "45",
    change: "-3%",
    trend: "down",
    icon: Phone,
    description: "Este mes",
  },
  {
    title: "Calificación",
    value: "4.9",
    change: "+0.1",
    trend: "up",
    icon: Star,
    description: "Promedio general",
  },
]

const recentContacts = [
  {
    id: 1,
    name: "María García",
    service: "Instalación de grifería",
    date: "Hace 2 horas",
    status: "pending",
  },
  {
    id: 2,
    name: "Carlos López",
    service: "Reparación de tubería",
    date: "Hace 5 horas",
    status: "contacted",
  },
  {
    id: 3,
    name: "Ana Martínez",
    service: "Mantenimiento general",
    date: "Ayer",
    status: "completed",
  },
  {
    id: 4,
    name: "Roberto Sánchez",
    service: "Emergencia plomería",
    date: "Hace 2 días",
    status: "completed",
  },
]

const recentReviews = [
  {
    id: 1,
    name: "Patricia Ruiz",
    rating: 5,
    comment: "Excelente trabajo, muy profesional y puntual. Lo recomiendo.",
    date: "Hace 1 día",
  },
  {
    id: 2,
    name: "Fernando Díaz",
    rating: 5,
    comment: "Solucionó el problema rápidamente. Muy buen precio.",
    date: "Hace 3 días",
  },
  {
    id: 3,
    name: "Lucía Hernández",
    rating: 4,
    comment: "Buen servicio, aunque llegó un poco tarde.",
    date: "Hace 5 días",
  },
]

const weeklyData = [
  { day: "Lun", visits: 45 },
  { day: "Mar", visits: 52 },
  { day: "Mié", visits: 38 },
  { day: "Jue", visits: 65 },
  { day: "Vie", visits: 72 },
  { day: "Sáb", visits: 48 },
  { day: "Dom", visits: 30 },
]

const maxVisits = Math.max(...weeklyData.map((d) => d.visits))

export function ProfessionalDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <section id="dashboard" className="py-16 lg:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">Panel de Control</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Dashboard para Profesionales
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Gestiona tu perfil, revisa estadísticas y administra tus contactos desde un solo lugar
          </p>
        </div>

        {/* Dashboard mockup */}
        <Card className="overflow-hidden border-2">
          {/* Dashboard header */}
          <div className="bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">CR</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">Carlos Rodríguez</h3>
                    <Crown className="h-4 w-4 text-warning" />
                    <Badge variant="default" className="text-xs">Premium</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Plomero Profesional</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="contacts">Contactos</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                <TabsTrigger value="profile">Mi Perfil</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Stats grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <Card key={stat.title}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${
                              stat.trend === "up" ? "text-accent" : "text-destructive"
                            }`}>
                              {stat.trend === "up" ? (
                                <ArrowUp className="h-3 w-3" />
                              ) : (
                                <ArrowDown className="h-3 w-3" />
                              )}
                              {stat.change}
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.title}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {/* Charts and activity */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Weekly chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Visitas esta semana
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between gap-2 h-40">
                        {weeklyData.map((data) => (
                          <div key={data.day} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-primary rounded-t transition-all"
                              style={{ height: `${(data.visits / maxVisits) * 100}%` }}
                            />
                            <span className="text-xs text-muted-foreground">{data.day}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Actividad reciente
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentContacts.slice(0, 4).map((contact) => (
                          <div key={contact.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs bg-secondary">
                                  {contact.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-foreground">{contact.name}</p>
                                <p className="text-xs text-muted-foreground">{contact.service}</p>
                              </div>
                            </div>
                            <Badge 
                              variant={
                                contact.status === "pending" ? "secondary" :
                                contact.status === "contacted" ? "outline" : "default"
                              }
                              className="text-xs"
                            >
                              {contact.status === "pending" ? "Pendiente" :
                               contact.status === "contacted" ? "Contactado" : "Completado"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Profile completion */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-foreground">Completa tu perfil</h4>
                        <p className="text-sm text-muted-foreground">Un perfil completo genera más confianza</p>
                      </div>
                      <span className="text-2xl font-bold text-primary">85%</span>
                    </div>
                    <Progress value={85} className="h-2 mb-4" />
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Image className="h-4 w-4" />
                        Añadir más fotos
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Completar descripción
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contacts Tab */}
              <TabsContent value="contacts" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Contactos recientes</h3>
                  <Badge variant="secondary">{recentContacts.length} nuevos</Badge>
                </div>
                {recentContacts.map((contact) => (
                  <Card key={contact.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-secondary">
                              {contact.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{contact.name}</p>
                            <p className="text-sm text-muted-foreground">{contact.service}</p>
                            <p className="text-xs text-muted-foreground">{contact.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={
                              contact.status === "pending" ? "secondary" :
                              contact.status === "contacted" ? "outline" : "default"
                            }
                          >
                            {contact.status === "pending" ? "Pendiente" :
                             contact.status === "contacted" ? "Contactado" : "Completado"}
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Últimas reseñas</h3>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-warning fill-warning" />
                    <span className="font-bold text-foreground">4.9</span>
                    <span className="text-sm text-muted-foreground">(127 reseñas)</span>
                  </div>
                </div>
                {recentReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-secondary">
                              {review.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{review.name}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-warning fill-warning" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">&ldquo;{review.comment}&rdquo;</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información del Perfil</CardTitle>
                    <CardDescription>Gestiona la información que ven tus clientes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Nombre</p>
                        <p className="font-medium text-foreground">Carlos Rodríguez</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Profesión</p>
                        <p className="font-medium text-foreground">Plomero Profesional</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Ubicación</p>
                        <p className="font-medium text-foreground">San Alonso, Bucaramanga</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Tarifa</p>
                        <p className="font-medium text-foreground">$45,000/hora</p>
                      </div>
                    </div>
                    <Button className="gap-2">
                      <Settings className="h-4 w-4" />
                      Editar Perfil
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Plan Actual</CardTitle>
                    <CardDescription>Tu suscripción y beneficios</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex items-center gap-3">
                        <Crown className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-semibold text-foreground">Plan Premium</p>
                          <p className="text-sm text-muted-foreground">Renovación: 15 de Julio, 2026</p>
                        </div>
                      </div>
                      <Button variant="outline">Gestionar Plan</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
