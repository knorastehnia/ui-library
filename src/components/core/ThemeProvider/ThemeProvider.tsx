import './ThemeProvider.css'
import { createContext, useState } from 'react'

type ValidThemes = 'light' | 'dark'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme: ValidThemes
}

const ThemeContext = createContext<{
  theme: ValidThemes
  setTheme: Function
} | null>(null)

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme='dark',
}) => {
  const [theme, setTheme] = useState(defaultTheme)

  const updateTheme = (newTheme: ValidThemes) => {
    const root = document.documentElement

    root.classList.add('no-transition')
    setTheme(newTheme)

    setTimeout(() => {
      root.classList.remove('no-transition')
    }, 25)
  }

  const themes = {
    light: {
      '--background': 'oklch(100% 0 265)',
      '--foreground': 'oklch(4% 0 265)',
      '--gray-1': 'oklch(94% 0 265)',
      '--gray-2': 'oklch(90% 0 265)',
      '--gray-3': 'oklch(86% 0 265)',
      '--gray-6': 'oklch(82% 0 265)',
      '--gray-9': 'oklch(40% 0 265)',
      '--accent': 'oklch(60% 0.3 265 / 0.5)',
      '--success': 'oklch(45% 0.3 170)',
      '--error': 'oklch(45% 0.3 20)',
      '--radius': '5px',
    },

    dark: {
      '--background': 'oklch(10% 0 265)',
      '--foreground': 'oklch(96% 0 265)',
      '--gray-1': 'oklch(18% 0 265)',
      '--gray-2': 'oklch(24% 0 265)',
      '--gray-3': 'oklch(30% 0 265)',
      '--gray-6': 'oklch(40% 0 265)',
      '--gray-9': 'oklch(85% 0 265)',
      '--accent': 'oklch(60% 0.3 265 / 0.5)',
      '--success': 'oklch(65% 0.3 170)',
      '--error': 'oklch(65% 0.3 20)',
      '--radius': '5px',
    },
  }

  const root = document.documentElement

  Object.entries(themes[theme]).forEach(([k, v]) => {
    root.style.setProperty(k, v)
  })

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
