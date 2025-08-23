import './App.css'
import Card from './components/core/Card'
import Button from './components/core/Button'
import InputText from './components/core/InputText'
import InputPassword from './components/core/InputPassword'

const App = () => {
  return (
    <>
      <div
        style={{
          width: 'fit-content',
          margin: '10rem auto',
          display: 'flex',
          flexFlow: 'column',
          gap: '5rem',
        }}
      >
        <Card width={500}>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'center',
            gap: '0px 20px',
          }}>
            <Button onClick={() => null} size='large'>Button</Button>
            <Button onClick={() => null} size='small' style='outline'>Button</Button>
            <Button onClick={() => null} style='fill'>Button</Button>
            <Button onClick={() => null} size='large' style='fill'>Button</Button>
          </div>
        </Card>

        <Card>
          <InputText name='input1'>Input</InputText>
          <InputText size='small' name='input2'>Input</InputText>
          <InputText size='large' name='email'>Email</InputText>
          <InputPassword size='large' name='password'>Password</InputPassword>
          <Button
            onClick={() => {console.log('submitting...')}}
            size='large'
            style='fill'
          >
            Submit
          </Button>
        </Card>

        <Card>
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
