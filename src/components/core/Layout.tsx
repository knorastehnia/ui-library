import styles from './Layout.module.css'

interface ContentProps { children: React.ReactNode }
interface SideNavProps { children: React.ReactNode }
interface LayoutProps { children: React.ReactNode }

interface SubsectionProps {
  children: React.ReactNode,
  span?: 1 | 2 | 3,
}

interface SectionProps {
  children: React.ReactNode,
}

interface TopNavProps {
  children: React.ReactNode,
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

const TopNav: React.FC<TopNavProps> = ({
  children,
}) => {
  return (
    <div className={styles['topnav']}>
      <div className={styles['topnav-side']}></div>
      <div className={styles['topnav-content']}>
        {children}
      </div>
    </div>
  )
}

const SideNav: React.FC<SideNavProps> = ({
  children,
}) => {
  return (
    <div className={styles['sidenav']}>
      <div className={styles['sidenav-content']}>
        {children}
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
