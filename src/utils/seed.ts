import type { Book, Category, User } from '../types'
import { KEYS, getAll, saveAll } from '../services/storage'

const categories: Category[] = [
  { id: 'cat-1', name: 'Ingeniería de Software' },
  { id: 'cat-2', name: 'Matemáticas' },
  { id: 'cat-3', name: 'Literatura' },
  { id: 'cat-4', name: 'Ciencias' },
]

const books: Book[] = [
  { id: 'book-1', title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', categoryId: 'cat-1', stock: 5 },
  { id: 'book-2', title: 'Introducción a los Algoritmos', author: 'Thomas H. Cormen', isbn: '9780262033848', categoryId: 'cat-1', stock: 2 },
  { id: 'book-3', title: 'Cálculo de una Variable', author: 'James Stewart', isbn: '9786075265322', categoryId: 'cat-2', stock: 3 },
  { id: 'book-4', title: 'Álgebra Lineal', author: 'Stanley Grossman', isbn: '9786071509604', categoryId: 'cat-2', stock: 4 },
  { id: 'book-5', title: 'Cien años de soledad', author: 'Gabriel García Márquez', isbn: '9788497592208', categoryId: 'cat-3', stock: 6 },
  { id: 'book-6', title: 'Los ríos profundos', author: 'José María Arguedas', isbn: '9788437604947', categoryId: 'cat-3', stock: 1 },
  { id: 'book-7', title: 'Física Universitaria', author: 'Sears y Zemansky', isbn: '9786073221245', categoryId: 'cat-4', stock: 0 },
  { id: 'book-8', title: 'Breve historia del tiempo', author: 'Stephen Hawking', isbn: '9788498929805', categoryId: 'cat-4', stock: 3 },
]

const users: User[] = [
  {
    id: 'usr-admin',
    firstName: 'Administrador',
    lastName: 'Biblioteca',
    code: 'ADMIN',
    email: 'admin@uncp.edu.pe',
    type: 'Docente',
    role: 'admin',
  },
  {
    id: 'usr-1',
    firstName: 'Ana',
    lastName: 'Torres Quispe',
    code: 'U2024001',
    email: 'ana.torres@uncp.edu.pe',
    type: 'Estudiante',
    role: 'user',
  },
  {
    id: 'usr-2',
    firstName: 'Luis',
    lastName: 'Mendoza Rojas',
    code: 'D0001',
    email: 'luis.mendoza@uncp.edu.pe',
    type: 'Docente',
    role: 'user',
  },
]

export function seedData() {
  if (getAll<User>(KEYS.users).length > 0) return
  saveAll(KEYS.users, users)
  saveAll(KEYS.categories, categories)
  saveAll(KEYS.books, books)
}