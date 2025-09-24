import styles from './ErrorMessage.module.css'
import Alert from '../icons/Alert'
import Typography from './Typography'
import useCollapseEffect from '../utils/useCollapseEffect'
import { useRef } from 'react'

interface ErrorMessageProps {
  children: React.ReactNode,
  state?: boolean,
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  state=true,
}) => {
  const errorRef = useRef<HTMLDivElement>(null)
  useCollapseEffect(errorRef, state, 500)

  return (
    <div className={styles['error-container']}>
      <div
        ref={errorRef}
        className={`
          ${styles['error']} 
          ${state ? styles['error-visible'] : ''}
        `}
      >
        <div className={styles['alert-icon']}>
          <Alert />
        </div>

        <Typography weight='400' size='s' type='p' color='error'>
          {children}
        </Typography>
      </div>
    </div>
  )
}

export default ErrorMessage
