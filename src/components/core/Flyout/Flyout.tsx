import styles from './Flyout.module.css'
import { createContext, useContext, useState } from 'react'
import { Arrow } from '../../icons'
import { Button, ButtonDefaultsProvider, type ButtonProps } from '../Button'
import { Typography } from '../Typography'
import { Popover, type PopoverProps } from '../Popover'

interface FlyoutProps {
  children: React.ReactElement | React.ReactElement[]
  isOpen?: boolean
  onClose?: Function
  label: string
  size?: 's' | 'm' | 'l'
  arrangement?: 'vertical' | 'horizontal'
  disabled?: boolean
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    trigger?: ButtonProps
    content?: PopoverProps
  }
}

const FlyoutContext = createContext<true | undefined>(undefined)

const Flyout: React.FC<FlyoutProps> = ({
  children,
  isOpen,
  onClose,
  label,
  size='m',
  arrangement,
  disabled=false,
  internal,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)

  const activeIsOpen = isOpen ?? internalIsOpen

  const updateIsOpen = (value: boolean) => {
    isOpen ?? setInternalIsOpen(value)
    activeIsOpen && onClose?.()
  }

  const ctx = useContext(FlyoutContext)
  const activeArrangement = arrangement ?? (!!ctx ? 'horizontal' : 'vertical')

  const closeFlyout = () => {
    updateIsOpen(false)
  }

  const openFlyout = () => {
    if (activeIsOpen) return

    updateIsOpen(true)
  }

  return (
    <div
      className={styles['flyout']}
      {...internal?.root}
    >
      <Button
        action={openFlyout}
        size={size}
        surface='hollow'
        width='full'
        disabled={disabled}
        internal={{ root: { 'aria-expanded': activeIsOpen } }}
        {...internal?.trigger}
      >
        <div className={styles['button-content']}>
          <Typography>{label}</Typography>
          <div style={{
            transform: activeArrangement === 'horizontal' ? 'rotate(-90deg)' : '',
          }}>
            <Arrow state={activeIsOpen} color={disabled ? 'disabled' : undefined} />
          </div>
        </div>
      </Button>

      <Popover
        isOpen={activeIsOpen}
        onClose={closeFlyout}
        arrangement={activeArrangement}
        {...internal?.content}
      >
        <FlyoutContext.Provider value={true}>
          <ButtonDefaultsProvider surface='hollow' width='full'>
            {children}
          </ButtonDefaultsProvider>
        </FlyoutContext.Provider>
      </Popover>
    </div>
  )
}

export { Flyout }
export type { FlyoutProps }
