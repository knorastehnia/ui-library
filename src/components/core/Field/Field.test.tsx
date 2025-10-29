import { vi, type Mock } from 'vitest'
import { render, type RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Field, type FieldProps } from './Field'

describe('Field', () => {
  let user: UserEvent
  let component: RenderResult
  let onChange: Mock

  describe('with type=text', () => {
    beforeEach(() => {
      onChange = vi.fn()
      user = userEvent.setup()
      component = render(
        <FieldTest
          label='f'
          type='text'
          limit={2}
          value='abc'
        />
      )
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })

    it('should validate character count', async () => {
      const field = component.getByRole('textbox')
      const button = component.getByText('Remove Focus')

      expect(component.queryByText('Character count exceeds limit.')).toBeNull()

      field.focus()
      expect(field).toHaveFocus()

      await user.click(button)
      expect(component.queryByText('Character count exceeds limit.')).not.toBeNull()
    })
  })

  describe('with disabled=true', () => {
    beforeEach(() => {
      onChange = vi.fn()
      user = userEvent.setup()
      component = render(
        <FieldTest
          label='f'
          disabled
        />
      )
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })

    it('should not be active', async () => {
      const field = component.getByRole('textbox')

      field.focus()
      await user.click(field)
      expect(field).not.toHaveFocus()
    })
  })
})

const FieldTest: React.FC<FieldProps> = (props) => {
  return (
    <>
      <Field {...props} />
      <button>Remove Focus</button>
    </>
  )
}
