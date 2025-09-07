import styles from './Accordion.module.css'
import List from './List'
import Arrow from '../icons/Arrow'
import { useEffect, useRef, useState } from 'react'

interface AccordionProps {
  children: React.ReactNode,
  width?: string,
  size?: 'n' | 's' | 'm' | 'l',
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
      <List.Item>
        <button
          className={styles['button']}
          onClick={() => setIsOpen(!isOpen)}
        >
          {label}
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
      </List.Item>
    </>
  )
}

const Accordion: AccordionComponent = ({
  children,
  width='100%',
  size='m',
}) => {
  return (
    <>
      <div className={styles[`accordion-${size}`]}>
        <List size='n' width={width}>
          {children}
        </List>
      </div>
    </>
  )
}

Accordion.Item = AccordionItem

export default Accordion
