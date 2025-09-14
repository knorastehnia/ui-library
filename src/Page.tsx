import Button from './components/core/Button'
import Field from './components/core/Field'
import TextArea from './components/core/TextArea'
import Select from './components/core/Select'
import Checkbox from './components/core/Checkbox'
import Radio from './components/core/Radio'
import Dropdown from './components/core/Dropdown'
import Typography from './components/core/Typography'
import Modal from './components/core/Modal'
import List from './components/core/List'
import Accordion from './components/core/Accordion'

import Layout from './components/core/Layout'

import { useState } from 'react'

const Page = () => {
  const [someState, setSomeState] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
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
          <Button label='Confirm' onClick={() => setShowModal(false)} width='49%' style='fill' />
          <Button label='Cancel' onClick={() => setShowModal(false)} width='49%' />
        </div>
      </Modal>

      <Layout.Section>
        <Layout.Subsection span={1}>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'center',
            gap: '20px',
          }}>
            <Button
              label='Link to homepage'
              size='l'
              style='text'
              href='#'
              onClick={() => null}
              // disabled
            />

            <Button label='Button' width='100%' disabled size='m' />

            <Button label='Button' size='s' />
            <Button label='Button' />
            <Button label='Button' href='#' size='l' />

            <Button label='Button' onClick={() => setShowModal(true)} width='100%' size='m' />

            <Button label='Button' size='s' style='fill' />
            <Button label='Button' style='fill' />
            <Button label='Button' style='fill' href='#' size='l' />
          </div>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <Typography role='h2' size='s'>Some Form</Typography>

          <div style={{
            display: 'flex',
            gap: '15px',
            width: '100%',
          }}>
            <Field
              label='Street No.'
              type='number'
              name='input1'
              limit={12}
              errors={[
                {message: 'This is a custom error message.', failState: someState},
              ]}
            />

            <Field label='Street Name' name='input2' />
          </div>

          <Field label='Email' type='email' name='test' />
          <Field label='Password' type='password' name='password' />
          <Button
            label='Submit'
            onClick={() => setSomeState(!someState)}
            size='m'
            style='fill'
            width='100%'
          />
        </Layout.Subsection>

        <Layout.Subsection span={2}>
          <TextArea label='Static' limit={200} height={200} name='sta' />
          <TextArea label='Dynamic' limit={10} name='dyn' resizable />
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            gap: '15px',
          }}>
            <Dropdown label='Expand'>
              <Dropdown.Item label='Dropdown Item' />
              <hr />
              <Dropdown.Item label='Dropdown Item' />
              <Dropdown.Item label='Dropdown Item' />
            </Dropdown>

            <Dropdown label='Open Menu'>
              <Dropdown.Item label='Dropdown Item' />
            </Dropdown>

            <Select label='Select'>
              <Select.Item label='Select Item' />
              <Select.Item label='Select Item' />
              <Select.Item label='Select Item' />
            </Select>
          </div>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <Checkbox label='Checkbox 1' name='firstcb' />
          <Checkbox label='Checkbox 2' name='secondcb' />
          <Checkbox label='Checkbox 3' name='thirdcb' />
          <Radio type='vertical' name='rgroup1'>
            <Radio.Option label='Radio 1.1' value='r1' name='r1' />
            <Radio.Option label='Radio 1.2' value='r2' name='r2' />
            <Radio.Option label='Radio 1.3' value='r3' name='r3' />
          </Radio>
          <Radio name='rgroup2'>
            <Radio.Option label='A' value='r1' name='r1' />
            <Radio.Option label='B' value='r2' name='r2' />
          </Radio>
        </Layout.Subsection>
      </Layout.Section>

      <Layout.Section>
        <Layout.Subsection span={1}>
          <List>
            <List.Item>
              <Typography role='h2' size='xs'>List Item</Typography>
              <Typography role='p'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A, 
                corporis consequuntur porro suscipit inventore atque cupiditate 
                quos beatae, officia deserunt esse praesentium fugiat adipisci 
                optio unde voluptates saepe similique veniam!
              </Typography>
            </List.Item>

            <List.Item>
              <Typography role='h2' size='xs'>List Item</Typography>
              <Typography role='p'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Atque, est dicta, eaque adipisci.
              </Typography>
            </List.Item>

            <List.Item>
              <Typography role='h2' size='xs'>List Item</Typography>
              <Typography role='p'>
                Lorem, ipsum dolor sit amet.
              </Typography>
            </List.Item>
          </List>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <Accordion>
            <Accordion.Item label='Accordion Item'>
              <Typography role='p'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A, 
                corporis consequuntur porro suscipit inventore atque cupiditate 
                quos beatae, officia deserunt esse praesentium fugiat adipisci 
                optio unde voluptates saepe similique veniam!
              </Typography>
            </Accordion.Item>

            <Accordion.Item label='Accordion Item'>
              <Typography role='p'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Atque, est dicta, eaque adipisci.
              </Typography>
            </Accordion.Item>

            <Accordion.Item label='Accordion Item'>
              <Typography role='p'>
                Lorem, ipsum dolor sit amet.
              </Typography>
            </Accordion.Item>
          </Accordion>
        </Layout.Subsection>
      </Layout.Section>

      <Layout.Subsection>
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

        <Typography role='p' size='xs'>Lorem ipsum dolor sit amet consectetur adipisicing 
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
      </Layout.Subsection>

      <Layout.Section>
        <Layout.Subsection span={1}>1</Layout.Subsection>
        <Layout.Subsection span={2}>2</Layout.Subsection>
        <Layout.Subsection span={1}>3</Layout.Subsection>
        <Layout.Subsection span={1}>4</Layout.Subsection>
        <Layout.Subsection span={1}>5</Layout.Subsection>
        <Layout.Subsection span={1}>6</Layout.Subsection>
        <Layout.Subsection span={1}>7</Layout.Subsection>
        <Layout.Subsection span={2}>8</Layout.Subsection>
        <Layout.Subsection span={1}>9</Layout.Subsection>
      </Layout.Section>
    </>
  )
}

export default Page
