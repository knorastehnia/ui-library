import './App.css'

import Card from './components/core/Card'
import Button from './components/core/Button'
import InputText from './components/core/InputText'
import Dropdown from './components/core/Dropdown'
import Header from './components/core/Header'

import { useState } from 'react'

const App = () => {
  const [someState, setSomeState] = useState(false)

  return (
    <>
      <Header>
        Content
      </Header>

      <div
        className='bg'
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
          <h2 style={{
            marginBottom: '20px'
          }}>Some Form</h2>

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
                {message: 'This is a custom error message.', failState: someState},
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

        <div style={{zIndex: 10}}>
          <Card>
            <InputText name='dyn' type='static-area'>Static</InputText>
            <InputText name='sta' type='dynamic-area'>Dynamic</InputText>
            <Button onClick={() => {}} size='default'>Dropdown</Button>
          </Card>
          <Dropdown open>
            <a href="#">Item</a>
            <a href="#">Item</a>
            <a href="#">Item</a>
          </Dropdown>
        </div>

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
