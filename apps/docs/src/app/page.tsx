'use client'

import { Button, Typography, ThemeProvider } from '@kaynora/ui'

export default function Home() {
  return (
    <ThemeProvider defaultTheme='dark'>
      <Button><Typography>Content</Typography></Button>
    </ThemeProvider>
  )
}
