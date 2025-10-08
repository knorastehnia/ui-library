import { createContext, useContext, useEffect, useRef, useState } from 'react'
import styles from './Tabs.module.css'
import Button from './Button'
import Typography from './Typography'
import { createPortal } from 'react-dom'

interface TabProps {
  children: React.ReactNode,
  label: string,
  defaultTab?: boolean,
}

interface TabsProps {
  children: React.ReactNode,
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
          <Button
            type='hollow'
            action={() => ctx.setCurrentTab(label)}
            disabled={ctx.currentTab === label}
          >
            <Typography
              color={ctx.currentTab === label ? 'primary' : 'dimmed'}
              weight={ctx.currentTab === label ? '500' : '300'}
            >
              {label}
            </Typography>
          </Button>,
          ctx.tabListRef.current!
        )
      }

      {ctx.currentTab === label && children}
    </div>
  )
}

const Tabs: TabsComponent = ({
  children,
}) => {
  const [currentTab, setCurrentTab] = useState('')
  const [render, setRender] = useState(false)
  const tabListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!tabListRef.current) return

    setRender(true)
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

export default Tabs
