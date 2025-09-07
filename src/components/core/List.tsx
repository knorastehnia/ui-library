import styles from './List.module.css'
import Frost from './Frost'

interface ListItemProps {
  children: React.ReactNode,
}

interface ListProps {
  children: React.ReactNode,
  width?: string,
  size?: 's' | 'm' | 'l',
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
  size='m',
}) => {
  return (
    <>
      <div
        className={styles[`list-${size}`]}
        style={{
          width
        }}
      >
        <Frost all radius level={3}>
          {children}
        </Frost>
      </div>
    </>
  )
}

List.Item = ListItem

export default List
