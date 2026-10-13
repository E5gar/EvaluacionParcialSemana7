import type { Book, Category } from '../types'
import { KEYS, getAll, saveAll, uid } from './storage'

export type CategoryData = Omit<Category, 'id'>

export function getCategories(): Category[] {
  return getAll<Category>(KEYS.categories).sort((a, b) => a.name.localeCompare(b.name, 'es'))
}

function normalize(name: string): string {
  return name.trim().toLowerCase()
}

function nameExists(name: string, ignoreId?: string): boolean {
  const normalized = normalize(name)
  return getCategories().some(
    (category) => category.id !== ignoreId && normalize(category.name) === normalized,
  )
}

export function addCategory(data: CategoryData): Category {
  if (nameExists(data.name)) throw new Error('La categoría ya existe')

  const category: Category = { id: uid(), name: data.name.trim() }
  saveAll(KEYS.categories, [...getCategories(), category])
  return category
}

export function updateCategory(id: string, data: CategoryData): Category {
  if (nameExists(data.name, id)) throw new Error('La categoría ya existe')

  const updated: Category = { id, name: data.name.trim() }
  saveAll(
    KEYS.categories,
    getCategories().map((category) => (category.id === id ? updated : category)),
  )
  return updated
}

export function deleteCategory(id: string): void {
  const hasBooks = getAll<Book>(KEYS.books).some((book) => book.categoryId === id)
  if (hasBooks) throw new Error('No se puede eliminar: la categoría tiene libros asociados')

  saveAll(
    KEYS.categories,
    getCategories().filter((category) => category.id !== id),
  )
}