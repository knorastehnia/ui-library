import { render, type RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Radio } from './Radio'
import { Typography } from '../Typography'

describe('Radio', () => {
  let user: UserEvent
  let component: RenderResult

  beforeEach(() => {
    const root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)

    user = userEvent.setup()
    component = render(<RadioTest />)
  })

  it('should have no accessibility violations', async () => {
    expect(await axe(component.container)).toHaveNoViolations()
  })

  it('should check selected item, if not disabled', async () => {
    const item1 = component.getByRole('radio', { name: 'Item 1' })
    const item2 = component.getByRole('radio', { name: 'Item 2' })
    const item3 = component.getByRole('radio', { name: 'Item 3' })

    await user.click(item1)
    expect(item1).toBeChecked()

    await user.click(item2)
    expect(item1).toBeChecked()
    expect(item2).not.toBeChecked()

    await user.click(item3)
    expect(item1).not.toBeChecked()
    expect(item3).toBeChecked()
  })

  it('should navigate and cycle correctly using Arrow, Page, End, and Home keys', async () => {
    const item1 = component.getByRole('radio', { name: 'Item 1' })
    const item2 = component.getByRole('radio', { name: 'Item 2' })
    const item3 = component.getByRole('radio', { name: 'Item 3' })
    const item4 = component.getByRole('radio', { name: 'Item 4' })

    const radio = component.container.firstElementChild! as HTMLElement

    radio.focus()
    expect(radio).toHaveFocus()

    // When no item is checked, ArrowDown should check first item
    await user.keyboard('[ArrowDown]')
    expect(item1).toBeChecked()

    // PageUp should not cycle
    await user.keyboard('[PageUp]')
    expect(item1).toBeChecked()

    // Must skip over disabled item
    await user.keyboard('[PageDown]')
    expect(item2).not.toBeChecked()
    expect(item3).toBeChecked()

    await user.keyboard('[PageUp]')
    expect(item1).toBeChecked()

    // ArrowUp should cycle
    await user.keyboard('[ArrowUp]')
    expect(item4).toBeChecked()

    // ArrowDown should cycle
    await user.keyboard('[ArrowDown]')
    expect(item1).toBeChecked()
  })
})

const RadioTest = () => {
  return (
    <Radio name='radio'>
      <Radio.Item value='r1'><Typography>Item 1</Typography></Radio.Item>
      <Radio.Item value='r2' disabled><Typography>Item 2</Typography></Radio.Item>
      <Radio.Item value='r3'><Typography>Item 3</Typography></Radio.Item>
      <Radio.Item value='r4'><Typography>Item 4</Typography></Radio.Item>
    </Radio>
  )
}
