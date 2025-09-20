import styles from './ErrorMessage.module.css'
import Alert from '../icons/Alert'
import Typography from './Typography'
import useCollapseEffect from '../utils/useCollapseEffect'
import { useRef } from 'react'

interface ErrorMessageProps {
  state?: boolean,
  message: string,
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  state=true,
  message,
}) => {
  const errorRef = useRef<HTMLDivElement>(null)
  useCollapseEffect(errorRef, state, 500)

  return (
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

      <Typography weight='400' size='s' role='p' color='error'>
        {message}
      </Typography>
    </div>
  )
}

export default ErrorMessage
