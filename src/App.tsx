import './App.css'
import Card from './components/core/Card'
import Button from './components/core/Button'
import Input from './components/core/Input'

const App = () => {
  return (
    <>
      <div
        style={{
          width: 'fit-content',
          margin: '10rem auto',
        }}
      >
        <Card width={500}>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'center',
            gap: '20px',
          }}>
            <Button size='large'>Button</Button>
            <Button size='small' style='outline'>Button</Button>
            <Button style='fill'>Button</Button>
            <Button size='large' style='fill'>Button</Button>
          </div>
        </Card>

        <Card height={300}>
          <Input type='text' name='input'>Input</Input>
          <h1>H1 Tag</h1>
          <h2>H2 Tag</h2>
          <h3>H3 Tag</h3>
          <h4>H4 Tag</h4>
          <h5>H5 Tag</h5>
          <h6>H6 Tag</h6>
        </Card>
      </div>
    </>
  )
}

export default App
