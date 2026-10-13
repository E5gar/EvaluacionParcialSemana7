import type { Book, Loan } from '../types'
import { KEYS, getAll, saveAll, uid } from './storage'

export type BookData = Omit<Book, 'id'>

export function getBooks(): Book[] {
  return getAll<Book>(KEYS.books)
}

function normalizeIsbn(isbn: string): string {
  return isbn.replace(/[-\s]/g, '').toUpperCase()
}

function isbnExists(isbn: string, ignoreId?: string): boolean {
  const normalized = normalizeIsbn(isbn)
  return getBooks().some(
    (book) => book.id !== ignoreId && normalizeIsbn(book.isbn) === normalized,
  )
}

function clean(data: BookData): BookData {
  const book: BookData = {
    title: data.title.trim(),
    author: data.author.trim(),
    isbn: data.isbn.trim(),
    categoryId: data.categoryId,
    stock: Number(data.stock),
  }

  if (!Number.isInteger(book.stock) || book.stock < 0) {
    throw new Error('El stock debe ser un entero mayor o igual a 0')
  }
  if (isbnExists(book.isbn)) {
    throw new Error('El ISBN ya está registrado')
  }
  return book
}

export function addBook(data: BookData): Book {
  const created: Book = { ...clean(data), id: uid() }
  saveAll(KEYS.books, [...getBooks(), created])
  return created
}

export function updateBook(id: string, data: BookData): Book {
  const book = { ...data, stock: Number(data.stock) }
  if (!Number.isInteger(book.stock) || book.stock < 0) {
    throw new Error('El stock debe ser un entero mayor o igual a 0')
  }
  if (isbnExists(book.isbn, id)) {
    throw new Error('El ISBN ya está registrado')
  }

  const updated: Book = {
    id,
    title: book.title.trim(),
    author: book.author.trim(),
    isbn: book.isbn.trim(),
    categoryId: book.categoryId,
    stock: book.stock,
  }
  saveAll(
    KEYS.books,
    getBooks().map((item) => (item.id === id ? updated : item)),
  )
  return updated
}

export function deleteBook(id: string): void {
  const hasActiveLoans = getAll<Loan>(KEYS.loans).some(
    (loan) => loan.bookId === id && loan.status === 'Activo',
  )
  if (hasActiveLoans) throw new Error('No se puede eliminar: el libro tiene préstamos activos')

  saveAll(
    KEYS.books,
    getBooks().filter((book) => book.id !== id),
  )
}