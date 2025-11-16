import styles from './Layout.module.css'
import { useState } from 'react'
import { Button, type ButtonProps } from '../Button'
import { Burger } from '../../icons'

interface LayoutProps {
  children: React.ReactElement | React.ReactElement[]
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

interface TopNavProps {
  children: React.ReactElement | React.ReactElement[]
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    content?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

interface SideNavProps {
  children: React.ReactElement | React.ReactElement[]
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    button?: ButtonProps
    content?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

interface ContentProps {
  children: React.ReactElement | React.ReactElement[]
  internal?: {
    root?: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  }
}

interface SectionProps {
  children: React.ReactElement | React.ReactElement[]
  internal?: {
    root?: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  }
}

type LayoutComponent = React.FC<LayoutProps> & {
  TopNav: React.FC<TopNavProps>
  SideNav: React.FC<SideNavProps>
  Content: React.FC<ContentProps>
  Section: React.FC<SectionProps>
}

const Section: React.FC<SectionProps> = ({
  children,
  internal,
}) => {
  return (
    <>
      <section
        className={styles['section']}
        {...internal?.root}
      >
        {children}
      </section>
    </>
  )
}

const Content: React.FC<ContentProps> = ({
  children,
  internal,
}) => {
  return (
    <main
      className={styles['content']}
      {...internal?.root}
    >
      {children}
    </main>
  )
}

const TopNav: React.FC<TopNavProps> = ({
  children,
  internal,
}) => {
  return (
    <div
      className={styles['topnav']}
      {...internal?.root}
    >
      <div
        className={styles['topnav-content']}
        {...internal?.content}
      >
        {children}
      </div>
    </div>
  )
}

const SideNav: React.FC<SideNavProps> = ({
  children,
  internal,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div
      className={styles['sidenav']}
      {...internal?.root}
    >
      <div
        className={`
          ${styles['sidenav-fixed']} 
          ${isCollapsed && styles['collapsed']}
        `}
      >
        <div className={styles['sidenav-header']}>
          <div className={styles['burger']}>
            <Button
              surface='hollow'
              action={() => setIsCollapsed(!isCollapsed)}
              internal={{
                root: {
                  'aria-label': isCollapsed ? 'Open sidebar' : 'Close sidebar'
                }
              }}
              {...internal?.button}
            >
              <Burger state={!isCollapsed} />
            </Button>
          </div>
        </div>

        <div
          className={styles['sidenav-main']}
          {...internal?.content}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

const Layout: LayoutComponent = ({
  children,
  internal,
}) => {
  return (
    <div
      className={styles['layout']}
      {...internal?.root}
    >
      {children}
    </div>
  )
}

Layout.TopNav = TopNav
Layout.SideNav = SideNav
Layout.Content = Content
Layout.Section = Section

export { Layout }

export type {
  LayoutProps,
  TopNavProps,
  SideNavProps,
  ContentProps,
  SectionProps,
}
