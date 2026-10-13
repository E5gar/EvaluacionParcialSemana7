import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useAuth } from '../../context/useAuth'
import { homePathFor } from '../../utils/homePath'
import styles from './LoginPage.module.css'

interface LoginValues {
  code: string
}

export default function LoginPage() {
  const { user, login } = useAuth()
  const [loginError, setLoginError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>()

  if (user) return <Navigate to={homePathFor(user.role)} replace />

  function onSubmit(values: LoginValues) {
    try {
      login(values.code)
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'No se pudo iniciar sesión')
    }
  }

  return (
    <main className={styles.pagina} data-theme="light">
      <section className={styles.bloque}>
        <p className="eyebrow">Acceso</p>
        <h1 className="heading-m">Biblioteca Universitaria</h1>
        <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            label="Código universitario"
            autoComplete="username"
            error={errors.code?.message ?? (loginError || undefined)}
            {...register('code', {
              required: 'Ingresa tu código universitario',
              onChange: () => setLoginError(''),
            })}
          />
          <Button type="submit" className={styles.accion}>
            Ingresar
          </Button>
        </form>
        <p className={styles.ayuda}>Códigos de prueba: ADMIN, U2024001 o D0001</p>
      </section>
    </main>
  )
}
