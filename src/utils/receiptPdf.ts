import { jsPDF } from 'jspdf'
import type { Receipt } from '../types'
import { formatDate } from './dates'

const MARGIN_X = 20
const PAGE_WIDTH = 210
const RIGHT_X = PAGE_WIDTH - MARGIN_X
const VALUE_X = 80
const VALUE_WIDTH = RIGHT_X - VALUE_X
const LINE_HEIGHT = 6
const THIN_LINE = 0.2

export function downloadReceiptPdf(receipt: Receipt): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const rows: [string, string][] = [
    ['Usuario', receipt.userName],
    ['Libro prestado', receipt.bookTitle],
    ['Fecha de préstamo', formatDate(receipt.loanDate)],
    ['Fecha límite de devolución', formatDate(receipt.dueDate)],
  ]

  doc.setDrawColor(0, 0, 0)
  doc.setTextColor(0, 0, 0)
  doc.setLineWidth(THIN_LINE)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('BIBLIOTECA UNIVERSITARIA', MARGIN_X, 25)
  doc.text('COMPROBANTE DE PRÉSTAMO', MARGIN_X, 31)
  doc.line(MARGIN_X, 36, RIGHT_X, 36)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(26)
  doc.text(receipt.loanCode, MARGIN_X, 56)
  doc.line(MARGIN_X, 64, RIGHT_X, 64)

  doc.setFontSize(11)
  let y = 76
  rows.forEach(([label, value]) => {
    const lines: string[] = doc.splitTextToSize(value, VALUE_WIDTH)
    doc.setFont('helvetica', 'normal')
    doc.text(label, MARGIN_X, y)
    doc.setFont('helvetica', 'bold')
    doc.text(lines, VALUE_X, y)
    const bottom = y + (lines.length - 1) * LINE_HEIGHT + 4
    doc.line(MARGIN_X, bottom, RIGHT_X, bottom)
    y = bottom + 10
  })

  doc.save(`comprobante-${receipt.loanCode}.pdf`)
}