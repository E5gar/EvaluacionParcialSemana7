import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import { addBook, updateBook } from '../../services/bookService'
import { getCategories } from '../../services/categoryService'
import type { Book } from '../../types'
import styles from './BookForm.module.css'

interface BookFormValues {
  title: string
  author: string
  isbn: string
  categoryId: string
  stock: number
}

interface BookFormProps {
  book?: Book
  onSaved: () => void
  onCancel: () => void
}

function buildCategoryOptions() {
  return [
    { value: '', label: 'Seleccione una categoría' },
    ...getCategories().map((category) => ({ value: category.id, label: category.name })),
  ]
}

function isValidIsbn(value: string): boolean {
  const digits = value.replace(/[-\s]/g, '')
  return /^(\d{9}[\dXx]|\d{13})$/.test(digits)
}

export default function BookForm({ book, onSaved, onCancel }: BookFormProps) {
  const [categoryOptions] = useState(buildCategoryOptions)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<BookFormValues>({
    defaultValues: {
      title: book?.title ?? '',
      author: book?.author ?? '',
      isbn: book?.isbn ?? '',
      categoryId: book?.categoryId ?? '',
      stock: book?.stock ?? 1,
    },
  })

  function onSubmit(values: BookFormValues) {
    try {
      if (book) {
        updateBook(book.id, values)
      } else {
        addBook(values)
      }
      onSaved()
    } catch (error) {
      setError('isbn', {
        message: error instanceof Error ? error.message : 'No se pudo guardar el libro',
      })
    }
  }

  return (
    <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.completo}>
        <Input
          label="Título"
          error={errors.title?.message}
          {...register('title', {
            required: 'El título es obligatorio',
            validate: (value) => value.trim().length >= 2 || 'Mínimo 2 caracteres',
          })}
        />
      </div>
      <Input
        label="Autor"
        error={errors.author?.message}
        {...register('author', {
          required: 'El autor es obligatorio',
          validate: (value) => value.trim().length >= 3 || 'Mínimo 3 caracteres',
        })}
      />
      <Input
        label="ISBN"
        error={errors.isbn?.message}
        {...register('isbn', {
          required: 'El ISBN es obligatorio',
          validate: (value) => isValidIsbn(value) || 'ISBN no válido (10 o 13 dígitos)',
        })}
      />
      <Select
        label="Categoría"
        options={categoryOptions}
        error={errors.categoryId?.message}
        {...register('categoryId', { required: 'Selecciona una categoría' })}
      />
      <Input
        label="Stock disponible"
        type="number"
        min={0}
        step={1}
        error={errors.stock?.message}
        {...register('stock', {
          required: 'El stock es obligatorio',
          valueAsNumber: true,
          min: { value: 0, message: 'El stock no puede ser negativo' },
          validate: (value) => Number.isInteger(value) || 'Debe ser un número entero',
        })}
      />
      <div className={styles.acciones}>
        <Button type="submit" variant="acento">
          {book ? 'Guardar cambios' : 'Registrar'}
        </Button>
        <Button type="button" variant="contorno" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}