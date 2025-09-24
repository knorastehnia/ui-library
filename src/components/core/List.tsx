import styles from './List.module.css'

interface ListItemProps {
  children: React.ReactNode,
}

interface ListProps {
  children:
    | React.ReactElement<ListItemProps>
    | React.ReactElement<ListItemProps>[],
}

type ListComponent = React.FC<ListProps> & {
  Item: React.FC<ListItemProps>,
}

const ListItem: React.FC<ListItemProps> = ({
  children,
}) => {
  return (
    <>
      <div className={styles['item']}>
        {children}
      </div>
      <div className={styles['divider']}></div>
    </>
  )
}

const List: ListComponent = ({
  children,
}) => {
  return (
    <div className={styles['list']}>
      {children}
    </div>
  )
}

List.Item = ListItem

export default List
