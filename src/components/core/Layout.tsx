import styles from './Layout.module.css'
import Frost from './Frost'

interface SectionProps {
  children: React.ReactNode,
  top?: boolean,
  bottom?: boolean,
}

interface ContentProps {
  children: React.ReactNode,
}

interface HeaderProps {
  children: React.ReactNode,
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

const Section: React.FC<SectionProps> =({
  children,
  top=false,
  bottom=false,
}) => {
  return(
    <>
      <section className={styles['section']}>
        <Frost padding='80px' top={top} bottom={bottom} level={2}>
          {children}
        </Frost>
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
}) => {
  return (
    <>
      <header className={styles['header']}>
        <Frost padding='10px' bottom level={1}>
          {children}
        </Frost>
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
            <Frost padding='10px' right bottom level={1}></Frost>
          </div>

          <div className={styles['sidebar-content']}>
            <Frost padding='10px' right level={1}>
              {children}
            </Frost>
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
