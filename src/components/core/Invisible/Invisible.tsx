import styles from './Invisible.module.css'

interface VisuallyHiddenProps {
  children: React.ReactNode,
}

const Invisible: React.FC<VisuallyHiddenProps> = ({
  children,
}) => {
  return (
    <div className={styles['visually-hidden']}>
      {children}
    </div>
  )
}

export { Invisible }
