import Frost from './Frost'
import styles from './Dropdown.module.css'

interface DropdownProps {
  children: React.ReactNode,
  open: boolean,
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  open=false,
}) => {
  return (
    <>
      <div className={styles['dropdown']}>
        <Frost padding='15px 10px' all radius level={3}>
          {children}
        </Frost>
      </div>
    </>
  )
}

export default Dropdown
