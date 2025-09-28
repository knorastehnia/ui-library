import { createContext } from 'react'

export interface ButtonDefaultsContextInterface {
  type?: 'fill' | 'outline' | 'hollow' | 'text',
  width?: 'auto' | 'full',
}

const ButtonDefaultsContext = createContext<ButtonDefaultsContextInterface>({})

export default ButtonDefaultsContext
