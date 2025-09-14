import './App.css'

import Page from './Page'
import Layout from './components/core/Layout'
import Tree from './components/core/Tree'

const App = () => {
  return (
    <>
      <Layout>
        <Layout.Sidebar>
          <Tree.Item label='Tree Item' href='#' />
          <Tree.Item label='Tree Item' href='#' />
          <Tree.Item label='Tree Item' href='#' />

          <Tree>
            <Tree.Branch label='Tree Branch'>
              <Tree.Item label='Tree Item' href='#' />
              <Tree.Item label='Tree Item' href='#' />
              <Tree.Item label='Tree Item' href='#' />
              <Tree.Item label='Tree Item' href='#' />
            </Tree.Branch>

            <Tree.Branch label='Tree Branch'>
              <Tree.Branch label='Tree Branch'>
                <Tree.Branch label='Tree Branch'>
                  <Tree.Item label='Tree Item' href='#' />
                  <Tree.Item label='Tree Item' href='#' />
                  <Tree.Item label='Tree Item' href='#' />
                </Tree.Branch>

                <Tree.Item label='Tree Item' href='#' />
                <Tree.Item label='Tree Item' href='#' />
                <Tree.Item label='Tree Item' href='#' />
                <Tree.Item label='Tree Item' href='#' />
                <Tree.Item label='Tree Item' href='#' />
                <Tree.Item label='Tree Item' href='#' />
                <Tree.Item label='Tree Item' href='#' />
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
