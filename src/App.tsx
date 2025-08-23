import './App.css'
import Card from './components/core/Card'
import Button from './components/core/Button'

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

        <Card>
          Content
        </Card>
      </div>
    </>
  )
}

export default App
