import './App.css'

import Card from './components/core/Card'
import Button from './components/core/Button'
import InputText from './components/core/InputText'
import InputTextArea from './components/core/InputTextArea'
import InputCheckbox from './components/core/InputCheckbox'
import InputRadio from './components/core/InputRadio'
import Dropdown from './components/core/Dropdown'
import Header from './components/core/Header'
import Typography from './components/core/Typography'
import Modal from './components/core/Modal'
import List from './components/core/List'
import Accordion from './components/core/Accordion'

import { useState } from 'react'

const App = () => {
  const [someState, setSomeState] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Header>
        <Dropdown label='Products'>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
        </Dropdown>

        <Dropdown label='Services'>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
          <hr />
          <Dropdown.Item href='#'>Dropdown Item</Dropdown.Item>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
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
          <Card>
            <div style={{
              display: 'flex',
              flexFlow: 'row wrap',
              alignItems: 'center',
              gap: '20px',
            }}>
              <Button
                size='l'
                type='text'
                href='#'
                onClick={() => null}
                // disabled
              >Link to homepage</Button>

              <Button width='100%' disabled size='m'>Button</Button>

              <Button size='s'>Button</Button>
              <Button>Button</Button>
              <Button href='#' size='l'>Button</Button>

              <Button onClick={() => setShowModal(true)} width='100%' size='m'>Button</Button>

              <Button size='s' type='fill'>Button</Button>
              <Button type='fill'>Button</Button>
              <Button type='fill' href='#' size='l'>Button</Button>
            </div>
          </Card>

          <Card>
            <div style={{
              marginBottom: '20px',
            }}>
              <Typography role='h2' size='s'>Some Form</Typography>
            </div>

            {/* <h2 style={{
              marginBottom: '20px'
            }}>Some Form</h2> */}

            <div style={{
              display: 'flex',
              gap: '15px',
              width: '100%',
            }}>
              <InputText
                width='150px'
                type='number'
                name='input1'
                limit={12}
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
              size='m'
              type='fill'
              width='100%'
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
                  <Dropdown.Item>Dropdown Item</Dropdown.Item>
                  <hr />
                  <Dropdown.Item>Dropdown Item</Dropdown.Item>
                  <Dropdown.Item>Dropdown Item</Dropdown.Item>
                </Dropdown>

                <Dropdown label='Open Menu'>
                  <Dropdown.Item>Dropdown Item</Dropdown.Item>
                </Dropdown>
              </div>
            </Card>

            <Modal isOpen={showModal} setIsOpen={setShowModal} width='500px'>
              <Typography role='h3' size='xs'>Modal component</Typography>

              <Typography role='p'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, cumque? 
                Facilis quaerat similique maxime atque consequatur alias est, autem 
                obcaecati laboriosam mollitia harum, ad quia officia tempore 
                doloremque saepe explicabo!
              </Typography>

              <div style={{
                width: '200px',
                marginLeft: 'auto',
                marginTop: '2rem',
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'space-between',
              }}>
                <Button onClick={() => setShowModal(false)} width='49%' type='fill'>Confirm</Button>
                <Button onClick={() => setShowModal(false)} width='49%'>Cancel</Button>
              </div>
            </Modal>
          </div>

          <Card>
            <InputCheckbox name='firstcb'>Checkbox 1</InputCheckbox>
            <InputCheckbox name='secondcb'>Checkbox 2</InputCheckbox>
            <InputCheckbox name='thirdcb'>Checkbox 3</InputCheckbox>
            <InputRadio type='vertical' name='rgroup1'>
              <InputRadio.Option value='r1' name='r1'>Radio 1.1</InputRadio.Option>
              <InputRadio.Option value='r2' name='r2'>Radio 1.2</InputRadio.Option>
              <InputRadio.Option value='r3' name='r3'>Radio 1.3</InputRadio.Option>
            </InputRadio>
            <InputRadio name='rgroup2'>
              <InputRadio.Option value='r1' name='r1'>A</InputRadio.Option>
              <InputRadio.Option value='r2' name='r2'>B</InputRadio.Option>
            </InputRadio>
          </Card>
        </div>
      </div>

      <div style={{
        margin: '1rem 15rem',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'start',
        gap: '2rem',
      }}>
        <List size='s'>
          <List.Item>List item</List.Item>
          <List.Item>List item</List.Item>
          <List.Item>List item</List.Item>
        </List>

        <List>
          <List.Item>List item</List.Item>
          <List.Item>List item</List.Item>
          <List.Item>List item</List.Item>
        </List>

        <List size='l'>
          <List.Item>List item</List.Item>
          <List.Item>List item</List.Item>
        </List>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5rem 0',
      }}>
        <Accordion width='500px'>
          <Accordion.Item label='Accordion Item'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, 
            corporis consequuntur porro suscipit inventore atque cupiditate 
            quos beatae, officia deserunt esse praesentium fugiat adipisci 
            optio unde voluptates saepe similique veniam!
          </Accordion.Item>

          <Accordion.Item label='Accordion Item'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Atque, est dicta, eaque adipisci.
          </Accordion.Item>

          <Accordion.Item label='Accordion Item'>
            Lorem, ipsum dolor sit amet.
          </Accordion.Item>
        </Accordion>
      </div>

      <div style={{
        margin: '1rem 15rem',
      }}>
        <Typography role='h2'>Header H2</Typography>
        <Typography role='p'>Lorem ipsum dolor sit amet consectetur adipisicing 
          elit. Repellendus placeat sapiente itaque dolorum cupiditate maiores 
          doloremque? Molestias quasi tempore tenetur natus soluta. Voluptatem 
          pariatur aperiam aliquid minus inventore similique quam!</Typography>
        <hr style={{margin: '1rem 0', opacity: '0'}} />
        <Typography size='s' role='h2'>Header H2 S</Typography>
        <Typography size='m' role='h2'>Header H2 M</Typography>
        <Typography size='l' role='h2'>Header H2 L</Typography>
        <Typography size='xl' role='h2'>Header H2 XL</Typography>

        <Typography role='p'>Lorem ipsum dolor sit amet consectetur adipisicing 
          elit. Repellendus placeat sapiente itaque dolorum cupiditate maiores 
          doloremque? Molestias quasi tempore tenetur natus soluta. Voluptatem 
          pariatur aperiam aliquid minus inventore similique quam!</Typography>
        <hr style={{margin: '1rem 0', opacity: '0'}} />

        <Typography role='p'>Lorem ipsum dolor sit amet consectetur adipisicing 
          elit. Repellendus placeat sapiente itaque dolorum cupiditate maiores 
          doloremque? Molestias quasi tempore tenetur natus soluta. Voluptatem 
          pariatur aperiam aliquid minus inventore similique quam!</Typography>
        <hr style={{margin: '1rem 0', opacity: '0'}} />

        <Typography role='p' size='s'>Lorem ipsum dolor sit amet consectetur adipisicing 
          elit. Repellendus placeat sapiente itaque dolorum cupiditate maiores 
          doloremque? Molestias quasi tempore tenetur natus soluta. Voluptatem 
          pariatur aperiam aliquid minus inventore similique quam!</Typography>
        <hr style={{margin: '1rem 0', opacity: '0'}} />

        <Typography role='p' size='m'>Lorem ipsum dolor sit amet consectetur adipisicing 
          elit. Repellendus placeat sapiente itaque dolorum cupiditate maiores 
          doloremque? Molestias quasi tempore tenetur natus soluta. Voluptatem 
          pariatur aperiam aliquid minus inventore similique quam!</Typography>
        <hr style={{margin: '1rem 0', opacity: '0'}} />

        <Typography role='p' size='l'>Lorem ipsum dolor sit amet consectetur adipisicing 
          elit. Repellendus placeat sapiente itaque dolorum cupiditate maiores 
          doloremque? Molestias quasi tempore tenetur natus soluta. Voluptatem 
          pariatur aperiam aliquid minus inventore similique quam!</Typography>
        <hr style={{margin: '1rem 0', opacity: '0'}} />

        <Typography role='p' size='xl'>Lorem ipsum dolor sit amet consectetur adipisicing 
          elit. Repellendus placeat sapiente itaque dolorum cupiditate maiores 
          doloremque? Molestias quasi tempore tenetur natus soluta. Voluptatem 
          pariatur aperiam aliquid minus inventore similique quam!</Typography>
        <hr style={{margin: '1rem 0', opacity: '0'}} />
      </div>
    </>
  )
}

export default App
