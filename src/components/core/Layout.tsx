import styles from './Layout.module.css'

interface ContentProps { children: React.ReactNode }
interface SidebarProps { children: React.ReactNode }
interface LayoutProps { children: React.ReactNode }

interface SubsectionProps {
  children: React.ReactNode,
  span?: 1 | 2 | 3,
}

interface SectionProps {
  children: React.ReactNode,
}

interface HeaderProps {
  children: React.ReactNode,
  fixed?: boolean,
}

type LayoutComponent = React.FC<LayoutProps> & {
  Header: React.FC<HeaderProps>,
  Sidebar: React.FC<SidebarProps>,
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
        minWidth: '300px',
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

const Header: React.FC<HeaderProps> = ({
  children,
  fixed=false,
}) => {
  return (
    <header
      className={styles['header']}
      style={ fixed ?
        {
          position: 'sticky',
          top: '0',
        }
        : {}
      }
    >
      {children}
    </header>
  )
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
}) => {
  return (
    <div className={styles['sidebar-container']}>
      <div className={styles['sidebar']}>
        <div className={styles['sidebar-header']}></div>
        <div className={styles['sidebar-content']}>{children}</div>
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

Layout.Header = Header
Layout.Sidebar = Sidebar
Layout.Content = Content
Layout.Section = Section
Layout.Subsection = Subsection

export default Layout
