import { useState } from 'react'
import Button from '../../components/ui/Button'
import DataTable from '../../components/ui/DataTable'
import Modal from '../../components/ui/Modal'
import { deleteCategory, getCategories } from '../../services/categoryService'
import type { Category } from '../../types'
import CategoryForm from './CategoryForm'
import styles from './CategoriesPage.module.css'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(getCategories)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Category | undefined>()
  const [message, setMessage] = useState('')

  function openCreate() {
    setEditing(undefined)
    setOpen(true)
  }

  function openEdit(category: Category) {
    setEditing(category)
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  function handleSaved() {
    setCategories(getCategories())
    setMessage('')
    setOpen(false)
  }

  function handleDelete(category: Category) {
    if (!window.confirm(`¿Eliminar la categoría "${category.name}"?`)) return

    try {
      deleteCategory(category.id)
      setCategories(getCategories())
      setMessage('')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo eliminar la categoría')
    }
  }

  return (
    <main className="page">
      <div className="container">
        <header className="section-head">
          <div className={styles.titulo}>
            <p className="eyebrow">Administración</p>
            <h1 className="heading-m">Categorías</h1>
          </div>
          <Button variant="acento" onClick={openCreate}>
            Nueva categoría
          </Button>
        </header>

        {message && (
          <p role="alert" className={styles.mensaje}>
            {message}
          </p>
        )}

        <DataTable
          data={categories}
          emptyMessage="No hay categorías registradas"
          columns={[
            { header: 'Nombre', render: (category) => category.name },
            {
              header: 'Acciones',
              esAccion: true,
              render: (category) => (
                <div className={styles.acciones}>
                  <Button variant="contorno" onClick={() => openEdit(category)}>
                    Editar
                  </Button>
                  <Button variant="contorno" onClick={() => handleDelete(category)}>
                    Eliminar
                  </Button>
                </div>
              ),
            },
          ]}
        />

        <Modal
          open={open}
          onClose={closeModal}
          title={editing ? 'Editar categoría' : 'Registrar categoría'}
        >
          <CategoryForm category={editing} onSaved={handleSaved} onCancel={closeModal} />
        </Modal>
      </div>
    </main>
  )
}