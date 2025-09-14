import styles from './Accordion.module.css'
import Arrow from '../icons/Arrow'
import Typography from './Typography'
import { useEffect, useRef, useState } from 'react'

interface AccordionProps {
  children: React.ReactNode,
  width?: string,
}

interface AccordionItemProps {
  children: React.ReactNode,
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
  const contentRef = useRef(null)

  useEffect(() => {
    const content = contentRef.current as unknown as HTMLDivElement

    if (isOpen) {
      content.style.height = `${content.scrollHeight + 10}px`
    } else {
      content.style.height = '0'
    }
  }, [isOpen])

  return (
    <>
      <button
        className={styles['button']}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typography weight='400'>
          {label}
        </Typography>
        <Arrow state={isOpen} />
      </button>

      <div
        ref={contentRef}
        className={`
          ${styles['content']} 
          ${isOpen && styles['open']}
        `}
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

export default Accordion
