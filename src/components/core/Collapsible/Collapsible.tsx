import styles from './Collapsible.module.css'
import { useEffect, useRef, useState } from 'react'
import { Arrow } from '../../icons'
import { Typography, TypographyDefaultsProvider } from '../Typography'
import { Button, ButtonDefaultsProvider, type ButtonProps } from '../Button'
import { useCollapseEffect } from '../../../hooks/useCollapseEffect'

interface CollapsibleProps {
  children: React.ReactElement | React.ReactElement[]
  label: string
  size?: 's' | 'm' | 'l'
  arrangement?: 'leading' | 'trailing'
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    trigger?: ButtonProps
    content?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  label,
  size='m',
  arrangement='trailing',
  internal,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useCollapseEffect(contentRef, isOpen, 500)

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.removeAttribute('inert');
      } else {
        contentRef.current.setAttribute('inert', '');
      }
    }
  }, [isOpen])

  return (
    <div {...internal?.root}>
      <Button
        action={() => setIsOpen(!isOpen)}
        surface='hollow'
        width='full'
        size={size}
        internal={{
          root: {
            "aria-expanded": isOpen
          }
        }}
        {...internal?.trigger}
      >
        <div className={`
          ${styles['trigger-content']} 
          ${styles[`arrangement-${arrangement}`]}
        `}>
          <Typography size='m' weight='400' color='primary'>{label}</Typography>
          <Arrow state={isOpen} />
        </div>
      </Button>

      <div
        ref={contentRef}
        className={`
          ${styles['content']} 
          ${isOpen && styles['open']}
        `}
        aria-hidden={!isOpen}
        {...internal?.content}
      >
        <ButtonDefaultsProvider
          surface='hollow'
          width='full'
          size={size}
        >
          <TypographyDefaultsProvider color='dimmed'>
            {children}
          </TypographyDefaultsProvider>
        </ButtonDefaultsProvider>
      </div>
    </div>
  )
}

export { Collapsible }
export type { CollapsibleProps }
