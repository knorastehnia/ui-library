import './App.css'

import Page from './Page'
import Layout from './components/core/Layout'
import Tree from './components/core/Tree'
import Typography from './components/core/Typography'

const App = () => {
  return (
    <>
      <Layout>
        <Layout.TopNav>
          <Typography color='dimmed'>Top Nav Bar</Typography>
        </Layout.TopNav>

        <Layout.SideNav>
          <Tree.Item action='#'>Dashboard</Tree.Item>
          <Tree.Item action='#'>Projects</Tree.Item>
          <Tree.Item action='#'>Tree Item</Tree.Item>

          <Tree>
            <Tree.Branch label='Assets'>
              <Tree.Item action='#'>Item #1</Tree.Item>
              <Tree.Item action='#'>Tree Item #2</Tree.Item>
              <Tree.Item action='#'>Tree Item #3</Tree.Item>
              <Tree.Item action='#'>Item #4</Tree.Item>
            </Tree.Branch>

            <Tree.Branch label='Components'>
              <Tree.Branch label='Core'>
                <Tree.Branch label='Tree Branch'>
                  <Tree.Item action='#'>Tree Item</Tree.Item>
                  <Tree.Item action='#'>Tree Item</Tree.Item>
                  <Tree.Item action='#'>Tree Item</Tree.Item>
                </Tree.Branch>

                <Tree.Item action='#'>Accordion</Tree.Item>
                <Tree.Item action='#'>Button</Tree.Item>
                <Tree.Item action='#'>Checkbox</Tree.Item>
                <Tree.Item action='#'>Context Menu</Tree.Item>
                <Tree.Item action='#'>Dropdown</Tree.Item>
                <Tree.Item action='#'>Error Message</Tree.Item>
                <Tree.Item action='#'>Field</Tree.Item>
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
