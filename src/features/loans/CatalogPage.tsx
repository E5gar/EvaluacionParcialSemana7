import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import { useAuth } from '../../context/useAuth'
import { createLoan } from '../../services/loanService'
import { KEYS, getAll } from '../../services/storage'
import type { Book, Category } from '../../types'
import LoanCard from './LoanCard'
import styles from './CatalogPage.module.css'

export default function CatalogPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [books, setBooks] = useState<Book[]>(() => getAll<Book>(KEYS.books))
  const [categories] = useState<Category[]>(() => getAll<Category>(KEYS.categories))
  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [message, setMessage] = useState('')

  const categoryNameById = new Map(categories.map((category) => [category.id, category.name]))
  const normalizedQuery = query.trim().toLowerCase()

  const filteredBooks = books.filter((book) => {
    const categoryName = categoryNameById.get(book.categoryId) ?? ''
    const matchesCategory = categoryId === '' || book.categoryId === categoryId
    const matchesQuery =
      normalizedQuery === '' ||
      book.title.toLowerCase().includes(normalizedQuery) ||
      categoryName.toLowerCase().includes(normalizedQuery)
    return matchesCategory && matchesQuery
  })

  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    ...categories.map((category) => ({ value: category.id, label: category.name })),
  ]

  function handleRequest(book: Book) {
    if (!user) return
    try {
      const loan = createLoan(user.id, book.id)
      navigate(`/comprobante/${loan.code}`)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo registrar el préstamo')
      setBooks(getAll<Book>(KEYS.books))
    }
  }

  return (
    <main className="page">
      <div className="container">
        <div className="grid-12">
          <aside className={styles.intro}>
            <p className="eyebrow">Biblioteca</p>
            <h1 className="heading-m">Catálogo</h1>
            <Input
              label="Buscar por título o categoría"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Select
              label="Categoría"
              options={categoryOptions}
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
            />
            {message && (
              <p className={styles.mensaje} role="alert">
                {message}
              </p>
            )}
          </aside>

          <section className={styles.lista}>
            {filteredBooks.length === 0 && (
              <p className={styles.vacio}>No se encontraron libros con ese criterio.</p>
            )}
            {filteredBooks.map((book) => (
              <LoanCard
                key={book.id}
                book={book}
                categoryName={categoryNameById.get(book.categoryId) ?? 'Sin categoría'}
                onRequest={handleRequest}
              />
            ))}
          </section>
        </div>
      </div>
    </main>
  )
}