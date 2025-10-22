import './App.css'

import Page from './Page'
import { Layout, TypographyDefaultsProvider } from './components/core'
import { Typography, T } from './components/core'
import { Button, ButtonDefaultsProvider } from './components/core'
import { Collapsible } from './components/core'

const App = () => {
  return (
    <>
      <Layout>
        <Layout.TopNav>
          <Typography color='dimmed'>Top Nav Bar</Typography>
        </Layout.TopNav>

        <Layout.SideNav>
          <ButtonDefaultsProvider
            size='s'
            appearance='hollow'
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

          <Collapsible appearance='leading' size='s' label='Assets'>
            <Button action='#'><T>Item #1</T></Button>
            <Button action='#'><T>Tree Item #2</T></Button>
            <Button action='#'><T>Tree Item #3</T></Button>
            <Button action='#'><T>Item #4</T></Button>
          </Collapsible>

          <Collapsible appearance='leading' size='s' label='Components'>
            <Collapsible appearance='leading' size='s' label='Core'>
              <Collapsible appearance='leading' size='s' label='Tree Branch'>
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

    </>
  )
}

export default App
