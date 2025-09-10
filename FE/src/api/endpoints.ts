import { api } from './client'
import { LoginRequest, LoginResponse, Appointment, InventoryItem, Invoice, Notification } from '../types'

export const authApi = {
  login: (data: LoginRequest) => api.post<LoginResponse>('/auth/login', data).then(r => r.data),
  me: () => api.get('/auth/me').then(r => r.data),
  refresh: () => api.post('/auth/refresh', {}).then(r => r.data)
}

export const appointmentApi = {
  list: () => api.get<Appointment[]>('/appointments').then(r => r.data),
  create: (payload: Partial<Appointment>) => api.post('/appointments', payload).then(r => r.data)
}

export const inventoryApi = {
  list: () => api.get<InventoryItem[]>('/inventory/resources').then(r => r.data)
}

export const billingApi = {
  invoices: () => api.get<Invoice[]>('/billing/invoices').then(r => r.data)
}

export const notificationApi = {
  list: () => api.get<Notification[]>('/notifications').then(r => r.data),
  markRead: (id: number | string) => api.post(`/notifications/${id}/read`, {})
}
