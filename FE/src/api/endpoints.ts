import { api } from './client'
import { LoginRequest, LoginResponse, Appointment, InventoryItem, Invoice, Notification } from '../types'

const AUTH_BASE = '/api/v1/auth'
const APPT_BASE = '/api/v1/appointments'
// placeholders for future modules
// const INVENTORY_BASE = '/api/v1/inventory'
// const BILLING_BASE = '/api/v1/billing'
// const NOTIF_BASE = '/api/v1/notifications'

export const authApi = {
  login: (data: LoginRequest) => api.post<LoginResponse>(`${AUTH_BASE}/login`, data).then(r => r.data),
  me: () => api.get(`${AUTH_BASE}/me`).then(r => r.data),
  refresh: () => api.post(`${AUTH_BASE}/refresh`, {}).then(r => r.data)
}

export const appointmentApi = {
  list: () => api.get<Appointment[]>(`${APPT_BASE}`).then(r => r.data),
  create: (payload: Partial<Appointment>) => api.post(APPT_BASE, payload).then(r => r.data)
}

export const inventoryApi = {
  list: () => api.get<InventoryItem[]>(`/api/v1/inventory/resources`).then(r => r.data)
}

export const billingApi = {
  invoices: () => api.get<Invoice[]>(`/api/v1/billing/invoices`).then(r => r.data)
}

export const notificationApi = {
  list: () => api.get<Notification[]>(`/api/v1/notifications`).then(r => r.data),
  markRead: (id: number | string) => api.post(`/api/v1/notifications/${id}/read`, {})
}
