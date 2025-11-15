import { render, type RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Collapsible } from './Collapsible'
import { Typography } from '../Typography'

describe('Collapsible', () => {
  let user: UserEvent
  let component: RenderResult

  beforeEach(() => {
    user = userEvent.setup()
    component = render(<CollapsibleTest />)
  })

  it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
  })

  it('should toggle visibility on Click', async () => {
    const button = component.getByRole('button', { name: 'Item 1' })
    const content = component.getByText('Content for Item 1').parentElement

    expect(content).toHaveAttribute('aria-hidden', 'true')

    await user.click(button)
    expect(content).toHaveAttribute('aria-hidden', 'false')
  })

  it('should toggle visibility on Enter/Space', async () => {
    const button = component.getByRole('button', { name: 'Item 1' })
    const content = component.getByText('Content for Item 1').parentElement!

    expect(content).toHaveAttribute('aria-hidden', 'true')

    button.focus()
    expect(button).toHaveFocus()

    await user.keyboard('[Enter]')
    expect(content).toHaveAttribute('aria-hidden', 'false')

    await user.keyboard('[Space]')
    expect(content).toHaveAttribute('aria-hidden', 'true')
  })

  it('should navigate with correct Tab order', async () => {
    const button1 = component.getByRole('button', { name: 'Item 1' })
    const button2 = component.getByRole('button', { name: 'Item 2' })

    button1.focus()
    expect(button1).toHaveFocus()

    await user.tab()
    expect(button2).toHaveFocus()
  })
})

const CollapsibleTest = () => {
  return (
    <>
      <Collapsible label='Item 1'>
        <Typography type='p'>Content for Item 1</Typography>
      </Collapsible>
      <Collapsible label='Item 2'>
        <Typography type='p'>Content for Item 2</Typography>
      </Collapsible>
    </>
  )
}
