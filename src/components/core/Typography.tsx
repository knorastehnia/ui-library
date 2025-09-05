import styles from './Typography.module.css'
import { createElement } from 'react'

interface TypographyProps {
  children: React.ReactNode,
  role:
    | 'h1' | 'h2' | 'h3'
    | 'h4' | 'h5' | 'h6'
    | 'p'

  size?: 'xs' | 's' | 'm' | 'l' | 'xl',
}

const Typography: React.FC<TypographyProps> = ({
  children,
  role,
  size='xs',
}) => {
  return (
    <div className={`
      ${styles['typography']} 
      ${styles[size]}
    `}>
      {createElement(role, null, children)}
    </div>
  )
}

export default Typography
