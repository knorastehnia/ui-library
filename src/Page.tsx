import Button from './components/core/Button'
import Field from './components/core/Field'
import Select from './components/core/Select'
import Checkbox from './components/core/Checkbox'
import Radio from './components/core/Radio'
import Dropdown from './components/core/Dropdown'
import Typography from './components/core/Typography'
import Modal from './components/core/Modal'
import List from './components/core/List'
import Accordion from './components/core/Accordion'
import Table from './components/core/Table'
import ContextMenu from './components/core/ContextMenu'

import Layout from './components/core/Layout'

import { useState } from 'react'

const Page = () => {
  const [someState, setSomeState] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Modal isOpen={showModal} setIsOpen={setShowModal} width='500px'>
        <Typography type='h3' size='xs'>Modal component</Typography>

        <Typography type='p'>
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
          gap: '10px',
        }}>
          <Button label='Confirm' onClick={() => setShowModal(false)} width='49%' type='fill' />
          <Button label='Cancel' onClick={() => setShowModal(false)} width='49%' />
        </div>
      </Modal>

      <Layout.Section>
        <Layout.Subsection span={1}>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'end',
            gap: '20px',
          }}>
            <Button label='Button' width='100%' disabled size='m' />
            <Button label='Button' onClick={() => setShowModal(true)} width='100%' size='m' />

            <Button label='Button' />
            <Button label='Button' type='fill' />
          </div>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <div style={{
            display: 'flex',
            flexFlow: 'column',
            gap: '20px',
            width: '100%',
          }}>
            <Typography type='h2' size='s'>Some Form</Typography>

            <div style={{
              display: 'flex',
              gap: '20px',
              width: '100%',
            }}>
              <Field
                label='Street No.'
                type='number'
                name='input1'
                limit={12}
                errors={[
                  {message: 'This is a custom error message and it is very long.', failState: someState},
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
              type='fill'
              width='100%'
            />
          </div>
        </Layout.Subsection>

        <Layout.Subsection span={2}>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'end',
            gap: '20px',
          }}>
            <Field type='textarea' label='Static' limit={200} height='200px' name='sta' />
            <Field type='textarea' label='Dynamic' limit={10} name='dyn' resizable />
            <div style={{
              display: 'flex',
              flexFlow: 'row wrap',
              gap: '20px',
            }}>
              <Select
                multiple
                width='600px'
                label='Select OS'
                name='os'
                items={[
                  { label: 'Windows', value: 'windows', },
                  { label: 'macOS', value: 'macos', },
                  { label: 'Linux', value: 'linux', },
                  { label: 'A very long option indeed', value: 'a', },
                ]}
              />

              <Select
                label='Select OS'
                name='os'
                items={[
                  { label: 'Windows', value: 'windows', },
                  { label: 'macOS', value: 'macos', },
                  { label: 'Linux', value: 'linux', },
                  { label: 'A very long option indeed', value: 'a', },
                ]}
              />

              <Dropdown
                label='Dropdown'
                items={[
                  { label: 'Item 1', href: '#' },
                  { label: 'Item 2', href: '#', onClick: () => null, disabled: true },
                  { label: 'Item 3', onClick: () => null, disabled: true },
                  { label: 'Item 4', href: '#', disabled: false },
                ]}
              />
            </div>
          </div>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <div style={{
            display: 'flex',
            flexFlow: 'column',
            gap: '20px',
          }}>
            <div>
              <Checkbox label='Checkbox 1' name='firstcb' />
              <Checkbox label='Checkbox 2' name='secondcb' />
              <Checkbox label='Checkbox 3' name='thirdcb' />
            </div>
            <Radio style='vertical' name='rgroup1' options={[
              { label: 'Radio 1.1', value: 'r1', name: 'r1' },
              { label: 'Radio 1.2', value: 'r2', name: 'r2' },
              { label: 'Radio 1.3', value: 'r3', name: 'r3', disabled: true },
            ]} />

            <Radio name='rgroup2' options={[
              { label: 'A', value: 'r1', name: 'r1' },
              { label: 'B', value: 'r2', name: 'r2' },
              { label: 'C', value: 'r3', name: 'r3' },
              { label: 'D', value: 'r4', name: 'r4' },
            ]} />
          </div>
        </Layout.Subsection>
      </Layout.Section>

      <Layout.Section>
        <Layout.Subsection>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Cell>
                  <Typography>Cell</Typography>
                </Table.Cell>

                <Table.Cell>
                  <Typography>Cell</Typography>
                </Table.Cell>

                <Table.Cell>
                  <Typography>Cell</Typography>
                </Table.Cell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Field type='textarea' resizable label='Field' name='field1' />
                </Table.Cell>

                <Table.Cell>
                  <Typography>Cell</Typography>
                </Table.Cell>

                <Table.Cell>
                  <Typography>Cell</Typography>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Typography>Cell</Typography>
                </Table.Cell>
                
                <Table.Cell>
                  <Typography>Cell</Typography>
                </Table.Cell>

                <Table.Cell rowSpan={2} colSpan={1} width='100px'>
                  <Typography type='p'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, 
                    porro doloribus. Ad ratione expedita, quae neque fugit, ea 
                    laboriosam facere quas exercitationem sint doloribus. 
                    Excepturi dolorum nobis ratione vel facilis?
                  </Typography>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Typography>Cell</Typography>
                </Table.Cell>

                <Table.Cell>
                  <Typography>Cell</Typography>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <ContextMenu items={[
            { label: 'Context Menu Item' },
            { label: 'Refresh Page' },
            { label: 'Inspect Item', disabled: true },
            { label: 'Loop Up Definition', disabled: false },
            { label: 'Save As...' },
          ]}>
            {/* <List items={[
              {
                label: 'Item 1',
                sublabel: 'Sublabel 1',
              },
              { label: 'Item 2', sublabel: 'Sublabel 2' },
              { label: 'Item 3' },
              { label: 'Item 4' },
            ]} /> */}

            <List>
              <List.Item label='Item 1' sublabel='Sublabel 1'>
                <Typography type='p'>
                  Dolor sit amet consectetur adipisicing elit. 
                  Ipsam atque dolores aliquam explicabo veniam, hic dolore dicta. 
                  Adipisci animi sit exercitationem. Dolores omnis impedit sed 
                  facilis saepe sint iusto veritatis!
                </Typography>
              </List.Item>

              <List.Item label='Item 2' sublabel='Sublabel 2'>
                <Typography type='p'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                  Ipsam atque dolores aliquam explicabo veniam.
                </Typography>
              </List.Item>

              <List.Item label='Item 3'>
                <Typography type='p'>
                  Sit amet consectetur adipisicing elit. Ipsam atque 
                  dolores aliquam explicabo veniam, hic dolore dicta. 
                  Adipisci animi sit exercitationem.
                </Typography>
              </List.Item>

              <List.Item label='Item 4'>
                <Typography type='p'>
                  Adipisicing elit. Ipsam atque dolores aliquam 
                  explicabo veniam, hic dolore dicta. Adipisci 
                  animi sit exercitationem. Dolores omnis impedit sed 
                  facilis saepe.
                </Typography>
              </List.Item>
            </List>
          </ContextMenu>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <Accordion>
            <Accordion.Item label='Accordion Item'>
              <Typography type='p'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A, 
                corporis consequuntur porro suscipit inventore atque cupiditate 
                quos beatae, officia deserunt esse praesentium fugiat adipisci 
                optio unde voluptates saepe similique veniam!
              </Typography>
            </Accordion.Item>

            <Accordion.Item label='Accordion Item'>
              <Typography type='p'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Atque, est dicta, eaque adipisci.
              </Typography>
            </Accordion.Item>

            <Accordion.Item label='Accordion Item'>
              <Typography type='p'>
                Lorem, ipsum dolor sit amet.
              </Typography>
            </Accordion.Item>
          </Accordion>
        </Layout.Subsection>
      </Layout.Section>

      <Layout.Section>
        <Layout.Subsection>
          <Typography type='h2'>Header H2</Typography>
          <Typography type='p'>Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Repellendus placeat sapiente itaque dolorum cupiditate maiores 
            doloremque? Molestias quasi pariatur consectetur dolorum adipisicing
            cupiditate <Button label='tempore tenetur' type='text' href='#' /> a
            natus soluta. Voluptatem pariatur aperiam aliquid minus 
            inventore similique quam!</Typography>
          <hr style={{margin: '1rem 0', opacity: '0'}} />
          <Typography size='s' type='h2'>Header H2 S</Typography>
          <Typography size='m' type='h2'>Header H2 M</Typography>
          <Typography size='l' type='h2'>Header H2 L</Typography>
          <Typography size='xl' type='h2'>Header H2 XL</Typography>

          <Typography type='p' size='xs'>Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Repellendus placeat sapiente itaque dolorum cupiditate maiores 
            doloremque? Molestias quasi tempore tenetur natus soluta. Voluptatem 
            pariatur aperiam aliquid minus inventore similique quam!</Typography>
          <hr style={{margin: '1rem 0', opacity: '0'}} />

          <Typography type='p' size='s'>Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Repellendus placeat sapiente itaque dolorum cupiditate maiores 
            doloremque? Molestias quasi tempore tenetur natus soluta. Voluptatem 
            pariatur aperiam aliquid minus inventore similique quam!</Typography>
          <hr style={{margin: '1rem 0', opacity: '0'}} />

          <Typography type='p' size='m'>Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Repellendus placeat sapiente itaque dolorum cupiditate maiores 
            doloremque? Molestias quasi tempore tenetur natus soluta. Voluptatem 
            pariatur aperiam aliquid minus inventore similique quam!</Typography>
          <hr style={{margin: '1rem 0', opacity: '0'}} />

          <Typography type='p' size='l'>Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Repellendus placeat sapiente itaque dolorum cupiditate maiores 
            doloremque? Molestias quasi tempore tenetur natus soluta. Voluptatem 
            pariatur aperiam aliquid minus inventore similique quam!</Typography>
          <hr style={{margin: '1rem 0', opacity: '0'}} />

          <Typography type='p' size='xl'>Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Repellendus placeat sapiente itaque dolorum cupiditate maiores 
            doloremque? Molestias quasi tempore tenetur natus soluta. Voluptatem 
            pariatur aperiam aliquid minus inventore similique quam!</Typography>
        </Layout.Subsection>
      </Layout.Section>

      <Layout.Section>
        <Layout.Subsection span={1}>
          <Typography>1</Typography>
        </Layout.Subsection>

        <Layout.Subsection span={2}>
          <Typography>2</Typography>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <Typography>3</Typography>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <Typography>4</Typography>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <Typography>5</Typography>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <Typography>6</Typography>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <Typography>7</Typography>
        </Layout.Subsection>

        <Layout.Subsection span={2}>
          <Typography>8</Typography>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <Typography>9</Typography>
        </Layout.Subsection>
      </Layout.Section>
    </>
  )
}

export default Page
