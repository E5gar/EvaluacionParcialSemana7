import type { Role } from '../types'

export function homePathFor(role: Role): string {
  return role === 'admin' ? '/admin/categorias' : '/catalogo'
}