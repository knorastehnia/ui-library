import styles from './Layout.module.css'
import { useState } from 'react'
import { Button, type ButtonProps } from '../Button'
import { T } from '../Typography'

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
  }
}

interface SideNavProps {
  children: React.ReactElement | React.ReactElement[]
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    trigger?: ButtonProps
    content?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

interface ContentProps {
  children: React.ReactElement | React.ReactElement[]
  internal?: {
    root?: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  }
}

interface SubsectionProps {
  children: React.ReactElement | React.ReactElement[]
  span?: 1 | 2 | 3
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
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
  Subsection: React.FC<SubsectionProps>
}

const Subsection: React.FC<SubsectionProps> = ({
  children,
  span=3,
  internal,
}) => {
  return (
    <div
      className={styles['subsection']}
      style={{
        flex: `1 0 ${span * 100 / 3}%`,
      }}
      {...internal?.root}
    >
      {children}
    </div>
  )
}

const Section: React.FC<SectionProps> = ({
  children,
  internal,
}) => {
  return (
    <>
      <section className={styles['section']} {...internal?.root}>
        <div className={styles['section-content']}>
          {children}
        </div>
      </section>
    </>
  )
}

const Content: React.FC<ContentProps> = ({
  children,
  internal,
}) => {
  return (
    <main className={styles['content']} {...internal?.root}>{children}</main>
  )
}

const TopNav: React.FC<TopNavProps> = ({
  children,
  internal,
}) => {
  return (
    <div className={styles['topnav']} {...internal?.root}>
      <div className={styles['topnav-content']}>
        {children}
      </div>
    </div>
  )
}

const SideNav: React.FC<SideNavProps> = ({
  children,
  internal,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

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
          <Button
            appearance='hollow'
            action={() => setIsCollapsed(!isCollapsed)}
            {...internal?.trigger}
          >
            <T>_</T>
          </Button>
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
Layout.Subsection = Subsection

export { Layout }

export type {
  LayoutProps,
  TopNavProps,
  SideNavProps,
  ContentProps,
  SubsectionProps,
  SectionProps,
}
