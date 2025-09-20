import styles from './Typography.module.css'
import { createElement } from 'react'

interface TypographyProps {
  children: React.ReactNode,
  role?:
    | 'h1' | 'h2' | 'h3'
    | 'h4' | 'h5' | 'h6'
    | 'p' | 'span',

  size?: 'xs' | 's' | 'm' | 'l' | 'xl',
  weight?: '300' | '400' | '500',
  color?: 'normal' | 'success' | 'error'
}

const Typography: React.FC<TypographyProps> = ({
  children,
  role='span',
  size='m',
  weight='300',
  color='normal',
}) => {
  const trimmedRole = role.at(0) === 'h' ? 'h' : role

  return (
    createElement(
      role,
      {
        className: `
          ${styles[`${trimmedRole}-${size}`]} 
          ${styles[`weight-${weight}`]}
          ${styles[`color-${color}`]}
        `
      },
      children,
    )
  )
}

export default Typography
