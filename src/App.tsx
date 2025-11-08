import { useContext } from 'react'
import Page from './Page'
import { ThemeContext, ThemeProvider } from './components/core'
import { Layout, TypographyDefaultsProvider } from './components/core'
import { Typography, T } from './components/core'
import { Button, ButtonDefaultsProvider } from './components/core'
import { Collapsible } from './components/core'

const ThemeSwitch = () => {
  const ctx = useContext(ThemeContext)

  return (
    <Button
      action={() => ctx?.setTheme(ctx.theme === 'light' ? 'dark' : 'light')}
      surface='hollow'
    >
      <T color='dimmed'>/</T>
    </Button>
  )
}

const App = () => {
  return (
    <ThemeProvider defaultTheme='light'>
      <Layout>
        <Layout.TopNav>
          <div style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
            gap: '10px',
          }}>
            <Typography color='dimmed'>Top Nav Bar</Typography>
            <ThemeSwitch />
          </div>
        </Layout.TopNav>

        <Layout.SideNav>
          <ButtonDefaultsProvider
            size='s'
            surface='hollow'
            width='full'
          >
            <TypographyDefaultsProvider
              color='dimmed'
            >
              <Button action='#'><T>Dashboard</T></Button>
              <Button action='#'><T>Projects</T></Button>
              <Button action='#'><T>Tree Item</T></Button>
            </TypographyDefaultsProvider>
          </ButtonDefaultsProvider>

          <Collapsible arrangement='leading' size='s' label='Assets'>
            <Button action='#'><T>Item #1</T></Button>
            <Button action='#'><T>Tree Item #2</T></Button>
            <Button action='#'><T>Tree Item #3</T></Button>
            <Button action='#'><T>Item #4</T></Button>
          </Collapsible>

          <Collapsible arrangement='leading' size='s' label='Components'>
            <Collapsible arrangement='leading' size='s' label='Core'>
              <Collapsible arrangement='leading' size='s' label='Tree Branch'>
                <Button action='#'><T>Tree Item</T></Button>
                <Button action='#'><T>Tree Item</T></Button>
                <Button action='#'><T>Tree Item</T></Button>
              </Collapsible>

              <Button action='#'><T>Accordion</T></Button>
              <Button action='#'><T>Button</T></Button>
              <Button action='#'><T>Checkbox</T></Button>
              <Button action='#'><T>Context Menu</T></Button>
              <Button action='#'><T>Dropdown</T></Button>
              <Button action='#'><T>Error Message</T></Button>
              <Button action='#'><T>Field</T></Button>
            </Collapsible>
          </Collapsible>
        </Layout.SideNav>

        <Layout.Content>
          <Page />
        </Layout.Content>
      </Layout>

    </ThemeProvider>
  )
}

export default App
