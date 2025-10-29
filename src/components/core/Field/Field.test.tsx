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

  describe('with type=textarea', () => {
    beforeEach(() => {
      onChange = vi.fn()
      user = userEvent.setup()
      component = render(
        <FieldTest
          label='f'
          type='textarea'
          value='abc'
        />
      )
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })
  })

  describe('with type=password', () => {
    beforeEach(() => {
      onChange = vi.fn()
      user = userEvent.setup()
      component = render(
        <FieldTest
          label='f'
          type='password'
          value='abc1234'
        />
      )
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })
  })

  describe('with type=email', () => {
    beforeEach(() => {
      onChange = vi.fn()
      user = userEvent.setup()
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })

    describe('with valid input', () => {
      beforeEach(() => {
        component = render(
          <FieldTest
            label='f'
            type='email'
            value='abc@example.com'
          />
        )
      })

      it('should not show email error', async () => {
        const field = component.getByRole('textbox')
        const button = component.getByText('Remove Focus')

        expect(component.queryByText('Please enter a valid email.')).toBeNull()

        field.focus()
        expect(field).toHaveFocus()

        await user.click(button)
        expect(component.queryByText('Please enter a valid email.')).toBeNull()
      })
    })

    describe('with invalid input', () => {
      beforeEach(() => {
        component = render(
          <FieldTest
            label='f'
            type='email'
            value='abc@example'
          />
        )
      })

      it('should show email error', async () => {
        const field = component.getByRole('textbox')
        const button = component.getByText('Remove Focus')

        expect(component.queryByText('Please enter a valid email.')).toBeNull()

        field.focus()
        expect(field).toHaveFocus()

        await user.click(button)
        expect(component.queryByText('Please enter a valid email.')).not.toBeNull()
      })
    })
  })

  describe('with type=number', () => {
    beforeEach(() => {
      onChange = vi.fn()
      user = userEvent.setup()
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })

    describe('with valid input', () => {
      beforeEach(() => {
        component = render(
          <FieldTest
            label='f'
            type='number'
            value='1234'
          />
        )
      })

      it('should not show number error', async () => {
        const field = component.getByRole('textbox')
        const button = component.getByText('Remove Focus')

        expect(component.queryByText('Please enter a valid number.')).toBeNull()

        field.focus()
        expect(field).toHaveFocus()

        await user.click(button)
        expect(component.queryByText('Please enter a valid number.')).toBeNull()
      })
    })

    describe('with invalid input', () => {
      beforeEach(() => {
        component = render(
          <FieldTest
            label='f'
            type='number'
            value='1234a'
          />
        )
      })

      it('should show number error', async () => {
        const field = component.getByRole('textbox')
        const button = component.getByText('Remove Focus')

        expect(component.queryByText('Please enter a valid number.')).toBeNull()

        field.focus()
        expect(field).toHaveFocus()

        await user.click(button)
        expect(component.queryByText('Please enter a valid number.')).not.toBeNull()
      })
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
