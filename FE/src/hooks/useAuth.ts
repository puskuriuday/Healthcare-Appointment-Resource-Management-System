import { useContext } from 'react'
import { AuthContext, AuthCtx } from '../context/AuthContext'

export const useAuth = () => useContext<AuthCtx>(AuthContext)
