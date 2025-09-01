import './App.css'

import Card from './components/core/Card'
import Button from './components/core/Button'
import InputText from './components/core/InputText'
import InputTextArea from './components/core/InputTextArea'
import InputCheckbox from './components/core/InputCheckbox'
import Dropdown from './components/core/Dropdown'
import Header from './components/core/Header'

import { useState } from 'react'

const App = () => {
  const [someState, setSomeState] = useState(false)

  return (
    <>
      <Header>
        <Dropdown label='Products'>
          <a href="#">Item</a>
        </Dropdown>

        <Dropdown label='Services'>
          <a href="#">Item</a>
          <hr />
          <a href="#">Item</a>
          <a href="#">Item</a>
        </Dropdown>
      </Header>

      <div
        className='bg'
        style={{
          // width: '500px',
          margin: '10rem auto',
          display: 'flex',
          flexFlow: 'row nowrap',
          gap: '30px',
          justifyContent: 'center',
          alignItems: 'start',
        }}
      >
        <div
          style={{
            width: '500px',
            margin: '0',
            display: 'flex',
            flexFlow: 'column',
            gap: '30px',
          }}
        >
          <Card height={400}>
            <div style={{
              display: 'flex',
              flexFlow: 'row wrap',
              alignItems: 'center',
              gap: '20px',
            }}>
              <Button
                size='small'
                style='text'
                href='#'
                onClick={() => null}
                // disabled
              >Link to homepage</Button>
              <Button disabled size='large'>Button</Button>
              <Button href='#' size='small'>Button</Button>
              <Button size='small' style='fill'>Button</Button>
              <Button disabled={true} style='fill'>Button</Button>
              <Button size='large' style='fill'>Button</Button>
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
        </div>

        <div
          style={{
            width: '500px',
            margin: '0',
            display: 'flex',
            flexFlow: 'column',
            gap: '30px',
          }}
        >
          <div style={{zIndex: 10}}>
            <Card>
              <InputTextArea limit={200} height={200} name='sta'>Static</InputTextArea>
              <InputTextArea limit={10} name='dyn' resizable>Dynamic</InputTextArea>
              <div style={{
                display: 'flex',
                flexFlow: 'row',
                gap: '15px',
              }}>
                <Dropdown label='Expand'>
                  <a href="#">Item</a>
                  <hr />
                  <a href="#">Item</a>
                  <a href="#">Item</a>
                </Dropdown>

                <Dropdown label='Open Menu'>
                  <a href="#">Item</a>
                </Dropdown>
              </div>
            </Card>
          </div>

          <Card>
            <InputCheckbox name='firstcb'>Checkbox 1</InputCheckbox>
            <InputCheckbox name='secondcb'>Checkbox 2</InputCheckbox>
            <InputCheckbox name='thirdcb'>Checkbox 3</InputCheckbox>
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
      </div>
    </>
  )
}

export default App
