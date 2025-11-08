import './ThemeProvider.css'
import { createContext } from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
  theme: 'light' | 'dark'
}

const ThemeContext = createContext<{
  theme: 'light' | 'dark'
} | null>(null)

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme='dark',
}) => {
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
      '--ease-out-c': 'cubic-bezier(0.22, 1, 0.36, 1)',
      '--ease-out-t': '0.5s',
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
      '--ease-out-c': 'cubic-bezier(0.22, 1, 0.36, 1)',
      '--ease-out-t': '0.5s',
    },
  }

  const root = document.documentElement

  Object.entries(themes[theme]).forEach(([k, v]) => {
    root.style.setProperty(k, v)
  })

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider }
export type { ThemeProviderProps }
