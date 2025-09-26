import './App.css'

import Page from './Page'
import Layout from './components/core/Layout'
import Tree from './components/core/Tree'
import Typography, { T } from './components/core/Typography'

const App = () => {
  return (
    <>
      <Layout>
        <Layout.TopNav>
          <Typography color='dimmed'>Top Nav Bar</Typography>
        </Layout.TopNav>

        <Layout.SideNav>
          <Tree.Item action='#'><T>Dashboard</T></Tree.Item>
          <Tree.Item action='#'><T>Projects</T></Tree.Item>
          <Tree.Item action='#'><T>Tree Item</T></Tree.Item>

          <Tree>
            <Tree.Branch label='Assets'>
              <Tree.Item action='#'><T>Item #1</T></Tree.Item>
              <Tree.Item action='#'><T>Tree Item #2</T></Tree.Item>
              <Tree.Item action='#'><T>Tree Item #3</T></Tree.Item>
              <Tree.Item action='#'><T>Item #4</T></Tree.Item>
            </Tree.Branch>

            <Tree.Branch label='Components'>
              <Tree.Branch label='Core'>
                <Tree.Branch label='Tree Branch'>
                  <Tree.Item action='#'><T>Tree Item</T></Tree.Item>
                  <Tree.Item action='#'><T>Tree Item</T></Tree.Item>
                  <Tree.Item action='#'><T>Tree Item</T></Tree.Item>
                </Tree.Branch>

                <Tree.Item action='#'><T>Accordion</T></Tree.Item>
                <Tree.Item action='#'><T>Button</T></Tree.Item>
                <Tree.Item action='#'><T>Checkbox</T></Tree.Item>
                <Tree.Item action='#'><T>Context Menu</T></Tree.Item>
                <Tree.Item action='#'><T>Dropdown</T></Tree.Item>
                <Tree.Item action='#'><T>Error Message</T></Tree.Item>
                <Tree.Item action='#'><T>Field</T></Tree.Item>
              </Tree.Branch>
            </Tree.Branch>
          </Tree>
        </Layout.SideNav>

        <Layout.Content>
          <Page />
        </Layout.Content>
      </Layout>

    </>
  )
}

export default App
