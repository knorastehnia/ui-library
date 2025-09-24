import styles from './Typography.module.css'
import { createElement } from 'react'

interface TypographyProps {
  children: React.ReactNode,
  type?:
    | 'h1' | 'h2' | 'h3' | 'h4'
    | 'p' | 'span',

  size?: 'xs' | 's' | 'm' | 'l' | 'xl',
  weight?: '300' | '400' | '500',
  color?:
    | 'primary'
    | 'dimmed'
    | 'inverted'
    | 'disabled'
    | 'success'
    | 'error'
}

const Typography: React.FC<TypographyProps> = ({
  children,
  type='span',
  size='m',
  weight=(type === 'span' ? '400' : '300'),
  color=(type === 'p' ? 'dimmed' : 'primary'),
}) => {
  const trimmedRole = type.at(0) === 'h' ? 'h' : type

  return (
    createElement(
      type,
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
