import { useId, type ComponentProps } from 'react'
import styles from './Select.module.css'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends ComponentProps<'select'> {
  label: string
  error?: string
  options: SelectOption[]
}

export default function Select({ label, error, options, className = '', id, ...props }: SelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const errorId = `${selectId}-error`

  return (
    <div className={`${styles.campo} ${className}`}>
      <label className={`${styles.etiquetaCampo} label`} htmlFor={selectId}>
        {label}
      </label>
      <div className={styles.contenedorSelect}>
        <select
          id={selectId}
          className={styles.control}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p id={errorId} className={styles.mensajeError}>
          {error}
        </p>
      )}
    </div>
  )
}