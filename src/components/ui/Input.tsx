import { useId, type ComponentProps } from 'react'
import styles from './Input.module.css'

interface InputProps extends ComponentProps<'input'> {
  label: string
  error?: string
}

export default function Input({ label, error, className = '', id, ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className={`${styles.campo} ${className}`}>
      <label className={`${styles.etiquetaCampo} label`} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className={styles.mensajeError}>
          {error}
        </p>
      )}
    </div>
  )
}