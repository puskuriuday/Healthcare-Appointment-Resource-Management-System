import React, { useEffect, useState } from 'react'
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('lumen-theme', theme)
  }, [theme])

  useEffect(() => {
    const stored = localStorage.getItem('lumen-theme')
    if (stored === 'light' || stored === 'dark') setTheme(stored)
  }, [])

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return (
    <nav className="nav fade-in">
      <div className="nav-left">
        <span className="logo">Lumen</span>
        {links.map(l => (
          <Link key={l.to} to={l.to} className={clsx('nav-link', pathname.startsWith(l.to) && 'active')}>
            {l.label}
          </Link>
        ))}
      </div>
      <div className="nav-right">
        {user && <span className={clsx('badge', 'primary')}>{user.role}</span>}
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  )
}
