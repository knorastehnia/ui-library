import styles from './Layout.module.css'

interface ContentProps { children: React.ReactNode }
interface SidebarProps { children: React.ReactNode }
interface LayoutProps { children: React.ReactNode }

interface AreaProps {
  children: React.ReactNode,
  span?: number,
}

interface GridProps {
  children: React.ReactNode,
  areas?: string,
}

interface HeaderProps {
  children: React.ReactNode,
  fixed?: boolean,
}

type LayoutComponent = React.FC<LayoutProps> & {
  Header: React.FC<HeaderProps>,
  Sidebar: React.FC<SidebarProps>,
  Content: React.FC<ContentProps>,
  Grid: React.FC<GridProps>,
  Area: React.FC<AreaProps>,
}

const Area: React.FC<AreaProps> = ({
  children,
  span=8,
}) => {
  return (
    <div
      className={styles['area']}
      style={{ gridColumn: `span ${span}` }}
    >
      {children}
    </div>
  )
}

const Grid: React.FC<GridProps> = ({
  children,
  areas,
}) => {
  return (
    <div
      className={styles['grid']}
      // style={{ gridTemplateAreas: areas }}
    >
      {children}
    </div>
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
      style={{ position: fixed ? 'fixed' : 'static' }}
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
Layout.Grid = Grid
Layout.Area = Area

export default Layout
