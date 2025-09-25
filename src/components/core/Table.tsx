import styles from './Table.module.css'

interface TableCellProps {
  children: React.ReactNode,
  colSpan?: number,
  rowSpan?: number,
}

interface TableRowProps {
  children:
    | React.ReactElement<TableCellProps>
    | React.ReactElement<TableCellProps>[],
}

interface TableProps {
  children:
    | React.ReactElement<TableRowProps>
    | React.ReactElement<TableRowProps>[],
}

type TableComponent = React.FC<TableProps> & {
  Row: React.FC<TableRowProps>,
  Cell: React.FC<TableCellProps>,
}

const TableCell: React.FC<TableCellProps> = ({
  children,
  colSpan=1,
  rowSpan=1,
}) => {
  return (
    <td
      className={styles['cell']}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </td>
  )
}

const TableRow: React.FC<TableRowProps> = ({ children }) => {
  return (
    <tr className={styles['row']}>
      {children}
    </tr>
  )
}

const Table: TableComponent = ({ children }) => {
  return (
    <table className={styles['table']}>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}

Table.Row = TableRow
Table.Cell = TableCell

export default Table
