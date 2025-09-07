import './App.css'

import Page from './Page'
import Layout from './components/core/Layout'

const App = () => {
  return (
    <>
      <Layout>
        <Layout.Sidebar>Sidebar</Layout.Sidebar>
        <Layout.Content>
          <Layout.Header>Header</Layout.Header>
          <Page />
        </Layout.Content>
      </Layout>

    </>
  )
}

export default App
