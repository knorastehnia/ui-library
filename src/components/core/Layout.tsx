import { useState } from 'react'
import styles from './Layout.module.css'
import Button from './Button'
import { T } from './Typography'

interface LayoutProps {
  children: React.ReactElement | React.ReactElement[],
}

interface TopNavProps {
  children: React.ReactElement | React.ReactElement[],
}

interface SideNavProps {
  children: React.ReactElement | React.ReactElement[],
}

interface ContentProps {
  children: React.ReactElement | React.ReactElement[],
}

interface SubsectionProps {
  children: React.ReactElement | React.ReactElement[],
  span?: 1 | 2 | 3,
}

interface SectionProps {
  children: React.ReactElement | React.ReactElement[],
}

type LayoutComponent = React.FC<LayoutProps> & {
  TopNav: React.FC<TopNavProps>,
  SideNav: React.FC<SideNavProps>,
  Content: React.FC<ContentProps>,
  Section: React.FC<SectionProps>,
  Subsection: React.FC<SubsectionProps>,
}

const Subsection: React.FC<SubsectionProps> = ({
  children,
  span=3,
}) => {
  return (
    <div
      className={styles['subsection']}
      style={{
        flex: `1 0 ${span * 100 / 3}%`,
      }}
    >
      {children}
    </div>
  )
}

const Section: React.FC<SectionProps> = ({
  children,
}) => {
  return (
    <>
      <section className={styles['section']}>
        <div className={styles['section-content']}>
          {children}
        </div>
      </section>

      <div className={styles['section-divider']}></div>
    </>
  )
}

const Content: React.FC<ContentProps> = ({
  children,
}) => {
  return (
    <main className={styles['content']}>{children}</main>
  )
}

const TopNav: React.FC<TopNavProps> = ({
  children,
}) => {
  return (
    <div className={styles['topnav']}>
      <div className={styles['topnav-content']}>
        {children}
      </div>
    </div>
  )
}

const SideNav: React.FC<SideNavProps> = ({
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={styles['sidenav']}>
      <div
        className={`
          ${styles['sidenav-fixed']} 
          ${isCollapsed && styles['collapsed']}
        `}
      >
        <div className={styles['sidenav-header']}>
          <Button
            type='hollow'
            action={() => setIsCollapsed(!isCollapsed)}
          >
            <T>_</T>
          </Button>
        </div>

        <div className={styles['sidenav-main']}>
          {children}
        </div>
      </div>
    </div>
  )
}

const Layout: LayoutComponent = ({
  children,
}) => {
  return (
    <div className={styles['layout']}>{children}</div>
  )
}

Layout.TopNav = TopNav
Layout.SideNav = SideNav
Layout.Content = Content
Layout.Section = Section
Layout.Subsection = Subsection

export default Layout
