import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LoginPage } from '../pages/Login'
import { DashboardPage } from '../pages/Dashboard'
import { AppointmentsPage } from '../pages/Appointments'
import { InventoryPage } from '../pages/Inventory'
import { BillingPage } from '../pages/Billing'
import { NotificationsPage } from '../pages/Notifications'

const Private: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <p>Loading...</p>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={<Private><DashboardPage /></Private>} />
    <Route path="/appointments" element={<Private><AppointmentsPage /></Private>} />
    <Route path="/inventory" element={<Private><InventoryPage /></Private>} />
    <Route path="/billing" element={<Private><BillingPage /></Private>} />
    <Route path="/notifications" element={<Private><NotificationsPage /></Private>} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
)
