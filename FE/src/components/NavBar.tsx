import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import clsx from 'clsx'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/appointments', label: 'Appointments' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/billing', label: 'Billing' },
  { to: '/notifications', label: 'Notifications' }
]

export const NavBar: React.FC = () => {
  const { pathname } = useLocation()
  const { logout, user } = useAuth()
  return (
    <nav className="nav">
      <div className="nav-left">
        <span className="logo">Lumen</span>
        {links.map(l => (
          <Link key={l.to} to={l.to} className={clsx('nav-link', pathname.startsWith(l.to) && 'active')}>
            {l.label}
          </Link>
        ))}
      </div>
      <div className="nav-right">
        <span className="role">{user?.role}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  )
}
