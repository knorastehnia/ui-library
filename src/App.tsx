import './App.css'

import Page from './Page'
import Layout from './components/core/Layout'
import Tree from './components/core/Tree'

const App = () => {
  return (
    <>
      <Layout>
        <Layout.Sidebar>
          <Tree.Item label='Dashboard' href='#' />
          <Tree.Item label='Projects' href='#' />
          <Tree.Item label='Tree Item' href='#' />

          <Tree>
            <Tree.Branch label='Assets'>
              <Tree.Item label='Item #1' href='#' />
              <Tree.Item label='Tree Item #2' href='#' />
              <Tree.Item label='Tree Item #3' href='#' />
              <Tree.Item label='Item #4' href='#' />
            </Tree.Branch>

            <Tree.Branch label='Components'>
              <Tree.Branch label='Core'>
                <Tree.Branch label='Tree Branch'>
                  <Tree.Item label='Tree Item' href='#' />
                  <Tree.Item label='Tree Item' href='#' />
                  <Tree.Item label='Tree Item' href='#' />
                </Tree.Branch>

                <Tree.Item label='Accordion' href='#' />
                <Tree.Item label='Button' href='#' />
                <Tree.Item label='Checkbox' href='#' />
                <Tree.Item label='Context Menu' href='#' />
                <Tree.Item label='Dropdown' href='#' />
                <Tree.Item label='Error Message' href='#' />
                <Tree.Item label='Field' href='#' />
              </Tree.Branch>
            </Tree.Branch>
          </Tree>
        </Layout.Sidebar>


        <Layout.Content>
          <Layout.Header fixed>
            <div>Header</div>
          </Layout.Header>
          <Page />
        </Layout.Content>
      </Layout>

    </>
  )
}

export default App
