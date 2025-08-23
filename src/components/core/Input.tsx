import styles from './Input.module.css'

interface InputProps {
  children: React.ReactNode,
  type: 'text' | 'password',
  name: string,
}

const Input: React.FC<InputProps> = ({
  children,
  type,
  name,
}) => {
  return (
    <>
      <label
        className={styles['label']}
        htmlFor={name}
      >
        {children}
      </label>

      <input
        className={styles['input']}
        type={type}
        name={name}
        id={name}
      />
    </>
  )
}

export default Input
