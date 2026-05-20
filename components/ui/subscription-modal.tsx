import React, { useEffect, useRef, useState } from 'react'

export default function SubscriptionModal({ open, plan, onClose }: any) {
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

  if (!open || !plan) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-lg font-semibold">Suscripción — {plan.name}</div>
          <button ref={closeRef} onClick={onClose} className="p-2 rounded hover:bg-gray-100">Cerrar</button>
        </div>
        <div className="p-6">
          <p className="mb-4">Flujo de suscripción simulado.</p>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
