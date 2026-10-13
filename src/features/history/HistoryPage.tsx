import { useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../../components/ui/Badge'
import DataTable from '../../components/ui/DataTable'
import { useAuth } from '../../context/useAuth'
import { getLoansByUser } from '../../services/loanService'
import type { Loan } from '../../types'
import { formatDate } from '../../utils/dates'
import styles from './HistoryPage.module.css'

type Tab = 'activos' | 'historial'

const tabs: { id: Tab; label: string }[] = [
  { id: 'activos', label: 'Activos' },
  { id: 'historial', label: 'Historial' },
]

export default function HistoryPage() {
  const { user } = useAuth()
  const [loans] = useState<Loan[]>(() => (user ? getLoansByUser(user.id) : []))
  const [tab, setTab] = useState<Tab>('activos')

  const visibleLoans = tab === 'activos' ? loans.filter((loan) => loan.status === 'Activo') : loans

  return (
    <main className="page">
      <div className="container">
        <header className="section-head">
          <div className={styles.titulo}>
            <p className="eyebrow">Mi cuenta</p>
            <h1 className="heading-m">Historial de préstamos</h1>
          </div>
        </header>

        <div className={styles.tabs} role="tablist">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={tab === item.id ? `${styles.tab} ${styles.activo}` : styles.tab}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {visibleLoans.length === 0 ? (
          <p className={styles.vacio}>No hay préstamos para mostrar.</p>
        ) : (
          <DataTable
            data={visibleLoans}
            columns={[
              { header: 'Libro', render: (loan) => loan.bookTitle },
              { header: 'Préstamo', render: (loan) => formatDate(loan.loanDate) },
              { header: 'Fecha límite', render: (loan) => formatDate(loan.dueDate) },
              {
                header: 'Devolución',
                render: (loan) => (loan.returnDate ? formatDate(loan.returnDate) : 'Pendiente'),
              },
              {
                header: 'Estado',
                render: (loan) => (
                  <Badge variant={loan.status === 'Activo' ? 'acento' : 'neutro'}>{loan.status}</Badge>
                ),
              },
              {
                header: 'Comprobante',
                render: (loan) => (
                  <Link className="link link-weight" to={`/comprobante/${loan.code}`}>
                    {loan.code}
                  </Link>
                ),
              },
            ]}
          />
        )}
      </div>
    </main>
  )
}