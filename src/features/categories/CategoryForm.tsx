import { useForm } from 'react-hook-form'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { addCategory, updateCategory } from '../../services/categoryService'
import type { Category } from '../../types'
import styles from './CategoryForm.module.css'

interface CategoryFormValues {
  name: string
}

interface CategoryFormProps {
  category?: Category
  onSaved: () => void
  onCancel: () => void
}

export default function CategoryForm({ category, onSaved, onCancel }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CategoryFormValues>({ defaultValues: { name: category?.name ?? '' } })

  function onSubmit(values: CategoryFormValues) {
    try {
      if (category) {
        updateCategory(category.id, values)
      } else {
        addCategory(values)
      }
      onSaved()
    } catch (error) {
      setError('name', {
        message: error instanceof Error ? error.message : 'No se pudo guardar la categoría',
      })
    }
  }

  return (
    <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Nombre de la categoría"
        error={errors.name?.message}
        {...register('name', {
          required: 'El nombre es obligatorio',
          minLength: { value: 3, message: 'Mínimo 3 caracteres' },
          validate: (value) => value.trim().length >= 3 || 'Mínimo 3 caracteres',
        })}
      />
      <div className={styles.acciones}>
        <Button type="submit" variant="acento">
          {category ? 'Guardar cambios' : 'Registrar'}
        </Button>
        <Button type="button" variant="contorno" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}