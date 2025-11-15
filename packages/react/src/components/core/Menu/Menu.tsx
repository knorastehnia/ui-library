import styles from './Menu.module.css'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Typography, type TypographyProps } from '../Typography'
import { Button } from '../Button'
import { Flyout } from '../Flyout'

interface ItemInterface {
  icon?: React.ReactElement
  label: string
  items?: ItemInterface[]
  action?: string | ((e: React.MouseEvent) => void)
  disabled?: boolean
}

interface MenuProps {
  items: ItemInterface[]
  size?: 's' | 'm' | 'l'
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    typography?: TypographyProps
  }
}

interface SubmenuInterface {
  menuItem: ItemInterface
  index: number
  activeItem: number
  setActiveItem: (value: number) => void
  size: 's' | 'm' | 'l'
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

const Submenu: React.FC<SubmenuInterface> = ({
  menuItem,
  index,
  activeItem,
  setActiveItem,
  size,
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
      onOpenChange={(isOpen) => !isOpen ? closeSubmenu() : openSubmenu()}
      size={size}
      arrangement='horizontal'
      label={menuItem.label}
      internal={{
        button: ({
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
    >
      <MenuContext.Provider value={{ closeParent: closeSubmenu }}>
        <Menu size={size} items={menuItem.items!} />
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
    const menu = content.parentElement as HTMLDivElement

    const keys = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
      'PageUp',
      'PageDown',
      'Tab',
    ]

    if (!keys.includes(e.key)) return
    if (e.key === 'Tab' && ctx === null) return
    e.preventDefault()

    const children = getChildren(content)

    const isActiveLevel = children.find((item) => {
      return item === document.activeElement
    })

    if (!isActiveLevel && menu !== document.activeElement) return

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
        if (menu === document.activeElement) {
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
        if (menu === document.activeElement) {
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

      case 'Tab':
        if (ctx) ctx.closeParent()

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
        >
          <div className={styles['item-content']}>
            {menuItem.icon !== undefined &&
              <div className={styles['icon']}>
                {menuItem.icon}
              </div>
            }

            <Typography {...internal?.typography}>
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
        />
      )
    }
  }

  const renderedItems = items.map((item, index) => {
    return renderItem(item, index)
  })

  return (
    <div
      className={styles['menu']}
      onKeyDown={handleKeyboard}
      tabIndex={-1}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          ctx && ctx.closeParent()
        }
      }}
      {...internal?.root}
    >
      <div ref={menuRef}>
        {renderedItems}
      </div>
    </div>
  )
}

export { Menu }
export type { MenuProps }
