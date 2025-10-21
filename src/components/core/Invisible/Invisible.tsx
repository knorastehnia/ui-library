import styles from './Invisible.module.css'

interface InvisibleProps {
  children: React.ReactNode
  internal?: {
    root?: React.RefAttributes<HTMLDivElement>
  }
}

const Invisible: React.FC<InvisibleProps> = ({
  children,
  internal,
}) => {
  return (
    <div
      className={styles['visually-hidden']}
      {...internal?.root}
    >
      {children}
    </div>
  )
}

export { Invisible }
export type { InvisibleProps }
