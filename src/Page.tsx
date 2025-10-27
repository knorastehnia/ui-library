import { Button } from './components/core'
import { Field } from './components/core'
import { Select } from './components/core'
import { Checkbox } from './components/core'
import { Radio } from './components/core'
import { Dropdown } from './components/core'
import { Typography, T } from './components/core'
import { Modal } from './components/core'
import { List } from './components/core'
import { Table } from './components/core'
import { ContextMenu } from './components/core'
import { Checkmark } from './components/icons'
import { Spinner } from './components/icons'
import { Visibility } from './components/icons'
import { Tabs } from './components/core'
import { Slider } from './components/core'
import { Layout } from './components/core'
import { Invisible } from './components/core'
import { Collapsible } from './components/core'
import { Pagination } from './components/core'
import { Breadcrumbs } from './components/core'

import { useState } from 'react'

const Page = () => {
  const [someState, setSomeState] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isSpinning, setIsSpinning] = useState(true)
  const [selectOptions, setSelectOptions] = useState(['windows'])
  const [scalarValue, setScalarValue] = useState(20)
  const [radioValue, setRadioValue] = useState('r2')
  const [tabValue, setTabValue] = useState('t1')
  const [pageValue, setPageValue] = useState(1)

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
          <Button action={() => setShowModal(false)} surface='fill'>
            <T>Confirm</T>
          </Button>
          <Button action={() => setShowModal(false)}>
            <T>Cancel</T>
          </Button>
        </div>
      </Modal>

      <Layout.Section>
        <Layout.Subsection span={2}>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'end',
            gap: '20px',
          }}>
            <Field label='Static' type='textarea' limit={200} height='200px' name='sta' />
            <Field label='Dynamic' type='textarea' limit={10} name='dyn' resizable />
            <Select
              label='Select OS'
              name='os1'
              items={[
                { label: 'Windows', value: 'windows', },
                { label: 'macOS', value: 'macos', disabled: true },
                { label: 'Linux', value: 'linux', },
                { label: 'A very long option indeed', value: 'a', },
              ]}
            />

            <Select
              type='multiple'
              width='full'
              label='Select OS'
              name='os2'
              value={selectOptions}
              onChange={setSelectOptions}
              items={[
                { label: 'Windows', value: 'windows', disabled: true, },
                { label: 'macOS', value: 'macos', },
                { label: 'Linux', value: 'linux', },
                { label: 'A very long option indeed', value: 'a', },
              ]}
            />

            <Select
              type='search'
              label='Select OS'
              name='os3'
              value={selectOptions}
              onChange={setSelectOptions}
              items={[
                { label: 'Windows', value: 'windows', },
                { label: 'macOS', value: 'macos', disabled: true },
                { label: 'Linux', value: 'linux', },
                { label: 'A very long option indeed', value: 'a', },
              ]}
            />

            <Dropdown label='Dropdown' arrangement='vertical'>
              <Button action='#'><T>Dropdown Item</T></Button>
              <Dropdown label='Nested Dropdown 1'>
                <Button><T>Dropdown Item</T></Button>
                <Button><T>Dropdown Item</T></Button>
                <Button><T>Dropdown Item</T></Button>
              </Dropdown>
              <Dropdown label='Nested Dropdown 2' arrangement='vertical'>
                <Button><T>Dropdown Item</T></Button>
                <Button><T>Dropdown Item</T></Button>
                <Button><T>Dropdown Item</T></Button>

                <Dropdown label='Nested Dropdown 2.1'>
                  <Button><T>Dropdown Item</T></Button>
                  <Button><T>Dropdown Item</T></Button>
                  <Button><T>Dropdown Item</T></Button>
                </Dropdown>

                <Dropdown label='Nested Dropdown 2.2' arrangement='horizontal'>
                  <Button><T>Dropdown Item</T></Button>
                  <Button><T>Dropdown Item</T></Button>
                  <Button><T>Dropdown Item</T></Button>
                </Dropdown>
              </Dropdown>
              <Button action={() => null} disabled><T>Dropdown Item</T></Button>
              <Button action={() => null} disabled><T>Dropdown Item</T></Button>
              <Button action={() => null}><T>Dropdown Item</T></Button>
            </Dropdown>

            <Slider name='slider1'
              minValue={0}
              maxValue={100}
              value={scalarValue}
              onChange={setScalarValue}
            >
              <div style={{
                display: 'flex',
                flexFlow: 'column',
              }}>
                <T>Carnal Flowers</T>
                <T color='dimmed' size='s'>Natural Snow Buildings</T>
              </div>
            </Slider>
          </div>
        </Layout.Subsection>

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
            <Button action={() => setShowModal(true)} size='m' width='full'>
              <Typography>Open Modal</Typography>
            </Button>

            <Button><T>Button Outline</T></Button>
            <Button surface='fill'><T>Button Fill</T></Button>
            <Button width='auto'>
              <Checkmark state={true} />
              <Invisible>Checkmark</Invisible>
            </Button>
            <Button action={() => setIsSpinning(!isSpinning)}>
              <div style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }}>
                <Spinner size='s' state={isSpinning} />
                <T>Spinner</T>
              </div>
            </Button>
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
              action={() => setSomeState(!someState)}
              surface='fill'
              width='full'
            >
              <T>Submit</T>
            </Button>
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
              <Checkbox value={isSpinning} onChange={setIsSpinning} name='cb1'><T>Checkbox 1</T></Checkbox>

              <Checkbox defaultValue={false} name='cb2'>
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

            <Radio value={radioValue} onChange={setRadioValue} arrangement='vertical' name='rgroup1'>
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
                <Field label='Field' type='textarea' resizable name='field1' />
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
          <ContextMenu items={[
            { label: 'Context Menu Item' },
            { label: 'Refresh Page' },
            { label: 'Inspect Item', disabled: true },
            { label: 'Loop Up Definition', disabled: false },
            { label: 'Save As...' },
          ]}>
            <Collapsible size='m' label='Collapsible 1' arrangement='trailing'>
              <Typography type='p'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A, 
                corporis consequuntur porro suscipit inventore atque cupiditate 
                quos beatae, officia deserunt esse praesentium fugiat adipisci 
                optio unde voluptates saepe similique veniam!
              </Typography>
            </Collapsible>

            <Collapsible label='Collapsible 2'>
              <Typography type='p'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Atque, est dicta, eaque adipisci.
              </Typography>
            </Collapsible>

            <Collapsible label='Collapsible 3'>
              <Typography type='p'>
                Lorem, ipsum dolor sit amet.
              </Typography>
            </Collapsible>
          </ContextMenu>
        </Layout.Subsection>
      </Layout.Section>

      <Layout.Section>
        <Layout.Subsection>
          <Tabs value={tabValue} onChange={setTabValue} navigation='select'>
            <Tabs.Tab label='Tab 1' value='t1'>
              <T>Lorem ipsum dolor sit amet 1</T>
            </Tabs.Tab>

            <Tabs.Tab label='Tab 2' value='t2' disabled>
              <T>Lorem ipsum dolor sit amet 2</T>
            </Tabs.Tab>

            <Tabs.Tab label='Tab 3' value='t3'>
              <T>Lorem ipsum dolor sit amet 3</T>
            </Tabs.Tab>

            <Tabs.Tab label='Tab 4' value='t4'>
              <T>Lorem ipsum dolor sit amet 4</T>
            </Tabs.Tab>
          </Tabs>
        </Layout.Subsection>
      </Layout.Section>

      <Layout.Section>
        <Layout.Subsection span={1}>
          <Breadcrumbs items={[
            {label: 'Home', href: '#'},
            {label: 'Movies', href: '#'},
            {label: 'Mulholland Drive', href: '#'},
          ]} />
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <Pagination siblingCount={1} value={pageValue} onChange={setPageValue} count={20} />
        </Layout.Subsection>
      </Layout.Section>

      <Layout.Section>
        <Layout.Subsection>
          <Typography type='h2'>Header H2</Typography>
          <Typography type='p'>Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Repellendus placeat sapiente itaque dolorum cupiditate maiores 
            doloremque? Molestias quasi pariatur consectetur dolorum adipisicing
            cupiditate <Button surface='text' action='#'><T>tempore tenetur</T></Button> a
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
