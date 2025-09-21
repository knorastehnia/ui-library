import styles from './List.module.css'

interface ListItemProps {
  children: React.ReactNode,
}

interface ListProps {
  children: React.ReactNode,
  width?: string,
  height?: string,
}

type ListComponent = React.FC<ListProps> & {
  Item: React.FC<ListItemProps>
}

const ListItem: React.FC<ListItemProps> = ({
  children,
}) => {
  return (
    <>
      <div className={styles['item']}>{children}</div>
      <div className={styles['divider']}></div>
    </>
  )
}

const List: ListComponent = ({
  children,
  width='100%',
  height='auto',
}) => {
  return (
    <>
      <div
        className={styles['list']}
        style={{ width, height }}
      >
          {children}
      </div>
    </>
  )
}

List.Item = ListItem

export default List
