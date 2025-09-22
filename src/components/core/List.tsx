import styles from './List.module.css'
import Typography from './Typography'

interface ListItemProps {
  children: React.ReactNode,
  label?: string,
  sublabel?: string,
}

interface ListProps {
  children: React.ReactNode,
  width?: string,
}

type ListComponent = React.FC<ListProps> & {
  Item: React.FC<ListItemProps>,
}

const ListItem: React.FC<ListItemProps> = ({
  children,
  label,
  sublabel,
}) => {
  return (
    <>
      <div className={styles['item']}>
        <div className={styles['labels']}>
          <Typography weight='400'>
            {label}
          </Typography>

          <Typography weight='400' size='s' color='dimmed'>
            {sublabel}
          </Typography>
        </div>

        <div className={styles['content']}>
          {children}
        </div>
      </div>
      <div className={styles['divider']}></div>
    </>
  )
}

const List: ListComponent = ({
  children,
  width='100%',
}) => {
  return (
    <div
      className={styles['list']}
      style={{ width }}
    >
      {children}
    </div>
  )
}

List.Item = ListItem

export default List
