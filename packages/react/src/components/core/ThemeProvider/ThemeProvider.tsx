import './ThemeProvider.css'
import { createContext, useLayoutEffect, useState } from 'react'

type ValidThemes = 'light' | 'dark'

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeContext = createContext<{
  theme: ValidThemes
  setTheme: (theme: ValidThemes) => void
} | null>(null)

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ValidThemes>('dark')

  const updateTheme = (newTheme: ValidThemes) => {
    const root = document.documentElement

    root.setAttribute('data-theme', newTheme)
    root.classList.add('no-transition')
    setTheme(newTheme)

    setTimeout(() => {
      root.classList.remove('no-transition')
    }, 25)
  }

  useLayoutEffect(() => {
    const root = document.documentElement
    const dataTheme = root.getAttribute('data-theme')

    if (dataTheme === 'light' || dataTheme === 'dark') setTheme(dataTheme)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export {
  ThemeProvider,
  ThemeContext,
}

export type { ThemeProviderProps }
