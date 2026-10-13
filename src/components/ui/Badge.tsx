import type { ReactNode } from 'react'
import styles from './Badge.module.css'

type Variant = 'neutro' | 'acento' | 'oscuro'

interface BadgeProps {
  variant?: Variant
  className?: string
  children: ReactNode
}

export default function Badge({ variant = 'neutro', className = '', children }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[variant]} ${className}`}>{children}</span>
}