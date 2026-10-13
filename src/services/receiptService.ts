import type { Receipt } from '../types'
import { KEYS, getAll } from './storage'

export function getReceiptByLoanCode(code: string): Receipt | undefined {
  return getAll<Receipt>(KEYS.receipts).find((receipt) => receipt.loanCode === code)
}