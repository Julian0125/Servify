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
    // Create a new professional; fallback to localStorage when backend is unavailable
    create: async (payload: Partial<Professional>) => {
      try {
        return await postApi<Professional>('/professionals', payload)
      } catch (err) {
        // Fallback: store in localStorage so the frontend can show the new professional
        try {
          const raw = localStorage.getItem('servify_professionals')
          const arr = raw ? JSON.parse(raw) : []
          const prof = { ...(payload as any), id: payload.id || `p_${Math.random().toString(36).slice(2,9)}` }
          arr.push(prof)
          localStorage.setItem('servify_professionals', JSON.stringify(arr))
          return Promise.resolve(prof as Professional)
        } catch (e) {
          return Promise.reject(err)
        }
      }
    },
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
        try {
          // If a user object exists in localStorage and matches email, reuse it
          const rawUser = localStorage.getItem('servify_user')
          if (rawUser) {
            const u = JSON.parse(rawUser)
            if (u && u.email === payload.email) {
              const token = createFakeToken()
              const expiresAt = Date.now() + 1000 * 60 * 60 * 24
              return Promise.resolve({ token, user: u, expiresAt })
            }
          }
          // If a professional entry exists with this email, use it to build user
          const rawProfs = localStorage.getItem('servify_professionals')
          if (rawProfs) {
            const arr = JSON.parse(rawProfs)
            const p = Array.isArray(arr) ? arr.find((x:any)=>x.email === payload.email) : null
            if (p) {
              const token = createFakeToken()
              const expiresAt = Date.now() + 1000 * 60 * 60 * 24
              const user = { id: p.id, name: p.name, email: p.email, role: 'professional', photo: p.photo }
              return Promise.resolve({ token, user, expiresAt })
            }
          }
        } catch (e) {
          // ignore and fallback to generic fake response
        }
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
