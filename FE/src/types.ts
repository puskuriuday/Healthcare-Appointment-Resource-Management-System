export interface User {
  id: number
  email: string
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN'
  status: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}

export interface Appointment {
  id: number
  patientId: number
  doctorId: number
  status: string
  startAt: string
  endAt: string
}

export interface InventoryItem {
  id: number
  rtype: string
  name: string
  status?: string
}

export interface Invoice {
  id: number
  status: string
  totalAmountCents: number
  currency: string
}

export interface Notification {
  id: number
  channel: string
  status: string
}
