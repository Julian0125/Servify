import React, { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

interface Plan {
  id?: string
  name?: string
  monthlyPrice?: number
  features?: string[]
}

interface Props {
  open: boolean
  plan: Plan | null
  onClose: () => void
}

export default function SubscriptionModal({ open, plan, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [card, setCard] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setTimeout(() => closeRef.current?.focus(), 0)
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open, onClose])

  useEffect(() => {
    if (!open) { setStep(1); setName(''); setCard('') }
  }, [open])

  if (!open || !plan) return null

  const price = plan.monthlyPrice || 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-lg font-semibold">Suscripción — {plan.name}</div>
          <button ref={closeRef} onClick={onClose} className="p-2 rounded hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div>
              <p className="mb-4">Resumen del plan y confirmación.</p>
              <div className="mb-4">
                <div className="text-3xl font-bold">{new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',minimumFractionDigits:0}).format(price)}</div>
                <div className="text-sm text-gray-500">/mes — Facturación mensual</div>
              </div>

              <ul className="mb-4 space-y-1 text-sm text-gray-700">
                {(plan.features || []).slice(0,5).map((f,i) => <li key={i}>• {f}</li>)}
              </ul>

              <div className="flex gap-2">
                <button onClick={() => setStep(2)} className="px-4 py-2 bg-blue-600 text-white rounded">Continuar</button>
                <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="mb-4">Introduce datos de pago simulados.</p>
              <div className="mb-3">
                <label className="text-sm text-gray-600">Nombre en la tarjeta</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full mt-1 p-2 border rounded" />
              </div>
              <div className="mb-3">
                <label className="text-sm text-gray-600">Número de tarjeta (simulado)</label>
                <input value={card} onChange={(e)=>setCard(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="4242 4242 4242 4242" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(3)} disabled={!name || !card} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Confirmar pago</button>
                <button onClick={() => setStep(1)} className="px-4 py-2 border rounded">Volver</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="text-2xl font-semibold mb-2">¡Listo!</div>
              <p className="mb-4">Suscripción simulada activada para <strong>{plan.name}</strong>. (No se realizó ningún cargo real.)</p>
              <div className="flex justify-center">
                <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded">Cerrar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
