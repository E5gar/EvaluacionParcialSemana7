import type { Receipt } from '../../types'
import { formatDate } from '../../utils/dates'
import styles from './ReceiptView.module.css'

interface ReceiptViewProps {
  receipt: Receipt
}

export default function ReceiptView({ receipt }: ReceiptViewProps) {
  return (
    <article className={styles.comprobante}>
      <p className="eyebrow">Comprobante de préstamo</p>
      <p className={styles.codigo}>{receipt.loanCode}</p>
      <dl className={styles.resumen}>
        <div className={styles.fila}>
          <dt>Usuario</dt>
          <dd>{receipt.userName}</dd>
        </div>
        <div className={styles.fila}>
          <dt>Libro prestado</dt>
          <dd>{receipt.bookTitle}</dd>
        </div>
        <div className={styles.fila}>
          <dt>Fecha de préstamo</dt>
          <dd>{formatDate(receipt.loanDate)}</dd>
        </div>
        <div className={styles.fila}>
          <dt>Fecha límite de devolución</dt>
          <dd>{formatDate(receipt.dueDate)}</dd>
        </div>
      </dl>
    </article>
  )
}