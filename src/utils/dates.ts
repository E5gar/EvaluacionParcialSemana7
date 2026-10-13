const DAY_IN_MS = 24 * 60 * 60 * 1000

export const LOAN_DAYS = 7

export function todayIso(): string {
  return new Date().toISOString()
}

export function addDays(iso: string, days: number): string {
  return new Date(new Date(iso).getTime() + days * DAY_IN_MS).toISOString()
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}