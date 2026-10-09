import type { ReactNode } from 'react'

export type ColumnHelpers = {
  // The whole row is the click target, but the accessible name has to come from
  // a single real anchor. A cell opts into being that anchor by taking this
  // class, which stretches a pseudo-element over the row.
  linkClassName: string
}

export type Column<Row> = {
  header: string
  cell: (row: Row, helpers: ColumnHelpers) => ReactNode
}

export type TableProps<Row> = {
  columns: Column<Row>[]
  rows: Row[]
  rowKey: (row: Row) => string
}

// Deliberately router-agnostic: a cell renders its own link with whatever
// routing library the consuming app uses, so the design system never has to
// take a router as a dependency.
export function Table<Row>({ columns, rows, rowKey }: TableProps<Row>) {
  return (
    <table className="uiTable">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={rowKey(row)} className="uiTableRow">
            {columns.map((column) => (
              <td key={column.header}>
                {column.cell(row, { linkClassName: 'uiTableRowLink' })}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
