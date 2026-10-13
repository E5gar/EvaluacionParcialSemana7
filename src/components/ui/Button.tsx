import type { ComponentProps } from 'react'
import styles from './Button.module.css'

type Variant = 'primario' | 'contorno' | 'acento'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: Variant
}

export default function Button({ variant = 'primario', className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${styles.boton} ${styles[variant]} ${className}`} {...props}>
      <span className={styles.fondo} />
      <span className={styles.texto}>{children}</span>
      <span className={styles.icono} aria-hidden="true">→</span>
    </button>
  )
}