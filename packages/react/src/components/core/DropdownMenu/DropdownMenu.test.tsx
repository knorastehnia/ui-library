import { vi, type Mock } from 'vitest'
import { render, type RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { DropdownMenu } from './DropdownMenu'

describe('DropdownMenu', () => {
  let user: UserEvent
  let component: RenderResult
  let buttonAction: Mock

  beforeEach(() => {
    const root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)

    buttonAction = vi.fn()
    user = userEvent.setup()
    component = render(<DropdownMenuTest action={buttonAction} />)
  })

  it('should have no accessibility violations', async () => {
    expect(await axe(component.container)).toHaveNoViolations()
  })

  it('should open when trigger is clicked', async () => {
    const popover = component.getByRole('dialog', { hidden: true })
    const trigger = component.getByText('Trigger')

    expect(popover).toHaveAttribute('aria-hidden', 'true')
    await user.click(trigger)
    expect(popover).toHaveAttribute('aria-hidden', 'false')
  })

  it('should execute an action on Click based on item disabled state', async () => {
    const trigger = component.getByText('Trigger')
    await user.click(trigger)

    const item1 = component.getByRole('button', { name: 'Item 1' })
    const item2 = component.getByRole('button', { name: 'Item 2' })
    const item3 = component.getByRole('button', { name: 'Item 3' })

    await user.click(item1)
    await user.click(item2)
    await user.click(item3)

    expect(buttonAction).toHaveBeenCalledTimes(2)
  })

  it('should navigate and cycle correctly using Arrow and Page keys', async () => {
    const trigger = component.getByText('Trigger')
    await user.click(trigger)

    const item1 = component.getByRole('button', { name: 'Item 1' })
    const item3 = component.getByRole('button', { name: 'Item 3' })
    const item4 = component.getByRole('button', { name: 'Item 4' })

    // When no item is in focus, ArrowDown should focus first item
    await user.keyboard('[ArrowDown]')
    expect(item1).toHaveFocus()

    // PageUp should not cycle
    await user.keyboard('[PageUp]')
    expect(item1).toHaveFocus()

    // Must skip over disabled item
    await user.keyboard('[PageDown]')
    expect(item3).toHaveFocus()

    await user.keyboard('[PageUp]')
    expect(item1).toHaveFocus()

    // ArrowUp should cycle
    await user.keyboard('[ArrowUp]')
    expect(item4).toHaveFocus()

    // ArrowDown should cycle
    await user.keyboard('[ArrowDown]')
    expect(item1).toHaveFocus()
  })
})

const DropdownMenuTest: React.FC<{ action: Function }> = ({ action }) => {
  return (
    <DropdownMenu
      label='Trigger'
        items={[
          { label: 'Item 1', action },
          { label: 'Item 2', action, disabled: true },
          { label: 'Item 3', action, disabled: false },
          { label: 'Item 4', action, disabled: false },
        ]}
    />
  )
}
