import { Wrench, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const navigation = {
  platform: [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Profesionales', href: '#profesionales' },
    { name: 'Planes', href: '#planes' },
  ],
  company: [
    { name: 'Sobre Nosotros', href: '#' },
    { name: 'Modelo de Negocio', href: '#modelo' },
    { name: 'Blog', href: '#' },
    { name: 'Contacto', href: '#' },
  ],
  legal: [
    { name: 'Terminos y Condiciones', href: '#' },
    { name: 'Politica de Privacidad', href: '#' },
    { name: 'Politica de Cookies', href: '#' },
    { name: 'Proteccion de Datos', href: '#' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Twitter', href: '#', icon: Twitter },
  ],
}

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Servify</span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Marketplace de servicios profesionales que conecta trabajadores independientes 
              con hogares en Bucaramanga y su area metropolitana.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-900 mb-2">Suscribete a nuestro boletin</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 max-w-[200px] px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
                  Suscribir
                </button>
              </div>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Plataforma</h3>
            <ul className="mt-4 space-y-3">
              {navigation.platform.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Empresa</h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Contacto</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Calle 20 #31-23, Bucaramanga</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>contacto@servify.co</span>
              </li>
            </ul>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {navigation.social.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-white transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{item.name}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Servify S.A.S. Todos los derechos reservados.
            </p>
            <p className="text-sm text-muted-foreground">
              Codigo CIIU: 6201 - Actividades de desarrollo de sistemas informaticos
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
