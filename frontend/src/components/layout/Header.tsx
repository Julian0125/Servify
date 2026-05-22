import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Profesionales', href: '#profesionales' },
  { name: 'Planes', href: '#planes' },
  { name: 'Modelo de Negocio', href: '#modelo' },
]

interface HeaderProps {
  user?: { name?: string } | null
  onLogout?: () => void
}

export function Header({ user, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
            <img
              src="/logo.png"
              alt="Servify"
              className="h-10 w-10 rounded-lg object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement
                if (target.src.indexOf('/logo.svg') === -1) target.src = '/logo.svg'
              }}
            />
            <span className="text-xl font-bold text-gray-900">Servify</span>
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menu principal</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a href="#admin" className="text-sm font-medium text-gray-600 hover:text-gray-900">Admin</a>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {user ? (
            <div className="flex items-center gap-3">
              <a href="#profile" className="text-sm font-medium text-gray-700">{user.name || 'Cuenta'}</a>
              <button onClick={onLogout} className="px-3 py-2 text-sm font-medium text-gray-700 border rounded-md">Cerrar</button>
            </div>
          ) : (
            <>
              <a href="#login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Iniciar Sesion</a>
              <a href="#register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Registrarse</a>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              <a onClick={() => setMobileMenuOpen(false)} href="#login" className="w-full block text-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg">Iniciar Sesion</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#register" className="w-full block text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Registrarse</a>
            </div>
          </div>
        </div>
      )}
    </header>
      {/* spacer to offset fixed header height so page content isn't overlapped */}
      <div className="h-16 lg:h-20" />
    </>
  )
}
