export type Role = 'admin' | 'user'
export type UserType = 'Estudiante' | 'Docente'
export type LoanStatus = 'Activo' | 'Devuelto'

export interface Category {
  id: string
  name: string
}

export interface Book {
  id: string
  title: string
  author: string
  isbn: string
  categoryId: string
  stock: number
}

export interface User {
  id: string
  firstName: string
  lastName: string
  code: string
  email: string
  type: UserType
  role: Role
}

export interface Loan {
  id: string
  code: string
  userId: string
  userName: string
  bookId: string
  bookTitle: string
  loanDate: string
  dueDate: string
  returnDate?: string
  status: LoanStatus
}

export interface Receipt {
  id: string
  loanCode: string
  userName: string
  bookTitle: string
  loanDate: string
  dueDate: string
}