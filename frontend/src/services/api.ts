import type { Professional, Category, SubscriptionPlan, Testimonial, BusinessMetrics } from '../types'

const API_BASE_URL = '/api'

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  return response.json()
}

export const api = {
  professionals: {
    getAll: () => fetchApi<Professional[]>('/professionals'),
    getById: (id: string) => fetchApi<Professional>(`/professionals/${id}`),
    search: (query?: string, location?: string, categoryId?: string) => {
      const params = new URLSearchParams()
      if (query) params.append('query', query)
      if (location) params.append('location', location)
      if (categoryId) params.append('categoryId', categoryId)
      return fetchApi<Professional[]>(`/professionals?${params.toString()}`)
    },
    getFeatured: () => fetchApi<Professional[]>('/professionals/featured'),
    getByCategory: (categoryId: string) => fetchApi<Professional[]>(`/professionals/category/${categoryId}`),
  },
  categories: {
    getAll: () => fetchApi<Category[]>('/categories'),
  },
  subscriptions: {
    getAll: () => fetchApi<SubscriptionPlan[]>('/subscriptions'),
  },
  testimonials: {
    getAll: () => fetchApi<Testimonial[]>('/testimonials'),
  },
  business: {
    getMetrics: () => fetchApi<BusinessMetrics>('/business/metrics'),
  },
}
