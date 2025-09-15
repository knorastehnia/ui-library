import styles from './Table.module.css'

interface HeaderProps { children: React.ReactNode }
interface FooterProps { children: React.ReactNode }
interface BodyProps { children: React.ReactNode }
interface RowProps { children: React.ReactNode }

interface CellProps {
  children: React.ReactNode,
  width?: string,
  colSpan?: number,
  rowSpan?: number,
}

interface TableProps {
  children: React.ReactNode,
  width?: string,
}

type TableComponent = React.FC<TableProps> & {
  Header: React.FC<HeaderProps>,
  Footer: React.FC<FooterProps>,
  Body: React.FC<BodyProps>,
  Row: React.FC<RowProps>,
  Cell: React.FC<CellProps>,
}

const Row: React.FC<RowProps> = ({ children }) => {
  return (
    <tr className={styles['row']}>
      {children}
    </tr>
  )
}

const Cell: React.FC<CellProps> = ({
  children,
  width='auto',
  colSpan=1,
  rowSpan=1,
}) => {
  return (
    <td
      className={styles['cell']}
      width={width}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </td>
  )
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <thead className={styles['header']}>
      {children}
    </thead>
  )
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <tfoot className={styles['footer']}>
      {children}
    </tfoot>
  )
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <tbody className={styles['body']}>
      {children}
    </tbody>
  )
}

const Table: TableComponent = ({
  children,
  width='100%',
}) => {
  return (
    <table
      className={styles['table']}
      style={{ width }}
    >
      {children}
    </table>
  )
}

Table.Header = Header
Table.Footer = Footer
Table.Body = Body
Table.Row = Row
Table.Cell = Cell

export default Table
