import type { ReactNode } from 'react'
import styles from './DataTable.module.css'

export interface Column<T> {
  header: string
  render: (row: T) => ReactNode
  esAccion?: boolean
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: string
}

export default function DataTable<T extends { id: string }>({
  columns,
  data,
  emptyMessage = 'Sin registros',
}: DataTableProps<T>) {
  return (
    <div className="table-scroll">
      <table className={styles.tabla}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.header} className={`${styles.encabezado} label`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className={styles.celda} colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className={styles.fila}>
                {columns.map((column) => (
                  <td
                    key={column.header}
                    className={column.esAccion ? `${styles.celda} ${styles.acciones}` : styles.celda}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}