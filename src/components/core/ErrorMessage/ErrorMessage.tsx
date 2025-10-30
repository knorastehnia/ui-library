import styles from './ErrorMessage.module.css'
import { useRef, useState } from 'react'
import { Alert } from '../../icons'
import { TypographyDefaultsProvider } from '../Typography'
import { useCollapseEffect } from '../../../hooks/useCollapseEffect'

interface ErrorMessageProps {
  children: React.ReactElement | React.ReactElement[]
  state?: boolean
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  state=true,
  internal,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const errorRef = useRef<HTMLDivElement>(null)

  const showMessage = (state: boolean) => {
    state && setIsVisible(true)
  }

  const hideMessage = (state: boolean) => {
    state || setIsVisible(false)
  }

  useCollapseEffect(errorRef, state, 500, showMessage, hideMessage)

  return (
    <div
      className={styles['error-container']}
      aria-hidden={state}
      {...internal?.root}
    >
      <div
        ref={errorRef}
        className={`
          ${styles['error']} 
          ${state ? styles['error-visible'] : ''}
        `}
      >
        {isVisible &&
          <>
            <div className={styles['alert-icon']}>
              <Alert />
            </div>

            <TypographyDefaultsProvider color='error' size='s'>
              {children}
            </TypographyDefaultsProvider>
          </>
        }
      </div>
    </div>
  )
}

export { ErrorMessage }
export type { ErrorMessageProps }
