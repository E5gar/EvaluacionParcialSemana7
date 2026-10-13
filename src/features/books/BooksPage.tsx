import { useState } from 'react'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import DataTable from '../../components/ui/DataTable'
import Modal from '../../components/ui/Modal'
import { deleteBook, getBooks } from '../../services/bookService'
import { getCategories } from '../../services/categoryService'
import type { Book, Category } from '../../types'
import BookForm from './BookForm'
import styles from './BooksPage.module.css'

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>(getBooks)
  const [categories] = useState<Category[]>(getCategories)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Book | undefined>()
  const [message, setMessage] = useState('')

  const notice =
    categories.length === 0 ? 'Registra primero una categoría para poder agregar libros.' : message

  function categoryName(categoryId: string): string {
    return categories.find((category) => category.id === categoryId)?.name ?? 'Sin categoría'
  }

  function openCreate() {
    setEditing(undefined)
    setOpen(true)
  }

  function openEdit(book: Book) {
    setEditing(book)
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  function handleSaved() {
    setBooks(getBooks())
    setMessage('')
    setOpen(false)
  }

  function handleDelete(book: Book) {
    if (!window.confirm(`¿Eliminar el libro "${book.title}"?`)) return

    try {
      deleteBook(book.id)
      setBooks(getBooks())
      setMessage('')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo eliminar el libro')
    }
  }

  function renderStock(book: Book) {
    if (book.stock === 0) return <Badge variant="oscuro">Agotado</Badge>
    if (book.stock <= 2) return <Badge variant="acento">Quedan {book.stock}</Badge>
    return <Badge variant="neutro">Disponible: {book.stock}</Badge>
  }

  return (
    <main className="page">
      <div className="container">
        <header className="section-head">
          <div className={styles.titulo}>
            <p className="eyebrow">Administración</p>
            <h1 className="heading-m">Libros</h1>
          </div>
          <Button variant="acento" onClick={openCreate} disabled={categories.length === 0}>
            Nuevo libro
          </Button>
        </header>

        {notice && (
          <p role="alert" className={styles.mensaje}>
            {notice}
          </p>
        )}

        <DataTable
          data={books}
          emptyMessage="No hay libros registrados"
          columns={[
            { header: 'Título', render: (book) => book.title },
            { header: 'Autor', render: (book) => book.author },
            { header: 'ISBN', render: (book) => book.isbn },
            { header: 'Categoría', render: (book) => categoryName(book.categoryId) },
            { header: 'Stock', render: (book) => renderStock(book) },
            {
              header: 'Acciones',
              esAccion: true,
              render: (book) => (
                <div className={styles.acciones}>
                  <Button variant="contorno" onClick={() => openEdit(book)}>
                    Editar
                  </Button>
                  <Button variant="contorno" onClick={() => handleDelete(book)}>
                    Eliminar
                  </Button>
                </div>
              ),
            },
          ]}
        />

        <Modal open={open} onClose={closeModal} title={editing ? 'Editar libro' : 'Registrar libro'}>
          <BookForm book={editing} onSaved={handleSaved} onCancel={closeModal} />
        </Modal>
      </div>
    </main>
  )
}