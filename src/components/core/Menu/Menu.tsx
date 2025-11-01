import styles from './Menu.module.css'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Typography } from '../Typography'
import { Button } from '../Button'
import { Flyout } from '../Flyout'

interface ItemInterface {
  icon?: React.ReactElement
  label: string
  items?: ItemInterface[]
  action?: string | Function
  disabled?: boolean
}

interface MenuProps {
  items: ItemInterface[]
  size?: 's' | 'm' | 'l'
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    item?: React.HTMLAttributes<HTMLButtonElement> & { ref?: React.Ref<HTMLButtonElement> }
  }
}

interface MenuItemInterface {
  menuItem: ItemInterface
  index: number
  activeItem: number
  setActiveItem: Function
  size: 's' | 'm' | 'l'
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    item?: React.HTMLAttributes<HTMLButtonElement> & { ref?: React.Ref<HTMLButtonElement> }
  }
}

const MenuContext = createContext<{ closeParent: () => void } | null>(null)

const getChildren = (content: HTMLDivElement) => {
  return Array.from(content.children).flatMap((child) => {
    if ((child as HTMLButtonElement).disabled) return []

    if (child.tagName === 'BUTTON' || child.tagName === 'A') {
      return child
    } else if (child.tagName === 'DIV') {
      return child.querySelector('button')
    }
  }) as HTMLElement[]
}

const Submenu: React.FC<MenuItemInterface> = ({
  menuItem,
  index,
  activeItem,
  setActiveItem,
  size,
  internal,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const rafRef = useRef<number>(null)

  const handleFocus = () => {
    const trigger = triggerRef.current
    if (!trigger) return

    const content = trigger.parentElement?.querySelector(':scope > div > div') as HTMLDivElement
    const children = getChildren(content)

    rafRef.current = requestAnimationFrame(() => {
      children[0].focus()
    })
  }

  const openSubmenu = () => {
    if (isOpen) return

    setIsOpen(true)
    handleFocus()
  }

  const closeSubmenu = () => {
    setIsOpen(false)

    const trigger = triggerRef.current
    rafRef.current = requestAnimationFrame(() => {
      trigger?.focus()
    })
  }

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <Flyout
      isOpen={isOpen}
      onClose={closeSubmenu}
      size={size}
      arrangement='horizontal'
      label={menuItem.label}
      internal={{
        trigger: ({
          action: openSubmenu,

          internal: {
            root: {
              ref: triggerRef,
              tabIndex: activeItem === index ? 0 : -1,
              onFocus: () => setActiveItem(index),
              'aria-expanded': isOpen,
            }
          },
        } as any),
      }}
      {...internal?.item}
    >
      <MenuContext.Provider value={{ closeParent: closeSubmenu }}>
        <Menu items={menuItem.items!} />
      </MenuContext.Provider>
    </Flyout>
  )
}

const Menu: React.FC<MenuProps> = ({
  items,
  size='s',
  internal,
}) => {
  const [activeItem, setActiveItem] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  const ctx = useContext(MenuContext)

  const handleKeyboard = (e: React.KeyboardEvent) => {
    if (!menuRef.current?.children) return
    const content = menuRef.current

    const keys = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
      'PageUp',
      'PageDown',
    ]

    if (!keys.includes(e.key)) return
    e.preventDefault()

    const children = getChildren(content)

    const isActiveLevel = children.find((item) => {
      return item === document.activeElement
    })

    if (!isActiveLevel) return

    let loop = false

    switch (e.key) {
      case 'ArrowLeft':
        if (ctx) ctx.closeParent()

        break

      case 'ArrowRight':
        const active = document.activeElement as HTMLElement
        if (active.getAttribute('aria-expanded') === 'false') active.click()

        break

      case 'ArrowDown':
        loop = true
      case 'PageDown':
        if (content === document.activeElement) {
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
        if (content === document.activeElement) {
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

  const renderItem = (menuItem: ItemInterface, index: number) => {
    if (menuItem.items === undefined) {
      return (
        <Button
          key={`item-${index}`}
          size={size}
          action={menuItem.action}
          surface='hollow'
          width='full'
          disabled={menuItem.disabled}
          internal={{
            root: {
              tabIndex: activeItem === index ? 0 : -1,
              onFocus: () => setActiveItem(index),
            }
          }}
          {...internal?.item}
        >
          <div className={styles['item-content']}>
            {menuItem.icon !== undefined &&
              <div className={styles['icon']}>
                {menuItem.icon}
              </div>
            }

            <Typography>
              {menuItem.label}
            </Typography>
          </div>
        </Button>
      )
    } {
      return (
        <Submenu
          key={`submenu-${index}`}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          menuItem={menuItem}
          index={index}
          size={size}
          internal={internal}
        />
      )
    }
  }

  const renderedItems = items.map((item, index) => {
    return renderItem(item, index)
  })

  return (
    <div
      ref={menuRef}
      className={styles['menu']}
      onKeyDown={handleKeyboard}
      {...internal?.root}
    >
      {renderedItems}
    </div>
  )
}

export { Menu }
export type { MenuProps }
