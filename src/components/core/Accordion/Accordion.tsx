import styles from './Accordion.module.css'
import { useEffect, useRef, useState } from 'react'
import { Arrow } from '../../icons'
import { Typography } from '../Typography'
import { useCollapseEffect } from '../../../hooks/useCollapseEffect'

interface AccordionProps {
  children: React.ReactElement | React.ReactElement[],
  width?: string,
}

interface AccordionItemProps {
  children: React.ReactElement | React.ReactElement[],
  label: string,
}

type AccordionComponent = React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  label,
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
    <>
      <button
        className={styles['button']}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <Typography size='m' weight='400' color='primary'>{label}</Typography>
        <Arrow state={isOpen} />
      </button>

      <div
        ref={contentRef}
        className={`
          ${styles['content']} 
          ${isOpen && styles['open']}
        `}
        aria-hidden={!isOpen}
      >
        {children}
      </div>
    </>
  )
}

const Accordion: AccordionComponent = ({
  children,
  width='100%',
}) => {
  return (
    <>
      <div
        className={styles['accordion']}
        style={{ width }}
      >
        {children}
      </div>
    </>
  )
}

Accordion.Item = AccordionItem

export { Accordion }
