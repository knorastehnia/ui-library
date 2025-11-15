import { render, type RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Checkbox } from './Checkbox'
import { Typography } from '../Typography'

describe('Checkbox', () => {
  let user: UserEvent
  let component: RenderResult
  
  describe('with disabled=false', () => {
    beforeEach(() => {
      user = userEvent.setup()
      component = render(<CheckboxTest />)
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })

    it('should toggle state on Click', async () => {
      const content = component.getByText('Checkbox content')
      const checkbox = component.getByRole('checkbox')

      await user.click(content)

      expect(checkbox).toBeChecked()
    })

    it('should toggle state on Space', async () => {
      const checkbox = component.getByRole('checkbox')

      checkbox.focus()
      expect(checkbox).toHaveFocus()

      await user.keyboard('[Space]')
      expect(checkbox).toBeChecked()
    })
  })

  describe('with disabled=true', () => {
    beforeEach(() => {
      user = userEvent.setup()
      component = render(<CheckboxTest disabled />)
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })

    it('should not toggle state on Click', async () => {
      const content = component.getByText('Checkbox content')
      const checkbox = component.getByRole('checkbox')

      await user.click(content)
      expect(checkbox).not.toBeChecked()
    })

    it('should not toggle state on Space', async () => {
      const checkbox = component.getByRole('checkbox')

      checkbox.focus()
      expect(checkbox).not.toHaveFocus()

      await user.keyboard('[Space]')
      expect(checkbox).not.toBeChecked()
    })
  })
})

const CheckboxTest: React.FC<{disabled?: boolean}> = ({
  disabled=false,
}) => {
  return (
    <Checkbox name='checkbox-name' disabled={disabled}>
      <Typography>Checkbox content</Typography>
    </Checkbox>
  )
}
