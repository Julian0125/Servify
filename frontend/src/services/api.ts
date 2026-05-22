import type { Professional, Category, SubscriptionPlan, Testimonial, BusinessMetrics } from '../types'

const API_BASE_URL = '/api'

async function fetchApi<T>(endpoint: string): Promise<T> {
  const headers: Record<string,string> = { 'Content-Type': 'application/json' }
  try {
    const token = localStorage.getItem('servify_token')
    if (token) headers['Authorization'] = `Bearer ${token}`
  } catch {}
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers })
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  return response.json()
}

async function postApi<T>(endpoint: string, body: unknown): Promise<T> {
  const headers: Record<string,string> = { 'Content-Type': 'application/json' }
  try {
    const token = localStorage.getItem('servify_token')
    if (token) headers['Authorization'] = `Bearer ${token}`
  } catch {}
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`API Error: ${response.status} ${text}`)
  }
  return response.json()
}

function createFakeToken() {
  // Simple non-secure token for demo purposes
  return `fake_${Math.random().toString(36).slice(2)}_${Date.now()}`
}

function fakeAuthResponse(payload: any) {
  const token = createFakeToken()
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 // 24 hours
  const user = {
    id: `u_${Math.random().toString(36).slice(2, 9)}`,
    name: payload.name || (payload.email ? payload.email.split('@')[0] : 'Usuario'),
    email: payload.email,
    role: payload.role || 'client',
  }
  return { token, user, expiresAt }
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
  auth: {
    login: async (payload: { email: string; password: string }) => {
      try {
        return await postApi<{ token: string; user?: any; expiresAt?: number }>('/auth/login', payload)
      } catch (err) {
        // Fallback to frontend simulation when backend is not available
        return Promise.resolve(fakeAuthResponse(payload))
      }
    },
    register: async (payload: { name: string; email: string; password: string; role: 'client' | 'professional' }) => {
      try {
        return await postApi<{ token: string; user?: any; expiresAt?: number }>('/auth/register', payload)
      } catch (err) {
        // Fallback to frontend simulation when backend is not available
        return Promise.resolve(fakeAuthResponse(payload))
      }
    },
  },
}
