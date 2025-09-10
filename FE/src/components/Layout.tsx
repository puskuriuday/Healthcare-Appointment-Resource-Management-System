import React from 'react'
import { NavBar } from './NavBar'
import { useAuth } from '../hooks/useAuth'

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useAuth()
  return (
    <div className="app-shell">
      {user && <NavBar />}
      <main>{children}</main>
    </div>
  )
}
