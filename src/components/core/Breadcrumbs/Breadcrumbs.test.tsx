import { vi, type Mock } from 'vitest'
import { render, type RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Breadcrumbs } from './Breadcrumbs'

describe('Breadcrumbs', () => {
  let user: UserEvent
  let component: RenderResult
  let buttonAction: Mock

  beforeEach(() => {
    buttonAction = vi.fn()
    user = userEvent.setup()
    component = render(<BreadcrumbsTest action={buttonAction} />)
  })

  it('should have no accessibility violations', async () => {
    expect(await axe(component.container)).toHaveNoViolations()
  })

  it('should execute an action on Click', async () => {
    const item = component.getByRole('button', { name: 'Item 1' })

    await user.click(item)
    expect(buttonAction).toHaveBeenCalled()
  })

  it('should execute an action on Enter/Space', async () => {
    const item = component.getByRole('button', { name: 'Item 1' })

    item.focus()
    expect(item).toHaveFocus()

    await user.keyboard('[Enter]')
    await user.keyboard('[Space]')

    expect(buttonAction).toHaveBeenCalledTimes(2)
  })

  it('should navigate with correct Tab order', async () => {
    const item1 = component.getByRole('button', { name: 'Item 1' })
    const item2 = component.getByRole('button', { name: 'Item 2' })

    item1.focus()
    expect(item1).toHaveFocus()

    await user.tab()
    expect(item2).toHaveFocus()
  })

  it('should not render items with no action property as buttons', () => {
    const item = component.queryByRole('button', { name: 'Item 3' })

    expect(item).toBeNull()
  })
})

const BreadcrumbsTest: React.FC<{action?: string | Function}> = ({ action }) => {
  return (
    <Breadcrumbs items={[
      { label: 'Item 1', action },
      { label: 'Item 2', action },
      { label: 'Item 3' },
    ]} />
  )
}
