import styles from './Tabs.module.css'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Typography } from '../Typography'

interface TabProps {
  children: React.ReactNode,
  label: string,
  defaultTab?: boolean,
}

interface TabsProps {
  children: React.ReactNode,
  navigation?: 'focus' | 'select',
}

type TabsComponent = React.FC<TabsProps> & {
  Tab: React.FC<TabProps>
}

const TabsContext = createContext<{
  tabListRef: React.RefObject<HTMLDivElement | null>,
  currentTab: string,
  setCurrentTab: Function,
} | null>(null)

const Tab: React.FC<TabProps> = ({
  children,
  label,
  defaultTab,
}) => {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('<Tabs.Tab> must be a descendant of <Tabs>')

  useEffect(() => {
    if (defaultTab) ctx.setCurrentTab(label)
  }, [])

  return (
    <div className={styles['tab']}>
      {
        createPortal(
          <button
            className={`
              ${styles['button']} 
              ${ctx.currentTab === label && styles['disabled']}
            `}
            onClick={() => ctx.currentTab !== label && ctx.setCurrentTab(label)}
            tabIndex={ctx.currentTab === label ? 0 : -1}
          >
            <Typography
              color={ctx.currentTab === label ? 'primary' : 'dimmed'}
              weight={ctx.currentTab === label ? '500' : '300'}
            >
              {label}
            </Typography>
          </button>,
          ctx.tabListRef.current!
        )
      }

      {ctx.currentTab === label && children}
    </div>
  )
}

const Tabs: TabsComponent = ({
  children,
  navigation='focus',
}) => {
  const [currentTab, setCurrentTab] = useState('')
  const [render, setRender] = useState(false)

  const tabListRef = useRef<HTMLDivElement>(null)

  const navigate = (e: KeyboardEvent) => {
    if (!tabListRef.current?.children) return

    if (e.key === 'ArrowRight') {
      e.preventDefault()

      const children = tabListRef.current.children

      for (let i = 0; i < children.length; i++) {
        if (children[i] === document.activeElement) {
          const current = children[i === children.length-1 ? 0 : i+1]
          ;(current as HTMLElement).focus()
          navigation === 'select' && (current as HTMLElement).click()

          break
        }
      }
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault()

      const children = tabListRef.current.children

      for (let i = children.length-1; i > -1; i--) {
        if (children[i] === document.activeElement) {
          const current = children[i === 0 ? children.length-1 : i-1]
          ;(current as HTMLElement).focus()
          navigation === 'select' && (current as HTMLElement).click()

          break
        }
      }
    }
  }

  useEffect(() => {
    if (tabListRef.current) setRender(true)

    document.addEventListener('keydown', navigate)
  }, [])

  return (
    <div className={styles['tabs']}>
      <div
        ref={tabListRef}
        className={styles['tab-list']}
      />

      <div className={styles['content']}>
        <TabsContext.Provider value={{
          tabListRef,
          currentTab,
          setCurrentTab,
        }}>
          {render && children}
        </TabsContext.Provider>
      </div>
    </div>
  )
}

Tabs.Tab = Tab

export { Tabs }
