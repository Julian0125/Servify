import { useEffect, useRef, useState } from 'react'
import { X, MessageCircle, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import showToast from '../../utils/toast'
import type { Professional } from '../../types'

interface Props {
  professional: Professional | null
  open: boolean
  onClose: () => void
}

export default function ProfessionalModal({ professional, open, onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!open) return
    setTimeout(() => { closeBtnRef.current?.focus() }, 0)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  

  if (!open || !professional) return null

  const maxPhotos = professional.premium ? 20 : 5
  const professionToQuery = (prof?: string) => {
    if (!prof) return 'work'
    const p = prof.toLowerCase()
    if (p.includes('plom')) return 'plumbing'
    if (p.includes('electr')) return 'electrician'
    if (p.includes('carp')) return 'carpentry'
    if (p.includes('dise') || p.includes('design')) return 'graphic-design'
    if (p.includes('desarroll') || p.includes('dev')) return 'web-development'
    if (p.includes('abog') || p.includes('law')) return 'lawyer'
    if (p.includes('foto') || p.includes('phot')) return 'photography'
    if (p.includes('chef') || p.includes('cocin')) return 'cooking'
    if (p.includes('jardin') || p.includes('garden')) return 'gardening'
    if (p.includes('barber') || p.includes('hair')) return 'barber'
    if (p.includes('mecanic') || p.includes('mecan')) return 'mechanic'
    if (p.includes('vet') || p.includes('veter')) return 'veterinarian'
    if (p.includes('nutri') || p.includes('nutrition')) return 'nutrition'
    if (p.includes('trainer') || p.includes('entren')) return 'fitness'
    return prof.split(' ')[0]
  }

  let gallery: string[] = []
  if (professional.portfolio && professional.portfolio.length > 0) {
    gallery = professional.portfolio.slice(0, maxPhotos)
  } else {
    const q = professionToQuery(professional.profession)
    for (let i = 0; i < maxPhotos; i++) gallery.push(`https://source.unsplash.com/800x600/?${encodeURIComponent(q)}&sig=${i+1}`)
    if ((!gallery || gallery.length === 0) && professional.photo) gallery = [professional.photo]
  }

  // debug
  // eslint-disable-next-line no-console
  console.debug('ProfessionalModal gallery', professional.id, gallery)

  try {
    gallery = gallery.map((s) => (typeof s === 'string' && s.startsWith('/') ? `${window.location.origin}${s}` : s))
  } catch (e) { /* ignore */ }

  // handle Escape to close selected image first, then modal; keyboard navigation uses gallery now that it's defined
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedIndex !== null) setSelectedIndex(null)
        else onClose()
      }
      if (selectedIndex !== null) {
        if (e.key === 'ArrowLeft') {
          setSelectedIndex((s) => {
            if (s === null) return 0
            return s > 0 ? s - 1 : gallery.length - 1
          })
        }
        if (e.key === 'ArrowRight') {
          setSelectedIndex((s) => {
            if (s === null) return 0
            return s < gallery.length - 1 ? s + 1 : 0
          })
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selectedIndex, onClose, gallery.length])

  const defaultResponseTimes = [
    'Responde en 15 min',
    'Responde en 30 min',
    'Responde en 1 hora',
    'Responde en 2 horas',
    'Responde en 3 horas'
  ]
  const computeDefaultResponse = (p: Professional) => {
    if (p.responseTime && p.responseTime.trim()) return p.responseTime
    try {
      const digits = (p.id || '').replace(/\D/g, '')
      const num = digits ? parseInt(digits, 10) : Math.floor(Math.random() * 100)
      return defaultResponseTimes[num % defaultResponseTimes.length]
    } catch {
      return defaultResponseTimes[0]
    }
  }
  const displayResponseTime = computeDefaultResponse(professional)

  const displayHourlyRate = professional.hourlyRate && professional.hourlyRate.length > 0
    ? professional.hourlyRate
    : professional.pricePerHour ? `$${professional.pricePerHour}` : '—'

  const displayDistance = (professional as any).distance || professional.location || ''

  const [localProf, setLocalProf] = useState<Professional | null>(professional)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewRating, setReviewRating] = useState<number>(5)
  const [reviewComment, setReviewComment] = useState<string>('')
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    setLocalProf(professional)
  }, [professional])

  const submitReview = () => {
    const token = localStorage.getItem('servify_token')
    if (!token) { showToast('Debe iniciar sesion para dejar una reseña', 'error'); return }
    const uRaw = localStorage.getItem('servify_user')
    try {
      if (!uRaw) { showToast('Solo clientes registrados pueden dejar reseñas', 'error'); return }
      const u = JSON.parse(uRaw)
      if (u.role !== 'client') { showToast('Solo clientes registrados pueden dejar reseñas', 'error'); return }
    } catch { showToast('Solo clientes registrados pueden dejar reseñas', 'error'); return }
    try {
      const raw = localStorage.getItem('servify_professionals')
      let arr: any[] = []
      if (raw) {
        try { arr = JSON.parse(raw) } catch { arr = [] }
      }
      const idx = arr.findIndex(a => String(a.id) === String(professional.id))
      const reviewerRaw = localStorage.getItem('servify_user')
      let reviewerName = 'Anónimo'
      try { if (reviewerRaw) { const ru = JSON.parse(reviewerRaw); reviewerName = ru.name || reviewerName } } catch {}

      if (idx >= 0) {
        const target = arr[idx]
        target.reviewsArray = Array.isArray(target.reviewsArray) ? target.reviewsArray : []
        target.reviewsArray.push({ id: `r-${Date.now()}`, name: reviewerName, rating: reviewRating, comment: reviewComment, date: new Date().toISOString() })
        const prevCount = Number(target.reviews || 0)
        const prevRating = Number(target.rating || 0)
        const newCount = prevCount + 1
        const newRating = ((prevRating * prevCount) + reviewRating) / newCount
        target.reviews = newCount
        target.rating = Math.round(newRating * 10) / 10
        arr[idx] = target
      } else {
        const newEntry: any = { ...(professional as any) }
        newEntry.reviewsArray = [{ id: `r-${Date.now()}`, name: reviewerName, rating: reviewRating, comment: reviewComment, date: new Date().toISOString() }]
        newEntry.reviews = 1
        newEntry.rating = reviewRating
        arr.push(newEntry)
      }

      localStorage.setItem('servify_professionals', JSON.stringify(arr))
      window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
      const updated = arr.find(a => String(a.id) === String(professional.id))
      setLocalProf(updated || professional)
      setShowReviewForm(false)
      setReviewComment('')
      setReviewRating(5)
      showToast('Reseña enviada. Gracias por tu feedback!', 'success')
    } catch (e) {
      console.warn(e)
      showToast('No se pudo guardar la reseña', 'error')
    }
  }

  const renderStars = (r: number) => {
    const full = Math.round(Math.max(0, Math.min(5, Number(r || 0))))
    const stars = [] as JSX.Element[]
    for (let i = 0; i < 5; i++) {
      stars.push(<span key={i} className={`text-yellow-400 text-sm ${i < full ? '' : 'opacity-40'}`}>★</span>)
    }
    return <div className="inline-flex items-center gap-1">{stars}</div>
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label={`Detalle de ${professional.name}`} className="relative max-w-3xl w-full mx-4 bg-card rounded-xl shadow-lg max-h-[85vh] overflow-hidden border border-border">
        <div className="flex items-center flex-wrap gap-3 p-4 border-b border-border">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
              {professional.photo ? (
                <img src={professional.photo} alt={professional.name} className="h-16 w-16 object-cover" />
              ) : (
                (professional.avatar || professional.name.split(' ').map(n=>n[0]).slice(0,2).join(''))
              )}
            </div>
          </div>

            <div className="flex flex-col justify-center md:pl-2">
            <div className="text-lg font-semibold text-foreground">{professional.name}</div>
            <div className="text-sm text-muted-foreground">{professional.profession}</div>
          </div>

          <div className="flex flex-col justify-center md:pl-4">
            <div className="text-sm text-muted-foreground">Tarifa</div>
            <div className="font-medium text-primary">{displayHourlyRate}</div>
            <div className="text-sm text-muted-foreground mt-1">{displayResponseTime}</div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {professional.phone ? (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const token = localStorage.getItem('servify_token')
                  if (!token) {
                    showToast('Debe iniciar sesion para contactar al profesional', 'error')
                    return
                  }
                  try {
                    const digits = (professional.phone || '').replace(/\D/g, '')
                    const text = `Hola ${professional.name}, estoy interesado en tu servicio de ${professional.profession}. ¿Está disponible?`
                    const waUrl = `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
                    window.open(waUrl, '_blank')
                  } catch (err) {
                    showToast('No se pudo abrir WhatsApp', 'error')
                  }
                }}
                className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-md text-sm"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </button>
            ) : (
              <button disabled className="inline-flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md text-sm opacity-60">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </button>
            )}
            <button ref={closeBtnRef} onClick={onClose} className="p-2 rounded-md hover:bg-muted">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 pb-16" style={{ maxHeight: 'calc(85vh - 64px)', overflowY: 'auto', WebkitOverflowScrolling: 'touch' as any }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <div className="font-medium">{professional.rating ?? '—'}</div>
              <div className="text-sm text-muted-foreground">({professional.reviews ?? 0} reseñas)</div>
            </div>
            <div className="ml-4 text-sm">
              <span className="text-gray-600">{displayDistance}</span>
            </div>
            {professional.premium && (
              <div className="ml-auto px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm font-semibold">Premium</div>
            )}
          </div>

          <p className="text-foreground mb-4">{professional.description}</p>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Reseñas</h4>
            <div className="mb-3">
              <div className="flex items-center gap-3">
                <div className="text-lg font-medium">{renderStars(Number(localProf?.rating ?? professional.rating))}</div>
                <div className="text-sm text-muted-foreground">({localProf?.reviews ?? professional.reviews} reseñas)</div>
              </div>
            </div>

            {(localProf && Array.isArray((localProf as any).reviewsArray) && (localProf as any).reviewsArray.length > 0) ? (
              <div className="space-y-3 mb-3">
                {((localProf as any).reviewsArray || []).slice().reverse().map((r: any) => (
                  <div key={r.id} className="border rounded p-3 bg-card">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{r.name}</div>
                      <div className="text-sm text-muted-foreground">{new Date(r.date).toLocaleDateString()}</div>
                    </div>
                    <div className="text-sm text-yellow-500">{renderStars(r.rating)}</div>
                    <div className="mt-2 text-sm text-gray-700">{r.comment}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground mb-3">Sé el primero en dejar una reseña.</div>
            )}

            {!showReviewForm ? (
              <div className="flex items-center gap-2">
                <button onClick={() => setShowReviewForm(true)} className="px-3 py-2 bg-primary text-white rounded-md">Dejar reseña</button>
                <button onClick={() => { setShowReviewForm(false); setReviewComment(''); setReviewRating(5) }} className="px-3 py-2 border rounded-md">Cancelar</button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm">Puntuación:</label>
                  <select value={reviewRating} onChange={(e)=>setReviewRating(Number(e.target.value))} className="p-1 border rounded">
                    <option value={5}>5</option>
                    <option value={4}>4</option>
                    <option value={3}>3</option>
                    <option value={2}>2</option>
                    <option value={1}>1</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm">Comentario</label>
                  <textarea value={reviewComment} onChange={(e)=>setReviewComment(e.target.value)} className="w-full p-2 border rounded" rows={3} />
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setConfirming(true)} className="px-3 py-2 bg-emerald-600 text-white rounded-md">Enviar reseña</button>
                  <button onClick={() => { setShowReviewForm(false); setReviewComment(''); setReviewRating(5) }} className="px-3 py-2 border rounded-md">Cancelar</button>
                </div>
              </div>
            )}
          </div>

          {confirming && (
            <div className="fixed inset-0 z-60 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" onClick={() => setConfirming(false)} />
              <div className="relative bg-card p-6 rounded shadow-lg w-[90%] max-w-md">
                <h4 className="text-lg font-semibold mb-2">Confirmar reseña</h4>
                <p className="text-sm text-muted-foreground mb-4">¿Deseas enviar esta reseña? Se asociará a tu cuenta.</p>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setConfirming(false)} className="px-3 py-2 border rounded">Cancelar</button>
                  <button onClick={() => { setConfirming(false); submitReview() }} className="px-3 py-2 bg-primary text-white rounded">Confirmar</button>
                </div>
              </div>
            </div>
          )}

          {/* Habilidades removed per UX request */}

          <div>
            <h4 className="font-semibold mb-2">Portafolio</h4>
            {gallery.length === 0 ? (
              <div className="text-sm text-muted-foreground">No hay imágenes de trabajos previos.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {gallery.map((src, i) => (
                    <div key={i} className="h-24 bg-muted overflow-hidden rounded cursor-pointer" onClick={() => setSelectedIndex(i)}>
                      <img
                        src={src}
                        alt={`portfolio-${i}`}
                        className="h-full w-full object-cover"
                        onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = '/placeholder.svg' }}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
        {selectedIndex !== null && (
          <div className="fixed inset-0 z-60 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70" onClick={() => setSelectedIndex(null)} />
            <div className="relative max-w-[90vw] max-h-[90vh] p-4 flex items-center">
              <button
                onClick={() => setSelectedIndex((s) => (s !== null ? (s > 0 ? s - 1 : gallery.length - 1) : 0))}
                className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 text-gray-800 bg-white/95 hover:bg-white p-2 rounded-full shadow-lg ring-1 ring-gray-200 z-70 focus:outline-none"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="mx-auto relative group">
                <button onClick={() => setSelectedIndex(null)} className="absolute top-2 right-2 z-70 p-2 bg-white rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100 shadow">
                  <X className="h-5 w-5" />
                </button>
                <img
                  src={gallery[selectedIndex]}
                  alt={`imagen-${selectedIndex}`}
                  className="max-w-full max-h-[80vh] object-contain rounded"
                  onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = '/placeholder.svg' }}
                />
              </div>

              <button
                onClick={() => setSelectedIndex((s) => (s !== null ? (s < gallery.length - 1 ? s + 1 : 0) : 0))}
                className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 text-gray-800 bg-white/95 hover:bg-white p-2 rounded-full shadow-lg ring-1 ring-gray-200 z-70 focus:outline-none"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
    </div>
  )
}

