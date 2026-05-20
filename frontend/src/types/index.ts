export interface Professional {
  id: string
  name: string
  profession: string
  avatar: string
  photo?: string
  rating: number
  reviews: number
  location: string
  distance: string
  verified: boolean
  premium: boolean
  responseTime: string
  hourlyRate: string
  pricePerHour?: number | string
  description: string
  bio?: string
  portfolio?: string[]
  skills: string[]
  categoryId: string
  phone: string
  email: string
}

export interface Category {
  id: string
  name: string
  icon: string
  count: number
  color: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  icon: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  highlighted: boolean
  cta: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  avatar: string
  rating: number
  text: string
  type: 'professional' | 'client'
}

export interface MarketSegment {
  professionals: string
  households: string
  label: string
}

export interface MarketData {
  tam: MarketSegment
  sam: MarketSegment
  som: MarketSegment
}

export interface RevenueStream {
  title: string
  description: string
  percentage: string
  icon: string
}

export interface Projection {
  period: string
  revenue: string
  subscribers: string
}

export interface Investment {
  concept: string
  amount: string
}

export interface Risk {
  risk: string
  level: string
  mitigation: string
}

export interface ValueProposition {
  title: string
  description: string
  icon: string
}

export interface BusinessMetrics {
  marketData: MarketData
  revenueStreams: RevenueStream[]
  projections: Projection[]
  investments: Investment[]
  risks: Risk[]
  valuePropositions: ValueProposition[]
}
