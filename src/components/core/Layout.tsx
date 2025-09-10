import styles from './Layout.module.css'

interface SectionProps {
  children: React.ReactNode,
}

interface ContentProps {
  children: React.ReactNode,
}

interface HeaderProps {
  children: React.ReactNode,
  fixed?: boolean,
}

interface SidebarProps {
  children: React.ReactNode,
}

interface LayoutProps {
  children: React.ReactNode,
}

type LayoutComponent = React.FC<LayoutProps> & {
  Header: React.FC<HeaderProps>,
  Sidebar: React.FC<SidebarProps>,
  Content: React.FC<ContentProps>,
  Section: React.FC<SectionProps>,
}

const Section: React.FC<SectionProps> = ({
  children,
}) => {
  return(
    <>
      <section className={styles['section']}>
        {children}
      </section>
    </>
  )
}

const Content: React.FC<ContentProps> = ({
  children,
}) => {
  return (
    <>
      <main className={styles['content']}>
        {children}
      </main>
    </>
  )
}

const Header: React.FC<HeaderProps> = ({
  children,
  fixed=false,
}) => {
  return (
    <>
      <header
        className={styles['header']}
        style={{
          position: fixed ? 'fixed' : 'static'
        }}
      >
        {children}
      </header>
    </>
  )
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
}) => {
  return (
    <>
      <div className={styles['sidebar']}>
        <div className={styles['sidebar-fixed']}>
          <div className={styles['sidebar-header']}>
          </div>

          <div className={styles['sidebar-content']}>
              {children}
          </div>
        </div>
      </div>
    </>
  )
}

const Layout: LayoutComponent = ({
  children,
}) => {
  return (
    <>
      <div className={styles['layout']}>
        {children}
      </div>
    </>
  )
}

Layout.Header = Header
Layout.Sidebar = Sidebar
Layout.Content = Content
Layout.Section = Section

export default Layout
