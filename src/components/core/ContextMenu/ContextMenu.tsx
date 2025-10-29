import styles from './ContextMenu.module.css'
import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Typography } from '../Typography'
import { Popover, type PopoverProps } from '../Popover'
import { Button, type ButtonProps } from '../Button'

interface ItemInterface {
  label: string
  action?: string | Function
  disabled?: boolean
}

interface ContextMenuProps {
  children: React.ReactElement | React.ReactElement[]
  items: ItemInterface[]
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    display?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    content?: PopoverProps
    trigger?: ButtonProps
  }
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  items,
  internal,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const contextRef = useRef<HTMLDivElement>(null)

  const openContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    if (contextRef?.current?.contains(event.target as HTMLElement)) return

    setPos({
      x: event.clientX + window.scrollX,
      y: event.clientY + window.scrollY,
    })
    setIsOpen(true)

    document.body.style.overflow = 'hidden'
  }

  const closeContextMenu = () => {
    setIsOpen(false)

    document.body.style.overflow = 'auto'
  }

  useLayoutEffect(() => {
    isOpen && contextRef.current?.focus()
  }, [isOpen])

  const handleKeyboard = (e: React.KeyboardEvent) => {
    if (!contextRef.current?.children) return
    const content = contextRef.current.querySelector('div')!

    const keys = [
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
      'PageUp',
      'PageDown',
    ]

    if (!keys.includes(e.key)) return
    e.preventDefault()

    const children = Array.from(content.children).filter((child) => {
      return !(child as HTMLButtonElement).disabled
    }) as HTMLElement[]

    let loop = false

    switch (e.key) {
      case 'ArrowDown':
        loop = true
      case 'PageDown':
        if (!content.contains(document.activeElement)) {
          children[0].focus()

          break
        }

        for (let i = 0; i < children.length; i++) {
          if (children[i] === document.activeElement) {
            const current = children[i === children.length-1 && loop ? 0 : i+1]
            if (current !== undefined) current.focus()

            break
          }
        }

        break

      case 'ArrowUp':
        loop = true
      case 'PageUp':
        if (!content.contains(document.activeElement)) {
          children[children.length - 1].focus()

          break
        }

        for (let i = children.length-1; i > -1; i--) {
          if (children[i] === document.activeElement) {
            const current = children[i === 0 && loop ? children.length-1 : i-1]
            if (current !== undefined) current.focus()
    
            break
          }
        }

        break

      case 'End':
        const lastTab = children[children.length - 1]
        lastTab.focus()

        break

      case 'Home':
        const firstTab = children[0]
        firstTab.focus()

        break

      default:
        break
    }
  }

  return (
    <div
      className={styles['context-container']}
      onContextMenu={openContextMenu}
      {...internal?.root}
    >
      {children}

      {
        createPortal(
          <div
            ref={contextRef}
            className={styles['context-menu']}
            style={{ top: pos.y, left: pos.x, }}
            onKeyDown={handleKeyboard}
            tabIndex={-1}
            {...internal?.display}
          >
            <Popover
              isOpen={isOpen}
              onClose={closeContextMenu}
              {...internal?.content}
            >
              {items.map((item, index) => {
                return (
                  <Button
                    key={index}
                    action={item.action}
                    surface='hollow'
                    width='full'
                    disabled={item.disabled}
                    {...internal?.trigger}
                  >
                    <Typography>
                      {item.label}
                    </Typography>
                  </Button>
                )
              })}
            </Popover>
          </div>,

          document.querySelector('#root')!
        )
      }
    </div>
  )
}

export { ContextMenu }
export type { ContextMenuProps }
