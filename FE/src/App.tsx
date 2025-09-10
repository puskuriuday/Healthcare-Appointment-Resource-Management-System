import React from 'react'
import { AppRoutes } from './routes'
import { AuthProvider } from './context/AuthContext'
import { Layout } from './components/Layout'

export const App: React.FC = () => (
  <AuthProvider>
    <Layout>
      <AppRoutes />
    </Layout>
  </AuthProvider>
)
