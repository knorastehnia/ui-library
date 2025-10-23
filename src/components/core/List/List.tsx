import styles from './List.module.css'

interface ListItemProps {
  children: React.ReactElement | React.ReactElement[]
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    content?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

interface ListProps {
  children:
    | React.ReactElement<ListItemProps>
    | React.ReactElement<ListItemProps>[]
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

type ListComponent = React.FC<ListProps> & {
  Item: React.FC<ListItemProps>,
}

const ListItem: React.FC<ListItemProps> = ({
  children,
  internal,
}) => {
  return (
    <div {...internal?.root}>
      <div
        className={styles['item']}
        {...internal?.content}
      >
        {children}
      </div>
    </div>
  )
}

const List: ListComponent = ({
  children,
  internal,
}) => {
  return (
    <div
      className={styles['list']}
      {...internal?.root}
    >
      {children}
    </div>
  )
}

List.Item = ListItem

export { List }

export type {
  ListProps,
  ListItemProps,
}
