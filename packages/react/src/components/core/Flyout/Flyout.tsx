import styles from './Flyout.module.css'
import { createContext, useContext, useRef, useState } from 'react'
import { Arrow } from '../../icons'
import { Button, ButtonDefaultsProvider, type ButtonProps } from '../Button'
import { Typography, type TypographyProps } from '../Typography'
import { Popover, type PopoverProps } from '../Popover'

interface FlyoutProps {
  children: React.ReactElement | React.ReactElement[]
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  label: string
  size?: 's' | 'm' | 'l'
  arrangement?: 'vertical' | 'horizontal'
  disabled?: boolean
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    button?: ButtonProps
    typography?: TypographyProps
    popover?: PopoverProps
  }
}

const FlyoutContext = createContext<true | undefined>(undefined)

const Flyout: React.FC<FlyoutProps> = ({
  children,
  isOpen,
  onOpenChange,
  label,
  size='m',
  arrangement,
  disabled=false,
  internal,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const activeIsOpen = isOpen ?? internalIsOpen

  const triggerRef = useRef<HTMLDivElement>(null)

  const updateIsOpen = (value: boolean) => {
    if (isOpen === undefined) setInternalIsOpen(value)
    onOpenChange?.(value)
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
        {...internal?.button}
      >
        <div
          ref={triggerRef}
          className={styles['button-content']}
        >
          <Typography {...internal?.typography}>{label}</Typography>
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
        {...internal?.popover}
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
