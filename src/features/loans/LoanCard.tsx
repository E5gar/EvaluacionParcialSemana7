import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import type { Book } from '../../types'
import styles from './LoanCard.module.css'

interface LoanCardProps {
  book: Book
  categoryName: string
  onRequest: (book: Book) => void
}

function AvailabilityBadge({ stock }: { stock: number }) {
  if (stock === 0) return <Badge variant="oscuro">Agotado</Badge>
  if (stock <= 2) return <Badge variant="acento">Quedan {stock}</Badge>
  return <Badge variant="neutro">Disponible: {stock}</Badge>
}

export default function LoanCard({ book, categoryName, onRequest }: LoanCardProps) {
  return (
    <Card className={styles.tarjeta}>
      <p className="label">{categoryName}</p>
      <h3 className="heading-xs">{book.title}</h3>
      <p className={styles.autor}>{book.author}</p>
      <p className="label">ISBN {book.isbn}</p>
      <div className={styles.pie}>
        <AvailabilityBadge stock={book.stock} />
        <Button disabled={book.stock === 0} onClick={() => onRequest(book)}>
          Solicitar
        </Button>
      </div>
    </Card>
  )
}