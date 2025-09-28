import Button from './components/core/Button'
import Field from './components/core/Field'
import Select from './components/core/Select'
import Checkbox from './components/core/Checkbox'
import Radio from './components/core/Radio'
import Dropdown from './components/core/Dropdown'
import Typography, { T } from './components/core/Typography'
import Modal from './components/core/Modal'
import List from './components/core/List'
import Accordion from './components/core/Accordion'
import Tree from './components/core/Tree'
import Table from './components/core/Table'
import ContextMenu from './components/core/ContextMenu'
import Checkmark from './components/icons/Checkmark'

import Layout from './components/core/Layout'

import { useState } from 'react'
import Visibility from './components/icons/Visibility'

const Page = () => {
  const [someState, setSomeState] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Modal isOpen={showModal} setIsOpen={setShowModal} width='500px'>
        <T type='h3' size='xs'>Modal component</T>

        <T type='p'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, cumque? 
          Facilis quaerat similique maxime atque consequatur alias est, autem 
          obcaecati laboriosam mollitia harum, ad quia officia tempore 
          doloremque saepe explicabo!
        </T>

        <div style={{
          marginLeft: 'auto',
          marginTop: '2rem',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'right',
          gap: '10px',
        }}>
          <Button action={() => setShowModal(false)} type='fill'>
            <T>Confirm</T>
          </Button>
          <Button action={() => setShowModal(false)}>
            <T>Cancel</T>
          </Button>
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
            <Button disabled width='full'>
              <T>Disabled Button</T>
            </Button>
            <Button action={() => setShowModal(true)} width='full'>
              <Typography>Open Modal</Typography>
            </Button>

            <Button><T>Button Outline</T></Button>
            <Button type='fill'><T>Button Fill</T></Button>
            <Button width='auto'><Checkmark color='foreground' state={true} /></Button>
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
                type='number'
                name='input1'
                limit={12}
                errors={[
                  {message: 'This is a custom error message and it is very long.', failState: someState},
                ]}
              >
                <T>Street No.</T>
              </Field>

              <Field name='input2'><T>Street Name</T></Field>
            </div>

            <Field type='email' name='test'><T>Email</T></Field>
            <Field type='password' name='password'><T>Password</T></Field>
            <Button
              action={() => setSomeState(!someState)}
              type='fill'
              width='full'
            >
              <T>Submit</T>
            </Button>
          </div>
        </Layout.Subsection>

        <Layout.Subsection span={2}>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'end',
            gap: '20px',
          }}>
            <Field type='textarea' limit={200} height='200px' name='sta'><T>Static</T></Field>
            <Field type='textarea' limit={10} name='dyn' resizable><T>Dynamic</T></Field>

              <Select
                multiple
                width='full'
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

            <Dropdown label='Dropdown' direction='bottom'>
              <div style={{
                display: 'flex',
                flexFlow: 'row',
                marginRight: '1px solid #333',
                width: '400px',
              }}>
                <Tree>
                  <Tree.Branch label='Branch 1'>
                    <Tree.Item action='#'><T>Item 1</T></Tree.Item>
                    <Tree.Item action='#'><T>Item 2</T></Tree.Item>
                    <Tree.Item action='#'><T>Item 3</T></Tree.Item>
                  </Tree.Branch>

                  <Tree.Branch label='Branch 2'>
                    <Tree.Item action='#'><T>Item 1</T></Tree.Item>
                    <Tree.Item action='#'><T>Item 2</T></Tree.Item>
                    <Tree.Item action='#'><T>Item 3</T></Tree.Item>
                  </Tree.Branch>

                  <Tree.Item action='#'><T>Item 1</T></Tree.Item>
                  <Tree.Item action='#'><T>Item 2</T></Tree.Item>
                  <Tree.Item action='#'><T>Item 3</T></Tree.Item>
                </Tree>
                <div>
                  <Dropdown.Item action='#'><T>Item 1</T></Dropdown.Item>
                  <Dropdown label='Nested Dropdown 1'>
                    <Dropdown.Item><T>Nested Item 1.1</T></Dropdown.Item>
                    <Dropdown.Item><T>Nested Item 1.2</T></Dropdown.Item>
                    <Dropdown.Item><T>Nested Item 1.3</T></Dropdown.Item>
                  </Dropdown>
                  <Dropdown label='Nested Dropdown 2' direction='right'>
                    <Dropdown.Item><T>Nested Item 2.1</T></Dropdown.Item>
                    <Dropdown.Item><T>Nested Item 2.2</T></Dropdown.Item>
                    <Dropdown.Item><T>Nested Item 2.3</T></Dropdown.Item>

                    <Dropdown label='Nested Dropdown 2.1'>
                      <Dropdown.Item><T>Nested Item 2.3.1</T></Dropdown.Item>
                      <Dropdown.Item><T>Nested Item 2.3.2</T></Dropdown.Item>
                      <Dropdown.Item><T>Nested Item 2.3.3</T></Dropdown.Item>
                    </Dropdown>
                  </Dropdown>
                  <Dropdown.Item action={() => null} disabled><T>Item 2</T></Dropdown.Item>
                  <Dropdown.Item action={() => null} disabled><T>Item 3</T></Dropdown.Item>
                  <Dropdown.Item action={() => null}><T>Item 4</T></Dropdown.Item>
                </div>
              </div>
            </Dropdown>
          </div>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <div style={{
            display: 'flex',
            flexFlow: 'column',
            gap: '20px',
          }}>
            <div style={{
              display: 'flex',
              flexFlow: 'column',
              gap: '20px',
            }}>
              <Checkbox name='cb1'><T>Checkbox 1</T></Checkbox>

              <Checkbox name='cb2'>
                <div><Typography>Checkbox 2</Typography></div>
                <div><Typography size='s' color='dimmed'>Sublabel</Typography></div>
              </Checkbox>

              <Checkbox name='cb3'>
                <Typography size='xs'>Checkbox 3</Typography>
              </Checkbox>

              <Checkbox name='cb4'>
                <Visibility state={false}></Visibility>
              </Checkbox>
            </div>

            <Radio style='vertical' name='rgroup1'>
              <Radio.Item value='r1'><T>Radio 1.1</T></Radio.Item>
              <Radio.Item value='r2'><T>Radio 1.2</T></Radio.Item>
              <Radio.Item value='r3'><T>Radio 1.3</T></Radio.Item>
            </Radio>

            <Radio name='rgroup2'>
              <Radio.Item value='r1'><T>A</T></Radio.Item>
              <Radio.Item value='r2'><T>B</T></Radio.Item>
              <Radio.Item value='r3'><T>C</T></Radio.Item>
              <Radio.Item value='r4'><T>D</T></Radio.Item>
            </Radio>
          </div>
        </Layout.Subsection>
      </Layout.Section>

      <Layout.Section>
        <Layout.Subsection>
          <Table>
            <Table.Row>
              <Table.Cell><T>Cell</T></Table.Cell>
              <Table.Cell><T>Cell</T></Table.Cell>
              <Table.Cell><T>Cell</T></Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Field type='textarea' resizable name='field1'><T>Field</T></Field>
              </Table.Cell>
              <Table.Cell><T>Cell</T></Table.Cell>
              <Table.Cell><T>Cell</T></Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell><T>Cell</T></Table.Cell>
              <Table.Cell><T>Cell</T></Table.Cell>
              <Table.Cell rowSpan={2} colSpan={1}>
                <Typography type='p'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, 
                  porro doloribus. Ad ratione expedita, quae neque fugit, ea 
                  laboriosam facere quas exercitationem sint doloribus. 
                  Excepturi dolorum nobis ratione vel facilis?
                </Typography>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell><T>Cell</T></Table.Cell>
              <Table.Cell><T>Cell</T></Table.Cell>
            </Table.Row>
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
            <List>
              <List.Item>
                <T>Dolor sit amet consectetur adipisicing elit.</T>
              </List.Item>

              <List.Item>
                <Typography type='span'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                </Typography>
              </List.Item>

              <List.Item>
                <Typography type='p'>
                  Sit amet consectetur adipisicing elit. Ipsam atque 
                  dolores aliquam explicabo veniam, hic dolore dicta. 
                  Adipisci animi sit exercitationem.
                </Typography>
              </List.Item>

              <List.Item>
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
              <Accordion>
                <Accordion.Item label='Item'>
                  <T>Content</T>
                </Accordion.Item>
              </Accordion>
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
            cupiditate <Button type='text' action='#'><T>tempore tenetur</T></Button> a
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
        <Layout.Subsection span={1}><T>1</T></Layout.Subsection>
        <Layout.Subsection span={2}><T>2</T></Layout.Subsection>
        <Layout.Subsection span={1}><T>3</T></Layout.Subsection>
        <Layout.Subsection span={1}><T>4</T></Layout.Subsection>
        <Layout.Subsection span={1}><T>5</T></Layout.Subsection>
        <Layout.Subsection span={1}><T>6</T></Layout.Subsection>
        <Layout.Subsection span={1}><T>7</T></Layout.Subsection>
        <Layout.Subsection span={2}><T>8</T></Layout.Subsection>
        <Layout.Subsection span={1}><T>9</T></Layout.Subsection>
      </Layout.Section>
    </>
  )
}

export default Page
