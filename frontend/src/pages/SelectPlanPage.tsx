import { useState } from 'react'
import type { SubscriptionPlan } from '../types'
import showToast from '../utils/toast'

const plans: SubscriptionPlan[] = [
  { id: 'basico', name: 'Plan Basico', icon: 'Zap', description: 'Hasta 5 fotos en portafolio', monthlyPrice: 35000, yearlyPrice: 306000, features: [], highlighted: false, cta: 'Comprar' },
  { id: 'premium', name: 'Plan Premium', icon: 'Crown', description: 'Hasta 20 fotos y visibilidad destacada', monthlyPrice: 62500, yearlyPrice: 637500, features: [], highlighted: true, cta: 'Comprar' },
]

export default function SelectPlanPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const buy = async () => {
    if (!selected) return
    setProcessing(true)
    try {
      // Simulate purchase: set premium flag on last registered professional
      const raw = localStorage.getItem('servify_professionals')
      const store = raw ? JSON.parse(raw) : []
      if (store.length > 0) {
        const last = store[store.length - 1]
        last.premium = true
        last.plan = selected
        store[store.length - 1] = last
        localStorage.setItem('servify_professionals', JSON.stringify(store))
        window.dispatchEvent(new CustomEvent('servify:professionals:updated'))
      }
      // mark user as premium too
      try {
        const uRaw = localStorage.getItem('servify_user')
        if (uRaw) {
          const u = JSON.parse(uRaw)
          u.plan = selected
          localStorage.setItem('servify_user', JSON.stringify(u))
        }
      } catch {}
      showToast('Compra simulada realizada. Tu perfil está activo y Premium.', 'success')
      // go to profile
      window.location.hash = '#profile'
      window.location.reload()
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-3xl grid md:grid-cols-2 gap-6">
        {plans.map((p) => (
          <div key={p.id} className={`p-6 rounded-lg shadow ${p.highlighted ? 'border-2 border-primary' : 'border border-border bg-card'}`}>
            <h3 className="text-lg font-semibold mb-2 text-foreground">{p.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
            <p className="text-2xl font-bold text-foreground mb-4">${p.monthlyPrice.toLocaleString()}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setSelected(p.id)} className={`px-3 py-2 rounded-md border ${selected === p.id ? 'bg-primary text-white' : 'bg-card'}`}>{selected === p.id ? 'Seleccionado' : 'Seleccionar'}</button>
              <button onClick={buy} disabled={!selected || processing} className="px-3 py-2 bg-primary text-white rounded-md">{processing ? 'Procesando...' : 'Comprar'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
