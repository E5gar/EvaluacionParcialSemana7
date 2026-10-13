import { useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import DataTable from '../../components/ui/DataTable'
import { useAuth } from '../../context/useAuth'
import { getActiveLoansByUser, returnLoan } from '../../services/loanService'
import type { Loan } from '../../types'
import { formatDate } from '../../utils/dates'
import styles from './ActiveLoansPage.module.css'

export default function ActiveLoansPage() {
  const { user } = useAuth()
  const [loans, setLoans] = useState<Loan[]>(() => (user ? getActiveLoansByUser(user.id) : []))

  function handleReturn(loanId: string) {
    returnLoan(loanId)
    if (user) setLoans(getActiveLoansByUser(user.id))
  }

  return (
    <main className="page">
      <div className="container">
        <header className="section-head">
          <div className={styles.titulo}>
            <p className="eyebrow">Mis libros</p>
            <h1 className="heading-m">Préstamos activos</h1>
          </div>
        </header>

        {loans.length === 0 ? (
          <div className={styles.vacio}>
            <p>No tienes préstamos activos.</p>
            <Link className="link link-weight" to="/catalogo">
              Ir al catálogo
            </Link>
          </div>
        ) : (
          <DataTable
            data={loans}
            columns={[
              { header: 'Libro', render: (loan) => loan.bookTitle },
              { header: 'Fecha de préstamo', render: (loan) => formatDate(loan.loanDate) },
              { header: 'Fecha límite', render: (loan) => formatDate(loan.dueDate) },
              { header: 'Estado', render: (loan) => <Badge variant="acento">{loan.status}</Badge> },
              {
                header: 'Acciones',
                render: (loan) => (
                  <div className={styles.acciones}>
                    <Link className="link link-weight" to={`/comprobante/${loan.code}`}>
                      Comprobante
                    </Link>
                    <Button variant="contorno" onClick={() => handleReturn(loan.id)}>
                      Devolver
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        )}
      </div>
    </main>
  )
}