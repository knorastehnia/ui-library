import { createContext } from "react"

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

const TypographyDefaultsContext = createContext<TypographyDefaultsContextInterface>({})

export default TypographyDefaultsContext
