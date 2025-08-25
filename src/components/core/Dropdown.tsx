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
      <div className={styles['dropdown-container']}>
        <div className={styles['dropdown']}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Dropdown
