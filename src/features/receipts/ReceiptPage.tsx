import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { getReceiptByLoanCode } from '../../services/receiptService'
import { downloadReceiptPdf } from '../../utils/receiptPdf'
import ReceiptView from './ReceiptView'
import styles from './ReceiptPage.module.css'

export default function ReceiptPage() {
  const { code = '' } = useParams()
  const navigate = useNavigate()
  const receipt = getReceiptByLoanCode(code)

  function goBack() {
    navigate('/historial')
  }

  return (
    <main className="page">
      <div className="container">
        <header className="section-head">
          <div className={styles.titulo}>
            <p className="eyebrow">Mi cuenta</p>
            <h1 className="heading-m">Comprobante</h1>
          </div>
        </header>

        {receipt ? (
          <>
            <ReceiptView receipt={receipt} />
            <div className={styles.acciones}>
              <Button variant="acento" onClick={() => downloadReceiptPdf(receipt)}>
                Descargar PDF
              </Button>
              <Button variant="contorno" onClick={goBack}>
                Volver
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className={styles.vacio}>No se encontró el comprobante solicitado.</p>
            <div className={styles.acciones}>
              <Button variant="contorno" onClick={goBack}>
                Volver
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}