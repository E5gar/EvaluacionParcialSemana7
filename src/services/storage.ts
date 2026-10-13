export const KEYS = {
  categories: 'lib_categories',
  books: 'lib_books',
  users: 'lib_users',
  loans: 'lib_loans',
  receipts: 'lib_receipts',
  session: 'lib_session',
} as const

export function getAll<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T[]) : []
  } catch {
    return []
  }
}

export function saveAll<T>(key: string, items: T[]) {
  localStorage.setItem(key, JSON.stringify(items))
}

export function uid(): string {
  return crypto.randomUUID()
}