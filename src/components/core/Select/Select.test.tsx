import { vi, type Mock } from 'vitest'
import { render, type RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Select } from './Select'

describe('Select', () => {
  let user: UserEvent
  let component: RenderResult
  let onChange: Mock

  describe('with type=single', () => {
    beforeEach(() => {
      onChange = vi.fn()
      user = userEvent.setup()
      component = render(
        <SelectTest
          type='single'
          value={[]}
          onChange={onChange}
        />
      )
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })

    it('should select/deselect an item on Click', async () => {
      const trigger = component.getByRole('combobox')
      await user.click(trigger)

      const item = component.getByRole('button', { name: 'Item 2' })

      await user.click(item)
      expect(onChange).toHaveBeenCalledWith(['item2'])
    })

    it('should cycle through items using Arrow and Page keys', async () => {
      const trigger = component.getByRole('combobox')
      await user.click(trigger)

      const item1 = component.getByRole('button', { name: 'Item 1' })
      const item4 = component.getByRole('button', { name: 'Some Item' })
      const item5 = component.getByRole('button', { name: 'Another Item' })

      await user.keyboard('[ArrowDown]')
      expect(item1).toHaveFocus()

      await user.keyboard('[ArrowDown][PageDown]')
      expect(item4).toHaveFocus()

      await user.keyboard('[End]')
      expect(item5).toHaveFocus()
    })
  })

  describe('with type=multiple', () => {
    beforeEach(() => {
      onChange = vi.fn()
      user = userEvent.setup()
      component = render(
        <SelectTest
          type='multiple'
          defaultValue={['item2']}
          onChange={onChange}
        />
      )
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })

    it('should select/deselect items on Click', async () => {
      const trigger = component.getByRole('combobox')
      await user.click(trigger)

      const item1 = component.getByRole('button', { name: 'Item 1' })
      const item2 = component.getByRole('button', { name: 'Item 2' })

      await user.click(item1)
      expect(onChange).toHaveBeenCalledWith(['item2', 'item1'])

      await user.click(item2)
      expect(onChange).toHaveBeenCalledWith(['item1'])
    })
  })

  describe('with type=search', () => {
    beforeEach(() => {
      onChange = vi.fn()
      user = userEvent.setup()
      component = render(
        <SelectTest
          type='search'
          defaultValue={['item2']}
          onChange={onChange}
        />
      )
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })

    it('should clear selected on type', async () => {
      const trigger = component.getByRole('combobox') as HTMLInputElement
      await user.click(trigger)

      await user.keyboard(' ')
      expect(onChange).toHaveBeenCalledWith([])
    })

    it('should filter items based on sanitized search input', async () => {
      const trigger = component.getByRole('combobox') as HTMLInputElement
      await user.click(trigger)

      // clear default value
      await user.keyboard('[ControlLeft>][Backspace]')

      await user.keyboard(' item   ')
      const item5 = component.getByRole('button', { name: 'Another Item' })

      await user.click(item5)
      expect(onChange).toHaveBeenCalledWith(['another_item'])
    })

    it('should select first search result on Enter', async () => {
      const trigger = component.getByRole('combobox') as HTMLInputElement
      await user.click(trigger)

      // clear default value
      await user.keyboard('[ControlLeft>][Backspace]')

      await user.keyboard('item')
      await user.keyboard('[Enter]')
      expect(onChange).toHaveBeenCalledWith(['item1'])
    })
  })
})

const SelectTest: React.FC<{
  onChange: (value: string[]) => void
  type: 'single' | 'multiple' | 'search'
  value?: string[]
  defaultValue?: string[]
}> = ({
  onChange,
  type,
  value,
  defaultValue,
}) => {
  return (
    <Select
      label='Select'
      name='select'
      type={type}
      items={[
        { label: 'Item 1', value: 'item1' },
        { label: 'Item 2', value: 'item2' },
        { label: 'Item 3', value: 'item3', disabled: true },
        { label: 'Some Item', value: 'some_item' },
        { label: 'Another Item', value: 'another_item' },
      ]}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  )
}
