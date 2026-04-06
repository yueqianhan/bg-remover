'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { GoogleUser, GoogleCredentialResponse } from '@/lib/auth'

interface AuthContextType {
  user: GoogleUser | null
  loading: boolean
  signIn: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GoogleUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 从 localStorage 恢复用户信息
    const storedUser = localStorage.getItem('googleUser')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse stored user:', e)
        localStorage.removeItem('googleUser')
      }
    }
    setLoading(false)

    // 加载 Google Identity Services
    const loadGoogleScript = () => {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }

    loadGoogleScript()
  }, [])

  const signIn = () => {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      })
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed()) {
          console.error('Google sign-in not displayed')
        }
      })
    }
  }

  const handleCredentialResponse = (response: GoogleCredentialResponse) => {
    try {
      // 解析 JWT token
      const payload = parseJwt(response.credential)
      setUser(payload)
      localStorage.setItem('googleUser', JSON.stringify(payload))
    } catch (e) {
      console.error('Failed to handle credential response:', e)
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('googleUser')
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

function parseJwt(token: string): GoogleUser {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )
  return JSON.parse(jsonPayload)
}
