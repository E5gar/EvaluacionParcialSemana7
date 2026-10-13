import type { User } from '../types'
import { KEYS, getAll, saveAll, uid } from './storage'

export type NewUser = Omit<User, 'id' | 'role'>

export function getUsers(): User[] {
  return getAll<User>(KEYS.users)
}

export function findByCode(code: string): User | undefined {
  const normalized = code.trim().toUpperCase()
  return getUsers().find((user) => user.code.toUpperCase() === normalized)
}

export function addUser(data: NewUser): User {
  if (findByCode(data.code)) {
    throw new Error('El código universitario ya está registrado')
  }

  const user: User = {
    ...data,
    id: uid(),
    code: data.code.trim().toUpperCase(),
    role: 'user',
  }

  saveAll(KEYS.users, [...getUsers(), user])
  return user
}