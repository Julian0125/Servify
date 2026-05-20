import React, { useEffect, useRef } from 'react'
import { X, Phone, MessageCircle, Star } from 'lucide-react'

interface Professional {
  id: string
  name: string
  profession?: string
  photo?: string
  avatar?: string
  rating?: number
  reviews?: number
  location?: string
  hourlyRate?: string
  description?: string
  skills?: string[]
  responseTime?: string
  premium?: boolean
  portfolio?: string[]
}

interface Props {
  professional: Professional | null
  open: boolean
  onClose: () => void
}

export default function ProfessionalModal({ professional, open, onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    // set initial focus to close button
    setTimeout(() => { closeBtnRef.current?.focus() }, 0)
    // prevent background scroll while modal open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open || !professional) return null

  const gallery = professional.portfolio && professional.portfolio.length > 0
    ? professional.portfolio
    : professional.photo
      ? [professional.photo]
      : []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label={`Detalle de ${professional.name}`} className="relative max-w-4xl w-full mx-4 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-700">
              {professional.photo ? (
                <img src={professional.photo} alt={professional.name} className="h-12 w-12 object-cover" />
              ) : (
                (professional.avatar || professional.name.split(' ').map(n=>n[0]).slice(0,2).join(''))
              )}
            </div>
            <div>
              <div className="text-lg font-semibold">{professional.name}</div>
              <div className="text-sm text-gray-600">{professional.profession}</div>
            </div>
          </div>
          <button ref={closeBtnRef} onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <div className="font-medium">{professional.rating ?? '—'}</div>
                <div className="text-sm text-gray-500">({professional.reviews ?? 0} reseñas)</div>
              </div>
              <div className="ml-4 text-sm text-gray-600">{professional.location}</div>
              {professional.premium && (
                <div className="ml-auto px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm font-semibold">Premium</div>
              )}
            </div>

            <p className="text-gray-700 mb-4">{professional.description}</p>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Habilidades</h4>
              <div className="flex flex-wrap gap-2">
                {(professional.skills || []).map((s) => (
                  <span key={s} className="px-2 py-1 bg-gray-100 text-sm rounded">{s}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Portafolio</h4>
              {gallery.length === 0 ? (
                <div className="text-sm text-gray-500">No hay imágenes de trabajos previos.</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.map((src, i) => (
                    <div key={i} className="h-32 bg-gray-100 overflow-hidden rounded">
                      <img src={src} alt={`portfolio-${i}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="mb-4">
              <div className="text-sm text-gray-500">Tarifa</div>
              <div className="text-lg font-semibold">{professional.hourlyRate || '—'}</div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-500">Tiempo de respuesta</div>
              <div className="text-sm">{professional.responseTime || '—'}</div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded">
                <Phone className="h-4 w-4" />Llamar
              </button>
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-white border rounded">
                <MessageCircle className="h-4 w-4" />Mensaje
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              {professional.premium ? 'Este profesional cuenta con un plan Premium (más visibilidad y funciones).' : 'Plan básico.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
