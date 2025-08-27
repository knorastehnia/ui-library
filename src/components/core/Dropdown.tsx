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
        <Frost all radius level={3}>
          {children}
        </Frost>
      </div>
    </>
  )
}

export default Dropdown
