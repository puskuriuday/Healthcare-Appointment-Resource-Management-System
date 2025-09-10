import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export const api = axios.create({
  baseURL,
  withCredentials: true
})

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('accessToken')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

api.interceptors.response.use(r => r, async err => {
  if (err.response?.status === 401) {
    localStorage.removeItem('accessToken')
  }
  return Promise.reject(err)
})
