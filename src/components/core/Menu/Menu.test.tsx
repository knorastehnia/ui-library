import { vi, type Mock } from 'vitest'
import { render, type RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Menu } from './Menu'

describe('Menu', () => {
  let user: UserEvent
  let component: RenderResult
  let buttonAction: Mock

  beforeEach(() => {
    buttonAction = vi.fn()
    user = userEvent.setup()
    component = render(<MenuTest action={buttonAction} />)
  })

  it('should have no accessibility violations', async () => {
    expect(await axe(component.container)).toHaveNoViolations()
  })

  it('should execute an action on Click based on item disabled state', async () => {
    const item1 = component.getByRole('button', { name: 'Item 1' })
    const item2 = component.getByRole('button', { name: 'Item 2' })
    const item3 = component.getByRole('button', { name: 'Item 3' })

    await user.click(item1)
    await user.click(item2)
    await user.click(item3)

    expect(buttonAction).toHaveBeenCalledTimes(2)
  })

  it('should navigate and cycle correctly using Arrow and Page keys', async () => {
    const item1 = component.getByRole('button', { name: 'Item 1' })
    const item3 = component.getByRole('button', { name: 'Item 3' })
    const item4 = component.getByRole('button', { name: 'Item 4' })

    item1.focus()
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

  it('should navigate through submenus', async () => {
    const submenuTrigger = component.getByRole('button', { name: 'Item 4' })

    submenuTrigger.focus()
    expect(submenuTrigger).toHaveFocus()

    await user.keyboard('[ArrowRight]')

    const lastItem = component.getByRole('button', { name: 'Item 4.3' })

    await user.keyboard('[End]')
    expect(lastItem).toHaveFocus()
  })
})

const MenuTest: React.FC<{ action: Function }> = ({ action }) => {
  return (
    <Menu
      items={[
        { label: 'Item 1', action },
        { label: 'Item 2', action, disabled: true },
        { label: 'Item 3', action, disabled: false },
        { label: 'Item 4', items: [
          { label: 'Item 4.1', action },
          { label: 'Item 4.2', action },
          { label: 'Item 4.3', action },
        ]},
      ]}
    />
  )
}
