import { useState, type ReactNode } from 'react'
import type { User } from '../types'
import { KEYS } from '../services/storage'
import { findByCode, getUsers } from '../services/userService'
import { AuthContext } from './useAuth'

function readSessionUser(): User | null {
  const sessionId = localStorage.getItem(KEYS.session)
  if (!sessionId) return null
  return getUsers().find((user) => user.id === sessionId) ?? null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readSessionUser)

  function login(code: string): User {
    const found = findByCode(code)
    if (!found) throw new Error('Código no registrado')
    localStorage.setItem(KEYS.session, found.id)
    setUser(found)
    return found
  }

  function logout() {
    localStorage.removeItem(KEYS.session)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}