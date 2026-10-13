import { useForm } from 'react-hook-form'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import { addUser } from '../../services/userService'
import type { UserType } from '../../types'
import styles from './UserForm.module.css'

interface UserFormValues {
  firstName: string
  lastName: string
  code: string
  email: string
  type: UserType
}

interface UserFormProps {
  onSaved: () => void
  onCancel: () => void
}

const typeOptions = [
  { value: 'Estudiante', label: 'Estudiante' },
  { value: 'Docente', label: 'Docente' },
]

export default function UserForm({ onSaved, onCancel }: UserFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserFormValues>({ defaultValues: { type: 'Estudiante' } })

  function onSubmit(values: UserFormValues) {
    try {
      addUser(values)
      onSaved()
    } catch (error) {
      setError('code', {
        message: error instanceof Error ? error.message : 'No se pudo registrar el usuario',
      })
    }
  }

  return (
    <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Nombres"
        error={errors.firstName?.message}
        {...register('firstName', {
          required: 'Los nombres son obligatorios',
          minLength: { value: 2, message: 'Mínimo 2 caracteres' },
        })}
      />
      <Input
        label="Apellidos"
        error={errors.lastName?.message}
        {...register('lastName', {
          required: 'Los apellidos son obligatorios',
          minLength: { value: 2, message: 'Mínimo 2 caracteres' },
        })}
      />
      <Input
        label="Código universitario"
        error={errors.code?.message}
        {...register('code', {
          required: 'El código es obligatorio',
          pattern: { value: /^[A-Za-z0-9]{4,12}$/, message: 'Entre 4 y 12 letras o números' },
        })}
      />
      <Select
        label="Tipo de usuario"
        options={typeOptions}
        error={errors.type?.message}
        {...register('type', { required: 'Selecciona un tipo' })}
      />
      <div className={styles.completo}>
        <Input
          label="Correo electrónico"
          type="email"
          error={errors.email?.message}
          {...register('email', {
            required: 'El correo es obligatorio',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo no válido' },
          })}
        />
      </div>
      <div className={styles.acciones}>
        <Button type="submit" variant="acento">
          Registrar
        </Button>
        <Button type="button" variant="contorno" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}