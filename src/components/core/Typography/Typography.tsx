import styles from './Typography.module.css'
import { createElement, createContext, useContext } from 'react'

interface TypographyDefaultsContextInterface {
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

interface TypographyProps extends TypographyDefaultsContextInterface {
  children: React.ReactNode,
  type?:
    | 'h1' | 'h2' | 'h3' | 'h4'
    | 'p' | 'span',
}

const TypographyDefaultsContext = createContext<TypographyDefaultsContextInterface>({})

const Typography: React.FC<TypographyProps> = ({
  children,
  type='span',
  size,
  weight,
  color,
}) => {
  const defaultsContext = useContext(TypographyDefaultsContext)
  const activeSize = size ?? defaultsContext.size ?? 'm'
  const activeWeight = weight ?? defaultsContext.weight ?? (type === 'span' ? '400' : '300')
  const activeColor = color ?? defaultsContext.color ?? (type === 'p' ? 'dimmed' : 'primary')

  const trimmedRole = type.at(0) === 'h' ? 'h' : type

  return (
    createElement(
      type,
      {
        className: `
          ${styles[`${trimmedRole}-${activeSize}`]} 
          ${styles[`weight-${activeWeight}`]}
          ${styles[`color-${activeColor}`]}
        `
      },
      children,
    )
  )
}

const T = Typography

export {
  Typography,
  T,
  TypographyDefaultsContext,
}
