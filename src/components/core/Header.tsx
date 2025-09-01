import Frost from './Frost'
import styles from './Header.module.css'

interface HeaderProps {
  children: React.ReactNode,
}

const Header: React.FC<HeaderProps> = ({
  children,
}) => {
  return (
    <>
      <header className={styles['header']}>
        <Frost bottom level={1}>
          {children}
        </Frost>
      </header>
    </>
  )
}

export default Header
