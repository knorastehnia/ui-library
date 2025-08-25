import './App.css'
import Card from './components/core/Card'
import Button from './components/core/Button'
import InputText from './components/core/InputText'
import Dropdown from './components/core/Dropdown'
import { useState } from 'react'

const App = () => {
  const [someState, setSomeState] = useState(false)

  return (
    <>
      <div
        style={{
          width: '500px',
          margin: '10rem auto',
          display: 'flex',
          flexFlow: 'column',
          gap: '5rem',
        }}
      >
        <Card>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'center',
            gap: '0px 20px',
          }}>
            <Button onClick={() => null} disabled size='large'>Button</Button>
            <Button onClick={() => null} size='small'>Button</Button>
            <Button onClick={() => null} size='small' style='fill'>Button</Button>
            <Button onClick={() => null} disabled={true} style='fill'>Button</Button>
            <Button onClick={() => null} size='large' style='fill'>Button</Button>
          </div>
        </Card>

        <Card>
          <div style={{
            display: 'flex',
            gap: '15px',
            width: '100%',
          }}>
            <InputText
              width={150}
              type='number'
              name='input1'
              errors={[
                {message: 'Custom error message 1', failState: someState},
                {message: 'Custom error message 2', failState: someState},
              ]}
            >
              Street No.
            </InputText>

            <InputText name='input2'>Street Name</InputText>
          </div>

          <InputText type='email' name='test'>Email</InputText>
          <InputText type='password' name='password'>Password</InputText>
          <Button
            onClick={() => setSomeState(!someState)}
            size='large'
            style='fill'
          >
            Submit
          </Button>
        </Card>

        <Card>
          <Button onClick={() => {}} size='default'>Dropdown</Button>
          <Dropdown open>
            <a href="#">Item</a>
            <a href="#">Item</a>
            <a href="#">Item</a>
          </Dropdown>
        </Card>

        <Card>
          <Card>
            <h1>H1 Tag</h1>
            <h2>H2 Tag</h2>
            <h3>H3 Tag</h3>
            <h4>H4 Tag</h4>
            <h5>H5 Tag</h5>
            <h6>H6 Tag</h6>
          </Card>
        </Card>
      </div>
    </>
  )
}

export default App
