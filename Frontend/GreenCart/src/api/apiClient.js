import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000
})

// Optional: response interceptor to centralize error handling
api.interceptors.response.use(
  res => res,
  err => {
    // You can expand to show toast etc.
    const message = err?.response?.data?.error || err.message || 'Network error'
    return Promise.reject(new Error(message))
  }
)

export default api
