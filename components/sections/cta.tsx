import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Briefcase } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Únete a Servify hoy
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Forma parte del marketplace de servicios profesionales #1 de Bucaramanga. 
              Ya sea que busques servicios o quieras ofrecer los tuyos.
            </p>
          </div>

          {/* Right content - CTAs */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-foreground/20 mb-4">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                Busco Servicios
              </h3>
              <p className="text-sm text-primary-foreground/70 mb-4">
                Acceso gratuito. Encuentra profesionales verificados cerca de ti.
              </p>
              <Button 
                variant="secondary" 
                className="w-full gap-2"
                asChild
              >
                <Link href="#servicios">
                  Explorar Servicios
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="p-6 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-foreground/20 mb-4">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                Soy Profesional
              </h3>
              <p className="text-sm text-primary-foreground/70 mb-4">
                Prueba gratis 7 días. Aumenta tus ingresos con nuevos clientes.
              </p>
              <Button 
                variant="outline" 
                className="w-full gap-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/20"
                asChild
              >
                <Link href="#planes">
                  Ver Planes
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
