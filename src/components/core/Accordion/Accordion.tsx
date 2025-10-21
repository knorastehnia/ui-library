import styles from './Accordion.module.css'
import { useEffect, useRef, useState } from 'react'
import { Arrow } from '../../icons'
import { Typography } from '../Typography'
import { useCollapseEffect } from '../../../hooks/useCollapseEffect'

interface AccordionProps {
  children: React.ReactElement | React.ReactElement[]
  width?: string
  internal?: {
    root?: React.RefAttributes<HTMLDivElement>
  }
}

interface AccordionItemProps {
  children: React.ReactElement | React.ReactElement[]
  label: string
  internal?: {
    root?: React.RefAttributes<HTMLDivElement>
    trigger?: React.RefAttributes<HTMLButtonElement>
    content?: React.RefAttributes<HTMLDivElement>
  }
}

type AccordionComponent = React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  label,
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
      <button
        className={styles['button']}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        {...internal?.trigger}
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
        {...internal?.content}
      >
        {children}
      </div>
    </div>
  )
}

const Accordion: AccordionComponent = ({
  children,
  width='100%',
  internal,
}) => {
  return (
    <>
      <div
        className={styles['accordion']}
        style={{ width }}
        {...internal?.root}
      >
        {children}
      </div>
    </>
  )
}

Accordion.Item = AccordionItem

export { Accordion }

export type {
  AccordionProps,
  AccordionItemProps,
}
