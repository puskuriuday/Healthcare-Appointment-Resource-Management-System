import React from 'react'
import { useAuth } from '../hooks/useAuth'

export const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user?.email}</p>
      <div className="grid">
        <div className="card">Appointments overview</div>
        <div className="card">Inventory alerts</div>
        <div className="card">Invoices summary</div>
        <div className="card">Notifications</div>
      </div>
    </div>
  )
}
