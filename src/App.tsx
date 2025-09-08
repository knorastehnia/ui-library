import './App.css'

import Page from './Page'
import Layout from './components/core/Layout'
import Tree from './components/core/Tree'

const App = () => {
  return (
    <>
      <Layout>
        <Layout.Sidebar>
          <Tree>
            <Tree.Branch label='Tree Branch'>
              <Tree.Item>Tree Item</Tree.Item>
              <Tree.Item>Tree Item</Tree.Item>
              <Tree.Item>Tree Item</Tree.Item>
              <Tree.Item>Tree Item</Tree.Item>
            </Tree.Branch>

            <Tree.Branch label='Tree Branch'>
              <Tree.Branch label='Tree Branch'>
                <Tree.Branch label='Tree Branch'>
                  <Tree.Item>Tree Item</Tree.Item>
                  <Tree.Item>Tree Item</Tree.Item>
                  <Tree.Item>Tree Item</Tree.Item>
                </Tree.Branch>

                <Tree.Item>Tree Item</Tree.Item>
                <Tree.Item>Tree Item</Tree.Item>
                <Tree.Item>Tree Item</Tree.Item>
                <Tree.Item>Tree Item</Tree.Item>
                <Tree.Item>Tree Item</Tree.Item>
                <Tree.Item>Tree Item</Tree.Item>
                <Tree.Item>Tree Item</Tree.Item>
              </Tree.Branch>
            </Tree.Branch>
          </Tree>
        </Layout.Sidebar>
        <Layout.Content>
          <Layout.Header>Header</Layout.Header>
          <Page />
        </Layout.Content>
      </Layout>

    </>
  )
}

export default App
