import type { Book, Loan, Receipt, User } from '../types'
import { KEYS, getAll, saveAll, uid } from './storage'
import { LOAN_DAYS, addDays, todayIso } from '../utils/dates'
import { generateLoanCode } from '../utils/generateCode'

export function getLoans(): Loan[] {
  return getAll<Loan>(KEYS.loans)
}

export function getLoansByUser(userId: string): Loan[] {
  return getLoans()
    .filter((loan) => loan.userId === userId)
    .sort((a, b) => b.loanDate.localeCompare(a.loanDate))
}

export function getActiveLoansByUser(userId: string): Loan[] {
  return getLoansByUser(userId).filter((loan) => loan.status === 'Activo')
}

export function createLoan(userId: string, bookId: string): Loan {
  const users = getAll<User>(KEYS.users)
  const books = getAll<Book>(KEYS.books)
  const loans = getLoans()

  const user = users.find((item) => item.id === userId)
  if (!user) throw new Error('Usuario no encontrado')

  const book = books.find((item) => item.id === bookId)
  if (!book) throw new Error('Libro no encontrado')
  if (book.stock <= 0) throw new Error('No hay stock disponible de este libro')

  const alreadyBorrowed = loans.some(
    (loan) => loan.userId === userId && loan.bookId === bookId && loan.status === 'Activo',
  )
  if (alreadyBorrowed) throw new Error('Ya tienes un préstamo activo de este libro')

  const loanDate = todayIso()
  const loan: Loan = {
    id: uid(),
    code: generateLoanCode(),
    userId,
    userName: `${user.firstName} ${user.lastName}`,
    bookId,
    bookTitle: book.title,
    loanDate,
    dueDate: addDays(loanDate, LOAN_DAYS),
    status: 'Activo',
  }

  const receipt: Receipt = {
    id: uid(),
    loanCode: loan.code,
    userName: loan.userName,
    bookTitle: loan.bookTitle,
    loanDate: loan.loanDate,
    dueDate: loan.dueDate,
  }

  saveAll(
    KEYS.books,
    books.map((item) => (item.id === bookId ? { ...item, stock: item.stock - 1 } : item)),
  )
  saveAll(KEYS.loans, [...loans, loan])
  saveAll(KEYS.receipts, [...getAll<Receipt>(KEYS.receipts), receipt])

  return loan
}

export function returnLoan(loanId: string): Loan {
  const loans = getLoans()
  const loan = loans.find((item) => item.id === loanId)
  if (!loan) throw new Error('Préstamo no encontrado')
  if (loan.status === 'Devuelto') return loan

  const returned: Loan = { ...loan, status: 'Devuelto', returnDate: todayIso() }

  saveAll(
    KEYS.loans,
    loans.map((item) => (item.id === loanId ? returned : item)),
  )
  saveAll(
    KEYS.books,
    getAll<Book>(KEYS.books).map((book) =>
      book.id === loan.bookId ? { ...book, stock: book.stock + 1 } : book,
    ),
  )

  return returned
}