import { Alert, Checkmark, Visibility, Spinner } from './components/icons'
import { Button, DropdownMenu } from './components/core'
import { Field } from './components/core'
import { Select } from './components/core'
import { Checkbox } from './components/core'
import { Radio } from './components/core'
import { Flyout } from './components/core'
import { Typography, T } from './components/core'
import { Modal } from './components/core'
import { ContextMenu } from './components/core'
import { Tabs } from './components/core'
import { Slider } from './components/core'
import { Layout } from './components/core'
import { Invisible } from './components/core'
import { Collapsible } from './components/core'
import { Pagination } from './components/core'
import { Breadcrumbs } from './components/core'
import { Menu } from './components/core'
import { Calendar } from './components/core'
import { DatePicker } from './components/core'

import { useRef, useState } from 'react'

const Page = () => {
  const [someState, setSomeState] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isSpinning, setIsSpinning] = useState(true)
  const [selectOptions, setSelectOptions] = useState(['windows'])
  const [scalarValue, setScalarValue] = useState(20)
  const [radioValue, setRadioValue] = useState('r2')
  const [tabValue, setTabValue] = useState('t1')
  const [pageValue, setPageValue] = useState(1)
  const [dateValue, setDateValue] = useState([new Date()])

  const targetRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <ContextMenu
        target={targetRef}
        items={[
          { label: 'Context Menu Item' },
          { label: 'Refresh Page' },
          { label: 'Inspect Item', disabled: true },
          { label: 'Loop Up Definition', disabled: false },
          { label: 'Save As...' },
        ]}
      />

      <Modal isOpen={showModal} onOpenChange={setShowModal} width='300px'>
        <Calendar />

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

            <Flyout label='Flyout' arrangement='vertical'>
              <Button action='#'><T>Flyout Item</T></Button>

              <Flyout label='Nested Flyout 1'>
                <Button><T>Flyout Item</T></Button>
                <Button><T>Flyout Item</T></Button>
                <Button><T>Flyout Item</T></Button>
              </Flyout>
              <Flyout label='Nested Flyout 2' arrangement='vertical'>
                <Button><T>Flyout Item</T></Button>
                <Button><T>Flyout Item</T></Button>
                <Button><T>Flyout Item</T></Button>

                <Flyout label='Nested Flyout 2.1'>
                  <Button><T>Flyout Item</T></Button>
                  <Button><T>Flyout Item</T></Button>
                  <Button><T>Flyout Item</T></Button>
                </Flyout>

                <Flyout label='Nested Flyout 2.2' arrangement='horizontal'>
                  <Button><T>Flyout Item</T></Button>
                  <Button><T>Flyout Item</T></Button>
                  <Button><T>Flyout Item</T></Button>
                </Flyout>
              </Flyout>
              <Button action={() => null} disabled><T>Flyout Item</T></Button>
              <Button action={() => null} disabled><T>Flyout Item</T></Button>
              <Button action={() => null}><T>Flyout Item</T></Button>
            </Flyout>

            <DropdownMenu
              label='Dropdown'
              items={[
                { icon: <Checkmark state={true} color='dimmed' />, label: 'Item 1' },
                { icon: <Alert color='dimmed' />, label: 'Item 2' },
                { label: 'Item 3', items: [
                  { label: 'Item 3.1' },
                  { label: 'Item 3.2', items: [
                    { label: 'Item 3.2.1' },
                    { label: 'Item 3.2.2' },
                    { label: 'Item 3.2.3' },
                  ] },
                  { label: 'Item 3.3' },
                ] },
                { label: 'Item 4', items: [
                  { label: 'Item 4.1' },
                  { label: 'Item 4.2', items: [
                    { label: 'Item 4.2.1' },
                    { label: 'Item 4.2.2' },
                    { label: 'Item 4.2.3', items: [
                      { label: 'Item 4.2.3.1' },
                      { label: 'Item 4.2.3.2' },
                      { label: 'Item 4.2.3.3' },
                    ] },
                  ] },
                  { label: 'Item 4.3' },
                ]}
              ]}
            />

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

              <Field disabled label='Street Name' name='input2' />
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

              <Checkbox disabled name='cb3'>
                <Typography size='xs'>Checkbox 3</Typography>
              </Checkbox>

              <Checkbox name='cb4'>
                <Visibility state={false}></Visibility>
              </Checkbox>
            </div>

            <Radio value={radioValue} onChange={setRadioValue} arrangement='vertical' name='rgroup1'>
              <Radio.Item disabled value='r1'><T>Radio 1.1</T></Radio.Item>
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
        <Layout.Subsection span={1}>
          <Menu size='l' items={[
            { icon: <Checkmark state={true} color='dimmed' />, label: 'Item 1' },
            { icon: <Alert color='dimmed' />, label: 'Item 2' },
            { label: 'Item 3', items: [
              { label: 'Item 3.1' },
              { label: 'Item 3.2', items: [
                { label: 'Item 3.2.1' },
                { label: 'Item 3.2.2' },
                { label: 'Item 3.2.3' },
              ] },
              { label: 'Item 3.3' },
            ] },
            { label: 'Item 4', items: [
              { label: 'Item 4.1' },
              { label: 'Item 4.2', items: [
                { label: 'Item 4.2.1' },
                { label: 'Item 4.2.2' },
                { label: 'Item 4.2.3', items: [
                  { label: 'Item 4.2.3.1' },
                  { label: 'Item 4.2.3.2' },
                  { label: 'Item 4.2.3.3' },
                ] },
              ] },
              { label: 'Item 4.3' },
            ] },
          ]} />
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <div style={{
            display: 'flex',
            flexFlow: 'column',
            gap: '40px',
          }}>
            <Calendar
              type='single'
              minValue={new Date(2025, 5, 12)}
              maxValue={new Date(2026, 1, 20)}
              value={dateValue}
              onChange={setDateValue}
            />
            <Typography>
              Selected date: {
                dateValue.map((val) => {
                  return val.toDateString()
                })
              }
            </Typography>
          </div>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
          <DatePicker
            label='Select date'
          />
        </Layout.Subsection>

        <Layout.Subsection span={2}>
          <div ref={targetRef}>
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
          </div>
        </Layout.Subsection>

        <Layout.Subsection span={1}>
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
            { label: 'Home', action: '#' },
            { label: 'Movies', action: '#' },
            { label: 'Mulholland Drive' },
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
