import styles from './Tabs.module.css'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Typography } from '../Typography'
import { Button } from '../Button'

interface TabProps {
  children: React.ReactNode
  label: string
  defaultTab?: boolean
  disabled?: boolean
  internal?: {
    root?: React.HTMLAttributes<HTMLButtonElement> & { ref?: React.Ref<HTMLButtonElement> }
  }
}

interface TabsProps {
  children: React.ReactNode
  navigation?: 'focus' | 'select'
  size?: 's' | 'm' | 'l'
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    list?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    content?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

type TabsComponent = React.FC<TabsProps> & {
  Tab: React.FC<TabProps>
}

const TabsContext = createContext<{
  tabListRef: React.RefObject<HTMLDivElement | null>,
  currentTab: string,
  setCurrentTab: Function,
  size: 's' | 'm' | 'l'
} | null>(null)

const Tab: React.FC<TabProps> = ({
  children,
  label,
  defaultTab,
  disabled,
  internal,
}) => {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('<Tabs.Tab> must be a descendant of <Tabs>')

  useEffect(() => {
    if (defaultTab) ctx.setCurrentTab(label)
  }, [])

  return (
    <>
      {
        createPortal(
          <Button
            action={() => ctx.currentTab !== label && ctx.setCurrentTab(label)}
            surface='hollow'
            disabled={disabled}
            size={ctx.size}
            internal={{
              root: {
                tabIndex: ctx.currentTab === label ? 0 : -1,
                style: {
                  backgroundColor: (ctx.currentTab === label || disabled) ? 'transparent' : undefined,
                  borderColor: (ctx.currentTab === label || disabled) ? 'transparent' : undefined
                }
              }
            }}
            {...internal?.root}
          >
            <Typography
              color={ctx.currentTab === label ? 'primary' : disabled ? 'disabled' : 'dimmed'}
              weight={ctx.currentTab === label ? '500' : '300'}
            >
              {label}
            </Typography>
          </Button>,
          ctx.tabListRef.current!
        )
      }

      {ctx.currentTab === label && children}
    </>
  )
}

const Tabs: TabsComponent = ({
  children,
  navigation='focus',
  size='m',
  internal,
}) => {
  const [currentTab, setCurrentTab] = useState('')
  const [render, setRender] = useState(false)

  const tabListRef = useRef<HTMLDivElement>(null)

  const navigate = (e: KeyboardEvent) => {
    if (!tabListRef.current?.children) return
    if (!tabListRef.current.contains(document.activeElement)) return

    const keys = [
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'PageUp',
      'PageDown',
    ]

    if (!keys.includes(e.key)) return
    e.preventDefault()

    const children = Array.from(tabListRef.current.children).filter((child) => {
      return !(child as HTMLButtonElement).disabled
    })

    let loop = false

    switch (e.key) {
      case 'ArrowRight':
        loop = true
      case 'PageDown':
        for (let i = 0; i < children.length; i++) {
          if (children[i] === document.activeElement) {
            const current = children[i === children.length-1 && loop ? 0 : i+1] as HTMLElement
            current.focus()
            navigation === 'select' && current.click()

            break
          }
        }

        break

      case 'ArrowLeft':
        loop = true
      case 'PageUp':
        for (let i = children.length-1; i > -1; i--) {
          if (children[i] === document.activeElement) {
            const current = children[i === 0 && loop ? children.length-1 : i-1] as HTMLElement
            current.focus()
            navigation === 'select' && current.click()
    
            break
          }
        }

        break

      case 'End':
        const lastTab = children[children.length - 1] as HTMLElement
        lastTab.focus()
        navigation === 'select' && lastTab.click()

        break

      case 'Home':
        const firstTab = children[0] as HTMLElement
        firstTab.focus()
        navigation === 'select' && firstTab.click()

        break

      default:
        break
    }
  }

  useEffect(() => {
    if (tabListRef.current) setRender(true)

    document.addEventListener('keydown', navigate)
  }, [])

  return (
    <div
      className={styles['tabs']}
      {...internal?.root}
    >
      <div
        ref={tabListRef}
        className={styles['tab-list']}
        {...internal?.list}
      />

      <div
        className={styles['content']}
        {...internal?.content}
      >
        <TabsContext.Provider value={{
          tabListRef,
          currentTab,
          setCurrentTab,
          size: size,
        }}>
          {render && children}
        </TabsContext.Provider>
      </div>
    </div>
  )
}

Tabs.Tab = Tab

export { Tabs }

export type {
  TabsProps,
  TabProps,
}
