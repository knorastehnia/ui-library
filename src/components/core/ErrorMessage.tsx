import styles from './ErrorMessage.module.css'
import Alert from '../icons/Alert'
import useCollapseEffect from '../utils/useCollapseEffect'
import TypographyDefaultsContext from '../utils/TypographyDefaultsContext'
import { useRef } from 'react'

interface ErrorMessageProps {
  children: React.ReactElement | React.ReactElement[],
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

        <TypographyDefaultsContext.Provider value={{
          color: 'error',
          size: 's',
        }}>
          {children}
        </TypographyDefaultsContext.Provider>
      </div>
    </div>
  )
}

export default ErrorMessage
