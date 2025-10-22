import styles from './Table.module.css'

interface TableCellProps {
  children: React.ReactElement | React.ReactElement[]
  colSpan?: number
  rowSpan?: number
  internal?: {
    root?: React.HTMLAttributes<HTMLTableCellElement> & { ref?: React.Ref<HTMLTableCellElement> }
  }
}

interface TableRowProps {
  children:
    | React.ReactElement<TableCellProps>
    | React.ReactElement<TableCellProps>[]
  internal?: {
    root?: React.HTMLAttributes<HTMLTableRowElement> & { ref?: React.Ref<HTMLTableRowElement> }
  }
}

interface TableProps {
  children:
    | React.ReactElement<TableRowProps>
    | React.ReactElement<TableRowProps>[]
  internal?: {
    root?: React.HTMLAttributes<HTMLTableElement> & { ref?: React.Ref<HTMLTableElement> }
    content?: React.HTMLAttributes<HTMLTableSectionElement> & { ref?: React.Ref<HTMLTableSectionElement> }
  }
}

type TableComponent = React.FC<TableProps> & {
  Row: React.FC<TableRowProps>
  Cell: React.FC<TableCellProps>
}

const TableCell: React.FC<TableCellProps> = ({
  children,
  colSpan=1,
  rowSpan=1,
  internal,
}) => {
  return (
    <td
      className={styles['cell']}
      colSpan={colSpan}
      rowSpan={rowSpan}
      {...internal?.root}
    >
      {children}
    </td>
  )
}

const TableRow: React.FC<TableRowProps> = ({
  children,
  internal,
}) => {
  return (
    <tr
      className={styles['row']}
      {...internal?.root}
    >
      {children}
    </tr>
  )
}

const Table: TableComponent = ({
  children,
  internal,
}) => {
  return (
    <table
      className={styles['table']}
      {...internal?.root}
    >
      <tbody {...internal?.content}>
        {children}
      </tbody>
    </table>
  )
}

Table.Row = TableRow
Table.Cell = TableCell

export { Table }

export type {
  TableProps,
  TableRowProps,
  TableCellProps,
}
