import { useEffect, useState } from 'react'
import { Search, MapPin, Star, Shield, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  {
    src: 'https://images.pexels.com/photos/29248902/pexels-photo-29248902.jpeg',
    alt: 'Plomería verificada',
  },
  {
    src: 'https://images.pexels.com/photos/5317151/pexels-photo-5317151.jpeg',
    alt: 'Pintura profesional',
  },
  {
    src: 'https://images.pexels.com/photos/27928762/pexels-photo-27928762.jpeg',
    alt: 'Electricista certificado',
  },
  {
    src: 'https://images.pexels.com/photos/6135622/pexels-photo-6135622.jpeg',
    alt: 'Belleza',
  },
  {
    src: 'https://images.pexels.com/photos/7988114/pexels-photo-7988114.jpeg',
    alt: 'Programación',
  },
  {
    src: 'https://images.pexels.com/photos/1235512/pexels-photo-1235512.jpeg',
    alt: 'Fotografía profesional',
  }
]

export function Hero() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const prev = () => {
    setDirection('prev')
    setIndex((i) => (i - 1 + images.length) % images.length)
  }
  const next = () => {
    setDirection('next')
    setIndex((i) => (i + 1) % images.length)
  }

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 4500)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="inicio" className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-100/50 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green-100/50 blur-3xl rounded-full" />
      </div>

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-5 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Conecta con{' '}
              <span className="text-blue-600">profesionales</span>{' '}
              de confianza cerca de ti
            </h1>

            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base lg:mx-0">
              Servify es la plataforma que conecta profesionales independientes verificados
              con hogares que necesitan servicios confiables. Plomeros, electricistas,
              diseñadores y más, a solo un clic de distancia.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Perfiles verificados</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Reseñas reales</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Cerca de ti</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Buscar Profesionales
                <Search className="h-4 w-4" />
              </a>
              <a
                href="#planes"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Soy Profesional
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative w-full max-w-5xl lg:justify-self-end">
            <div className="relative mx-auto h-80 w-full overflow-hidden rounded-3xl shadow-xl sm:h-96 group">
              {images.map((img, i) => {
                const isActive = i === index
                // base transition
                let transformClass = 'translate-x-0 scale-100'
                if (!isActive) {
                  // move out depending on direction
                  transformClass = direction === 'next' ? 'translate-x-8 scale-105' : '-translate-x-8 scale-105'
                }

                const opacityClass = isActive ? 'opacity-100' : 'opacity-0'

                return (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out ${opacityClass} ${transformClass}`}
                    style={{ transformOrigin: 'center' }}
                  />
                )
              })}

              {/* Left / Right arrows */}
              <button
                onClick={prev}
                aria-label="Anterior"
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white sm:left-6 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <button
                onClick={next}
                aria-label="Siguiente"
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white sm:right-6 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>

              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 'next' : 'prev')
                      setIndex(i)
                    }}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === index ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  )
}
